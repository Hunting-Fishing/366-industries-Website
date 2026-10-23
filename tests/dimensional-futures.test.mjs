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
  const [page, data, catalog] = await Promise.all([
    source("app/dimensional-futures/page.tsx"),
    source("app/dimensional-futures/brand-data.ts"),
    source("app/dimensional-futures/concept-catalog.tsx"),
  ]);
  const combined = `${page}\n${data}\n${catalog}`;

  assert.match(combined, /Never a\s+diagnostic test/);
  assert.match(combined, /Never rely on color alone/);
  assert.match(combined, /paid community review/i);
  assert.match(combined, /Not selected/);
  assert.match(combined, /Not set/);
  assert.doesNotMatch(combined, /Shop now|Add to cart|Buy now|sensory safe/i);
  assert.doesNotMatch(combined, /only (?:the )?colorblind (?:can|will) see/i);
  assert.doesNotMatch(combined, /\$\d+(?:\.\d{2})?/);
});

test("concept catalog behaves like a store without pretending products are ready", async () => {
  const [catalog, data, chrome] = await Promise.all([
    source("app/dimensional-futures/concept-catalog.tsx"),
    source("app/dimensional-futures/brand-data.ts"),
    source("app/components.tsx"),
  ]);

  const conceptRecords = data.match(/export const launchConcepts = \[([\s\S]*?)\] as const/);
  assert.ok(conceptRecords);
  assert.equal((conceptRecords[1].match(/status: "Concept · not for sale"/g) ?? []).length, 8);
  assert.match(catalog, /aria-label="Filter concept catalog"/);
  assert.match(catalog, />Search concepts</);
  assert.match(catalog, />Sort concepts</);
  assert.match(catalog, /aria-pressed=/);
  assert.match(catalog, /aria-live="polite"/);
  assert.match(catalog, /<details/);
  assert.match(catalog, /View concept details/);
  assert.match(catalog, /for \{concept\.name\}/);
  assert.match(catalog, /className=\{styles\.visualDisclosure\}/);
  assert.match(catalog, /No ordering, payment, or checkout is available/);
  assert.doesNotMatch(catalog, /fetch\(|shopify|storefront api/i);
  assert.match(chrome, /className="skip-link" href="#main-content"/);
  assert.match(chrome, /id="main-content"/);
  assert.match(chrome, /aria-controls="main-navigation"/);
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
  assert.match(html, /Concept · not for sale/);
  assert.match(html, /Search concepts/);
  assert.match(html, /View concept details/);
});
