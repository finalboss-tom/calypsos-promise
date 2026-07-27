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
    throw new Error(path + ": expected text not found: " + expected.slice(0, 120));
  }
  write(path, content.replace(expected, replacement));
}

const packageJson = JSON.parse(read("package.json"));
packageJson.scripts["economics:check"] =
  "node tools/policy/check-funding-records.mjs";
packageJson.scripts.check =
  "pnpm format:check && pnpm docs:check && pnpm policy:check && pnpm economics:check && pnpm content:check && pnpm lint && pnpm typecheck && pnpm test";
write("package.json", JSON.stringify(packageJson, null, 2) + "\n");

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
  "- [`Current status`](../roadmap/current-status.md)\n- [`Design-to-Build Sprint Plan`](../roadmap/sprints.md)\n- [`Public Institutional Roadmap`](../../ROADMAP.md)\n- [`Assumption Registry`](../governance/assumption-registry.md)",
  "- [`Current status`](../roadmap/current-status.md)\n- [`Design-to-Build Sprint Plan`](../roadmap/sprints.md)\n- [`Public Institutional Roadmap`](../../ROADMAP.md)\n- [`Governance Baseline`](../../GOVERNANCE.md)\n- [`Website Information Architecture`](../website/information-architecture.md)\n- [`Assumption Registry`](../governance/assumption-registry.md)",
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
unlinkSync("tools/one-time-funding-final-audit-v2.mjs");
