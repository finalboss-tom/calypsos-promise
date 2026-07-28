import {
  FORGE_STANDARDS_MAPPING_TOOL_REVISION,
  type ForgeSearchSyntheticConnectorFixturesOutput,
  type ForgeStandardsMatchClass,
  type ForgeSyntheticConnectorFixtureSearchMatch,
  type ForgeSyntheticConnectorSearchPartialReason,
} from "./standards-mapping-contracts.js";
import {
  FORGE_LORE_SCHEMA_ERROR_CODES,
  FORGE_TOOL_NON_AUTHORITY,
  ForgeLoreSchemaToolError,
} from "./lore-schema-contracts.js";
import type { ForgeSourceResultState } from "./source-contracts.js";
import {
  createForgeObjectIdLocator,
  ForgeSourceRepository,
} from "./source-repository.js";
import { isRecord } from "./lore-tool-support.js";

const MAX_QUERY_LENGTH = 256;
const DEFAULT_MAX_RESULTS = 20;
const DEFAULT_MAX_FILES = 100;
const MAX_EXCERPT_LENGTH = 360;

interface SearchRequest {
  readonly query: string;
  readonly maxResults: number;
  readonly maxFiles: number;
}

interface RankedMatch {
  readonly match: ForgeSyntheticConnectorFixtureSearchMatch;
  readonly exactPhrase: boolean;
  readonly matchedTermCount: number;
  readonly sortPath: string;
  readonly sortId: string;
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

function parseSearchInput(input: unknown): SearchRequest {
  if (
    !isRecord(input) ||
    Object.keys(input).some(
      (key) => !["query", "maxResults", "maxFiles"].includes(key),
    ) ||
    typeof input.query !== "string"
  ) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      "Synthetic connector search requires a query and optional bounded limits.",
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
      50,
      "maxResults",
    ),
    maxFiles: boundedPositiveInteger(
      input.maxFiles,
      DEFAULT_MAX_FILES,
      200,
      "maxFiles",
    ),
  };
}

function normalize(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase("en-US");
}

function termsFor(query: string): readonly string[] {
  return [...new Set(normalize(query).split(/\s+/).filter(Boolean))];
}

function matchMetadata(
  haystack: string,
  normalizedQuery: string,
  terms: readonly string[],
): { exactPhrase: boolean; matchedTerms: readonly string[] } | undefined {
  const normalized = normalize(haystack);
  const matchedTerms = terms.filter((term) => normalized.includes(term));
  if (matchedTerms.length === 0) return undefined;
  return {
    exactPhrase: normalized.includes(normalizedQuery),
    matchedTerms,
  };
}

function matchClass(
  exactPhrase: boolean,
  matchedTerms: readonly string[],
  totalTerms: number,
): ForgeStandardsMatchClass {
  if (exactPhrase) return "exact-phrase";
  if (matchedTerms.length === totalTerms) return "all-terms";
  return "partial-terms";
}

function excerpt(value: string): string {
  const compact = value.replace(/\s+/g, " ").trim();
  return compact.length <= MAX_EXCERPT_LENGTH
    ? compact
    : `${compact.slice(0, MAX_EXCERPT_LENGTH - 1)}…`;
}

function searchableStrings(value: unknown): readonly string[] {
  if (typeof value === "string") return [value];
  if (typeof value === "number" || typeof value === "boolean") {
    return [String(value)];
  }
  if (Array.isArray(value)) return value.flatMap(searchableStrings);
  if (!isRecord(value)) return [];
  return Object.values(value).flatMap(searchableStrings);
}

function explicitFixture(value: unknown): value is Record<string, unknown> & {
  id: string;
  synthetic: true;
  informationClass: "public-synthetic-connector-fixture";
  productionReady: false;
  containsCredentials: false;
  containsPersonalData: false;
} {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    value.id.length > 0 &&
    value.synthetic === true &&
    value.informationClass === "public-synthetic-connector-fixture" &&
    value.productionReady === false &&
    value.containsCredentials === false &&
    value.containsPersonalData === false
  );
}

function resultState(
  reasons: readonly string[],
  sourceState: ForgeSourceResultState,
): ForgeSourceResultState {
  if (reasons.includes("result-limit-reached") || sourceState === "truncated") {
    return "truncated";
  }
  return reasons.length > 0 || sourceState === "partial"
    ? "partial"
    : "complete";
}

