import type { LivingChronicleSchemaVersion } from "./version.js";

export type NamespacedId = `${string}.${string}`;
export type IsoDate = string;
export type IsoDateTime = string;
export type DecimalText = string;

export type ChronicleId = NamespacedId;
export type ChronicleRecordId = NamespacedId;
export type SubjectId = NamespacedId;
export type ActorId = NamespacedId;
export type VariableId = NamespacedId;
export type UnitId = NamespacedId;
export type UnitDimensionId = NamespacedId;
export type CategorySetId = NamespacedId;
export type CategoryId = NamespacedId;
export type ScaleId = NamespacedId;
export type ScaleValueId = NamespacedId;
export type SourceArtifactId = NamespacedId;
export type SourceVersionId = NamespacedId;
export type SourceLocatorId = NamespacedId;
export type ProvenanceEventId = NamespacedId;
export type TransformationId = NamespacedId;
export type DerivationId = NamespacedId;
export type ConfirmationEventId = NamespacedId;
export type RelationshipId = NamespacedId;
export type AttachmentId = NamespacedId;
export type StoredRepresentationId = NamespacedId;
export type CustodyReferenceId = NamespacedId;
export type DerivedRepresentationId = NamespacedId;
export type ExportRequestId = NamespacedId;
export type ExportPlanId = NamespacedId;
export type ExportArtifactId = NamespacedId;
export type ExportManifestId = NamespacedId;
export type ExportDeliveryId = NamespacedId;
export type DeletionRequestId = NamespacedId;
export type RetentionExceptionId = NamespacedId;
export type TombstoneId = NamespacedId;
export type ExternalReferenceId = NamespacedId;
export type MethodId = NamespacedId;
export type PolicyId = NamespacedId;

export interface RevisionMetadata {
  schemaVersion: LivingChronicleSchemaVersion;
  revision: number;
  createdAt: IsoDateTime;
  createdBy: ActorId;
  updatedAt: IsoDateTime;
  updatedBy: ActorId;
}

export type DataClassification = "private" | "public" | "synthetic";

export type ActorKind =
  | "controlling-person"
  | "delegated-human"
  | "connector"
  | "deterministic-domain-service"
  | "import-process"
  | "ai-drafting-tool"
  | "operator"
  | "maintainer"
  | "external-source"
  | "unknown";

export interface ActorReference {
  id: ActorId;
  kind: ActorKind;
  displayLabel?: string;
}

export type SubjectKind =
  | "controlling-person"
  | "other-person"
  | "body-site"
  | "environment"
  | "object"
  | "context";

export interface SubjectReference {
  id: SubjectId;
  kind: SubjectKind;
  label?: string;
}

export type AuthorityState = "proposed" | "confirmed";

export type ChronicleRecordLifecycleState =
  | "active"
  | "superseded"
  | "retracted"
  | "deletion-requested"
  | "deletion-processing"
  | "retained-under-exception"
  | "deleted";

export type AssertionClass =
  | "direct-observation"
  | "self-report"
  | "recollection"
  | "imported-claim"
  | "deterministic-calculation"
  | "descriptive-association"
  | "inference"
  | "intention"
  | "reflection";

export type RecordFamily =
  | "observation"
  | "interval"
  | "reflection"
  | "goal"
  | "derived"
  | "association"
  | "inference";

export interface UncertaintyDescriptor {
  kind:
    | "none-declared"
    | "source-reported"
    | "estimated"
    | "model-confidence"
    | "range"
    | "unknown";
  confidence?: number;
  lowerBound?: DecimalText;
  upperBound?: DecimalText;
  explanation?: string;
  methodId?: MethodId;
  methodVersion?: string;
}

export interface ExactInstantTemporalAssertion {
  kind: "exact-instant";
  instant: IsoDateTime;
  timeZone?: string;
  sourceText?: string;
}

export interface CalendarDateTemporalAssertion {
  kind: "calendar-date";
  date: IsoDate;
  calendar?: string;
  sourceText?: string;
}

export interface LocalDateTimeTemporalAssertion {
  kind: "local-date-time";
  localDateTime: string;
  timeZone?: string;
  offset?: string;
  resolutionState: "resolved" | "unresolved" | "ambiguous";
  sourceText?: string;
}

export interface ApproximateTemporalAssertion {
  kind: "approximate";
  earliest?: IsoDateTime | IsoDate;
  latest?: IsoDateTime | IsoDate;
  centralEstimate?: IsoDateTime | IsoDate;
  precision:
    | "minute"
    | "hour"
    | "day"
    | "week"
    | "month"
    | "season"
    | "year"
    | "life-phase"
    | "unknown";
  sourceText: string;
}

