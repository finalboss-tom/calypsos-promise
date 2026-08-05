import { access, readFile } from "node:fs/promises";

const failures = [];

function fail(message) {
  failures.push(message);
}

async function loadJson(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    fail(`${path}: ${error.message}`);
    return null;
  }
}

async function loadText(path) {
  try {
    return await readFile(path, "utf8");
  } catch (error) {
    fail(`${path}: ${error.message}`);
    return "";
  }
}

function requireEqual(path, actual, expected, label) {
  if (actual !== expected) {
    fail(
      `${path}: expected ${label} ${JSON.stringify(expected)}, found ${JSON.stringify(actual)}`,
    );
  }
}

function requireIncludes(path, values, expected, label) {
  if (!Array.isArray(values) || !values.includes(expected)) {
    fail(`${path}: missing ${label} ${JSON.stringify(expected)}`);
  }
}

function requireText(path, content, expected) {
  if (!content.includes(expected)) {
    fail(`${path}: missing ${JSON.stringify(expected)}`);
  }
}

const schemaPath =
  "docs/architecture/longitudinal-intelligence-evidence-kernel.v1.schema.json";
const fixturePath =
  "fixtures/longitudinal-intelligence/evidence-kernel.v1.synthetic.json";
const doctrinePath = "docs/architecture/longitudinal-intelligence-doctrine.md";
const validationPlanPath =
  "docs/roadmap/longitudinal-intelligence-validation-plan.md";
const completionPath =
  "docs/roadmap/longitudinal-intelligence-li-v0-completion-record.md";
const traceabilityPath =
  "docs/architecture/longitudinal-intelligence-li-v0-traceability.md";
const holdpointPath =
  "docs/architecture/longitudinal-intelligence-li-v0-holdpoint-and-unresolved-work-register.md";
const alignmentPath = "docs/roadmap/pre-sprint-10-alignment-review.md";
const sprintTenOnePath =
  "docs/roadmap/sprint-10.1-application-toolchain-foundation.md";
const sprintTenTwoPath =
  "docs/roadmap/sprint-10.2-versioned-game-content-package.md";
const currentStatusPath = "docs/roadmap/current-status.md";

const schema = await loadJson(schemaPath);
const fixture = await loadJson(fixturePath);
const doctrine = await loadText(doctrinePath);
const validationPlan = await loadText(validationPlanPath);
const completion = await loadText(completionPath);
const traceability = await loadText(traceabilityPath);
const holdpoints = await loadText(holdpointPath);
const alignment = await loadText(alignmentPath);
const sprintTenOne = await loadText(sprintTenOnePath);
const sprintTenTwo = await loadText(sprintTenTwoPath);
const currentStatus = await loadText(currentStatusPath);

if (schema) {
  requireEqual(
    schemaPath,
    schema.$schema,
    "https://json-schema.org/draft/2020-12/schema",
    "$schema",
  );
  requireEqual(
    schemaPath,
    schema.properties?.schema_version?.const,
    "1.0.0",
    "schema version",
  );

  for (const stage of [
    "LI-V0",
    "LI-V1",
    "LI-V2",
    "LI-V3",
    "LI-V4",
    "LI-V5",
    "LI-V6",
    "LI-V7",
    "LI-V8",
  ]) {
    requireIncludes(
      schemaPath,
      schema.properties?.validation_stage?.enum,
      stage,
      "validation stage",
    );
  }

  for (const claim of [
    "NONE",
    "LI-C0",
    "LI-C1",
    "LI-C2",
    "LI-C3",
    "LI-C4",
    "LI-C5",
    "LI-C6",
  ]) {
    requireIncludes(
      schemaPath,
      schema.properties?.claim_level?.enum,
      claim,
      "claim level",
    );
  }
}

