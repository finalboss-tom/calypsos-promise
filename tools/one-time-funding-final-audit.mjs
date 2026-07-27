import { readFileSync, writeFileSync, unlinkSync } from "node:fs";

function read(path) {
  return readFileSync(path, "utf8");
}

function write(path, content) {
  writeFileSync(path, content);
}

function replaceOnce(path, expected, replacement) {
  const content = read(path);
  if (!content.includes(expected)) {
    throw new Error(`${path}: expected text not found`);
  }
  write(path, content.replace(expected, replacement));
}

const syntheticOpportunities = `schema_version: "0.1.0"
registry_revision: 1
status: synthetic-examples
information_class: PUBLIC
last_reviewed: "2026-07-27"
responsible_role: founding-steward
notice: >-
  Every opportunity in this file is fictional and exists only to exercise the
  Phase 0 funding opportunity contract. No opportunity is open for money,
  sponsorship, grant intake, or in-kind support.
opportunities:
  - id: OPP-2026-0001
    schema_version: "0.1.0"
    revision: 1
    synthetic: true
    status: reviewable
    title: Independent security architecture review
    public_need: Review the merged security architecture and public-safe threat evidence without creating a certification claim.
    intended_outcome: Identify design gaps, prioritize governed remediation, and publish limitations and residual risk.
    affected_groups:
      - future-players
      - contributors
      - operators
    requested_support:
      classes:
        - public-good-underwriting
        - pro-bono-specialist-review
      public_amount_band: "$25,000–$99,999"
      in_kind_alternatives:
        - qualified-independent-review-time
    partial_support_behavior: Partial support may fund one bounded review domain only when scope and independence remain explicit.
    acceptable_restrictions:
      - Use support only for the accepted review, public-safe report, and governed remediation planning.
    prohibited_restrictions:
      - Sponsor controls findings or publication.
      - Sponsor or implementer independently certifies its own work.
    planned_work_and_evidence:
      - reviewer-conflict-and-qualification-record
      - public-safe-review-report
      - remediation-issue-set
      - outcome-and-residual-risk-review
    responsible_role: founding-steward
    review_and_independence:
      required: qualified-reviewer-independent-of-sponsor-and-direct-implementation
      current_status: not-obtained
    dependency_and_exit:
      critical_function: false
      replacement: select-another-qualified-reviewer-or-defer
      cancellation: publish-no-approval-claim-and-close-the-opportunity
    linked_work:
      roadmap:
        - sprint-5-specialist-holdpoints
      issues: []
    risks_and_uncertainty:
      - reviewer-market-and-cost-unknown
      - review-may-find-material-remediation-work
    support_does_not_purchase:
      - favorable-findings
      - certification
      - roadmap-control
      - private-vulnerability-access-beyond-authorized-review
    expiration_and_review:
      expires: "2027-01-31"
      triggers:
        - qualified-reviewer-available
        - material-security-architecture-change

  - id: OPP-2026-0002
    schema_version: "0.1.0"
    revision: 1
    synthetic: true
    status: reviewable
    title: Accessibility audit and remediation cycle
    public_need: Test direct and narrative experiences with assistive technology and affected-user participation.
    intended_outcome: Improve keyboard, screen-reader, reduced-motion, cognitive-accessibility, and low-bandwidth behavior while preserving meaningfully free access.
    affected_groups:
      - disabled-players
      - low-bandwidth-users
      - contributors
    requested_support:
      classes:
        - public-good-underwriting
        - pro-bono-specialist-review
      public_amount_band: "$25,000–$99,999"
      in_kind_alternatives:
        - qualified-accessibility-review
        - assistive-technology-testing
    partial_support_behavior: Partial support may fund a defined audit domain, but remediation and retest remain separately visible.
    acceptable_restrictions:
      - Use support for independent review, remediation, affected-user testing, and retest.
    prohibited_restrictions:
      - Sponsor selects the sole evaluator.
      - Findings are reduced to sponsor-controlled checklist compliance.
    planned_work_and_evidence:
      - review-plan
      - audit-report
      - remediation-pull-requests
      - independent-retest
      - unresolved-limitations-report
    responsible_role: founding-steward
    review_and_independence:
      required: affected-user-and-qualified-review-participation
      current_status: not-obtained
    dependency_and_exit:
      critical_function: false
      replacement: narrow-scope-or-select-alternate-reviewers
      cancellation: preserve-accessibility-backlog-and-report-unmet-scope
    linked_work:
      roadmap:
        - sprint-8-public-website-foundation
        - sprint-17-clinical-safety-accessibility-governance
      issues: []
    risks_and_uncertainty:
      - participant-recruitment-and-compensation-not-authorized
      - remediation-effort-unknown
    support_does_not_purchase:
      - accessibility-approval
      - product-placement
      - player-data
      - control-over-findings
    expiration_and_review:
      expires: "2027-01-31"
      triggers:
        - first-bounded-accessibility-review
        - material-interface-redesign

  - id: OPP-2026-0003
    schema_version: "0.1.0"
    revision: 1
    synthetic: true
    status: reviewable
    title: Synthetic fixture and benchmark expansion
    public_need: Expand fictional Living Chronicle, House of Keys, Aster, accessibility, temporal, provenance, and correction scenarios.
    intended_outcome: Improve reproducible validation without using private production health information.
    affected_groups:
      - contributors
      - reviewers
      - future-players
    requested_support:
      classes:
        - public-good-underwriting
        - in-kind-support
      public_amount_band: "$5,000–$24,999"
      in_kind_alternatives:
        - public-dataset-hosting
        - synthetic-generation-infrastructure
    partial_support_behavior: Partial support may fund one bounded fixture family with independent limitations reporting.
    acceptable_restrictions:
      - All records remain fictional or explicitly public and rights-cleared.
    prohibited_restrictions:
      - Sponsor branding becomes data authority.
      - Real private records are used as public fixtures.
    planned_work_and_evidence:
      - dataset-card
      - fixture-packages
      - deterministic-validation
      - limitations-and-coverage-report
    responsible_role: founding-steward
    review_and_independence:
      required: schema-owner-and-public-information-review
      current_status: internal-only
    dependency_and_exit:
      critical_function: false
      replacement: portable-public-files-and-provider-independent-hosting
      cancellation: retain-accepted-fixtures-and-close-unfunded-scope
    linked_work:
      roadmap:
        - sprint-7-forge-mcp-agent-safety
        - sprint-18-beta-evidence-release-gate
      issues: []
    risks_and_uncertainty:
      - representativeness-claims-may-exceed-evidence
      - hosting-support-may-create-dependency
    support_does_not_purchase:
      - schema-authority
      - benchmark-results
      - private-data-access
      - provider-defaults
    expiration_and_review:
      expires: "2027-01-31"
      triggers:
        - schema-version-change
        - first-public-benchmark-use

  - id: OPP-2026-0004
    schema_version: "0.1.0"
    revision: 1
    synthetic: true
    status: reviewable
    title: Public-domain legal migration review
    public_need: Review dedication instruments, contributor provenance, third-party materials, trademarks, and institutional asset boundaries.
    intended_outcome: Advance the public-domain constitutional direction without overstating legal completion or exposing privileged advice.
    affected_groups:
      - contributors
      - downstream-reusers
      - future-stewards
    requested_support:
      classes:
        - public-good-underwriting
        - pro-bono-specialist-review
      public_amount_band: "$25,000–$99,999"
      in_kind_alternatives:
        - qualified-legal-review
    partial_support_behavior: Partial support may answer one bounded legal question while all remaining instruments stay explicitly unresolved.
    acceptable_restrictions:
      - Privileged advice remains private while material institutional decisions receive reviewed public derivatives.
    prohibited_restrictions:
      - Funder controls the legal conclusion.
      - Support creates ownership of public-domain foundations.
    planned_work_and_evidence:
      - legal-question-register
      - instrument-and-provenance-review
      - public-decision-derivatives
      - unresolved-risk-register
    responsible_role: founding-steward
    review_and_independence:
      required: qualified-legal-review-with-conflicts-disclosed
      current_status: not-obtained
    dependency_and_exit:
      critical_function: false
      replacement: engage-another-qualified-reviewer-or-defer-migration
      cancellation: preserve-current-status-and-no-completion-claim
    linked_work:
      roadmap:
        - phase-0-legal-migration
      issues: []
    risks_and_uncertainty:
      - jurisdiction-and-instrument-fit-unknown
      - public-domain-goal-may-require-multiple-instruments
    support_does_not_purchase:
      - legal-conclusion
      - trademark-rights
      - project-ownership
      - governance-authority
    expiration_and_review:
      expires: "2027-01-31"
      triggers:
        - entity-selection
        - first-external-contributor-volume-gate

  - id: OPP-2026-0005
    schema_version: "0.1.0"
    revision: 1
    synthetic: true
    status: reviewable
    title: Contributor fellowship pilot cohort
    public_need: Fund bounded documentation, accessibility, synthetic-data, localization, maintenance, or governance-archive work.
    intended_outcome: Increase maintainership capacity and useful public artifacts without purchasing contribution credit or governance authority.
    affected_groups:
      - contributors
      - maintainers
      - users-of-public-documentation
    requested_support:
      classes:
        - public-good-underwriting
      public_amount_band: "$25,000–$99,999"
      in_kind_alternatives: []
    partial_support_behavior: Cohort size or scope may narrow only through published selection, compensation, and outcome rules.
    acceptable_restrictions:
      - Support is limited to independently scoped fellowship work and public reporting.
    prohibited_restrictions:
      - Sponsor unilaterally selects recipients.
      - Donation creates Fellowship, Laurels, or governance weight.
    planned_work_and_evidence:
      - compensation-and-selection-policy
      - public-scope-and-conflict-records
      - ordinary-pull-request-review
      - cohort-outcome-report
    responsible_role: founding-steward
    review_and_independence:
      required: compensation-authority-and-unconflicted-selection-review
      current_status: not-authorized
    dependency_and_exit:
      critical_function: false
      replacement: reduce-cohort-or-close-before-selection
      cancellation: no-compensation-commitment-before-authorized-funding
    linked_work:
      roadmap:
        - future-funding-operations-financial-controls
      issues: []
    risks_and_uncertainty:
      - compensation-and-tax-framework-not-selected
      - selection-could-reproduce-sponsor-or-founder-bias
    support_does_not_purchase:
      - recipient-selection
      - contribution-credit
      - governance-power
      - roadmap-control
    expiration_and_review:
      expires: "2027-01-31"
      triggers:
        - compensation-policy-accepted
        - first-fellowship-proposal

  - id: OPP-2026-0006
    schema_version: "0.1.0"
    revision: 1
    synthetic: true
    status: reviewable
    title: Replaceable public documentation infrastructure
    public_need: Support documentation hosting, build capacity, artifact storage, status reporting, and accessibility testing without creating vendor lock-in.
    intended_outcome: Keep public project information available through a portable, provider-neutral, and manually released operating path.
    affected_groups:
      - public-visitors
      - contributors
      - maintainers
    requested_support:
      classes:
        - in-kind-support
        - public-good-underwriting
      public_amount_band: "$5,000–$24,999"
      in_kind_alternatives:
        - hosting-credits
        - build-minutes
        - artifact-storage
    partial_support_behavior: Optional preview or testing capacity may narrow before canonical documentation availability.
    acceptable_restrictions:
      - Support remains nonexclusive and portable.
    prohibited_restrictions:
      - Default provider placement is exchanged for credits.
      - Public comparison, migration, or incident reporting is restricted.
    planned_work_and_evidence:
      - provider-neutral-evaluation
      - consumption-and-replacement-cost-record
      - export-and-migration-plan
      - source-loss-exercise
      - manual-release-evidence
    responsible_role: founding-steward
    review_and_independence:
      required: infrastructure-security-privacy-and-conflict-review
      current_status: not-obtained
    dependency_and_exit:
      critical_function: true
      replacement: static-or-alternate-hosting-with-documented-cutover
      cancellation: preserve-repository-documentation-and-disable-optional-previews
    linked_work:
      roadmap:
        - sprint-8-public-website-foundation
        - sprint-19-open-source-public-launch
      issues: []
    risks_and_uncertainty:
      - credit-expiration-and-replacement-cost
      - domain-release-and-deployment-access-concentration
    support_does_not_purchase:
      - provider-defaults
      - analytics-access
      - exclusive-hosting
      - control-over-release-or-reporting
    expiration_and_review:
      expires: "2027-01-31"
      triggers:
        - first-material-infrastructure-offer
        - provider-terms-or-ownership-change
`;

