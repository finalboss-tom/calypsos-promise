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

export const FORGE_DOCUMENTATION_SEARCH_TOOL_REVISION = "1" as const;

export const FORGE_ENABLED_DOCUMENTATION_SEARCH_TOOL_IDS = [
  "forge.search.architecture",
  "forge.search.decision",
] as const;

export type ForgeEnabledDocumentationSearchToolId =
  (typeof FORGE_ENABLED_DOCUMENTATION_SEARCH_TOOL_IDS)[number];

export const FORGE_DOCUMENTATION_CLASS_IDS = [
  "frozen-foundation",
  "architecture",
  "policy",
  "decision",
  "assumption",
  "roadmap",
  "status",
  "governance",
  "security",
  "economics",
  "product",
  "documentation",
] as const;

export type ForgeDocumentationClassId =
  (typeof FORGE_DOCUMENTATION_CLASS_IDS)[number];

export const FORGE_DOCUMENTATION_AUTHORITY_STATES = [
  "frozen-current",
  "accepted-current",
  "active-working-hypothesis",
  "proposed",
  "planned",
  "historical",
  "superseded",
  "unresolved",
  "reference-only",
] as const;

export type ForgeDocumentationAuthorityState =
  (typeof FORGE_DOCUMENTATION_AUTHORITY_STATES)[number];

export const FORGE_DOCUMENTATION_AUTHORITY_BASIS_IDS = [
  "explicit-status-line",
  "explicit-confidence-line",
  "section-heading",
  "matched-line",
  "path-classification",
  "conservative-fallback",
] as const;

export type ForgeDocumentationAuthorityBasisId =
  (typeof FORGE_DOCUMENTATION_AUTHORITY_BASIS_IDS)[number];

export interface ForgeDocumentationAuthority {
  readonly state: ForgeDocumentationAuthorityState;
  readonly acceptedCurrentAuthority: boolean;
  readonly basis: ForgeDocumentationAuthorityBasisId;
  readonly evidenceText?: string;
  readonly evidenceProvenance?: ForgeSourceProvenance;
  readonly retrievedContentCanChangeAuthority: false;
}

export interface ForgeSearchDocumentationInput {
  readonly query: string;
  readonly maxResults?: number;
  readonly maxFiles?: number;
}

export type ForgeDocumentationMatchClass =
  "exact-phrase" | "all-terms" | "partial-terms";

export interface ForgeDocumentationSearchMatch {
  readonly title?: string;
  readonly documentClass: ForgeDocumentationClassId;
  readonly sectionPath: readonly string[];
  readonly excerpt: string;
  readonly matchClass: ForgeDocumentationMatchClass;
  readonly matchedTerms: readonly string[];
  readonly authority: ForgeDocumentationAuthority;
  readonly provenance: ForgeSourceProvenance;
}

export interface ForgeDocumentationSearchOutputBase extends ForgeToolNonAuthority {
  readonly revision: typeof FORGE_DOCUMENTATION_SEARCH_TOOL_REVISION;
  readonly query: string;
  readonly matches: readonly ForgeDocumentationSearchMatch[];
  readonly resultState: ForgeSourceResultState;
  readonly partialReasons: readonly (
    ForgeSourcePartialReasonId | "result-limit-reached"
  )[];
  readonly scannedFiles: number;
  readonly returnedMatches: number;
  readonly authorityInterpretation: "explicit-and-conservative";
  readonly ambiguousAuthorityIsPromoted: false;
}

export interface ForgeSearchArchitectureOutput extends ForgeDocumentationSearchOutputBase {
  readonly toolId: "forge.search.architecture";
}

export interface ForgeSearchDecisionOutput extends ForgeDocumentationSearchOutputBase {
  readonly toolId: "forge.search.decision";
}

const READ_ONLY_ANNOTATIONS = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const;

export interface ForgeDocumentationMcpToolDescriptor {
  readonly name: ForgeEnabledDocumentationSearchToolId;
  readonly title: string;
  readonly description: string;
  readonly inputSchema: ForgeJsonSchema;
  readonly annotations: ForgeMcpToolAnnotations;
}

export const FORGE_DOCUMENTATION_SEARCH_TOOL_DESCRIPTORS: readonly ForgeDocumentationMcpToolDescriptor[] =
  [
    {
      name: "forge.search.architecture",
      title: "Search architecture and policy",
      description:
        "Search allowlisted public architecture, policy, governance, security, economics, product, and frozen-foundation records with exact provenance and conservative authority status.",
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
      name: "forge.search.decision",
      title: "Search decisions and status",
      description:
        "Search allowlisted public decisions, assumptions, roadmaps, completion records, and current-status evidence with exact provenance and conservative authority status.",
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
