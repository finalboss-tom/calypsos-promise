import { ASTER_ROLE_OPERATION_IDS } from "./role-contracts.js";
import { ASTER_CONTRACT_VERSION } from "./version.js";
import {
  ASTER_PROVIDER_ALLOWED_SYNTHETIC_EGRESS_FIELDS,
  ASTER_PROVIDER_AUTHORITY_BOUNDARY,
  ASTER_PROVIDER_CONCENTRATION_STATES,
  ASTER_PROVIDER_CRITICALITY_STATES,
  ASTER_PROVIDER_DELETION_EVIDENCE_CLASSES,
  ASTER_PROVIDER_EGRESS_MODES,
  ASTER_PROVIDER_EVALUATION_CRITERIA,
  ASTER_PROVIDER_EVALUATION_INDEPENDENCE_STATES,
  ASTER_PROVIDER_EVALUATOR_FUNDING_SOURCES,
  ASTER_PROVIDER_FIELD_CLASSES,
  ASTER_PROVIDER_FUNDING_RELATIONSHIP_STATES,
  ASTER_PROVIDER_GOVERNANCE_SCHEMA_ID,
  ASTER_PROVIDER_GOVERNANCE_STATES,
  ASTER_PROVIDER_INFORMATION_CLASSES,
  ASTER_PROVIDER_LOGGING_MODES,
  ASTER_PROVIDER_MANDATORY_PROHIBITED_FIELDS,
  ASTER_PROVIDER_RETENTION_MODES,
  ASTER_PROVIDER_SERVICE_CLASSES,
  ASTER_PROVIDER_SPECIALIST_HOLDPOINTS,
  ASTER_PROVIDER_SUBPROCESSOR_STATES,
  ASTER_PROVIDER_USE_POLICIES,
  type AsterProviderGovernanceEnvelope,
} from "./provider-governance.js";

export const ASTER_PROVIDER_GOVERNANCE_ISSUE_CODES = [
  "aster.provider.invalid-schema",
  "aster.provider.invalid-identity",
  "aster.provider.invalid-state",
  "aster.provider.invalid-provider",
  "aster.provider.invalid-task",
  "aster.provider.invalid-egress",
  "aster.provider.private-egress-prohibited",
  "aster.provider.authority-bearing-egress",
  "aster.provider.invalid-handling",
  "aster.provider.unknown-handling",
  "aster.provider.training-or-improvement-enabled",
  "aster.provider.human-review-unbounded",
  "aster.provider.invalid-subprocessor",
  "aster.provider.invalid-deletion",
  "aster.provider.deletion-overclaim",
  "aster.provider.invalid-credentials",
  "aster.provider.invalid-evaluation",
  "aster.provider.provider-controls-evaluation",
  "aster.provider.false-independence",
  "aster.provider.invalid-funding",
  "aster.provider.funding-control-attempt",
  "aster.provider.missing-public-funding-record",
  "aster.provider.invalid-continuity",
  "aster.provider.missing-exit-plan",
  "aster.provider.concentration-hold-required",
  "aster.provider.invalid-incident-boundary",
  "aster.provider.public-claim-overreach",
  "aster.provider.missing-specialist-holdpoint",
  "aster.provider.authority-escalation",
] as const;
export type AsterProviderGovernanceIssueCode =
  (typeof ASTER_PROVIDER_GOVERNANCE_ISSUE_CODES)[number];

export interface AsterProviderGovernanceValidationIssue {
  readonly code: AsterProviderGovernanceIssueCode;
  readonly path: string;
  readonly message: string;
}

export interface AsterProviderGovernanceValidationResult {
  readonly ok: boolean;
  readonly issues: readonly AsterProviderGovernanceValidationIssue[];
}