const validator = `import { readFile } from "node:fs/promises";

const failures = [];

function fail(message) {
  failures.push(message);
}

async function load(path) {
  return readFile(path, "utf8");
}

function requireText(path, content, expected) {
  if (!content.includes(expected)) fail(\`${path}: missing \${expected}\`);
}

function recordBlocks(content, kind) {
  const prefix = kind === "funding" ? "FND" : "OPP";
  const pattern = new RegExp(
    \`^  - id: (\${prefix}-\\d{4}-\\d{4})\\n([\\s\\S]*?)(?=^  - id: \${prefix}-\\d{4}-\\d{4}\\n|\\s*$)\`,
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
      if (!new RegExp(\`^    \${field}:\`, "m").test(record.body)) {
        fail(\`${path}: \${record.id} missing \${field}\`);
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
  "legitimate approved support destination",
);

const fundingRecords = recordBlocks(syntheticFunding, "funding");
const opportunityRecords = recordBlocks(syntheticOpportunities, "opportunity");

if (fundingRecords.length !== 5) {
  fail(\`${syntheticFundingPath}: expected 5 records, found \${fundingRecords.length}\`);
}
if (opportunityRecords.length !== 6) {
  fail(
    \`${syntheticOpportunityPath}: expected 6 opportunities, found \${opportunityRecords.length}\`,
  );
}

const allIds = [...fundingRecords, ...opportunityRecords].map(({ id }) => id);
if (new Set(allIds).size !== allIds.length) fail("duplicate funding identifier");

for (const record of fundingRecords) {
  if (!/^    synthetic: true$/m.test(record.body)) {
    fail(\`${syntheticFundingPath}: \${record.id} is not explicitly synthetic\`);
  }
  if (!/^    public_counterparty: Fictional /m.test(record.body)) {
    fail(\`${syntheticFundingPath}: \${record.id} counterparty is not fictional\`);
  }
}

for (const record of opportunityRecords) {
  if (!/^    synthetic: true$/m.test(record.body)) {
    fail(\`${syntheticOpportunityPath}: \${record.id} is not explicitly synthetic\`);
  }
  if (/^    status: open$/m.test(record.body)) {
    fail(\`${syntheticOpportunityPath}: \${record.id} must not be open\`);
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
  fail(\`${syntheticFundingPath}: missing fictional-data notice\`);
}
if (!/fictional/i.test(syntheticOpportunities.slice(0, 500))) {
  fail(\`${syntheticOpportunityPath}: missing fictional-data notice\`);
}

if (failures.length > 0) {
  console.error(
    "Funding record validation failed:\\n" +
      failures.map((failure) => \`- \${failure}\`).join("\\n"),
  );
  process.exit(1);
}

console.log(
  \`Funding record validation passed: \${fundingRecords.length} synthetic relationships, \${opportunityRecords.length} synthetic opportunities, and empty canonical live registers.\`,
);
`;

