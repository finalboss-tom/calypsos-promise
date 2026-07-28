import assert from "node:assert/strict";
import test from "node:test";

import {
  FORGE_COMPLETE_RUNTIME_VALIDATION_REVISION,
  validateForgeCompleteRuntime,
} from "../dist/index.js";

test("the complete Forge runtime and security surface validates", () => {
  assert.equal(FORGE_COMPLETE_RUNTIME_VALIDATION_REVISION, "1");
  assert.deepEqual(validateForgeCompleteRuntime(), []);
});
