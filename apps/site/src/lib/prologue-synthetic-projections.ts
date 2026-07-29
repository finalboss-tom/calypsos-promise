import type {
  CorrectionId,
  FixtureId,
  OpeningState,
} from "@/lib/prologue-opening-state";
import {
  getSyntheticFixture,
  projectSyntheticDraft,
} from "@/lib/prologue-synthetic-fixtures";

export const houseOfKeysProjectionReferences = Object.freeze({
  contractVersion: "0.1.0-pre.1",
  contractSource:
    "https://github.com/finalboss-tom/calypsos-promise/blob/main/packages/house-of-keys/src/types.ts#L379-L421",
  versionSource:
    "https://github.com/finalboss-tom/calypsos-promise/blob/main/packages/house-of-keys/src/version.ts",
  acceptedFixtureId: "receipt.personal-export.synthetic",
  acceptedFixtureSource:
    "https://github.com/finalboss-tom/calypsos-promise/blob/main/packages/house-of-keys/src/fixtures.ts",
});

export type SyntheticChronicleProjection = {
  readonly projectionId: "chronicle.prologue.synthetic";
  readonly projectionStatus: "temporary-page-memory-only";
  readonly dataClassification: "synthetic";
  readonly recordId: string;
  readonly category: "Sleep" | "Activity";
  readonly value: string;
  readonly originalValue: string;
  readonly context: string;
  readonly occurredAt: string;
  readonly sourceLabel: string;
  readonly sourceDetail: string;
  readonly fixtureId: FixtureId;
  readonly correctionId: CorrectionId;
  readonly correctionApplied: boolean;
  readonly confirmationState: "visitor-confirmed-synthetic-demonstration";
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
  readonly acceptedFixtureReference: "receipt.personal-export.synthetic";
  readonly controlledResourceId: "chronicle.prologue.synthetic";
  readonly selectedRecordIds: ReadonlyArray<string>;
  readonly purpose: {
    readonly id: "purpose.prologue.synthetic-understanding";
    readonly label: "Understand a temporary synthetic demonstration";
  };
  readonly recipient: {
    readonly id: "recipient.person.self";
    readonly label: "The visitor viewing this local demonstration";
  };
  readonly action: {
    readonly id: "action.view.synthetic-projection";
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

  return Object.freeze({
    projectionId: "chronicle.prologue.synthetic",
    projectionStatus: "temporary-page-memory-only",
    dataClassification: "synthetic",
    recordId: draft.recordId,
    category: draft.category,
    value: draft.value,
    originalValue: fixture.draft.value,
    context: draft.context,
    occurredAt: draft.occurredAt,
    sourceLabel: fixture.sourceLabel,
    sourceDetail: fixture.sourceDetail,
    fixtureId: state.fixtureId,
    correctionId: state.correctionId,
    correctionApplied: state.correctionId !== "accept-as-written",
    confirmationState: "visitor-confirmed-synthetic-demonstration",
    persistence: "none",
    discardBehavior: "explicit-or-navigation-destroys-projection",
    limitations: Object.freeze([
      "This is a temporary UI projection, not a Living Chronicle record.",
      "No account, identity, database, export, analytics event, or server log is created.",
      "Refreshing, leaving, restarting, or discarding destroys this projection.",
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
    contractShapeReference: "AccessReceipt",
    acceptedFixtureReference: houseOfKeysProjectionReferences.acceptedFixtureId,
    controlledResourceId: chronicle.projectionId,
    selectedRecordIds: Object.freeze([chronicle.recordId]),
    purpose: Object.freeze({
      id: "purpose.prologue.synthetic-understanding",
      label: "Understand a temporary synthetic demonstration",
    }),
    recipient: Object.freeze({
      id: "recipient.person.self",
      label: "The visitor viewing this local demonstration",
    }),
    action: Object.freeze({
      id: "action.view.synthetic-projection",
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
      "This view borrows selected AccessReceipt field meanings for explanation only.",
      "It is not an AccessReceipt and has not passed House of Keys policy evaluation.",
      "No real subject, grant, permission, consent, recipient authority, audit event, or production access exists.",
    ]),
  });
}
