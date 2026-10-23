import { NextResponse } from "next/server";
import {
  ingestShopifyOrderWebhook,
  shopifyWebhookSecret,
  VERIFIED_SHOPIFY_SHOP,
  VERIFIED_SHOPIFY_SUBDOMAIN,
} from "../../../lib/commerce-os";
import {
  parseShopifyOrderSummary,
  verifyShopifyWebhookHmac,
} from "../../../lib/shopify-webhook-core.mjs";

export const dynamic = "force-dynamic";

/** HMAC-verified, limited-data, no-customer-PII Shopify order summaries. */
export async function POST(request: Request) {
  const secret = shopifyWebhookSecret();
  if (!secret) return NextResponse.json({ok:false,message:"Webhook not configured."},{status:503});
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 512000) return NextResponse.json({ok:false},{status:413});
  const bytes = new Uint8Array(await request.arrayBuffer());
  if (bytes.byteLength > 512000) return NextResponse.json({ok:false},{status:413});
  const hmacHeader = request.headers.get("x-shopify-hmac-sha256") || "";
  if (!(await verifyShopifyWebhookHmac(bytes, hmacHeader, secret)))
    return NextResponse.json({ok:false},{status:401});
  const shop = (request.headers.get("x-shopify-shop-domain") || "").toLowerCase();
  if (!process.env.SHOPIFY_SHOP ||
      process.env.SHOPIFY_SHOP.trim().toLowerCase() !== VERIFIED_SHOPIFY_SUBDOMAIN ||
      shop !== VERIFIED_SHOPIFY_SHOP)
    return NextResponse.json({ok:false},{status:403});
  const topic = request.headers.get("x-shopify-topic") || "";
  const deliveryId = request.headers.get("x-shopify-webhook-id") || "";
  if (!/^[A-Za-z0-9-]{1,200}$/.test(deliveryId))
    return NextResponse.json({ok:false},{status:400});
  if (!["orders/create","orders/paid","orders/updated"].includes(topic))
    return NextResponse.json({received:true,ignored:true});
  let payload: Record<string,unknown>;
  try { payload = JSON.parse(new TextDecoder().decode(bytes)) as Record<string,unknown>; }
  catch {return NextResponse.json({ok:false},{status:400});}
  const triggeredAt = request.headers.get("x-shopify-triggered-at") || "";
  const summary = parseShopifyOrderSummary(payload, triggeredAt);
  if (!summary)
    return NextResponse.json({ok:false},{status:400});
  try {
    const outcome = await ingestShopifyOrderWebhook({
      deliveryId, topic, ...summary,
    });
    return NextResponse.json({
      received: true,
      duplicate: outcome === "duplicate",
      stale: outcome === "stale",
    });
  } catch {
    // Shopify should retry a temporary integration/database failure.
    return NextResponse.json({received:false},{status:503});
  }
}
