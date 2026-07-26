import type { HouseOfKeysContractVersion } from "./version.js";

export type NamespacedId = `${string}.${string}`;
export type IsoDateTime = string;

export type DataClassification = "public" | "synthetic" | "private";

export type ActorKind =
  | "controlling-person"
  | "requester"
  | "recipient"
  | "performing-actor"
  | "processor"
  | "policy-evaluator"
  | "receipt-issuer"
  | "ai-assistant"
  | "connector"
  | "operator"
  | "maintainer"
  | "unknown";

export interface ActorReference {
  id: NamespacedId;
  kind: ActorKind;
  displayLabel?: string;
}

export type DefinitionLifecycleState =
  | "proposed"
  | "active"
  | "deprecated"
  | "superseded"
  | "retired"
  | "invalidated";

export interface DefinitionRevision {
  id: NamespacedId;
  revision: number;
  status: DefinitionLifecycleState;
  publicName: string;
  directExplanation: string;
  grantable: boolean;
  familyId?: NamespacedId;
}

export type PurposeClass =
  | "personal-core"
  | "personal-optional"
  | "service-stewardship"
  | "secondary-public-good"
  | "secondary-compensated"
  | "secondary-commercial"
  | "mandatory-holdpoint";

export interface PurposeDefinition extends DefinitionRevision {
  purposeClass: PurposeClass;
  excludedUses: ReadonlyArray<string>;
}

export type PermissionTruthClass =
  | "chronicle"
  | "source"
  | "derived"
  | "interpretive"
  | "permission";

export interface DataCategoryDefinition extends DefinitionRevision {
  truthClass: PermissionTruthClass;
  includedContent: ReadonlyArray<string>;
  excludedContent: ReadonlyArray<string>;
}

export interface RecipientDefinition extends DefinitionRevision {
  recipientKind:
    | "person-self"
    | "first-party-bounded"
    | "named-external"
    | "reviewed-bounded-class"
    | "unresolved";
  excludedParties: ReadonlyArray<string>;
}

export interface ActionDefinition extends DefinitionRevision {
  actionFamily:
    | "read"
    | "create"
    | "transform"
    | "derive"
    | "transmit"
    | "export"
    | "maintain"
    | "correct"
    | "delete"
    | "permission";
}

export type GrantLifecycleState =
  | "proposed"
  | "pending-confirmation"
  | "active"
  | "suspended"
  | "expired"
  | "exhausted"
  | "withdrawn"
  | "declined"
  | "superseded"
  | "invalidated";

export interface FixedIntervalDuration {
  kind: "fixed-interval";
  startsAt: IsoDateTime;
  endsAt: IsoDateTime;
}

export interface SingleUseDuration {
  kind: "single-use";
  startsAt: IsoDateTime;
  endsAt: IsoDateTime;
}

export interface BoundedCountDuration {
  kind: "bounded-count";
  startsAt: IsoDateTime;
  endsAt: IsoDateTime;
  maximumUses: number;
}

export interface ReviewBoundedDuration {
  kind: "review-bounded";
  startsAt: IsoDateTime;
  reviewAt: IsoDateTime;
}

export interface DelayedActivationDuration {
  kind: "delayed-activation";
  activationConditionId: NamespacedId;
  expiresAt: IsoDateTime;
}

export interface SessionBoundedDuration {
  kind: "session-bounded";
  sessionId: NamespacedId;
  absoluteEndsAt: IsoDateTime;
}

export type GrantDuration =
  | FixedIntervalDuration
  | SingleUseDuration
  | BoundedCountDuration
  | ReviewBoundedDuration
  | DelayedActivationDuration
  | SessionBoundedDuration;

export interface ScopeSelector {
  exactRecordIds?: ReadonlyArray<NamespacedId>;
  exactVariableIds?: ReadonlyArray<NamespacedId>;
  exactSourceArtifactIds?: ReadonlyArray<NamespacedId>;
  exactDocumentVersionIds?: ReadonlyArray<NamespacedId>;
  exactAttachmentIds?: ReadonlyArray<NamespacedId>;
  representedFrom?: IsoDateTime;
  representedThrough?: IsoDateTime;
}

