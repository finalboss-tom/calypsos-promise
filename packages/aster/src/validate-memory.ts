import {
  ASTER_MEMORY_CLASSES,
  ASTER_MEMORY_CLASS_POLICIES,
  ASTER_MEMORY_EGRESS_MODES,
  ASTER_MEMORY_LIFECYCLE_STATES,
  ASTER_MEMORY_MISSING_FALLBACKS,
  ASTER_MEMORY_OWNER_CLASSES,
  ASTER_MEMORY_RETENTION_MODES,
  ASTER_MEMORY_SOURCE_CLASSES,
  ASTER_CONTRACT_VERSION,
  type AsterMemoryClass,
} from "./memory.js";

export const ASTER_MEMORY_POLICY_VALIDATION_ISSUE_CODES = [
  "aster.memory-policy.invalid-matrix",
  "aster.memory-policy.missing-class",
  "aster.memory-policy.unknown-class",
  "aster.memory-policy.class-mismatch",
  "aster.memory-policy.invalid-policy-reference",
  "aster.memory-policy.hidden-material-memory",
  "aster.memory-policy.uneditable-material-memory",
  "aster.memory-policy.unexportable-material-memory",
  "aster.memory-policy.undeletable-material-memory",
  "aster.memory-policy.missing-player-choice",
  "aster.memory-policy.provider-metadata-product-memory",
  "aster.memory-policy.provider-metadata-boundary",
  "aster.memory-policy.secondary-use-authority",
  "aster.memory-policy.training-authority",
  "aster.memory-policy.research-authority",
  "aster.memory-policy.commercial-authority",
  "aster.memory-policy.canonical-authority",
  "aster.memory-policy.permission-authority",
  "aster.memory-policy.progression-authority",
  "aster.memory-policy.reward-authority",
  "aster.memory-policy.core-blocking",
  "aster.memory-policy.missing-fallback",
] as const;

export type AsterMemoryPolicyValidationIssueCode =
  (typeof ASTER_MEMORY_POLICY_VALIDATION_ISSUE_CODES)[number];

export const ASTER_MEMORY_ENTRY_VALIDATION_ISSUE_CODES = [
  "aster.memory.invalid-entry",
  "aster.memory.invalid-schema",
  "aster.memory.invalid-contract-version",
  "aster.memory.invalid-memory-id",
  "aster.memory.invalid-memory-revision",
  "aster.memory.invalid-class",
  "aster.memory.invalid-owner",
  "aster.memory.invalid-subject",
  "aster.memory.policy-mismatch",
  "aster.memory.missing-player-choice",
  "aster.memory.invalid-source-reference",
  "aster.memory.missing-required-source",
  "aster.memory.invalid-retention",
  "aster.memory.missing-expiry",
  "aster.memory.invalid-lifecycle",
  "aster.memory.invalid-correction-reference",
  "aster.memory.invalid-supersession-reference",
  "aster.memory.missing-deletion-request",
  "aster.memory.value-retained-after-unavailability",
  "aster.memory.player-controls-mismatch",
  "aster.memory.invalid-egress",
  "aster.memory.provider-metadata-content",
  "aster.memory.secondary-use-authority",
  "aster.memory.training-authority",
  "aster.memory.research-authority",
  "aster.memory.commercial-authority",
  "aster.memory.missing-fallback",
  "aster.memory.core-blocking",
  "aster.memory.canonical-authority",
  "aster.memory.permission-authority",
  "aster.memory.confirmation-authority",
  "aster.memory.progression-authority",
  "aster.memory.reward-authority",
] as const;

export type AsterMemoryEntryValidationIssueCode =
  (typeof ASTER_MEMORY_ENTRY_VALIDATION_ISSUE_CODES)[number];

export interface AsterMemoryPolicyValidationIssue {
  readonly code: AsterMemoryPolicyValidationIssueCode;
  readonly path: string;
  readonly message: string;
}

export interface AsterMemoryEntryValidationIssue {
  readonly code: AsterMemoryEntryValidationIssueCode;
  readonly path: string;
  readonly message: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isPositiveInteger(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) > 0;
}

