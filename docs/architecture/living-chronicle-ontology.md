# Living Chronicle Ontology

**Status:** PROPOSED Sprint 3 conceptual baseline

## Purpose

This document defines the conceptual boundaries and vocabulary for the authoritative Living Chronicle before TypeScript contracts, JSON Schema, persistence, connectors, or runtime services are selected.

It is an ontology and authority model. It does not prescribe tables, event sourcing, API shapes, cloud providers, clinical coding systems, or storage technology.

## Governing sources

The ontology implements, and may not weaken:

- the Product Constitution
- the Architecture Foundation
- the Sprint 2 content and incentive baseline
- the Calypso Engine domain boundaries
- the progressive-decentralization and founder-independence constraint in Decision 0003

## Core distinction: seven kinds of truth

Calypso’s Promise must not collapse different kinds of truth into a single generic record.

1. **Chronicle truth** — person-controlled health and lived-experience assertions with provenance and correction history.
2. **Source truth** — what a specific source artifact, person, device, service, or document actually asserted.
3. **Derived truth** — deterministic calculations or transformations whose inputs and method are traceable.
4. **Interpretive truth** — associations, classifications, or inferences that remain distinguishable from direct observations and calculations.
5. **Permission truth** — what purposes, recipients, scopes, and actions are currently authorized or denied.
6. **Product-state truth** — story, quest, learning, progression, and notification state.
7. **AI-memory truth** — retained conversational or preference material governed separately from the Chronicle.

A system may compose these for presentation, but no composed view becomes authoritative merely because it is convenient.

## The authoritative center

The Living Chronicle is the person-controlled collection of canonical Chronicle records and their provenance, lifecycle, and source relationships.

It is not:

- the account profile
- a narrative save file
- a raw document bucket
- a vector index
- an AI conversation history
- a research dataset
- a consent ledger
- a quest-completion ledger
- a progression balance
- a clinical chart operated by an institution

Those systems may hold references or receive bounded facts, but they do not silently become the Chronicle authority.

## Identity concepts

### Person

A human being represented by the product.

The ontology does not require a public identity, legal name, email address, token, wallet, government identifier, or health-data disclosure to recognize a person’s control rights.

### Account identity

The authentication and account-administration identity used to access product capabilities.

Account identity is not the canonical subject identifier for Chronicle records. Authentication providers must remain replaceable.

### Chronicle identity

A stable, pseudonymous internal identity under which a Living Chronicle is maintained.

Properties:

- not derived from an email address or provider subject
- not intended as a public identifier
- portable across authentication-provider changes
- distinct from research participant, connector, device, and story identities

### Chronicle

The person-controlled aggregate containing canonical records, source relationships, provenance, lifecycle state, and portability semantics.

A Chronicle has one controlling person in the initial baseline. Shared, caregiver, dependent, proxy, estate, and delegated-control scenarios require explicit later design rather than hidden assumptions.

### Subject

The human, body, environment, object, or context that a Chronicle assertion is about.

Initial public fixtures focus on the controlling person as subject. The distinction exists because future assertions may concern a medication, meal, location context, device, dependent, or environment without redefining the Chronicle owner.

### Actor

A human or system that performs an action in the record lifecycle.

Actor classes may include:

- controlling person
- delegated human, when later authorized
- connector
- deterministic domain service
- import process
- AI drafting tool
- maintainer or operator acting under an explicit administrative capability

An actor is not automatically authorized merely because it can be named.

### Author, recorder, source, and custodian

These roles are distinct:

- **Author** — composed the original statement or document.
- **Recorder** — entered or captured the assertion.
- **Source** — supplied the evidence or claim.
- **Custodian** — stores bytes or operates infrastructure.

Custody does not confer authorship, truth authority, permission authority, or ownership.

## Chronicle record families

### Observation

A claim about a subject, variable or concept, value, and time.

Examples:

- a person records a pain score of 4 this morning
- a device reports 7,215 steps on a date
- a laboratory document reports a result

