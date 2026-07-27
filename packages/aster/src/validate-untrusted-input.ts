import {
  ASTER_CONTRACT_VERSION,
  ASTER_UNTRUSTED_INPUT_ALLOWED_USES,
  ASTER_UNTRUSTED_INPUT_AUTHORITY_BOUNDARY,
  ASTER_UNTRUSTED_INPUT_CLASSES,
  ASTER_UNTRUSTED_INPUT_CLASS_POLICIES,
  ASTER_UNTRUSTED_INPUT_DISPOSITIONS,
  ASTER_UNTRUSTED_INPUT_EFFECT_BOUNDARY,
  ASTER_UNTRUSTED_INPUT_FINDING_CODES,
  ASTER_UNTRUSTED_INPUT_VISIBILITY_BOUNDARY,
  type AsterUntrustedInputAllowedUse,
  type AsterUntrustedInputClass,
  type AsterUntrustedInputFindingCode,
} from "./untrusted-input.js";

export const ASTER_UNTRUSTED_INPUT_VALIDATION_ISSUE_CODES = [
  "aster.untrusted-input.invalid-envelope",
  "aster.untrusted-input.invalid-schema",
  "aster.untrusted-input.invalid-identity",
  "aster.untrusted-input.invalid-request-reference",
  "aster.untrusted-input.invalid-server-context",
  "aster.untrusted-input.invalid-input",
  "aster.untrusted-input.duplicate-input",
  "aster.untrusted-input.invalid-use",
  "aster.untrusted-input.instruction-authority",
  "aster.untrusted-input.invalid-finding",
  "aster.untrusted-input.missing-finding",
  "aster.untrusted-input.unsafe-disposition",
  "aster.untrusted-input.invalid-clarification",
  "aster.untrusted-input.invalid-fallback",
  "aster.untrusted-input.source-suppression",
  "aster.untrusted-input.uncertainty-suppression",
  "aster.untrusted-input.authority-escalation",
  "aster.untrusted-input.effect-escalation",
] as const;

export type AsterUntrustedInputValidationIssueCode =
  (typeof ASTER_UNTRUSTED_INPUT_VALIDATION_ISSUE_CODES)[number];

export interface AsterUntrustedInputValidationIssue {
  readonly code: AsterUntrustedInputValidationIssueCode;
  readonly path: string;
  readonly message: string;
}

export interface AsterUntrustedInputValidationResult {
  readonly valid: boolean;
  readonly issues: readonly AsterUntrustedInputValidationIssue[];
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isPositiveInteger(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) > 0;
}

function isUniqueStrings(value: unknown): value is readonly string[] {
  return (
    Array.isArray(value) &&
    value.every(isNonEmptyString) &&
    new Set(value).size === value.length
  );
}

function matchesLiteralObject(value: unknown, expected: object): boolean {
  if (!isObject(value)) return false;
  return Object.entries(expected).every(
    ([key, literal]) => value[key] === literal,
  );
}

function push(
  issues: AsterUntrustedInputValidationIssue[],
  code: AsterUntrustedInputValidationIssueCode,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}

export function validateAsterUntrustedInputClassPolicies(): AsterUntrustedInputValidationResult {
  const issues: AsterUntrustedInputValidationIssue[] = [];

  for (const inputClass of ASTER_UNTRUSTED_INPUT_CLASSES) {
    const policy = ASTER_UNTRUSTED_INPUT_CLASS_POLICIES[inputClass];

    if (!policy || policy.inputClass !== inputClass) {
      push(
        issues,
        "aster.untrusted-input.invalid-input",
        `policies.${inputClass}`,
        "Every public input class requires one matching policy.",
      );
      continue;
    }

    if (
      !Array.isArray(policy.allowedUses) ||
      policy.allowedUses.length === 0 ||
      policy.allowedUses.some(
        (use) =>
          !ASTER_UNTRUSTED_INPUT_ALLOWED_USES.includes(
            use as AsterUntrustedInputAllowedUse,
          ),
      )
    ) {
      push(
        issues,
        "aster.untrusted-input.invalid-use",
        `policies.${inputClass}.allowedUses`,
        "Policy uses must be a non-empty subset of the public use taxonomy.",
      );
    }

    if (
      policy.contentTreatedAsData !== true ||
      policy.embeddedInstructionsTreatedAsData !== true ||
      policy.canSetPolicy !== false ||
      policy.canModifyToolRegistry !== false ||
      policy.canChooseControllingSubject !== false ||
      policy.canCreateOrExpandPermission !== false ||
      policy.canInvokeResources !== false ||
      policy.canPersistItselfAsMemory !== false
    ) {
      push(
        issues,
        "aster.untrusted-input.instruction-authority",
        `policies.${inputClass}`,
        "Untrusted input policy must treat content and embedded instructions as data-only without authority.",
      );
    }
  }

  return { valid: issues.length === 0, issues };
}

