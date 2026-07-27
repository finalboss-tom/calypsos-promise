import { ASTER_ROLES } from "./authority.js";
import {
  ASTER_COMPATIBILITY_CHANGE_CLASSES,
  ASTER_COMPATIBILITY_MANIFEST,
  ASTER_COMPATIBILITY_STATUSES,
  ASTER_MIGRATION_MODES,
  ASTER_PUBLIC_COMPONENT_IDS,
  classifyAsterCompatibilityChange,
  type AsterCompatibilityChange,
  type AsterPublicComponentId,
} from "./compatibility.js";
import {
  ASTER_CORE_NON_AI_PATH_IDS,
  ASTER_LOCAL_SCENARIO_IDS,
  ASTER_LOCAL_SYNTHETIC_ADAPTER,
} from "./local-synthetic-adapter.js";
import { ASTER_PRIMARY_PROPOSAL_KIND_BY_ROLE } from "./proposal.js";
import { ASTER_PROVIDER_GOVERNANCE_STATES } from "./provider-governance.js";
import { ASTER_ROLE_OPERATION_BY_ROLE } from "./role-contracts.js";
import { ASTER_CONTRACT_VERSION } from "./version.js";

export const ASTER_COMPATIBILITY_VALIDATION_ISSUE_CODES = [
  "aster.compatibility.invalid-manifest",
  "aster.compatibility.unknown-contract-version",
  "aster.compatibility.missing-component",
  "aster.compatibility.duplicate-component",
  "aster.compatibility.invalid-component",
  "aster.compatibility.missing-validator",
  "aster.compatibility.missing-public-fixture",
  "aster.compatibility.fixture-not-synthetic",
  "aster.compatibility.fixture-authority-escalation",
  "aster.compatibility.fixture-scenario-mismatch",
  "aster.compatibility.role-operation-mismatch",
  "aster.compatibility.role-proposal-kind-mismatch",
  "aster.compatibility.role-scenario-mismatch",
  "aster.compatibility.fallback-coverage-gap",
  "aster.compatibility.provider-state-drift",
  "aster.compatibility.production-provider-state",
  "aster.compatibility.invalid-migration-policy",
  "aster.compatibility.incompatible-without-migration",
  "aster.compatibility.missing-migration-plan",
  "aster.compatibility.invalid-migration-plan",
  "aster.compatibility.migration-authority-escalation",
  "aster.compatibility.silent-field-removal",
  "aster.compatibility.unknown-compatibility",
  "aster.compatibility.authority-escalation",
] as const;
export type AsterCompatibilityValidationIssueCode =
  (typeof ASTER_COMPATIBILITY_VALIDATION_ISSUE_CODES)[number];

export interface AsterCompatibilityValidationIssue {
  readonly code: AsterCompatibilityValidationIssueCode;
  readonly path: string;
  readonly message: string;
}

