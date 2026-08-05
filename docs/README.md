# Calypso’s Promise Documentation

[Repository home](../README.md) · [Vision](../VISION.md) · [Institutional roadmap](../ROADMAP.md) · [Governance](../GOVERNANCE.md) · [Current status](roadmap/current-status.md) · [Contributing](../CONTRIBUTING.md)

This is the canonical entry point for repository documentation. It should answer four questions quickly:

1. What is Calypso’s Promise ultimately trying to accomplish?
2. Which record is authoritative for the decision being made?
3. What is implemented, accepted, deployed, planned, proposed, deferred, or still gated?
4. Where can a contributor make a change without crossing product, privacy, safety, canon, permission, security, funding, provider, workflow, succession, newsletter, Longitudinal Intelligence, or governance boundaries?

## Primary directive

> Build a compelling, trustworthy consumer experience that helps people build, understand, improve, and control their Living Chronicles; return personal value first; enable separately authorized collective benefit; and progressively transfer stewardship as evidence, safeguards, capacity, and legitimacy mature.

The directive is constrained by the player promise:

> **Build your Living Chronicle. Improve your health. Keep the key.**

## Current orientation

1. [Current Project Status](roadmap/current-status.md)
2. [LI-V0 Completion Candidate](roadmap/longitudinal-intelligence-li-v0-completion-record.md)
3. [Pre-Sprint 10 Alignment Review](roadmap/pre-sprint-10-alignment-review.md)
4. [Longitudinal Intelligence Doctrine](architecture/longitudinal-intelligence-doctrine.md)
5. [Longitudinal Intelligence Staged Validation Plan](roadmap/longitudinal-intelligence-validation-plan.md)
6. [LI Evidence Kernel v1](architecture/longitudinal-intelligence-evidence-kernel.v1.schema.json)
7. [LI Protected-Invariant Traceability](architecture/longitudinal-intelligence-li-v0-traceability.md)
8. [LI Holdpoints and Unresolved Work](architecture/longitudinal-intelligence-li-v0-holdpoint-and-unresolved-work-register.md)
9. [LI-V0 Tracking Issue #73](https://github.com/finalboss-tom/calypsos-promise/issues/73)
10. [Pre-Sprint 10 Tracking Issue #75](https://github.com/finalboss-tom/calypsos-promise/issues/75)
11. [Post-Sprint 9 Repository and Production Reconciliation](roadmap/post-sprint-9-reconciliation-and-sprint-10-preparation.md)
12. [Sprint 9 Completion Record](roadmap/sprint-9-completion-record.md)
13. [Sprint 9 Release, Rollback, and Sprint 10 Handoff](roadmap/sprint-9-release-rollback-and-sprint-10-handoff.md)
14. [Phase 0 Newsletter Gate #63](https://github.com/finalboss-tom/calypsos-promise/issues/63)
15. [Sprint Roadmap](roadmap/sprints.md)
16. [Architecture Index](architecture/README.md)
17. [Security Architecture](security/README.md)
18. [Funding and Sponsorship Baseline](economics/README.md)
19. [Repository and Module Boundaries](architecture/module-boundaries.md)

## Current state

Sprints 0–9, the post-Sprint 9 repository and production reconciliation, and the Longitudinal Intelligence doctrine and staged validation baseline are accepted and merged.

Accepted Longitudinal Intelligence revisions include:

- doctrine substantive baseline `58d32608f9e3b337478b91a508af0963ef255502`;
- doctrine formatting normalization `6e714238a80d4b965d1bb827b4fd3662c91195c1`; and
- staged validation integration `6b89b1435d4bfc00ba93262fa197b69d8ea23fd7`.

LI-V0 closure and the mandatory pre-Sprint 10 alignment review are implemented as a candidate on `agent/li-v0-closure-and-pre-sprint-10-alignment` under issues #73 and #75. Founding-steward acceptance remains pending.

LI-V1 through LI-V8 remain inactive. Sprint 10 remains planned and not started.

Sprint 9 was squash merged through PR #68 as `b22c32ad8f40610dc95a5b49a745da5adb9c1341`, closed through issue #67, and production hosted through deployment `dpl_CynKp4xKd3KK5BcMuRjmiZv96Aj6`.

The live `/prologue` route remains `noindex, nofollow`, absent from public navigation and the sitemap, public and explicitly synthetic, no-account, memory-only, and non-authoritative. Git-triggered deployment remains disabled for every branch.

Institutional Phase 0 remains active. Newsletter gate #63, specialist review, succession and key-person controls, distributed ownership, whole-architecture audits, Longitudinal Intelligence later-stage evidence, and explicit Phase 0 exit remain open.

## Authority and conflict order

When records appear to conflict, use this order and open a decision record rather than silently choosing a convenient interpretation:

1. Frozen product, architecture, world, gameplay, and institutional commitments
2. Accepted decision records and accepted cross-cutting doctrine
3. Governance, public roadmap, security, publication, economics, development, and cross-cutting policies
4. Versioned architecture, product, data, content, security, and operating baselines
5. Sprint plans, completion records, implementation notes, and current-status records
6. Public campaign materials and time-sensitive experiments

A lower layer may implement or explain a higher layer. It may not quietly override it.

Historical sprint plans, candidate records, pull-request descriptions, and completion records retain the status language true at their revision. Current status and accepted post-merge reconciliation supersede only their time-sensitive orientation.

## Mission and non-negotiable boundaries

Read in this order:

1. [Product Constitution](frozen/product-constitution.md)
2. [Vision and Institutional Mandate](../VISION.md)
3. [Architecture Foundation](frozen/architecture.md)
4. [World and Lore Canon](frozen/world-and-lore-canon.md)
5. [Gameplay Foundation](product/gameplay-foundation.md)
6. [Longitudinal Intelligence Doctrine](architecture/longitudinal-intelligence-doctrine.md)
7. [Public Institutional Roadmap](../ROADMAP.md)
8. [Governance Baseline](../GOVERNANCE.md)

These records protect personal value first, meaningful refusal, non-punitive return, deterministic authority, private health data, provider replaceability, progressive decentralization, and the rule that AI proposes while people and domain services control authoritative changes.

## Current product boundaries

### Public website and prologue

The live site provides the accepted public page family, bounded newsletter, and production-hosted public synthetic prologue.

The prologue creates no account, private Chronicle, House of Keys permission, production Aster, real health or voice capture, provider connection, analytics, research enrollment, payment, causal health result, or durable state.

### Longitudinal Intelligence

The accepted doctrine is architecture authority only. The LI-V0 candidate adds machine-readable evidence, traceability, holdpoints, and validation without activating later stages.

No current repository state authorizes production measurement, descriptive analysis over private Chronicles, personal experimentation, “what works for you” claims, diagnosis, treatment, medication changes, clinical decision support, or research enrollment.

### Pre-Sprint 10 alignment

The candidate review recommends `AUTHORIZED WITH NAMED HOLDPOINTS` for one public/synthetic universal shell:

- proposed application owner: `apps/game`;
- continuing public site and prologue owner: `apps/site`;
- proposed shared content owner: `packages/game-content`;
- no generic shared UI package without a second real consumer;
- no client-authoritative progression, permission, Chronicle truth, LI claim, or reward;
- no production authentication, analytics, private data, app-store release, or LI-V1 through LI-V8; and
- explicit accessibility, offline, release, rollback, monitoring, incident, and provider-replacement boundaries.

Sprint 10 remains blocked until the candidate is accepted and squash merged.

### Newsletter

The newsletter is a separate narrow Phase 0 contact surface. It accepts email plus explicit consent only and cannot become product identity, Chronicle intake, research consent, provider lead generation, fundraising, governance, advertising, profiling, or gameplay eligibility.

## Accepted strategic baselines

- [Longitudinal Intelligence Doctrine](architecture/longitudinal-intelligence-doctrine.md)
- [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](decisions/0010-consumer-first-provider-independent-boundary.md)
- [Decision 0011 — Operational Simplicity and Durable Workflows](decisions/0011-operational-simplicity-and-durable-workflows.md)
- [Decision 0008 — Funding and Sponsorship Baseline](decisions/0008-funding-and-sponsorship-baseline.md)
- [Developer Experience and Operability Policy](policies/developer-experience-and-operability.md)
- [Minimum Viable Validation](policies/minimum-viable-validation.md)

Provider, queue, scheduler, model, storage, analytics, observability, CMS, and infrastructure choices remain replaceable adapters rather than domain authority. Funding cannot purchase private data, product authority, source rank, provider defaults, roadmap control, favorable findings, safety exceptions, progression, or publication control.

## Security and information handling

- [Security Policy](../SECURITY.md)
- [Publication and Confidentiality Policy](policies/publication-and-confidentiality.md)
- [Sprint 5 Specialist Holdpoints](security/sprint-5-specialist-holdpoint-and-evidence-register.md)

Only public repository records and explicitly synthetic evidence belong in public contributor workflows, website previews, tests, logs, and artifacts. Production health data, credentials, subscriber records, private provider negotiations, proprietary mappings, protected security findings, private participant records, real personal experiments, and private financial records do not belong here.

## Status rule

Status follows evidence. A doctrine, schema, fixture, merged contract, passing test, simulation, preview, deployment, subscriber delivery, production route, study, or model result proves only the claims and environment it actually exercises. It does not create independent accessibility, security, privacy, communications, AI-safety, clinical, interoperability, legal, provider, financial, operational, research, institutional, causal-inference, or production-health-data approval.
