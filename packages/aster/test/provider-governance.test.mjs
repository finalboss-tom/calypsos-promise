import assert from "node:assert/strict";
import test from "node:test";

import {
  ASTER_CONTRACT_VERSION,
  ASTER_PROVIDER_AUTHORITY_BOUNDARY,
  ASTER_PROVIDER_EVALUATION_CRITERIA,
  validateAsterProviderGovernance,
} from "../dist/index.js";

function basePolicy() {
  return {
    schemaId: "aster.provider.governance",
    contractVersion: ASTER_CONTRACT_VERSION,
    policyId: "provider-policy.synthetic-eval",
    revision: 1,
    state: "synthetic-evaluation-only",
    provider: {
      providerId: "provider-candidate.abstract-1",
      providerRevision: 1,
      serviceClass: "model-inference",
      adapterId: "adapter.provider-neutral-model",
      adapterRevision: 1,
    },
    task: {
      operationIds: ["scribe.prepare-structured-capture"],
      informationClasses: ["public", "synthetic"],
      purpose: "Evaluate a provider-neutral synthetic structured-drafting task.",
      outputContractId: "aster.proposal",
      outputContractRevision: 1,
    },
    egress: {
      mode: "public-or-synthetic-minimum-necessary",
      mayTransmit: true,
      allowedFields: [
        "task-instruction",
        "synthetic-input",
        "source-reference",
        "output-schema",
      ],
      prohibitedFields: [
        "player-expression",
        "chronicle-record",
        "subject-identifier",
        "account-identifier",
        "house-of-keys-fact",
        "permission-decision",
        "receipt",
        "memory",
        "provider-operational-metadata",
        "protected-audit",
        "credential-or-secret",
      ],
      minimumNecessary: true,
      authorityBearingContextProhibited: true,
      rawSourceMaterialProhibited: true,
      secretsProhibited: true,
      privateDataAuthorized: false,
    },
    handling: {
      regionStatus: "declared",
      regions: ["synthetic-region"],
      retentionMode: "no-retention",
      maxRetentionDays: 0,
      requestLogging: "metadata-only",
      responseLogging: "metadata-only",
      contentLogging: false,
      trainingUse: "prohibited",
      modelImprovementUse: "prohibited",
      humanReview: "prohibited",
      abuseMonitoringUse: "metadata-only",
      subprocessorState: "none",
      subprocessors: [],
    },
    deletion: {
      deletionRequestSupported: true,
      deletionDeadlineDays: 30,
      evidenceClass: "contractual-commitment",
      downstreamCopyUncertaintyDisclosed: true,
      providerEvidenceIsNotUniversalProof: true,
    },
    credentials: {
      credentialReference: null,
      containsSecretMaterial: false,
      leastPrivilegeRequired: true,
      environmentBound: true,
      rotationAndRevocationRequired: true,
      publicRepositoryCredentialsProhibited: true,
    },
    evaluation: {
      criteriaId: "provider-evaluation.criteria",
      criteriaRevision: 1,
      criteria: ASTER_PROVIDER_EVALUATION_CRITERIA,
      evaluatorFundingSource: "project-independent",
      independence: "independent",
      conflictsDisclosed: true,
      separateReviewerRequired: false,
      providerCanSetCriteria: false,
      providerCanSetWeights: false,
      providerCanControlFindings: false,
      providerCanControlPublication: false,
      negativeFindingsPublishable: true,
      sponsorBenefitsDoNotAffectOutcome: true,
    },
    funding: {
      relationshipState: "none",
      publicFundingRecord: null,
      providerCreditsPresent: false,
      sponsorBenefitsPresent: false,
      conflictsDisclosed: true,
      fundingCanDetermineProviderDefault: false,
      fundingCanDetermineSourceRank: false,
      fundingCanDetermineConnectorRank: false,
      fundingCanDetermineEgressPolicy: false,
      fundingCanDetermineBenchmarkConclusion: false,
      fundingCanControlPublication: false,
      fundingCreatesGovernanceAuthority: false,
    },
    continuity: {
      criticality: "non-critical",
      concentration: "not-material",
      providerIndependentAdapter: true,
      localOrManualFallback: true,
      replacementPlan: { id: "provider-plan.replacement", revision: 1 },
      migrationPlan: { id: "provider-plan.migration", revision: 1 },
      teardownPlan: { id: "provider-plan.teardown", revision: 1 },
      configurationExportSupported: true,
      dataExportSupported: true,
      credentialRotationIncluded: true,
      providerSideDeletionIncluded: true,
      residualObligationsTracked: true,
    },
    incidentAndCorrection: {
      suspensionSupported: true,
      incidentPath: "provider-incident-review",
      correctionPath: "provider-public-claim-correction",
      publicClaimsCorrectable: true,
      materialChangeTriggersRevalidation: true,
      termsChangeRequiresReview: true,
      acquisitionRequiresReview: true,
    },
    publicClaims: {
      claimsProductionApproved: false,
      claimsZeroRetentionProven: false,
      claimsDeletionComplete: false,
      claimsIndependentReviewWithoutEvidence: false,
      claimsClinicalSuitability: false,
      claimsStandardsConformanceAsSafety: false,
      claimsPreferredProvider: false,
      claimsSourceAuthority: false,
    },
    specialistHoldpoints: [],
    authority: ASTER_PROVIDER_AUTHORITY_BOUNDARY,
  };
}