export interface NamedPeriodTemporalAssertion {
  kind: "named-period";
  periodKind: "month" | "season" | "school-year" | "life-phase" | "custom";
  label: string;
  start?: IsoDate | IsoDateTime;
  end?: IsoDate | IsoDateTime;
  sourceText?: string;
}

export type TemporalBoundary =
  | ExactInstantTemporalAssertion
  | CalendarDateTemporalAssertion
  | LocalDateTimeTemporalAssertion
  | ApproximateTemporalAssertion
  | NamedPeriodTemporalAssertion;

export interface IntervalTemporalAssertion {
  kind: "interval";
  start?: TemporalBoundary;
  end?: TemporalBoundary;
  startBoundary: "inclusive" | "exclusive" | "unknown";
  endBoundary: "inclusive" | "exclusive" | "unknown";
  sourceText?: string;
}

export interface RelativeTemporalAssertion {
  kind: "relative";
  expression: string;
  anchorRecordId?: ChronicleRecordId;
  anchorTemporalAssertion?: TemporalBoundary;
  resolvedTemporalAssertion?: TemporalBoundary | IntervalTemporalAssertion;
}

export interface RecurringTemporalAssertion {
  kind: "recurring";
  sourceRule: string;
  normalizedRule?: string;
  timeZone?: string;
  start?: TemporalBoundary;
  end?: TemporalBoundary;
}

export type TemporalAssertion =
  | ExactInstantTemporalAssertion
  | CalendarDateTemporalAssertion
  | LocalDateTimeTemporalAssertion
  | IntervalTemporalAssertion
  | ApproximateTemporalAssertion
  | NamedPeriodTemporalAssertion
  | RelativeTemporalAssertion
  | RecurringTemporalAssertion;

export interface QuantityValue {
  kind: "quantity";
  magnitude: DecimalText;
  unitId: UnitId;
  sourceText?: string;
  precision?: number;
  significantDigits?: number;
}

export interface IntegerCountValue {
  kind: "integer-count";
  value: number;
  countUnitId?: UnitId;
}

export interface DecimalValue {
  kind: "decimal";
  value: DecimalText;
  precision?: number;
}

export interface BooleanValue {
  kind: "boolean";
  value: boolean;
}

export interface CodedCategoryValue {
  kind: "coded-category";
  categoryId: CategoryId;
  sourceLabel?: string;
}

export interface OrdinalValue {
  kind: "ordinal";
  scaleId: ScaleId;
  valueId: ScaleValueId;
  displayNumber?: DecimalText;
}

export interface TextValue {
  kind: "text";
  text: string;
  locale: string;
  format?: "plain" | "markdown";
}

export interface NumericRangeValue {
  kind: "numeric-range";
  lower?: DecimalText;
  upper?: DecimalText;
  lowerInclusive: boolean;
  upperInclusive: boolean;
  unitId?: UnitId;
}

export interface DurationValue {
  kind: "duration";
  magnitude: DecimalText;
  unitId: UnitId;
}

export interface TemporalValue {
  kind: "temporal-value";
  temporalAssertion: TemporalAssertion;
}

export type AbsentValueReason =
  | "unknown"
  | "not-measured"
  | "not-collected"
  | "not-applicable"
  | "withheld-by-person"
  | "source-unavailable"
  | "below-detection-limit"
  | "above-measurement-limit"
  | "invalid-source-value";

export interface AbsentValue {
  kind: "absent";
  reason: AbsentValueReason;
  explanation?: string;
}

export type ChronicleValue =
  | QuantityValue
  | IntegerCountValue
  | DecimalValue
  | BooleanValue
  | CodedCategoryValue
  | OrdinalValue
  | TextValue
  | NumericRangeValue
  | DurationValue
  | TemporalValue
  | AbsentValue;

export type ValueShape = ChronicleValue["kind"];

export type VariableStatus =
  "draft" | "review" | "active" | "deprecated" | "retired";

export type VariableTemporalSemantics =
  | "instantaneous"
  | "point-in-period"
  | "period-total"
  | "period-average"
  | "period-minimum"
  | "period-maximum"
  | "interval-state"
  | "event"
  | "recurring-plan"
  | "timeless-description";

export type AggregationSemantics =
  | "none"
  | "sum"
  | "mean"
  | "minimum"
  | "maximum"
  | "count"
  | "latest"
  | "duration"
  | "custom-versioned-method";

