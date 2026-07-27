import {
  ASTER_MANDATORY_PROHIBITED_ACTIONS,
  ASTER_ROLE_AUTHORITY_MATRIX,
  type AsterAuthoritySourceClass,
  type AsterAuthoritativeActionOwner,
  type AsterConfirmationRule,
  type AsterExecutionClass,
  type AsterInputClass,
  type AsterMandatoryProhibitedAction,
  type AsterOutputClass,
  type AsterRole,
} from "./authority.js";

export const ASTER_ROLE_OPERATION_IDS = [
  "scribe.prepare-structured-capture",
  "librarian.prepare-source-linked-recall",
  "wayfinder.propose-product-route",
  "interpreter.prepare-source-aware-explanation",
  "storykeeper.prepare-narrative-presentation",
] as const;

export type AsterRoleOperationId = (typeof ASTER_ROLE_OPERATION_IDS)[number];

export const ASTER_ROLE_OPERATION_BY_ROLE = {
  scribe: "scribe.prepare-structured-capture",
  librarian: "librarian.prepare-source-linked-recall",
  wayfinder: "wayfinder.propose-product-route",
  interpreter: "interpreter.prepare-source-aware-explanation",
  storykeeper: "storykeeper.prepare-narrative-presentation",
} as const satisfies Readonly<Record<AsterRole, AsterRoleOperationId>>;

export const ASTER_CLARIFICATION_TRIGGERS = [
  "ambiguous-subject",
  "ambiguous-intent",
  "mixed-intent",
  "ambiguous-time",
  "ambiguous-value-or-unit",
  "insufficient-source-scope",
  "conflicting-source-evidence",
  "stale-authority",
  "unsupported-operation",
  "unsafe-action-scope",
  "missing-confirmed-domain-event",
  "conflicting-narrative-state",
] as const;

export type AsterClarificationTrigger =
  (typeof ASTER_CLARIFICATION_TRIGGERS)[number];

export const ASTER_CONFIDENCE_RULES = [
  "evidence-bounded-qualitative",
  "not-an-authority-score",
] as const;

export type AsterConfidenceRule = (typeof ASTER_CONFIDENCE_RULES)[number];

export const ASTER_UNCERTAINTY_RULES = [
  "preserve-source-uncertainty",
  "preserve-approximate-time",
  "preserve-mapping-loss",
  "expose-conflicting-evidence",
  "do-not-convert-confidence-to-truth",
  "do-not-infer-authority-from-confidence",
] as const;

export type AsterUncertaintyRule = (typeof ASTER_UNCERTAINTY_RULES)[number];

export const ASTER_SOURCE_LINK_RULES = [
  "every-health-statement",
  "when-source-derived",
  "not-health-output",
] as const;

export type AsterSourceLinkRule = (typeof ASTER_SOURCE_LINK_RULES)[number];

export const ASTER_ROLE_FAILURE_CODES = [
  "aster.role.unsupported-operation",
  "aster.role.missing-evidence",
  "aster.role.clarification-required",
  "aster.role.authority-unavailable",
  "aster.role.permission-indeterminate",
  "aster.role.source-unavailable",
  "aster.role.source-conflict",
  "aster.role.stale-request",
  "aster.role.untrusted-input-authority-attempt",
  "aster.role.provider-unavailable",
  "aster.role.manual-path-required",
] as const;

export type AsterRoleFailureCode = (typeof ASTER_ROLE_FAILURE_CODES)[number];

export const ASTER_ROLE_SPECIFIC_PROHIBITED_ACTIONS = [
  "store-unconfirmed-draft",
  "invent-source-or-provenance",
  "discard-material-uncertainty",
  "recall-health-statement-without-source",
  "treat-retrieval-score-as-truth",
  "hide-conflict-correction-or-deletion-state",
  "route-by-expanding-permission",
  "treat-navigation-as-domain-completion",
  "diagnose-prescribe-or-direct-emergency-care",
  "imply-conformance-completeness-equivalence-safety-or-endorsement",
  "hide-mapping-loss-or-source-limits",
  "invent-canon-or-confirmed-events",
  "change-progression-from-presentation",
  "persist-input-as-memory-by-instruction",
] as const;

