import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import {
  getSupabaseConfig,
  ROOT_ADMIN_EMAIL,
} from "../../../../lib/supabase";
import {runPasswordResetRequest} from "../../../../lib/password-reset-policy.mjs";

export const dynamic = "force-dynamic";

const DEFAULT_RESET_URL =
  "https://366-industries-website.jordilwbailey.workers.dev/admin/reset-password";
function noStoreJson(
  body: Record<string, unknown>,
  status: number,
  extraHeaders: Record<string, string> = {}
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Referrer-Policy": "no-referrer",
      ...extraHeaders,
    },
  });
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return Boolean(origin && origin === new URL(request.url).origin);
}

function resetRedirectUrl() {
  const configured =
    process.env.ADMIN_PASSWORD_RESET_REDIRECT_URL || DEFAULT_RESET_URL;
  const url = new URL(configured);
  const isLocal = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  if ((url.protocol !== "https:" && !isLocal) || url.username || url.password) {
    throw new Error("Invalid password reset redirect URL.");
  }
  url.pathname = "/admin/reset-password";
  url.search = "";
  url.hash = "";
  return url.toString();
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return noStoreJson({ ok: false, message: "Cross-origin request blocked." }, 403);
  }

  const config = getSupabaseConfig();
  if (!config) {
    return noStoreJson(
      { ok: false, message: "Password recovery is temporarily unavailable." },
      503
    );
  }

  let redirectTo: string;
  try {
    redirectTo = resetRedirectUrl();
  } catch {
    return noStoreJson(
      { ok: false, message: "Password recovery is temporarily unavailable." },
      503
    );
  }

  const result = await runPasswordResetRequest(async () => {
    const supabase = createClient(config.url, config.anonKey, {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        flowType: "implicit",
        persistSession: false,
      },
    });
    return supabase.auth.resetPasswordForEmail(
      ROOT_ADMIN_EMAIL,
      { redirectTo }
    );
  });

  // Deliberately do not reveal account state or provider details. No caller
  // input is forwarded to Supabase.
  return noStoreJson(
    {ok: result.ok, message: result.message},
    result.status,
    result.retryAfter ? {"Retry-After": result.retryAfter} : {}
  );
}
