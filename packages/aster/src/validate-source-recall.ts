import {
  ASTER_RECALL_CONFLICT_STATES,
  ASTER_RECALL_CORRECTION_STATES,
  ASTER_RECALL_DELETION_STATES,
  ASTER_RECALL_FALLBACK_STATES,
  ASTER_RECALL_FRESHNESS_STATES,
  ASTER_RECALL_LOCATOR_KINDS,
  ASTER_RECALL_MAPPING_STATES,
  ASTER_RECALL_MODES,
  ASTER_RECALL_RECORD_STATES,
  ASTER_RECALL_RETRIEVAL_METHODS,
  ASTER_RECALL_ROLES,
  ASTER_RECALL_SOURCE_CLASSES,
  ASTER_RECALL_STATEMENT_CLASSES,
  ASTER_RECALL_UNCERTAINTY_CODES,
  ASTER_CONTRACT_VERSION,
  getAsterRecallModeForRole,
  isAsterRecallConfidenceLevel,
  type AsterRecallRole,
  type AsterRecallUncertaintyCode,
} from "./source-recall.js";

export const ASTER_RECALL_VALIDATION_ISSUE_CODES = [
  "aster.recall.invalid-recall",
  "aster.recall.invalid-schema",
  "aster.recall.invalid-contract-version",
  "aster.recall.invalid-identity",
  "aster.recall.invalid-role",
  "aster.recall.role-mode-mismatch",
  "aster.recall.invalid-subject",
  "aster.recall.invalid-request",
  "aster.recall.invalid-retrieval",
  "aster.recall.semantic-fallback-required",
  "aster.recall.retrieval-authority",
  "aster.recall.empty-sources",
  "aster.recall.duplicate-source-reference",
  "aster.recall.invalid-source",
  "aster.recall.invalid-chronicle-reference",
  "aster.recall.invalid-public-material",
  "aster.recall.invalid-locator",
  "aster.recall.invalid-lifecycle",
  "aster.recall.invalid-mapping",
  "aster.recall.mapping-loss-hidden",
  "aster.recall.conformance-overclaim",
  "aster.recall.source-authority-escalation",
  "aster.recall.empty-statements",
  "aster.recall.invalid-statement",
  "aster.recall.missing-source-reference",
  "aster.recall.unknown-source-reference",
  "aster.recall.personal-statement-without-chronicle",
  "aster.recall.public-education-mislabeled",
  "aster.recall.invalid-confidence",
  "aster.recall.invalid-uncertainty",
  "aster.recall.required-uncertainty-hidden",
  "aster.recall.visibility-boundary",
  "aster.recall.canonical-statement",
  "aster.recall.clinical-overclaim",
  "aster.recall.incomplete-without-reason",
  "aster.recall.canonical-recall",
  "aster.recall.authority-escalation",
] as const;

export type AsterRecallValidationIssueCode =
  (typeof ASTER_RECALL_VALIDATION_ISSUE_CODES)[number];

export interface AsterRecallValidationIssue {
  readonly code: AsterRecallValidationIssueCode;
  readonly path: string;
  readonly message: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isPositiveInteger(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) > 0;
}

function isNonEmptyArray(value: unknown): value is readonly unknown[] {
  return Array.isArray(value) && value.length > 0;
}

function includesString(values: readonly string[], value: unknown): boolean {
  return typeof value === "string" && values.includes(value);
}

function addIssue(
  issues: AsterRecallValidationIssue[],
  code: AsterRecallValidationIssueCode,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}

function validateConfidence(value: unknown): boolean {
  return (
    isRecord(value) &&
    isAsterRecallConfidenceLevel(value.level) &&
    isNonEmptyString(value.basis) &&
    value.notAuthority === true &&
    !("score" in value) &&
    !("probability" in value) &&
    !("percentage" in value)
  );
}