export interface GrantCondition {
  id: NamespacedId;
  kind:
    | "requester-equals-recipient"
    | "requester-equals-performing-actor"
    | "named-processor-only"
    | "no-onward-transmission"
    | "no-external-retention"
    | "no-model-training"
    | "exact-method"
    | "exact-export-format"
    | "player-visible-receipt-required";
  expectedValue: string | boolean;
}

export interface PermissionGrant {
  id: NamespacedId;
  contractVersion: HouseOfKeysContractVersion;
  revision: number;
  lifecycleState: GrantLifecycleState;
  grantingAuthorityId: NamespacedId;
  controlledResourceId: NamespacedId;
  subjectIds: ReadonlyArray<NamespacedId>;
  purposeId: NamespacedId;
  purposeRevision: number;
  primaryRecipientId: NamespacedId;
  primaryRecipientRevision: number;
  permittedPerformingActorIds?: ReadonlyArray<NamespacedId>;
  permittedProcessorIds?: ReadonlyArray<NamespacedId>;
  dataCategoryIds: ReadonlyArray<NamespacedId>;
  dataCategoryRevisions: Readonly<Record<string, number>>;
  selector?: ScopeSelector;
  actionIds: ReadonlyArray<NamespacedId>;
  actionRevisions: Readonly<Record<string, number>>;
  conditions: ReadonlyArray<GrantCondition>;
  duration: GrantDuration;
  explanationSnapshotId: NamespacedId;
  comprehensionEvidenceId?: NamespacedId;
  confirmationEvidenceId: NamespacedId;
  requiresComprehension: boolean;
  optionality: "essential-personal" | "optional";
  dataClassification: DataClassification;
}

export interface LifecycleEvent {
  id: NamespacedId;
  grantId: NamespacedId;
  grantRevision: number;
  previousState: GrantLifecycleState;
  nextState: GrantLifecycleState;
  effectiveAt: IsoDateTime;
  recordedAt: IsoDateTime;
  reasonCode: NamespacedId;
}

export interface ExplanationSnapshot {
  id: NamespacedId;
  revision: number;
  grantId: NamespacedId;
  grantRevision: number;
  purposeId: NamespacedId;
  purposeRevision: number;
  recipientId: NamespacedId;
  recipientRevision: number;
  dataCategoryIds: ReadonlyArray<NamespacedId>;
  actionIds: ReadonlyArray<NamespacedId>;
  durationSummary: string;
  directSummary: string;
  narrativeSummary?: string;
  materiallyEquivalent: boolean;
  optionality: "essential-personal" | "optional";
  locale: string;
  dataClassification: DataClassification;
}

export type ComprehensionEvidenceStatus =
  | "not-started"
  | "in-progress"
  | "satisfied"
  | "not-satisfied"
  | "deferred"
  | "declined"
  | "inaccessible"
  | "indeterminate"
  | "invalidated";

export interface ComprehensionEvidence {
  id: NamespacedId;
  revision: number;
  grantId: NamespacedId;
  grantRevision: number;
  explanationSnapshotId: NamespacedId;
  explanationRevision: number;
  ruleId: NamespacedId;
  ruleRevision: number;
  status: ComprehensionEvidenceStatus;
  requiredConceptIds: ReadonlyArray<NamespacedId>;
  satisfiedConceptIds: ReadonlyArray<NamespacedId>;
  recordedAt: IsoDateTime;
  dataClassification: DataClassification;
}

export interface ConfirmationEvidence {
  id: NamespacedId;
  grantId: NamespacedId;
  grantRevision: number;
  grantingAuthorityId: NamespacedId;
  confirmedAt: IsoDateTime;
  decision: "confirmed" | "declined";
}

export interface CapacitySnapshot {
  grantId: NamespacedId;
  grantRevision: number;
  status: "available" | "exhausted" | "conflicting" | "unknown";
  usedCount?: number;
  remainingCount?: number;
  recordedAt: IsoDateTime;
}

export interface ConditionFact {
  conditionId: NamespacedId;
  status: "satisfied" | "false" | "unknown" | "conflicting";
  actualValue?: string | boolean;
}

