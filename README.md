# Calypso’s Promise

[Documentation](docs/README.md) · [Vision](VISION.md) · [Current status](docs/roadmap/current-status.md) · [Sprint 8 plan](docs/roadmap/sprint-8-execution-plan.md) · [Workstream 8.7 record](docs/roadmap/sprint-8-workstream-8-7-record.md) · [Website architecture](docs/architecture/public-website-foundation-and-migration.md) · [Architecture](docs/architecture/README.md) · [Roadmap](ROADMAP.md) · [Governance](GOVERNANCE.md) · [Contributing](CONTRIBUTING.md)

**Build your Living Chronicle. Improve your health. Keep the key.**

Calypso’s Promise is an open-source, narrative-driven health platform intended to help people build, understand, improve, and control a longitudinal record of their lives. Ogygia turns brief health actions, data capture, learning, and reflection into quests while keeping private health data separate from the open-source codebase.

## Start here

- **Understand the Promise:** [Product Constitution](docs/frozen/product-constitution.md) → [Public Promise page](apps/site/src/app/promise/page.tsx) → [Seven Laws](apps/site/src/app/laws/page.tsx) → [Vision](VISION.md)
- **See the active work:** [Current Project Status](docs/roadmap/current-status.md) → [Sprint 8 Execution Plan](docs/roadmap/sprint-8-execution-plan.md) → [Sprint 8.7 Record](docs/roadmap/sprint-8-workstream-8-7-record.md)
- **Inspect the website boundary:** [Public Website Foundation](docs/architecture/public-website-foundation-and-migration.md) → [`apps/site`](apps/site)
- **Review merged Forge:** [Sprint 7 Completion](docs/roadmap/sprint-7-completion-record.md) → [Cross-Contract Reconciliation](docs/architecture/forge-sprint-7-cross-contract-reconciliation.md) → [Open Holdpoints](docs/architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)
- **Review merged Aster:** [Sprint 6 Completion](docs/roadmap/sprint-6-completion-record.md) → [Aster Contract Baseline](docs/product/aster-contract-baseline.md)
- **Apply core decisions:** [Operational Simplicity](docs/decisions/0011-operational-simplicity-and-durable-workflows.md) · [Consumer-First Boundary](docs/decisions/0010-consumer-first-provider-independent-boundary.md) · [Funding Baseline](docs/economics/README.md)
- **Build safely:** [Contributing](CONTRIBUTING.md) → [Module Boundaries](docs/architecture/module-boundaries.md) → [Development Policy](docs/policies/development.md) → [Security](SECURITY.md)

## Project status

Calypso’s Promise remains in **institutional Phase 0 — Constitutional and open-source foundations** until an explicit phase-exit review is accepted.

**Sprints 0–7 and the pre-Sprint 8 reconciliation are complete and merged.** Sprint 8 — Public Website Foundation is active through issue #60 and draft PR #61.

The goal is:

> Publish an honest, accessible gateway to Ogygia.

### Completed Sprint 8 workstreams

- **8.1:** one `apps/site` owner, in-place migration, authority, route, security, signup, deployment, rollback, accessibility, performance, and validation boundaries.
- **8.2:** pinned Next.js App Router shell, exact dependencies, compatibility routes, paused signup, metadata, CSP, headers, caching, and focused validation.
- **8.3:** direct/narrative navigation parity, landmarks, keyboard and focus foundations, controlled evidence statuses, canonical source links, and resilient presentation.
- **8.4:** cinematic homepage, dedicated Promise route, frozen player promise, three personal-value loops, public-software/private-data boundary, player-rights explanation, and contribution paths.
- **8.5:** source-backed Seven Laws, How It Works, consumer-first/interoperability, and Aster/AI routes with metadata, sitemap inclusion, both navigation paths, explicit status boundaries, production-build evidence, and deterministic validation.
- **8.6:** source-backed Trust Center and Open Forge routes with truthful rights, security, funding, challenge, tool-registry, provenance, receipt, error, holdpoint, and non-authority explanations.
- **8.7:** source-backed roadmap and capability views, public-safe support routing, and build-time canonical funding-register transparency with honest empty states and transactions disabled.

The 8.7 focused candidate `f39176f5f3a842e89ff4681f1d9810a9f2f305cf` passed formatting, the production site build, site lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.

### Next workstream: 8.8

Workstream 8.8 will make the explicit signup preserve-or-retire decision and implement only the accepted bounded path.

It will not turn signup into account creation, health-data intake, research enrollment, donation processing, provider intake, or an undeclared marketing database.

## Current public site

[`apps/site`](apps/site) is a validated Next.js public website foundation, not an official production release.

It currently provides:

- cinematic server-rendered homepage and dedicated `/promise` route;
- `/laws`, `/how-it-works`, `/consumer-first`, `/aster`, `/trust`, `/forge`, `/roadmap`, `/support`, and `/funding` source-backed guide, trust, and transparency routes;
- direct and optional narrative navigation reaching the same essential destinations;
- skip links, semantic landmarks, keyboard access, and visible focus;
- controlled evidence statuses and canonical source links;
- `503 SIGNUP_MIGRATION_PAUSED` at `/api/join`;
- application-local design tokens and responsive presentation styles;
- reduced-motion, reduced-data, contrast, forced-colors, and image-failure behavior;
- metadata routes, sitemap, error states, nonce CSP, and public security headers; and
- production-build, lint, typecheck, validator, and focused-test evidence.

It does not yet provide a final signup disposition, representative accessibility review, route-level performance release evidence, preview deployment, official production cutover, or any private product capability.

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
- Pre-Sprint 8 reconciliation — accepted website migration boundary

These foundations remain contract, policy, local implementation, and public/synthetic evidence. They do not establish production health-data operation or independent certification.

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

## Sprint 8 non-scope

Sprint 8 does not activate accounts, authentication, real health-data intake, private Chronicles, production Aster, private MCP, providers, connectors, clinical workflows, research enrollment, governance voting, donations, payments, financial operations, personal-data analytics, estate directives, or Sprint 9 gameplay.

## Core rule

> The software is open. The person’s health data is private.

No contributor workflow, public demo, test environment, website, model, MCP client, provider, sponsor, connector, or possible scientific value changes that rule.