export interface ExternalMapping {
  id: NamespacedId;
  system: string;
  code: string;
  systemVersion?: string;
  relation:
    | "exact"
    | "broader"
    | "narrower"
    | "related"
    | "source-field"
    | "display-only";
  reviewState: "proposed" | "reviewed" | "rejected" | "retired";
  reviewedBy?: ActorId;
  reviewedAt?: IsoDateTime;
}

export interface VariableDefinition extends RevisionMetadata {
  id: VariableId;
  status: VariableStatus;
  preferredLabel: string;
  plainLanguageDescription: string;
  aliases: ReadonlyArray<string>;
  valueShape: ValueShape;
  unitDimensionId?: UnitDimensionId;
  allowedUnitIds?: ReadonlyArray<UnitId>;
  categorySetId?: CategorySetId;
  temporalSemantics: VariableTemporalSemantics;
  aggregationSemantics: AggregationSemantics;
  sensitivityHints?: ReadonlyArray<string>;
  reviewRequirements?: ReadonlyArray<string>;
  externalMappings: ReadonlyArray<ExternalMapping>;
}

export interface CategoryDefinition {
  id: CategoryId;
  preferredLabel: string;
  plainLanguageDescription: string;
  aliases: ReadonlyArray<string>;
  order?: number;
  parentCategoryId?: CategoryId;
  lifecycleState: "active" | "deprecated" | "retired";
  externalMappings: ReadonlyArray<ExternalMapping>;
}

export interface CategorySetDefinition extends RevisionMetadata {
  id: CategorySetId;
  status: VariableStatus;
  preferredLabel: string;
  categories: ReadonlyArray<CategoryDefinition>;
  ordering: "unordered" | "ordered" | "hierarchical";
  selection: "single" | "multiple";
  externalMappings: ReadonlyArray<ExternalMapping>;
  reviewRequirements?: ReadonlyArray<string>;
}

export interface UnitDefinition extends RevisionMetadata {
  id: UnitId;
  status: VariableStatus;
  preferredLabel: string;
  symbol?: string;
  aliases: ReadonlyArray<string>;
  dimensionId: UnitDimensionId;
  canonicalUnitId?: UnitId;
  conversionCapability:
    "identity" | "direct-versioned" | "context-required" | "not-convertible";
  precisionGuidance?: string;
  displayGuidance?: string;
  externalMappings: ReadonlyArray<ExternalMapping>;
}

export interface UnitDimensionDefinition extends RevisionMetadata {
  id: UnitDimensionId;
  preferredLabel: string;
  description: string;
  status: VariableStatus;
}

export interface NormalizationRecord extends RevisionMetadata {
  id: NamespacedId;
  inputRecordIds: ReadonlyArray<ChronicleRecordId>;
  inputSourceVersionIds?: ReadonlyArray<SourceVersionId>;
  methodId: MethodId;
  methodVersion: string;
  parameters: Readonly<Record<string, string | number | boolean>>;
  outputValue: ChronicleValue;
  assumptions: ReadonlyArray<string>;
  precisionEffect?: string;
  status:
    | "succeeded"
    | "failed-unknown-unit"
    | "failed-incompatible-dimension"
    | "failed-missing-context"
    | "failed-ambiguous-source"
    | "failed-misleading-precision";
}

export interface SourceReference {
  sourceArtifactId: SourceArtifactId;
  sourceVersionId: SourceVersionId;
  sourceLocatorIds?: ReadonlyArray<SourceLocatorId>;
}

export interface ChronicleRecordEnvelope<
  TFamily extends RecordFamily,
  TPayload,
> extends RevisionMetadata {
  id: ChronicleRecordId;
  chronicleId: ChronicleId;
  subjectId: SubjectId;
  family: TFamily;
  assertionClass: AssertionClass;
  authorityState: AuthorityState;
  lifecycleState: ChronicleRecordLifecycleState;
  temporalAssertion: TemporalAssertion;
  payload: TPayload;
  sourceReferences: ReadonlyArray<SourceReference>;
  provenanceEventIds: ReadonlyArray<ProvenanceEventId>;
  authorActorIds?: ReadonlyArray<ActorId>;
  recorderActorId?: ActorId;
  confirmerActorId?: ActorId;
  confirmationEventId?: ConfirmationEventId;
  methodId?: MethodId;
  methodVersion?: string;
  uncertainty?: UncertaintyDescriptor;
  relationshipIds: ReadonlyArray<RelationshipId>;
}

export interface ObservationPayload {
  variableId: VariableId;
  value: ChronicleValue;
  methodLabel?: string;
  bodySiteSubjectId?: SubjectId;
  contextSubjectIds?: ReadonlyArray<SubjectId>;
}