An observation does not imply diagnosis, causality, or clinical endorsement.

### Interval

A claim whose meaning spans a duration rather than one instant.

Examples:

- a symptom episode from Monday through Wednesday
- sleep between two approximate times
- medication use over a stated period

### Reflection

Person-authored or person-confirmed narrative material intended to preserve context, meaning, or recollection.

A reflection is not converted into a structured observation merely because an AI can extract one. Extracted structured claims remain proposals until confirmed.

### Goal

A person-controlled future intention or desired state.

A goal is not evidence that an outcome occurred and does not create punishment, diagnosis, consent, or research eligibility.

### Source document

A versioned source artifact such as a report, image, note, export, or uploaded file.

A source document is evidence, not automatically a canonical assertion. Assertions extracted from it reference an exact version and source location.

### Derived record

A deterministic output calculated or normalized from one or more records using an identified method and version.

Examples:

- a unit conversion
- a daily sum
- a normalized category
- a period aggregate

A derived record must preserve all source references and must be reproducible from its declared inputs and method.

### Association

A descriptive relationship calculated from records.

An association remains distinguishable from diagnosis, treatment recommendation, and proven causality.

### Inference

A conclusion proposed from evidence but not directly observed.

Inference requires explicit classification, method or model provenance, uncertainty, and review appropriate to its risk. It does not replace the underlying observations.

## Assertion classes

Every record that makes a claim declares how the claim arose.

Proposed assertion classes:

- `direct-observation` — directly measured or noticed at the represented time
- `self-report` — stated by the controlling person
- `recollection` — remembered retrospectively, often with approximate time
- `imported-claim` — asserted by an external source
- `deterministic-calculation` — reproducible calculation from identified inputs
- `descriptive-association` — descriptive relationship among records
- `inference` — non-direct conclusion with uncertainty
- `intention` — goal or planned action
- `reflection` — narrative context or meaning

The class describes epistemic origin, not moral quality or clinical reliability.

## Authority states

A record’s authority must be distinguishable from its lifecycle.

Proposed authority states:

- `proposed` — a draft that has not been confirmed as canonical
- `confirmed` — accepted by the controlling person or another explicitly authorized authority and validated by the domain contract

AI output begins as `proposed`.

A record cannot become `confirmed` merely because:

- a model produced high confidence
- an import succeeded
- a quest would complete
- a researcher or operator prefers it
- a device or external service asserted it

## Lifecycle states

Proposed lifecycle states:

- `active`
- `superseded`
- `retracted`
- `deletion-requested`
- `deletion-processing`
- `retained-under-exception`
- `deleted`

Authority and lifecycle are orthogonal. A proposed record may be deleted; a confirmed record may later be superseded or retracted.

A lifecycle transition records actor, time, reason, and relevant predecessor or successor references.

## The observation shape

A canonical observation conceptually includes:

- record identity
- schema version and revision
- Chronicle identity
- subject identity
- assertion class
- authority state
- lifecycle state
- variable or concept identity
- value
- unit or category when applicable
- temporal assertion
- method or capture mode
- source references
- provenance references
- author and recorder references when known
- uncertainty or confidence representation when applicable
- correction and supersession references
- creation and update metadata

Not every observation requires a clinical code, unit, body site, device, or external standard.

## Value concepts

The model should support explicit value shapes rather than one untyped field.

Candidate shapes:

- quantity
- integer count
- decimal number
- boolean
- coded category
- free text
- numeric range
- ordinal score
- date or time value
- duration
- absent, unknown, or not-collected reason

`0`, `false`, unknown, not measured, and missing are not interchangeable.

## Variables and concepts

### Variable identity

A stable internal identifier for what is being observed or calculated.

The internal identifier is not owned by a connector or external terminology. External mappings are versioned relationships.

### Variable definition

A variable definition may include:

- identifier
- preferred label
- plain-language description
- aliases
- value shape
- unit dimension
- allowed units or categories
- temporal semantics
- aggregation behavior
- sensitivity or review hints
- external mappings
- lifecycle and version

