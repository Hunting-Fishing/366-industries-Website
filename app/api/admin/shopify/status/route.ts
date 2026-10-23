import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "../../../../admin/auth";
import {
  shopifyConfigured,
  shopifyWebhookConfigured,
  ShopifyScopeError,
  verifyShopifyConnection,
  VERIFIED_SHOPIFY_SHOP,
} from "../../../../lib/commerce-os";

export const dynamic = "force-dynamic";

function response(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {"Cache-Control": "no-store, max-age=0"},
  });
}

/** Read-only credential and store-identity check for the owner dashboard. */
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return response({ok: false, message: "Owner login required."}, 401);
  }
  if (!shopifyConfigured()) {
    return response({
      ok: false,
      connected: false,
      expectedStore: VERIFIED_SHOPIFY_SHOP,
      message: "Shopify credentials are not configured for the verified store.",
    }, 503);
  }
  try {
    const shop = await verifyShopifyConnection();
    const webhookConfigured = shopifyWebhookConfigured();
    return response({
      ok: true,
      connected: true,
      webhookConfigured,
      shop,
      message: webhookConfigured
        ? `Connected securely to ${shop.domain}; the Shopify webhook HMAC secret is present.`
        : `Connected securely to ${shop.domain}; add the app client secret before enabling order webhooks.`,
    });
  } catch (error) {
    if (error instanceof ShopifyScopeError) {
      return response({
        ok: false,
        connected: false,
        expectedStore: VERIFIED_SHOPIFY_SHOP,
        missingScopes: error.missingScopes,
        message: `Shopify app is missing required scopes: ${error.missingScopes.join(", ")}.`,
      }, 403);
    }
    return response({
      ok: false,
      connected: false,
      expectedStore: VERIFIED_SHOPIFY_SHOP,
      message: "Shopify could not verify the configured app credentials for the preserved store.",
    }, 502);
  }
}
