import type {
  CalypsoContent,
  ContentKind,
} from "@calypsos-promise/content-schema";

export const GAME_CONTENT_PACKAGE_ID =
  "package.game-content.sprint-10" as const;
export const GAME_CONTENT_PACKAGE_VERSION = "0.1.0" as const;
export const GAME_CONTENT_API_VERSION = "0.1.0" as const;
export const GAME_CONTENT_SCHEMA_VERSION = "0.1.0" as const;
export const GAME_CONTENT_INFORMATION_CLASS = "PUBLIC_SYNTHETIC" as const;
export const GAME_CONTENT_DEFAULT_LOCALE = "en-US" as const;

export type GamePlatform = "browser" | "ios" | "android";
export type GameContentReleaseStatus = "experimental" | "stable" | "retired";

export interface GameContentProvenance {
  informationClass: typeof GAME_CONTENT_INFORMATION_CLASS;
  synthetic: true;
  sourceType: "repository-authored";
  sourcePath: string;
  authoredAt: string;
  authorship: {
    mode: "ai-assisted-reviewed" | "human-authored";
    responsibleHumans: string[];
    tools?: string[];
  };
}

export interface GameContentAccessibility {
  directPathSummary: string;
  plainLanguageSummary: string;
  textAlternative: string;
  essentialMedia: {
    audio: false;
    image: false;
    motion: false;
    haptics: false;
    gesture: false;
  };
}

export interface GameContentEntry {
  content: CalypsoContent;
  provenance: GameContentProvenance;
  accessibility: GameContentAccessibility;
  compatibility: {
    apiVersion: typeof GAME_CONTENT_API_VERSION;
    platforms: GamePlatform[];
  };
}

export interface GameContentPackageManifest {
  id: typeof GAME_CONTENT_PACKAGE_ID;
  version: typeof GAME_CONTENT_PACKAGE_VERSION;
  apiVersion: typeof GAME_CONTENT_API_VERSION;
  contentSchemaVersion: typeof GAME_CONTENT_SCHEMA_VERSION;
  releaseStatus: GameContentReleaseStatus;
  informationClass: typeof GAME_CONTENT_INFORMATION_CLASS;
  synthetic: true;
  defaultLocale: typeof GAME_CONTENT_DEFAULT_LOCALE;
  supportedLocales: string[];
  contentIds: string[];
  compatibility: {
    runtimeContract: "expo-sdk-57";
    platforms: GamePlatform[];
    requiresModelProvider: false;
    requiresNetwork: false;
  };
  migration: {
    strategy: "replace-public-package";
    compatibleFrom: string[];
    preserveSyntheticSessionState: false;
    unknownVersionBehavior: "reject-and-restart-synthetic-session";
  };
  authority: {
    contentIdentity: "package-only";
    clientState: "presentation-only";
    chronicle: false;
    permission: false;
    personalProgress: false;
    rewards: false;
    healthClaims: false;
    longitudinalIntelligence: "LI-V0-presentation-only";
  };
}

const PLATFORMS: GamePlatform[] = ["browser", "ios", "android"];
const FIXTURE_SOURCE =
  "packages/game-content/src/index.ts#public-synthetic-fixtures";
const TIMESTAMP = "2026-08-05T00:00:00.000Z";

const sharedBase = {
  schemaVersion: GAME_CONTENT_SCHEMA_VERSION,
  revision: 1,
  reviewState: "draft" as const,
  capabilityStatus: "experimental" as const,
  locale: GAME_CONTENT_DEFAULT_LOCALE,
  tags: ["public", "synthetic", "sprint-10"],
  owner: "Calypso's Promise maintainers",
  reviewRequirements: ["editorial", "canon", "accessibility", "safety"] as (
    "editorial" | "canon" | "accessibility" | "safety"
  )[],
  reviewApprovals: [],
  authorship: {
    mode: "ai-assisted-reviewed" as const,
    humanContributors: ["finalboss-tom"],
    aiTools: ["OpenAI ChatGPT"],
  },
  createdAt: TIMESTAMP,
  updatedAt: TIMESTAMP,
};

const aster: CalypsoContent = {
  ...sharedBase,
  id: "character.aster.synthetic-guide",
  kind: "character",
  title: "Aster, synthetic guide",
  summary:
    "A public synthetic presentation of Aster used to test the universal shell without a model provider.",
  canonReferences: ["canon.ogygia.aster"],
  dependencies: ["zone.lantern-shore.synthetic"],
  slug: "aster-synthetic-guide",
  displayName: "Aster",
  role: "Non-authoritative guide for the public synthetic shell",
  values: ["clarity", "agency", "refusal", "correction"],
  voiceRules: [
    "Offer a direct information path alongside narrative framing.",
    "State clearly that synthetic shell content is not Chronicle truth.",
    "Never pressure the player to continue, authenticate, or share data.",
  ],
  prohibitedBehaviors: [
    "Creating personal health claims",
    "Granting permission or canonical progress",
    "Representing a model or provider as active",
  ],
  zoneIds: ["zone.lantern-shore.synthetic"],
};

