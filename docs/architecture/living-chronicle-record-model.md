# Living Chronicle Record and Assertion Model

**Status:** BASELINE for Sprint 3 workstream 3.3; value, provenance, correction, export, deletion, and interchange encodings remain separate workstreams

## Purpose

This document defines the smallest authoritative record units in the Living Chronicle and the distinctions among direct observations, reports, recollections, imports, calculations, associations, inferences, reflections, and goals.

It prevents all health and lived-experience information from collapsing into one untyped “entry” and prevents source claims, AI drafts, research interpretations, or product state from silently becoming Chronicle truth.

This is an ontology and contract baseline. It does not select database tables, event sourcing, API routes, persistence technology, clinical coding systems, or external interoperability standards.

## Governing constraints

The record model must preserve:

- person control and meaningful confirmation
- structured records as authoritative
- direct claims separated from derived and interpretive claims
- source and method provenance
- correction without silent history rewriting
- exact and approximate time without false precision
- export and deletion as first-class future lifecycles
- no diagnosis or causal claim implied by ordinary observations
- no disclosure-based progression or governance authority
- provider and operator replaceability

## Core decision

Sprint 3 uses two conceptual centers:

1. **Chronicle record envelope** — common identity, authority, lifecycle, subject, time, provenance, and revision metadata.
2. **Discriminated record payload** — family-specific meaning and required fields.

Source artifacts and permission, receipt, story, quest, progression, research, and AI-memory records remain separate entities rather than payload families inside the Chronicle record envelope.

This design gives every Chronicle assertion consistent authority and history semantics without pretending that all record families have the same meaning.

## Chronicle record envelope

A Chronicle record conceptually includes:

- record identity
- schema version
- revision
- Chronicle identity
- subject identity
- record family
- assertion class
- authority state
- lifecycle state
- temporal assertion
- payload
- source references
- provenance references
- author, recorder, and confirmer references when applicable
- method or capture reference when applicable
- uncertainty or confidence representation when applicable
- correction, supersession, retraction, conflict, and duplicate relationships when applicable
- creation and update metadata

The envelope does not make a record authoritative merely because required fields are present.

## Record family versus assertion class

These concepts answer different questions.

- **Record family:** What kind of thing is represented?
- **Assertion class:** How did the claim arise?

For example, an observation may be a direct measurement, self-report, recollection, imported claim, or deterministic calculation. A reflection is a record family and also uses the `reflection` assertion class.

## Authority states

### Proposed

A draft or imported candidate not yet confirmed as canonical Chronicle truth.

AI output, parsed document extractions, connector claims, and imported records begin as proposed unless an explicit trusted workflow later defines a different reviewed authority.

### Confirmed

Accepted by the controlling person or a future explicitly authorized human authority and validated by deterministic domain rules.

Confirmation evidence must identify the record, actor, time, revision, and visible proposal context.

A record cannot become confirmed solely because:

- an AI model assigns high confidence
- an import completes
- a device reports a value
- an operator prefers it
- a quest would complete
- a research workflow wants it
- a governance vote approves it

## Lifecycle states

Initial lifecycle states remain:

- `active`
- `superseded`
- `retracted`
- `deletion-requested`
- `deletion-processing`
- `retained-under-exception`
- `deleted`

Authority and lifecycle are orthogonal. A proposed record may be deleted, and a confirmed record may later be superseded or retracted.

A current Chronicle view normally prefers confirmed active records but must preserve inspectable history and unresolved conflicts.

## Record families

### Observation record

An observation record is a claim about a subject, variable or concept, value, and temporal assertion.

Examples:

- a person reports pain score 4 this morning
- a device reports 7,215 steps on a date
- a laboratory document reports a result
- a person confirms that a medication was taken

An observation requires:

- subject identity
- variable or concept identity
- explicit value shape
- temporal assertion
- assertion class
- source or author context
- authority and lifecycle states

An observation does not imply diagnosis, clinical endorsement, treatment recommendation, or causality.

### Interval record

An interval record represents a state, episode, exposure, behavior, or activity whose meaning spans a duration.

Examples:

- a symptom episode from Monday through Wednesday
- sleep between two times
- medication use over a stated period
- a period of reduced mobility