write(
  "docs/economics/synthetic-funding-opportunities.yml",
  syntheticOpportunities,
);
write("tools/policy/check-funding-records.mjs", validator);

const packageJson = JSON.parse(read("package.json"));
packageJson.scripts["economics:check"] =
  "node tools/policy/check-funding-records.mjs";
packageJson.scripts.check =
  "pnpm format:check && pnpm docs:check && pnpm policy:check && pnpm economics:check && pnpm content:check && pnpm lint && pnpm typecheck && pnpm test";
write("package.json", `${JSON.stringify(packageJson, null, 2)}\n`);

replaceOnce(
  "docs/economics/README.md",
  "- [`synthetic-funding-records.yml`](synthetic-funding-records.yml) — fictional examples for validation and review",
  "- [`synthetic-funding-records.yml`](synthetic-funding-records.yml) — fictional relationship examples for validation and review\n- [`synthetic-funding-opportunities.yml`](synthetic-funding-opportunities.yml) — fictional public-good opportunity examples",
);
replaceOnce(
  "docs/economics/README.md",
  "The current implementation is documentation, public registers, and synthetic exercises only.",
  "The current implementation is documentation, public registers, synthetic exercises, and lightweight repository validation only.",
);
replaceOnce(
  "docs/economics/README.md",
  "## Authority",
  "## Validation\n\nRun `pnpm economics:check` to verify that the canonical live registers remain empty, synthetic records are explicitly fictional, stable identifiers are unique, and required relationship and opportunity sections are present. This lightweight validation checks repository contracts; it is not accounting reconciliation, legal review, or operational financial assurance.\n\n## Authority",
);

