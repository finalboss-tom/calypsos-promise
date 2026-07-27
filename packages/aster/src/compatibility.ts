import { ASTER_ROLES, type AsterRole } from "./authority.js";
import {
  ASTER_CORE_NON_AI_PATH_IDS,
  ASTER_LOCAL_SCENARIO_IDS,
  ASTER_ROLE_LOCAL_FALLBACKS,
  type AsterCoreNonAiPathId,
  type AsterLocalScenarioId,
} from "./local-synthetic-adapter.js";
import {
  ASTER_PRIMARY_PROPOSAL_KIND_BY_ROLE,
  type AsterProposalKind,
} from "./proposal.js";
import { ASTER_PROVIDER_GOVERNANCE_STATES } from "./provider-governance.js";
import {
  ASTER_ROLE_OPERATION_BY_ROLE,
  type AsterRoleOperationId,
} from "./role-contracts.js";
import {
  ASTER_CONTRACT_VERSION,
  type AsterContractVersion,
} from "./version.js";

export const ASTER_PUBLIC_COMPONENT_IDS = [
  "authority",
  "role-contracts",
  "proposal",
  "structured-extraction",
  "intent",
  "source-recall",
  "memory",
  "untrusted-input",
  "work-lifecycle",
  "provider-governance",
  "local-synthetic-adapter",
  "package-public-surface",
] as const;
export type AsterPublicComponentId =
  (typeof ASTER_PUBLIC_COMPONENT_IDS)[number];

export const ASTER_COMPATIBILITY_STATUSES = [
  "exact-compatible",
  "additive-compatible",
  "migration-required",
  "incompatible",
  "unknown",
] as const;
export type AsterCompatibilityStatus =
  (typeof ASTER_COMPATIBILITY_STATUSES)[number];

export const ASTER_COMPATIBILITY_CHANGE_CLASSES = [
  "additive-optional",
  "additive-required",
  "enum-expansion",
  "field-removal",
  "semantic-change",
  "authority-boundary-change",
  "revision-rebase",
] as const;
export type AsterCompatibilityChangeClass =
  (typeof ASTER_COMPATIBILITY_CHANGE_CLASSES)[number];

export const ASTER_MIGRATION_MODES = [
  "deterministic-transform",
  "manual-review",
  "forward-only",
  "not-applicable",
] as const;
export type AsterMigrationMode = (typeof ASTER_MIGRATION_MODES)[number];

export interface AsterPublicFixtureReference {
  readonly fixtureId: string;
  readonly revision: 1;
  readonly componentId: AsterPublicComponentId;
  readonly informationClass: "synthetic";
  readonly publicSafe: true;
  readonly credentialFree: true;
  readonly authoritative: false;
  readonly validatorId: string;
  readonly validatorRevision: 1;
  readonly scenarioIds: readonly AsterLocalScenarioId[];
}

export interface AsterPublicComponentManifestEntry {
  readonly componentId: AsterPublicComponentId;
  readonly revision: 1;
  readonly schemaIds: readonly string[];
  readonly validatorId: string;
  readonly validatorRevision: 1;
  readonly fixtureIds: readonly string[];
  readonly compatibilityStatus: "exact-compatible";
  readonly migrationRequired: false;
  readonly canCreateAuthority: false;
}

export interface AsterRoleCrossContractBinding {
  readonly role: AsterRole;
  readonly operationId: AsterRoleOperationId;
  readonly proposalKind: AsterProposalKind;
  readonly successScenarioId: AsterLocalScenarioId;
  readonly fallbackAvailableWithoutAi: true;
  readonly fallbackAvailableWithoutProvider: true;
}

export interface AsterMigrationPolicy {
  readonly policyId: "aster.compatibility.migration-policy";
  readonly revision: 1;
  readonly currentContractVersion: AsterContractVersion;
  readonly unknownChangesFailClosed: true;
  readonly additiveOptionalMayRemainCompatible: true;
  readonly migrationRequiredFor: readonly AsterCompatibilityChangeClass[];
  readonly incompatibleWithoutNewDecision: readonly AsterCompatibilityChangeClass[];
  readonly preservesPriorRevisionEvidence: true;
  readonly silentFieldRemovalProhibited: true;
  readonly silentAuthorityExpansionProhibited: true;
  readonly providerOrFundingInfluenceProhibited: true;
}

export interface AsterCompatibilityAuthorityBoundary {
  readonly canWriteCanonicalRecords: false;
  readonly canCreateOrExpandPermission: false;
  readonly canConfirmProposal: false;
  readonly canInvokeAuthoritativeAction: false;
  readonly canSelectProviderDefault: false;
  readonly canSetSourceRank: false;
  readonly canControlPublication: false;
  readonly canCompleteQuest: false;
  readonly canGrantReward: false;
}

