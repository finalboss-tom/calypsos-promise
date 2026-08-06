import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  FUTURE_TRANSFER_REQUIREMENTS,
  PROLOGUE_AUTHORITY_CLAIMS,
  createAuthenticationBoundaryState,
  denyAuthenticationAuthority,
  evaluateFutureTransfer,
} from "../src/auth/authentication-boundary.mjs";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const gameRoot = resolve(scriptDirectory, "..");

function read(path) {
  return readFileSync(join(gameRoot, path), "utf8");
}

const boundary = createAuthenticationBoundaryState();
assert.equal(boundary.publicExperienceCompletableWithoutAccount, true);
assert.equal(boundary.accountOfferPosition, "after-public-presentation");
assert.equal(boundary.providerSelected, false);
assert.equal(boundary.accountActive, false);
assert.equal(boundary.sessionActive, false);
assert.equal(boundary.silentTransferAllowed, false);
assert.equal(boundary.defaultDisposition, "discard");
assert.equal(boundary.transferAuthorized, false);

assert.equal(FUTURE_TRANSFER_REQUIREMENTS.length, 7);
const completeReview = evaluateFutureTransfer(
  FUTURE_TRANSFER_REQUIREMENTS.map((requirement) => requirement.id),
);
assert.equal(completeReview.reviewComplete, true);
assert.equal(completeReview.transferAuthorized, false);
assert.equal(completeReview.disposition, "discard");

const incompleteReview = evaluateFutureTransfer(["disclosure"]);
assert.equal(incompleteReview.reviewComplete, false);
assert.equal(incompleteReview.transferAuthorized, false);

for (const claim of [...PROLOGUE_AUTHORITY_CLAIMS, "unknown-future-claim"]) {
  assert.equal(denyAuthenticationAuthority(claim).allowed, false);
}

const packageJson = JSON.parse(read("package.json"));
for (const prohibitedDependency of [
  "@auth0/auth0-react",
  "@clerk/clerk-expo",
  "@supabase/supabase-js",
  "firebase",
  "next-auth",
]) {
  assert.equal(
    packageJson.dependencies?.[prohibitedDependency],
    undefined,
    `Sprint 10.7 must not select ${prohibitedDependency}`,
  );
}

const play = read("app/(shell)/play.tsx");
assert.match(play, /<SceneRenderer/);
assert.match(play, /href="\/account"/);
assert.ok(
  play.indexOf("<SceneRenderer") < play.indexOf('href="/account"'),
  "the account boundary offer must follow the public presentation",
);

const account = read("app/(shell)/account.tsx");
assert.match(account, /POST-PROLOGUE ACCOUNT BOUNDARY/);
assert.match(account, /clearStoredSyntheticSession/);
assert.doesNotMatch(account, /TextInput/);
assert.doesNotMatch(account, /password\s*[:=]/i);
assert.doesNotMatch(account, /accessToken|refreshToken/);
assert.doesNotMatch(account, /signIn\s*\(|signUp\s*\(|createAccount\s*\(/);

const panel = read("src/components/AccountBoundaryPanel.tsx");
for (const requiredText of [
  "No account system is active",
  "Default temporary-state disposition",
  "Silent transfer allowed",
  "Seven requirements",
  "Discard temporary state",
  "Continue without an account",
]) {
  assert.match(panel, new RegExp(requiredText));
}

console.log("Sprint 10.7 authentication-after-prologue boundary validated:");
console.log("- public synthetic completion remains no-account");
console.log("- informational account value appears after presentation only");
console.log("- discard is the default and silent transfer is denied");
console.log("- all seven future transfer requirements remain non-authorizing");
console.log(
  "- no provider, credential, token, recovery, or account session exists",
);