function codes(result) {
  return result.issues.map((issue) => issue.code);
}

test("public and synthetic minimum-necessary provider evaluation validates", () => {
  const result = validateAsterProviderGovernance(basePolicy());
  assert.equal(result.ok, true, JSON.stringify(result.issues, null, 2));
});

test("private and authority-bearing provider egress is rejected", () => {
  const policy = basePolicy();
  policy.task.informationClasses = ["private-personal"];
  policy.egress.allowedFields = ["chronicle-record", "subject-identifier"];
  policy.specialistHoldpoints = ["privacy", "security", "legal"];
  const result = validateAsterProviderGovernance(policy);
  assert.equal(result.ok, false);
  assert.ok(codes(result).includes("aster.provider.private-egress-prohibited"));
  assert.ok(codes(result).includes("aster.provider.authority-bearing-egress"));
});

test("training, improvement, and provider human review remain prohibited", () => {
  const policy = basePolicy();
  policy.handling.trainingUse = "allowed";
  policy.handling.modelImprovementUse = "contractually-bounded";
  policy.handling.humanReview = "contractually-bounded";
  const result = validateAsterProviderGovernance(policy);
  assert.equal(result.ok, false);
  assert.ok(
    codes(result).includes("aster.provider.training-or-improvement-enabled"),
  );
  assert.ok(codes(result).includes("aster.provider.human-review-unbounded"));
});

test("provider-funded evaluation cannot claim independence or control publication", () => {
  const policy = basePolicy();
  policy.evaluation.evaluatorFundingSource = "provider-funded";
  policy.evaluation.independence = "independent";
  policy.evaluation.providerCanControlPublication = true;
  policy.evaluation.separateReviewerRequired = false;
  const result = validateAsterProviderGovernance(policy);
  assert.equal(result.ok, false);
  assert.ok(codes(result).includes("aster.provider.false-independence"));
  assert.ok(
    codes(result).includes("aster.provider.provider-controls-evaluation"),
  );
});

test("credits and sponsor benefits require a public record and cannot control defaults", () => {
  const policy = basePolicy();
  policy.funding.providerCreditsPresent = true;
  policy.funding.sponsorBenefitsPresent = true;
  policy.funding.fundingCanDetermineProviderDefault = true;
  const result = validateAsterProviderGovernance(policy);
  assert.equal(result.ok, false);
  assert.ok(
    codes(result).includes("aster.provider.missing-public-funding-record"),
  );
  assert.ok(codes(result).includes("aster.provider.funding-control-attempt"));
});

test("critical dependencies require replacement, migration, and teardown", () => {
  const policy = basePolicy();
  policy.continuity.criticality = "critical-without-exit-plan";
  policy.continuity.replacementPlan = { id: "", revision: 0 };
  const result = validateAsterProviderGovernance(policy);
  assert.equal(result.ok, false);
  assert.ok(codes(result).includes("aster.provider.missing-exit-plan"));
  assert.ok(codes(result).includes("aster.provider.invalid-continuity"));
});

test("unknown handling and concentration require specialist holds", () => {
  const policy = basePolicy();
  policy.state = "specialist-review-required";
  policy.egress.mayTransmit = false;
  policy.egress.mode = "private-egress-specialist-hold";
  policy.handling.regionStatus = "unknown";
  policy.handling.regions = [];
  policy.handling.retentionMode = "unknown";
  policy.handling.subprocessorState = "unknown";
  policy.continuity.concentration = "unknown";
  policy.specialistHoldpoints = [];
  const result = validateAsterProviderGovernance(policy);
  assert.equal(result.ok, false);
  assert.ok(codes(result).includes("aster.provider.unknown-handling"));
  assert.ok(
    codes(result).includes("aster.provider.concentration-hold-required"),
  );
  assert.ok(
    codes(result).includes("aster.provider.missing-specialist-holdpoint"),
  );
});

test("provider claims and authority cannot create approval, preference, or truth", () => {
  const policy = basePolicy();
  policy.publicClaims.claimsProductionApproved = true;
  policy.publicClaims.claimsDeletionComplete = true;
  policy.publicClaims.claimsPreferredProvider = true;
  policy.publicClaims.claimsSourceAuthority = true;
  policy.authority = { ...policy.authority, canAuthorizeProductionUse: true };
  const result = validateAsterProviderGovernance(policy);
  assert.equal(result.ok, false);
  assert.ok(codes(result).includes("aster.provider.public-claim-overreach"));
  assert.ok(codes(result).includes("aster.provider.deletion-overclaim"));
  assert.ok(codes(result).includes("aster.provider.authority-escalation"));
});
