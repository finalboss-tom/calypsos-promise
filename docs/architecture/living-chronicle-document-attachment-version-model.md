# Living Chronicle Document, Attachment, and Version Model

**Status:** BASELINE for Sprint 3 workstream 3.7; production storage, encryption, malware controls, retention policy, content processing, and specialist review remain PROPOSED or DEFERRED

## Purpose

This document defines how the Living Chronicle represents source documents, attachments, immutable source versions, exact source locations, derived representations, custody references, and deletion effects without allowing a storage provider, file name, upload URL, OCR output, AI extraction, or rendered preview to become Chronicle truth.

It exists to preserve the difference among:

- a source artifact
- a particular immutable source version
- the bytes or structured payload held by a custodian
- a relationship attaching source material to a Chronicle record or workflow
- a locator inside one exact source version
- an extracted or transformed derivative
- a proposed or confirmed Chronicle assertion supported by that source

This is an architecture and ontology contract. It does not select an object-storage provider, database, encryption system, antivirus product, OCR provider, document-processing service, file-upload library, image pipeline, content-delivery network, clinical document standard, retention schedule, or user-interface pattern.

## Governing constraints

The model must preserve:

- source truth distinct from Chronicle truth
- stable provider-independent source identities
- immutable source versions
- exact source-version and locator references for extracted assertions
- raw source representations where retained
- inspectable transformation and extraction provenance
- person control over Chronicle assertions derived from source material
- explicit separation between storage custody and truth authority
- correction, supersession, retraction, invalidation, export, and deletion without silent history rewriting
- provider, operator, connector, and founder replaceability
- useful export that is not dependent on one proprietary client or storage vendor
- explicit source unavailability and omission reasons
- no requirement for research, commerce, payment, progression, governance participation, or broader consent to attach or inspect source material used for personal utility
- no progression or governance advantage for uploading more documents, larger files, more intimate source material, or broader categories of data
- public or synthetic source material only in contributor fixtures

The model must not imply that retaining a document makes every statement in it accurate, current, clinically endorsed, authorized for every purpose, or confirmed by the person.

## Core separation

The architecture separates the following concepts.

### Source artifact

A stable identity for an evidence container or source origin across versions.

A source artifact may represent:

- a document
- an image
- an audio recording
- a video recording
- a structured export
- a device or connector payload
- a message
- a questionnaire submission
- a manual-entry source
- an external record reference

The source-artifact identity is not a file path, public URL, object-store key, provider ID, connector cursor, original file name, integrity digest, or external document number.

### Source version

An immutable identified representation of one source artifact at a point in its version history.

Changing the source content creates a new source version. The prior version remains inspectable unless its own deletion lifecycle removes it.

A source version is the evidence unit to which locators, transformations, extractions, integrity metadata, and derived assertions refer.

### Document

A source artifact whose content has document-like structure or is treated as a document by the controlled workflow.

Examples include:

- a report
- a letter
- a note
- a form
- a service export
- a spreadsheet
- a PDF
- a scanned paper record
- a structured record bundle

A document is source evidence. It does not become a canonical Chronicle assertion merely because it was uploaded, imported, signed, or produced by an institution.

### Attachment

An explicit relationship associating a source artifact or source version with another identified object or workflow context.

An attachment may associate source material with:

- a Chronicle record proposal
- a confirmed Chronicle record
- a reflection
- a correction request
- a conflict review
- an import event
- an export request
- another bounded domain object where later policy permits

An attachment relationship does not duplicate the source bytes and does not grant the attached target authority over the source.

Removing an attachment relationship is not equivalent to deleting the source artifact, deleting a source version, or deleting a Chronicle record.

### Stored representation

The bytes, structured payload, encrypted object, or other representation held by a custodian.

A stored representation is an implementation-dependent custody object. It may move between providers, regions, storage classes, encryption keys, or operators without changing source truth when the content is verified as unchanged.

A stored representation is not the canonical source identity.

### Custody reference

A replaceable reference describing where or how an authorized implementation may retrieve a stored representation.

