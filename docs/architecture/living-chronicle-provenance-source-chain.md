# Living Chronicle Provenance and Source-Chain Model

**Status:** BASELINE for Sprint 3 workstream 3.5; cryptographic attestations, operational storage, connector protocols, access receipts, and production audit infrastructure remain PROPOSED or DEFERRED

## Purpose

This document defines how a Living Chronicle record remains traceable to the people, source material, capture actions, transformations, derivations, and confirmations that produced it.

It exists to prevent a parsed value, normalized value, AI extraction, connector payload, document claim, imported field, or calculated result from appearing authoritative without an inspectable source chain.

This is an architecture and ontology contract. It does not select a database, event store, object-storage provider, connector protocol, cryptographic signing system, health-data standard, AI provider, audit platform, or production retention mechanism.

## Governing constraints

The provenance model must preserve:

- person-controlled Chronicle truth
- source truth distinct from Chronicle truth
- structured records as authoritative over search indexes, summaries, or generated prose
- explicit separation among authorship, recording, source, custody, transformation, derivation, and confirmation
- traceability for every normalized, calculated, associated, or inferred record
- exact source versions and source locations where the source supports them
- raw source assertions after parsing or normalization
- correction and deletion without silent history rewriting
- provider, connector, operator, and founder replaceability
- meaningful export of records and their provenance
- no requirement for secondary-use consent, research participation, payment, progression, or governance participation to receive core personal value
- no progression or governance advantage for supplying more intimate source material or broader consent
- public and synthetic data only in contributor fixtures

## Core distinction

Provenance answers:

> Where did this claim come from, what happened to it, and who or what accepted it into the Chronicle?

Provenance does not by itself answer:

- whether an actor was authorized to access the data
- whether a permission was valid
- whether an access receipt was issued
- whether a source claim is clinically correct
- whether an inference is safe to show
- whether a source is complete
- whether a model output is trustworthy
- whether a retained source may legally be deleted

Those questions belong to separate permission, receipt, safety, clinical, legal, and lifecycle domains.

## Source-chain principles

1. **Every canonical record has an origin.** A record cannot be represented as source-free merely because it was entered manually.
2. **Source truth is preserved.** Parsing or normalization does not replace what the source originally asserted.
3. **Versions are immutable evidence units.** Replacing bytes, text, payloads, or statements creates a new source version.
4. **Location is explicit when available.** Document-derived claims reference the exact page, region, row, field, message, or other source location.
5. **Transformations are declared.** A parsed, extracted, mapped, normalized, or calculated value identifies the operation and version that produced it.
6. **Derived claims are reproducible.** Every deterministic derived record identifies all required inputs, method, version, and parameters.
7. **AI output is a proposal.** Model confidence, tool success, or extraction completion never substitutes for confirmation.
8. **Confirmation is an event, not an adjective.** The accepting authority, time, accepted proposal, and contract version remain inspectable.
9. **Deletion effects are explicit.** Removing a source, record, or derivative does not silently rewrite the remaining chain.
10. **Integrity evidence is not truth evidence.** A digest may show that bytes are unchanged; it does not prove that the bytes are accurate.

## Provenance concepts

### Source artifact

A stable identity for an evidence container or origin.

Candidate source-artifact kinds include:

- `manual-entry`
- `questionnaire-response`
- `device-payload`
- `service-export`
- `connector-payload`
- `document`
- `image`
- `audio`
- `message`
- `prior-chronicle-record`
- `external-record-reference`

A source artifact is not automatically a canonical Chronicle record.

A manual entry is still a source artifact. The person’s submitted words, values, selected unit, stated time, and context form source truth that must remain distinguishable from later parsing or normalization.

### Source version

An immutable identified version of a source artifact.

A source version conceptually records:

- `id`
- `sourceArtifactId`
- version or revision identifier
- source-artifact kind
- media or representation type
- capture or receipt time
- source-reported creation time when known
- optional byte length or character length
- optional integrity metadata
- custody reference without making the custodian authoritative
- lifecycle and deletion state
- authorship and source-actor references where known

