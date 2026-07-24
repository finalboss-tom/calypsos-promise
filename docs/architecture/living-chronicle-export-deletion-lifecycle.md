# Living Chronicle Export, Portability, Deletion, Retention-Exception, and Tombstone Lifecycle

**Status:** BASELINE for Sprint 3 workstream 3.8; production export services, deletion workers, legal retention policy, secure-erasure verification, recovery procedures, and specialist review remain PROPOSED or DEFERRED

## Purpose

This document defines how a person requests, receives, verifies, and understands a portable representation of the Living Chronicle, and how deletion proceeds without collapsing request, scope, processing, retention exception, tombstone, and completion into one ambiguous flag.

It exists to prevent:

- proprietary export lock-in
- deletion claims that cannot be inspected
- silent omission of source or provenance material
- hidden retention exceptions
- accidental resurrection of deleted material
- deletion of one object being misrepresented as deletion of every related object
- source or Chronicle deletion being used as a substitute for correction, retraction, conflict review, or consent withdrawal
- operators, providers, researchers, story systems, AI tools, or governance bodies from overriding person-controlled export and deletion rights

This is an architecture and ontology contract. It does not select an archive format, storage provider, encryption envelope, deletion queue, backup system, legal retention schedule, regulatory jurisdiction, identity-verification vendor, access-receipt implementation, or user-interface design.

## Governing constraints

The model must preserve:

- useful personal value without research, commercial, governance, compensation, or broader-consent participation
- person-controlled inspection, export, correction, and deletion
- structured Chronicle records as authoritative over generated summaries or proprietary viewers
- machine-readable and human-readable portability
- provenance, source version, correction, conflict, duplicate, and lifecycle context
- clear omission and unavailability reasons
- explicit distinction among record deletion, source deletion, attachment removal, custody-copy deletion, derivative deletion, export deletion, account closure, consent withdrawal, and research withdrawal
- explicit dependent-record effects
- retention exceptions that are named, scoped, reviewable, and never invented silently
- minimal non-sensitive tombstones only where a declared purpose requires them
- provider, operator, maintainer, and founder replaceability
- no incentive for keeping more intimate material, retaining it longer, or foregoing deletion
- no progression or governance penalty for export, correction, withdrawal, or deletion
- public or synthetic data only in contributor fixtures

## Core principle

> Export makes the Chronicle portable. Deletion makes lifecycle effects explicit. Neither process transfers control away from the person.

An export is a generated representation. It is not a transfer of ownership, a research authorization, a public release, a clinical endorsement, or a replacement for the canonical Chronicle.

A deletion request is a governed lifecycle action. It is not complete merely because one row, file, cache, or screen is removed.

## Domain separation

The architecture separates the following concepts.

### Export request

A person-initiated or explicitly authorized request describing what should be prepared for portability or inspection.

An export request conceptually records:

- `id`
- `schemaVersion`
- `revision`
- `chronicleId`
- requesting actor
- request time
- requested scope
- requested formats
- requested language or locale where relevant
- inclusion preferences for sources, provenance, corrections, deleted-record evidence, and human-readable context
- requested time range where applicable
- requested subject or record-family filters where applicable
- accessibility preferences where applicable
- request status
- cancellation status
- authorization or step-up reference when later required
- creation and update metadata

The request may be fulfilled fully, partially, or not at all. Every omission requires an explicit reason.

### Export plan

A deterministic planning result that resolves the requested scope into identified records, relationships, source versions, derived representations, omissions, and dependencies.

The plan conceptually records:

- export request ID
- contract and schema versions
- included Chronicle record IDs
- included relationship IDs
- included source-artifact and source-version IDs
- included provenance and transformation IDs
- included lifecycle and deletion-evidence IDs
- included human-readable sections
- excluded or unavailable objects and reasons
- expected formats
- expected packaging structure
- plan time
- planning method and version
- unresolved hold points

