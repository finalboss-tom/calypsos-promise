import type {
  ForgeDocumentSearchMatch,
  ForgeDocumentSearchMatchClass,
} from "./architecture-decision-contracts.js";
import { normalizeForgeDocumentSearchText } from "./document-search-input.js";
import {
  classifyForgeDocumentAuthority,
  classifyForgeDocumentPath,
  classifyForgeDocumentStatus,
  type ForgeIndexedDecisionStatus,
} from "./document-status-classification.js";
import type { ForgeSourceProvenance } from "./source-contracts.js";
import { createForgeLineRangeLocator } from "./source-repository.js";

const MAX_EXCERPT_LENGTH = 420;

interface Section {
  readonly heading?: string;
  readonly startLine: number;
  readonly lines: readonly string[];
}

export interface RankedForgeDocumentMatch {
  readonly match: ForgeDocumentSearchMatch;
  readonly exactPhrase: boolean;
  readonly matchedTermCount: number;
  readonly path: string;
  readonly line: number;
}

function compact(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function boundedExcerpt(value: string): string {
  const text = compact(value);
  return text.length <= MAX_EXCERPT_LENGTH
    ? text
    : `${text.slice(0, MAX_EXCERPT_LENGTH - 1)}…`;
}

function sectionsFor(content: string): readonly Section[] {
  const lines = content.split(/\r\n|\r|\n/);
  const sections: Section[] = [];
  let start = 0;
  let heading: string | undefined;

  const push = (endExclusive: number): void => {
    if (endExclusive <= start) return;
    sections.push({
      ...(heading === undefined ? {} : { heading }),
      startLine: start + 1,
      lines: lines.slice(start, endExclusive),
    });
  };

  for (const [index, line] of lines.entries()) {
    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (match === null) continue;
    push(index);
    start = index;
    heading = compact(match[2]);
  }
  push(lines.length);
  return sections.length === 0
    ? [{ startLine: 1, lines }]
    : sections;
}

function matchSection(
  section: Section,
  normalizedQuery: string,
  terms: readonly string[],
):
  | {
      readonly exactPhrase: boolean;
      readonly matchedTerms: readonly string[];
      readonly sourceStartLine: number;
      readonly sourceEndLine: number;
      readonly excerpt: string;
    }
  | undefined {
  const text = section.lines.join("\n");
  const normalizedText = normalizeForgeDocumentSearchText(text);
  const matchedTerms = terms.filter((term) => normalizedText.includes(term));
  if (matchedTerms.length === 0) return undefined;

  const matchingLineIndexes = section.lines.flatMap((line, index) => {
    const normalizedLine = normalizeForgeDocumentSearchText(line);
    return normalizedLine.includes(normalizedQuery) ||
      matchedTerms.some((term) => normalizedLine.includes(term))
      ? [index]
      : [];
  });
  const firstIndex = matchingLineIndexes[0] ?? 0;
  const lastIndex = matchingLineIndexes.at(-1) ?? firstIndex;
  const excerptStartIndex = Math.max(0, firstIndex - 1);
  const excerptEndExclusive = Math.min(
    section.lines.length,
    lastIndex + 2,
  );
  const excerpt = section.lines
    .slice(excerptStartIndex, excerptEndExclusive)
    .map((line) => compact(line.replace(/^#{1,6}\s+/, "")))
    .filter((line) => line !== "")
    .join(" — ");

  return {
    exactPhrase: normalizedText.includes(normalizedQuery),
    matchedTerms,
    sourceStartLine: section.startLine + excerptStartIndex,
    sourceEndLine: section.startLine + excerptEndExclusive - 1,
    excerpt: boundedExcerpt(excerpt),
  };
}

function matchClass(
  exactPhrase: boolean,
  matchedTerms: readonly string[],
  totalTerms: number,
): ForgeDocumentSearchMatchClass {
  if (exactPhrase) return "exact-phrase";
  return matchedTerms.length === totalTerms ? "all-terms" : "partial-terms";
}

function titleOf(content: string, path: string): string {
  const heading = content
    .split(/\r\n|\r|\n/)
    .map((line) => /^#\s+(.+?)\s*$/.exec(line)?.[1])
    .find((value): value is string => value !== undefined);
  if (heading !== undefined) return compact(heading);
  return path.split("/").at(-1) ?? path;
}

export function bestForgeDocumentMatch(
  content: string,
  provenance: ForgeSourceProvenance,
  query: string,
  terms: readonly string[],
  indexedDecisionStatus?: ForgeIndexedDecisionStatus,
): RankedForgeDocumentMatch | undefined {
  const normalizedQuery = normalizeForgeDocumentSearchText(query);
  const candidates = sectionsFor(content).flatMap((section) => {
    const matched = matchSection(section, normalizedQuery, terms);
    return matched === undefined ? [] : [{ section, matched }];
  });
  if (candidates.length === 0) return undefined;

  candidates.sort((left, right) => {
    if (left.matched.exactPhrase !== right.matched.exactPhrase) {
      return left.matched.exactPhrase ? -1 : 1;
    }
    if (left.matched.matchedTerms.length !== right.matched.matchedTerms.length) {
      return (
        right.matched.matchedTerms.length - left.matched.matchedTerms.length
      );
    }
    return left.matched.sourceStartLine - right.matched.sourceStartLine;
  });

  const selected = candidates[0];
  const path = provenance.repositoryRelativePath;
  const documentClass = classifyForgeDocumentPath(path);
  const status = classifyForgeDocumentStatus(
    content,
    path,
    documentClass,
    `${selected.section.lines.join("\n")}\n${selected.matched.excerpt}`,
    indexedDecisionStatus,
  );
  const locator = createForgeLineRangeLocator(
    provenance,
    selected.matched.sourceStartLine,
    selected.matched.sourceEndLine,
  );

  return {
    match: {
      title: titleOf(content, path),
      ...(selected.section.heading === undefined
        ? {}
        : { heading: selected.section.heading }),
      excerpt: selected.matched.excerpt,
      matchClass: matchClass(
        selected.matched.exactPhrase,
        selected.matched.matchedTerms,
        terms.length,
      ),
      matchedTerms: selected.matched.matchedTerms,
      additionalMatchingSections: candidates.length - 1,
      documentClass,
      status,
      authority: classifyForgeDocumentAuthority(
        documentClass,
        status.classification,
      ),
      provenance: { ...provenance, locator },
    },
    exactPhrase: selected.matched.exactPhrase,
    matchedTermCount: selected.matched.matchedTerms.length,
    path,
    line: selected.matched.sourceStartLine,
  };
}

export function orderForgeDocumentMatches(
  matches: readonly RankedForgeDocumentMatch[],
): readonly RankedForgeDocumentMatch[] {
  return [...matches].sort((left, right) => {
    if (left.exactPhrase !== right.exactPhrase) {
      return left.exactPhrase ? -1 : 1;
    }
    if (left.matchedTermCount !== right.matchedTermCount) {
      return right.matchedTermCount - left.matchedTermCount;
    }
    if (left.path !== right.path) return left.path < right.path ? -1 : 1;
    return left.line - right.line;
  });
}
