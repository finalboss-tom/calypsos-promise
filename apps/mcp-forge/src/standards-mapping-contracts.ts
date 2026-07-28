import type {
  ForgeJsonSchema,
  ForgeMcpToolAnnotations,
  ForgeToolNonAuthority,
} from "./lore-schema-contracts.js";
import type {
  ForgeSourcePartialReasonId,
  ForgeSourceProvenance,
  ForgeSourceResultState,
} from "./source-contracts.js";

export const FORGE_STANDARDS_MAPPING_TOOL_REVISION = "1" as const;

export const FORGE_ENABLED_STANDARDS_MAPPING_TOOL_IDS = [
  "forge.search.public-standards",
  "forge.validate.mapping-draft",
  "forge.search.synthetic-connector-fixtures",
] as const;

export type ForgeEnabledStandardsMappingToolId =
  (typeof FORGE_ENABLED_STANDARDS_MAPPING_TOOL_IDS)[number];

export interface ForgeBoundedPublicSearchInput {
  readonly query: string;
  readonly maxResults?: number;
  readonly maxFiles?: number;
}

export type ForgeStandardsMatchClass =
  "exact-phrase" | "all-terms" | "partial-terms";

export interface ForgePublicStandardsSearchMatch {
  readonly title?: string;
  readonly standardId?: string;
  readonly version?: string;
  readonly excerpt: string;
  readonly matchClass: ForgeStandardsMatchClass;
  readonly matchedTerms: readonly string[];
  readonly provenance: ForgeSourceProvenance;
}

export interface ForgeSearchPublicStandardsOutput extends ForgeToolNonAuthority {
  readonly toolId: "forge.search.public-standards";
  readonly revision: typeof FORGE_STANDARDS_MAPPING_TOOL_REVISION;
  readonly query: string;
  readonly matches: readonly ForgePublicStandardsSearchMatch[];
  readonly resultState: ForgeSourceResultState;
  readonly partialReasons: readonly (
    ForgeSourcePartialReasonId | "result-limit-reached"
  )[];
  readonly scannedFiles: number;
  readonly returnedMatches: number;
  readonly certificationClaim: "not-established";
  readonly completenessClaim: "not-established";
  readonly providerPreference: "none";
  readonly networkUsed: false;
}

export interface ForgeSyntheticConnectorFixtureSearchMatch {
  readonly fixtureId: string;
  readonly connectorKind?: string;
  readonly standardId?: string;
  readonly description?: string;
  readonly excerpt: string;
  readonly matchClass: ForgeStandardsMatchClass;
  readonly matchedTerms: readonly string[];
  readonly explicitSynthetic: true;
  readonly productionReady: false;
  readonly containsCredentials: false;
  readonly containsPersonalData: false;
  readonly provenance: ForgeSourceProvenance;
}

export type ForgeSyntheticConnectorSearchPartialReason =
  | ForgeSourcePartialReasonId
  | "result-limit-reached"
  | "unclassified-fixture-skipped";

export interface ForgeSearchSyntheticConnectorFixturesOutput extends ForgeToolNonAuthority {
  readonly toolId: "forge.search.synthetic-connector-fixtures";
  readonly revision: typeof FORGE_STANDARDS_MAPPING_TOOL_REVISION;
  readonly query: string;
  readonly matches: readonly ForgeSyntheticConnectorFixtureSearchMatch[];
  readonly resultState: ForgeSourceResultState;
  readonly partialReasons: readonly ForgeSyntheticConnectorSearchPartialReason[];
  readonly scannedFiles: number;
  readonly returnedMatches: number;
  readonly skippedUnclassifiedFixtures: number;
  readonly fixtureAuthority: "synthetic-evidence-only";
  readonly connectorActivation: "not-granted";
  readonly providerPreference: "none";
  readonly networkUsed: false;
}

export const FORGE_MAPPING_DRAFT_INFORMATION_CLASSES = [
  "public-standards-reference",
  "public-synthetic-fixture",
] as const;

export type ForgeMappingDraftInformationClass =
  (typeof FORGE_MAPPING_DRAFT_INFORMATION_CLASSES)[number];

export interface ForgeValidateMappingDraftInput {
  readonly mapping?: unknown;
  readonly sourcePath?: string;
  readonly informationClass?: ForgeMappingDraftInformationClass;
  readonly mappingRevision?: string;
}

