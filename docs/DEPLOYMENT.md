# Production Deployment — 366 Industries Website

This repository builds a Next.js/vinext Cloudflare Worker and deploys it from the `main` branch via `.github/workflows/deploy.yml`.

## GitHub Actions credentials

Under repository **Settings → Secrets and variables → Actions**, configure both repository secrets:

- `CLOUDFLARE_API_TOKEN`: a dedicated least-privilege Cloudflare Workers deploy token. Never commit or print it.
- `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID for the account that will host the Worker.

The deploy job uses GitHub environment `production`; if the environment has approval requirements, an authorized reviewer must approve it. Secrets can also be stored in that environment. Check for organization policies that restrict access.

**Important:** Secrets may be captured when a workflow run is originally queued. Re-running an old failed run can continue to see missing credentials even after you add the secrets. To load newly added repository secrets, trigger a **new** workflow run on `main` (Actions → Verify and deploy 366 Industries Website → Run workflow) instead of only re-running failed jobs.

## Pre-deployment gate

The workflow runs `npm ci`, `npm run build`, and `node --test tests/*.test.mjs` before deploying. The Worker name is `366-industries-website` in `wrangler.jsonc`.

Configure the application runtime environment using Cloudflare secret/variable settings before enabling auth and donation functionality:

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public Supabase project config)
- `SUPABASE_SERVICE_ROLE_KEY` (server-only secret; never expose to the browser)
- `MEMBER_SESSION_SECRET` (strong random string at least 32 characters; the
  existing `ADMIN_SESSION_SECRET` remains an accepted legacy fallback for this
  non-privileged member cookie)

For the Shopify backend, store credentials only in Cloudflare's encrypted
runtime settings—never in source, GitHub issues, build logs, or browser storage:

- `SHOPIFY_SHOP=kefuqu-mv` (the code rejects every other shop)
- Exactly one credential mode: `SHOPIFY_CLIENT_ID` and `SHOPIFY_CLIENT_SECRET`
  for the installed Dev Dashboard app, or a server-side `SHOPIFY_ACCESS_TOKEN`
- `SHOPIFY_API_VERSION=2026-10`
- In access-token mode only, `SHOPIFY_WEBHOOK_SECRET` must contain the same
  Shopify app client/API secret belonging to the app that issued the token; it
  is not an independently generated secret. Client-credentials mode uses
  `SHOPIFY_CLIENT_SECRET` directly. A conflicting override fails closed.

The app needs only `write_products,read_orders`. Verify the connection from the
owner Commerce Studio before creating a draft; the check is read-only and
confirms both `kefuqu-mv.myshopify.com` and shop GID
`gid://shopify/Shop/84267827426`.

Administrator passwords are verified only by Supabase Auth. Do not configure an
`ADMIN_PASSWORD` bypass: a second environment password would remain valid after
the owner completes account recovery.

## Administrator password recovery

The `/admin` sign-in page can request a single-use reset email for the fixed,
verified owner identity `jordilwbailey@gmail.com`. The email returns to
`/admin/reset-password`; the browser validates the recovery session with
Supabase, accepts a 12–128 character password/passphrase, updates the Auth user,
revokes Supabase refresh sessions globally, clears the current website cookies,
and requires a fresh sign-in. Privileged routes revalidate the short-lived,
HttpOnly Supabase access token and require its `session_id` to still exist
through the service-role-only `is_active_owner_session` database function.
Password reset global sign-out removes those sessions immediately. Apply
`supabase/migrations/005_admin_session_guard.sql` before deploying this release.
Apply `006_shopify_webhook_ingest.sql` before enabling order webhooks; it
atomically deduplicates deliveries and rejects older order-state events.

Before production use:

1. In Supabase **Authentication → URL Configuration**, add the exact production
   URL `https://366-industries-website.jordilwbailey.workers.dev/admin/reset-password`
   to the redirect allowlist.
2. If the site later moves to a custom domain, set the server-only variable
   `ADMIN_PASSWORD_RESET_REDIRECT_URL` to that exact HTTPS reset page and add the
   same URL to the Supabase allowlist.
3. Configure production SMTP and enable the password-changed security
   notification in Supabase. The built-in sender is rate-limited and intended
   only for evaluation.
4. Add Cloudflare rate limiting and a Turnstile challenge to the public reset
   request before broad production exposure. The same-origin check and
   Supabase's per-user cooldown are not substitutes for bot-abuse controls.
5. Test one real recovery email without recording its URL, fragment tokens, or
   new password in logs, screenshots, source control, or chat.

Verify that account registration, admin login, data access restrictions, donation persistence, and domain routing work on the deployed Worker. Code compilation alone does not establish production readiness.

## Rollback

Use Cloudflare's deployments dashboard to roll back to the previous healthy Worker version if the deployment fails production smoke checks. Do not expose credential values in GitHub issues, logs, screenshots, or this document.
