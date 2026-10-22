import assert from "node:assert/strict";
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
