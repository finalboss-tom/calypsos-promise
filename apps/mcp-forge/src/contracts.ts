export const FORGE_APPLICATION_ID = "calypsos-promise.forge-mcp" as const;
export const FORGE_CONTRACT_VERSION = "0.1.0-pre.1" as const;
export const FORGE_REGISTRY_REVISION = "1" as const;

export const FORGE_INFORMATION_CLASS_IDS = [
  "public-documentation",
  "public-content",
  "public-schema",
  "public-synthetic-fixture",
  "public-generated-artifact",
  "public-standards-reference",
  "public-synthetic-connector-fixture",
] as const;

export type ForgeInformationClassId =
  (typeof FORGE_INFORMATION_CLASS_IDS)[number];

export const FORGE_RISK_CLASS_IDS = [
  "read-public",
  "validate-public",
  "generate-synthetic-draft",
  "unsupported-or-prohibited",
] as const;

export type ForgeRiskClassId = (typeof FORGE_RISK_CLASS_IDS)[number];

export const FORGE_OPERATION_IDS = [
  "search",
  "inspect",
  "validate",
  "generate-synthetic-draft",
  "none",
] as const;

export type ForgeOperationId = (typeof FORGE_OPERATION_IDS)[number];

export const FORGE_TOOL_LIFECYCLE_STATES = [
  "planned",
  "enabled",
  "deprecated",
  "blocked",
  "retired",
] as const;

export type ForgeToolLifecycleState =
  (typeof FORGE_TOOL_LIFECYCLE_STATES)[number];

export const FORGE_TRANSPORT_EXPOSURE_STATES = [
  "not-exposed",
  "local-stdio-only",
] as const;

export type ForgeTransportExposure =
  (typeof FORGE_TRANSPORT_EXPOSURE_STATES)[number];

export const FORGE_PROHIBITED_CAPABILITY_IDS = [
  "private-data-read",
  "arbitrary-filesystem-read",
  "filesystem-write",
  "repository-mutation",
  "git-mutation",
  "github-mutation",
  "arbitrary-shell",
  "subprocess-execution",
  "dynamic-module-loading",
  "network-access",
  "provider-call",
  "credential-access",
  "production-endpoint-access",
  "canonical-write",
  "permission-decision",
  "gameplay-completion",
  "reward-grant",
  "canon-approval",
  "mapping-approval",
  "clinical-action",
  "institutional-decision",
  "protected-audit-write",
] as const;

export type ForgeProhibitedCapabilityId =
  (typeof FORGE_PROHIBITED_CAPABILITY_IDS)[number];

export interface ForgeAuthorityBoundary {
  readonly canAccessPrivateData: false;
  readonly canSelectRepositoryRoot: false;
  readonly canReadArbitraryFile: false;
  readonly canWriteFile: false;
  readonly canRunShell: false;
  readonly canRunSubprocess: false;
  readonly canLoadDynamicModule: false;
  readonly canUseNetwork: false;
  readonly canMutateRepository: false;
  readonly canMutateGit: false;
  readonly canMutateGitHub: false;
  readonly canCallProvider: false;
  readonly canAccessCredential: false;
  readonly canAccessProductionEndpoint: false;
  readonly canWriteCanonicalRecord: false;
  readonly canCreateOrExpandPermission: false;
  readonly canCompleteQuest: false;
  readonly canGrantReward: false;
  readonly canApproveCanon: false;
  readonly canApproveMapping: false;
  readonly canClaimClinicalAuthority: false;
  readonly canCreateInstitutionalAuthority: false;
  readonly canWriteProtectedAudit: false;
}

export interface ForgeFundingBoundary {
  readonly canControlToolExistence: false;
  readonly canControlRiskClass: false;
  readonly canControlSourceAuthority: false;
  readonly canControlSearchRanking: false;
  readonly canControlValidationOutcome: false;
  readonly canControlMappingAcceptance: false;
  readonly canControlProviderDefault: false;
  readonly canControlPublication: false;
  readonly canControlRoadmap: false;
  readonly canControlGovernance: false;
}

