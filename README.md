# Calypso’s Promise

[Documentation](docs/README.md) · [Vision](VISION.md) · [Current status](docs/roadmap/current-status.md) · [Sprint 7 completion](docs/roadmap/sprint-7-completion-record.md) · [Pre-Sprint 8 review](docs/roadmap/pre-sprint-8-alignment-review.md) · [Architecture](docs/architecture/README.md) · [Roadmap](ROADMAP.md) · [Governance](GOVERNANCE.md) · [Contributing](CONTRIBUTING.md)

**Build your Living Chronicle. Improve your health. Keep the key.**

Calypso’s Promise is an open-source, narrative-driven health platform that helps people build, understand, and control a longitudinal record of their lives. The playable world of Ogygia turns brief health actions, data capture, learning, and reflection into quests while keeping private health data separate from the open-source codebase.

## Start here

- **Understand the Promise:** [Product Constitution](docs/frozen/product-constitution.md) → [Vision](VISION.md) → [Architecture Foundation](docs/frozen/architecture.md)
- **Review the current candidate:** [Current Project Status](docs/roadmap/current-status.md) → [Sprint 7 Completion Record](docs/roadmap/sprint-7-completion-record.md) → [Pre-Sprint 8 Alignment Review](docs/roadmap/pre-sprint-8-alignment-review.md)
- **Inspect Forge:** [Boundary and Registry](docs/architecture/forge-mcp-boundary-and-tool-registry.md) → [Local Transport](docs/architecture/forge-mcp-local-stdio-transport.md) → [Source Catalogue](docs/architecture/forge-mcp-source-catalogue-and-provenance.md) → [Tools](docs/architecture/forge-mcp-lore-and-schema-tools.md) → [Generation](docs/architecture/forge-mcp-deterministic-synthetic-generation.md) → [Execution Receipts](docs/architecture/forge-mcp-scopes-limits-receipts-and-errors.md) → [Agent Security](docs/architecture/forge-mcp-agent-security-compatibility-and-operability.md) → [Reconciliation](docs/architecture/forge-sprint-7-cross-contract-reconciliation.md)
- **Review the merged Aster baseline:** [Sprint 6 Completion Record](docs/roadmap/sprint-6-completion-record.md) → [Aster Contract Baseline](docs/product/aster-contract-baseline.md)
- **Apply core decisions:** [Operational Simplicity](docs/decisions/0011-operational-simplicity-and-durable-workflows.md) · [Consumer-First Boundary](docs/decisions/0010-consumer-first-provider-independent-boundary.md) · [Funding Baseline](docs/economics/README.md)
- **Build safely:** [Contributing](CONTRIBUTING.md) → [Module Boundaries](docs/architecture/module-boundaries.md) → [Development Policy](docs/policies/development.md) → [Security](SECURITY.md)

## Project status

Calypso’s Promise remains in **institutional Phase 0 — Constitutional and open-source foundations** until an explicit phase-exit review is accepted.

**Sprints 0–6 are complete and merged.** Sprint 6 merged through PR #48 as squash commit `5aa3540765e5573f3304ce2b624d7a02c3ba2d13`.

The pre-Sprint 7 alignment review merged through PR #52 as squash commit `a41ca5ad9d2c0fe8a009946f376705bb7910e223`.

**Sprint 7 — Forge MCP and Agent Safety remains active** through issue #54 and draft PR #55. All implementation workstreams and the 7.10 completion package are present on the branch. The candidate is ready for founding-steward acceptance but is not merged.

The candidate establishes:

- one local `apps/mcp-forge` application over newline-delimited UTF-8 `stdio`;
- exactly ten accepted tools in runtime registry revision `4`;
- public repository and explicitly synthetic information only;
- nine server-owned source roots with allowlists, traversal and symlink isolation, SHA-256 provenance, and visible partial states;
- bounded lore, architecture, decision, and public-standards search;
- deterministic content, quest, and draft-mapping validation;
- deterministic synthetic quest and mapping-draft generation;
- immutable execution scopes, request and result ceilings, timeout, cancellation, per-tool concurrency, and serialized-materialization limits;
- bounded invocation receipts and stable public-safe errors;
- runtime-integrity checks and successful-result security postconditions;
- exact-revision compatibility and additive migration records;
- static prohibited-capability auditing;
- clean credential-free provider-independent startup;
- an 18-scenario public/synthetic adversarial matrix;
- cross-contract reconciliation, twenty-eight controls, nineteen open holdpoints, and eighteen unresolved-work records; and
- a prepared Sprint 8 website handoff.