const lanternShore: CalypsoContent = {
  ...sharedBase,
  id: "zone.lantern-shore.synthetic",
  kind: "zone",
  title: "Lantern Shore",
  summary:
    "A public synthetic zone that introduces the shell, direct path, refusal, and exit behavior.",
  canonReferences: ["canon.ogygia.lantern-shore"],
  dependencies: [
    "character.aster.synthetic-guide",
    "scene.hearth.welcome.synthetic",
    "scene.hearth.direct-path.synthetic",
  ],
  slug: "lantern-shore-synthetic",
  guideCharacterIds: ["character.aster.synthetic-guide"],
  publicPurpose:
    "Demonstrate universal navigation and essential-content parity with no account or private data.",
  inWorldPurpose:
    "A calm arrival point where the player may listen, read directly, defer, refuse, or leave.",
  playerValue:
    "Learn what the shell can demonstrate and what authority remains inactive.",
  sceneIds: [
    "scene.hearth.welcome.synthetic",
    "scene.hearth.direct-path.synthetic",
  ],
  accessibilityNotes: [
    "All essential information is available as text.",
    "The direct path does not require animation, audio, imagery, gestures, or haptics.",
    "Refusal and exit remain visible choices.",
  ],
  unlock: {
    mode: "public",
    requiredContentIds: [],
  },
};

const welcomeDialogue: CalypsoContent = {
  ...sharedBase,
  id: "dialogue.aster.welcome.synthetic",
  kind: "dialogue",
  title: "Aster welcomes the player",
  summary:
    "Narrative welcome explaining the public synthetic and non-authoritative boundary.",
  canonReferences: ["canon.ogygia.aster", "canon.ogygia.lantern-shore"],
  dependencies: ["character.aster.synthetic-guide"],
  speakerId: "character.aster.synthetic-guide",
  text: "Welcome to Lantern Shore. This is a public synthetic demonstration. Nothing here becomes your Chronicle, a permission grant, or lasting progress.",
  plainLanguageText:
    "This is a demonstration. It does not save health data, grant permission, or create lasting progress.",
  emotionalIntent: "calm, transparent, and non-coercive",
};

const choiceDialogue: CalypsoContent = {
  ...sharedBase,
  id: "dialogue.aster.choice.synthetic",
  kind: "dialogue",
  title: "Aster explains the available choices",
  summary:
    "A concise explanation that narrative, direct information, deferral, refusal, and exit are equivalent agency paths.",
  canonReferences: ["canon.ogygia.aster"],
  dependencies: ["character.aster.synthetic-guide"],
  speakerId: "character.aster.synthetic-guide",
  text: "You may continue through the story, switch to the direct explanation, pause, refuse, or leave. No choice is treated as a health preference or evidence about you.",
  plainLanguageText:
    "You can continue, read the direct explanation, pause, say no, or leave. Your choice is not health data.",
  emotionalIntent: "agency-preserving and pressure-free",
};

const directDialogue: CalypsoContent = {
  ...sharedBase,
  id: "dialogue.aster.direct-path.synthetic",
  kind: "dialogue",
  title: "Direct shell explanation",
  summary:
    "Plain-language essential information equivalent to the narrative welcome.",
  canonReferences: ["canon.ogygia.aster"],
  dependencies: ["character.aster.synthetic-guide"],
  speakerId: "character.aster.synthetic-guide",
  text: "The Sprint 10 shell uses bundled public synthetic content and temporary presentation state. Accounts, private Chronicles, production AI, analytics, permissions, and authoritative rewards are inactive.",
  plainLanguageText:
    "The app uses demonstration content and temporary screen state. It has no accounts, private health records, production AI, analytics, permissions, or real rewards.",
  emotionalIntent: "direct, factual, and reassuring",
};