An interval requires:

- subject identity
- variable or concept identity
- interval temporal assertion
- value, category, or state as applicable
- boundary and open-ended semantics
- assertion class
- source or author context

An interval is not created merely by grouping unrelated point observations. Aggregation requires an identified deterministic method or explicit person-authored episode.

### Reflection record

A reflection preserves narrative context, recollection, meaning, or explanation authored or confirmed by the person.

Examples:

- “I noticed headaches were worse during exam week.”
- “I was caring for a family member and sleeping irregularly.”

A reflection:

- remains distinguishable from structured observation
- may contain source text and temporal context
- may generate proposed structured extractions
- does not automatically create diagnosis, association, or inference
- remains personally useful without requiring extraction

AI-extracted claims from a reflection are separate proposed records until confirmed.

### Goal record

A goal records a person-controlled future intention or desired state.

Examples:

- walk comfortably for ten minutes
- record sleep for one week
- prepare questions for an appointment

A goal:

- is not evidence that an outcome occurred
- does not imply medical appropriateness
- cannot create punishment, diagnosis, consent, or research eligibility
- may be revised, paused, completed, abandoned, or superseded through later lifecycle design
- may inform optional product experiences without becoming story or progression state

### Derived record

A derived record is a deterministic output calculated or normalized from one or more identified inputs using an identified method and version.

Examples:

- unit conversion
- daily sum
- average over a declared period
- normalized category
- deterministic duplicate fingerprint

A derived record requires:

- at least one resolvable input record or source assertion
- method identity and version
- deterministic parameters
- output value and temporal semantics
- provenance chain
- invalidation behavior when inputs change or are deleted

A derived record must be reproducible. If a method is probabilistic or interpretive, the result belongs to association or inference rather than deterministic derivation.

### Association record

An association records a descriptive relationship among identified records or variables.

Examples:

- sleep duration and reported energy moved together during a period
- symptom score was higher on days with a recorded context

An association requires:

- identified input records or cohorts of records
- method and version
- analysis period
- effect or relationship representation
- limitations and uncertainty
- descriptive evidence classification

An association is not diagnosis, treatment advice, or proven causality.

### Inference record

An inference records a non-direct conclusion proposed from evidence.

Examples:

- a classification suggested by a model
- a proposed interpretation of an imported document
- a risk or pattern hypothesis

An inference requires:

- identified evidence inputs
- method or model provenance
- uncertainty
- explicit inference classification
- review requirements appropriate to risk
- presentation that keeps underlying evidence visible

An inference never replaces its source observations. High-risk clinical or safety inferences remain future specialist-governed work.

## Assertion classes

Every assertion record declares one epistemic origin.

### Direct observation

Directly measured or noticed at the represented time.

### Self-report

Stated by the controlling person about current or recent experience.

### Recollection

Remembered retrospectively, often with approximate time and uncertainty.

### Imported claim

Asserted by an external source, document, device, or service.

Import success is evidence that the source made the claim, not proof that the claim is correct.

### Deterministic calculation

Reproducible output from identified inputs and a versioned method.

### Descriptive association

Descriptive relationship among records without a causal claim.

### Inference

Non-direct conclusion with explicit uncertainty and method provenance.

### Intention

Future goal, plan, or desired state.

### Reflection

Narrative context, meaning, or personal recollection.

Assertion class describes origin, not moral quality, importance, or clinical reliability.

## Canonical Chronicle truth

A record is eligible for the canonical Chronicle view when:

- the record envelope and payload validate
- its authority state is `confirmed`
- its lifecycle permits current use
- required confirmation and provenance evidence exist
- it has not been invalidated for the intended use

Canonical does not mean immutable or infallible. Canonical records may be corrected, superseded, conflicted, retracted, exported, or deleted under the model’s explicit lifecycles.

Source truth remains inspectable even when a canonical record is later corrected.

## Draft and import behavior

### Manual draft

A person may create a proposed record and confirm it in one understandable workflow. The confirmation remains a separate authority event even when the interface makes the sequence feel immediate.

### AI-assisted draft

