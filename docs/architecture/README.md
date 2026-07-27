# Architecture Documentation

[Documentation home](../README.md) · [Frozen architecture](../frozen/architecture.md) · [Module boundaries](module-boundaries.md) · [Current status](../roadmap/current-status.md) · [Pre-Sprint 6 review](../roadmap/pre-sprint-6-alignment-review.md)

This directory contains versioned architecture baselines that implement the frozen [Architecture Foundation](../frozen/architecture.md). These documents may refine contracts and sequencing, but they may not weaken player rights, private-data boundaries, deterministic authority, provider replaceability, the consumer-first product center, operational legibility, or the rule that AI proposes while people and domain services control authoritative changes.

## Read in this order

1. [Repository and Module Boundaries](module-boundaries.md) — dependency direction, package responsibilities, public APIs, module creation criteria, and decomposition triggers
2. [Calypso Engine](calypso-engine.md) — narrative and deterministic gameplay engine boundaries
3. [Operational Simplicity and Durable Workflows](operational-simplicity-and-durable-workflows.md) — accepted responsive and deferred paths, commands, events, jobs, projections, scheduling, replay, correction, local simulation, and evidence-gated decomposition
4. [Mission-to-Runtime Traceability](mission-to-runtime-traceability.md) — accepted mapping from protected commitments to owning capabilities, evidence, user-visible outcomes, guardrails, and revalidation triggers
5. [Story Content Ontology](story-content-ontology.md) — content entities and relationships
6. [Story Studio](story-studio.md) — planned authoring, review, validation, and publication surface
7. [Living Chronicle Ontology](living-chronicle-ontology.md) — canonical data-model overview
8. [Consumer-First and Provider-Independent Architecture](consumer-first-provider-independent-boundary.md) — accepted person-centered continuity, standards-at-the-edges mappings, institutional partnership boundaries, historical evidence, incentives, funding conflicts, and falsifiable outcomes
9. [House of Keys Ontology and Authority Boundary](house-of-keys-ontology.md) — purpose-specific permission truth, actors, authority, grants, decisions, and receipts
10. [House of Keys Purpose Taxonomy](house-of-keys-purpose-taxonomy.md) — stable, versioned purposes, lifecycle, compatibility, and anti-substitution rules
11. [House of Keys Data-Category Taxonomy](house-of-keys-data-category-taxonomy.md) — semantic permission scope, selectors, mappings, lifecycle, and anti-broadening rules
12. [House of Keys Grant, Recipient, Action, Scope, and Duration Model](house-of-keys-grant-recipient-action-duration-model.md) — atomic grants, bounded recipients, explicit actions, narrowing selectors, conditions, and reviewable duration
13. [House of Keys Revocation and Lifecycle Model](house-of-keys-revocation-lifecycle-model.md) — prospective revocation, explicit states and transitions, stale-decision handling, suspension, replacement, and non-punitive withdrawal
14. [House of Keys Access Receipt and Audit Boundary](house-of-keys-access-receipt-audit-boundary.md) — player-inspectable receipt events, append-only correction, decision-to-operation linkage, minimization, and separation from production audit logs
15. [House of Keys Permission Explanation and Comprehension Model](house-of-keys-explanation-comprehension-model.md) — direct and narrative parity, layered explanations, accessible evidence, confirmation separation, and synthetic comprehension prototypes
16. [House of Keys Deterministic Policy Evaluation Model](house-of-keys-policy-evaluation-model.md) — pure versioned evaluation, explicit facts, complete-grant matching, fail-closed outcomes, stable reasons, freshness, and execution separation
17. [House of Keys Contract and Validation Baseline](../product/house-of-keys-contract-baseline.md) — pre-stable TypeScript contracts, deterministic validation, pure evaluation, public synthetic fixtures, and Node tests
18. [Aster Contract Boundary](aster-contract-boundary.md) — bounded package ownership, authority separation, provider independence, and non-production scope
19. [Aster Role Contracts](aster-role-contracts.md) — detailed Scribe, Librarian, Wayfinder, Interpreter, and Storykeeper evidence, clarification, failure, retention, egress, source-link, and fallback rules
20. [Aster Proposal and Structured Extraction Contracts](aster-proposal-and-extraction-contracts.md) — proposal identity, source and transformation provenance, exact-revision review, non-canonical payloads, extraction candidates, and domain-handoff separation
21. [Aster Intent, Confidence, Clarification, and Refusal Contracts](aster-intent-confidence-clarification-refusal.md) — bindable and safe meta intents, consequence classes, qualitative confidence, direct clarification, refusal, fallback, and non-authority
22. [Aster Source-Linked Recall and Explanation Contracts](aster-source-linked-recall-and-explanation-contracts.md) — exact Chronicle and public-education sources, provenance, lifecycle, mapping, implementation-guide, retrieval-freshness, structured-query fallback, and uncertainty rules
23. [Aster Memory Classes and Lifecycle Contracts](aster-memory-lifecycle-contracts.md) — transient and retained classes, player controls, retention, correction, supersession, export, deletion, provider metadata separation, egress, secondary-use boundaries, and missing-memory fallback
24. [Aster Prompt-Injection and Untrusted-Input Isolation Contracts](aster-untrusted-input-isolation-contracts.md) — data-only input classes, deterministic context, server-owned tools, findings, containment, source and uncertainty preservation, memory separation, and non-authority
25. [Aster Responsive and Deferred Work Contracts](aster-responsive-and-deferred-work-contracts.md) — truthful acceptance, attempts, retry, duplicate safety, timeout, cancellation, provider fallback, stale-result rejection, correction, replay, and non-authority
26. [Health Data Legacy and Succession Architecture](health-data-legacy-and-succession.md) — proposed Legacy Directive, incapacity, death, estate, fiduciary, contested-authority, family-health, research, archive, deletion, receipt, and institutional-continuity boundaries

