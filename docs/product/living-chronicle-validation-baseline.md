# Living Chronicle Validation Baseline

**Status:** BASELINE for Sprint 3 workstream 3.10  
**Schema version:** `0.1.0` pre-stable  
**Validator:** `validateChronicleSchemaBundle`

## Purpose

This document defines the first deterministic invariant-validation layer for the Living Chronicle contract.

The validator checks objective properties that can be decided from one typed `ChronicleSchemaBundle` without selecting persistence, providers, connectors, production services, or specialist policy. It complements the TypeScript contract. It does not replace later JSON Schema decoding, security controls, clinical review, privacy review, accessibility review, legal analysis, or research governance.

## Validation boundary

The validator operates on a bundle already represented through the TypeScript contract. It checks cross-contract meaning and references rather than attempting to be a complete untrusted-JSON decoder.

Later work may add:

- JSON Schema for structural interchange validation
- parsers that accept `unknown` and produce typed contracts
- migration validation across schema versions
- repository validation for committed synthetic fixtures
- specialist policy validators for narrowly governed use cases

Those layers must not weaken the invariants here.

## Initial deterministic invariants

### Identity and revisions

- IDs use lowercase dotted namespaces.
- IDs are unique across the aggregate bundle, including nested categories.
- revision numbers are positive safe integers.
- revision metadata uses the current Living Chronicle schema version.
- creation and update actors resolve to declared actors.
- timestamps used as instants include an offset.

### Authority and confirmation

- confirmed records identify a confirmer and confirmation event.
- confirmation evidence matches the record ID, revision, actor, and accepting decision.
- AI confidence, connector success, imports, or completed transformations do not satisfy confirmation.
- family-specific assertion classes remain consistent for reflections, goals, derivations, associations, and inferences.

### Time and values

- exact instants, calendar dates, unresolved local times, intervals, approximate time, named periods, relative time, and recurrence remain distinct.
- intervals contain at least one boundary.
- interval records use interval temporal assertions.
- approximate time preserves source wording and a usable bound or estimate.
- lower temporal or numeric bounds do not exceed upper bounds.
- decimal values use exact decimal text rather than exponent notation or implicit floating-point serialization.
- zero and false remain valid values rather than missingness.
- numeric ranges contain at least one bound.

### Variables, categories, and units

- variables reference existing unit dimensions, units, and category sets.
- allowed units belong to the variable’s declared dimension.
- canonical unit relationships stay within one dimension.
- category parents remain inside their own category set.
- unknown, ambiguous, incompatible, or context-dependent conversion failures remain visible through the contract rather than being coerced.

### Provenance and source chains

- Chronicle source references resolve to an existing artifact and exact version.
- source versions belong to the referenced artifact.
- source locators address the exact referenced version.
- provenance events and actors resolve.
- transformations have source-version or record inputs.
- derivations have input and output records.
- derived records cannot depend on themselves and require identified inputs.
- document, device, import, and AI-derived material remains source-bearing rather than provenance-free.

### Correction, conflict, and duplicate handling

- relationship sources and targets resolve to records.
- material relationships identify an actor and reason.
- conflict and duplicate relationships include at least two distinct records.
- unmerge relationships point to a merge relationship.
- preferred presentation, correction, conflict, retraction, invalidation, and deletion remain distinct.
- no relationship may silently authorize destructive overwrite.

### Documents and custody

- attachments resolve to existing source artifacts and targets.
- version-level attachments reference a version belonging to the artifact.
- stored representations resolve to source versions and custody references.
- derived representations identify retained source versions, transformation provenance, and responsible actors.
- custody identifiers do not replace source identity.

### Export and deletion

- export requests identify a Chronicle, requester, format, scope, and at least one human-readable or machine-readable representation.
- export plans, manifests, artifacts, and deliveries form resolvable chains.
- export does not imply secondary-use permission.
- deletion requests identify explicit targets.
- whole-Chronicle deletion is scoped by the request rather than a second target ID.
- retention exceptions identify policy, accountable actor, minimum fields, and a future review point.
- tombstone retained fields use a narrow non-sensitive allowlist.
- deletion completion evidence resolves its exceptions and tombstones.

### Contributor fixture policy

When validation uses `fixtureDataPolicy: "public-or-synthetic"`, private source artifacts are rejected.

This option protects public contributor workflows. It is not a claim that production Chronicle bundles cannot contain private data; production privacy is the core rule.

## Deterministic failure format

Validation returns:

```ts
interface ChronicleValidationResult {
  valid: boolean;
  issues: ReadonlyArray<{
    code: string;
    path: string;
    message: string;
  }>;
}
```

Issues are sorted by path and code so repeated validation produces stable review output.

## Invariant tests

The initial test suite covers:

- one valid, traceable, confirmed synthetic observation
- invalid bare IDs
- duplicate IDs
- missing confirmation evidence
- interval-family temporal mismatch
- dangling derived inputs
- approximate time without usable bounds
- reversed exact decimal ranges
- sensitive tombstone fields
- private material in public or synthetic fixtures
- correction relationships with missing replacements

These are regression tests for objective architecture promises, not examples of diagnosis, treatment, research eligibility, or production health-data processing.

## Explicit non-scope

Workstream 3.10 does not implement:

- database constraints or migrations
- application services or APIs
- provider or connector validation
- authentication or authorization
- House of Keys consent checks
- access receipts
- production file, malware, encryption, retention, or erasure controls
- clinical correctness or safety adjudication
- legal validity of retention exceptions
- research protocol or compensation rules
- AI model evaluation
- story, quest, progression, or governance validation

## Hold points

The following require later specialist or policy work and must not be inferred from a passing deterministic validator:

- whether a health claim is clinically correct
- whether an inference is safe to present
- whether access was authorized
- whether a retention exception is legally valid
- whether deletion was physically complete across production infrastructure
- whether a variable or mapping is clinically interoperable
- whether an exported bundle is appropriate for a particular recipient or purpose

A passing result means the bundle satisfies the current objective `0.1.0` contract invariants. It does not make the content medically correct, legally sufficient, or authorized for secondary use.
