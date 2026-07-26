# Calypso’s Promise

[Documentation](docs/README.md) · [Vision](VISION.md) · [Current status](docs/roadmap/current-status.md) · [Sprint 5 completion](docs/roadmap/sprint-5-completion-record.md) · [Funding baseline](docs/economics/README.md) · [Roadmap](ROADMAP.md) · [Governance](GOVERNANCE.md) · [Contributing](CONTRIBUTING.md)

**Build your Living Chronicle. Improve your health. Keep the key.**

Calypso’s Promise is an open-source, narrative-driven health platform that helps people build, understand, and control a longitudinal record of their lives. The playable world of Ogygia turns brief health actions, data capture, learning, and reflection into quests—while keeping private health data separate from the open-source codebase.

## Start here

- **Understand the Promise:** [Product Constitution](docs/frozen/product-constitution.md) → [Vision](VISION.md) → [Architecture Foundation](docs/frozen/architecture.md)
- **See what exists now:** [Current Project Status](docs/roadmap/current-status.md) → [Sprint Roadmap](docs/roadmap/sprints.md)
- **Review the permission baseline:** [Sprint 4 Completion Record](docs/roadmap/sprint-4-completion-record.md) → [House of Keys Architecture](docs/architecture/README.md#house-of-keys-architecture)
- **Review the security baseline:** [Sprint 5 Completion Record](docs/roadmap/sprint-5-completion-record.md) → [Security Architecture](docs/security/README.md) → [Security Policy](SECURITY.md)
- **Review the institutional funding boundary:** [Decision 0008](docs/decisions/0008-funding-and-sponsorship-baseline.md) → [Funding and Sponsorship Baseline](docs/economics/README.md)
- **Build safely:** [Contributing](CONTRIBUTING.md) → [Module Boundaries](docs/architecture/module-boundaries.md) → [Development Policy](docs/policies/development.md)
- **Explore the full repository:** [Documentation Home](docs/README.md)

## Project status

Calypso’s Promise remains in **institutional Phase 0 — Constitutional and open-source foundations** until an explicit phase-exit review is accepted.

Sprints 0–5 are complete and merged. Sprint 5 merged through PR #36 as squash commit `4d09e8fc5b81f354c4568f97794fd9533ec68048`.

The active bounded institutional workstream is **Phase 0 — Funding and Sponsorship Baseline**, tracked in issue #37. It establishes what support may be accepted, what benefits may be offered, what money can never purchase, how conflicts and concentration are governed, and how funded work and outcomes are reported before any donation or sponsor surface is activated.

- Sprint 0 established the frozen product, architecture, gameplay, lore, and repository-governance foundations.
- Sprint 1 established the runnable monorepo and open-source operating baseline.
- Sprint 2 established controlled vocabulary, the deterministic incentive contract, content schemas, canonical examples, content governance, and minimum viable validation.
- PR #10 added the frozen progressive-decentralization and founder-independence mandate, public institutional roadmap, decision classes, authority-transfer gates, and hundred-year objective.
- [Decision 0006](docs/decisions/0006-feedback-to-governed-work.md) establishes the feedback-to-governed-work loop.
- Sprint 3 established the pre-stable Living Chronicle ontology, TypeScript contracts, deterministic validators, public synthetic fixtures, compatibility requirements, and cross-contract evidence.
- [Decision 0007](docs/decisions/0007-institutional-immune-system.md) establishes assumptions, outcomes, challenge, containment, reversibility, appeal, restoration, and revalidation as cross-cutting architecture.
- Sprint 4 established the separate pre-stable House of Keys purpose, grant, revocation, explanation, comprehension, receipt, and deterministic policy-evaluation boundary.
- Sprint 5 established the security and privacy architecture, 46 threats, 46 open residual risks, 236 controls or control objectives, 15 public synthetic abuse cases, 15 founding-steward design tabletops, cross-contract reconciliation, and specialist holdpoints.
- [Decision 0008](docs/decisions/0008-funding-and-sponsorship-baseline.md) establishes the Phase 0 funding doctrine and public/private financial-information boundary.

Sprint 4 defines purpose-specific authority without introducing blanket consent or production health-data flows. Permission truth remains separate from Chronicle truth, and consent state does not belong in `packages/health-schema`.

Sprint 5 is a merged architecture, policy, procedure, public-synthetic-evidence, and founding-steward design-tabletop baseline. It does not authorize production accounts, providers, agents, connectors, encryption deployment, research, or real health-data processing.

The funding baseline is documentation, public register structure, synthetic examples, and design-tabletop evidence only. It does not accept funds, activate `.github/FUNDING.yml`, create a donation form, select an entity or payment rail, authorize affiliate revenue, establish compensation or treasury systems, or claim charitable, tax-deductible, accounting, or independent financial status.

After the bounded Phase 0 funding workstream is accepted and merged, Sprint 6 — Aster contracts and AI governance remains the next numbered design-to-build sprint. The broader program remains tracked in issue #2.

### Frozen foundations

- Product thesis and player promise
- First player: people—any human may begin, with adaptive paths rather than a narrow persona gate
- Ogygia world, central mythology, Seven Laws, zones, principal cast, Seven Tides, and Fourteen Lanterns
- Illustrated, map-based narrative play rather than a conventional 3D game
- Open code and synthetic fixtures; private production health data
- AI proposes, the player confirms, and deterministic domain services store
- Structured records remain authoritative
- MCP exposes selected domain capabilities to authorized agents; it is not the product’s database or core application protocol
- Personal value before secondary use, deterministic incentives, meaningful refusal, and non-punitive return
- Progressive decentralization toward a self-sustaining, founder-independent institution

### Current gates and unresolved work

- Complete and merge the Phase 0 Funding and Sponsorship Baseline while preserving unresolved entity, custody, accounting, tax, compensation, treasury, provider, and operational gates.
- Complete an explicit Phase 0 exit review against the [institutional roadmap](ROADMAP.md).
- Publish initial key-person dependency, succession, emergency-recovery, and founder-reserved-power records.
- Recover and catalogue the historical HealthDAO, CureDAO, and Calypso’s Promise governance notes.
- Verify administrative branch protections and replace transitional PR-level DCO certification before external contribution volume grows.
- Obtain named specialist review before canonical examples, security controls, clinical content, or sensitive public claims are represented as approved, independently reviewed, or deployed.
- Preserve Sprint 5 threat, encryption, untrusted-input, lifecycle-enforcement, receipt-integrity, residual-risk, and specialist-holdpoint boundaries before any production data path.
- Select clinical, regulatory, privacy, research-governance, infrastructure, vendor, legal, trademark, hosted-service, connector, entity, payment, custody, accounting, and tax details through their documented gates.
- Keep priority weights, typed-signal identity, weighted governance, treasury, compensation, ownership, affiliate, investment, token, blockchain, and on-chain mechanisms unresolved until evidence and accepted authority support a specific design.

## Long-horizon mandate

The consumer application is the beginning, not the final institutional form.

Calypso’s Promise is designed to earn trust through personal utility, help people build longitudinal health records under their control, enable separately authorized collective benefit, and progressively transfer stewardship as evidence and organizational capacity mature.

- Read the [Vision](VISION.md) for the institutional purpose and hundred-year objective.
- Read the [Public Institutional Roadmap](ROADMAP.md) for product, evidence, economics, governance, and founder-exit gates.
- Read the [Governance Baseline](GOVERNANCE.md) for current authority and progressive-decentralization rules.
- Read [Decision 0003](docs/decisions/0003-progressive-decentralization.md) for the accepted architectural decision.
- Read [Decision 0008](docs/decisions/0008-funding-and-sponsorship-baseline.md) for the accepted funding and sponsorship boundary.

Token, blockchain, NFT, and on-chain DAO mechanisms remain optional and deferred. Founder independence and accountable collective stewardship do not.

## Public feedback and governed work

GitHub issues are the current canonical ledger for public-safe product and contributor work. They connect problems and proposals to evidence, prioritization, decision, implementation, validation, release, measured outcome, correction, and institutional learning.

Public issues must never contain real health information, account-specific support, private correspondence, security reports, conduct evidence, financial source records, production data, or other protected material. Use synthetic or explicitly public examples.

Community reactions and comments are advisory during Phase 0. Decision 0006 defines the path toward typed signals, deterministic and explainable priority assessments, bounded delegated pilots, and later community control over eligible roadmap capacity without bypassing maintainers, specialists, safety controls, or constitutional rights.

Read the [Feedback-to-Governed-Work Architecture](docs/governance/feedback-to-governed-work.md) and [Manual Triage Protocol](docs/governance/feedback-triage-operating-protocol.md).

## Institutional immune system

Calypso’s Promise treats corrigibility as architecture. Material mechanisms—including funding, sponsorship, provider relationships, and public-good allocation—should expose assumptions, intended outcomes, guardrails, uncertainty, challenge, containment, rollback or replacement, restoration, and revalidation.

The immune-system metaphor applies to harmful conditions and mechanisms—not people or groups. A person who demonstrates that an accepted premise or favored mechanism is wrong is contributing to the project’s ability to survive its own mistakes.

- Read the [Institutional Immune System](docs/governance/institutional-immune-system.md).
- Read the [Assumption Registry](docs/governance/assumption-registry.md).
- Use the **System challenge or revalidation request** issue form for public-safe challenges.

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

Open `http://localhost:3000` to run the public repository gateway locally.

The current application remains bounded. It explains the project and links to the repository without providing accounts, private Chronicle storage, health-data intake, research enrollment, donations, sponsorship intake, or production House of Keys behavior. `pnpm check` includes formatting, documentation-link validation, repository policy, content validation, linting, type checking, and tests.

## Repository surfaces

### Implemented now

- [`apps/site`](apps/site) — bounded public repository gateway and purpose-limited signup adapter
- [`packages/domain`](packages/domain) — shared repository invariants and contracts
- [`packages/content-schema`](packages/content-schema) — content contracts, deterministic validators, graph contracts, and JSON Schema
- [`packages/health-schema`](packages/health-schema) — pre-stable Living Chronicle contracts, deterministic validators, and public synthetic fixtures
- [`packages/house-of-keys`](packages/house-of-keys) — pre-stable permission contracts, deterministic validation and policy evaluation, access receipts, and public synthetic fixtures
- [`content`](content) — versioned canon, quests, dialogue, education, and safety examples
- [`docs/security`](docs/security/README.md) — merged Sprint 5 security architecture, controls, risks, procedures, synthetic tabletops, reconciliation, and holdpoints
- [`docs/economics`](docs/economics/README.md) — Phase 0 funding and sponsorship doctrine, public register structures, synthetic records, and design table exercises
- [`docs`](docs/README.md) — frozen foundations, architecture, decisions, governance, economics, website briefs, policies, and sprint records
- [`tools`](tools) — repository policy and documentation validation

### Planned and gated

- `apps/game` — planned universal Expo game for web, iOS, and Android
- `apps/api` — planned modular TypeScript domain application
- `apps/mcp-chronicle` — planned private, policy-controlled agent tools
- `apps/mcp-forge` — planned contributor and documentation tools using synthetic data
- production House of Keys orchestration, identity, persistence, enforcement, receipts, and provider adapters
- operating funding, payment, accounting, treasury, compensation, affiliate, investment, and research-funding systems
- additional applications, services, packages, infrastructure, and production data paths described by the frozen architecture

Planned surfaces should not be created as empty placeholders. A new module must have a bounded responsibility, current consumer, public contract, dependency direction, owner, tests or evidence, and synthetic validation. See [Repository and Module Boundaries](docs/architecture/module-boundaries.md).

## Core rule

> The software is open. The person’s health data is private.

No contributor workflow, public demo, test environment, open-source agent, sponsor record, or funding opportunity may require production health data. Synthetic fixtures are the default development material.

## Contributing and security

Read [Contributing](CONTRIBUTING.md), [Governance](GOVERNANCE.md), [Security](SECURITY.md), and the [Funding Baseline](docs/economics/README.md) before opening material work. Material changes to frozen components, security boundaries, governance, or economics require accepted authority and an appropriate decision record.
