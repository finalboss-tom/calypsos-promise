# Roadmap Documentation

[Documentation home](../README.md) · [Institutional roadmap](../../ROADMAP.md) · [Current status](current-status.md) · [Pre-Sprint 6 review](pre-sprint-6-alignment-review.md) · [Funding baseline](../economics/README.md) · [Consumer-first workstream](consumer-first-provider-independent-workstream.md) · [Operational simplicity workstream](operational-simplicity-workstream.md) · [Sprint 5 completion](sprint-5-completion-record.md) · [Sprint sequence](sprints.md)

Calypso’s Promise uses two coordinated roadmaps:

- the root [Public Institutional Roadmap](../../ROADMAP.md) defines evidence-gated product, organizational, economic, governance, and founder-independence phases
- [Sprints](sprints.md) defines the near-term design-to-build sequence and its non-numbered institutional constraints

Advancement is gate-based rather than calendar-based. A completed design sprint or accepted institutional doctrine does not imply that a production capability, financial system, provider integration, workflow runtime, institutional phase, or public claim is live.

## Current orientation

1. [Current Project Status](current-status.md)
2. [Pre-Sprint 6 Alignment Review](pre-sprint-6-alignment-review.md)
3. [Sprint Sequence](sprints.md)
4. [Decision 0011 — Operational Simplicity and Durable Workflows](../decisions/0011-operational-simplicity-and-durable-workflows.md)
5. [Operational Simplicity and Durable Workflows Workstream](operational-simplicity-workstream.md)
6. [Operational Simplicity Repository Reconciliation](operational-simplicity-reconciliation.md)
7. [Operational Architecture](../architecture/operational-simplicity-and-durable-workflows.md)
8. [Mission-to-Runtime Traceability](../architecture/mission-to-runtime-traceability.md)
9. [Developer Experience and Operability Policy](../policies/developer-experience-and-operability.md)
10. [AS-0013 — Operational Simplicity Can Support Durable Personal Value](../governance/assumption-AS-0013-operational-simplicity-durable-value.md)
11. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](../decisions/0010-consumer-first-provider-independent-boundary.md)
12. [Consumer-First and Institutional Interoperability Workstream](consumer-first-provider-independent-workstream.md)
13. [Consumer-First and Provider-Independent Architecture](../architecture/consumer-first-provider-independent-boundary.md)
14. [AS-0012 — Consumer-First Continuity Can Create Durable Personal Value](../governance/assumption-AS-0012-consumer-first-continuity-value.md)
15. [Phase 0 Funding and Sponsorship Baseline](../economics/README.md)
16. [Funding Completion Record](../economics/phase-0-funding-completion-record.md)
17. [Proposed Health Data Legacy Workstream](health-data-legacy-workstream.md)
18. [Decision 0009 — Health Data Legacy and Post-Mortem Stewardship](../decisions/0009-health-data-legacy-and-post-mortem-stewardship.md)
19. [Health Data Legacy and Succession Architecture](../architecture/health-data-legacy-and-succession.md)
20. [Sprint 5 Completion Record](sprint-5-completion-record.md)
21. [Security Architecture](../security/README.md)
22. [Public Institutional Roadmap](../../ROADMAP.md)
23. [Sprint 5 Plan](sprint-5-plan.md)
24. [Pre-Sprint 5 Alignment Review](pre-sprint-5-alignment-review.md)
25. [Sprint 4 Completion Record](sprint-4-completion-record.md)

## Completion records and plans

