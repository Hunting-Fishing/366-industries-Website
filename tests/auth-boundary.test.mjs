import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("security-tests", String(Date.now()));
const { default: worker } = await import(workerUrl.href);

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};
const ctx = { waitUntil() {}, passThroughOnException() {} };
const adminAuthSource = await readFile(
  new URL("../app/admin/auth.ts", import.meta.url),
  "utf8"
);

async function request(path, headers = {}) {
  return worker.fetch(new Request(`http://localhost${path}`, { headers }), env, ctx);
}

test("anonymous requests cannot list or modify users", async () => {
  const response = await request("/api/admin/users");
  assert.equal(response.status, 401);
});

test("forged unsigned member role cookie cannot access admin data", async () => {
  const forged = encodeURIComponent(JSON.stringify({
    email: "jordilwbailey@gmail.com",
    role: "admin",
  }));
  const response = await request("/api/admin/users", {
    cookie: `industries_366_member=${forged}`,
  });
  assert.equal(response.status, 401);
});

test("forged unsigned member cookie is not a valid login", async () => {
  const forged = encodeURIComponent(JSON.stringify({
    email: "jordilwbailey@gmail.com",
    role: "admin",
  }));
  const response = await request("/api/auth/session", {
    cookie: `industries_366_member=${forged}`,
  });
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.authenticated, false);
  assert.equal(result.user, null);
});


test("anonymous requests cannot list private Commerce OS products", async () => {
  const response = await request("/api/admin/commerce");
  assert.equal(response.status, 401);
});

test("anonymous requests cannot probe Shopify credentials or store identity", async () => {
  const response = await request("/api/admin/shopify/status");
  assert.equal(response.status, 401);
  assert.equal(response.headers.get("cache-control"), "no-store, max-age=0");
});

test("forged unsigned owner cookie cannot access Commerce OS", async () => {
  const cookie = encodeURIComponent(JSON.stringify({
    email:"jordilwbailey@gmail.com",role:"admin",
  }));
  const response = await request("/api/admin/commerce", {
    cookie: `industries_366_member=${cookie}`,
  });
  assert.equal(response.status, 401);
});

test("unauthenticated visitors cannot write catalog products", async () => {
  const response = await worker.fetch(new Request("http://localhost/api/admin/commerce", {
    method:"POST",
    headers: {"content-type":"application/json","origin":"http://localhost"},
    body: JSON.stringify({action:"create",kind:"digital",title:"Test Product",price:9}),
  }), env, ctx);
  assert.equal(response.status, 401);
});

test("anonymous browsers are redirected from the owner Commerce Studio", async () => {
  const response = await request("/admin/commerce");
  assert.ok([302,303,307,308].includes(response.status));
  assert.match(response.headers.get("location") || "", /\/admin$/);
});


test("Jordi private tracking API requires signed owner admin session", async () => {
  const response=await request("/api/admin/jordi-workspace");
  assert.equal(response.status,401);
});
test("forged owner email cannot access Jordi personal tracking area", async () => {
  const member=encodeURIComponent(JSON.stringify({
    email:"jordilwbailey@gmail.com",role:"admin",
  }));
  const response=await request("/api/admin/jordi-workspace", {
    cookie:`industries_366_member=${member}`,
  });
  assert.equal(response.status,401);
});
test("anonymous visitors cannot open Jordi Shopify & Promotions page", async () => {
  const response=await request("/admin/jordi-shopify-promotions");
  assert.ok([302,303,307,308].includes(response.status));
  assert.match(response.headers.get("location")||"", /\/admin(?:\?|$)/);
});
test("public writes cannot create promotions or personal tasks", async () => {
  const response=await worker.fetch(new Request("http://localhost/api/admin/jordi-workspace",{
    method:"POST",headers:{"content-type":"application/json","origin":"http://localhost"},
    body:JSON.stringify({recordType:"task",title:"Malicious task",area:"marketing",priority:"normal"}),
  }),env,ctx);
  assert.equal(response.status,401);
});

test("password recovery rejects cross-origin requests", async () => {
  const response = await worker.fetch(new Request(
    "http://localhost/api/admin/password-reset/request",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://attacker.example",
      },
      body: "{}",
    }
  ), env, ctx);
  assert.equal(response.status, 403);
  assert.equal(response.headers.get("cache-control"), "no-store, max-age=0");
});

test("password recovery fails closed when Supabase Auth is not configured", async () => {
  const response = await worker.fetch(new Request(
    "http://localhost/api/admin/password-reset/request",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "http://localhost",
      },
      body: "{}",
    }
  ), env, ctx);
  assert.equal(response.status, 503);
  const result = await response.json();
  assert.equal(result.ok, false);
  assert.doesNotMatch(JSON.stringify(result), /jordilwbailey|supabase\.co|token/i);
});

test("password reset landing page is public but not indexable", async () => {
  const response = await request("/admin/reset-password");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Set a new owner password/i);
  assert.match(html, /noindex, nofollow/i);
  assert.doesNotMatch(html, /service_role|SHOPIFY_CLIENT_SECRET|ADMIN_SESSION_SECRET/);
});

test("privileged cookies require a live Supabase Auth session", () => {
  assert.match(adminAuthSource, /validateAdminAccessToken/);
  assert.match(adminAuthSource, /accessToken/);
  assert.doesNotMatch(adminAuthSource, /ADMIN_PASSWORD/);
});
