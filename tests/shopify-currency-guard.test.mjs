import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("../app/api/admin/commerce/route.ts", import.meta.url), "utf8");

test("Shopify draft creation checks currency before remote create", () => {
  const preflightIndex = source.indexOf("query CommerceShopCurrency");
  const productCreateIndex = source.indexOf("productCreate(product:");
  const claimIndex = source.indexOf("const claimed = await updateCommerceProduct");
  assert.ok(preflightIndex > 0, "must inspect Shopify currency");
  assert.ok(claimIndex > preflightIndex, "must check currency before local sync claim");
  assert.ok(productCreateIndex > claimIndex, "must check currency before Shopify productCreate");
  assert.match(source, /shopCurrency !== product\.currency/);
  assert.match(source, /Currency mismatch:/);
});
