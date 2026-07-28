export type NavigationItem = {
  readonly href: string;
  readonly label: string;
  readonly description: string;
  readonly external?: boolean;
};

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
    href: "/#capability-status",
    label: "Capability status",
    description: "What is live, experimental, planned, or long-horizon.",
  },
  {
    href: "/privacy",
    label: "Signup privacy",
    description: "The current paused signup state and public boundaries.",
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
    description: "Review the paused signup and private-data boundary.",
  },
  {
    href: "https://github.com/finalboss-tom/calypsos-promise",
    label: "Enter the public repository",
    description: "Follow the open project and contribute directly.",
    external: true,
  },
];
