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
  title: string;
  summary: string;
  canonReferences: string[];
  tags: string[];
  authorship: Authorship;
  spoilerGate?: SpoilerGate;
}

export interface CharacterContent extends BaseContent {
  kind: "character";
  displayName: string;
  role: string;
  homeZoneIds: string[];
  voicePrinciples: string[];
  forbiddenBehaviors: string[];
}

export interface ZoneContent extends BaseContent {
  kind: "zone";
  guideIds: string[];
  publicPurpose: string;
  playerValue: string;
  systemIds: string[];
  unlock: {
    mode: "public" | "story" | "capability-gated";
    requiredContentIds: string[];
  };
}

export interface SceneChoice {
  id: string;
  label: string;
  consequence: string;
  mayRefuse: boolean;
}

export interface SceneContent extends BaseContent {
  kind: "scene";
  zoneId: string;
  sequence: number;
  beatIds: string[];
  choices: SceneChoice[];
  completionContentIds: string[];
}

export interface DialogueLine {
  id: string;
  speakerId: string;
  text: string;
  canonReferences: string[];
}

export interface DialogueContent extends BaseContent {
  kind: "dialogue";
  sceneId: string;
  lines: DialogueLine[];
}

export interface QuestContent extends BaseContent {
  kind: "quest";
  zoneId: string;
  objective: string;
  evidence: {
    type: "player-confirmation" | "chronicle-record" | "learning-completion" | "permission-action";
    minimumCount: number;
  };
  rewards: Array<{
    type: "renown" | "vitality" | "chronicle" | "fellowship" | "laurel" | "story-unlock";
    amount?: number;
    contentId?: string;
  }>;
  safetyBoundaries: string[];
  refusalPath: string;
}

export interface LessonContent extends BaseContent {
  kind: "lesson";
  learningObjectives: string[];
  claims: Array<{
    text: string;
    evidenceClass: "general-education" | "descriptive" | "uncertain";
    sourceReferences: string[];
  }>;
  comprehensionPrompt: string;
}

export interface NotificationContent extends BaseContent {
  kind: "notification";
  purpose: "quest" | "story" | "permission" | "safety" | "system";
  body: string;
  actionLabel?: string;
  route?: string;
  quietHoursEligible: boolean;
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