Changing source bytes or source content creates a new source version. A file name, URL, cloud object key, provider ID, or connector cursor is not sufficient as the canonical source-version identity.

### Source locator

A precise or approximate location within one source version.

Candidate locator kinds include:

- page
- page region
- image region
- row and column
- field path
- JSON pointer
- XML path
- spreadsheet cell or range
- byte range
- character range
- timestamp range
- message position
- form question and response
- document section
- whole source version

A locator conceptually records:

- `id`
- `sourceVersionId`
- locator kind
- locator value
- optional human-readable description
- optional extracted source text or source-value snapshot where allowed
- optional confidence or ambiguity note

A locator must not claim more precision than the source supports. A whole-document claim should not fabricate a page or byte range.

### Capture event

The event by which source material entered a controlled Chronicle workflow.

A capture event may represent:

- manual submission
- questionnaire submission
- upload
- local device capture
- connector receipt
- service export receipt
- document scan
- voice or image capture

A capture event conceptually records:

- `id`
- source version created or received
- actor or system performing the capture
- Chronicle identity or draft workspace receiving it
- capture mode
- event time
- source-reported time when different
- client or interface class without making one vendor authoritative
- optional policy or contract version
- declared public or synthetic fixture classification in contributor workflows

Capture does not confirm the source claim as Chronicle truth.

### Import event

A bounded event representing receipt of material from an external system, export, or connector.

An import event conceptually records:

- `id`
- source artifact and version
- external system reference
- importer or connector identity
- import time
- source-system version where known
- declared payload format
- mapping contract version
- success, partial, failed, or quarantined state
- error and omission information

Import success means material was received. It does not prove that the source claim is correct, current, unique, or confirmed by the person.

### Transformation

A declared operation that changes representation without necessarily creating a new semantic claim.

Transformation kinds may include:

- parsing
- text extraction
- optical extraction
- speech transcription
- field mapping
- code mapping
- unit normalization
- date parsing
- temporal normalization
- redaction
- format conversion
- deterministic classification

A transformation conceptually records:

- `id`
- transformation kind
- method identifier
- method version
- implementation or tool identity when relevant
- input source-version, locator, or record references
- parameters and assumptions
- output representation references
- event time
- executing actor or deterministic service
- success, partial, failed, or review-required state
- warnings, ambiguity, and precision effects

The output does not replace the inputs.

### Derivation

A declared operation that creates a new claim from one or more Chronicle records or source assertions.

Examples include:

- unit conversion represented as a derived record
- daily total
- period average
- normalized category
- computed duration
- descriptive association

A derivation conceptually records:

- `id`
- method identifier and version
- complete input-record set
- optional source-locator references
- parameters
- assumptions
- output-record reference
- generated time
- executing deterministic service or authorized actor
- reproducibility state
- invalidation state

Every derived record requires at least one resolvable input. A method name without an exact method version and input set is insufficient.

### Extraction proposal

A structured proposal produced from source material by a person, deterministic parser, or AI-assisted tool.

An extraction proposal conceptually records:

- `id`
- source-version and locator references
- proposed record family
- proposed variable or concept
- proposed value, unit, category, and temporal assertion
- extraction method or tool
- method, model, prompt-policy, or schema version when relevant
- confidence or uncertainty without treating confidence as authority
- warnings and unresolved fields
- creation time

An extraction proposal is not a canonical Chronicle record until confirmed through the domain contract.

### Confirmation event

An explicit event accepting a proposal or captured assertion as a confirmed Chronicle record.

A confirmation event conceptually records:

- `id`
- proposal or draft record reference
- resulting canonical record identity and revision
- confirming actor
- authority basis
- confirmation time
- domain-contract version
- visible fields accepted
- fields corrected or rejected before confirmation
- source and provenance references accepted with the record

AI tools, connectors, imports, devices, operators, story systems, quests, researchers, donors, and governance bodies do not receive independent confirmation authority merely by participating in the workflow.

A deterministic domain service may validate a confirmation and may generate reproducible derived records under an accepted method. It may not convert an AI proposal, import, or source claim into a person-confirmed observation by silently assigning itself the person’s authority.

### External-system reference

A versioned reference to an identifier or location in an external system.

