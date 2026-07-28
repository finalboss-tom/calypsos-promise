# Roadmap Documentation

[Documentation home](../README.md) · [Institutional roadmap](../../ROADMAP.md) · [Current status](current-status.md) · [Pre-Sprint 8 review](pre-sprint-8-alignment-review.md) · [Sprint 7 completion](sprint-7-completion-record.md) · [Sprint sequence](sprints.md)

Calypso’s Promise uses two coordinated roadmaps:

- the root [Public Institutional Roadmap](../../ROADMAP.md) defines evidence-gated product, organizational, economic, governance, and founder-independence phases;
- [Sprints](sprints.md) defines the near-term design-to-build sequence and its non-numbered institutional constraints.

Advancement is gate-based rather than calendar-based. A completed sprint or accepted doctrine does not imply that a production capability, financial system, provider integration, workflow runtime, institutional phase, or public claim is live.

## Current orientation

1. [Current Project Status](current-status.md)
2. [Pre-Sprint 8 Alignment Review](pre-sprint-8-alignment-review.md)
3. [Sprint 7 Completion Record](sprint-7-completion-record.md)
4. [Sprint 7 Cross-Contract Reconciliation](../architecture/forge-sprint-7-cross-contract-reconciliation.md)
5. [Sprint 7 Control and Evidence Map](../architecture/forge-sprint-7-control-and-evidence-map.md)
6. [Sprint 7 Specialist Holdpoints and Unresolved Work](../architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)
7. [Sprint Sequence](sprints.md)
8. [Sprint 6 Completion Record](sprint-6-completion-record.md)
9. [Decision 0011 — Operational Simplicity and Durable Workflows](../decisions/0011-operational-simplicity-and-durable-workflows.md)
10. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](../decisions/0010-consumer-first-provider-independent-boundary.md)
11. [Phase 0 Funding and Sponsorship Baseline](../economics/README.md)
12. [Security Architecture](../security/README.md)
13. [Public Institutional Roadmap](../../ROADMAP.md)

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
- [Pre-Sprint 8 Alignment Review](pre-sprint-8-alignment-review.md) — active post-merge reconciliation through issue #58
- [Proposed Health Data Legacy Workstream](health-data-legacy-workstream.md) — tracked by issue #39; does not change numbered sprint order or authorize production

## Current boundary

Sprints 0–7 are complete and merged. Sprint 7 merged as `f28f054fe16d550fad37663cf234e06c5622dd42`.

Issue #58 is reconciling the merged repository before Sprint 8 begins. It confirms that Sprint 8 remains the correct next numbered sprint and that no decision record or scope change is required.

The reconciliation preserves `apps/site` as the single public website owner and binds the in-place migration requirements for routes, deployment, cutover, rollback, caching, security headers, signup privacy, canonical status and funding data, metadata, accessibility, performance, and validation.

Sprint 8 implementation has not started. No Next.js code, duplicate site, CMS, database, account system, private-data path, provider runtime, connector, donation checkout, or Sprint 9 prologue belongs in the reconciliation.

Issue #50 remains open and trigger-based. Forge has no `@calypsos-promise/aster` dependency or genuine Aster consumer evidence, so the trigger remains inactive.

Institutional Phase 0 remains active pending key-person, succession, founder-reserved-power, economic-dependency, historical-source, branch-protection, DCO, operability, distributed-ownership, specialist-review, Decision 0009, human-readable and machine-readable architecture audit, and phase-exit evidence.

## Status rule

The [Current Project Status](current-status.md) is the canonical integrated status record. Update it when a sprint or institutional workstream closes or changes status, a phase gate changes, a material gate gains evidence or an owner, or a capability begins being represented as experimental, implemented, deployed, operating, independently reviewed, or live.