function validateLocator(
  issues: AsterRecallValidationIssue[],
  value: unknown,
  path: string,
): void {
  if (
    !isRecord(value) ||
    !isNonEmptyString(value.locatorId) ||
    !includesString(ASTER_RECALL_LOCATOR_KINDS, value.kind) ||
    !isNonEmptyString(value.value) ||
    typeof value.approximate !== "boolean"
  ) {
    addIssue(
      issues,
      "aster.recall.invalid-locator",
      path,
      "Source locators need an identity, recognized kind, inspectable value, and explicit approximation state.",
    );
  }
}

function validateSourceAuthority(
  issues: AsterRecallValidationIssue[],
  value: unknown,
  path: string,
): void {
  const authority = isRecord(value) ? value : {};
  if (
    authority.retrievalScoreIsTruth !== false ||
    authority.providerRankIsTruth !== false ||
    authority.newestSourceIsTruth !== false ||
    authority.standardsProfileIsTruth !== false
  ) {
    addIssue(
      issues,
      "aster.recall.source-authority-escalation",
      path,
      "A source cannot become truth because of retrieval score, provider rank, recency, or standards profile.",
    );
  }
}

function validateLifecycle(
  issues: AsterRecallValidationIssue[],
  value: unknown,
  path: string,
): void {
  if (!isRecord(value)) {
    addIssue(
      issues,
      "aster.recall.invalid-lifecycle",
      path,
      "Chronicle recall sources must expose lifecycle state.",
    );
    return;
  }

  if (
    !includesString(ASTER_RECALL_RECORD_STATES, value.recordState) ||
    !includesString(ASTER_RECALL_CORRECTION_STATES, value.correctionState) ||
    !includesString(ASTER_RECALL_CONFLICT_STATES, value.conflictState) ||
    !includesString(ASTER_RECALL_DELETION_STATES, value.deletionState) ||
    !Array.isArray(value.relationshipReferenceIds)
  ) {
    addIssue(
      issues,
      "aster.recall.invalid-lifecycle",
      path,
      "Lifecycle must preserve record, correction, conflict, deletion, and relationship-reference state.",
    );
  }
}

function validateImplementationGuide(value: unknown): boolean {
  return (
    isRecord(value) &&
    isNonEmptyString(value.standardId) &&
    isNonEmptyString(value.standardVersion) &&
    isNonEmptyString(value.guideId) &&
    isNonEmptyString(value.guideVersion) &&
    (value.profileId === null || isNonEmptyString(value.profileId))
  );
}

function validateMapping(
  issues: AsterRecallValidationIssue[],
  value: unknown,
  path: string,
): void {
  if (
    !isRecord(value) ||
    !includesString(ASTER_RECALL_MAPPING_STATES, value.state)
  ) {
    addIssue(
      issues,
      "aster.recall.invalid-mapping",
      path,
      "Mapping state must use the public taxonomy.",
    );
    return;
  }

  const mapped = value.state !== "not-mapped";
  if (
    mapped &&
    (!isNonEmptyString(value.mappingId) ||
      !isNonEmptyString(value.mappingRevision))
  ) {
    addIssue(
      issues,
      "aster.recall.invalid-mapping",
      path,
      "Mapped material requires an exact mapping identity and revision.",
    );
  }

  if (
    value.implementationGuide !== null &&
    !validateImplementationGuide(value.implementationGuide)
  ) {
    addIssue(
      issues,
      "aster.recall.invalid-mapping",
      `${path}.implementationGuide`,
      "Implementation-guide references require exact standard, guide, and version identifiers.",
    );
  }

  if (
    ["partial", "lossy", "conflicting", "unsupported"].includes(
      String(value.state),
    ) &&
    !isNonEmptyString(value.lossDescription)
  ) {
    addIssue(
      issues,
      "aster.recall.mapping-loss-hidden",
      `${path}.lossDescription`,
      "Partial, lossy, conflicting, or unsupported mapping requires a visible loss description.",
    );
  }

  if (
    value.conformanceProvesClinicalCompleteness !== false ||
    value.conformanceProvesSemanticEquivalence !== false ||
    value.conformanceProvesSafety !== false ||
    value.conformanceProvesEndorsement !== false
  ) {
    addIssue(
      issues,
      "aster.recall.conformance-overclaim",
      path,
      "Standards or implementation-guide conformance cannot prove completeness, equivalence, safety, or endorsement.",
    );
  }
}