export interface ForgeBoundaryContract {
  readonly applicationId: typeof FORGE_APPLICATION_ID;
  readonly contractVersion: typeof FORGE_CONTRACT_VERSION;
  readonly registryRevision: typeof FORGE_REGISTRY_REVISION;
  readonly owner: "forge-application";
  readonly transportDefault: "local-stdio";
  readonly registryAuthority: "server-owned";
  readonly sourceAuthority: "server-owned-allowlist";
  readonly ordinaryContributionRequiresMcp: false;
  readonly untrustedContentCanModifyRegistry: false;
  readonly untrustedContentCanExpandResources: false;
  readonly untrustedContentCanAuthorizeToolCalls: false;
  readonly authority: ForgeAuthorityBoundary;
  readonly funding: ForgeFundingBoundary;
  readonly prohibitedCapabilities: readonly ForgeProhibitedCapabilityId[];
}

export interface ForgeSourceClassContract {
  readonly id: ForgeInformationClassId;
  readonly revision: "1";
  readonly purpose: string;
  readonly publicOnly: true;
  readonly syntheticOnly: boolean;
  readonly requiresServerOwnedRoot: true;
  readonly canContainPersonalData: false;
  readonly canContainCredentials: false;
  readonly canContainProtectedOperationalEvidence: false;
  readonly catalogueState: "contract-only";
}

export interface ForgeResourceLimits {
  readonly maxInputBytes: number;
  readonly maxFilesScanned: number;
  readonly maxResults: number;
  readonly maxOutputBytes: number;
  readonly timeoutMilliseconds: number;
  readonly maxConcurrency: number;
}

export interface ForgeRiskClassContract {
  readonly id: ForgeRiskClassId;
  readonly revision: "1";
  readonly purpose: string;
  readonly allowedOperations: readonly ForgeOperationId[];
  readonly canMutate: false;
  readonly canUseNetwork: false;
  readonly canAccessPrivateData: false;
  readonly canAccessCredentials: false;
  readonly resultAuthority: "none";
  readonly requiresHumanReviewForAcceptance: boolean;
  readonly defaultLimits: ForgeResourceLimits;
}

export interface ForgeCompatibilityContract {
  readonly status: "pre-stable-exact-revision";
  readonly unknownChangeBehavior: "fail-closed";
  readonly breakingChangeRequiresMigration: true;
  readonly authorityExpansionRequiresGoverningDecision: true;
}

export interface ForgeToolContract {
  readonly id: string;
  readonly revision: "1";
  readonly title: string;
  readonly purpose: string;
  readonly riskClass: ForgeRiskClassId;
  readonly lifecycle: ForgeToolLifecycleState;
  readonly operation: ForgeOperationId;
  readonly transportExposure: ForgeTransportExposure;
  readonly sourceClasses: readonly ForgeInformationClassId[];
  readonly inputSchemaId: string;
  readonly outputSchemaId: string;
  readonly receiptSchemaId: "forge.invocation-receipt.v1";
  readonly errorSchemaId: "forge.error.v1";
  readonly authorityProfileId: "forge.non-authority.v1";
  readonly limits: ForgeResourceLimits;
  readonly compatibility: ForgeCompatibilityContract;
  readonly resultCanCreateAuthority: false;
  readonly resultCanApproveItself: false;
  readonly resultRequiresHumanReviewForAcceptance: boolean;
  readonly allowedProhibitedCapabilities: readonly [];
}

const READ_PUBLIC_LIMITS: ForgeResourceLimits = {
  maxInputBytes: 32_768,
  maxFilesScanned: 200,
  maxResults: 50,
  maxOutputBytes: 524_288,
  timeoutMilliseconds: 5_000,
  maxConcurrency: 1,
};