const values = <T extends readonly string[]>(items: T) => new Set<string>(items);
const STATES = values(ASTER_PROVIDER_GOVERNANCE_STATES);
const SERVICES = values(ASTER_PROVIDER_SERVICE_CLASSES);
const INFO = values(ASTER_PROVIDER_INFORMATION_CLASSES);
const OPERATIONS = values(ASTER_ROLE_OPERATION_IDS);
const EGRESS = values(ASTER_PROVIDER_EGRESS_MODES);
const FIELDS = values(ASTER_PROVIDER_FIELD_CLASSES);
const SAFE_FIELDS = values(ASTER_PROVIDER_ALLOWED_SYNTHETIC_EGRESS_FIELDS);
const REQUIRED_PROHIBITED = values(ASTER_PROVIDER_MANDATORY_PROHIBITED_FIELDS);
const RETENTION = values(ASTER_PROVIDER_RETENTION_MODES);
const LOGGING = values(ASTER_PROVIDER_LOGGING_MODES);
const USE = values(ASTER_PROVIDER_USE_POLICIES);
const SUBPROCESSORS = values(ASTER_PROVIDER_SUBPROCESSOR_STATES);
const DELETION = values(ASTER_PROVIDER_DELETION_EVIDENCE_CLASSES);
const CRITERIA = values(ASTER_PROVIDER_EVALUATION_CRITERIA);
const FUNDING_SOURCE = values(ASTER_PROVIDER_EVALUATOR_FUNDING_SOURCES);
const INDEPENDENCE = values(ASTER_PROVIDER_EVALUATION_INDEPENDENCE_STATES);
const FUNDING = values(ASTER_PROVIDER_FUNDING_RELATIONSHIP_STATES);
const CONCENTRATION = values(ASTER_PROVIDER_CONCENTRATION_STATES);
const CRITICALITY = values(ASTER_PROVIDER_CRITICALITY_STATES);
const HOLDPOINTS = values(ASTER_PROVIDER_SPECIALIST_HOLDPOINTS);

function validId(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validRevision(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) > 0;
}

function uniqueKnown(
  items: readonly string[],
  known: ReadonlySet<string>,
): boolean {
  return (
    new Set(items).size === items.length &&
    items.every((item) => known.has(item))
  );
}

function hasAll(
  items: readonly string[],
  required: ReadonlySet<string>,
): boolean {
  const actual = new Set(items);
  return [...required].every((item) => actual.has(item));
}

function validReference(value: {
  readonly id: string;
  readonly revision: number;
}): boolean {
  return validId(value.id) && validRevision(value.revision);
}

