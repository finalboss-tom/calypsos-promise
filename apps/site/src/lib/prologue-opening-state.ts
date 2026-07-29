export const openingScenes = [
  "arrival",
  "lantern-shore",
  "guide-choice",
  "aster-introduction",
  "manual-introduction",
  "capture-choice",
  "synthetic-draft",
  "review-and-correction",
  "confirmed-entry",
  "synthetic-chronicle",
  "synthetic-receipt",
  "first-lantern",
] as const;

export type OpeningScene = (typeof openingScenes)[number];
export type PresentationPath = "aster" | "manual";
export type CaptureMode = "synthetic-text" | "synthetic-voice";
export type FixtureId = "synthetic-sleep-text-v1" | "synthetic-walk-voice-v1";
export type CorrectionId =
  | "accept-as-written"
  | "sleep-duration-six-hours"
  | "walk-duration-fifteen-minutes";

export const openingTransitions = [
  "begin-opening",
  "skip-opening",
  "replay-arrival",
  "continue-to-guide",
  "choose-aster",
  "choose-manual",
  "return-to-lantern",
  "reconsider-guide",
  "switch-to-aster",
  "switch-to-manual",
  "continue-to-capture",
  "choose-synthetic-text",
  "choose-synthetic-voice",
  "review-draft",
  "accept-as-written",
  "apply-synthetic-correction",
  "confirm-entry",
  "refuse-draft",
  "change-synthetic-example",
  "review-confirmed-entry",
  "view-synthetic-chronicle",
  "view-synthetic-receipt",
  "return-to-chronicle",
  "discard-projection",
  "complete-first-lantern",
  "return-to-receipt",
] as const;

export type OpeningTransition = (typeof openingTransitions)[number];

export type OpeningState = {
  readonly scene: OpeningScene;
  readonly transition: OpeningTransition | null;
  readonly presentationPath: PresentationPath | null;
  readonly captureMode: CaptureMode | null;
  readonly fixtureId: FixtureId | null;
  readonly correctionId: CorrectionId | null;
  readonly lanternShoreReached: boolean;
  readonly draftReviewed: boolean;
  readonly confirmed: boolean;
  readonly chronicleInspected: boolean;
  readonly receiptInspected: boolean;
  readonly firstLanternCompleted: boolean;
};

export const initialOpeningState: OpeningState = Object.freeze({
  scene: "arrival",
  transition: null,
  presentationPath: null,
  captureMode: null,
  fixtureId: null,
  correctionId: null,
  lanternShoreReached: false,
  draftReviewed: false,
  confirmed: false,
  chronicleInspected: false,
  receiptInspected: false,
  firstLanternCompleted: false,
});

export const openingTransitionTable: Readonly<
  Record<OpeningScene, Partial<Record<OpeningTransition, OpeningScene>>>
