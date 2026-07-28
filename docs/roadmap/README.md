# Roadmap Documentation

[Documentation home](../README.md) · [Institutional roadmap](../../ROADMAP.md) · [Current status](current-status.md) · [Sprint 7 plan](sprint-7-execution-plan.md) · [Sprint 7 completion](sprint-7-completion-record.md) · [Pre-Sprint 8 review](pre-sprint-8-alignment-review.md) · [Forge architecture](../architecture/README.md#forge-mcp-architecture) · [Sprint sequence](sprints.md)

Calypso’s Promise uses two coordinated roadmaps:

- the root [Public Institutional Roadmap](../../ROADMAP.md) defines evidence-gated product, organizational, economic, governance, and founder-independence phases;
- [Sprints](sprints.md) defines the near-term design-to-build sequence and its non-numbered institutional constraints.

Advancement is gate-based rather than calendar-based. A completed sprint or accepted doctrine does not imply that a production capability, financial system, provider integration, workflow runtime, institutional phase, or public claim is live.

## Current orientation

1. [Current Project Status](current-status.md)
2. [Sprint 7 Completion Record](sprint-7-completion-record.md)
3. [Pre-Sprint 8 Alignment Review](pre-sprint-8-alignment-review.md)
4. [Sprint 7 Execution Plan](sprint-7-execution-plan.md)
5. [Sprint 7 Cross-Contract Reconciliation](../architecture/forge-sprint-7-cross-contract-reconciliation.md)
6. [Sprint 7 Control and Evidence Map](../architecture/forge-sprint-7-control-and-evidence-map.md)
7. [Sprint 7 Specialist Holdpoints and Unresolved Work](../architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)
8. [Forge MCP Agent Security, Compatibility, and Operability](../architecture/forge-mcp-agent-security-compatibility-and-operability.md)
9. [Forge MCP Scopes, Limits, Receipts, and Errors](../architecture/forge-mcp-scopes-limits-receipts-and-errors.md)
10. [Forge MCP Deterministic Synthetic Generation](../architecture/forge-mcp-deterministic-synthetic-generation.md)
11. [Forge MCP Public Standards, Mapping Drafts, and Synthetic Connector Fixtures](../architecture/forge-mcp-public-standards-mapping-and-synthetic-connectors.md)
12. [Forge MCP Architecture and Decision Tools](../architecture/forge-mcp-architecture-and-decision-tools.md)
13. [Forge MCP Lore and Schema Tools](../architecture/forge-mcp-lore-and-schema-tools.md)
14. [Forge MCP Source Catalogue and Provenance](../architecture/forge-mcp-source-catalogue-and-provenance.md)
15. [Forge MCP Local `stdio` Transport](../architecture/forge-mcp-local-stdio-transport.md)
16. [Forge MCP Boundary and Tool Registry](../architecture/forge-mcp-boundary-and-tool-registry.md)
17. [Sprint Sequence](sprints.md)
18. [Sprint 6 Completion Record](sprint-6-completion-record.md)
19. [Sprint 6 Cross-Contract Reconciliation](../architecture/aster-sprint-6-cross-contract-reconciliation.md)
20. [Sprint 6 Control and Evidence Map](../architecture/aster-sprint-6-control-and-evidence-map.md)
21. [Sprint 6 Specialist Holdpoints and Unresolved Work](../architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md)
22. [Decision 0011 — Operational Simplicity and Durable Workflows](../decisions/0011-operational-simplicity-and-durable-workflows.md)
23. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](../decisions/0010-consumer-first-provider-independent-boundary.md)
24. [Phase 0 Funding and Sponsorship Baseline](../economics/README.md)
25. [Security Architecture](../security/README.md)
26. [Public Institutional Roadmap](../../ROADMAP.md)

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
- [Sprint 7 Execution Plan](sprint-7-execution-plan.md) — all workstreams and completion evidence present on draft PR #55
- [Sprint 7 Completion Record](sprint-7-completion-record.md) — ready for founding-steward acceptance; not merged
- [Pre-Sprint 8 Alignment Review](pre-sprint-8-alignment-review.md) — prepared handoff; blocked pending Sprint 7 acceptance and merge
- [Proposed Health Data Legacy Workstream](health-data-legacy-workstream.md) — tracked by issue #39; does not change numbered sprint order or authorize production

## Current boundary

Sprints 0–6, the funding baseline, Decisions 0010 and 0011, and the pre-Sprint 7 reconciliation are complete and merged.

Sprint 7 — Forge MCP and Agent Safety remains active through issue #54 and draft PR #55. Workstreams 7.1–7.10 and the completion package are present on the branch. The evidence supports acceptance at the bounded local public/synthetic implementation level, but explicit founding-steward acceptance and squash merge remain open.

The candidate implements exactly ten local public/synthetic tools, deterministic validation and generation, allowlisted source provenance, bounded execution scopes and receipts, stable errors, runtime integrity, successful-result security postconditions, exact compatibility and migration, clean credential-free startup, provider independence, and the complete public adversarial matrix.

No private Chronicle MCP, remote MCP, provider call, connector execution, repository mutation, shell, network, production synthetic-data system, production sandbox, independent penetration test, or specialist approval is activated.

The prepared Sprint 8 handoff preserves `apps/site` as the single public website owner and requires migration of the existing Track 0A repository gateway into one honest, accessible Next.js foundation after Sprint 7 acceptance and merge.

Issue #50 remains open and trigger-based. Forge has no `@calypsos-promise/aster` dependency or genuine Aster consumer evidence, so the trigger remains inactive.

Institutional Phase 0 remains active pending key-person, succession, founder-reserved-power, economic-dependency, historical-source, branch-protection, DCO, operability, distributed-ownership, specialist-review, Decision 0009, and phase-exit evidence.

## Status rule

The [Current Project Status](current-status.md) is the canonical integrated status record. Update it when a sprint or institutional workstream closes or changes status, a phase gate changes, a material gate gains evidence or an owner, or a capability begins being represented as experimental, implemented, deployed, operating, independently reviewed, or live.
