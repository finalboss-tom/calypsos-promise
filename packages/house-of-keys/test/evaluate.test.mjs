import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateHouseOfKeysPolicy,
  syntheticPolicyScenarios,
  validPersonalExportInput,
} from "../dist/index.js";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

for (const scenario of syntheticPolicyScenarios) {
  test(`${scenario.id}: ${scenario.description}`, () => {
    const decision = evaluateHouseOfKeysPolicy(scenario.input);

    assert.equal(decision.outcome, scenario.expectedOutcome);
    for (const reason of scenario.expectedReasonCodes) {
      assert.ok(
        decision.reasonCodes.includes(reason),
        `Expected ${reason}; received ${decision.reasonCodes.join(", ")}`,
      );
    }
    assert.doesNotThrow(() => JSON.stringify(decision));
  });
}

test("the evaluator is deterministic for identical normalized input", () => {
  const first = evaluateHouseOfKeysPolicy(clone(validPersonalExportInput));
  const second = evaluateHouseOfKeysPolicy(clone(validPersonalExportInput));

  assert.equal(JSON.stringify(first), JSON.stringify(second));
});

test("the evaluator does not mutate its input", () => {
  const input = clone(validPersonalExportInput);
  const before = JSON.stringify(input);

  evaluateHouseOfKeysPolicy(input);

  assert.equal(JSON.stringify(input), before);
});

test("an allow result remains separate from execution and receipts", () => {
  const decision = evaluateHouseOfKeysPolicy(validPersonalExportInput);

  assert.equal(decision.outcome, "allow");
  assert.equal(decision.reEvaluationRequiredBeforeExecution, true);
  assert.equal(decision.receiptRequired, true);
  assert.ok(decision.renderingGrantId);
});
