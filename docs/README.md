# Calypso’s Promise Documentation

[Repository home](../README.md) · [Vision](../VISION.md) · [Roadmap](../ROADMAP.md) · [Governance](../GOVERNANCE.md) · [Current status](roadmap/current-status.md) · [Sprint 7 plan](roadmap/sprint-7-execution-plan.md) · [Forge boundary](architecture/forge-mcp-boundary-and-tool-registry.md) · [Local transport](architecture/forge-mcp-local-stdio-transport.md) · [Source catalogue](architecture/forge-mcp-source-catalogue-and-provenance.md) · [Pre-Sprint 7 review](roadmap/pre-sprint-7-alignment-review.md) · [Contributing](../CONTRIBUTING.md)

This is the canonical entry point for repository documentation. It should answer four questions quickly:

1. What is Calypso’s Promise ultimately trying to accomplish?
2. Which documents are authoritative for the decision being made?
3. What is implemented, accepted, planned, proposed, deferred, or still behind a specialist gate?
4. Where should a contributor make a change without crossing a product, privacy, safety, canon, permission, security, funding, provider, interoperability, workflow, operability, succession, or governance boundary?

## Primary directive

> Build a compelling, trustworthy consumer experience that helps people build, understand, improve, and control their Living Chronicles; return personal value first; enable separately authorized collective benefit; and progressively transfer stewardship as evidence, safeguards, capacity, and legitimacy mature.

The directive is constrained by the player promise:

> **Build your Living Chronicle. Improve your health. Keep the key.**

The application is the first operating surface of a long-lived public-benefit institution. Product utility, individual control, provider-independent continuity, operational legibility, transparent contribution, sustainable economics, founder independence, and person-directed long-horizon stewardship must mature together.

## Current orientation

1. [Current Project Status](roadmap/current-status.md)
2. [Sprint 7 Execution Plan](roadmap/sprint-7-execution-plan.md)
3. [Forge MCP Boundary and Tool Registry](architecture/forge-mcp-boundary-and-tool-registry.md)
4. [Forge MCP Local `stdio` Transport](architecture/forge-mcp-local-stdio-transport.md)
5. [Forge MCP Source Catalogue and Provenance](architecture/forge-mcp-source-catalogue-and-provenance.md)
6. [Pre-Sprint 7 Repository Alignment Review](roadmap/pre-sprint-7-alignment-review.md)
7. [Sprint Roadmap](roadmap/sprints.md)
8. [Sprint 6 Completion Record](roadmap/sprint-6-completion-record.md)
9. [Aster Contract Baseline](product/aster-contract-baseline.md)
10. [Sprint 6 Cross-Contract Reconciliation](architecture/aster-sprint-6-cross-contract-reconciliation.md)
11. [Sprint 6 Control and Evidence Map](architecture/aster-sprint-6-control-and-evidence-map.md)
12. [Sprint 6 Specialist Holdpoints and Unresolved Work](architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md)
13. [Sprint 5 Completion Record](roadmap/sprint-5-completion-record.md)
14. [Security Architecture](security/README.md)
15. [Phase 0 Funding and Sponsorship Baseline](economics/README.md)
16. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](decisions/0010-consumer-first-provider-independent-boundary.md)
17. [Decision 0011 — Operational Simplicity and Durable Workflows](decisions/0011-operational-simplicity-and-durable-workflows.md)
18. [Repository and Module Boundaries](architecture/module-boundaries.md)
19. [Developer Experience and Operability Policy](policies/developer-experience-and-operability.md)
20. [Minimum Viable Validation](policies/minimum-viable-validation.md)
21. [Decision 0009 — Health Data Legacy and Post-Mortem Stewardship](decisions/0009-health-data-legacy-and-post-mortem-stewardship.md) — proposed future boundary

## Mission and non-negotiable boundaries

Read in this order:

1. [Product Constitution](frozen/product-constitution.md)
2. [Vision and Institutional Mandate](../VISION.md)
3. [Architecture Foundation](frozen/architecture.md)
4. [World and Lore Canon](frozen/world-and-lore-canon.md)
5. [Gameplay Foundation](product/gameplay-foundation.md)
6. [Public Institutional Roadmap](../ROADMAP.md)
7. [Governance Baseline](../GOVERNANCE.md)