- [Sprint 1 Completion](sprint-1-completion.md)
- [Sprint 2 Plan](sprint-2-plan.md)
- [Sprint 2 Completion](sprint-2-completion.md)
- [Sprint 2 Consistency Cleanup](sprint-2-consistency-cleanup.md)
- [Sprint 3 Plan](sprint-3-plan.md)
- [Sprint 3 Completion Record](sprint-3-completion-record.md)
- [Sprint 4 Plan](sprint-4-plan.md) — complete and merged through PR #33
- [Sprint 4 Completion Record](sprint-4-completion-record.md) — authoritative completion evidence
- [Pre-Sprint 5 Alignment Review](pre-sprint-5-alignment-review.md) — complete and merged through PR #34
- [Sprint 5 Plan](sprint-5-plan.md) — complete and merged through PR #36
- [Sprint 5 Completion Record](sprint-5-completion-record.md) — authoritative merged evidence
- [Phase 0 Funding and Sponsorship Baseline](../economics/README.md) — complete and merged through PR #38
- [Phase 0 Funding Completion Record](../economics/phase-0-funding-completion-record.md) — authoritative completion evidence and original-plan reconciliation
- [Decision 0010 and Consumer-First Workstream](consumer-first-provider-independent-workstream.md) — accepted cross-phase boundary through PR #42; no provider runtime
- [Decision 0011 and Operational Simplicity Workstream](operational-simplicity-workstream.md) — accepted cross-phase boundary through PR #44; no production workflow runtime
- [Pre-Sprint 6 Alignment Review](pre-sprint-6-alignment-review.md) — repository-wide reconciliation and Sprint 6 handoff tracked by issue #45
- [Proposed Health Data Legacy Workstream](health-data-legacy-workstream.md) — future cross-phase capability tracked by issue #39; does not change Sprint 6 order or authorize production

## Current boundary

The Phase 0 Funding and Sponsorship Baseline merged through PR #38 as squash commit `32ac27bfb35ed64f34c64108a5d54c375d429593`. It establishes Decision 0008, economics policies, canonical empty live registers, five fictional relationship records, six fictional opportunity records, sixteen fictional design tabletops, and funding-register validation.

The funding workstream does not accept or operate money. It does not establish a recipient, entity, fiscal sponsor, bank, payment processor, accounting system, tax or charitable status, treasury, compensation system, affiliate program, investment instrument, research-funding program, provider, or production financial control.

PR #42 accepted the consumer-first and provider-independent boundary through squash commit `188a6409de9bfc967fdb0f46bc08eb35ddfd6f9c`. It defines a provider-independent product center, standards-at-the-edges architecture, Sprint 14 connector inheritance, funding and sponsorship conflicts, and later clinical and enterprise partnership gates. It does not select a standard, activate a connector, prohibit future institutional collaboration, authorize clinical use, or validate the consumer-first thesis.

PR #44 accepted the operational-simplicity boundary through squash commit `43fb01894639e7484ab1553428e1381a0f51b32c`. It defines a modular-monolith default, responsive and deferred workflow boundaries, durable operation contracts, local simulation, developer operability, and evidence-gated service extraction. It does not select a queue, scheduler, event store, persistence model, offline protocol, observability provider, or production topology and does not claim measured performance or reliability.

Sprint 6 — Aster contracts and AI governance is the next numbered design-to-build boundary after the pre-Sprint 6 reconciliation merges. Sprint 6 inherits the merged Sprint 5 security constraints, Decision 0008’s provider-neutrality and funding-conflict boundaries, Decision 0010’s source-attribution and non-canonical provider boundary, and Decision 0011’s responsive/deferred, fallback, stale-result, and local-simulation contracts.

Issue #39 and the proposed legacy documentation define a later institutional capability for a person’s revocable Legacy Directive, incapacity and post-mortem stewardship, contested authority, family-health derivatives, research, archives, deletion, and platform succession. They do not activate the capability, change Sprint 6, or represent a universal will, property right, executor override, or legal conclusion.

The remaining institutional Phase 0 work includes key-person dependency, succession and emergency ownership, founder-reserved powers, historical governance-source recovery, branch-protection evidence, commit-level DCO transition, the factual founder-subsidy and economic-dependency register, clean-machine and second-operator measurements, a future distributed ownership plan, explicit disposition of proposed Decision 0009, named specialist-review strategy, and the explicit Phase 0 exit review.

## Status rule

The [Current Project Status](current-status.md) is the canonical integrated status record. Update it when a sprint or institutional workstream closes or changes status, a phase gate changes, a frozen or accepted decision alters the system, a material gate gains evidence or an owner, or a capability begins being represented as experimental, implemented, deployed, operating, independently reviewed, or live.