import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  parseShopifyOrderSummary,
  selectShopifyWebhookSecret,
  verifyShopifyWebhookHmac,
} from "../app/lib/shopify-webhook-core.mjs";
import {
  missingShopifyScopes,
  shopifyAdminConfigurationReady,
  shopifyIdentityMatches,
} from "../app/lib/shopify-policy.mjs";

const commerceSource = await readFile(
  new URL("../app/lib/commerce-os.ts", import.meta.url),
  "utf8"
);
const webhookSource = await readFile(
  new URL("../app/api/shopify/webhook/route.ts", import.meta.url),
  "utf8"
);

test("Shopify integration is pinned to the preserved store and validated API version", () => {
  assert.match(commerceSource, /VERIFIED_SHOPIFY_SHOP = "kefuqu-mv\.myshopify\.com"/);
  assert.match(commerceSource, /VERIFIED_SHOPIFY_SHOP_ID = "gid:\/\/shopify\/Shop\/84267827426"/);
  assert.match(commerceSource, /VERIFIED_SHOPIFY_API_VERSION = "2026-10"/);
  assert.match(webhookSource, /shop !== VERIFIED_SHOPIFY_SHOP/);
});

test("Shopify configuration fails closed for wrong targets and ambiguous credentials", () => {
  const valid = {SHOPIFY_SHOP: "kefuqu-mv", SHOPIFY_ACCESS_TOKEN: "token", SHOPIFY_API_VERSION: "2026-10"};
  assert.equal(shopifyAdminConfigurationReady(valid, "kefuqu-mv", "2026-10"), true);
  assert.equal(shopifyAdminConfigurationReady({...valid, SHOPIFY_SHOP: "other"}, "kefuqu-mv", "2026-10"), false);
  assert.equal(shopifyAdminConfigurationReady({...valid, SHOPIFY_API_VERSION: "2025-10"}, "kefuqu-mv", "2026-10"), false);
  assert.equal(shopifyAdminConfigurationReady({...valid, SHOPIFY_CLIENT_ID: "id", SHOPIFY_CLIENT_SECRET: "secret"}, "kefuqu-mv", "2026-10"), false);
  assert.equal(shopifyAdminConfigurationReady({SHOPIFY_SHOP: "kefuqu-mv", SHOPIFY_CLIENT_ID: "id"}, "kefuqu-mv", "2026-10"), false);
});

test("connection verification checks the minimum app scopes before writes", () => {
  assert.match(commerceSource, /REQUIRED_SHOPIFY_SCOPES = \["read_orders", "write_products"\]/);
  assert.match(commerceSource, /currentAppInstallation \{ id accessScopes \{ handle \} \}/);
  assert.match(commerceSource, /throw new ShopifyScopeError\(missingScopes\)/);
  assert.equal(shopifyIdentityMatches(
    {id: "gid://shopify/Shop/84267827426", myshopifyDomain: "kefuqu-mv.myshopify.com"},
    "kefuqu-mv.myshopify.com",
    "gid://shopify/Shop/84267827426"
  ), true);
  assert.equal(shopifyIdentityMatches(
    {id: "gid://shopify/Shop/other", myshopifyDomain: "kefuqu-mv.myshopify.com"},
    "kefuqu-mv.myshopify.com",
    "gid://shopify/Shop/84267827426"
  ), false);
  assert.deepEqual(missingShopifyScopes(["write_products"], ["read_orders", "write_products"]), ["read_orders"]);
});

test("draft write path verifies Shopify before its product mutation", async () => {
  const route = await readFile(
    new URL("../app/api/admin/commerce/route.ts", import.meta.url),
    "utf8"
  );
  const actionStart = route.indexOf('if (action === "shopify-draft")');
  const verifyIndex = route.indexOf("await verifyShopifyConnection()", actionStart);
  const mutationIndex = route.indexOf("const created = await shopifyGraphQL", actionStart);
  assert.ok(actionStart >= 0 && verifyIndex > actionStart && mutationIndex > verifyIndex);
});

test("Admin API and webhook signing readiness are reported separately", () => {
  assert.match(commerceSource, /export function shopifyWebhookConfigured\(\)/);
  assert.equal(selectShopifyWebhookSecret(true, " app-secret ", ""), "app-secret");
  assert.equal(selectShopifyWebhookSecret(true, "app-secret", "different"), "");
  assert.equal(selectShopifyWebhookSecret(true, "", " token-app-secret "), "token-app-secret");
  assert.equal(selectShopifyWebhookSecret(false, "app-secret", "app-secret"), "");
});

test("Shopify webhook HMAC is checked against the unmodified request bytes", async () => {
  const bytes = new TextEncoder().encode('{"id":123,"note":"exact bytes"}');
  const secret = "shopify-app-client-secret";
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(secret), {name: "HMAC", hash: "SHA-256"}, false, ["sign"]
  );
  const signature = Buffer.from(await crypto.subtle.sign("HMAC", key, bytes)).toString("base64");
  assert.equal(await verifyShopifyWebhookHmac(bytes, signature, secret), true);
  assert.equal(await verifyShopifyWebhookHmac(bytes, signature, "wrong-secret"), false);
  assert.equal(await verifyShopifyWebhookHmac(new TextEncoder().encode("changed"), signature, secret), false);
});

test("Shopify order parser preserves event ordering timestamps", () => {
  const summary = parseShopifyOrderSummary({
    id: 123,
    total_price: "19.95",
    currency: "usd",
    financial_status: "paid",
    created_at: "2026-10-23T00:00:00Z",
    updated_at: "2026-10-23T00:00:01Z",
  }, "2026-10-23T00:00:02Z");
  assert.equal(summary.occurredAt, "2026-10-23T00:00:02.000Z");
  assert.equal(summary.currency, "USD");
  assert.equal(parseShopifyOrderSummary({id: "not-an-order"}, ""), null);
});

test("webhook ingestion uses one atomic, ordered, replay-safe database function", async () => {
  const migration = await readFile(
    new URL("../supabase/migrations/006_shopify_webhook_ingest.sql", import.meta.url),
    "utf8"
  );
  assert.match(webhookSource, /ingestShopifyOrderWebhook/);
  assert.doesNotMatch(webhookSource, /recordCommerceEvent|commerce_webhook_receipts/);
  assert.match(migration, /ON CONFLICT \(id\) DO NOTHING/);
  assert.match(migration, /shopify_updated_at <= EXCLUDED\.shopify_updated_at/);
  assert.match(migration, /RETURN 'duplicate'/);
  assert.match(migration, /RETURN 'stale'/);
});

test("Shopify server connector contains no store closure or deletion operation", () => {
  assert.doesNotMatch(
    commerceSource,
    /shopDelete|shopClose|shopDeactivate|subscriptionCancel/i
  );
});
