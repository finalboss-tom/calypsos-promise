import {
  ASTER_MANDATORY_PROHIBITED_ACTIONS,
  ASTER_ROLE_AUTHORITY_MATRIX,
  ASTER_ROLES,
} from "./authority.js";
import {
  ASTER_CLARIFICATION_TRIGGERS,
  ASTER_CONFIDENCE_RULES,
  ASTER_ROLE_FAILURE_CODES,
  ASTER_ROLE_OPERATION_BY_ROLE,
  ASTER_SOURCE_LINK_RULES,
} from "./role-contracts.js";

export const ASTER_ROLE_CONTRACT_VALIDATION_ISSUE_CODES = [
  "aster.role-contract.invalid-matrix",
  "aster.role-contract.missing-role",
  "aster.role-contract.unknown-role",
  "aster.role-contract.role-mismatch",
  "aster.role-contract.invalid-contract-id",
  "aster.role-contract.invalid-revision",
  "aster.role-contract.invalid-operation",
  "aster.role-contract.authority-matrix-mismatch",
  "aster.role-contract.empty-evidence-requirements",
  "aster.role-contract.invalid-evidence-requirement",
  "aster.role-contract.invalid-evidence-class",
  "aster.role-contract.empty-clarification-triggers",
  "aster.role-contract.invalid-clarification-trigger",
  "aster.role-contract.invalid-confidence-rule",
  "aster.role-contract.empty-uncertainty-rules",
  "aster.role-contract.empty-failure-codes",
  "aster.role-contract.invalid-failure-code",
  "aster.role-contract.invalid-source-link-rule",
  "aster.role-contract.canonical-result-authority",
  "aster.role-contract.authoritative-invocation",
  "aster.role-contract.role-owned-memory",
  "aster.role-contract.missing-retention-choice",
  "aster.role-contract.unrestricted-provider-egress",
  "aster.role-contract.authority-bearing-egress",
  "aster.role-contract.missing-manual-fallback",
  "aster.role-contract.missing-mandatory-prohibition",
] as const;

export type AsterRoleContractValidationIssueCode =
  (typeof ASTER_ROLE_CONTRACT_VALIDATION_ISSUE_CODES)[number];

