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

## Critical database binding: use ONLY 366 Industries Supabase

The connected Supabase tool currently shows **365 Motor Sales**, **Barangay Buddy**, and **366-AI-Software-Homebrew**, but does **not** show a project explicitly named **366 Industries / 366industries**. Those three are NOT interchangeable. No migration was run on them.

To prevent an accidental write to the wrong project, the Commerce OS now ignores generic `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Provision the following **private Cloudflare Worker runtime secrets** after verifying/connecting the actual 366 Industries project:

- `JORDI_SHOPIFY_SUPABASE_PROJECT_REF`: real 366 Industries Supabase project reference, e.g. the identifier in `https://<project-ref>.supabase.co`.
- `JORDI_SHOPIFY_SUPABASE_URL`: must be **exactly** `https://<that-project-ref>.supabase.co`.
- `JORDI_SHOPIFY_SUPABASE_SECRET_KEY`: server-side Supabase secret key (or legacy service-role JWT) for the verified project.

Do not paste secret keys into GitHub source, user-facing content, chat, screenshots, or frontend env. The code validates the project reference against the URL and fails closed when the binding isn't explicitly set. Ensure the Supabase Data API exposes the public schema and that the secret key has service access.

Apply migrations **in order to the correct 366 Industries database**:
1. `supabase/migrations/002_366_commerce_os.sql` — products, orders, webhook receipts, agent events.
2. `supabase/migrations/003_jordi_shopify_promotions_workspace.sql` — promotion tracking and personal build task tracking.

Do not blindly apply older `001_366_auth_and_donations.sql` to a database with existing auth/member tables; it contains broad pre-existing policies unrelated to this workspace. For any broader auth rework, review security separately.

Every new table enables RLS, revokes direct permissions from `anon` and `authenticated`, and grants the required access only to `service_role`. Only owner-verified Next.js server routes use the secret key. The schema currently uses dedicated `commerce_*` tables in the same verified database rather than exposing an unnecessary public schema.

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

- Connect the verified 366 Industries Supabase project.
- Apply and test migrations 002 and 003 (with private RLS).
- Create Shopify store, domain, merchant policies and checkout.
- Select initial print-on-demand and dropshipping providers for global fulfillment.
- Prototype and test color-vision apparel with real observers; verify print repeatability.
- Develop original deer/cosmos/dolphin designs and conversation starters.
- Plan original media/quote licensing and publishing rights.
- Build initial digital products and books.
- Verify global shipping, tax/VAT, labeling and consumer disclosures.
- Connect authorized social channels and affiliate programs; test opt-in and sponsorship disclosures.
- Deploy supervised agents and monitor profitability before adding autonomous external actions.
