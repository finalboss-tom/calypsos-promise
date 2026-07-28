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
    description: "The current public gateway to Ogygia.",
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
    description: "Read the Promise and the current website boundary.",
  },
  {
    href: "/#capability-status",
    label: "Consult the signal fires",
    description: "See what exists now and what remains ahead.",
  },
  {
    href: "/privacy",
    label: "Keep the key",
    description: "Review the paused signup and private-data boundary.",
  },
  {
    href: "https://github.com/finalboss-tom/calypsos-promise",
    label: "Enter the open forge",
    description: "Follow the public repository and contribute directly.",
    external: true,
  },
];