Planning does not create permission for unrelated use. The plan is limited to fulfilling the person’s export request.

### Export artifact

A generated portable representation created from an export plan.

An export artifact conceptually records:

- `id`
- export request and plan IDs
- format identifier
- format version
- Chronicle schema version
- generation time
- covered scope
- included object manifest
- omission manifest
- integrity metadata where useful
- generator identity and version
- encryption or packaging metadata as implementation details
- availability and expiration state
- custody reference
- download or delivery status
- deletion status for the export artifact itself

The export artifact is not the canonical Chronicle. Regenerating the same request later may produce a different artifact because records, corrections, lifecycle, or available sources have changed.

### Export manifest

A machine-readable index of what the artifact contains and what it omits.

The manifest must distinguish:

- canonical Chronicle records
- proposed records
- source artifacts
- source versions
- source locators
- transformations and derivations
- confirmation events
- corrections, amendments, supersessions, retractions, invalidations, conflicts, duplicate decisions, merges, and unmerges
- attachment relationships
- deletion requests and completion evidence
- retained-under-exception material
- unavailable material
- omitted disposable derivatives
- external references that may no longer resolve

The manifest should permit another conforming implementation to reconstruct relationships without access to provider-specific internal keys.

### Human-readable export

A representation understandable without proprietary software or specialized database knowledge.

It should explain:

- what a Chronicle record says
- whether it is proposed or confirmed
- its current lifecycle state
- the source or sources supporting it
- whether normalization, extraction, AI assistance, or derivation was involved
- whether the person confirmed it
- whether it has been corrected, conflicted, superseded, retracted, invalidated, merged, unmerged, or deleted
- which source versions are unavailable or omitted
- what retention exceptions remain unresolved
- what the export does not include

Human-readable output must not flatten uncertainty, conflict, approximate time, or source disagreement into false certainty.

### Machine-readable export

A structured representation preserving stable identifiers, explicit value shapes, temporal assertions, provenance, source versions, relationships, lifecycle, and omission reasons.

It must not require:

- one vendor’s object-store key
- one provider’s authentication subject
- a proprietary database dump
- a proprietary viewer
- a private API available only from the original operator
- a token, wallet, blockchain, or governance credential
- secondary-use consent

The pre-stable Sprint 3 export contract may change before `1.0.0`, but every change requires explicit migration and compatibility notes.

## Export scope

A request may include one or more declared scopes.

Candidate scopes include:

- full Chronicle
- selected record IDs
- selected record families
- selected variables or concepts
- selected temporal range
- selected source artifacts or versions
- corrections and history only
- provenance only
- source documents and attachments where available
- deletion and retention evidence
- person-readable summary plus structured data

Scope selection must not silently exclude context necessary to interpret the exported records.

A narrow export may omit unrelated intimate material, but it still includes enough schema, variable, unit, temporal, and provenance metadata to interpret the selected records.

## Export inclusion rules

### Chronicle records

Confirmed Chronicle records in scope are included unless unavailable under an explicit, reviewable reason.

Proposed records are included only when requested or when necessary to explain a confirmation, rejection, correction, or deletion history.

### Source material

Retained source material may be included when requested and permitted by the person’s declared scope and later security policy.

The artifact must distinguish:

- source bytes included
- structured source payload included
- source metadata only
- source unavailable
- source deleted
- source retained under exception
- external source reference only

### Provenance

Every normalized or derived record includes the provenance needed to identify inputs, methods, versions, assumptions, and confirmation history.

### Corrections and conflict history

Current presentation must not erase prior records or relationships. Export includes correction, supersession, conflict, duplicate, merge, and unmerge history according to the requested scope and deletion rules.

### Disposable derivatives

Search indexes, embeddings, thumbnails, caches, and previews may be omitted by default when the canonical source and transformation metadata are sufficient.

Their omission must not remove the only surviving evidence of a source or transformation.