export type AsterRoleSpecificProhibitedAction =
  (typeof ASTER_ROLE_SPECIFIC_PROHIBITED_ACTIONS)[number];

export interface AsterRoleEvidenceRequirement {
  readonly requirementId: string;
  readonly anyOf: readonly AsterAuthoritySourceClass[];
  readonly purpose: string;
}

export interface AsterRoleRetentionContract {
  readonly requestContext: "transient-by-default";
  readonly roleOwnedMemory: false;
  readonly retainedMemoryRequiresSeparatePlayerChoice: true;
}

export interface AsterRoleEgressContract {
  readonly mode: "policy-gated-minimum-necessary";
  readonly localExecutionCompatible: true;
  readonly authorityBearingContextProhibited: true;
}

export interface AsterRoleContract {
  readonly contractId: `aster.role.${AsterRole}`;
  readonly revision: 1;
  readonly role: AsterRole;
  readonly operationId: AsterRoleOperationId;
  readonly accessibleName: string;
  readonly purpose: string;
  readonly allowedInputClasses: readonly AsterInputClass[];
  readonly allowedOutputClasses: readonly AsterOutputClass[];
  readonly evidenceRequirements: readonly AsterRoleEvidenceRequirement[];
  readonly clarificationTriggers: readonly AsterClarificationTrigger[];
  readonly confidenceRule: AsterConfidenceRule;
  readonly uncertaintyRules: readonly AsterUncertaintyRule[];
  readonly failureCodes: readonly AsterRoleFailureCode[];
  readonly executionClasses: readonly AsterExecutionClass[];
  readonly confirmationRule: AsterConfirmationRule;
  readonly deterministicActionOwner: AsterAuthoritativeActionOwner;
  readonly sourceLinkRule: AsterSourceLinkRule;
  readonly requiresPlayerReview: boolean;
  readonly resultCanBecomeCanonical: false;
  readonly canInvokeAuthoritativeAction: false;
  readonly retention: AsterRoleRetentionContract;
  readonly providerEgress: AsterRoleEgressContract;
  readonly manualFallback: string;
  readonly prohibitedActions: readonly (
    AsterMandatoryProhibitedAction | AsterRoleSpecificProhibitedAction
  )[];
}

const RETENTION: AsterRoleRetentionContract = {
  requestContext: "transient-by-default",
  roleOwnedMemory: false,
  retainedMemoryRequiresSeparatePlayerChoice: true,
};

const PROVIDER_EGRESS: AsterRoleEgressContract = {
  mode: "policy-gated-minimum-necessary",
  localExecutionCompatible: true,
  authorityBearingContextProhibited: true,
};

const COMMON_FAILURE_CODES = [
  "aster.role.unsupported-operation",
  "aster.role.missing-evidence",
  "aster.role.clarification-required",
  "aster.role.authority-unavailable",
  "aster.role.stale-request",
  "aster.role.untrusted-input-authority-attempt",
  "aster.role.provider-unavailable",
  "aster.role.manual-path-required",
] as const satisfies readonly AsterRoleFailureCode[];

