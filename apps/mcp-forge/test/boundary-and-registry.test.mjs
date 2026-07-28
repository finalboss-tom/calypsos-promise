import assert from "node:assert/strict";
import test from "node:test";

import {
  FORGE_7_1_PUBLIC_FIXTURE,
  FORGE_ACCEPTED_TOOL_IDS,
  FORGE_AUTHORITY_BOUNDARY,
  FORGE_BOUNDARY,
  FORGE_INFORMATION_CLASS_IDS,
  FORGE_PROHIBITED_CAPABILITY_IDS,
  FORGE_RISK_CLASS_IDS,
  FORGE_TOOL_REGISTRY,
  FORGE_VALIDATION_CODES,
  validateForgeBaseline,
} from "../dist/index.js";

const clone = (value) => structuredClone(value);

test("the public Sprint 7.1 baseline validates", () => {
  assert.deepEqual(validateForgeBaseline(FORGE_7_1_PUBLIC_FIXTURE), []);
});

test("the initial registry covers every accepted tool exactly once", () => {
  assert.deepEqual(
    [...FORGE_TOOL_REGISTRY.map((tool) => tool.id)].sort(),
    [...FORGE_ACCEPTED_TOOL_IDS].sort(),
  );
  assert.equal(new Set(FORGE_TOOL_REGISTRY.map((tool) => tool.id)).size, 10);
});

test("all planned tools remain contract-only and transport-free", () => {
  for (const tool of FORGE_TOOL_REGISTRY) {
    assert.equal(tool.lifecycle, "planned");
    assert.equal(tool.transportExposure, "not-exposed");
    assert.equal(tool.resultCanCreateAuthority, false);
    assert.equal(tool.resultCanApproveItself, false);
    assert.deepEqual(tool.allowedProhibitedCapabilities, []);
  }
});

test("source classes are public or synthetic and server-owned", () => {
  assert.deepEqual(
    [
      ...FORGE_7_1_PUBLIC_FIXTURE.sourceClasses.map((source) => source.id),
    ].sort(),
    [...FORGE_INFORMATION_CLASS_IDS].sort(),
  );
  for (const source of FORGE_7_1_PUBLIC_FIXTURE.sourceClasses) {
    assert.equal(source.publicOnly, true);
    assert.equal(source.requiresServerOwnedRoot, true);
    assert.equal(source.canContainPersonalData, false);
    assert.equal(source.canContainCredentials, false);
    assert.equal(source.canContainProtectedOperationalEvidence, false);
  }
});

test("risk classes never grant mutation, network, private-data, credential, or result authority", () => {
  assert.deepEqual(
    [...FORGE_7_1_PUBLIC_FIXTURE.riskClasses.map((risk) => risk.id)].sort(),
    [...FORGE_RISK_CLASS_IDS].sort(),
  );
  for (const risk of FORGE_7_1_PUBLIC_FIXTURE.riskClasses) {
    assert.equal(risk.canMutate, false);
    assert.equal(risk.canUseNetwork, false);
    assert.equal(risk.canAccessPrivateData, false);
    assert.equal(risk.canAccessCredentials, false);
    assert.equal(risk.resultAuthority, "none");
  }
});

test("the full authority boundary remains literal false", () => {
  assert.ok(
    Object.values(FORGE_AUTHORITY_BOUNDARY).every((value) => value === false),
  );
  assert.equal(FORGE_BOUNDARY.registryAuthority, "server-owned");
  assert.equal(FORGE_BOUNDARY.sourceAuthority, "server-owned-allowlist");
  assert.equal(FORGE_BOUNDARY.ordinaryContributionRequiresMcp, false);
  assert.equal(FORGE_BOUNDARY.untrustedContentCanModifyRegistry, false);
  assert.equal(FORGE_BOUNDARY.untrustedContentCanExpandResources, false);
  assert.equal(FORGE_BOUNDARY.untrustedContentCanAuthorizeToolCalls, false);
});

test("the prohibited capability catalogue is complete and usable by validators", () => {
  assert.ok(FORGE_PROHIBITED_CAPABILITY_IDS.includes("arbitrary-shell"));
  assert.ok(FORGE_PROHIBITED_CAPABILITY_IDS.includes("network-access"));
  assert.ok(FORGE_PROHIBITED_CAPABILITY_IDS.includes("private-data-read"));
  assert.ok(FORGE_PROHIBITED_CAPABILITY_IDS.includes("repository-mutation"));
  assert.ok(FORGE_PROHIBITED_CAPABILITY_IDS.includes("mapping-approval"));

  const baseline = clone(FORGE_7_1_PUBLIC_FIXTURE);
  baseline.tools[0].allowedProhibitedCapabilities = ["arbitrary-shell"];
  const issues = validateForgeBaseline(baseline);
  assert.ok(
    issues.some(
      (entry) => entry.code === FORGE_VALIDATION_CODES.toolProhibitedCapability,
    ),
  );
});

test("untrusted content cannot become registry authority", () => {
  const baseline = clone(FORGE_7_1_PUBLIC_FIXTURE);
  baseline.boundary.registryAuthority = "content-owned";
  baseline.boundary.untrustedContentCanModifyRegistry = true;
  const issues = validateForgeBaseline(baseline);
  assert.ok(
    issues.some(
      (entry) => entry.code === FORGE_VALIDATION_CODES.registryAuthority,
    ),
  );
  assert.ok(
    issues.some(
      (entry) => entry.code === FORGE_VALIDATION_CODES.untrustedAuthority,
    ),
  );
});

test("private or credential-bearing source authorization is rejected", () => {
  const baseline = clone(FORGE_7_1_PUBLIC_FIXTURE);
  baseline.sourceClasses[0].publicOnly = false;
  baseline.sourceClasses[0].canContainPersonalData = true;
  baseline.sourceClasses[0].canContainCredentials = true;
  const issues = validateForgeBaseline(baseline);
  assert.ok(
    issues.some((entry) => entry.code === FORGE_VALIDATION_CODES.publicOnly),
  );
  assert.ok(
    issues.some(
      (entry) => entry.code === FORGE_VALIDATION_CODES.sourceSensitiveContent,
    ),
  );
});

test("funding and providers cannot purchase Forge authority", () => {
  const baseline = clone(FORGE_7_1_PUBLIC_FIXTURE);
  baseline.boundary.funding.canControlSearchRanking = true;
  baseline.boundary.funding.canControlValidationOutcome = true;
  baseline.boundary.funding.canControlPublication = true;
  const issues = validateForgeBaseline(baseline);
  assert.equal(
    issues.filter(
      (entry) => entry.code === FORGE_VALIDATION_CODES.fundingMustNotControl,
    ).length,
    3,
  );
});