## Export omission reasons

Every omitted in-scope object requires an allowlisted reason and explanatory metadata.

Candidate reasons include:

- `deleted`
- `unavailable`
- `corrupt`
- `retained-under-exception`
- `external-reference-expired`
- `outside-requested-scope`
- `security-hold`
- `format-not-supported`
- `generation-failed`
- `dependency-unavailable`
- `person-cancelled`
- `other-documented`

`Other-documented` requires human-readable detail and cannot become a generic hiding place for institutional convenience.

## Export lifecycle

Candidate export-request states include:

- `requested`
- `scope-resolving`
- `planned`
- `generating`
- `partially-generated`
- `generated`
- `delivery-ready`
- `delivered`
- `cancelled`
- `failed`
- `expired`
- `deletion-requested`
- `deleted`

State transitions record actor or deterministic service, time, reason, and failure detail where relevant.

A generated export is not considered delivered merely because it exists in storage.

## Portability requirements

A portable export must support migration to a replacement operator or implementation.

Portability requires:

- stable provider-independent identifiers
- schema and format versions
- explicit variable, category, and unit definitions or references
- original and normalized values
- exact and approximate temporal assertions
- provenance and source relationships
- correction and lifecycle relationships
- source-availability and omission states
- deletion and retention evidence
- documented validation rules
- enough plain-language context for a person to understand the export

Portability does not require every implementation to reproduce every interface, story surface, AI feature, or provider-specific derivative.

## Deletion request

A deletion request is an explicit request to erase, detach, withdraw, or make unavailable identified material according to a declared scope.

A deletion request conceptually records:

- `id`
- `schemaVersion`
- `revision`
- `chronicleId`
- requesting actor
- request time
- requested scope
- requested object IDs or selectors
- requested effect
- reason, optional for the person
- identity or authority verification reference where later required
- cancellation state
- processing state
- resolved scope
- discovered dependencies
- proposed exceptions
- completion evidence references
- creation and update metadata

The person need not provide a persuasive reason to exercise a supported deletion right.

## Deletion scope

Deletion scope must name what is being requested.

Candidate target kinds include:

- Chronicle record
- record family
- variable or temporal range
- source artifact
- source version
- source locator
- attachment relationship
- custody copy
- derived representation
- transformation output
- correction or conflict relationship
- export artifact
- Chronicle as a whole
- account closure, governed separately

Deletion of one target kind does not imply deletion of every related object.

## Deletion effects

### Chronicle-record deletion

A request to delete a Chronicle record triggers evaluation of:

- source material
- provenance relationships
- successor and predecessor records
- corrections and supersessions
- conflicts and duplicate relationships
- derived records
- associations and inferences
- exports
- bounded product facts
- search and disposable derivatives

The declared result may include erasure, tombstoning, dependency invalidation, recomputation, or explicit retention exception according to later policy.

### Source-version deletion

Deleting a source version triggers evaluation of:

- locators
- extraction proposals
- confirmed records
- normalized and derived records
- conflicts
- corrections
- duplicate and merge relationships
- exports
- integrity and review evidence

Dependents must become explicitly `source-unavailable`, `provenance-degraded`, `recompute-required`, `invalidated`, or deleted according to their contracts.

### Attachment deletion

Removing an attachment relationship does not erase the source or target record. It may trigger provenance review when the attachment was the only declared support.

### Custody-copy deletion

Deleting one copy does not establish source deletion when another authorized copy remains.

### Derived-representation deletion

Deleting OCR, preview, transcript, index, embedding, cache, or normalized intermediate output does not delete the source version or confirmed Chronicle record.

### Export-artifact deletion

Deleting an export artifact removes the generated portable package according to its own lifecycle. It does not delete the canonical Chronicle material from which it was generated.

### Chronicle-wide deletion

A full-Chronicle request resolves every included domain object, source object, derivative, export, tombstone, and exception within the Chronicle boundary.

