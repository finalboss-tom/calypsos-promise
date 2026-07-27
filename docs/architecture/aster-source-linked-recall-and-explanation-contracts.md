# Aster Source-Linked Recall and Explanation Contracts

[Architecture index](README.md) · [Aster boundary](aster-contract-boundary.md) · [Role contracts](aster-role-contracts.md) · [Proposal and extraction contracts](aster-proposal-and-extraction-contracts.md) · [Intent contracts](aster-intent-confidence-clarification-refusal.md) · [Product contract baseline](../product/aster-contract-baseline.md) · [Sprint 6 execution plan](../roadmap/sprint-6-execution-plan.md)

- **Status:** ACTIVE PRE-STABLE CONTRACT
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`
- **Evidence boundary:** deterministic public contracts and synthetic tests; not production retrieval, provider, clinical, legal, privacy, security, accessibility, interoperability, or operational certification

## Purpose

The Librarian and Interpreter may reduce the work required to recall and understand information, but every health-related statement must remain traceable to exact authoritative Chronicle records or clearly labeled public educational material.

The permanent transaction boundary remains:

> AI proposes; the player confirms; deterministic domain services validate and store.

Recall does not write Chronicle truth, create permission, select a clinical interpretation, or make a provider, model, retrieval score, newest source, standard, profile, or implementation guide authoritative.

## Recall and explanation roles

- **Librarian:** prepares source-linked recall from authoritative Chronicle records or clearly labeled public educational material.
- **Interpreter:** prepares a source-aware explanation that preserves mapping, provenance, lifecycle, conflict, deletion, and uncertainty limitations.

The public contract enforces `librarian → recall` and `interpreter → explanation`. Other roles cannot silently inherit these source-authority semantics.

## Personal-health statements

A person-specific health statement requires at least one exact Chronicle source reference containing:

- Chronicle record identity and revision;
- Chronicle schema version;
- source-version identity and revision;
- an inspectable source locator;
- record, correction, conflict, and deletion state;
- relationship references for relevant correction, supersession, conflict, or lifecycle evidence; and
- mapping and implementation-guide references where transformation occurred.

A personal statement cannot rely only on general public education, model memory, provider rank, retrieval score, or an unversioned external identifier.

## Public educational material

Public educational material remains a separate source class. It requires:

- stable material identity and revision;
- title and publisher;
- inspectable locator and availability state;
- `clearlyLabeledEducational: true`;
- `personalClaimAuthority: false`; and
- an explicit uncertainty label stating that public education is not evidence of a person-specific fact.

Public education may explain a general concept. It cannot establish what happened to the player.

## Provenance and source location

Recall source references preserve exact revisions and one declared locator class:

- Chronicle record;
- field path;
- document page or region;
- row and column;
- JSON pointer;
- timestamp range; or
- whole source.

A locator declares whether it is approximate. The contract does not fabricate precision that the source does not support.

Source truth remains separate from Chronicle truth. Parsing, normalization, mapping, retrieval, explanation, or generated prose does not replace the underlying source assertion.

## Lifecycle visibility

Chronicle recall references preserve:

- record state: active, amended, corrected, superseded, retracted, invalidated, deleted, or unavailable;
- correction state;
- conflict state;
- deletion state; and
- relevant relationship references.

Statements must keep source labels, lifecycle state, mapping limitations, alternatives, and conflicts visible. A preferred presentation cannot erase alternative validly sourced claims.

The validator requires explicit uncertainty when a source is corrected, superseded, conflicted, deleted, or unavailable.

## Mapping and implementation guides

Mapped material preserves:

- mapping identity and revision;
- source-system identity and version where applicable;
- target concept identity where applicable;
- exact standard, standard version, implementation-guide identity, guide version, and profile identity where applicable; and
- a direct loss description for partial, lossy, conflicting, or unsupported mapping.

The public mapping contract encodes literal `false` values for claims that conformance proves:

- clinical completeness;
- semantic equivalence;
- safety; or
- endorsement.

Using a standard or implementation guide can improve interoperability. It cannot prove that the source and target mean the same thing in every context.

## Retrieval and freshness

Recall records its retrieval method and freshness:

- direct record reference;
- structured query;
- semantic index; or
- public-material reference.

Semantic retrieval requires an exact index identity and revision. Retrieval score remains non-authoritative.

When semantic retrieval is stale, unavailable, or of unknown freshness, a structured-query fallback must be used before recalled statements are returned. The fallback records its query identity, revision, and explanation.

A successful search, provider response, vector match, or transport acknowledgement does not prove that the recalled statement is current or authoritative.

## Uncertainty taxonomy

The initial recall uncertainty taxonomy includes:

- source uncertainty;
- approximate time;
- mapping loss;
- source conflict;
- correction or supersession;
- source deletion or unavailability;
- stale retrieval;
- implementation-guide limitation; and
- public education not being person-specific evidence.

Required uncertainty cannot be hidden by confident prose. Confidence remains qualitative, explained, and explicitly non-authoritative.

## Clinical and authority boundary

Recall and explanation cannot:

- write canonical records;
- create or expand permission;
- confirm themselves;
- invoke authoritative actions;
- diagnose;
- prescribe;
- direct emergency care;
- treat retrieval score, provider rank, source recency, or standards profile as truth; or
- claim that standards conformance proves completeness, equivalence, safety, or endorsement.

Later specialist-reviewed product pathways may address clinical or emergency requests. This pre-stable contract does not implement or certify them.

## Validation

`validateAsterSourceLinkedRecall` rejects:

- unknown schemas, roles, modes, retrieval methods, source classes, lifecycle states, mapping states, or locator kinds;
- personal-health statements without exact Chronicle record and revision references;
- public educational material that is not clearly labeled or attempts person-specific authority;
- missing, duplicate, or unresolved source references;
- missing record, source-version, locator, mapping, or implementation-guide revisions;
- hidden mapping loss;
- stale semantic retrieval without structured-query fallback;
- missing lifecycle, source, mapping, conflict, or uncertainty visibility;
- missing required uncertainty for conflicts, corrections, mapping loss, implementation guides, deleted sources, or public education;
- canonical statements or recall envelopes;
- diagnosis, treatment, emergency, or standards overclaims; and
- canonical, permission, clinical, provider, retrieval, recency, or standards authority escalation.

Validation proves only that the checked serialized contract preserves these declared boundaries. It does not prove semantic correctness, clinical safety, source accuracy, retrieval quality, mapping quality, privacy, security, accessibility, provider compliance, or production readiness.
