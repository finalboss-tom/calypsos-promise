import type {
  ForgeJsonSchema,
  ForgeMcpToolDescriptor,
  ForgeToolNonAuthority,
} from "./lore-schema-contracts.js";
import type {
  ForgeSourcePartialReasonId,
  ForgeSourceProvenance,
  ForgeSourceResultState,
  ForgeSourceRootId,
} from "./source-contracts.js";

export const FORGE_ARCHITECTURE_DECISION_TOOL_REVISION = "1" as const;
export const FORGE_DOCUMENT_CLASSIFICATION_REVISION = "1" as const;

export const FORGE_ENABLED_ARCHITECTURE_DECISION_TOOL_IDS = [
  "forge.search.architecture",
  "forge.search.decision",
] as const;

export type ForgeEnabledArchitectureDecisionToolId =
  (typeof FORGE_ENABLED_ARCHITECTURE_DECISION_TOOL_IDS)[number];

export const FORGE_DOCUMENT_CLASSES = [
  "frozen-commitment",
  "decision-record",
  "policy",
  "architecture",
  "security",
  "product-or-data-baseline",
  "assumption-record",
  "governance",
  "roadmap",
  "current-status",
  "completion-record",
  "unresolved-work-register",
  "economics-or-research",
  "public-reference",
] as const;

export type ForgeDocumentClass = (typeof FORGE_DOCUMENT_CLASSES)[number];

export const FORGE_DOCUMENT_STATUS_CLASSES = [
  "accepted-baseline",
  "accepted-decision",
  "active",
  "complete-evidence",
  "current-status",
  "proposed",
  "planned",
  "draft",
  "working-hypothesis",
  "historical",
  "superseded",
  "retired",
  "deferred",
  "unresolved",
  "mixed-or-unknown",
] as const;

export type ForgeDocumentStatusClass =
  (typeof FORGE_DOCUMENT_STATUS_CLASSES)[number];

export const FORGE_DOCUMENT_STATUS_BASES = [
  "explicit-status-field",
  "explicit-status-and-confidence-fields",
  "server-owned-path-classification",
  "server-owned-decision-index",
  "decision-index-and-explicit-status",
  "matched-content-caution",
  "unknown",
] as const;

export type ForgeDocumentStatusBasis =
  (typeof FORGE_DOCUMENT_STATUS_BASES)[number];

export const FORGE_DOCUMENT_CAUTION_FLAGS = [
  "proposed",
  "planned",
  "draft",
  "working-hypothesis",
  "historical",
  "superseded",
  "retired",
  "deferred",
  "unresolved",
  "synthetic",
  "mixed-status",
  "status-not-explicit",
  "decision-status-not-index-confirmed",
  "decision-status-conflict",
  "branch-or-review-state",
] as const;

export type ForgeDocumentCautionFlag =
  (typeof FORGE_DOCUMENT_CAUTION_FLAGS)[number];

export const FORGE_DOCUMENT_AUTHORITY_LAYERS = [
  "frozen-commitment",
  "accepted-decision",
  "governance-roadmap-policy",
  "versioned-baseline",
  "execution-status-evidence",
  "working-hypothesis",
  "reference-only",
  "unknown",
] as const;

export type ForgeDocumentAuthorityLayer =
  (typeof FORGE_DOCUMENT_AUTHORITY_LAYERS)[number];

export const FORGE_DOCUMENT_AUTHORITY_STATES = [
  "binding-baseline",
  "accepted-decision",
  "policy-or-roadmap-constraint",
  "implementation-or-status-evidence",
  "versioned-baseline",
  "working-hypothesis",
  "proposed-or-draft",
  "historical-or-superseded",
  "unresolved",
  "reference-only",
  "unknown",
] as const;

export type ForgeDocumentAuthorityState =
  (typeof FORGE_DOCUMENT_AUTHORITY_STATES)[number];

export type ForgeDocumentSearchMatchClass =
  | "exact-phrase"
  | "all-terms"
  | "partial-terms";