Custody references may include opaque provider or infrastructure identifiers. They remain outside portable source identity and may be replaced without rewriting source-artifact or source-version identifiers.

Custody does not confer:

- authorship
- Chronicle control
- permission authority
- correction authority
- research authority
- ownership of the person’s Chronicle
- authority to alter source content silently

### Source locator

A precise or approximate location inside one immutable source version.

A locator always names the exact source version it addresses. A locator does not float across versions merely because two versions appear similar.

### Derived representation

A transformation output produced from a source version, such as:

- extracted text
- OCR output
- speech transcription
- thumbnail
- preview image
- rendered page
- normalized structured payload
- redacted copy
- converted file format
- search index entry
- embedding

A derived representation is not the source version and is not Chronicle truth. It identifies the source version, transformation method, method version, parameters, and relevant locators that produced it.

### Chronicle assertion

A proposed or confirmed Chronicle record supported by source material.

The assertion references its source chain. It remains distinct from the source document and from any extraction or transformation output.

The assertion may be corrected, superseded, retracted, invalidated, exported, or deleted under Chronicle rules without rewriting what the source version originally contained.

## Identity conventions

Sprint 3 uses provider-independent dotted identifiers.

Candidate identity families include:

- `source-artifact.document.synthetic-report`
- `source-version.document.synthetic-report.v1`
- `source-locator.synthetic-report.page-2-region-a`
- `attachment.record.synthetic-report-result`
- `transformation.ocr.synthetic-report.v1`
- `derived-representation.synthetic-report.extracted-text.v1`
- `custody-reference.synthetic-report.primary-copy`

The exact prefixes remain contract work. The required properties are:

- identifiers are stable within their declared scope
- identifiers do not expose private file paths or provider secrets
- identifiers do not depend on one storage vendor
- identifiers are not derived directly from an email address, account-provider subject, public URL, or original file name
- changing custody does not require changing source identity
- changing content creates a new source version rather than mutating the prior version

A digest may be referenced as integrity evidence. It must not be the only source-version identifier because digests may create correlation, privacy, algorithm-migration, and representation-canonicalization concerns.

## Source-artifact model

A source artifact conceptually records:

- `id`
- `schemaVersion`
- `revision`
- `artifactKind`
- `chronicleId` or controlled-workspace scope
- source actor or origin when known
- authorship information when known
- source-reported identifier when useful
- source-reported title or label when useful
- current lifecycle state
- source-version references
- creation metadata
- update metadata

### Artifact kind

Candidate kinds include:

- `document`
- `image`
- `audio`
- `video`
- `structured-payload`
- `message`
- `questionnaire-response`
- `manual-entry`
- `device-payload`
- `external-reference`

Artifact kind describes the source container or origin. It does not determine clinical reliability, permission, sensitivity, or authority.

### Artifact scope

The first baseline assumes a source artifact belongs to one controlled Chronicle or one pre-confirmation workspace.

Cross-Chronicle source sharing, household documents, caregiver records, dependent records, jointly authored records, and estate handling remain explicit later work. Implementations must not infer shared authority from identical bytes, matching external IDs, or a common custodian.

### External identifiers

External document numbers, provider IDs, connector IDs, URLs, accession numbers, message IDs, or device payload IDs may be stored as source references.

They do not become canonical internal identity because they may:

- change
- be reused
- reveal private context
- depend on one vendor
- be inaccessible after provider migration
- collide across systems
- identify the wrong subject

## Immutable source versions

A source version is immutable evidence.

A version conceptually records:

- `id`
- `sourceArtifactId`
- `schemaVersion`
- internal version sequence or revision label
- source-reported version label when present
- representation kind
- media type or structured format
- optional original file name where safe
- optional language metadata
- optional page, sheet, frame, or duration metadata
- optional byte or character length
- optional dimensions or sample metadata
- source-reported creation time when known
- capture or receipt time
- source actor and recorder references when known
- custody references
- optional integrity evidence
- lifecycle and availability state
- creation metadata

