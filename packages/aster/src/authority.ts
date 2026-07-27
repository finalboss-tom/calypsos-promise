export const ASTER_ROLES = [
  "scribe",
  "librarian",
  "wayfinder",
  "interpreter",
  "storykeeper",
] as const;

export type AsterRole = (typeof ASTER_ROLES)[number];

export const ASTER_EXECUTION_CLASSES = [
  "responsive",
  "deferred",
  "manual-fallback",
] as const;

export type AsterExecutionClass = (typeof ASTER_EXECUTION_CLASSES)[number];

export const ASTER_AUTHORITY_SOURCE_CLASSES = [
  "player-expression",
  "player-choice",
  "player-confirmation",
  "living-chronicle",
  "house-of-keys",
  "application-state",
  "gameplay-state",
  "confirmed-domain-event",
  "source-provenance",
  "public-educational-material",
] as const;

export type AsterAuthoritySourceClass =
  (typeof ASTER_AUTHORITY_SOURCE_CLASSES)[number];

export const ASTER_AUTHORITATIVE_ACTION_OWNERS = [
  "living-chronicle",
  "house-of-keys",
  "application-navigation",
  "gameplay",
  "support-routing",
  "none",
] as const;

export type AsterAuthoritativeActionOwner =
  (typeof ASTER_AUTHORITATIVE_ACTION_OWNERS)[number];

export const ASTER_CONFIRMATION_RULES = [
  "required-before-domain-action",
  "not-a-domain-action",
] as const;

export type AsterConfirmationRule = (typeof ASTER_CONFIRMATION_RULES)[number];

export const ASTER_MANDATORY_PROHIBITED_ACTIONS = [
  "write-canonical-record",
  "create-or-expand-permission",
  "self-confirm-output",
  "complete-quest",
  "grant-reward",
] as const;

export type AsterMandatoryProhibitedAction =
  (typeof ASTER_MANDATORY_PROHIBITED_ACTIONS)[number];

export const ASTER_INPUT_CLASSES = [
  "player-expression",
  "capture-context",
  "source-reference",
  "recall-request",
  "authoritative-record-reference",
  "public-educational-reference",
  "navigation-request",
  "application-state-reference",
  "explanation-request",
  "mapping-reference",
  "narrative-state-reference",
  "confirmed-domain-event-reference",
] as const;

export type AsterInputClass = (typeof ASTER_INPUT_CLASSES)[number];

export const ASTER_OUTPUT_CLASSES = [
  "structured-draft",
  "clarification-request",
  "source-linked-recall-draft",
  "navigation-proposal",
  "explanation-draft",
  "narrative-presentation-proposal",
] as const;

export type AsterOutputClass = (typeof ASTER_OUTPUT_CLASSES)[number];

export interface AsterRoleAuthorityContract {
  readonly role: AsterRole;
  readonly accessibleName: string;
  readonly primaryPurpose: string;
  readonly allowedInputClasses: readonly AsterInputClass[];
  readonly allowedOutputClasses: readonly AsterOutputClass[];
  readonly authoritativeSources: readonly AsterAuthoritySourceClass[];
  readonly authoritativeActionOwner: AsterAuthoritativeActionOwner;
  readonly executionClasses: readonly AsterExecutionClass[];
  readonly confirmationRule: AsterConfirmationRule;
  readonly canWriteCanonicalRecords: false;
  readonly canCreateOrExpandPermission: false;
  readonly canSelfConfirmOutput: false;
  readonly canCompleteQuest: false;
  readonly canGrantReward: false;
  readonly prohibitedActions: readonly AsterMandatoryProhibitedAction[];
}

