# Living Chronicle Schema Baseline

**Status:** BASELINE for Sprint 3 workstream 3.9  
**Schema version:** `0.1.0` pre-stable  
**TypeScript package:** `@calypsos-promise/health-schema`

## Purpose

This document identifies the first typed contract for the authoritative Living Chronicle. It translates the Sprint 3 architecture baselines into TypeScript without selecting persistence, service, provider, connector, or production-data implementation details.

The package is named `health-schema` to remain aligned with the frozen repository topology. Its contracts cover both health and lived-experience records represented through the Living Chronicle.

## Authority order

The TypeScript contracts implement, and may not weaken:

1. the frozen Product Constitution and Architecture Foundation
2. Decision 0003 and the progressive-decentralization mandate
3. the Sprint 2 vocabulary and deterministic incentive boundaries
4. the Sprint 3 architecture and ontology documents
5. this schema baseline
6. later validators, interchange schemas, fixtures, and tests

When a type is less expressive than the governing documentation, the documentation remains authoritative until the contract is revised through review.

## Version decision

The Living Chronicle schema begins at `0.1.0`.

This version is intentionally pre-stable:

- no `1.0.0` compatibility guarantee is implied
- breaking changes remain possible while Sprint 3 evidence is incomplete
- every serialized top-level contract carries `schemaVersion` and positive `revision` metadata
- schema versioning is independent from package versioning, content-schema versioning, application release versions, and external terminology versions
- later migrations must preserve source truth, provenance, correction history, and explicit deletion state

The exported constant is:

```ts
LIVING_CHRONICLE_SCHEMA_VERSION = "0.1.0"
```

## Package boundary

`packages/health-schema` contains contracts only.

It does not contain:

- database tables, migrations, repositories, or queries
- runtime services or application orchestration
- connector adapters
- provider clients
- authentication or authorization
- consent evaluation
- access receipts
- AI prompts, model calls, or retrieval
- story, quest, progression, or notification persistence
- research, compensation, market, treasury, ownership, or governance mechanisms

## Contract groups

The `0.1.0` TypeScript baseline defines:

- stable namespaced identifier aliases
- Chronicle, subject, actor, variable, unit, category, source, relationship, export, and deletion identifiers
- revision and schema metadata
- proposed versus confirmed authority
- Chronicle record lifecycle states
- exact, date-only, local, interval, approximate, named-period, relative, and recurring temporal assertions
- exact decimal-text value representation and discriminated value families
- variable, category-set, unit-dimension, unit, external-mapping, and normalization contracts
- one common Chronicle record envelope with discriminated record payloads
- observation, interval, reflection, goal, derived, association, and inference record families
- source artifacts, immutable source versions, locators, capture, import, transformation, derivation, confirmation, and external-reference contracts
- correction, amendment, supersession, retraction, invalidation, conflict, duplicate, merge, unmerge, and preferred-presentation relationships
- attachment, custody, stored-representation, and derived-representation contracts
- export request, plan, manifest, artifact, and delivery contracts
- deletion request, scope resolution, retention exception, tombstone, and completion-evidence contracts
- an aggregate `ChronicleSchemaBundle` for validation and interchange planning

## Serialization decisions

### Namespaced identifiers

Identifiers are represented as dotted strings through the `NamespacedId` template type. The TypeScript type guarantees the presence of a namespace separator but does not replace later runtime grammar validation.

Provider subjects, email addresses, public identities, object-store keys, URLs, connector cursors, wallet addresses, and database keys are not canonical Chronicle identifiers.

### Exact decimal text

Quantities and decimal values use `DecimalText` rather than JavaScript floating-point numbers for their authoritative magnitude.

This preserves the stated decimal representation across serialization. Later validators must enforce valid decimal grammar, precision rules, and compatible units.

Integer counts remain numbers and require deterministic integer validation.

### Read-only collections

Collections use `ReadonlyArray` and read-only records to communicate that contracts describe versioned values rather than mutable persistence objects.

This does not select event sourcing or immutable storage.

### Discriminated unions

Time, value, record-family, provenance, relationship, export, and deletion contracts use explicit discriminator fields.

This prevents absent values, proposed records, derived claims, source evidence, deletion state, and other materially different concepts from collapsing into ambiguous generic objects.

## Authority and lifecycle separation

A record declares both:

- `authorityState`: `proposed` or `confirmed`
- `lifecycleState`: active, superseded, retracted, deletion-related, retained-under-exception, or deleted

These fields remain orthogonal.

A record does not become confirmed because an AI model, connector, device, import, operator, research workflow, quest, or governance vote prefers it. Confirmation requires an explicit confirmation event and deterministic contract validation.

## Provenance requirements represented by the types

The contracts support structural provenance for:

- manual entry
- questionnaire submission
- device and connector payloads
- documents and exact locators
- AI-assisted extraction proposals
- parsing and mapping
- temporal and unit normalization
- deterministic derivation
- human confirmation
- correction and supersession
- source unavailability and deletion

The types make these relationships representable. Workstream 3.10 must decide which references are mandatory for each record family and workflow and enforce those rules deterministically.

## Export and deletion boundaries

The typed model keeps export generation separate from permission for secondary use.

It also keeps separate:

- Chronicle-record deletion
- source-artifact and source-version deletion
- attachment removal
- custody-copy deletion
- disposable-derivative deletion
- export-artifact deletion
- account closure
- consent withdrawal
- research withdrawal

Retention exceptions require identified authority, policy version, accountable actor, review time, minimum retained fields, and appeal behavior. The schema does not declare which exceptions are legally valid.

Tombstones are limited by contract purpose. Later validation and specialist review must prohibit sensitive values, document names, excerpts, intimate categories, and source content from being retained in tombstones.

## Incentive and governance boundaries

The schema contains no reward, progression, compensation, ownership, voting-weight, or token field derived from Chronicle disclosure.

Exporting, correcting, withholding, withdrawing, disputing, or deleting information must not reduce core product rights or governance standing.

Adding more records, more intimate detail, more documents, longer retention, broader consent, or secondary-use participation must not create superior Chronicle authority.

## Explicitly unresolved after 3.9

The following remain later Sprint 3 work:

- runtime identifier and decimal validation
- cross-reference validation
- record-family and assertion-class compatibility rules
- mandatory provenance by workflow
- lifecycle-transition validation
- dependency invalidation and recomputation rules
- unit and variable compatibility validation
- JSON Schema or other interchange-schema export
- synthetic fixtures
- invariant-focused tests
- migration and compatibility examples
- specialist review of privacy, clinical, accessibility, legal, research, and retention questions

## 3.9 acceptance

Workstream 3.9 is complete when:

- `@calypsos-promise/health-schema` builds under strict TypeScript
- `0.1.0` is exported as an explicit independent schema version
- the contracts cover the accepted Sprint 3 architecture baselines through workstream 3.8
- package and workspace metadata remain reproducible under the frozen lockfile
- no runtime, persistence, provider, connector, consent, research, or production-data implementation is introduced
- repository checks identify only known base-branch issues unrelated to the Sprint 3 contract
