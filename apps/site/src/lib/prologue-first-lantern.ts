import type { OpeningState } from "@/lib/prologue-opening-state";
import {
  projectSyntheticChronicle,
  projectSyntheticReceipt,
} from "@/lib/prologue-synthetic-projections";

export const firstLanternCompletionRule = Object.freeze({
  id: "first-lantern.prologue.synthetic.v1",
  version: 1,
  title: "Complete the public synthetic prologue evidence loop",
  requiredEvidence: Object.freeze([
    "synthetic-fixture-reviewed-and-confirmed",
    "temporary-synthetic-chronicle-inspected",
    "non-authoritative-receipt-explanation-inspected",
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
  readonly ruleId: "first-lantern.prologue.synthetic.v1";
  readonly ruleVersion: 1;
  readonly status: "completed-in-page-memory-only";
  readonly dataClassification: "synthetic";
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
  readonly limitations: ReadonlyArray<string>;
};

export function projectFirstLanternCompletion(
  state: OpeningState,
): FirstLanternCompletionProjection | null {
  if (
    !state.firstLanternCompleted ||
    !state.confirmed ||
    !state.fixtureId ||
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
    ruleId: firstLanternCompletionRule.id,
    ruleVersion: firstLanternCompletionRule.version,
    status: "completed-in-page-memory-only",
    dataClassification: "synthetic",
    fixtureId: state.fixtureId,
    correctionId: state.correctionId,
    chronicleProjectionId: chronicle.projectionId,
    receiptProjectionId: receipt.projectionId,
    evidence: Object.freeze([
      Object.freeze({
        id: "synthetic-fixture-reviewed-and-confirmed",
        satisfied: true as const,
        explanation:
          "A repository-authored synthetic fixture was explicitly reviewed and confirmed by the visitor.",
      }),
      Object.freeze({
        id: "temporary-synthetic-chronicle-inspected",
        satisfied: true as const,
        explanation:
          "The visitor inspected the temporary Chronicle-shaped projection and its source, correction, confirmation, persistence, and discard states.",
      }),
      Object.freeze({
        id: "non-authoritative-receipt-explanation-inspected",
        satisfied: true as const,
        explanation:
          "The visitor inspected the receipt-shaped explanation showing no policy evaluation, grant, permission, audit event, or data release.",
      }),
    ]),
    reward: "none",
    durableProgression: false,
    authority: "none",
    persistence: "none",
    limitations: Object.freeze([
      "The First Lantern is a temporary explanatory state, not a durable game achievement.",
      "No account, Chronicle record, permission, legal consent, reward, payment, provider status, or health outcome is created.",
      "Refreshing, leaving, restarting, reviewing, or discarding can remove this completion state.",
    ]),
  });
}