These controls are bounded local public/synthetic evidence. They do not establish private Chronicle tools, remote MCP, repository mutation, shell or network authority, production providers or connectors, process isolation, monitoring, incident response, representative measurement, independent penetration testing, specialist approval, or production readiness.

**Sprint 8 has not started.** The prepared handoff preserves `apps/site` as the single website owner and directs migration of Website Track 0A into one honest, accessible Next.js public foundation only after Sprint 7 acceptance and squash merge.

No current documentation or contract baseline activates production health data, production AI, private MCP, accounts, provider calls, connectors, clinical workflows, enterprise services, workflow orchestration, research enrollment, donation checkout, sponsor intake, legacy directives, estate access, production synthetic-data publication, production resource isolation, or financial operations.

## Accepted and merged foundations

- Sprint 0 established frozen product, architecture, gameplay, lore, and governance foundations.
- Sprint 1 established the runnable monorepo and open-source operating baseline.
- Sprint 2 established controlled vocabulary, content schemas, canon validation, and deterministic incentive boundaries.
- Decision 0003 established progressive decentralization, founder independence, and the hundred-year objective.
- Sprint 3 established the pre-stable Living Chronicle contract baseline.
- Decision 0007 established the Institutional Immune System.
- Sprint 4 established the pre-stable House of Keys permission baseline.
- Sprint 5 established the threat-model and security design baseline.
- Decision 0008 established funding and sponsorship doctrine without accepting or operating money.
- Decision 0010 established the consumer-first, provider-independent boundary.
- Decision 0011 established operational simplicity and durable-workflow constraints.
- Sprint 6 established the pre-stable provider-independent Aster contract baseline.

The merged Chronicle, House of Keys, security, funding, operational, and Aster work remains contract, policy, design, and public-synthetic evidence rather than production operation or independent certification.

## Frozen foundations

- Product thesis and player promise
- First player: people—any human may begin
- Ogygia world, central mythology, Seven Laws, zones, principal cast, Seven Tides, and Fourteen Lanterns
- Illustrated, map-based narrative play rather than a conventional 3D game
- Open code and synthetic fixtures; private production health data
- AI proposes, the player confirms, and deterministic domain services validate and store
- Structured records remain authoritative
- MCP exposes selected bounded capabilities; it is not the product database or core protocol
- Personal value before secondary use, deterministic incentives, meaningful refusal, and non-punitive return
- Progressive decentralization toward a self-sustaining, founder-independent institution

## Current gates and unresolved work

- Obtain explicit founding-steward acceptance and squash merge of Sprint 7 PR #55.
- Keep Sprint 8 blocked until that acceptance and merge are recorded.
- Keep Forge local, public-only, synthetic-only, allowlisted, non-mutating, network-free, provider-free, and unable to execute consequential actions.
- Preserve every Sprint 5, Sprint 6, and Sprint 7 production, privacy, security, accessibility, clinical, provider, connector, operational, institutional, and measurement holdpoint.
- Treat generated diversity and accessibility scenarios as test evidence rather than conformance or representativeness.
- Treat receipts, integrity checks, postconditions, compatibility records, startup tests, and passing CI as bounded evidence rather than security, privacy, performance, production, or institutional approval.
- Keep issue #50 trigger-based; Forge has no Aster dependency or consumer friction.
- Review proposed Decision 0009 without representing it as a live legal or product capability.
- Complete the remaining Phase 0 key-person, succession, founder-power, economic-dependency, historical-source, branch-protection, DCO, operability, distributed-ownership, specialist-review, human-readable and machine-readable architecture audit, and phase-exit work.

## Long-horizon mandate

The consumer application is the beginning, not the final institutional form.

Calypso’s Promise is designed to earn trust through personal utility, help people build longitudinal health records under their control, operate through understandable and replaceable workflows, interoperate through inspectable boundaries, enable separately authorized collective benefit, preserve person-directed long-horizon choices, and progressively transfer stewardship as evidence and organizational capacity mature.

Token, blockchain, NFT, and on-chain DAO mechanisms remain optional and deferred. Founder independence, provider replaceability, operational continuity, and accountable collective stewardship do not.

## Public feedback and governed work

GitHub issues are the current canonical ledger for public-safe product and contributor work. They should connect a problem or proposal to evidence, prioritization, decision, implementation, validation, release, measured outcome, correction, and institutional learning.