### Changes that require a new source version

A new source version is required when:

- source bytes change
- structured source content changes
- a page or section is added or removed
- a spreadsheet cell or field changes
- audio or video content changes
- a scan is replaced with a different scan intended as source evidence
- an external system issues a corrected or replacement document
- a redacted or translated representation is intended to stand as a distinct source representation
- a format conversion changes the representation relied upon by locators or extraction

The new version references the same source artifact when the workflow judges it to be a later representation of the same evidence container. Otherwise it creates a new source artifact and an explicit relationship.

### Changes that do not necessarily require a new source version

The following may be represented as metadata revision or custody events when source content is unchanged:

- correcting a display-only label
- adding an omitted safe language tag
- adding an integrity digest
- moving storage providers
- rotating encryption keys
- changing storage class
- changing an internal custody locator
- adding a verified mirror copy
- recording a previously unknown capture actor

A metadata revision must not hide a change that affects source meaning, locators, bytes, or provenance.

### Identical bytes

Receiving identical bytes again does not automatically prove that two capture events, source artifacts, or external records are the same.

The model may record:

- identical integrity evidence
- separate capture events
- a duplicate candidate
- a confirmed duplicate decision
- a preferred custody copy

It must preserve why the bytes were received, under which Chronicle scope, from which source, and through which event.

Cross-person or cross-Chronicle deduplication must not expose correlation or silently join private source histories.

## Representation and media metadata

Media metadata helps interpret and process a source version but does not define truth authority.

Candidate metadata includes:

- declared media type
- detected media type
- structured format identifier and version
- character encoding
- language declarations
- byte length
- page count
- sheet count
- image dimensions
- audio or video duration
- orientation
- source-reported creation software
- optional safe original file name

### Declared versus detected media type

Client-declared, source-declared, and detected media types may disagree.

The architecture preserves the distinction and may quarantine or reject unsafe or unsupported representations. It must not rewrite the source representation merely to make the disagreement disappear.

### Original file names and paths

Original file names may contain health information, names, account numbers, dates, or device paths.

The baseline requires:

- original file name is optional
- full local paths are not canonical metadata
- display names may be sanitized or replaced
- export behavior states whether original names are included
- deletion and minimization rules apply to file names independently from source bytes

A file name is not a source identity or a trustworthy description of content.

### Embedded metadata

Images, documents, audio, and video may contain embedded metadata such as authorship, device, location, timestamps, comments, hidden sheets, revision history, or thumbnails.

Embedded metadata is untrusted source content. Extraction must identify the transformation and preserve which source version supplied it. Implementations must not expose or reuse embedded metadata outside the person-controlled workflow without a separate authorized purpose.

## Integrity evidence

Integrity evidence may help determine whether a stored representation changed.

Candidate fields include:

- algorithm identifier
- algorithm version or profile
- digest value
- computed time
- computing actor or service
- representation scope
- verification state
- prior verification references

Integrity evidence means only what the declared method supports.

It does not prove:

- source accuracy
- correct subject linkage
- clinical correctness
- authorship
- authorization
- absence of malicious content
- that two records belong to the same person
- that identical bytes should be merged

### Privacy and correlation

Content digests can enable correlation when the same document appears in multiple systems or Chronicles.

The portable contract therefore must not require public exposure of raw digests. Export, logging, deduplication, and cross-system exchange policies require later privacy and security review.

### Custody migration

A storage migration may copy bytes to a new custodian and verify integrity without creating a new source version when the source representation remains unchanged.

The migration should record:

- prior custody reference
- new custody reference
- migration actor or service
- migration time
- verification method
- verification result
- failure or omission information

The source-version identity remains stable across vendor replacement.

## Source locators

A source locator references one exact source version.

Candidate locator kinds include:

- whole source version
- page
- page range
- page region
- image region
- character range
- byte range
- row
- column
- row and column
- spreadsheet cell
- spreadsheet range
- field path
- JSON Pointer
- XML path
- form question and response
- message position
- timestamp
- timestamp range
- audio segment
- video frame or segment
- document section
- table cell

