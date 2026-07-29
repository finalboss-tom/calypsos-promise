export const capabilityStatusValues = [
  "live",
  "experimental",
  "planned",
  "long-horizon",
] as const;

export type CapabilityStatus = (typeof capabilityStatusValues)[number];

export type CapabilityRecord = {
  readonly id: string;
  readonly label: string;
  readonly status: CapabilityStatus;
  readonly summary: string;
  readonly sourceHref: string;
  readonly sourceLabel: string;
};

export const capabilityStatusDefinitions: Readonly<
  Record<CapabilityStatus, { label: string; explanation: string }>
> = {
  live: {
    label: "Live",
    explanation: "Publicly available and inspectable now.",
  },
  experimental: {
    label: "Experimental",
    explanation:
      "Available at a bounded evidence level with explicit unresolved limitations.",
  },
  planned: {
    label: "Planned",
    explanation: "Accepted roadmap work that is not implemented yet.",
  },
  "long-horizon": {
    label: "Long horizon",
    explanation: "A future direction behind later evidence and safety gates.",
  },
};

export const publicCapabilities: readonly CapabilityRecord[] = [
  {
    id: "public-repository",
    label: "Public repository",
    status: "live",
    summary:
      "Governance, architecture, roadmap, public contracts, and synthetic evidence are inspectable now.",
    sourceHref: "https://github.com/finalboss-tom/calypsos-promise",
    sourceLabel: "Inspect the repository",
  },
  {
    id: "public-website-foundation",
    label: "Public website",
    status: "live",
    summary:
      "The accepted Next.js public gateway is deployed on the canonical domains with Git-triggered deployment returned to disabled.",
    sourceHref:
      "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/current-status.md",
    sourceLabel: "Read current status",
  },
  {
    id: "trust-and-forge",
    label: "Trust Center and Open Forge",
    status: "live",
    summary:
      "The source-backed Trust Center and Open Forge explanations are public. Forge itself remains bounded local public/synthetic contributor tooling, not a private or production service.",
    sourceHref:
      "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/sprint-8-completion-record.md",
    sourceLabel: "Read the Sprint 8 evidence",
  },
  {
    id: "roadmap-support-funding",
    label: "Roadmap, support, and funding transparency",
    status: "live",
    summary:
      "Public roadmap, support, and canonical funding-transparency views are deployed without activating transactions, private support intake, or sponsor authority.",
    sourceHref:
      "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/current-status.md",
    sourceLabel: "Inspect the integrated status",
  },
  {
    id: "signup-disposition",
    label: "Phase 0 newsletter signup",
    status: "experimental",
    summary:
      "The preserve-and-activate path uses the existing private server webhook and Google Sheet for email updates only. Gate #63 remains open until merged deployment and manual verification are accepted.",
    sourceHref:
      "https://github.com/finalboss-tom/calypsos-promise/issues/63",
    sourceLabel: "Review Phase 0 gate #63",
  },
  {
    id: "public-synthetic-prologue",
    label: "Public synthetic prologue",
    status: "planned",
    summary:
      "Sprint 9 remains unimplemented. Issue #64 is defining its public-only, no-account, no-real-health-data, temporary-state, refusal, and accessibility boundaries.",
    sourceHref:
      "https://github.com/finalboss-tom/calypsos-promise/issues/64",
    sourceLabel: "Review the pre-Sprint 9 gate",
  },
  {
    id: "private-product",
    label: "Private Living Chronicle product",
    status: "long-horizon",
    summary:
      "Accounts, private Chronicles, production Aster, providers, connectors, and consequential workflows remain behind later gates.",
    sourceHref:
      "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/current-status.md",
    sourceLabel: "Read current boundaries",
  },
];
