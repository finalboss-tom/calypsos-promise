import { supporterMovementEnabled } from "@/lib/supporters/feature";

export type NavigationItem = {
  readonly href: string;
  readonly label: string;
  readonly description: string;
  readonly external?: boolean;
};

const supporterDirectNavigation: readonly NavigationItem[] =
  supporterMovementEnabled()
    ? [
        {
          href: "/supporters",
          label: "Support the Promise",
          description:
            "Affirm the Personal Health Data Promise and choose private or public support.",
        },
      ]
    : [];

const supporterNarrativeNavigation: readonly NavigationItem[] =
  supporterMovementEnabled()
    ? [
        {
          href: "/supporters",
          label: "Stand with the Promise",
          description:
            "Add verified support without creating an account or sharing health data.",
        },
      ]
    : [];

export const directNavigation: readonly NavigationItem[] = [
  {
    href: "/",
    label: "Home",
    description: "The public gateway to Ogygia and the current project state.",
  },
  {
    href: "/promise",
    label: "The Promise",
    description: "Player rights, personal value, privacy, and control.",
  },
  ...supporterDirectNavigation,
  {
    href: "/laws",
    label: "Seven Laws",
    description:
      "Frozen canon protecting agency, privacy, evidence, and return.",
  },
  {
    href: "/how-it-works",
    label: "How It Works",
    description: "The planned short-session, player-confirmed experience.",
  },
  {
    href: "/consumer-first",
    label: "Consumer First",
    description:
      "Provider-respectful interoperability without product capture.",
  },
  {
    href: "/aster",
    label: "Aster & AI",
    description: "Proposal, confirmation, source, fallback, and non-authority.",
  },
  {
    href: "/trust",
    label: "Trust Center",
    description:
      "Rights, privacy, security status, open gates, and correction routes.",
  },
  {
    href: "/forge",
    label: "Open Forge",
    description:
      "Ten bounded local public and synthetic tools with visible limits.",
  },
  {
    href: "/roadmap",
    label: "Roadmap",
    description:
      "Evidence-based capability status, active work, and later gates.",
  },
  {
    href: "/support",
    label: "Support",
    description:
      "Public-safe issues, contributions, challenges, and private routing.",
  },
  {
    href: "/funding",
    label: "Funding",
    description:
      "Canonical public registers, honest empty states, and anti-capture rules.",
  },
  {
    href: "/#capability-status",
    label: "Capability status",
    description: "What is live, experimental, planned, or long-horizon.",
  },
  {
    href: "/privacy",
    label: "Newsletter privacy",
    description:
      "Email-only updates, consent, deletion, and the Phase 0 boundary.",
  },
  {
    href: "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/current-status.md",
    label: "Current project status",
    description: "The canonical integrated repository status.",
    external: true,
  },
  {
    href: "https://github.com/finalboss-tom/calypsos-promise",
    label: "GitHub repository",
    description: "Inspect the open code, decisions, roadmap, and evidence.",
    external: true,
  },
];

export const narrativeNavigation: readonly NavigationItem[] = [
  {
    href: "/#begin",
    label: "Arrive at the shore",
    description: "Meet the project and see its current public state.",
  },
  {
    href: "/promise",
    label: "Hear the Promise",
    description: "Understand the rights that govern the journey.",
  },
  ...supporterNarrativeNavigation,
  {
    href: "/laws",
    label: "Learn the Seven Laws",
    description: "Read the frozen rules no feature or faction may outrank.",
  },
  {
    href: "/how-it-works",
    label: "Follow the Wayfinder route",
    description:
      "See the planned voluntary, confirm-before-storage experience.",
  },
  {
    href: "/consumer-first",
    label: "Cross the institutional bridges",
    description:
      "See how standards and providers connect without taking the key.",
  },
  {
    href: "/aster",
    label: "Meet Aster",
    description:
      "Understand the Wayfinder’s roles, sources, limits, and fallbacks.",
  },
  {
    href: "/trust",
    label: "Enter the House of Oaths",
    description:
      "Inspect rights, safeguards, unresolved gates, and challenge paths.",
  },
  {
    href: "/forge",
    label: "Visit Hephaestus’s Open Forge",
    description:
      "Inspect the ten bounded tools and their public evidence limits.",
  },
  {
    href: "/roadmap",
    label: "Read the island roadmap",
    description:
      "Follow evidence gates from the current website sprint to later horizons.",
  },
  {
    href: "/support",
    label: "Bring a signal to the agora",
    description:
      "Choose a public-safe contribution or the correct protected route.",
  },
  {
    href: "/funding",
    label: "Inspect the commons ledger",
    description:
      "See public funding records, empty states, and what support cannot buy.",
  },
  {
    href: "/#capability-status",
    label: "Consult the signal fires",
    description: "See what exists now and what remains ahead.",
  },
  {
    href: "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/current-status.md",
    label: "Read the island ledger",
    description: "Inspect the canonical integrated project status.",
    external: true,
  },
  {
    href: "/privacy",
    label: "Keep the key",
    description:
      "Review the email-only newsletter, consent, deletion, and privacy boundary.",
  },
  {
    href: "https://github.com/finalboss-tom/calypsos-promise",
    label: "Enter the public repository",
    description: "Follow the open project and contribute directly.",
    external: true,
  },
];
