# Jordi Shopify & Promotions — automated catalog agent

Source: `automations/railway/catalog-audit.ts` (exact deployed source as of Nov 26, 2026).

Railway project: **366 Shopify Automation** — `7e973161-e9db-4560-82f0-9e6fa74c5765`.
Service: **sidekick-catalog-audit** — `8f4a1a69-d0e0-443b-a719-cbfe02230832`.
Schedule: `0 1 * * *` UTC (09:00 Asia/Manila).

## Live connection state

- ✅ The connected Shopify store `kefuqu-mv.myshopify.com` has custom app `366 Industries Commerce OS` installed with `read_products`, `write_products`, `read_orders`.
- ✅ Railway has nonsecret `SHOPIFY_SHOP=kefuqu-mv` and `SHOPIFY_CLIENT_ID` set to this custom app's publicly exposed Client ID.
- ✅ Railway has the target Supabase project ref and URL (project `ujkizgblscqcejghxemb`) set as nonsecret variables.
- 🔒 Missing at last check: `SHOPIFY_CLIENT_SECRET`, `JORDI_SHOPIFY_SUPABASE_SECRET_KEY`. Their values cannot be pulled from the ChatGPT Shopify connection or Supabase management plugin; put them into **Railway Service → Variables** as secrets. Never put them in GitHub or chat.
- ✅ The function's Cron is deployed; when secrets are missing, its run reports `SETUP_REQUIRED`, then exits without writing.

After secrets have been configured, the function scans up to 100 Sidekick-tagged product records and adds owner-only Supabase `commerce_events` audit entries, plus one unpublished promotion brief per calendar week in `commerce_promotions`. **No automatic publication, paid ads, customer contact, refunds, supplier orders or other spend.** Currency remains PHP in Shopify; the older 366 Commerce OS idea/pricing system works in USD.

The print-on-demand provider is **not installed** as of the latest Shopify app installation check. To fulfill custom-logo apparel, the merchant must authorize the chosen POD app (e.g. Printful) with Shopify and connect its production account. After a first sample and local shipping/price validation, create fulfillment-backed product variants and approved imagery before launch.

All merchant-specific authorization remains with the merchant; this GitHub repository is public, so do not commit tokens or secrets.
