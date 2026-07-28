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
    explanation: "Implemented for review but not an accepted production release.",
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
    label: "Public website foundation",
    status: "experimental",
    summary:
      "The Next.js shell, security policy, metadata, direct navigation, and accessibility foundations are under active review.",
    sourceHref:
      "https://github.com/finalboss-tom/calypsos-promise/issues/60",
    sourceLabel: "Review Sprint 8",
  },
  {
    id: "public-synthetic-prologue",
    label: "Public synthetic prologue",
    status: "planned",
    summary:
      "A no-account, no-real-health-data playable explanation is reserved for Sprint 9 and is not part of this website workstream.",
    sourceHref:
      "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/sprints.md",
    sourceLabel: "Read the sprint roadmap",
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
