import {
  getGameContentEntry,
  listGameContentEntries,
  type GameContentEntry,
} from "@calypsos-promise/game-content";

type Content = GameContentEntry["content"];
export type SceneContent = Extract<Content, { kind: "scene" }>;
export type ZoneContent = Extract<Content, { kind: "zone" }>;
export type DialogueContent = Extract<Content, { kind: "dialogue" }>;
export type CharacterContent = Extract<Content, { kind: "character" }>;
export type QuestContent = Extract<Content, { kind: "quest" }>;
export type SceneChoice = SceneContent["choices"][number];

export const WELCOME_SCENE_ID = "scene.hearth.welcome.synthetic";
export const DIRECT_SCENE_ID = "scene.hearth.direct-path.synthetic";

export const PRESENTATION_AUTHORITY = Object.freeze({
  informationClass: "PUBLIC_SYNTHETIC",
  state: "presentation-only",
  durable: false,
  chronicle: false,
  permission: false,
  personalProgress: false,
  rewards: false,
  preferenceInference: false,
  healthClaims: false,
  longitudinalIntelligence: "LI-V0-presentation-only",
} as const);

export interface PresentationBundle {
  scene: SceneContent;
  zone: ZoneContent;
  dialogues: readonly DialogueContent[];
  speakers: readonly CharacterContent[];
  quest?: QuestContent;
}

export type PresentationResolution =
  | { ok: true; bundle: PresentationBundle }
  | { ok: false; reason: string; missingIds: readonly string[] };

export type SyntheticChoiceOutcome =
  | {
      kind: "scene";
      nextSceneId: string;
      announcement: string;
      authoritative: false;
    }
  | {
      kind: "route";
      route: "/" | "/map" | "/direct";
      announcement: string;
      authoritative: false;
    }
  | {
      kind: "message";
      status: "deferred" | "refused";
      announcement: string;
      authoritative: false;
    }
  | {
      kind: "exit";
      status: "discarded";
      announcement: string;
      authoritative: false;
    }
  | {
      kind: "invalid";
      announcement: string;
      authoritative: false;
    };

function getContentOfKind<K extends Content["kind"]>(
  id: string,
  kind: K,
): Extract<Content, { kind: K }> | undefined {
  const entry = getGameContentEntry(id);
  if (entry?.content.kind !== kind) return undefined;
  return entry.content as Extract<Content, { kind: K }>;
}

export function resolvePresentationScene(
  sceneId: string,
): PresentationResolution {
  const scene = getContentOfKind(sceneId, "scene");
  if (!scene) {
    return {
      ok: false,
      reason: "The requested scene is unavailable in this content package.",
      missingIds: [sceneId],
    };
  }

  const missingIds: string[] = [];
  const zone = getContentOfKind(scene.zoneId, "zone");
  if (!zone) missingIds.push(scene.zoneId);

  const dialogues = scene.dialogueIds.flatMap((id) => {
    const dialogue = getContentOfKind(id, "dialogue");
    if (!dialogue) {
      missingIds.push(id);
      return [];
    }
    return [dialogue];
  });

  const speakers = scene.speakerIds.flatMap((id) => {
    const speaker = getContentOfKind(id, "character");
    if (!speaker) {
      missingIds.push(id);
      return [];
    }
    return [speaker];
  });

  const quest = listGameContentEntries({ kind: "quest" })
    .map(({ content }) => content)
    .find(
      (content): content is QuestContent =>
        content.kind === "quest" && content.zoneId === scene.zoneId,
    );

  if (!zone || missingIds.length > 0) {
    return {
      ok: false,
      reason:
        "The scene package is incomplete. The renderer failed closed instead of inventing content.",
      missingIds,
    };
  }

  return {
    ok: true,
    bundle: {
      scene,
      zone,
      dialogues,
      speakers,
      quest,
    },
  };
}

export function resolveSyntheticChoice(
  sceneId: string,
  choiceId: string,
): SyntheticChoiceOutcome {
  const resolution = resolvePresentationScene(sceneId);
  if (!resolution.ok) {
    return {
      kind: "invalid",
      announcement:
        "The scene is unavailable. No progress, preference, or authority was created.",
      authoritative: false,
    };
  }

  const choice = resolution.bundle.scene.choices.find(
    ({ id }) => id === choiceId,
  );

  if (!choice) {
    return {
      kind: "invalid",
      announcement:
        "That choice is not part of the current scene. Nothing was recorded.",
      authoritative: false,
    };
  }

  if (choice.nextSceneId) {
    const next = resolvePresentationScene(choice.nextSceneId);
    if (!next.ok) {
      return {
        kind: "invalid",
        announcement:
          "The next scene is unavailable. The interaction stopped without creating progress.",
        authoritative: false,
      };
    }

    return {
      kind: "scene",
      nextSceneId: choice.nextSceneId,
      announcement: `${choice.label}. ${choice.consequenceText}`,
      authoritative: false,
    };
  }

  if (choice.actionId === "action.shell.open-island-map.synthetic") {
    return {
      kind: "route",
      route: "/map",
      announcement: `${choice.label}. ${choice.consequenceText}`,
      authoritative: false,
    };
  }

  if (choice.disposition === "defer") {
    return {
      kind: "message",
      status: "deferred",
      announcement:
        "The synthetic presentation is paused. No penalty, preference, or progress was recorded.",
      authoritative: false,
    };
  }

  if (choice.disposition === "refuse") {
    return {
      kind: "message",
      status: "refused",
      announcement:
        "The synthetic presentation was refused. Essential information remains available and nothing was inferred.",
      authoritative: false,
    };
  }

  if (choice.disposition === "exit") {
    return {
      kind: "exit",
      status: "discarded",
      announcement:
        "The synthetic presentation was exited and its temporary interaction state was discarded.",
      authoritative: false,
    };
  }

  return {
    kind: "invalid",
    announcement:
      "This synthetic action has no presentation mapping. Nothing was recorded.",
    authoritative: false,
  };
}