export async function searchForgeSyntheticConnectorFixtures(
  repository: ForgeSourceRepository,
  input: unknown,
  signal?: AbortSignal,
): Promise<ForgeSearchSyntheticConnectorFixturesOutput> {
  const request = parseSearchInput(input);
  const normalizedQuery = normalize(request.query);
  const terms = termsFor(request.query);
  const listing = await repository.listFiles({
    sourceRootId: "forge.synthetic-connectors",
    maxFiles: request.maxFiles,
    maxOutputBytes: 524_288,
  });
  const ranked: RankedMatch[] = [];
  let skippedUnclassifiedFixtures = 0;

  for (const item of listing.items) {
    if (signal?.aborted) throw signal.reason;
    const read = await repository.readText({
      sourceRootId: "forge.synthetic-connectors",
      relativePath: item.sourceRelativePath,
      maxOutputBytes: 1_048_576,
    });
    let parsed: unknown;
    try {
      parsed = JSON.parse(read.content);
    } catch {
      skippedUnclassifiedFixtures += 1;
      continue;
    }
    const records = Array.isArray(parsed) ? parsed : [parsed];
    for (const record of records) {
      if (!explicitFixture(record)) {
        skippedUnclassifiedFixtures += 1;
        continue;
      }
      const haystack = searchableStrings(record).join("\n");
      const metadata = matchMetadata(haystack, normalizedQuery, terms);
      if (metadata === undefined) continue;
      const standardId =
        isRecord(record.standard) && typeof record.standard.id === "string"
          ? record.standard.id
          : undefined;
      const match: ForgeSyntheticConnectorFixtureSearchMatch = {
        fixtureId: record.id,
        ...(typeof record.connectorKind === "string"
          ? { connectorKind: record.connectorKind }
          : {}),
        ...(standardId === undefined ? {} : { standardId }),
        ...(typeof record.description === "string"
          ? { description: record.description }
          : {}),
        excerpt: excerpt(haystack),
        matchClass: matchClass(
          metadata.exactPhrase,
          metadata.matchedTerms,
          terms.length,
        ),
        matchedTerms: metadata.matchedTerms,
        explicitSynthetic: true,
        productionReady: false,
        containsCredentials: false,
        containsPersonalData: false,
        provenance: {
          ...read.provenance,
          locator: createForgeObjectIdLocator(read.provenance, record.id),
        },
      };
      ranked.push({
        match,
        exactPhrase: metadata.exactPhrase,
        matchedTermCount: metadata.matchedTerms.length,
        sortPath: read.provenance.repositoryRelativePath,
        sortId: record.id,
      });
    }
  }

  const ordered = [...ranked].sort((left, right) => {
    if (left.exactPhrase !== right.exactPhrase) {
      return left.exactPhrase ? -1 : 1;
    }
    if (left.matchedTermCount !== right.matchedTermCount) {
      return right.matchedTermCount - left.matchedTermCount;
    }
    if (left.sortPath !== right.sortPath) {
      return left.sortPath < right.sortPath ? -1 : 1;
    }
    return left.sortId < right.sortId ? -1 : left.sortId > right.sortId ? 1 : 0;
  });
  const matches = ordered
    .slice(0, request.maxResults)
    .map((entry) => entry.match);
  const reasons = new Set<ForgeSyntheticConnectorSearchPartialReason>(
    listing.partialReasons,
  );
  if (ordered.length > request.maxResults) reasons.add("result-limit-reached");
  if (skippedUnclassifiedFixtures > 0) {
    reasons.add("unclassified-fixture-skipped");
  }
  const partialReasons = [...reasons].sort();

  return {
    toolId: "forge.search.synthetic-connector-fixtures",
    revision: FORGE_STANDARDS_MAPPING_TOOL_REVISION,
    query: request.query,
    matches,
    resultState: resultState(partialReasons, listing.resultState),
    partialReasons,
    scannedFiles: listing.scannedFiles,
    returnedMatches: matches.length,
    skippedUnclassifiedFixtures,
    fixtureAuthority: "synthetic-evidence-only",
    connectorActivation: "not-granted",
    providerPreference: "none",
    networkUsed: false,
    ...FORGE_TOOL_NON_AUTHORITY,
  };
}
