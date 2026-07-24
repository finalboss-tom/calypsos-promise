export const CONTENT_SCHEMA_VERSION = "0.1.0" as const;

export type ContentStatus = "draft" | "review" | "approved" | "published" | "retired";
export type CapabilityStatus = "live" | "experimental" | "planned" | "long-horizon" | "deferred";

export interface ContentMetadata {
  id: string;
  schemaVersion: typeof CONTENT_SCHEMA_VERSION;
  version: number;
  status: ContentStatus;
  title: string;
  summary: string;
  locale: string;
  tags: string[];
  canonRefs: string[];
  owner: string;
  reviewers: string[];
  createdAt: string;
  updatedAt: string;
  historicalContext?: boolean;
}

export interface ZoneContent extends ContentMetadata {
  kind: "zone";
  slug: string;
  guideCharacterIds: string[];
  publicPurpose: string;
  inWorldPurpose: string;
  unlockRuleIds: string[];
  sceneIds: string[];
  accessibilityNotes: string[];
}

export interface CharacterContent extends ContentMetadata {
  kind: "character";
  slug: string;
  role: string;
  values: string[];
  voiceRules: string[];
  prohibitedBehaviors: string[];
  zoneIds: string[];
}

export interface SceneChoice {
  id: string;
  label: string;
  nextSceneId?: string;
  actionId?: string;
  consequenceText?: string;
  refusal?: boolean;
}

export interface SceneContent extends ContentMetadata {
  kind: "scene";
  zoneId: string;
  speakerIds: string[];
  dialogueIds: string[];
  choices: SceneChoice[];
  prerequisiteIds: string[];
  grantsStateIds: string[];
  capabilityStatus: CapabilityStatus;
}

export interface DialogueContent extends ContentMetadata {
  kind: "dialogue";
  speakerId: string;
  text: string;
  plainLanguageText?: string;
  emotionalIntent: string;
}

export interface QuestRequirement {
  id: string;
  type: "player-confirmation" | "record-exists" | "lesson-complete" | "permission-reviewed" | "scene-complete" | "manual-action";
  parameters: Record<string, string | number | boolean>;
}

export interface QuestReward {
  type: "renown" | "laurel" | "restoration" | "unlock" | "clue";
  amount?: number;
  targetId?: string;
}

export interface QuestContent extends ContentMetadata {
  kind: "quest";
  zoneId: string;
  playerValue: string;
  requirements: QuestRequirement[];
  rewards: QuestReward[];
  estimatedMinutes: number;
  optional: boolean;
  canDecline: boolean;
  safetyNotes: string[];
  privacyNotes: string[];
}

export interface LessonContent extends ContentMetadata {
  kind: "lesson";
  learningObjectives: string[];
  body: string;
  plainLanguageBody: string;
  evidenceRefs: string[];
  reviewDomains: Array<"clinical" | "privacy" | "security" | "accessibility" | "canon">;
}

export interface NotificationContent extends ContentMetadata {
  kind: "notification";
  channel: "push" | "email" | "in-app";
  body: string;
  destinationRoute: string;
  urgency: "low" | "normal" | "time-sensitive";
  expiresAfterMinutes?: number;
  mayInterrupt: boolean;
  shameFree: true;
}

export type CalypsoContent = ZoneContent | CharacterContent | SceneContent | DialogueContent | QuestContent | LessonContent | NotificationContent;

export function isPublishable(content: CalypsoContent): boolean {
  return content.status === "approved" || content.status === "published";
}
