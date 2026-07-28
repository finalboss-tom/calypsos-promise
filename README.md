# Calypso’s Promise

[Documentation](docs/README.md) · [Vision](VISION.md) · [Current status](docs/roadmap/current-status.md) · [Pre-Sprint 7 review](docs/roadmap/pre-sprint-7-alignment-review.md) · [Sprint 6 completion](docs/roadmap/sprint-6-completion-record.md) · [Aster contracts](docs/product/aster-contract-baseline.md) · [Operational simplicity](docs/decisions/0011-operational-simplicity-and-durable-workflows.md) · [Consumer-first boundary](docs/decisions/0010-consumer-first-provider-independent-boundary.md) · [Funding baseline](docs/economics/README.md) · [Roadmap](ROADMAP.md) · [Governance](GOVERNANCE.md) · [Contributing](CONTRIBUTING.md)

**Build your Living Chronicle. Improve your health. Keep the key.**

Calypso’s Promise is an open-source, narrative-driven health platform that helps people build, understand, and control a longitudinal record of their lives. The playable world of Ogygia turns brief health actions, data capture, learning, and reflection into quests while keeping private health data separate from the open-source codebase.

## Start here

- **Understand the Promise:** [Product Constitution](docs/frozen/product-constitution.md) → [Vision](VISION.md) → [Architecture Foundation](docs/frozen/architecture.md)
- **See what exists now:** [Current Project Status](docs/roadmap/current-status.md) → [Pre-Sprint 7 Alignment Review](docs/roadmap/pre-sprint-7-alignment-review.md) → [Sprint Roadmap](docs/roadmap/sprints.md)
- **Review the merged Aster baseline:** [Sprint 6 Completion Record](docs/roadmap/sprint-6-completion-record.md) → [Aster Contract Baseline](docs/product/aster-contract-baseline.md) → [Aster Holdpoints](docs/architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md)
- **Apply operational simplicity:** [Decision 0011](docs/decisions/0011-operational-simplicity-and-durable-workflows.md) → [Operational Architecture](docs/architecture/operational-simplicity-and-durable-workflows.md)
- **Apply the consumer-first boundary:** [Decision 0010](docs/decisions/0010-consumer-first-provider-independent-boundary.md) → [Architecture Rationale](docs/architecture/consumer-first-provider-independent-boundary.md)
- **Review permission and security:** [Sprint 4 Completion](docs/roadmap/sprint-4-completion-record.md) → [Sprint 5 Completion](docs/roadmap/sprint-5-completion-record.md) → [Security Policy](SECURITY.md)
- **Review funding boundaries:** [Decision 0008](docs/decisions/0008-funding-and-sponsorship-baseline.md) → [Economics and Public-Good Funding](docs/economics/README.md)
- **Build safely:** [Contributing](CONTRIBUTING.md) → [Module Boundaries](docs/architecture/module-boundaries.md) → [Development Policy](docs/policies/development.md)

## Project status

Calypso’s Promise remains in **institutional Phase 0 — Constitutional and open-source foundations** until an explicit phase-exit review is accepted.

**Sprints 0–6 are complete and merged.** Sprint 6 — Aster Contracts and AI Governance merged through PR #48 as squash commit `5aa3540765e5573f3304ce2b624d7a02c3ba2d13`.

The [Pre-Sprint 7 Alignment Review](docs/roadmap/pre-sprint-7-alignment-review.md), tracked by issue #51, is the active gate. It confirms Sprint 7 remains aligned and defines a bounded Forge MCP handoff before implementation begins.

After that reconciliation is accepted and merged, **Sprint 7 — Forge MCP and Agent Safety** becomes the next numbered sprint. Sprint 7 remains limited to local `stdio`, public documentation, synthetic data, allowlisted repository sources, deterministic validation, draft generation, and public-safe contributor tooling.

No current documentation or contract baseline activates production health data, production AI, private MCP, accounts, provider calls, connectors, clinical workflows, enterprise services, workflow orchestration, research enrollment, donation checkout, sponsor intake, legacy directives, estate access, or financial operations.