const welcomeScene: CalypsoContent = {
  ...sharedBase,
  id: "scene.hearth.welcome.synthetic",
  kind: "scene",
  title: "Hearth welcome",
  summary:
    "The first public synthetic Hearth scene with equivalent continuation, direct, deferral, and exit paths.",
  canonReferences: ["canon.ogygia.hearth"],
  dependencies: [
    "zone.lantern-shore.synthetic",
    "character.aster.synthetic-guide",
    "dialogue.aster.welcome.synthetic",
    "dialogue.aster.choice.synthetic",
  ],
  zoneId: "zone.lantern-shore.synthetic",
  sequence: 1,
  speakerIds: ["character.aster.synthetic-guide"],
  dialogueIds: [
    "dialogue.aster.welcome.synthetic",
    "dialogue.aster.choice.synthetic",
  ],
  choices: [
    {
      id: "choice.hearth.story.synthetic",
      label: "Continue through the story",
      consequenceText:
        "Moves to the same essential shell explanation through narrative framing.",
      disposition: "continue",
      nextSceneId: "scene.hearth.direct-path.synthetic",
    },
    {
      id: "choice.hearth.direct.synthetic",
      label: "Read the direct explanation",
      consequenceText:
        "Moves to the direct information path without changing authority or progress.",
      disposition: "continue",
      nextSceneId: "scene.hearth.direct-path.synthetic",
    },
    {
      id: "choice.hearth.defer.synthetic",
      label: "Pause for now",
      consequenceText:
        "Leaves the synthetic session pending without penalty or inference.",
      disposition: "defer",
      actionId: "action.shell.defer.synthetic",
    },
    {
      id: "choice.hearth.exit.synthetic",
      label: "Leave the demonstration",
      consequenceText:
        "Exits and discards temporary synthetic presentation state.",
      disposition: "exit",
      actionId: "action.shell.exit.synthetic",
    },
  ],
  prerequisiteStateIds: [],
  grantsStateIds: ["state.scene.hearth-welcome-viewed.synthetic"],
};

const directScene: CalypsoContent = {
  ...sharedBase,
  id: "scene.hearth.direct-path.synthetic",
  kind: "scene",
  title: "Direct information path",
  summary:
    "Essential shell information available without story traversal or media.",
  canonReferences: ["canon.ogygia.hearth"],
  dependencies: [
    "zone.lantern-shore.synthetic",
    "character.aster.synthetic-guide",
    "dialogue.aster.direct-path.synthetic",
  ],
  zoneId: "zone.lantern-shore.synthetic",
  sequence: 2,
  speakerIds: ["character.aster.synthetic-guide"],
  dialogueIds: ["dialogue.aster.direct-path.synthetic"],
  choices: [
    {
      id: "choice.hearth.open-map.synthetic",
      label: "Open the island map",
      consequenceText:
        "Requests shell navigation only; it creates no canonical progress.",
      disposition: "continue",
      actionId: "action.shell.open-island-map.synthetic",
    },
    {
      id: "choice.hearth.refuse.synthetic",
      label: "Do not continue",
      consequenceText:
        "Records no preference, health fact, punishment, or lost reward.",
      disposition: "refuse",
      actionId: "action.shell.refuse.synthetic",
    },
    {
      id: "choice.hearth.exit-direct.synthetic",
      label: "Exit",
      consequenceText:
        "Exits and discards temporary synthetic presentation state.",
      disposition: "exit",
      actionId: "action.shell.exit.synthetic",
    },
  ],
  prerequisiteStateIds: [],
  grantsStateIds: ["state.scene.direct-path-viewed.synthetic"],
};

const firstLanternQuest: CalypsoContent = {
  ...sharedBase,
  id: "quest.first-lantern.shell-demo.synthetic",
  kind: "quest",
  title: "First Lantern shell demonstration",
  summary:
    "A non-authoritative synthetic quest fixture for later quest-card and state-boundary testing.",
  canonReferences: ["canon.ogygia.first-lantern"],
  dependencies: [
    "zone.lantern-shore.synthetic",
    "character.aster.synthetic-guide",
    "scene.hearth.direct-path.synthetic",
  ],
  publicTitle: "Review the shell boundary",
  inWorldTitle: "Light a Demonstration Lantern",
  zoneId: "zone.lantern-shore.synthetic",
  guideCharacterId: "character.aster.synthetic-guide",
  connectedLoop: "improve-understanding",
  playerValue:
    "Understand what the public synthetic shell can and cannot make authoritative.",
  objective:
    "Review the direct shell explanation and choose whether to continue, defer, refuse, or exit.",
  progressDimension: "chronicle",
  requirements: [
    {
      id: "requirement.quest.shell-boundary-review.synthetic",
      type: "scene-completion",
      description:
        "The direct information scene was presented in the current synthetic session.",
      parameters: {
        sceneId: "scene.hearth.direct-path.synthetic",
        authority: "presentation-only",
        durable: false,
      },
    },
  ],
  completionRule: {
    mode: "all",
    requirementIds: ["requirement.quest.shell-boundary-review.synthetic"],
  },
  rewards: [
    {
      type: "restoration",
      targetId: "zone.lantern-shore.synthetic",
    },
  ],
  estimatedMinutes: 2,
  accessibilityVariants: [
    {
      id: "accessibility.quest.shell-boundary.direct-text.synthetic",
      label: "Direct text",
      description:
        "Presents every essential fact and choice as static text with no required audio, animation, image, gesture, or haptic.",
    },
  ],
  dataCategories: ["data.synthetic.session-choice"],
  permissionPurposeIds: [],
  safetyClassification: "general",
  feedback:
    "This demonstration may show a temporary completion state, but it creates no Chronicle entry, reward, or personal progress.",
  narrativeConsequence:
    "The shell may present Lantern Shore as visually restored for the current synthetic session only.",
  canDefer: true,
  canDecline: true,
  deferralPath:
    "Pause without penalty; temporary state may be discarded or restarted.",
  refusalPath:
    "Refuse without penalty, inference, conversion pressure, or loss of access to essential information.",
  analyticsHypothesis:
    "Inactive placeholder only: Sprint 10 collects no product analytics or inferred preferences.",
};