An external-system reference conceptually records:

- system identifier
- namespace or issuer
- external identifier
- system or API version when known
- resource or field type
- relation to the internal source or record
- last observed time
- status

An external ID is metadata. It does not become the Chronicle record ID, Chronicle identity, variable identity, source-version ID, or authority record.

### Integrity evidence

Optional evidence that a source version or export artifact has not changed since a stated operation.

Candidate integrity metadata includes:

- digest algorithm
- digest value
- byte length
- signature reference
- signing identity
- signature time
- verification state

Integrity evidence may be unavailable, unsupported, or inappropriate for some manual and conversational sources. Its absence must not prevent a person from creating a useful Chronicle record.

Integrity evidence proves neither accuracy nor clinical validity.

## Provenance relationship vocabulary

Proposed relationship kinds include:

- `version-of`
- `located-in`
- `captured-as`
- `imported-from`
- `authored-by`
- `recorded-by`
- `supplied-by`
- `custodied-by`
- `parsed-from`
- `extracted-from`
- `mapped-from`
- `normalized-from`
- `transformed-from`
- `derived-from`
- `confirmed-from`
- `confirmed-by`
- `generated-by`
- `references-external`
- `corrected-from`
- `superseded-from`
- `invalidated-by`

Correction, supersession, conflict, duplicate, deletion, and retention relationships have their own domain semantics. They may appear in the wider provenance graph, but provenance does not collapse those relationships into one generic edge.

## Directed-chain rules

The baseline provenance graph is directed from resulting representation toward its supporting inputs and actions.

Example:

```text
Confirmed Chronicle record
  confirmed-from → extraction proposal
  confirmed-by → confirmation event

Extraction proposal
  extracted-from → source locator
  generated-by → extraction transformation

Source locator
  located-in → source version

Source version
  version-of → source artifact
  captured-as → capture event
```

For a derived record:

```text
Derived Chronicle record
  generated-by → derivation

Derivation
  derived-from → input record A
  derived-from → input record B
  uses → method version
```

Rules:

- a node must not reference itself
- the same relationship must not create an unexplained cycle
- every referenced input must resolve or be represented by an explicit unavailable or deleted-source marker
- every derived record must resolve to at least one non-derived or independently sourced origin
- a chain may branch to multiple sources
- a source may support multiple records
- provenance references are immutable historical evidence; corrections add relationships rather than rewriting prior edges

## Minimum provenance by workflow

### Manual self-report

Minimum chain:

1. manual-entry source artifact
2. immutable source version preserving the person’s submitted assertion
3. capture event naming the controlling person as source or author and the interface as recorder where relevant
4. proposed record or draft
5. confirmation event
6. confirmed Chronicle record

A manual entry is not “no provenance.”

### Questionnaire response

Minimum chain:

1. questionnaire definition and version reference
2. response source artifact and immutable version
3. question and response locator
4. submission capture event
5. mapping or parsing transformation when structured fields are created
6. confirmation event where required
7. Chronicle record

Completing a questionnaire does not automatically authorize research use or create game rewards.

### Imported external claim

Minimum chain:

1. external-system reference
2. received payload or export source artifact
3. immutable source version
4. import event
5. exact field or resource locator
6. mapping or parsing transformation
7. proposed imported-claim record
8. confirmation event
9. confirmed Chronicle record

Connector or import success is not confirmation.

### Device assertion

Minimum chain:

1. device or source-system reference
2. immutable payload source version
3. capture or import event
4. exact source locator
5. parsing and variable-mapping transformation
6. proposed direct-observation or imported-claim record according to source semantics
7. person confirmation under the initial baseline
8. confirmed Chronicle record

Later evidence may justify bounded automatic confirmation policies, but none are selected in Sprint 3.

### Document-derived assertion

Minimum chain:

1. source-document artifact
2. immutable document version
3. page, region, or other locator
4. extraction transformation or proposal
5. model, parser, or human method provenance
6. proposed record
7. person review and confirmation
8. confirmed Chronicle record

Replacing the document creates a new document version. It does not rewrite prior locators.

### Normalized representation

Minimum chain:

