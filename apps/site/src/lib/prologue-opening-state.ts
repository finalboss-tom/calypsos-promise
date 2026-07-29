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

export type OpeningTransition =
  | "begin-opening"
  | "skip-opening"
  | "replay-arrival"
  | "continue-to-guide"
  | "choose-aster"
  | "choose-manual"
  | "return-to-lantern"
  | "reconsider-guide"
  | "switch-to-aster"
  | "switch-to-manual"
  | "continue-to-capture"
  | "choose-synthetic-text"
  | "choose-synthetic-voice"
  | "review-draft"
  | "accept-as-written"
  | "apply-synthetic-correction"
  | "confirm-entry"
  | "refuse-draft"
  | "change-synthetic-example"
  | "review-confirmed-entry"
  | "view-synthetic-chronicle"
  | "view-synthetic-receipt"
  | "return-to-chronicle"
  | "discard-projection"
  | "complete-first-lantern"
  | "return-to-receipt";

export type OpeningState = {
  readonly scene: OpeningScene;
  readonly transition: OpeningTransition | null;
  readonly presentationPath: PresentationPath | null;
  readonly captureMode: CaptureMode | null;
  readonly fixtureId: FixtureId | null;
  readonly correctionId: CorrectionId | null;
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
  confirmed: false,
  chronicleInspected: false,
  receiptInspected: false,
  firstLanternCompleted: false,
});

const transitionTable: Readonly<
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
  if (transition === "replay-arrival" || transition === "return-to-lantern") {
    return null;
  }
  return state.presentationPath;
}

function fixtureForTransition(transition: OpeningTransition) {
  if (transition === "choose-synthetic-text") {
    return {
      captureMode: "synthetic-text" as const,
      fixtureId: "synthetic-sleep-text-v1" as const,
    };
  }
  if (transition === "choose-synthetic-voice") {
    return {
      captureMode: "synthetic-voice" as const,
      fixtureId: "synthetic-walk-voice-v1" as const,
    };
  }
  return null;
}

function correctionForState(
  state: OpeningState,
  transition: OpeningTransition,
): CorrectionId | null {
  if (transition === "accept-as-written") return "accept-as-written";
  if (transition === "apply-synthetic-correction") {
    return state.fixtureId === "synthetic-sleep-text-v1"
      ? "sleep-duration-six-hours"
      : "walk-duration-fifteen-minutes";
  }
  if (
    transition === "choose-synthetic-text" ||
    transition === "choose-synthetic-voice" ||
    transition === "refuse-draft" ||
    transition === "change-synthetic-example" ||
    transition === "discard-projection" ||
    transition === "reconsider-guide" ||
    transition === "return-to-lantern" ||
    transition === "replay-arrival"
  ) {
    return null;
  }
  return state.correctionId;
}

function shouldClearCapture(transition: OpeningTransition) {
  return (
    transition === "refuse-draft" ||
    transition === "change-synthetic-example" ||
    transition === "discard-projection" ||
    transition === "reconsider-guide" ||
    transition === "return-to-lantern" ||
    transition === "replay-arrival"
  );
}

function confirmedForState(
  state: OpeningState,
  transition: OpeningTransition,
  clearCapture: boolean,
) {
  if (clearCapture || transition === "review-confirmed-entry") return false;
  if (transition === "confirm-entry") return true;
  return state.confirmed;
}

function chronicleInspectedForState(
  state: OpeningState,
  transition: OpeningTransition,
  clearCapture: boolean,
) {
  if (clearCapture || transition === "review-confirmed-entry") return false;
  if (transition === "view-synthetic-chronicle") return true;
  return state.chronicleInspected;
}

function receiptInspectedForState(
  state: OpeningState,
  transition: OpeningTransition,
  clearCapture: boolean,
) {
  if (clearCapture || transition === "review-confirmed-entry") return false;
  if (transition === "view-synthetic-receipt") return true;
  return state.receiptInspected;
}

function firstLanternCompletedForState(
  state: OpeningState,
  transition: OpeningTransition,
  clearCapture: boolean,
) {
  if (clearCapture || transition === "review-confirmed-entry") return false;
  if (transition === "complete-first-lantern") return true;
  return state.firstLanternCompleted;
}

function transitionAllowed(state: OpeningState, transition: OpeningTransition) {
  if (transition === "continue-to-capture" && !state.presentationPath)
    return false;
  if (
    (transition === "review-draft" ||
      transition === "accept-as-written" ||
      transition === "apply-synthetic-correction") &&
    !state.fixtureId
  ) {
    return false;
  }
  if (transition === "confirm-entry" && !state.correctionId) return false;
  if (
    transition === "view-synthetic-chronicle" &&
    (!state.confirmed || !state.fixtureId || !state.correctionId)
  ) {
    return false;
  }
  if (
    transition === "view-synthetic-receipt" &&
    (!state.confirmed ||
      !state.fixtureId ||
      !state.correctionId ||
      !state.chronicleInspected)
  ) {
    return false;
  }
  if (
    transition === "complete-first-lantern" &&
    (!state.confirmed ||
      !state.fixtureId ||
      !state.correctionId ||
      !state.chronicleInspected ||
      !state.receiptInspected)
  ) {
    return false;
  }
  return true;
}

export function transitionOpening(
  state: OpeningState,
  transition: OpeningTransition,
): OpeningState {
  const nextScene = transitionTable[state.scene][transition];
  if (!nextScene || !transitionAllowed(state, transition)) return state;

  const fixture = fixtureForTransition(transition);
  const clearCapture = shouldClearCapture(transition);

  return Object.freeze({
    scene: nextScene,
    transition,
    presentationPath: nextPresentationPath(state, transition),
    captureMode: clearCapture
      ? null
      : (fixture?.captureMode ?? state.captureMode),
    fixtureId: clearCapture ? null : (fixture?.fixtureId ?? state.fixtureId),
    correctionId: correctionForState(state, transition),
    confirmed: confirmedForState(state, transition, clearCapture),
    chronicleInspected: chronicleInspectedForState(
      state,
      transition,
      clearCapture,
    ),
    receiptInspected: receiptInspectedForState(state, transition, clearCapture),
    firstLanternCompleted: firstLanternCompletedForState(
      state,
      transition,
      clearCapture,
    ),
  });
}