> = Object.freeze({
  arrival: Object.freeze({
    "begin-opening": "lantern-shore",
    "skip-opening": "lantern-shore",
  }),
  "lantern-shore": Object.freeze({
    "replay-arrival": "arrival",
    "continue-to-guide": "guide-choice",
  }),
  "guide-choice": Object.freeze({
    "choose-aster": "aster-introduction",
    "choose-manual": "manual-introduction",
    "return-to-lantern": "lantern-shore",
  }),
  "aster-introduction": Object.freeze({
    "switch-to-manual": "manual-introduction",
    "reconsider-guide": "guide-choice",
    "return-to-lantern": "lantern-shore",
    "continue-to-capture": "capture-choice",
  }),
  "manual-introduction": Object.freeze({
    "switch-to-aster": "aster-introduction",
    "reconsider-guide": "guide-choice",
    "return-to-lantern": "lantern-shore",
    "continue-to-capture": "capture-choice",
  }),
  "capture-choice": Object.freeze({
    "choose-synthetic-text": "synthetic-draft",
    "choose-synthetic-voice": "synthetic-draft",
    "reconsider-guide": "guide-choice",
    "return-to-lantern": "lantern-shore",
  }),
  "synthetic-draft": Object.freeze({
    "review-draft": "review-and-correction",
    "refuse-draft": "capture-choice",
    "change-synthetic-example": "capture-choice",
    "reconsider-guide": "guide-choice",
  }),
  "review-and-correction": Object.freeze({
    "accept-as-written": "review-and-correction",
    "apply-synthetic-correction": "review-and-correction",
    "confirm-entry": "confirmed-entry",
    "refuse-draft": "capture-choice",
    "change-synthetic-example": "capture-choice",
    "reconsider-guide": "guide-choice",
  }),
  "confirmed-entry": Object.freeze({
    "view-synthetic-chronicle": "synthetic-chronicle",
    "review-confirmed-entry": "review-and-correction",
    "discard-projection": "capture-choice",
    "change-synthetic-example": "capture-choice",
    "reconsider-guide": "guide-choice",
    "return-to-lantern": "lantern-shore",
  }),
  "synthetic-chronicle": Object.freeze({
    "view-synthetic-receipt": "synthetic-receipt",
    "review-confirmed-entry": "review-and-correction",
    "discard-projection": "capture-choice",
    "change-synthetic-example": "capture-choice",
    "reconsider-guide": "guide-choice",
    "return-to-lantern": "lantern-shore",
  }),
  "synthetic-receipt": Object.freeze({
    "complete-first-lantern": "first-lantern",
    "return-to-chronicle": "synthetic-chronicle",
    "review-confirmed-entry": "review-and-correction",
    "discard-projection": "capture-choice",
    "change-synthetic-example": "capture-choice",
    "reconsider-guide": "guide-choice",
    "return-to-lantern": "lantern-shore",
  }),
  "first-lantern": Object.freeze({
    "return-to-receipt": "synthetic-receipt",
    "review-confirmed-entry": "review-and-correction",
    "discard-projection": "capture-choice",
    "change-synthetic-example": "capture-choice",
    "reconsider-guide": "guide-choice",
    "return-to-lantern": "lantern-shore",
  }),
});

const CAPTURE_CLEARING_TRANSITIONS = new Set<OpeningTransition>([
  "refuse-draft",
  "change-synthetic-example",
  "discard-projection",
  "reconsider-guide",
  "return-to-lantern",
  "replay-arrival",
]);

const PRESENTATION_CLEARING_TRANSITIONS = new Set<OpeningTransition>([
  "reconsider-guide",
  "return-to-lantern",
  "replay-arrival",
]);

function transitionAllowed(state: OpeningState, transition: OpeningTransition) {
  if (transition === "continue-to-capture")
    return Boolean(state.presentationPath);

  if (
    transition === "review-draft" ||
    transition === "accept-as-written" ||
    transition === "apply-synthetic-correction"
  ) {
    return Boolean(state.fixtureId);
  }

  if (transition === "confirm-entry") {
    return Boolean(
      state.fixtureId && state.correctionId && state.draftReviewed,
    );
  }

  if (transition === "view-synthetic-chronicle") {
    return Boolean(
      state.confirmed &&
      state.fixtureId &&
      state.correctionId &&
      state.draftReviewed,
    );
  }

  if (transition === "view-synthetic-receipt") {
    return Boolean(
      state.confirmed &&
      state.fixtureId &&
      state.correctionId &&
      state.chronicleInspected,
    );
  }

  if (transition === "complete-first-lantern") {
    return Boolean(
      state.confirmed &&
      state.fixtureId &&
      state.correctionId &&
      state.chronicleInspected &&
      state.receiptInspected &&
      state.lanternShoreReached &&
      state.draftReviewed,
    );
  }

  return true;
}

function nextPresentationPath(
  state: OpeningState,
  transition: OpeningTransition,
): PresentationPath | null {
  if (transition === "choose-aster" || transition === "switch-to-aster") {
    return "aster";
  }
  if (transition === "choose-manual" || transition === "switch-to-manual") {
    return "manual";
  }
  if (PRESENTATION_CLEARING_TRANSITIONS.has(transition)) return null;
  return state.presentationPath;
}

