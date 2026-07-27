# Calypso’s Promise

[Documentation](docs/README.md) · [Vision](VISION.md) · [Current status](docs/roadmap/current-status.md) · [Operational simplicity](docs/decisions/0011-operational-simplicity-and-durable-workflows.md) · [Consumer-first boundary](docs/decisions/0010-consumer-first-provider-independent-boundary.md) · [Funding baseline](docs/economics/README.md) · [Legacy stewardship proposal](docs/decisions/0009-health-data-legacy-and-post-mortem-stewardship.md) · [Sprint 5 completion](docs/roadmap/sprint-5-completion-record.md) · [Roadmap](ROADMAP.md) · [Governance](GOVERNANCE.md) · [Contributing](CONTRIBUTING.md)

**Build your Living Chronicle. Improve your health. Keep the key.**

Calypso’s Promise is an open-source, narrative-driven health platform that helps people build, understand, and control a longitudinal record of their lives. The playable world of Ogygia turns brief health actions, data capture, learning, and reflection into quests—while keeping private health data separate from the open-source codebase.

## Start here

- **Understand the Promise:** [Product Constitution](docs/frozen/product-constitution.md) → [Vision](VISION.md) → [Architecture Foundation](docs/frozen/architecture.md)
- **See what exists now:** [Current Project Status](docs/roadmap/current-status.md) → [Sprint Roadmap](docs/roadmap/sprints.md)
- **Review the operational-simplicity proposal:** [Decision 0011](docs/decisions/0011-operational-simplicity-and-durable-workflows.md) → [Operational Architecture](docs/architecture/operational-simplicity-and-durable-workflows.md) → [Mission Traceability](docs/architecture/mission-to-runtime-traceability.md) → [Cross-Phase Workstream](docs/roadmap/operational-simplicity-workstream.md)
- **Review the consumer-first boundary:** [Decision 0010](docs/decisions/0010-consumer-first-provider-independent-boundary.md) → [Architecture Rationale](docs/architecture/consumer-first-provider-independent-boundary.md) → [Repository Reconciliation](docs/roadmap/consumer-first-provider-independent-reconciliation.md) → [Cross-Phase Workstream](docs/roadmap/consumer-first-provider-independent-workstream.md)
- **Review the completed permission baseline:** [Sprint 4 Completion Record](docs/roadmap/sprint-4-completion-record.md) → [House of Keys Architecture](docs/architecture/README.md#house-of-keys-architecture)
- **Review the merged security baseline:** [Sprint 5 Completion Record](docs/roadmap/sprint-5-completion-record.md) → [Security Architecture](docs/security/README.md) → [Security Policy](SECURITY.md)
- **Review the funding boundary:** [Decision 0008](docs/decisions/0008-funding-and-sponsorship-baseline.md) → [Economics and Public-Good Funding](docs/economics/README.md) → [Funding Completion Record](docs/economics/phase-0-funding-completion-record.md)
- **Review the proposed legacy boundary:** [Decision 0009](docs/decisions/0009-health-data-legacy-and-post-mortem-stewardship.md) → [Legacy and Succession Architecture](docs/architecture/health-data-legacy-and-succession.md) → [Future Workstream](docs/roadmap/health-data-legacy-workstream.md)
- **Build safely:** [Contributing](CONTRIBUTING.md) → [Module Boundaries](docs/architecture/module-boundaries.md) → [Development Policy](docs/policies/development.md) → [Developer Operability](docs/policies/developer-experience-and-operability.md)
- **Explore the full repository:** [Documentation Home](docs/README.md)

## Project status

Calypso’s Promise remains in **institutional Phase 0 — Constitutional and open-source foundations** until an explicit phase-exit review is accepted.

Sprints 0–5 and the Phase 0 Funding and Sponsorship Baseline are complete and merged. **Sprint 6 — Aster contracts and AI governance is the next numbered sprint.** Decisions 0009, 0010, and 0011 are proposed institutional constraints under review. None activates a production runtime or changes Sprint 6 order.

- Sprint 0 established the frozen product, architecture, gameplay, lore, and repository-governance foundations.
- Sprint 1 established the runnable monorepo and open-source operating baseline.
- Sprint 2 established controlled vocabulary, the deterministic incentive contract, content schemas, canonical examples, content governance, and minimum viable validation.
- PR #10 added the frozen progressive-decentralization and founder-independence mandate, public institutional roadmap, decision classes, authority-transfer gates, and hundred-year objective.
- [Decision 0006](docs/decisions/0006-feedback-to-governed-work.md) establishes a feedback-to-governed-work baseline connecting public issues, evidence, deterministic prioritization, contribution, implementation, validation, outcomes, and phase-gated community authority.
- Sprint 3 merged through PR #14 as squash commit `19c1045a24679246dae209e13c62038362c69cc1`, establishing the pre-stable `0.1.0` Living Chronicle ontology, TypeScript contracts, deterministic validators, public synthetic fixtures, compatibility requirements, and cross-contract completion evidence.
- [Decision 0007](docs/decisions/0007-institutional-immune-system.md) establishes the Institutional Immune System as the cross-cutting architecture for assumptions, outcomes, challenge, containment, reversibility, appeal, restoration, revalidation, and protection against institutional capture.
- Sprint 4 merged through PR #33 as squash commit `51e94a19cc21a0da0c57f1ae3b09f57092aee8d1`, establishing the pre-stable House of Keys purpose, grant, revocation, explanation, comprehension, receipt, and deterministic policy-evaluation boundary.
- The pre-Sprint 5 reconciliation merged through PR #34 as squash commit `d135b2fdf79a3c2cca9bf7cad275fc454d22fa6d`, confirming mission and incentive alignment and defining the security handoff without changing Sprint 5 scope.
- Sprint 5 merged through PR #36 as squash commit `4d09e8fc5b81f354c4568f97794fd9533ec68048`, establishing the threat, security, privacy, isolation, encryption, recovery, incident, audit, residual-risk, tabletop, and specialist-holdpoint baseline.
- [Decision 0008](docs/decisions/0008-funding-and-sponsorship-baseline.md) and `docs/economics` merged through PR #38 as squash commit `32ac27bfb35ed64f34c64108a5d54c375d429593`, establishing the Phase 0 funding and sponsorship doctrine, public register contracts, fictional relationship and opportunity records, validation, conflict and concentration controls, public-good underwriting, infrastructure exit requirements, and future operational gates.
- Proposed [Decision 0009](docs/decisions/0009-health-data-legacy-and-post-mortem-stewardship.md) and its architecture make a person’s revocable Legacy Directive, incapacity and post-mortem stewardship, contested authority, family and third-party privacy, research, archive, deletion, and institutional succession explicit future design work rather than an account-recovery shortcut.
- Proposed [Decision 0010](docs/decisions/0010-consumer-first-provider-independent-boundary.md) and its architecture make the person the provider-independent continuity layer while treating clinics, EHRs, payers, laboratories, devices, exchanges, and other institutions as important sources, destinations, and future partners connected through versioned adapters rather than automatic owners of Chronicle meaning or product authority.
- Proposed [Decision 0011](docs/decisions/0011-operational-simplicity-and-durable-workflows.md) and its architecture make the modular monolith, small responsive path, durable deferred work, local simulation, provider-independent adapters, and evidence-gated decomposition explicit future implementation constraints rather than informal developer preferences.

The merged House of Keys and security work remain design and synthetic-evidence baselines rather than production permission or security systems. Decision 0008 is likewise doctrine and repository-contract evidence rather than authority to accept or operate money. Proposed Decisions 0009, 0010, and 0011 do not establish legal sufficiency, a production succession system, a provider connector, clinical use, an enterprise product, a workflow runtime, measured performance, or validated product evidence.

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

- Begin Sprint 6 through its own issue, execution plan, branch, draft pull request, evidence, and explicit founding-steward acceptance while inheriting the merged Sprint 5 and Decision 0008 boundaries and any accepted Decision 0010 and Decision 0011 constraints.
- Review, revise, accept, or decline proposed Decision 0011, its architecture, mission traceability, developer-operability policy, AS-0013, reconciliation, and cross-phase workstream without representing a queue, scheduler, event store, service topology, local-first system, or measured performance as live.
- Review, revise, accept, or decline proposed Decision 0010, its architecture, AS-0012, cross-phase workstream, and public explanation without representing a provider, EHR, connector, clinical, or enterprise capability as live.
- Review, revise, accept, or decline proposed Decision 0009 and its companion architecture, workstream, and assumption record without representing them as a live legal or product capability.
- Complete an explicit Phase 0 exit review against [the institutional roadmap](ROADMAP.md).
- Publish the initial key-person dependency, succession, founder-reserved-power, and founder-subsidy/economic-dependency records required by the institutional decisions and roadmap.
- Recover and catalogue the historical HealthDAO, CureDAO, and Calypso’s Promise governance notes.
- Verify administrative branch protections and replace transitional PR-level DCO certification before external contribution volume grows.
- Obtain named specialist review before canonical examples or sensitive content are represented as approved or published.
- Preserve the completed Sprint 5 threat, encryption, untrusted-input, lifecycle-enforcement, receipt-integrity, residual-risk, and specialist-holdpoint boundaries before any production data path.
- Select clinical, interoperability, regulatory, privacy, research-governance, infrastructure, workflow, queue, scheduler, event, observability, vendor, provider, EHR, connector, legal, trademark, hosted-service, entity, custody, accounting, tax, payment, estate, fiduciary, succession, archive, and financial-control details through their documented gates.
- Keep priority weights, typed-signal identity, weighted governance, treasury, ownership, token, blockchain, on-chain mechanisms, provider placement, connector ranking, affiliate referrals, enterprise economics, service topology, event sourcing, and local-first synchronization unresolved until evidence supports a specific design.

## Long-horizon mandate

The consumer application is the beginning, not the final institutional form.

Calypso’s Promise is designed to earn trust through personal utility, help people build longitudinal health records under their control, operate through understandable and replaceable workflows, interoperate with institutional healthcare through inspectable boundaries, enable separately authorized collective benefit, preserve person-directed legacy choices, and progressively transfer stewardship as evidence and organizational capacity mature.

- Read the [Vision](VISION.md) for the institutional purpose and hundred-year objective.
- Read the [Public Institutional Roadmap](ROADMAP.md) for product, evidence, economics, governance, and founder-exit gates.
- Read the [Governance Baseline](GOVERNANCE.md) for current authority and progressive-decentralization rules.
- Read [Decision 0003](docs/decisions/0003-progressive-decentralization.md) for the accepted architectural decision.
- Read proposed [Decision 0011](docs/decisions/0011-operational-simplicity-and-durable-workflows.md) for the boundary between necessary complexity and operational architecture that remains understandable, testable, replaceable, and corrigible.
- Read proposed [Decision 0010](docs/decisions/0010-consumer-first-provider-independent-boundary.md) for the boundary between institutional interoperability and canonical product authority.
- Read proposed [Decision 0009](docs/decisions/0009-health-data-legacy-and-post-mortem-stewardship.md) for the distinction between preserving a Chronicle’s possible value and granting post-mortem access.

Token, blockchain, NFT, and on-chain DAO mechanisms remain optional and deferred. Founder independence, provider replaceability, operational continuity, and accountable collective stewardship do not.

## Public feedback and governed work

GitHub issues are the current canonical ledger for public-safe product and contributor work. They should connect a problem or proposal to evidence, prioritization, decision, implementation, validation, release, measured outcome, correction, and institutional learning.

Public issues must never contain real health information, account-specific support, private correspondence, security reports, conduct evidence, production data, protected provider or interoperability records, private contracts or negotiations, workflow credentials or operational secrets, protected estate or fiduciary records, protected financial source records, or other protected material. Use synthetic or explicitly public examples.

Community reactions and comments are advisory during Phase 0. Decision 0006 defines the path toward typed signals, deterministic and explainable priority assessments, bounded delegated pilots, and later community control over eligible roadmap capacity without bypassing maintainers, specialists, safety controls, or constitutional rights.

Read the [Feedback-to-Governed-Work Architecture](docs/governance/feedback-to-governed-work.md) and [Manual Triage Protocol](docs/governance/feedback-triage-operating-protocol.md).

## Institutional immune system

Calypso’s Promise treats corrigibility as architecture. Material mechanisms should expose their assumptions, intended outcomes, guardrails, uncertainty, challenge path, rollback or containment behavior, appeal, restoration, and revalidation timing in proportion to their consequence.

The immune-system metaphor applies to harmful conditions and mechanisms—not people or groups. A person who demonstrates that an accepted premise or favored mechanism is wrong is contributing to the project’s ability to survive its own mistakes.

- Read the [Institutional Immune System](docs/governance/institutional-immune-system.md) for the canonical architecture.
- Read the [Assumption Registry](docs/governance/assumption-registry.md) for the seeded causal, product, incentive, governance, architecture, funding, and corrigibility hypotheses.
- Review proposed [AS-0013](docs/governance/assumption-AS-0013-operational-simplicity-durable-value.md), which treats a modular, batch-oriented, locally simulatable core as a falsifiable implementation hypothesis rather than an identity claim or ban on justified services.
- Review proposed [AS-0012](docs/governance/assumption-AS-0012-consumer-first-continuity-value.md), which treats consumer-first market and product sequencing as a falsifiable hypothesis rather than an ideology or permanent ban on institutional collaboration.
- Review proposed [AS-0011](docs/governance/assumption-AS-0011-health-data-legacy-value.md), which treats post-mortem Chronicle value as a falsifiable hypothesis rather than a license for default retention or disclosure.
- Use the **System challenge or revalidation request** issue form to challenge a public assumption, metric, incentive, policy, architecture, decision, or institutional mechanism using public-safe evidence.

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

The current application remains bounded. It explains the project and links to the repository without providing accounts, private Chronicle storage, health-data intake, research enrollment, production House of Keys behavior, provider or EHR connections, clinical workflows, enterprise services, workflow orchestration, Legacy Directives, estate or successor access, donation checkout, sponsor intake, or financial operations. `pnpm check` includes formatting, documentation-link validation, repository policy, funding-register validation, content validation, linting, type checking, and tests.

## Repository surfaces

### Implemented now

- [`apps/site`](apps/site) — bounded public repository gateway and purpose-limited signup adapter
- [`packages/domain`](packages/domain) — shared repository invariants and contracts
- [`packages/content-schema`](packages/content-schema) — content contracts, deterministic validators, graph contracts, and JSON Schema
- [`packages/health-schema`](packages/health-schema) — pre-stable Living Chronicle contracts, deterministic validators, and public synthetic fixtures
- [`packages/house-of-keys`](packages/house-of-keys) — pre-stable permission contracts, deterministic validation and policy evaluation, access receipts, and public synthetic fixtures
- [`content`](content) — versioned canon, quests, dialogue, education, and safety examples
- [`docs/security`](docs/security/README.md) — merged Sprint 5 security architecture, control-status vocabulary, residual-risk registers, procedures, synthetic tabletops, reconciliation, and holdpoints
- [`docs/economics`](docs/economics/README.md) — merged Phase 0 funding and sponsorship doctrine, public register contracts, fictional examples, validation, and design tabletops; no operating finance, provider, connector, or enterprise relationship
- [`docs`](docs/README.md) — frozen foundations, architecture, decisions, governance, website briefs, policies, and sprint records
- [`tools`](tools) — repository policy, documentation, funding-register, and content validation

### Planned and gated

- `apps/game` — planned universal Expo game for web, iOS, and Android
- `apps/api` — planned modular TypeScript domain application
- `apps/mcp-chronicle` — planned private, policy-controlled agent tools
- `apps/mcp-forge` — planned contributor and documentation tools using synthetic data
- production House of Keys orchestration, identity, persistence, enforcement, receipts, and provider adapters
- production command, event, job, projection, queue, scheduler, replay, observability, and workflow behavior
- standards registries, versioned mappings, provider, EHR, payer, laboratory, pharmacy, device, exchange, clinical, and enterprise connector systems
- Legacy Directive, incapacity, death, estate, fiduciary, successor, family-health derivative, research, archive, protected custody, and post-mortem deletion systems
- funding receipt, payment, banking, accounting, expenditure, treasury, compensation, contracting, procurement, and financial-reporting operations
- additional applications, services, packages, infrastructure, and production data paths described by the frozen architecture

Planned surfaces should not be created as empty placeholders. A new module must have a bounded responsibility, current consumer, public contract, dependency direction, owner, tests, synthetic evidence, and proportionate operational justification. See [Repository and Module Boundaries](docs/architecture/module-boundaries.md).

## Core rule

> The software is open. The person’s health data is private.

A provider, EHR, sponsor, enterprise contract, workflow engine, queue, cloud service, death, incapacity, account inactivity, institutional transition, or potential scientific value does not alter that rule.

No contributor workflow, public demo, test environment, or open-source agent may require production health data. Synthetic fixtures are the default development material.

## Contributing and security

Read [Contributing](CONTRIBUTING.md), [Governance](GOVERNANCE.md), and [Security](SECURITY.md) before opening an issue or pull request. Material changes to frozen components require an accepted decision record.
