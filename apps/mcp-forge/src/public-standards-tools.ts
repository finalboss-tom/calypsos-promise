import {
  FORGE_STANDARDS_MAPPING_TOOL_REVISION,
  type ForgePublicStandardsSearchMatch,
  type ForgeSearchPublicStandardsOutput,
  type ForgeStandardsMatchClass,
} from "./standards-mapping-contracts.js";
import {
  FORGE_LORE_SCHEMA_ERROR_CODES,
  FORGE_TOOL_NON_AUTHORITY,
  ForgeLoreSchemaToolError,
} from "./lore-schema-contracts.js";
import type {
  ForgeSourcePartialReasonId,
  ForgeSourceProvenance,
  ForgeSourceResultState,
} from "./source-contracts.js";
import {
  createForgeLineRangeLocator,
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
  readonly match: ForgePublicStandardsSearchMatch;
  readonly exactPhrase: boolean;
  readonly matchedTermCount: number;
  readonly sortPath: string;
  readonly sortLine: number;
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
      "Standards search requires a query and optional bounded limits.",
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
  line: string,
  normalizedQuery: string,
  terms: readonly string[],
): { exactPhrase: boolean; matchedTerms: readonly string[] } | undefined {
  const normalized = normalize(line);
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

function metadata(content: string): {
  readonly title?: string;
  readonly standardId?: string;
  readonly version?: string;
} {
  let title: string | undefined;
  let standardId: string | undefined;
  let version: string | undefined;
  for (const line of content.split(/\r\n|\r|\n/).slice(0, 120)) {
    const titleMatch = title === undefined ? /^#\s+(.+?)\s*$/.exec(line) : null;
    if (titleMatch?.[1]) title = titleMatch[1].trim();
    const idMatch =
      standardId === undefined
        ? /\*\*Standard ID:\*\*\s*`?([^`\s]+)`?/i.exec(line)
        : null;
    if (idMatch?.[1]) standardId = idMatch[1].trim();
    const versionMatch =
      version === undefined
        ? /\*\*Version:\*\*\s*`?([^`]+?)`?\s*$/i.exec(line)
        : null;
    if (versionMatch?.[1]) version = versionMatch[1].trim();
  }
  return { title, standardId, version };
}

function provenanceWithLine(
  provenance: ForgeSourceProvenance,
  line: number,
): ForgeSourceProvenance {
  return {
    ...provenance,
    locator: createForgeLineRangeLocator(provenance, line, line),
  };
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

export async function searchForgePublicStandards(
  repository: ForgeSourceRepository,
  input: unknown,
  signal?: AbortSignal,
): Promise<ForgeSearchPublicStandardsOutput> {
  const request = parseSearchInput(input);
  const normalizedQuery = normalize(request.query);
  const terms = termsFor(request.query);
  const listing = await repository.listFiles({
    sourceRootId: "forge.public-standards",
    maxFiles: request.maxFiles,
    maxOutputBytes: 524_288,
  });
  const ranked: RankedMatch[] = [];

  for (const item of listing.items) {
    if (signal?.aborted) throw signal.reason;
    const read = await repository.readText({
      sourceRootId: "forge.public-standards",
      relativePath: item.sourceRelativePath,
      maxOutputBytes: 1_048_576,
    });
    const documentMetadata = metadata(read.content);
    for (const [index, line] of read.content.split(/\r\n|\r|\n/).entries()) {
      const match = matchMetadata(line, normalizedQuery, terms);
      if (match === undefined) continue;
      const result: ForgePublicStandardsSearchMatch = {
        ...(documentMetadata.title === undefined
          ? {}
          : { title: documentMetadata.title }),
        ...(documentMetadata.standardId === undefined
          ? {}
          : { standardId: documentMetadata.standardId }),
        ...(documentMetadata.version === undefined
          ? {}
          : { version: documentMetadata.version }),
        excerpt: excerpt(line),
        matchClass: matchClass(
          match.exactPhrase,
          match.matchedTerms,
          terms.length,
        ),
        matchedTerms: match.matchedTerms,
        provenance: provenanceWithLine(read.provenance, index + 1),
      };
      ranked.push({
        match: result,
        exactPhrase: match.exactPhrase,
        matchedTermCount: match.matchedTerms.length,
        sortPath: read.provenance.repositoryRelativePath,
        sortLine: index + 1,
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
    return left.sortLine - right.sortLine;
  });
  const matches = ordered
    .slice(0, request.maxResults)
    .map((entry) => entry.match);
  const reasons = new Set<ForgeSourcePartialReasonId | "result-limit-reached">(
    listing.partialReasons,
  );
  if (ordered.length > request.maxResults) reasons.add("result-limit-reached");
  const partialReasons = [...reasons].sort();

  return {
    toolId: "forge.search.public-standards",
    revision: FORGE_STANDARDS_MAPPING_TOOL_REVISION,
    query: request.query,
    matches,
    resultState: resultState(partialReasons, listing.resultState),
    partialReasons,
    scannedFiles: listing.scannedFiles,
    returnedMatches: matches.length,
    certificationClaim: "not-established",
    completenessClaim: "not-established",
    providerPreference: "none",
    networkUsed: false,
    ...FORGE_TOOL_NON_AUTHORITY,
  };
}
