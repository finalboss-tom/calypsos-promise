import type { AsterJsonValue } from "./proposal.js";
import {
  ASTER_CONTRACT_VERSION,
  type AsterContractVersion,
} from "./version.js";

export const ASTER_MEMORY_CLASSES = [
  "transient-context",
  "retained-preference",
  "accessibility-context",
  "retained-conversation",
  "derived-record-linked-memory",
  "narrative-presentation-state",
  "provider-operational-metadata",
] as const;

export type AsterMemoryClass = (typeof ASTER_MEMORY_CLASSES)[number];

export const ASTER_MEMORY_OWNER_CLASSES = [
  "request-context",
  "product-memory",
  "gameplay-presentation",
  "provider-operations",
] as const;

export type AsterMemoryOwnerClass =
  (typeof ASTER_MEMORY_OWNER_CLASSES)[number];

export const ASTER_MEMORY_RETENTION_MODES = [
  "request-bounded",
  "player-controlled",
  "record-linked",
  "presentation-bounded",
  "provider-policy-bounded",
] as const;

export type AsterMemoryRetentionMode =
  (typeof ASTER_MEMORY_RETENTION_MODES)[number];

export const ASTER_MEMORY_CORRECTION_MODES = [
  "not-applicable",
  "append-revision",
] as const;

export type AsterMemoryCorrectionMode =
  (typeof ASTER_MEMORY_CORRECTION_MODES)[number];

export const ASTER_MEMORY_EGRESS_MODES = [
  "none",
  "separate-provider-egress-contract-required",
  "provider-operations-only",
] as const;

export type AsterMemoryEgressMode =
  (typeof ASTER_MEMORY_EGRESS_MODES)[number];

export const ASTER_MEMORY_MISSING_FALLBACKS = [
  "continue-without-memory",
  "ask-player",
  "use-accessible-default",
  "recompute-from-authoritative-records",
  "deterministic-presentation",
  "provider-independent-operation",
] as const;

export type AsterMemoryMissingFallback =
  (typeof ASTER_MEMORY_MISSING_FALLBACKS)[number];

export const ASTER_MEMORY_SOURCE_CLASSES = [
  "request-context",
  "player-choice",
  "accessibility-setting",
  "retained-conversation",
  "chronicle-record",
  "gameplay-state",
  "provider-operation",
] as const;

export type AsterMemorySourceClass =
  (typeof ASTER_MEMORY_SOURCE_CLASSES)[number];

export const ASTER_MEMORY_LIFECYCLE_STATES = [
  "active",
  "superseded",
  "deletion-requested",
  "deleted",
  "expired",
  "unavailable",
] as const;

export type AsterMemoryLifecycleState =
  (typeof ASTER_MEMORY_LIFECYCLE_STATES)[number];

export interface AsterMemoryClassPolicy {
  readonly policyId: "policy.aster.memory.baseline";
  readonly policyRevision: 1;
  readonly memoryClass: AsterMemoryClass;
  readonly owner: AsterMemoryOwnerClass;
  readonly retained: boolean;
  readonly productMemory: boolean;
  readonly material: boolean;
  readonly requiresSeparatePlayerChoice: boolean;
  readonly playerVisible: boolean;
  readonly playerEditable: boolean;
  readonly playerExportable: boolean;
  readonly playerDeletable: boolean;
  readonly correctionMode: AsterMemoryCorrectionMode;
  readonly retentionMode: AsterMemoryRetentionMode;
  readonly expiryRequired: boolean;
  readonly recordLinkRequired: boolean;
  readonly providerOperationalOnly: boolean;
  readonly egressMode: AsterMemoryEgressMode;
  readonly secondaryUseAllowed: false;
  readonly providerTrainingAllowed: false;
  readonly researchUseAllowed: false;
  readonly commercialUseAllowed: false;
  readonly canonicalRecord: false;
  readonly permissionRecord: false;
  readonly canCompleteQuest: false;
  readonly canGrantReward: false;
  readonly corePathMayBlockWhenMissing: false;
  readonly missingMemoryFallback: AsterMemoryMissingFallback;
}

const COMMON_NON_AUTHORITY = {
  secondaryUseAllowed: false,
  providerTrainingAllowed: false,
  researchUseAllowed: false,
  commercialUseAllowed: false,
  canonicalRecord: false,
  permissionRecord: false,
  canCompleteQuest: false,
  canGrantReward: false,
  corePathMayBlockWhenMissing: false,
} as const;