export interface AsterCompatibilityManifest {
  readonly schemaId: "aster.compatibility.manifest";
  readonly contractVersion: AsterContractVersion;
  readonly manifestId: "aster.compatibility.current";
  readonly revision: 1;
  readonly components: readonly AsterPublicComponentManifestEntry[];
  readonly fixtures: readonly AsterPublicFixtureReference[];
  readonly roleBindings: readonly AsterRoleCrossContractBinding[];
  readonly localScenarioIds: readonly AsterLocalScenarioId[];
  readonly coreNonAiPathIds: readonly AsterCoreNonAiPathId[];
  readonly providerGovernanceStates: readonly string[];
  readonly migrationPolicy: AsterMigrationPolicy;
  readonly authority: AsterCompatibilityAuthorityBoundary;
}

export interface AsterMigrationPlan {
  readonly migrationId: string;
  readonly revision: 1;
  readonly componentId: AsterPublicComponentId;
  readonly fromContractVersion: AsterContractVersion;
  readonly toContractVersion: AsterContractVersion;
  readonly fromComponentRevision: number;
  readonly toComponentRevision: number;
  readonly mode: Exclude<AsterMigrationMode, "not-applicable">;
  readonly preservesSourceArtifact: true;
  readonly preservesPriorRevisionEvidence: true;
  readonly createsNewRevision: true;
  readonly rollbackOrForwardOnlyDeclared: true;
  readonly publicSyntheticFixtureIds: readonly string[];
  readonly canWriteCanonicalRecords: false;
  readonly canCreateOrExpandPermission: false;
  readonly canConfirmProposal: false;
  readonly canSelectProviderDefault: false;
  readonly canSetSourceRank: false;
  readonly canControlPublication: false;
}

export interface AsterCompatibilityChange {
  readonly changeId: string;
  readonly componentId: AsterPublicComponentId;
  readonly fromComponentRevision: number;
  readonly toComponentRevision: number;
  readonly changeClass: AsterCompatibilityChangeClass;
  readonly declaredStatus: AsterCompatibilityStatus;
  readonly migrationPlan: AsterMigrationPlan | null;
  readonly authorityBoundaryChanged: boolean;
}

const COMPONENT_DEFINITIONS = [
  ["authority", ["aster.role.authority"], "validateAsterRoleAuthorityMatrix"],
  ["role-contracts", ["aster.role.*"], "validateAsterRoleContracts"],
  ["proposal", ["aster.proposal.envelope"], "validateAsterProposalEnvelope"],
  [
    "structured-extraction",
    ["aster.structured-extraction"],
    "validateAsterStructuredExtraction",
  ],
  ["intent", ["aster.intent.decision"], "validateAsterIntentDecision"],
  [
    "source-recall",
    ["aster.source-linked-recall", "aster.source-aware-explanation"],
    "validateAsterSourceLinkedOutput",
  ],
  ["memory", ["aster.memory.entry"], "validateAsterMemoryEntry"],
  [
    "untrusted-input",
    ["aster.untrusted-input.isolation"],
    "validateAsterUntrustedInputIsolation",
  ],
  ["work-lifecycle", ["aster.work.lifecycle"], "validateAsterWorkLifecycle"],
  [
    "provider-governance",
    ["aster.provider.governance"],
    "validateAsterProviderGovernance",
  ],
  [
    "local-synthetic-adapter",
    ["aster.local.synthetic-adapter", "aster.local.synthetic-run"],
    "validateAsterLocalSyntheticAdapter",
  ],
  [
    "package-public-surface",
    ["aster.compatibility.manifest"],
    "validateAsterCompatibilityManifest",
  ],
] as const satisfies readonly [
  AsterPublicComponentId,
  readonly string[],
  string,
][];

const FIXTURE_SCENARIOS_BY_COMPONENT = {
  authority: ["scribe-structured-draft"],
  "role-contracts": [
    "scribe-structured-draft",
    "librarian-source-linked-recall",
    "wayfinder-navigation",
    "interpreter-source-aware-explanation",
    "storykeeper-confirmed-event-presentation",
  ],
  proposal: ["scribe-structured-draft", "clarification-resolved"],
  "structured-extraction": ["scribe-structured-draft", "manual-capture"],
  intent: [
    "unknown-intent",
    "ambiguous-intent",
    "clarification-resolved",
    "low-confidence",
    "unsupported-refusal",
  ],
  "source-recall": [
    "librarian-source-linked-recall",
    "interpreter-source-aware-explanation",
    "stale-work",
    "superseded-work",
  ],
  memory: ["manual-capture"],
  "untrusted-input": ["prompt-injection"],
  "work-lifecycle": [
    "timeout",
    "provider-unavailable",
    "stale-work",
    "superseded-work",
  ],
  "provider-governance": ["provider-unavailable"],
  "local-synthetic-adapter": ASTER_LOCAL_SCENARIO_IDS,
  "package-public-surface": ["permission-review"],
} as const satisfies Readonly<
  Record<AsterPublicComponentId, readonly AsterLocalScenarioId[]>
>;

