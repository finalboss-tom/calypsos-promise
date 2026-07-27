import {
  ASTER_CONTRACT_VERSION,
  type AsterContractVersion,
} from "./version.js";

export const ASTER_UNTRUSTED_INPUT_CLASSES = [
  "document",
  "image",
  "imported-record",
  "web-content",
  "retrieved-passage",
  "provider-response",
  "tool-result",
  "model-output",
  "prior-conversation",
] as const;

export type AsterUntrustedInputClass =
  (typeof ASTER_UNTRUSTED_INPUT_CLASSES)[number];

export const ASTER_UNTRUSTED_INPUT_ALLOWED_USES = [
  "extract",
  "summarize",
  "retrieve",
  "quote",
  "classify",
  "explain",
] as const;

export type AsterUntrustedInputAllowedUse =
  (typeof ASTER_UNTRUSTED_INPUT_ALLOWED_USES)[number];

export const ASTER_UNTRUSTED_INPUT_FINDING_CODES = [
  "embedded-policy-override",
  "tool-registry-mutation",
  "subject-authority-claim",
  "permission-authority-claim",
  "action-scope-expansion",
  "confirmation-bypass",
  "source-suppression",
  "uncertainty-suppression",
  "cross-subject-access",
  "arbitrary-resource-invocation",
  "memory-persistence",
  "secret-or-hidden-instruction-request",
  "canonical-truth-claim",
  "clinical-authority-claim",
] as const;

export type AsterUntrustedInputFindingCode =
  (typeof ASTER_UNTRUSTED_INPUT_FINDING_CODES)[number];

export const ASTER_UNTRUSTED_INPUT_DISPOSITIONS = [
  "data-only",
  "clarification-required",
  "blocked",
  "manual-fallback",
] as const;

export type AsterUntrustedInputDisposition =
  (typeof ASTER_UNTRUSTED_INPUT_DISPOSITIONS)[number];

export interface AsterUntrustedInputClassPolicy {
  readonly inputClass: AsterUntrustedInputClass;
  readonly allowedUses: readonly AsterUntrustedInputAllowedUse[];
  readonly contentTreatedAsData: true;
  readonly embeddedInstructionsTreatedAsData: true;
  readonly canSetPolicy: false;
  readonly canModifyToolRegistry: false;
  readonly canChooseControllingSubject: false;
  readonly canCreateOrExpandPermission: false;
  readonly canInvokeResources: false;
  readonly canPersistItselfAsMemory: false;
}

function policy(
  inputClass: AsterUntrustedInputClass,
  allowedUses: readonly AsterUntrustedInputAllowedUse[],
): AsterUntrustedInputClassPolicy {
  return {
    inputClass,
    allowedUses,
    contentTreatedAsData: true,
    embeddedInstructionsTreatedAsData: true,
    canSetPolicy: false,
    canModifyToolRegistry: false,
    canChooseControllingSubject: false,
    canCreateOrExpandPermission: false,
    canInvokeResources: false,
    canPersistItselfAsMemory: false,
  };
}

export const ASTER_UNTRUSTED_INPUT_CLASS_POLICIES = {
  document: policy("document", ["extract", "summarize", "quote", "classify"]),
  image: policy("image", ["extract", "summarize", "classify"]),
  "imported-record": policy("imported-record", [
    "extract",
    "summarize",
    "classify",
    "explain",
  ]),
  "web-content": policy("web-content", [
    "retrieve",
    "summarize",
    "quote",
    "classify",
  ]),
  "retrieved-passage": policy("retrieved-passage", [
    "summarize",
    "quote",
    "classify",
    "explain",
  ]),
  "provider-response": policy("provider-response", [
    "extract",
    "classify",
    "explain",
  ]),
  "tool-result": policy("tool-result", ["extract", "classify", "explain"]),
  "model-output": policy("model-output", ["classify", "explain"]),
  "prior-conversation": policy("prior-conversation", [
    "summarize",
    "quote",
    "classify",
  ]),
} as const satisfies Record<
  AsterUntrustedInputClass,
  AsterUntrustedInputClassPolicy
>;

export interface AsterUntrustedInputSubjectReference {
  readonly subjectClass: "chronicle-subject" | "application-session";
  readonly subjectId: string;
  readonly subjectRevision: string | null;
}

export interface AsterServerOwnedToolReference {
  readonly toolId: string;
  readonly toolRevision: string;
  readonly registryOwner: "server-owned-registry";
}

export interface AsterUntrustedInputServerContext {
  readonly contextId: string;
  readonly contextRevision: string;
  readonly contextOwner: "deterministic-application";
  readonly subject: AsterUntrustedInputSubjectReference;
  readonly purpose: string;
  readonly authorityRevisionReferences: readonly string[];
  readonly allowedResourceReferenceIds: readonly string[];
  readonly allowedTools: readonly AsterServerOwnedToolReference[];
  readonly exactPlayerConfirmationRequired: boolean;
}

