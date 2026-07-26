# Architecture Documentation

[Documentation home](../README.md) · [Frozen architecture](../frozen/architecture.md) · [Module boundaries](module-boundaries.md) · [Current status](../roadmap/current-status.md)

This directory contains versioned architecture baselines that implement the frozen [Architecture Foundation](../frozen/architecture.md). These documents may refine contracts and sequencing, but they may not weaken player rights, private-data boundaries, deterministic authority, provider replaceability, or the rule that AI proposes while people and domain services control authoritative changes.

## Read in this order

1. [Repository and Module Boundaries](module-boundaries.md) — dependency direction, package responsibilities, public APIs, module creation criteria, and decomposition triggers
2. [Calypso Engine](calypso-engine.md) — narrative and deterministic gameplay engine boundaries
3. [Story Content Ontology](story-content-ontology.md) — content entities and relationships
4. [Story Studio](story-studio.md) — planned authoring, review, validation, and publication surface
5. [Living Chronicle Ontology](living-chronicle-ontology.md) — canonical data-model overview
6. [House of Keys Ontology and Authority Boundary](house-of-keys-ontology.md) — purpose-specific permission truth, actors, authority, grants, decisions, and receipts
7. [House of Keys Purpose Taxonomy](house-of-keys-purpose-taxonomy.md) — stable, versioned purposes, lifecycle, compatibility, and anti-substitution rules
8. [House of Keys Data-Category Taxonomy](house-of-keys-data-category-taxonomy.md) — semantic permission scope, selectors, mappings, lifecycle, and anti-broadening rules

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

The House of Keys remains a separate bounded capability. It may authorize an operation over Chronicle data, but permission truth does not become Chronicle truth and consent state does not belong in `packages/health-schema`.

## Boundary rule

Architecture documentation describes contracts and dependency direction. Runtime provider selection, production database topology, authentication, consent enforcement, connector rollout, clinical behavior, and real health-data processing remain gated until their roadmap and specialist-review requirements are met.
