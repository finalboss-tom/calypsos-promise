import { ASTER_ROLE_OPERATION_IDS } from "./role-contracts.js";
import { ASTER_CONTRACT_VERSION } from "./version.js";
import {
  ASTER_PROVIDER_ALLOWED_SYNTHETIC_EGRESS_FIELDS,
  ASTER_PROVIDER_AUTHORITY_BOUNDARY,
  ASTER_PROVIDER_EVALUATION_CRITERIA,
  ASTER_PROVIDER_GOVERNANCE_SCHEMA_ID,
  ASTER_PROVIDER_MANDATORY_PROHIBITED_FIELDS,
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

const GOVERNANCE_STATES = new Set([
  "not-approved",
  "synthetic-evaluation-only",
  "specialist-review-required",
  "blocked",
  "retired",
]);
const SERVICE_CLASSES = new Set([
  "model-inference",
  "embedding-or-retrieval",
  "document-processing",
  "speech-processing",
  "image-processing",
  "translation",
  "safety-or-moderation",
]);
const INFORMATION_CLASSES = new Set([
  "public",
  "synthetic",
  "private-personal",
  "protected-operational",
]);
const OPERATIONS = new Set<string>(ASTER_ROLE_OPERATION_IDS);
const SAFE_FIELDS = new Set<string>(
  ASTER_PROVIDER_ALLOWED_SYNTHETIC_EGRESS_FIELDS,
);
const REQUIRED_PROHIBITED = new Set<string>(
  ASTER_PROVIDER_MANDATORY_PROHIBITED_FIELDS,
);
const REQUIRED_CRITERIA = new Set<string>(
  ASTER_PROVIDER_EVALUATION_CRITERIA,
);
const HOLDPOINTS = new Set([
  "security",
  "privacy",
  "legal",
  "procurement",
  "accessibility",
  "clinical",
  "interoperability",
  "financial-control",
  "data-protection",
  "ai-safety",
]);

function text(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function revision(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) > 0;
}

function unique(values: readonly string[]): boolean {
  return new Set(values).size === values.length;
}

function containsAll(
  actual: readonly string[],
  required: ReadonlySet<string>,
): boolean {
  const set = new Set(actual);
  return [...required].every((value) => set.has(value));
}

function reference(value: {
  readonly id: string;
  readonly revision: number;
}): boolean {
  return text(value.id) && revision(value.revision);
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
    add("aster.provider.invalid-schema", "schemaId", "Invalid schema.");
  }
  if (!text(policy.policyId) || !revision(policy.revision)) {
    add("aster.provider.invalid-identity", "policyId", "Invalid identity.");
  }
  if (!GOVERNANCE_STATES.has(policy.state)) {
    add("aster.provider.invalid-state", "state", "Invalid governance state.");
  }

  const provider = policy.provider;
  if (
    !text(provider.providerId) ||
    !revision(provider.providerRevision) ||
    !SERVICE_CLASSES.has(provider.serviceClass) ||
    !text(provider.adapterId) ||
    !revision(provider.adapterRevision)
  ) {
    add("aster.provider.invalid-provider", "provider", "Invalid provider.");
  }

  const task = policy.task;
  if (
    !unique(task.operationIds) ||
    task.operationIds.length === 0 ||
    !task.operationIds.every((value) => OPERATIONS.has(value)) ||
    !unique(task.informationClasses) ||
    task.informationClasses.length === 0 ||
    !task.informationClasses.every((value) =>
      INFORMATION_CLASSES.has(value),
    ) ||
    !text(task.purpose) ||
    !text(task.outputContractId) ||
    !revision(task.outputContractRevision)
  ) {
    add("aster.provider.invalid-task", "task", "Invalid task scope.");
  }

  const egress = policy.egress;
  const privateInformation = task.informationClasses.some(
    (value) =>
      value === "private-personal" || value === "protected-operational",
  );
  if (
    !unique(egress.allowedFields) ||
    !unique(egress.prohibitedFields) ||
    egress.allowedFields.some((value) =>
      egress.prohibitedFields.includes(value),
    ) ||
    !containsAll(egress.prohibitedFields, REQUIRED_PROHIBITED) ||
    !egress.minimumNecessary ||
    !egress.authorityBearingContextProhibited ||
    !egress.rawSourceMaterialProhibited ||
    !egress.secretsProhibited ||
    egress.privateDataAuthorized
  ) {
    add("aster.provider.invalid-egress", "egress", "Invalid egress boundary.");
  }
  if (egress.allowedFields.some((value) => !SAFE_FIELDS.has(value))) {
    add(
      "aster.provider.authority-bearing-egress",
      "egress.allowedFields",
      "Authority-bearing egress is prohibited.",
    );
  }
  if (privateInformation && egress.mayTransmit) {
    add(
      "aster.provider.private-egress-prohibited",
      "egress.mayTransmit",
      "Private egress is prohibited.",
    );
  }
  if (
    policy.state === "synthetic-evaluation-only" &&
    (privateInformation ||
      !task.informationClasses.every(
        (value) => value === "public" || value === "synthetic",
      ) ||
      (egress.mayTransmit &&
        egress.mode !== "public-or-synthetic-minimum-necessary"))
  ) {
    add(
      "aster.provider.private-egress-prohibited",
      "state",
      "Synthetic evaluation is public or synthetic only.",
    );
  }
  if (
    policy.state !== "synthetic-evaluation-only" &&
    egress.mayTransmit
  ) {
    add(
      "aster.provider.invalid-egress",
      "egress",
      "Transmission is not eligible.",
    );
  }

  const handling = policy.handling;
  const unknownHandling =
    handling.regionStatus === "unknown" ||
    handling.regions.length === 0 ||
    handling.retentionMode === "unknown" ||
    handling.requestLogging === "unknown" ||
    handling.responseLogging === "unknown" ||
    handling.abuseMonitoringUse === "unknown" ||
    handling.subprocessorState === "unknown";
  if (unknownHandling) {
    add("aster.provider.unknown-handling", "handling", "Handling is unresolved.");
  }
  if (
    handling.contentLogging ||
    (handling.retentionMode === "no-retention" &&
      handling.maxRetentionDays !== 0) ||
    (handling.retentionMode === "bounded-retention" &&
      (!Number.isInteger(handling.maxRetentionDays) ||
        Number(handling.maxRetentionDays) < 0))
  ) {
    add("aster.provider.invalid-handling", "handling", "Invalid handling terms.");
  }
  if (
    handling.trainingUse !== "prohibited" ||
    handling.modelImprovementUse !== "prohibited"
  ) {
    add(
      "aster.provider.training-or-improvement-enabled",
      "handling.trainingUse",
      "Training and improvement are prohibited.",
    );
  }
  if (handling.humanReview !== "prohibited") {
    add(
      "aster.provider.human-review-unbounded",
      "handling.humanReview",
      "Provider human review is prohibited.",
    );
  }
  if (
    (handling.subprocessorState === "none" &&
      handling.subprocessors.length > 0) ||
    (handling.subprocessorState === "declared" &&
      (handling.subprocessors.length === 0 ||
        !handling.subprocessors.every(reference)))
  ) {
    add(
      "aster.provider.invalid-subprocessor",
      "handling.subprocessors",
      "Invalid subprocessor evidence.",
    );
  }

  const deletion = policy.deletion;
  if (
    deletion.evidenceClass === "unknown" ||
    !deletion.downstreamCopyUncertaintyDisclosed ||
    !deletion.providerEvidenceIsNotUniversalProof ||
    (deletion.deletionRequestSupported &&
      (!Number.isInteger(deletion.deletionDeadlineDays) ||
        Number(deletion.deletionDeadlineDays) < 0))
  ) {
    add(
      "aster.provider.invalid-deletion",
      "deletion",
      "Invalid deletion evidence.",
    );
  }

  const credentials = policy.credentials;
  if (
    credentials.containsSecretMaterial ||
    !credentials.leastPrivilegeRequired ||
    !credentials.environmentBound ||
    !credentials.rotationAndRevocationRequired ||
    !credentials.publicRepositoryCredentialsProhibited
  ) {
    add(
      "aster.provider.invalid-credentials",
      "credentials",
      "Invalid credentials.",
    );
  }

  const evaluation = policy.evaluation;
  if (
    !text(evaluation.criteriaId) ||
    !revision(evaluation.criteriaRevision) ||
    !unique(evaluation.criteria) ||
    !containsAll(evaluation.criteria, REQUIRED_CRITERIA) ||
    !evaluation.conflictsDisclosed ||
    !evaluation.negativeFindingsPublishable ||
    !evaluation.sponsorBenefitsDoNotAffectOutcome ||
    evaluation.evaluatorFundingSource === "unknown" ||
    evaluation.independence === "unknown"
  ) {
    add(
      "aster.provider.invalid-evaluation",
      "evaluation",
      "Invalid evaluation.",
    );
  }
  if (
    evaluation.providerCanSetCriteria ||
    evaluation.providerCanSetWeights ||
    evaluation.providerCanControlFindings ||
    evaluation.providerCanControlPublication
  ) {
    add(
      "aster.provider.provider-controls-evaluation",
      "evaluation",
      "Provider control of evaluation is prohibited.",
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
      "Provider-funded evaluation is not independent.",
    );
  }

  const funding = policy.funding;
  const materialSupport =
    funding.providerCreditsPresent || funding.sponsorBenefitsPresent;
  if (
    funding.relationshipState === "unknown" ||
    !funding.conflictsDisclosed
  ) {
    add(
      "aster.provider.invalid-funding",
      "funding",
      "Funding is unresolved.",
    );
  }
  if (
    (funding.relationshipState === "public-record-linked" &&
      (!funding.publicFundingRecord ||
        !reference(funding.publicFundingRecord))) ||
    (materialSupport &&
      funding.relationshipState !== "public-record-linked")
  ) {
    add(
      "aster.provider.missing-public-funding-record",
      "funding.publicFundingRecord",
      "Material support requires a public funding record.",
    );
  }
  if (
    funding.fundingCanDetermineProviderDefault ||
    funding.fundingCanDetermineSourceRank ||
    funding.fundingCanDetermineConnectorRank ||
    funding.fundingCanDetermineEgressPolicy ||
    funding.fundingCanDetermineBenchmarkConclusion ||
    funding.fundingCanControlPublication ||
    funding.fundingCreatesGovernanceAuthority
  ) {
    add(
      "aster.provider.funding-control-attempt",
      "funding",
      "Funding cannot control product or evaluation authority.",
    );
  }

  const continuity = policy.continuity;
  if (
    !continuity.providerIndependentAdapter ||
    !continuity.localOrManualFallback ||
    !reference(continuity.replacementPlan) ||
    !reference(continuity.migrationPlan) ||
    !reference(continuity.teardownPlan) ||
    !continuity.credentialRotationIncluded ||
    !continuity.providerSideDeletionIncluded ||
    !continuity.residualObligationsTracked
  ) {
    add(
      "aster.provider.invalid-continuity",
      "continuity",
      "Invalid continuity.",
    );
  }
  if (continuity.criticality === "critical-without-exit-plan") {
    add(
      "aster.provider.missing-exit-plan",
      "continuity.criticality",
      "Critical dependencies require an exit plan.",
    );
  }
  if (
    continuity.concentration === "unknown" ||
    (continuity.concentration === "pause-or-exception-required" &&
      policy.state === "synthetic-evaluation-only")
  ) {
    add(
      "aster.provider.concentration-hold-required",
      "continuity.concentration",
      "Concentration requires a hold.",
    );
  }

  const incident = policy.incidentAndCorrection;
  if (
    !incident.suspensionSupported ||
    !text(incident.incidentPath) ||
    !text(incident.correctionPath) ||
    !incident.publicClaimsCorrectable ||
    !incident.materialChangeTriggersRevalidation ||
    !incident.termsChangeRequiresReview ||
    !incident.acquisitionRequiresReview
  ) {
    add(
      "aster.provider.invalid-incident-boundary",
      "incidentAndCorrection",
      "Invalid incident and correction boundary.",
    );
  }

  if (Object.values(policy.publicClaims).some(Boolean)) {
    add(
      "aster.provider.public-claim-overreach",
      "publicClaims",
      "Provider claims cannot establish approval or authority.",
    );
  }
  if (
    policy.publicClaims.claimsDeletionComplete ||
    policy.publicClaims.claimsZeroRetentionProven ||
    !deletion.providerEvidenceIsNotUniversalProof
  ) {
    add(
      "aster.provider.deletion-overclaim",
      "publicClaims",
      "Deletion evidence is bounded, not universal proof.",
    );
  }

  const holdsValid =
    unique(policy.specialistHoldpoints) &&
    policy.specialistHoldpoints.every((value) => HOLDPOINTS.has(value));
  const requiresHold =
    privateInformation ||
    policy.state === "specialist-review-required" ||
    unknownHandling ||
    funding.relationshipState === "unknown" ||
    continuity.concentration === "unknown" ||
    continuity.concentration === "pause-or-exception-required";
  if (
    !holdsValid ||
    (requiresHold && policy.specialistHoldpoints.length === 0)
  ) {
    add(
      "aster.provider.missing-specialist-holdpoint",
      "specialistHoldpoints",
      "Explicit specialist holds are required.",
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
      "Provider governance cannot create authority.",
    );
  }

  return { ok: issues.length === 0, issues };
}
