# Calypso’s Promise

[Documentation](docs/README.md) · [Vision](VISION.md) · [Current status](docs/roadmap/current-status.md) · [Post-Sprint 8 reconciliation](docs/roadmap/post-sprint-8-reconciliation-and-sprint-9-preparation.md) · [Sprint 8 completion](docs/roadmap/sprint-8-completion-record.md) · [Sprint 9 alignment](https://github.com/finalboss-tom/calypsos-promise/issues/64) · [Architecture](docs/architecture/README.md) · [Roadmap](ROADMAP.md) · [Governance](GOVERNANCE.md) · [Contributing](CONTRIBUTING.md)

**Build your Living Chronicle. Improve your health. Keep the key.**

Calypso’s Promise is an open-source, narrative-driven health platform intended to help people build, understand, improve, and control a longitudinal record of their lives. Ogygia turns brief health actions, data capture, learning, and reflection into quests while keeping private health data separate from the open-source codebase.

## Start here

- **Understand the Promise:** [Product Constitution](docs/frozen/product-constitution.md) → [Public Promise page](apps/site/src/app/promise/page.tsx) → [Seven Laws](apps/site/src/app/laws/page.tsx) → [Vision](VISION.md)
- **See the current state:** [Current Project Status](docs/roadmap/current-status.md) → [Post-Sprint 8 Reconciliation](docs/roadmap/post-sprint-8-reconciliation-and-sprint-9-preparation.md) → [Sprint Roadmap](docs/roadmap/sprints.md)
- **Prepare Sprint 9:** [Pre-Sprint 9 Alignment Issue #64](https://github.com/finalboss-tom/calypsos-promise/issues/64) → [Sprint 8 Release and Handoff](docs/roadmap/sprint-8-release-rollback-and-sprint-9-handoff.md)
- **Inspect the live site boundary:** [Public Website Foundation](docs/architecture/public-website-foundation-and-migration.md) → [`apps/site`](apps/site)
- **Review merged Forge:** [Sprint 7 Completion](docs/roadmap/sprint-7-completion-record.md) → [Cross-Contract Reconciliation](docs/architecture/forge-sprint-7-cross-contract-reconciliation.md) → [Open Holdpoints](docs/architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)
- **Review merged Aster:** [Sprint 6 Completion](docs/roadmap/sprint-6-completion-record.md) → [Aster Contract Baseline](docs/product/aster-contract-baseline.md)
- **Apply core decisions:** [Operational Simplicity](docs/decisions/0011-operational-simplicity-and-durable-workflows.md) · [Consumer-First Boundary](docs/decisions/0010-consumer-first-provider-independent-boundary.md) · [Funding Baseline](docs/economics/README.md)
- **Build safely:** [Contributing](CONTRIBUTING.md) → [Module Boundaries](docs/architecture/module-boundaries.md) → [Development Policy](docs/policies/development.md) → [Security](SECURITY.md)

## Project status

Calypso’s Promise remains in **institutional Phase 0 — Constitutional and open-source foundations** until an explicit phase-exit review is accepted.

**Sprints 0–8 are accepted and merged.** Sprint 8 was squash merged through PR #61 as `20e2c95c96670f0ef6b972c9ebf7b482f7f9cf1a` and closed through issue #60.

The accepted Next.js public gateway is live on the canonical domains through production deployment `dpl_3V2e76y1fwrR19j1BzUFpo9U9kjp`. Git-triggered Vercel deployment was restored to disabled through `a5146237356f58e8d28343e90918b70a418bccbb`, so ordinary repository commits do not automatically create releases.

Current work is:

- post-Sprint 8 repository and public-copy reconciliation;
- Phase 0 newsletter preserve-and-activate gate [#63](https://github.com/finalboss-tom/calypsos-promise/issues/63); and
- pre-Sprint 9 public synthetic prologue alignment gate [#64](https://github.com/finalboss-tom/calypsos-promise/issues/64).

Sprint 9 implementation has **not** started.

## Live public site

[`apps/site`](apps/site) provides:

- a cinematic server-rendered homepage;
- The Promise, Seven Laws, How It Works, Consumer First, and Aster/AI explanations;
- Trust Center and Open Forge explanations;
- public roadmap, support, and canonical funding-transparency views;
- direct and optional narrative navigation reaching the same essential destinations;
- controlled evidence statuses and canonical source links;
- metadata, sitemap, robots, not-found, error, nonce-CSP, security-header, and cache controls;
- responsive, keyboard, focus, reduced-motion, reduced-data, contrast, forced-colors, and image-failure foundations; and
- permanent source and isolated local production-preview validation with explicit transfer budgets.

The live site does not activate accounts, private Chronicles, production Aster, private MCP, providers, connectors, clinical workflows, research enrollment, donations, payments, or production health-data operation.

## Phase 0 newsletter

The founding steward selected **Path A — preserve and activate** for narrow project updates leading up to Phase 0 completion.

The implementation reuses the existing private server webhook and Google Sheet connection. It accepts an email address plus explicit consent only and cannot create an account, game identity, Chronicle record, research enrollment, provider lead, donation, or advertising profile.

Issue #63 remains open until the implementation is merged, deployed, tested end to end, reconciled with its limitations and rollback, and explicitly accepted. Real subscriber addresses, webhook URLs, credentials, and protected incident evidence never belong in this repository.

## Sprint 9 boundary

Sprint 9’s accepted goal is:

> Let anyone understand the product through play before creating an account.

Issue #64 must resolve application ownership, temporary synthetic data, deterministic state, Aster fallback, refusal and exit, accessibility, security, performance, publication, rollback, and completion evidence before implementation begins.

Sprint 9 remains public and explicitly synthetic only. It cannot require an account, email, real health data, production model provider, institutional connection, payment, donation, or durable private progression.

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

These foundations remain contract, policy, local implementation, public website, and public/synthetic evidence. They do not establish production health-data operation or independent certification.

## Frozen foundations

- Product thesis and player promise
- First player: people—any human may begin
- Ogygia world, Seven Laws, Seven Tides, Fourteen Lanterns, principal cast, and canonical zones
- Illustrated, map-based narrative play rather than a conventional 3D game
- Open code and synthetic fixtures; private production health data
- AI proposes, the player confirms, and deterministic domain services validate and store
- Structured records remain authoritative
- MCP exposes selected bounded capabilities; it is not the product database or core protocol
- Personal value before secondary use, deterministic incentives, meaningful refusal, and non-punitive return
- Progressive decentralization toward a self-sustaining, founder-independent institution

## Core rule

> The software is open. The person’s health data is private.

No contributor workflow, public demo, newsletter, test environment, website, model, MCP client, provider, sponsor, connector, or possible scientific value changes that rule.
