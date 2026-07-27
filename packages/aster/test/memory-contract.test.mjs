import assert from "node:assert/strict";
import test from "node:test";

import {
  ASTER_CONTRACT_VERSION,
  ASTER_MEMORY_AUTHORITY_BOUNDARY,
  ASTER_MEMORY_CLASSES,
  ASTER_MEMORY_CLASS_POLICIES,
  ASTER_MEMORY_SECONDARY_USE_BOUNDARY,
  getAsterMemoryClassPolicy,
  validateAsterMemoryClassPolicies,
  validateAsterMemoryEntry,
} from "../dist/index.js";

function makePreferenceMemory() {
  return {
    schemaId: "aster.memory.entry",
    schemaRevision: 1,
    contractVersion: ASTER_CONTRACT_VERSION,
    memoryId: "memory.preference.synthetic-1",
    memoryRevision: 1,
    memoryClass: "retained-preference",
    owner: "product-memory",
    subject: {
      subjectId: "synthetic-person-1",
      subjectRevision: "1",
    },
    playerChoiceReferenceId: "choice.synthetic-1",
    value: { preferredInputMode: "voice" },
    sourceReferences: [
      {
        sourceReferenceId: "source.choice-1",
        sourceClass: "player-choice",
        sourceId: "choice.synthetic-1",
        sourceRevision: "1",
      },
    ],
    retention: {
      mode: "player-controlled",
      policyId: "policy.aster.memory.retention.synthetic",
      policyRevision: 1,
      expiresAt: null,
    },
    lifecycle: {
      state: "active",
      correctsMemoryRevision: null,
      supersedesMemoryRevision: null,
      supersededByMemoryRevision: null,
      deletionRequestReferenceId: null,
      reason: null,
    },
    playerControls: {
      visible: true,
      editable: true,
      exportable: true,
      deletable: true,
    },
    egress: {
      mode: "separate-provider-egress-contract-required",
      providerReference: null,
      authorityContextIncluded: false,
    },
    secondaryUse: ASTER_MEMORY_SECONDARY_USE_BOUNDARY,
    missingMemoryFallback: "ask-player",
    corePathMayBlockWhenMissing: false,
    canonicalRecord: false,
    permissionRecord: false,
    providerOperationalOnly: false,
    authority: ASTER_MEMORY_AUTHORITY_BOUNDARY,
  };
}

test("the memory policy matrix covers every class", () => {
  assert.deepEqual(
    Object.keys(ASTER_MEMORY_CLASS_POLICIES),
    ASTER_MEMORY_CLASSES,
  );
  assert.deepEqual(
    validateAsterMemoryClassPolicies(ASTER_MEMORY_CLASS_POLICIES),
    [],
  );
});

test("material product memory is visible, editable, exportable, deletable, and chosen", () => {
  for (const memoryClass of [
    "retained-preference",
    "accessibility-context",
    "retained-conversation",
    "derived-record-linked-memory",
    "narrative-presentation-state",
  ]) {
    const policy = getAsterMemoryClassPolicy(memoryClass);
    assert.equal(policy.productMemory, true);
    assert.equal(policy.material, true);
    assert.equal(policy.requiresSeparatePlayerChoice, true);
    assert.equal(policy.playerVisible, true);
    assert.equal(policy.playerEditable, true);
    assert.equal(policy.playerExportable, true);
    assert.equal(policy.playerDeletable, true);
    assert.equal(policy.corePathMayBlockWhenMissing, false);
  }
});

test("a retained preference validates without canonical or secondary-use authority", () => {
  assert.deepEqual(validateAsterMemoryEntry(makePreferenceMemory()), []);
});

test("hidden retained memory and missing player choice are rejected", () => {
  const unsafePolicies = structuredClone(ASTER_MEMORY_CLASS_POLICIES);
  unsafePolicies["retained-conversation"].playerVisible = false;
  unsafePolicies["retained-conversation"].requiresSeparatePlayerChoice = false;

  const policyIssues = validateAsterMemoryClassPolicies(unsafePolicies);
  assert.ok(
    policyIssues.some(
      (issue) => issue.code === "aster.memory-policy.hidden-material-memory",
    ),
  );
  assert.ok(
    policyIssues.some(
      (issue) => issue.code === "aster.memory-policy.missing-player-choice",
    ),
  );

  const entry = makePreferenceMemory();
  entry.playerChoiceReferenceId = null;
  assert.ok(
    validateAsterMemoryEntry(entry).some(
      (issue) => issue.code === "aster.memory.missing-player-choice",
    ),
  );
});

