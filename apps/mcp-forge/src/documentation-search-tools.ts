import {
  FORGE_DOCUMENTATION_SEARCH_TOOL_REVISION,
  type ForgeDocumentationAuthority,
  type ForgeDocumentationAuthorityBasisId,
  type ForgeDocumentationAuthorityState,
  type ForgeDocumentationClassId,
  type ForgeDocumentationMatchClass,
  type ForgeDocumentationSearchMatch,
  type ForgeEnabledDocumentationSearchToolId,
  type ForgeSearchArchitectureOutput,
  type ForgeSearchDecisionOutput,
  type ForgeSearchDocumentationInput,
} from "./documentation-search-contracts.js";
import {
  FORGE_LORE_SCHEMA_ERROR_CODES,
  FORGE_TOOL_NON_AUTHORITY,
  ForgeLoreSchemaToolError,
} from "./lore-schema-contracts.js";
import type {
  ForgeSourceListItem,
  ForgeSourcePartialReasonId,
  ForgeSourceProvenance,
  ForgeSourceResultState,
  ForgeSourceRootId,
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
const MAX_AUTHORITY_SCAN_LINES = 120;

interface SearchTarget {
  readonly sourceRootId: ForgeSourceRootId;
  readonly relativeDirectory?: string;
  readonly include: (item: ForgeSourceListItem) => boolean;
}

interface ParsedDocument {
  readonly lines: readonly string[];
  readonly title?: string;
  readonly statusLine?: LocatedText;
  readonly confidenceLine?: LocatedText;
}

interface LocatedText {
  readonly text: string;
  readonly line: number;
}

interface AuthorityCandidate {
  readonly state: ForgeDocumentationAuthorityState;
  readonly basis: ForgeDocumentationAuthorityBasisId;
  readonly evidence?: LocatedText;
}

interface RankedDocumentationMatch {
  readonly match: ForgeDocumentationSearchMatch;
  readonly exactPhrase: boolean;
  readonly matchedTermCount: number;
  readonly sortPath: string;
  readonly sortLine: number;
}

const ARCHITECTURE_TARGETS: readonly SearchTarget[] = [
  {
    sourceRootId: "forge.root-documents",
    include: (item) =>
      [
        "CONTRIBUTING.md",
        "GOVERNANCE.md",
        "PUBLIC_DOMAIN.md",
        "SECURITY.md",
        "VISION.md",
      ].includes(item.sourceRelativePath),
  },
  ...[
    "frozen",
    "architecture",
    "policies",
    "security",
    "economics",
    "product",
  ].map((relativeDirectory): SearchTarget => ({
    sourceRootId: "forge.docs",
    relativeDirectory,
    include: () => true,
  })),
  {
    sourceRootId: "forge.docs",
    relativeDirectory: "governance",
    include: (item) =>
      !item.sourceRelativePath.startsWith("governance/assumption-") &&
      item.sourceRelativePath !== "governance/assumption-registry.md",
  },
];

const DECISION_TARGETS: readonly SearchTarget[] = [
  {
    sourceRootId: "forge.root-documents",
    include: (item) => item.sourceRelativePath === "ROADMAP.md",
  },
  {
    sourceRootId: "forge.docs",
    relativeDirectory: "decisions",
    include: () => true,
  },
  {
    sourceRootId: "forge.docs",
    relativeDirectory: "governance",
    include: (item) =>
      item.sourceRelativePath.startsWith("governance/assumption-") ||
      item.sourceRelativePath === "governance/assumption-registry.md",
  },
  {
    sourceRootId: "forge.docs",
    relativeDirectory: "roadmap",
    include: () => true,
  },
];

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

function parseSearchInput(
  input: unknown,
): Required<ForgeSearchDocumentationInput> {
  if (
    !isRecord(input) ||
    !hasOnlyKeys(input, ["query", "maxResults", "maxFiles"]) ||
    typeof input.query !== "string"
  ) {
    throw new ForgeLoreSchemaToolError(
      FORGE_LORE_SCHEMA_ERROR_CODES.invalidInput,
      "Documentation search requires an object with a query and optional bounded limits.",
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
): ForgeDocumentationMatchClass {
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

function parseDocument(content: string): ParsedDocument {
  const lines = content.split(/\r\n|\r|\n/);
  let title: string | undefined;
  let statusLine: LocatedText | undefined;
  let confidenceLine: LocatedText | undefined;

  for (const [index, line] of lines.entries()) {
    if (title === undefined) {
      const titleMatch = /^#\s+(.+?)\s*$/.exec(line);
      if (titleMatch?.[1]) title = titleMatch[1].trim();
    }
    if (index >= MAX_AUTHORITY_SCAN_LINES) continue;
    if (statusLine === undefined && /\*\*Status:\*\*/i.test(line)) {
      statusLine = { text: line.trim(), line: index + 1 };
    }
    if (confidenceLine === undefined && /\*\*Confidence:\*\*/i.test(line)) {
      confidenceLine = { text: line.trim(), line: index + 1 };
    }
  }

  return { lines, title, statusLine, confidenceLine };
}

function documentClass(path: string): ForgeDocumentationClassId {
  if (path === "VISION.md" || path.startsWith("docs/frozen/")) {
    return "frozen-foundation";
  }
  if (path.startsWith("docs/architecture/")) return "architecture";
  if (path.startsWith("docs/policies/") || path === "CONTRIBUTING.md") {
    return "policy";
  }
  if (path.startsWith("docs/decisions/")) return "decision";
  if (
    path.startsWith("docs/governance/assumption-") ||
    path === "docs/governance/assumption-registry.md"
  ) {
    return "assumption";
  }
  if (path === "ROADMAP.md" || path.startsWith("docs/roadmap/")) {
    return path === "docs/roadmap/current-status.md" ? "status" : "roadmap";
  }
  if (path === "GOVERNANCE.md" || path.startsWith("docs/governance/")) {
    return "governance";
  }
  if (path === "SECURITY.md" || path.startsWith("docs/security/")) {
    return "security";
  }
  if (path.startsWith("docs/economics/")) return "economics";
  if (path.startsWith("docs/product/")) return "product";
  return "documentation";
}

function classifyStatusText(
  text: string,
  classId: ForgeDocumentationClassId,
): ForgeDocumentationAuthorityState | undefined {
  const normalized = normalizeSearchText(text);
  if (/\b(superseded|retired|deprecated|replaced)\b/.test(normalized)) {
    return "superseded";
  }
  if (/\b(historical|archived|archive-only)\b/.test(normalized)) {
    return "historical";
  }
  if (
    /\b(proposed|draft)\b/.test(normalized) ||
    /pending (explicit )?(acceptance|approval|review)/.test(normalized)
  ) {
    return "proposed";
  }
  if (/\b(planned|deferred|future|long-horizon|next)\b/.test(normalized)) {
    return "planned";
  }
  if (
    /\b(unresolved|blocked|holdpoint|open gap|remaining gap)\b/.test(
      normalized,
    ) ||
    /not yet (obtained|accepted|reviewed|implemented)/.test(normalized)
  ) {
    return "unresolved";
  }
  if (
    classId === "assumption" &&
    (/\bactive\b/.test(normalized) || /working hypothesis/.test(normalized))
  ) {
    return "active-working-hypothesis";
  }
  if (/\bfrozen\b/.test(normalized)) return "frozen-current";
  if (
    /\baccepted\b/.test(normalized) ||
    /\bbaseline\b/.test(normalized) ||
    /complete and merged/.test(normalized)
  ) {
    return "accepted-current";
  }
  return undefined;
}

function pathAuthority(
  path: string,
  classId: ForgeDocumentationClassId,
): AuthorityCandidate {
  if (classId === "frozen-foundation") {
    return { state: "frozen-current", basis: "path-classification" };
  }
  if (/completion-record\.md$/i.test(path)) {
    return { state: "historical", basis: "path-classification" };
  }
  if (classId === "decision" || classId === "assumption") {
    return { state: "unresolved", basis: "conservative-fallback" };
  }
  return { state: "reference-only", basis: "path-classification" };
}

function baseAuthority(
  path: string,
  classId: ForgeDocumentationClassId,
  document: ParsedDocument,
): AuthorityCandidate {
  if (document.statusLine !== undefined) {
    const state = classifyStatusText(document.statusLine.text, classId);
    if (state !== undefined) {
      return {
        state,
        basis: "explicit-status-line",
        evidence: document.statusLine,
      };
    }
  }
  if (document.confidenceLine !== undefined && classId === "assumption") {
    const state = classifyStatusText(document.confidenceLine.text, classId);
    if (state !== undefined) {
      return {
        state,
        basis: "explicit-confidence-line",
        evidence: document.confidenceLine,
      };
    }
  }
  return pathAuthority(path, classId);
}

const AUTHORITY_CONSERVATISM: Readonly<
  Record<ForgeDocumentationAuthorityState, number>
> = {
  "frozen-current": 0,
  "accepted-current": 0,
  "reference-only": 1,
  "active-working-hypothesis": 2,
  unresolved: 3,
  planned: 4,
  proposed: 5,
  historical: 6,
  superseded: 7,
};

function conservativeAuthority(
  base: AuthorityCandidate,
  local: AuthorityCandidate | undefined,
): AuthorityCandidate {
  if (local === undefined) return base;
  return AUTHORITY_CONSERVATISM[local.state] >=
    AUTHORITY_CONSERVATISM[base.state]
    ? local
    : base;
}

function localAuthority(
  line: string,
  lineNumber: number,
  headings: readonly LocatedText[],
  classId: ForgeDocumentationClassId,
): AuthorityCandidate | undefined {
  for (const heading of [...headings].reverse()) {
    const state = classifyStatusText(heading.text, classId);
    if (
      state !== undefined &&
      !["accepted-current", "frozen-current"].includes(state)
    ) {
      return { state, basis: "section-heading", evidence: heading };
    }
  }
  const state = classifyStatusText(line, classId);
  if (
    state !== undefined &&
    !["accepted-current", "frozen-current"].includes(state)
  ) {
    return {
      state,
      basis: "matched-line",
      evidence: { text: line.trim(), line: lineNumber },
    };
  }
  return undefined;
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

function toAuthority(
  candidate: AuthorityCandidate,
  provenance: ForgeSourceProvenance,
): ForgeDocumentationAuthority {
  return {
    state: candidate.state,
    acceptedCurrentAuthority:
      candidate.state === "frozen-current" ||
      candidate.state === "accepted-current",
    basis: candidate.basis,
    ...(candidate.evidence === undefined
      ? {}
      : {
          evidenceText: candidate.evidence.text,
          evidenceProvenance: provenanceWithLine(
            provenance,
            candidate.evidence.line,
          ),
        }),
    retrievedContentCanChangeAuthority: false,
  };
}

function updateHeadings(
  line: string,
  lineNumber: number,
  headings: LocatedText[],
): void {
  const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
  if (!match?.[1] || !match[2]) return;
  const level = match[1].length;
  headings.splice(level - 1);
  headings[level - 1] = { text: match[2].trim(), line: lineNumber };
}

function rankMatches(
  matches: readonly RankedDocumentationMatch[],
): readonly RankedDocumentationMatch[] {
  return [...matches].sort((left, right) => {
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

async function searchDocumentation(
  repository: ForgeSourceRepository,
  toolId: ForgeEnabledDocumentationSearchToolId,
  input: unknown,
  signal?: AbortSignal,
): Promise<ForgeSearchArchitectureOutput | ForgeSearchDecisionOutput> {
  const request = parseSearchInput(input);
  const normalizedQuery = normalizeSearchText(request.query);
  const terms = termsFor(request.query);
  const targets =
    toolId === "forge.search.architecture"
      ? ARCHITECTURE_TARGETS
      : DECISION_TARGETS;
  const ranked: RankedDocumentationMatch[] = [];
  const partialReasons = new Set<
    ForgeSourcePartialReasonId | "result-limit-reached"
  >();
  let scannedFiles = 0;
  let aggregateSourceState: ForgeSourceResultState = "complete";

  for (const target of targets) {
    if (signal?.aborted) throw signal.reason;
    const remaining = request.maxFiles - scannedFiles;
    if (remaining <= 0) {
      partialReasons.add("file-limit-reached");
      aggregateSourceState = "truncated";
      break;
    }
    const listing = await repository.listFiles({
      sourceRootId: target.sourceRootId,
      ...(target.relativeDirectory === undefined
        ? {}
        : { relativeDirectory: target.relativeDirectory }),
      maxFiles: remaining,
      maxOutputBytes: 524_288,
    });
    for (const reason of listing.partialReasons) partialReasons.add(reason);
    if (listing.resultState === "truncated") aggregateSourceState = "truncated";
    else if (
      listing.resultState === "partial" &&
      aggregateSourceState === "complete"
    ) {
      aggregateSourceState = "partial";
    }

    for (const item of listing.items) {
      if (!target.include(item)) continue;
      if (signal?.aborted) throw signal.reason;
      if (scannedFiles >= request.maxFiles) {
        partialReasons.add("file-limit-reached");
        aggregateSourceState = "truncated";
        break;
      }
      scannedFiles += 1;
      const read = await repository.readText({
        sourceRootId: target.sourceRootId,
        relativePath: item.sourceRelativePath,
        maxOutputBytes: 1_048_576,
      });
      const parsed = parseDocument(read.content);
      const classId = documentClass(read.provenance.repositoryRelativePath);
      const base = baseAuthority(
        read.provenance.repositoryRelativePath,
        classId,
        parsed,
      );
      const headings: LocatedText[] = [];

      for (const [index, line] of parsed.lines.entries()) {
        const lineNumber = index + 1;
        updateHeadings(line, lineNumber, headings);
        const metadata = matchMetadata(line, normalizedQuery, terms);
        if (metadata === undefined) continue;
        const local = localAuthority(
          line,
          lineNumber,
          headings.filter(Boolean),
          classId,
        );
        const authority = conservativeAuthority(base, local);
        const match: ForgeDocumentationSearchMatch = {
          ...(parsed.title === undefined ? {} : { title: parsed.title }),
          documentClass: classId,
          sectionPath: headings.filter(Boolean).map((heading) => heading.text),
          excerpt: excerpt(line),
          matchClass: matchClass(
            metadata.exactPhrase,
            metadata.matchedTerms,
            terms.length,
          ),
          matchedTerms: metadata.matchedTerms,
          authority: toAuthority(authority, read.provenance),
          provenance: provenanceWithLine(read.provenance, lineNumber),
        };
        ranked.push({
          match,
          exactPhrase: metadata.exactPhrase,
          matchedTermCount: metadata.matchedTerms.length,
          sortPath: read.provenance.repositoryRelativePath,
          sortLine: lineNumber,
        });
      }
    }
  }

  const ordered = rankMatches(ranked);
  const matches = ordered
    .slice(0, request.maxResults)
    .map((entry) => entry.match);
  if (ordered.length > request.maxResults) {
    partialReasons.add("result-limit-reached");
  }
  const reasons = [...partialReasons].sort();
  const output = {
    toolId,
    revision: FORGE_DOCUMENTATION_SEARCH_TOOL_REVISION,
    query: request.query,
    matches,
    resultState: resultState(reasons, aggregateSourceState),
    partialReasons: reasons,
    scannedFiles,
    returnedMatches: matches.length,
    authorityInterpretation: "explicit-and-conservative",
    ambiguousAuthorityIsPromoted: false,
    ...FORGE_TOOL_NON_AUTHORITY,
  } as const;
  return output;
}

export function searchForgeArchitecture(
  repository: ForgeSourceRepository,
  input: unknown,
  signal?: AbortSignal,
): Promise<ForgeSearchArchitectureOutput> {
  return searchDocumentation(
    repository,
    "forge.search.architecture",
    input,
    signal,
  ) as Promise<ForgeSearchArchitectureOutput>;
}

export function searchForgeDecision(
  repository: ForgeSourceRepository,
  input: unknown,
  signal?: AbortSignal,
): Promise<ForgeSearchDecisionOutput> {
  return searchDocumentation(
    repository,
    "forge.search.decision",
    input,
    signal,
  ) as Promise<ForgeSearchDecisionOutput>;
}