A locator conceptually records:

- `id`
- `sourceVersionId`
- `locatorKind`
- locator value or structured coordinates
- optional human-readable description
- optional coordinate or indexing convention
- optional extracted source snapshot where policy permits
- optional ambiguity or confidence note
- creation metadata

### Locator precision

A locator must not claim more precision than the source supports.

Examples:

- a whole-document assertion uses a whole-version locator rather than inventing a page
- a blurry image region records approximate coordinates or ambiguity
- OCR character offsets do not masquerade as original PDF text offsets
- a translated derivative does not reuse source-language character offsets
- spreadsheet row numbers identify the exact source version and sheet

### Version binding

A locator is not automatically portable to a later source version.

When a new version is created:

- prior locators remain valid for the prior version
- transformations may propose corresponding locators in the new version
- a mapping relationship identifies the method and confidence
- dependent assertions do not silently retarget themselves

### Locator deletion

Deleting or minimizing a locator may affect the ability to verify an assertion without requiring deletion of the entire source version.

The lifecycle must record the effect on:

- extracted proposals
- confirmed Chronicle records
- derived records
- correction history
- exports
- audit or review availability

## Attachments

An attachment is a relationship, not a copy of source content.

An attachment conceptually records:

- `id`
- `schemaVersion`
- `revision`
- `sourceArtifactId`
- optional `sourceVersionId`
- target object type
- target object ID
- attachment role
- attaching actor
- attached time
- optional effective period
- optional source-locator references
- optional display label
- lifecycle state
- removal reason and actor when removed
- creation metadata

### Attachment roles

Candidate roles include:

- `primary-evidence`
- `supporting-evidence`
- `context`
- `original-submission`
- `correction-support`
- `conflict-support`
- `derived-output`
- `illustrative`
- `export-inclusion`

Roles describe relationship purpose. They do not determine truth, clinical authority, or permission.

### Artifact-level and version-level attachments

An artifact-level attachment may mean “this evolving source artifact is relevant.”

A version-level attachment means “this exact immutable version supports this target.”

Chronicle assertions extracted from source material require version-level provenance. A floating artifact-level relationship is insufficient when source content can change.

### Removal

Removing an attachment:

- records the responsible actor and reason
- does not delete the source artifact
- does not delete source versions
- does not delete the target Chronicle record
- does not erase prior exports
- may trigger review of whether the target still has sufficient provenance

An attachment may be removed from default presentation while its historical relationship remains exportable according to lifecycle and deletion rules.

## Derived representations

Derived representations are replaceable outputs generated from source material.

Candidate kinds include:

- OCR text
- speech transcript
- document text extraction
- page image
- thumbnail
- preview
- normalized structured payload
- redacted derivative
- translated derivative
- converted format
- search index entry
- embedding
- classification output

A derived representation conceptually records:

- `id`
- source-version references
- source-locator references where relevant
- transformation identifier
- transformation version
- implementation or tool identity when relevant
- parameters and assumptions
- output media type or value shape
- created time
- actor or service
- confidence or quality information when applicable
- lifecycle and availability state
- custody reference where retained

### Authority boundary

A derived representation does not become authoritative merely because:

- OCR completed successfully
- text extraction returned high confidence
- a model produced structured output
- a provider marked the operation successful
- the source was digitally signed
- the same value appeared multiple times
- a quest or research workflow needs the field

Derived output may support a Chronicle proposal. Confirmation and domain validation remain separate.

### Disposable derivatives

Previews, thumbnails, search indexes, embeddings, and caches are disposable derivatives.

They may be regenerated from retained source versions and declared transformations. They must not become the only remaining representation of source truth.

Deleting a disposable derivative is not equivalent to deleting the source version or confirmed Chronicle record.

### Redacted derivatives

A redacted copy is a separate derived representation or source version according to its intended authority and use.

It must identify:

