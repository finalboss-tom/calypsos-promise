import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

function escaped(phrase) {
  return new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}

test("references the accepted House of Keys contract and synthetic fixture", async () => {
  const [projection, version, types, fixtures] = await Promise.all([
    read("../src/lib/prologue-synthetic-projections.ts"),
    read("../../../packages/house-of-keys/src/version.ts"),
    read("../../../packages/house-of-keys/src/types.ts"),
    read("../../../packages/house-of-keys/src/fixtures.ts"),
  ]);

  assert.match(version, /HOUSE_OF_KEYS_CONTRACT_VERSION = "0\.1\.0-pre\.1"/);
  assert.match(types, /export interface AccessReceipt/);
  assert.match(fixtures, /id: "receipt\.personal-export\.synthetic"/);
  assert.match(projection, /contractVersion: "0\.1\.0-pre\.1"/);
  assert.match(projection, /contractShapeReference: "AccessReceipt"/);
  assert.match(
    projection,
    /acceptedFixtureId: "receipt\.personal-export\.synthetic"/,
  );
});

test("projects Chronicle-shaped state only after explicit confirmation", async () => {
  const [state, projection] = await Promise.all([
    read("../src/lib/prologue-opening-state.ts"),
    read("../src/lib/prologue-synthetic-projections.ts"),
  ]);

  for (const phrase of [
    '"synthetic-chronicle"',
    '"synthetic-receipt"',
    '"view-synthetic-chronicle"',
    '"view-synthetic-receipt"',
    '"return-to-chronicle"',
    '"discard-projection"',
    "!state.confirmed || !state.fixtureId || !state.correctionId",
    "temporary-page-memory-only",
    "visitor-confirmed-synthetic-demonstration",
    'persistence: "none"',
    "explicit-or-navigation-destroys-projection",
  ]) {
    assert.match(`${state}\n${projection}`, escaped(phrase));
  }

  assert.match(
    state,
    /transition === "view-synthetic-chronicle"[\s\S]*!state\.confirmed/,
  );
  assert.match(state, /transition === "review-confirmed-entry"[\s\S]*return false/);
  assert.match(state, /transition === "discard-projection"[\s\S]*return null/);
});

test("keeps the Chronicle view visibly temporary, correctable, and discardable", async () => {
  const [entry, panel, projection] = await Promise.all([
    read("../src/components/prologue-confirmed-projection-entry.tsx"),
    read("../src/components/prologue-chronicle-receipt-panel.tsx"),
    read("../src/lib/prologue-synthetic-projections.ts"),
  ]);
  const source = `${entry}\n${panel}\n${projection}`;

  for (const phrase of [
    "Temporary synthetic Chronicle projection",
    "This looks like a Chronicle entry. It is not stored as one.",
    "Page memory only",
    "Not stored",
    "Original synthetic value",
    "Correction state",
    "Confirmation",
    "Persistence",
    "Discard behavior",
    "Review or correct the synthetic entry",
    "Discard the temporary projection",
    "This is a temporary UI projection, not a Living Chronicle record.",
  ]) {
    assert.match(source, escaped(phrase));
  }
});

test("renders a receipt-shaped explanation without permission or release authority", async () => {
  const [panel, projection] = await Promise.all([
    read("../src/components/prologue-chronicle-receipt-panel.tsx"),
    read("../src/lib/prologue-synthetic-projections.ts"),
  ]);
  const source = `${panel}\n${projection}`;

  for (const phrase of [
    "House of Keys receipt-shaped demonstration",
    "This explains receipt fields. It grants no permission.",
    "illustrative-non-contract-record",
    'decisionOutcome: "not-evaluated"',
    'executionState: "not-applicable"',
    "dataReleaseBoundaryCrossed: false",
    "grantReferences: Object.freeze([])",
    "demo.no-policy-evaluation",
    "demo.no-grant",
    "demo.no-data-release",
    "No real subject, grant, permission, consent, recipient authority, audit event, or production access exists.",
    "AccessReceipt contract",
    "synthetic receipt fixture",
  ]) {
    assert.match(source, escaped(phrase));
  }

  assert.doesNotMatch(projection, /decisionOutcome:\s*"allow"/);
  assert.doesNotMatch(projection, /executionState:\s*"complete"/);
  assert.doesNotMatch(projection, /dataReleaseBoundaryCrossed:\s*true/);
});

test("adds no arbitrary input, persistence, provider, model, or network path", async () => {
  const [entry, panel, projection, state] = await Promise.all([
    read("../src/components/prologue-confirmed-projection-entry.tsx"),
    read("../src/components/prologue-chronicle-receipt-panel.tsx"),
    read("../src/lib/prologue-synthetic-projections.ts"),
    read("../src/lib/prologue-opening-state.ts"),
  ]);
  const source = `${entry}\n${panel}\n${projection}\n${state}`;

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

test("provides responsive, focus-visible, reduced-data, contrast, and forced-color treatment", async () => {
  const css = await read(
    "../src/components/prologue-chronicle-receipt-panel.module.css",
  );

  assert.match(css, /:focus-visible/);
  assert.match(css, /outline-offset/);
  assert.match(css, /max-width: 48rem/);
  assert.match(css, /prefers-reduced-data/);
  assert.match(css, /prefers-contrast/);
  assert.match(css, /forced-colors/);
  assert.match(css, /\.projectionDetails/);
  assert.match(css, /\.limitations/);
  assert.doesNotMatch(css, /outline:\s*(?:0(?:\s|;)|none)/i);
});
