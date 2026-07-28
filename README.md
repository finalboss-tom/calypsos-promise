# Calypso’s Promise

[Documentation](docs/README.md) · [Vision](VISION.md) · [Current status](docs/roadmap/current-status.md) · [Sprint 8 plan](docs/roadmap/sprint-8-execution-plan.md) · [Workstream 8.2 record](docs/roadmap/sprint-8-workstream-8-2-record.md) · [Website architecture](docs/architecture/public-website-foundation-and-migration.md) · [Architecture](docs/architecture/README.md) · [Roadmap](ROADMAP.md) · [Governance](GOVERNANCE.md) · [Contributing](CONTRIBUTING.md)

**Build your Living Chronicle. Improve your health. Keep the key.**

Calypso’s Promise is an open-source, narrative-driven health platform intended to help people build, understand, improve, and control a longitudinal record of their lives. Ogygia turns brief health actions, data capture, learning, and reflection into quests while keeping private health data separate from the open-source codebase.

## Start here

- **Understand the Promise:** [Product Constitution](docs/frozen/product-constitution.md) → [Vision](VISION.md) → [Architecture Foundation](docs/frozen/architecture.md)
- **See the active work:** [Current Project Status](docs/roadmap/current-status.md) → [Sprint 8 Execution Plan](docs/roadmap/sprint-8-execution-plan.md) → [Sprint 8.2 Shell Record](docs/roadmap/sprint-8-workstream-8-2-record.md)
- **Inspect the website boundary:** [Public Website Foundation](docs/architecture/public-website-foundation-and-migration.md) → [`apps/site`](apps/site)
- **Review the accepted handoff:** [Pre-Sprint 8 Alignment Review](docs/roadmap/pre-sprint-8-alignment-review.md)
- **Review merged Forge:** [Sprint 7 Completion](docs/roadmap/sprint-7-completion-record.md) → [Cross-Contract Reconciliation](docs/architecture/forge-sprint-7-cross-contract-reconciliation.md) → [Open Holdpoints](docs/architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)
- **Review merged Aster:** [Sprint 6 Completion](docs/roadmap/sprint-6-completion-record.md) → [Aster Contract Baseline](docs/product/aster-contract-baseline.md)
- **Apply core decisions:** [Operational Simplicity](docs/decisions/0011-operational-simplicity-and-durable-workflows.md) · [Consumer-First Boundary](docs/decisions/0010-consumer-first-provider-independent-boundary.md) · [Funding Baseline](docs/economics/README.md)
- **Build safely:** [Contributing](CONTRIBUTING.md) → [Module Boundaries](docs/architecture/module-boundaries.md) → [Development Policy](docs/policies/development.md) → [Security](SECURITY.md)

## Project status

Calypso’s Promise remains in **institutional Phase 0 — Constitutional and open-source foundations** until an explicit phase-exit review is accepted.

**Sprints 0–7 and the pre-Sprint 8 reconciliation are complete and merged.** The reconciliation merged through PR #59 as squash commit `9da8034220954a1ca50420e71fd94e7795232a35`.

**Sprint 8 — Public Website Foundation is active** through issue #60 and draft PR #61.

The goal is:

> Publish an honest, accessible gateway to Ogygia.

### Completed Sprint 8 workstreams

**8.1 — Website application boundary and migration contract** established one `apps/site` owner, one in-place migration, explicit route handling, repository-owned content authority, server-rendering requirements, security and cache rules, signup and deployment gates, accessibility and performance requirements, rollback, and permanent non-scope.

**8.2 — Next.js shell, design tokens, security headers, metadata, and assets** established:

- Next.js `16.2.12`;
- React and React DOM `19.2.8`;
- exact lockfile evidence;
- one server-rendered App Router compatibility shell;
- preserved `/`, `/privacy`, `/joined`, and `/api/join` contracts;
- paused signup without intake or forwarding;
- application-local design tokens;
- canonical and social metadata, sitemap, robots, not-found, and error behavior;
- nonce CSP and public security headers;
- mutable caching for repository-owned compatibility assets;
- shell validation and focused tests; and
- continued disabled Git-triggered Vercel deployment.

The exact 8.2 implementation head `8c757e9482e616db7c86689a1d1d9c99d70ca6cd` passed CI run 957 and DCO Attestation run 1034.

### Next workstream: 8.3

Workstream 8.3 will implement the shared direct navigation, optional narrative entry, reusable capability-status primitives, semantic and keyboard foundations, reduced motion, image-failure and low-bandwidth behavior, and server-rendered essential-information parity.

It will not activate signup intake, add a CMS or second source of truth, complete later page content prematurely, or begin Sprint 9 gameplay.

## Current public site

[`apps/site`](apps/site) is now a validated Next.js compatibility shell, not an official public release.

It currently provides:

- server-rendered compatibility homepage content preserving the Ogygia direction;
- a root layout, skip link, basic header/footer, and direct repository/status links;
- privacy and joined compatibility pages;
- `503 SIGNUP_MIGRATION_PAUSED` at `/api/join`;
- application-local design tokens and global styling;
- metadata routes and error states;
- repository-owned SVG and WebP assets;
- nonce CSP and public security headers; and
- build, lint, typecheck, shell validation, and focused tests.

It does not yet provide final direct/narrative navigation, final homepage and Promise content, Seven Laws, How It Works, consumer-first or Aster/AI pages, Trust Center, Open Forge, canonical funding views, final signup disposition, accessibility or performance release evidence, preview deployment, official production cutover, or any private product capability.

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
