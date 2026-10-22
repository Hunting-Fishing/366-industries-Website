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
- `ADMIN_SESSION_SECRET` (strong random string at least 32 characters)
- Optionally `MEMBER_SESSION_SECRET` (separate strong 32+ character string)

Verify that account registration, admin login, data access restrictions, donation persistence, and domain routing work on the deployed Worker. Code compilation alone does not establish production readiness.

## Rollback

Use Cloudflare's deployments dashboard to roll back to the previous healthy Worker version if the deployment fails production smoke checks. Do not expose credential values in GitHub issues, logs, screenshots, or this document.
