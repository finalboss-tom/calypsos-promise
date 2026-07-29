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
  assert.match(page, /workstream 9\.3 is under review/i);
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

test("implements deterministic arrival, shore, and guide transitions", async () => {
  const state = await read("../src/lib/prologue-opening-state.ts");

  for (const phrase of [
    '"arrival"',
    '"lantern-shore"',
    '"guide-choice"',
    '"aster-introduction"',
    '"manual-introduction"',
    '"begin-opening"',
    '"skip-opening"',
    '"replay-arrival"',
    '"continue-to-guide"',
    '"choose-aster"',
    '"choose-manual"',
    '"switch-to-aster"',
    '"switch-to-manual"',
    "presentationPath",
    "transitionTable",
    "if (!nextScene) return state",
  ]) {
    assert.match(
      state,
      new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
  }

  assert.doesNotMatch(
    state,
    /localStorage|sessionStorage|indexedDB|document\.cookie/,
  );
});

test("keeps opening choices explicit, skippable, and non-punitive", async () => {
  const component = await read("../src/components/prologue-opening.tsx");

  for (const phrase of [
    '"use client"',
    "Begin the opening",
    "Skip directly to Lantern Shore",
    "Replay the arrival",
    "Choose how to continue",
    "Leave the prologue",
    "Nothing you choose here is stored",
    "No personal or health information is requested or accepted",
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

test("gives deterministic Aster and the manual route one shared rule set", async () => {
  const [component, content] = await Promise.all([
    read("../src/components/prologue-opening.tsx"),
    read("../src/lib/prologue-guide-content.ts"),
  ]);
  const source = `${component}\n${content}`;

  for (const phrase of [
    "Two presentations. One set of rules.",
    "Continue with Aster",
    "Continue without Aster",
    "Switch to the direct guide",
    "Switch to Aster framing",
    "Reconsider the guide choice",
    "Aster can guide the presentation, not the truth.",
    "The direct guide keeps every control in view.",
    "prologueGuideFacts.map",
    "I cannot create truth, permission, or completion on my own",
  ]) {
    assert.match(
      source,
      new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    );
  }

  assert.equal((component.match(/prologueGuideFacts\.map/g) ?? []).length, 1);

  for (const phrase of [
    "Source before suggestion",
    "Aster cannot confirm itself",
    "Nothing becomes a durable record",
    "The direct path remains complete",
    "Deterministic scripted guide",
    "Direct manual guide",
    "No model",
    "same sources",
    "same facts",
    "same pre-authored synthetic capture choices",
  ]) {
    assert.match(
      source,
      new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    );
  }
});

test("introduces no arbitrary input, persistence, capture API, model, or network path", async () => {
  const [component, page, state, guideContent] = await Promise.all([
    read("../src/components/prologue-opening.tsx"),
    read("../src/app/prologue/page.tsx"),
    read("../src/lib/prologue-opening-state.ts"),
    read("../src/lib/prologue-guide-content.ts"),
  ]);
  const source = `${component}\n${page}\n${state}\n${guideContent}`;

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
    /openai/i,
    /anthropic/i,
    /modelProvider/i,
  ]) {
    assert.doesNotMatch(source, prohibited);
  }
});

test("provides responsive, reduced-data, contrast, forced-color, and focus treatment", async () => {
  const css = await read("../src/components/prologue-opening.module.css");

  assert.match(css, /:focus-visible/);
  assert.match(css, /outline-offset/);
  assert.match(css, /max-width: 48rem/);
  assert.match(css, /prefers-reduced-data/);
  assert.match(css, /prefers-contrast/);
  assert.match(css, /forced-colors/);
  assert.match(css, /\.pathGrid/);
  assert.match(css, /\.guideFacts/);
  assert.doesNotMatch(css, /outline:\s*(?:0(?:\s|;)|none)/i);
});