export interface IntervalPayload {
  variableId: VariableId;
  value: ChronicleValue;
  boundaryMeaning?: string;
  contextSubjectIds?: ReadonlyArray<SubjectId>;
}

export interface ReflectionPayload {
  text: TextValue;
  contextSubjectIds?: ReadonlyArray<SubjectId>;
  proposedExtractionRecordIds?: ReadonlyArray<ChronicleRecordId>;
}

export interface GoalPayload {
  description: TextValue;
  targetValue?: ChronicleValue;
  targetVariableId?: VariableId;
  goalState: "planned" | "active" | "paused" | "completed" | "abandoned";
}

export interface DerivedPayload {
  variableId?: VariableId;
  value: ChronicleValue;
  inputRecordIds: ReadonlyArray<ChronicleRecordId>;
  derivationId: DerivationId;
  invalidationBehavior:
    "invalidate" | "recompute" | "retain-with-warning" | "policy-required";
}

export interface AssociationPayload {
  inputRecordIds: ReadonlyArray<ChronicleRecordId>;
  variableIds?: ReadonlyArray<VariableId>;
  analysisPeriod: TemporalAssertion;
  methodId: MethodId;
  methodVersion: string;
  relationshipSummary: string;
  effectRepresentation?: ChronicleValue;
  limitations: ReadonlyArray<string>;
}

export interface InferencePayload {
  evidenceRecordIds: ReadonlyArray<ChronicleRecordId>;
  inferenceClass: string;
  conclusion: TextValue | CodedCategoryValue | DecimalValue;
  methodId: MethodId;
  methodVersion: string;
  limitations: ReadonlyArray<string>;
  reviewRequirements: ReadonlyArray<string>;
}

export type ObservationRecord = ChronicleRecordEnvelope<
  "observation",
  ObservationPayload
>;
export type IntervalRecord = ChronicleRecordEnvelope<
  "interval",
  IntervalPayload
>;
export type ReflectionRecord = ChronicleRecordEnvelope<
  "reflection",
  ReflectionPayload
>;
export type GoalRecord = ChronicleRecordEnvelope<"goal", GoalPayload>;
export type DerivedRecord = ChronicleRecordEnvelope<"derived", DerivedPayload>;
export type AssociationRecord = ChronicleRecordEnvelope<
  "association",
  AssociationPayload
>;
export type InferenceRecord = ChronicleRecordEnvelope<
  "inference",
  InferencePayload
>;

export type ChronicleRecord =
  | ObservationRecord
  | IntervalRecord
  | ReflectionRecord
  | GoalRecord
  | DerivedRecord
  | AssociationRecord
  | InferenceRecord;

export type SourceArtifactKind =
  | "manual-entry"
  | "questionnaire-response"
  | "device-payload"
  | "service-export"
  | "connector-payload"
  | "document"
  | "image"
  | "audio"
  | "video"
  | "message"
  | "prior-chronicle-record"
  | "external-record-reference";

export interface SourceArtifact extends RevisionMetadata {
  id: SourceArtifactId;
  chronicleId: ChronicleId;
  kind: SourceArtifactKind;
  dataClassification: DataClassification;
  preferredLabel?: string;
  lifecycleState:
    | "active"
    | "deletion-requested"
    | "deletion-processing"
    | "retained-under-exception"
    | "deleted";
}

export type SourceVersionAvailabilityState =
  | "receiving"
  | "quarantined"
  | "available"
  | "partially-available"
  | "unavailable"
  | "corrupt"
  | "deletion-requested"
  | "deletion-processing"
  | "retained-under-exception"
  | "deleted";

export interface IntegrityEvidence {
  algorithm: string;
  digest: string;
  verifiedAt?: IsoDateTime;
  verificationState: "unverified" | "verified" | "failed";
}

export interface SourceVersion extends RevisionMetadata {
  id: SourceVersionId;
  sourceArtifactId: SourceArtifactId;
  sourceRevision: string;
  mediaType?: string;
  representationType: "bytes" | "structured-payload" | "text" | "reference";
  capturedAt: IsoDateTime;
  sourceCreatedAt?: TemporalAssertion;
  length?: number;
  integrityEvidence?: ReadonlyArray<IntegrityEvidence>;
  custodyReferenceIds: ReadonlyArray<CustodyReferenceId>;
  availabilityState: SourceVersionAvailabilityState;
  authorActorIds?: ReadonlyArray<ActorId>;
  sourceActorIds?: ReadonlyArray<ActorId>;
}

