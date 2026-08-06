# Calypso’s Promise

[Documentation](docs/README.md) · [Vision](VISION.md) · [Current status](docs/roadmap/current-status.md) · [Post-Sprint 10 reconciliation](docs/roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md) · [Sprint 10 completion](docs/roadmap/sprint-10-completion-record.md) · [Architecture](docs/architecture/README.md) · [Roadmap](ROADMAP.md) · [Governance](GOVERNANCE.md) · [Contributing](CONTRIBUTING.md)

> **Build your Living Chronicle. Improve your health. Keep the key.**

Calypso’s Promise is an open-source, narrative-driven health platform intended to help people build, understand, improve, and control a longitudinal account of their health and lived experience. Ogygia turns brief capture, learning, reflection, sovereignty, and constructive action into play while keeping private health data separate from the public codebase.

## Start here

- **Understand the Promise:** [Product Constitution](docs/frozen/product-constitution.md) → [Vision](VISION.md) → [Gameplay Foundation](docs/product/gameplay-foundation.md)
- **See current truth:** [Current Project Status](docs/roadmap/current-status.md) → [Post-Sprint 10 Reconciliation](docs/roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md) → [Sprint Roadmap](docs/roadmap/sprints.md)
- **Inspect Sprint 10 evidence:** [Completion Record](docs/roadmap/sprint-10-completion-record.md) → [Cross-Contract Reconciliation](docs/architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md) → [Open Holdpoints](docs/architecture/universal-game-shell-sprint-10-specialist-holdpoint-and-unresolved-work-register.md)
- **Inspect application boundaries:** [`apps/site`](apps/site) retains the institutional site and production `/prologue`; accepted [`apps/game`](apps/game) owns the unhosted browser, iOS, and Android universal shell
- **Build safely:** [Contributing](CONTRIBUTING.md) → [Module Boundaries](docs/architecture/module-boundaries.md) → [Development Policy](docs/policies/development.md) → [Security](SECURITY.md)

## Project status

Calypso’s Promise remains in **institutional Phase 0 — Constitutional and open-source foundations** until an explicit phase-exit review is accepted.

**Sprints 0–10 are accepted and merged.** Sprint 10 was squash merged through PR #79 as `28bb5a7ae268d28a67d737777cafdd760c796cd1` after final aligned head `edd954d0e5ce61f53918a74ec804964ad987830f` passed CI 1519 and DCO 1624.

The canonical domains serve production deployment `dpl_CynKp4xKd3KK5BcMuRjmiZv96Aj6`. Git-triggered Vercel deployment remains disabled for every branch, so repository commits and production releases remain separate attributable actions.

The Sprint 10 implementation package is accepted and merged through [PR #79](https://github.com/finalboss-tom/calypsos-promise/pull/79) as `28bb5a7ae268d28a67d737777cafdd760c796cd1`. [Issue #80](https://github.com/finalboss-tom/calypsos-promise/issues/80) is closed as completed. Post-merge reconciliation PR #82 was squash merged as `0119e22e7ba21ec409e5521df44e38a16224d3b4` from validated head `0dc72c6ee35e6209cd06c9a3786cf3a0f1592788` — CI 1522 / DCO 1627. The shell remains unhosted, unsigned, undistributed, and blocked from Sprint 11 until a dedicated pre-Sprint 11 alignment is accepted.

Current governed work is:

- post-Sprint 10 reconciliation and dedicated pre-Sprint 11 alignment preparation;
- the separate Phase 0 newsletter gate [#63](https://github.com/finalboss-tom/calypsos-promise/issues/63); and
- the remaining specialist, succession, ownership, architecture-audit, and Phase 0 exit gates.

Sprint 11 remains unstarted.

## Live public site

[`apps/site`](apps/site) owns the live Next.js public website. It provides:

- the cinematic public gateway and source-backed Promise;
- Seven Laws, How It Works, Consumer First, Aster, Trust Center, Open Forge, roadmap, support, funding, and privacy views;
- a bounded Founding Expedition newsletter opt-in;
- direct and optional narrative navigation reaching the same essential information;
- metadata, sitemap, robots, error, security-header, accessibility, resilience, and transfer-budget controls; and
- the production-hosted public synthetic prologue at `/prologue`.

The prologue remains `noindex, nofollow`, absent from public navigation and the sitemap, public and explicitly synthetic, no-account, memory-only, and non-authoritative. It accepts no real health data, arbitrary text, microphone, provider, model, analytics, payment, research enrollment, permission, private Chronicle, or durable progression.

The live site does not activate production health-data operation, accounts, private Chronicles, production House of Keys, production Aster, private MCP, providers, connectors, clinical workflows, research, donations, or payments.

## Accepted and merged foundations

- Sprint 0 — frozen product, architecture, gameplay, lore, and governance foundations
- Sprint 1 — runnable monorepo and open-source operating model
- Sprint 2 — controlled vocabulary, content schemas, canon validation, and deterministic incentives
- Sprint 3 — pre-stable Living Chronicle contracts
- Sprint 4 — pre-stable House of Keys permission contracts
- Sprint 5 — threat model and security design baseline
- Decision 0008 — funding and sponsorship doctrine without operating finance
- Decision 0010 — consumer-first, provider-independent product boundary
- Decision 0011 — operational simplicity and durable-workflow constraints
- Sprint 6 — pre-stable provider-independent Aster contracts
- Sprint 7 — bounded local public/synthetic Forge MCP
- Sprint 8 — accepted and deployed public website foundation
- Sprint 9 — accepted, merged, and production-hosted public synthetic prologue

These foundations remain bounded contract, policy, implementation, public-site, and public/synthetic evidence. They do not establish production private-data capability or independent certification.

## Accepted and merged Sprint 10 foundation

Sprint 10 establishes the public/synthetic universal game foundation through:

- `apps/game` for browser, iOS, and Android;
- `packages/game-content` as the one earned versioned playable-content package;
- island map, Hearth, direct and narrative routes, scene/dialogue/quest presentation, and Wayfinder navigation;
- deterministic non-authoritative state;
- bounded public/synthetic offline resilience;
- an informational authentication-after-prologue boundary;
- accessibility and platform-parity contracts; and
- reproducible unsigned build, rollback, and operations evidence.

Sprint 10 is merged as `28bb5a7ae268d28a67d737777cafdd760c796cd1` but creates no production account, private Chronicle, permission, model-provider egress, analytics, authoritative reward or progress, hosted preview, deployment, signing, store distribution, official release, LI activation, or Sprint 11 authority.

## Frozen foundations

- First player: people—any human may begin
- Open code and synthetic fixtures; private production health data
- AI proposes, the player confirms, and deterministic domain services validate and store
- Structured records remain authoritative
- Personal value before secondary use
- Meaningful refusal and non-punitive return
- Provider and sponsor replaceability
- Progressive decentralization toward a self-sustaining, founder-independent institution

## Core rule

> The software is open. The person’s health data is private.

No contributor workflow, public demo, newsletter, test environment, website, model, MCP client, provider, sponsor, connector, deployment, or possible scientific value changes that rule.