function nextFixture(
  state: OpeningState,
  transition: OpeningTransition,
  clearCapture: boolean,
) {
  if (clearCapture) return { captureMode: null, fixtureId: null } as const;
  if (transition === "choose-synthetic-text") {
    return {
      captureMode: "synthetic-text",
      fixtureId: "synthetic-sleep-text-v1",
    } as const;
  }
  if (transition === "choose-synthetic-voice") {
    return {
      captureMode: "synthetic-voice",
      fixtureId: "synthetic-walk-voice-v1",
    } as const;
  }
  return {
    captureMode: state.captureMode,
    fixtureId: state.fixtureId,
  } as const;
}

function nextCorrectionId(
  state: OpeningState,
  transition: OpeningTransition,
  clearCapture: boolean,
): CorrectionId | null {
  if (clearCapture) return null;
  if (
    transition === "choose-synthetic-text" ||
    transition === "choose-synthetic-voice"
  ) {
    return null;
  }
  if (transition === "accept-as-written") return "accept-as-written";
  if (transition === "apply-synthetic-correction") {
    return state.fixtureId === "synthetic-sleep-text-v1"
      ? "sleep-duration-six-hours"
      : "walk-duration-fifteen-minutes";
  }
  return state.correctionId;
}

function nextEvidenceState(
  state: OpeningState,
  transition: OpeningTransition,
  clearCapture: boolean,
) {
  const lanternShoreReached =
    transition === "replay-arrival"
      ? false
      : transition === "begin-opening" ||
          transition === "skip-opening" ||
          transition === "return-to-lantern"
        ? true
        : state.lanternShoreReached;

  const draftReviewed = clearCapture
    ? false
    : transition === "review-draft" || transition === "review-confirmed-entry"
      ? true
      : transition === "choose-synthetic-text" ||
          transition === "choose-synthetic-voice"
        ? false
        : state.draftReviewed;

  if (clearCapture || transition === "review-confirmed-entry") {
    return {
      lanternShoreReached,
      draftReviewed,
      confirmed: false,
      chronicleInspected: false,
      receiptInspected: false,
      firstLanternCompleted: false,
    } as const;
  }

  return {
    lanternShoreReached,
    draftReviewed,
    confirmed: transition === "confirm-entry" ? true : state.confirmed,
    chronicleInspected:
      transition === "view-synthetic-chronicle"
        ? true
        : state.chronicleInspected,
    receiptInspected:
      transition === "view-synthetic-receipt" ? true : state.receiptInspected,
    firstLanternCompleted:
      transition === "return-to-receipt"
        ? false
        : transition === "complete-first-lantern"
          ? true
          : state.firstLanternCompleted,
  } as const;
}

export function getAllowedOpeningTransitions(
  state: OpeningState,
): readonly OpeningTransition[] {
  return Object.keys(openingTransitionTable[state.scene]).filter((transition) =>
    transitionAllowed(state, transition as OpeningTransition),
  ) as OpeningTransition[];
}

export function transitionOpening(
  state: OpeningState,
  transition: OpeningTransition,
): OpeningState {
  const nextScene = openingTransitionTable[state.scene][transition];
  if (!nextScene || !transitionAllowed(state, transition)) return state;

  const clearCapture = CAPTURE_CLEARING_TRANSITIONS.has(transition);
  const fixture = nextFixture(state, transition, clearCapture);
  const evidence = nextEvidenceState(state, transition, clearCapture);

  return Object.freeze({
    scene: nextScene,
    transition,
    presentationPath: nextPresentationPath(state, transition),
    captureMode: fixture.captureMode,
    fixtureId: fixture.fixtureId,
    correctionId: nextCorrectionId(state, transition, clearCapture),
    ...evidence,
  });
}
