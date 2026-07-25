# Sprint 3 — Canonical Data Model v1

**Status:** IN PROGRESS — architecture, ontology, schema, validation, and documentation only

## Goal

Define the authoritative Living Chronicle contract before production persistence, connectors, analytics, agents, or real health-data flows are implemented.

Sprint 3 establishes what a Chronicle record means, how its identity and time are represented, how every assertion remains traceable to its sources, and how correction, conflict, supersession, export, and deletion behave.

The sprint must preserve the frozen player promise:

> Build your Living Chronicle. Improve your health. Keep the key.

It must also preserve the frozen institutional mandate added through Decision 0003: personal value comes first, authority and providers remain replaceable, broader consent is not rewarded, and future governance cannot convert intimate disclosure into institutional power.

## Entry conditions

Sprint 3 begins from the merged Sprint 0–2 and progressive-decentralization baselines:

- the Product Constitution defines person control, correction, export, deletion, purpose-specific permission, and meaningful refusal
- the Architecture Foundation defines the Living Chronicle, provenance, correction, exports, and deletion as distinct domain boundaries
- Sprint 2 separates Chronicle truth from story, quest, progression, consent, receipt, and Aster-memory truth
- structured records remain authoritative
- AI may propose drafts but may not write canonical Chronicle records
- public contributor workflows use only public or synthetic data
- production providers, topology, and integrations remain unselected

## Sprint principles

1. **Personal utility first.** A record must be useful to the person without research, commercial sharing, governance participation, or compensation.
2. **The person controls the Chronicle.** Account administration, providers, maintainers, researchers, story systems, and AI tools do not own Chronicle truth.
3. **Facts remain distinguishable from other claims.** The model must distinguish observation, recollection, calculation, association, interpretation, and inference.
4. **Provenance is structural.** Derived or normalized records cannot exist without traceable source relationships.
5. **History is correctable, not silently rewritten.** Correction and supersession preserve an inspectable chain.
6. **Deletion is explicit.** The model must distinguish deletion request, application, retention exception, tombstone, and completed erasure where applicable.
7. **Time reflects uncertainty.** Exact instants, intervals, dates, recurring periods, and approximate time require distinct representation.
8. **Conflicts remain visible.** Conflicting sources are not collapsed merely for convenience.
9. **Providers remain replaceable.** The canonical contract must not encode one cloud, database, device ecosystem, AI vendor, or connector.
10. **No disclosure incentive.** Additional detail, intimate categories, or broader permission must not create progression, governance weight, or superior core rights.

## Workstreams

### 3.1 Authority and identity boundaries

Define:

- account identity versus Chronicle identity
- pseudonymous internal identifiers
- subject-of-record identity
- actor, author, recorder, source, and custodian distinctions
- ownership and control semantics without selecting a legal or identity provider
- multi-person and caregiver scenarios as unresolved extensions rather than hidden assumptions

Acceptance:

- a Chronicle can be modeled without using an email address, provider subject, or public identity as its canonical key
- caller identity and record subject are not supplied as interchangeable values
- record control is not confused with storage custody

### 3.2 Temporal model

Define:

- exact instant
- calendar date without a known time
- bounded interval
- open interval
- approximate instant or interval
- recurring or repeated period
- source-reported time versus normalized time
- time zone, offset, and uncertainty provenance

Acceptance:

- the model represents “around March 2021,” “during high school,” “from Monday to Wednesday,” and a precise device timestamp without converting them into false precision
- normalization never discards the original temporal assertion

### 3.3 Observation and assertion model

Define the smallest authoritative record unit and its relationship to:

- subject
- variable or concept
- value
- unit
- category or code
- method
- body site or context when relevant
- source
- author or recorder
- temporal scope
- confidence or uncertainty
- status and lifecycle

The model must distinguish a direct observation from a recollection, imported claim, calculated value, descriptive association, and future inference.

Acceptance:

- one personally confirmed observation can be represented without requiring a clinical coding system
- the same model can later map to external standards without making those standards the internal authority
- a draft proposed by AI cannot become authoritative without explicit human confirmation and domain validation

### 3.4 Variables, units, and normalization

Define:

- stable internal variable identity
- human-readable labels and aliases
- category and unit dimensions
- canonical versus display units
- raw, parsed, normalized, and derived value relationships
- normalization version and method
- unsupported or unknown units
- local and external-code mappings

Acceptance:

- raw values remain inspectable after normalization
- unit conversion is deterministic and versioned
- unknown or incompatible units fail visibly rather than being coerced

### 3.5 Provenance and source chains

Define:

- source artifact
- source fragment or locator
- capture event
- import event
- transformation
- derivation
- human confirmation
- correction relationship
- external-system reference
- hash or integrity metadata as optional implementation-independent evidence

Acceptance:

- every normalized or derived record can trace to one or more source assertions
- provenance supports documents, manual entry, devices, connectors, and AI-assisted extraction without trusting any one provider
- source deletion and canonical-record deletion have explicit and distinguishable effects

### 3.6 Correction, conflict, duplicate, and supersession

Define:

