import type { CapabilityStatus } from "@/lib/capability-status";

export type TrustArea = {
  readonly id: string;
  readonly title: string;
  readonly status: CapabilityStatus;
  readonly summary: string;
  readonly boundary: string;
  readonly sourceHref: string;
  readonly sourceLabel: string;
};

export const trustAreas: readonly TrustArea[] = [
  {
    id: "player-rights",
    title: "Player rights and the Promise",
    status: "live",
    summary:
      "The public rights floor protects personal value, meaningful refusal, privacy, access control, provenance, correction, export, deletion where possible, and non-punitive return.",
    boundary:
      "A website page, metric, sponsor, provider, model, or implementation cannot silently amend the frozen Promise or Seven Laws.",
    sourceHref:
      "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/frozen/product-constitution.md",
    sourceLabel: "Read the Product Constitution",
  },
  {
    id: "privacy-boundary",
    title: "Public software, private personal data",
    status: "live",
    summary:
      "The repository, website, tests, fixtures, previews, logs, and contributor workflows permit public information and explicitly synthetic evidence only.",
    boundary:
      "No production health data, private signup record, credential, protected report, contract, or private financial source belongs in public project systems.",
    sourceHref:
      "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/policies/publication-and-confidentiality.md",
    sourceLabel: "Read the publication boundary",
  },
  {
    id: "security-baseline",
    title: "Security and privacy controls",
    status: "experimental",
    summary:
      "Sprint 5 established public architecture, control objectives, residual-risk registers, synthetic abuse cases, and founding-steward design table exercises.",
    boundary:
      "Documented or synthetically exercised controls are not deployed controls, operational verification, penetration testing, or independent security certification.",
    sourceHref:
      "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/security/README.md",
    sourceLabel: "Inspect the security architecture",
  },
  {
    id: "authority-separation",
    title: "Authority remains separated",
    status: "experimental",
    summary:
      "Chronicle truth, permission truth, identity, execution, receipts, protected audit, product state, AI proposals, providers, and public institutional records remain distinct domains.",
    boundary:
      "A successful model response, tool call, build, provider claim, security control, or website label cannot create permission, Chronicle truth, clinical authority, or governance legitimacy.",
    sourceHref:
      "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/current-status.md#permanent-authority-boundaries",
    sourceLabel: "Inspect current authority boundaries",
  },
  {
    id: "providers-connectors",
    title: "Providers and connectors",
    status: "planned",
    summary:
      "Providers, EHRs, laboratories, pharmacies, devices, standards, and institutions may become valuable sources, destinations, and collaborators through later bounded adapters.",
    boundary:
      "No provider, EHR, connector, clinical workflow, institutional access path, recommendation, ranking, or preferred integration is live.",
    sourceHref:
      "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/decisions/0010-consumer-first-provider-independent-boundary.md",
    sourceLabel: "Read the consumer-first decision",
  },
  {
    id: "funding-doctrine",
    title: "Funding and sponsorship doctrine",
    status: "live",
    summary:
      "Accepted public rules prevent money, credits, infrastructure, distribution, or market access from purchasing data, product authority, favorable findings, provider placement, connector priority, or governance power.",
    boundary:
      "No operating treasury, legal entity, payment rail, donation runtime, tax claim, accepted sponsor, provider relationship, or independent financial review is established.",
    sourceHref:
      "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/economics/README.md",
    sourceLabel: "Inspect the funding doctrine",
  },
  {
    id: "correction-challenge",
    title: "Correction, challenge, and revalidation",
    status: "live",
    summary:
      "Public issues and governed records provide the current public-safe path to challenge assumptions, evidence, incentives, architecture, policy, authority, and public claims.",
    boundary:
      "The project has no permanent tribunal or ombuds office. Protected health, security, legal, conduct, personnel, or third-party evidence must use the appropriate private route.",
    sourceHref:
      "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/governance/institutional-immune-system.md",
    sourceLabel: "Read the Institutional Immune System",
  },
  {
    id: "independent-review",
    title: "Independent and affected-user review",
    status: "planned",
    summary:
      "Independent security, privacy, accessibility, AI-safety, clinical, interoperability, legal, financial, operational, and affected-user review remains an explicit gate.",
    boundary:
      "Founding-steward acceptance and passing CI are accountable internal evidence, not independent certification or production approval.",
    sourceHref:
      "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/current-status.md",
    sourceLabel: "Review the open project gates",
  },
];

export const publicChallengeRoutes = [
  {
    title: "Public product, documentation, governance, or evidence concern",
    action: "Open a GitHub issue using public or synthetic information only.",
    href: "https://github.com/finalboss-tom/calypsos-promise/issues/new/choose",
    label: "Open a public issue",
  },
  {
    title: "Security, privacy, secret, authorization, or accidental disclosure",
    action:
      "Do not open a public issue. Contact the repository owner privately through GitHub and avoid reproducing protected material.",
    href: "https://github.com/finalboss-tom/calypsos-promise/security/policy",
    label: "Read the private reporting policy",
  },
  {
    title: "Correction to an accepted public record",
    action:
      "Identify the exact record, disputed statement, public evidence, affected groups, urgency, uncertainty, and a possible containment or correction path.",
    href: "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/governance/institutional-immune-system.md#correction-lifecycle",
    label: "Review the correction lifecycle",
  },
] as const;

export const openTrustGates = [
  "No production health-data, identity, permission-enforcement, provider, connector, clinical, research, payment, or private-AI runtime is authorized.",
  "No representative accessibility review, accessibility certification, independent penetration test, or production security verification is complete.",
  "No dedicated disclosure address, ombuds office, permanent tribunal, or independent institutional review body is established.",
  "No public page may publish protected vulnerability details, private reports, credentials, personal data, contracts, negotiations, or raw financial records.",
] as const;
