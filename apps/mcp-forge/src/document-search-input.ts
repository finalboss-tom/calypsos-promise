import type {
  ForgeDocumentSearchInput,
  ForgeEnabledArchitectureDecisionToolId,
} from "./architecture-decision-contracts.js";
import {
  FORGE_LORE_SCHEMA_ERROR_CODES,
  ForgeLoreSchemaToolError,
} from "./lore-schema-contracts.js";

const MAX_QUERY_LENGTH = 256;
const DEFAULT_MAX_RESULTS = 20;
const DEFAULT_MAX_FILES = 120;
const MAX_RESULTS = 50;
const MAX_FILES = 200;

export interface ForgeDocumentSearchScope {
  readonly toolId: ForgeEnabledArchitectureDecisionToolId;
  readonly rootFiles: readonly string[];
  readonly docsPrefixes: readonly string[];
}

export const FORGE_ARCHITECTURE_SEARCH_SCOPE: ForgeDocumentSearchScope = {
  toolId: "forge.search.architecture",
  rootFiles: [
    "GOVERNANCE.md",
    "PUBLIC_DOMAIN.md",
    "README.md",
    "ROADMAP.md",
    "SECURITY.md",
    "VISION.md",
  ],
  docsPrefixes: [
    "architecture/",
    "data/",
    "economics/",
    "frozen/",
    "governance/",
    "policies/",
    "product/",
    "research/",
    "security/",
  ],
};

export const FORGE_DECISION_SEARCH_SCOPE: ForgeDocumentSearchScope = {
  toolId: "forge.search.decision",
  rootFiles: ["GOVERNANCE.md", "ROADMAP.md"],
  docsPrefixes: ["decisions/", "governance/", "roadmap/"],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasOnlyKeys(
  value: Record<string, unknown>,
  allowed: readonly string[],
): boolean {
  const accepted = new Set(allowed);
  return Object.keys(value).every((key) => accepted.has(key));
}

function boundedPositiveInteger(
  value: unknown,
  fallback: number,
  maximum: number,
  field: string,
): number {
  if (value === undefined) return fallback;
  if (
    !Number.isSafeInteger(value) ||
    Number(value) < 1 ||
    Number(value) > maximum
  ) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      `${field} must be a positive integer no greater than ${maximum}.`,
    );
  }
  return Number(value);
}

export function parseForgeDocumentSearchInput(
  input: unknown,
): Required<ForgeDocumentSearchInput> {
  if (
    !isRecord(input) ||
    !hasOnlyKeys(input, ["query", "maxResults", "maxFiles"]) ||
    typeof input.query !== "string"
  ) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      "Document search requires an object with a query and optional bounded limits.",
    );
  }

  const query = input.query.normalize("NFKC").trim();
  if (
    query.length === 0 ||
    query.length > MAX_QUERY_LENGTH ||
    /[\u0000-\u001F\u007F]/.test(query)
  ) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      `query must contain 1-${MAX_QUERY_LENGTH} public-safe characters.`,
    );
  }

  return {
    query,
    maxResults: boundedPositiveInteger(
      input.maxResults,
      DEFAULT_MAX_RESULTS,
      MAX_RESULTS,
      "maxResults",
    ),
    maxFiles: boundedPositiveInteger(
      input.maxFiles,
      DEFAULT_MAX_FILES,
      MAX_FILES,
      "maxFiles",
    ),
  };
}

export function normalizeForgeDocumentSearchText(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase("en-US");
}

export function forgeDocumentQueryTerms(query: string): readonly string[] {
  return [
    ...new Set(
      normalizeForgeDocumentSearchText(query).split(/\s+/).filter(Boolean),
    ),
  ];
}