export type SourceLocatorKind =
  | "page"
  | "page-region"
  | "image-region"
  | "row-column"
  | "field-path"
  | "json-pointer"
  | "xml-path"
  | "spreadsheet-range"
  | "byte-range"
  | "character-range"
  | "timestamp-range"
  | "message-position"
  | "form-response"
  | "document-section"
  | "whole-source-version";

export interface SourceLocator extends RevisionMetadata {
  id: SourceLocatorId;
  sourceVersionId: SourceVersionId;
  kind: SourceLocatorKind;
  locatorValue: string;
  description?: string;
  sourceSnapshot?: string;
  ambiguityNote?: string;
}

export interface CaptureEvent extends RevisionMetadata {
  id: ProvenanceEventId;
  kind: "capture";
  sourceVersionId: SourceVersionId;
  actorId: ActorId;
  chronicleId?: ChronicleId;
  captureMode: string;
  occurredAt: IsoDateTime;
  sourceReportedAt?: TemporalAssertion;
  interfaceClass?: string;
  contractVersion?: string;
  fixtureDataClassification?: "public" | "synthetic";
}

export interface ImportEvent extends RevisionMetadata {
  id: ProvenanceEventId;
  kind: "import";
  sourceArtifactId: SourceArtifactId;
  sourceVersionId: SourceVersionId;
  externalReferenceId?: ExternalReferenceId;
  importerActorId: ActorId;
  occurredAt: IsoDateTime;
  sourceSystemVersion?: string;
  payloadFormat: string;
  mappingContractVersion?: string;
  state: "success" | "partial" | "failed" | "quarantined";
  errors: ReadonlyArray<string>;
  omissions: ReadonlyArray<string>;
}

export interface TransformationEvent extends RevisionMetadata {
  id: ProvenanceEventId;
  kind: "transformation";
  transformationId: TransformationId;
  transformationKind:
    | "parsing"
    | "text-extraction"
    | "optical-extraction"
    | "speech-transcription"
    | "field-mapping"
    | "code-mapping"
    | "unit-normalization"
    | "date-parsing"
    | "temporal-normalization"
    | "redaction"
    | "format-conversion"
    | "deterministic-classification";
  methodId: MethodId;
  methodVersion: string;
  actorId: ActorId;
  inputSourceVersionIds: ReadonlyArray<SourceVersionId>;
  inputSourceLocatorIds?: ReadonlyArray<SourceLocatorId>;
  inputRecordIds?: ReadonlyArray<ChronicleRecordId>;
  parameters: Readonly<Record<string, string | number | boolean>>;
  assumptions: ReadonlyArray<string>;
  outputReferenceIds: ReadonlyArray<NamespacedId>;
  occurredAt: IsoDateTime;
}

export interface DerivationEvent extends RevisionMetadata {
  id: ProvenanceEventId;
  kind: "derivation";
  derivationId: DerivationId;
  methodId: MethodId;
  methodVersion: string;
  actorId: ActorId;
  inputRecordIds: ReadonlyArray<ChronicleRecordId>;
  parameters: Readonly<Record<string, string | number | boolean>>;
  outputRecordIds: ReadonlyArray<ChronicleRecordId>;
  occurredAt: IsoDateTime;
}

export interface ConfirmationEvent extends RevisionMetadata {
  id: ConfirmationEventId;
  kind: "confirmation";
  recordId: ChronicleRecordId;
  recordRevision: number;
  confirmerActorId: ActorId;
  occurredAt: IsoDateTime;
  proposalContextReferenceIds: ReadonlyArray<NamespacedId>;
  contractVersion: string;
  decision: "accepted" | "corrected-and-accepted" | "rejected" | "deferred";
}

export type ProvenanceEvent =
  CaptureEvent | ImportEvent | TransformationEvent | DerivationEvent;

export interface ExternalReference extends RevisionMetadata {
  id: ExternalReferenceId;
  system: string;
  referenceType: string;
  referenceValue: string;
  sourceSystemVersion?: string;
  resolutionState: "resolvable" | "expired" | "unavailable" | "unknown";
}

export type RelationshipReviewState =
  "proposed" | "confirmed" | "disputed" | "reversed" | "retired";

export interface RecordRelationshipBase<
  TRelationshipType extends string,
> extends RevisionMetadata {
  id: RelationshipId;
  relationshipType: TRelationshipType;
  sourceRecordIds: ReadonlyArray<ChronicleRecordId>;
  targetRecordIds: ReadonlyArray<ChronicleRecordId>;
  actorId: ActorId;
  recordedAt: IsoDateTime;
  effectiveAt?: TemporalAssertion;
  reasonCode: string;
  reasonText?: string;
  sourceReferenceIds?: ReadonlyArray<NamespacedId>;
  decisionMethodId?: MethodId;
  decisionMethodVersion?: string;
  reviewState: RelationshipReviewState;
  reversesRelationshipId?: RelationshipId;
}

