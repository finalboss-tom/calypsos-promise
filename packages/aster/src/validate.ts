import {
  ASTER_AUTHORITATIVE_ACTION_OWNERS,
  ASTER_CONFIRMATION_RULES,
  ASTER_EXECUTION_CLASSES,
  ASTER_MANDATORY_PROHIBITED_ACTIONS,
  ASTER_ROLES,
  type AsterRole,
} from "./authority.js";

export const ASTER_AUTHORITY_VALIDATION_ISSUE_CODES = [
  "aster.authority.invalid-matrix",
  "aster.authority.missing-role",
  "aster.authority.unknown-role",
  "aster.authority.role-mismatch",
  "aster.authority.missing-accessible-name",
  "aster.authority.missing-purpose",
  "aster.authority.empty-input-classes",
  "aster.authority.empty-output-classes",
  "aster.authority.empty-authoritative-sources",
  "aster.authority.invalid-action-owner",
  "aster.authority.invalid-execution-class",
  "aster.authority.empty-execution-classes",
  "aster.authority.invalid-confirmation-rule",
  "aster.authority.canonical-write-authority",
  "aster.authority.permission-authority",
  "aster.authority.self-confirmation-authority",
  "aster.authority.quest-completion-authority",
  "aster.authority.reward-authority",
  "aster.authority.missing-prohibited-action",
] as const;

export type AsterAuthorityValidationIssueCode =
  (typeof ASTER_AUTHORITY_VALIDATION_ISSUE_CODES)[number];

export interface AsterAuthorityValidationIssue {
  readonly code: AsterAuthorityValidationIssueCode;
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

function addIssue(
  issues: AsterAuthorityValidationIssue[],
  code: AsterAuthorityValidationIssueCode,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}

export function validateAsterRoleAuthorityMatrix(
  value: unknown,
): readonly AsterAuthorityValidationIssue[] {
  const issues: AsterAuthorityValidationIssue[] = [];

  if (!isRecord(value)) {
    addIssue(
      issues,
      "aster.authority.invalid-matrix",
      "$",
      "The Aster authority matrix must be an object keyed by role.",
    );
    return issues;
  }

  for (const key of Object.keys(value)) {
    if (!includesString(ASTER_ROLES, key)) {
      addIssue(
        issues,
        "aster.authority.unknown-role",
        `$.${key}`,
        "The authority matrix contains an unknown Aster role.",
      );
    }
  }

  for (const role of ASTER_ROLES) {
    const path = `$.${role}`;
    const contract = value[role];

    if (!isRecord(contract)) {
      addIssue(
        issues,
        "aster.authority.missing-role",
        path,
        "Every Aster role must have an authority contract.",
      );
      continue;
    }

    if (contract.role !== role) {
      addIssue(
        issues,
        "aster.authority.role-mismatch",
        `${path}.role`,
        "The contract role must match its authority-matrix key.",
      );
    }

    if (!isNonEmptyString(contract.accessibleName)) {
      addIssue(
        issues,
        "aster.authority.missing-accessible-name",
        `${path}.accessibleName`,
        "Every narrative role must have a direct accessible name.",
      );
    }

    if (!isNonEmptyString(contract.primaryPurpose)) {
      addIssue(
        issues,
        "aster.authority.missing-purpose",
        `${path}.primaryPurpose`,
        "Every Aster role must state one primary purpose.",
      );
    }

    if (!isNonEmptyArray(contract.allowedInputClasses)) {
      addIssue(
        issues,
        "aster.authority.empty-input-classes",
        `${path}.allowedInputClasses`,
        "Every Aster role must declare allowed input classes.",
      );
    }

    if (!isNonEmptyArray(contract.allowedOutputClasses)) {
      addIssue(
        issues,
        "aster.authority.empty-output-classes",
        `${path}.allowedOutputClasses`,
        "Every Aster role must declare allowed output classes.",
      );
    }

    if (!isNonEmptyArray(contract.authoritativeSources)) {
      addIssue(
        issues,
        "aster.authority.empty-authoritative-sources",
        `${path}.authoritativeSources`,
        "Every role must identify the authoritative sources it may reference.",
      );
    }

    if (
      !includesString(
        ASTER_AUTHORITATIVE_ACTION_OWNERS,
        contract.authoritativeActionOwner,
      )
    ) {
      addIssue(
        issues,
        "aster.authority.invalid-action-owner",
        `${path}.authoritativeActionOwner`,
        "The authoritative action owner must be a recognized deterministic capability or none.",
      );
    }

    if (!isNonEmptyArray(contract.executionClasses)) {
      addIssue(
        issues,
        "aster.authority.empty-execution-classes",
        `${path}.executionClasses`,
        "Every role must declare at least one execution classification.",
      );
    } else {
      for (const executionClass of contract.executionClasses) {
        if (!includesString(ASTER_EXECUTION_CLASSES, executionClass)) {
          addIssue(
            issues,
            "aster.authority.invalid-execution-class",
            `${path}.executionClasses`,
            "Execution classifications must be responsive, deferred, or manual-fallback.",
          );
        }
      }
    }

    if (!includesString(ASTER_CONFIRMATION_RULES, contract.confirmationRule)) {
      addIssue(
        issues,
        "aster.authority.invalid-confirmation-rule",
        `${path}.confirmationRule`,
        "The role must state whether confirmation is required before a domain action.",
      );
    }

    if (contract.canWriteCanonicalRecords !== false) {
      addIssue(
        issues,
        "aster.authority.canonical-write-authority",
        `${path}.canWriteCanonicalRecords`,
        "Aster cannot write canonical records.",
      );
    }

    if (contract.canCreateOrExpandPermission !== false) {
      addIssue(
        issues,
        "aster.authority.permission-authority",
        `${path}.canCreateOrExpandPermission`,
        "Aster cannot create or expand permission.",
      );
    }

    if (contract.canSelfConfirmOutput !== false) {
      addIssue(
        issues,
        "aster.authority.self-confirmation-authority",
        `${path}.canSelfConfirmOutput`,
        "Aster output is never self-confirming.",
      );
    }

    if (contract.canCompleteQuest !== false) {
      addIssue(
        issues,
        "aster.authority.quest-completion-authority",
        `${path}.canCompleteQuest`,
        "Aster cannot complete quests.",
      );
    }

    if (contract.canGrantReward !== false) {
      addIssue(
        issues,
        "aster.authority.reward-authority",
        `${path}.canGrantReward`,
        "Aster cannot grant rewards.",
      );
    }

    const prohibitedActions = Array.isArray(contract.prohibitedActions)
      ? contract.prohibitedActions
      : [];

    for (const prohibitedAction of ASTER_MANDATORY_PROHIBITED_ACTIONS) {
      if (!prohibitedActions.includes(prohibitedAction)) {
        addIssue(
          issues,
          "aster.authority.missing-prohibited-action",
          `${path}.prohibitedActions`,
          `The role must explicitly prohibit ${prohibitedAction}.`,
        );
      }
    }
  }

  return issues;
}

export function isAsterRole(value: unknown): value is AsterRole {
  return includesString(ASTER_ROLES, value);
}