export interface AsterUntrustedInputReference {
  readonly inputId: string;
  readonly inputRevision: string;
  readonly inputClass: AsterUntrustedInputClass;
  readonly sourceReferenceId: string | null;
  readonly allowedUses: readonly AsterUntrustedInputAllowedUse[];
  readonly claimedSubjectId: string | null;
  readonly requestedResourceReferenceIds: readonly string[];
  readonly requestedToolIds: readonly string[];
  readonly contentTreatedAsData: true;
  readonly embeddedInstructionsTreatedAsData: true;
  readonly trusted: false;
  readonly subjectClaimAccepted: false;
  readonly authorityClaimsAccepted: false;
}

export interface AsterUntrustedInputFinding {
  readonly findingId: string;
  readonly code: AsterUntrustedInputFindingCode;
  readonly inputIds: readonly string[];
  readonly description: string;
  readonly material: boolean;
}

export interface AsterUntrustedInputVisibilityBoundary {
  readonly sourcesPreserved: true;
  readonly uncertaintyPreserved: true;
  readonly conflictsPreserved: true;
}

export interface AsterUntrustedInputAuthorityBoundary {
  readonly canChangePolicy: false;
  readonly canModifyToolRegistry: false;
  readonly canChooseControllingSubject: false;
  readonly canCreateOrExpandPermission: false;
  readonly canExpandActionScope: false;
  readonly canBypassConfirmation: false;
  readonly canInvokeArbitraryResource: false;
  readonly canCrossSubjectBoundary: false;
  readonly canPersistItselfAsMemory: false;
  readonly canSuppressSources: false;
  readonly canSuppressUncertainty: false;
  readonly canRevealSecrets: false;
  readonly canWriteCanonicalRecords: false;
  readonly canCreateClinicalAuthority: false;
}

export interface AsterUntrustedInputEffectBoundary {
  readonly toolInvoked: false;
  readonly resourceAccessed: false;
  readonly memoryPersisted: false;
  readonly canonicalWriteAttempted: false;
}

export interface AsterUntrustedInputIsolationEnvelope {
  readonly schemaId: "aster.untrusted-input.isolation";
  readonly schemaRevision: 1;
  readonly contractVersion: AsterContractVersion;
  readonly isolationId: string;
  readonly isolationRevision: number;
  readonly requestId: string;
  readonly requestRevision: number;
  readonly intentDecisionRevision: string | null;
  readonly serverContext: AsterUntrustedInputServerContext;
  readonly inputs: readonly AsterUntrustedInputReference[];
  readonly findings: readonly AsterUntrustedInputFinding[];
  readonly disposition: AsterUntrustedInputDisposition;
  readonly proposalPreparationAllowed: boolean;
  readonly clarificationQuestion: string | null;
  readonly manualFallback: string | null;
  readonly visibility: AsterUntrustedInputVisibilityBoundary;
  readonly authority: AsterUntrustedInputAuthorityBoundary;
  readonly effects: AsterUntrustedInputEffectBoundary;
}

export const ASTER_UNTRUSTED_INPUT_AUTHORITY_BOUNDARY: AsterUntrustedInputAuthorityBoundary =
  {
    canChangePolicy: false,
    canModifyToolRegistry: false,
    canChooseControllingSubject: false,
    canCreateOrExpandPermission: false,
    canExpandActionScope: false,
    canBypassConfirmation: false,
    canInvokeArbitraryResource: false,
    canCrossSubjectBoundary: false,
    canPersistItselfAsMemory: false,
    canSuppressSources: false,
    canSuppressUncertainty: false,
    canRevealSecrets: false,
    canWriteCanonicalRecords: false,
    canCreateClinicalAuthority: false,
  };

export const ASTER_UNTRUSTED_INPUT_EFFECT_BOUNDARY: AsterUntrustedInputEffectBoundary =
  {
    toolInvoked: false,
    resourceAccessed: false,
    memoryPersisted: false,
    canonicalWriteAttempted: false,
  };

export const ASTER_UNTRUSTED_INPUT_VISIBILITY_BOUNDARY: AsterUntrustedInputVisibilityBoundary =
  {
    sourcesPreserved: true,
    uncertaintyPreserved: true,
    conflictsPreserved: true,
  };

export function isAsterUntrustedInputClass(
  value: unknown,
): value is AsterUntrustedInputClass {
  return (
    typeof value === "string" &&
    ASTER_UNTRUSTED_INPUT_CLASSES.includes(value as AsterUntrustedInputClass)
  );
}

export function isAsterUntrustedInputFindingCode(
  value: unknown,
): value is AsterUntrustedInputFindingCode {
  return (
    typeof value === "string" &&
    ASTER_UNTRUSTED_INPUT_FINDING_CODES.includes(
      value as AsterUntrustedInputFindingCode,
    )
  );
}

export function isAsterUntrustedInputDisposition(
  value: unknown,
): value is AsterUntrustedInputDisposition {
  return (
    typeof value === "string" &&
    ASTER_UNTRUSTED_INPUT_DISPOSITIONS.includes(
      value as AsterUntrustedInputDisposition,
    )
  );
}

export { ASTER_CONTRACT_VERSION };