export function validateAsterProviderGovernance(
  policy: AsterProviderGovernanceEnvelope,
): AsterProviderGovernanceValidationResult {
  const issues: AsterProviderGovernanceValidationIssue[] = [];
  const add = (
    code: AsterProviderGovernanceIssueCode,
    path: string,
    message: string,
  ) => issues.push({ code, path, message });

  if (
    policy.schemaId !== ASTER_PROVIDER_GOVERNANCE_SCHEMA_ID ||
    policy.contractVersion !== ASTER_CONTRACT_VERSION
  ) {
    add(
      "aster.provider.invalid-schema",
      "schemaId",
      "Use the current public provider-governance schema and contract version.",
    );
  }
  if (!validId(policy.policyId) || !validRevision(policy.revision)) {
    add(
      "aster.provider.invalid-identity",
      "policyId",
      "Policy identity and revision must be stable and positive.",
    );
  }
  if (!STATES.has(policy.state)) {
    add(
      "aster.provider.invalid-state",
      "state",
      "Provider governance state is not recognized.",
    );
  }

  const provider = policy.provider;
  if (
    !validId(provider.providerId) ||
    !validRevision(provider.providerRevision) ||
    !SERVICES.has(provider.serviceClass) ||
    !validId(provider.adapterId) ||
    !validRevision(provider.adapterRevision)
  ) {
    add(
      "aster.provider.invalid-provider",
      "provider",
      "Provider and adapter identity must be versioned and use a recognized service class.",
    );
  }

  const task = policy.task;
  if (
    task.operationIds.length === 0 ||
    !uniqueKnown(task.operationIds, OPERATIONS) ||
    task.informationClasses.length === 0 ||
    !uniqueKnown(task.informationClasses, INFO) ||
    !validId(task.purpose) ||
    !validId(task.outputContractId) ||
    !validRevision(task.outputContractRevision)
  ) {
    add(
      "aster.provider.invalid-task",
      "task",
      "Task scope must bind recognized operations, information classes, purpose, and output contract.",
    );
  }

  const egress = policy.egress;
  const allowed = egress.allowedFields;
  const prohibited = egress.prohibitedFields;
  if (
    !EGRESS.has(egress.mode) ||
    !uniqueKnown(allowed, FIELDS) ||
    !uniqueKnown(prohibited, FIELDS) ||
    allowed.some((field) => prohibited.includes(field)) ||
    !hasAll(prohibited, REQUIRED_PROHIBITED) ||
    egress.minimumNecessary !== true ||
    egress.authorityBearingContextProhibited !== true ||
    egress.rawSourceMaterialProhibited !== true ||
    egress.secretsProhibited !== true ||
    egress.privateDataAuthorized !== false
  ) {
    add(
      "aster.provider.invalid-egress",
      "egress",
      "Egress must be minimum-necessary, non-authoritative, secret-free, and explicitly field-bounded.",
    );
  }
  if (allowed.some((field) => !SAFE_FIELDS.has(field))) {
    add(
      "aster.provider.authority-bearing-egress",
      "egress.allowedFields",
      "Only public or synthetic evaluation fields may leave the core boundary.",
    );
  }
  const privateInfo = task.informationClasses.some(
    (item) => item === "private-personal" || item === "protected-operational",
  );
  if (privateInfo && egress.mayTransmit) {
    add(
      "aster.provider.private-egress-prohibited",
      "egress.mayTransmit",
      "This pre-stable contract does not authorize private or protected provider egress.",
    );
  }
  if (policy.state === "synthetic-evaluation-only") {
    if (
      privateInfo ||
      !task.informationClasses.every(
        (item) => item === "public" || item === "synthetic",
      ) ||
      (egress.mayTransmit &&
        egress.mode !== "public-or-synthetic-minimum-necessary")
    ) {
      add(
        "aster.provider.private-egress-prohibited",
        "state",
        "Synthetic evaluation may use only public or synthetic minimum-necessary egress.",
      );
    }
  } else if (egress.mayTransmit) {
    add(
      "aster.provider.invalid-egress",
      "egress.mayTransmit",
      "Only synthetic-evaluation-only policies may transmit public or synthetic fields.",
    );
  }

  const handling = policy.handling;
  if (
    !["declared", "unknown"].includes(handling.regionStatus) ||
    !RETENTION.has(handling.retentionMode) ||
    !LOGGING.has(handling.requestLogging) ||
    !LOGGING.has(handling.responseLogging) ||
    handling.contentLogging !== false ||
    !USE.has(handling.trainingUse) ||
    !USE.has(handling.modelImprovementUse) ||
    !USE.has(handling.humanReview) ||
    !["metadata-only", "content-bounded", "unknown"].includes(
      handling.abuseMonitoringUse,
    ) ||
    !SUBPROCESSORS.has(handling.subprocessorState)
  ) {
    add(
      "aster.provider.invalid-handling",
      "handling",
      "Handling terms must use recognized region, retention, logging, use, review, and subprocessor states.",
    );
  }
  if (
    handling.regionStatus === "unknown" ||
    handling.regions.length === 0 ||
    handling.retentionMode === "unknown" ||
    handling.requestLogging === "unknown" ||
    handling.responseLogging === "unknown" ||
    handling.abuseMonitoringUse === "unknown" ||
    handling.subprocessorState === "unknown"
  ) {
    add(
      "aster.provider.unknown-handling",
      "handling",
      "Unknown provider handling requires a specialist hold and cannot be evaluation-eligible.",
    );
  }
  if (
    (handling.retentionMode === "no-retention" &&
      handling.maxRetentionDays !== 0) ||
    (handling.retentionMode === "bounded-retention" &&
      (!Number.isInteger(handling.maxRetentionDays) ||
        Number(handling.maxRetentionDays) < 0))
  ) {
    add(
      "aster.provider.invalid-handling",
      "handling.maxRetentionDays",
      "Retention must be zero for no-retention or a non-negative bound for bounded retention.",
    );
  }
  if (
    handling.trainingUse !== "prohibited" ||
    handling.modelImprovementUse !== "prohibited"
  ) {
    add(
      "aster.provider.training-or-improvement-enabled",
      "handling.trainingUse",
      "Training and model-improvement use must remain prohibited.",
    );
  }
  if (handling.humanReview !== "prohibited") {
    add(
      "aster.provider.human-review-unbounded",
      "handling.humanReview",
      "Synthetic evaluation requires provider human review to be prohibited.",
    );
  }
  if (
    (handling.subprocessorState === "none" &&
      handling.subprocessors.length > 0) ||
    (handling.subprocessorState === "declared" &&
      (handling.subprocessors.length === 0 ||
        !handling.subprocessors.every(validReference)))
  ) {
    add(
      "aster.provider.invalid-subprocessor",
      "handling.subprocessors",
      "Subprocessors must be absent when none or exactly versioned when declared.",
    );
  }

  const deletion = policy.deletion;
  if (
    !DELETION.has(deletion.evidenceClass) ||
    deletion.downstreamCopyUncertaintyDisclosed !== true ||
    deletion.providerEvidenceIsNotUniversalProof !== true ||
    (deletion.deletionRequestSupported &&
      (!Number.isInteger(deletion.deletionDeadlineDays) ||
        Number(deletion.deletionDeadlineDays) < 0))
  ) {
    add(
      "aster.provider.invalid-deletion",
      "deletion",
      "Deletion behavior must be bounded, evidenced, and preserve downstream-copy uncertainty.",
    );
  }
  if (deletion.evidenceClass === "unknown") {
    add(
      "aster.provider.invalid-deletion",
      "deletion.evidenceClass",
      "Unknown deletion evidence blocks evaluation eligibility.",
    );
  }

  const credentials = policy.credentials;
  if (
    credentials.containsSecretMaterial !== false ||
    credentials.leastPrivilegeRequired !== true ||
    credentials.environmentBound !== true ||
    credentials.rotationAndRevocationRequired !== true ||
    credentials.publicRepositoryCredentialsProhibited !== true
  ) {
    add(
      "aster.provider.invalid-credentials",
      "credentials",
      "Credential boundaries must exclude secret material and require least privilege, environment binding, rotation, and revocation.",
    );
  }

  const evaluation = policy.evaluation;
  if (
    !validId(evaluation.criteriaId) ||
    !validRevision(evaluation.criteriaRevision) ||
    !uniqueKnown(evaluation.criteria, CRITERIA) ||
    !hasAll(evaluation.criteria, CRITERIA) ||
    !FUNDING_SOURCE.has(evaluation.evaluatorFundingSource) ||
    !INDEPENDENCE.has(evaluation.independence) ||
    evaluation.negativeFindingsPublishable !== true ||
    evaluation.sponsorBenefitsDoNotAffectOutcome !== true
  ) {
    add(
      "aster.provider.invalid-evaluation",
      "evaluation",
      "Evaluation must use complete provider-neutral criteria, visible conflicts, and publishable negative findings.",
    );
  }
  if (
    evaluation.providerCanSetCriteria !== false ||
    evaluation.providerCanSetWeights !== false ||
    evaluation.providerCanControlFindings !== false ||
    evaluation.providerCanControlPublication !== false
  ) {
    add(
      "aster.provider.provider-controls-evaluation",
      "evaluation",
      "A provider cannot control criteria, weights, findings, or publication.",
    );
  }
  if (
    evaluation.evaluatorFundingSource === "provider-funded" &&
    (evaluation.independence === "independent" ||
      !evaluation.separateReviewerRequired)
  ) {
    add(
      "aster.provider.false-independence",
      "evaluation.independence",
      "A provider-funded evaluator cannot be the independent reviewer and requires separate review.",
    );
  }
  if (
    evaluation.evaluatorFundingSource === "unknown" ||
    evaluation.independence === "unknown" ||
    !evaluation.conflictsDisclosed
  ) {
    add(
      "aster.provider.invalid-evaluation",
      "evaluation.conflictsDisclosed",
      "Unknown or undisclosed evaluation conflicts block eligibility.",
    );
  }

  const funding = policy.funding;
  if (!FUNDING.has(funding.relationshipState)) {
    add(
      "aster.provider.invalid-funding",
      "funding.relationshipState",
      "Funding relationship state is not recognized.",
    );
  }
  if (
    funding.relationshipState === "public-record-linked" &&
    (!funding.publicFundingRecord ||
      !validReference(funding.publicFundingRecord))
  ) {
    add(
      "aster.provider.missing-public-funding-record",
      "funding.publicFundingRecord",
      "Material provider support requires an exact public funding record reference.",
    );
  }
  if (
    (funding.providerCreditsPresent || funding.sponsorBenefitsPresent) &&
    funding.relationshipState !== "public-record-linked"
  ) {
    add(
      "aster.provider.missing-public-funding-record",
      "funding.relationshipState",
      "Credits and sponsor benefits require a public material-relationship record.",
    );
  }
  if (funding.relationshipState === "unknown" || !funding.conflictsDisclosed) {
    add(
      "aster.provider.invalid-funding",
      "funding",
      "Unknown or undisclosed provider funding conflicts block eligibility.",
    );
  }
  if (
    funding.fundingCanDetermineProviderDefault !== false ||
    funding.fundingCanDetermineSourceRank !== false ||
    funding.fundingCanDetermineConnectorRank !== false ||
    funding.fundingCanDetermineEgressPolicy !== false ||
    funding.fundingCanDetermineBenchmarkConclusion !== false ||
    funding.fundingCanControlPublication !== false ||
    funding.fundingCreatesGovernanceAuthority !== false
  ) {
    add(
      "aster.provider.funding-control-attempt",
      "funding",
      "Funding cannot determine defaults, rank, egress, conclusions, publication, or governance.",
    );
  }

  const continuity = policy.continuity;
  if (
    !CRITICALITY.has(continuity.criticality) ||
    !CONCENTRATION.has(continuity.concentration) ||
    continuity.providerIndependentAdapter !== true ||
    continuity.localOrManualFallback !== true ||
    !validReference(continuity.replacementPlan) ||
    !validReference(continuity.migrationPlan) ||
    !validReference(continuity.teardownPlan) ||
    continuity.credentialRotationIncluded !== true ||
    continuity.providerSideDeletionIncluded !== true ||
    continuity.residualObligationsTracked !== true
  ) {
    add(
      "aster.provider.invalid-continuity",
      "continuity",
      "Continuity requires provider-independent adapters, fallback, and versioned replacement, migration, and teardown plans.",
    );
  }
  if (continuity.criticality === "critical-without-exit-plan") {
    add(
      "aster.provider.missing-exit-plan",
      "continuity.criticality",
      "A critical provider dependency without an exit plan is prohibited.",
    );
  }
  if (
    continuity.concentration === "pause-or-exception-required" &&
    policy.state === "synthetic-evaluation-only"
  ) {
    add(
      "aster.provider.concentration-hold-required",
      "continuity.concentration",
      "Concentration requiring pause or exception cannot remain evaluation-eligible.",
    );
  }
  if (continuity.concentration === "unknown") {
    add(
      "aster.provider.concentration-hold-required",
      "continuity.concentration",
      "Unknown provider concentration requires review.",
    );
  }

  const incident = policy.incidentAndCorrection;
  if (
    incident.suspensionSupported !== true ||
    !validId(incident.incidentPath) ||
    !validId(incident.correctionPath) ||
    incident.publicClaimsCorrectable !== true ||
    incident.materialChangeTriggersRevalidation !== true ||
    incident.termsChangeRequiresReview !== true ||
    incident.acquisitionRequiresReview !== true
  ) {
    add(
      "aster.provider.invalid-incident-boundary",
      "incidentAndCorrection",
      "Provider incidents, corrections, suspension, terms changes, and acquisitions require inspectable review paths.",
    );
  }

  if (Object.values(policy.publicClaims).some((value) => value !== false)) {
    add(
      "aster.provider.public-claim-overreach",
      "publicClaims",
      "Provider statements cannot establish production approval, deletion proof, independence, suitability, preference, standards safety, or source authority.",
    );
  }
  if (
    policy.deletion.providerEvidenceIsNotUniversalProof !== true ||
    policy.publicClaims.claimsDeletionComplete !== false ||
    policy.publicClaims.claimsZeroRetentionProven !== false
  ) {
    add(
      "aster.provider.deletion-overclaim",
      "publicClaims",
      "Provider deletion or zero-retention evidence is bounded evidence, not universal proof.",
    );
  }

  const holds = policy.specialistHoldpoints;
  if (!uniqueKnown(holds, HOLDPOINTS)) {
    add(
      "aster.provider.missing-specialist-holdpoint",
      "specialistHoldpoints",
      "Specialist holdpoints must be unique and recognized.",
    );
  }
  const requiresHold =
    privateInfo ||
    policy.state === "specialist-review-required" ||
    handling.regionStatus === "unknown" ||
    handling.retentionMode === "unknown" ||
    handling.subprocessorState === "unknown" ||
    funding.relationshipState === "unknown" ||
    continuity.concentration === "unknown" ||
    continuity.concentration === "pause-or-exception-required";
  if (requiresHold && holds.length === 0) {
    add(
      "aster.provider.missing-specialist-holdpoint",
      "specialistHoldpoints",
      "Unresolved private-data, handling, funding, or concentration state requires explicit specialist holds.",
    );
  }
  if (
    policy.state === "synthetic-evaluation-only" &&
    issues.some(
      (issue) =>
        issue.code === "aster.provider.unknown-handling" ||
        issue.code === "aster.provider.invalid-evaluation" ||
        issue.code === "aster.provider.invalid-funding" ||
        issue.code === "aster.provider.concentration-hold-required",
    )
  ) {
    add(
      "aster.provider.invalid-state",
      "state",
      "A policy with unresolved handling, evaluation, funding, or concentration cannot be synthetic-evaluation-only.",
    );
  }

  if (
    Object.entries(ASTER_PROVIDER_AUTHORITY_BOUNDARY).some(
      ([key, value]) =>
        policy.authority[key as keyof typeof policy.authority] !== value,
    )
  ) {
    add(
      "aster.provider.authority-escalation",
      "authority",
      "Provider governance cannot create domain, ranking, evaluation, publication, production, progression, or reward authority.",
    );
  }

  return { ok: issues.length === 0, issues };
}