export const ASTER_MEMORY_CLASS_POLICIES = {
  "transient-context": {
    policyId: "policy.aster.memory.baseline",
    policyRevision: 1,
    memoryClass: "transient-context",
    owner: "request-context",
    retained: false,
    productMemory: false,
    material: false,
    requiresSeparatePlayerChoice: false,
    playerVisible: true,
    playerEditable: false,
    playerExportable: false,
    playerDeletable: false,
    correctionMode: "not-applicable",
    retentionMode: "request-bounded",
    expiryRequired: false,
    recordLinkRequired: false,
    providerOperationalOnly: false,
    egressMode: "none",
    missingMemoryFallback: "continue-without-memory",
    ...COMMON_NON_AUTHORITY,
  },
  "retained-preference": {
    policyId: "policy.aster.memory.baseline",
    policyRevision: 1,
    memoryClass: "retained-preference",
    owner: "product-memory",
    retained: true,
    productMemory: true,
    material: true,
    requiresSeparatePlayerChoice: true,
    playerVisible: true,
    playerEditable: true,
    playerExportable: true,
    playerDeletable: true,
    correctionMode: "append-revision",
    retentionMode: "player-controlled",
    expiryRequired: false,
    recordLinkRequired: false,
    providerOperationalOnly: false,
    egressMode: "separate-provider-egress-contract-required",
    missingMemoryFallback: "ask-player",
    ...COMMON_NON_AUTHORITY,
  },
  "accessibility-context": {
    policyId: "policy.aster.memory.baseline",
    policyRevision: 1,
    memoryClass: "accessibility-context",
    owner: "product-memory",
    retained: true,
    productMemory: true,
    material: true,
    requiresSeparatePlayerChoice: true,
    playerVisible: true,
    playerEditable: true,
    playerExportable: true,
    playerDeletable: true,
    correctionMode: "append-revision",
    retentionMode: "player-controlled",
    expiryRequired: false,
    recordLinkRequired: false,
    providerOperationalOnly: false,
    egressMode: "separate-provider-egress-contract-required",
    missingMemoryFallback: "use-accessible-default",
    ...COMMON_NON_AUTHORITY,
  },
  "retained-conversation": {
    policyId: "policy.aster.memory.baseline",
    policyRevision: 1,
    memoryClass: "retained-conversation",
    owner: "product-memory",
    retained: true,
    productMemory: true,
    material: true,
    requiresSeparatePlayerChoice: true,
    playerVisible: true,
    playerEditable: true,
    playerExportable: true,
    playerDeletable: true,
    correctionMode: "append-revision",
    retentionMode: "player-controlled",
    expiryRequired: false,
    recordLinkRequired: false,
    providerOperationalOnly: false,
    egressMode: "separate-provider-egress-contract-required",
    missingMemoryFallback: "continue-without-memory",
    ...COMMON_NON_AUTHORITY,
  },
  "derived-record-linked-memory": {
    policyId: "policy.aster.memory.baseline",
    policyRevision: 1,
    memoryClass: "derived-record-linked-memory",
    owner: "product-memory",
    retained: true,
    productMemory: true,
    material: true,
    requiresSeparatePlayerChoice: true,
    playerVisible: true,
    playerEditable: true,
    playerExportable: true,
    playerDeletable: true,
    correctionMode: "append-revision",
    retentionMode: "record-linked",
    expiryRequired: false,
    recordLinkRequired: true,
    providerOperationalOnly: false,
    egressMode: "separate-provider-egress-contract-required",
    missingMemoryFallback: "recompute-from-authoritative-records",
    ...COMMON_NON_AUTHORITY,
  },
  "narrative-presentation-state": {
    policyId: "policy.aster.memory.baseline",
    policyRevision: 1,
    memoryClass: "narrative-presentation-state",
    owner: "gameplay-presentation",
    retained: true,
    productMemory: true,
    material: true,
    requiresSeparatePlayerChoice: true,
    playerVisible: true,
    playerEditable: true,
    playerExportable: true,
    playerDeletable: true,
    correctionMode: "append-revision",
    retentionMode: "presentation-bounded",
    expiryRequired: false,
    recordLinkRequired: false,
    providerOperationalOnly: false,
    egressMode: "separate-provider-egress-contract-required",
    missingMemoryFallback: "deterministic-presentation",
    ...COMMON_NON_AUTHORITY,
  },
  "provider-operational-metadata": {
    policyId: "policy.aster.memory.baseline",
    policyRevision: 1,
    memoryClass: "provider-operational-metadata",
    owner: "provider-operations",
    retained: true,
    productMemory: false,
    material: false,
    requiresSeparatePlayerChoice: false,
    playerVisible: false,
    playerEditable: false,
    playerExportable: false,
    playerDeletable: false,
    correctionMode: "not-applicable",
    retentionMode: "provider-policy-bounded",
    expiryRequired: true,
    recordLinkRequired: false,
    providerOperationalOnly: true,
    egressMode: "provider-operations-only",
    missingMemoryFallback: "provider-independent-operation",
    ...COMMON_NON_AUTHORITY,
  },
} as const satisfies Readonly<Record<AsterMemoryClass, AsterMemoryClassPolicy>>;

