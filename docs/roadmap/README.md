# Roadmap Documentation

[Documentation home](../README.md) · [Institutional roadmap](../../ROADMAP.md) · [Current status](current-status.md) · [Sprint 8 plan](sprint-8-execution-plan.md) · [Workstream 8.2 record](sprint-8-workstream-8-2-record.md) · [Pre-Sprint 8 review](pre-sprint-8-alignment-review.md) · [Sprint sequence](sprints.md)

Calypso’s Promise uses two coordinated roadmaps:

- the root [Public Institutional Roadmap](../../ROADMAP.md) defines evidence-gated product, organizational, economic, governance, and founder-independence phases;
- [Sprints](sprints.md) defines the near-term design-to-build sequence and its non-numbered institutional constraints.

Advancement is gate-based rather than calendar-based. A completed workstream does not imply that a production capability, financial system, provider integration, workflow runtime, institutional phase, preview, official deployment, or public claim is live.

## Current orientation

1. [Current Project Status](current-status.md)
2. [Sprint 8 Execution Plan](sprint-8-execution-plan.md)
3. [Sprint 8.2 Next.js Shell Record](sprint-8-workstream-8-2-record.md)
4. [Sprint 8.1 Boundary Record](sprint-8-workstream-8-1-record.md)
5. [Public Website Foundation and Migration Boundary](../architecture/public-website-foundation-and-migration.md)
6. [Pre-Sprint 8 Alignment Review](pre-sprint-8-alignment-review.md)
7. [Sprint Sequence](sprints.md)
8. [Sprint 7 Completion Record](sprint-7-completion-record.md)
9. [Sprint 7 Cross-Contract Reconciliation](../architecture/forge-sprint-7-cross-contract-reconciliation.md)
10. [Sprint 7 Specialist Holdpoints and Unresolved Work](../architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)
11. [Sprint 6 Completion Record](sprint-6-completion-record.md)
12. [Decision 0011 — Operational Simplicity and Durable Workflows](../decisions/0011-operational-simplicity-and-durable-workflows.md)
13. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](../decisions/0010-consumer-first-provider-independent-boundary.md)
14. [Phase 0 Funding and Sponsorship Baseline](../economics/README.md)
15. [Security Architecture](../security/README.md)
16. [Public Institutional Roadmap](../../ROADMAP.md)

## Completion records and plans

- [Sprint 1 Completion](sprint-1-completion.md)
- [Sprint 2 Plan](sprint-2-plan.md)
- [Sprint 2 Completion](sprint-2-completion.md)
- [Sprint 3 Plan](sprint-3-plan.md)
- [Sprint 3 Completion Record](sprint-3-completion-record.md)
- [Sprint 4 Plan](sprint-4-plan.md) — complete and merged through PR #33
- [Sprint 4 Completion Record](sprint-4-completion-record.md)
- [Pre-Sprint 5 Alignment Review](pre-sprint-5-alignment-review.md) — merged through PR #34
- [Sprint 5 Plan](sprint-5-plan.md) — merged through PR #36
- [Sprint 5 Completion Record](sprint-5-completion-record.md)
- [Phase 0 Funding Completion Record](../economics/phase-0-funding-completion-record.md) — merged through PR #38
- [Consumer-First and Provider-Independent Workstream](consumer-first-provider-independent-workstream.md) — accepted through PR #42
- [Operational Simplicity Workstream](operational-simplicity-workstream.md) — accepted through PR #44
- [Pre-Sprint 6 Alignment Review](pre-sprint-6-alignment-review.md) — merged through PR #46
- [Sprint 6 Completion Record](sprint-6-completion-record.md) — merged through PR #48
- [Pre-Sprint 7 Alignment Review](pre-sprint-7-alignment-review.md) — merged through PR #52
- [Sprint 7 Execution Plan](sprint-7-execution-plan.md) — complete and merged through PR #55
- [Sprint 7 Completion Record](sprint-7-completion-record.md) — authoritative local public/synthetic Forge evidence
- [Pre-Sprint 8 Alignment Review](pre-sprint-8-alignment-review.md) — accepted through reconciliation PR #59
- [Pre-Sprint 8 Reconciliation Validation](pre-sprint-8-reconciliation-validation.md) — validated opening baseline
- [Sprint 8 Execution Plan](sprint-8-execution-plan.md) — active through issue #60 and draft PR #61
- [Sprint 8.1 Record](sprint-8-workstream-8-1-record.md) — validated website application boundary
- [Sprint 8.2 Record](sprint-8-workstream-8-2-record.md) — validated Next.js compatibility shell
- [Proposed Health Data Legacy Workstream](health-data-legacy-workstream.md) — tracked by issue #39; does not change numbered sprint order or authorize production

## Active Sprint 8 boundary

Sprints 0–7 and the pre-Sprint 8 reconciliation are complete and merged. Sprint 8 is active.

Workstream 8.1 established the single-site, route, authority, server-rendering, security, cache, signup, deployment, rollback, accessibility, performance, metadata, and validation boundary.

Workstream 8.2 established the pinned Next.js App Router compatibility shell with exact lockfile evidence, preserved route contracts, paused signup, application-local design tokens, metadata routes, CSP and security headers, mutable public-asset caching, shell validation, and continued disabled Git-triggered deployment.

The exact 8.2 implementation head `8c757e9482e616db7c86689a1d1d9c99d70ca6cd` passed CI run 957 and DCO Attestation run 1034.

Workstream 8.3 is next. It owns shared navigation, optional narrative entry, reusable status primitives, semantic and keyboard foundations, reduced motion, image-failure behavior, low-bandwidth behavior, and server-rendered essential-information parity.

Issue #50 remains open and trigger-based. The current website shell does not import or exercise the Aster package, so the Aster ergonomics trigger remains inactive.

Institutional Phase 0 remains active pending key-person, succession, founder-reserved-power, economic-dependency, historical-source, branch-protection, DCO, operability, distributed-ownership, specialist-review, Decision 0009, human-readable and machine-readable architecture audit, and phase-exit evidence.

## Status rule

The [Current Project Status](current-status.md) is the canonical integrated status record. Update it when a sprint or institutional workstream changes status, a phase gate changes, a material gate gains evidence or an owner, or a capability begins being represented as experimental, implemented, deployed, operating, independently reviewed, or live.
