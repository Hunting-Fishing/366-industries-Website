import type { MemberSession } from "../api/auth/session/route";
import { constantTimeEqual } from "../admin/auth";

// Member cookies are identity credentials, not user-editable JSON.
const MEMBER_SESSION_MS = 7 * 24 * 60 * 60 * 1000;

function sessionSecret() {
  const secret = process.env.MEMBER_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("MEMBER_SESSION_SECRET (or ADMIN_SESSION_SECRET) must be at least 32 characters.");
  }
  return secret;
}

function encodeUtf8(value: string) {
  const bytes = new TextEncoder().encode(value);
  return btoa(Array.from(bytes, (b) => String.fromCharCode(b)).join(""))
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeUtf8(value: string) {
  const b64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function signature(payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(sessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signed = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return Array.from(new Uint8Array(signed), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function issueMemberSession(user: MemberSession) {
  const payload = encodeUtf8(JSON.stringify({ user, expiresAt: Date.now() + MEMBER_SESSION_MS }));
  return `${payload}.${await signature(payload)}`;
}

export async function verifyMemberSession(token: string | undefined): Promise<MemberSession | null> {
  if (!token) return null;
  const pieces = token.split(".");
  if (pieces.length !== 2 || !/^[A-Za-z0-9_-]+$/.test(pieces[0]) || !/^[0-9a-f]{64}$/.test(pieces[1])) return null;
  try {
    const expected = await signature(pieces[0]);
    if (!constantTimeEqual(expected, pieces[1])) return null;
    const parsed = JSON.parse(decodeUtf8(pieces[0])) as { user?: MemberSession; expiresAt?: number };
    if (typeof parsed.expiresAt !== "number" || parsed.expiresAt <= Date.now() || !parsed.user?.email) return null;
    return parsed.user;
  } catch {
    return null;
  }
}