export interface AsterMemorySubjectReference {
  readonly subjectId: string;
  readonly subjectRevision: string | null;
}

export interface AsterMemorySourceReference {
  readonly sourceReferenceId: string;
  readonly sourceClass: AsterMemorySourceClass;
  readonly sourceId: string;
  readonly sourceRevision: string;
}

export interface AsterMemoryRetentionContract {
  readonly mode: AsterMemoryRetentionMode;
  readonly policyId: string;
  readonly policyRevision: number;
  readonly expiresAt: string | null;
}

export interface AsterMemoryLifecycleContract {
  readonly state: AsterMemoryLifecycleState;
  readonly correctsMemoryRevision: number | null;
  readonly supersedesMemoryRevision: number | null;
  readonly supersededByMemoryRevision: number | null;
  readonly deletionRequestReferenceId: string | null;
  readonly reason: string | null;
}

export interface AsterMemoryPlayerControls {
  readonly visible: boolean;
  readonly editable: boolean;
  readonly exportable: boolean;
  readonly deletable: boolean;
}

export interface AsterMemoryEgressContract {
  readonly mode: AsterMemoryEgressMode;
  readonly providerReference: string | null;
  readonly authorityContextIncluded: false;
}

export interface AsterMemorySecondaryUseContract {
  readonly allowed: false;
  readonly providerTrainingAllowed: false;
  readonly researchUseAllowed: false;
  readonly commercialUseAllowed: false;
  readonly separateAuthorizationRequired: true;
}

export interface AsterMemoryAuthorityBoundary {
  readonly canWriteCanonicalRecords: false;
  readonly canCreateOrExpandPermission: false;
  readonly canConfirmProposal: false;
  readonly canCompleteQuest: false;
  readonly canGrantReward: false;
}

export interface AsterMemoryEntry {
  readonly schemaId: "aster.memory.entry";
  readonly schemaRevision: 1;
  readonly contractVersion: AsterContractVersion;
  readonly memoryId: string;
  readonly memoryRevision: number;
  readonly memoryClass: AsterMemoryClass;
  readonly owner: AsterMemoryOwnerClass;
  readonly subject: AsterMemorySubjectReference;
  readonly playerChoiceReferenceId: string | null;
  readonly value: AsterJsonValue | null;
  readonly sourceReferences: readonly AsterMemorySourceReference[];
  readonly retention: AsterMemoryRetentionContract;
  readonly lifecycle: AsterMemoryLifecycleContract;
  readonly playerControls: AsterMemoryPlayerControls;
  readonly egress: AsterMemoryEgressContract;
  readonly secondaryUse: AsterMemorySecondaryUseContract;
  readonly missingMemoryFallback: AsterMemoryMissingFallback;
  readonly corePathMayBlockWhenMissing: false;
  readonly canonicalRecord: false;
  readonly permissionRecord: false;
  readonly providerOperationalOnly: boolean;
  readonly authority: AsterMemoryAuthorityBoundary;
}

export const ASTER_MEMORY_SECONDARY_USE_BOUNDARY: AsterMemorySecondaryUseContract = {
  allowed: false,
  providerTrainingAllowed: false,
  researchUseAllowed: false,
  commercialUseAllowed: false,
  separateAuthorizationRequired: true,
};

export const ASTER_MEMORY_AUTHORITY_BOUNDARY: AsterMemoryAuthorityBoundary = {
  canWriteCanonicalRecords: false,
  canCreateOrExpandPermission: false,
  canConfirmProposal: false,
  canCompleteQuest: false,
  canGrantReward: false,
};

export function getAsterMemoryClassPolicy(
  memoryClass: AsterMemoryClass,
): AsterMemoryClassPolicy {
  return ASTER_MEMORY_CLASS_POLICIES[memoryClass];
}

export function isAsterMemoryClass(value: unknown): value is AsterMemoryClass {
  return (
    typeof value === "string" && ASTER_MEMORY_CLASSES.includes(value as never)
  );
}

export { ASTER_CONTRACT_VERSION };
