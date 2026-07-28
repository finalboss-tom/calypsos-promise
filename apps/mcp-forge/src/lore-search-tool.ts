import type { ContentKind } from "@calypsos-promise/content-schema";

import {
  FORGE_LORE_SCHEMA_ERROR_CODES,
  FORGE_LORE_SCHEMA_TOOL_REVISION,
  FORGE_TOOL_NON_AUTHORITY,
  ForgeLoreSchemaToolError,
  type ForgeLoreSearchMatch,
  type ForgeSearchLoreInput,
  type ForgeSearchLoreOutput,
} from "./lore-schema-contracts.js";
import {
  createForgeLineRangeLocator,
  createForgeObjectIdLocator,
  ForgeSourceRepository,
} from "./source-repository.js";
import type {
  ForgeSourcePartialReasonId,
  ForgeSourceProvenance,
  ForgeSourceResultState,
} from "./source-contracts.js";
import { isRecord } from "./lore-tool-support.js";

const MAX_QUERY_LENGTH = 256;
const DEFAULT_MAX_RESULTS = 20;
const DEFAULT_MAX_FILES = 100;
const MAX_EXCERPT_LENGTH = 320;
const CONTENT_KINDS = new Set<ContentKind>([
  "character",
  "zone",
  "scene",
  "dialogue",
  "quest",
  "lesson",
  "notification",
]);

interface RankedLoreMatch {
  readonly match: ForgeLoreSearchMatch;
  readonly exactPhrase: boolean;
  readonly matchedTermCount: number;
  readonly sortPath: string;
  readonly sortLocator: string;
}