replaceOnce(
  "docs/economics/public-good-underwriting-catalogue.md",
  "The synthetic opportunity register demonstrates possible records for:",
  "The [`synthetic funding opportunity register`](synthetic-funding-opportunities.yml) demonstrates fictional records for:",
);

replaceOnce(
  "GOVERNANCE.md",
  "**Operational feedback baseline:** Decision 0006",
  "**Operational feedback baseline:** Decision 0006  \n**Economic funding baseline:** Decision 0008",
);
replaceOnce(
  "GOVERNANCE.md",
  "These require transparent conflicts, financial evidence, stakeholder impact analysis, and governance appropriate to the amount and reversibility of risk.\n\n### Technical and operational decisions",
  "These require transparent conflicts, financial evidence, stakeholder impact analysis, and governance appropriate to the amount and reversibility of risk.\n\n## Funding and sponsorship governance\n\nDecision 0008 governs donations, grants, sponsorships, public-good underwriting, in-kind support, provider credits, affiliate proposals, research funding, investments, compensation, and related-party economic relationships.\n\nDuring Phase 0:\n\n- material organizational, restricted, related-party, vendor-linked, and in-kind relationships require reviewed public institutional records;\n- raw donor, payment, banking, tax, contract, negotiation, compensation, and accounting source records remain outside public GitHub systems;\n- funding cannot purchase private information, product or research authority, health influence, roadmap control, governance power, player progression, favorable findings, provider defaults, or safety exceptions;\n- sponsors, funded implementers, and sponsor-funded evaluators cannot independently certify their own work;\n- infrastructure support requires provider-neutral evaluation, concentration review, portability, replacement, migration, and exit behavior; and\n- no support, donation, sponsorship, affiliate, payment, treasury, charitable, nonprofit, or tax-deductible surface becomes operational merely because the Phase 0 doctrine exists.\n\nThe canonical operating policies and public record contracts are maintained in [`docs/economics`](docs/economics/README.md). Actual receipt, custody, expenditure, compensation, and treasury operation require separately accepted legal and financial controls.\n\n### Technical and operational decisions",
);
replaceOnce(
  "GOVERNANCE.md",
  "- conflicts and recusals\n- treasury policy and reports",
  "- conflicts and recusals\n- material funding relationships, restrictions, approved benefits, dependencies, concentration, corrections, and funded outcomes\n- treasury policy, funding and expenditure reports, and independently reviewable records when those systems become active",
);

