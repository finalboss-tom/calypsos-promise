# Calypso’s Promise Documentation

[Repository home](../README.md) · [Vision](../VISION.md) · [Roadmap](../ROADMAP.md) · [Governance](../GOVERNANCE.md) · [Current status](roadmap/current-status.md) · [Pre-Sprint 8 review](roadmap/pre-sprint-8-alignment-review.md) · [Sprint 7 completion](roadmap/sprint-7-completion-record.md) · [Architecture](architecture/README.md) · [Contributing](../CONTRIBUTING.md)

This is the canonical entry point for repository documentation. It should answer four questions quickly:

1. What is Calypso’s Promise ultimately trying to accomplish?
2. Which records are authoritative for the decision being made?
3. What is implemented, accepted, planned, proposed, deferred, or still behind a specialist gate?
4. Where should a contributor make a change without crossing a product, privacy, safety, canon, permission, security, funding, provider, interoperability, workflow, operability, succession, or governance boundary?

## Primary directive

> Build a compelling, trustworthy consumer experience that helps people build, understand, improve, and control their Living Chronicles; return personal value first; enable separately authorized collective benefit; and progressively transfer stewardship as evidence, safeguards, capacity, and legitimacy mature.

The directive is constrained by the player promise:

> **Build your Living Chronicle. Improve your health. Keep the key.**

## Current orientation

1. [Current Project Status](roadmap/current-status.md)
2. [Pre-Sprint 8 Alignment Review](roadmap/pre-sprint-8-alignment-review.md)
3. [Sprint 7 Completion Record](roadmap/sprint-7-completion-record.md)
4. [Sprint 7 Cross-Contract Reconciliation](architecture/forge-sprint-7-cross-contract-reconciliation.md)
5. [Sprint 7 Control and Evidence Map](architecture/forge-sprint-7-control-and-evidence-map.md)
6. [Sprint 7 Specialist Holdpoints and Unresolved Work](architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)
7. [Sprint Roadmap](roadmap/sprints.md)
8. [Sprint 6 Completion Record](roadmap/sprint-6-completion-record.md)
9. [Aster Contract Baseline](product/aster-contract-baseline.md)
10. [Sprint 5 Completion Record](roadmap/sprint-5-completion-record.md)
11. [Security Architecture](security/README.md)
12. [Phase 0 Funding and Sponsorship Baseline](economics/README.md)
13. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](decisions/0010-consumer-first-provider-independent-boundary.md)
14. [Decision 0011 — Operational Simplicity and Durable Workflows](decisions/0011-operational-simplicity-and-durable-workflows.md)
15. [Repository and Module Boundaries](architecture/module-boundaries.md)
16. [Developer Experience and Operability Policy](policies/developer-experience-and-operability.md)
17. [Minimum Viable Validation](policies/minimum-viable-validation.md)
18. [Decision 0009 — Health Data Legacy and Post-Mortem Stewardship](decisions/0009-health-data-legacy-and-post-mortem-stewardship.md) — proposed future boundary

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

Sprints 0–7 are complete and merged.

Sprint 7 — Forge MCP and Agent Safety merged through PR #55 as squash commit `f28f054fe16d550fad37663cf234e06c5622dd42`.

The accepted Forge baseline is one local public/synthetic contributor-tool application with exactly ten tools, allowlisted source provenance, deterministic validation and generation, bounded scopes and receipts, stable errors, runtime integrity, successful-result postconditions, exact compatibility and migrations, static prohibited-capability auditing, provider-independent clean startup, cross-contract reconciliation, control mapping, holdpoints, and a bounded website handoff.

Forge remains non-authoritative and non-production. It is not a private Chronicle service, provider gateway, connector runtime, repository mutation agent, shell, network client, production sandbox, or general agent.

## Active pre-Sprint 8 reconciliation

Issue #58 is the current review ledger. Sprint 8 implementation has not started.

The review confirms that the accepted Sprint 8 goal and sequence remain correct and that no new decision record is needed. It preserves `apps/site` as the single website owner and binds the actual migration requirements for routes, deployment, rollback, cache behavior, security headers, signup privacy, canonical status and funding data, metadata, accessibility, performance, and validation.

The review may repair documentation and planning truth. It may not add Next.js implementation, a duplicate website, CMS, database, account system, private data, providers, connectors, donation checkout, or Sprint 9 behavior.

## Accepted strategic baselines

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

The modular monolith remains the default. Sprint 8 should remain one site application, not a service platform or content infrastructure program.

### Funding and sponsorship

- [Decision 0008](decisions/0008-funding-and-sponsorship-baseline.md)
- [Economics and Public-Good Funding](economics/README.md)
- [Funding Conflict and Acceptance Policy](economics/funding-conflict-and-acceptance-policy.md)
- [Infrastructure Sponsorship and Exit Policy](economics/infrastructure-sponsorship-and-exit-policy.md)

Funding cannot purchase private data, product authority, source rank, provider defaults, connector placement, mapping approval, certification outcomes, favorable findings, roadmap control, governance power, safety exceptions, game progression, or publication control.

## Security and information handling

- [Security Policy](../SECURITY.md)
- [Publication and Confidentiality Policy](policies/publication-and-confidentiality.md)
- [Sprint 5 Specialist Holdpoints](security/sprint-5-specialist-holdpoint-and-evidence-register.md)
- [Sprint 6 Specialist Holdpoints](architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md)
- [Sprint 7 Forge Holdpoints](architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)

No production health data, credentials, private exports, contact lists, private correspondence, conduct evidence, security reports, protected provider or interoperability records, private contracts or negotiations, estate records, financial source records, or protected operational information belong in public project systems.

Use public or synthetic information. A local checkout file is not automatically an approved public source. Input that passes a syntax or size check is not proof that its contents are appropriate.

## Contribute code, content, or documentation

1. [Contributing](../CONTRIBUTING.md)
2. [Development Policy](policies/development.md)
3. [Repository and Module Boundaries](architecture/module-boundaries.md)
4. [Minimum Viable Validation](policies/minimum-viable-validation.md)
5. [Publication and Confidentiality Policy](policies/publication-and-confidentiality.md)
6. [Security Policy](../SECURITY.md)
7. [Governance Baseline](../GOVERNANCE.md)

Ordinary public development must remain credential-free and use public or explicitly synthetic information. A passing test, completed sprint, deployed preview, generated fixture, provider claim, model response, receipt, mapping draft, sponsor relationship, or website statement cannot bypass the repository’s authority, privacy, safety, publication, or evidence boundaries.
