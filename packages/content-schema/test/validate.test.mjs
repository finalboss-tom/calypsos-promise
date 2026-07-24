import assert from "node:assert/strict";
import test from "node:test";

import { validateContent } from "../dist/index.js";

const validQuest = {
  id: "first-reflection",
  kind: "quest",
  schemaVersion: "1.0.0",
  revision: 1,
  foundationStatus: "BASELINE",
  reviewState: "approved",
  title: "The First Reflection",
  summary: "Record a brief personal observation.",
  canonReferences: ["docs/frozen/world-lore-canon.md"],
  tags: ["fourteen-lanterns"],
  authorship: {
    mode: "human-authored",
    reviewedBy: ["project-maintainer"],
  },
  zoneId: "lantern-shore",
  objective: "Confirm one personal observation.",
  evidence: {
    type: "player-confirmation",
    minimumCount: 1,
  },
  rewards: [{ type: "renown", amount: 1 }],
  safetyBoundaries: ["No diagnosis or coercion."],
  refusalPath: "The player may defer without penalty.",
};

test("accepts a reviewed quest with a refusal path", () => {
  const result = validateContent(validQuest);
  assert.equal(result.ok, true);
  assert.deepEqual(result.issues, []);
});

test("rejects retired language", () => {
  const result = validateContent({
    ...validQuest,
    summary: "An indoctrination sequence.",
  });

  assert.equal(result.ok, false);
  assert.match(result.issues.map((issue) => issue.message).join(" "), /Retired language/);
});

test("requires a reviewer for approved content", () => {
  const result = validateContent({
    ...validQuest,
    authorship: { mode: "human-authored", reviewedBy: [] },
  });

  assert.equal(result.ok, false);
  assert.match(result.issues.map((issue) => issue.path).join(" "), /reviewedBy/);
});
