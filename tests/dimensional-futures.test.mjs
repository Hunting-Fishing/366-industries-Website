import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(relative) {
  return readFile(new URL(`../${relative}`, import.meta.url), "utf8");
}

test("Dimensional Futures is a visible 366 Industries brand section", async () => {
  const [page, data, home, chrome, ventures] = await Promise.all([
    source("app/dimensional-futures/page.tsx"),
    source("app/dimensional-futures/brand-data.ts"),
    source("app/page.tsx"),
    source("app/components.tsx"),
    source("app/site-data.ts"),
  ]);

  assert.match(page, /dimensionalFutures\.parentBrand/);
  assert.match(page, /No Dimensional Futures products are currently offered for sale/);
  assert.match(data, /parentBrand: "A 366 Industries brand"/);
  assert.match(data, /More Ways Forward\./);
  assert.match(data, /Shared Futures/);
  assert.match(data, /Many Minds/);
  assert.match(data, /Different View/);
  assert.match(data, /Access Forward/);
  assert.match(home, /DimensionalFuturesFeature/);
  assert.match(chrome, /href="\/dimensional-futures"/);
  assert.match(ventures, /slug: "dimensional-futures"/);
  assert.match(ventures, /href: "\/dimensional-futures"/);
});

test("brand copy keeps accessibility and commerce claims responsible", async () => {
  const [page, data] = await Promise.all([
    source("app/dimensional-futures/page.tsx"),
    source("app/dimensional-futures/brand-data.ts"),
  ]);
  const combined = `${page}\n${data}`;

  assert.match(combined, /Never a\s+diagnostic test/);
  assert.match(combined, /Never rely on color alone/);
  assert.match(combined, /paid community review/i);
  assert.match(combined, /Not selected/);
  assert.match(combined, /Not set/);
  assert.doesNotMatch(combined, /Shop now|Add to cart|Buy now|sensory safe/i);
  assert.doesNotMatch(combined, /only (?:the )?colorblind (?:can|will) see/i);
  assert.doesNotMatch(combined, /\$\d+(?:\.\d{2})?/);
});

test("renders the Dimensional Futures page from the built Worker", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("dimensional-futures-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/dimensional-futures", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Dimensional Futures/);
  assert.match(html, /A 366 Industries brand/);
  assert.match(html, /Concept · not yet for sale/);
});
