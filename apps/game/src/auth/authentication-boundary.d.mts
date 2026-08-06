export interface FutureTransferRequirement {
  readonly id: string;
  readonly label: string;
  readonly description: string;
}

export interface AuthenticationBoundaryState {
  readonly version: string;
  readonly publicExperienceCompletableWithoutAccount: true;
  readonly accountOfferPosition: "after-public-presentation";
  readonly providerSelected: false;
  readonly accountActive: false;
  readonly sessionActive: false;
  readonly silentTransferAllowed: false;
  readonly defaultDisposition: "discard";
  readonly transferAuthorized: false;
}

export interface FutureTransferEvaluation {
  readonly reviewComplete: boolean;
  readonly missingRequirements: readonly string[];
  readonly transferAuthorized: false;
  readonly accountActive: false;
  readonly providerSelected: false;
  readonly disposition: "discard";
  readonly reason: string;
}

export const AUTHENTICATION_BOUNDARY_VERSION: "0.1.0";
export const FUTURE_ACCOUNT_VALUE: readonly string[];
export const FUTURE_TRANSFER_REQUIREMENTS: readonly FutureTransferRequirement[];
export const PROLOGUE_AUTHORITY_CLAIMS: readonly string[];

export function createAuthenticationBoundaryState(): AuthenticationBoundaryState;
export function evaluateFutureTransfer(
  reviewedRequirementIds?: readonly string[],
): FutureTransferEvaluation;
export function denyAuthenticationAuthority(claim: string): {
  readonly claim: string;
  readonly allowed: false;
  readonly reason: string;
};
