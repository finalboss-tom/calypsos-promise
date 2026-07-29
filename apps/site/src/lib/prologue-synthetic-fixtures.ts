import type { CorrectionId, FixtureId } from "@/lib/prologue-opening-state";

type PrologueNamespacedId = `${string}.${string}`;

export type SyntheticDraft = {
  readonly recordId: PrologueNamespacedId;
  readonly variableId: PrologueNamespacedId;
  readonly sourceArtifactId: PrologueNamespacedId;
  readonly sourceVersionId: PrologueNamespacedId;
  readonly category: "Sleep" | "Activity";
  readonly valueShape: "duration";
  readonly value: string;
  readonly context: string;
  readonly occurredAt: string;
  readonly status: "draft" | "confirmed";
};

export type SyntheticCaptureFixture = {
  readonly id: FixtureId;
  readonly dataClassification: "synthetic";
  readonly mode: "synthetic-text" | "synthetic-voice";
  readonly label: string;
  readonly sourceLabel: string;
  readonly sourceDetail: string;
  readonly example: string;
  readonly draft: SyntheticDraft;
  readonly correction: {
    readonly id: Exclude<CorrectionId, "accept-as-written">;
    readonly label: string;
    readonly value: string;
  };
  readonly prohibitedInterpretation: string;
};

export const syntheticCaptureFixtures: Readonly<
  Record<FixtureId, SyntheticCaptureFixture>
> = Object.freeze({
  "synthetic-sleep-text-v1": Object.freeze({
    id: "synthetic-sleep-text-v1",
    dataClassification: "synthetic",
    mode: "synthetic-text",
    label: "Pre-authored synthetic text example",
    sourceLabel: "Repository-authored demonstration fixture",
    sourceDetail:
      "This sentence was written for Sprint 9. It was not entered by a visitor and does not describe a real person.",
    example:
      "Synthetic example: I slept for seven hours and woke feeling rested.",
    draft: Object.freeze({
      recordId: "record.prologue.synthetic-sleep-001",
      variableId: "variable.prologue.synthetic-sleep-duration",
      sourceArtifactId: "source.prologue.synthetic-sleep-text",
      sourceVersionId: "source-version.prologue.synthetic-sleep-text-v1",
      category: "Sleep",
      valueShape: "duration",
      value: "7 hours",
      context: "Woke feeling rested",
      occurredAt: "2030-04-12T07:30:00Z",
      status: "draft",
    }),
    correction: Object.freeze({
      id: "sleep-duration-six-hours",
      label: "Correct the synthetic duration to six hours",
      value: "6 hours",
    }),
    prohibitedInterpretation:
      "This is not a sleep claim, health recommendation, diagnosis, medical record, or statement about the visitor.",
  }),
  "synthetic-walk-voice-v1": Object.freeze({
    id: "synthetic-walk-voice-v1",
    dataClassification: "synthetic",
    mode: "synthetic-voice",
    label: "Pre-authored synthetic voice transcript",
    sourceLabel: "Repository-authored transcript demonstration",
    sourceDetail:
      "No audio exists. No microphone is used. This transcript was written for Sprint 9 and does not describe a real person.",
    example:
      "Synthetic voice transcript: I took a twenty-minute walk after lunch and felt more alert.",
    draft: Object.freeze({
      recordId: "record.prologue.synthetic-activity-001",
      variableId: "variable.prologue.synthetic-walk-duration",
      sourceArtifactId: "source.prologue.synthetic-walk-transcript",
      sourceVersionId: "source-version.prologue.synthetic-walk-transcript-v1",
      category: "Activity",
      valueShape: "duration",
      value: "20-minute walk",
      context: "After lunch; felt more alert",
      occurredAt: "2030-04-12T13:15:00Z",
      status: "draft",
    }),
    correction: Object.freeze({
      id: "walk-duration-fifteen-minutes",
      label: "Correct the synthetic walk to fifteen minutes",
      value: "15-minute walk",
    }),
    prohibitedInterpretation:
      "This is not exercise advice, a health outcome, an activity record, audio evidence, or statement about the visitor.",
  }),
});

export function getSyntheticFixture(fixtureId: FixtureId) {
  return syntheticCaptureFixtures[fixtureId];
}

export function projectSyntheticDraft(
  fixtureId: FixtureId,
  correctionId: CorrectionId | null,
  confirmed: boolean,
): SyntheticDraft {
  const fixture = getSyntheticFixture(fixtureId);
  const correctedValue =
    correctionId === fixture.correction.id
      ? fixture.correction.value
      : fixture.draft.value;

  return Object.freeze({
    ...fixture.draft,
    value: correctedValue,
    status: confirmed ? "confirmed" : "draft",
  });
}
