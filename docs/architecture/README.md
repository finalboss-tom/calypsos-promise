# Architecture Documentation

[Documentation home](../README.md) · [Frozen architecture](../frozen/architecture.md) · [Module boundaries](module-boundaries.md) · [Current status](../roadmap/current-status.md) · [Forge boundary](forge-mcp-boundary-and-tool-registry.md) · [Local transport](forge-mcp-local-stdio-transport.md) · [Sprint 7 plan](../roadmap/sprint-7-execution-plan.md) · [Pre-Sprint 7 review](../roadmap/pre-sprint-7-alignment-review.md) · [Sprint 6 completion](../roadmap/sprint-6-completion-record.md)

This directory contains versioned architecture baselines that implement the frozen [Architecture Foundation](../frozen/architecture.md). These documents may refine contracts and sequencing, but they may not weaken player rights, private-data boundaries, deterministic authority, provider replaceability, the consumer-first product center, operational legibility, or the rule that AI proposes while people and domain services control authoritative changes.

## Read in this order

1. [Repository and Module Boundaries](module-boundaries.md)
2. [Calypso Engine](calypso-engine.md)
3. [Operational Simplicity and Durable Workflows](operational-simplicity-and-durable-workflows.md)
4. [Mission-to-Runtime Traceability](mission-to-runtime-traceability.md)
5. [Story Content Ontology](story-content-ontology.md)
6. [Story Studio](story-studio.md)
7. [Living Chronicle Ontology](living-chronicle-ontology.md)
8. [Consumer-First and Provider-Independent Architecture](consumer-first-provider-independent-boundary.md)
9. [House of Keys Ontology and Authority Boundary](house-of-keys-ontology.md)
10. [House of Keys Purpose Taxonomy](house-of-keys-purpose-taxonomy.md)
11. [House of Keys Data-Category Taxonomy](house-of-keys-data-category-taxonomy.md)
12. [House of Keys Grant, Recipient, Action, Scope, and Duration Model](house-of-keys-grant-recipient-action-duration-model.md)
13. [House of Keys Revocation and Lifecycle Model](house-of-keys-revocation-lifecycle-model.md)
14. [House of Keys Access Receipt and Audit Boundary](house-of-keys-access-receipt-audit-boundary.md)
15. [House of Keys Permission Explanation and Comprehension Model](house-of-keys-explanation-comprehension-model.md)
16. [House of Keys Deterministic Policy Evaluation Model](house-of-keys-policy-evaluation-model.md)
17. [House of Keys Contract and Validation Baseline](../product/house-of-keys-contract-baseline.md)
18. [Aster Contract Boundary](aster-contract-boundary.md)
19. [Aster Role Contracts](aster-role-contracts.md)
20. [Aster Proposal and Structured Extraction Contracts](aster-proposal-and-extraction-contracts.md)
21. [Aster Intent, Confidence, Clarification, and Refusal Contracts](aster-intent-confidence-clarification-refusal.md)
22. [Aster Source-Linked Recall and Explanation Contracts](aster-source-linked-recall-and-explanation-contracts.md)
23. [Aster Memory Classes and Lifecycle Contracts](aster-memory-lifecycle-contracts.md)
24. [Aster Prompt-Injection and Untrusted-Input Isolation Contracts](aster-untrusted-input-isolation-contracts.md)
25. [Aster Responsive and Deferred Work Contracts](aster-responsive-and-deferred-work-contracts.md)
26. [Aster Provider Governance and Egress Contracts](aster-provider-governance-and-egress-contracts.md)
27. [Aster Local Synthetic Adapter and Non-AI Fallbacks](aster-local-synthetic-adapter-and-non-ai-fallbacks.md)
28. [Aster Compatibility, Migration, and Cross-Contract Evidence](aster-compatibility-migration-and-cross-contract-evidence.md)
29. [Sprint 6 Cross-Contract Reconciliation](aster-sprint-6-cross-contract-reconciliation.md)
30. [Sprint 6 Control and Evidence Map](aster-sprint-6-control-and-evidence-map.md)
31. [Sprint 6 Specialist Holdpoint and Unresolved-Work Register](aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md)
32. [Forge MCP Boundary and Tool Registry](forge-mcp-boundary-and-tool-registry.md)
33. [Forge MCP Local `stdio` Transport](forge-mcp-local-stdio-transport.md)
34. [Pre-Sprint 7 Repository Alignment Review](../roadmap/pre-sprint-7-alignment-review.md)
35. [Health Data Legacy and Succession Architecture](health-data-legacy-and-succession.md)

