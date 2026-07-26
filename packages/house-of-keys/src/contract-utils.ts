import type { GrantDuration, NamespacedId, ScopeSelector } from "./types.js";

export const NAMESPACED_ID_PATTERN =
  /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:\.[a-z][a-z0-9]*(?:-[a-z0-9]+)*)+$/;
export const ISO_DATE_TIME_PATTERN =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;

export function isIsoDateTime(value: string): boolean {
  return ISO_DATE_TIME_PATTERN.test(value) && !Number.isNaN(Date.parse(value));
}

export function uniqueValues(values: ReadonlyArray<string>): boolean {
  return new Set(values).size === values.length;
}

export function sameSet(
  left: ReadonlyArray<string>,
  right: ReadonlyArray<string>,
): boolean {
  if (left.length !== right.length) return false;
  const rightSet = new Set(right);
  return left.every((value) => rightSet.has(value));
}

export function isSubset(
  requested: ReadonlyArray<string>,
  permitted: ReadonlyArray<string>,
): boolean {
  const permittedSet = new Set(permitted);
  return requested.every((value) => permittedSet.has(value));
}

export function hasBlanketToken(value: string): boolean {
  return (
    value.includes("*") ||
    value.endsWith(".all") ||
    value.endsWith(".any") ||
    value.endsWith(".future") ||
    value.includes("all-health-data")
  );
}

export function recordKeysMatchIds(
  record: Readonly<Record<string, number>>,
  ids: ReadonlyArray<string>,
): boolean {
  return sameSet(Object.keys(record), ids);
}

function selectorArrayWithinGrant(
  requested: ReadonlyArray<string> | undefined,
  permitted: ReadonlyArray<string> | undefined,
): boolean {
  if (permitted === undefined || permitted.length === 0) return true;
  if (requested === undefined || requested.length === 0) return false;
  return isSubset(requested, permitted);
}

export function selectorWithinGrant(
  requested: ScopeSelector | undefined,
  permitted: ScopeSelector | undefined,
): boolean {
  if (permitted === undefined) return true;
  if (requested === undefined) return false;

  if (
    !selectorArrayWithinGrant(
      requested.exactRecordIds,
      permitted.exactRecordIds,
    ) ||
    !selectorArrayWithinGrant(
      requested.exactVariableIds,
      permitted.exactVariableIds,
    ) ||
    !selectorArrayWithinGrant(
      requested.exactSourceArtifactIds,
      permitted.exactSourceArtifactIds,
    ) ||
    !selectorArrayWithinGrant(
      requested.exactDocumentVersionIds,
      permitted.exactDocumentVersionIds,
    ) ||
    !selectorArrayWithinGrant(
      requested.exactAttachmentIds,
      permitted.exactAttachmentIds,
    ) ||
    !selectorArrayWithinGrant(
      requested.exactPermissionRecordIds,
      permitted.exactPermissionRecordIds,
    ) ||
    !selectorArrayWithinGrant(
      requested.recordLifecycleStates,
      permitted.recordLifecycleStates,
    )
  ) {
    return false;
  }

  if (
    permitted.representedFrom !== undefined &&
    (requested.representedFrom === undefined ||
      Date.parse(requested.representedFrom) <
        Date.parse(permitted.representedFrom))
  ) {
    return false;
  }
  if (
    permitted.representedThrough !== undefined &&
    (requested.representedThrough === undefined ||
      Date.parse(requested.representedThrough) >
        Date.parse(permitted.representedThrough))
  ) {
    return false;
  }
  if (
    permitted.requiresProvenanceClosure === true &&
    requested.requiresProvenanceClosure !== true
  ) {
    return false;
  }

  return true;
}

function sameOptionalSet(
  left: ReadonlyArray<string> | undefined,
  right: ReadonlyArray<string> | undefined,
): boolean {
  return sameSet(left ?? [], right ?? []);
}

export function selectorsEqual(
  left: ScopeSelector | undefined,
  right: ScopeSelector | undefined,
): boolean {
  if (left === undefined || right === undefined) return left === right;
  return (
    sameOptionalSet(left.exactRecordIds, right.exactRecordIds) &&
    sameOptionalSet(left.exactVariableIds, right.exactVariableIds) &&
    sameOptionalSet(
      left.exactSourceArtifactIds,
      right.exactSourceArtifactIds,
    ) &&
    sameOptionalSet(
      left.exactDocumentVersionIds,
      right.exactDocumentVersionIds,
    ) &&
    sameOptionalSet(left.exactAttachmentIds, right.exactAttachmentIds) &&
    sameOptionalSet(
      left.exactPermissionRecordIds,
      right.exactPermissionRecordIds,
    ) &&
    sameOptionalSet(left.recordLifecycleStates, right.recordLifecycleStates) &&
    left.representedFrom === right.representedFrom &&
    left.representedThrough === right.representedThrough &&
    left.requiresProvenanceClosure === right.requiresProvenanceClosure
  );
}

export function durationsEqual(
  left: GrantDuration,
  right: GrantDuration,
): boolean {
  if (left.kind !== right.kind) return false;
  switch (left.kind) {
    case "fixed-interval":
    case "single-use": {
      const candidate = right as typeof left;
      return (
        left.startsAt === candidate.startsAt && left.endsAt === candidate.endsAt
      );
    }
    case "bounded-count": {
      const candidate = right as typeof left;
      return (
        left.startsAt === candidate.startsAt &&
        left.endsAt === candidate.endsAt &&
        left.maximumUses === candidate.maximumUses
      );
    }
    case "review-bounded": {
      const candidate = right as typeof left;
      return (
        left.startsAt === candidate.startsAt &&
        left.reviewAt === candidate.reviewAt
      );
    }
    case "delayed-activation": {
      const candidate = right as typeof left;
      return (
        left.activationConditionId === candidate.activationConditionId &&
        left.expiresAt === candidate.expiresAt
      );
    }
    case "session-bounded": {
      const candidate = right as typeof left;
      return (
        left.sessionId === candidate.sessionId &&
        left.absoluteEndsAt === candidate.absoluteEndsAt
      );
    }
  }
}

export function durationUpperBoundary(
  duration: GrantDuration,
): string | undefined {
  switch (duration.kind) {
    case "fixed-interval":
    case "single-use":
    case "bounded-count":
      return duration.endsAt;
    case "review-bounded":
      return duration.reviewAt;
    case "delayed-activation":
      return duration.expiresAt;
    case "session-bounded":
      return duration.absoluteEndsAt;
  }
}

export function asNamespacedId(value: string): NamespacedId {
  return value as NamespacedId;
}
