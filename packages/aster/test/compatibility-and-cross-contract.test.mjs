import assert from "node:assert/strict";
import test from "node:test";

import {
  ASTER_COMPATIBILITY_CHANGE_CLASSES,
  ASTER_COMPATIBILITY_MANIFEST,
  ASTER_CONTRACT_VERSION,
  ASTER_CORE_NON_AI_PATH_IDS,
  ASTER_LOCAL_SCENARIO_IDS,
  ASTER_PUBLIC_COMPONENT_IDS,
  ASTER_ROLES,
  classifyAsterCompatibilityChange,
  validateAsterCompatibilityChange,
  validateAsterCompatibilityManifest,
  validateCurrentAsterCrossContractEvidence,
} from "../dist/index.js";

function codes(result) {
  return result.issues.map((issue) => issue.code);
}

function migrationPlan(componentId = "proposal") {
  return {
    migrationId: "aster.migration.synthetic.proposal.1-to-2",
    revision: 1,
    componentId,
    fromContractVersion: ASTER_CONTRACT_VERSION,
    toContractVersion: ASTER_CONTRACT_VERSION,
    fromComponentRevision: 1,
    toComponentRevision: 2,
    mode: "deterministic-transform",
    preservesSourceArtifact: true,
    preservesPriorRevisionEvidence: true,
    createsNewRevision: true,
    rollbackOrForwardOnlyDeclared: true,
    publicSyntheticFixtureIds: ["aster.fixture.proposal.current"],
    canWriteCanonicalRecords: false,
    canCreateOrExpandPermission: false,
    canConfirmProposal: false,
    canSelectProviderDefault: false,
    canSetSourceRank: false,
    canControlPublication: false,
  };
}

test("the current manifest validates and covers every public component", () => {
  const result = validateCurrentAsterCrossContractEvidence();
  assert.equal(result.ok, true, JSON.stringify(result.issues, null, 2));
  assert.deepEqual(
    ASTER_COMPATIBILITY_MANIFEST.components.map((entry) => entry.componentId),
    ASTER_PUBLIC_COMPONENT_IDS,
  );
  assert.equal(
    ASTER_COMPATIBILITY_MANIFEST.fixtures.length,
    ASTER_PUBLIC_COMPONENT_IDS.length,
  );
});

test("every public fixture is synthetic, credential-free, and non-authoritative", () => {
  for (const fixture of ASTER_COMPATIBILITY_MANIFEST.fixtures) {
    assert.equal(fixture.informationClass, "synthetic");
    assert.equal(fixture.publicSafe, true);
    assert.equal(fixture.credentialFree, true);
    assert.equal(fixture.authoritative, false);
    assert.ok(fixture.scenarioIds.length > 0);
  }
});

test("additive optional changes may remain compatible", () => {
  assert.equal(
    classifyAsterCompatibilityChange("additive-optional"),
    "additive-compatible",
  );
  const result = validateAsterCompatibilityChange({
    changeId: "aster.change.synthetic.optional-field",
    componentId: "proposal",
    fromComponentRevision: 1,
    toComponentRevision: 2,
    changeClass: "additive-optional",
    declaredStatus: "additive-compatible",
    migrationPlan: null,
    authorityBoundaryChanged: false,
  });
  assert.equal(result.ok, true, JSON.stringify(result.issues, null, 2));
});

test("semantic and field-removal changes require explicit migration evidence", () => {
  for (const changeClass of ["semantic-change", "field-removal"]) {
    const missing = validateAsterCompatibilityChange({
      changeId: `aster.change.synthetic.${changeClass}`,
      componentId: "proposal",
      fromComponentRevision: 1,
      toComponentRevision: 2,
      changeClass,
      declaredStatus: "migration-required",
      migrationPlan: null,
      authorityBoundaryChanged: false,
    });
    assert.equal(missing.ok, false);
    assert.ok(
      codes(missing).includes("aster.compatibility.missing-migration-plan"),
    );

    const complete = validateAsterCompatibilityChange({
      changeId: `aster.change.synthetic.${changeClass}.with-plan`,
      componentId: "proposal",
      fromComponentRevision: 1,
      toComponentRevision: 2,
      changeClass,
      declaredStatus: "migration-required",
      migrationPlan: migrationPlan(),
      authorityBoundaryChanged: false,
    });
    assert.equal(complete.ok, true, JSON.stringify(complete.issues, null, 2));
  }
});

