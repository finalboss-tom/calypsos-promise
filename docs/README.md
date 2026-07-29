# Calypso’s Promise Documentation

[Repository home](../README.md) · [Vision](../VISION.md) · [Institutional roadmap](../ROADMAP.md) · [Governance](../GOVERNANCE.md) · [Current status](roadmap/current-status.md) · [Post-Sprint 8 reconciliation](roadmap/post-sprint-8-reconciliation-and-sprint-9-preparation.md) · [Sprint 9 alignment #64](https://github.com/finalboss-tom/calypsos-promise/issues/64) · [Contributing](../CONTRIBUTING.md)

This is the canonical entry point for repository documentation. It should answer four questions quickly:

1. What is Calypso’s Promise ultimately trying to accomplish?
2. Which records are authoritative for the decision being made?
3. What is implemented, accepted, deployed, planned, proposed, deferred, or still behind a specialist gate?
4. Where should a contributor make a change without crossing a product, privacy, safety, canon, permission, security, funding, provider, interoperability, workflow, operability, succession, newsletter, or governance boundary?

## Primary directive

> Build a compelling, trustworthy consumer experience that helps people build, understand, improve, and control their Living Chronicles; return personal value first; enable separately authorized collective benefit; and progressively transfer stewardship as evidence, safeguards, capacity, and legitimacy mature.

The directive is constrained by the player promise:

> **Build your Living Chronicle. Improve your health. Keep the key.**

## Current orientation

1. [Current Project Status](roadmap/current-status.md)
2. [Post-Sprint 8 Reconciliation and Sprint 9 Preparation](roadmap/post-sprint-8-reconciliation-and-sprint-9-preparation.md)
3. [Pre-Sprint 9 Alignment Issue #64](https://github.com/finalboss-tom/calypsos-promise/issues/64)
4. [Phase 0 Newsletter Gate #63](https://github.com/finalboss-tom/calypsos-promise/issues/63)
5. [Sprint Roadmap](roadmap/sprints.md)
6. [Sprint 8 Completion Record](roadmap/sprint-8-completion-record.md)
7. [Release, Rollback, and Sprint 9 Handoff](roadmap/sprint-8-release-rollback-and-sprint-9-handoff.md)
8. [Public Website Foundation and Migration Boundary](architecture/public-website-foundation-and-migration.md)
9. [Sprint 8 Cross-Contract Reconciliation](architecture/public-site-sprint-8-cross-contract-reconciliation.md)
10. [Sprint 8 Control and Evidence Map](architecture/public-site-sprint-8-control-and-evidence-map.md)
11. [Sprint 8 Holdpoints and Unresolved Work](architecture/public-site-sprint-8-specialist-holdpoint-and-unresolved-work-register.md)
12. [Sprint 7 Completion Record](roadmap/sprint-7-completion-record.md)
13. [Sprint 7 Cross-Contract Reconciliation](architecture/forge-sprint-7-cross-contract-reconciliation.md)
14. [Sprint 7 Control and Evidence Map](architecture/forge-sprint-7-control-and-evidence-map.md)
15. [Sprint 7 Specialist Holdpoints and Unresolved Work](architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)
16. [Sprint 6 Completion Record](roadmap/sprint-6-completion-record.md)
17. [Aster Contract Baseline](product/aster-contract-baseline.md)
18. [Security Architecture](security/README.md)
19. [Phase 0 Funding and Sponsorship Baseline](economics/README.md)
20. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](decisions/0010-consumer-first-provider-independent-boundary.md)
21. [Decision 0011 — Operational Simplicity and Durable Workflows](decisions/0011-operational-simplicity-and-durable-workflows.md)
22. [Repository and Module Boundaries](architecture/module-boundaries.md)
23. [Developer Experience and Operability Policy](policies/developer-experience-and-operability.md)
24. [Minimum Viable Validation](policies/minimum-viable-validation.md)
25. [Decision 0009 — Health Data Legacy and Post-Mortem Stewardship](decisions/0009-health-data-legacy-and-post-mortem-stewardship.md) — proposed future boundary

## Current state

Sprints 0–8 are accepted and merged.

Sprint 8 was squash merged through PR #61 as `20e2c95c96670f0ef6b972c9ebf7b482f7f9cf1a`, deployed through Vercel production deployment `dpl_3V2e76y1fwrR19j1BzUFpo9U9kjp`, and closed through issue #60.

The public Next.js site is live on the canonical domains. Git-triggered deployment is disabled, so repository commits and production releases remain separate attributable actions.

Current work is:

- post-Sprint 8 copy, link, status, validation, and deployment reconciliation;
- Phase 0 newsletter **Path A — preserve and activate** under issue #63, pending merge, production verification, rollback evidence, and acceptance; and
- pre-Sprint 9 alignment under issue #64, with playable implementation not started.

Institutional Phase 0 remains active.

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

Historical sprint plans and completion records retain the status language true at their revision. The current-status and post-merge reconciliation records supersede only their time-sensitive orientation.

## Public website and newsletter boundary

The live public site provides the accepted page family, direct and optional narrative navigation, controlled capability status, source-backed Trust Center and Open Forge explanations, public roadmap and support routes, canonical funding transparency, metadata, security headers, accessibility foundations, and permanent validation.

The site does not create accounts, private Chronicles, production Aster, private MCP, providers, connectors, clinical workflows, research enrollment, donations, payments, or production health-data operation.

The temporary Phase 0 newsletter is a narrow contact list for public project updates. It reuses the existing server-only Google Apps Script and private Google Sheet connection, accepts email plus explicit consent only, and may not become account identity, Chronicle intake, research consent, provider lead generation, fundraising, governance, advertising, profiling, or gameplay eligibility.

Issue #63 remains open until deployed behavior and rollback are verified and accepted. Real subscriber records, webhook URLs, credentials, and protected incidents remain private.

## Sprint 9 boundary

Sprint 9 remains planned and not started.

Issue #64 must resolve application ownership, routes, explicitly synthetic content, temporary-data lifecycle, deterministic state and First Lantern completion, Aster and manual fallback, refusal and exit, accessibility, security, performance, publication, rollback, deployment, and completion evidence before implementation begins.

The public synthetic prologue must work without an account, email, real health data, production model provider, institutional connection, payment, donation, or durable private progression.

## Accepted strategic baselines

### Consumer-first and provider-independent

- [Decision 0010](decisions/0010-consumer-first-provider-independent-boundary.md)
- [Consumer-First and Provider-Independent Architecture](architecture/consumer-first-provider-independent-boundary.md)
- [Consumer-First and Institutional Interoperability Workstream](roadmap/consumer-first-provider-independent-workstream.md)
- [AS-0012 — Consumer-First Continuity](governance/assumption-AS-0012-consumer-first-continuity-value.md)

Providers and institutions are important sources, destinations, and potential partners connected through versioned adapters. They do not become the automatic owner of Chronicle meaning, product authority, roadmap, permissions, mappings, generated evidence, tool outcomes, website status, newsletter contacts, or governance.

### Operational simplicity and durable workflows

- [Decision 0011](decisions/0011-operational-simplicity-and-durable-workflows.md)
- [Operational Simplicity and Durable Workflows Architecture](architecture/operational-simplicity-and-durable-workflows.md)
- [Mission-to-Runtime Traceability](architecture/mission-to-runtime-traceability.md)
- [Developer Experience and Operability Policy](policies/developer-experience-and-operability.md)

The modular monolith remains the default. The public site remains one application, not a service platform, CMS, remote content system, private contact database, or premature shared-package program.

### Funding and sponsorship

- [Decision 0008](decisions/0008-funding-and-sponsorship-baseline.md)
- [Economics and Public-Good Funding](economics/README.md)
- [Funding Conflict and Acceptance Policy](economics/funding-conflict-and-acceptance-policy.md)
- [Infrastructure Sponsorship and Exit Policy](economics/infrastructure-sponsorship-and-exit-policy.md)

Funding cannot purchase private data, product authority, source rank, provider defaults, connector placement, mapping approval, certification outcomes, favorable findings, roadmap control, governance power, safety exceptions, game progression, or publication control.

Website funding views derive from canonical public records or show honest empty states. The newsletter does not create a donor, sponsor, customer, or investor list.

## Security and information handling

- [Security Policy](../SECURITY.md)
- [Publication and Confidentiality Policy](policies/publication-and-confidentiality.md)
- [Sprint 5 Specialist Holdpoints](security/sprint-5-specialist-holdpoint-and-evidence-register.md)

Only public repository records and explicitly synthetic evidence belong in public contributor workflows, website previews, tests, logs, and artifacts. No production health data, credentials, private subscriber records, private provider negotiations, proprietary mappings, protected security findings, or private financial records belong here.

## Status rule

Status follows evidence. A merged contract, passing test, deployment, or subscriber delivery proves only the claims and environment it actually exercises. It does not create independent accessibility, security, privacy, communications, AI-safety, clinical, interoperability, legal, provider, financial, operational, or production-health-data approval.