function hasOnlyKeys(
  value: Record<string, unknown>,
  allowed: readonly string[],
): boolean {
  const allowedSet = new Set(allowed);
  return Object.keys(value).every((key) => allowedSet.has(key));
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

function parseSearchInput(input: unknown): Required<ForgeSearchLoreInput> {
  if (
    !isRecord(input) ||
    !hasOnlyKeys(input, ["query", "maxResults", "maxFiles"]) ||
    typeof input.query !== "string"
  ) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      "Lore search requires an object with a query and optional bounded limits.",
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

function normalizeSearchText(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase("en-US");
}

function titleOf(value: Record<string, unknown>): string | undefined {
  for (const key of [
    "publicTitle",
    "inWorldTitle",
    "title",
    "displayName",
    "slug",
  ]) {
    if (typeof value[key] === "string" && value[key].trim() !== "") {
      return value[key].trim();
    }
  }
  return undefined;
}

function searchableStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (typeof value === "number" || typeof value === "boolean") {
    return [String(value)];
  }
  if (Array.isArray(value)) return value.flatMap(searchableStrings);
  if (!isRecord(value)) return [];
  return Object.entries(value)
    .filter(([key]) => !["reviewApprovals", "authorship"].includes(key))
    .flatMap(([, child]) => searchableStrings(child));
}

function excerpt(value: string): string {
  const compact = value.replace(/\s+/g, " ").trim();
  return compact.length <= MAX_EXCERPT_LENGTH
    ? compact
    : `${compact.slice(0, MAX_EXCERPT_LENGTH - 1)}…`;
}

function termsFor(query: string): string[] {
  return [...new Set(normalizeSearchText(query).split(/\s+/).filter(Boolean))];
}

function matchMetadata(
  haystack: string,
  normalizedQuery: string,
  terms: readonly string[],
): { exactPhrase: boolean; matchedTerms: string[] } | undefined {
  const normalized = normalizeSearchText(haystack);
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
): ForgeLoreSearchMatch["matchClass"] {
  if (exactPhrase) return "exact-phrase";
  if (matchedTerms.length === totalTerms) return "all-terms";
  return "partial-terms";
}

function provenanceWithLocator(
  provenance: ForgeSourceProvenance,
  locator: ForgeSourceProvenance["locator"],
): ForgeSourceProvenance {
  return { ...provenance, locator };
}

function jsonRecords(value: unknown): readonly Record<string, unknown>[] {
  if (Array.isArray(value)) return value.filter(isRecord);
  if (!isRecord(value)) return [];
  for (const key of ["records", "items", "content"]) {
    if (Array.isArray(value[key])) return value[key].filter(isRecord);
  }
  return [value];
}

function locatorSortKey(provenance: ForgeSourceProvenance): string {
  const locator = provenance.locator;
  if (locator.kind === "object-id") return `0:${locator.objectId}`;
  if (locator.kind === "line-range") {
    return `1:${String(locator.startLine).padStart(10, "0")}`;
  }
  return "2";
}

function rankMatches(
  matches: readonly RankedLoreMatch[],
): readonly RankedLoreMatch[] {
  return [...matches].sort((left, right) => {
    if (left.exactPhrase !== right.exactPhrase) {
      return left.exactPhrase ? -1 : 1;
    }
    if (left.matchedTermCount !== right.matchedTermCount) {
      return right.matchedTermCount - left.matchedTermCount;
    }
    const pathOrder =
      left.sortPath < right.sortPath
        ? -1
        : left.sortPath > right.sortPath
          ? 1
          : 0;
    if (pathOrder !== 0) return pathOrder;
    return left.sortLocator < right.sortLocator
      ? -1
      : left.sortLocator > right.sortLocator
        ? 1
        : 0;
  });
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

export async function searchForgeLore(
  repository: ForgeSourceRepository,
  input: unknown,
  signal?: AbortSignal,
): Promise<ForgeSearchLoreOutput> {
  const request = parseSearchInput(input);
  const normalizedQuery = normalizeSearchText(request.query);
  const terms = termsFor(request.query);
  const listing = await repository.listFiles({
    sourceRootId: "forge.content",
    maxFiles: request.maxFiles,
    maxOutputBytes: 524_288,
  });
  const ranked: RankedLoreMatch[] = [];

  for (const item of listing.items) {
    if (signal?.aborted) throw signal.reason;
    const read = await repository.readText({
      sourceRootId: "forge.content",
      relativePath: item.sourceRelativePath,
      maxOutputBytes: 1_048_576,
    });
    let parsed: unknown;
    if (item.sourceRelativePath.endsWith(".json")) {
      try {
        parsed = JSON.parse(read.content);
      } catch {
        parsed = undefined;
      }
    }

    let objectMatches = 0;
    for (const record of jsonRecords(parsed)) {
      const haystack = searchableStrings(record).join("\n");
      const metadata = matchMetadata(haystack, normalizedQuery, terms);
      if (metadata === undefined) continue;
      const objectId = typeof record.id === "string" ? record.id : undefined;
      const locator = objectId
        ? createForgeObjectIdLocator(read.provenance, objectId)
        : read.provenance.locator;
      const title = titleOf(record);
      const match: ForgeLoreSearchMatch = {
        ...(objectId === undefined ? {} : { contentId: objectId }),
        ...(typeof record.kind === "string" &&
        CONTENT_KINDS.has(record.kind as ContentKind)
          ? { kind: record.kind as ContentKind }
          : {}),
        ...(title === undefined ? {} : { title }),
        excerpt: excerpt(haystack),
        matchClass: matchClass(
          metadata.exactPhrase,
          metadata.matchedTerms,
          terms.length,
        ),
        matchedTerms: metadata.matchedTerms,
        provenance: provenanceWithLocator(read.provenance, locator),
      };
      ranked.push({
        match,
        exactPhrase: metadata.exactPhrase,
        matchedTermCount: metadata.matchedTerms.length,
        sortPath: read.provenance.repositoryRelativePath,
        sortLocator: locatorSortKey(match.provenance),
      });
      objectMatches += 1;
    }
    if (objectMatches > 0) continue;

    const lines = read.content.split(/\r\n|\r|\n/);
    for (const [index, line] of lines.entries()) {
      const metadata = matchMetadata(line, normalizedQuery, terms);
      if (metadata === undefined) continue;
      const locator = createForgeLineRangeLocator(
        read.provenance,
        index + 1,
        index + 1,
      );
      const match: ForgeLoreSearchMatch = {
        excerpt: excerpt(line),
        matchClass: matchClass(
          metadata.exactPhrase,
          metadata.matchedTerms,
          terms.length,
        ),
        matchedTerms: metadata.matchedTerms,
        provenance: provenanceWithLocator(read.provenance, locator),
      };
      ranked.push({
        match,
        exactPhrase: metadata.exactPhrase,
        matchedTermCount: metadata.matchedTerms.length,
        sortPath: read.provenance.repositoryRelativePath,
        sortLocator: locatorSortKey(match.provenance),
      });
    }
  }

  const ordered = rankMatches(ranked);
  const limited = ordered.slice(0, request.maxResults).map((entry) => entry.match);
  const reasons = new Set<ForgeSourcePartialReasonId | "result-limit-reached">(
    listing.partialReasons,
  );
  if (ordered.length > request.maxResults) reasons.add("result-limit-reached");
  const partialReasons = [...reasons].sort();

  return {
    toolId: "forge.search.lore",
    revision: FORGE_LORE_SCHEMA_TOOL_REVISION,
    query: request.query,
    matches: limited,
    resultState: resultState(partialReasons, listing.resultState),
    partialReasons,
    scannedFiles: listing.scannedFiles,
    returnedMatches: limited.length,
    canonAcceptance: "not-granted",
    ...FORGE_TOOL_NON_AUTHORITY,
  };
}
