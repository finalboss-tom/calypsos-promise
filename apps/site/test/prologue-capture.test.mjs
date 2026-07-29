import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

function escaped(phrase) {
  return new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}

test("defines two public pre-authored synthetic capture fixtures", async () => {
  const fixtures = await read("../src/lib/prologue-synthetic-fixtures.ts");

  for (const phrase of [
    '"synthetic-sleep-text-v1"',
    '"synthetic-walk-voice-v1"',
    'dataClassification: "synthetic"',
    'mode: "synthetic-text"',
    'mode: "synthetic-voice"',
    "Repository-authored demonstration fixture",
    "Repository-authored transcript demonstration",
    "It was not entered by a visitor",
    "No audio exists. No microphone is used.",
    "does not describe a real person",
    "2030-04-12T07:30:00Z",
    "2030-04-12T13:15:00Z",
  ]) {
    assert.match(fixtures, escaped(phrase));
  }

  assert.equal((fixtures.match(/dataClassification: "synthetic"/g) ?? []).length, 2);
});

test("keeps synthetic selection, review, correction, and confirmation deterministic", async () => {
  const state = await read("../src/lib/prologue-opening-state.ts");

  for (const phrase of [
    '"capture-choice"',
    '"synthetic-draft"',
    '"review-and-correction"',
    '"confirmed-entry"',
    '"choose-synthetic-text"',
    '"choose-synthetic-voice"',
    '"review-draft"',
    '"accept-as-written"',
    '"apply-synthetic-correction"',
    '"confirm-entry"',
    '"refuse-draft"',
    '"change-synthetic-example"',
    "if (transition === \"confirm-entry\" && !state.correctionId) return false",
    'confirmed: transition === "confirm-entry" ? true : false',
  ]) {
    assert.match(state, escaped(phrase));
  }

  assert.match(state, /transition === "refuse-draft"[\s\S]*return null/);
  assert.match(state, /transition === "change-synthetic-example"[\s\S]*return null/);
});

test("gives Aster and the manual route the same fixtures and controls", async () => {
  const panel = await read("../src/components/prologue-capture-panel.tsx");

  for (const phrase of [
    "Deterministic Aster presentation",
    "Direct manual presentation",
    "presents the same deterministic result",
    "Use the synthetic text example",
    "Use the synthetic voice transcript",
    "Review and correct the draft",
    "Accept the synthetic value as written",
    "Confirm this synthetic demonstration",
    "Refuse this synthetic draft",
    "Choose another synthetic example",
    "Aster cannot confirm this draft",
    "The manual guide cannot confirm it",
  ]) {
    assert.match(panel, escaped(phrase));
  }

  assert.equal((panel.match(/function presentationLabel/g) ?? []).length, 1);
  assert.equal((panel.match(/Confirm this synthetic demonstration/g) ?? []).length, 1);
});

test("requires an explicit review choice before confirmation", async () => {
  const panel = await read("../src/components/prologue-capture-panel.tsx");

  for (const phrase of [
    'aria-pressed={accepted}',
    'aria-pressed={corrected}',
    'disabled={!state.correctionId}',
    'role="status"',
    'aria-live="polite"',
    "No review choice is selected. Confirmation remains unavailable.",
    "A synthetic review choice is selected. You may now confirm or change it.",
    "This confirmation exists only in this page memory.",
    "Nothing was stored.",
  ]) {
    assert.match(panel, escaped(phrase));
  }
});

test("accepts no arbitrary input, capture API, persistence, or network path", async () => {
  const [panel, fixtures, state] = await Promise.all([
    read("../src/components/prologue-capture-panel.tsx"),
    read("../src/lib/prologue-synthetic-fixtures.ts"),
    read("../src/lib/prologue-opening-state.ts"),
  ]);
  const source = `${panel}\n${fixtures}\n${state}`;

  for (const prohibited of [
    /<input\b/i,
    /<textarea\b/i,
    /contentEditable/i,
    /type=["']file["']/i,
    /navigator\.mediaDevices/,
    /getUserMedia/,
    /MediaRecorder/,
    /SpeechRecognition/,
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

test("provides responsive, focus, contrast, and disabled-control treatment", async () => {
  const css = await read("../src/components/prologue-capture-panel.module.css");

  assert.match(css, /:focus-visible/);
  assert.match(css, /outline-offset/);
  assert.match(css, /button\[aria-pressed="true"\]/);
  assert.match(css, /button:disabled/);
  assert.match(css, /max-width: 48rem/);
  assert.match(css, /prefers-contrast/);
  assert.match(css, /forced-colors/);
  assert.doesNotMatch(css, /outline:\s*(?:0(?:\s|;)|none)/i);
});
