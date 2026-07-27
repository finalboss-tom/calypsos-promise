# Architecture Documentation

[Documentation home](../README.md) · [Frozen architecture](../frozen/architecture.md) · [Module boundaries](module-boundaries.md) · [Current status](../roadmap/current-status.md)

This directory contains versioned architecture baselines that implement the frozen [Architecture Foundation](../frozen/architecture.md). These documents may refine contracts and sequencing, but they may not weaken player rights, private-data boundaries, deterministic authority, provider replaceability, the consumer-first product center, or the rule that AI proposes while people and domain services control authoritative changes.

## Read in this order

1. [Repository and Module Boundaries](module-boundaries.md) — dependency direction, package responsibilities, public APIs, module creation criteria, and decomposition triggers
2. [Calypso Engine](calypso-engine.md) — narrative and deterministic gameplay engine boundaries
3. [Story Content Ontology](story-content-ontology.md) — content entities and relationships
4. [Story Studio](story-studio.md) — planned authoring, review, validation, and publication surface
5. [Living Chronicle Ontology](living-chronicle-ontology.md) — canonical data-model overview
6. [Consumer-First and Provider-Independent Architecture](consumer-first-provider-independent-boundary.md) — person-centered continuity, standards-at-the-edges mappings, institutional partnership boundaries, historical evidence, incentives, funding conflicts, and falsifiable outcomes
7. [House of Keys Ontology and Authority Boundary](house-of-keys-ontology.md) — purpose-specific permission truth, actors, authority, grants, decisions, and receipts
8. [House of Keys Purpose Taxonomy](house-of-keys-purpose-taxonomy.md) — stable, versioned purposes, lifecycle, compatibility, and anti-substitution rules
9. [House of Keys Data-Category Taxonomy](house-of-keys-data-category-taxonomy.md) — semantic permission scope, selectors, mappings, lifecycle, and anti-broadening rules
10. [House of Keys Grant, Recipient, Action, Scope, and Duration Model](house-of-keys-grant-recipient-action-duration-model.md) — atomic grants, bounded recipients, explicit actions, narrowing selectors, conditions, and reviewable duration
11. [House of Keys Revocation and Lifecycle Model](house-of-keys-revocation-lifecycle-model.md) — prospective revocation, explicit states and transitions, stale-decision handling, suspension, replacement, and non-punitive withdrawal
12. [House of Keys Access Receipt and Audit Boundary](house-of-keys-access-receipt-audit-boundary.md) — player-inspectable receipt events, append-only correction, decision-to-operation linkage, minimization, and separation from production audit logs
13. [House of Keys Permission Explanation and Comprehension Model](house-of-keys-explanation-comprehension-model.md) — direct and narrative parity, layered explanations, accessible evidence, confirmation separation, and synthetic comprehension prototypes
14. [House of Keys Deterministic Policy Evaluation Model](house-of-keys-policy-evaluation-model.md) — pure versioned evaluation, explicit facts, complete-grant matching, fail-closed outcomes, stable reasons, freshness, and execution separation
15. [House of Keys Contract and Validation Baseline](../product/house-of-keys-contract-baseline.md) — pre-stable TypeScript contracts, deterministic validation, pure evaluation, public synthetic fixtures, and Node tests
16. [Health Data Legacy and Succession Architecture](health-data-legacy-and-succession.md) — proposed Legacy Directive, incapacity, death, estate, fiduciary, contested-authority, family-health, research, archive, deletion, receipt, and institutional-continuity boundaries

## Consumer-first and provider-independent architecture

- [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](../decisions/0010-consumer-first-provider-independent-boundary.md)
- [Consumer-First and Provider-Independent Architecture](consumer-first-provider-independent-boundary.md)
- [Consumer-First and Institutional Interoperability Workstream](../roadmap/consumer-first-provider-independent-workstream.md)
- [AS-0012 — Consumer-First Continuity Can Create Durable Personal Value](../governance/assumption-AS-0012-consumer-first-continuity-value.md)
- [Infrastructure Sponsorship and Exit Policy](../economics/infrastructure-sponsorship-and-exit-policy.md)

The Living Chronicle remains the provider-independent longitudinal product model. External standards, EHRs, clinics, payers, laboratories, devices, exchanges, and research systems are important sources, destinations, and potential partners connected through versioned adapters. They do not silently become Chronicle truth, product authority, or a prerequisite for the complete personal-value loop.

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

## Legacy and succession architecture

- [Decision 0009 — Health Data Legacy and Post-Mortem Stewardship](../decisions/0009-health-data-legacy-and-post-mortem-stewardship.md)
- [Health Data Legacy and Succession Architecture](health-data-legacy-and-succession.md)
- [Future Health Data Legacy Workstream](../roadmap/health-data-legacy-workstream.md)
- [AS-0011 — Post-Mortem Chronicle Value](../governance/assumption-AS-0011-health-data-legacy-value.md)
- [Account Recovery and Emergency Access Model](../security/account-recovery-and-emergency-access-model.md)

Legacy and succession are proposed future capabilities, not extensions of login recovery or Chronicle truth. A directive expresses person intent; external authority evidence supports a role; the House of Keys evaluates a bounded operation; execution and receipts record what occurred. Death, incapacity, inactivity, custody, family relationship, or scientific value cannot collapse those domains.

## Boundary rule

Architecture documentation describes contracts and dependency direction. Runtime provider selection, production database topology, authentication, consent enforcement, connector rollout, clinical behavior, enterprise integration, estate or incapacity authority, post-mortem release, and real health-data processing remain gated until their roadmap and specialist-review requirements are met.