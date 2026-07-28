export type SupportRoute = {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly href: string;
  readonly label: string;
  readonly external: true;
};

export const publicSupportRoutes: readonly SupportRoute[] = [
  {
    id: "public-safe-issue",
    title: "Report a public-safe problem",
    summary:
      "Use a GitHub issue for public-safe product, documentation, accessibility, content, contributor, or governance work. Separate the problem from a preferred implementation and use synthetic evidence only.",
    href: "https://github.com/finalboss-tom/calypsos-promise/issues/new/choose",
    label: "Choose an issue form",
    external: true,
  },
  {
    id: "system-challenge",
    title: "Challenge an assumption or mechanism",
    summary:
      "Use the system-challenge form to dispute a public assumption, metric, incentive, architecture, policy, authority structure, or public claim. A complete replacement solution is not required.",
    href: "https://github.com/finalboss-tom/calypsos-promise/issues/new?template=system-challenge.yml",
    label: "Open a system challenge",
    external: true,
  },
  {
    id: "contribute",
    title: "Contribute implementation or validation",
    summary:
      "Read the contribution guide, select an issue, make the smallest coherent public-or-synthetic change, and preserve the Product Constitution and module boundaries.",
    href: "https://github.com/finalboss-tom/calypsos-promise/blob/main/CONTRIBUTING.md",
    label: "Read the contribution guide",
    external: true,
  },
  {
    id: "active-work",
    title: "Review active work before asking",
    summary:
      "Check the integrated status and active issues first. Existing evidence, scope limits, or unresolved gates may already answer the question or identify the correct workstream.",
    href: "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/current-status.md",
    label: "Inspect current project status",
    external: true,
  },
];

export const protectedSupportRoutes: readonly SupportRoute[] = [
  {
    id: "security",
    title: "Security vulnerability or accidental disclosure",
    summary:
      "Do not open a public issue or reproduce protected material. Follow the private security policy using synthetic reproduction steps and the minimum necessary evidence.",
    href: "https://github.com/finalboss-tom/calypsos-promise/blob/main/SECURITY.md",
    label: "Read private security reporting rules",
    external: true,
  },
  {
    id: "conduct",
    title: "Conduct or harassment concern",
    summary:
      "Conduct concerns and witness evidence belong in a private maintainer route. Do not place personal, health, correspondence, or moderation evidence in a public issue.",
    href: "https://github.com/finalboss-tom/calypsos-promise/blob/main/CODE_OF_CONDUCT.md",
    label: "Read the Code of Conduct",
    external: true,
  },
  {
    id: "personal-or-account",
    title: "Personal health, account, or private support matter",
    summary:
      "No account or private product-support system is live. Never publish person-specific health information, account details, support transcripts, screenshots, exports, or another person’s information.",
    href: "https://github.com/finalboss-tom/calypsos-promise/blob/main/CONTRIBUTING.md#feedback-and-issue-intake",
    label: "Review the information boundary",
    external: true,
  },
];

export const supportNonCapabilities: readonly string[] = [
  "No account-specific customer-support system is operating.",
  "No health-advice, diagnosis, clinical triage, provider-intake, or research-enrollment service is operating.",
  "No private evidence should be pasted into public issues, pull requests, branches, logs, or previews.",
  "Issue reactions and comment volume are advisory signals, not votes or automatic roadmap authority.",
];