if (fixture) {
  requireEqual(fixturePath, fixture.schema_version, "1.0.0", "schema version");
  requireEqual(
    fixturePath,
    fixture.information_class,
    "SYNTHETIC",
    "information class",
  );
  requireEqual(fixturePath, fixture.synthetic, true, "synthetic flag");
  requireEqual(
    fixturePath,
    fixture.validation_stage,
    "LI-V0",
    "validation stage",
  );
  requireEqual(fixturePath, fixture.claim_level, "NONE", "claim level");
  requireEqual(
    fixturePath,
    fixture.authority?.ceiling,
    "architecture-and-documentation-direction-only",
    "authority ceiling",
  );
  requireEqual(
    fixturePath,
    fixture.authority?.ai_authority,
    "advisory-only",
    "AI authority",
  );
  requireEqual(
    fixturePath,
    fixture.authority?.provider_independent,
    true,
    "provider independence",
  );
  requireEqual(
    fixturePath,
    fixture.result?.state,
    "validation-stage-candidate-complete",
    "result state",
  );

  for (const prohibited of [
    "personal-causal-validity",
    "generalized-what-works-for-you",
    "diagnosis",
    "treatment-recommendation",
    "automatic-LI-V1-activation",
  ]) {
    requireIncludes(
      fixturePath,
      fixture.authority?.prohibited_claims,
      prohibited,
      "prohibited claim",
    );
  }

  for (const right of [
    "meaningful_refusal",
    "correction",
    "deletion",
    "export",
    "non_ai_fallback",
    "provider_exit",
  ]) {
    requireEqual(fixturePath, fixture.rights?.[right], true, `right ${right}`);
  }

  if (!Array.isArray(fixture.holdpoints) || fixture.holdpoints.length < 6) {
    fail(`${fixturePath}: expected at least six explicit holdpoints`);
  }

  for (const source of fixture.sources ?? []) {
    if (!source.provenance_uri || source.provenance_uri.startsWith("http")) {
      continue;
    }
    try {
      await access(source.provenance_uri);
    } catch {
      fail(`${fixturePath}: missing provenance path ${source.provenance_uri}`);
    }
  }
}

for (const [path, content, required] of [
  [
    doctrinePath,
    doctrine,
    [
      "The Chronicle remains authoritative",
      "AI remains advisory",
      "experimentation remains optional",
      "LI-C6",
    ],
  ],
  [
    validationPlanPath,
    validationPlan,
    ["LI-V0", "LI-V8", "Sprint 10", "does not implement LI-V1 through LI-V8"],
  ],
  [
    completionPath,
    completion,
    [
      "READY FOR FOUNDING-STEWARD ACCEPTANCE",
      "LI-V0",
      "LI-V1 through LI-V8 remain inactive",
      "Issue #73",
    ],
  ],
  [
    traceabilityPath,
    traceability,
    [
      "Personal value first",
      "Meaningful refusal",
      "Provider independence",
      "Deterministic authority",
    ],
  ],
  [
    holdpointPath,
    holdpoints,
    ["HLD-LI-001", "HLD-LI-018", "Unresolved work", "LI-V1"],
  ],
  [
    alignmentPath,
    alignment,
    [
      "READY FOR FOUNDING-STEWARD ACCEPTANCE",
      "AUTHORIZED WITH NAMED HOLDPOINTS",
      "apps/game",
      "packages/game-content",
      "LI-V1 through LI-V8",
      "Sprint 10.10",
    ],
  ],
  [
    sprintTenOnePath,
    sprintTenOne,
    [
      "COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10",
      "issue #80",
      "draft PR #79",
      "single draft implementation pull request",
      "apps/game",
      "apps/site",
      "LI-V0",
      "Sprint 10.2",
      "not a separate founding-steward acceptance or merge gate",
    ],
  ],
  [
    sprintTenTwoPath,
    sprintTenTwo,
    [
      "COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10",
      "issue #80",
      "draft PR #79",
      "packages/game-content",
      "PUBLIC_SYNTHETIC",
      "@calypsos-promise/content-schema",
      "Sprint 10.3",
      "no separate founding-steward acceptance or merge gate",
    ],
  ],
  [
    currentStatusPath,
    currentStatus,
    [
      "LI-V0 is accepted and complete",
      "Sprint 10 is authorized with named holdpoints",
      "Sprint 10 is active through issue #80",
      "Sprint 10.1 and Sprint 10.2 are complete as validated internal checkpoints",
      "PR #79 remains draft for workstreams 10.1 through 10.10",
      "Sprint 10.3 through Sprint 10.10",
      "LI-V1 through LI-V8 remain inactive",
    ],
  ],
]) {
  for (const expected of required) {
    requireText(path, content, expected);
  }
}

if (failures.length > 0) {
  console.error(
    `Longitudinal Intelligence validation failed:\n${failures
      .map((failure) => `- ${failure}`)
      .join("\n")}`,
  );
  process.exit(1);
}

console.log(
  "Longitudinal Intelligence validation passed: doctrine, LI-V0 closure, evidence kernel, synthetic packet, traceability, holdpoints, Sprint 10 execution boundary, roadmap status, and pre-Sprint 10 alignment are coherent.",
);
