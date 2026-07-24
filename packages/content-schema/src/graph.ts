import type { CalypsoContent, ContentKind, ValidationIssue } from "./types.js";

export type StoryNodeKind =
  | ContentKind
  | "choice"
  | "requirement"
  | "reward"
  | "state-gate"
  | "state-grant"
  | "review-gate";

export type StoryEdgeKind =
  | "contains"
  | "speaks"
  | "chooses"
  | "requires"
  | "grants"
  | "unlocks"
  | "follows"
  | "references"
  | "supersedes";

export interface StoryNode {
  id: string;
  kind: StoryNodeKind;
  label: string;
  contentId?: string;
  data: Record<string, unknown>;
}

export interface StoryEdge {
  id: string;
  kind: StoryEdgeKind;
  from: string;
  to: string;
  label?: string;
}

export interface StoryGraph {
  id: string;
  revision: number;
  title: string;
  entryNodeId: string;
  nodes: StoryNode[];
  edges: StoryEdge[];
}

export interface CompiledStoryGraph {
  graphId: string;
  graphRevision: number;
  entryContentId: string;
  content: CalypsoContent[];
}

export interface GraphValidationResult {
  ok: boolean;
  issues: ValidationIssue[];
}
