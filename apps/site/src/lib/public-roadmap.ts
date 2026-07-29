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
const sprint8PlanUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/sprint-8-execution-plan.md";
const sprint8CompletionUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/sprint-8-completion-record.md";
const currentStatusUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/current-status.md";
const institutionalRoadmapUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/ROADMAP.md";
const signupGateUrl =
  "https://github.com/finalboss-tom/calypsos-promise/issues/63";

export const sprint8Roadmap: readonly RoadmapRecord[] = [
  {
    id: "sprint-8-1-through-8-6",
    title: "Workstreams 8.1–8.6",
    status: "experimental",
    summary:
      "The single-site boundary, App Router shell, navigation, homepage, Promise, guide family, Trust Center, and Open Forge are implemented on the draft Sprint 8 branch and validated for review.",
    sourceHref: currentStatusUrl,
    sourceLabel: "Inspect current status",
  },
  {
    id: "sprint-8-7",
    title: "8.7 — Roadmap, status, support, and funding transparency",
    status: "experimental",
    summary:
      "Source-backed roadmap, public-safe support, and canonical funding-transparency views are implemented without creating a second ledger, private support system, or transaction path.",
    sourceHref: sprint8PlanUrl,
    sourceLabel: "Read the Sprint 8 plan",
  },
  {
    id: "sprint-8-8",
    title: "8.8 — Signup disposition",
    status: "experimental",
    summary:
      "The email newsletter or waitlist remains paused and no-intake for Sprint 8. Final safe activation or deliberate retirement remains Phase 0 gate issue #63.",
    sourceHref: signupGateUrl,
    sourceLabel: "Review Phase 0 gate #63",
  },
  {
    id: "sprint-8-9",
    title: "8.9 — Accessibility, performance, security, and route validation",
    status: "experimental",
    summary:
      "Permanent source and isolated local-production-preview validation now covers thirteen routes, security headers, metadata, authority, signup, contrast, and transfer budgets without claiming hosted or independent evidence.",
    sourceHref: sprint8CompletionUrl,
    sourceLabel: "Review completion evidence",
  },
  {
    id: "sprint-8-10",
    title: "8.10 — Completion and Sprint 9 handoff",
    status: "experimental",
    summary:
      "The reconciliation, control map, open holdpoints, release and rollback record, completion package, and bounded Sprint 9 handoff are implemented. Explicit founding-steward acceptance and squash merge remain open.",
    sourceHref: sprint8CompletionUrl,
    sourceLabel: "Review the completion package",
  },
];

export const futureRoadmap: readonly RoadmapRecord[] = [
  {
    id: "sprint-9",
    title: "Sprint 9 — Public synthetic prologue",
    status: "planned",
    summary:
      "A no-account, no-real-health-data playable explanation of the Promise and first public synthetic journey. It has not started and requires Sprint 8 acceptance, merge, post-merge reconciliation, and a pre-Sprint 9 review.",
    sourceHref: sprintRoadmapUrl,
    sourceLabel: "Read Sprint 9",
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
