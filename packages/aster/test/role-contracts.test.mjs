import assert from "node:assert/strict";
import test from "node:test";

import {
  ASTER_MANDATORY_PROHIBITED_ACTIONS,
  ASTER_ROLE_AUTHORITY_MATRIX,
  ASTER_ROLE_CONTRACTS,
  ASTER_ROLES,
  getAsterRoleContract,
  validateAsterRoleContracts,
} from "../dist/index.js";

test("the detailed role contracts validate against the authority matrix", () => {
  assert.deepEqual(Object.keys(ASTER_ROLE_CONTRACTS), ASTER_ROLES);
  assert.deepEqual(validateAsterRoleContracts(ASTER_ROLE_CONTRACTS), []);
});

test("every detailed role contract remains non-authoritative", () => {
  for (const role of ASTER_ROLES) {
    const contract = getAsterRoleContract(role);
    const authority = ASTER_ROLE_AUTHORITY_MATRIX[role];

    assert.equal(contract.role, role);
    assert.equal(
      contract.deterministicActionOwner,
      authority.authoritativeActionOwner,
    );
    assert.equal(contract.confirmationRule, authority.confirmationRule);
    assert.equal(contract.resultCanBecomeCanonical, false);
    assert.equal(contract.canInvokeAuthoritativeAction, false);
    assert.equal(contract.retention.roleOwnedMemory, false);
    assert.equal(
      contract.retention.retainedMemoryRequiresSeparatePlayerChoice,
      true,
    );
    assert.equal(contract.providerEgress.localExecutionCompatible, true);
    assert.equal(
      contract.providerEgress.authorityBearingContextProhibited,
      true,
    );
    assert.ok(contract.manualFallback.length > 0);

    for (const prohibitedAction of ASTER_MANDATORY_PROHIBITED_ACTIONS) {
      assert.ok(contract.prohibitedActions.includes(prohibitedAction));
    }
  }
});

test("the Scribe requires review before Chronicle action", () => {
  const contract = getAsterRoleContract("scribe");

  assert.equal(contract.requiresPlayerReview, true);
  assert.equal(contract.confirmationRule, "required-before-domain-action");
  assert.equal(contract.deterministicActionOwner, "living-chronicle");
  assert.equal(contract.manualFallback, "manual structured capture");
});

test("the Librarian sources every recalled health statement", () => {
  const contract = getAsterRoleContract("librarian");

  assert.equal(contract.sourceLinkRule, "every-health-statement");
  assert.ok(
    contract.prohibitedActions.includes(
      "recall-health-statement-without-source",
    ),
  );
  assert.ok(
    contract.prohibitedActions.includes("treat-retrieval-score-as-truth"),
  );
});

test("the Interpreter cannot imply clinical or standards authority", () => {
  const contract = getAsterRoleContract("interpreter");

  assert.ok(
    contract.prohibitedActions.includes(
      "diagnose-prescribe-or-direct-emergency-care",
    ),
  );
  assert.ok(
    contract.prohibitedActions.includes(
      "imply-conformance-completeness-equivalence-safety-or-endorsement",
    ),
  );
});

test("the Storykeeper presents only confirmed events", () => {
  const contract = getAsterRoleContract("storykeeper");
  const confirmedEventRequirement = contract.evidenceRequirements.find(
    (requirement) => requirement.requirementId === "confirmed-domain-event",
  );

  assert.deepEqual(confirmedEventRequirement?.anyOf, [
    "confirmed-domain-event",
  ]);
  assert.ok(
    contract.prohibitedActions.includes("invent-canon-or-confirmed-events"),
  );
  assert.ok(
    contract.prohibitedActions.includes("change-progression-from-presentation"),
  );
});

test("validation rejects canonical, memory, and egress escalation", () => {
  const unsafeContracts = structuredClone(ASTER_ROLE_CONTRACTS);
  unsafeContracts.scribe.resultCanBecomeCanonical = true;
  unsafeContracts.librarian.retention.roleOwnedMemory = true;
  unsafeContracts.interpreter.providerEgress.mode = "unrestricted";
  unsafeContracts.storykeeper.canInvokeAuthoritativeAction = true;

  const issues = validateAsterRoleContracts(unsafeContracts);

  assert.ok(
    issues.some(
      (issue) =>
        issue.code === "aster.role-contract.canonical-result-authority",
    ),
  );
  assert.ok(
    issues.some(
      (issue) => issue.code === "aster.role-contract.role-owned-memory",
    ),
  );
  assert.ok(
    issues.some(
      (issue) =>
        issue.code === "aster.role-contract.unrestricted-provider-egress",
    ),
  );
  assert.ok(
    issues.some(
      (issue) => issue.code === "aster.role-contract.authoritative-invocation",
    ),
  );
});
