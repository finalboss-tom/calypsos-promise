export const CONTENT_SCHEMA_VERSION = "0.1.0" as const;

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

export type ReviewDomain =
  | "editorial"
  | "canon"
  | "privacy"
  | "safety"
  | "clinical"
  | "accessibility"
  | "security"
  | "research-governance"
  | "economic-claims";

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
  humanContributors: string[];
  aiTools?: string[];
}

export interface ReviewApproval {
  domain: ReviewDomain;
  reviewer: string;
  reviewedAt: string;
  notes?: string;
}

export interface SpoilerGate {
  minimumTide?: number;
  requiredClueIds?: string[];
  requiredContentIds?: string[];
}

export interface BaseContent {
  id: string;
  schemaVersion: typeof CONTENT_SCHEMA_VERSION;
  revision: number;
  reviewState: ReviewState;
  capabilityStatus: CapabilityStatus;
  kind: ContentKind;
  title: string;
  summary: string;
  locale: string;
  tags: string[];
  canonReferences: string[];
  dependencies: string[];
  owner: string;
  reviewRequirements: ReviewDomain[];
  reviewApprovals: ReviewApproval[];
  authorship: Authorship;
  createdAt: string;
  updatedAt: string;
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
  sceneIds: string[];
  accessibilityNotes: string[];
  unlock: {
    mode: "public" | "story" | "capability-gated";
    requiredContentIds: string[];
  };
}

export type ChoiceDisposition = "continue" | "defer" | "refuse" | "exit";

export interface SceneChoice {
  id: string;
  label: string;
  consequenceText: string;
  disposition: ChoiceDisposition;
  nextSceneId?: string;
  actionId?: string;
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

export type ConnectedLoop =
  | "build-chronicle"
  | "improve-understanding"
  | "control-and-share-value";

export type ProgressDimension =
  | "vitality"
  | "chronicle"
  | "fellowship"
  | "renown";

export type QuestRequirementType =
  | "player-confirmation"
  | "chronicle-record"
  | "learning-completion"
  | "permission-review"
  | "scene-completion"
  | "manual-action";

export interface QuestRequirement {
  id: string;
  type: QuestRequirementType;
  description: string;
  parameters: Record<string, string | number | boolean>;
}

export interface QuestCompletionRule {
  mode: "all" | "any";
  requirementIds: string[];
}

export interface ProgressReward {
  type: "progress";
  dimension: ProgressDimension;
  amount: number;
}

export interface LaurelReward {
  type: "laurel";
  amount: number;
  laurelId?: string;
}

export interface RestorationReward {
  type: "restoration";
  targetId: string;
}

export interface StoryUnlockReward {
  type: "story-unlock";
  targetId: string;
}

export interface ClueReward {
  type: "clue";
  targetId: string;
}

export type QuestReward =
  | ProgressReward
  | LaurelReward
  | RestorationReward
  | StoryUnlockReward
  | ClueReward;

export interface AccessibilityVariant {
  id: string;
  label: string;
  description: string;
}

export type SafetyClassification =
  | "general"
  | "sensitive"
  | "specialist-review-required";

export interface QuestContent extends BaseContent {
  kind: "quest";
  publicTitle: string;
  inWorldTitle: string;
  zoneId: string;
  guideCharacterId: string;
  connectedLoop: ConnectedLoop;
  playerValue: string;
  objective: string;
  progressDimension: ProgressDimension;
  requirements: QuestRequirement[];
  completionRule: QuestCompletionRule;
  rewards: QuestReward[];
  estimatedMinutes: number;
  accessibilityVariants: AccessibilityVariant[];
  dataCategories: string[];
  permissionPurposeIds: string[];
  safetyClassification: SafetyClassification;
  feedback: string;
  narrativeConsequence: string;
  canDefer: true;
  canDecline: true;
  deferralPath: string;
  refusalPath: string;
  analyticsHypothesis: string;
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
