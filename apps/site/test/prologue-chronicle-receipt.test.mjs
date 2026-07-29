import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

function escaped(phrase) {
  return new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}

test("references the accepted Chronicle and House of Keys contract vocabularies", async () => {
  const [projection, chronicleVersion, chronicleTypes, keysVersion, keysTypes] =
    await Promise.all([
      read("../src/lib/prologue-synthetic-projections.ts"),
      read("../../../packages/health-schema/src/version.ts"),
      read("../../../packages/health-schema/src/types.ts"),
      read("../../../packages/house-of-keys/src/version.ts"),
      read("../../../packages/house-of-keys/src/types.ts"),
    ]);

  assert.match(chronicleVersion, /LIVING_CHRONICLE_SCHEMA_VERSION = "0\.1\.0"/);
  assert.match(chronicleTypes, /export interface ChronicleRecordEnvelope/);
  assert.match(keysVersion, /HOUSE_OF_KEYS_CONTRACT_VERSION = "0\.1\.0-pre\.1"/);
  assert.match(keysTypes, /export interface AccessReceipt/);

  for (const phrase of [
    'schemaVersion: "0.1.0"',
    'contractShape: "ChronicleRecordEnvelope"',
    'contractVersion: "0.1.0-pre.1"',
    'contractShape: "AccessReceipt"',
    'contractVocabularyUse: "selected-field-explanation-only"',
  ]) {
    assert.match(projection, escaped(phrase));
  }

  assert.doesNotMatch(projection, /receipt\.personal-export\.synthetic/);
  assert.doesNotMatch(projection, /#L\d+-L\d+/);
});

test("maps the temporary Chronicle projection to accepted record vocabulary", async () => {
  const projection = await read("../src/lib/prologue-synthetic-projections.ts");

  for (const phrase of [
    'projectionStatus: "temporary-page-memory-only"',
    'dataClassification: "synthetic"',
    'contractShapeReference: "ChronicleRecordEnvelope"',
    'chronicleId: "chronicle.prologue.synthetic"',
    'subjectId: "subject.prologue.synthetic-demonstration"',
    'recordFamily: "observation"',
    'assertionClass: "self-report"',
    'authorityState: "confirmed"',
    'lifecycleState: "active"',
    'temporalAssertionKind: "exact-instant"',
    "variableId: draft.variableId",
    "valueShape: draft.valueShape",
    "sourceArtifactId: draft.sourceArtifactId",
    "sourceVersionId: draft.sourceVersionId",
    'persistence: "none"',
    "explicit-or-navigation-destroys-projection",
  ]) {
    assert.match(projection, escaped(phrase));
  }

  assert.match(
    projection,
    /!state\.confirmed \|\| !state\.fixtureId \|\| !state\.correctionId/,
  );
});

test("keeps the Chronicle view visibly temporary, correctable, source-linked, and discardable", async () => {
  const [entry, panel, projection] = await Promise.all([
    read("../src/components/prologue-confirmed-projection-entry.tsx"),
    read("../src/components/prologue-chronicle-receipt-panel.tsx"),
    read("../src/lib/prologue-synthetic-projections.ts"),
  ]);
  const source = `${entry}\n${panel}\n${projection}`;

  for (const phrase of [
    "Temporary synthetic Chronicle projection",
    "Source, correction, and confirmation stay visible.",
    "Visitor confirmed",
    "Page memory only",
    "Not stored",
    "Original synthetic value",
    "Correction and confirmation",
    "Discard behavior",
    "Inspect the mapped Chronicle vocabulary",
    "Living Chronicle record contract",
    "Review or correct the synthetic entry",
    "Discard the temporary projection",
    "not a ChronicleRecordEnvelope or stored Living Chronicle record",
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
    "House of Keys receipt-shaped explanation",
    "A receipt explains authority; it does not create it.",
    "illustrative-non-contract-record",
    "selected-field-explanation-only",
    'decisionOutcome: "not-evaluated"',
    'executionState: "not-applicable"',
    "dataReleaseBoundaryCrossed: false",
    "grantReferences: Object.freeze([])",
    "demo.no-policy-evaluation",
    "demo.no-grant",
    "demo.no-data-release",
    "No House of Keys policy request or evaluation ran",
    "Not an AccessReceipt",
    "AccessReceipt contract",
  ]) {
    assert.match(source, escaped(phrase));
  }

  assert.doesNotMatch(projection, /decisionOutcome:\s*"allow"/);
  assert.doesNotMatch(projection, /executionState:\s*"complete"/);
  assert.doesNotMatch(projection, /dataReleaseBoundaryCrossed:\s*true/);
  assert.doesNotMatch(projection, /acceptedFixture/);
});

test("adds no arbitrary input, persistence, provider, model, or network path", async () => {
  const files = await Promise.all([
    read("../src/components/prologue-confirmed-projection-entry.tsx"),
    read("../src/components/prologue-chronicle-receipt-panel.tsx"),
    read("../src/lib/prologue-synthetic-projections.ts"),
    read("../src/lib/prologue-opening-state.ts"),
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
