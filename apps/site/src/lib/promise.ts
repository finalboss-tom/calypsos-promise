export const productConstitutionUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/frozen/product-constitution.md";

export const playerPromise =
  "Build your Living Chronicle. Improve your health. Keep the key.";

export const missionSummary =
  "Calypso’s Promise helps people build, understand, and control a high-quality longitudinal account of their health and lived experience through brief, rewarding, narrative-driven participation.";

export type PromisePrinciple = {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
};

export const promisePrinciples: readonly PromisePrinciple[] = [
  {
    id: "private-by-default",
    title: "Private by default",
    summary:
      "The software can be open while a person’s production health data remains private and outside public contributor workflows.",
  },
  {
    id: "meaningful-refusal",
    title: "Meaningful refusal",
    summary:
      "Declining research, sharing, a quest, or a suggested action cannot become punishment, shame, or loss of the core experience.",
  },
  {
    id: "player-confirmation",
    title: "Player confirmation",
    summary:
      "AI may propose a draft, but the player confirms, corrects, or rejects it before a domain service can treat it as authoritative.",
  },
  {
    id: "correction-and-exit",
    title: "Correction and exit",
    summary:
      "Inspection, correction, export, revocation, and deletion are first-class rights rather than rewards for payment or progression.",
  },
];

export type ConnectedLoop = {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
};

export const connectedLoops: readonly ConnectedLoop[] = [
  {
    id: "build",
    title: "Build your health record",
    summary:
      "Capture, connect, normalize, validate, and preserve provenance so your Living Chronicle becomes more useful over time.",
  },
  {
    id: "improve",
    title: "Improve your health",
    summary:
      "Receive understandable feedback, learn, conduct safe personal experiments, and choose actions that matter to you.",
  },
  {
    id: "control",
    title: "Control and share in created value",
    summary:
      "Choose whether and how information contributes to research or compensated opportunities. Secondary use remains separate and purpose-specific.",
  },
];