function includesString(values: readonly string[], value: unknown): boolean {
  return typeof value === "string" && values.includes(value);
}

function addPolicyIssue(
  issues: AsterMemoryPolicyValidationIssue[],
  code: AsterMemoryPolicyValidationIssueCode,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}

function addEntryIssue(
  issues: AsterMemoryEntryValidationIssue[],
  code: AsterMemoryEntryValidationIssueCode,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}

export function validateAsterMemoryClassPolicies(
  value: unknown,
): readonly AsterMemoryPolicyValidationIssue[] {
  const issues: AsterMemoryPolicyValidationIssue[] = [];

  if (!isRecord(value)) {
    addPolicyIssue(
      issues,
      "aster.memory-policy.invalid-matrix",
      "$",
      "The memory policy matrix must be an object keyed by memory class.",
    );
    return issues;
  }

  for (const key of Object.keys(value)) {
    if (!includesString(ASTER_MEMORY_CLASSES, key)) {
      addPolicyIssue(
        issues,
        "aster.memory-policy.unknown-class",
        `$.${key}`,
        "The memory policy matrix contains an unknown memory class.",
      );
    }
  }

  for (const memoryClass of ASTER_MEMORY_CLASSES) {
    const path = `$.${memoryClass}`;
    const policy = value[memoryClass];

    if (!isRecord(policy)) {
      addPolicyIssue(
        issues,
        "aster.memory-policy.missing-class",
        path,
        "Every public memory class must have a policy.",
      );
      continue;
    }

    if (policy.memoryClass !== memoryClass) {
      addPolicyIssue(
        issues,
        "aster.memory-policy.class-mismatch",
        `${path}.memoryClass`,
        "The policy memory class must match its matrix key.",
      );
    }

    if (
      policy.policyId !== "policy.aster.memory.baseline" ||
      policy.policyRevision !== 1
    ) {
      addPolicyIssue(
        issues,
        "aster.memory-policy.invalid-policy-reference",
        path,
        "Memory policies must use the recognized baseline policy and revision.",
      );
    }

    if (policy.material === true && policy.productMemory === true) {
      if (policy.playerVisible !== true) {
        addPolicyIssue(
          issues,
          "aster.memory-policy.hidden-material-memory",
          `${path}.playerVisible`,
          "Material product memory must be visible to the player.",
        );
      }
      if (policy.playerEditable !== true) {
        addPolicyIssue(
          issues,
          "aster.memory-policy.uneditable-material-memory",
          `${path}.playerEditable`,
          "Material product memory must be editable through an inspectable revision.",
        );
      }
      if (policy.playerExportable !== true) {
        addPolicyIssue(
          issues,
          "aster.memory-policy.unexportable-material-memory",
          `${path}.playerExportable`,
          "Material product memory must be exportable.",
        );
      }
      if (policy.playerDeletable !== true) {
        addPolicyIssue(
          issues,
          "aster.memory-policy.undeletable-material-memory",
          `${path}.playerDeletable`,
          "Material product memory must be deletable.",
        );
      }
      if (policy.requiresSeparatePlayerChoice !== true) {
        addPolicyIssue(
          issues,
          "aster.memory-policy.missing-player-choice",
          `${path}.requiresSeparatePlayerChoice`,
          "Retained material memory requires a separate visible player choice.",
        );
      }
    }

    if (memoryClass === "provider-operational-metadata") {
      if (policy.productMemory !== false) {
        addPolicyIssue(
          issues,
          "aster.memory-policy.provider-metadata-product-memory",
          `${path}.productMemory`,
          "Provider operational metadata is not product memory.",
        );
      }
      if (
        policy.providerOperationalOnly !== true ||
        policy.owner !== "provider-operations" ||
        policy.egressMode !== "provider-operations-only"
      ) {
        addPolicyIssue(
          issues,
          "aster.memory-policy.provider-metadata-boundary",
          path,
          "Provider operational metadata must remain outside product memory and bounded to provider operations.",
        );
      }
    }

    if (policy.secondaryUseAllowed !== false) {
      addPolicyIssue(
        issues,
        "aster.memory-policy.secondary-use-authority",
        `${path}.secondaryUseAllowed`,
        "A memory policy cannot authorize secondary use.",
      );
    }
    if (policy.providerTrainingAllowed !== false) {
      addPolicyIssue(
        issues,
        "aster.memory-policy.training-authority",
        `${path}.providerTrainingAllowed`,
        "A memory policy cannot authorize provider training.",
      );
    }
    if (policy.researchUseAllowed !== false) {
      addPolicyIssue(
        issues,
        "aster.memory-policy.research-authority",
        `${path}.researchUseAllowed`,
        "A memory policy cannot authorize research use.",
      );
    }
    if (policy.commercialUseAllowed !== false) {
      addPolicyIssue(
        issues,
        "aster.memory-policy.commercial-authority",
        `${path}.commercialUseAllowed`,
        "A memory policy cannot authorize commercial use.",
      );
    }
    if (policy.canonicalRecord !== false) {
      addPolicyIssue(
        issues,
        "aster.memory-policy.canonical-authority",
        `${path}.canonicalRecord`,
        "Memory cannot become a canonical Chronicle record.",
      );
    }
    if (policy.permissionRecord !== false) {
      addPolicyIssue(
        issues,
        "aster.memory-policy.permission-authority",
        `${path}.permissionRecord`,
        "Memory cannot become House of Keys permission truth.",
      );
    }
    if (policy.canCompleteQuest !== false) {
      addPolicyIssue(
        issues,
        "aster.memory-policy.progression-authority",
        `${path}.canCompleteQuest`,
        "Memory cannot complete quests.",
      );
    }
    if (policy.canGrantReward !== false) {
      addPolicyIssue(
        issues,
        "aster.memory-policy.reward-authority",
        `${path}.canGrantReward`,
        "Memory cannot grant rewards.",
      );
    }
    if (policy.corePathMayBlockWhenMissing !== false) {
      addPolicyIssue(
        issues,
        "aster.memory-policy.core-blocking",
        `${path}.corePathMayBlockWhenMissing`,
        "Missing memory cannot block core rights or core product paths.",
      );
    }
    if (
      !includesString(
        ASTER_MEMORY_MISSING_FALLBACKS,
        policy.missingMemoryFallback,
      )
    ) {
      addPolicyIssue(
        issues,
        "aster.memory-policy.missing-fallback",
        `${path}.missingMemoryFallback`,
        "Every memory class needs a recognized missing-memory fallback.",
      );
    }
  }

  return issues;
}