export interface PolicyRequest {
  id: NamespacedId;
  revision: number;
  requesterId: NamespacedId;
  requesterKind: ActorKind;
  primaryRecipientId: NamespacedId;
  primaryRecipientRevision: number;
  performingActorId?: NamespacedId;
  processorId?: NamespacedId;
  controlledResourceId: NamespacedId;
  subjectIds: ReadonlyArray<NamespacedId>;
  purposeId: NamespacedId;
  purposeRevision: number;
  dataCategoryIds: ReadonlyArray<NamespacedId>;
  selector?: ScopeSelector;
  actionIds: ReadonlyArray<NamespacedId>;
  requestedConditionIds: ReadonlyArray<NamespacedId>;
  operationBoundary:
    | "view"
    | "retrieve"
    | "transform"
    | "transmit"
    | "export"
    | "maintain"
    | "permission-administration";
  receiptRequired: boolean;
  requestedAt: IsoDateTime;
}

export interface PolicyBundle {
  contractVersion: HouseOfKeysContractVersion;
  evaluatorId: NamespacedId;
  evaluatorRevision: number;
  policyId: NamespacedId;
  policyRevision: number;
  normalizationRevision: number;
  purposes: ReadonlyArray<PurposeDefinition>;
  dataCategories: ReadonlyArray<DataCategoryDefinition>;
  recipients: ReadonlyArray<RecipientDefinition>;
  actions: ReadonlyArray<ActionDefinition>;
  prohibitedPurposeIds: ReadonlyArray<NamespacedId>;
  prohibitedActionIds: ReadonlyArray<NamespacedId>;
  fixtureDataClassification: DataClassification;
}

export interface HouseOfKeysSchemaBundle {
  contractVersion: HouseOfKeysContractVersion;
  actors: ReadonlyArray<ActorReference>;
  policyBundle: PolicyBundle;
  grants: ReadonlyArray<PermissionGrant>;
  lifecycleEvents: ReadonlyArray<LifecycleEvent>;
  explanations: ReadonlyArray<ExplanationSnapshot>;
  comprehensionEvidence: ReadonlyArray<ComprehensionEvidence>;
  confirmations: ReadonlyArray<ConfirmationEvidence>;
}

export interface PolicyEvaluationInput {
  contractVersion: HouseOfKeysContractVersion;
  evaluatorId: NamespacedId;
  evaluatorRevision: number;
  policyId: NamespacedId;
  policyRevision: number;
  evaluationTime: IsoDateTime;
  executionWindowEndsAt?: IsoDateTime;
  request: PolicyRequest;
  bundle: HouseOfKeysSchemaBundle;
  candidateGrantIds?: ReadonlyArray<NamespacedId>;
  conditionFacts: ReadonlyArray<ConditionFact>;
  capacitySnapshots: ReadonlyArray<CapacitySnapshot>;
}

export type PolicyDecisionOutcome = "allow" | "deny" | "indeterminate";

export interface GrantEvaluationFinding {
  grantId: NamespacedId;
  grantRevision: number;
  independentlyAuthorizes: boolean;
  reasonCodes: ReadonlyArray<string>;
}

export interface PolicyDecision {
  outcome: PolicyDecisionOutcome;
  contractVersion: HouseOfKeysContractVersion;
  evaluatorId: NamespacedId;
  evaluatorRevision: number;
  policyId: NamespacedId;
  policyRevision: number;
  requestId: NamespacedId;
  requestRevision: number;
  evaluatedAt: IsoDateTime;
  independentlyAuthorizingGrantIds: ReadonlyArray<NamespacedId>;
  renderingGrantId?: NamespacedId;
  grantFindings: ReadonlyArray<GrantEvaluationFinding>;
  reasonCodes: ReadonlyArray<string>;
  missingOrConflictingFacts: ReadonlyArray<string>;
  reEvaluationRequiredBeforeExecution: boolean;
  receiptRequired: boolean;
}

export interface SyntheticPolicyScenario {
  id: NamespacedId;
  description: string;
  input: PolicyEvaluationInput;
  expectedOutcome: PolicyDecisionOutcome;
  expectedReasonCodes: ReadonlyArray<string>;
}