export interface AsterRoleContractValidationIssue {
  readonly code: AsterRoleContractValidationIssueCode;
  readonly path: string;
  readonly message: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isNonEmptyArray(value: unknown): value is readonly unknown[] {
  return Array.isArray(value) && value.length > 0;
}

function includesString(values: readonly string[], value: unknown): boolean {
  return typeof value === "string" && values.includes(value);
}

function arraysEqual(left: unknown, right: readonly unknown[]): boolean {
  return (
    Array.isArray(left) &&
    left.length === right.length &&
    left.every((value, index) => value === right[index])
  );
}

function addIssue(
  issues: AsterRoleContractValidationIssue[],
  code: AsterRoleContractValidationIssueCode,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}

export function validateAsterRoleContracts(
  value: unknown,
): readonly AsterRoleContractValidationIssue[] {
  const issues: AsterRoleContractValidationIssue[] = [];

  if (!isRecord(value)) {
    addIssue(
      issues,
      "aster.role-contract.invalid-matrix",
      "$",
      "The Aster role-contract matrix must be an object keyed by role.",
    );
    return issues;
  }

  for (const key of Object.keys(value)) {
    if (!includesString(ASTER_ROLES, key)) {
      addIssue(
        issues,
        "aster.role-contract.unknown-role",
        `$.${key}`,
        "The role-contract matrix contains an unknown Aster role.",
      );
    }
  }

  for (const role of ASTER_ROLES) {
    const path = `$.${role}`;
    const contract = value[role];
    const authority = ASTER_ROLE_AUTHORITY_MATRIX[role];

    if (!isRecord(contract)) {
      addIssue(
        issues,
        "aster.role-contract.missing-role",
        path,
        "Every Aster role must have a detailed role contract.",
      );
      continue;
    }

    if (contract.role !== role) {
      addIssue(
        issues,
        "aster.role-contract.role-mismatch",
        `${path}.role`,
        "The detailed contract role must match its matrix key.",
      );
    }

    if (contract.contractId !== `aster.role.${role}`) {
      addIssue(
        issues,
        "aster.role-contract.invalid-contract-id",
        `${path}.contractId`,
        "The contract identifier must be stable and role-specific.",
      );
    }

    if (contract.revision !== 1) {
      addIssue(
        issues,
        "aster.role-contract.invalid-revision",
        `${path}.revision`,
        "The initial role-contract revision must be 1.",
      );
    }

    if (contract.operationId !== ASTER_ROLE_OPERATION_BY_ROLE[role]) {
      addIssue(
        issues,
        "aster.role-contract.invalid-operation",
        `${path}.operationId`,
        "The role contract must declare its recognized bounded operation.",
      );
    }

    const authorityMatches =
      contract.accessibleName === authority.accessibleName &&
      contract.purpose === authority.primaryPurpose &&
      arraysEqual(contract.allowedInputClasses, authority.allowedInputClasses) &&
      arraysEqual(
        contract.allowedOutputClasses,
        authority.allowedOutputClasses,
      ) &&
      arraysEqual(contract.executionClasses, authority.executionClasses) &&
      contract.confirmationRule === authority.confirmationRule &&
      contract.deterministicActionOwner === authority.authoritativeActionOwner;

    if (!authorityMatches) {
      addIssue(
        issues,
        "aster.role-contract.authority-matrix-mismatch",
        path,
        "Detailed role contracts must remain aligned with the public authority matrix.",
      );
    }

    if (!isNonEmptyArray(contract.evidenceRequirements)) {
      addIssue(
        issues,
        "aster.role-contract.empty-evidence-requirements",
        `${path}.evidenceRequirements`,
        "Every role contract must declare authority or source evidence requirements.",
      );
    } else {
      for (const [index, requirement] of contract.evidenceRequirements.entries()) {
        const requirementPath = `${path}.evidenceRequirements[${index}]`;
        if (
          !isRecord(requirement) ||
          !isNonEmptyString(requirement.requirementId) ||
          !isNonEmptyString(requirement.purpose) ||
          !isNonEmptyArray(requirement.anyOf)
        ) {
          addIssue(
            issues,
            "aster.role-contract.invalid-evidence-requirement",
            requirementPath,
            "Evidence requirements need an identifier, purpose, and at least one allowed evidence class.",
          );
          continue;
        }

        for (const evidence of requirement.anyOf) {
          if (!authority.authoritativeSources.includes(evidence as never)) {
            addIssue(
              issues,
              "aster.role-contract.invalid-evidence-class",
              `${requirementPath}.anyOf`,
              "Evidence classes must be allowed by the role authority contract.",
            );
          }
        }
      }
    }

    if (!isNonEmptyArray(contract.clarificationTriggers)) {
      addIssue(
        issues,
        "aster.role-contract.empty-clarification-triggers",
        `${path}.clarificationTriggers`,
        "Every role must identify material conditions that require clarification.",
      );
    } else {
      for (const trigger of contract.clarificationTriggers) {
        if (!includesString(ASTER_CLARIFICATION_TRIGGERS, trigger)) {
          addIssue(
            issues,
            "aster.role-contract.invalid-clarification-trigger",
            `${path}.clarificationTriggers`,
            "Clarification triggers must use the public taxonomy.",
          );
        }
      }
    }

    if (!includesString(ASTER_CONFIDENCE_RULES, contract.confidenceRule)) {
      addIssue(
        issues,
        "aster.role-contract.invalid-confidence-rule",
        `${path}.confidenceRule`,
        "Confidence must be evidence-bounded and cannot create authority.",
      );
    }

    if (!isNonEmptyArray(contract.uncertaintyRules)) {
      addIssue(
        issues,
        "aster.role-contract.empty-uncertainty-rules",
        `${path}.uncertaintyRules`,
        "Every role must preserve uncertainty proportionate to its output.",
      );
    }

    if (!isNonEmptyArray(contract.failureCodes)) {
      addIssue(
        issues,
        "aster.role-contract.empty-failure-codes",
        `${path}.failureCodes`,
        "Every role must expose stable failure and fallback outcomes.",
      );
    } else {
      for (const failureCode of contract.failureCodes) {
        if (!includesString(ASTER_ROLE_FAILURE_CODES, failureCode)) {
          addIssue(
            issues,
            "aster.role-contract.invalid-failure-code",
            `${path}.failureCodes`,
            "Failure codes must use the public role-failure taxonomy.",
          );
        }
      }
    }

    if (!includesString(ASTER_SOURCE_LINK_RULES, contract.sourceLinkRule)) {
      addIssue(
        issues,
        "aster.role-contract.invalid-source-link-rule",
        `${path}.sourceLinkRule`,
        "Every role must declare how source links apply to its results.",
      );
    }

    if (contract.resultCanBecomeCanonical !== false) {
      addIssue(
        issues,
        "aster.role-contract.canonical-result-authority",
        `${path}.resultCanBecomeCanonical`,
        "Aster role results cannot become canonical without separate confirmation and domain validation.",
      );
    }

    if (contract.canInvokeAuthoritativeAction !== false) {
      addIssue(
        issues,
        "aster.role-contract.authoritative-invocation",
        `${path}.canInvokeAuthoritativeAction`,
        "Aster role output cannot invoke an authoritative action.",
      );
    }

    const retention = isRecord(contract.retention) ? contract.retention : {};
    if (retention.roleOwnedMemory !== false) {
      addIssue(
        issues,
        "aster.role-contract.role-owned-memory",
        `${path}.retention.roleOwnedMemory`,
        "A role contract cannot silently own retained product memory.",
      );
    }

    if (retention.retainedMemoryRequiresSeparatePlayerChoice !== true) {
      addIssue(
        issues,
        "aster.role-contract.missing-retention-choice",
        `${path}.retention.retainedMemoryRequiresSeparatePlayerChoice`,
        "Retained memory requires a separate visible player choice.",
      );
    }

    const providerEgress = isRecord(contract.providerEgress)
      ? contract.providerEgress
      : {};
    if (providerEgress.mode !== "policy-gated-minimum-necessary") {
      addIssue(
        issues,
        "aster.role-contract.unrestricted-provider-egress",
        `${path}.providerEgress.mode`,
        "Provider egress must remain policy-gated and minimum necessary.",
      );
    }

    if (providerEgress.authorityBearingContextProhibited !== true) {
      addIssue(
        issues,
        "aster.role-contract.authority-bearing-egress",
        `${path}.providerEgress.authorityBearingContextProhibited`,
        "Authority-bearing context cannot be treated as ordinary provider payload.",
      );
    }

    if (!isNonEmptyString(contract.manualFallback)) {
      addIssue(
        issues,
        "aster.role-contract.missing-manual-fallback",
        `${path}.manualFallback`,
        "Every Aster role must identify a complete manual or deterministic fallback.",
      );
    }

    const prohibitedActions = Array.isArray(contract.prohibitedActions)
      ? contract.prohibitedActions
      : [];
    for (const prohibitedAction of ASTER_MANDATORY_PROHIBITED_ACTIONS) {
      if (!prohibitedActions.includes(prohibitedAction)) {
        addIssue(
          issues,
          "aster.role-contract.missing-mandatory-prohibition",
          `${path}.prohibitedActions`,
          `The role contract must explicitly prohibit ${prohibitedAction}.`,
        );
      }
    }
  }

  return issues;
}