### Accepted and merged foundations

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
- The pre-Sprint 6 reconciliation established the bounded Aster handoff.
- Sprint 6 established the pre-stable provider-independent Aster contract baseline, deterministic validators, public synthetic fixtures, provider governance, compatibility, migration, control mapping, and holdpoints.

The merged Chronicle, House of Keys, security, funding, operational, and Aster work remains design, contract, policy, and public-synthetic evidence rather than production operation or independent certification.

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

- Accept and merge the [Pre-Sprint 7 Alignment Review](docs/roadmap/pre-sprint-7-alignment-review.md) before Sprint 7 implementation starts.
- Begin Sprint 7 through a dedicated issue, execution plan, branch, draft pull request, public or synthetic evidence, completion record, and explicit founding-steward acceptance.
- Keep Forge MCP local, public-only, synthetic-only, allowlisted, non-mutating, network-free, and unable to execute consequential actions during Sprint 7.
- Preserve all Sprint 5 and Sprint 6 production, security, privacy, accessibility, clinical, provider, connector, operational, and institutional holdpoints.
- Keep issue #50 trigger-based until a real consumer produces concrete Aster API or validator ergonomics evidence.
- Review, revise, accept, or decline proposed Decision 0009 without representing it as a live legal or product capability.
- Complete the remaining institutional Phase 0 key-person, succession, founder-power, economic-dependency, historical-source, branch-protection, DCO, operability, distributed-ownership, specialist-review, and phase-exit work.

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

The immune-system metaphor applies to harmful conditions and mechanisms—not people or groups. Demonstrating that an accepted premise or favored mechanism is wrong contributes to the project’s ability to survive its own mistakes.

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

- [`apps/site`](apps/site) — bounded public repository gateway and purpose-limited signup adapter
- [`packages/domain`](packages/domain) — shared repository invariants and contracts
- [`packages/content-schema`](packages/content-schema) — content contracts, deterministic validators, graph contracts, and JSON Schema
- [`packages/health-schema`](packages/health-schema) — pre-stable Living Chronicle contracts, deterministic validators, and public synthetic fixtures
- [`packages/house-of-keys`](packages/house-of-keys) — pre-stable permission contracts, deterministic policy evaluation, receipts, and public synthetic fixtures
- [`packages/aster`](packages/aster) — merged pre-stable provider-independent Aster contracts, validators, public synthetic fixtures, compatibility, and migration evidence
- [`content`](content) — versioned canon, quests, dialogue, education, and safety examples
- [`docs/security`](docs/security/README.md) — merged security architecture, controls, risks, procedures, tabletops, and holdpoints
- [`docs/economics`](docs/economics/README.md) — merged funding doctrine and public record contracts; no operating finance
- [`tools`](tools) — repository policy, documentation, funding-register, and content validation

### Planned and gated

- `apps/mcp-forge` — planned Sprint 7 local public-documentation and synthetic-data tooling
- `apps/game` — planned universal Expo game
- `apps/api` — planned modular TypeScript application
- `apps/mcp-chronicle` — future private, policy-controlled tools
- production identity, persistence, providers, retrieval, memory, connectors, workflows, analytics, research, legacy, and financial systems

Planned surfaces should not be created as empty placeholders. A new module needs a bounded responsibility, current consumer, public contract, dependency direction, owner, tests, synthetic evidence, and proportionate operational justification.

## Core rule

> The software is open. The person’s health data is private.

A provider, EHR, sponsor, enterprise contract, workflow engine, queue, cloud service, MCP client, death, incapacity, inactivity, or possible scientific value does not alter that rule.

No contributor workflow, public demo, test environment, or open-source agent may require production health data. Synthetic fixtures are the default development material.

## Contributing and security

Read [Contributing](CONTRIBUTING.md), [Governance](GOVERNANCE.md), and [Security](SECURITY.md) before opening an issue or pull request. Material changes to frozen components require an accepted decision record.