const VALIDATE_PUBLIC_LIMITS: ForgeResourceLimits = {
  maxInputBytes: 1_048_576,
  maxFilesScanned: 100,
  maxResults: 100,
  maxOutputBytes: 1_048_576,
  timeoutMilliseconds: 10_000,
  maxConcurrency: 1,
};

const GENERATE_SYNTHETIC_LIMITS: ForgeResourceLimits = {
  maxInputBytes: 131_072,
  maxFilesScanned: 50,
  maxResults: 25,
  maxOutputBytes: 1_048_576,
  timeoutMilliseconds: 10_000,
  maxConcurrency: 1,
};

const PROHIBITED_LIMITS: ForgeResourceLimits = {
  maxInputBytes: 0,
  maxFilesScanned: 0,
  maxResults: 0,
  maxOutputBytes: 0,
  timeoutMilliseconds: 0,
  maxConcurrency: 0,
};

export const FORGE_AUTHORITY_BOUNDARY: ForgeAuthorityBoundary = {
  canAccessPrivateData: false,
  canSelectRepositoryRoot: false,
  canReadArbitraryFile: false,
  canWriteFile: false,
  canRunShell: false,
  canRunSubprocess: false,
  canLoadDynamicModule: false,
  canUseNetwork: false,
  canMutateRepository: false,
  canMutateGit: false,
  canMutateGitHub: false,
  canCallProvider: false,
  canAccessCredential: false,
  canAccessProductionEndpoint: false,
  canWriteCanonicalRecord: false,
  canCreateOrExpandPermission: false,
  canCompleteQuest: false,
  canGrantReward: false,
  canApproveCanon: false,
  canApproveMapping: false,
  canClaimClinicalAuthority: false,
  canCreateInstitutionalAuthority: false,
  canWriteProtectedAudit: false,
};

export const FORGE_FUNDING_BOUNDARY: ForgeFundingBoundary = {
  canControlToolExistence: false,
  canControlRiskClass: false,
  canControlSourceAuthority: false,
  canControlSearchRanking: false,
  canControlValidationOutcome: false,
  canControlMappingAcceptance: false,
  canControlProviderDefault: false,
  canControlPublication: false,
  canControlRoadmap: false,
  canControlGovernance: false,
};

export const FORGE_BOUNDARY: ForgeBoundaryContract = {
  applicationId: FORGE_APPLICATION_ID,
  contractVersion: FORGE_CONTRACT_VERSION,
  registryRevision: FORGE_REGISTRY_REVISION,
  owner: "forge-application",
  transportDefault: "local-stdio",
  registryAuthority: "server-owned",
  sourceAuthority: "server-owned-allowlist",
  ordinaryContributionRequiresMcp: false,
  untrustedContentCanModifyRegistry: false,
  untrustedContentCanExpandResources: false,
  untrustedContentCanAuthorizeToolCalls: false,
  authority: FORGE_AUTHORITY_BOUNDARY,
  funding: FORGE_FUNDING_BOUNDARY,
  prohibitedCapabilities: FORGE_PROHIBITED_CAPABILITY_IDS,
};

