import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("daylight theme is loaded last and preserves white canvas", async () => {
  const [layout, css] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/light-theme.css", import.meta.url), "utf8"),
  ]);
  const legacyIndex = layout.indexOf('import "./salt.css"');
  const themeIndex = layout.indexOf('import "./light-theme.css"');
  assert.ok(legacyIndex >= 0 && themeIndex > legacyIndex, "theme must override legacy styles");
  assert.match(css, /--void:\s*#ffffff/i);
  assert.match(css, /--ivory:\s*#142f46/i);
  assert.match(css, /color-scheme:\s*light/);
  for (const selector of [
    ".home-hero-modern",
    ".header-wrapper",
    ".hero-showcase-card",
    ".pledge-banner-card",
    ".donate-builder-card",
    ".auth-card",
    ".footer",
  ]) {
    assert.ok(css.includes(selector), `missing light treatment for ${selector}`);
  }
});
