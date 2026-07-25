import assert from "node:assert/strict";
import test from "node:test";

import {
  syntheticAccessibilityContextDeclaration,
  syntheticAccessibilityContexts,
} from "../fixtures/accessibility-contexts.mjs";

const FORBIDDEN_KEYS = new Set([
  "diagnosis",
  "treatment",
  "healthValue",
  "consentGrant",
  "reward",
  "progression",
  "compensation",
  "governanceWeight",
]);

test("keeps the accessibility matrix synthetic and outside Chronicle truth", () => {
  assert.equal(
    syntheticAccessibilityContextDeclaration.dataClassification,
    "synthetic",
  );
  assert.equal(syntheticAccessibilityContextDeclaration.notChronicleData, true);
  assert.ok(syntheticAccessibilityContexts.length >= 4);
});

test("varies names, age bands, locales, access needs, and data availability", () => {
  for (const field of [
    "displayName",
    "ageBand",
    "locale",
    "languageContext",
  ]) {
    assert.ok(
      new Set(syntheticAccessibilityContexts.map((context) => context[field])).size >
        1,
      `${field} is not varied`,
    );
  }

  assert.ok(
    new Set(syntheticAccessibilityContexts.flatMap((context) => context.accessNeeds))
      .size > 3,
  );
  assert.ok(
    new Set(
      syntheticAccessibilityContexts.flatMap(
        (context) => context.dataAvailability,
      ),
    ).size > 3,
  );
});

test("does not encode health outcomes or institutional incentives", () => {
  const ids = new Set();
  for (const context of syntheticAccessibilityContexts) {
    assert.match(
      context.id,
      /^fixture-context\.[a-z][a-z0-9-]*\.[a-z][a-z0-9-]*$/,
    );
    assert.equal(context.declaration, "synthetic-non-chronicle-test-context");
    assert.equal(ids.has(context.id), false, `duplicate context ${context.id}`);
    ids.add(context.id);

    for (const key of Object.keys(context)) {
      assert.equal(FORBIDDEN_KEYS.has(key), false, `forbidden field ${key}`);
    }
  }
});