replaceOnce(
  "docs/website/information-architecture.md",
  "**Status date:** 2026-07-24",
  "**Status date:** 2026-07-27",
);
replaceOnce(
  "docs/website/information-architecture.md",
  "7. The website may invite attention; it may not manufacture urgency around health information, consent, research, money, authority, or account creation.",
  "7. The website may invite attention; it may not manufacture urgency around health information, consent, research, money, authority, or account creation.\n8. Support, donation, sponsorship, grant, and funding views render only approved PUBLIC economics records and cannot activate transactions without accepted recipient, custody, accounting, tax, privacy, refund, and payment-rail gates.",
);
replaceOnce(
  "docs/website/information-architecture.md",
  "7. **Support** — founding expedition, donations, sponsorship, and transparent use of funds",
  "7. **Support** — public-good opportunities, funding relationships, approved and prohibited benefits, outcomes, conflicts, concentration, corrections, and transparent use of funds",
);
replaceOnce(
  "docs/website/information-architecture.md",
  "- `/research-status`\n- `/donate`\n- `/press`",
  "- `/research-status`\n- `/support`\n- `/donate` — DEFERRED transaction route until the accepted operational funding gates are satisfied\n- `/press`",
);
replaceOnce(
  "docs/website/information-architecture.md",
  "No public form publishes directly to a public page, campaign record, testimonial, issue, directory, dashboard, or structured-data feed.\n\n## Trust requirements",
  "No public form publishes directly to a public page, campaign record, testimonial, issue, directory, dashboard, or structured-data feed.\n\n## Support and funding transparency\n\nThe `/support` surface is an institutional transparency and public-good opportunity view before it is a transaction surface. It must render approved PUBLIC fields from `docs/economics` rather than maintain an independent sponsor database or website-only benefit model.\n\nFor each material relationship, show as applicable:\n\n- who supported the project or the reviewed withholding label;\n- relationship class and status;\n- what was funded and which public work is linked;\n- value or approved public amount band;\n- restrictions and explicitly rejected restrictions;\n- approved benefits and benefits that were not granted;\n- conflicts, recusals, reviewer independence limitations, and responsible authority;\n- concentration, critical dependency, portability, and exit status;\n- delivery, expenditure where applicable, outcome, variance, unspent obligations, correction, and residual risk; and\n- public and protected challenge routes.\n\nA public opportunity may be displayed only from the canonical opportunity register. `draft` and `reviewable` opportunities are not open for money. An `open` status additionally requires a legitimate recipient, authority to receive and return funds, custody and accounting ownership, privacy notice, fraud and refund behavior, and truthful payment capability.\n\nThe website must not claim charitable, tax-deductible, nonprofit, public-benefit, independently audited, or financially controlled status without the corresponding evidence. Sponsor recognition remains visually distinct from health, product, provider, permission, safety, accessibility, and governance recommendations.\n\n## Trust requirements",
);
replaceOnce(
  "docs/website/information-architecture.md",
  "- how donations and public-good funds are used",
  "- who supports the project, what they fund, what benefits they receive and do not receive, how funds are used, conflicts, concentration, outcomes, corrections, and challenge routes",
);
replaceOnce(
  "docs/website/information-architecture.md",
  "- Donation transparency",
  "- Support and funding transparency from canonical economics records",
);
replaceOnce(
  "docs/website/information-architecture.md",
  "- no unavailable capability is represented as live\n- every major claim has a source, owner, reviewed date, status, or correction path appropriate to the claim",
  "- no unavailable capability is represented as live\n- support and funding views derive from canonical approved PUBLIC economics records\n- no donation, sponsorship, grant-intake, affiliate, checkout, payment, charitable, tax-deductible, nonprofit, or public-benefit transaction claim activates before its operational gates are accepted\n- every major claim has a source, owner, reviewed date, status, or correction path appropriate to the claim",
);

