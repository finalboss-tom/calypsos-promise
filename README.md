# Calypso’s Promise

[Documentation](docs/README.md) · [Vision](VISION.md) · [Current status](docs/roadmap/current-status.md) · [Pre-Sprint 8 review](docs/roadmap/pre-sprint-8-alignment-review.md) · [Sprint 7 completion](docs/roadmap/sprint-7-completion-record.md) · [Architecture](docs/architecture/README.md) · [Roadmap](ROADMAP.md) · [Governance](GOVERNANCE.md) · [Contributing](CONTRIBUTING.md)

**Build your Living Chronicle. Improve your health. Keep the key.**

Calypso’s Promise is an open-source, narrative-driven health platform that helps people build, understand, and control a longitudinal record of their lives. The playable world of Ogygia turns brief health actions, data capture, learning, and reflection into quests while keeping private health data separate from the open-source codebase.

## Start here

- **Understand the Promise:** [Product Constitution](docs/frozen/product-constitution.md) → [Vision](VISION.md) → [Architecture Foundation](docs/frozen/architecture.md)
- **See the current state:** [Current Project Status](docs/roadmap/current-status.md) → [Pre-Sprint 8 Alignment Review](docs/roadmap/pre-sprint-8-alignment-review.md) → [Sprint Roadmap](docs/roadmap/sprints.md)
- **Review merged Forge:** [Sprint 7 Completion](docs/roadmap/sprint-7-completion-record.md) → [Cross-Contract Reconciliation](docs/architecture/forge-sprint-7-cross-contract-reconciliation.md) → [Control Map](docs/architecture/forge-sprint-7-control-and-evidence-map.md) → [Open Holdpoints](docs/architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)
- **Review merged Aster:** [Sprint 6 Completion](docs/roadmap/sprint-6-completion-record.md) → [Aster Contract Baseline](docs/product/aster-contract-baseline.md)
- **Apply core decisions:** [Operational Simplicity](docs/decisions/0011-operational-simplicity-and-durable-workflows.md) · [Consumer-First Boundary](docs/decisions/0010-consumer-first-provider-independent-boundary.md) · [Funding Baseline](docs/economics/README.md)
- **Build safely:** [Contributing](CONTRIBUTING.md) → [Module Boundaries](docs/architecture/module-boundaries.md) → [Development Policy](docs/policies/development.md) → [Security](SECURITY.md)

## Project status

Calypso’s Promise remains in **institutional Phase 0 — Constitutional and open-source foundations** until an explicit phase-exit review is accepted.

**Sprints 0–7 are complete and merged.** Sprint 7 — Forge MCP and Agent Safety merged through PR #55 as squash commit `f28f054fe16d550fad37663cf234e06c5622dd42`.

The accepted Forge baseline provides:

- one local `apps/mcp-forge` application over newline-delimited UTF-8 `stdio`;
- exactly ten accepted public/synthetic tools through runtime registry revision `4`;
- nine server-owned source roots with allowlists, traversal and symlink isolation, SHA-256 provenance, and visible partial states;
- bounded search, inspection, validation, synthetic connector-fixture, and deterministic-generation behavior;
- immutable execution scopes, resource limits, cancellation, timeout, per-tool concurrency, bounded receipts, and stable public-safe errors;
- runtime-integrity checks and successful-result security postconditions;
- exact-revision compatibility and additive migrations;
- provider-independent clean startup and static prohibited-capability auditing;
- an 18-scenario public/synthetic adversarial matrix; and
- 28 controls, 19 open holdpoints, and 18 unresolved-work records.

Forge is bounded local contributor tooling. It is not a private Chronicle service, repository mutator, shell, network client, provider gateway, connector runtime, production sandbox, general agent, or institutional authority.

## Active pre-Sprint 8 review

Issue #58 is reconciling the merged repository before Sprint 8 begins.

The accepted Sprint 8 direction remains:

> Publish an honest, accessible gateway to Ogygia.

The review confirms that Sprint 8 should migrate the existing `apps/site` Website Track 0A gateway in place into one Next.js public website foundation. It must not create a duplicate site, second status system, independent funding ledger, CMS, database, account system, private-data path, provider runtime, donation checkout, or Sprint 9 prologue.

Sprint 8 implementation has **not** started. It remains blocked until the post-merge reconciliation is validated, accepted, and squash merged.

## Existing public site

[`apps/site`](apps/site) currently implements Website Track 0A:

- a cinematic semantic homepage using repository-owned Ogygia concept art;
- live text for the Promise, Aster, game loop, Ogygia, and capability status;
- privacy and signup-confirmation pages;
- an isolated, purpose-limited email signup webhook adapter;
- responsive and reduced-motion behavior; and
- public security headers.

The current routes are `/`, `/privacy`, `/joined`, and `/api/join`. Sprint 8 must preserve, redirect, or deliberately retire them through an explicit migration and rollback plan.

Git-triggered Vercel deployment is currently disabled. Preview, production cutover, cache behavior, CSP and security headers, signup privacy, canonical status and funding data, metadata, accessibility, performance, and rollback are Sprint 8 release gates rather than framework defaults.

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

## Current gates

- Complete and merge the pre-Sprint 8 reconciliation through issue #58.
- Keep Sprint 8 implementation separate until that gate closes.
- Preserve all Sprint 5, Sprint 6, and Sprint 7 production, security, privacy, accessibility, clinical, provider, connector, operational, institutional, and measurement holdpoints.
- Keep issue #50 trigger-based; Forge produced no Aster consumer dependency or ergonomics evidence.
- Review proposed Decision 0009 without representing it as a live legal or product capability.
- Complete the remaining Phase 0 key-person, succession, founder-power, economic-dependency, historical-source, branch-protection, DCO, operability, distributed-ownership, specialist-review, human-readable and machine-readable architecture audit, and phase-exit work.

## Core rule

> The software is open. The person’s health data is private.

No contributor workflow, public demo, test environment, website, model, MCP client, provider, sponsor, connector, or possible scientific value changes that rule.
