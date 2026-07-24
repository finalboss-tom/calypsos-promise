# Calypso’s Promise

**Build your Living Chronicle. Improve your health. Keep the key.**

Calypso’s Promise is an open-source, narrative-driven health platform that helps people build, understand, and control a longitudinal record of their lives. The playable world of Ogygia turns brief health actions, data capture, learning, and reflection into quests—while keeping private health data separate from the open-source codebase.

## Project status

Calypso’s Promise remains in **institutional Phase 0 — Constitutional and open-source foundations** until an explicit phase-exit review is accepted. The first three design-to-build sprints are complete and merged:

- Sprint 0 established the frozen product, architecture, gameplay, lore, and repository-governance foundations.
- Sprint 1 established the runnable monorepo and open-source operating baseline.
- Sprint 2 established controlled vocabulary, the deterministic incentive contract, content schemas, canonical examples, content governance, and minimum viable validation.
- PR #10 added the frozen progressive-decentralization and founder-independence mandate, public institutional roadmap, decision classes, authority-transfer gates, and hundred-year objective.
- Decision 0006 establishes a feedback-to-governed-work baseline connecting public issues, evidence, deterministic prioritization, contribution, implementation, validation, outcomes, and phase-gated community authority.
- Decision 0007 establishes the Institutional Immune System as the cross-cutting architecture for assumptions, outcomes, challenge, containment, reversibility, appeal, restoration, revalidation, and protection against institutional capture.

The next planned design-to-build target is **Sprint 3 — Canonical data model v1**. It should begin with ontology, schema, provenance, correction, conflict, export, and deletion contracts. Production migrations, real health-data flows, providers, and runtime services remain outside the current baseline until their own gates are accepted.

Read `docs/roadmap/current-status.md` for the integrated phase assessment, completed baselines, open gates, and Sprint 3 entry boundary.

**Frozen foundations**

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

**Current gates and unresolved work**

- Complete an explicit Phase 0 exit review against `ROADMAP.md`.
- Publish the initial key-person dependency, succession, and founder-reserved-power records required by Decision 0003.
- Recover and catalogue the historical HealthDAO, CureDAO, and Calypso’s Promise governance notes.
- Verify administrative branch protections and replace transitional PR-level DCO certification before external contribution volume grows.
- Obtain named specialist review before canonical examples or sensitive content are represented as approved or published.
- Define and validate the Sprint 3 Living Chronicle model before introducing database migrations or production data paths.
- Select clinical, regulatory, privacy, research-governance, infrastructure, vendor, legal, trademark, hosted-service, and connector details through their documented gates.
- Keep priority weights, typed-signal identity, weighted governance, treasury, ownership, token, blockchain, and on-chain mechanisms unresolved until evidence supports a specific design.

## Long-horizon mandate

The consumer application is the beginning, not the final institutional form.

Calypso’s Promise is designed to earn trust through personal utility, help people build longitudinal health records under their control, enable separately authorized collective benefit, and progressively transfer stewardship as evidence and organizational capacity mature.

- Read `VISION.md` for the institutional purpose and hundred-year objective.
- Read `ROADMAP.md` for product, evidence, economics, governance, and founder-exit gates.
- Read `GOVERNANCE.md` for current authority and progressive-decentralization rules.
- Read `docs/decisions/0003-progressive-decentralization.md` for the accepted architectural decision.

Token, blockchain, NFT, and on-chain DAO mechanisms remain optional and deferred. Founder independence and accountable collective stewardship do not.

## Public feedback and governed work

GitHub issues are the current canonical ledger for public-safe product and contributor work. They should connect a problem or proposal to evidence, prioritization, decision, implementation, validation, release, measured outcome, correction, and institutional learning.

Public issues must never contain real health information, account-specific support, private correspondence, security reports, conduct evidence, production data, or other protected source material. Use synthetic or explicitly public examples.

Community reactions and comments are advisory during Phase 0. Decision 0006 defines the path toward typed signals, deterministic and explainable priority assessments, bounded delegated pilots, and later community control over eligible roadmap capacity without bypassing maintainers, specialists, safety controls, or constitutional rights.

Read `docs/governance/feedback-to-governed-work.md` for the complete architecture.

## Institutional immune system

Calypso’s Promise treats corrigibility as architecture. Material mechanisms should expose their assumptions, intended outcomes, guardrails, uncertainty, challenge path, rollback or containment behavior, appeal, restoration, and revalidation timing in proportion to their consequence.

The immune-system metaphor applies to harmful conditions and mechanisms—not people or groups. A person who demonstrates that an accepted premise or favored mechanism is wrong is contributing to the project’s ability to survive its own mistakes.

- Read `docs/governance/institutional-immune-system.md` for the canonical architecture.
- Read `docs/governance/assumption-registry.md` for the seeded causal, product, incentive, governance, architecture, and corrigibility hypotheses.
- Use the **System challenge or revalidation request** issue form to challenge a public assumption, metric, incentive, policy, architecture, decision, or institutional mechanism using public-safe evidence.
- Read `docs/decisions/0007-institutional-immune-system.md` for the accepted baseline decision.

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

Open `http://localhost:3000` to confirm the Sprint 1 site workspace is running.

The current application is intentionally minimal. It proves the repository can be installed, validated, and run without credentials, production services, or real health data.

## Repository surfaces

- `apps/site` — public website and playable prologue
- `apps/game` — planned universal Expo game for web, iOS, and Android
- `apps/api` — planned modular TypeScript domain application
- `apps/mcp-chronicle` — planned private, policy-controlled agent tools
- `apps/mcp-forge` — planned contributor and documentation tools using synthetic data
- `packages/domain` — shared domain invariants and contracts
- `content` — versioned canon, quests, dialogue, education, and safety content
- `docs` — frozen foundations, architecture decisions, governance, website briefs, and sprint plans

## Core rule

> The software is open. The person’s health data is private.

No contributor workflow, public demo, test environment, or open-source agent may require production health data. Synthetic fixtures are the default development material.

## Contributing and security

Read `CONTRIBUTING.md`, `GOVERNANCE.md`, and `SECURITY.md` before opening an issue or pull request. Material changes to frozen components require an accepted decision record.