replaceOnce(
  "ROADMAP.md",
  "- Initial succession and key-person-risk register",
  "- Initial succession and key-person-risk register\n- Initial founder-subsidy and economic-dependency register using reviewed public categories without exposing private financial source records",
);
replaceOnce(
  "ROADMAP.md",
  "- Any unresolved entity, custody, accounting, tax, compensation, treasury, payment, and operational financial gates are named rather than implied to be complete",
  "- Any unresolved entity, custody, accounting, tax, compensation, treasury, payment, and operational financial gates are named rather than implied to be complete\n- Founder-provided labor, accounts, services, guarantees, and critical economic dependencies have an initial public-safe inventory and replacement owner",
);

replaceOnce(
  "docs/roadmap/current-status.md",
  "6. a decision on when transitional PR-level DCO is replaced by commit-level enforcement;\n7. the accepted Funding and Sponsorship Baseline, with unresolved entity, custody, accounting, tax, compensation, treasury, and operational gates explicit; and\n8. an explicit Phase 0 exit review identifying unresolved risks, responsible stewards, and rollback conditions.",
  "6. a decision on when transitional PR-level DCO is replaced by commit-level enforcement;\n7. the accepted Funding and Sponsorship Baseline, with unresolved entity, custody, accounting, tax, compensation, treasury, and operational gates explicit;\n8. an initial founder-subsidy and economic-dependency register using public-safe categories, responsible owners, replacement conditions, and private-source boundaries; and\n9. an explicit Phase 0 exit review identifying unresolved risks, responsible stewards, and rollback conditions.",
);
replaceOnce(
  "docs/roadmap/current-status.md",
  "The repository provides `pnpm check`, synthetic-data-only contribution rules, independent CI checks, documentation-link validation, content and model validation, tests, and transitional DCO certification.",
  "The repository provides `pnpm check`, synthetic-data-only contribution rules, independent CI checks, documentation-link validation, funding-register validation, content and model validation, tests, and transitional DCO certification.",
);

