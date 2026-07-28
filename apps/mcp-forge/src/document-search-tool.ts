import {
  FORGE_ARCHITECTURE_DECISION_TOOL_REVISION,
  FORGE_DOCUMENT_CLASSIFICATION_REVISION,
  type ForgeSearchArchitectureOutput,
  type ForgeSearchDecisionOutput,
} from "./architecture-decision-contracts.js";
import {
  FORGE_ARCHITECTURE_SEARCH_SCOPE,
  FORGE_DECISION_SEARCH_SCOPE,
  forgeDocumentQueryTerms,
  parseForgeDocumentSearchInput,
  type ForgeDocumentSearchScope,
} from "./document-search-input.js";
import {
  bestForgeDocumentMatch,
  orderForgeDocumentMatches,
  type RankedForgeDocumentMatch,
} from "./document-section-match.js";
import {
  parseForgeDecisionIndex,
  type ForgeIndexedDecisionStatus,
} from "./document-status-classification.js";
import { FORGE_TOOL_NON_AUTHORITY } from "./lore-schema-contracts.js";
import type {
  ForgeSourceListItem,
  ForgeSourcePartialReasonId,
  ForgeSourceResultState,
  ForgeSourceRootId,
} from "./source-contracts.js";
import { ForgeSourceRepository } from "./source-repository.js";

const MAX_FILE_OUTPUT_BYTES = 1_048_576;

interface SourceCandidate {
  readonly sourceRootId: ForgeSourceRootId;
  readonly item: ForgeSourceListItem;
}

function sourceAllowed(
  scope: ForgeDocumentSearchScope,
  candidate: SourceCandidate,
): boolean {
  const relative = candidate.item.sourceRelativePath;
  if (candidate.sourceRootId === "forge.root-documents") {
    return scope.rootFiles.includes(relative);
  }
  return scope.docsPrefixes.some(
    (prefix) => relative === prefix.slice(0, -1) || relative.startsWith(prefix),
  );
}

async function sourceCandidates(
  repository: ForgeSourceRepository,
  scope: ForgeDocumentSearchScope,
  maxFiles: number,
): Promise<{
  readonly items: readonly SourceCandidate[];
  readonly scannedFiles: number;
  readonly sourceState: ForgeSourceResultState;
  readonly partialReasons: readonly ForgeSourcePartialReasonId[];
}> {
  const rootBudget = Math.min(16, maxFiles);
  const root = await repository.listFiles({
    sourceRootId: "forge.root-documents",
    maxFiles: rootBudget,
    maxOutputBytes: 131_072,
  });
  const remaining = Math.max(0, maxFiles - root.scannedFiles);
  const docs =
    remaining === 0
      ? {
          sourceRootId: "forge.docs" as const,
          items: [] as readonly ForgeSourceListItem[],
          resultState: "complete" as const,
          partialReasons: [] as readonly ForgeSourcePartialReasonId[],
          scannedFiles: 0,
          returnedFiles: 0,
          outputBytes: 0,
        }
      : await repository.listFiles({
          sourceRootId: "forge.docs",
          maxFiles: remaining,
          maxOutputBytes: 524_288,
        });

  const items = [
    ...root.items.map((item) => ({
      sourceRootId: "forge.root-documents" as const,
      item,
    })),
    ...docs.items.map((item) => ({
      sourceRootId: "forge.docs" as const,
      item,
    })),
  ]
    .filter((candidate) => sourceAllowed(scope, candidate))
    .sort((left, right) =>
      left.item.repositoryRelativePath < right.item.repositoryRelativePath
        ? -1
        : left.item.repositoryRelativePath > right.item.repositoryRelativePath
          ? 1
          : 0,
    );
  const reasons = new Set<ForgeSourcePartialReasonId>([
    ...root.partialReasons,
    ...docs.partialReasons,
  ]);
  const sourceState: ForgeSourceResultState =
    root.resultState === "truncated" || docs.resultState === "truncated"
      ? "truncated"
      : root.resultState === "partial" || docs.resultState === "partial"
        ? "partial"
        : "complete";

  return {
    items,
    scannedFiles: root.scannedFiles + docs.scannedFiles,
    sourceState,
    partialReasons: [...reasons].sort(),
  };
}