export interface AmendmentRelationship extends RecordRelationshipBase<"amendment"> {
  changesInterpretation: boolean;
}

export interface CorrectionRelationship extends RecordRelationshipBase<"correction"> {
  correctionType:
    | "source-error"
    | "recording-error"
    | "parsing-error"
    | "mapping-error"
    | "unit-error"
    | "normalization-error"
    | "temporal-error"
    | "subject-error"
    | "chronicle-error"
    | "provenance-error"
    | "recollection-revision"
    | "classification-error"
    | "other-documented";
  changedComponents: ReadonlyArray<string>;
  dependentRecordIds: ReadonlyArray<ChronicleRecordId>;
}

export interface SupersessionRelationship extends RecordRelationshipBase<"supersession"> {}

export interface RetractionRelationship extends RecordRelationshipBase<"retraction"> {
  sourceState: "retained" | "deleted" | "unavailable" | "unknown";
  dependentRecordIds: ReadonlyArray<ChronicleRecordId>;
}

export interface InvalidationRelationship extends RecordRelationshipBase<"invalidation"> {
  ruleId: PolicyId;
  ruleVersion: string;
  affectedPurpose?: string;
  recomputationState: "not-applicable" | "available" | "required" | "blocked";
}

export interface ConflictRelationship extends RecordRelationshipBase<"conflict"> {
  conflictType: string;
  temporalOverlap?: TemporalAssertion;
  variableId?: VariableId;
  resolutionState: "unresolved" | "partially-resolved" | "resolved";
  preferredRecordId?: ChronicleRecordId;
}

export interface DuplicateCandidateRelationship extends RecordRelationshipBase<"duplicate-candidate"> {
  confidence?: number;
  detectionEvidence: ReadonlyArray<string>;
}

export interface ConfirmedDuplicateRelationship extends RecordRelationshipBase<"confirmed-duplicate"> {
  preferredRecordId?: ChronicleRecordId;
  retainedUniqueMetadata: ReadonlyArray<string>;
  reversible: boolean;
}

export interface MergeRelationship extends RecordRelationshipBase<"merge"> {
  outputRecordId?: ChronicleRecordId;
  mergePolicyId: PolicyId;
  mergePolicyVersion: string;
  retainedFieldsByRecord: Readonly<
    Record<ChronicleRecordId, ReadonlyArray<string>>
  >;
  unresolvedFields: ReadonlyArray<string>;
  reversible: boolean;
}

export interface UnmergeRelationship extends RecordRelationshipBase<"unmerge"> {
  reversedMergeRelationshipId: RelationshipId;
  affectedDerivedRecordIds: ReadonlyArray<ChronicleRecordId>;
}

export interface PreferredPresentationRelationship extends RecordRelationshipBase<"preferred-presentation"> {
  preferredRecordId: ChronicleRecordId;
  alternativeRecordIds: ReadonlyArray<ChronicleRecordId>;
  presentationScope: string;
  policyId?: PolicyId;
  policyVersion?: string;
  appealAvailable: boolean;
}

export type RecordRelationship =
  | AmendmentRelationship
  | CorrectionRelationship
  | SupersessionRelationship
  | RetractionRelationship
  | InvalidationRelationship
  | ConflictRelationship
  | DuplicateCandidateRelationship
  | ConfirmedDuplicateRelationship
  | MergeRelationship
  | UnmergeRelationship
  | PreferredPresentationRelationship;

export type AttachmentRole =
  | "primary-evidence"
  | "supporting-evidence"
  | "context"
  | "original-submission"
  | "correction-support"
  | "conflict-support"
  | "derived-output"
  | "illustrative"
  | "export-inclusion";

export interface Attachment extends RevisionMetadata {
  id: AttachmentId;
  sourceArtifactId: SourceArtifactId;
  sourceVersionId?: SourceVersionId;
  targetId: NamespacedId;
  targetKind:
    | "record-proposal"
    | "chronicle-record"
    | "reflection"
    | "correction-request"
    | "conflict-review"
    | "import-event"
    | "export-request"
    | "other-bounded-domain-object";
  role: AttachmentRole;
  lifecycleState: "active" | "removed" | "deleted";
  removedBy?: ActorId;
  removedAt?: IsoDateTime;
  removalReason?: string;
}

export interface CustodyReference extends RevisionMetadata {
  id: CustodyReferenceId;
  providerClass: string;
  opaqueReference: string;
  state: "active" | "migrating" | "unavailable" | "retired";
}