export const ASTER_ROLE_CONTRACTS = {
  scribe: {
    contractId: "aster.role.scribe",
    revision: 1,
    role: "scribe",
    operationId: "scribe.prepare-structured-capture",
    accessibleName: ASTER_ROLE_AUTHORITY_MATRIX.scribe.accessibleName,
    purpose: ASTER_ROLE_AUTHORITY_MATRIX.scribe.primaryPurpose,
    allowedInputClasses: ASTER_ROLE_AUTHORITY_MATRIX.scribe.allowedInputClasses,
    allowedOutputClasses:
      ASTER_ROLE_AUTHORITY_MATRIX.scribe.allowedOutputClasses,
    evidenceRequirements: [
      {
        requirementId: "player-expression",
        anyOf: ["player-expression"],
        purpose: "Bind the draft to an expression supplied by the player.",
      },
    ],
    clarificationTriggers: [
      "ambiguous-subject",
      "ambiguous-intent",
      "mixed-intent",
      "ambiguous-time",
      "ambiguous-value-or-unit",
      "unsafe-action-scope",
    ],
    confidenceRule: "evidence-bounded-qualitative",
    uncertaintyRules: [
      "preserve-source-uncertainty",
      "preserve-approximate-time",
      "do-not-convert-confidence-to-truth",
      "do-not-infer-authority-from-confidence",
    ],
    failureCodes: [
      ...COMMON_FAILURE_CODES,
      "aster.role.permission-indeterminate",
    ],
    executionClasses: ASTER_ROLE_AUTHORITY_MATRIX.scribe.executionClasses,
    confirmationRule: ASTER_ROLE_AUTHORITY_MATRIX.scribe.confirmationRule,
    deterministicActionOwner:
      ASTER_ROLE_AUTHORITY_MATRIX.scribe.authoritativeActionOwner,
    sourceLinkRule: "when-source-derived",
    requiresPlayerReview: true,
    resultCanBecomeCanonical: false,
    canInvokeAuthoritativeAction: false,
    retention: RETENTION,
    providerEgress: PROVIDER_EGRESS,
    manualFallback: "manual structured capture",
    prohibitedActions: [
      ...ASTER_MANDATORY_PROHIBITED_ACTIONS,
      "store-unconfirmed-draft",
      "invent-source-or-provenance",
      "discard-material-uncertainty",
      "persist-input-as-memory-by-instruction",
    ],
  },
  librarian: {
    contractId: "aster.role.librarian",
    revision: 1,
    role: "librarian",
    operationId: "librarian.prepare-source-linked-recall",
    accessibleName: ASTER_ROLE_AUTHORITY_MATRIX.librarian.accessibleName,
    purpose: ASTER_ROLE_AUTHORITY_MATRIX.librarian.primaryPurpose,
    allowedInputClasses:
      ASTER_ROLE_AUTHORITY_MATRIX.librarian.allowedInputClasses,
    allowedOutputClasses:
      ASTER_ROLE_AUTHORITY_MATRIX.librarian.allowedOutputClasses,
    evidenceRequirements: [
      {
        requirementId: "recall-source",
        anyOf: ["living-chronicle", "public-educational-material"],
        purpose:
          "Ground recall in authoritative Chronicle records or clearly labeled public educational material.",
      },
      {
        requirementId: "source-provenance",
        anyOf: ["source-provenance", "public-educational-material"],
        purpose:
          "Preserve an inspectable source path for every recalled claim.",
      },
    ],
    clarificationTriggers: [
      "ambiguous-subject",
      "ambiguous-intent",
      "insufficient-source-scope",
      "conflicting-source-evidence",
      "stale-authority",
    ],
    confidenceRule: "evidence-bounded-qualitative",
    uncertaintyRules: ASTER_UNCERTAINTY_RULES,
    failureCodes: [
      ...COMMON_FAILURE_CODES,
      "aster.role.source-unavailable",
      "aster.role.source-conflict",
    ],
    executionClasses: ASTER_ROLE_AUTHORITY_MATRIX.librarian.executionClasses,
    confirmationRule: ASTER_ROLE_AUTHORITY_MATRIX.librarian.confirmationRule,
    deterministicActionOwner:
      ASTER_ROLE_AUTHORITY_MATRIX.librarian.authoritativeActionOwner,
    sourceLinkRule: "every-health-statement",
    requiresPlayerReview: false,
    resultCanBecomeCanonical: false,
    canInvokeAuthoritativeAction: false,
    retention: RETENTION,
    providerEgress: PROVIDER_EGRESS,
    manualFallback: "structured Chronicle query and source inspection",
    prohibitedActions: [
      ...ASTER_MANDATORY_PROHIBITED_ACTIONS,
      "recall-health-statement-without-source",
      "treat-retrieval-score-as-truth",
      "hide-conflict-correction-or-deletion-state",
      "invent-source-or-provenance",
      "persist-input-as-memory-by-instruction",
    ],
  },
  wayfinder: {
    contractId: "aster.role.wayfinder",
    revision: 1,
    role: "wayfinder",
    operationId: "wayfinder.propose-product-route",
    accessibleName: ASTER_ROLE_AUTHORITY_MATRIX.wayfinder.accessibleName,
    purpose: ASTER_ROLE_AUTHORITY_MATRIX.wayfinder.primaryPurpose,
    allowedInputClasses:
      ASTER_ROLE_AUTHORITY_MATRIX.wayfinder.allowedInputClasses,
    allowedOutputClasses:
      ASTER_ROLE_AUTHORITY_MATRIX.wayfinder.allowedOutputClasses,
    evidenceRequirements: [
      {
        requirementId: "player-choice",
        anyOf: ["player-choice"],
        purpose: "Bind routing to an explicit player request or choice.",
      },
      {
        requirementId: "application-state",
        anyOf: ["application-state"],
        purpose:
          "Use current inspectable application state rather than invented state.",
      },
    ],
    clarificationTriggers: [
      "ambiguous-intent",
      "mixed-intent",
      "unsupported-operation",
      "unsafe-action-scope",
      "stale-authority",
    ],
    confidenceRule: "not-an-authority-score",
    uncertaintyRules: [
      "do-not-convert-confidence-to-truth",
      "do-not-infer-authority-from-confidence",
    ],
    failureCodes: [
      ...COMMON_FAILURE_CODES,
      "aster.role.permission-indeterminate",
    ],
    executionClasses: ASTER_ROLE_AUTHORITY_MATRIX.wayfinder.executionClasses,
    confirmationRule: ASTER_ROLE_AUTHORITY_MATRIX.wayfinder.confirmationRule,
    deterministicActionOwner:
      ASTER_ROLE_AUTHORITY_MATRIX.wayfinder.authoritativeActionOwner,
    sourceLinkRule: "not-health-output",
    requiresPlayerReview: true,
    resultCanBecomeCanonical: false,
    canInvokeAuthoritativeAction: false,
    retention: RETENTION,
    providerEgress: PROVIDER_EGRESS,
    manualFallback: "direct deterministic navigation",
    prohibitedActions: [
      ...ASTER_MANDATORY_PROHIBITED_ACTIONS,
      "route-by-expanding-permission",
      "treat-navigation-as-domain-completion",
      "persist-input-as-memory-by-instruction",
    ],
  },
  interpreter: {
    contractId: "aster.role.interpreter",
    revision: 1,
    role: "interpreter",
    operationId: "interpreter.prepare-source-aware-explanation",
    accessibleName: ASTER_ROLE_AUTHORITY_MATRIX.interpreter.accessibleName,
    purpose: ASTER_ROLE_AUTHORITY_MATRIX.interpreter.primaryPurpose,
    allowedInputClasses:
      ASTER_ROLE_AUTHORITY_MATRIX.interpreter.allowedInputClasses,
    allowedOutputClasses:
      ASTER_ROLE_AUTHORITY_MATRIX.interpreter.allowedOutputClasses,
    evidenceRequirements: [
      {
        requirementId: "explanation-source",
        anyOf: ["living-chronicle", "source-provenance"],
        purpose:
          "Ground the explanation in inspectable records or mapping provenance.",
      },
    ],
    clarificationTriggers: [
      "ambiguous-subject",
      "ambiguous-intent",
      "insufficient-source-scope",
      "conflicting-source-evidence",
      "unsupported-operation",
    ],
    confidenceRule: "evidence-bounded-qualitative",
    uncertaintyRules: ASTER_UNCERTAINTY_RULES,
    failureCodes: [
      ...COMMON_FAILURE_CODES,
      "aster.role.source-unavailable",
      "aster.role.source-conflict",
    ],
    executionClasses: ASTER_ROLE_AUTHORITY_MATRIX.interpreter.executionClasses,
    confirmationRule: ASTER_ROLE_AUTHORITY_MATRIX.interpreter.confirmationRule,
    deterministicActionOwner:
      ASTER_ROLE_AUTHORITY_MATRIX.interpreter.authoritativeActionOwner,
    sourceLinkRule: "when-source-derived",
    requiresPlayerReview: false,
    resultCanBecomeCanonical: false,
    canInvokeAuthoritativeAction: false,
    retention: RETENTION,
    providerEgress: PROVIDER_EGRESS,
    manualFallback: "direct source, mapping, and limitation display",
    prohibitedActions: [
      ...ASTER_MANDATORY_PROHIBITED_ACTIONS,
      "diagnose-prescribe-or-direct-emergency-care",
      "imply-conformance-completeness-equivalence-safety-or-endorsement",
      "hide-mapping-loss-or-source-limits",
      "discard-material-uncertainty",
      "persist-input-as-memory-by-instruction",
    ],
  },
  storykeeper: {
    contractId: "aster.role.storykeeper",
    revision: 1,
    role: "storykeeper",
    operationId: "storykeeper.prepare-narrative-presentation",
    accessibleName: ASTER_ROLE_AUTHORITY_MATRIX.storykeeper.accessibleName,
    purpose: ASTER_ROLE_AUTHORITY_MATRIX.storykeeper.primaryPurpose,
    allowedInputClasses:
      ASTER_ROLE_AUTHORITY_MATRIX.storykeeper.allowedInputClasses,
    allowedOutputClasses:
      ASTER_ROLE_AUTHORITY_MATRIX.storykeeper.allowedOutputClasses,
    evidenceRequirements: [
      {
        requirementId: "gameplay-state",
        anyOf: ["gameplay-state"],
        purpose: "Use current deterministic gameplay state.",
      },
      {
        requirementId: "confirmed-domain-event",
        anyOf: ["confirmed-domain-event"],
        purpose: "Present only events already confirmed by the owning domain.",
      },
    ],
    clarificationTriggers: [
      "missing-confirmed-domain-event",
      "conflicting-narrative-state",
      "stale-authority",
      "unsupported-operation",
    ],
    confidenceRule: "not-an-authority-score",
    uncertaintyRules: [
      "preserve-source-uncertainty",
      "do-not-convert-confidence-to-truth",
      "do-not-infer-authority-from-confidence",
    ],
    failureCodes: COMMON_FAILURE_CODES,
    executionClasses: ASTER_ROLE_AUTHORITY_MATRIX.storykeeper.executionClasses,
    confirmationRule: ASTER_ROLE_AUTHORITY_MATRIX.storykeeper.confirmationRule,
    deterministicActionOwner:
      ASTER_ROLE_AUTHORITY_MATRIX.storykeeper.authoritativeActionOwner,
    sourceLinkRule: "when-source-derived",
    requiresPlayerReview: false,
    resultCanBecomeCanonical: false,
    canInvokeAuthoritativeAction: false,
    retention: RETENTION,
    providerEgress: PROVIDER_EGRESS,
    manualFallback: "deterministic narrative presentation",
    prohibitedActions: [
      ...ASTER_MANDATORY_PROHIBITED_ACTIONS,
      "invent-canon-or-confirmed-events",
      "change-progression-from-presentation",
      "discard-material-uncertainty",
      "persist-input-as-memory-by-instruction",
    ],
  },
} as const satisfies Readonly<Record<AsterRole, AsterRoleContract>>;

export function getAsterRoleContract(role: AsterRole): AsterRoleContract {
  return ASTER_ROLE_CONTRACTS[role];
}