These documents protect personal value first, meaningful refusal, non-punitive return, deterministic authority, private health data, provider replaceability, progressive decentralization, public institutional legibility, and the rule that AI proposes while people and domain services control authoritative changes.

## Authority and conflict order

When documents appear to conflict, use this order and open a decision record rather than silently choosing a convenient interpretation:

1. Frozen product, architecture, world, gameplay, and institutional commitments
2. Accepted decision records
3. Governance, public roadmap, security, publication, economics, development, and other cross-cutting policies
4. Versioned architecture, product, data, content, security, and operating baselines
5. Sprint plans, cross-phase workstreams, completion records, implementation notes, and current-status records
6. Public campaign materials and time-sensitive experiments

A lower layer may implement or explain a higher layer. It may not quietly override it.

## Current project boundary

Sprints 0–6, the funding and sponsorship doctrine, Decisions 0010 and 0011, and the pre-Sprint 6 reconciliation are complete and merged.

Sprint 6 merged through PR #48 as squash commit `5aa3540765e5573f3304ce2b624d7a02c3ba2d13`. It establishes the pre-stable provider-independent Aster contract baseline without activating production AI, private-data processing, provider calls, retrieval, memory storage, identity, permission orchestration, persistence, durable workflows, MCP tools, connectors, clinical behavior, deployment, or independent specialist review.

The [Pre-Sprint 7 Alignment Review](roadmap/pre-sprint-7-alignment-review.md) merged through PR #52 as squash commit `a41ca5ad9d2c0fe8a009946f376705bb7910e223`.

Sprint 7 — Forge MCP and Agent Safety is active through issue #54 and draft PR #55. The [Sprint 7 Execution Plan](roadmap/sprint-7-execution-plan.md), [Forge Boundary](architecture/forge-mcp-boundary-and-tool-registry.md), [Local Transport](architecture/forge-mcp-local-stdio-transport.md), and [Source Catalogue](architecture/forge-mcp-source-catalogue-and-provenance.md) govern the implemented 7.1–7.3 baselines. A finalized-version local `stdio` transport and server-owned allowlisted source core exist, but all tools remain planned and unexposed. Sprint 7.4 is next.

## Current accepted strategic and architectural baselines

### Consumer-first and provider-independent

- [Decision 0010](decisions/0010-consumer-first-provider-independent-boundary.md)
- [Consumer-First and Provider-Independent Architecture](architecture/consumer-first-provider-independent-boundary.md)
- [Consumer-First and Institutional Interoperability Workstream](roadmap/consumer-first-provider-independent-workstream.md)
- [AS-0012 — Consumer-First Continuity](governance/assumption-AS-0012-consumer-first-continuity-value.md)

Providers and institutions are important sources, destinations, and potential partners connected through versioned adapters. They do not become the automatic owner of Chronicle meaning, product authority, roadmap, permissions, or governance.

### Operational simplicity and durable workflows

- [Decision 0011](decisions/0011-operational-simplicity-and-durable-workflows.md)
- [Operational Simplicity and Durable Workflows Architecture](architecture/operational-simplicity-and-durable-workflows.md)
- [Mission-to-Runtime Traceability](architecture/mission-to-runtime-traceability.md)
- [Developer Experience and Operability Policy](policies/developer-experience-and-operability.md)
- [AS-0013 — Operational Simplicity](governance/assumption-AS-0013-operational-simplicity-durable-value.md)

The modular monolith remains the default. Responsive work, deferred jobs, schedules, events, projections, and provider adapters remain explicit concepts rather than hidden infrastructure conventions. Sprint 7 therefore starts as one local `stdio` application, not a remote service platform.

### Funding and sponsorship

- [Decision 0008 — Funding and Sponsorship Baseline](decisions/0008-funding-and-sponsorship-baseline.md)
- [Economics and Public-Good Funding](economics/README.md)
- [Funding Conflict and Acceptance Policy](economics/funding-conflict-and-acceptance-policy.md)
- [Infrastructure Sponsorship and Exit Policy](economics/infrastructure-sponsorship-and-exit-policy.md)

