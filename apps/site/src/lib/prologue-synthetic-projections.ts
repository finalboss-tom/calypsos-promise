import type {
  CorrectionId,
  FixtureId,
  OpeningState,
} from "@/lib/prologue-opening-state";
import {
  getSyntheticFixture,
  projectSyntheticDraft,
} from "@/lib/prologue-synthetic-fixtures";

export const livingChronicleProjectionReferences = Object.freeze({
  schemaVersion: "0.1.0",
  contractShape: "ChronicleRecordEnvelope",
  contractSource:
    "https://github.com/finalboss-tom/calypsos-promise/blob/main/packages/health-schema/src/types.ts",
  versionSource:
    "https://github.com/finalboss-tom/calypsos-promise/blob/main/packages/health-schema/src/version.ts",
});

export const houseOfKeysProjectionReferences = Object.freeze({
  contractVersion: "0.1.0-pre.1",
  contractShape: "AccessReceipt",
  contractSource:
    "https://github.com/finalboss-tom/calypsos-promise/blob/main/packages/house-of-keys/src/types.ts",
  versionSource:
    "https://github.com/finalboss-tom/calypsos-promise/blob/main/packages/house-of-keys/src/version.ts",
});

export type SyntheticChronicleProjection = {
  readonly projectionId: "chronicle.prologue.synthetic";
  readonly projectionStatus: "temporary-page-memory-only";
  readonly dataClassification: "synthetic";
  readonly schemaVersionReference: "0.1.0";
  readonly contractShapeReference: "ChronicleRecordEnvelope";
  readonly recordId: string;
  readonly chronicleId: "chronicle.prologue.synthetic";
  readonly subjectId: "subject.prologue.synthetic-demonstration";
  readonly recordFamily: "observation";
  readonly assertionClass: "self-report";
  readonly authorityState: "confirmed";
  readonly lifecycleState: "active";
  readonly temporalAssertionKind: "exact-instant";
  readonly category: "Sleep" | "Activity";
  readonly variableId: string;
  readonly valueShape: "duration";
  readonly value: string;
  readonly originalValue: string;
  readonly context: string;
  readonly occurredAt: string;
  readonly sourceArtifactId: string;
  readonly sourceVersionId: string;
  readonly sourceLabel: string;
  readonly sourceDetail: string;
  readonly fixtureId: FixtureId;
  readonly correctionId: CorrectionId;
  readonly correctionApplied: boolean;
  readonly confirmationDecision: "accepted" | "corrected-and-accepted";
  readonly persistence: "none";
  readonly discardBehavior: "explicit-or-navigation-destroys-projection";
  readonly limitations: ReadonlyArray<string>;
};

export type SyntheticReceiptProjection = {
  readonly projectionId: "receipt.prologue.synthetic-projection";
  readonly projectionStatus: "illustrative-non-contract-record";
  readonly dataClassification: "synthetic";
  readonly contractVersionReference: "0.1.0-pre.1";
  readonly contractShapeReference: "AccessReceipt";
  readonly contractVocabularyUse: "selected-field-explanation-only";
  readonly controlledResourceId: "chronicle.prologue.synthetic";
  readonly selectedRecordIds: ReadonlyArray<string>;
  readonly purpose: {
    readonly id: "purpose.prologue.synthetic-understanding";
    readonly label: "Understand a temporary synthetic demonstration";
  };
  readonly recipient: {
    readonly id: "recipient.prologue.synthetic-visitor";
    readonly label: "The visitor viewing this local demonstration";
  };
  readonly action: {
    readonly id: "action.prologue.view-synthetic-projection";
    readonly label: "View a temporary synthetic projection";
  };
  readonly decisionOutcome: "not-evaluated";
  readonly executionState: "not-applicable";
  readonly dataReleaseBoundaryCrossed: false;
  readonly grantReferences: ReadonlyArray<never>;
  readonly reasonCodes: ReadonlyArray<string>;
  readonly limitations: ReadonlyArray<string>;
};

