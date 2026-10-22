import assert from "node:assert/strict";
import test from "node:test";
import {validateAdminAccessToken} from "../app/admin/auth-core.mjs";
import {
  passwordResetCompletion,
  runPasswordResetRequest,
} from "../app/lib/password-reset-policy.mjs";

const OWNER_EMAIL = "jordilwbailey@gmail.com";
const USER_ID = "11111111-1111-4111-8111-111111111111";
const SESSION_ID = "22222222-2222-4222-8222-222222222222";
const NOW = 2_000_000_000;

function jwt(overrides = {}) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  return `${encode({alg: "HS256", typ: "JWT"})}.${encode({
    sub: USER_ID,
    session_id: SESSION_ID,
    iat: NOW - 10,
    exp: NOW + 3600,
    ...overrides,
  })}.signature`;
}

function validatingFetch({active = true, userId = USER_ID, fail = false} = {}) {
  const calls = [];
  const fetchImpl = async (url, init = {}) => {
    calls.push({url: String(url), init});
    if (fail) throw new Error("network unavailable");
    if (String(url).endsWith("/auth/v1/user")) {
      return Response.json({
        id: userId,
        email: OWNER_EMAIL,
        email_confirmed_at: "2026-01-01T00:00:00Z",
      });
    }
    if (String(url).endsWith("/rest/v1/rpc/is_active_owner_session")) {
      return Response.json(active);
    }
    throw new Error(`Unexpected URL: ${url}`);
  };
  return {calls, fetchImpl};
}

test("valid owner token requires both live user and active Auth session", async () => {
  const mock = validatingFetch();
  const result = await validateAdminAccessToken({
    accessToken: jwt(),
    config: {url: "https://example.supabase.co", anonKey: "anon", serviceRoleKey: "legacy-role"},
    ownerEmail: OWNER_EMAIL,
    fetchImpl: mock.fetchImpl,
    nowSeconds: NOW,
  });
  assert.equal(result, OWNER_EMAIL);
  assert.equal(mock.calls.length, 2);
  const rpc = mock.calls.find((call) => call.url.includes("is_active_owner_session"));
  assert.equal(rpc.init.headers.Authorization, "Bearer legacy-role");
  assert.deepEqual(JSON.parse(rpc.init.body), {
    p_session_id: SESSION_ID,
    p_user_id: USER_ID,
  });
});

test("revoked, mismatched, expired, malformed, and unavailable sessions fail closed", async () => {
  const revoked = validatingFetch({active: false});
  assert.equal(await validateAdminAccessToken({
    accessToken: jwt(), config: {url: "https://example.supabase.co", anonKey: "a", serviceRoleKey: "s"},
    ownerEmail: OWNER_EMAIL, fetchImpl: revoked.fetchImpl, nowSeconds: NOW,
  }), null);

  const mismatch = validatingFetch({userId: "33333333-3333-4333-8333-333333333333"});
  assert.equal(await validateAdminAccessToken({
    accessToken: jwt(), config: {url: "https://example.supabase.co", anonKey: "a", serviceRoleKey: "s"},
    ownerEmail: OWNER_EMAIL, fetchImpl: mismatch.fetchImpl, nowSeconds: NOW,
  }), null);

  let calls = 0;
  const shouldNotFetch = async () => { calls += 1; return Response.json(true); };
  for (const token of ["not-a-jwt", jwt({exp: NOW}), jwt({session_id: "wrong"})]) {
    assert.equal(await validateAdminAccessToken({
      accessToken: token,
      config: {url: "https://example.supabase.co", anonKey: "a", serviceRoleKey: "s"},
      ownerEmail: OWNER_EMAIL, fetchImpl: shouldNotFetch, nowSeconds: NOW,
    }), null);
  }
  assert.equal(calls, 0);

  const outage = validatingFetch({fail: true});
  assert.equal(await validateAdminAccessToken({
    accessToken: jwt(), config: {url: "https://example.supabase.co", anonKey: "a", serviceRoleKey: "s"},
    ownerEmail: OWNER_EMAIL, fetchImpl: outage.fetchImpl, nowSeconds: NOW,
  }), null);
});

test("modern Supabase secret keys are never sent as bearer tokens", async () => {
  const mock = validatingFetch();
  await validateAdminAccessToken({
    accessToken: jwt(),
    config: {url: "https://example.supabase.co", anonKey: "anon", serviceRoleKey: "sb_secret_test"},
    ownerEmail: OWNER_EMAIL,
    fetchImpl: mock.fetchImpl,
    nowSeconds: NOW,
  });
  const rpc = mock.calls.find((call) => call.url.includes("is_active_owner_session"));
  assert.equal(rpc.init.headers.apikey, "sb_secret_test");
  assert.equal("Authorization" in rpc.init.headers, false);
});

test("password reset provider responses are normalized without leaking details", async () => {
  assert.deepEqual(await runPasswordResetRequest(async () => ({error: null})), {
    ok: true,
    status: 202,
    message: "If the owner account is available, a secure reset link has been sent to its verified email address.",
  });
  assert.equal((await runPasswordResetRequest(async () => ({error: {status: 429}}))).status, 429);
  assert.equal((await runPasswordResetRequest(async () => ({error: {status: 400}}))).status, 503);
  assert.equal((await runPasswordResetRequest(async () => { throw new Error("offline"); })).status, 503);
});

test("password reset completion warns unless global sign-out and cookie clearing both succeed", () => {
  assert.equal(passwordResetCompletion(false, true).phase, "complete");
  assert.equal(passwordResetCompletion(true, true).phase, "warning");
  assert.equal(passwordResetCompletion(false, false).phase, "warning");
});
