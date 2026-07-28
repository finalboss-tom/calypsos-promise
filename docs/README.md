# Calypso’s Promise Documentation

[Repository home](../README.md) · [Vision](../VISION.md) · [Roadmap](../ROADMAP.md) · [Governance](../GOVERNANCE.md) · [Current status](roadmap/current-status.md) · [Sprint 8 plan](roadmap/sprint-8-execution-plan.md) · [Workstream 8.3 record](roadmap/sprint-8-workstream-8-3-record.md) · [Website architecture](architecture/public-website-foundation-and-migration.md) · [Contributing](../CONTRIBUTING.md)

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
3. [Sprint 8.3 Navigation, Status, and Accessibility Record](roadmap/sprint-8-workstream-8-3-record.md)
4. [Sprint 8.2 Next.js Shell Record](roadmap/sprint-8-workstream-8-2-record.md)
5. [Sprint 8.1 Boundary Record](roadmap/sprint-8-workstream-8-1-record.md)
6. [Public Website Foundation and Migration Boundary](architecture/public-website-foundation-and-migration.md)
7. [Pre-Sprint 8 Alignment Review](roadmap/pre-sprint-8-alignment-review.md)
8. [Sprint Roadmap](roadmap/sprints.md)
9. [Sprint 7 Completion Record](roadmap/sprint-7-completion-record.md)
10. [Sprint 7 Cross-Contract Reconciliation](architecture/forge-sprint-7-cross-contract-reconciliation.md)
11. [Sprint 7 Control and Evidence Map](architecture/forge-sprint-7-control-and-evidence-map.md)
12. [Sprint 7 Specialist Holdpoints and Unresolved Work](architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)
13. [Sprint 6 Completion Record](roadmap/sprint-6-completion-record.md)
14. [Aster Contract Baseline](product/aster-contract-baseline.md)
15. [Security Architecture](security/README.md)
16. [Phase 0 Funding and Sponsorship Baseline](economics/README.md)
17. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](decisions/0010-consumer-first-provider-independent-boundary.md)
18. [Decision 0011 — Operational Simplicity and Durable Workflows](decisions/0011-operational-simplicity-and-durable-workflows.md)
19. [Repository and Module Boundaries](architecture/module-boundaries.md)
20. [Developer Experience and Operability Policy](policies/developer-experience-and-operability.md)
21. [Minimum Viable Validation](policies/minimum-viable-validation.md)
22. [Decision 0009 — Health Data Legacy and Post-Mortem Stewardship](decisions/0009-health-data-legacy-and-post-mortem-stewardship.md) — proposed future boundary

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

Sprint 8 — Public Website Foundation is active through issue #60 and draft PR #61.

Workstream 8.1 established the website application, route, authority, rendering, security, cache, signup, deployment, rollback, accessibility, performance, metadata, validation, and non-scope boundary.

Workstream 8.2 migrated the public site to one pinned Next.js App Router compatibility shell with exact lockfile evidence, preserved routes, paused signup, application-local design tokens, metadata routes, CSP and security headers, mutable public-asset caching, shell validation, and continued disabled Git-triggered deployment.

Workstream 8.3 established:

- direct navigation and an optional narrative path reaching the same essential destinations;
- skip links, semantic landmarks, keyboard access, and visible focus;
- controlled `live`, `experimental`, `planned`, and `long-horizon` status primitives;
- stable capability IDs and canonical source links;
- server-rendered essential information without a client-component dependency;
- reduced-motion, reduced-data, image-failure, contrast, forced-colors, and responsive foundations; and
- deterministic validation and focused tests.

The validated 8.3 head `2ff9fd966cd7d00bf846ed63147584cadd437d6b` passed CI 986 and DCO 1064.

Workstream 8.4 is next. It owns the final cinematic homepage and Promise migration while preserving the validated navigation, evidence-status, and accessibility foundations.

The site is not a preview deployment, official release, final multi-page website, final signup system, accessibility certification, performance release, or private product capability.

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

Status follows evidence. A merged contract, passing test, preview, or deployment proves only the claims and environment it actually exercises. It does not create independent accessibility, security, privacy, clinical, legal, provider, financial, operational, or production-health-data approval.