export function projectSyntheticChronicle(
  state: OpeningState,
): SyntheticChronicleProjection | null {
  if (!state.confirmed || !state.fixtureId || !state.correctionId) return null;

  const fixture = getSyntheticFixture(state.fixtureId);
  const draft = projectSyntheticDraft(
    state.fixtureId,
    state.correctionId,
    state.confirmed,
  );
  const correctionApplied = state.correctionId !== "accept-as-written";

  return Object.freeze({
    projectionId: "chronicle.prologue.synthetic",
    projectionStatus: "temporary-page-memory-only",
    dataClassification: "synthetic",
    schemaVersionReference: livingChronicleProjectionReferences.schemaVersion,
    contractShapeReference: livingChronicleProjectionReferences.contractShape,
    recordId: draft.recordId,
    chronicleId: "chronicle.prologue.synthetic",
    subjectId: "subject.prologue.synthetic-demonstration",
    recordFamily: "observation",
    assertionClass: "self-report",
    authorityState: "confirmed",
    lifecycleState: "active",
    temporalAssertionKind: "exact-instant",
    category: draft.category,
    variableId: draft.variableId,
    valueShape: draft.valueShape,
    value: draft.value,
    originalValue: fixture.draft.value,
    context: draft.context,
    occurredAt: draft.occurredAt,
    sourceArtifactId: draft.sourceArtifactId,
    sourceVersionId: draft.sourceVersionId,
    sourceLabel: fixture.sourceLabel,
    sourceDetail: fixture.sourceDetail,
    fixtureId: state.fixtureId,
    correctionId: state.correctionId,
    correctionApplied,
    confirmationDecision: correctionApplied
      ? "corrected-and-accepted"
      : "accepted",
    persistence: "none",
    discardBehavior: "explicit-or-navigation-destroys-projection",
    limitations: Object.freeze([
      "This view maps selected Living Chronicle vocabulary for explanation; it is not a ChronicleRecordEnvelope or stored Living Chronicle record.",
      "The synthetic subject, Chronicle, variable, source, and confirmation identifiers describe only this repository-authored demonstration.",
      "No account, identity, database, export, analytics event, server log, or production provenance event is created.",
      "Refreshing, leaving, restarting, reviewing, or discarding destroys this projection.",
    ]),
  });
}

export function projectSyntheticReceipt(
  chronicle: SyntheticChronicleProjection,
): SyntheticReceiptProjection {
  return Object.freeze({
    projectionId: "receipt.prologue.synthetic-projection",
    projectionStatus: "illustrative-non-contract-record",
    dataClassification: "synthetic",
    contractVersionReference: houseOfKeysProjectionReferences.contractVersion,
    contractShapeReference: houseOfKeysProjectionReferences.contractShape,
    contractVocabularyUse: "selected-field-explanation-only",
    controlledResourceId: chronicle.projectionId,
    selectedRecordIds: Object.freeze([chronicle.recordId]),
    purpose: Object.freeze({
      id: "purpose.prologue.synthetic-understanding",
      label: "Understand a temporary synthetic demonstration",
    }),
    recipient: Object.freeze({
      id: "recipient.prologue.synthetic-visitor",
      label: "The visitor viewing this local demonstration",
    }),
    action: Object.freeze({
      id: "action.prologue.view-synthetic-projection",
      label: "View a temporary synthetic projection",
    }),
    decisionOutcome: "not-evaluated",
    executionState: "not-applicable",
    dataReleaseBoundaryCrossed: false,
    grantReferences: Object.freeze([]),
    reasonCodes: Object.freeze([
      "demo.no-policy-evaluation",
      "demo.no-grant",
      "demo.no-data-release",
    ]),
    limitations: Object.freeze([
      "This view borrows selected AccessReceipt field meanings for explanation only; it is not an AccessReceipt or accepted House of Keys fixture.",
      "No House of Keys policy request or evaluation ran, and no grant independently authorizes an operation.",
      "No real subject, identity, permission, legal consent, recipient authority, audit event, production access, or data release exists.",
    ]),
  });
}