function finalState(
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

async function searchDocuments(
  repository: ForgeSourceRepository,
  input: unknown,
  scope: ForgeDocumentSearchScope,
  signal?: AbortSignal,
): Promise<ForgeSearchArchitectureOutput | ForgeSearchDecisionOutput> {
  const request = parseForgeDocumentSearchInput(input);
  const terms = forgeDocumentQueryTerms(request.query);
  const sources = await sourceCandidates(repository, scope, request.maxFiles);
  const matches: RankedForgeDocumentMatch[] = [];
  const readCache = new Map<
    string,
    Awaited<ReturnType<ForgeSourceRepository["readText"]>>
  >();
  const decisionIndexCandidate = sources.items.find(
    (candidate) =>
      candidate.item.repositoryRelativePath === "docs/decisions/README.md",
  );
  let indexedDecisionStatuses: ReadonlyMap<
    string,
    ForgeIndexedDecisionStatus
  > = new Map();

  if (decisionIndexCandidate !== undefined) {
    const read = await repository.readText({
      sourceRootId: decisionIndexCandidate.sourceRootId,
      relativePath: decisionIndexCandidate.item.sourceRelativePath,
      maxOutputBytes: MAX_FILE_OUTPUT_BYTES,
    });
    readCache.set(read.provenance.repositoryRelativePath, read);
    indexedDecisionStatuses = parseForgeDecisionIndex(read.content);
  }

  for (const candidate of sources.items) {
    if (signal?.aborted) throw signal.reason;
    const cached = readCache.get(candidate.item.repositoryRelativePath);
    const read =
      cached ??
      (await repository.readText({
        sourceRootId: candidate.sourceRootId,
        relativePath: candidate.item.sourceRelativePath,
        maxOutputBytes: MAX_FILE_OUTPUT_BYTES,
      }));
    const match = bestForgeDocumentMatch(
      read.content,
      read.provenance,
      request.query,
      terms,
      indexedDecisionStatuses.get(read.provenance.repositoryRelativePath),
    );
    if (match !== undefined) matches.push(match);
  }

  const ordered = orderForgeDocumentMatches(matches);
  const limited = ordered
    .slice(0, request.maxResults)
    .map((candidate) => candidate.match);
  const reasons = new Set<
    ForgeSourcePartialReasonId | "result-limit-reached"
  >(sources.partialReasons);
  if (ordered.length > request.maxResults) reasons.add("result-limit-reached");
  const partialReasons = [...reasons].sort();
  const base = {
    revision: FORGE_ARCHITECTURE_DECISION_TOOL_REVISION,
    classificationRevision: FORGE_DOCUMENT_CLASSIFICATION_REVISION,
    query: request.query,
    matches: limited,
    resultState: finalState(partialReasons, sources.sourceState),
    partialReasons,
    searchedSourceRoots: [
      "forge.root-documents",
      "forge.docs",
    ] as const,
    scannedFiles: sources.scannedFiles,
    returnedMatches: limited.length,
    statusClassificationMode: "deterministic-source-derived" as const,
    searchResultCanCreateAuthority: false as const,
    searchResultCanResolveConflicts: false as const,
    acceptedCurrentTruth: "not-created" as const,
    ...FORGE_TOOL_NON_AUTHORITY,
  };

  return scope.toolId === "forge.search.architecture"
    ? { toolId: scope.toolId, ...base }
    : { toolId: scope.toolId, ...base };
}

export function searchForgeArchitecture(
  repository: ForgeSourceRepository,
  input: unknown,
  signal?: AbortSignal,
): Promise<ForgeSearchArchitectureOutput> {
  return searchDocuments(
    repository,
    input,
    FORGE_ARCHITECTURE_SEARCH_SCOPE,
    signal,
  ) as Promise<ForgeSearchArchitectureOutput>;
}

export function searchForgeDecision(
  repository: ForgeSourceRepository,
  input: unknown,
  signal?: AbortSignal,
): Promise<ForgeSearchDecisionOutput> {
  return searchDocuments(
    repository,
    input,
    FORGE_DECISION_SEARCH_SCOPE,
    signal,
  ) as Promise<ForgeSearchDecisionOutput>;
}
