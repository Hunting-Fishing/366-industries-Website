import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../admin/auth";
import {
  assertSameOrigin, commerceDatabaseConfigured, commerceKinds, commerceRest,
  contribution, generateCommerceCopy, getCommerceProduct, htmlEscape, isUuid,
  listCommerceProducts, recordCommerceEvent, safeAmount, safeText,
  shopifyConfigured, shopifyGraphQL, updateCommerceProduct,
  type CommerceKind, type CommerceProduct,
} from "../../../lib/commerce-os";

export const dynamic = "force-dynamic";

function jsonError(message: string, status = 400) {
  return NextResponse.json({ok: false, message}, {status, headers: {"Cache-Control":"no-store"}});
}
function rejectError(err: unknown) {
  const message = err instanceof Error ? err.message : "Unexpected commerce operation error.";
  return jsonError(message, message.includes("not configured") ? 503 : 400);
}
function validId(input: unknown) {
  if (!isUuid(input)) throw new Error("Invalid product ID.");
  return input;
}
async function ownerOnly() {
  return isAdminAuthenticated();
}

export async function GET() {
  if (!(await ownerOnly())) return jsonError("Owner login required.", 401);
  if (!commerceDatabaseConfigured()) {
    return NextResponse.json({
      ok: true, configured: false, products: [], shopifyConfigured: shopifyConfigured(),
      aiConfigured: Boolean(process.env.OPENAI_API_KEY),
      message: "Data storage is not connected. Set Supabase environment secrets and apply commerce migration 002.",
    }, {headers: {"Cache-Control":"no-store"}});
  }
  try {
    return NextResponse.json({
      ok: true, configured: true, products: await listCommerceProducts(),
      shopifyConfigured: shopifyConfigured(),
      aiConfigured: Boolean(process.env.OPENAI_API_KEY),
    }, {headers: {"Cache-Control":"no-store"}});
  } catch (err) { return rejectError(err); }
}