Funding cannot purchase private data, product authority, health influence, source rank, tool authority, provider defaults, connector placement, research authority, roadmap control, governance power, favorable findings, safety exceptions, compatibility outcomes, game progression, or publication control.

## Living Chronicle, House of Keys, and Aster

### Living Chronicle

The Living Chronicle owns longitudinal records, source provenance, correction, conflict, supersession, export, and deletion contracts. External schemas and providers remain source-attributed inputs rather than automatic truth.

### House of Keys

Permission truth remains separate from Chronicle truth. A grant may authorize an operation; it does not create the record, authenticate the actor, execute the operation, or become a reward condition.

### Aster

The [Sprint 6 Completion Record](roadmap/sprint-6-completion-record.md) and [Aster Contract Baseline](product/aster-contract-baseline.md) are merged.

Aster may draft, clarify, recall source-linked information, explain provenance and uncertainty, route, and prepare narrative presentation. It cannot write canonical records, create permission, confirm itself, invoke authoritative actions, complete quests, grant rewards, diagnose, retain hidden material memory, or treat model, provider, retrieval, fixture, compatibility, migration, or CI output as truth.

> AI proposes. The player confirms. The domain service validates and stores.

## Sprint 7 — Forge MCP and Agent Safety

The [Pre-Sprint 7 Alignment Review](roadmap/pre-sprint-7-alignment-review.md) is the controlling handoff.

Sprint 7 should implement one bounded local `apps/mcp-forge` application that exposes useful contributor tooling over public documentation and synthetic data.

It must cover:

- a server-owned tool registry and stable risk classes;
- local `stdio` MCP transport;
- allowlisted repository roots and path isolation;
- lore, quest, architecture, decision, standards, mapping, and synthetic-fixture search or validation where accepted;
- source-linked results and visible limitations;
- synthetic generation and draft-only mappings;
- scopes, deterministic resource limits, cancellation, receipts, and public-safe errors;
- prompt-injection, confused-deputy, path-escape, exfiltration, and resource-abuse tests;
- versioned compatibility and migration; and
- sponsor, provider, service-credit, and publication independence.

Sprint 7 does not authorize private Chronicle tools, repository mutation, arbitrary shell execution, arbitrary network access, production providers, protected mappings, credentials, real health data, production identity, connectors, remote MCP hosting, or consequential domain actions.

Issue #50 remains evidence-triggered and is not a prerequisite unless a real Forge consumer uses the Aster public surface and records concrete friction.

## Security and information handling

- [Sprint 5 Completion Record](roadmap/sprint-5-completion-record.md)
- [Security Architecture](security/README.md)
- [Sprint 5 Specialist Holdpoints](security/sprint-5-specialist-holdpoint-and-evidence-register.md)
- [Sprint 6 Specialist Holdpoints](architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md)
- [Security Policy](../SECURITY.md)
- [Publication and Confidentiality Policy](policies/publication-and-confidentiality.md)

No production health data, credentials, private exports, contact lists, private correspondence, conduct evidence, security reports, protected provider or interoperability records, private contracts or negotiations, estate records, financial source records, or protected operational information belong in public project systems.

Use public or synthetic information. A local checkout file is not automatically an approved Forge source; Sprint 7 requires explicit source allowlists and exclusions.

## Legacy, incapacity, estate, or post-mortem stewardship

Decision 0009 and its companion records remain proposed future capability only. They do not create a production estate-planning service, executor override, property classification, post-mortem research release, public archive, successor runtime, or legal conclusion.

## Contribute code, content, or documentation

1. [Contributing](../CONTRIBUTING.md)
2. [Development Policy](policies/development.md)
3. [Repository and Module Boundaries](architecture/module-boundaries.md)
4. [Minimum Viable Validation](policies/minimum-viable-validation.md)
5. [Publication and Confidentiality Policy](policies/publication-and-confidentiality.md)
6. [Security Policy](../SECURITY.md)
7. [Governance Baseline](../GOVERNANCE.md)

Ordinary public development must remain credential-free and use public or explicitly synthetic information. A passing test, complete contract, accepted sprint, provider claim, agent response, or sponsor relationship cannot bypass the repository’s authority, privacy, safety, publication, or evidence boundaries.