export const FORGE_SOURCE_CLASSES: readonly ForgeSourceClassContract[] = [
  {
    id: "public-documentation",
    revision: "1",
    purpose: "Public repository documentation, decisions, policies, and roadmaps.",
    publicOnly: true,
    syntheticOnly: false,
    requiresServerOwnedRoot: true,
    canContainPersonalData: false,
    canContainCredentials: false,
    canContainProtectedOperationalEvidence: false,
    catalogueState: "contract-only",
  },
  {
    id: "public-content",
    revision: "1",
    purpose: "Public lore, quest, dialogue, education, and safety content.",
    publicOnly: true,
    syntheticOnly: false,
    requiresServerOwnedRoot: true,
    canContainPersonalData: false,
    canContainCredentials: false,
    canContainProtectedOperationalEvidence: false,
    catalogueState: "contract-only",
  },
  {
    id: "public-schema",
    revision: "1",
    purpose: "Public schema and contract sources used by deterministic validation.",
    publicOnly: true,
    syntheticOnly: false,
    requiresServerOwnedRoot: true,
    canContainPersonalData: false,
    canContainCredentials: false,
    canContainProtectedOperationalEvidence: false,
    catalogueState: "contract-only",
  },
  {
    id: "public-synthetic-fixture",
    revision: "1",
    purpose: "Explicitly synthetic public fixtures and test evidence.",
    publicOnly: true,
    syntheticOnly: true,
    requiresServerOwnedRoot: true,
    canContainPersonalData: false,
    canContainCredentials: false,
    canContainProtectedOperationalEvidence: false,
    catalogueState: "contract-only",
  },
  {
    id: "public-generated-artifact",
    revision: "1",
    purpose: "Public generated schema artifacts approved for repository use.",
    publicOnly: true,
    syntheticOnly: false,
    requiresServerOwnedRoot: true,
    canContainPersonalData: false,
    canContainCredentials: false,
    canContainProtectedOperationalEvidence: false,
    catalogueState: "contract-only",
  },
  {
    id: "public-standards-reference",
    revision: "1",
    purpose: "Explicitly public standards references and public mapping guidance.",
    publicOnly: true,
    syntheticOnly: false,
    requiresServerOwnedRoot: true,
    canContainPersonalData: false,
    canContainCredentials: false,
    canContainProtectedOperationalEvidence: false,
    catalogueState: "contract-only",
  },
  {
    id: "public-synthetic-connector-fixture",
    revision: "1",
    purpose: "Synthetic connector examples with no proprietary or protected source material.",
    publicOnly: true,
    syntheticOnly: true,
    requiresServerOwnedRoot: true,
    canContainPersonalData: false,
    canContainCredentials: false,
    canContainProtectedOperationalEvidence: false,
    catalogueState: "contract-only",
  },
];

export const FORGE_RISK_CLASSES: readonly ForgeRiskClassContract[] = [
  {
    id: "read-public",
    revision: "1",
    purpose: "Bounded search or inspection of allowlisted public sources.",
    allowedOperations: ["search", "inspect"],
    canMutate: false,
    canUseNetwork: false,
    canAccessPrivateData: false,
    canAccessCredentials: false,
    resultAuthority: "none",
    requiresHumanReviewForAcceptance: false,
    defaultLimits: READ_PUBLIC_LIMITS,
  },
  {
    id: "validate-public",
    revision: "1",
    purpose: "Deterministic validation of public or synthetic inputs with no mutation.",
    allowedOperations: ["validate"],
    canMutate: false,
    canUseNetwork: false,
    canAccessPrivateData: false,
    canAccessCredentials: false,
    resultAuthority: "none",
    requiresHumanReviewForAcceptance: true,
    defaultLimits: VALIDATE_PUBLIC_LIMITS,
  },
  {
    id: "generate-synthetic-draft",
    revision: "1",
    purpose: "Generate explicitly synthetic or draft output requiring validation and human review.",
    allowedOperations: ["generate-synthetic-draft"],
    canMutate: false,
    canUseNetwork: false,
    canAccessPrivateData: false,
    canAccessCredentials: false,
    resultAuthority: "none",
    requiresHumanReviewForAcceptance: true,
    defaultLimits: GENERATE_SYNTHETIC_LIMITS,
  },
  {
    id: "unsupported-or-prohibited",
    revision: "1",
    purpose: "Mutation, shell, network, private-data, credential, arbitrary-resource, production, or consequential behavior.",
    allowedOperations: ["none"],
    canMutate: false,
    canUseNetwork: false,
    canAccessPrivateData: false,
    canAccessCredentials: false,
    resultAuthority: "none",
    requiresHumanReviewForAcceptance: true,
    defaultLimits: PROHIBITED_LIMITS,
  },
];

