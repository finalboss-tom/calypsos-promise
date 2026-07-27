import type { AsterProposalConfidence } from "./proposal.js";

export const ASTER_INTENTS = [
  "capture",
  "recall",
  "explanation",
  "navigation",
  "permission-review",
  "correction",
  "export",
  "deletion-preparation",
  "support-routing",
  "non-actionable-conversation",
  "unknown",
  "mixed",
  "conflicting",
  "unsupported",
] as const;

export type AsterIntent = (typeof ASTER_INTENTS)[number];

export const ASTER_BINDABLE_INTENTS = [
  "capture",
  "recall",
  "explanation",
  "navigation",
  "permission-review",
  "correction",
  "export",
  "deletion-preparation",
  "support-routing",
] as const;

export type AsterBindableIntent = (typeof ASTER_BINDABLE_INTENTS)[number];

export const ASTER_META_INTENTS = [
  "non-actionable-conversation",
  "unknown",
  "mixed",
  "conflicting",
  "unsupported",
] as const;

export type AsterMetaIntent = (typeof ASTER_META_INTENTS)[number];

export const ASTER_INTENT_CONSEQUENCE_CLASSES = [
  "none",
  "informational",
  "navigation",
  "canonical-change-preparation",
  "permission-review",
  "data-rights",
  "support",
] as const;

export type AsterIntentConsequenceClass =
  (typeof ASTER_INTENT_CONSEQUENCE_CLASSES)[number];

export const ASTER_INTENT_CONSEQUENCE_BY_INTENT = {
  capture: "canonical-change-preparation",
  recall: "informational",
  explanation: "informational",
  navigation: "navigation",
  "permission-review": "permission-review",
  correction: "canonical-change-preparation",
  export: "data-rights",
  "deletion-preparation": "data-rights",
  "support-routing": "support",
  "non-actionable-conversation": "none",
  unknown: "none",
  mixed: "none",
  conflicting: "none",
  unsupported: "none",
} as const satisfies Readonly<Record<AsterIntent, AsterIntentConsequenceClass>>;

export const ASTER_INTENT_DISPOSITIONS = [
  "bound",
  "clarification-required",
  "refused",
  "non-actionable",
] as const;

export type AsterIntentDisposition = (typeof ASTER_INTENT_DISPOSITIONS)[number];

export const ASTER_INTENT_AMBIGUITY_CODES = [
  "unknown-intent",
  "mixed-intent",
  "conflicting-intent",
  "ambiguous-subject",
  "ambiguous-target",
  "ambiguous-action-scope",
  "ambiguous-time",
  "ambiguous-value-or-unit",
  "insufficient-evidence",
  "stale-context",
] as const;

export type AsterIntentAmbiguityCode =
  (typeof ASTER_INTENT_AMBIGUITY_CODES)[number];

export const ASTER_INTENT_REFUSAL_CODES = [
  "unsupported-intent",
  "unsafe-authority-request",
  "permission-bypass-request",
  "cross-subject-request",
  "diagnosis-or-treatment-request",
  "emergency-direction-request",
  "arbitrary-resource-request",
  "untrusted-input-authority-attempt",
  "no-safe-path",
] as const;

export type AsterIntentRefusalCode =
  (typeof ASTER_INTENT_REFUSAL_CODES)[number];

export const ASTER_INTENT_CLARIFICATION_STATUSES = [
  "open",
  "answered",
  "withdrawn",
] as const;

export type AsterIntentClarificationStatus =
  (typeof ASTER_INTENT_CLARIFICATION_STATUSES)[number];

export interface AsterIntentCandidate {
  readonly intent: AsterIntent;
  readonly confidence: AsterProposalConfidence;
  readonly evidenceReferenceIds: readonly string[];
  readonly rationale: string;
}

export interface AsterIntentClarification {
  readonly clarificationId: string;
  readonly ambiguityCode: AsterIntentAmbiguityCode;
  readonly question: string;
  readonly status: AsterIntentClarificationStatus;
}

export interface AsterIntentRefusal {
  readonly status: "not-refused" | "refused";
  readonly code: AsterIntentRefusalCode | null;
  readonly explanation: string | null;
  readonly manualFallback: string | null;
}

export interface AsterIntentRequestReference {
  readonly requestId: string;
  readonly requestRevision: number;
}

export interface AsterIntentSubjectReference {
  readonly subjectId: string;
  readonly subjectRevision: string | null;
}

export interface AsterIntentDecision {
  readonly schemaId: "aster.intent.decision";
  readonly schemaRevision: 1;
  readonly decisionId: string;
  readonly decisionRevision: number;
  readonly request: AsterIntentRequestReference;
  readonly subject: AsterIntentSubjectReference;
  readonly candidates: readonly AsterIntentCandidate[];
  readonly selectedIntent: AsterIntent | null;
  readonly disposition: AsterIntentDisposition;
  readonly consequenceClass: AsterIntentConsequenceClass;
  readonly confidence: AsterProposalConfidence;
  readonly ambiguityCodes: readonly AsterIntentAmbiguityCode[];
  readonly clarifications: readonly AsterIntentClarification[];
  readonly refusal: AsterIntentRefusal;
  readonly requiresExplicitPlayerChoice: boolean;
  readonly mayPrepareProposal: boolean;
  readonly canInvokeAuthoritativeAction: false;
  readonly canCreateOrExpandPermission: false;
  readonly canConfirmProposal: false;
}

export const ASTER_INTENT_NON_AUTHORITY = {
  canInvokeAuthoritativeAction: false,
  canCreateOrExpandPermission: false,
  canConfirmProposal: false,
} as const;

export function isAsterIntent(value: unknown): value is AsterIntent {
  return typeof value === "string" && ASTER_INTENTS.includes(value as never);
}

export function isAsterBindableIntent(
  value: unknown,
): value is AsterBindableIntent {
  return (
    typeof value === "string" && ASTER_BINDABLE_INTENTS.includes(value as never)
  );
}

export function getAsterIntentConsequenceClass(
  intent: AsterIntent,
): AsterIntentConsequenceClass {
  return ASTER_INTENT_CONSEQUENCE_BY_INTENT[intent];
}
