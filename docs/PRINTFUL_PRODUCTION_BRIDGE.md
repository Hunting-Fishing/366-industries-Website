# Barangay Sidekick — Printful production bridge (read-only)

**Current status:** Railway Function deployed in the user's `366 Shopify Automation` project, but real Printful product synchronization has **not** occurred because the Printful API access token and selected Printful Store ID are not configured. Shopify plugin access does not grant access to Printful's private API.

Railway project: `7e973161-e9db-4560-82f0-9e6fa74c5765`, service `sidekick-printful-production-bridge` (`751a059d-58aa-4f0a-95c1-dfea6632daa7`). The function is deliberately **not scheduled** while waiting for merchant authorization.

## Secure authorization

1. Open Printful Developer Portal: https://developers.printful.com/tokens/add-new-token — create a **private token** with **stores_list/read** and **sync_products/read** scopes. Choose a store/account access level that covers the exact Shopify-connected Printful shop. These read-only scopes are sufficient for the readiness audit, not for creating product mappings.
2. Open https://railway.com/project/7e973161-e9db-4560-82f0-9e6fa74c5765 and choose `sidekick-printful-production-bridge` → Variables. Set `PRINTFUL_API_TOKEN` as a private variable. Never store it in GitHub or a chat message.
3. Determine the Printful Store ID for `kefuqu-mv.myshopify.com`. Set `PRINTFUL_STORE_ID` to the **numeric** ID from Printful. After checking the Printful dashboard connects to the correct Shopify store, set `PRINTFUL_VERIFIED_SHOP_DOMAIN` to `kefuqu-mv.myshopify.com`.
4. Trigger the Railway function once and inspect the **printful read-only** audit event in `public.commerce_events` (Supabase project `ujkizgblscqcejghxemb`). The function performs only GET operations to Printful, no product writes, publication, orders, refunds, or spending.

## Official Printful workflow / limits

- The Shopify app is installed and there is an active Printful fulfillment location, but this does not mean the existing Shopify DRAFT products are configured in Printful.
- **Shopify draft products may not import into Printful.** Printful's guidance: create full products using Printful's Design Maker and push them to the connected Shopify store, or make existing Shopify products eligible and manually synchronize them in Printful. Existing Shopify catalogs are imported when the `Import not synced products` toggle is enabled. Do not turn PHP 0 draft products live merely to import them.
- Printful's Ecommerce Platform Sync API can assign real Printful variant IDs and print files to Shopify-linked products **after they have been imported into Printful**; it does not bypass the import requirement. Do not equate a Shopify SKU with a Printful catalog variant ID.
- The older Shopify products include 5 branded drafts with proposed PHP selling prices and production-asset metadata; these prices are **unverified**, not production quotes. New catalog concepts are placeholder-priced PHP 0.
- The first five draft Shopify product IDs: official tee `15539345391842`, hoodie `15539345424610`, cap `15539345457378`, slogan tee `15539345490146`, tote `15539345522914`. Each stores a `sidekick_production.candidate_print_asset` metafield pointing to a logo-preserving PNG under the existing public Supabase asset bucket, plus `candidate_blank` and `readiness_status`.
- Only select actual Printful blank models and available sizes/colors after checking the supplier catalog; obtain manufacturer mockups, proofing, shipping quotes, taxes, payment collection and margins before publishing or ad spend.

## Source documentation

- https://help.printful.com/hc/en-us/articles/50262333466897-How-do-I-add-and-sync-products-with-my-Shopify-store
- https://help.printful.com/hc/en-us/articles/50262371122193-Why-don-t-my-Shopify-products-show-up-in-my-Printful-Dashboard
- https://developers.printful.com/docs/

## Security

The Railway function hard-pins the selected Shopify domain, checks that the selected Printful Store ID is a Shopify-type store, and requires the merchant to explicitly attest to that store's mapping. It records only non-personal order-free counts. A private Supabase secret comes from the existing Railway service reference, never from browser code. No paid features or publishing are activated.