- the input version
- redaction method and version
- redacting actor or service
- removed or obscured regions where safe to record
- review state
- limitations
- whether the redacted copy may be exported or shared for a declared purpose

Redaction does not create permission for secondary use.

## Document extraction and assertion proposals

Extraction from documents or media creates proposals, not confirmed Chronicle truth.

A proposal derived from source material identifies:

- source artifact and version
- exact locator or whole-version basis
- extraction transformation
- transformation or model version
- extracted source snapshot where allowed
- proposed variable or concept
- proposed value and unit
- proposed temporal assertion
- confidence or uncertainty
- unresolved ambiguity
- proposing actor or tool
- creation time

The person or another explicitly authorized human may accept, correct, split, reject, or defer the proposal.

Acceptance creates a confirmation event and a Chronicle record under the domain contract. It does not alter the source document.

### Multiple assertions from one source

One source version may support multiple proposed or confirmed assertions.

Each assertion preserves its own:

- locator
- extraction or mapping path
- variable or concept
- value
- temporal assertion
- confirmation history
- correction and deletion lifecycle

Deleting one Chronicle assertion does not necessarily delete the source version or other assertions. Deleting the source version may require reevaluating every dependent assertion.

### One assertion from multiple sources

A Chronicle assertion may be supported by multiple source versions.

The provenance chain states whether sources:

- independently support the same claim
- provide complementary parts
- conflict
- represent a correction sequence
- are duplicate candidates
- were combined through a declared derivation or merge policy

Multiple sources do not automatically increase authority or clinical reliability.

## Source replacement and version relationships

Source versions may be related through explicit relationships such as:

- `replaces`
- `corrects`
- `amends`
- `redacts`
- `translates`
- `converts-format`
- `supersedes-for-current-use`
- `duplicate-candidate`
- `confirmed-duplicate`

The relationship records:

- prior and successor version IDs
- relationship type
- actor
- time
- reason
- method and version where automated
- unresolved differences
- effects on locators, transformations, and dependent assertions

A successor version does not mutate prior locators or extracted assertions.

## Source lifecycle and availability

Source lifecycle is separate from Chronicle-record authority and lifecycle.

Candidate source-version states include:

- `receiving`
- `quarantined`
- `available`
- `partially-available`
- `unavailable`
- `corrupt`
- `deletion-requested`
- `deletion-processing`
- `retained-under-exception`
- `deleted`

### Receiving

The system has begun receiving source material but has not established a complete immutable version.

Incomplete material must not be represented as a complete source version.

### Quarantined

The representation is withheld from ordinary processing because an objective security, format, integrity, or policy check requires review.

Quarantine does not imply malicious intent, clinical invalidity, or loss of person control.

### Available

The declared representation is retrievable through an authorized custody path.

Availability does not imply truth, permission, or confirmation.

### Partially available

Some source components, pages, attachments, segments, metadata, or mirrors are unavailable.

The model records what remains available and which dependent assertions or locators are affected.

### Unavailable

The source version cannot currently be retrieved.

Unavailability records a reason such as:

- provider outage
- expired external reference
- custody migration failure
- lost encryption material
- deleted source
- corrupted copy
- legal or policy restriction
- unknown cause

An unavailable source does not silently disappear from provenance.

### Corrupt

The available representation fails a declared integrity or decoding contract.

Corruption is an objective implementation state. It does not prove that the original source was false.

### Retained under exception

The source is retained under a separately governed legal, safety, security, or technical exception.

Sprint 3 does not define valid exceptions. Implementations must not invent them silently.

### Deleted

The source representation has completed its declared erasure process where applicable.

A minimal non-sensitive tombstone may remain only when required for referential integrity, prevention of accidental resurrection, or truthful dependency state. Tombstone content requires later privacy and legal review.

## Deletion boundaries

The model distinguishes deletion of:

- an attachment relationship
- a source locator
- a derived representation
- a custody copy
- a source version
- a source artifact
- a Chronicle assertion
- a correction or conflict relationship
- an export artifact

These actions have different effects.