test("record-linked memory requires exact Chronicle evidence and can be recomputed", () => {
  const entry = makePreferenceMemory();
  entry.memoryClass = "derived-record-linked-memory";
  entry.retention.mode = "record-linked";
  entry.missingMemoryFallback = "recompute-from-authoritative-records";
  entry.sourceReferences = [
    {
      sourceReferenceId: "source.record-1",
      sourceClass: "chronicle-record",
      sourceId: "record.synthetic-1",
      sourceRevision: "3",
    },
  ];

  assert.deepEqual(validateAsterMemoryEntry(entry), []);

  entry.sourceReferences = [];
  assert.ok(
    validateAsterMemoryEntry(entry).some(
      (issue) => issue.code === "aster.memory.missing-required-source",
    ),
  );
});

test("provider operational metadata remains outside product memory", () => {
  const entry = makePreferenceMemory();
  entry.memoryClass = "provider-operational-metadata";
  entry.owner = "provider-operations";
  entry.playerChoiceReferenceId = null;
  entry.value = null;
  entry.sourceReferences = [
    {
      sourceReferenceId: "source.provider-operation-1",
      sourceClass: "provider-operation",
      sourceId: "provider-operation.synthetic-1",
      sourceRevision: "1",
    },
  ];
  entry.retention = {
    mode: "provider-policy-bounded",
    policyId: "policy.provider.synthetic",
    policyRevision: 1,
    expiresAt: "2026-08-27T00:00:00Z",
  };
  entry.playerControls = {
    visible: false,
    editable: false,
    exportable: false,
    deletable: false,
  };
  entry.egress = {
    mode: "provider-operations-only",
    providerReference: "provider.synthetic",
    authorityContextIncluded: false,
  };
  entry.missingMemoryFallback = "provider-independent-operation";
  entry.providerOperationalOnly = true;

  assert.deepEqual(validateAsterMemoryEntry(entry), []);

  entry.value = { rawProviderLog: "not allowed in product memory" };
  assert.ok(
    validateAsterMemoryEntry(entry).some(
      (issue) => issue.code === "aster.memory.provider-metadata-content",
    ),
  );
});

test("deletion and authority escalation are rejected", () => {
  const entry = makePreferenceMemory();
  entry.lifecycle.state = "deleted";
  entry.lifecycle.deletionRequestReferenceId = "deletion.synthetic-1";
  entry.value = null;
  assert.deepEqual(validateAsterMemoryEntry(entry), []);

  entry.value = { resurrected: true };
  entry.secondaryUse.allowed = true;
  entry.authority.canWriteCanonicalRecords = true;
  entry.authority.canCreateOrExpandPermission = true;
  entry.authority.canCompleteQuest = true;
  entry.authority.canGrantReward = true;
  entry.corePathMayBlockWhenMissing = true;

  const issues = validateAsterMemoryEntry(entry);
  assert.ok(
    issues.some(
      (issue) =>
        issue.code === "aster.memory.value-retained-after-unavailability",
    ),
  );
  assert.ok(
    issues.some(
      (issue) => issue.code === "aster.memory.secondary-use-authority",
    ),
  );
  assert.ok(
    issues.some((issue) => issue.code === "aster.memory.canonical-authority"),
  );
  assert.ok(
    issues.some((issue) => issue.code === "aster.memory.permission-authority"),
  );
  assert.ok(
    issues.some((issue) => issue.code === "aster.memory.progression-authority"),
  );
  assert.ok(
    issues.some((issue) => issue.code === "aster.memory.reward-authority"),
  );
  assert.ok(
    issues.some((issue) => issue.code === "aster.memory.core-blocking"),
  );
});
