# Roadmap Documentation

[Documentation home](../README.md) · [Institutional roadmap](../../ROADMAP.md) · [Current status](current-status.md) · [Sprint 7 plan](sprint-7-execution-plan.md) · [Forge architecture](../architecture/README.md#forge-mcp-architecture) · [Scopes, limits, receipts, and errors](../architecture/forge-mcp-scopes-limits-receipts-and-errors.md) · [Agent security, compatibility, and operability](../architecture/forge-mcp-agent-security-compatibility-and-operability.md) · [Pre-Sprint 7 review](pre-sprint-7-alignment-review.md) · [Sprint 6 completion](sprint-6-completion-record.md) · [Sprint sequence](sprints.md)

Calypso’s Promise uses two coordinated roadmaps:

- the root [Public Institutional Roadmap](../../ROADMAP.md) defines evidence-gated product, organizational, economic, governance, and founder-independence phases;
- [Sprints](sprints.md) defines the near-term design-to-build sequence and its non-numbered institutional constraints.

Advancement is gate-based rather than calendar-based. A completed sprint or accepted doctrine does not imply that a production capability, financial system, provider integration, workflow runtime, institutional phase, or public claim is live.

## Current orientation

1. [Current Project Status](current-status.md)
2. [Sprint 7 Execution Plan](sprint-7-execution-plan.md)
3. [Forge MCP Boundary and Tool Registry](../architecture/forge-mcp-boundary-and-tool-registry.md)
4. [Forge MCP Local `stdio` Transport](../architecture/forge-mcp-local-stdio-transport.md)
5. [Forge MCP Source Catalogue and Provenance](../architecture/forge-mcp-source-catalogue-and-provenance.md)
6. [Forge MCP Lore and Schema Tools](../architecture/forge-mcp-lore-and-schema-tools.md)
7. [Forge MCP Architecture and Decision Tools](../architecture/forge-mcp-architecture-and-decision-tools.md)
8. [Forge MCP Public Standards, Mapping Drafts, and Synthetic Connector Fixtures](../architecture/forge-mcp-public-standards-mapping-and-synthetic-connectors.md)
9. [Forge MCP Deterministic Synthetic Generation](../architecture/forge-mcp-deterministic-synthetic-generation.md)
10. [Forge MCP Scopes, Limits, Receipts, and Errors](../architecture/forge-mcp-scopes-limits-receipts-and-errors.md)
11. [Forge MCP Agent Security, Compatibility, and Operability](../architecture/forge-mcp-agent-security-compatibility-and-operability.md)
12. [Pre-Sprint 7 Alignment Review](pre-sprint-7-alignment-review.md)
13. [Sprint 6 Completion Record](sprint-6-completion-record.md)
14. [Sprint 6 Cross-Contract Reconciliation](../architecture/aster-sprint-6-cross-contract-reconciliation.md)
15. [Sprint 6 Control and Evidence Map](../architecture/aster-sprint-6-control-and-evidence-map.md)
16. [Sprint 6 Specialist Holdpoints and Unresolved Work](../architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md)
17. [Sprint Sequence](sprints.md)
18. [Pre-Sprint 6 Alignment Review](pre-sprint-6-alignment-review.md)
19. [Decision 0011 — Operational Simplicity and Durable Workflows](../decisions/0011-operational-simplicity-and-durable-workflows.md)
20. [Operational Simplicity and Durable Workflows Workstream](operational-simplicity-workstream.md)
21. [Mission-to-Runtime Traceability](../architecture/mission-to-runtime-traceability.md)
22. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](../decisions/0010-consumer-first-provider-independent-boundary.md)
23. [Consumer-First and Institutional Interoperability Workstream](consumer-first-provider-independent-workstream.md)
24. [Phase 0 Funding and Sponsorship Baseline](../economics/README.md)
25. [Proposed Health Data Legacy Workstream](health-data-legacy-workstream.md)
26. [Sprint 5 Completion Record](sprint-5-completion-record.md)
27. [Security Architecture](../security/README.md)
28. [Public Institutional Roadmap](../../ROADMAP.md)

## Completion records and plans

