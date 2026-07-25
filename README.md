# Calypso’s Promise

[Documentation](docs/README.md) · [Vision](VISION.md) · [Current status](docs/roadmap/current-status.md) · [Roadmap](ROADMAP.md) · [Governance](GOVERNANCE.md) · [Contributing](CONTRIBUTING.md)

**Build your Living Chronicle. Improve your health. Keep the key.**

Calypso’s Promise is an open-source, narrative-driven health platform that helps people build, understand, and control a longitudinal record of their lives. The playable world of Ogygia turns brief health actions, data capture, learning, and reflection into quests—while keeping private health data separate from the open-source codebase.

## Start here

- **Understand the Promise:** [Product Constitution](docs/frozen/product-constitution.md) → [Vision](VISION.md) → [Architecture Foundation](docs/frozen/architecture.md)
- **See what exists now:** [Current Project Status](docs/roadmap/current-status.md) → [Sprint Roadmap](docs/roadmap/sprints.md)
- **Build safely:** [Contributing](CONTRIBUTING.md) → [Module Boundaries](docs/architecture/module-boundaries.md) → [Development Policy](docs/policies/development.md)
- **Explore the full repository:** [Documentation Home](docs/README.md)

## Project status

Calypso’s Promise remains in **institutional Phase 0 — Constitutional and open-source foundations** until an explicit phase-exit review is accepted.

Sprints 0–3 are complete and merged. **Sprint 4 — House of Keys consent architecture is now in progress.**

- Sprint 0 established the frozen product, architecture, gameplay, lore, and repository-governance foundations.
- Sprint 1 established the runnable monorepo and open-source operating baseline.
- Sprint 2 established controlled vocabulary, the deterministic incentive contract, content schemas, canonical examples, content governance, and minimum viable validation.
- PR #10 added the frozen progressive-decentralization and founder-independence mandate, public institutional roadmap, decision classes, authority-transfer gates, and hundred-year objective.
- [Decision 0006](docs/decisions/0006-feedback-to-governed-work.md) establishes a feedback-to-governed-work baseline connecting public issues, evidence, deterministic prioritization, contribution, implementation, validation, outcomes, and phase-gated community authority.
- Sprint 3 merged through PR #14 as squash commit `19c1045a24679246dae209e13c62038362c69cc1`, establishing the pre-stable `0.1.0` Living Chronicle ontology, TypeScript contracts, deterministic validators, public synthetic fixtures, compatibility requirements, and cross-contract completion evidence.
- [Decision 0007](docs/decisions/0007-institutional-immune-system.md) establishes the Institutional Immune System as the cross-cutting architecture for assumptions, outcomes, challenge, containment, reversibility, appeal, restoration, revalidation, and protection against institutional capture.
- Sprint 4 is tracked in issue #32 and draft PR #33. Its [execution plan](docs/roadmap/sprint-4-plan.md) preserves the accepted goal, deliverables, and acceptance criteria while beginning with the [House of Keys authority boundary](docs/architecture/house-of-keys-ontology.md).

Sprint 4 defines purpose-specific authority, grants, revocation, access receipts, comprehension, and policy evaluation without introducing blanket consent or production health-data flows. Permission truth remains separate from Chronicle truth, and consent state does not belong in `packages/health-schema`.

Read the [integrated current status](docs/roadmap/current-status.md), [Sprint 4 plan](docs/roadmap/sprint-4-plan.md), and [Sprint 3 completion record](docs/roadmap/sprint-3-completion-record.md) for evidence, boundaries, and deferred work. The broader sprint program remains tracked in issue #2.

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

- Complete an explicit Phase 0 exit review against [the institutional roadmap](ROADMAP.md).
- Publish the initial key-person dependency, succession, and founder-reserved-power records required by Decision 0003.
- Recover and catalogue the historical HealthDAO, CureDAO, and Calypso’s Promise governance notes.
- Verify administrative branch protections and replace transitional PR-level DCO certification before external contribution volume grows.
- Obtain named specialist review before canonical examples or sensitive content are represented as approved or published.
- Complete House of Keys architecture, then the threat-model, security, and untrusted-input boundaries before production data paths.
- Select clinical, regulatory, privacy, research-governance, infrastructure, vendor, legal, trademark, hosted-service, and connector details through their documented gates.
- Keep priority weights, typed-signal identity, weighted governance, treasury, ownership, token, blockchain, and on-chain mechanisms unresolved until evidence supports a specific design.

