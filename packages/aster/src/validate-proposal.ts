import {
  ASTER_AUTHORITATIVE_ACTION_OWNERS,
  ASTER_ROLE_AUTHORITY_MATRIX,
  ASTER_ROLES,
  type AsterRole,
} from "./authority.js";
import {
  ASTER_ROLE_CONTRACTS,
  ASTER_ROLE_OPERATION_BY_ROLE,
} from "./role-contracts.js";
import {
  ASTER_CONTRACT_VERSION,
  ASTER_EXTRACTION_STATES,
  ASTER_EXTRACTION_VALUE_CLASSES,
  ASTER_PRIMARY_PROPOSAL_KIND_BY_ROLE,
  ASTER_PRODUCER_CLASSES,
  ASTER_PROPOSAL_KINDS,
  ASTER_PROPOSAL_REVIEW_STATES,
  ASTER_QUALITATIVE_CONFIDENCE_LEVELS,
  ASTER_REVIEW_ACTORS,
  ASTER_SUBJECT_CLASSES,
  ASTER_TRANSFORMATION_CLASSES,
  type AsterProposalEnvelope,
  type AsterStructuredExtraction,
} from "./proposal.js";

export const ASTER_PROPOSAL_VALIDATION_ISSUE_CODES = [
  "aster.proposal.invalid-envelope",
  "aster.proposal.invalid-schema",
  "aster.proposal.invalid-contract-version",
  "aster.proposal.invalid-proposal-id",
  "aster.proposal.invalid-proposal-revision",
  "aster.proposal.invalid-role",
  "aster.proposal.invalid-operation",
  "aster.proposal.invalid-kind",
  "aster.proposal.role-kind-mismatch",
  "aster.proposal.invalid-subject",
  "aster.proposal.invalid-request-reference",
  "aster.proposal.invalid-producer",
  "aster.proposal.empty-source-references",
  "aster.proposal.invalid-source-reference",
  "aster.proposal.disallowed-source-class",
  "aster.proposal.empty-transformation-provenance",
  "aster.proposal.invalid-transformation-step",
  "aster.proposal.invalid-intended-action",
  "aster.proposal.action-owner-mismatch",
  "aster.proposal.confirmation-rule-mismatch",
  "aster.proposal.invalid-confidence",
  "aster.proposal.invalid-payload",
  "aster.proposal.canonical-payload",
  "aster.proposal.invalid-review",
  "aster.proposal.review-not-bound-to-revision",
  "aster.proposal.canonical-write-authority",
  "aster.proposal.permission-authority",
  "aster.proposal.self-confirmation-authority",
  "aster.proposal.authoritative-invocation",
  "aster.proposal.quest-completion-authority",
  "aster.proposal.reward-authority",
  "aster.proposal.domain-outcome-authority",
  "aster.proposal.invalid-structured-extraction",
] as const;

export type AsterProposalValidationIssueCode =
  (typeof ASTER_PROPOSAL_VALIDATION_ISSUE_CODES)[number];

export interface AsterProposalValidationIssue {
  readonly code: AsterProposalValidationIssueCode;
  readonly path: string;
  readonly message: string;
}

export const ASTER_EXTRACTION_VALIDATION_ISSUE_CODES = [
  "aster.extraction.invalid-extraction",
  "aster.extraction.invalid-schema",
  "aster.extraction.invalid-state",
  "aster.extraction.empty-candidates",
  "aster.extraction.invalid-candidate",
  "aster.extraction.duplicate-candidate-id",
  "aster.extraction.invalid-value-class",
  "aster.extraction.missing-source-reference",
  "aster.extraction.missing-transformation-step",
  "aster.extraction.invalid-confidence",
  "aster.extraction.canonical-candidate",
  "aster.extraction.confirmed-candidate",
  "aster.extraction.domain-accepted-candidate",
  "aster.extraction.invalid-unparsed-segment",
  "aster.extraction.canonical-record",
] as const;

export type AsterExtractionValidationIssueCode =
  (typeof ASTER_EXTRACTION_VALIDATION_ISSUE_CODES)[number];

