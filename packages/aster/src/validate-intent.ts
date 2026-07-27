import {
  ASTER_BINDABLE_INTENTS,
  ASTER_INTENT_AMBIGUITY_CODES,
  ASTER_INTENT_CLARIFICATION_STATUSES,
  ASTER_INTENT_CONSEQUENCE_BY_INTENT,
  ASTER_INTENT_CONSEQUENCE_CLASSES,
  ASTER_INTENT_DISPOSITIONS,
  ASTER_INTENT_REFUSAL_CODES,
  ASTER_INTENTS,
  type AsterIntent,
} from "./intent.js";
import { ASTER_QUALITATIVE_CONFIDENCE_LEVELS } from "./proposal.js";

export const ASTER_INTENT_VALIDATION_ISSUE_CODES = [
  "aster.intent.invalid-decision",
  "aster.intent.invalid-schema",
  "aster.intent.invalid-decision-id",
  "aster.intent.invalid-decision-revision",
  "aster.intent.invalid-request-reference",
  "aster.intent.invalid-subject-reference",
  "aster.intent.empty-candidates",
  "aster.intent.invalid-candidate",
  "aster.intent.duplicate-candidate",
  "aster.intent.invalid-candidate-intent",
  "aster.intent.invalid-confidence",
  "aster.intent.numeric-confidence",
  "aster.intent.missing-evidence-reference",
  "aster.intent.invalid-disposition",
  "aster.intent.invalid-selected-intent",
  "aster.intent.meta-intent-selected",
  "aster.intent.selected-intent-not-candidate",
  "aster.intent.consequence-mismatch",
  "aster.intent.ambiguity-requires-clarification",
  "aster.intent.clarification-missing",
  "aster.intent.invalid-clarification",
  "aster.intent.refusal-required",
  "aster.intent.invalid-refusal",
  "aster.intent.non-actionable-mismatch",
  "aster.intent.proposal-preparation-mismatch",
  "aster.intent.explicit-choice-required",
  "aster.intent.authoritative-invocation",
  "aster.intent.permission-authority",
  "aster.intent.self-confirmation-authority",
] as const;

export type AsterIntentValidationIssueCode =
  (typeof ASTER_INTENT_VALIDATION_ISSUE_CODES)[number];

export interface AsterIntentValidationIssue {
  readonly code: AsterIntentValidationIssueCode;
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
  issues: AsterIntentValidationIssue[],
  code: AsterIntentValidationIssueCode,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}

function validateConfidence(
  value: unknown,
  issues: AsterIntentValidationIssue[],
  path: string,
): boolean {
  if (
    !isRecord(value) ||
    !includesString(ASTER_QUALITATIVE_CONFIDENCE_LEVELS, value.level) ||
    !isNonEmptyString(value.basis) ||
    value.notAuthority !== true
  ) {
    addIssue(
      issues,
      "aster.intent.invalid-confidence",
      path,
      "Intent confidence must be qualitative, explained, and explicitly non-authoritative.",
    );
    return false;
  }

  if ("probability" in value || "score" in value || "percentage" in value) {
    addIssue(
      issues,
      "aster.intent.numeric-confidence",
      path,
      "Intent confidence cannot use numeric precision as a proxy for truth, safety, or authority.",
    );
    return false;
  }

  return true;
}

