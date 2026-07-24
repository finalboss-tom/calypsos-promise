# Sprint 2 Consistency and Scope Cleanup

**Status:** IN PROGRESS

## Purpose

Sprint 2 accumulated useful vocabulary, ontology, schema, example-content, and architectural material faster than those pieces were reconciled. This cleanup phase stops further architectural expansion and turns the branch into one internally consistent content-system baseline.

This is a planning and documentation phase. It does not authorize implementation of Story Studio, a story runtime, service boundaries, provider integrations, or production infrastructure.

## Scope decision

Sprint 2 remains responsible for:

- controlled vocabulary
- retired terminology
- content ontology
- content metadata and record shapes
- identifier and version conventions
- review and publication terminology
- canonical example records
- validation requirements
- documentation of future architectural directions as proposals

Sprint 2 does not establish:

- a completed Calypso Engine
- committed service or microservice boundaries
- a Story Studio product commitment
- a runtime execution model
- persistence or event-sourcing choices
- provider selections
- production health-data flows
- research integrations

## Current inconsistencies to resolve

### Schema version

The branch currently uses both `0.1.0` and `1.0.0`.

A single version must be selected before Sprint 2 closes. Until the contract has one naming system and all examples conform, the schema must not be described as stable `1.0.0`.

### Base metadata names

Competing names currently include:

- `version` and `revision`
- `status` and `reviewState`
- `canonRefs` and `canonReferences`
- `safetyBoundaries` and `safetyNotes`

Exactly one preferred name must be chosen for each concept and used by:

- the ontology
- TypeScript contracts
- JSON examples
- validation specification
- tests
- documentation

### Identifier grammar

Examples currently use dotted identifiers such as `character.aster`, while one validator describes lowercase kebab-case identifiers.

The cleanup must define separate grammars, if needed, for:

- content IDs
- slugs
- state IDs
- event names
- canon references

The same term must not silently use multiple grammars.

### Lifecycle language

The branch currently mixes content source state and publication state.

The cleanup must explicitly distinguish:

- authoring and review state
- capability status
- foundation or decision status
- release or publication state
- retirement and replacement relationships

### Validator authority

There are multiple partial validators with different assumptions.

Before Sprint 2 closes, one validation specification must be authoritative. Implementations may remain provisional, but they must not claim different schemas.

### Architecture status

The Calypso Engine, Story Studio, and graph-model documents are useful proposals. They are not accepted implementation commitments and must be labeled accordingly.

## Decision sequence

The cleanup will proceed in this order:

1. Freeze new concepts and new content kinds.
2. Inventory every field used by contracts, examples, and validators.
3. Select one schema version for the Sprint 2 baseline.
4. Select one naming convention for common metadata.
5. Define identifier grammars.
6. Define review, capability, and publication lifecycles.
7. Reconcile each content-kind contract.
8. Update canonical examples to conform.
9. Align the validation specification and test fixtures.
10. Run formatting and all repository checks.
11. Record unresolved future work without expanding Sprint 2.

## Proposed authority order

When two Sprint 2 artifacts conflict, use this decision order until cleanup is complete:

1. Frozen project canon and governance documents
2. Controlled vocabulary
3. Approved ontology decisions
4. Reconciled content-schema specification
5. Canonical examples
6. Validator implementations and tests
7. Proposed engine and authoring-tool documents

A lower item must not silently redefine a higher item.

## Required decisions

### Decision A — baseline schema version

Recommended direction: use a pre-stable version such as `0.1.0` until contracts, examples, and validators agree. Reserve `1.0.0` for the first stable, migration-governed contract.

### Decision B — content ID convention

Recommended direction: retain namespaced dotted IDs such as `character.aster` and reserve kebab-case for slugs such as `aster-first-light`.

### Decision C — common metadata vocabulary

Recommended direction:

- `schemaVersion`
- `revision`
- `reviewState`
- `capabilityStatus`
- `canonReferences`
- `dependencies`
- `owner`
- `reviewers`
- `createdAt`
- `updatedAt`

This recommendation remains PROPOSED until applied consistently.

### Decision D — lifecycle separation

Recommended direction:

- review state: `draft`, `editorial-review`, `specialist-review`, `approved`, `retired`
- capability status: `live`, `experimental`, `planned`, `long-horizon`, `deferred`
- publication state: managed by a release manifest rather than stored as an ordinary review state

### Decision E — graph model

Recommended direction: retain the graph model as an exploratory Story Studio contract, but keep it outside the authoritative content-schema export until the record model is stable.

## Acceptance criteria

Sprint 2 may close only when:

- one schema version is used everywhere
- one common metadata vocabulary is used everywhere
- identifier grammars are documented and followed
- every canonical example conforms to its declared contract
- every validator and test fixture targets the same contract
- review, capability, publication, replacement, and retirement concepts are distinct
- architecture proposals are clearly separated from accepted schema decisions
- formatting, policy, lint, typecheck, tests, and content validation all run to completion
- the PR description accurately describes the branch

## Hold point

Do not add another engine, subsystem, content kind, graph node type, runtime rule, provider, or service boundary during this cleanup. New ideas should be recorded under deferred work and revisited after Sprint 2 reaches consistency.
