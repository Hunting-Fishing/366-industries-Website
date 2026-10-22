import { cookies } from "next/headers";
import { ROOT_ADMIN_EMAIL } from "../lib/supabase";

const COOKIE_NAME = "industries_366_admin";
const TOKEN_VERSION = "v2";
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be configured (at least 32 characters).");
  }
  return secret;
}

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return toHex(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value)));
}

export async function createAdminSessionToken() {
  const expiration = Date.now() + SESSION_MS;
  const nonce = crypto.randomUUID();
  const payload = `${TOKEN_VERSION}.${expiration}.${nonce}`;
  return `${payload}.${await sign(payload)}`;
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
  const presented = cookieStore.get(COOKIE_NAME)?.value ?? "";
  const parts = presented.split(".");
  if (parts.length !== 4 || parts[0] !== TOKEN_VERSION) return null;

  const [, expiry, nonce, signature] = parts;
  const expiresAt = Number(expiry);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Date.now() || !/^[0-9a-f-]{36}$/.test(nonce) || !/^[0-9a-f]{64}$/.test(signature)) {
    return null;
  }

  try {
    const expected = await sign(`${TOKEN_VERSION}.${expiry}.${nonce}`);
    return constantTimeEqual(signature, expected) ? ROOT_ADMIN_EMAIL : null;
  } catch {
    // Fail closed if the server signing secret is missing or invalid.
    return null;
  }
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
    maxAge: 60 * 60 * 24 * 7,
  },
};