test("authority-boundary changes remain incompatible with ordinary migration", () => {
  const result = validateAsterCompatibilityChange({
    changeId: "aster.change.synthetic.authority",
    componentId: "authority",
    fromComponentRevision: 1,
    toComponentRevision: 2,
    changeClass: "authority-boundary-change",
    declaredStatus: "migration-required",
    migrationPlan: migrationPlan("authority"),
    authorityBoundaryChanged: true,
  });
  assert.equal(result.ok, false);
  assert.ok(
    codes(result).includes(
      "aster.compatibility.incompatible-without-migration",
    ),
  );
  assert.ok(
    codes(result).includes(
      "aster.compatibility.migration-authority-escalation",
    ),
  );
});

test("missing components and non-synthetic fixtures are rejected", () => {
  const manifest = structuredClone(ASTER_COMPATIBILITY_MANIFEST);
  manifest.components.pop();
  manifest.fixtures[0].informationClass = "private";
  manifest.fixtures[0].authoritative = true;
  const result = validateAsterCompatibilityManifest(manifest);
  assert.equal(result.ok, false);
  assert.ok(codes(result).includes("aster.compatibility.missing-component"));
  assert.ok(
    codes(result).includes("aster.compatibility.fixture-not-synthetic"),
  );
  assert.ok(
    codes(result).includes("aster.compatibility.fixture-authority-escalation"),
  );
});

test("role-operation, proposal-kind, and scenario drift is rejected", () => {
  const manifest = structuredClone(ASTER_COMPATIBILITY_MANIFEST);
  manifest.roleBindings[0].operationId =
    "librarian.prepare-source-linked-recall";
  manifest.roleBindings[1].proposalKind = "product-route";
  manifest.roleBindings[2].successScenarioId = "unknown-intent";
  const result = validateAsterCompatibilityManifest(manifest);
  assert.equal(result.ok, false);
  assert.ok(
    codes(result).includes("aster.compatibility.role-operation-mismatch"),
  );
  assert.ok(
    codes(result).includes("aster.compatibility.role-proposal-kind-mismatch"),
  );
  assert.ok(
    codes(result).includes("aster.compatibility.role-scenario-mismatch"),
  );
});

test("scenario, core fallback, provider-state, and authority coverage fails closed", () => {
  const manifest = structuredClone(ASTER_COMPATIBILITY_MANIFEST);
  manifest.localScenarioIds = ASTER_LOCAL_SCENARIO_IDS.slice(1);
  manifest.coreNonAiPathIds = ASTER_CORE_NON_AI_PATH_IDS.slice(1);
  manifest.providerGovernanceStates = [
    ...manifest.providerGovernanceStates,
    "production-approved",
  ];
  manifest.authority.canWriteCanonicalRecords = true;
  const result = validateAsterCompatibilityManifest(manifest);
  assert.equal(result.ok, false);
  assert.ok(
    codes(result).includes("aster.compatibility.fixture-scenario-mismatch"),
  );
  assert.ok(
    codes(result).includes("aster.compatibility.fallback-coverage-gap"),
  );
  assert.ok(codes(result).includes("aster.compatibility.provider-state-drift"));
  assert.ok(
    codes(result).includes("aster.compatibility.production-provider-state"),
  );
  assert.ok(codes(result).includes("aster.compatibility.authority-escalation"));
});

test("migration plans cannot gain canonical, permission, provider, or publication authority", () => {
  const plan = migrationPlan();
  plan.canCreateOrExpandPermission = true;
  plan.canControlPublication = true;
  const result = validateAsterCompatibilityChange({
    changeId: "aster.change.synthetic.migration-escalation",
    componentId: "proposal",
    fromComponentRevision: 1,
    toComponentRevision: 2,
    changeClass: ASTER_COMPATIBILITY_CHANGE_CLASSES.find(
      (candidate) => candidate === "semantic-change",
    ),
    declaredStatus: "migration-required",
    migrationPlan: plan,
    authorityBoundaryChanged: false,
  });
  assert.equal(result.ok, false);
  assert.ok(
    codes(result).includes(
      "aster.compatibility.migration-authority-escalation",
    ),
  );
});

test("the manifest retains all roles and exact package version", () => {
  assert.equal(
    ASTER_COMPATIBILITY_MANIFEST.contractVersion,
    ASTER_CONTRACT_VERSION,
  );
  assert.deepEqual(
    ASTER_COMPATIBILITY_MANIFEST.roleBindings.map((entry) => entry.role),
    ASTER_ROLES,
  );
});