const PRE_STABLE_COMPATIBILITY: ForgeCompatibilityContract = {
  status: "pre-stable-exact-revision",
  unknownChangeBehavior: "fail-closed",
  breakingChangeRequiresMigration: true,
  authorityExpansionRequiresGoverningDecision: true,
};

function plannedTool(
  contract: Omit<
    ForgeToolContract,
    | "revision"
    | "lifecycle"
    | "transportExposure"
    | "receiptSchemaId"
    | "errorSchemaId"
    | "authorityProfileId"
    | "compatibility"
    | "resultCanCreateAuthority"
    | "resultCanApproveItself"
    | "allowedProhibitedCapabilities"
  >,
): ForgeToolContract {
  return {
    ...contract,
    revision: "1",
    lifecycle: "planned",
    transportExposure: "not-exposed",
    receiptSchemaId: "forge.invocation-receipt.v1",
    errorSchemaId: "forge.error.v1",
    authorityProfileId: "forge.non-authority.v1",
    compatibility: PRE_STABLE_COMPATIBILITY,
    resultCanCreateAuthority: false,
    resultCanApproveItself: false,
    allowedProhibitedCapabilities: [],
  };
}

export const FORGE_ACCEPTED_TOOL_IDS = [
  "forge.search.lore",
  "forge.validate.content",
  "forge.inspect.quest-schema",
  "forge.validate.quest",
  "forge.search.architecture",
  "forge.search.decision",
  "forge.generate.synthetic-data",
  "forge.search.public-standards",
  "forge.validate.mapping-draft",
  "forge.search.synthetic-connector-fixtures",
] as const;