replaceOnce(
  "docs/economics/phase-0-funding-completion-record.md",
  "- five synthetic funding records;\n- sixteen founding-steward design tabletop scenarios; and",
  "- five synthetic funding relationship records;\n- six synthetic funding opportunity records;\n- lightweight validation for canonical and synthetic funding registers;\n- sixteen founding-steward design tabletop scenarios; and",
);
replaceOnce(
  "docs/economics/phase-0-funding-completion-record.md",
  "- [`Public-Good Underwriting Catalogue`](public-good-underwriting-catalogue.md)\n\nResult:",
  "- [`Public-Good Underwriting Catalogue`](public-good-underwriting-catalogue.md)\n- [`synthetic-funding-opportunities.yml`](synthetic-funding-opportunities.yml)\n\nResult:",
);
replaceOnce(
  "docs/economics/phase-0-funding-completion-record.md",
  "- [`Current status`](../roadmap/current-status.md)\n- [`Public Institutional Roadmap`](../../ROADMAP.md)\n- [`Assumption Registry`](../governance/assumption-registry.md)",
  "- [`Current status`](../roadmap/current-status.md)\n- [`Sprint plan`](../roadmap/sprints.md)\n- [`Public Institutional Roadmap`](../../ROADMAP.md)\n- [`Governance Baseline`](../../GOVERNANCE.md)\n- [`Website Information Architecture`](../website/information-architecture.md)\n- [`Assumption Registry`](../governance/assumption-registry.md)",
);
replaceOnce(
  "docs/economics/phase-0-funding-completion-record.md",
  "- no donation, sponsor, nonprofit, charitable, tax-deductible, payment, treasury, accounting, compensation, affiliate, investment, research-funding, provider, or financial runtime is represented as live; and\n- the funding baseline is an explicit Phase 0 closure requirement without prematurely implementing Phase 5 economics.",
  "- no donation, sponsor, nonprofit, charitable, tax-deductible, payment, treasury, accounting, compensation, affiliate, investment, research-funding, provider, or financial runtime is represented as live;\n- Governance explicitly inherits Decision 0008;\n- the Website Information Architecture derives support and funding transparency from canonical economics records and preserves the transaction activation gate;\n- the sprint plan carries the baseline into Sprints 6, 7, 8, 17, 18, and 19 and defines a future Funding Operations and Financial Controls workstream; and\n- the funding baseline is an explicit Phase 0 closure requirement without prematurely implementing Phase 5 economics.",
);
replaceOnce(
  "docs/economics/phase-0-funding-completion-record.md",
  "| Accepted doctrine remains distinct from implementation",
  "| Canonical live registers remain empty and synthetic relationship and opportunity records pass lightweight structural validation | `pnpm economics:check`; canonical and synthetic YAML registers | Met at repository-contract level |\n| Accepted doctrine remains distinct from implementation",
);
replaceOnce(
  "docs/economics/phase-0-funding-completion-record.md",
  "- the Vision and institutional mandate;\n- the Architecture Foundation;",
  "- the Vision and institutional mandate;\n- the Governance Baseline, which now explicitly links Decision 0008;\n- the Website Information Architecture, which now inherits canonical funding records and activation gates;\n- the Architecture Foundation;",
);
replaceOnce(
  "docs/economics/phase-0-funding-completion-record.md",
  "- actual evidence that the funding model creates public benefit without capture.",
  "- an initial public-safe founder-subsidy and economic-dependency inventory; or\n- actual evidence that the funding model creates public benefit without capture.",
);
replaceOnce(
  "docs/economics/phase-0-funding-completion-record.md",
  "## Repository and information boundary",
  "## Original-plan artifact reconciliation\n\nThe first-pass artifact proposal is fully represented with deliberate consolidations:\n\n- taxonomy and ordinary acceptance rules live in the operating baseline, while conflicts, recusals, and approval authority live in the conflict and acceptance policy;\n- the synthetic relationship examples and synthetic opportunity examples remain separate files at the economics root for direct navigation;\n- concentration is a field of every material relationship plus aggregate reporting rather than a duplicate standalone relationship register;\n- the founder-subsidy inventory remains an explicit Phase 0 closure item because the funding doctrine cannot invent personal financial values or privately held dependencies; and\n- `.github/FUNDING.yml` remains intentionally absent until a legitimate approved destination exists.\n\n## Repository and information boundary",
);
replaceOnce(
  "docs/economics/phase-0-funding-completion-record.md",
  "Repository CI is expected to validate formatting, documentation links, repository policy, content validation, lint, type checking, tests, and DCO after the review pull request opens.",
  "Repository CI validates formatting, documentation links, repository policy, funding-register contracts through `pnpm economics:check`, content validation, lint, type checking, tests, and DCO.",
);

