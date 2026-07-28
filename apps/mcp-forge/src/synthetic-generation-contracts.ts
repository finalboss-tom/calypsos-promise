import type {
  ForgeJsonSchema,
  ForgeMcpToolAnnotations,
  ForgeToolNonAuthority,
} from "./lore-schema-contracts.js";

export const FORGE_SYNTHETIC_GENERATION_TOOL_REVISION = "1" as const;
export const FORGE_SYNTHETIC_GENERATOR_ID =
  "forge.synthetic.generator" as const;
export const FORGE_SYNTHETIC_GENERATOR_REVISION = "1" as const;

export const FORGE_SYNTHETIC_GENERATION_KIND_IDS = [
  "quest",
  "mapping-draft",
] as const;

export type ForgeSyntheticGenerationKind =
  (typeof FORGE_SYNTHETIC_GENERATION_KIND_IDS)[number];

export const FORGE_SYNTHETIC_GENERATION_PROFILE_IDS = [
  "balanced",
  "accessibility",
  "edge-cases",
] as const;

export type ForgeSyntheticGenerationProfile =
  (typeof FORGE_SYNTHETIC_GENERATION_PROFILE_IDS)[number];

export interface ForgeGenerateSyntheticDataInput {
  readonly kind: ForgeSyntheticGenerationKind;
  readonly seed: string;
  readonly count?: number;
  readonly profile?: ForgeSyntheticGenerationProfile;
}

export interface ForgeSyntheticGeneratorEvidence {
  readonly id: typeof FORGE_SYNTHETIC_GENERATOR_ID;
  readonly revision: typeof FORGE_SYNTHETIC_GENERATOR_REVISION;
  readonly seedDigest: `sha256:${string}`;
  readonly caseIndex: number;
  readonly profile: ForgeSyntheticGenerationProfile;
  readonly scenarioId: string;
}

export interface ForgeSyntheticSchemaEvidence {
  readonly id: string;
  readonly revision: string;
}

export interface ForgeSyntheticValidationEvidence {
  readonly validatorId: string;
  readonly validatorRevision: string;
  readonly valid: true;
  readonly issues: readonly [];
}

export interface ForgeGeneratedSyntheticRecord {
  readonly caseId: string;
  readonly kind: ForgeSyntheticGenerationKind;
  readonly synthetic: true;
  readonly informationClass: "public-synthetic-fixture";
  readonly productionReady: false;
  readonly containsCredentials: false;
  readonly containsPersonalData: false;
  readonly generator: ForgeSyntheticGeneratorEvidence;
  readonly schema: ForgeSyntheticSchemaEvidence;
  readonly validation: ForgeSyntheticValidationEvidence;
  readonly artifact: unknown;
  readonly humanReviewRequired: true;
  readonly canonAcceptance: "not-granted";
  readonly mappingApproval: "not-granted";
  readonly semanticEquivalence: "not-proven";
  readonly clinicalUse: "not-authorized";
  readonly providerPreference: "none";
  readonly connectorActivation: "not-granted";
  readonly productionReadiness: "not-established";
}

export interface ForgeSyntheticDiversityEvidence {
  readonly profile: ForgeSyntheticGenerationProfile;
  readonly scenarioIds: readonly string[];
  readonly distinctScenarioCount: number;
  readonly accessibilityRelevantCases: number;
  readonly edgeCaseCount: number;
}

export interface ForgeGenerateSyntheticDataOutput extends ForgeToolNonAuthority {
  readonly toolId: "forge.generate.synthetic-data";
  readonly revision: typeof FORGE_SYNTHETIC_GENERATION_TOOL_REVISION;
  readonly generatorId: typeof FORGE_SYNTHETIC_GENERATOR_ID;
  readonly generatorRevision: typeof FORGE_SYNTHETIC_GENERATOR_REVISION;
  readonly deterministic: true;
  readonly seedDigest: `sha256:${string}`;
  readonly kind: ForgeSyntheticGenerationKind;
  readonly profile: ForgeSyntheticGenerationProfile;
  readonly requestedCount: number;
  readonly generatedCount: number;
  readonly records: readonly ForgeGeneratedSyntheticRecord[];
  readonly diversity: ForgeSyntheticDiversityEvidence;
  readonly allRecordsValidated: true;
  readonly humanReviewRequired: true;
  readonly repositoryWrite: "not-performed";
  readonly networkUsed: false;
  readonly providerUsed: false;
  readonly canonAcceptance: "not-granted";
  readonly mappingApproval: "not-granted";
  readonly clinicalUse: "not-authorized";
  readonly providerPreference: "none";
  readonly connectorActivation: "not-granted";
  readonly productionReadiness: "not-established";
}

const READ_ONLY_DETERMINISTIC_ANNOTATIONS = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const;

export const FORGE_SYNTHETIC_GENERATION_TOOL_DESCRIPTOR = {
  name: "forge.generate.synthetic-data",
  title: "Generate deterministic synthetic data",
  description:
    "Generate bounded deterministic quest or mapping-draft fixtures from a public-safe seed. Every record is explicitly synthetic, immediately validated, non-production, and unable to approve canon, mappings, clinical use, providers, connectors, permissions, gameplay, or institutional action.",
  inputSchema: {
    type: "object",
    additionalProperties: false,
    required: ["kind", "seed"],
    properties: {
      kind: {
        type: "string",
        enum: FORGE_SYNTHETIC_GENERATION_KIND_IDS,
      },
      seed: { type: "string", minLength: 1, maxLength: 128 },
      count: { type: "integer", minimum: 1, maximum: 25 },
      profile: {
        type: "string",
        enum: FORGE_SYNTHETIC_GENERATION_PROFILE_IDS,
      },
    },
  } satisfies ForgeJsonSchema,
  annotations:
    READ_ONLY_DETERMINISTIC_ANNOTATIONS satisfies ForgeMcpToolAnnotations,
} as const;
