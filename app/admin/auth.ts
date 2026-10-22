import { cookies } from "next/headers";
import { isAdminEmail, ROOT_ADMIN_EMAIL } from "../lib/supabase";

const COOKIE_NAME = "industries_366_admin";
const MEMBER_COOKIE_NAME = "industries_366_member";
const COOKIE_PAYLOAD = "366-admin-session-v1";
const DEFAULT_FALLBACK_SECRET = "366-default-admin-session-secret-key-2026";

function textBytes(value: string) {
  return new TextEncoder().encode(value);
}

function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}

export async function createAdminSessionToken() {
  const secret = process.env.ADMIN_SESSION_SECRET || DEFAULT_FALLBACK_SECRET;

  const key = await crypto.subtle.importKey(
    "raw",
    textBytes(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return toHex(
    await crypto.subtle.sign("HMAC", key, textBytes(COOKIE_PAYLOAD))
  );
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

  // 1. Check member session cookie for Jordilwbailey@gmail.com or role === 'admin'
  const memberRaw = cookieStore.get(MEMBER_COOKIE_NAME)?.value;
  if (memberRaw) {
    try {
      const parsed = JSON.parse(decodeURIComponent(memberRaw)) as {
        email?: string;
        role?: string;
      };
      if (isAdminEmail(parsed.email) || parsed.role === "admin") {
        return parsed.email?.toLowerCase() || ROOT_ADMIN_EMAIL;
      }
    } catch {
      // ignore malformed cookie
    }
  }

  // 2. Check dedicated admin cookie
  const presented = cookieStore.get(COOKIE_NAME)?.value ?? "";
  if (presented) {
    try {
      const expectedToken = await createAdminSessionToken();
      if (constantTimeEqual(presented, expectedToken)) {
        return ROOT_ADMIN_EMAIL;
      }
    } catch {
      // ignore
    }
  }

  return null;
}

export async function isAdminAuthenticated() {
  const email = await getAuthenticatedAdminEmail();
  return Boolean(email);
}

export const adminCookie = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  },
};
