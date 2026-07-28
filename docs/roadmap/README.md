# Roadmap Documentation

[Documentation home](../README.md) · [Institutional roadmap](../../ROADMAP.md) · [Current status](current-status.md) · [Sprint 7 plan](sprint-7-execution-plan.md) · [Forge boundary](../architecture/forge-mcp-boundary-and-tool-registry.md) · [Local transport](../architecture/forge-mcp-local-stdio-transport.md) · [Source catalogue](../architecture/forge-mcp-source-catalogue-and-provenance.md) · [Lore and schema tools](../architecture/forge-mcp-lore-and-schema-tools.md) · [Architecture and decision tools](../architecture/forge-mcp-architecture-and-decision-tools.md) · [Pre-Sprint 7 review](pre-sprint-7-alignment-review.md) · [Sprint 6 completion](sprint-6-completion-record.md) · [Sprint sequence](sprints.md)

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
8. [Pre-Sprint 7 Alignment Review](pre-sprint-7-alignment-review.md)
9. [Sprint 6 Completion Record](sprint-6-completion-record.md)
10. [Sprint 6 Cross-Contract Reconciliation](../architecture/aster-sprint-6-cross-contract-reconciliation.md)
11. [Sprint 6 Control and Evidence Map](../architecture/aster-sprint-6-control-and-evidence-map.md)
12. [Sprint 6 Specialist Holdpoints and Unresolved Work](../architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md)
13. [Sprint Sequence](sprints.md)
14. [Pre-Sprint 6 Alignment Review](pre-sprint-6-alignment-review.md)
15. [Decision 0011 — Operational Simplicity and Durable Workflows](../decisions/0011-operational-simplicity-and-durable-workflows.md)
16. [Operational Simplicity and Durable Workflows Workstream](operational-simplicity-workstream.md)
17. [Mission-to-Runtime Traceability](../architecture/mission-to-runtime-traceability.md)
18. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](../decisions/0010-consumer-first-provider-independent-boundary.md)
19. [Consumer-First and Institutional Interoperability Workstream](consumer-first-provider-independent-workstream.md)
20. [Phase 0 Funding and Sponsorship Baseline](../economics/README.md)
21. [Proposed Health Data Legacy Workstream](health-data-legacy-workstream.md)
22. [Sprint 5 Completion Record](sprint-5-completion-record.md)
23. [Security Architecture](../security/README.md)
24. [Public Institutional Roadmap](../../ROADMAP.md)

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
- [Sprint 7 Execution Plan](sprint-7-execution-plan.md) — active through issue #54 and draft PR #55; workstreams 7.1–7.5 implemented and validated
- [Proposed Health Data Legacy Workstream](health-data-legacy-workstream.md) — tracked by issue #39; does not change Sprint 7 order or authorize production

## Current boundary

Sprints 0–6, the funding baseline, Decisions 0010 and 0011, and the pre-Sprint 7 reconciliation are complete and merged.

Sprint 6 merged through PR #48 as squash commit `5aa3540765e5573f3304ce2b624d7a02c3ba2d13`. It establishes the pre-stable provider-independent Aster contract baseline without activating production AI, private egress, identity, persistence, retrieval, memory storage, durable execution, tools, connectors, clinical use, provider selection, or specialist approval.

The pre-Sprint 7 reconciliation merged through PR #52 as squash commit `a41ca5ad9d2c0fe8a009946f376705bb7910e223`.

Sprint 7 — Forge MCP and Agent Safety is active through issue #54 and draft PR #55. Workstreams 7.1–7.5 define the bounded application, accepted and runtime registries, finalized-version local `stdio` transport, nine server-owned source roots, exact allowlists, prohibited classes, traversal and symlink isolation, SHA-256 provenance, locators, deterministic listing and lore search, public content and quest validation, fixed quest-schema inspection, architecture and decision search, conservative authority classification, truncation, public-safe errors, validators, and public tests. Exactly six read-only lore, schema, architecture, and decision tools are enabled through the server-owned local runtime; the remaining four accepted identities remain planned and unexposed. Sprint 7.6 — standards and synthetic connector fixtures — is next and has not started.

Issue #50 remains open and trigger-based. It activates only after a real consumer uses the Aster public surface and records concrete ergonomics evidence.

The Phase 0 Funding and Sponsorship Baseline does not accept or operate money. Decision 0010 does not activate connectors or clinical partnerships. Decision 0011 does not select a queue, scheduler, event store, persistence model, offline protocol, observability provider, or production topology.

Issue #39 and the proposed legacy documentation remain future institutional capability only and do not change Sprint 7 order.

Institutional Phase 0 remains active pending key-person, succession, founder-reserved-power, economic-dependency, historical-source, branch-protection, DCO, operability, distributed-ownership, specialist-review, Decision 0009, and phase-exit evidence.

## Status rule

The [Current Project Status](current-status.md) is the canonical integrated status record. Update it when a sprint or institutional workstream closes or changes status, a phase gate changes, a material gate gains evidence or an owner, or a capability begins being represented as experimental, implemented, deployed, operating, independently reviewed, or live.
