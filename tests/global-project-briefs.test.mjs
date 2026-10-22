import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

async function source(relative) {
  return readFile(new URL(`../${relative}`, import.meta.url), "utf8");
}

test("homepage uses global humanitarian safety language rather than named jurisdictions", async () => {
  const [home, chrome] = await Promise.all([source("app/page.tsx"), source("app/components.tsx")]);
  assert.match(home, /GLOBAL HUMANITARIAN EFFORTS FOR SAFETY/);
  assert.match(chrome, /Global Humanitarian Efforts for Safety/);
  assert.doesNotMatch(home, /100% Audit-Ready Entities|We check every box across three countries/);
  assert.doesNotMatch(chrome, /Canada \(BC: 1st Defence Industries\)/);
  assert.match(home, /homeVentureName\(v\.slug, v\.name\)/);
});

test("all four homepage images link to existing focus pages", async () => {
  const home = await source("app/page.tsx");
  for (const url of ["/water", "/humanity/coastal-safety", "/humanity/disaster-response-drones", "/ai-designer"]) {
    assert.ok(home.includes(`href: "${url}"`), `missing ${url}`);
  }
  assert.match(home, /className="hero-showcase-card"/);
  assert.match(home, /Explore mission &amp; funding details/);
  for (const hashUrl of [
    "/water#project-brief",
    "/humanity/coastal-safety#project-brief",
    "/humanity/disaster-response-drones#project-brief",
  ]) assert.ok(home.includes(hashUrl), `missing direct deep link ${hashUrl}`);
});

test("each project has accessible briefing panels with responsible funding disclosures", async () => {
  const [data, component] = await Promise.all([
    source("app/project-brief-data.ts"),
    source("app/project-brief-tabs.tsx"),
  ]);
  for (const project of ["water", "coastal", "rescue", "ai"]) {
    assert.ok(data.includes(`${project}: {`), `missing ${project} briefing`);
  }
  for (const panel of ["overview", "delivery", "funding", "evidence", "governance"]) {
    assert.match(data, new RegExp(`id: "${panel}"`));
  }
  assert.match(component, /role="tablist"/);
  assert.match(component, /aria-selected=/);
  assert.match(component, /role="tabpanel"/);
  assert.match(component, /onTabKeyDown/);
  assert.match(component, /not completed deployments or promised returns/);
});

test("mission, water, and AI pages embed the project dossier", async () => {
  const [water, mission, ai] = await Promise.all([
    source("app/ventures/[slug]/page.tsx"),
    source("app/humanity/[slug]/page.tsx"),
    source("app/ai-designer/page.tsx"),
  ]);
  assert.match(water, /<ProjectBriefTabs project="water"/);
  for (const project of ["water", "coastal", "rescue"]) {
    assert.ok(mission.includes(`<ProjectBriefTabs project="${project}"`));
  }
  assert.match(ai, /<ProjectBriefTabs project="ai"/);
});