## Long-horizon mandate

The consumer application is the beginning, not the final institutional form.

Calypso’s Promise is designed to earn trust through personal utility, help people build longitudinal health records under their control, enable separately authorized collective benefit, and progressively transfer stewardship as evidence and organizational capacity mature.

- Read the [Vision](VISION.md) for the institutional purpose and hundred-year objective.
- Read the [Public Institutional Roadmap](ROADMAP.md) for product, evidence, economics, governance, and founder-exit gates.
- Read the [Governance Baseline](GOVERNANCE.md) for current authority and progressive-decentralization rules.
- Read [Decision 0003](docs/decisions/0003-progressive-decentralization.md) for the accepted architectural decision.

Token, blockchain, NFT, and on-chain DAO mechanisms remain optional and deferred. Founder independence and accountable collective stewardship do not.

## Public feedback and governed work

GitHub issues are the current canonical ledger for public-safe product and contributor work. They should connect a problem or proposal to evidence, prioritization, decision, implementation, validation, release, measured outcome, correction, and institutional learning.

Public issues must never contain real health information, account-specific support, private correspondence, security reports, conduct evidence, production data, or other protected source material. Use synthetic or explicitly public examples.

Community reactions and comments are advisory during Phase 0. Decision 0006 defines the path toward typed signals, deterministic and explainable priority assessments, bounded delegated pilots, and later community control over eligible roadmap capacity without bypassing maintainers, specialists, safety controls, or constitutional rights.

Read the [Feedback-to-Governed-Work Architecture](docs/governance/feedback-to-governed-work.md) and [Manual Triage Protocol](docs/governance/feedback-triage-operating-protocol.md).

## Institutional immune system

Calypso’s Promise treats corrigibility as architecture. Material mechanisms should expose their assumptions, intended outcomes, guardrails, uncertainty, challenge path, rollback or containment behavior, appeal, restoration, and revalidation timing in proportion to their consequence.

The immune-system metaphor applies to harmful conditions and mechanisms—not people or groups. A person who demonstrates that an accepted premise or favored mechanism is wrong is contributing to the project’s ability to survive its own mistakes.

- Read the [Institutional Immune System](docs/governance/institutional-immune-system.md) for the canonical architecture.
- Read the [Assumption Registry](docs/governance/assumption-registry.md) for the seeded causal, product, incentive, governance, architecture, and corrigibility hypotheses.
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

The current application remains bounded. It explains the project and links to the repository without providing accounts, private Chronicle storage, health-data intake, research enrollment, or production House of Keys behavior. `pnpm check` includes formatting, documentation-link validation, repository policy, content validation, linting, type checking, and tests.

## Repository surfaces

### Implemented now

- [`apps/site`](apps/site) — bounded public repository gateway and purpose-limited signup adapter
- [`packages/domain`](packages/domain) — shared repository invariants and contracts
- [`packages/content-schema`](packages/content-schema) — content contracts, deterministic validators, graph contracts, and JSON Schema
- [`packages/health-schema`](packages/health-schema) — pre-stable Living Chronicle contracts, deterministic validators, and public synthetic fixtures
- [`content`](content) — versioned canon, quests, dialogue, education, and safety examples
- [`docs`](docs/README.md) — frozen foundations, architecture, decisions, governance, website briefs, policies, and sprint records
- [`tools`](tools) — repository policy and documentation validation

### Planned and gated

- `packages/consent` — active Sprint 4 target; create only when its bounded contract and tests are introduced
- `apps/game` — planned universal Expo game for web, iOS, and Android
- `apps/api` — planned modular TypeScript domain application
- `apps/mcp-chronicle` — planned private, policy-controlled agent tools
- `apps/mcp-forge` — planned contributor and documentation tools using synthetic data
- additional applications, services, packages, infrastructure, and production data paths described by the frozen architecture

Planned surfaces should not be created as empty placeholders. A new module must have a bounded responsibility, current consumer, public contract, dependency direction, owner, tests, and synthetic evidence. See [Repository and Module Boundaries](docs/architecture/module-boundaries.md).

## Core rule

> The software is open. The person’s health data is private.

No contributor workflow, public demo, test environment, or open-source agent may require production health data. Synthetic fixtures are the default development material.

## Contributing and security

Read [Contributing](CONTRIBUTING.md), [Governance](GOVERNANCE.md), and [Security](SECURITY.md) before opening an issue or pull request. Material changes to frozen components require an accepted decision record.