const REQUIRED_SOURCE_CLASS_BY_MEMORY_CLASS: Readonly<
  Partial<Record<AsterMemoryClass, string>>
> = {
  "transient-context": "request-context",
  "retained-preference": "player-choice",
  "accessibility-context": "accessibility-setting",
  "retained-conversation": "retained-conversation",
  "derived-record-linked-memory": "chronicle-record",
  "narrative-presentation-state": "gameplay-state",
  "provider-operational-metadata": "provider-operation",
};

export function validateAsterMemoryEntry(
  value: unknown,
): readonly AsterMemoryEntryValidationIssue[] {
  const issues: AsterMemoryEntryValidationIssue[] = [];

  if (!isRecord(value)) {
    addEntryIssue(
      issues,
      "aster.memory.invalid-entry",
      "$",
      "An Aster memory entry must be an object.",
    );
    return issues;
  }

  if (value.schemaId !== "aster.memory.entry" || value.schemaRevision !== 1) {
    addEntryIssue(
      issues,
      "aster.memory.invalid-schema",
      "$.schemaId",
      "Memory entries must use the recognized schema and revision.",
    );
  }

  if (value.contractVersion !== ASTER_CONTRACT_VERSION) {
    addEntryIssue(
      issues,
      "aster.memory.invalid-contract-version",
      "$.contractVersion",
      "Memory entries must identify the active Aster contract version.",
    );
  }

  if (!isNonEmptyString(value.memoryId)) {
    addEntryIssue(
      issues,
      "aster.memory.invalid-memory-id",
      "$.memoryId",
      "Memory identity must be stable and inspectable.",
    );
  }

  if (!isPositiveInteger(value.memoryRevision)) {
    addEntryIssue(
      issues,
      "aster.memory.invalid-memory-revision",
      "$.memoryRevision",
      "Memory revision must be a positive integer.",
    );
  }

  const memoryClass = includesString(ASTER_MEMORY_CLASSES, value.memoryClass)
    ? (value.memoryClass as AsterMemoryClass)
    : null;
  if (memoryClass === null) {
    addEntryIssue(
      issues,
      "aster.memory.invalid-class",
      "$.memoryClass",
      "Memory class must use the public taxonomy.",
    );
  }

  if (!includesString(ASTER_MEMORY_OWNER_CLASSES, value.owner)) {
    addEntryIssue(
      issues,
      "aster.memory.invalid-owner",
      "$.owner",
      "Memory owner must use the public owner taxonomy.",
    );
  }

  const subject = isRecord(value.subject) ? value.subject : {};
  if (!isNonEmptyString(subject.subjectId)) {
    addEntryIssue(
      issues,
      "aster.memory.invalid-subject",
      "$.subject.subjectId",
      "Memory entries need an inspectable subject identity.",
    );
  }

  const policy =
    memoryClass === null ? null : ASTER_MEMORY_CLASS_POLICIES[memoryClass];
  if (policy !== null) {
    const retention = isRecord(value.retention) ? value.retention : {};
    const controls = isRecord(value.playerControls) ? value.playerControls : {};
    const egress = isRecord(value.egress) ? value.egress : {};

    if (
      value.owner !== policy.owner ||
      retention.mode !== policy.retentionMode ||
      controls.visible !== policy.playerVisible ||
      controls.editable !== policy.playerEditable ||
      controls.exportable !== policy.playerExportable ||
      controls.deletable !== policy.playerDeletable ||
      egress.mode !== policy.egressMode ||
      value.providerOperationalOnly !== policy.providerOperationalOnly ||
      value.missingMemoryFallback !== policy.missingMemoryFallback
    ) {
      addEntryIssue(
        issues,
        "aster.memory.policy-mismatch",
        "$",
        "Memory entries must remain aligned with their class policy.",
      );
    }

    if (
      policy.requiresSeparatePlayerChoice === true &&
      !isNonEmptyString(value.playerChoiceReferenceId)
    ) {
      addEntryIssue(
        issues,
        "aster.memory.missing-player-choice",
        "$.playerChoiceReferenceId",
        "Retained material memory requires a separate visible player choice.",
      );
    }

    if (
      policy.expiryRequired === true &&
      !isNonEmptyString(retention.expiresAt)
    ) {
      addEntryIssue(
        issues,
        "aster.memory.missing-expiry",
        "$.retention.expiresAt",
        "This memory class requires an explicit expiry.",
      );
    }
  }

  const sources = Array.isArray(value.sourceReferences)
    ? value.sourceReferences
    : [];
  const sourceClasses = new Set<string>();
  for (const [index, source] of sources.entries()) {
    const path = `$.sourceReferences[${index}]`;
    if (
      !isRecord(source) ||
      !isNonEmptyString(source.sourceReferenceId) ||
      !includesString(ASTER_MEMORY_SOURCE_CLASSES, source.sourceClass) ||
      !isNonEmptyString(source.sourceId) ||
      !isNonEmptyString(source.sourceRevision)
    ) {
      addEntryIssue(
        issues,
        "aster.memory.invalid-source-reference",
        path,
        "Memory source references need stable identity, class, source, and revision.",
      );
      continue;
    }
    sourceClasses.add(source.sourceClass as string);
  }

  if (memoryClass !== null) {
    const requiredSource = REQUIRED_SOURCE_CLASS_BY_MEMORY_CLASS[memoryClass];
    if (requiredSource !== undefined && !sourceClasses.has(requiredSource)) {
      addEntryIssue(
        issues,
        "aster.memory.missing-required-source",
        "$.sourceReferences",
        `Memory class ${memoryClass} requires a ${requiredSource} source reference.`,
      );
    }
  }

  const retention = isRecord(value.retention) ? value.retention : {};
  if (
    !includesString(ASTER_MEMORY_RETENTION_MODES, retention.mode) ||
    !isNonEmptyString(retention.policyId) ||
    !isPositiveInteger(retention.policyRevision) ||
    !(retention.expiresAt === null || isNonEmptyString(retention.expiresAt))
  ) {
    addEntryIssue(
      issues,
      "aster.memory.invalid-retention",
      "$.retention",
      "Memory retention requires a recognized mode, versioned policy, and explicit nullable expiry.",
    );
  }

  const lifecycle = isRecord(value.lifecycle) ? value.lifecycle : {};
  if (!includesString(ASTER_MEMORY_LIFECYCLE_STATES, lifecycle.state)) {
    addEntryIssue(
      issues,
      "aster.memory.invalid-lifecycle",
      "$.lifecycle.state",
      "Memory lifecycle must use the public state taxonomy.",
    );
  }

  if (
    lifecycle.correctsMemoryRevision !== null &&
    !(
      isPositiveInteger(lifecycle.correctsMemoryRevision) &&
      isPositiveInteger(value.memoryRevision) &&
      Number(lifecycle.correctsMemoryRevision) < Number(value.memoryRevision)
    )
  ) {
    addEntryIssue(
      issues,
      "aster.memory.invalid-correction-reference",
      "$.lifecycle.correctsMemoryRevision",
      "A correction must reference an earlier memory revision.",
    );
  }

  if (
    lifecycle.supersedesMemoryRevision !== null &&
    !(
      isPositiveInteger(lifecycle.supersedesMemoryRevision) &&
      isPositiveInteger(value.memoryRevision) &&
      Number(lifecycle.supersedesMemoryRevision) < Number(value.memoryRevision)
    )
  ) {
    addEntryIssue(
      issues,
      "aster.memory.invalid-supersession-reference",
      "$.lifecycle.supersedesMemoryRevision",
      "A superseding entry must reference an earlier memory revision.",
    );
  }

  if (
    lifecycle.state === "superseded" &&
    !(
      isPositiveInteger(lifecycle.supersededByMemoryRevision) &&
      isPositiveInteger(value.memoryRevision) &&
      Number(lifecycle.supersededByMemoryRevision) > Number(value.memoryRevision)
    )
  ) {
    addEntryIssue(
      issues,
      "aster.memory.invalid-supersession-reference",
      "$.lifecycle.supersededByMemoryRevision",
      "A superseded entry must identify a later replacing revision.",
    );
  }

  if (
    ["deletion-requested", "deleted"].includes(String(lifecycle.state)) &&
    !isNonEmptyString(lifecycle.deletionRequestReferenceId)
  ) {
    addEntryIssue(
      issues,
      "aster.memory.missing-deletion-request",
      "$.lifecycle.deletionRequestReferenceId",
      "Deletion-requested and deleted memory require an inspectable deletion request reference.",
    );
  }

  if (
    ["deleted", "expired", "unavailable"].includes(String(lifecycle.state)) &&
    value.value !== null
  ) {
    addEntryIssue(
      issues,
      "aster.memory.value-retained-after-unavailability",
      "$.value",
      "Deleted, expired, or unavailable memory cannot retain its prior value in the active entry.",
    );
  }

  if (lifecycle.state === "expired" && !isNonEmptyString(retention.expiresAt)) {
    addEntryIssue(
      issues,
      "aster.memory.missing-expiry",
      "$.retention.expiresAt",
      "Expired memory must identify its expiry.",
    );
  }

  const controls = isRecord(value.playerControls) ? value.playerControls : {};
  if (
    typeof controls.visible !== "boolean" ||
    typeof controls.editable !== "boolean" ||
    typeof controls.exportable !== "boolean" ||
    typeof controls.deletable !== "boolean"
  ) {
    addEntryIssue(
      issues,
      "aster.memory.player-controls-mismatch",
      "$.playerControls",
      "Memory entries must declare player visibility, editability, exportability, and deletability.",
    );
  }

  const egress = isRecord(value.egress) ? value.egress : {};
  if (
    !includesString(ASTER_MEMORY_EGRESS_MODES, egress.mode) ||
    !(
      egress.providerReference === null ||
      isNonEmptyString(egress.providerReference)
    ) ||
    egress.authorityContextIncluded !== false
  ) {
    addEntryIssue(
      issues,
      "aster.memory.invalid-egress",
      "$.egress",
      "Memory egress must use the public taxonomy and cannot include authority-bearing context.",
    );
  }

  if (
    memoryClass === "provider-operational-metadata" &&
    value.value !== null
  ) {
    addEntryIssue(
      issues,
      "aster.memory.provider-metadata-content",
      "$.value",
      "The Aster core may reference provider operational metadata but cannot store its raw content as product memory.",
    );
  }

  const secondaryUse = isRecord(value.secondaryUse) ? value.secondaryUse : {};
  if (secondaryUse.allowed !== false) {
    addEntryIssue(
      issues,
      "aster.memory.secondary-use-authority",
      "$.secondaryUse.allowed",
      "A memory entry cannot authorize secondary use.",
    );
  }
  if (secondaryUse.providerTrainingAllowed !== false) {
    addEntryIssue(
      issues,
      "aster.memory.training-authority",
      "$.secondaryUse.providerTrainingAllowed",
      "A memory entry cannot authorize provider training.",
    );
  }
  if (secondaryUse.researchUseAllowed !== false) {
    addEntryIssue(
      issues,
      "aster.memory.research-authority",
      "$.secondaryUse.researchUseAllowed",
      "A memory entry cannot authorize research use.",
    );
  }
  if (secondaryUse.commercialUseAllowed !== false) {
    addEntryIssue(
      issues,
      "aster.memory.commercial-authority",
      "$.secondaryUse.commercialUseAllowed",
      "A memory entry cannot authorize commercial use.",
    );
  }

  if (
    !includesString(
      ASTER_MEMORY_MISSING_FALLBACKS,
      value.missingMemoryFallback,
    )
  ) {
    addEntryIssue(
      issues,
      "aster.memory.missing-fallback",
      "$.missingMemoryFallback",
      "Memory entries need a recognized missing-memory fallback.",
    );
  }

  if (value.corePathMayBlockWhenMissing !== false) {
    addEntryIssue(
      issues,
      "aster.memory.core-blocking",
      "$.corePathMayBlockWhenMissing",
      "Missing memory cannot block core capture, permission, correction, export, deletion, or ordinary play.",
    );
  }

  if (value.canonicalRecord !== false) {
    addEntryIssue(
      issues,
      "aster.memory.canonical-authority",
      "$.canonicalRecord",
      "Memory cannot become a canonical Chronicle record.",
    );
  }
  if (value.permissionRecord !== false) {
    addEntryIssue(
      issues,
      "aster.memory.permission-authority",
      "$.permissionRecord",
      "Memory cannot become House of Keys permission truth.",
    );
  }

  const authority = isRecord(value.authority) ? value.authority : {};
  if (authority.canWriteCanonicalRecords !== false) {
    addEntryIssue(
      issues,
      "aster.memory.canonical-authority",
      "$.authority.canWriteCanonicalRecords",
      "Memory cannot write canonical records.",
    );
  }
  if (authority.canCreateOrExpandPermission !== false) {
    addEntryIssue(
      issues,
      "aster.memory.permission-authority",
      "$.authority.canCreateOrExpandPermission",
      "Memory cannot create or expand permission.",
    );
  }
  if (authority.canConfirmProposal !== false) {
    addEntryIssue(
      issues,
      "aster.memory.confirmation-authority",
      "$.authority.canConfirmProposal",
      "Memory cannot confirm an Aster proposal.",
    );
  }
  if (authority.canCompleteQuest !== false) {
    addEntryIssue(
      issues,
      "aster.memory.progression-authority",
      "$.authority.canCompleteQuest",
      "Memory cannot complete quests.",
    );
  }
  if (authority.canGrantReward !== false) {
    addEntryIssue(
      issues,
      "aster.memory.reward-authority",
      "$.authority.canGrantReward",
      "Memory cannot grant rewards.",
    );
  }

  return issues;
}