### External mapping

A relationship to an external vocabulary, code, device field, or source system.

A mapping records system, code, version, relation, and review state. Mappings do not silently redefine the internal variable.

## Units and normalization

The ontology distinguishes:

- source unit
- parsed unit
- canonical unit
- display unit
- conversion method and version

Normalization creates a derived relationship rather than replacing the raw assertion.

A conversion must fail visibly when:

- the unit is unknown
- dimensions are incompatible
- required context is absent
- precision would be misleading

## Temporal ontology

### Exact instant

A timestamp represented with sufficient offset or zone context for its intended meaning.

### Calendar date

A date for which time-of-day is unknown or irrelevant.

### Interval

A start and end, either of which may be open when the meaning permits it.

### Approximate time

A temporal claim with explicit uncertainty rather than a fabricated exact value.

Approximation may be represented through:

- earliest and latest bounds
- a central estimate plus precision class
- a named period such as month, season, school year, or life phase
- source text preserved alongside normalized bounds

### Recurrence

A repeated temporal pattern whose rule remains distinct from observed instances.

### Source and normalized time

The source temporal assertion is preserved. Any normalized representation records method, version, assumptions, and zone behavior.

## Source and provenance ontology

### Source artifact

The original evidence container or origin, such as:

- manual entry
- device payload
- service export
- document
- image
- message
- questionnaire response
- prior Chronicle record

### Source version

An immutable identified version of a source artifact.

### Source locator

A page, region, row, field, byte range, timestamp, message position, or other locator within the source version.

### Capture event

The event by which a source entered a controlled workflow.

### Transformation

A declared operation converting an input representation into another representation.

### Derivation

A declared calculation producing a new claim from source records.

### Confirmation

An explicit action accepting a proposal as a canonical Chronicle record.

### Provenance chain

The directed relationships linking a canonical or derived record to sources, transformations, derivations, and confirmations.

Every derived record requires at least one resolvable input and an identified method version.

## Correction and history

Correction creates a new revision or successor record and preserves the prior claim.

A correction relationship records:

- corrected record
- replacement or amended record
- reason
- actor
- time
- whether the original source was wrong, parsing was wrong, normalization was wrong, or the person is revising a recollection

The default presentation may prefer the current record, but export and audit behavior preserve the correction chain unless deletion rules require otherwise.

## Conflict

Two validly sourced assertions may disagree.

Conflict is a relationship or assessment, not permission to delete one side.

A conflict record may state:

- participating record IDs
- conflict type
- detection method
- review state
- preferred presentation, if any
- reason and responsible actor

Preference for display is not the same as declaring another source false.

## Duplicate handling

Duplicate detection begins with a `duplicate-candidate` relationship.

Confirmation of duplication must preserve:

- both source histories
- why they are considered the same claim
- which record is preferred for presentation
- whether records can be safely merged
- how the decision can be reversed

A merge must not discard unique provenance or source content.

## Supersession, retraction, and invalidation

- **Supersession** — a newer record replaces a prior record for current use while history remains valid to inspect.
- **Retraction** — the responsible authority withdraws a claim as unreliable or incorrect.
- **Invalidation** — a deterministic rule determines that the record violates a contract or cannot be used for a stated purpose.

These terms are not interchangeable and require reasons and actor provenance.

## Documents and attachments

A source document has a stable identity and immutable versions.

Document metadata may include:

- version identity
- content type
- byte length
- original filename where safe
- capture source
- integrity digest
- encryption or custody reference as an implementation detail
- created and captured times
- deletion and retention state

Extracted assertions point to the exact version and locator. Re-uploading or replacing bytes creates a new source version.

## Export ontology

An export is a generated representation of the person’s controlled records, not a transfer of ownership.

An export request identifies:

- Chronicle
- requested scope
- format
- inclusion of raw sources, documents, provenance, corrections, and deleted-record evidence
- request actor and time