### Attachment deletion

Removes or retires the relationship between source material and a target object. It does not erase source bytes or the target record.

### Custody-copy deletion

Removes one stored copy. Another verified copy may remain. The source version remains available only when an authorized custody reference still resolves.

### Derived-representation deletion

Removes an OCR output, preview, transcript, index, embedding, or other derivative. The source version and Chronicle records remain governed independently.

### Source-version deletion

Removes the immutable representation and triggers evaluation of:

- source locators
- extraction proposals
- confirmed records
- normalized and derived records
- conflicts
- corrections
- duplicate relationships
- exports
- audit and review availability

Dependent records become explicitly source-unavailable, provenance-degraded, recompute-required, invalidated, or deleted according to their contracts. They do not remain silently current.

### Source-artifact deletion

Resolves the deletion scope across every source version, attachment, custody copy, derivative, and dependent relationship belonging to that artifact.

### Chronicle-record deletion

Uses the Chronicle deletion lifecycle. It does not automatically delete source material unless the deletion request and policy include it.

### Tombstones

A tombstone must retain only the minimum non-sensitive information necessary for its declared purpose.

Candidate purposes include:

- preventing accidental identifier reuse
- preventing deleted material from being re-imported as current without review
- representing why a dependent record is unavailable
- preserving that a deletion request completed

Tombstones must not preserve values, document names, excerpts, clinical details, intimate categories, or source content merely for institutional convenience.

## Export and portability

A useful export may include:

- source-artifact metadata
- source-version metadata
- retained source representations when requested and permitted
- attachment relationships
- locators
- integrity evidence where safe
- derived-representation metadata
- transformations and extraction provenance
- Chronicle assertions and confirmation events
- correction, conflict, duplicate, merge, and supersession relationships
- source lifecycle and deletion evidence
- omission reasons

The export must distinguish:

- included source bytes
- included structured source payloads
- metadata-only source references
- unavailable sources
- deleted sources
- retained-under-exception sources
- omitted derivatives
- external references that may no longer resolve

The portable contract must not require one vendor’s object key, signed URL, encryption envelope, proprietary archive, or viewer.

### Human-readable export

A human-readable representation should explain:

- what source material exists
- which exact version supports a record
- where in the source the claim came from
- whether extraction or AI assistance was involved
- whether the person confirmed the assertion
- whether the source is unavailable, corrected, superseded, retained, or deleted

### Machine-readable export

A machine-readable representation preserves stable identities, relationships, versions, locators, lifecycle, and provenance without requiring access to internal database keys or one provider’s APIs.

## Security and privacy hold points

Sprint 3 identifies, but does not settle, the following controls:

- content-type verification
- archive expansion limits
- decompression-bomb defenses
- malware scanning
- active-content isolation
- macro and script handling
- document sanitization
- image and media parser safety
- metadata minimization
- filename sanitization
- quarantine workflows
- encryption at rest and in transit
- key management
- private download authorization
- signed URL behavior
- data-loss prevention
- preview isolation
- secure deletion verification
- access logging and receipts

The data model must leave room for these controls without selecting a provider or representing a control as implemented.

### Untrusted source content

Documents, images, audio, video, archives, and structured payloads are untrusted input.

Source content cannot:

- grant itself tool authority
- change permissions
- select its Chronicle subject silently
- execute code in a privileged context
- confirm extracted assertions
- alter story or progression state directly
- enroll a person in research
- request payment
- create governance authority

### Public URLs

Private source material must not require a public URL.

External URLs may be retained as source references, but they are not durable custody, do not prove authorization, and may expire or change.

## AI and automated processing boundaries

AI and automated tools may:

- classify media for routing
- propose locators
- produce OCR or transcription
- propose document structure
- extract candidate assertions
- compare versions
- identify possible duplicates
- explain provenance
- propose redactions

They may not independently:

- confirm Chronicle truth
- rewrite source bytes
- choose which source version is authoritative for the person
- delete a source artifact or version
- waive retention or privacy requirements
- resolve a source conflict
- merge source histories destructively
- expose source content to an unauthorized purpose
- invent a source locator, author, reviewer, or confirmation event

