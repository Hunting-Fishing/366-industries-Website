import "server-only";
import { cookies } from "next/headers";
import {
  getSupabaseConfig,
  ROOT_ADMIN_EMAIL,
} from "../lib/supabase";
import {
  accessTokenClaims,
  validLiveAccessTokenClaims,
  validateAdminAccessToken,
} from "./auth-core.mjs";

const COOKIE_NAME = "industries_366_admin";
// Supabase access tokens normally last one hour. Expire the browser cookie a
// little earlier and revalidate it with Auth on every privileged request.
const SESSION_SECONDS = 55 * 60;

export async function createAdminSessionToken(accessToken: string) {
  const claims = accessTokenClaims(accessToken);
  if (!validLiveAccessTokenClaims(claims)) {
    throw new Error("Supabase administrator session is invalid or expired.");
  }
  return accessToken;
}

export function constantTimeEqual(left: string, right: string) {
  const length = Math.max(left.length, right.length);
  let difference = left.length ^ right.length;
  for (let index = 0; index < length; index += 1) {
    difference |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }
  return difference === 0;
}

export async function getAuthenticatedAdminEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_NAME)?.value ?? "";
  const config = getSupabaseConfig();
  // Live Auth validation plus the session RPC fail closed when either service
  // is unavailable and revoke password-reset sessions immediately.
  return validateAdminAccessToken({
    accessToken,
    config,
    ownerEmail: ROOT_ADMIN_EMAIL,
  });
}

export async function isAdminAuthenticated() {
  return Boolean(await getAuthenticatedAdminEmail());
}

export const adminCookie = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_SECONDS,
  },
};
