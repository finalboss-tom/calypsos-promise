export const openingScenes = [
  "arrival",
  "lantern-shore",
  "guide-choice",
  "aster-introduction",
  "manual-introduction",
] as const;

export type OpeningScene = (typeof openingScenes)[number];
export type PresentationPath = "aster" | "manual";

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
  | "switch-to-manual";

export type OpeningState = {
  readonly scene: OpeningScene;
  readonly transition: OpeningTransition | null;
  readonly presentationPath: PresentationPath | null;
};

export const initialOpeningState: OpeningState = Object.freeze({
  scene: "arrival",
  transition: null,
  presentationPath: null,
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
  }),
  "manual-introduction": Object.freeze({
    "switch-to-aster": "aster-introduction",
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
  if (
    transition === "replay-arrival" ||
    transition === "return-to-lantern" ||
    transition === "reconsider-guide"
  ) {
    return null;
  }
  return state.presentationPath;
}

export function transitionOpening(
  state: OpeningState,
  transition: OpeningTransition,
): OpeningState {
  const nextScene = transitionTable[state.scene][transition];
  if (!nextScene) return state;

  return Object.freeze({
    scene: nextScene,
    transition,
    presentationPath: nextPresentationPath(state, transition),
  });
}