AI may structure or summarize a proposal. The record must identify AI assistance and remain proposed until human confirmation and deterministic validation.

### Connector import

A connector may create source artifacts, imported claims, and proposed records. It may not grant confirmation authority to itself.

### Document extraction

An extraction points to an exact source version and locator. Extracted values remain proposed until confirmed or governed by a later explicitly reviewed workflow.

## Value boundary

Record payloads use explicit value shapes rather than one untyped value.

Candidate shapes include:

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

Workstream 3.4 defines the detailed value, variable, unit, and normalization model.

`0`, `false`, unknown, not measured, not collected, and missing are not interchangeable.

## Variable and concept boundary

Observation and interval records reference stable internal variables or concepts.

External codes, device fields, and connector names are mappings, not internal authority.

A record may be useful before an external clinical code exists. Lack of a clinical terminology mapping must not block a person from recording understandable personal information.

## Temporal boundary

Every assertion uses the Sprint 3 temporal model.

The model must not substitute record creation or import time for asserted time. Exact, date-only, local unresolved, interval, approximate, named-period, relative, and recurring temporal shapes remain distinct.

## Provenance boundary

Manual records preserve author and recorder context. Imported and document-derived records preserve source artifacts and locators. Derived, association, and inference records preserve complete input and method chains.

Detailed provenance requirements belong to workstream 3.5.

## Correction and conflict boundary

Correction, supersession, retraction, invalidation, duplicate handling, and conflict remain explicit relationships rather than destructive overwrites.

Detailed lifecycle semantics belong to workstream 3.6.

## Cross-domain boundaries

### Story, quest, and progression

Product-state domains may receive a bounded fact such as “a declared requirement is satisfied.” They do not copy or own the underlying sensitive record.

Record detail, intimacy, or disclosure volume cannot increase rewards or governance weight.

### Consent and receipts

The Consent domain governs purpose-specific authority. The Chronicle stores person-controlled records. Receipt and audit domains record use. These remain separate truths.

### AI memory

AI memory and conversation retention remain separate from Chronicle records. A reflection does not automatically become AI memory, and AI memory does not become Chronicle truth.

### Research and compensated opportunities

Research datasets, protocol state, eligibility, compensation, and opportunity participation remain outside Chronicle authority and require separate future gates.

## Presentation rules

Interfaces must distinguish:

- proposed versus confirmed
- active versus superseded or retracted
- direct observation versus report or recollection
- imported claim versus person-authored record
- deterministic derivation versus association or inference
- source value versus normalized value
- fact versus intention or reflection

A composed summary or chart does not become authoritative merely because it is easy to read.

## Initial invariants

Sprint 3 contracts and validators should eventually enforce:

- every record uses a supported family and assertion class
- family and assertion class combinations are valid
- confirmed records have human confirmation evidence
- AI and import actors cannot be the sole confirmer
- observations and intervals identify Chronicle, subject, concept, value, and time
- reflections remain separate from extracted structured proposals
- goals are not evidence of completion
- deterministic derived records have resolvable inputs and method version
- associations and inferences are not labeled direct observations
- imported claims preserve external source identity
- record creation time is not substituted for asserted time
- lifecycle and authority states remain distinct
- story, quest, consent, research, and AI-memory identifiers cannot substitute for Chronicle-record identity
- public fixtures contain only synthetic records

## Workstream 3.3 acceptance

The architecture baseline is satisfied when:

- one personally confirmed observation can be represented without a clinical coding system;
- the same envelope supports future external mappings without importing their authority;
- exact and approximate time use the temporal model;
- AI and imports create proposals rather than silent canonical records;
- direct observations, reports, recollections, imported claims, calculations, associations, inferences, reflections, and intentions remain distinguishable;
- derived and interpretive records preserve their inputs and methods;
- current presentation can prefer a record without deleting conflicting or superseded history; and
- product state, permission state, research state, and AI memory remain separate.

## Deferred decisions

- TypeScript and JSON Schema encoding
- external terminology mappings
- clinical review requirements by variable or inference class
- detailed value and unit contracts
- provenance edge schema
- correction and duplicate implementation
- export and deletion encoding
- migration and compatibility guarantees
- persistence and indexing