export async function POST(request: Request) {
  if (!(await ownerOnly())) return jsonError("Owner login required.", 401);
  try {
    assertSameOrigin(request);
    const body = await request.json() as Record<string, unknown>;
    const action = safeText(body.action, 30);

    if (action === "create") {
      const kind = body.kind;
      if (typeof kind !== "string" || !commerceKinds.includes(kind as CommerceKind))
        return jsonError("Choose one of the four supported revenue streams.");
      const title = safeText(body.title, 160);
      if (title.length < 3) return jsonError("Product name must be at least 3 characters.");
      const price = safeAmount(body.price);
      if (price <= 0) return jsonError("Retail price must be positive.");
      const entry = {
        title, kind, theme: safeText(body.theme, 120), supplier: safeText(body.supplier, 250),
        note: safeText(body.note, 1000), description: "", social_copy: "",
        price, unit_cost: safeAmount(body.unit_cost), shipping_cost: safeAmount(body.shipping_cost),
        ad_allowance: safeAmount(body.ad_allowance),
        currency: "USD", rights_confirmed: false, source_verified: false, status: "idea",
      };
      const products = await commerceRest<CommerceProduct[]>("commerce_products", "",
        "POST", entry);
      await recordCommerceEvent("Catalog Agent", "New product idea", title, products[0]?.id);
      return NextResponse.json({ok:true, product:products[0]}, {status:201});
    }

    const id = validId(body.id);
    const product = await getCommerceProduct(id);
    if (!product) return jsonError("Product not found.", 404);

    if (action === "generate") {
      if (product.status === "syncing" || product.status === "shopify_draft")
        return jsonError("Already transferred to Shopify; edit in Shopify Admin.", 409);
      const copy = await generateCommerceCopy(product);
      const updated = await updateCommerceProduct(id, {
        description: copy.description, social_copy: copy.social,
        status: "copy_ready", rights_confirmed: false,
      });
      await recordCommerceEvent("Catalog Agent", "Generated draft copy", copy.generator, id);
      return NextResponse.json({ok:true, product:updated, generator:copy.generator});
    }

    if (action === "shopify-draft") {
      if (!shopifyConfigured()) return jsonError("Connect Shopify credentials before creating drafts.", 503);
      if (product.status !== "approved" || !product.rights_confirmed || !product.source_verified ||
        !product.description || contribution(product) <= 0 || product.shopify_id)
        return jsonError("Approve reviewed, verified, profitable product before Shopify sync.", 409);
      // Single-writer claim: concurrent requests cannot create two Shopify products.
      const claimed = await updateCommerceProduct(id, {status:"syncing"}, "&status=eq.approved&shopify_id=is.null");
      if (!claimed) return jsonError("Already being synced or approval changed.", 409);
      try {
        const created = await shopifyGraphQL(
          "mutation ($product: ProductCreateInput!) { productCreate(product: $product) { product { id status variants(first: 1) { nodes { id } } } userErrors { message } } }",
          {product: {
            title: product.title,
            descriptionHtml: "<p>" + htmlEscape(product.description).replace(/\n/g, "<br/>") + "</p>",
            productType: product.kind.replace(/_/g," "),
            vendor: "366 Industries",
            tags: ["366-commerce-review", product.theme].filter(Boolean),
            status: "DRAFT",
          }},
        );
        const result = created.productCreate as {
          product?: {id?:string; variants?: {nodes?: Array<{id: string}>}};
          userErrors?: Array<{message: string}>;
        };
        if (result?.userErrors?.length || !result.product?.id)
          throw new Error("Shopify rejected the draft product. Inspect Shopify Admin before retrying.");
        // Save Shopify ID BEFORE price update, preventing an accidental duplicate on retry.
        const shopifyId = result.product.id;
        await updateCommerceProduct(id, {shopify_id: shopifyId, status:"needs_check"});
        const variantId = result.product.variants?.nodes?.[0]?.id;
        if (!variantId) throw new Error("Shopify product created but no default variant. Manual review required.");
        const priced = await shopifyGraphQL(
          "mutation ($productId: ID!, $variants: [ProductVariantsBulkInput!]!) { productVariantsBulkUpdate(productId:$productId, variants:$variants) { userErrors { message } } }",
          {productId:shopifyId, variants:[{id: variantId, price: String(product.price)}]},
        );
        const pricing = priced.productVariantsBulkUpdate as {userErrors?: Array<{message: string}>};
        if (pricing?.userErrors?.length) throw new Error("Shopify product created but price update needs review.");
        const updated = await updateCommerceProduct(id, {status:"shopify_draft"});
        await recordCommerceEvent("Shopify Agent", "Unpublished DRAFT created", shopifyId, id);
        return NextResponse.json({
          ok:true, product:updated,
          message:"Unpublished Shopify draft created. Verify design rights, product images, variants, fulfillment, taxes and worldwide shipping before manually publishing.",
        });
      } catch {
        // Ambiguous remote state: NEVER automatically retry a possibly successful creation.
        await updateCommerceProduct(id, {status:"needs_check"}).catch(() => null);
        await recordCommerceEvent("Shopify Agent","Draft sync requires manual reconciliation","Check Shopify Admin for draft/price.", id);
        return jsonError("Shopify result requires manual reconciliation. Check Shopify Admin before taking further action.", 502);
      }
    }
    return jsonError("Unsupported action.");
  } catch (err) { return rejectError(err); }
}

export async function PATCH(request: Request) {
  if (!(await ownerOnly())) return jsonError("Owner login required.", 401);
  try {
    assertSameOrigin(request);
    const body = await request.json() as Record<string, unknown>;
    const id = validId(body.id);
    const product = await getCommerceProduct(id);
    if (!product) return jsonError("Product not found.", 404);
    if (["syncing","shopify_draft","needs_check"].includes(product.status))
      return jsonError("Sync already started. Reconcile changes in Shopify Admin.", 409);
    const patch: Record<string,unknown> = {};
    if (typeof body.source_verified === "boolean") patch.source_verified = body.source_verified;
    if (typeof body.rights_confirmed === "boolean") patch.rights_confirmed = body.rights_confirmed;
    if (typeof body.supplier === "string") patch.supplier = safeText(body.supplier,250);
    if (typeof body.note === "string") patch.note = safeText(body.note,1000);
    if (body.status === "approved") {
      const verifiedSource = patch.source_verified ?? product.source_verified;
      const confirmedRights = patch.rights_confirmed ?? product.rights_confirmed;
      if (!verifiedSource || !confirmedRights || !product.description || contribution(product) <= 0)
        return jsonError("Verification, rights clearance, generated copy and positive contribution are required.", 409);
      patch.status = "approved";
    } else if (body.status === "idea") {
      patch.status = "idea";
    }
    if (!Object.keys(patch).length) return jsonError("Nothing to update.");
    const updated = await updateCommerceProduct(id, patch);
    await recordCommerceEvent("Policy Agent", "Reviewed product", String(patch.status || "verification update"), id);
    return NextResponse.json({ok:true, product:updated});
  } catch (err) { return rejectError(err); }
}
