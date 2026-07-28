# Calypso’s Promise Documentation

[Repository home](../README.md) · [Vision](../VISION.md) · [Roadmap](../ROADMAP.md) · [Governance](../GOVERNANCE.md) · [Current status](roadmap/current-status.md) · [Sprint 7 completion](roadmap/sprint-7-completion-record.md) · [Pre-Sprint 8 review](roadmap/pre-sprint-8-alignment-review.md) · [Architecture](architecture/README.md) · [Contributing](../CONTRIBUTING.md)

This is the canonical entry point for repository documentation. It should answer four questions quickly:

1. What is Calypso’s Promise ultimately trying to accomplish?
2. Which records are authoritative for the decision being made?
3. What is implemented, accepted, planned, proposed, deferred, or still behind a specialist gate?
4. Where should a contributor make a change without crossing a product, privacy, safety, canon, permission, security, funding, provider, interoperability, workflow, operability, succession, or governance boundary?

## Primary directive

> Build a compelling, trustworthy consumer experience that helps people build, understand, improve, and control their Living Chronicles; return personal value first; enable separately authorized collective benefit; and progressively transfer stewardship as evidence, safeguards, capacity, and legitimacy mature.

The directive is constrained by the player promise:

> **Build your Living Chronicle. Improve your health. Keep the key.**

The application is the first operating surface of a long-lived public-benefit institution. Product utility, individual control, provider-independent continuity, operational legibility, transparent contribution, sustainable economics, founder independence, and person-directed long-horizon stewardship must mature together.

## Current orientation

1. [Current Project Status](roadmap/current-status.md)
2. [Sprint 7 Completion Record](roadmap/sprint-7-completion-record.md)
3. [Pre-Sprint 8 Alignment Review](roadmap/pre-sprint-8-alignment-review.md)
4. [Sprint 7 Execution Plan](roadmap/sprint-7-execution-plan.md)
5. [Sprint 7 Cross-Contract Reconciliation](architecture/forge-sprint-7-cross-contract-reconciliation.md)
6. [Sprint 7 Control and Evidence Map](architecture/forge-sprint-7-control-and-evidence-map.md)
7. [Sprint 7 Specialist Holdpoints and Unresolved Work](architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)
8. [Forge MCP Agent Security, Compatibility, and Operability](architecture/forge-mcp-agent-security-compatibility-and-operability.md)
9. [Forge MCP Scopes, Limits, Receipts, and Errors](architecture/forge-mcp-scopes-limits-receipts-and-errors.md)
10. [Forge MCP Deterministic Synthetic Generation](architecture/forge-mcp-deterministic-synthetic-generation.md)
11. [Forge MCP Public Standards, Mapping Drafts, and Synthetic Connector Fixtures](architecture/forge-mcp-public-standards-mapping-and-synthetic-connectors.md)
12. [Forge MCP Architecture and Decision Tools](architecture/forge-mcp-architecture-and-decision-tools.md)
13. [Forge MCP Lore and Schema Tools](architecture/forge-mcp-lore-and-schema-tools.md)
14. [Forge MCP Source Catalogue and Provenance](architecture/forge-mcp-source-catalogue-and-provenance.md)
15. [Forge MCP Local `stdio` Transport](architecture/forge-mcp-local-stdio-transport.md)
16. [Forge MCP Boundary and Tool Registry](architecture/forge-mcp-boundary-and-tool-registry.md)
17. [Sprint Roadmap](roadmap/sprints.md)
18. [Sprint 6 Completion Record](roadmap/sprint-6-completion-record.md)
19. [Aster Contract Baseline](product/aster-contract-baseline.md)
20. [Sprint 5 Completion Record](roadmap/sprint-5-completion-record.md)
21. [Security Architecture](security/README.md)
22. [Phase 0 Funding and Sponsorship Baseline](economics/README.md)
23. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](decisions/0010-consumer-first-provider-independent-boundary.md)
24. [Decision 0011 — Operational Simplicity and Durable Workflows](decisions/0011-operational-simplicity-and-durable-workflows.md)
25. [Repository and Module Boundaries](architecture/module-boundaries.md)
26. [Developer Experience and Operability Policy](policies/developer-experience-and-operability.md)
27. [Minimum Viable Validation](policies/minimum-viable-validation.md)
28. [Decision 0009 — Health Data Legacy and Post-Mortem Stewardship](decisions/0009-health-data-legacy-and-post-mortem-stewardship.md) — proposed future boundary

## Mission and non-negotiable boundaries

Read in this order:

1. [Product Constitution](frozen/product-constitution.md)
2. [Vision and Institutional Mandate](../VISION.md)
3. [Architecture Foundation](frozen/architecture.md)
4. [World and Lore Canon](frozen/world-and-lore-canon.md)
5. [Gameplay Foundation](product/gameplay-foundation.md)
6. [Public Institutional Roadmap](../ROADMAP.md)
7. [Governance Baseline](../GOVERNANCE.md)

These records protect personal value first, meaningful refusal, non-punitive return, deterministic authority, private health data, provider replaceability, progressive decentralization, public institutional legibility, and the rule that AI proposes while people and domain services control authoritative changes.

## Authority and conflict order

When records appear to conflict, use this order and open a decision record rather than silently choosing a convenient interpretation:

1. Frozen product, architecture, world, gameplay, and institutional commitments
2. Accepted decision records
3. Governance, public roadmap, security, publication, economics, development, and other cross-cutting policies
4. Versioned architecture, product, data, content, security, and operating baselines
5. Sprint plans, cross-phase workstreams, completion records, implementation notes, and current-status records
6. Public campaign materials and time-sensitive experiments

A lower layer may implement or explain a higher layer. It may not quietly override it.

## Current project boundary