export interface AsterCompatibilityValidationResult {
  readonly ok: boolean;
  readonly issues: readonly AsterCompatibilityValidationIssue[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function nonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function positiveInteger(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) > 0;
}

function add(
  issues: AsterCompatibilityValidationIssue[],
  code: AsterCompatibilityValidationIssueCode,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}

function exactSet(actual: readonly string[], expected: readonly string[]): boolean {
  return (
    actual.length === expected.length &&
    expected.every((value) => actual.includes(value))
  );
}

function authorityEscalated(value: unknown): boolean {
  if (!isRecord(value)) return true;
  return Object.values(value).some((candidate) => candidate !== false);
}

function validateMigrationPlan(
  plan: unknown,
  change: AsterCompatibilityChange,
  issues: AsterCompatibilityValidationIssue[],
): void {
  const path = "$.migrationPlan";
  if (!isRecord(plan)) {
    add(
      issues,
      "aster.compatibility.missing-migration-plan",
      path,
      "This compatibility change requires an explicit migration plan.",
    );
    return;
  }
  if (
    !nonEmpty(plan.migrationId) ||
    plan.revision !== 1 ||
    plan.componentId !== change.componentId ||
    plan.fromContractVersion !== ASTER_CONTRACT_VERSION ||
    plan.toContractVersion !== ASTER_CONTRACT_VERSION ||
    plan.fromComponentRevision !== change.fromComponentRevision ||
    plan.toComponentRevision !== change.toComponentRevision ||
    !ASTER_MIGRATION_MODES.includes(
      plan.mode as (typeof ASTER_MIGRATION_MODES)[number],
    ) ||
    plan.mode === "not-applicable" ||
    plan.preservesSourceArtifact !== true ||
    plan.preservesPriorRevisionEvidence !== true ||
    plan.createsNewRevision !== true ||
    plan.rollbackOrForwardOnlyDeclared !== true ||
    !Array.isArray(plan.publicSyntheticFixtureIds) ||
    plan.publicSyntheticFixtureIds.length === 0
  ) {
    add(
      issues,
      "aster.compatibility.invalid-migration-plan",
      path,
      "Migration plans must bind exact versions and revisions, preserve prior evidence, create a new revision, declare rollback behavior, and cite public synthetic fixtures.",
    );
  }
  const authorityFields = [
    "canWriteCanonicalRecords",
    "canCreateOrExpandPermission",
    "canConfirmProposal",
    "canSelectProviderDefault",
    "canSetSourceRank",
    "canControlPublication",
  ];
  if (authorityFields.some((field) => plan[field] !== false)) {
    add(
      issues,
      "aster.compatibility.migration-authority-escalation",
      path,
      "A migration plan cannot create canonical, permission, confirmation, provider, source-ranking, or publication authority.",
    );
  }
}

export function validateAsterCompatibilityManifest(
  value: unknown = ASTER_COMPATIBILITY_MANIFEST,
): AsterCompatibilityValidationResult {
  const issues: AsterCompatibilityValidationIssue[] = [];
  if (!isRecord(value)) {
    add(
      issues,
      "aster.compatibility.invalid-manifest",
      "$",
      "The Aster compatibility manifest must be an object.",
    );
    return { ok: false, issues };
  }
  if (
    value.schemaId !== "aster.compatibility.manifest" ||
    value.manifestId !== "aster.compatibility.current" ||
    value.revision !== 1
  ) {
    add(
      issues,
      "aster.compatibility.invalid-manifest",
      "$",
      "The manifest must use the current stable schema, identifier, and revision.",
    );
  }
  if (value.contractVersion !== ASTER_CONTRACT_VERSION) {
    add(
      issues,
      "aster.compatibility.unknown-contract-version",
      "$.contractVersion",
      "The manifest must bind the current Aster contract version.",
    );
  }

  const components = Array.isArray(value.components) ? value.components : [];
  const componentIds = components
    .filter(isRecord)
    .map((component) => String(component.componentId));
  for (const componentId of ASTER_PUBLIC_COMPONENT_IDS) {
    const matches = componentIds.filter((candidate) => candidate === componentId);
    if (matches.length === 0) {
      add(
        issues,
        "aster.compatibility.missing-component",
        "$.components",
        `The public component ${componentId} is missing from the manifest.`,
      );
    } else if (matches.length > 1) {
      add(
        issues,
        "aster.compatibility.duplicate-component",
        "$.components",
        `The public component ${componentId} appears more than once.`,
      );
    }
  }

  for (const [index, component] of components.entries()) {
    const path = `$.components[${index}]`;
    if (!isRecord(component)) {
      add(
        issues,
        "aster.compatibility.invalid-component",
        path,
        "Each public component entry must be an object.",
      );
      continue;
    }
    if (
      !ASTER_PUBLIC_COMPONENT_IDS.includes(
        component.componentId as AsterPublicComponentId,
      ) ||
      component.revision !== 1 ||
      !Array.isArray(component.schemaIds) ||
      component.schemaIds.length === 0 ||
      !component.schemaIds.every(nonEmpty) ||
      component.compatibilityStatus !== "exact-compatible" ||
      component.migrationRequired !== false ||
      component.canCreateAuthority !== false
    ) {
      add(
        issues,
        "aster.compatibility.invalid-component",
        path,
        "Component entries must declare a known component, revision, schemas, current compatibility, no active migration, and no authority.",
      );
    }
    if (!nonEmpty(component.validatorId) || component.validatorRevision !== 1) {
      add(
        issues,
        "aster.compatibility.missing-validator",
        `${path}.validatorId`,
        "Every public component must bind a stable validator identifier and revision.",
      );
    }
    if (!Array.isArray(component.fixtureIds) || component.fixtureIds.length === 0) {
      add(
        issues,
        "aster.compatibility.missing-public-fixture",
        `${path}.fixtureIds`,
        "Every public component must cite at least one public synthetic fixture.",
      );
    }
  }

  const fixtures = Array.isArray(value.fixtures) ? value.fixtures : [];
  const fixtureIds = new Set<string>();
  for (const [index, fixture] of fixtures.entries()) {
    const path = `$.fixtures[${index}]`;
    if (!isRecord(fixture) || !nonEmpty(fixture.fixtureId)) {
      add(
        issues,
        "aster.compatibility.missing-public-fixture",
        path,
        "Each fixture requires a stable identifier.",
      );
      continue;
    }
    if (fixtureIds.has(fixture.fixtureId)) {
      add(
        issues,
        "aster.compatibility.missing-public-fixture",
        path,
        "Public fixture identifiers must be unique.",
      );
    }
    fixtureIds.add(fixture.fixtureId);
    if (
      fixture.informationClass !== "synthetic" ||
      fixture.publicSafe !== true ||
      fixture.credentialFree !== true
    ) {
      add(
        issues,
        "aster.compatibility.fixture-not-synthetic",
        path,
        "Public fixtures must be synthetic, public-safe, and credential-free.",
      );
    }
    if (fixture.authoritative !== false) {
      add(
        issues,
        "aster.compatibility.fixture-authority-escalation",
        `${path}.authoritative`,
        "A public fixture cannot become authority or canonical truth.",
      );
    }
    if (
      !ASTER_PUBLIC_COMPONENT_IDS.includes(
        fixture.componentId as AsterPublicComponentId,
      ) ||
      !nonEmpty(fixture.validatorId) ||
      fixture.validatorRevision !== 1 ||
      !Array.isArray(fixture.scenarioIds) ||
      fixture.scenarioIds.length === 0 ||
      !fixture.scenarioIds.every((scenarioId) =>
        ASTER_LOCAL_SCENARIO_IDS.includes(scenarioId),
      )
    ) {
      add(
        issues,
        "aster.compatibility.fixture-scenario-mismatch",
        path,
        "Fixtures must bind a known component, validator, and one or more current local scenario identifiers.",
      );
    }
  }

  for (const component of components.filter(isRecord)) {
    if (!Array.isArray(component.fixtureIds)) continue;
    for (const id of component.fixtureIds) {
      if (typeof id !== "string" || !fixtureIds.has(id)) {
        add(
          issues,
          "aster.compatibility.missing-public-fixture",
          "$.components",
          "Every component fixture reference must resolve to the public fixture catalogue.",
        );
      }
    }
  }

  const roleBindings = Array.isArray(value.roleBindings) ? value.roleBindings : [];
  for (const role of ASTER_ROLES) {
    const binding = roleBindings.find(
      (candidate) => isRecord(candidate) && candidate.role === role,
    );
    if (!isRecord(binding)) {
      add(
        issues,
        "aster.compatibility.role-operation-mismatch",
        "$.roleBindings",
        `The role ${role} requires a cross-contract binding.`,
      );
      continue;
    }
    if (binding.operationId !== ASTER_ROLE_OPERATION_BY_ROLE[role]) {
      add(
        issues,
        "aster.compatibility.role-operation-mismatch",
        "$.roleBindings",
        `The role ${role} must retain its exact public operation identifier.`,
      );
    }
    if (binding.proposalKind !== ASTER_PRIMARY_PROPOSAL_KIND_BY_ROLE[role]) {
      add(
        issues,
        "aster.compatibility.role-proposal-kind-mismatch",
        "$.roleBindings",
        `The role ${role} must retain its exact primary proposal kind.`,
      );
    }
    const successScenario = ASTER_LOCAL_SYNTHETIC_ADAPTER.scenarios.find(
      (scenario) => scenario.scenarioId === binding.successScenarioId,
    );
    if (
      !successScenario ||
      successScenario.role !== role ||
      successScenario.operationId !== binding.operationId ||
      successScenario.canPrepareProposal !== true
    ) {
      add(
        issues,
        "aster.compatibility.role-scenario-mismatch",
        "$.roleBindings",
        `The role ${role} success fixture must align to its operation and remain proposal-only.`,
      );
    }
    if (
      binding.fallbackAvailableWithoutAi !== true ||
      binding.fallbackAvailableWithoutProvider !== true
    ) {
      add(
        issues,
        "aster.compatibility.fallback-coverage-gap",
        "$.roleBindings",
        `The role ${role} requires a provider-independent non-AI fallback.`,
      );
    }
  }

  const localScenarioIds = Array.isArray(value.localScenarioIds)
    ? value.localScenarioIds.filter((candidate): candidate is string =>
        typeof candidate === "string",
      )
    : [];
  if (!exactSet(localScenarioIds, ASTER_LOCAL_SCENARIO_IDS)) {
    add(
      issues,
      "aster.compatibility.fixture-scenario-mismatch",
      "$.localScenarioIds",
      "The manifest must cover every current local synthetic scenario exactly once.",
    );
  }
  const coreNonAiPathIds = Array.isArray(value.coreNonAiPathIds)
    ? value.coreNonAiPathIds.filter((candidate): candidate is string =>
        typeof candidate === "string",
      )
    : [];
  if (!exactSet(coreNonAiPathIds, ASTER_CORE_NON_AI_PATH_IDS)) {
    add(
      issues,
      "aster.compatibility.fallback-coverage-gap",
      "$.coreNonAiPathIds",
      "The manifest must preserve every core non-AI path.",
    );
  }

  const providerStates = Array.isArray(value.providerGovernanceStates)
    ? value.providerGovernanceStates.filter((candidate): candidate is string =>
        typeof candidate === "string",
      )
    : [];
  if (!exactSet(providerStates, ASTER_PROVIDER_GOVERNANCE_STATES)) {
    add(
      issues,
      "aster.compatibility.provider-state-drift",
      "$.providerGovernanceStates",
      "Provider governance states must match the accepted public taxonomy.",
    );
  }
  if (providerStates.includes("production-approved")) {
    add(
      issues,
      "aster.compatibility.production-provider-state",
      "$.providerGovernanceStates",
      "Sprint 6 cannot add a production-approved provider state.",
    );
  }

  const migrationPolicy = value.migrationPolicy;
  if (
    !isRecord(migrationPolicy) ||
    migrationPolicy.policyId !== "aster.compatibility.migration-policy" ||
    migrationPolicy.revision !== 1 ||
    migrationPolicy.currentContractVersion !== ASTER_CONTRACT_VERSION ||
    migrationPolicy.unknownChangesFailClosed !== true ||
    migrationPolicy.additiveOptionalMayRemainCompatible !== true ||
    migrationPolicy.preservesPriorRevisionEvidence !== true ||
    migrationPolicy.silentFieldRemovalProhibited !== true ||
    migrationPolicy.silentAuthorityExpansionProhibited !== true ||
    migrationPolicy.providerOrFundingInfluenceProhibited !== true ||
    !Array.isArray(migrationPolicy.migrationRequiredFor) ||
    !Array.isArray(migrationPolicy.incompatibleWithoutNewDecision)
  ) {
    add(
      issues,
      "aster.compatibility.invalid-migration-policy",
      "$.migrationPolicy",
      "The current migration policy must fail closed, preserve evidence, prohibit silent field removal and authority expansion, and exclude provider or funding influence.",
    );
  }
  if (authorityEscalated(value.authority)) {
    add(
      issues,
      "aster.compatibility.authority-escalation",
      "$.authority",
      "Compatibility evidence cannot create domain, provider, source-ranking, publication, progression, or reward authority.",
    );
  }

  return { ok: issues.length === 0, issues };
}

export function validateAsterCompatibilityChange(
  value: unknown,
): AsterCompatibilityValidationResult {
  const issues: AsterCompatibilityValidationIssue[] = [];
  if (!isRecord(value)) {
    add(
      issues,
      "aster.compatibility.unknown-compatibility",
      "$",
      "A compatibility change must be an object.",
    );
    return { ok: false, issues };
  }
  if (
    !nonEmpty(value.changeId) ||
    !ASTER_PUBLIC_COMPONENT_IDS.includes(
      value.componentId as AsterPublicComponentId,
    ) ||
    !positiveInteger(value.fromComponentRevision) ||
    !positiveInteger(value.toComponentRevision) ||
    Number(value.toComponentRevision) <= Number(value.fromComponentRevision) ||
    !ASTER_COMPATIBILITY_CHANGE_CLASSES.includes(
      value.changeClass as (typeof ASTER_COMPATIBILITY_CHANGE_CLASSES)[number],
    ) ||
    !ASTER_COMPATIBILITY_STATUSES.includes(
      value.declaredStatus as (typeof ASTER_COMPATIBILITY_STATUSES)[number],
    )
  ) {
    add(
      issues,
      "aster.compatibility.unknown-compatibility",
      "$",
      "Compatibility changes require known identifiers, components, increasing revisions, change classes, and statuses.",
    );
    return { ok: false, issues };
  }

  const change = value as unknown as AsterCompatibilityChange;
  const expectedStatus = classifyAsterCompatibilityChange(change.changeClass);
  if (change.declaredStatus !== expectedStatus) {
    add(
      issues,
      "aster.compatibility.unknown-compatibility",
      "$.declaredStatus",
      `The declared status must be ${expectedStatus} for ${change.changeClass}.`,
    );
  }
  if (
    change.changeClass === "field-removal" &&
    change.declaredStatus === "additive-compatible"
  ) {
    add(
      issues,
      "aster.compatibility.silent-field-removal",
      "$.changeClass",
      "Field removal cannot be represented as an additive compatible change.",
    );
  }
  if (
    change.changeClass === "authority-boundary-change" ||
    change.authorityBoundaryChanged
  ) {
    if (change.declaredStatus !== "incompatible") {
      add(
        issues,
        "aster.compatibility.incompatible-without-migration",
        "$.declaredStatus",
        "Authority-boundary changes are incompatible and require a new governing decision rather than ordinary migration.",
      );
    }
    if (change.migrationPlan !== null) {
      add(
        issues,
        "aster.compatibility.migration-authority-escalation",
        "$.migrationPlan",
        "An ordinary migration plan cannot authorize an authority-boundary change.",
      );
    }
  } else if (expectedStatus === "migration-required") {
    validateMigrationPlan(change.migrationPlan, change, issues);
  } else if (change.migrationPlan !== null) {
    validateMigrationPlan(change.migrationPlan, change, issues);
  }
  return { ok: issues.length === 0, issues };
}

export function validateCurrentAsterCrossContractEvidence(): AsterCompatibilityValidationResult {
  return validateAsterCompatibilityManifest(ASTER_COMPATIBILITY_MANIFEST);
}