export interface ForgeDocumentStatusClassification {
  readonly classification: ForgeDocumentStatusClass;
  readonly basis: ForgeDocumentStatusBasis;
  readonly exactStatusText?: string;
  readonly exactConfidenceText?: string;
  readonly cautionFlags: readonly ForgeDocumentCautionFlag[];
}

export interface ForgeDocumentAuthorityClassification {
  readonly layer: ForgeDocumentAuthorityLayer;
  readonly state: ForgeDocumentAuthorityState;
  readonly authorityOrderReference: "docs/README.md#authority-and-conflict-order";
  readonly canOverrideHigherLayer: false;
  readonly requiresSourceReview: true;
}

export interface ForgeDocumentSearchInput {
  readonly query: string;
  readonly maxResults?: number;
  readonly maxFiles?: number;
}

export interface ForgeDocumentSearchMatch {
  readonly title: string;
  readonly heading?: string;
  readonly excerpt: string;
  readonly matchClass: ForgeDocumentSearchMatchClass;
  readonly matchedTerms: readonly string[];
  readonly additionalMatchingSections: number;
  readonly documentClass: ForgeDocumentClass;
  readonly status: ForgeDocumentStatusClassification;
  readonly authority: ForgeDocumentAuthorityClassification;
  readonly provenance: ForgeSourceProvenance;
}

export interface ForgeDocumentSearchOutputBase extends ForgeToolNonAuthority {
  readonly revision: typeof FORGE_ARCHITECTURE_DECISION_TOOL_REVISION;
  readonly classificationRevision: typeof FORGE_DOCUMENT_CLASSIFICATION_REVISION;
  readonly query: string;
  readonly matches: readonly ForgeDocumentSearchMatch[];
  readonly resultState: ForgeSourceResultState;
  readonly partialReasons: readonly (
    | ForgeSourcePartialReasonId
    | "result-limit-reached"
  )[];
  readonly searchedSourceRoots: readonly ForgeSourceRootId[];
  readonly scannedFiles: number;
  readonly returnedMatches: number;
  readonly statusClassificationMode: "deterministic-source-derived";
  readonly searchResultCanCreateAuthority: false;
  readonly searchResultCanResolveConflicts: false;
  readonly acceptedCurrentTruth: "not-created";
}

export interface ForgeSearchArchitectureOutput
  extends ForgeDocumentSearchOutputBase {
  readonly toolId: "forge.search.architecture";
}

export interface ForgeSearchDecisionOutput extends ForgeDocumentSearchOutputBase {
  readonly toolId: "forge.search.decision";
}

const READ_ONLY_ANNOTATIONS = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const;

const SEARCH_INPUT_SCHEMA: ForgeJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["query"],
  properties: {
    query: { type: "string", minLength: 1, maxLength: 256 },
    maxResults: { type: "integer", minimum: 1, maximum: 50 },
    maxFiles: { type: "integer", minimum: 1, maximum: 200 },
  },
};

export const FORGE_ARCHITECTURE_DECISION_TOOL_DESCRIPTORS: readonly ForgeMcpToolDescriptor[] =
  [
    {
      name: "forge.search.architecture",
      title: "Search architecture and policy",
      description:
        "Search server-allowlisted public architecture, policy, security, governance, product, data, economics, and research records with exact provenance and visible document-authority status. Results cannot create or override authority.",
      inputSchema: SEARCH_INPUT_SCHEMA,
      annotations: READ_ONLY_ANNOTATIONS,
    },
    {
      name: "forge.search.decision",
      title: "Search decisions and status",
      description:
        "Search server-allowlisted public decisions, assumptions, roadmaps, completion records, unresolved-work registers, and current-status evidence with exact provenance and explicit proposed, planned, historical, superseded, or unresolved cautions.",
      inputSchema: SEARCH_INPUT_SCHEMA,
      annotations: READ_ONLY_ANNOTATIONS,
    },
  ];
