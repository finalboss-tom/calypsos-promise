import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

function escaped(phrase) {
  return new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}

test("defines First Lantern as a bounded public synthetic quest", async () => {
  const completion = await read("../src/lib/prologue-first-lantern.ts");

  for (const phrase of [
    'id: "quest.prologue.first-lantern"',
    'publicTitle: "Light the First Lantern"',
    'inWorldTitle: "The First Light of Lantern Shore"',
    'zone: "Lantern Shore"',
    "Deterministic Aster or the direct manual guide",
    "playerValue",
    "estimatedTimeMinutes",
    "accessibilityVariants",
    "synthetic demonstration data only",
    'permissionOrPurposeRequirement: "none"',
    'safetyClassification: "public-synthetic-non-clinical"',
    'reward: "none"',
    "unlocks no canonical zone, rank, Fourteen Lantern progression",
    "not collected in Sprint 9",
  ]) {
    assert.match(completion, escaped(phrase));
  }
});

test("names the complete inspectable evidence and prohibited inputs", async () => {
  const completion = await read("../src/lib/prologue-first-lantern.ts");

  for (const phrase of [
    "first-lantern.prologue.synthetic.v1",
    "lantern-shore-reached",
    "guide-path-selected",
    "synthetic-fixture-selected-and-labeled",
    "synthetic-draft-reviewed",
    "visitor-confirmed-review-choice",
    "temporary-synthetic-chronicle-inspected",
    "non-authoritative-receipt-explanation-inspected",
    "completion-without-conversion-or-remote-authority",
    "account",
    "email",
    "newsletter submission",
    "payment",
    "provider selection",
    "model response",
    "real health data",
    "real-world health action",
    "elapsed time",
    "analytics event",
    "hidden state",
    "completed-in-page-memory-only",
    'reward: "none"',
    "durableProgression: false",
    'authority: "none"',
    'persistence: "none"',
  ]) {
    assert.match(completion, escaped(phrase));
  }

  assert.match(
    completion,
    /!state\.firstLanternCompleted[\s\S]*!state\.lanternShoreReached[\s\S]*!state\.presentationPath[\s\S]*!state\.draftReviewed[\s\S]*!state\.confirmed[\s\S]*!state\.chronicleInspected[\s\S]*!state\.receiptInspected/,
  );
  assert.equal(
    (completion.match(/satisfied: true as const/g) ?? []).length,
    8,
  );
});

test("explains why the lantern lit without implying reward, canon, or authority", async () => {
  const [panel, receiptPanel, completion] = await Promise.all([
    read("../src/components/prologue-first-lantern-panel.tsx"),
    read("../src/components/prologue-chronicle-receipt-panel.tsx"),
    read("../src/lib/prologue-first-lantern.ts"),
  ]);
  const source = `${panel}\n${receiptPanel}\n${completion}`;

  for (const phrase of [
    "Light the First Lantern from this evidence",
    "First Lantern — synthetic completion evidence",
    "eight inspectable checks are complete",
    "Why the lantern lit",
    "What did not count",
    "What this changes",
    "No durable reward",
    "No canon unlock",
    "Review the receipt evidence again",
    "Review or correct the synthetic entry",
    "Discard the temporary completion state",
    "not a durable game achievement or canonical Fourteen Lanterns progression",
    "No account, Chronicle record, permission, legal consent, reward, payment, provider status, health outcome, zone unlock, or rank is created.",
  ]) {
    assert.match(source, escaped(phrase));
  }
});

test("keeps completion reversible and evidence invalidation explicit", async () => {
  const state = await read("../src/lib/prologue-opening-state.ts");

  for (const phrase of [
    'transition === "return-to-receipt"',
    'transition === "review-confirmed-entry"',
    '"discard-projection": "capture-choice"',
    "firstLanternCompleted: false",
    "draftReviewed",
    "lanternShoreReached",
  ]) {
    assert.match(state, escaped(phrase));
  }
});

test("adds no account, email, payment, model, provider, timer, persistence, or network completion path", async () => {
  const files = await Promise.all([
    read("../src/components/prologue-first-lantern-panel.tsx"),
    read("../src/lib/prologue-first-lantern.ts"),
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
    /localStorage/,
    /sessionStorage/,
    /indexedDB/,
    /document\.cookie/,
    /fetch\(/,
    /XMLHttpRequest/,
    /WebSocket/,
    /EventSource/,
    /setTimeout/,
    /setInterval/,
    /Date\.now/,
    /\/api\/join/,
    /openai/i,
    /anthropic/i,
    /modelProvider/i,
  ]) {
    assert.doesNotMatch(source, prohibited);
  }
});

test("provides visible focus, reduced motion, reduced data, contrast, and forced colors", async () => {
  const css = await read(
    "../src/components/prologue-first-lantern-panel.module.css",
  );

  assert.match(css, /:focus-visible/);
  assert.match(css, /outline-offset/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /prefers-reduced-data/);
  assert.match(css, /prefers-contrast/);
  assert.match(css, /forced-colors/);
  assert.match(css, /\.completionDetails/);
  assert.match(css, /\.evidence/);
  assert.match(css, /\.limitations/);
  assert.doesNotMatch(css, /outline:\s*(?:0(?:\s|;)|none)/i);
});