- correction without mutation of historical evidence
- supersession relationships
- retraction or invalidation
- duplicate candidate versus confirmed duplicate
- merge and unmerge semantics
- conflicting values from distinct sources
- preferred presentation without deleting disagreement
- reason and actor metadata

Acceptance:

- a corrected record preserves what changed, why, by whom, and when
- two conflicting blood-pressure values can coexist with separate provenance
- duplicate detection does not silently erase records

### 3.7 Documents, attachments, and versions

Define conceptual relationships among:

- source document
- document version
- attachment metadata
- content type
- integrity information
- page, region, or text locator
- extracted assertions
- retention and deletion state

This work does not select object storage or document-processing providers.

Acceptance:

- a derived assertion can reference the exact document version and source location from which it came
- replacing a document creates a new version rather than rewriting the original source identity

### 3.8 Export, portability, and deletion lifecycle

Define:

- export request and generated export
- machine-readable canonical representation
- human-readable representation
- source inclusion and provenance inclusion
- deletion request
- deletion scope
- deletion processing state
- legally or technically retained material
- tombstone or non-sensitive referential marker
- completion evidence

Acceptance:

- the person can export useful records and their provenance without a proprietary client
- deletion states are not represented by one ambiguous boolean
- story, quest, progression, consent, receipt, and Chronicle deletion semantics remain separate

### 3.9 Synthetic fixtures and minimum viable validation

Create public synthetic scenarios covering:

- exact and approximate time
- manual entry and imported source
- normalization and unit conversion
- correction and supersession
- duplicate candidates
- conflicting sources
- document-derived assertions
- export state
- deletion state and retention exception
- diverse names, ages, abilities, cultures, and data availability without stereotyping or using real records

Validation must check objective invariants such as:

- identifier grammar
- required provenance for derived records
- temporal-shape consistency
- valid lifecycle transitions
- correction and supersession references
- unit and value compatibility
- duplicate and dangling identifiers
- separation of canonical, draft, and derived authority
- public or synthetic fixture classification

## Deliverables

Sprint 3 should produce:

- Sprint 3 plan and acceptance record
- Living Chronicle ontology
- authoritative model baseline
- identifier and lifecycle conventions
- temporal model specification
- provenance model specification
- correction, conflict, duplicate, supersession, export, and deletion semantics
- TypeScript contracts for the model
- JSON Schema authoring or interchange export where useful
- deterministic validators
- synthetic fixtures
- invariant-focused tests
- migration and compatibility notes for the pre-stable model
- completion record with exact validation evidence

## Explicit non-scope

Sprint 3 does not select or implement:

- production database topology or SQL migrations
- cloud, storage, queue, analytics, or AI providers
- production accounts or authentication
- real health-data ingestion
- connector SDKs or device adapters
- House of Keys consent implementation
- access receipts implementation
- story, quest, or progression persistence
- Aster memory or semantic retrieval
- diagnosis, treatment, clinical decision support, or causal inference
- research access, compensated opportunities, marketplaces, or data sales
- identity or anti-Sybil systems
- legal entities, treasury custody, ownership instruments, tokens, blockchain, NFTs, or on-chain governance

The existing roadmap lists database migrations as a Sprint 3 deliverable. Under the current architecture-only constraint, Sprint 3 may define migration requirements and synthetic migration scenarios, but executable production migrations remain deferred until the model is accepted and runtime implementation resumes.

## Governance and institutional checks

Every material model decision must answer:

- Does this preserve person control and usable export?
- Can the record survive a vendor or operator replacement?
- Does it reduce or increase founder and provider dependency?
- Can an affected person inspect and correct the result?
- Does the design require broader consent, unnecessary disclosure, payment, progression, or governance participation?
- Could capital, contributor activity, or disclosure volume become authority over another person’s record?
- Is an unresolved safety, privacy, accessibility, clinical, legal, or research claim being represented as settled?

A “yes” to either of the last two risk questions is a hold point.

## Proposed execution sequence

1. Freeze Sprint 3 scope, terms, and non-scope.
2. Establish authority, identity, and truth-class distinctions.
3. Establish temporal and observation primitives.
4. Establish variable, unit, and normalization rules.
5. Establish provenance and source-chain semantics.
6. Establish correction, conflict, duplicate, and supersession semantics.
7. Establish document, export, and deletion lifecycles.
8. Add contracts, schemas, validators, and synthetic fixtures.
9. Run a cross-contract consistency review.
10. Record unresolved questions and Sprint 3 completion evidence.

## Sprint acceptance criteria

Sprint 3 closes only when:

- the authoritative model is internally consistent across documentation, types, schemas, validators, tests, and fixtures
- a person-controlled observation can be created, normalized, traced, corrected, conflicted, superseded, exported, and deleted in the model
- exact and approximate time are represented without false precision
- derived records always preserve source chains
- story, quest, progression, consent, receipt, Aster-memory, and research state remain separate
- no public fixture contains production or private health data
- no record requires secondary-use consent for personal utility
- no health disclosure affects game rewards or governance weight
- provider and storage choices remain replaceable
- unresolved specialist questions are explicit rather than implied as approved
- formatting, policy, typecheck, tests, and any Sprint 3 model-validation checks pass
- the completion record identifies what remains proposed or deferred
