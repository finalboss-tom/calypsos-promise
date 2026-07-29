import type { CapabilityStatus } from "./capability-status";

export type RoadmapRecord = {
  readonly id: string;
  readonly title: string;
  readonly status: CapabilityStatus;
  readonly summary: string;
  readonly sourceHref: string;
  readonly sourceLabel: string;
};

const sprintRoadmapUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/sprints.md";
const sprint8CompletionUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/sprint-8-completion-record.md";
const currentStatusUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/current-status.md";
const institutionalRoadmapUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/ROADMAP.md";
const signupGateUrl =
  "https://github.com/finalboss-tom/calypsos-promise/issues/63";
const sprint9GateUrl =
  "https://github.com/finalboss-tom/calypsos-promise/issues/64";

export const sprint8Roadmap: readonly RoadmapRecord[] = [
  {
    id: "sprint-8-1-through-8-6",
    title: "Workstreams 8.1–8.6",
    status: "live",
    summary:
      "The single-site boundary, App Router shell, navigation, homepage, Promise, guide family, Trust Center, and Open Forge were accepted, merged, and deployed through Sprint 8.",
    sourceHref: sprint8CompletionUrl,
    sourceLabel: "Read Sprint 8 completion evidence",
  },
  {
    id: "sprint-8-7",
    title: "8.7 — Roadmap, status, support, and funding transparency",
    status: "live",
    summary:
      "Source-backed roadmap, public-safe support, and canonical funding-transparency views are deployed without creating a second ledger, transaction path, or sponsor authority.",
    sourceHref: currentStatusUrl,
    sourceLabel: "Inspect current status",
  },
  {
    id: "sprint-8-8",
    title: "8.8 and Phase 0 — Newsletter disposition",
    status: "experimental",
    summary:
      "Sprint 8 preserved the no-intake boundary. The post-merge preserve-and-activate path now restores the existing private webhook for email updates only, while issue #63 remains open through deployed verification and Phase 0 acceptance.",
    sourceHref: signupGateUrl,
    sourceLabel: "Review Phase 0 gate #63",
  },
  {
    id: "sprint-8-9",
    title: "8.9 — Accessibility, performance, security, and route validation",
    status: "live",
    summary:
      "Permanent source and isolated production-preview validation covers public routes, security headers, metadata, authority, contrast, and transfer budgets. Independent and affected-user evidence remains separate.",
    sourceHref: sprint8CompletionUrl,
    sourceLabel: "Review completion evidence",
  },
  {
    id: "sprint-8-10",
    title: "8.10 — Completion and Sprint 9 handoff",
    status: "live",
    summary:
      "Sprint 8 was accepted and squash merged through PR #61. The production site is live, Git deployment is disabled again, issue #60 is closed, and the bounded Sprint 9 alignment gate is issue #64.",
    sourceHref: currentStatusUrl,
    sourceLabel: "Read the reconciled status",
  },
];

export const futureRoadmap: readonly RoadmapRecord[] = [
  {
    id: "sprint-9",
    title: "Sprint 9 — Public synthetic prologue",
    status: "planned",
    summary:
      "A no-account, no-real-health-data playable explanation of the Promise and first public synthetic journey. Implementation has not started; issue #64 is defining application ownership, temporary data, deterministic completion, Aster fallback, refusal, accessibility, security, and release evidence.",
    sourceHref: sprint9GateUrl,
    sourceLabel: "Review the pre-Sprint 9 alignment gate",
  },
  {
    id: "sprints-10-through-13",
    title: "Sprints 10–13 — Game shell, Lanterns, and Chronicle recall",
    status: "planned",
    summary:
      "The universal game shell, first vertical slice, Fourteen Lanterns, and Memory Chamber remain sequenced future product work.",
    sourceHref: sprintRoadmapUrl,
    sourceLabel: "Read the design-to-build sequence",
  },
  {
    id: "sprints-14-through-16",
    title: "Sprints 14–16 — Connectors, Observatory, and Chronicle MCP",
    status: "long-horizon",
    summary:
      "Provider-independent connectors, Athena’s Observatory, and private Chronicle MCP remain behind later data, permission, safety, and specialist gates.",
    sourceHref: sprintRoadmapUrl,
    sourceLabel: "Inspect later technical gates",
  },
  {
    id: "sprints-17-through-19",
    title: "Sprints 17–19 — Governance, beta evidence, and public launch",
    status: "long-horizon",
    summary:
      "Clinical, safety, accessibility, beta, release, and open-source launch work requires evidence and authority that do not yet exist.",
    sourceHref: sprintRoadmapUrl,
    sourceLabel: "Inspect release sequencing",
  },
  {
    id: "institutional-roadmap",
    title: "Institutional Phase 0 and progressive stewardship",
    status: "long-horizon",
    summary:
      "The organization remains in Constitutional and open-source foundations until the explicit Phase 0 exit review and founder-independence gates are accepted.",
    sourceHref: institutionalRoadmapUrl,
    sourceLabel: "Read the institutional roadmap",
  },
];