1. confirmed source record or source assertion
2. normalization transformation
3. method identifier and version
4. input value and source unit
5. output value and canonical unit
6. precision and warning metadata
7. normalized or derived representation

Normalization never deletes the raw representation.

### Deterministic derived record

Minimum chain:

1. all input record identities and revisions
2. derivation method and version
3. parameters and assumptions
4. generation actor or deterministic service
5. generation time
6. output record identity
7. reproducibility and invalidation state

A derived record cannot cite only another summary that lacks a resolvable chain.

### Association or inference

Minimum chain:

1. complete input-record set or versioned cohort query reference
2. method, model, or analytical procedure identifier and version
3. parameters and assumptions
4. uncertainty and limitation metadata
5. generation actor or service
6. review classification appropriate to the risk
7. output association or inference record

An association or inference remains distinguishable from direct observation, diagnosis, treatment recommendation, and proven causality.

### Correction

Minimum chain:

1. prior record identity and revision
2. corrected or successor record
3. correction relationship
4. reason
5. actor
6. event time
7. classification of source, parsing, normalization, calculation, or recollection error
8. preserved source and provenance links

Correction does not mutate the historical source version.

## Authority and provenance

Provenance describes how a claim arose. It does not independently grant authority.

A source may be:

- authoritative for what it asserted
- incomplete or mistaken about the underlying event
- externally supplied but not person-confirmed
- exact in representation but uncertain in meaning
- trustworthy for one purpose and unsuitable for another

The model therefore keeps separate:

- source identity
- source assertion
- provenance chain
- authority state
- lifecycle state
- review or confidence metadata
- permission and access authority

High-confidence provenance is not permission. A complete source chain is not clinical approval. A signed payload is not person confirmation.

## Provenance and access receipts

A provenance event explains how a record was created or transformed.

An access receipt explains that a person, service, agent, or organization accessed or used information under a stated purpose and authority.

They may reference one another, but they remain separate records.

Examples:

- importing a device payload creates provenance
- a research system reading a Chronicle record requires separate permission and receipt semantics
- exporting a Chronicle creates an export-generation event and may also create access or delivery evidence
- a maintainer viewing private data under emergency authority would require access and accountability records; the view does not become source provenance for the underlying record

## Source deletion and record deletion

### Deleting a source artifact or source version

Source deletion must record:

- requested scope
- affected source versions and locators
- affected proposals, records, transformations, and derivations
- processing state
- retention exception where legitimately applicable
- non-sensitive tombstone or unavailable-source marker where required for referential integrity
- completion evidence

When a source becomes unavailable:

- surviving records must not imply that the source remains inspectable
- source references transition to an explicit unavailable, deleted, or retained-under-exception state
- derived records must be reevaluated when required inputs are removed
- a retained canonical assertion may remain only under a declared lifecycle decision rather than silent detachment
- recreation from a deleted source requires a new capture or import action

### Deleting a canonical record

Deleting a canonical record does not automatically delete its source artifact unless the deletion scope says so.

It must also not cause a remaining source artifact to silently recreate the deleted record.

Affected derived records must transition according to their dependency and invalidation rules.

### Deleting a derived record

Deleting a derived record does not delete its inputs.

A later regeneration requires a new derivation event or a declared reproducible rebuild process. It must not reuse a deleted output identity as though nothing changed.

### Retention exceptions

Legal, clinical-safety, security, financial, or technical retention exceptions remain specialist work.

Sprint 3 does not invent them. Any future exception must identify authority, scope, duration, visibility, appeal, and deletion effect.

## Export and portability

A machine-readable Chronicle export should preserve enough information to reconstruct the meaning and history of each included record.

Where included by scope, an export should represent:

- Chronicle record identities and revisions
- record families, authority, and lifecycle states
- source artifacts and source versions
- source locators
- capture and import events
- transformations and derivations
- confirmation events
- correction, supersession, conflict, duplicate, and invalidation relationships
- method and version identifiers
- external mappings and references
- unavailable, deleted, omitted, or retained-under-exception states
- omissions and reasons

The export must not require a proprietary vendor client to interpret the chain.

