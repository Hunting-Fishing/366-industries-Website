# Jordi Shopify & Promotions — Personal Owner Workspace

## Purpose

**366 Industries** has a private, owner-only business area named **Jordi Shopify & Promotions** at:

`/admin/jordi-shopify-promotions`

This is the canonical URL linked from the root owner dashboard (`/admin`). The older `/admin/commerce` bookmark redirects here. Authentication uses the signed root-admin session from the existing website. The authenticated owner email must match `jordilwbailey@gmail.com` (case-insensitive in the existing helper). A matching email string without successful login is not sufficient. Routes, UI, and APIs enforce this server-side.

This area is intentionally not linked in the public site navigation. Public customers will eventually use a separate public Shopify storefront, not this operations dashboard.

## Everything in one space

- Product idea and review records: dropshipping, print-on-demand, digital goods and Jordi's own creations.
- Apparel, accessories, gifts, journals, books, movie-inspired original work (rights clearance), conversation starter/dating products, empowering/hidden message designs, and color-vision design research.
- Promotion tracker: social posts, affiliates, sponsorships, paid-ad planning, product launches and other promotions. Captures channel, link, planned budget, notes and internal status. **A planned budget does not authorize spending.**
- Personal build tracker: store setup, AI agents and automations, supplier sourcing, design/IP, marketing, books, integrations and operations. Tracks priority, work status and notes.
- Owner product approval gate, estimated contribution per product, optional AI draft generation, Shopify unpublished draft creation, limited order summaries and activity log.

Commerce tracker data is separate from existing website donations and member account data.

## Confirmed Supabase project: existing 366 Industries AI Platform database

The owner supplied the exact project URL `https://supabase.com/dashboard/project/ujkizgblscqcejghxemb`.
The Supabase connector independently verified:
- **Project ID/ref:** `ujkizgblscqcejghxemb`
- **Dashboard project label:** `366-AI-Software-Homebrew`
- **Organization:** `366 Industries AI Platform`
- **API URL:** `https://ujkizgblscqcejghxemb.supabase.co`

This is the **confirmed selected database** for Jordi Shopify & Promotions, even though the dashboard project name is not literally `366industries`. Do not create a separate database or rename the existing Homebrew project as part of this feature.

### Implemented in the confirmed project

Applied in order through the authenticated Supabase connector:
1. `jordi_shopify_commerce_core`, tracked in GitHub as `supabase/migrations/002_366_commerce_os.sql` — catalog, order summaries, webhook receipts and event auditing.
2. `jordi_shopify_promotions_tracking`, tracked as `supabase/migrations/003_jordi_shopify_promotions_workspace.sql` — personal build and campaign trackers.
3. `jordi_shopify_workspace_verified_platform_seed`, tracked as `supabase/migrations/004_jordi_workspace_verified_366_platform.sql` — descriptive table labels and initial owner-only work board.
4. `admin_session_guard`, tracked as `supabase/migrations/005_admin_session_guard.sql` — service-role-only validation that privileged website tokens still have a live Supabase Auth session.
5. `shopify_webhook_ingest`, tracked as `supabase/migrations/006_shopify_webhook_ingest.sql` — atomic delivery deduplication and ordered, non-personal Shopify order-summary updates.

The **six `public.commerce_*` tables** are a dedicated logical group within this existing Supabase project. Existing Homebrew builder tables were not modified. The `public` schema is intentional because the Next.js server accesses the Supabase Data API at `/rest/v1/<table>`.

All six commerce tables have RLS enabled, no direct `anon` or `authenticated` SELECT privilege, and service-role SELECT privileges. The absence of RLS policies is intentional for these server-only tables. The Supabase security advisor may display an informational `rls_enabled_no_policy` result; see the security linter documentation before changing policies.

### Website runtime configuration — still required

The server-side Commerce OS now pins the project ref and API URL to the confirmed values above, and refuses a mismatched target. To make the deployed website read and save these records, set a valid secret key from **this exact** Supabase project in the **Cloudflare Worker secret**:

- `JORDI_SHOPIFY_SUPABASE_SECRET_KEY` — use a project secret/service-role key (server only).

Optional explicit variables `JORDI_SHOPIFY_SUPABASE_PROJECT_REF` and `JORDI_SHOPIFY_SUPABASE_URL` may be set to the project ID and API URL above, but the code defaults to these exact verified public values. If the existing website already has both a generic service-role credential and a generic Supabase URL that **exactly** matches this project, the Commerce OS can safely reuse that key instead. It will not reuse a service credential associated with any other project.

Never commit or expose a service-role/secret key to GitHub, client code, public documentation, screenshots, browser environment variables, or chat. Owner-only API routes use a short-lived, HttpOnly Supabase access token whose live Auth session is checked on every privileged request; no email-only authorization is allowed. Verify authorized reads/writes and public-user denial after the Cloudflare secret is configured.

Do not apply the old `001_366_auth_and_donations.sql` migration to this project merely for Commerce OS. It is unrelated and its broad legacy policies require separate review.

## Shop connection (optional for idea and planning features)

As described in `docs/COMMERCE_OS.md`, Shopify actions require store credentials and installed app permissions. Running promotions, paid advertising and supplier ordering are NOT implemented. AI copy generation is optional and requires an OpenAI API key.

## Validation after credentials are configured

1. Sign in to website `/admin` as the root owner and open Jordi Shopify & Promotions.
2. Confirm workspace shows the verified database connected.
3. Create a build task and promotion; refresh and check both remain.
4. Sign out: page redirects to `/admin` and `/api/admin/jordi-workspace` rejects requests with 401.
5. Check direct Supabase Data API access to the commerce tracking tables is denied for anonymous and normal authenticated users.
6. Inspect GitHub Actions test and build logs; never expose server secrets.

## Suggested personal launch checklist

- ✅ Database project `ujkizgblscqcejghxemb` selected; migrations 002 through 006 applied and access privileges verified.
- Configure Cloudflare server-only Supabase secret and test portal persistence end-to-end.
- Configure the preserved active Shopify store, domain, merchant policies and checkout.
- Select initial print-on-demand and dropshipping providers for global fulfillment.
- Prototype and test color-vision apparel with real observers; verify print repeatability.
- Develop original deer/cosmos/dolphin designs and conversation starters.
- Plan original media/quote licensing and publishing rights.
- Build initial digital products and books.
- Verify global shipping, tax/VAT, labeling and consumer disclosures.
- Connect authorized social channels and affiliate programs; test opt-in and sponsorship disclosures.
- Deploy supervised agents and monitor profitability before adding autonomous external actions.