## Operational simplicity and durable workflows

- [Decision 0011](../decisions/0011-operational-simplicity-and-durable-workflows.md)
- [Operational Architecture](operational-simplicity-and-durable-workflows.md)
- [Mission-to-Runtime Traceability](mission-to-runtime-traceability.md)
- [Developer Experience and Operability Policy](../policies/developer-experience-and-operability.md)
- [Operational Simplicity Workstream](../roadmap/operational-simplicity-workstream.md)
- [AS-0013 — Operational Simplicity](../governance/assumption-AS-0013-operational-simplicity-durable-value.md)

Decision 0011 is accepted. The modular monolith remains the default. Responsive work, deferred jobs, schedules, events, projections, and provider adapters remain explicit concepts rather than hidden infrastructure conventions. Event-informed architecture does not select universal event sourcing, and offline-tolerant direction does not claim a completed local-first design.

Sprint 7 therefore begins as one local `stdio` Forge application, not a remote service, database, queue, vector index, or provider platform.

## Consumer-first and provider-independent architecture

- [Decision 0010](../decisions/0010-consumer-first-provider-independent-boundary.md)
- [Consumer-First and Provider-Independent Architecture](consumer-first-provider-independent-boundary.md)
- [Consumer-First and Institutional Interoperability Workstream](../roadmap/consumer-first-provider-independent-workstream.md)
- [AS-0012 — Consumer-First Continuity](../governance/assumption-AS-0012-consumer-first-continuity-value.md)
- [Infrastructure Sponsorship and Exit Policy](../economics/infrastructure-sponsorship-and-exit-policy.md)

The Living Chronicle remains the provider-independent longitudinal product model. External standards, EHRs, clinics, payers, laboratories, devices, exchanges, and research systems are sources, destinations, and potential partners connected through versioned adapters. They do not silently become Chronicle truth, product authority, or a prerequisite for personal value.

## Living Chronicle architecture

- [Identity and Authority](living-chronicle-identity-authority.md)
- [Record Model](living-chronicle-record-model.md)
- [Temporal Model](living-chronicle-temporal-model.md)
- [Variables, Values, and Units](living-chronicle-variable-value-unit-model.md)
- [Provenance and Source Chain](living-chronicle-provenance-source-chain.md)
- [Correction, Conflict, and Supersession](living-chronicle-correction-conflict-supersession.md)
- [Documents, Attachments, and Versions](living-chronicle-document-attachment-version-model.md)
- [Export and Deletion Lifecycle](living-chronicle-export-deletion-lifecycle.md)

## House of Keys architecture

- [Ontology and Authority Boundary](house-of-keys-ontology.md)
- [Purpose Taxonomy](house-of-keys-purpose-taxonomy.md)
- [Data-Category Taxonomy](house-of-keys-data-category-taxonomy.md)
- [Grant, Recipient, Action, Scope, and Duration Model](house-of-keys-grant-recipient-action-duration-model.md)
- [Revocation and Lifecycle Model](house-of-keys-revocation-lifecycle-model.md)
- [Access Receipt and Audit Boundary](house-of-keys-access-receipt-audit-boundary.md)
- [Permission Explanation and Comprehension Model](house-of-keys-explanation-comprehension-model.md)
- [Deterministic Policy Evaluation Model](house-of-keys-policy-evaluation-model.md)
- [Contract and Validation Baseline](../product/house-of-keys-contract-baseline.md)

The House of Keys remains a separate bounded capability. It may authorize an operation over Chronicle data, but permission truth does not become Chronicle truth and consent state does not belong in `packages/health-schema`.

## Aster architecture

