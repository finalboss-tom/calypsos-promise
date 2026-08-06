export const AUTHENTICATION_BOUNDARY_VERSION = "0.1.0";

export const FUTURE_ACCOUNT_VALUE = Object.freeze([
  "Return to an explicitly owned private Chronicle after later authorization.",
  "Review and correct account-linked provenance after later security work.",
  "Request deletion and export through later accountable operations.",
]);

export const FUTURE_TRANSFER_REQUIREMENTS = Object.freeze([
  {
    id: "disclosure",
    label: "Explicit disclosure",
    description:
      "Explain exactly what would move, what would not move, and why.",
  },
  {
    id: "review",
    label: "Review",
    description:
      "Show the complete candidate transfer before any account action.",
  },
  {
    id: "player-confirmation",
    label: "Player confirmation",
    description: "Require a separate affirmative confirmation after review.",
  },
  {
    id: "provenance",
    label: "Provenance",
    description:
      "Retain where each transferred item came from and its evidence class.",
  },
  {
    id: "purpose",
    label: "Purpose",
    description: "Bind the transfer to a visible, limited purpose.",
  },
  {
    id: "correction",
    label: "Correction",
    description:
      "Provide a way to correct transferred material and its provenance.",
  },
  {
    id: "deletion",
    label: "Deletion",
    description:
      "Provide a way to delete transferred material and verify the result.",
  },
]);

export const PROLOGUE_AUTHORITY_CLAIMS = Object.freeze([
  "chronicle-evidence",
  "permission",
  "canonical-progression",
  "quest-completion",
  "reward",
  "personal-progress",
  "health-result",
  "authentic-preference",
  "longitudinal-intelligence",
]);

export function createAuthenticationBoundaryState() {
  return Object.freeze({
    version: AUTHENTICATION_BOUNDARY_VERSION,
    publicExperienceCompletableWithoutAccount: true,
    accountOfferPosition: "after-public-presentation",
    providerSelected: false,
    accountActive: false,
    sessionActive: false,
    silentTransferAllowed: false,
    defaultDisposition: "discard",
    transferAuthorized: false,
  });
}

export function evaluateFutureTransfer(reviewedRequirementIds = []) {
  const reviewed = new Set(reviewedRequirementIds);
  const missingRequirements = FUTURE_TRANSFER_REQUIREMENTS.filter(
    (requirement) => !reviewed.has(requirement.id),
  ).map((requirement) => requirement.id);

  return Object.freeze({
    reviewComplete: missingRequirements.length === 0,
    missingRequirements: Object.freeze(missingRequirements),
    transferAuthorized: false,
    accountActive: false,
    providerSelected: false,
    disposition: "discard",
    reason:
      missingRequirements.length === 0
        ? "Review completeness is evidence for a future decision only; Sprint 10 still authorizes no transfer."
        : "Future transfer review is incomplete and Sprint 10 authorizes no transfer.",
  });
}

export function denyAuthenticationAuthority(claim) {
  return Object.freeze({
    claim,
    allowed: false,
    reason:
      "Authentication cannot convert public or synthetic presentation state into domain authority.",
  });
}