Public issues must never contain real health information, account-specific support, private correspondence, security reports, conduct evidence, production data, protected provider or interoperability records, private contracts or negotiations, credentials, protected estate records, protected financial source records, or other protected material. Use synthetic or explicitly public examples.

Community reactions and comments are advisory during Phase 0. Decision 0006 defines the path toward typed signals, explainable priority assessment, bounded delegation, and later community authority without bypassing maintainers, specialists, safety controls, or constitutional rights.

## Institutional immune system

Calypso’s Promise treats corrigibility as architecture. Material mechanisms should expose assumptions, intended outcomes, guardrails, uncertainty, challenge paths, rollback or containment, appeal, restoration, and revalidation timing.

- [Institutional Immune System](docs/governance/institutional-immune-system.md)
- [Assumption Registry](docs/governance/assumption-registry.md)
- [AS-0013 — Operational Simplicity](docs/governance/assumption-AS-0013-operational-simplicity-durable-value.md)
- [AS-0012 — Consumer-First Continuity](docs/governance/assumption-AS-0012-consumer-first-continuity-value.md)
- [AS-0011 — Proposed Post-Mortem Chronicle Value](docs/governance/assumption-AS-0011-health-data-legacy-value.md)

## Quick start

Requirements:

- Node.js 24+
- pnpm 10.13.1

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm --filter @calypsos-promise/site dev
```

Open `http://localhost:3000` to run the bounded public repository gateway locally.

## Repository surfaces

### Implemented now

- [`apps/site`](apps/site) — Website Track 0A public repository gateway and purpose-limited signup adapter; not yet the Sprint 8 Next.js foundation
- [`apps/mcp-forge`](apps/mcp-forge) — local public/synthetic `stdio` contributor tooling with ten bounded tools and Sprint 7 controls
- [`packages/domain`](packages/domain) — shared repository invariants and contracts
- [`packages/content-schema`](packages/content-schema) — content contracts, deterministic validators, graph contracts, and JSON Schema
- [`packages/health-schema`](packages/health-schema) — pre-stable Living Chronicle contracts, deterministic validators, and public synthetic fixtures
- [`packages/house-of-keys`](packages/house-of-keys) — pre-stable permission contracts, deterministic policy evaluation, receipts, and public synthetic fixtures
- [`packages/aster`](packages/aster) — merged pre-stable provider-independent Aster contracts, validators, public synthetic fixtures, compatibility, and migration evidence
- [`content`](content) — versioned canon, quests, dialogue, education, and safety examples
- [`docs/standards`](docs/standards/README.md) — public standards references and draft mapping examples without certification or production connector claims
- [`fixtures/connectors`](fixtures/connectors) — explicitly synthetic, non-production, credential-free, personal-data-free connector examples
- [`docs/security`](docs/security/README.md) — merged security architecture, controls, risks, procedures, tabletops, and holdpoints
- [`docs/economics`](docs/economics/README.md) — merged funding doctrine and public record contracts; no operating finance
- [`tools`](tools) — repository policy, documentation, funding-register, and content validation

### Planned and gated

- Sprint 8 public website foundation after Sprint 7 acceptance and merge
- production synthetic-data generation, de-identification, statistical population modeling, validation, and dataset publication
- production process isolation, quotas, distributed rate limiting, monitoring, incident response, and resource-control operations
- `apps/game` — planned universal Expo game
- `apps/api` — planned modular TypeScript application
- `apps/mcp-chronicle` — future private, policy-controlled tools
- production identity, persistence, providers, retrieval, memory, connectors, workflows, analytics, research, legacy, and financial systems

Planned surfaces should not be created as empty placeholders. A new module needs a bounded responsibility, current consumer, public contract, dependency direction, owner, tests, synthetic evidence, and proportionate operational justification.

## Core rule

> The software is open. The person’s health data is private.

A provider, EHR, sponsor, enterprise contract, workflow engine, queue, cloud service, MCP client, invocation receipt, integrity check, mapping draft, synthetic connector fixture, generated fixture, death, incapacity, inactivity, or possible scientific value does not alter that rule.

No contributor workflow, public demo, test environment, or open-source agent may require production health data. Synthetic fixtures are the default development material. Input passing a public-safe syntax or size check is not proof that private information is appropriate.

## Contributing and security

Read [Contributing](CONTRIBUTING.md), [Governance](GOVERNANCE.md), and [Security](SECURITY.md) before opening an issue or pull request. Material changes to frozen components require an accepted decision record.