- [Aster Contract Boundary](aster-contract-boundary.md)
- [Aster Role Contracts](aster-role-contracts.md)
- [Aster Proposal and Structured Extraction Contracts](aster-proposal-and-extraction-contracts.md)
- [Aster Intent, Confidence, Clarification, and Refusal Contracts](aster-intent-confidence-clarification-refusal.md)
- [Aster Source-Linked Recall and Explanation Contracts](aster-source-linked-recall-and-explanation-contracts.md)
- [Aster Memory Classes and Lifecycle Contracts](aster-memory-lifecycle-contracts.md)
- [Aster Prompt-Injection and Untrusted-Input Isolation Contracts](aster-untrusted-input-isolation-contracts.md)
- [Aster Responsive and Deferred Work Contracts](aster-responsive-and-deferred-work-contracts.md)
- [Aster Provider Governance and Egress Contracts](aster-provider-governance-and-egress-contracts.md)
- [Aster Local Synthetic Adapter and Non-AI Fallbacks](aster-local-synthetic-adapter-and-non-ai-fallbacks.md)
- [Aster Compatibility, Migration, and Cross-Contract Evidence](aster-compatibility-migration-and-cross-contract-evidence.md)
- [Sprint 6 Cross-Contract Reconciliation](aster-sprint-6-cross-contract-reconciliation.md)
- [Sprint 6 Control and Evidence Map](aster-sprint-6-control-and-evidence-map.md)
- [Sprint 6 Specialist Holdpoints and Unresolved Work](aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md)
- [Aster Contract Baseline](../product/aster-contract-baseline.md)
- [Sprint 6 Completion Record](../roadmap/sprint-6-completion-record.md)

Aster is a bounded proposal, explanation, player-controlled memory, untrusted-input, work-lifecycle, provider-governance, deterministic local-fixture, compatibility, and migration capability. It does not own Chronicle truth, House of Keys authority, gameplay completion, rewards, application state, provider logs, retrieval indexes, protected audit, or institutional authority.

Sprint 6 is complete and merged through PR #48 as squash commit `5aa3540765e5573f3304ce2b624d7a02c3ba2d13`. Every production and specialist holdpoint remains open unless later evidence closes it.

## Forge MCP architecture

- [Forge MCP Boundary and Tool Registry](forge-mcp-boundary-and-tool-registry.md)
- [Forge MCP Local `stdio` Transport](forge-mcp-local-stdio-transport.md)
- [Sprint 7 Execution Plan](../roadmap/sprint-7-execution-plan.md)
- [Pre-Sprint 7 Alignment Review](../roadmap/pre-sprint-7-alignment-review.md)
- [Sprint 7 issue #54](https://github.com/finalboss-tom/calypsos-promise/issues/54)
- [Draft PR #55](https://github.com/finalboss-tom/calypsos-promise/pull/55)

Sprint 7 is active on issue #54 and draft PR #55. Workstreams 7.1 and 7.2 define the application boundary, public source classes, server-owned registry, risk classes, planned tool contracts, prohibited capabilities, finalized-version local `stdio` transport, direct harness, cancellation, shutdown, framing, public-safe errors, compatibility references, literal non-authority, funding neutrality, validators, and public tests.

Every initial tool remains planned and unexposed. The local transport is implemented, but no repository read is implemented yet. Sprint 7.3 owns source catalogues and provenance.

Forge may not become a general shell, repository mutation agent, arbitrary filesystem reader, network client, private Chronicle service, House of Keys service, production provider gateway, connector runtime, or institutional authority.

Retrieved and generated content cannot grant itself tool, filesystem, network, repository, canon, Chronicle, permission, gameplay, or governance authority.

## Legacy and succession architecture

- [Decision 0009](../decisions/0009-health-data-legacy-and-post-mortem-stewardship.md)
- [Health Data Legacy and Succession Architecture](health-data-legacy-and-succession.md)
- [Future Health Data Legacy Workstream](../roadmap/health-data-legacy-workstream.md)
- [AS-0011 — Post-Mortem Chronicle Value](../governance/assumption-AS-0011-health-data-legacy-value.md)
- [Account Recovery and Emergency Access Model](../security/account-recovery-and-emergency-access-model.md)

Legacy and succession remain proposed future capabilities, not extensions of login recovery or Chronicle truth.

## Boundary rule

Architecture documentation describes contracts and dependency direction. Runtime provider selection, production database topology, queue or scheduler selection, event persistence, authentication, permission enforcement, connector rollout, clinical behavior, enterprise integration, offline synchronization, production migrations, estate or incapacity authority, post-mortem release, and real health-data processing remain gated until their roadmap and specialist-review requirements are met.