An export artifact identifies:

- format and schema version
- generation time
- covered scope
- checksums where useful
- omissions and reasons
- expiration or retention behavior

The baseline must include an open, machine-readable representation and enough human-readable context to interpret it.

## Deletion ontology

Deletion must not be represented by a single `deleted` boolean.

The lifecycle distinguishes:

- request received
- scope resolved
- processing
- source and derivative effects evaluated
- retained-under-exception material identified
- erasure completed where applicable
- non-sensitive tombstones retained where necessary for referential integrity or evidence
- completion evidence presented to the person

Deletion of a source artifact and deletion of a canonical assertion may have different effects. Derived records must be reevaluated when required inputs are removed.

Legal, safety, or technical retention exceptions remain future specialist work and must never be invented silently by implementation.

## Boundary with other domains

### Story and progression

Story and progression may receive a minimum bounded fact such as “a declared requirement is satisfied.” They do not receive or copy the underlying sensitive record unless a separate authorized product workflow requires it.

Health disclosure volume, intimacy, or secondary-use consent does not create game rewards or governance weight.

### Quest

The Quest Engine evaluates declared requirements through bounded interfaces. It does not create, correct, or delete Chronicle records.

### Consent and receipts

The Consent Engine governs purpose and access. The Chronicle stores the person-controlled record. Access receipts record use. These responsibilities remain separate.

### Aster and AI

Aster may draft, extract, clarify, search authorized records, and explain provenance. Aster does not confirm, silently retain, directly store, correct, or delete canonical records.

### Research and opportunities

Research datasets, protocol state, compensation, and opportunity participation remain outside the Chronicle authority. Any later use requires separate purpose, permission, access, withdrawal, and receipt semantics.

## Institutional and governance constraints

The model must support founder independence by making records, schemas, provenance, exports, and lifecycle semantics portable across maintainers and vendors.

The following are prohibited:

- provider-owned canonical identifiers
- undocumented transformations
- irreversible proprietary export formats
- founder-only decryption or recovery assumptions
- governance weight based on health disclosure
- capital-purchased access to private Chronicle data
- ordinary voting that bypasses correction, export, deletion, privacy, or safety rights

## Initial relationship map

```text
Person
  controls → Chronicle

Account identity
  authorizes access to → Chronicle
  but is not → Chronicle identity

Chronicle
  contains → Chronicle records
  references → subjects
  references → source versions

Chronicle record
  asserts → variable or concept
  has → value
  has → temporal assertion
  traces through → provenance chain
  may supersede or correct → prior record
  may conflict with → other record

Source artifact
  has immutable → source versions

Source version
  contains → source locators
  supports → proposed or confirmed records

Transformation or derivation
  consumes → source records
  produces → derived record

Consent grant
  authorizes a purpose-specific action
  but is not → Chronicle record truth

Quest fact
  references a bounded evaluation result
  but does not copy → Chronicle
```

## Open questions for Sprint 3

1. Is `ChronicleRecord` one versioned envelope with discriminated record families, or are observations, intervals, reflections, goals, and documents separate top-level contracts?
2. Is correction best represented as record revision, successor record, or both under different conditions?
3. Which identity relationships are required now to avoid blocking future caregiver and dependent use without prematurely designing those workflows?
4. What temporal representation balances interoperability, readability, and preservation of uncertainty?
5. Which value shapes belong in the first baseline, and which should remain extensions?
6. How should local variable identity map to external health vocabularies without importing their authority or licensing assumptions?
7. Which deletion tombstones are necessary for referential integrity, and what minimum non-sensitive content may they retain?
8. How are derived records invalidated or recalculated when a source is corrected or deleted?
9. Which provenance relationships must be mandatory for manual records versus imported and derived records?
10. What model-validation rules are objective enough for automation, and which require privacy, clinical, accessibility, legal, or research-governance review?

These questions are Sprint 3 work. No answer should be smuggled in through a database schema or implementation shortcut.