It must not be represented as complete while identified in-scope objects remain unresolved without explicit exception or failure evidence.

## Deletion lifecycle

Candidate states include:

- `requested`
- `scope-resolving`
- `scope-confirmed`
- `awaiting-required-review`
- `processing`
- `partially-completed`
- `retained-under-exception`
- `blocked`
- `failed`
- `cancelled`
- `completed`

The lifecycle must not use one boolean such as `isDeleted` to represent these distinct conditions.

### Requested

The system has received the person’s deletion request.

No completion claim may be made at this stage.

### Scope resolving

The system identifies all target objects, custody copies, source versions, derivatives, exports, dependencies, and domain boundaries affected by the request.

### Scope confirmed

The resolved scope is represented in understandable form, including objects that may require separate processing or specialist review.

### Awaiting required review

A declared legal, safety, security, or technical question prevents immediate completion.

The review requirement must be named and cannot be invented by a provider or operator merely to avoid deletion work.

### Processing

Erasure, detachment, invalidation, recomputation, key destruction, queue cleanup, index cleanup, or other declared actions are underway.

### Partially completed

Some in-scope actions completed while others remain unresolved.

The state identifies completed, failed, blocked, and excepted objects individually.

### Retained under exception

Material remains under a separately governed, valid exception.

Sprint 3 defines the representation, not which exceptions are legally or ethically valid.

### Blocked

The implementation cannot proceed because an identified dependency, authorization problem, provider failure, or unresolved specialist decision prevents action.

### Failed

A specific processing action failed. Failure must not be silently converted into completion.

### Cancelled

An authorized actor cancelled the request before completion. Completed destructive actions are not automatically reversible.

### Completed

Every resolved in-scope object is accounted for as erased, detached, invalidated, recomputed, tombstoned, retained under an explicit exception, or failed with truthful evidence.

Completion evidence must state residual exceptions and unavailable verification.

## Retention exceptions

A retention exception is a separately governed decision to retain identified material despite a deletion request.

A retention-exception record conceptually includes:

- `id`
- deletion request ID
- retained object IDs or scope
- exception-policy identifier
- exception-policy version
- legal, safety, security, or technical basis category
- responsible authority
- decision time
- review state
- start time
- review or expiration time
- access restrictions
- permitted uses
- prohibited uses
- appeal or challenge path
- release or deletion condition
- tombstone and export behavior
- creation and update metadata

The exception must be:

- specific rather than blanket
- minimal in scope
- time-bounded or reviewable
- visible to the person when disclosure is permitted
- unable to create research, commercial, progression, or governance authority
- unable to justify retaining unrelated source material

A provider’s backup limitation, operational inconvenience, or business preference is not automatically a valid exception.

## Tombstones

A tombstone is a minimal non-sensitive referential marker retained after deletion for a declared purpose.

Candidate purposes include:

- preventing identifier reuse
- preventing accidental resurrection during import or synchronization
- representing that an object was intentionally deleted
- preserving dependency state
- proving that a deletion request completed
- preventing a deleted source from silently reappearing as current

A tombstone conceptually records only what is necessary, such as:

- tombstone ID
- deleted object type
- irreversible or pseudonymous reference to the deleted object when required
- deletion request ID
- completion time
- tombstone purpose
- minimal relationship state
- expiration or review state where applicable

A tombstone must not retain merely for convenience:

- health values
- narrative text
- document names
- source excerpts
- intimate categories
- diagnoses or clinical claims
- original file paths
- public identifiers
- research eligibility
- progression or governance history derived from disclosure

Tombstone content requires later privacy, security, and legal review.

## Accidental resurrection prevention

Deleted material must not silently return through:

- connector replay
- provider restoration
- backup recovery
- device resynchronization
- repeated import
- cached read models
- vector-index rebuilds
- regenerated derivatives
- stale export re-import
- operator migration