Sprints 0–6, the funding and sponsorship doctrine, Decisions 0010 and 0011, and the pre-Sprint 7 reconciliation are complete and merged.

Sprint 7 — Forge MCP and Agent Safety remains active through issue #54 and draft PR #55. All workstream and 7.10 completion artifacts are present on the branch. The [Sprint 7 Completion Record](roadmap/sprint-7-completion-record.md) is ready for founding-steward acceptance but is not merged.

The candidate implements one local public/synthetic Forge application with exactly ten accepted tools, allowlisted source provenance, deterministic validation and generation, bounded scopes and receipts, stable errors, runtime integrity, successful-result postconditions, exact compatibility and migrations, static prohibited-capability auditing, provider-independent clean startup, cross-contract reconciliation, control mapping, holdpoints, and the bounded Sprint 8 handoff.

This is local public/synthetic evidence. It does not establish private Chronicle tools, remote MCP, repository mutation, providers, connectors, shell or network authority, production deployment, process isolation, monitoring, incident response, representative measurement, independent penetration testing, or specialist approval.

Sprint 8 remains blocked until Sprint 7 is explicitly accepted and squash merged. The prepared handoff preserves `apps/site` as the single website owner and directs migration of Website Track 0A into one honest, accessible Next.js public foundation.

## Current accepted strategic baselines

### Consumer-first and provider-independent

- [Decision 0010](decisions/0010-consumer-first-provider-independent-boundary.md)
- [Consumer-First and Provider-Independent Architecture](architecture/consumer-first-provider-independent-boundary.md)
- [Consumer-First and Institutional Interoperability Workstream](roadmap/consumer-first-provider-independent-workstream.md)
- [AS-0012 — Consumer-First Continuity](governance/assumption-AS-0012-consumer-first-continuity-value.md)

Providers and institutions are important sources, destinations, and potential partners connected through versioned adapters. They do not become the automatic owner of Chronicle meaning, product authority, roadmap, permissions, mappings, generated evidence, tool outcomes, or governance.

### Operational simplicity and durable workflows

- [Decision 0011](decisions/0011-operational-simplicity-and-durable-workflows.md)
- [Operational Simplicity and Durable Workflows Architecture](architecture/operational-simplicity-and-durable-workflows.md)
- [Mission-to-Runtime Traceability](architecture/mission-to-runtime-traceability.md)
- [Developer Experience and Operability Policy](policies/developer-experience-and-operability.md)
- [AS-0013 — Operational Simplicity](governance/assumption-AS-0013-operational-simplicity-durable-value.md)

The modular monolith remains the default. Forge remains one local `stdio` application, not a remote service, connector platform, general agent runtime, production synthetic-data system, or production resource-control system.

### Funding and sponsorship

- [Decision 0008 — Funding and Sponsorship Baseline](decisions/0008-funding-and-sponsorship-baseline.md)
- [Economics and Public-Good Funding](economics/README.md)
- [Funding Conflict and Acceptance Policy](economics/funding-conflict-and-acceptance-policy.md)
- [Infrastructure Sponsorship and Exit Policy](economics/infrastructure-sponsorship-and-exit-policy.md)

Funding cannot purchase private data, product authority, health influence, source rank, tool or scope authority, provider defaults, connector placement, mapping approval, generated outcomes, receipt outcomes, research authority, roadmap control, governance power, favorable findings, safety exceptions, compatibility outcomes, progression, or publication control.

## Living Chronicle, House of Keys, Aster, and Forge

### Living Chronicle

The Living Chronicle owns longitudinal records, source provenance, correction, conflict, supersession, export, and deletion contracts. External schemas and providers remain source-attributed inputs rather than automatic truth.

### House of Keys

Permission truth remains separate from Chronicle truth. A grant may authorize an operation; it does not create the record, authenticate the actor, execute the operation, or become a reward condition.

### Aster

Aster may draft, clarify, recall source-linked information, explain provenance and uncertainty, route, and prepare narrative presentation. It cannot write canonical records, create permission, confirm itself, invoke authoritative actions, complete quests, grant rewards, diagnose, or treat model, provider, retrieval, fixture, compatibility, migration, or CI output as truth.

> AI proposes. The player confirms. The domain service validates and stores.

### Forge MCP

Forge remains one bounded local contributor application over public documentation and explicitly synthetic data. It is not the repository database, a general shell, mutation agent, private Chronicle service, House of Keys service, provider gateway, connector runtime, production synthetic-data system, production sandbox, or institutional authority.

Forge does not import or depend on Aster. Issue #50 remains evidence-triggered and unactivated because no genuine Aster consumer friction exists.

## Security and information handling

- [Sprint 5 Completion Record](roadmap/sprint-5-completion-record.md)
- [Security Architecture](security/README.md)
- [Sprint 5 Specialist Holdpoints](security/sprint-5-specialist-holdpoint-and-evidence-register.md)
- [Sprint 6 Specialist Holdpoints](architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md)
- [Sprint 7 Specialist Holdpoints](architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)
- [Security Policy](../SECURITY.md)
- [Publication and Confidentiality Policy](policies/publication-and-confidentiality.md)

No production health data, credentials, private exports, contact lists, private correspondence, conduct evidence, security reports, protected provider or interoperability records, private contracts or negotiations, estate records, financial source records, or protected operational information belongs in public project systems.

Use public or synthetic information. A local checkout file is not automatically an approved Forge source. Input passing syntax or size checks is not proof that its contents are appropriate.

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

Ordinary public development must remain credential-free and use public or explicitly synthetic information. A passing test, comprehensive contract, completed workstream, generated fixture, provider claim, agent response, receipt, integrity check, compatibility record, mapping draft, synthetic connector fixture, or sponsor relationship cannot bypass the repository’s authority, privacy, safety, publication, or evidence boundaries.
