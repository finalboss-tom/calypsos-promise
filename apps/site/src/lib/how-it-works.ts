export type JourneyStep = {
  readonly title: string;
  readonly explanation: string;
};

export const dailyJourney: readonly JourneyStep[] = [
  {
    title: "Arrival",
    explanation:
      "Return to the Hearth for a clear briefing and an honest stopping point.",
  },
  {
    title: "Wayfinder route",
    explanation:
      "Aster may propose two or three relevant quests. The player may replace, defer, or reject the route without punishment.",
  },
  {
    title: "Capture or action",
    explanation:
      "Tap, type, speak, photograph, import, learn, move, reflect, or review according to the person’s context and accessibility needs.",
  },
  {
    title: "Confirmation",
    explanation:
      "Extracted information remains a reviewable draft until the player confirms, corrects, or rejects it.",
  },
  {
    title: "Feedback",
    explanation:
      "The Chronicle becomes more useful and the planned island experience responds without treating health status as moral worth.",
  },
  {
    title: "Departure",
    explanation:
      "See what changed, what was learned, which permission was used, and what may come next before choosing to leave.",
  },
];

export const deterministicResponsibilities = [
  "Eligibility",
  "Permissions",
  "Completion",
  "Rewards",
  "Unlocks",
  "Safety gates",
  "Story revelation order",
  "Canon facts",
] as const;

export const aiAssistedResponsibilities = [
  "Input-extraction drafts",
  "Clarifying questions",
  "Plain-language explanations",
  "Personalized route presentation",
  "Source-linked recall summaries",
  "Dialogue phrasing inside approved scene boundaries",
] as const;

export const resilientCorePaths = [
  "Manual capture",
  "Structured recall",
  "Permission review",
  "Correction",
  "Export",
  "Deletion",
  "Ordinary play",
] as const;