const authorityLesson: CalypsoContent = {
  ...sharedBase,
  id: "lesson.shell.authority-boundary.synthetic",
  kind: "lesson",
  title: "What this shell can prove",
  summary:
    "Direct educational content separating package identity and presentation evidence from personal authority.",
  canonReferences: ["canon.ogygia.player-promise"],
  dependencies: [],
  learningObjectives: [
    "Distinguish public synthetic content from private Chronicle truth.",
    "Identify refusal, correction, discard, and exit as valid paths.",
    "Recognize that client state cannot create authoritative progress or permission.",
  ],
  body: "Sprint 10 packages public synthetic content for consistent presentation across browser, iOS, and Android. Package identity can prove which public content revision was shown. It cannot prove a personal health fact, permission grant, Chronicle record, reward, or Longitudinal Intelligence result.",
  plainLanguageBody:
    "The same demonstration content can appear on web, iPhone, and Android. The app can identify that content, but it cannot create health facts, permissions, private records, real rewards, or personal conclusions.",
  claims: [
    {
      text: "Public package identity is not personal, permission, clinical, or causal authority.",
      evidenceClass: "general-education",
      sourceReferences: [],
    },
  ],
  comprehensionPrompt:
    "Which things remain inactive even when the shell shows a synthetic completion state?",
};

function provenance(): GameContentProvenance {
  return {
    informationClass: GAME_CONTENT_INFORMATION_CLASS,
    synthetic: true,
    sourceType: "repository-authored",
    sourcePath: FIXTURE_SOURCE,
    authoredAt: TIMESTAMP,
    authorship: {
      mode: "ai-assisted-reviewed",
      responsibleHumans: ["finalboss-tom"],
      tools: ["OpenAI ChatGPT"],
    },
  };
}

function accessibility(
  directPathSummary: string,
  plainLanguageSummary: string,
  textAlternative: string,
): GameContentAccessibility {
  return {
    directPathSummary,
    plainLanguageSummary,
    textAlternative,
    essentialMedia: {
      audio: false,
      image: false,
      motion: false,
      haptics: false,
      gesture: false,
    },
  };
}

function entry(
  content: CalypsoContent,
  directPathSummary: string,
  plainLanguageSummary: string,
  textAlternative: string,
): GameContentEntry {
  return {
    content,
    provenance: provenance(),
    accessibility: accessibility(
      directPathSummary,
      plainLanguageSummary,
      textAlternative,
    ),
    compatibility: {
      apiVersion: GAME_CONTENT_API_VERSION,
      platforms: [...PLATFORMS],
    },
  };
}