export function validateAsterIntentDecision(
  value: unknown,
): readonly AsterIntentValidationIssue[] {
  const issues: AsterIntentValidationIssue[] = [];

  if (!isRecord(value)) {
    addIssue(
      issues,
      "aster.intent.invalid-decision",
      "$",
      "An Aster intent decision must be an object.",
    );
    return issues;
  }

  if (value.schemaId !== "aster.intent.decision" || value.schemaRevision !== 1) {
    addIssue(
      issues,
      "aster.intent.invalid-schema",
      "$.schemaId",
      "Intent decisions must use the recognized schema and revision.",
    );
  }

  if (!isNonEmptyString(value.decisionId)) {
    addIssue(
      issues,
      "aster.intent.invalid-decision-id",
      "$.decisionId",
      "Intent decision identity must be stable and inspectable.",
    );
  }

  if (!isPositiveInteger(value.decisionRevision)) {
    addIssue(
      issues,
      "aster.intent.invalid-decision-revision",
      "$.decisionRevision",
      "Intent decision revision must be a positive integer.",
    );
  }

  const request = isRecord(value.request) ? value.request : {};
  if (
    !isNonEmptyString(request.requestId) ||
    !isPositiveInteger(request.requestRevision)
  ) {
    addIssue(
      issues,
      "aster.intent.invalid-request-reference",
      "$.request",
      "Intent decisions must bind an exact request identity and revision.",
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
      "aster.intent.invalid-subject-reference",
      "$.subject",
      "Intent decisions must identify the subject without choosing or changing authority.",
    );
  }

  const candidates = Array.isArray(value.candidates) ? value.candidates : [];
  const candidateIntents: AsterIntent[] = [];
  const seenIntents = new Set<string>();

  if (candidates.length === 0) {
    addIssue(
      issues,
      "aster.intent.empty-candidates",
      "$.candidates",
      "Intent decisions require at least one inspectable candidate, including unknown or unsupported.",
    );
  }

  for (const [index, candidate] of candidates.entries()) {
    const path = `$.candidates[${index}]`;
    if (!isRecord(candidate) || !isNonEmptyString(candidate.rationale)) {
      addIssue(
        issues,
        "aster.intent.invalid-candidate",
        path,
        "Intent candidates need an intent, rationale, evidence references, and qualitative confidence.",
      );
      continue;
    }

    if (!includesString(ASTER_INTENTS, candidate.intent)) {
      addIssue(
        issues,
        "aster.intent.invalid-candidate-intent",
        `${path}.intent`,
        "Intent candidates must use the public taxonomy.",
      );
    } else {
      const intent = candidate.intent as AsterIntent;
      candidateIntents.push(intent);
      if (seenIntents.has(intent)) {
        addIssue(
          issues,
          "aster.intent.duplicate-candidate",
          `${path}.intent`,
          "Each intent may appear at most once in a decision.",
        );
      }
      seenIntents.add(intent);
    }

    validateConfidence(candidate.confidence, issues, `${path}.confidence`);

    if (!isNonEmptyArray(candidate.evidenceReferenceIds)) {
      addIssue(
        issues,
        "aster.intent.missing-evidence-reference",
        `${path}.evidenceReferenceIds`,
        "Every candidate must identify the request or evidence supporting its interpretation.",
      );
    }
  }

  validateConfidence(value.confidence, issues, "$.confidence");

  if (!includesString(ASTER_INTENT_DISPOSITIONS, value.disposition)) {
    addIssue(
      issues,
      "aster.intent.invalid-disposition",
      "$.disposition",
      "Intent disposition must be bound, clarification-required, refused, or non-actionable.",
    );
  }

  const selectedIntent =
    value.selectedIntent === null
      ? null
      : includesString(ASTER_INTENTS, value.selectedIntent)
        ? (value.selectedIntent as AsterIntent)
        : undefined;

  if (selectedIntent === undefined) {
    addIssue(
      issues,
      "aster.intent.invalid-selected-intent",
      "$.selectedIntent",
      "Selected intent must be null or use the public taxonomy.",
    );
  }

  if (!includesString(ASTER_INTENT_CONSEQUENCE_CLASSES, value.consequenceClass)) {
    addIssue(
      issues,
      "aster.intent.consequence-mismatch",
      "$.consequenceClass",
      "Consequence class must use the public taxonomy.",
    );
  }

  const ambiguityCodes = Array.isArray(value.ambiguityCodes)
    ? value.ambiguityCodes
    : [];
  for (const ambiguityCode of ambiguityCodes) {
    if (!includesString(ASTER_INTENT_AMBIGUITY_CODES, ambiguityCode)) {
      addIssue(
        issues,
        "aster.intent.invalid-clarification",
        "$.ambiguityCodes",
        "Ambiguity codes must use the public taxonomy.",
      );
    }
  }

  const clarifications = Array.isArray(value.clarifications)
    ? value.clarifications
    : [];
  let openClarifications = 0;
  for (const [index, clarification] of clarifications.entries()) {
    const path = `$.clarifications[${index}]`;
    if (
      !isRecord(clarification) ||
      !isNonEmptyString(clarification.clarificationId) ||
      !includesString(
        ASTER_INTENT_AMBIGUITY_CODES,
        clarification.ambiguityCode,
      ) ||
      !isNonEmptyString(clarification.question) ||
      !includesString(
        ASTER_INTENT_CLARIFICATION_STATUSES,
        clarification.status,
      )
    ) {
      addIssue(
        issues,
        "aster.intent.invalid-clarification",
        path,
        "Clarifications need an identity, ambiguity code, direct question, and valid status.",
      );
      continue;
    }

    if (clarification.status === "open") {
      openClarifications += 1;
    }
  }

  const refusal = isRecord(value.refusal) ? value.refusal : {};
  const validNotRefused =
    refusal.status === "not-refused" &&
    refusal.code === null &&
    refusal.explanation === null &&
    refusal.manualFallback === null;
  const validRefused =
    refusal.status === "refused" &&
    includesString(ASTER_INTENT_REFUSAL_CODES, refusal.code) &&
    isNonEmptyString(refusal.explanation) &&
    isNonEmptyString(refusal.manualFallback);

  if (!(validNotRefused || validRefused)) {
    addIssue(
      issues,
      "aster.intent.invalid-refusal",
      "$.refusal",
      "Refusal state must be internally consistent and name a safe manual fallback when refused.",
    );
  }

  const hasAmbiguousMetaCandidate = candidateIntents.some((intent) =>
    ["unknown", "mixed", "conflicting"].includes(intent),
  );
  const hasUnsupportedCandidate = candidateIntents.includes("unsupported");
  const hasMultipleBindableCandidates =
    candidateIntents.filter((intent) =>
      ASTER_BINDABLE_INTENTS.includes(intent as never),
    ).length > 1;

  if (
    (hasAmbiguousMetaCandidate || hasMultipleBindableCandidates) &&
    value.disposition !== "clarification-required"
  ) {
    addIssue(
      issues,
      "aster.intent.ambiguity-requires-clarification",
      "$.disposition",
      "Unknown, mixed, conflicting, or multiply plausible consequential intent must clarify instead of selecting an action.",
    );
  }

  if (hasUnsupportedCandidate && value.disposition !== "refused") {
    addIssue(
      issues,
      "aster.intent.refusal-required",
      "$.disposition",
      "Unsupported intent must produce an inspectable refusal and safe fallback.",
    );
  }

  if (value.disposition === "bound") {
    if (
      selectedIntent === null ||
      selectedIntent === undefined ||
      !ASTER_BINDABLE_INTENTS.includes(selectedIntent as never)
    ) {
      addIssue(
        issues,
        "aster.intent.meta-intent-selected",
        "$.selectedIntent",
        "Only a supported bindable intent may be selected for proposal preparation.",
      );
    } else {
      if (!candidateIntents.includes(selectedIntent)) {
        addIssue(
          issues,
          "aster.intent.selected-intent-not-candidate",
          "$.selectedIntent",
          "The selected intent must be one of the inspectable candidates.",
        );
      }

      if (
        value.consequenceClass !==
        ASTER_INTENT_CONSEQUENCE_BY_INTENT[selectedIntent]
      ) {
        addIssue(
          issues,
          "aster.intent.consequence-mismatch",
          "$.consequenceClass",
          "Bound intent consequence class must match the public taxonomy.",
        );
      }
    }

    if (
      ambiguityCodes.length > 0 ||
      openClarifications > 0 ||
      !validNotRefused
    ) {
      addIssue(
        issues,
        "aster.intent.ambiguity-requires-clarification",
        "$.disposition",
        "A bound intent cannot retain material ambiguity, an open clarification, or refusal state.",
      );
    }

    if (value.mayPrepareProposal !== true) {
      addIssue(
        issues,
        "aster.intent.proposal-preparation-mismatch",
        "$.mayPrepareProposal",
        "A safely bound intent may prepare a non-authoritative proposal.",
      );
    }

    if (value.requiresExplicitPlayerChoice !== true) {
      addIssue(
        issues,
        "aster.intent.explicit-choice-required",
        "$.requiresExplicitPlayerChoice",
        "A bound intent requires explicit player choice before any later proposal or action.",
      );
    }
  }

  if (value.disposition === "clarification-required") {
    if (
      selectedIntent !== null ||
      ambiguityCodes.length === 0 ||
      openClarifications === 0 ||
      value.consequenceClass !== "none" ||
      value.mayPrepareProposal !== false ||
      value.requiresExplicitPlayerChoice !== false ||
      !validNotRefused
    ) {
      addIssue(
        issues,
        "aster.intent.clarification-missing",
        "$",
        "Clarification-required decisions must remain unbound, non-authoritative, and include an open direct question.",
      );
    }
  }

  if (value.disposition === "refused") {
    if (
      selectedIntent !== null ||
      value.consequenceClass !== "none" ||
      value.mayPrepareProposal !== false ||
      value.requiresExplicitPlayerChoice !== false ||
      !validRefused
    ) {
      addIssue(
        issues,
        "aster.intent.refusal-required",
        "$",
        "Refused decisions must remain unbound and name an inspectable reason and safe fallback.",
      );
    }
  }

  if (value.disposition === "non-actionable") {
    if (
      selectedIntent !== "non-actionable-conversation" ||
      value.consequenceClass !== "none" ||
      value.mayPrepareProposal !== false ||
      value.requiresExplicitPlayerChoice !== false ||
      ambiguityCodes.length > 0 ||
      openClarifications > 0 ||
      !validNotRefused
    ) {
      addIssue(
        issues,
        "aster.intent.non-actionable-mismatch",
        "$",
        "Non-actionable conversation cannot silently become proposal or domain work.",
      );
    }
  }

  if (value.canInvokeAuthoritativeAction !== false) {
    addIssue(
      issues,
      "aster.intent.authoritative-invocation",
      "$.canInvokeAuthoritativeAction",
      "Intent classification cannot invoke an authoritative action.",
    );
  }

  if (value.canCreateOrExpandPermission !== false) {
    addIssue(
      issues,
      "aster.intent.permission-authority",
      "$.canCreateOrExpandPermission",
      "Intent classification cannot create or expand permission.",
    );
  }

  if (value.canConfirmProposal !== false) {
    addIssue(
      issues,
      "aster.intent.self-confirmation-authority",
      "$.canConfirmProposal",
      "Intent classification cannot confirm an Aster proposal.",
    );
  }

  return issues;
}
