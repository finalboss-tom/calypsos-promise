import type {
  ContentKind,
  ValidationIssue,
} from "@calypsos-promise/content-schema";

import type {
  ForgeSourcePartialReasonId,
  ForgeSourceProvenance,
  ForgeSourceResultState,
} from "./source-contracts.js";

export const FORGE_LORE_SCHEMA_TOOL_REVISION = "1" as const;

export const FORGE_ENABLED_LORE_SCHEMA_TOOL_IDS = [
  "forge.search.lore",
  "forge.validate.content",
  "forge.inspect.quest-schema",
  "forge.validate.quest",
] as const;

export type ForgeEnabledLoreSchemaToolId =
  (typeof FORGE_ENABLED_LORE_SCHEMA_TOOL_IDS)[number];

export const FORGE_CONTENT_KIND_IDS = [
  "character",
  "zone",
  "scene",
  "dialogue",
  "quest",
  "lesson",
  "notification",
] as const satisfies readonly ContentKind[];

export interface ForgeJsonSchema {
  readonly type: "object";
  readonly additionalProperties: false;
  readonly required?: readonly string[];
  readonly properties: Readonly<Record<string, unknown>>;
  readonly oneOf?: readonly unknown[];
}

export interface ForgeMcpToolAnnotations {
  readonly readOnlyHint: true;
  readonly destructiveHint: false;
  readonly idempotentHint: true;
  readonly openWorldHint: false;
}

export interface ForgeMcpToolDescriptor {
  readonly name: ForgeEnabledLoreSchemaToolId;
  readonly title: string;
  readonly description: string;
  readonly inputSchema: ForgeJsonSchema;
  readonly annotations: ForgeMcpToolAnnotations;
}

export interface ForgeMcpTextContent {
  readonly type: "text";
  readonly text: string;
}

export interface ForgeMcpToolCallResult {
  readonly content: readonly ForgeMcpTextContent[];
  readonly structuredContent: unknown;
  readonly isError: boolean;
}

export interface ForgeToolNonAuthority {
  readonly resultAuthority: "none";
  readonly sourceAuthority: "evidence-only";
  readonly canApproveCanon: false;
  readonly canMutateRepository: false;
  readonly canWriteCanonicalRecord: false;
  readonly canCreateOrExpandPermission: false;
  readonly canCompleteQuest: false;
  readonly canGrantReward: false;
  readonly canClaimClinicalAuthority: false;
  readonly canCreateInstitutionalAuthority: false;
}

export const FORGE_TOOL_NON_AUTHORITY: ForgeToolNonAuthority = {
  resultAuthority: "none",
  sourceAuthority: "evidence-only",
  canApproveCanon: false,
  canMutateRepository: false,
  canWriteCanonicalRecord: false,
  canCreateOrExpandPermission: false,
  canCompleteQuest: false,
  canGrantReward: false,
  canClaimClinicalAuthority: false,
  canCreateInstitutionalAuthority: false,
};

export interface ForgeSearchLoreInput {
  readonly query: string;
  readonly maxResults?: number;
  readonly maxFiles?: number;
}

export type ForgeLoreMatchClass =
  "exact-phrase" | "all-terms" | "partial-terms";

export interface ForgeLoreSearchMatch {
  readonly contentId?: string;
  readonly kind?: ContentKind;
  readonly title?: string;
  readonly excerpt: string;
  readonly matchClass: ForgeLoreMatchClass;
  readonly matchedTerms: readonly string[];
  readonly provenance: ForgeSourceProvenance;
}

export interface ForgeSearchLoreOutput extends ForgeToolNonAuthority {
  readonly toolId: "forge.search.lore";
  readonly revision: typeof FORGE_LORE_SCHEMA_TOOL_REVISION;
  readonly query: string;
  readonly matches: readonly ForgeLoreSearchMatch[];
  readonly resultState: ForgeSourceResultState;
  readonly partialReasons: readonly (
    ForgeSourcePartialReasonId | "result-limit-reached"
  )[];
  readonly scannedFiles: number;
  readonly returnedMatches: number;
  readonly canonAcceptance: "not-granted";
}

export const FORGE_INLINE_CONTENT_INFORMATION_CLASSES = [
  "public-content",
  "public-synthetic-fixture",
] as const;

export type ForgeInlineContentInformationClass =
  (typeof FORGE_INLINE_CONTENT_INFORMATION_CLASSES)[number];

export interface ForgePublicRecordInput {
  readonly content?: unknown;
  readonly sourcePath?: string;
  readonly informationClass?: ForgeInlineContentInformationClass;
  readonly schemaVersion?: string;
}

export interface ForgeValidationIdentity {
  readonly id?: string;
  readonly kind?: string;
  readonly revision?: number;
}

export interface ForgeValidateContentOutput extends ForgeToolNonAuthority {
  readonly toolId: "forge.validate.content";
  readonly revision: typeof FORGE_LORE_SCHEMA_TOOL_REVISION;
  readonly schemaVersion: string;
  readonly valid: boolean;
  readonly issues: readonly ValidationIssue[];
  readonly identity: ForgeValidationIdentity;
  readonly inputMode: "inline-public" | "allowlisted-public-source";
  readonly inputInformationClass: ForgeInlineContentInformationClass;
  readonly provenance?: ForgeSourceProvenance;
  readonly humanReviewRequired: true;
  readonly canonAcceptance: "not-granted";
}