function validateRetrieval(
  issues: AsterRecallValidationIssue[],
  value: unknown,
  path: string,
): void {
  if (!isRecord(value)) {
    addIssue(
      issues,
      "aster.recall.invalid-retrieval",
      path,
      "Recall requires inspectable retrieval evidence.",
    );
    return;
  }

  if (
    !includesString(ASTER_RECALL_RETRIEVAL_METHODS, value.method) ||
    !includesString(ASTER_RECALL_FRESHNESS_STATES, value.freshness) ||
    value.retrievalScoreIsAuthority !== false
  ) {
    addIssue(
      issues,
      value.retrievalScoreIsAuthority === false
        ? "aster.recall.invalid-retrieval"
        : "aster.recall.retrieval-authority",
      path,
      "Retrieval must use the public method and freshness taxonomy and cannot create authority.",
    );
  }

  const fallback = isRecord(value.structuredQueryFallback)
    ? value.structuredQueryFallback
    : {};

  if (
    !includesString(ASTER_RECALL_FALLBACK_STATES, fallback.state) ||
    !isNonEmptyString(fallback.explanation)
  ) {
    addIssue(
      issues,
      "aster.recall.invalid-retrieval",
      `${path}.structuredQueryFallback`,
      "Structured-query fallback needs a recognized state and direct explanation.",
    );
  }

  if (
    value.method === "semantic-index" &&
    (!isNonEmptyString(value.indexId) || !isNonEmptyString(value.indexRevision))
  ) {
    addIssue(
      issues,
      "aster.recall.invalid-retrieval",
      path,
      "Semantic retrieval requires an exact index identity and revision.",
    );
  }

  if (
    value.method === "semantic-index" &&
    value.freshness !== "current" &&
    fallback.state !== "used"
  ) {
    addIssue(
      issues,
      "aster.recall.semantic-fallback-required",
      `${path}.structuredQueryFallback`,
      "Stale, unavailable, or unknown semantic retrieval must use the structured-query fallback before returning recalled statements.",
    );
  }

  if (
    fallback.state === "used" &&
    (!isNonEmptyString(fallback.queryId) ||
      !isNonEmptyString(fallback.queryRevision))
  ) {
    addIssue(
      issues,
      "aster.recall.invalid-retrieval",
      `${path}.structuredQueryFallback`,
      "A used structured-query fallback requires an exact query identity and revision.",
    );
  }
}

function addRequiredUncertainty(
  required: Set<AsterRecallUncertaintyCode>,
  code: AsterRecallUncertaintyCode,
  condition: boolean,
): void {
  if (condition) {
    required.add(code);
  }
}