export const FORGE_MAPPING_VALIDATION_CODES = {
  invalidInput: "forge.mapping.invalid-input",
  invalidKind: "forge.mapping.invalid-kind",
  invalidRevision: "forge.mapping.invalid-revision",
  notDraft: "forge.mapping.not-draft",
  invalidIdentity: "forge.mapping.invalid-identity",
  invalidStandard: "forge.mapping.invalid-standard",
  invalidTarget: "forge.mapping.invalid-target",
  invalidEntry: "forge.mapping.invalid-entry",
  duplicateEntry: "forge.mapping.duplicate-entry",
  invalidEvidence: "forge.mapping.invalid-synthetic-evidence",
  invalidReview: "forge.mapping.invalid-review-requirements",
  approvalClaim: "forge.mapping.approval-claim-forbidden",
  productionClaim: "forge.mapping.production-claim-forbidden",
  certificationClaim: "forge.mapping.certification-claim-forbidden",
  providerPreference: "forge.mapping.provider-preference-forbidden",
} as const;

export type ForgeMappingValidationCode =
  (typeof FORGE_MAPPING_VALIDATION_CODES)[keyof typeof FORGE_MAPPING_VALIDATION_CODES];

export interface ForgeMappingValidationIssue {
  readonly code: ForgeMappingValidationCode;
  readonly path: string;
  readonly message: string;
}

export interface ForgeMappingValidationIdentity {
  readonly id?: string;
  readonly kind?: string;
  readonly revision?: string;
  readonly status?: string;
}

export interface ForgeValidateMappingDraftOutput extends ForgeToolNonAuthority {
  readonly toolId: "forge.validate.mapping-draft";
  readonly revision: typeof FORGE_STANDARDS_MAPPING_TOOL_REVISION;
  readonly mappingRevision: "1";
  readonly valid: boolean;
  readonly issues: readonly ForgeMappingValidationIssue[];
  readonly identity: ForgeMappingValidationIdentity;
  readonly inputMode: "inline-public" | "allowlisted-public-source";
  readonly inputInformationClass: ForgeMappingDraftInformationClass;
  readonly provenance?: ForgeSourceProvenance;
  readonly humanReviewRequired: true;
  readonly mappingApproval: "not-granted";
  readonly semanticEquivalence: "not-proven";
  readonly connectorBehavior: "not-proven";
  readonly certification: "not-granted";
  readonly productionReadiness: "not-established";
  readonly providerPreference: "none";
}

const READ_ONLY_ANNOTATIONS = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const;

export interface ForgeStandardsMappingMcpToolDescriptor {
  readonly name: ForgeEnabledStandardsMappingToolId;
  readonly title: string;
  readonly description: string;
  readonly inputSchema: ForgeJsonSchema;
  readonly annotations: ForgeMcpToolAnnotations;
}

export const FORGE_STANDARDS_MAPPING_TOOL_DESCRIPTORS: readonly ForgeStandardsMappingMcpToolDescriptor[] =
  [
    {
      name: "forge.search.public-standards",
      title: "Search public standards references",
      description:
        "Search server-allowlisted public standards references with exact provenance. Results do not establish completeness, certification, implementation correctness, or provider preference.",
      inputSchema: {
        type: "object",
        additionalProperties: false,
        required: ["query"],
        properties: {
          query: { type: "string", minLength: 1, maxLength: 256 },
          maxResults: { type: "integer", minimum: 1, maximum: 50 },
          maxFiles: { type: "integer", minimum: 1, maximum: 200 },
        },
      },
      annotations: READ_ONLY_ANNOTATIONS,
    },
    {
      name: "forge.validate.mapping-draft",
      title: "Validate mapping draft",
      description:
        "Deterministically validate one public or synthetic mapping draft. Success cannot approve semantic equivalence, certify interoperability, activate a connector, select a provider, or establish production readiness.",
      inputSchema: {
        type: "object",
        additionalProperties: false,
        properties: {
          mapping: { type: "object" },
          sourcePath: { type: "string", minLength: 1, maxLength: 512 },
          informationClass: {
            type: "string",
            enum: FORGE_MAPPING_DRAFT_INFORMATION_CLASSES,
          },
          mappingRevision: { type: "string", enum: ["1"] },
        },
        oneOf: [
          { required: ["mapping", "informationClass"] },
          { required: ["sourcePath"] },
        ],
      },
      annotations: READ_ONLY_ANNOTATIONS,
    },
    {
      name: "forge.search.synthetic-connector-fixtures",
      title: "Search synthetic connector fixtures",
      description:
        "Search explicitly synthetic connector fixtures with exact provenance. Results cannot expose credentials, call providers, activate connectors, approve mappings, or establish production behavior.",
      inputSchema: {
        type: "object",
        additionalProperties: false,
        required: ["query"],
        properties: {
          query: { type: "string", minLength: 1, maxLength: 256 },
          maxResults: { type: "integer", minimum: 1, maximum: 50 },
          maxFiles: { type: "integer", minimum: 1, maximum: 200 },
        },
      },
      annotations: READ_ONLY_ANNOTATIONS,
    },
  ];