export interface StoredRepresentation extends RevisionMetadata {
  id: StoredRepresentationId;
  sourceVersionId: SourceVersionId;
  custodyReferenceId: CustodyReferenceId;
  representationType: "bytes" | "structured-payload" | "encrypted-object";
  mediaType?: string;
  integrityEvidence?: ReadonlyArray<IntegrityEvidence>;
  state: "available" | "quarantined" | "unavailable" | "deleted";
}

export interface DerivedRepresentation extends RevisionMetadata {
  id: DerivedRepresentationId;
  sourceVersionIds: ReadonlyArray<SourceVersionId>;
  sourceLocatorIds?: ReadonlyArray<SourceLocatorId>;
  kind:
    | "ocr-text"
    | "speech-transcript"
    | "document-text"
    | "page-image"
    | "thumbnail"
    | "preview"
    | "normalized-payload"
    | "redacted-copy"
    | "translated-copy"
    | "converted-format"
    | "search-index-entry"
    | "embedding"
    | "classification-output";
  transformationId: TransformationId;
  transformationVersion: string;
  actorId: ActorId;
  parameters: Readonly<Record<string, string | number | boolean>>;
  assumptions: ReadonlyArray<string>;
  mediaType?: string;
  valueShape?: ValueShape;
  uncertainty?: UncertaintyDescriptor;
  state: "available" | "unavailable" | "deleted";
  custodyReferenceId?: CustodyReferenceId;
}

export type ExportScopeItemKind =
  | "chronicle-record"
  | "source-artifact"
  | "source-version"
  | "attachment"
  | "provenance"
  | "relationship"
  | "variable-definition"
  | "unit-definition"
  | "deletion-evidence";

export interface ExportScopeItem {
  kind: ExportScopeItemKind;
  id?: NamespacedId;
  includeRawRepresentation?: boolean;
  includeHistory?: boolean;
}

export interface ExportRequest extends RevisionMetadata {
  id: ExportRequestId;
  chronicleId: ChronicleId;
  requestedBy: ActorId;
  requestedAt: IsoDateTime;
  formats: ReadonlyArray<string>;
  scope: ReadonlyArray<ExportScopeItem>;
  includeHumanReadable: boolean;
  includeMachineReadable: boolean;
  state:
    "received" | "planning" | "generating" | "ready" | "failed" | "cancelled";
}

export interface ExportPlan extends RevisionMetadata {
  id: ExportPlanId;
  exportRequestId: ExportRequestId;
  includedIds: ReadonlyArray<NamespacedId>;
  omittedItems: ReadonlyArray<{
    id?: NamespacedId;
    kind: ExportScopeItemKind;
    reason: string;
  }>;
  schemaVersions: ReadonlyArray<string>;
  generatedAt: IsoDateTime;
}

export interface ExportManifestEntry {
  path: string;
  mediaType: string;
  byteLength?: number;
  integrityEvidence?: ReadonlyArray<IntegrityEvidence>;
  sourceId?: NamespacedId;
  omissionReason?: string;
}

export interface ExportManifest extends RevisionMetadata {
  id: ExportManifestId;
  exportPlanId: ExportPlanId;
  entries: ReadonlyArray<ExportManifestEntry>;
  generatedAt: IsoDateTime;
  limitations: ReadonlyArray<string>;
}

export interface ExportArtifact extends RevisionMetadata {
  id: ExportArtifactId;
  exportRequestId: ExportRequestId;
  exportPlanId: ExportPlanId;
  exportManifestId: ExportManifestId;
  format: string;
  schemaVersion: LivingChronicleSchemaVersion;
  generatedAt: IsoDateTime;
  expiresAt?: IsoDateTime;
  custodyReferenceId?: CustodyReferenceId;
  state: "generating" | "ready" | "expired" | "deleted" | "failed";
}

export interface ExportDelivery extends RevisionMetadata {
  id: ExportDeliveryId;
  exportArtifactId: ExportArtifactId;
  deliveredToActorId: ActorId;
  deliveryMethod: string;
  deliveredAt?: IsoDateTime;
  state: "pending" | "delivered" | "failed" | "revoked";
  failureReason?: string;
}

export type DeletionTargetKind =
  | "chronicle-record"
  | "source-artifact"
  | "source-version"
  | "attachment"
  | "stored-representation"
  | "derived-representation"
  | "relationship"
  | "export-artifact"
  | "whole-chronicle";

export interface DeletionTarget {
  kind: DeletionTargetKind;
  id?: NamespacedId;
}

