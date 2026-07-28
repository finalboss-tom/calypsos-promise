import type {
  ForgeDocumentAuthorityClassification,
  ForgeDocumentAuthorityState,
  ForgeDocumentCautionFlag,
  ForgeDocumentClass,
  ForgeDocumentStatusClassification,
  ForgeDocumentStatusClass,
} from "./architecture-decision-contracts.js";
import { normalizeForgeDocumentSearchText } from "./document-search-input.js";

export type ForgeIndexedDecisionStatus = "accepted" | "proposed";

function compact(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function metadataValue(content: string, field: string): string | undefined {
  const escaped = field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `^\\s*(?:[-*>]\\s*)?(?:\\*\\*)?${escaped}:(?:\\*\\*)?\\s*(.+?)\\s*$`,
    "i",
  );
  for (const line of content.split(/\r\n|\r|\n/).slice(0, 120)) {
    const match = pattern.exec(line);
    if (match !== null) return compact(match[1]);
  }
  return undefined;
}

export function classifyForgeDocumentPath(path: string): ForgeDocumentClass {
  if (path.startsWith("docs/frozen/")) return "frozen-commitment";
  if (path.startsWith("docs/decisions/")) return "decision-record";
  if (path.startsWith("docs/policies/") || path === "PUBLIC_DOMAIN.md") {
    return "policy";
  }
  if (path.startsWith("docs/architecture/")) return "architecture";
  if (path === "SECURITY.md" || path.startsWith("docs/security/")) {
    return "security";
  }
  if (
    path === "VISION.md" ||
    path.startsWith("docs/product/") ||
    path.startsWith("docs/data/") ||
    path.startsWith("docs/content/")
  ) {
    return "product-or-data-baseline";
  }
  if (/^docs\/governance\/assumption-/i.test(path)) {
    return "assumption-record";
  }
  if (path.startsWith("docs/governance/") || path === "GOVERNANCE.md") {
    return "governance";
  }
  if (path === "docs/roadmap/current-status.md") return "current-status";
  if (/completion-record/i.test(path)) return "completion-record";
  if (/unresolved|holdpoint|register/i.test(path)) {
    return "unresolved-work-register";
  }
  if (path.startsWith("docs/roadmap/") || path === "ROADMAP.md") {
    return "roadmap";
  }
  if (
    path.startsWith("docs/economics/") ||
    path.startsWith("docs/research/")
  ) {
    return "economics-or-research";
  }
  return "public-reference";
}

function statusFromText(
  text: string,
  document: ForgeDocumentClass,
  confidenceText: string | undefined,
): ForgeDocumentStatusClass {
  const value = normalizeForgeDocumentSearchText(text);
  if (value.includes("superseded")) return "superseded";
  if (value.includes("retired")) return "retired";
  if (value.includes("historical")) return "historical";
  if (value.includes("proposed")) return "proposed";
  if (value.includes("draft")) return "draft";
  if (value.includes("deferred")) return "deferred";
  if (value.includes("unresolved") || value.includes("open holdpoint")) {
    return "unresolved";
  }
  if (value.includes("planned") || value.includes("next")) return "planned";
  if (
    document === "assumption-record" &&
    confidenceText !== undefined &&
    normalizeForgeDocumentSearchText(confidenceText).includes(
      "working hypothesis",
    )
  ) {
    return "working-hypothesis";
  }
  if (value.includes("current")) return "current-status";
  if (value.includes("complete") || value.includes("completed")) {
    return "complete-evidence";
  }
  if (document === "decision-record" && value.includes("accepted")) {
    return "accepted-decision";
  }
  if (value.includes("accepted") || value.includes("baseline")) {
    return "accepted-baseline";
  }
  if (value.includes("active")) return "active";
  return "mixed-or-unknown";
}

function pathDerivedStatus(
  path: string,
  document: ForgeDocumentClass,
): ForgeDocumentStatusClass {
  if (document === "frozen-commitment") return "accepted-baseline";
  if (document === "current-status") return "current-status";
  if (document === "completion-record") return "complete-evidence";
  if (document === "assumption-record") return "working-hypothesis";
  if (/execution-plan|workstream/i.test(path)) return "planned";
  if (document === "unresolved-work-register") return "unresolved";
  return "mixed-or-unknown";
}