function fixtureId(componentId: AsterPublicComponentId): string {
  return `aster.fixture.${componentId}.current`;
}

export const ASTER_PUBLIC_FIXTURE_CATALOGUE = COMPONENT_DEFINITIONS.map(
  ([componentId, , validatorId]) => ({
    fixtureId: fixtureId(componentId),
    revision: 1,
    componentId,
    informationClass: "synthetic",
    publicSafe: true,
    credentialFree: true,
    authoritative: false,
    validatorId,
    validatorRevision: 1,
    scenarioIds: FIXTURE_SCENARIOS_BY_COMPONENT[componentId],
  }),
) satisfies readonly AsterPublicFixtureReference[];

export const ASTER_PUBLIC_COMPONENT_MANIFEST = COMPONENT_DEFINITIONS.map(
  ([componentId, schemaIds, validatorId]) => ({
    componentId,
    revision: 1,
    schemaIds,
    validatorId,
    validatorRevision: 1,
    fixtureIds: [fixtureId(componentId)],
    compatibilityStatus: "exact-compatible",
    migrationRequired: false,
    canCreateAuthority: false,
  }),
) satisfies readonly AsterPublicComponentManifestEntry[];

const SUCCESS_SCENARIO_BY_ROLE = {
  scribe: "scribe-structured-draft",
  librarian: "librarian-source-linked-recall",
  wayfinder: "wayfinder-navigation",
  interpreter: "interpreter-source-aware-explanation",
  storykeeper: "storykeeper-confirmed-event-presentation",
} as const satisfies Readonly<Record<AsterRole, AsterLocalScenarioId>>;

export const ASTER_ROLE_CROSS_CONTRACT_BINDINGS = ASTER_ROLES.map((role) => {
  const fallback = ASTER_ROLE_LOCAL_FALLBACKS.find(
    (candidate) => candidate.role === role,
  );
  if (!fallback) {
    throw new Error(`Missing local fallback for Aster role: ${role}`);
  }
  return {
    role,
    operationId: ASTER_ROLE_OPERATION_BY_ROLE[role],
    proposalKind: ASTER_PRIMARY_PROPOSAL_KIND_BY_ROLE[role],
    successScenarioId: SUCCESS_SCENARIO_BY_ROLE[role],
    fallbackAvailableWithoutAi: fallback.availableWithoutAi,
    fallbackAvailableWithoutProvider: fallback.availableWithoutProvider,
  };
}) satisfies readonly AsterRoleCrossContractBinding[];

export const ASTER_MIGRATION_POLICY = {
  policyId: "aster.compatibility.migration-policy",
  revision: 1,
  currentContractVersion: ASTER_CONTRACT_VERSION,
  unknownChangesFailClosed: true,
  additiveOptionalMayRemainCompatible: true,
  migrationRequiredFor: [
    "additive-required",
    "enum-expansion",
    "field-removal",
    "semantic-change",
    "revision-rebase",
  ],
  incompatibleWithoutNewDecision: ["authority-boundary-change"],
  preservesPriorRevisionEvidence: true,
  silentFieldRemovalProhibited: true,
  silentAuthorityExpansionProhibited: true,
  providerOrFundingInfluenceProhibited: true,
} as const satisfies AsterMigrationPolicy;

export const ASTER_COMPATIBILITY_AUTHORITY_BOUNDARY = {
  canWriteCanonicalRecords: false,
  canCreateOrExpandPermission: false,
  canConfirmProposal: false,
  canInvokeAuthoritativeAction: false,
  canSelectProviderDefault: false,
  canSetSourceRank: false,
  canControlPublication: false,
  canCompleteQuest: false,
  canGrantReward: false,
} as const satisfies AsterCompatibilityAuthorityBoundary;

export const ASTER_COMPATIBILITY_MANIFEST = {
  schemaId: "aster.compatibility.manifest",
  contractVersion: ASTER_CONTRACT_VERSION,
  manifestId: "aster.compatibility.current",
  revision: 1,
  components: ASTER_PUBLIC_COMPONENT_MANIFEST,
  fixtures: ASTER_PUBLIC_FIXTURE_CATALOGUE,
  roleBindings: ASTER_ROLE_CROSS_CONTRACT_BINDINGS,
  localScenarioIds: ASTER_LOCAL_SCENARIO_IDS,
  coreNonAiPathIds: ASTER_CORE_NON_AI_PATH_IDS,
  providerGovernanceStates: ASTER_PROVIDER_GOVERNANCE_STATES,
  migrationPolicy: ASTER_MIGRATION_POLICY,
  authority: ASTER_COMPATIBILITY_AUTHORITY_BOUNDARY,
} as const satisfies AsterCompatibilityManifest;

export function classifyAsterCompatibilityChange(
  changeClass: AsterCompatibilityChangeClass,
): AsterCompatibilityStatus {
  if (changeClass === "additive-optional") return "additive-compatible";
  if (changeClass === "authority-boundary-change") return "incompatible";
  return "migration-required";
}