export const FORGE_TOOL_REGISTRY: readonly ForgeToolContract[] = [
  plannedTool({
    id: "forge.search.lore",
    title: "Search lore",
    purpose: "Search allowlisted public lore and narrative content with source provenance.",
    riskClass: "read-public",
    operation: "search",
    sourceClasses: ["public-content"],
    inputSchemaId: "forge.search.lore.input.v1",
    outputSchemaId: "forge.search.lore.output.v1",
    limits: READ_PUBLIC_LIMITS,
    resultRequiresHumanReviewForAcceptance: false,
  }),
  plannedTool({
    id: "forge.validate.content",
    title: "Validate public content",
    purpose: "Run named deterministic content validation without mutation or canon approval.",
    riskClass: "validate-public",
    operation: "validate",
    sourceClasses: ["public-content", "public-schema"],
    inputSchemaId: "forge.validate.content.input.v1",
    outputSchemaId: "forge.validate.content.output.v1",
    limits: VALIDATE_PUBLIC_LIMITS,
    resultRequiresHumanReviewForAcceptance: true,
  }),
  plannedTool({
    id: "forge.inspect.quest-schema",
    title: "Inspect quest schema",
    purpose: "Inspect public quest schema contracts and revisions.",
    riskClass: "read-public",
    operation: "inspect",
    sourceClasses: ["public-schema", "public-generated-artifact"],
    inputSchemaId: "forge.inspect.quest-schema.input.v1",
    outputSchemaId: "forge.inspect.quest-schema.output.v1",
    limits: READ_PUBLIC_LIMITS,
    resultRequiresHumanReviewForAcceptance: false,
  }),
  plannedTool({
    id: "forge.validate.quest",
    title: "Validate quest",
    purpose: "Validate public or synthetic quest records against a named schema revision.",
    riskClass: "validate-public",
    operation: "validate",
    sourceClasses: ["public-content", "public-schema", "public-synthetic-fixture"],
    inputSchemaId: "forge.validate.quest.input.v1",
    outputSchemaId: "forge.validate.quest.output.v1",
    limits: VALIDATE_PUBLIC_LIMITS,
    resultRequiresHumanReviewForAcceptance: true,
  }),
  plannedTool({
    id: "forge.search.architecture",
    title: "Search architecture",
    purpose: "Search public architecture and policy records with exact repository provenance.",
    riskClass: "read-public",
    operation: "search",
    sourceClasses: ["public-documentation"],
    inputSchemaId: "forge.search.architecture.input.v1",
    outputSchemaId: "forge.search.architecture.output.v1",
    limits: READ_PUBLIC_LIMITS,
    resultRequiresHumanReviewForAcceptance: false,
  }),
  plannedTool({
    id: "forge.search.decision",
    title: "Search decisions",
    purpose: "Search public decisions, assumptions, roadmap records, and status evidence.",
    riskClass: "read-public",
    operation: "search",
    sourceClasses: ["public-documentation"],
    inputSchemaId: "forge.search.decision.input.v1",
    outputSchemaId: "forge.search.decision.output.v1",
    limits: READ_PUBLIC_LIMITS,
    resultRequiresHumanReviewForAcceptance: false,
  }),
  plannedTool({
    id: "forge.generate.synthetic-data",
    title: "Generate synthetic data",
    purpose: "Generate explicitly synthetic draft records for deterministic validation and human review.",
    riskClass: "generate-synthetic-draft",
    operation: "generate-synthetic-draft",
    sourceClasses: ["public-schema", "public-synthetic-fixture"],
    inputSchemaId: "forge.generate.synthetic-data.input.v1",
    outputSchemaId: "forge.generate.synthetic-data.output.v1",
    limits: GENERATE_SYNTHETIC_LIMITS,
    resultRequiresHumanReviewForAcceptance: true,
  }),
  plannedTool({
    id: "forge.search.public-standards",
    title: "Search public standards",
    purpose: "Search explicitly public standards references without implying certification or completeness.",
    riskClass: "read-public",
    operation: "search",
    sourceClasses: ["public-standards-reference"],
    inputSchemaId: "forge.search.public-standards.input.v1",
    outputSchemaId: "forge.search.public-standards.output.v1",
    limits: READ_PUBLIC_LIMITS,
    resultRequiresHumanReviewForAcceptance: false,
  }),
  plannedTool({
    id: "forge.validate.mapping-draft",
    title: "Validate mapping draft",
    purpose: "Validate a public or synthetic draft mapping without approving semantic equivalence or connector behavior.",
    riskClass: "validate-public",
    operation: "validate",
    sourceClasses: ["public-standards-reference", "public-schema", "public-synthetic-fixture"],
    inputSchemaId: "forge.validate.mapping-draft.input.v1",
    outputSchemaId: "forge.validate.mapping-draft.output.v1",
    limits: VALIDATE_PUBLIC_LIMITS,
    resultRequiresHumanReviewForAcceptance: true,
  }),
  plannedTool({
    id: "forge.search.synthetic-connector-fixtures",
    title: "Search synthetic connector fixtures",
    purpose: "Search synthetic connector examples without accessing provider credentials or proprietary mappings.",
    riskClass: "read-public",
    operation: "search",
    sourceClasses: ["public-synthetic-connector-fixture"],
    inputSchemaId: "forge.search.synthetic-connector-fixtures.input.v1",
    outputSchemaId: "forge.search.synthetic-connector-fixtures.output.v1",
    limits: READ_PUBLIC_LIMITS,
    resultRequiresHumanReviewForAcceptance: false,
  }),
];

export interface ForgeBaselineContract {
  readonly boundary: ForgeBoundaryContract;
  readonly sourceClasses: readonly ForgeSourceClassContract[];
  readonly riskClasses: readonly ForgeRiskClassContract[];
  readonly tools: readonly ForgeToolContract[];
}

export const FORGE_BASELINE: ForgeBaselineContract = {
  boundary: FORGE_BOUNDARY,
  sourceClasses: FORGE_SOURCE_CLASSES,
  riskClasses: FORGE_RISK_CLASSES,
  tools: FORGE_TOOL_REGISTRY,
};
