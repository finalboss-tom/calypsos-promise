import assert from "node:assert/strict";
import test from "node:test";

import {
  FUTURE_TRANSFER_REQUIREMENTS,
  PROLOGUE_AUTHORITY_CLAIMS,
  createAuthenticationBoundaryState,
  denyAuthenticationAuthority,
  evaluateFutureTransfer,
} from "../src/auth/authentication-boundary.mjs";

test("authentication boundary is no-account, no-provider, and discard by default", () => {
  const boundary = createAuthenticationBoundaryState();
  assert.equal(boundary.publicExperienceCompletableWithoutAccount, true);
  assert.equal(boundary.providerSelected, false);
  assert.equal(boundary.accountActive, false);
  assert.equal(boundary.silentTransferAllowed, false);
  assert.equal(boundary.defaultDisposition, "discard");
  assert.equal(boundary.transferAuthorized, false);
});

test("complete future review still creates no transfer authority", () => {
  const evaluation = evaluateFutureTransfer(
    FUTURE_TRANSFER_REQUIREMENTS.map((requirement) => requirement.id),
  );
  assert.equal(evaluation.reviewComplete, true);
  assert.equal(evaluation.transferAuthorized, false);
  assert.equal(evaluation.accountActive, false);
});

test("authentication denies all known and unknown authority claims", () => {
  for (const claim of [...PROLOGUE_AUTHORITY_CLAIMS, "unknown"]) {
    assert.equal(denyAuthenticationAuthority(claim).allowed, false);
  }
});
