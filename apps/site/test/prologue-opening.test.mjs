import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { routeContracts } from "../src/release-contract.mjs";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

test("keeps the prologue branch-only, noindex, and outside public navigation", async () => {
  const [page, navigation, sitemap] = await Promise.all([
    read("../src/app/prologue/page.tsx"),
    read("../src/lib/navigation.ts"),
    read("../src/app/sitemap.ts"),
  ]);
  const contract = routeContracts.find((route) => route.path === "/prologue");

  assert.ok(contract);
  assert.equal(contract.title, "Public Synthetic Prologue");
  assert.equal(contract.noindex, true);
  assert.equal(contract.sitemap, false);
  assert.match(page, /canonical: "\/prologue"/);
  assert.match(page, /index: false/);
  assert.match(page, /follow: false/);
  assert.match(page, /Workstream 9\.2 is under review/);
  assert.doesNotMatch(navigation, /href: "\/prologue"/);
  assert.doesNotMatch(sitemap, /\/prologue/);
});

test("renders a server-owned route with a no-JavaScript explanation", async () => {
  const page = await read("../src/app/prologue/page.tsx");

  assert.doesNotMatch(page, /^["']use client["'];/m);
  assert.match(page, /<h1>/);
  assert.match(page, /<noscript>/);
  assert.match(page, /The interactive opening needs JavaScript/);
  assert.match(page, /No information has been collected or stored/);
  assert.match(page, /PrologueOpening/);
  assert.match(page, /Return to the public site/);
});

test("implements deterministic arrival and Lantern Shore transitions", async () => {
  const state = await read("../src/lib/prologue-opening-state.ts");

  for (const phrase of [
    '"arrival"',
    '"lantern-shore"',
    '"begin-opening"',
    '"skip-opening"',
    '"replay-arrival"',
    "transitionTable",
    "if (!nextScene) return state",
  ]) {
    assert.match(state, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.doesNotMatch(state, /localStorage|sessionStorage|indexedDB|document\.cookie/);
});

test("keeps opening choices explicit, skippable, and non-punitive", async () => {
  const component = await read("../src/components/prologue-opening.tsx");

  for (const phrase of [
    '"use client"',
    "Begin the opening",
    "Skip directly to Lantern Shore",
    "Replay the arrival",
    "Read the direct explanation",
    "Leave the prologue",
    "Nothing you choose here is stored",
    "No personal or health information is requested or accepted",
    "Aster and the manual fallback arrive in workstream 9.3",
    'role="status"',
    'aria-live="polite"',
    "sceneHeading.current?.focus()",
  ]) {
    assert.match(
      component,
      new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    );
  }
});

test("introduces no arbitrary input, persistence, capture API, or network path", async () => {
  const [component, page, state] = await Promise.all([
    read("../src/components/prologue-opening.tsx"),
    read("../src/app/prologue/page.tsx"),
    read("../src/lib/prologue-opening-state.ts"),
  ]);
  const source = `${component}\n${page}\n${state}`;

  for (const prohibited of [
    /<input\b/i,
    /<textarea\b/i,
    /contentEditable/i,
    /type=["']file["']/i,
    /navigator\.mediaDevices/,
    /getUserMedia/,
    /geolocation/,
    /localStorage/,
    /sessionStorage/,
    /indexedDB/,
    /document\.cookie/,
    /fetch\(/,
    /XMLHttpRequest/,
    /WebSocket/,
    /EventSource/,
    /\/api\/join/,
  ]) {
    assert.doesNotMatch(source, prohibited);
  }
});

test("provides reduced-data, contrast, forced-color, and focus treatment", async () => {
  const css = await read("../src/components/prologue-opening.module.css");

  assert.match(css, /:focus-visible/);
  assert.match(css, /outline-offset/);
  assert.match(css, /prefers-reduced-data/);
  assert.match(css, /prefers-contrast/);
  assert.match(css, /forced-colors/);
  assert.doesNotMatch(css, /outline:\s*(?:0|none)/i);
});