Prevention mechanisms remain implementation work, but the model must preserve enough minimal state to detect and review potential resurrection without retaining the deleted content itself.

A resurrected candidate begins in a quarantined or review state. It does not become current Chronicle truth automatically.

## Backup and replica boundary

Sprint 3 does not define backup architecture or legal erasure standards.

The model requires later implementations to distinguish:

- active canonical storage
- replicas
- caches
- queues
- backups
- archives
- provider logs
- security evidence
- exported artifacts
- user-held copies outside institutional control

A deletion completion claim must state which declared storage classes were processed, which remain under exception, and which cannot be controlled by the institution.

The institution cannot truthfully claim deletion of copies independently retained by the person or another authorized recipient.

## Correction, retraction, consent, and withdrawal boundaries

Deletion is not interchangeable with:

- correcting a wrong value
- superseding an old state
- retracting an unreliable claim
- withdrawing permission for future access
- withdrawing from research
- closing an account
- dismissing a quest or notification
- clearing Aster memory
- hiding a record from default presentation

A person may exercise multiple actions together, but each domain records its own lifecycle and effects.

Consent withdrawal stops future authorized use according to the Consent Engine. It does not silently delete Chronicle truth.

Research withdrawal follows a later research-governance contract. It does not silently redefine the Chronicle deletion lifecycle.

## Derived-record effects

When a source or Chronicle record is deleted, every dependent normalized record, derived record, association, inference, summary, export, and bounded product fact must be evaluated.

Candidate dependent states include:

- `still-valid`
- `source-unavailable`
- `provenance-degraded`
- `recompute-required`
- `invalidated`
- `superseded`
- `deletion-requested`
- `deleted`
- `retained-under-exception`

A dependent record does not remain current merely because recomputation is inconvenient.

## Story, quest, progression, and governance effects

Story, quest, progression, notification, and governance systems may receive a bounded fact that previously existed or that a requirement is no longer satisfied.

They must not:

- retain sensitive Chronicle content as a substitute copy
- punish deletion or withdrawal
- revoke core product rights because a person exported or deleted material
- remove earned non-cash progress solely because sensitive source material was deleted, unless an explicit non-punitive correction policy requires recomputation
- convert deletion into negative reputation or governance weight
- require broader consent to complete deletion

Any progression adjustment must follow the deterministic incentive contract and preserve non-punitive return.

## AI and automated processing boundaries

AI and automated tools may:

- explain export scope
- propose a human-readable manifest
- identify potential dependencies
- summarize omission reasons
- assist with locating export content
- propose deletion-scope clarifications
- identify possible resurrection candidates

They may not independently:

- broaden or narrow a deletion request
- invent a retention exception
- declare deletion complete
- delete canonical records or sources
- expose exported material to a new purpose
- suppress unresolved failures
- convert an export into research or commercial use
- decide that a person’s request is inconvenient or unnecessary
- create progression or governance consequences

Deterministic domain logic validates lifecycle transitions. Material exceptions and ambiguous scope require authorized human review.

## Operator and provider boundaries

Operators and providers may execute declared processing under explicit capability and least privilege.

They do not gain:

- ownership of exported material
- truth authority
- discretion to expand retention
- permission to reuse export artifacts
- authority to condition deletion on payment, progression, research participation, or governance standing
- authority to hide provider limitations from completion evidence

Provider migration must preserve export and deletion identities, scope, evidence, and unresolved exceptions.

## Completion evidence

Deletion completion evidence should be understandable and machine-readable.

It conceptually identifies:

- deletion request ID
- resolved scope
- processing start and completion times
- completed object actions
- tombstones retained and purposes
- retained-under-exception objects and review dates
- failed or unverifiable actions
- dependent-record outcomes
- processed storage classes
- generator or responsible service version
- responsible authority where human review occurred
- appeal, correction, or support path

Completion evidence must not expose deleted health values merely to prove deletion.

