import assert from "node:assert/strict";
import test from "node:test";

import {
  ACCESSIBILITY_MODALITIES,
  ACCESSIBILITY_PLATFORMS,
  CONTRAST_PAIRS,
  PLATFORM_SUPPORT_MATRIX,
  calculateContrastRatio,
  validateAccessibilityParity,
  validateDirectPathParity,
} from "../src/accessibility/accessibility-parity.mjs";

test("every platform covers every required accessibility modality", () => {
  for (const platform of ACCESSIBILITY_PLATFORMS) {
    for (const modality of ACCESSIBILITY_MODALITIES) {
      assert.ok(PLATFORM_SUPPORT_MATRIX[platform][modality]);
    }
  }
});

test("named text contrast pairs meet 4.5 to 1", () => {
  for (const pair of CONTRAST_PAIRS) {
    assert.ok(calculateContrastRatio(pair.foreground, pair.background) >= 4.5);
  }
});

test("direct and narrative essential concepts remain equivalent", () => {
  assert.equal(validateDirectPathParity().ok, true);
});

test("accessibility parity contract passes with residual limits retained", () => {
  assert.deepEqual(validateAccessibilityParity(), {
    ok: true,
    failures: [],
  });
});
