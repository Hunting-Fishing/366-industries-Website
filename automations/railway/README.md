# 366 Shopify Automation

Railway project `366 Shopify Automation` (project ID `7e973161-e9db-4560-82f0-9e6fa74c5765`) contains the scheduled Bun TypeScript function `sidekick-catalog-audit` (service ID `8f4a1a69-d0e0-443b-a719-cbfe02230832`). It runs daily at 01:00 UTC / 09:00 Asia/Manila.

The function reads drafts tagged `barangay-sidekick-apparel` in Shopify shop `kefuqu-mv.myshopify.com`, detects missing artwork and zero prices, and writes one internal promotion draft per week and a daily audit event in the existing Supabase `ujkizgblscqcejghxemb` project. It never publishes products, spends advertising budget, contacts customers, fulfills orders, or purchases supplies.

The function code is currently stored in Railway Functions and can be retrieved with the Railway `get_function_source_code` integration. Until secrets are configured, logs report `SETUP_REQUIRED`. Required server-only Railway variables: `JORDI_SHOPIFY_SUPABASE_SECRET_KEY` and one of `SHOPIFY_ACCESS_TOKEN` or `SHOPIFY_CLIENT_ID` plus `SHOPIFY_CLIENT_SECRET`. Keep credentials out of GitHub.

The store currently uses PHP, while the older 366 Commerce dashboard estimates USD; do not automatically publish, price or accept orders until currency conversion, costs, garment sizing, supplier fulfillment and print-ready artwork are verified.
