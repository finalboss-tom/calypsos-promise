import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { routeContracts } from "../src/release-contract.mjs";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

function escaped(phrase) {
  return new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
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
  assert.match(page, /workstreams 9\.1–9\.7 are validated/i);
  assert.match(page, /workstream 9\.8 is under review/i);
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

test("publishes an inspectable deterministic transition contract through departure", async () => {
  const state = await read("../src/lib/prologue-opening-state.ts");

  for (const phrase of [
    "openingScenes",
    "openingTransitions",
    "openingTransitionTable",
    "getAllowedOpeningTransitions",
    "transitionOpening",
    '"arrival"',
    '"lantern-shore"',
    '"guide-choice"',
    '"synthetic-chronicle"',
    '"synthetic-receipt"',
    '"first-lantern"',
    '"exit-choice"',
    '"future-account"',
    '"complete"',
    '"discard-projection"',
    '"complete-without-account"',
    '"restart-prologue"',
    "lanternShoreReached",
    "draftReviewed",
    "chronicleInspected",
    "receiptInspected",
    "firstLanternCompleted",
    "if (!nextScene || !transitionAllowed(state, transition)) return state",
    'if (transition === "restart-prologue") return initialOpeningState',
  ]) {
    assert.match(state, escaped(phrase));
  }

  assert.doesNotMatch(
    state,
    /localStorage|sessionStorage|indexedDB|document\.cookie/,
  );
});

test("keeps choices explicit, skippable, restartable, and non-punitive", async () => {
  const component = await read("../src/components/prologue-opening.tsx");

  for (const phrase of [
    '"use client"',
    "Begin the opening",
    "Skip directly to Lantern Shore",
    "Replay the arrival",
    "Choose how to continue",
    "Leave the prologue",
    "Restart the prologue",
    "Nothing you choose here is stored",
    "No personal or health information is requested or accepted",
    'role="status"',
    'aria-live="polite"',
    "sceneHeading.current?.focus()",
    "<ol className={styles.progress}",
    'aria-current={step.current ? "step" : undefined}',
    'label: "Departure"',
    "PrologueFirstLanternPanel",
    "PrologueDeparturePanel",
  ]) {
    assert.match(component, escaped(phrase));
  }
});

test("gives deterministic Aster and the manual route one shared rule set", async () => {
  const [component, guidePanel, content] = await Promise.all([
    read("../src/components/prologue-opening.tsx"),
    read("../src/components/prologue-guide-panel.tsx"),
    read("../src/lib/prologue-guide-content.ts"),
  ]);
  const source = `${component}\n${guidePanel}\n${content}`;

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
    "Source before suggestion",
    "Aster cannot confirm itself",
    "Nothing becomes a durable record",
    "The direct path remains complete",
    "same pre-authored synthetic capture choices",
  ]) {
    assert.match(source, escaped(phrase));
  }

  assert.equal((guidePanel.match(/prologueGuideFacts\.map/g) ?? []).length, 1);
});

test("introduces no arbitrary input, persistence, capture API, account endpoint, model, or network path", async () => {
  const files = await Promise.all([
    read("../src/components/prologue-opening.tsx"),
    read("../src/components/prologue-guide-panel.tsx"),
    read("../src/components/prologue-confirmed-projection-entry.tsx"),
    read("../src/components/prologue-chronicle-receipt-panel.tsx"),
    read("../src/components/prologue-first-lantern-panel.tsx"),
    read("../src/components/prologue-departure-panel.tsx"),
    read("../src/app/prologue/page.tsx"),
    read("../src/lib/prologue-opening-state.ts"),
    read("../src/lib/prologue-guide-content.ts"),
    read("../src/lib/prologue-first-lantern.ts"),
  ]);
  const source = files.join("\n");

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
    /NewsletterSignupForm/,
    /openai/i,
    /anthropic/i,
    /modelProvider/i,
  ]) {
    assert.doesNotMatch(source, prohibited);
  }
});

test("provides responsive, reduced-motion, reduced-data, contrast, forced-color, and focus treatment", async () => {
  const css = (
    await Promise.all([
      read("../src/components/prologue-opening.module.css"),
      read("../src/components/prologue-chronicle-receipt-panel.module.css"),
      read("../src/components/prologue-first-lantern-panel.module.css"),
      read("../src/components/prologue-departure-panel.module.css"),
    ])
  ).join("\n");

  for (const pattern of [
    /:focus-visible/,
    /outline-offset/,
    /max-width: 48rem/,
    /prefers-reduced-motion/,
    /prefers-reduced-data/,
    /prefers-contrast/,
    /forced-colors/,
    /\.pathGrid/,
    /\.guideFacts/,
    /\.projectionDetails/,
    /\.completionDetails/,
    /\.details/,
  ]) {
    assert.match(css, pattern);
  }
  assert.doesNotMatch(css, /outline:\s*(?:0(?:\s|;)|none)/i);
});