function cautionForStatus(
  status: ForgeDocumentStatusClass,
): ForgeDocumentCautionFlag | undefined {
  const mapping: Partial<
    Record<ForgeDocumentStatusClass, ForgeDocumentCautionFlag>
  > = {
    proposed: "proposed",
    planned: "planned",
    draft: "draft",
    "working-hypothesis": "working-hypothesis",
    historical: "historical",
    superseded: "superseded",
    retired: "retired",
    deferred: "deferred",
    unresolved: "unresolved",
  };
  return mapping[status];
}

function matchedContentCautions(text: string): ForgeDocumentCautionFlag[] {
  const value = normalizeForgeDocumentSearchText(text);
  const cautions: ForgeDocumentCautionFlag[] = [];
  for (const [needle, flag] of [
    ["proposed", "proposed"],
    ["planned", "planned"],
    ["draft", "draft"],
    ["working hypothesis", "working-hypothesis"],
    ["historical", "historical"],
    ["superseded", "superseded"],
    ["retired", "retired"],
    ["deferred", "deferred"],
    ["unresolved", "unresolved"],
    ["synthetic", "synthetic"],
  ] as const) {
    if (value.includes(needle)) cautions.push(flag);
  }
  if (
    value.includes("draft pr") ||
    value.includes("pending merge") ||
    value.includes("review branch") ||
    value.includes("exact head") ||
    value.includes("not merged")
  ) {
    cautions.push("branch-or-review-state");
  }
  return cautions;
}

export function classifyForgeDocumentStatus(
  content: string,
  path: string,
  document: ForgeDocumentClass,
  matchedText: string,
  indexedDecisionStatus?: ForgeIndexedDecisionStatus,
): ForgeDocumentStatusClassification {
  const exactStatusText = metadataValue(content, "Status");
  const exactConfidenceText = metadataValue(content, "Confidence");
  const explicitClassification =
    exactStatusText === undefined
      ? pathDerivedStatus(path, document)
      : statusFromText(exactStatusText, document, exactConfidenceText);
  const indexedAcceptedAgrees =
    explicitClassification === "accepted-decision" ||
    explicitClassification === "accepted-baseline";
  const indexedProposedAgrees = explicitClassification === "proposed";
  const classification =
    document !== "decision-record" || path.endsWith("/README.md")
      ? explicitClassification
      : indexedDecisionStatus === "accepted"
        ? exactStatusText === undefined || indexedAcceptedAgrees
          ? "accepted-decision"
          : "mixed-or-unknown"
        : indexedDecisionStatus === "proposed"
          ? "proposed"
          : explicitClassification === "accepted-decision"
            ? "mixed-or-unknown"
            : explicitClassification;
  const cautions = new Set<ForgeDocumentCautionFlag>();
  const primaryCaution = cautionForStatus(classification);
  if (primaryCaution !== undefined) cautions.add(primaryCaution);
  if (exactStatusText === undefined) cautions.add("status-not-explicit");
  if (
    document === "decision-record" &&
    !path.endsWith("/README.md") &&
    indexedDecisionStatus === undefined
  ) {
    cautions.add("decision-status-not-index-confirmed");
  }
  if (
    document === "decision-record" &&
    !path.endsWith("/README.md") &&
    ((indexedDecisionStatus === "accepted" &&
      exactStatusText !== undefined &&
      !indexedAcceptedAgrees) ||
      (indexedDecisionStatus === "proposed" &&
        exactStatusText !== undefined &&
        !indexedProposedAgrees))
  ) {
    cautions.add("decision-status-conflict");
  }
  if (
    document === "current-status" ||
    path.endsWith("/README.md") ||
    path === "README.md"
  ) {
    cautions.add("mixed-status");
  }
  const contentCautions = matchedContentCautions(matchedText);
  for (const caution of contentCautions) cautions.add(caution);

  const basis =
    indexedDecisionStatus !== undefined && exactStatusText !== undefined
      ? "decision-index-and-explicit-status"
      : indexedDecisionStatus !== undefined
        ? "server-owned-decision-index"
        : exactStatusText !== undefined && exactConfidenceText !== undefined
          ? "explicit-status-and-confidence-fields"
          : exactStatusText !== undefined
            ? "explicit-status-field"
            : classification === "mixed-or-unknown"
              ? contentCautions.length > 0
                ? "matched-content-caution"
                : "unknown"
              : "server-owned-path-classification";

  return {
    classification,
    basis,
    ...(exactStatusText === undefined ? {} : { exactStatusText }),
    ...(exactConfidenceText === undefined ? {} : { exactConfidenceText }),
    cautionFlags: [...cautions].sort(),
  };
}