Custody-specific object keys, internal secrets, access tokens, encryption keys, and infrastructure details do not belong in a portable semantic export.

## Privacy and minimization

Provenance can itself be sensitive.

The model must:

- avoid copying source content into every provenance edge
- preserve the minimum evidence needed to explain origin and transformation
- separate semantic source identity from provider credentials or secrets
- allow a source locator without unnecessarily duplicating the full source
- allow safe omission or redaction in exports while declaring the omission
- avoid encoding unnecessary legal identity or health disclosure into identifiers
- use synthetic provenance examples in the public repository

More detailed provenance must not earn game rewards, governance weight, superior privacy rights, or research eligibility.

## Provider and founder independence

The provenance model supports institutional portability by prohibiting:

- provider-owned canonical record IDs
- connector cursors as source-version identity
- opaque transformations without method versions
- source chains that can be interpreted only by one vendor
- founder-only integrity keys or recovery assumptions
- AI-provider-specific fields as the only explanation of extraction
- inaccessible proprietary export formats
- undocumented operator actions that alter source or confirmation history

A future operator must be able to interpret the semantic chain without private founder knowledge.

## Proposed conceptual contracts

Sprint 3 TypeScript and schema work should define equivalent concepts for:

- `SourceArtifact`
- `SourceVersion`
- `SourceLocator`
- `CaptureEvent`
- `ImportEvent`
- `Transformation`
- `Derivation`
- `ExtractionProposal`
- `ConfirmationEvent`
- `ExternalSystemReference`
- `IntegrityEvidence`
- `ProvenanceRelationship`
- `SourceAvailabilityState`

The exact file layout and persistence representation remain open.

## Objective validation candidates

Automated validation should be able to reject:

- derived records without input references
- normalized records without a method and version
- document-derived records without an exact source-version reference
- source locators whose source version does not exist
- confirmation events without a proposal or resulting record
- confirmed AI proposals without an explicit human or otherwise authorized confirmation event
- self-referential provenance relationships
- unresolved relationship endpoints
- cycles that make a record its own unexplained source
- source-version replacement that reuses an immutable version identity
- external IDs used as canonical Chronicle IDs
- deleted sources still represented as available
- derived records that remain active after a required input is deleted without reevaluation evidence
- contributor fixtures without public or synthetic classification

Automation does not decide whether a source is clinically correct, whether consent is legally valid, or whether an inference is safe.

## Required synthetic scenarios

Sprint 3 fixtures should eventually cover:

1. manual self-report with preserved raw text and confirmed structured observation
2. questionnaire response mapped to a proposed record
3. imported external claim with source payload and exact field locator
4. device assertion with parsing and person confirmation
5. document-derived assertion with version and page-region locator
6. AI-assisted extraction that remains proposed until confirmation
7. unit normalization with preserved raw value and source unit
8. deterministic derived record with multiple inputs
9. correction caused by source error
10. correction caused by parsing or normalization error
11. conflicting records from distinct sources
12. source deletion with surviving canonical assertion marked with unavailable provenance
13. source deletion invalidating a derived record
14. canonical-record deletion while source material remains
15. export containing records, source chains, corrections, and declared omissions

All fixtures must be fictional and classified as public or synthetic.

## Open questions

The following remain Sprint 3 work:

1. Which provenance concepts are top-level records versus embedded structures?
2. Which source content snapshots may be retained inside locators without creating unnecessary duplication or deletion complexity?
3. May an explicitly configured device source ever produce a confirmed record without per-record person confirmation, and what evidence would justify that policy?
4. Which deterministic derivations may be confirmed by domain logic rather than an additional person action?
5. How should a record remain useful when its source is deleted but the person asks to retain the assertion?
6. Which non-sensitive tombstone fields are required for referential integrity?
7. Which integrity evidence belongs in the baseline rather than a later security profile?
8. How should method packages and transformation definitions be exported across implementations?
9. How are provenance chains compacted for presentation without losing authoritative detail?
10. Which provenance operations require privacy, security, clinical, accessibility, legal, or research-governance review?

No answer should be hidden inside a persistence shortcut, vendor SDK, connector implementation, or AI prompt.