write(
  ".github/workflows/ci.yml",
  `name: CI

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

concurrency:
  group: \${{ github.workflow }}-\${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true

jobs:
  formatting:
    name: formatting
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v7
      - uses: pnpm/action-setup@v6
        with:
          version: 10.13.1
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: pnpm
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Check formatting
        id: formatting
        continue-on-error: true
        run: pnpm format:check
      - name: Prepare formatting fixes
        if: steps.formatting.outcome == 'failure'
        run: |
          pnpm format
          git diff --binary > formatting.patch
          git diff --name-only -z | tar --null -T - -czf formatted-files.tar.gz
      - name: Upload formatting fixes
        if: steps.formatting.outcome == 'failure'
        uses: actions/upload-artifact@v7
        with:
          name: formatting-fixes
          path: |
            formatting.patch
            formatted-files.tar.gz
          if-no-files-found: error
      - name: Fail on formatting differences
        if: steps.formatting.outcome == 'failure'
        run: exit 1

  validate:
    name: \${{ matrix.check.name }}
    runs-on: ubuntu-latest
    timeout-minutes: 15
    strategy:
      fail-fast: false
      matrix:
        check:
          - name: documentation-links
            command: pnpm docs:check
          - name: repository-policy
            command: pnpm policy:check
          - name: economics-validation
            command: pnpm economics:check
          - name: content-validation
            command: pnpm content:check
          - name: lint
            command: pnpm lint
          - name: typecheck
            command: pnpm typecheck
          - name: tests
            command: pnpm test
    steps:
      - uses: actions/checkout@v7
      - uses: pnpm/action-setup@v6
        with:
          version: 10.13.1
      - uses: actions/setup-node@v7
        with:
          node-version: 24
          cache: pnpm
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Run \${{ matrix.check.name }}
        run: \${{ matrix.check.command }}
`,
);

unlinkSync("tools/one-time-funding-final-audit.mjs");