function stateFromStatus(
  status: ForgeDocumentStatusClass,
  document: ForgeDocumentClass,
): ForgeDocumentAuthorityState {
  if (status === "proposed" || status === "planned" || status === "draft") {
    return "proposed-or-draft";
  }
  if (
    status === "historical" ||
    status === "superseded" ||
    status === "retired" ||
    status === "deferred"
  ) {
    return "historical-or-superseded";
  }
  if (status === "unresolved") return "unresolved";
  if (status === "working-hypothesis" || document === "assumption-record") {
    return "working-hypothesis";
  }
  if (document === "frozen-commitment") return "binding-baseline";
  if (
    document === "decision-record" &&
    (status === "accepted-decision" || status === "accepted-baseline")
  ) {
    return "accepted-decision";
  }
  if (
    document === "policy" ||
    document === "governance" ||
    document === "roadmap"
  ) {
    return "policy-or-roadmap-constraint";
  }
  if (
    document === "current-status" ||
    document === "completion-record" ||
    document === "unresolved-work-register"
  ) {
    return "implementation-or-status-evidence";
  }
  if (
    document === "architecture" ||
    document === "security" ||
    document === "product-or-data-baseline" ||
    document === "economics-or-research"
  ) {
    return "versioned-baseline";
  }
  return "unknown";
}

export function classifyForgeDocumentAuthority(
  document: ForgeDocumentClass,
  status: ForgeDocumentStatusClass,
): ForgeDocumentAuthorityClassification {
  const layer =
    document === "frozen-commitment"
      ? "frozen-commitment"
      : document === "decision-record" &&
          (status === "accepted-decision" || status === "accepted-baseline")
        ? "accepted-decision"
        : document === "policy" ||
            document === "governance" ||
            document === "roadmap"
          ? "governance-roadmap-policy"
          : document === "architecture" ||
              document === "security" ||
              document === "product-or-data-baseline" ||
              document === "economics-or-research"
            ? "versioned-baseline"
            : document === "current-status" ||
                document === "completion-record" ||
                document === "unresolved-work-register"
              ? "execution-status-evidence"
              : document === "assumption-record"
                ? "working-hypothesis"
                : document === "decision-record"
                  ? "reference-only"
                  : "unknown";
  return {
    layer,
    state: stateFromStatus(status, document),
    authorityOrderReference: "docs/README.md#authority-and-conflict-order",
    canOverrideHigherLayer: false,
    requiresSourceReview: true,
  };
}

export function parseForgeDecisionIndex(
  content: string,
): ReadonlyMap<string, ForgeIndexedDecisionStatus> {
  const statuses = new Map<string, ForgeIndexedDecisionStatus>();
  let section: ForgeIndexedDecisionStatus | undefined;
  for (const line of content.split(/\r\n|\r|\n/)) {
    const normalizedLine = normalizeForgeDocumentSearchText(line);
    if (/^##\s+accepted records\s*$/.test(normalizedLine)) {
      section = "accepted";
      continue;
    }
    if (/^##\s+proposed records\s*$/.test(normalizedLine)) {
      section = "proposed";
      continue;
    }
    if (/^##\s+/.test(normalizedLine)) {
      section = undefined;
      continue;
    }
    if (section === undefined) continue;
    for (const match of line.matchAll(/\]\(([^)#?]+\.md)(?:#[^)]+)?\)/g)) {
      const relative = match[1].replace(/^\.\//, "");
      if (relative.includes("/") || relative.includes("..")) continue;
      statuses.set(`docs/decisions/${relative}`, section);
    }
  }
  return statuses;
}
