# Calypso’s Promise Documentation

[Repository home](../README.md) · [Vision](../VISION.md) · [Roadmap](../ROADMAP.md) · [Governance](../GOVERNANCE.md) · [Current status](roadmap/current-status.md) · [Sprint 8 plan](roadmap/sprint-8-execution-plan.md) · [Workstream 8.6 record](roadmap/sprint-8-workstream-8-6-record.md) · [Website architecture](architecture/public-website-foundation-and-migration.md) · [Contributing](../CONTRIBUTING.md)

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
2. [Sprint 8 Execution Plan](roadmap/sprint-8-execution-plan.md)
3. [Sprint 8.6 Trust Center and Open Forge Record](roadmap/sprint-8-workstream-8-6-record.md)
4. [Sprint 8.5 Laws, Experience, Interoperability, and Aster Record](roadmap/sprint-8-workstream-8-5-record.md)
5. [Sprint 8.4 Homepage and Promise Record](roadmap/sprint-8-workstream-8-4-record.md)
6. [Sprint 8.3 Navigation, Status, and Accessibility Record](roadmap/sprint-8-workstream-8-3-record.md)
7. [Sprint 8.2 Next.js Shell Record](roadmap/sprint-8-workstream-8-2-record.md)
8. [Sprint 8.1 Boundary Record](roadmap/sprint-8-workstream-8-1-record.md)
9. [Public Website Foundation and Migration Boundary](architecture/public-website-foundation-and-migration.md)
10. [Pre-Sprint 8 Alignment Review](roadmap/pre-sprint-8-alignment-review.md)
11. [Sprint Roadmap](roadmap/sprints.md)
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

## Active Sprint 8 boundary

Sprints 0–7 and the pre-Sprint 8 repository reconciliation are complete and merged.

Sprint 8 — Public Website Foundation is active through issue #60 and draft PR #61. Workstreams 8.1 through 8.6 are complete; workstream 8.7 is next.

The public site now provides:

- one pinned Next.js App Router application;
- a migrated cinematic homepage and dedicated `/promise` route;
- `/laws`, `/how-it-works`, `/consumer-first`, `/aster`, `/trust`, and `/forge` source-backed routes;
- direct and optional narrative navigation parity;
- controlled evidence statuses with canonical source links;
- server-rendered essential information;
- skip links, landmarks, keyboard and visible-focus foundations;
- reduced-motion, reduced-data, image-failure, contrast, forced-colors, and responsive behavior;
- paused signup without intake or forwarding;
- nonce CSP and public security headers; and
- focused production-build and repository validation evidence.

The 8.6 focused candidate `e43d0a47186041599674f6608455752a4e3b7319` passed formatting, the production site build, site lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.

Workstream 8.7 is next. It owns roadmap, capability-status, support, and canonical funding-transparency views while preserving frozen authority, canonical sources, funding neutrality, server-rendering, accessibility and resilience controls, paused signup, disabled deployment, and permanent non-scope.

The site is not a preview deployment, official release, canonical roadmap or funding view, final signup system, accessibility certification, performance release, or private product capability.

## Accepted strategic baselines

### Consumer-first and provider-independent

- [Decision 0010](decisions/0010-consumer-first-provider-independent-boundary.md)
- [Consumer-First and Provider-Independent Architecture](architecture/consumer-first-provider-independent-boundary.md)
- [Consumer-First and Institutional Interoperability Workstream](roadmap/consumer-first-provider-independent-workstream.md)
- [AS-0012 — Consumer-First Continuity](governance/assumption-AS-0012-consumer-first-continuity-value.md)

Providers and institutions are important sources, destinations, and potential partners connected through versioned adapters. They do not become the automatic owner of Chronicle meaning, product authority, roadmap, permissions, mappings, generated evidence, tool outcomes, website status, or governance.

### Operational simplicity and durable workflows

- [Decision 0011](decisions/0011-operational-simplicity-and-durable-workflows.md)
- [Operational Simplicity and Durable Workflows Architecture](architecture/operational-simplicity-and-durable-workflows.md)
- [Mission-to-Runtime Traceability](architecture/mission-to-runtime-traceability.md)
- [Developer Experience and Operability Policy](policies/developer-experience-and-operability.md)

The modular monolith remains the default. Sprint 8 remains one site application, not a service platform, CMS, database, remote content system, or new shared package program.

### Funding and sponsorship

- [Decision 0008](decisions/0008-funding-and-sponsorship-baseline.md)
- [Economics and Public-Good Funding](economics/README.md)
- [Funding Conflict and Acceptance Policy](economics/funding-conflict-and-acceptance-policy.md)
- [Infrastructure Sponsorship and Exit Policy](economics/infrastructure-sponsorship-and-exit-policy.md)

Funding cannot purchase private data, product authority, source rank, provider defaults, connector placement, mapping approval, certification outcomes, favorable findings, roadmap control, governance power, safety exceptions, game progression, or publication control.

Website funding views must derive from canonical public records or show honest empty states. They cannot become an independent sponsor model or activate transactions.

## Security and information handling

- [Security Policy](../SECURITY.md)
- [Publication and Confidentiality Policy](policies/publication-and-confidentiality.md)
- [Sprint 5 Specialist Holdpoints](security/sprint-5-specialist-holdpoint-and-evidence-register.md)

Only public repository records and explicitly synthetic evidence belong in public contributor workflows, website previews, tests, logs, and artifacts. No production health data, credentials, private signup records, private provider negotiations, proprietary mappings, protected security findings, or private financial records belong here.

## Status rule

Status follows evidence. A merged contract, passing test, preview, or deployment proves only the claims and environment it actually exercises. It does not create independent accessibility, security, privacy, AI-safety, clinical, interoperability, legal, provider, financial, operational, or production-health-data approval.
