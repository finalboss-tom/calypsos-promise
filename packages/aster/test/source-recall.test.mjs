import assert from "node:assert/strict";
import test from "node:test";

import {
  ASTER_CONTRACT_VERSION,
  ASTER_RECALL_AUTHORITY_BOUNDARY,
  ASTER_RECALL_SOURCE_AUTHORITY_BOUNDARY,
  validateAsterSourceLinkedRecall,
} from "../dist/index.js";

function makeChronicleSource() {
  return {
    sourceReferenceId: "source-chronicle-1",
    sourceClass: "chronicle-record",
    recordId: "record-1",
    recordRevision: "3",
    chronicleSchemaVersion: "0.1.0-pre.1",
    sourceVersionId: "source-version-1",
    sourceVersionRevision: "2",
    locator: {
      locatorId: "locator-1",
      kind: "record",
      value: "record-1@3",
      approximate: false,
    },
    lifecycle: {
      recordState: "active",
      correctionState: "none",
      conflictState: "none",
      deletionState: "retained",
      relationshipReferenceIds: [],
    },
    mapping: {
      state: "not-mapped",
      mappingId: null,
      mappingRevision: null,
      sourceSystemId: null,
      sourceSystemVersion: null,
      targetConceptId: null,
      implementationGuide: null,
      lossDescription: null,
      conformanceProvesClinicalCompleteness: false,
      conformanceProvesSemanticEquivalence: false,
      conformanceProvesSafety: false,
      conformanceProvesEndorsement: false,
    },
    authoritativeRecord: true,
    clearlyLabeledEducational: false,
    personalClaimAuthority: true,
    authority: ASTER_RECALL_SOURCE_AUTHORITY_BOUNDARY,
  };
}

function makePersonalStatement() {
  return {
    statementId: "statement-1",
    statementClass: "personal-health-recall",
    text: "The synthetic Chronicle records a resting pulse of 72 beats per minute.",
    assertsPersonSpecificFact: true,
    sourceReferenceIds: ["source-chronicle-1"],
    confidence: {
      level: "high",
      basis:
        "The statement copies a value from an exact synthetic Chronicle record revision.",
      notAuthority: true,
    },
    uncertaintyCodes: [],
    sourceLabelsVisible: true,
    lifecycleVisible: true,
    mappingLimitsVisible: true,
    alternativesAndConflictsPreserved: true,
    canonical: false,
    diagnosticClaim: false,
    treatmentClaim: false,
    emergencyDirection: false,
    standardsConformanceClaim: false,
  };
}

function makeRecall() {
  return {
    schemaId: "aster.recall.source-linked",
    schemaRevision: 1,
    contractVersion: ASTER_CONTRACT_VERSION,
    recallId: "recall-1",
    recallRevision: 1,
    role: "librarian",
    mode: "recall",
    subject: {
      subjectId: "synthetic-person-1",
      subjectRevision: "4",
    },
    request: {
      requestId: "request-1",
      requestRevision: 1,
      intentDecisionId: "intent-decision-1",
      intentDecisionRevision: 1,
    },
    retrieval: {
      method: "direct-record-reference",
      freshness: "not-applicable",
      indexId: null,
      indexRevision: null,
      authoritativeRevisionBoundary: "chronicle-revision-4",
      structuredQueryFallback: {
        state: "not-required",
        queryId: null,
        queryRevision: null,
        explanation: "The exact record revision was supplied directly.",
      },
      retrievalScoreIsAuthority: false,
    },
    sources: [makeChronicleSource()],
    statements: [makePersonalStatement()],
    complete: true,
    unavailableReasons: [],
    canonical: false,
    authority: ASTER_RECALL_AUTHORITY_BOUNDARY,
  };
}

test("an exact Chronicle-linked personal recall validates", () => {
  assert.deepEqual(validateAsterSourceLinkedRecall(makeRecall()), []);
});

test("personal health recall cannot rely only on public education", () => {
  const recall = makeRecall();
  recall.sources = [
    {
      sourceReferenceId: "public-1",
      sourceClass: "public-educational-material",
      materialId: "material-1",
      materialRevision: "1",
      title: "Synthetic public health education",
      publisher: "Calypso's Promise synthetic fixtures",
      locator: {
        locatorId: "public-locator-1",
        kind: "whole-source",
        value: "material-1@1",
        approximate: false,
      },
      availability: "available",
      authoritativeRecord: false,
      clearlyLabeledEducational: true,
      personalClaimAuthority: false,
      authority: ASTER_RECALL_SOURCE_AUTHORITY_BOUNDARY,
    },
  ];
  recall.statements[0].sourceReferenceIds = ["public-1"];

  const issues = validateAsterSourceLinkedRecall(recall);
  assert.ok(
    issues.some(
      (issue) =>
        issue.code === "aster.recall.personal-statement-without-chronicle",
    ),
  );
});

