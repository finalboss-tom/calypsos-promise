export const openingScenes = ["arrival", "lantern-shore"] as const;

export type OpeningScene = (typeof openingScenes)[number];

export type OpeningTransition =
  | "begin-opening"
  | "skip-opening"
  | "replay-arrival";

export type OpeningState = {
  readonly scene: OpeningScene;
  readonly transition: OpeningTransition | null;
};

export const initialOpeningState: OpeningState = Object.freeze({
  scene: "arrival",
  transition: null,
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
  }),
});

export function transitionOpening(
  state: OpeningState,
  transition: OpeningTransition,
): OpeningState {
  const nextScene = transitionTable[state.scene][transition];
  if (!nextScene) return state;

  return Object.freeze({
    scene: nextScene,
    transition,
  });
}
