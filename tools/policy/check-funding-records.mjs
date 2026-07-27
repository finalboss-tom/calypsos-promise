import { readFile } from "node:fs/promises";

const failures = [];

function fail(message) {
  failures.push(message);
}

async function load(path) {
  return readFile(path, "utf8");
}

function requireText(path, content, expected) {
  if (!content.includes(expected)) {
    fail(path + ": missing " + expected);
  }
}

function recordBlocks(content, kind) {
  const prefix = kind === "funding" ? "FND" : "OPP";
  const pattern = new RegExp(
    "^  - id: (" +
      prefix +
      "-\\d{4}-\\d{4})\\n([\\s\\S]*?)(?=^  - id: " +
      prefix +
      "-\\d{4}-\\d{4}\\n|\\s*$)",
    "gm",
  );

  return [...content.matchAll(pattern)].map((match) => ({
    id: match[1],
    body: match[2],
  }));
}

function requireBlockFields(path, records, fields) {
  for (const record of records) {
    for (const field of fields) {
      if (!new RegExp("^    " + field + ":", "m").test(record.body)) {
        fail(path + ": " + record.id + " missing " + field);
      }
    }
  }
}

const fundingRegistryPath = "docs/economics/funding-records.yml";
const opportunityRegistryPath = "docs/economics/funding-opportunities.yml";
const syntheticFundingPath = "docs/economics/synthetic-funding-records.yml";
const syntheticOpportunityPath =
  "docs/economics/synthetic-funding-opportunities.yml";

const fundingRegistry = await load(fundingRegistryPath);
const opportunityRegistry = await load(opportunityRegistryPath);
const syntheticFunding = await load(syntheticFundingPath);
const syntheticOpportunities = await load(syntheticOpportunityPath);

for (const [path, content] of [
  [fundingRegistryPath, fundingRegistry],
  [opportunityRegistryPath, opportunityRegistry],
  [syntheticFundingPath, syntheticFunding],
  [syntheticOpportunityPath, syntheticOpportunities],
]) {
  requireText(path, content, 'schema_version: "0.1.0"');
  requireText(path, content, "information_class: PUBLIC");
}

requireText(fundingRegistryPath, fundingRegistry, "records: []");
requireText(
  opportunityRegistryPath,
  opportunityRegistry,
  "opportunities: []",
);
requireText(
  opportunityRegistryPath,
  opportunityRegistry,
  "approved legal recipient",
);

const fundingRecords = recordBlocks(syntheticFunding, "funding");
const opportunityRecords = recordBlocks(syntheticOpportunities, "opportunity");

if (fundingRecords.length !== 5) {
  fail(
    syntheticFundingPath +
      ": expected 5 records, found " +
      fundingRecords.length,
  );
}
if (opportunityRecords.length !== 6) {
  fail(
    syntheticOpportunityPath +
      ": expected 6 opportunities, found " +
      opportunityRecords.length,
  );
}

const allIds = [...fundingRecords, ...opportunityRecords].map(({ id }) => id);
if (new Set(allIds).size !== allIds.length) {
  fail("duplicate funding identifier");
}

for (const record of fundingRecords) {
  if (!/^    synthetic: true$/m.test(record.body)) {
    fail(syntheticFundingPath + ": " + record.id + " is not synthetic");
  }
  if (!/^    public_counterparty: Fictional /m.test(record.body)) {
    fail(
      syntheticFundingPath + ": " + record.id + " counterparty is not fictional",
    );
  }
}

for (const record of opportunityRecords) {
  if (!/^    synthetic: true$/m.test(record.body)) {
    fail(syntheticOpportunityPath + ": " + record.id + " is not synthetic");
  }
  if (/^    status: open$/m.test(record.body)) {
    fail(syntheticOpportunityPath + ": " + record.id + " must not be open");
  }
}

requireBlockFields(syntheticFundingPath, fundingRecords, [
  "schema_version",
  "revision",
  "synthetic",
  "status",
  "relationship_class",
  "public_counterparty",
  "value",
  "purpose",
  "restrictions",
  "approved_benefits",
  "prohibited_benefits_confirmed",
  "conflicts",
  "authority",
  "work_linkage",
  "outcome",
  "dependency_and_exit",
  "public_information_review",
  "review_triggers",
]);

requireBlockFields(syntheticOpportunityPath, opportunityRecords, [
  "schema_version",
  "revision",
  "synthetic",
  "status",
  "title",
  "public_need",
  "intended_outcome",
  "affected_groups",
  "requested_support",
  "partial_support_behavior",
  "acceptable_restrictions",
  "prohibited_restrictions",
  "planned_work_and_evidence",
  "responsible_role",
  "review_and_independence",
  "dependency_and_exit",
  "linked_work",
  "risks_and_uncertainty",
  "support_does_not_purchase",
  "expiration_and_review",
]);

if (!/fictional/i.test(syntheticFunding.slice(0, 500))) {
  fail(syntheticFundingPath + ": missing fictional-data notice");
}
if (!/fictional/i.test(syntheticOpportunities.slice(0, 500))) {
  fail(syntheticOpportunityPath + ": missing fictional-data notice");
}

if (failures.length > 0) {
  console.error(
    "Funding record validation failed:\n" +
      failures.map((failure) => "- " + failure).join("\n"),
  );
  process.exit(1);
}

console.log(
  "Funding record validation passed: " +
    fundingRecords.length +
    " synthetic relationships, " +
    opportunityRecords.length +
    " synthetic opportunities, and empty canonical live registers.",
);