- [Sprint 1 Completion](sprint-1-completion.md)
- [Sprint 2 Plan](sprint-2-plan.md)
- [Sprint 2 Completion](sprint-2-completion.md)
- [Sprint 3 Plan](sprint-3-plan.md)
- [Sprint 3 Completion Record](sprint-3-completion-record.md)
- [Sprint 4 Plan](sprint-4-plan.md) — complete and merged through PR #33
- [Sprint 4 Completion Record](sprint-4-completion-record.md) — authoritative completion evidence
- [Pre-Sprint 5 Alignment Review](pre-sprint-5-alignment-review.md) — complete and merged through PR #34
- [Sprint 5 Plan](sprint-5-plan.md) — complete and merged through PR #36
- [Sprint 5 Completion Record](sprint-5-completion-record.md) — authoritative merged evidence
- [Phase 0 Funding and Sponsorship Baseline](../economics/README.md) — complete and merged through PR #38
- [Phase 0 Funding Completion Record](../economics/phase-0-funding-completion-record.md) — authoritative completion evidence
- [Decision 0010 and Consumer-First Workstream](consumer-first-provider-independent-workstream.md) — accepted through PR #42; no provider runtime
- [Decision 0011 and Operational Simplicity Workstream](operational-simplicity-workstream.md) — accepted through PR #44; no production workflow runtime
- [Pre-Sprint 6 Alignment Review](pre-sprint-6-alignment-review.md) — complete and merged through PR #46
- [Sprint 6 Execution Plan](sprint-6-execution-plan.md) — complete and merged through PR #48
- [Sprint 6 Completion Record](sprint-6-completion-record.md) — authoritative merged contract and public-synthetic evidence
- [Pre-Sprint 7 Alignment Review](pre-sprint-7-alignment-review.md) — complete and merged through PR #52
- [Sprint 7 Execution Plan](sprint-7-execution-plan.md) — active through issue #54 and draft PR #55; workstreams 7.1–7.9 implemented; 7.10 next
- [Proposed Health Data Legacy Workstream](health-data-legacy-workstream.md) — tracked by issue #39; does not change Sprint 7 order or authorize production

## Current boundary

Sprints 0–6, the funding baseline, Decisions 0010 and 0011, and the pre-Sprint 7 reconciliation are complete and merged.

Sprint 6 merged through PR #48 as squash commit `5aa3540765e5573f3304ce2b624d7a02c3ba2d13`. It establishes the pre-stable provider-independent Aster contract baseline without activating production AI, private egress, identity, persistence, retrieval, memory storage, durable execution, tools, connectors, clinical use, provider selection, or specialist approval.

The pre-Sprint 7 reconciliation merged through PR #52 as squash commit `a41ca5ad9d2c0fe8a009946f376705bb7910e223`.

Sprint 7 — Forge MCP and Agent Safety is active through issue #54 and draft PR #55. Workstreams 7.1–7.9 establish the bounded application, all ten accepted tools, deterministic public and synthetic operations, execution scopes and receipts, runtime integrity, result security postconditions, exact compatibility and migration, clean credential-free startup, provider independence, and the complete public adversarial matrix. Sprint 7.10 completion and Sprint 8 handoff is next.

Issue #50 remains open and trigger-based. Forge has no `@calypsos-promise/aster` dependency or genuine Aster consumer evidence, so the trigger is not active.

The Phase 0 Funding and Sponsorship Baseline does not accept or operate money. Decision 0010 does not activate connectors or clinical partnerships. Decision 0011 does not select a queue, scheduler, event store, persistence model, offline protocol, observability provider, or production topology.

Issue #39 and the proposed legacy documentation remain future institutional capability only and do not change Sprint 7 order.

Institutional Phase 0 remains active pending key-person, succession, founder-reserved-power, economic-dependency, historical-source, branch-protection, DCO, operability, distributed-ownership, specialist-review, Decision 0009, and phase-exit evidence.

## Status rule

The [Current Project Status](current-status.md) is the canonical integrated status record. Update it when a sprint or institutional workstream closes or changes status, a phase gate changes, a material gate gains evidence or an owner, or a capability begins being represented as experimental, implemented, deployed, operating, independently reviewed, or live.