## Export and deletion together

A person may request an export before deletion.

The architecture must support:

1. resolving the export scope
2. generating and delivering the export
3. verifying delivery state
4. accepting or continuing a deletion request
5. processing the deletion independently
6. deleting the institutional export artifact according to its own lifecycle

The institution cannot control copies already downloaded or independently stored by the person.

Export-before-delete must not become mandatory when a person prefers direct deletion.

## Institutional and governance constraints

The model supports founder independence by ensuring that:

- exports do not depend on founder-held credentials
- deletion cannot require personal founder intervention
- formats are documented and replaceable
- provider migrations preserve lifecycle evidence
- exceptions have accountable roles rather than informal permission
- no donor, owner, token holder, council, or majority vote can waive a person’s core export or deletion rights through ordinary governance
- emergency powers cannot permanently suspend deletion without narrow scope, audit, and automatic review

Material weakening of export, deletion, tombstone minimization, meaningful refusal, or non-punitive return requires constitutional review and evidence.

## Specialist hold points

Sprint 3 leaves the following unresolved for qualified review:

- valid legal and safety retention categories
- jurisdiction-specific deletion obligations
- backup and immutable-log treatment
- secure-erasure evidence
- identity and authority verification for sensitive deletion requests
- caregiver, dependent, estate, incapacity, and delegated-control requests
- minors and guardians
- deletion under active security or abuse investigation
- audit-log minimization
- tombstone content and duration
- accessibility requirements for large exports
- export encryption and key recovery
- handling of third-party copies and recipients
- regulatory medical-record boundaries where applicable
- research withdrawal and already-used data

These questions must remain explicit. Implementations must not treat the absence of a selected rule as permission to retain indefinitely.

## Minimum validation targets

Later contracts and validators should be able to reject:

- a completed deletion request with unresolved in-scope objects and no exception or failure evidence
- a retention exception without policy identifier, authority, scope, or review time
- a tombstone containing Chronicle values or source excerpts
- an export artifact without schema version or manifest
- a derived record left current after deletion of a required input
- an omission without a declared reason
- a provider-specific identifier used as the only portable identity
- an export that silently flattens proposed and confirmed authority
- deletion represented by one ambiguous boolean
- an AI-generated completion claim without deterministic evidence
- progression or governance penalties tied to deletion or export
- public fixtures containing private or production health data

## Required synthetic scenarios

Sprint 3 fixtures should later cover:

- full Chronicle export with records and provenance
- narrow time-range export
- export with unavailable source version
- export with correction and conflict history
- export before full-Chronicle deletion
- single-record deletion with retained source
- source-version deletion with derived-record invalidation
- attachment removal without source deletion
- custody-copy deletion with another verified copy remaining
- partial deletion with one explicit retention exception
- failed deletion action that remains visible
- minimal tombstone preventing connector replay
- accidental resurrection candidate after backup restore
- person cancellation before processing
- export-artifact expiration and deletion
- deletion with story and progression systems receiving only bounded non-sensitive effects

All scenarios use public or synthetic material.

## Acceptance criteria for workstream 3.8

The architecture baseline is acceptable when:

- export request, plan, artifact, manifest, and delivery are distinct
- machine-readable and human-readable portability are both defined
- omission and unavailability are explicit
- deletion request, scope resolution, processing, exception, tombstone, and completion are distinct
- deletion effects across records, sources, attachments, custody copies, derivatives, exports, and dependents are explicit
- no retention exception can be implied or provider-invented
- tombstones are purpose-limited and non-sensitive
- accidental resurrection has an explicit model boundary
- correction, consent withdrawal, research withdrawal, account closure, and deletion remain separate
- export and deletion do not create progression, governance, payment, or broader-consent pressure
- founder and provider replacement do not break portability or lifecycle evidence
- unresolved specialist questions remain visible
- no production persistence or legal conclusion is represented as implemented