test("public education remains labeled and non-personal", () => {
  const recall = makeRecall();
  recall.sources = [
    {
      sourceReferenceId: "public-1",
      sourceClass: "public-educational-material",
      materialId: "material-1",
      materialRevision: "1",
      title: "Synthetic public health education",
      publisher: "Calypso's Promise synthetic fixtures",
      locator: {
        locatorId: "public-locator-1",
        kind: "whole-source",
        value: "material-1@1",
        approximate: false,
      },
      availability: "available",
      authoritativeRecord: false,
      clearlyLabeledEducational: true,
      personalClaimAuthority: false,
      authority: ASTER_RECALL_SOURCE_AUTHORITY_BOUNDARY,
    },
  ];
  recall.statements = [
    {
      ...makePersonalStatement(),
      statementClass: "public-education",
      text: "This is clearly labeled synthetic educational material.",
      assertsPersonSpecificFact: false,
      sourceReferenceIds: ["public-1"],
      uncertaintyCodes: ["public-education-not-personal-evidence"],
    },
  ];

  assert.deepEqual(validateAsterSourceLinkedRecall(recall), []);
});

test("stale semantic retrieval must use structured query fallback", () => {
  const recall = makeRecall();
  recall.retrieval = {
    method: "semantic-index",
    freshness: "stale",
    indexId: "index-1",
    indexRevision: "7",
    authoritativeRevisionBoundary: "chronicle-revision-3",
    structuredQueryFallback: {
      state: "not-required",
      queryId: null,
      queryRevision: null,
      explanation: "Unsafe fixture: the stale index was used without fallback.",
    },
    retrievalScoreIsAuthority: false,
  };

  const issues = validateAsterSourceLinkedRecall(recall);
  assert.ok(
    issues.some(
      (issue) => issue.code === "aster.recall.semantic-fallback-required",
    ),
  );
});

test("mapping loss, conflict, correction, and unavailable sources stay visible", () => {
  const recall = makeRecall();
  recall.sources[0].lifecycle = {
    recordState: "corrected",
    correctionState: "corrected",
    conflictState: "unresolved",
    deletionState: "unavailable",
    relationshipReferenceIds: ["correction-1", "conflict-1"],
  };
  recall.sources[0].mapping = {
    state: "lossy",
    mappingId: "mapping-1",
    mappingRevision: "2",
    sourceSystemId: "synthetic-source-system",
    sourceSystemVersion: "1",
    targetConceptId: "concept-1",
    implementationGuide: {
      standardId: "synthetic-standard",
      standardVersion: "1",
      guideId: "synthetic-guide",
      guideVersion: "2",
      profileId: "profile-1",
    },
    lossDescription: "A source qualifier has no equivalent target field.",
    conformanceProvesClinicalCompleteness: false,
    conformanceProvesSemanticEquivalence: false,
    conformanceProvesSafety: false,
    conformanceProvesEndorsement: false,
  };

  let issues = validateAsterSourceLinkedRecall(recall);
  assert.ok(
    issues.some(
      (issue) => issue.code === "aster.recall.required-uncertainty-hidden",
    ),
  );

  recall.statements[0].uncertaintyCodes = [
    "mapping-loss",
    "source-conflict",
    "correction-or-supersession",
    "source-deleted-or-unavailable",
    "implementation-guide-limitation",
  ];
  issues = validateAsterSourceLinkedRecall(recall);
  assert.deepEqual(issues, []);
});

test("recall cannot gain clinical, standards, provider, or canonical authority", () => {
  const recall = makeRecall();
  recall.canonical = true;
  recall.statements[0].diagnosticClaim = true;
  recall.sources[0].authority = {
    ...ASTER_RECALL_SOURCE_AUTHORITY_BOUNDARY,
    providerRankIsTruth: true,
  };
  recall.authority = {
    ...ASTER_RECALL_AUTHORITY_BOUNDARY,
    canTreatStandardsConformanceAsTruth: true,
  };

  const issues = validateAsterSourceLinkedRecall(recall);
  assert.ok(
    issues.some((issue) => issue.code === "aster.recall.canonical-recall"),
  );
  assert.ok(
    issues.some((issue) => issue.code === "aster.recall.clinical-overclaim"),
  );
  assert.ok(
    issues.some(
      (issue) => issue.code === "aster.recall.source-authority-escalation",
    ),
  );
  assert.ok(
    issues.some((issue) => issue.code === "aster.recall.authority-escalation"),
  );
});