Every AI-assisted derivative preserves tool identity, version where available, inputs, output, confidence or uncertainty, and human review state.

## Incentive boundaries

The source model must not reward:

- uploading more files
- uploading larger files
- uploading clinical or intimate records
- retaining source material longer
- accepting an extracted proposal
- declining deletion
- granting broader access
- resolving a conflict in the institution’s preferred direction
- allowing research or commercial use

Core personal utility remains available through manual records and other appropriate non-document pathways.

A document may improve provenance or convenience. It is not a prerequisite for basic product rights, progression, governance expression, correction, export, or deletion.

## Institutional and governance constraints

The model supports founder independence by ensuring that source identity, versioning, locators, exports, and lifecycle survive replacement of:

- the founder
- a maintainer
- an operator
- an authentication provider
- a storage provider
- a document-processing provider
- an AI provider
- an OCR provider
- a connector
- a cloud region
- a proprietary viewer

The following are prohibited:

- founder-only decryption or recovery assumptions
- provider-owned canonical source IDs
- private non-exportable version history
- undocumented source replacement
- operator-controlled silent byte substitution
- capital-purchased access to source material
- governance votes that override correction, export, deletion, privacy, or safety rights
- contributor reputation that grants unrestricted source access
- research convenience that becomes source-retention authority

## Minimum validation invariants

Later deterministic validation should enforce at least:

1. Every source version references one source artifact.
2. Source-version identifiers are unique and use the approved dotted grammar.
3. A source version is immutable after creation except for governed metadata revision that cannot alter source content.
4. Changing source content creates a new source-version identifier.
5. Every locator references one existing exact source version.
6. Locator shape matches its declared locator kind.
7. A locator does not claim a page, range, field, or coordinate absent from the declared source representation.
8. Every attachment references an existing source artifact and, when required, an exact source version.
9. Every attachment target uses an allowed target class and existing identifier.
10. Removing an attachment does not silently delete the source or target.
11. Every extracted proposal references at least one source version or locator and one transformation.
12. Every derived representation identifies its transformation method and version.
13. OCR, transcription, extraction, preview, index, and embedding outputs are not recorded as confirmed Chronicle truth by themselves.
14. Every integrity digest identifies its algorithm and representation scope.
15. Integrity evidence is not recorded as confirmation authority.
16. Custody references remain separate from portable source identity.
17. Provider URLs, object keys, file paths, and original file names are not canonical source IDs.
18. Source lifecycle remains separate from Chronicle-record authority and lifecycle.
19. A deleted or unavailable source version produces explicit dependent-record state.
20. A source replacement does not retarget prior locators silently.
21. Duplicate detection preserves capture and source histories.
22. Cross-Chronicle identical bytes do not authorize automatic identity linking.
23. Tombstones exclude source content and intimate values.
24. Public fixtures declare public or synthetic classification.
25. Contributor fixtures contain no production or private health data.

## Required synthetic scenarios

Sprint 3 fixtures should later cover the following.

### Versioned synthetic report

A synthetic report is uploaded as version 1. A corrected version 2 changes one stated value. Both versions remain immutable, assertions reference their exact locators, and a source-version relationship records the correction.

### Identical re-upload

The same bytes are received twice through separate capture events. Integrity evidence matches, but the model preserves both events and records a duplicate candidate rather than silently discarding one.

### Storage-provider migration

An unchanged source version moves from one synthetic custody provider to another. Source identity and locators remain stable while custody references and verification evidence change.

### Scanned image and OCR

A synthetic scanned image produces OCR text with uncertain regions. The OCR is a derived representation with tool provenance. Candidate observations remain proposed until confirmed.

### Audio transcription

A synthetic voice note produces a transcript tied to exact time segments. The transcript does not replace the audio source and does not become Chronicle truth automatically.

### Page and region locator

