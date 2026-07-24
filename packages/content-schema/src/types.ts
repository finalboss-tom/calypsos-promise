export const CONTENT_SCHEMA_VERSION = "1.0.0" as const;

export type FoundationStatus =
  | "FROZEN"
  | "BASELINE"
  | "PROPOSED"
  | "DEFERRED"
  | "RETIRED";

export type ReviewState =
  | "draft"
  | "editorial-review"
  | "specialist-review"
  | "approved"
  | "retired";

export type CapabilityStatus =
  | "live"
  | "experimental"
  | "planned"
  | "long-horizon"
  | "deferred";

export type ContentKind =
  | "character"
  | "zone"
  | "scene"
  | "dialogue"
  | "quest"
  | "lesson"
  | "notification";

export interface Authorship {
  mode: "human-authored" | "ai-assisted-reviewed";
  reviewedBy: string[];
}

export interface SpoilerGate {
  minimumTide?: number;
  requiredClueIds?: string[];
  requiredContentIds?: string[];
}

export interface BaseContent {
  id: string;
  kind: ContentKind;
  schemaVersion: typeof CONTENT_SCHEMA_VERSION;
  revision: number;
  foundationStatus: FoundationStatus;
  reviewState: ReviewState;
  capabilityStatus: CapabilityStatus;
  title: string;
  summary: string;
  locale: string;
  tags: string[];
  canonReferences: string[];
  dependencies: string[];
  owner: string;
  reviewers: string[];
  createdAt: string;
  updatedAt: string;
  authorship: Authorship;
  historicalContext?: boolean;
  spoilerGate?: SpoilerGate;
  supersedes?: string;
  replacedBy?: string;
}

export interface CharacterContent extends BaseContent {
  kind: "character";
  slug: string;
  displayName: string;
  role: string;
  values: string[];
  voiceRules: string[];
  prohibitedBehaviors: string[];
  zoneIds: string[];
}

export interface ZoneContent extends BaseContent {
  kind: "zone";
  slug: string;
  guideCharacterIds: string[];
  publicPurpose: string;
  inWorldPurpose: string;
  playerValue: string;
  systemIds: string[];
  sceneIds: string[];
  accessibilityNotes: string[];
  unlock: {
    mode: "public" | "story" | "capability-gated";
    requiredContentIds: string[];
  };
}

export interface SceneChoice {
  id: string;
  label: string;
  consequenceText: string;
  nextSceneId?: string;
  actionId?: string;
  refusal: boolean;
}

export interface SceneContent extends BaseContent {
  kind: "scene";
  zoneId: string;
  sequence: number;
  speakerIds: string[];
  dialogueIds: string[];
  choices: SceneChoice[];
  prerequisiteStateIds: string[];
  grantsStateIds: string[];
}

export interface DialogueContent extends BaseContent {
  kind: "dialogue";
  speakerId: string;
  text: string;
  plainLanguageText?: string;
  emotionalIntent: string;
}

export interface QuestRequirement {
  id: string;
  type:
    | "player-confirmation"
    | "chronicle-record"
    | "learning-completion"
    | "permission-action"
    | "scene-completion"
    | "manual-action";
  parameters: Record<string, string | number | boolean>;
}

export interface QuestReward {
  type:
    | "renown"
    | "vitality"
    | "chronicle"
    | "fellowship"
    | "laurel"
    | "restoration"
    | "story-unlock"
    | "clue";
  amount?: number;
  targetId?: string;
}

export interface QuestContent extends BaseContent {
  kind: "quest";
  zoneId: string;
  playerValue: string;
  objective: string;
  requirements: QuestRequirement[];
  rewards: QuestReward[];
  estimatedMinutes: number;
  optional: boolean;
  canDecline: true;
  refusalPath: string;
  safetyNotes: string[];
  privacyNotes: string[];
}

export interface LessonClaim {
  text: string;
  evidenceClass: "general-education" | "descriptive" | "uncertain";
  sourceReferences: string[];
}

export interface LessonContent extends BaseContent {
  kind: "lesson";
  learningObjectives: string[];
  body: string;
  plainLanguageBody: string;
  claims: LessonClaim[];
  comprehensionPrompt: string;
  reviewDomains: Array<
    "clinical" | "privacy" | "security" | "accessibility" | "canon"
  >;
}

export interface NotificationContent extends BaseContent {
  kind: "notification";
  channel: "push" | "email" | "in-app";
  purpose: "quest" | "story" | "permission" | "safety" | "system";
  body: string;
  destinationRoute: string;
  urgency: "low" | "normal" | "time-sensitive";
  expiresAfterMinutes?: number;
  mayInterrupt: boolean;
  shameFree: true;
  pressureFreeAlternative: string;
}

export type CalypsoContent =
  | CharacterContent
  | ZoneContent
  | SceneContent
  | DialogueContent
  | QuestContent
  | LessonContent
  | NotificationContent;

export interface ValidationIssue {
  path: string;
  message: string;
}

export interface ValidationResult<T> {
  ok: boolean;
  value?: T;
  issues: ValidationIssue[];
}