export type DeletionRequestState =
  | "received"
  | "scope-resolving"
  | "awaiting-review"
  | "processing"
  | "partially-completed"
  | "retained-under-exception"
  | "completed"
  | "failed"
  | "cancelled";

export interface DeletionRequest extends RevisionMetadata {
  id: DeletionRequestId;
  chronicleId: ChronicleId;
  requestedBy: ActorId;
  requestedAt: IsoDateTime;
  targets: ReadonlyArray<DeletionTarget>;
  reason?: string;
  state: DeletionRequestState;
}

export interface DeletionScopeResolution extends RevisionMetadata {
  id: NamespacedId;
  deletionRequestId: DeletionRequestId;
  resolvedTargets: ReadonlyArray<DeletionTarget>;
  dependentIds: ReadonlyArray<NamespacedId>;
  excludedTargets: ReadonlyArray<{
    target: DeletionTarget;
    reason: string;
  }>;
  resolvedAt: IsoDateTime;
}

export interface RetentionException extends RevisionMetadata {
  id: RetentionExceptionId;
  deletionRequestId: DeletionRequestId;
  target: DeletionTarget;
  authorityReference: string;
  policyId: PolicyId;
  policyVersion: string;
  reason: string;
  minimumRetainedFields: ReadonlyArray<string>;
  startsAt: IsoDateTime;
  reviewAt: IsoDateTime;
  endsAt?: IsoDateTime;
  accountableActorId: ActorId;
  appealAvailable: boolean;
  state: "active" | "expired" | "revoked" | "satisfied";
}

export interface Tombstone extends RevisionMetadata {
  id: TombstoneId;
  deletionRequestId: DeletionRequestId;
  deletedTargetKind: DeletionTargetKind;
  deletedTargetId: NamespacedId;
  purpose:
    | "prevent-identifier-reuse"
    | "prevent-accidental-resurrection"
    | "represent-dependent-unavailability"
    | "record-deletion-completion";
  retainedFields: Readonly<Record<string, string>>;
  expiresAt?: IsoDateTime;
}

export interface DeletionCompletionEvidence extends RevisionMetadata {
  id: NamespacedId;
  deletionRequestId: DeletionRequestId;
  completedAt: IsoDateTime;
  completedTargets: ReadonlyArray<DeletionTarget>;
  retainedUnderExceptionIds: ReadonlyArray<RetentionExceptionId>;
  tombstoneIds: ReadonlyArray<TombstoneId>;
  failedTargets: ReadonlyArray<{
    target: DeletionTarget;
    reason: string;
  }>;
  accountableActorId: ActorId;
}

export interface ChronicleSchemaBundle {
  schemaVersion: LivingChronicleSchemaVersion;
  chronicles: ReadonlyArray<{
    id: ChronicleId;
    controllingPersonActorId: ActorId;
  }>;
  subjects: ReadonlyArray<SubjectReference>;
  actors: ReadonlyArray<ActorReference>;
  variables: ReadonlyArray<VariableDefinition>;
  categorySets: ReadonlyArray<CategorySetDefinition>;
  unitDimensions: ReadonlyArray<UnitDimensionDefinition>;
  units: ReadonlyArray<UnitDefinition>;
  records: ReadonlyArray<ChronicleRecord>;
  sourceArtifacts: ReadonlyArray<SourceArtifact>;
  sourceVersions: ReadonlyArray<SourceVersion>;
  sourceLocators: ReadonlyArray<SourceLocator>;
  provenanceEvents: ReadonlyArray<ProvenanceEvent>;
  confirmationEvents: ReadonlyArray<ConfirmationEvent>;
  externalReferences: ReadonlyArray<ExternalReference>;
  relationships: ReadonlyArray<RecordRelationship>;
  attachments: ReadonlyArray<Attachment>;
  custodyReferences: ReadonlyArray<CustodyReference>;
  storedRepresentations: ReadonlyArray<StoredRepresentation>;
  derivedRepresentations: ReadonlyArray<DerivedRepresentation>;
  exportRequests: ReadonlyArray<ExportRequest>;
  exportPlans: ReadonlyArray<ExportPlan>;
  exportManifests: ReadonlyArray<ExportManifest>;
  exportArtifacts: ReadonlyArray<ExportArtifact>;
  exportDeliveries: ReadonlyArray<ExportDelivery>;
  deletionRequests: ReadonlyArray<DeletionRequest>;
  deletionScopeResolutions: ReadonlyArray<DeletionScopeResolution>;
  retentionExceptions: ReadonlyArray<RetentionException>;
  tombstones: ReadonlyArray<Tombstone>;
  deletionCompletionEvidence: ReadonlyArray<DeletionCompletionEvidence>;
}
