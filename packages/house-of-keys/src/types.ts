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

export type ActionFamily =
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

export interface ActionDefinition extends DefinitionRevision {
  actionFamily: ActionFamily;
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
  exactPermissionRecordIds?: ReadonlyArray<NamespacedId>;
  recordLifecycleStates?: ReadonlyArray<string>;
  representedFrom?: IsoDateTime;
  representedThrough?: IsoDateTime;
  requiresProvenanceClosure?: boolean;
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
  transitionActorId: NamespacedId;
  authorityBasis: string;
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
  dataCategoryRevisions: Readonly<Record<string, number>>;
  selector?: ScopeSelector;
  actionIds: ReadonlyArray<NamespacedId>;
  actionRevisions: Readonly<Record<string, number>>;
  conditionIds: ReadonlyArray<NamespacedId>;
  duration: GrantDuration;
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
  revision: number;
  grantId: NamespacedId;
  grantRevision: number;
  grantingAuthorityId: NamespacedId;
  confirmedAt: IsoDateTime;
  decision: "confirmed" | "declined";
  dataClassification: DataClassification;
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

export type OperationBoundary =
  | "view"
  | "retrieve"
  | "create"
  | "transform"
  | "transmit"
  | "export"
  | "maintain"
  | "permission-administration";

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
  dataCategoryRevisions: Readonly<Record<string, number>>;
  selector?: ScopeSelector;
  actionIds: ReadonlyArray<NamespacedId>;
  actionRevisions: Readonly<Record<string, number>>;
  requestedConditionIds: ReadonlyArray<NamespacedId>;
  operationBoundary: OperationBoundary;
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

export type ReceiptEventKind =
  | "receipt.policy-requested"
  | "receipt.policy-allowed"
  | "receipt.policy-denied"
  | "receipt.policy-indeterminate"
  | "receipt.operation-attempted"
  | "receipt.access-completed"
  | "receipt.operation-completed"
  | "receipt.operation-partial"
  | "receipt.operation-failed"
  | "receipt.operation-stopped"
  | "receipt.lifecycle-changed"
  | "receipt.receipt-corrected";

export type ReceiptExecutionState =
  | "not-applicable"
  | "attempted"
  | "complete"
  | "partial"
  | "failed"
  | "stopped"
  | "unknown";

export interface GrantRevisionReference {
  grantId: NamespacedId;
  grantRevision: number;
}

export interface AccessReceipt {
  id: NamespacedId;
  contractVersion: HouseOfKeysContractVersion;
  revision: number;
  eventKind: ReceiptEventKind;
  lifecycleState: "active" | "corrected" | "invalidated";
  correlationId: NamespacedId;
  controlledResourceId: NamespacedId;
  subjectIds: ReadonlyArray<NamespacedId>;
  requesterId: NamespacedId;
  requesterKind: ActorKind;
  primaryRecipientId: NamespacedId;
  primaryRecipientRevision: number;
  performingActorId?: NamespacedId;
  processorId?: NamespacedId;
  receiptIssuerId: NamespacedId;
  purposeId: NamespacedId;
  purposeRevision: number;
  dataCategoryIds: ReadonlyArray<NamespacedId>;
  dataCategoryRevisions: Readonly<Record<string, number>>;
  selector?: ScopeSelector;
  actionIds: ReadonlyArray<NamespacedId>;
  actionRevisions: Readonly<Record<string, number>>;
  grantReferences: ReadonlyArray<GrantRevisionReference>;
  policyRequestId: NamespacedId;
  policyRequestRevision: number;
  policyDecisionId: NamespacedId;
  decisionOutcome: "allow" | "deny" | "indeterminate";
  executionState: ReceiptExecutionState;
  dataReleaseBoundaryCrossed: boolean;
  reasonCodes: ReadonlyArray<string>;
  requestedAt?: IsoDateTime;
  decidedAt?: IsoDateTime;
  attemptedAt?: IsoDateTime;
  releasedAt?: IsoDateTime;
  completedAt?: IsoDateTime;
  failedAt?: IsoDateTime;
  recordedAt: IsoDateTime;
  unresolvedState: ReadonlyArray<string>;
  personVisibleSummary: string;
  correctsReceiptId?: NamespacedId;
  dataClassification: DataClassification;
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
  receipts: ReadonlyArray<AccessReceipt>;
}

export interface PolicyEvaluationInput {
  contractVersion: HouseOfKeysContractVersion;
  evaluatorId: NamespacedId;
  evaluatorRevision: number;
  policyId: NamespacedId;
  policyRevision: number;
  decisionId: NamespacedId;
  correlationId: NamespacedId;
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
  decisionId: NamespacedId;
  correlationId: NamespacedId;
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