export function validateAsterSourceLinkedRecall(
  value: unknown,
): readonly AsterRecallValidationIssue[] {
  const issues: AsterRecallValidationIssue[] = [];

  if (!isRecord(value)) {
    addIssue(
      issues,
      "aster.recall.invalid-recall",
      "$",
      "A source-linked recall must be an object.",
    );
    return issues;
  }

  if (
    value.schemaId !== "aster.recall.source-linked" ||
    value.schemaRevision !== 1
  ) {
    addIssue(
      issues,
      "aster.recall.invalid-schema",
      "$.schemaId",
      "Source-linked recall must use the recognized schema and revision.",
    );
  }

  if (value.contractVersion !== ASTER_CONTRACT_VERSION) {
    addIssue(
      issues,
      "aster.recall.invalid-contract-version",
      "$.contractVersion",
      "Recall must identify the active Aster contract version.",
    );
  }

  if (
    !isNonEmptyString(value.recallId) ||
    !isPositiveInteger(value.recallRevision)
  ) {
    addIssue(
      issues,
      "aster.recall.invalid-identity",
      "$.recallId",
      "Recall identity and revision must be stable and inspectable.",
    );
  }

  const role = includesString(ASTER_RECALL_ROLES, value.role)
    ? (value.role as AsterRecallRole)
    : null;
  if (role === null) {
    addIssue(
      issues,
      "aster.recall.invalid-role",
      "$.role",
      "Source-linked recall is limited to Librarian recall and Interpreter explanation.",
    );
  } else if (
    !includesString(ASTER_RECALL_MODES, value.mode) ||
    value.mode !== getAsterRecallModeForRole(role)
  ) {
    addIssue(
      issues,
      "aster.recall.role-mode-mismatch",
      "$.mode",
      "Recall mode must match the bounded Librarian or Interpreter role.",
    );
  }

  const subject = isRecord(value.subject) ? value.subject : {};
  if (
    !isNonEmptyString(subject.subjectId) ||
    !(
      subject.subjectRevision === null ||
      isNonEmptyString(subject.subjectRevision)
    )
  ) {
    addIssue(
      issues,
      "aster.recall.invalid-subject",
      "$.subject",
      "Recall must identify its subject without choosing or changing subject authority.",
    );
  }

  const request = isRecord(value.request) ? value.request : {};
  if (
    !isNonEmptyString(request.requestId) ||
    !isPositiveInteger(request.requestRevision) ||
    !isNonEmptyString(request.intentDecisionId) ||
    !isPositiveInteger(request.intentDecisionRevision)
  ) {
    addIssue(
      issues,
      "aster.recall.invalid-request",
      "$.request",
      "Recall must bind the exact request and intent-decision revisions.",
    );
  }

  validateRetrieval(issues, value.retrieval, "$.retrieval");

  const sources = Array.isArray(value.sources) ? value.sources : [];
  if (sources.length === 0) {
    addIssue(
      issues,
      "aster.recall.empty-sources",
      "$.sources",
      "Source-linked recall requires at least one inspectable source reference.",
    );
  }

  const sourceIndex = new Map<string, Record<string, unknown>>();
  for (const [index, source] of sources.entries()) {
    const path = `$.sources[${index}]`;
    if (
      !isRecord(source) ||
      !isNonEmptyString(source.sourceReferenceId) ||
      !includesString(ASTER_RECALL_SOURCE_CLASSES, source.sourceClass)
    ) {
      addIssue(
        issues,
        "aster.recall.invalid-source",
        path,
        "Recall sources need a stable identity and recognized source class.",
      );
      continue;
    }

    if (sourceIndex.has(source.sourceReferenceId)) {
      addIssue(
        issues,
        "aster.recall.duplicate-source-reference",
        `${path}.sourceReferenceId`,
        "Source-reference identities must be unique.",
      );
    }
    sourceIndex.set(source.sourceReferenceId, source);

    validateLocator(issues, source.locator, `${path}.locator`);
    validateSourceAuthority(issues, source.authority, `${path}.authority`);

    if (source.sourceClass === "chronicle-record") {
      if (
        !isNonEmptyString(source.recordId) ||
        !isNonEmptyString(source.recordRevision) ||
        !isNonEmptyString(source.chronicleSchemaVersion) ||
        !isNonEmptyString(source.sourceVersionId) ||
        !isNonEmptyString(source.sourceVersionRevision) ||
        source.authoritativeRecord !== true ||
        source.clearlyLabeledEducational !== false ||
        source.personalClaimAuthority !== true
      ) {
        addIssue(
          issues,
          "aster.recall.invalid-chronicle-reference",
          path,
          "Chronicle sources require exact record, record revision, schema, source-version, and authority references.",
        );
      }
      validateLifecycle(issues, source.lifecycle, `${path}.lifecycle`);
      validateMapping(issues, source.mapping, `${path}.mapping`);
    } else {
      if (
        !isNonEmptyString(source.materialId) ||
        !isNonEmptyString(source.materialRevision) ||
        !isNonEmptyString(source.title) ||
        !isNonEmptyString(source.publisher) ||
        !["available", "withdrawn", "deleted", "unavailable"].includes(
          String(source.availability),
        ) ||
        source.authoritativeRecord !== false ||
        source.clearlyLabeledEducational !== true ||
        source.personalClaimAuthority !== false
      ) {
        addIssue(
          issues,
          "aster.recall.invalid-public-material",
          path,
          "Public educational sources must be versioned, clearly labeled, and unable to establish a person-specific fact.",
        );
      }
    }
  }

  const statements = Array.isArray(value.statements) ? value.statements : [];
  if (value.complete === true && statements.length === 0) {
    addIssue(
      issues,
      "aster.recall.empty-statements",
      "$.statements",
      "A complete recall needs at least one source-linked statement.",
    );
  }

  for (const [index, statement] of statements.entries()) {
    const path = `$.statements[${index}]`;
    if (
      !isRecord(statement) ||
      !isNonEmptyString(statement.statementId) ||
      !includesString(
        ASTER_RECALL_STATEMENT_CLASSES,
        statement.statementClass,
      ) ||
      !isNonEmptyString(statement.text) ||
      typeof statement.assertsPersonSpecificFact !== "boolean"
    ) {
      addIssue(
        issues,
        "aster.recall.invalid-statement",
        path,
        "Recall statements need an identity, recognized class, text, and explicit personal-fact classification.",
      );
      continue;
    }

    const sourceReferenceIds = Array.isArray(statement.sourceReferenceIds)
      ? statement.sourceReferenceIds
      : [];
    if (sourceReferenceIds.length === 0) {
      addIssue(
        issues,
        "aster.recall.missing-source-reference",
        `${path}.sourceReferenceIds`,
        "Every recalled statement must reference inspectable source evidence.",
      );
    }

    const referencedSources: Record<string, unknown>[] = [];
    for (const sourceReferenceId of sourceReferenceIds) {
      if (
        !isNonEmptyString(sourceReferenceId) ||
        !sourceIndex.has(sourceReferenceId)
      ) {
        addIssue(
          issues,
          "aster.recall.unknown-source-reference",
          `${path}.sourceReferenceIds`,
          "Statement source references must resolve inside the recall envelope.",
        );
      } else {
        referencedSources.push(sourceIndex.get(sourceReferenceId)!);
      }
    }

    const hasChronicleSource = referencedSources.some(
      (source) => source.sourceClass === "chronicle-record",
    );
    const hasPublicSource = referencedSources.some(
      (source) => source.sourceClass === "public-educational-material",
    );

    if (
      statement.statementClass === "personal-health-recall" &&
      (!hasChronicleSource || statement.assertsPersonSpecificFact !== true)
    ) {
      addIssue(
        issues,
        "aster.recall.personal-statement-without-chronicle",
        path,
        "A person-specific health statement requires at least one exact Chronicle record and revision reference.",
      );
    }

    if (
      statement.statementClass === "public-education" &&
      (!hasPublicSource || statement.assertsPersonSpecificFact !== false)
    ) {
      addIssue(
        issues,
        "aster.recall.public-education-mislabeled",
        path,
        "Public education must remain clearly labeled and cannot assert a person-specific fact.",
      );
    }

    if (!validateConfidence(statement.confidence)) {
      addIssue(
        issues,
        "aster.recall.invalid-confidence",
        `${path}.confidence`,
        "Recall confidence must be qualitative, explained, and explicitly non-authoritative.",
      );
    }

    const uncertaintyCodes = Array.isArray(statement.uncertaintyCodes)
      ? statement.uncertaintyCodes
      : [];
    if (
      uncertaintyCodes.some(
        (code) => !includesString(ASTER_RECALL_UNCERTAINTY_CODES, code),
      )
    ) {
      addIssue(
        issues,
        "aster.recall.invalid-uncertainty",
        `${path}.uncertaintyCodes`,
        "Recall uncertainty must use the public uncertainty taxonomy.",
      );
    }

    const requiredUncertainty = new Set<AsterRecallUncertaintyCode>();
    for (const source of referencedSources) {
      if (source.sourceClass === "public-educational-material") {
        requiredUncertainty.add("public-education-not-personal-evidence");
        continue;
      }

      const lifecycle = isRecord(source.lifecycle) ? source.lifecycle : {};
      const mapping = isRecord(source.mapping) ? source.mapping : {};
      addRequiredUncertainty(
        requiredUncertainty,
        "source-conflict",
        lifecycle.conflictState === "unresolved" ||
          lifecycle.conflictState === "preferred-presentation",
      );
      addRequiredUncertainty(
        requiredUncertainty,
        "correction-or-supersession",
        lifecycle.correctionState !== "none",
      );
      addRequiredUncertainty(
        requiredUncertainty,
        "source-deleted-or-unavailable",
        lifecycle.deletionState === "deleted" ||
          lifecycle.deletionState === "unavailable",
      );
      addRequiredUncertainty(
        requiredUncertainty,
        "mapping-loss",
        ["partial", "lossy", "conflicting", "unsupported"].includes(
          String(mapping.state),
        ),
      );
      addRequiredUncertainty(
        requiredUncertainty,
        "implementation-guide-limitation",
        mapping.implementationGuide !== null,
      );
    }

    for (const requiredCode of requiredUncertainty) {
      if (!uncertaintyCodes.includes(requiredCode)) {
        addIssue(
          issues,
          "aster.recall.required-uncertainty-hidden",
          `${path}.uncertaintyCodes`,
          `The statement must expose ${requiredCode}.`,
        );
      }
    }

    if (
      statement.sourceLabelsVisible !== true ||
      statement.lifecycleVisible !== true ||
      statement.mappingLimitsVisible !== true ||
      statement.alternativesAndConflictsPreserved !== true
    ) {
      addIssue(
        issues,
        "aster.recall.visibility-boundary",
        path,
        "Recall must keep source labels, lifecycle, mapping limits, alternatives, and conflicts visible.",
      );
    }

    if (statement.canonical !== false) {
      addIssue(
        issues,
        "aster.recall.canonical-statement",
        `${path}.canonical`,
        "A recalled statement is not a canonical Chronicle record.",
      );
    }

    if (
      statement.diagnosticClaim !== false ||
      statement.treatmentClaim !== false ||
      statement.emergencyDirection !== false ||
      statement.standardsConformanceClaim !== false
    ) {
      addIssue(
        issues,
        "aster.recall.clinical-overclaim",
        path,
        "Recall cannot diagnose, prescribe, direct emergency care, or represent standards conformance as clinical authority.",
      );
    }
  }

  if (
    value.complete === false &&
    (!isNonEmptyArray(value.unavailableReasons) ||
      value.unavailableReasons.some(
        (reason: unknown) => !isNonEmptyString(reason),
      ))
  ) {
    addIssue(
      issues,
      "aster.recall.incomplete-without-reason",
      "$.unavailableReasons",
      "Incomplete recall requires direct, inspectable unavailability reasons.",
    );
  }

  if (value.canonical !== false) {
    addIssue(
      issues,
      "aster.recall.canonical-recall",
      "$.canonical",
      "A source-linked recall is not canonical Chronicle truth.",
    );
  }

  const authority = isRecord(value.authority) ? value.authority : {};
  if (
    authority.canWriteCanonicalRecords !== false ||
    authority.canCreateOrExpandPermission !== false ||
    authority.canSelfConfirm !== false ||
    authority.canInvokeAuthoritativeAction !== false ||
    authority.canDiagnose !== false ||
    authority.canPrescribe !== false ||
    authority.canDirectEmergencyCare !== false ||
    authority.canTreatRetrievalScoreAsTruth !== false ||
    authority.canTreatProviderRankAsTruth !== false ||
    authority.canTreatNewestSourceAsTruth !== false ||
    authority.canTreatStandardsConformanceAsTruth !== false
  ) {
    addIssue(
      issues,
      "aster.recall.authority-escalation",
      "$.authority",
      "Recall cannot create canonical, permission, clinical, provider, retrieval, recency, or standards authority.",
    );
  }

  return issues;
}
