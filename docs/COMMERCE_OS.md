# 366 Industries Commerce OS — owner portal integration

Private route: `/admin/jordi-shopify-promotions` (**Jordi Shopify & Promotions**). Old `/admin/commerce` redirects to it. Sign in as the root owner through `/admin`.

This is a Next.js/Cloudflare-compatible port of the earlier Python/SQLite Shopify agent prototype into the **existing GitHub website**, using the site's short-lived, HttpOnly Supabase owner session. The Python prototype is **not** deployed as a second public service.

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

1. Owner has identified Supabase project `ujkizgblscqcejghxemb` (displayed as `366-AI-Software-Homebrew` under `366 Industries AI Platform`). No new project is required.
2. Migrations `002_366_commerce_os.sql`, `003_jordi_shopify_promotions_workspace.sql`, `004_jordi_workspace_verified_366_platform.sql`, `005_admin_session_guard.sql`, and `006_shopify_webhook_ingest.sql` have been applied to that selected project. They create the commerce/workspace tables, service-role-only administrator-session guard, and atomic webhook-ingest transaction with no private-table access for `anon` or `authenticated`. Confirm Data API exposure is enabled for the project's `public` schema, and direct service access works.
3. Set `JORDI_SHOPIFY_SUPABASE_SECRET_KEY` as a **server-only Cloudflare Worker secret** for the selected Supabase project. The project ref and URL are already pinned in code; optional explicit env vars must match. A generic service-role key may be reused only if the site's existing generic Supabase URL exactly equals `https://ujkizgblscqcejghxemb.supabase.co`. Keep a strong `MEMBER_SESSION_SECRET` configured for non-privileged member cookies, plus the existing root-admin Supabase configuration. Owner email remains `jordilwbailey@gmail.com`.
4. Sign in at `/admin` with the actual root admin credentials. Open **Commerce Studio** and create an idea. Ensure the record remains after a refresh and is inaccessible with anonymous / normal member sessions.
5. The integration is deliberately pinned to the preserved active store `kefuqu-mv.myshopify.com` (shop GID `gid://shopify/Shop/84267827426`). Create and install the `366 Industries Commerce OS` app on **that store only**, with the minimum scopes `write_products,read_orders`, then set `SHOPIFY_SHOP=kefuqu-mv` and **one** of:
   - `SHOPIFY_ACCESS_TOKEN` (valid Shopify offline/access token), or
   - `SHOPIFY_CLIENT_ID` / `SHOPIFY_CLIENT_SECRET` for Shopify's client-credentials grant **only where store and app satisfy that grant's ownership criteria**. Other installations require an OAuth flow.
   Configure exactly one credential mode; mixed or partial credentials fail closed. `SHOPIFY_API_VERSION`, when set, must be the schema-validated `2026-10`. `OPENAI_API_KEY` / `OPENAI_MODEL` remain optional.
6. For order summaries in access-token mode, set `SHOPIFY_WEBHOOK_SECRET` to the Shopify app's actual client/API secret—the same app that issued the token, not a new random value. Client-credentials mode uses `SHOPIFY_CLIENT_SECRET` directly and rejects a conflicting override. Register `orders/create`, `orders/paid`, and `orders/updated` at `https://366-industries-website.jordilwbailey.workers.dev/api/shopify/webhook` using API version `2026-10`. Migration 006 atomically deduplicates delivery IDs and prevents older event timestamps from overwriting newer order state; still test real Shopify deliveries before relying on the summaries.
7. While signed in as the owner, use **Verify Shopify connection** in Commerce Studio (or request `/api/admin/shopify/status`) before attempting a draft. The read-only check requires both the canonical domain and immutable shop GID to match; it never returns tokens or secret values.

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

The data migration and permission checks are complete as of 2026-10-23; deployment credentials and end-to-end website persistence are **not** yet confirmed. Details: `docs/JORDI_SHOPIFY_PROMOTIONS.md`.
