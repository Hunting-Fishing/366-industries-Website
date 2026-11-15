# Tiny Worlds — 366 story creator

Routes: /tiny-worlds and /api/tiny-worlds. Integrated with the existing 366 website, not the retired game workspace.

## What ships

- Responsive illustrated storybook studio with three starter ideas, including Cali & Foxy.
- A character name/description and setting create an opening scene with exactly three choices.
- Each next choice or typed idea produces another scene and a Responses API image-generation call.
- Persistent character collection with names, fixed appearance/anatomy, personality and optional uploaded reference images. Select up to four characters and reuse them across new stories.
- Browser IndexedDB bookshelf with every chapter and image, character cards, export, and restart that keeps previous books.
- Text checkpoint saved before illustration completes; retry an illustration without rewriting its scene.
- Real writing/painting progress, stop action, explicit errors and disabled duplicate submissions.

## Server configuration

Use existing approved credentials when available. Never put an API key in a NEXT_PUBLIC variable, source file, browser storage, or GitHub commit.

Runtime secrets (Cloudflare Worker or Sites environment):
- OPENAI_API_KEY: OpenAI project key with Responses/image access.
- TINY_WORLDS_SESSION_SECRET: at least 32 random characters. Falls back to the existing MEMBER_SESSION_SECRET or ADMIN_SESSION_SECRET.
Optional server variables:
- TINY_WORLDS_MODEL: defaults to gpt-5.4-mini.
- TINY_WORLDS_IMAGE_MODEL: defaults to gpt-image-2.5-flare.

The existing signed 366 member/admin session authenticates generation. Configure the existing 366 authentication separately if it is not already working. The page can be viewed without signing in; paid generation requires a verified server session. No arbitrary browser-provided identity or role is trusted.

For local work use an ignored .env.local. Supply equivalent runtime secrets through the host's secure settings for deployment. The status endpoint returns booleans only. The route remains unavailable for generation until credentials and a signing secret are present.

## Continuity

The server signs a 30-day bookmark bound to the authenticated account. It stores canonical character details, setting/style, a cumulative story summary and the latest three scenes. The full book stays in IndexedDB on this browser. The bounded recent window plus cumulative summary supports ongoing stories without sending an ever-growing transcript. No OpenAI response IDs are accepted from the browser; every Responses request has store:false and explicitly reconstructed context.

Each image request includes the fixed character descriptions, supplied reference images and, after the opening, the original story illustration. Reference hashes are locked in the signed bookmark. First-scene artwork is saved as the default reference for new characters without an uploaded picture. A new adventure can reuse those saved profiles and references.

Image models can still drift. Reference images and fixed descriptions improve continuity; they do not guarantee identical pixels or anatomy in every output. Add a clear individual character reference for the strongest control. Cali's starter expressly preserves the missing rear-left leg and prohibits a nub or extra leg.

## Storage and operational limits

This release stores books and cast on the current browser, not in a shared account database. Clearing browser data removes those copies. Exports include text, images, character cards and bookmarks; treat them as private. Server bookmarks expire after 30 days of inactivity; a new adventure can retain the same characters.

The API accepts up to four character references, validates raster data URLs, bounds request bytes, and only sends requests to the fixed OpenAI Responses endpoint. Same-origin POSTs, verified signed sessions, bounded output tokens, abort/timeouts and an isolate-local hourly/concurrency guard reduce accidental repeat spending. For a large public release, add a durable account quota/rate limiter at Cloudflare or in the existing database. The in-memory guard is not a global quota across Worker isolates or restarts.

No OpenAI credential is available in the authoring environment as of 2026-11-15. Automated tests use an explicit mocked Responses transport; they do not prove live account/model access. Connect the server secret and verify two real scenes plus one returning-character adventure before marking generation live.

## Validation

Run:
    node --test tests/tiny-worlds.test.mjs
    npm run build

The existing GitHub Actions verification also runs tests/*.test.mjs.

Tests cover signed bookmark tampering/ownership/expiry, input bounds, canonical anatomy and story memory, exact choices, Responses image tool selection, reference anchoring, eight-turn continuation, refusals/incomplete output, and retrying image failure without rewriting.

## Official API guidance checked 2026-11-15

- https://developers.openai.com/api/docs/guides/tools-image-generation
- https://developers.openai.com/api/docs/guides/structured-outputs

Structured scenes use Responses text.format JSON Schema with strict:true. Illustration uses a separate Responses request with tool_choice:image_generation, a stable hashed safety_identifier, and input_image reference content. Both text and image errors are handled without exposing upstream credentials or raw error bodies.
