import assert from "node:assert/strict";
import test from "node:test";

import {
  ASTER_CONTRACT_VERSION,
  ASTER_MANDATORY_PROHIBITED_ACTIONS,
  ASTER_ROLE_AUTHORITY_MATRIX,
  ASTER_ROLES,
  getAsterRoleAuthority,
  isAsterRole,
  validateAsterRoleAuthorityMatrix,
} from "../dist/index.js";

test("the pre-stable Aster contract is versioned", () => {
  assert.equal(ASTER_CONTRACT_VERSION, "0.1.0-pre.1");
});

test("the public authority matrix covers every Aster role", () => {
  assert.deepEqual(Object.keys(ASTER_ROLE_AUTHORITY_MATRIX), ASTER_ROLES);
  assert.deepEqual(
    validateAsterRoleAuthorityMatrix(ASTER_ROLE_AUTHORITY_MATRIX),
    [],
  );
});

test("every Aster role is structurally non-authoritative", () => {
  for (const role of ASTER_ROLES) {
    const contract = getAsterRoleAuthority(role);

    assert.equal(contract.role, role);
    assert.ok(contract.accessibleName.length > 0);
    assert.ok(contract.primaryPurpose.length > 0);
    assert.equal(contract.canWriteCanonicalRecords, false);
    assert.equal(contract.canCreateOrExpandPermission, false);
    assert.equal(contract.canSelfConfirmOutput, false);
    assert.equal(contract.canCompleteQuest, false);
    assert.equal(contract.canGrantReward, false);

    for (const prohibitedAction of ASTER_MANDATORY_PROHIBITED_ACTIONS) {
      assert.ok(contract.prohibitedActions.includes(prohibitedAction));
    }
  }
});

test("role detection accepts only the public role taxonomy", () => {
  assert.equal(isAsterRole("scribe"), true);
  assert.equal(isAsterRole("provider"), false);
  assert.equal(isAsterRole(null), false);
});

test("validation rejects attempted canonical-write authority", () => {
  const unsafeMatrix = structuredClone(ASTER_ROLE_AUTHORITY_MATRIX);
  unsafeMatrix.scribe.canWriteCanonicalRecords = true;

  const issues = validateAsterRoleAuthorityMatrix(unsafeMatrix);

  assert.ok(
    issues.some(
      (issue) => issue.code === "aster.authority.canonical-write-authority",
    ),
  );
});

test("validation rejects missing roles and mandatory prohibitions", () => {
  const incompleteMatrix = structuredClone(ASTER_ROLE_AUTHORITY_MATRIX);
  delete incompleteMatrix.librarian;
  incompleteMatrix.storykeeper.prohibitedActions = [];

  const issues = validateAsterRoleAuthorityMatrix(incompleteMatrix);

  assert.ok(
    issues.some((issue) => issue.code === "aster.authority.missing-role"),
  );
  assert.equal(
    issues.filter(
      (issue) => issue.code === "aster.authority.missing-prohibited-action",
    ).length,
    ASTER_MANDATORY_PROHIBITED_ACTIONS.length,
  );
});
