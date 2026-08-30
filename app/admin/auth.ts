import { cookies } from "next/headers";

const COOKIE_NAME = "industries_366_admin";
const COOKIE_PAYLOAD = "366-admin-session-v1";

function textBytes(value: string) {
  return new TextEncoder().encode(value);
}

function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export async function createAdminSessionToken() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("Admin session secret is not configured.");

  const key = await crypto.subtle.importKey(
    "raw",
    textBytes(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toHex(await crypto.subtle.sign("HMAC", key, textBytes(COOKIE_PAYLOAD)));
}

export function constantTimeEqual(left: string, right: string) {
  const length = Math.max(left.length, right.length);
  let difference = left.length ^ right.length;
  for (let index = 0; index < length; index += 1) {
    difference |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }
  return difference === 0;
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const presented = cookieStore.get(COOKIE_NAME)?.value ?? "";
  if (!presented) return false;
  return constantTimeEqual(presented, await createAdminSessionToken());
}

export const adminCookie = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "strict" as const,
    path: "/",
    maxAge: 60 * 60 * 8,
  },
};