A proposed observation points to a precise region on page 2 of one document version. A later document version requires a new locator rather than silently reusing the old region.

### Spreadsheet locator

A structured assertion references one sheet and cell range in a synthetic spreadsheet version. Reordering rows creates a new source version and preserves the prior locator.

### Attachment removal

A source version is detached from one reflection while remaining attached to a correction record. The source is not deleted and the removed relationship remains historically inspectable.

### Derived-preview deletion

A thumbnail and search index are deleted while the source version and confirmed record remain available.

### Source deletion and dependent invalidation

A source version is deleted. A required derived record becomes invalid or recompute-impossible, while a separately confirmed self-report follows its own declared provenance and deletion rules.

### Retention exception

A synthetic source enters `retained-under-exception` with a placeholder policy reference. The fixture makes clear that Sprint 3 does not validate the legal sufficiency of the exception.

### Unavailable external reference

An external source URL expires. The source reference remains in provenance with an unavailable state and omission reason; it does not disappear.

### Redacted derivative

A synthetic document produces a redacted derivative for a declared presentation. The derivative references the original version and redaction transformation but does not create new permission.

### Cross-Chronicle identical bytes

Two synthetic Chronicles contain identical template documents. The system does not infer shared identity, household relationship, or common authority from the matching digest.

### Media-type disagreement

A source is declared as one media type but detected as another. It enters a quarantine or review state without being represented as malicious or confirmed.

### Export with omissions

An export includes source metadata, locators, and Chronicle records but omits a deleted derivative and an unavailable source representation. The export states each omission and reason.

## Questions requiring later specialist or implementation review

The architecture baseline does not settle:

1. Which source kinds may be retained after a deletion request, under which legal or safety basis?
2. What minimum tombstone metadata is necessary and privacy-preserving?
3. Which integrity algorithms and migration profiles are acceptable?
4. When may identical bytes share physical storage without creating privacy correlation?
5. How should encrypted deduplication or convergent encryption risks be handled?
6. Which original file-name and embedded-metadata fields may be retained or exported?
7. Which media types, archive formats, macros, scripts, and active content are accepted?
8. Which quarantine, malware, and content-sanitization controls are required before real uploads?
9. How are source versions encrypted, recovered, migrated, and securely deleted?
10. Which document and media transformations require specialist validation?
11. How are translated, redacted, reformatted, and accessibility-enhanced representations classified?
12. When is a transformed representation a derivative versus a new source version?
13. How should very large documents, continuous device exports, or streaming media be segmented?
14. Which locators remain stable across standards-based document formats?
15. How are source relationships represented for compound archives and nested documents?
16. How should shared, caregiver, dependent, household, or jointly authored source material work?
17. How are wrong-Chronicle uploads contained, corrected, noticed, and deleted?
18. What source material may appear in human-readable exports by default?
19. Which access events require person-visible receipts?
20. How are source lifecycles synchronized across independently operated instances without creating silent resurrection?

These questions remain explicit hold points. A provider configuration, database table, upload component, model prompt, or connector shortcut may not silently answer them.

## Workstream 3.7 acceptance

Workstream 3.7 is complete at the architecture-baseline level when:

- source artifact, source version, attachment, stored representation, custody reference, locator, derivative, and Chronicle assertion are distinct
- source versions are immutable and provider-independent
- content changes create new versions
- locators remain bound to exact versions
- attachments are relationships rather than destructive copies
- derived representations preserve transformation provenance and remain non-authoritative
- storage migration does not require rewriting source identity
- correction and replacement preserve prior evidence
- source, derivative, attachment, custody, and Chronicle deletion effects remain separate
- exports can represent retained, unavailable, omitted, and deleted source material honestly
- integrity evidence is separated from truth authority
- AI and automated tools cannot confirm, delete, or silently replace source truth
- source volume, intimacy, retention, and secondary use create no progression or governance advantage
- provider and founder replacement remain possible
- public fixtures remain synthetic or public
- unresolved security, privacy, clinical, accessibility, legal, and operational questions remain explicit
