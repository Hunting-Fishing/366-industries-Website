# 366 Industries Commerce OS — owner portal integration

Private route: `/admin/jordi-shopify-promotions` (**Jordi Shopify & Promotions**). Old `/admin/commerce` redirects to it. Sign in as the root owner through `/admin`.

This is a Next.js/Cloudflare-compatible port of the earlier Python/SQLite Shopify agent prototype into the **existing GitHub website**, sharing the site's verified, HttpOnly, HMAC-signed owner admin cookie. The Python prototype is **not** deployed as a second public service.

## Current functionality

- Four product streams in a single catalog: dropshipping, print-on-demand, digital products and original creations.
- Worldwide launch planning and thematic idea prompts: color-vision exploration, hidden encouragement, singles/dating conversation starters, original media, upcoming books and affiliates.
- Owner-only product creation and source/rights verification.
- Editable factual source/notes fields at product creation. Draft description and social copy generation: `OPENAI_API_KEY` enables the OpenAI Responses API; otherwise a clearly labeled safe template is generated. The AI does not independently check supplier claims or quote licenses.
- Illustrative contribution estimate per order (USD, without currency conversion).
- Owner approval gate requiring verified source, cleared rights, description and positive estimated contribution.
- Optional Shopify Admin GraphQL DRAFT creation with initial retail price (requires valid credentials and installed app permissions). Publishing and payment are NOT automatic. A per-record DB status claim helps prevent duplicate creations. Ambiguous Shopify sync states are marked **needs_check** and must be reconciled manually, not retried blindly.
- Signed Shopify order webhook at `/api/shopify/webhook` stores only order ID, amount, currency and financial status; it verifies the raw-body HMAC, shop domain and webhook ID. Registered topics: `orders/create`, `orders/paid`, `orders/updated`. Customer personal data is intentionally not stored.
- Owner-only order summaries and recent agent events.

## Required setup before the portal can save records

1. Identify the actual Supabase project used by this 366 Industries website. The connected Supabase account may show other projects; do **not** apply a migration to a similarly named but unrelated project.
2. Review and apply `supabase/migrations/002_366_commerce_os.sql` and `supabase/migrations/003_jordi_shopify_promotions_workspace.sql` in that project's SQL editor/migration workflow. They create the commerce and workspace tracking tables with RLS **on** and no read/write grants to `anon` or `authenticated`; only `service_role` has CRUD grants. Confirm Data API exposure is enabled for the project's `public` schema, and direct service access works.
3. Set these as **server-side hosting secrets** (never commit values): `JORDI_SHOPIFY_SUPABASE_PROJECT_REF`, `JORDI_SHOPIFY_SUPABASE_URL`, and `JORDI_SHOPIFY_SUPABASE_SECRET_KEY`. Use only the verified 366 Industries project. Generic `SUPABASE_URL` is no longer a fallback for Commerce OS to avoid accidental writes to unrelated projects. Keep existing `ADMIN_SESSION_SECRET` configured (at least 32 characters), plus the existing root-admin authentication configuration. Owner email remains `jordilwbailey@gmail.com`.
4. Sign in at `/admin` with the actual root admin credentials. Open **Commerce Studio** and create an idea. Ensure the record remains after a refresh and is inaccessible with anonymous / normal member sessions.
5. Only if Shopify integration is wanted, create a Shopify store, install a properly authorized application with `write_products` and the owner's product-creation permissions, then set `SHOPIFY_SHOP` (shop subdomain, without `.myshopify.com`), and **one** of:
   - `SHOPIFY_ACCESS_TOKEN` (valid Shopify offline/access token), or
   - `SHOPIFY_CLIENT_ID` / `SHOPIFY_CLIENT_SECRET` for Shopify's client-credentials grant **only where store and app satisfy that grant's ownership criteria**. Other installations require an OAuth flow.
   You can optionally set `SHOPIFY_API_VERSION` (default `2026-10`) and `OPENAI_API_KEY` / `OPENAI_MODEL`.
6. For order summaries, set `SHOPIFY_WEBHOOK_SECRET` and register the desired Shopify topics using the publicly reachable HTTPS webhook URL. Test the signature with real Shopify deliveries and validate replay/idempotency behavior.

The site does **not** use a public token or email-only check for authorization: the existing admin login verifies owner credentials and creates a signed session cookie. The admin page and all commerce actions re-check that session on the server. Client UI hiding is not a security boundary. No commerce tables are exposed directly to browsers.

## Next integrations (not implemented yet)

- Shopify store creation, theme and checkout setup; supplier and print-on-demand API integration; artwork export/print proofing; digital file delivery; unique own-made items fulfillment.
- Automated social scheduling, campaign publishing, spend caps and performance measurement; affiliate-link disclosures and attribution; email opt-in compliance.
- Returns/refunds, customer service with human escalation; carrier customs, VAT/GST, local product labeling and shipping rules; multi-currency calculations.
- Product research from verifiable trend/supplier data instead of unsupported generated claims; agent background jobs, retries and monitoring; product imagery/test results.

## Safety/design guardrails

- Color-vision-dependent images are research/prototype concepts. An image that appears one way to a specific color-vision group may not be invisible to all other groups. Validate with multiple observers, lighting conditions and printed materials. Do not promise diagnostic or universal effects.
- Famous movie quotes, titles, characters, props or branding may have copyright, trademark and licensing issues. The agent prompts exclude reproduction without clearance; the rights checkbox records the owner's review, not a legal determination.
- Conversation-starter merchandise and affiliate/sponsored placements should be respectful, age-appropriate, clearly disclosed where required, and free of deceptive claims.
- Owner approval is required for product drafts. No public publishing, autonomous purchases or ad spending occurs in this release.

## Verification

```bash
npm ci
npm run build
node --test tests/*.test.mjs
```

Confirm anonymous requests to `/api/admin/commerce` are rejected (401); a signed normal-member cookie cannot gain owner privileges. Verify the owner page is not indexed. Check database RLS with anonymous credentials and `service_role` access separately.

No separate Python service is required to access the integrated Next.js dashboard.

## Dedicated owner workspace

See `docs/JORDI_SHOPIFY_PROMOTIONS.md` for the promotions tracker, personal build setup task tracker, canonical admin route, and strict 366 Industries Supabase project-ref binding.