const entries: GameContentEntry[] = [
  entry(
    aster,
    "Aster is a presentation guide only.",
    "Aster explains the demonstration but cannot make decisions or health claims.",
    "Text label: Aster, a non-authoritative synthetic guide.",
  ),
  entry(
    lanternShore,
    "Lantern Shore is the public synthetic entry zone.",
    "This area demonstrates navigation and choices without saving personal data.",
    "Text description: a calm public arrival zone with direct, refusal, and exit paths.",
  ),
  entry(
    welcomeDialogue,
    welcomeDialogue.plainLanguageText ?? welcomeDialogue.summary,
    welcomeDialogue.plainLanguageText ?? welcomeDialogue.summary,
    welcomeDialogue.plainLanguageText ?? welcomeDialogue.summary,
  ),
  entry(
    choiceDialogue,
    choiceDialogue.plainLanguageText ?? choiceDialogue.summary,
    choiceDialogue.plainLanguageText ?? choiceDialogue.summary,
    choiceDialogue.plainLanguageText ?? choiceDialogue.summary,
  ),
  entry(
    directDialogue,
    directDialogue.plainLanguageText ?? directDialogue.summary,
    directDialogue.plainLanguageText ?? directDialogue.summary,
    directDialogue.plainLanguageText ?? directDialogue.summary,
  ),
  entry(
    welcomeScene,
    "Choose story, direct information, pause, or exit.",
    "Every path is optional and creates no health fact or lasting progress.",
    "Text-only scene with four visible choices: story, direct explanation, pause, and exit.",
  ),
  entry(
    directScene,
    "Read the shell boundary, open the map, refuse, or exit.",
    "The direct screen explains what is inactive and lets you say no or leave.",
    "Text-only direct-information scene with map, refusal, and exit choices.",
  ),
  entry(
    firstLanternQuest,
    "Review the shell boundary; completion is synthetic and temporary.",
    "This demonstration task does not create a private record, real reward, or lasting progress.",
    "Text-only quest card explaining its temporary, synthetic, non-authoritative state.",
  ),
  entry(
    authorityLesson,
    authorityLesson.plainLanguageBody,
    authorityLesson.plainLanguageBody,
    authorityLesson.plainLanguageBody,
  ),
];

export const GAME_CONTENT_ENTRIES: readonly GameContentEntry[] =
  deepFreeze(entries);

export const GAME_CONTENT_MANIFEST: GameContentPackageManifest = deepFreeze({
  id: GAME_CONTENT_PACKAGE_ID,
  version: GAME_CONTENT_PACKAGE_VERSION,
  apiVersion: GAME_CONTENT_API_VERSION,
  contentSchemaVersion: GAME_CONTENT_SCHEMA_VERSION,
  releaseStatus: "experimental",
  informationClass: GAME_CONTENT_INFORMATION_CLASS,
  synthetic: true,
  defaultLocale: GAME_CONTENT_DEFAULT_LOCALE,
  supportedLocales: [GAME_CONTENT_DEFAULT_LOCALE],
  contentIds: [...new Set(entries.map(({ content }) => content.id))],
  compatibility: {
    runtimeContract: "expo-sdk-57",
    platforms: [...PLATFORMS],
    requiresModelProvider: false,
    requiresNetwork: false,
  },
  migration: {
    strategy: "replace-public-package",
    compatibleFrom: [GAME_CONTENT_PACKAGE_VERSION],
    preserveSyntheticSessionState: false,
    unknownVersionBehavior: "reject-and-restart-synthetic-session",
  },
  authority: {
    contentIdentity: "package-only",
    clientState: "presentation-only",
    chronicle: false,
    permission: false,
    personalProgress: false,
    rewards: false,
    healthClaims: false,
    longitudinalIntelligence: "LI-V0-presentation-only",
  },
});

const entriesById = new Map<string, readonly GameContentEntry[]>();
for (const current of GAME_CONTENT_ENTRIES) {
  const existing = entriesById.get(current.content.id) ?? [];
  entriesById.set(current.content.id, [...existing, current]);
}

export function resolveGameContentLocale(requested?: string): string {
  if (
    requested !== undefined &&
    GAME_CONTENT_MANIFEST.supportedLocales.includes(requested)
  ) {
    return requested;
  }
  return GAME_CONTENT_MANIFEST.defaultLocale;
}

export function getGameContentEntry(
  id: string,
  requestedLocale?: string,
): GameContentEntry | undefined {
  const candidates = entriesById.get(id);
  if (candidates === undefined) return undefined;
  const locale = resolveGameContentLocale(requestedLocale);
  return (
    candidates.find(({ content }) => content.locale === locale) ??
    candidates.find(
      ({ content }) => content.locale === GAME_CONTENT_MANIFEST.defaultLocale,
    )
  );
}

export function listGameContentEntries(options?: {
  kind?: ContentKind;
  locale?: string;
}): readonly GameContentEntry[] {
  const locale = resolveGameContentLocale(options?.locale);
  return GAME_CONTENT_ENTRIES.filter(
    ({ content }) =>
      content.locale === locale &&
      (options?.kind === undefined || content.kind === options.kind),
  );
}

export function isCompatibleGameContentVersion(version: string): boolean {
  return GAME_CONTENT_MANIFEST.migration.compatibleFrom.includes(version);
}

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    const record = value as unknown as Record<string, unknown>;
    for (const key of Object.getOwnPropertyNames(record)) {
      deepFreeze(record[key]);
    }
    Object.freeze(value);
  }
  return value;
}
