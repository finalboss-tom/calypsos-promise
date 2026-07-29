import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

test("accepts one bounded application and route owner for Sprint 9", async () => {
  const [plan, boundary] = await Promise.all([
    read("../../../docs/roadmap/sprint-9-execution-plan.md"),
    read("../../../docs/architecture/public-synthetic-prologue-boundary.md"),
  ]);
  const source = `${plan}\n${boundary}`;

  assert.match(source, /apps\/site/);
  assert.match(source, /\/prologue/);
  assert.match(source, /A separate application is not justified/i);
  assert.match(source, /Git-triggered Vercel deployment remains disabled/i);
});

test("keeps all prologue interaction memory-only and public synthetic", async () => {
  const boundary = await read(
    "../../../docs/architecture/public-synthetic-prologue-boundary.md",
  );

  for (const phrase of [
    "memory-only",
    "Public and explicitly synthetic",
    "localStorage",
    "sessionStorage",
    "IndexedDB",
    "query strings or hashes",
    "newsletter API",
    "model prompts",
    "third-party scripts",
    "refresh",
    "explicit discard",
  ]) {
    assert.match(boundary, new RegExp(phrase, "i"));
  }

  assert.match(boundary, /analytics or behavioral profiling/i);
});

test("prohibits arbitrary health, voice, file, location, and account intake", async () => {
  const [plan, boundary] = await Promise.all([
    read("../../../docs/roadmap/sprint-9-execution-plan.md"),
    read("../../../docs/architecture/public-synthetic-prologue-boundary.md"),
  ]);
  const source = `${plan}\n${boundary}`;

  for (const phrase of [
    "No account",
    "free-form health text",
    "microphone",
    "file",
    "camera",
    "location",
    "wearable",
    "pre-authored synthetic choices",
    "request microphone permission",
    "informational only",
  ]) {
    assert.match(source, new RegExp(phrase, "i"));
  }
});

test("defines deterministic state, confirmation, receipt, and completion rules", async () => {
  const [plan, boundary] = await Promise.all([
    read("../../../docs/roadmap/sprint-9-execution-plan.md"),
    read("../../../docs/architecture/public-synthetic-prologue-boundary.md"),
  ]);
  const source = `${plan}\n${boundary}`;

  for (const scene of [
    "arrival",
    "lantern-shore",
    "aster-introduction",
    "capture-choice",
    "synthetic-draft",
    "review-and-correction",
    "confirmed-entry",
    "synthetic-chronicle",
    "synthetic-receipt",
    "first-lantern",
    "exit-choice",
    "complete",
  ]) {
    assert.match(source, new RegExp(scene));
  }

  assert.match(source, /Invalid actions fail closed/i);
  assert.match(source, /requires an explicit visitor confirmation action/i);
  assert.match(source, /no real identity exists/i);
  assert.match(source, /no real grant or recipient exists/i);
  assert.match(source, /no legal consent or production permission is created/i);
  assert.match(source, /completion does not survive refresh or exit/i);
});

test("requires complete refusal, fallback, accessibility, and validation paths", async () => {
  const [plan, boundary] = await Promise.all([
    read("../../../docs/roadmap/sprint-9-execution-plan.md"),
    read("../../../docs/architecture/public-synthetic-prologue-boundary.md"),
  ]);
  const source = `${plan}\n${boundary}`;

  for (const phrase of [
    "complete manual path",
    "skip optional narration",
    "refuse synthetic capture",
    "restart",
    "discard",
    "leave",
    "complete without account conversion",
    "logical keyboard order",
    "screen[- ]reader",
    "reduced motion",
    "reduced data",
    "forced colors",
    "no required timing",
    "storage API use",
    "network calls",
    "completion without explicit confirmation",
  ]) {
    assert.match(source, new RegExp(phrase, "i"));
  }
});