## Operational simplicity and durable workflows

- [Decision 0011 — Operational Simplicity and Durable Workflows](../decisions/0011-operational-simplicity-and-durable-workflows.md)
- [Operational Architecture](operational-simplicity-and-durable-workflows.md)
- [Mission-to-Runtime Traceability](mission-to-runtime-traceability.md)
- [Developer Experience and Operability Policy](../policies/developer-experience-and-operability.md)
- [Operational Simplicity Workstream](../roadmap/operational-simplicity-workstream.md)
- [AS-0013 — Operational Simplicity Can Support Durable Personal Value](../governance/assumption-AS-0013-operational-simplicity-durable-value.md)

Decision 0011 is an accepted Phase 0 baseline. The modular monolith remains the default deployment posture. Responsive work, deferred jobs, schedules, domain events, projections, and provider adapters remain explicit concepts rather than hidden infrastructure conventions. Event-informed architecture does not select universal event sourcing, and offline-tolerant direction does not claim a completed local-first security or synchronization design.

## Consumer-first and provider-independent architecture

- [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](../decisions/0010-consumer-first-provider-independent-boundary.md)
- [Consumer-First and Provider-Independent Architecture](consumer-first-provider-independent-boundary.md)
- [Consumer-First and Institutional Interoperability Workstream](../roadmap/consumer-first-provider-independent-workstream.md)
- [AS-0012 — Consumer-First Continuity Can Create Durable Personal Value](../governance/assumption-AS-0012-consumer-first-continuity-value.md)
- [Infrastructure Sponsorship and Exit Policy](../economics/infrastructure-sponsorship-and-exit-policy.md)

Decision 0010 is an accepted Phase 0 baseline. The Living Chronicle remains the provider-independent longitudinal product model. External standards, EHRs, clinics, payers, laboratories, devices, exchanges, and research systems are important sources, destinations, and potential partners connected through versioned adapters. They do not silently become Chronicle truth, product authority, or a prerequisite for the complete personal-value loop.

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
- [Aster Contract Baseline](../product/aster-contract-baseline.md)
- [Sprint 6 Execution Plan](../roadmap/sprint-6-execution-plan.md)

Aster is a bounded proposal, explanation, player-controlled memory, untrusted-input, and work-lifecycle contract capability. It may classify a request, prepare drafts, recall, routes, explanations, narrative presentation, and bounded delayed work, but it does not own Chronicle truth, House of Keys authority, gameplay completion, rewards, application state, provider logs, retrieval indexes, delayed-work execution state, protected audit, or institutional authority. Deferred acceptance never means completion. Retry and replay require current authority facts, and stale, superseded, corrected, quarantined, or unknown-outcome work cannot overwrite newer results or duplicate authoritative effects.

## Legacy and succession architecture

- [Decision 0009 — Health Data Legacy and Post-Mortem Stewardship](../decisions/0009-health-data-legacy-and-post-mortem-stewardship.md)
- [Health Data Legacy and Succession Architecture](health-data-legacy-and-succession.md)
- [Future Health Data Legacy Workstream](../roadmap/health-data-legacy-workstream.md)
- [AS-0011 — Post-Mortem Chronicle Value](../governance/assumption-AS-0011-health-data-legacy-value.md)
- [Account Recovery and Emergency Access Model](../security/account-recovery-and-emergency-access-model.md)

Legacy and succession are proposed future capabilities, not extensions of login recovery or Chronicle truth. A directive expresses person intent; external authority evidence supports a role; the House of Keys evaluates a bounded operation; execution and receipts record what occurred. Death, incapacity, inactivity, custody, family relationship, or scientific value cannot collapse those domains.

## Sprint 6 handoff

The [Pre-Sprint 6 Alignment Review](../roadmap/pre-sprint-6-alignment-review.md) recommended a bounded pre-stable Aster contract capability rather than materially extending the Chronicle package. The active Sprint 6 branch now establishes the package boundary, authority matrix, role contracts, proposal and extraction boundary, intent and refusal contracts, source-linked recall, player-controlled memory lifecycle, untrusted-input isolation, and responsive/deferred work semantics while preserving provider neutrality, a deterministic synthetic adapter, and complete manual or non-AI paths as required remaining work.

## Boundary rule

Architecture documentation describes contracts and dependency direction. Runtime provider selection, production database topology, queue or scheduler selection, event persistence, authentication, consent enforcement, connector rollout, clinical behavior, enterprise integration, offline synchronization, estate or incapacity authority, post-mortem release, and real health-data processing remain gated until their roadmap and specialist-review requirements are met.
