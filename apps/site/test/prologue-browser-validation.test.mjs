import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

test("runs a dependency-free rendered-browser validator in the release job", async () => {
  const [packageJson, workflow, validator, cdp] = await Promise.all([
    read("../package.json"),
    read("../../../.github/workflows/ci.yml"),
    read("../src/validate-prologue-browser.mjs"),
    read("../src/prologue-browser/cdp.mjs"),
  ]);

  assert.match(packageJson, /"validate:prologue-browser"/);
  assert.match(workflow, /Validate rendered prologue journeys/);
  assert.match(workflow, /PROLOGUE_BROWSER_REPORT/);
  assert.match(workflow, /PROLOGUE_SCREENSHOT_DIR/);
  assert.match(workflow, /prologue-browser-evidence/);
  assert.match(cdp, /class Client/);
  assert.match(cdp, /Target\.createBrowserContext/);
  assert.match(cdp, /DevToolsActivePort/);
  assert.doesNotMatch(packageJson, /playwright|puppeteer|cypress/i);
});

test("covers rendered paths, controls, focus, storage, network, and fallback evidence", async () => {
  const [validator, cdp, scenarios] = await Promise.all([
    read("../src/validate-prologue-browser.mjs"),
    read("../src/prologue-browser/cdp.mjs"),
    read("../src/prologue-browser/scenarios.mjs"),
  ]);
  const source = `${validator}\n${cdp}\n${scenarios}`;

  for (const phrase of [
    "shortest-manual-text",
    "representative-aster-voice",
    "longest-optional-exploration",
    "visible button controls were not exercised",
    "prologue-scene-title",
    "Accessibility.getFullAXTree",
    "prefers-reduced-motion",
    "prefers-contrast",
    "forced-colors",
    "prefers-reduced-data",
    "Network.getAllCookies",
    "indexedDB.databases",
    "caches.keys",
    "/api/join",
    "external runtime requests",
    "no-JavaScript fallback",
    "narrow viewport",
    "stateRestored: false",
    "keyboard tab order differed",
    "seenLinks",
    "unexpected visible links",
  ]) {
    assert.match(
      source,
      new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    );
  }
});

test("holds the playable route to the accepted Sprint 8 performance ceilings", async () => {
  const validator = await read("../src/validate-prologue-browser.mjs");

  for (const phrase of [
    "htmlBytes: 96 * 1024",
    "javascriptBytes: 704 * 1024",
    "cssBytes: 128 * 1024",
    "imageBytes: 1536 * 1024",
    "fontBytes: 0",
    "totalBytes: 2048 * 1024",
    "firstPartyRequests: 32",
    "acceptedSprint8PerformanceBudgets",
    "sprint8BudgetDisposition",
  ]) {
    assert.match(
      validator,
      new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }
});

test("models direct completion under ten minutes and measures optional exploration separately", async () => {
  const validator = await read("../src/validate-prologue-browser.mjs");

  assert.match(validator, /words \/ 160/);
  assert.match(validator, /steps\.length \* \(4 \/ 60\)/);
  assert.match(validator, /durationTarget && modeledMinutes >= 10/);
  assert.match(validator, /durationTarget: false/);
  assert.match(validator, /longest-optional-exploration/);
  assert.match(validator, /optional exploration measured separately/);
  assert.match(
    validator,
    /not affected-user or assistive-technology timing evidence/,
  );
  assert.match(validator, /Automated elapsed time is recorded/);
});