export const ASTER_ROLE_AUTHORITY_MATRIX = {
  scribe: {
    role: "scribe",
    accessibleName: "structured capture assistant",
    primaryPurpose:
      "Transform a player expression into a reviewable structured draft without storing it.",
    allowedInputClasses: [
      "player-expression",
      "capture-context",
      "source-reference",
    ],
    allowedOutputClasses: ["structured-draft", "clarification-request"],
    authoritativeSources: [
      "player-expression",
      "player-confirmation",
      "living-chronicle",
    ],
    authoritativeActionOwner: "living-chronicle",
    executionClasses: ["responsive", "manual-fallback"],
    confirmationRule: "required-before-domain-action",
    canWriteCanonicalRecords: false,
    canCreateOrExpandPermission: false,
    canSelfConfirmOutput: false,
    canCompleteQuest: false,
    canGrantReward: false,
    prohibitedActions: ASTER_MANDATORY_PROHIBITED_ACTIONS,
  },
  librarian: {
    role: "librarian",
    accessibleName: "source-linked recall assistant",
    primaryPurpose:
      "Prepare a source-linked recall draft from authoritative records or clearly labeled public educational material.",
    allowedInputClasses: [
      "recall-request",
      "authoritative-record-reference",
      "public-educational-reference",
    ],
    allowedOutputClasses: [
      "source-linked-recall-draft",
      "clarification-request",
    ],
    authoritativeSources: [
      "living-chronicle",
      "source-provenance",
      "public-educational-material",
    ],
    authoritativeActionOwner: "none",
    executionClasses: ["responsive", "deferred", "manual-fallback"],
    confirmationRule: "not-a-domain-action",
    canWriteCanonicalRecords: false,
    canCreateOrExpandPermission: false,
    canSelfConfirmOutput: false,
    canCompleteQuest: false,
    canGrantReward: false,
    prohibitedActions: ASTER_MANDATORY_PROHIBITED_ACTIONS,
  },
  wayfinder: {
    role: "wayfinder",
    accessibleName: "navigation assistant",
    primaryPurpose:
      "Propose an inspectable route through the product without changing domain or permission state.",
    allowedInputClasses: ["navigation-request", "application-state-reference"],
    allowedOutputClasses: ["navigation-proposal", "clarification-request"],
    authoritativeSources: ["player-choice", "application-state"],
    authoritativeActionOwner: "application-navigation",
    executionClasses: ["responsive", "manual-fallback"],
    confirmationRule: "required-before-domain-action",
    canWriteCanonicalRecords: false,
    canCreateOrExpandPermission: false,
    canSelfConfirmOutput: false,
    canCompleteQuest: false,
    canGrantReward: false,
    prohibitedActions: ASTER_MANDATORY_PROHIBITED_ACTIONS,
  },
  interpreter: {
    role: "interpreter",
    accessibleName: "plain-language explanation assistant",
    primaryPurpose:
      "Prepare an uncertainty-preserving explanation of records, mappings, and source limitations.",
    allowedInputClasses: [
      "explanation-request",
      "authoritative-record-reference",
      "mapping-reference",
    ],
    allowedOutputClasses: ["explanation-draft", "clarification-request"],
    authoritativeSources: ["living-chronicle", "source-provenance"],
    authoritativeActionOwner: "none",
    executionClasses: ["responsive", "deferred", "manual-fallback"],
    confirmationRule: "not-a-domain-action",
    canWriteCanonicalRecords: false,
    canCreateOrExpandPermission: false,
    canSelfConfirmOutput: false,
    canCompleteQuest: false,
    canGrantReward: false,
    prohibitedActions: ASTER_MANDATORY_PROHIBITED_ACTIONS,
  },
  storykeeper: {
    role: "storykeeper",
    accessibleName: "narrative presentation assistant",
    primaryPurpose:
      "Propose narrative presentation from confirmed domain events without changing canon, progression, or rewards.",
    allowedInputClasses: [
      "narrative-state-reference",
      "confirmed-domain-event-reference",
    ],
    allowedOutputClasses: ["narrative-presentation-proposal"],
    authoritativeSources: ["gameplay-state", "confirmed-domain-event"],
    authoritativeActionOwner: "gameplay",
    executionClasses: ["responsive", "manual-fallback"],
    confirmationRule: "not-a-domain-action",
    canWriteCanonicalRecords: false,
    canCreateOrExpandPermission: false,
    canSelfConfirmOutput: false,
    canCompleteQuest: false,
    canGrantReward: false,
    prohibitedActions: ASTER_MANDATORY_PROHIBITED_ACTIONS,
  },
} as const satisfies Readonly<Record<AsterRole, AsterRoleAuthorityContract>>;

export function getAsterRoleAuthority(
  role: AsterRole,
): AsterRoleAuthorityContract {
  return ASTER_ROLE_AUTHORITY_MATRIX[role];
}