export interface AsterExtractionValidationIssue {
  readonly code: AsterExtractionValidationIssueCode;
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

function addProposalIssue(
  issues: AsterProposalValidationIssue[],
  code: AsterProposalValidationIssueCode,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}

function addExtractionIssue(
  issues: AsterExtractionValidationIssue[],
  code: AsterExtractionValidationIssueCode,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}

function validateConfidence(value: unknown): boolean {
  return (
    isRecord(value) &&
    includesString(ASTER_QUALITATIVE_CONFIDENCE_LEVELS, value.level) &&
    isNonEmptyString(value.basis) &&
    value.notAuthority === true
  );
}

export function validateAsterStructuredExtraction(
  value: unknown,
): readonly AsterExtractionValidationIssue[] {
  const issues: AsterExtractionValidationIssue[] = [];

  if (!isRecord(value)) {
    addExtractionIssue(
      issues,
      "aster.extraction.invalid-extraction",
      "$",
      "A structured extraction must be an object.",
    );
    return issues;
  }

  if (value.schemaId !== "aster.extraction.structured" || value.schemaRevision !== 1) {
    addExtractionIssue(
      issues,
      "aster.extraction.invalid-schema",
      "$.schemaId",
      "Structured extraction must use the recognized schema and revision.",
    );
  }

  if (!includesString(ASTER_EXTRACTION_STATES, value.state)) {
    addExtractionIssue(
      issues,
      "aster.extraction.invalid-state",
      "$.state",
      "Extraction state must use the public taxonomy.",
    );
  }

  const candidates = Array.isArray(value.candidates) ? value.candidates : [];
  if (value.state !== "unsupported" && candidates.length === 0) {
    addExtractionIssue(
      issues,
      "aster.extraction.empty-candidates",
      "$.candidates",
      "Draft and clarification-required extractions need at least one candidate.",
    );
  }

  const candidateIds = new Set<string>();
  for (const [index, candidate] of candidates.entries()) {
    const path = `$.candidates[${index}]`;
    if (
      !isRecord(candidate) ||
      !isNonEmptyString(candidate.candidateId) ||
      !isNonEmptyString(candidate.fieldPath) ||
      candidate.state !== "candidate"
    ) {
      addExtractionIssue(
        issues,
        "aster.extraction.invalid-candidate",
        path,
        "Every extraction candidate needs an identifier, field path, and candidate state.",
      );
      continue;
    }

    if (candidateIds.has(candidate.candidateId)) {
      addExtractionIssue(
        issues,
        "aster.extraction.duplicate-candidate-id",
        `${path}.candidateId`,
        "Extraction candidate identifiers must be unique.",
      );
    }
    candidateIds.add(candidate.candidateId);

    if (!includesString(ASTER_EXTRACTION_VALUE_CLASSES, candidate.valueClass)) {
      addExtractionIssue(
        issues,
        "aster.extraction.invalid-value-class",
        `${path}.valueClass`,
        "Extraction values must use the public value-class taxonomy.",
      );
    }

    if (!isNonEmptyArray(candidate.sourceReferenceIds)) {
      addExtractionIssue(
        issues,
        "aster.extraction.missing-source-reference",
        `${path}.sourceReferenceIds`,
        "Every candidate must reference its source material without becoming source truth.",
      );
    }

    if (!isNonEmptyArray(candidate.transformationStepIds)) {
      addExtractionIssue(
        issues,
        "aster.extraction.missing-transformation-step",
        `${path}.transformationStepIds`,
        "Every candidate must reference its transformation provenance.",
      );
    }

    if (!validateConfidence(candidate.confidence)) {
      addExtractionIssue(
        issues,
        "aster.extraction.invalid-confidence",
        `${path}.confidence`,
        "Candidate confidence must be qualitative, explained, and non-authoritative.",
      );
    }

    if (candidate.canonical !== false) {
      addExtractionIssue(
        issues,
        "aster.extraction.canonical-candidate",
        `${path}.canonical`,
        "An extraction candidate is not a canonical Chronicle value.",
      );
    }

    if (candidate.playerConfirmed !== false) {
      addExtractionIssue(
        issues,
        "aster.extraction.confirmed-candidate",
        `${path}.playerConfirmed`,
        "Extraction output cannot confirm itself or represent player confirmation.",
      );
    }

    if (candidate.domainAccepted !== false) {
      addExtractionIssue(
        issues,
        "aster.extraction.domain-accepted-candidate",
        `${path}.domainAccepted`,
        "Extraction output cannot represent domain validation or acceptance.",
      );
    }
  }

  const unparsedSegments = Array.isArray(value.unparsedSegments)
    ? value.unparsedSegments
    : [];
  for (const [index, segment] of unparsedSegments.entries()) {
    if (
      !isRecord(segment) ||
      !isNonEmptyString(segment.segmentId) ||
      !isNonEmptyString(segment.sourceReferenceId) ||
      !isNonEmptyString(segment.reason)
    ) {
      addExtractionIssue(
        issues,
        "aster.extraction.invalid-unparsed-segment",
        `$.unparsedSegments[${index}]`,
        "Unparsed source segments must remain visible with a source reference and reason.",
      );
    }
  }

  if (value.canonicalRecord !== false) {
    addExtractionIssue(
      issues,
      "aster.extraction.canonical-record",
      "$.canonicalRecord",
      "Structured extraction is never itself a canonical Chronicle record.",
    );
  }

  return issues;
}

export function validateAsterProposalEnvelope(
  value: unknown,
): readonly AsterProposalValidationIssue[] {
  const issues: AsterProposalValidationIssue[] = [];

  if (!isRecord(value)) {
    addProposalIssue(
      issues,
      "aster.proposal.invalid-envelope",
      "$",
      "An Aster proposal envelope must be an object.",
    );
    return issues;
  }

  if (value.schemaId !== "aster.proposal.envelope" || value.schemaRevision !== 1) {
    addProposalIssue(
      issues,
      "aster.proposal.invalid-schema",
      "$.schemaId",
      "Proposal envelopes must use the recognized schema and revision.",
    );
  }

  if (value.contractVersion !== ASTER_CONTRACT_VERSION) {
    addProposalIssue(
      issues,
      "aster.proposal.invalid-contract-version",
      "$.contractVersion",
      "Proposal envelopes must identify the active pre-stable Aster contract version.",
    );
  }

  if (!isNonEmptyString(value.proposalId)) {
    addProposalIssue(
      issues,
      "aster.proposal.invalid-proposal-id",
      "$.proposalId",
      "Proposal identity must be stable and inspectable.",
    );
  }

  if (!isPositiveInteger(value.proposalRevision)) {
    addProposalIssue(
      issues,
      "aster.proposal.invalid-proposal-revision",
      "$.proposalRevision",
      "Proposal revision must be a positive integer.",
    );
  }

  const role = includesString(ASTER_ROLES, value.role)
    ? (value.role as AsterRole)
    : null;
  if (role === null) {
    addProposalIssue(
      issues,
      "aster.proposal.invalid-role",
      "$.role",
      "Proposal role must use the public Aster role taxonomy.",
    );
  }

  if (
    role !== null &&
    value.operationId !== ASTER_ROLE_OPERATION_BY_ROLE[role]
  ) {
    addProposalIssue(
      issues,
      "aster.proposal.invalid-operation",
      "$.operationId",
      "Proposal operation must match the role's bounded operation.",
    );
  }

  if (!includesString(ASTER_PROPOSAL_KINDS, value.proposalKind)) {
    addProposalIssue(
      issues,
      "aster.proposal.invalid-kind",
      "$.proposalKind",
      "Proposal kind must use the public taxonomy.",
    );
  } else if (
    role !== null &&
    value.proposalKind !== ASTER_PRIMARY_PROPOSAL_KIND_BY_ROLE[role] &&
    value.proposalKind !== "clarification-request"
  ) {
    addProposalIssue(
      issues,
      "aster.proposal.role-kind-mismatch",
      "$.proposalKind",
      "Proposal kind must match the role or be a clarification request.",
    );
  }

  const subject = isRecord(value.subject) ? value.subject : {};
  if (
    !includesString(ASTER_SUBJECT_CLASSES, subject.subjectClass) ||
    !isNonEmptyString(subject.subjectId) ||
    !(
      subject.subjectRevision === null ||
      isNonEmptyString(subject.subjectRevision)
    )
  ) {
    addProposalIssue(
      issues,
      "aster.proposal.invalid-subject",
      "$.subject",
      "Proposal subject identity and revision must be explicit.",
    );
  }

  const request = isRecord(value.request) ? value.request : {};
  if (
    !isNonEmptyString(request.requestId) ||
    !isPositiveInteger(request.requestRevision) ||
    !Array.isArray(request.authorityRevisionReferences)
  ) {
    addProposalIssue(
      issues,
      "aster.proposal.invalid-request-reference",
      "$.request",
      "Proposal requests need stable identity, revision, and authority revision references.",
    );
  }

  const producer = isRecord(value.producer) ? value.producer : {};
  if (
    !includesString(ASTER_PRODUCER_CLASSES, producer.producerClass) ||
    !isNonEmptyString(producer.producerId) ||
    !isNonEmptyString(producer.producerRevision)
  ) {
    addProposalIssue(
      issues,
      "aster.proposal.invalid-producer",
      "$.producer",
      "Proposal producer class, identity, and revision must be attributable.",
    );
  }

  const sourceReferences = Array.isArray(value.sourceReferences)
    ? value.sourceReferences
    : [];
  if (sourceReferences.length === 0) {
    addProposalIssue(
      issues,
      "aster.proposal.empty-source-references",
      "$.sourceReferences",
      "Every proposal must preserve at least one inspectable source reference.",
    );
  }
  for (const [index, source] of sourceReferences.entries()) {
    const path = `$.sourceReferences[${index}]`;
    if (
      !isRecord(source) ||
      !isNonEmptyString(source.sourceReferenceId) ||
      !isNonEmptyString(source.sourceId) ||
      !isNonEmptyString(source.purpose) ||
      source.sourceMaterialCopied !== false
    ) {
      addProposalIssue(
        issues,
        "aster.proposal.invalid-source-reference",
        path,
        "Source references must be minimal, attributable, purpose-bound, and non-copying.",
      );
      continue;
    }

    if (
      role !== null &&
      !ASTER_ROLE_AUTHORITY_MATRIX[role].authoritativeSources.includes(
        source.sourceClass as never,
      )
    ) {
      addProposalIssue(
        issues,
        "aster.proposal.disallowed-source-class",
        `${path}.sourceClass`,
        "Source class must be permitted by the role authority contract.",
      );
    }
  }

  const transformations = Array.isArray(value.transformationProvenance)
    ? value.transformationProvenance
    : [];
  if (transformations.length === 0) {
    addProposalIssue(
      issues,
      "aster.proposal.empty-transformation-provenance",
      "$.transformationProvenance",
      "Every proposal must preserve at least one transformation step.",
    );
  }
  for (const [index, step] of transformations.entries()) {
    if (
      !isRecord(step) ||
      !isNonEmptyString(step.transformationStepId) ||
      !includesString(ASTER_TRANSFORMATION_CLASSES, step.transformationClass) ||
      !isNonEmptyString(step.transformerId) ||
      !isNonEmptyString(step.transformerRevision) ||
      !isNonEmptyArray(step.inputSourceReferenceIds)
    ) {
      addProposalIssue(
        issues,
        "aster.proposal.invalid-transformation-step",
        `$.transformationProvenance[${index}]`,
        "Transformation provenance requires stable identity, class, revision, and source inputs.",
      );
    }
  }

  const intendedAction = isRecord(value.intendedAction)
    ? value.intendedAction
    : {};
  if (
    !isNonEmptyString(intendedAction.actionId) ||
    !includesString(
      ASTER_AUTHORITATIVE_ACTION_OWNERS,
      intendedAction.actionOwner,
    ) ||
    typeof intendedAction.requiresExactPlayerConfirmation !== "boolean" ||
    !isNonEmptyString(intendedAction.description)
  ) {
    addProposalIssue(
      issues,
      "aster.proposal.invalid-intended-action",
      "$.intendedAction",
      "Intended action must identify its deterministic owner and confirmation requirement.",
    );
  } else if (role !== null) {
    const roleContract = ASTER_ROLE_CONTRACTS[role];
    if (intendedAction.actionOwner !== roleContract.deterministicActionOwner) {
      addProposalIssue(
        issues,
        "aster.proposal.action-owner-mismatch",
        "$.intendedAction.actionOwner",
        "Proposal action owner must remain the role's deterministic action owner.",
      );
    }
    const requiresConfirmation =
      roleContract.confirmationRule === "required-before-domain-action";
    if (
      intendedAction.requiresExactPlayerConfirmation !== requiresConfirmation
    ) {
      addProposalIssue(
        issues,
        "aster.proposal.confirmation-rule-mismatch",
        "$.intendedAction.requiresExactPlayerConfirmation",
        "Proposal confirmation requirement must remain aligned with the role contract.",
      );
    }
  }

  if (!validateConfidence(value.confidence)) {
    addProposalIssue(
      issues,
      "aster.proposal.invalid-confidence",
      "$.confidence",
      "Proposal confidence must be qualitative, explained, and explicitly non-authoritative.",
    );
  }

  const payload = isRecord(value.payload) ? value.payload : {};
  if (
    !isNonEmptyString(payload.schemaId) ||
    !isPositiveInteger(payload.schemaRevision) ||
    !isRecord(payload.data)
  ) {
    addProposalIssue(
      issues,
      "aster.proposal.invalid-payload",
      "$.payload",
      "Proposal payload must identify its schema and contain an object value.",
    );
  }
  if (payload.canonical !== false) {
    addProposalIssue(
      issues,
      "aster.proposal.canonical-payload",
      "$.payload.canonical",
      "Aster proposal payloads are never canonical records.",
    );
  }

  if (payload.schemaId === "aster.extraction.structured") {
    const extractionIssues = validateAsterStructuredExtraction(payload.data);
    if (extractionIssues.length > 0) {
      addProposalIssue(
        issues,
        "aster.proposal.invalid-structured-extraction",
        "$.payload.data",
        "The structured extraction payload does not satisfy its public schema.",
      );
    }
  }

  const review = isRecord(value.review) ? value.review : {};
  if (
    !includesString(ASTER_PROPOSAL_REVIEW_STATES, review.state) ||
    !(
      review.actor === null || includesString(ASTER_REVIEW_ACTORS, review.actor)
    )
  ) {
    addProposalIssue(
      issues,
      "aster.proposal.invalid-review",
      "$.review",
      "Proposal review state and actor must use the public taxonomy.",
    );
  } else if (review.state === "not-reviewed") {
    if (
      review.actor !== null ||
      review.boundProposalRevision !== null ||
      review.decisionReferenceId !== null
    ) {
      addProposalIssue(
        issues,
        "aster.proposal.invalid-review",
        "$.review",
        "An unreviewed proposal cannot claim an actor, bound revision, or decision.",
      );
    }
  } else if (
    review.boundProposalRevision !== value.proposalRevision ||
    !isNonEmptyString(review.decisionReferenceId) ||
    (review.state === "confirmed" && review.actor !== "player")
  ) {
    addProposalIssue(
      issues,
      "aster.proposal.review-not-bound-to-revision",
      "$.review",
      "A review decision must bind the exact proposal revision; confirmation must be a player decision.",
    );
  }

  const authority = isRecord(value.authority) ? value.authority : {};
  const authorityChecks = [
    ["canWriteCanonicalRecords", "aster.proposal.canonical-write-authority"],
    ["canCreateOrExpandPermission", "aster.proposal.permission-authority"],
    ["canSelfConfirm", "aster.proposal.self-confirmation-authority"],
    ["canInvokeAuthoritativeAction", "aster.proposal.authoritative-invocation"],
    ["canCompleteQuest", "aster.proposal.quest-completion-authority"],
    ["canGrantReward", "aster.proposal.reward-authority"],
  ] as const;
  for (const [field, code] of authorityChecks) {
    if (authority[field] !== false) {
      addProposalIssue(
        issues,
        code,
        `$.authority.${field}`,
        "Aster proposal envelopes cannot carry domain or gameplay authority.",
      );
    }
  }

  const domainOutcome = isRecord(value.domainOutcome) ? value.domainOutcome : {};
  if (
    domainOutcome.invoked !== false ||
    domainOutcome.accepted !== false ||
    domainOutcome.storedOrExecuted !== false
  ) {
    addProposalIssue(
      issues,
      "aster.proposal.domain-outcome-authority",
      "$.domainOutcome",
      "Proposal envelopes cannot claim domain invocation, acceptance, storage, or execution.",
    );
  }

  return issues;
}

export function isAsterProposalEnvelope(
  value: unknown,
): value is AsterProposalEnvelope {
  return validateAsterProposalEnvelope(value).length === 0;
}

export function isAsterStructuredExtraction(
  value: unknown,
): value is AsterStructuredExtraction {
  return validateAsterStructuredExtraction(value).length === 0;
}
