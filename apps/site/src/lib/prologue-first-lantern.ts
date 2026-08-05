import type { OpeningState } from "@/lib/prologue-opening-state";
import {
  projectSyntheticChronicle,
  projectSyntheticReceipt,
} from "@/lib/prologue-synthetic-projections";

export const firstLanternQuestDefinition = Object.freeze({
  id: "quest.prologue.first-lantern",
  version: 1,
  publicTitle: "Light the First Lantern",
  inWorldTitle: "The First Light of Lantern Shore",
  zone: "Lantern Shore",
  guide: "Deterministic Aster or the direct manual guide",
  playerValue:
    "Understand how source, review, confirmation, authority, and deterministic completion fit together without sharing personal information.",
  eligibilityRules: Object.freeze([
    "Public synthetic prologue only",
    "No account, identity, email, real health information, provider, or payment required",
  ]),
  estimatedTimeMinutes: Object.freeze({ minimum: 3, target: 5, maximum: 8 }),
  accessibilityVariants: Object.freeze([
    "Skip optional narration",
    "Use the complete manual presentation",
    "Operate every control with a keyboard",
    "Use reduced-motion, reduced-data, increased-contrast, or forced-colors presentation",
  ]),
  dataCategoriesTouched: Object.freeze(["synthetic demonstration data only"]),
  permissionOrPurposeRequirement: "none",
  safetyClassification: "public-synthetic-non-clinical",
  completionRuleId: "first-lantern.prologue.synthetic.v1",
  feedback:
    "The lantern illuminates and lists the exact synthetic evidence that satisfied the rule.",
  reward: "none",
  narrativeConsequence:
    "Ends the bounded public synthetic prologue only; it unlocks no canonical zone, rank, Fourteen Lantern progression, account, or durable game state.",
  deferralAndRefusal:
    "The visitor may review, correct, discard, restart, or leave without punishment or conversion pressure.",
  analyticsHypothesis: "not collected in Sprint 9",
  contentReviewState: "repository review required before release",
});

export const firstLanternCompletionRule = Object.freeze({
  id: firstLanternQuestDefinition.completionRuleId,
  version: 1,
  title: "Complete the public synthetic prologue evidence loop",
  requiredEvidence: Object.freeze([
    "lantern-shore-reached",
    "guide-path-selected",
    "synthetic-fixture-selected-and-labeled",
    "synthetic-draft-reviewed",
    "visitor-confirmed-review-choice",
    "temporary-synthetic-chronicle-inspected",
    "non-authoritative-receipt-explanation-inspected",
    "completion-without-conversion-or-remote-authority",
  ]),
  prohibitedInputs: Object.freeze([
    "account",
    "email",
    "newsletter submission",
    "payment",
    "provider selection",
    "model response",
    "real health data",
    "real-world health action",
    "elapsed time",
    "analytics event",
    "hidden state",
  ]),
});

export type FirstLanternCompletionProjection = {
  readonly completionId: "completion.first-lantern.prologue.synthetic";
  readonly questId: "quest.prologue.first-lantern";
  readonly questVersion: 1;
  readonly ruleId: "first-lantern.prologue.synthetic.v1";
  readonly ruleVersion: 1;
  readonly status: "completed-in-page-memory-only";
  readonly dataClassification: "synthetic";
  readonly zone: "Lantern Shore";
  readonly guidePath: "aster" | "manual";
  readonly fixtureId: string;
  readonly correctionId: string;
  readonly chronicleProjectionId: "chronicle.prologue.synthetic";
  readonly receiptProjectionId: "receipt.prologue.synthetic-projection";
  readonly evidence: ReadonlyArray<{
    readonly id: string;
    readonly satisfied: true;
    readonly explanation: string;
  }>;
  readonly reward: "none";
  readonly durableProgression: false;
  readonly authority: "none";
  readonly persistence: "none";
  readonly narrativeConsequence: string;
  readonly limitations: ReadonlyArray<string>;
};

export function projectFirstLanternCompletion(
  state: OpeningState,
): FirstLanternCompletionProjection | null {
  if (
    !state.firstLanternCompleted ||
    !state.lanternShoreReached ||
    !state.presentationPath ||
    !state.fixtureId ||
    !state.draftReviewed ||
    !state.confirmed ||
    !state.correctionId ||
    !state.chronicleInspected ||
    !state.receiptInspected
  ) {
    return null;
  }

  const chronicle = projectSyntheticChronicle(state);
  if (!chronicle) return null;
  const receipt = projectSyntheticReceipt(chronicle);

  return Object.freeze({
    completionId: "completion.first-lantern.prologue.synthetic",
    questId: firstLanternQuestDefinition.id,
    questVersion: firstLanternQuestDefinition.version,
    ruleId: firstLanternCompletionRule.id,
    ruleVersion: firstLanternCompletionRule.version,
    status: "completed-in-page-memory-only",
    dataClassification: "synthetic",
    zone: "Lantern Shore",
    guidePath: state.presentationPath,
    fixtureId: state.fixtureId,
    correctionId: state.correctionId,
    chronicleProjectionId: chronicle.projectionId,
    receiptProjectionId: receipt.projectionId,
    evidence: Object.freeze([
      Object.freeze({
        id: "lantern-shore-reached",
        satisfied: true as const,
        explanation:
          "The deterministic route reached Lantern Shore before any synthetic capture choice.",
      }),
      Object.freeze({
        id: "guide-path-selected",
        satisfied: true as const,
        explanation: `The visitor selected the ${state.presentationPath} presentation path; both paths use the same rules and controls.`,
      }),
      Object.freeze({
        id: "synthetic-fixture-selected-and-labeled",
        satisfied: true as const,
        explanation:
          "A repository-authored synthetic text or voice-transcript fixture was selected and visibly labeled as a demonstration.",
      }),
      Object.freeze({
        id: "synthetic-draft-reviewed",
        satisfied: true as const,
        explanation:
          "The deterministic draft was shown as a draft and the visitor entered the explicit review step.",
      }),
      Object.freeze({
        id: "visitor-confirmed-review-choice",
        satisfied: true as const,
        explanation:
          "The visitor accepted the prepared synthetic value or selected the prepared correction, then confirmed it explicitly.",
      }),
      Object.freeze({
        id: "temporary-synthetic-chronicle-inspected",
        satisfied: true as const,
        explanation:
          "The visitor inspected the temporary Chronicle-shaped projection and its source, correction, authority, persistence, and discard states.",
      }),
      Object.freeze({
        id: "non-authoritative-receipt-explanation-inspected",
        satisfied: true as const,
        explanation:
          "The visitor inspected the receipt-shaped explanation showing no policy evaluation, grant, permission, audit event, or data release.",
      }),
      Object.freeze({
        id: "completion-without-conversion-or-remote-authority",
        satisfied: true as const,
        explanation:
          "The local deterministic rule completed without an account, email, newsletter submission, model, provider, payment, real-world action, analytics event, timer, or hidden signal.",
      }),
    ]),
    reward: "none",
    durableProgression: false,
    authority: "none",
    persistence: "none",
    narrativeConsequence: firstLanternQuestDefinition.narrativeConsequence,
    limitations: Object.freeze([
      "The First Lantern is a temporary explanatory state, not a durable game achievement or canonical Fourteen Lanterns progression.",
      "No account, Chronicle record, permission, legal consent, reward, payment, provider status, health outcome, zone unlock, or rank is created.",
      "Refreshing, leaving, restarting, reviewing, or discarding can remove this completion state.",
    ]),
  });
}