export function validateAsterUntrustedInputIsolation(
  value: unknown,
): AsterUntrustedInputValidationResult {
  const issues: AsterUntrustedInputValidationIssue[] = [];

  if (!isObject(value)) {
    push(
      issues,
      "aster.untrusted-input.invalid-envelope",
      "$",
      "Isolation envelope must be an object.",
    );
    return { valid: false, issues };
  }

  if (
    value.schemaId !== "aster.untrusted-input.isolation" ||
    value.schemaRevision !== 1 ||
    value.contractVersion !== ASTER_CONTRACT_VERSION
  ) {
    push(
      issues,
      "aster.untrusted-input.invalid-schema",
      "$",
      "Isolation schema and contract version must match the public contract.",
    );
  }

  if (
    !isNonEmptyString(value.isolationId) ||
    !isPositiveInteger(value.isolationRevision)
  ) {
    push(
      issues,
      "aster.untrusted-input.invalid-identity",
      "isolationId",
      "Isolation identity and revision are required.",
    );
  }

  if (
    !isNonEmptyString(value.requestId) ||
    !isPositiveInteger(value.requestRevision)
  ) {
    push(
      issues,
      "aster.untrusted-input.invalid-request-reference",
      "requestId",
      "Request identity and revision are required.",
    );
  }

  const context = value.serverContext;

  if (
    !isObject(context) ||
    !isNonEmptyString(context.contextId) ||
    !isNonEmptyString(context.contextRevision) ||
    context.contextOwner !== "deterministic-application" ||
    !isObject(context.subject) ||
    !["chronicle-subject", "application-session"].includes(
      String(context.subject.subjectClass),
    ) ||
    !isNonEmptyString(context.subject.subjectId) ||
    !isNonEmptyString(context.purpose) ||
    !(
      context.subject.subjectRevision === null ||
      isNonEmptyString(context.subject.subjectRevision)
    ) ||
    !isUniqueStrings(context.authorityRevisionReferences) ||
    !isUniqueStrings(context.allowedResourceReferenceIds) ||
    !Array.isArray(context.allowedTools) ||
    typeof context.exactPlayerConfirmationRequired !== "boolean"
  ) {
    push(
      issues,
      "aster.untrusted-input.invalid-server-context",
      "serverContext",
      "Server context must be deterministic, revisioned, subject-bound, and explicit about allowed resources and tools.",
    );
  } else {
    const toolKeys = new Set<string>();

    for (const [index, tool] of context.allowedTools.entries()) {
      if (
        !isObject(tool) ||
        !isNonEmptyString(tool.toolId) ||
        !isNonEmptyString(tool.toolRevision) ||
        tool.registryOwner !== "server-owned-registry"
      ) {
        push(
          issues,
          "aster.untrusted-input.invalid-server-context",
          `serverContext.allowedTools[${index}]`,
          "Allowed tools must come from the server-owned registry with exact revisions.",
        );
        continue;
      }

      const key = `${tool.toolId}@${tool.toolRevision}`;

      if (toolKeys.has(key)) {
        push(
          issues,
          "aster.untrusted-input.invalid-server-context",
          `serverContext.allowedTools[${index}]`,
          "Allowed tool references must be unique.",
        );
      }

      toolKeys.add(key);
    }
  }

  const inputIds = new Set<string>();
  const mismatchedSubjectInputIds = new Set<string>();
  const resourceRequestInputIds = new Set<string>();
  const toolRequestInputIds = new Set<string>();

  if (!Array.isArray(value.inputs) || value.inputs.length === 0) {
    push(
      issues,
      "aster.untrusted-input.invalid-input",
      "inputs",
      "At least one untrusted input reference is required.",
    );
  } else {
    for (const [index, input] of value.inputs.entries()) {
      const path = `inputs[${index}]`;

      if (
        !isObject(input) ||
        !isNonEmptyString(input.inputId) ||
        !isNonEmptyString(input.inputRevision) ||
        !ASTER_UNTRUSTED_INPUT_CLASSES.includes(
          input.inputClass as AsterUntrustedInputClass,
        ) ||
        !isUniqueStrings(input.allowedUses) ||
        input.allowedUses.length === 0 ||
        input.allowedUses.some(
          (use) =>
            !ASTER_UNTRUSTED_INPUT_ALLOWED_USES.includes(
              use as AsterUntrustedInputAllowedUse,
            ),
        ) ||
        !isUniqueStrings(input.requestedResourceReferenceIds) ||
        !isUniqueStrings(input.requestedToolIds) ||
        !(
          input.sourceReferenceId === null ||
          isNonEmptyString(input.sourceReferenceId)
        ) ||
        !(
          input.claimedSubjectId === null ||
          isNonEmptyString(input.claimedSubjectId)
        )
      ) {
        push(
          issues,
          "aster.untrusted-input.invalid-input",
          path,
          "Input reference must use recognized identity, class, uses, and request fields.",
        );
        continue;
      }

      if (inputIds.has(input.inputId)) {
        push(
          issues,
          "aster.untrusted-input.duplicate-input",
          `${path}.inputId`,
          "Input identities must be unique.",
        );
      }

      inputIds.add(input.inputId);

      const inputClass = input.inputClass as AsterUntrustedInputClass;
      const policy = ASTER_UNTRUSTED_INPUT_CLASS_POLICIES[inputClass];

      if (
        input.allowedUses.some(
          (use) =>
            !policy.allowedUses.includes(use as AsterUntrustedInputAllowedUse),
        )
      ) {
        push(
          issues,
          "aster.untrusted-input.invalid-use",
          `${path}.allowedUses`,
          "Input uses must remain within the class policy.",
        );
      }

      if (
        input.contentTreatedAsData !== true ||
        input.embeddedInstructionsTreatedAsData !== true ||
        input.trusted !== false ||
        input.subjectClaimAccepted !== false ||
        input.authorityClaimsAccepted !== false
      ) {
        push(
          issues,
          "aster.untrusted-input.instruction-authority",
          path,
          "Input content and embedded instructions must remain untrusted data with no accepted authority claims.",
        );
      }

      if (
        isObject(context) &&
        isObject(context.subject) &&
        isNonEmptyString(input.claimedSubjectId) &&
        input.claimedSubjectId !== context.subject.subjectId
      ) {
        mismatchedSubjectInputIds.add(input.inputId);
      }

      if (input.requestedResourceReferenceIds.length > 0) {
        resourceRequestInputIds.add(input.inputId);
      }

      if (input.requestedToolIds.length > 0) {
        toolRequestInputIds.add(input.inputId);
      }
    }
  }

  const findingCodesByInput = new Map<
    string,
    Set<AsterUntrustedInputFindingCode>
  >();
  let hasMaterialFinding = false;

  if (!Array.isArray(value.findings)) {
    push(
      issues,
      "aster.untrusted-input.invalid-finding",
      "findings",
      "Findings must be an array.",
    );
  } else {
    const findingIds = new Set<string>();

    for (const [index, finding] of value.findings.entries()) {
      const path = `findings[${index}]`;

      if (
        !isObject(finding) ||
        !isNonEmptyString(finding.findingId) ||
        !ASTER_UNTRUSTED_INPUT_FINDING_CODES.includes(
          finding.code as AsterUntrustedInputFindingCode,
        ) ||
        !isUniqueStrings(finding.inputIds) ||
        finding.inputIds.length === 0 ||
        !isNonEmptyString(finding.description) ||
        typeof finding.material !== "boolean"
      ) {
        push(
          issues,
          "aster.untrusted-input.invalid-finding",
          path,
          "Finding must use recognized identity, code, input references, description, and materiality.",
        );
        continue;
      }

      if (findingIds.has(finding.findingId)) {
        push(
          issues,
          "aster.untrusted-input.invalid-finding",
          `${path}.findingId`,
          "Finding identities must be unique.",
        );
      }

      findingIds.add(finding.findingId);

      for (const inputId of finding.inputIds) {
        if (!inputIds.has(inputId)) {
          push(
            issues,
            "aster.untrusted-input.invalid-finding",
            `${path}.inputIds`,
            "Finding input references must resolve within the envelope.",
          );
        }

        const codes = findingCodesByInput.get(inputId) ?? new Set();
        const findingCode = finding.code as AsterUntrustedInputFindingCode;
        codes.add(findingCode);
        findingCodesByInput.set(inputId, codes);
      }

      if (finding.material) hasMaterialFinding = true;
    }
  }

  for (const inputId of mismatchedSubjectInputIds) {
    if (!findingCodesByInput.get(inputId)?.has("cross-subject-access")) {
      push(
        issues,
        "aster.untrusted-input.missing-finding",
        "findings",
        "A subject claim outside the server-resolved subject requires a cross-subject finding.",
      );
    }
  }

  for (const inputId of resourceRequestInputIds) {
    if (
      !findingCodesByInput.get(inputId)?.has("arbitrary-resource-invocation")
    ) {
      push(
        issues,
        "aster.untrusted-input.missing-finding",
        "findings",
        "An untrusted resource request requires an arbitrary-resource finding.",
      );
    }
  }

  for (const inputId of toolRequestInputIds) {
    if (
      !findingCodesByInput.get(inputId)?.has("arbitrary-resource-invocation")
    ) {
      push(
        issues,
        "aster.untrusted-input.missing-finding",
        "findings",
        "An untrusted tool request requires an arbitrary-resource finding.",
      );
    }
  }

  if (
    !ASTER_UNTRUSTED_INPUT_DISPOSITIONS.includes(value.disposition as never) ||
    typeof value.proposalPreparationAllowed !== "boolean"
  ) {
    push(
      issues,
      "aster.untrusted-input.unsafe-disposition",
      "disposition",
      "Disposition and proposal-preparation flag must use the public contract.",
    );
  }

  if (
    value.disposition === "data-only" &&
    (value.clarificationQuestion !== null || value.manualFallback !== null)
  ) {
    push(
      issues,
      "aster.untrusted-input.unsafe-disposition",
      "disposition",
      "Data-only disposition cannot claim an active clarification or manual fallback.",
    );
  }

  if (
    value.disposition === "clarification-required" &&
    value.proposalPreparationAllowed !== false
  ) {
    push(
      issues,
      "aster.untrusted-input.unsafe-disposition",
      "proposalPreparationAllowed",
      "Clarification-required input cannot prepare a proposal before clarification.",
    );
  }

  if (
    ["blocked", "manual-fallback"].includes(String(value.disposition)) &&
    value.proposalPreparationAllowed !== false
  ) {
    push(
      issues,
      "aster.untrusted-input.unsafe-disposition",
      "proposalPreparationAllowed",
      "Blocked or manual-fallback input cannot prepare a proposal.",
    );
  }

  if (
    value.disposition === "clarification-required" &&
    !isNonEmptyString(value.clarificationQuestion)
  ) {
    push(
      issues,
      "aster.untrusted-input.invalid-clarification",
      "clarificationQuestion",
      "Clarification-required isolation needs a direct question.",
    );
  }

  if (
    ["blocked", "manual-fallback"].includes(String(value.disposition)) &&
    !isNonEmptyString(value.manualFallback)
  ) {
    push(
      issues,
      "aster.untrusted-input.invalid-fallback",
      "manualFallback",
      "Blocked or manual-fallback isolation requires a safe fallback.",
    );
  }

  if (
    hasMaterialFinding &&
    !["blocked", "manual-fallback"].includes(String(value.disposition))
  ) {
    push(
      issues,
      "aster.untrusted-input.unsafe-disposition",
      "disposition",
      "Material prompt-injection findings must block proposal preparation or use a manual fallback.",
    );
  }

  if (
    value.proposalPreparationAllowed === true &&
    (value.disposition !== "data-only" || hasMaterialFinding)
  ) {
    push(
      issues,
      "aster.untrusted-input.unsafe-disposition",
      "proposalPreparationAllowed",
      "Proposal preparation is allowed only for data-only input without material findings.",
    );
  }

  if (
    !matchesLiteralObject(
      value.visibility,
      ASTER_UNTRUSTED_INPUT_VISIBILITY_BOUNDARY,
    )
  ) {
    if (
      isObject(value.visibility) &&
      value.visibility.sourcesPreserved !== true
    ) {
      push(
        issues,
        "aster.untrusted-input.source-suppression",
        "visibility.sourcesPreserved",
        "Untrusted content cannot suppress sources.",
      );
    }

    if (
      isObject(value.visibility) &&
      value.visibility.uncertaintyPreserved !== true
    ) {
      push(
        issues,
        "aster.untrusted-input.uncertainty-suppression",
        "visibility.uncertaintyPreserved",
        "Untrusted content cannot suppress uncertainty.",
      );
    }

    if (
      isObject(value.visibility) &&
      value.visibility.conflictsPreserved !== true
    ) {
      push(
        issues,
        "aster.untrusted-input.source-suppression",
        "visibility.conflictsPreserved",
        "Untrusted content cannot suppress conflicts or disagreement.",
      );
    }
  }

  if (
    !matchesLiteralObject(
      value.authority,
      ASTER_UNTRUSTED_INPUT_AUTHORITY_BOUNDARY,
    )
  ) {
    push(
      issues,
      "aster.untrusted-input.authority-escalation",
      "authority",
      "Untrusted input cannot gain policy, subject, permission, action, tool, memory, source, secret, canonical, or clinical authority.",
    );
  }

  if (
    !matchesLiteralObject(value.effects, ASTER_UNTRUSTED_INPUT_EFFECT_BOUNDARY)
  ) {
    push(
      issues,
      "aster.untrusted-input.effect-escalation",
      "effects",
      "Isolation evaluation cannot itself invoke tools, access resources, persist memory, or attempt canonical writes.",
    );
  }

  return { valid: issues.length === 0, issues };
}
