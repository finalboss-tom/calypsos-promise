import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

function escaped(phrase) {
  return new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
}

test("requires confirmed synthetic, Chronicle, and receipt evidence", async () => {
  const state = await read("../src/lib/prologue-opening-state.ts");

  for (const phrase of [
    '"first-lantern"',
    '"complete-first-lantern"',
    '"return-to-receipt"',
    "chronicleInspected: false",
    "receiptInspected: false",
    "firstLanternCompleted: false",
    'if (transition === "view-synthetic-chronicle") return true',
    'if (transition === "view-synthetic-receipt") return true',
    'if (transition === "complete-first-lantern") return true',
  ]) {
    assert.match(state, escaped(phrase));
  }

  assert.match(
    state,
    /transition === "complete-first-lantern"[\s\S]*!state\.confirmed[\s\S]*!state\.chronicleInspected[\s\S]*!state\.receiptInspected/,
  );
  assert.match(
    state,
    /transition === "view-synthetic-receipt"[\s\S]*!state\.chronicleInspected/,
  );
});

test("names the exact completion evidence and prohibited inputs", async () => {
  const completion = await read("../src/lib/prologue-first-lantern.ts");

  for (const phrase of [
    "first-lantern.prologue.synthetic.v1",
    "synthetic-fixture-reviewed-and-confirmed",
    "temporary-synthetic-chronicle-inspected",
    "non-authoritative-receipt-explanation-inspected",
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
    /!state\.firstLanternCompleted[\s\S]*!state\.confirmed[\s\S]*!state\.chronicleInspected[\s\S]*!state\.receiptInspected/,
  );
});

test("explains why the lantern lit without implying reward or authority", async () => {
  const [panel, receiptPanel] = await Promise.all([
    read("../src/components/prologue-first-lantern-panel.tsx"),
    read("../src/components/prologue-chronicle-receipt-panel.tsx"),
  ]);
  const source = `${panel}\n${receiptPanel}`;

  for (const phrase of [
    "Light the First Lantern from this evidence",
    "First Lantern — synthetic completion evidence",
    "The First Lantern lights because three visible checks are complete.",
    "Why the lantern lit",
    "What did not count",
    "No durable reward",
    "Review the receipt evidence again",
    "Review or correct the synthetic entry",
    "Discard the temporary completion state",
    "No account, Chronicle record, permission, legal consent, reward, payment, provider status, or health outcome is created.",
  ]) {
    assert.match(source, escaped(phrase));
  }
});

test("resets evidence when review or discard invalidates completion", async () => {
  const state = await read("../src/lib/prologue-opening-state.ts");

  for (const functionName of [
    "chronicleInspectedForState",
    "receiptInspectedForState",
    "firstLanternCompletedForState",
  ]) {
    assert.match(state, escaped(functionName));
  }

  assert.equal(
    (state.match(/clearCapture \|\| transition === "review-confirmed-entry"/g) ?? [])
      .length,
    4,
  );
  assert.match(state, /transition === "discard-projection"[\s\S]*return null/);
});

test("adds no account, email, payment, model, provider, timer, persistence, or network completion path", async () => {
  const [panel, completion, state] = await Promise.all([
    read("../src/components/prologue-first-lantern-panel.tsx"),
    read("../src/lib/prologue-first-lantern.ts"),
    read("../src/lib/prologue-opening-state.ts"),
  ]);
  const source = `${panel}\n${completion}\n${state}`;

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