export interface ForgeInspectQuestSchemaInput {
  readonly schemaVersion?: string;
}

export interface ForgeInspectQuestSchemaOutput extends ForgeToolNonAuthority {
  readonly toolId: "forge.inspect.quest-schema";
  readonly revision: typeof FORGE_LORE_SCHEMA_TOOL_REVISION;
  readonly schemaVersion: string;
  readonly schemaId?: string;
  readonly contentKind: "quest";
  readonly questSchema: unknown;
  readonly provenance: ForgeSourceProvenance;
  readonly humanReviewRequiredForChange: true;
  readonly provesSemanticCompleteness: false;
  readonly provesClinicalSafety: false;
  readonly canonAcceptance: "not-granted";
}

export interface ForgeValidateQuestOutput extends ForgeToolNonAuthority {
  readonly toolId: "forge.validate.quest";
  readonly revision: typeof FORGE_LORE_SCHEMA_TOOL_REVISION;
  readonly schemaVersion: string;
  readonly valid: boolean;
  readonly issues: readonly ValidationIssue[];
  readonly identity: ForgeValidationIdentity;
  readonly inputMode: "inline-public" | "allowlisted-public-source";
  readonly inputInformationClass: ForgeInlineContentInformationClass;
  readonly provenance?: ForgeSourceProvenance;
  readonly humanReviewRequired: true;
  readonly questCompletion: "not-granted";
  readonly rewardGrant: "not-granted";
  readonly canonAcceptance: "not-granted";
}

export const FORGE_LORE_SCHEMA_ERROR_CODES = {
  invalidInput: "forge.tool.invalid-input",
  inputTooLarge: "forge.tool.input-too-large",
  invalidJson: "forge.tool.invalid-json",
  schemaVersionUnsupported: "forge.tool.schema-version-unsupported",
  sourceUnavailable: "forge.tool.source-unavailable",
  toolUnknown: "forge.tool.unknown",
} as const;

export type ForgeLoreSchemaErrorCode =
  (typeof FORGE_LORE_SCHEMA_ERROR_CODES)[keyof typeof FORGE_LORE_SCHEMA_ERROR_CODES];

export interface ForgeLoreSchemaToolErrorPayload extends ForgeToolNonAuthority {
  readonly error: {
    readonly code: ForgeLoreSchemaErrorCode;
    readonly message: string;
  };
}

export class ForgeLoreSchemaToolError extends Error {
  readonly code: ForgeLoreSchemaErrorCode;

  constructor(code: ForgeLoreSchemaErrorCode, message: string) {
    super(message);
    this.name = "ForgeLoreSchemaToolError";
    this.code = code;
  }
}

const READ_ONLY_ANNOTATIONS: ForgeMcpToolAnnotations = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
};

export const FORGE_LORE_SCHEMA_TOOL_DESCRIPTORS: readonly ForgeMcpToolDescriptor[] =
  [
    {
      name: "forge.search.lore",
      title: "Search lore",
      description:
        "Search allowlisted public lore and narrative content with exact repository provenance. Results are evidence only and cannot approve canon.",
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
      name: "forge.validate.content",
      title: "Validate public content",
      description:
        "Run the accepted deterministic content validator on one inline public record or one allowlisted public content source. Validation does not approve canon.",
      inputSchema: {
        type: "object",
        additionalProperties: false,
        properties: {
          content: { type: "object" },
          sourcePath: { type: "string", minLength: 1, maxLength: 512 },
          informationClass: {
            type: "string",
            enum: FORGE_INLINE_CONTENT_INFORMATION_CLASSES,
          },
          schemaVersion: { type: "string", minLength: 1, maxLength: 64 },
        },
        oneOf: [
          { required: ["content", "informationClass"] },
          { required: ["sourcePath"] },
        ],
      },
      annotations: READ_ONLY_ANNOTATIONS,
    },
    {
      name: "forge.inspect.quest-schema",
      title: "Inspect quest schema",
      description:
        "Inspect the accepted public quest schema and its exact allowlisted source provenance. Inspection cannot approve quests or prove semantic completeness.",
      inputSchema: {
        type: "object",
        additionalProperties: false,
        properties: {
          schemaVersion: { type: "string", minLength: 1, maxLength: 64 },
        },
      },
      annotations: READ_ONLY_ANNOTATIONS,
    },
    {
      name: "forge.validate.quest",
      title: "Validate quest",
      description:
        "Run the accepted deterministic content validator and quest-kind check on one inline public or allowlisted public quest record. Success cannot complete a quest, grant rewards, or approve canon.",
      inputSchema: {
        type: "object",
        additionalProperties: false,
        properties: {
          content: { type: "object" },
          sourcePath: { type: "string", minLength: 1, maxLength: 512 },
          informationClass: {
            type: "string",
            enum: FORGE_INLINE_CONTENT_INFORMATION_CLASSES,
          },
          schemaVersion: { type: "string", minLength: 1, maxLength: 64 },
        },
        oneOf: [
          { required: ["content", "informationClass"] },
          { required: ["sourcePath"] },
        ],
      },
      annotations: READ_ONLY_ANNOTATIONS,
    },
  ];
