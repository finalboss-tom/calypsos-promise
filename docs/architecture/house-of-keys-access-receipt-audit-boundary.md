# House of Keys Access Receipt and Audit Boundary

**Status:** PROPOSED Sprint 4 conceptual baseline  
**Workstream:** 4.6 — Access receipt format and audit boundary  
**Tracking issue:** #32

## Purpose

This model defines the player-inspectable receipt produced for a House of Keys policy decision, operation attempt, completed access, denial, failure, or related lifecycle event.

A receipt records what the system claims was requested, decided, attempted, completed, denied, failed, or changed. It does not create permission, prove legal compliance, establish Chronicle truth, guarantee recipient behavior, or substitute for production security and audit controls.

The model is provider-independent. It does not select a database, event bus, logging vendor, cryptographic ledger, retention system, monitoring platform, or production incident process.

## Governing rules

This model implements and may not weaken:

- the frozen Product Constitution
- the frozen Architecture Foundation
- the controlled vocabulary and deterministic incentive contract
- the Sprint 3 separation among Chronicle, source, derived, interpretive, permission, product-state, and AI-memory truth
- the House of Keys ontology
- the purpose and data-category taxonomies
- the grant, recipient, action, scope, and duration model
- the revocation and lifecycle model
- the Institutional Immune System
- the repository and module-boundary rules

A receipt must remain understandable through direct language without narrative traversal. Narrative may call the record a **Receipt**, but it may not hide the actual requester, recipient, purpose, categories, actions, outcome, timing, grant basis, uncertainty, or challenge path.

## Receipt truth

Receipt truth answers:

> What did the system record about a defined permission request, policy decision, operation attempt, access outcome, denial, failure, or lifecycle change at stated times?

Receipt truth does not answer:

- whether the underlying Chronicle claim is true
- whether a grant was legally valid
- whether the person fully understood every consequence
- whether an external recipient actually complied after receiving data
- whether copied or transmitted data was later deleted
- whether an action was safe, clinically appropriate, ethical, or beneficial
- whether production logs are complete or tamper-proof
- whether a receipt was delivered to or read by the person
- whether an operation not represented by a receipt never occurred

Those claims belong to separate Chronicle, comprehension, recipient-governance, retention, security, audit, delivery, and specialist-review contracts.

## Receipt versus grant, decision, and operation

The system must preserve these as separate claims:

1. **Grant** — the authority that may apply to a future request.
2. **Policy request** — the explicit facts presented for evaluation.
3. **Policy decision** — the deterministic `allow`, `deny`, or `indeterminate` result.
4. **Operation attempt** — the actor began or tried to begin an operation.
5. **Operation outcome** — access or another action completed, partially completed, failed, or was stopped.
6. **Receipt** — the player-inspectable record linking the relevant claims and describing what the system recorded.

An `allow` decision does not prove that an operation started. An attempt does not prove that data was released. A completed operation does not retroactively repair an invalid decision. A receipt does not grant authority.

## Receipt event kinds

Each receipt records one primary event kind. A related sequence may share a correlation identity while preserving separate receipt records.

### `receipt.policy-requested`

Records that a defined requester asked for a policy decision using explicit request facts.

It does not imply that the request was valid, allowed, attempted, or completed.

### `receipt.policy-allowed`

Records an `allow` policy decision and the exact grant, policy, request, lifecycle, and taxonomy revisions relied upon.

It does not prove execution or data release.

### `receipt.policy-denied`

Records a `deny` policy decision and the reasons future execution was not authorized.

Denial must remain distinguishable from system failure, missing facts, or a person declining a proposal.

### `receipt.policy-indeterminate`

Records that the evaluator could not produce an authoritative allow or deny result from the available explicit facts.

Indeterminate never becomes implicit allow. The receipt should identify missing, ambiguous, stale, conflicting, unmapped, or unsupported facts without exposing unnecessary sensitive content.

### `receipt.operation-attempted`

Records that an actor attempted to start an operation under a stated decision and grant basis.

It does not prove completion, data release, recipient delivery, or successful effect.

### `receipt.access-completed`

Records that the system claims selected information was made available to, transmitted to, or otherwise accessed by the named recipient or performing actor through the stated operation.

The receipt must identify the operation boundary crossed. It does not prove downstream compliance, comprehension, deletion, or absence of later copying.

### `receipt.operation-completed`

Records completion of a non-disclosure operation such as preparing an export, creating a proposal, applying a deterministic transformation, or recording a person-requested permission change.

It must not be used when the actual material event was data disclosure or access; those require an access-specific receipt.

### `receipt.operation-partial`

Records that part of the requested operation completed while another part did not.

Partial completion must identify the completed and incomplete boundaries. It cannot be summarized as full success.

### `receipt.operation-failed`

Records that an attempted operation failed before completing its stated outcome.

Failure does not imply denial, revocation, or absence of partial data release. Those facts must be explicit.

### `receipt.operation-stopped`

Records that an in-flight operation was stopped before completion because of revocation, suspension, containment, cancellation, invalidation, or another accepted rule.

The receipt must state whether data release or another irreversible boundary had already occurred.

### `receipt.lifecycle-changed`

Records a grant lifecycle transition such as activation, suspension, expiration, exhaustion, withdrawal, supersession, invalidation, or restoration from a valid suspension.

The lifecycle event remains authoritative for the transition. The receipt is its player-inspectable representation and linkage record.

### `receipt.receipt-corrected`

Records a correction, annotation, or superseding explanation for a prior receipt without deleting or rewriting the prior record.

A correction must not fabricate that the original event never occurred.

## Required receipt record

A receipt record should contain:

- stable namespaced receipt identity
- independent House of Keys contract version and receipt revision
- primary receipt event kind
- receipt lifecycle state
- correlation identity for related request, decision, attempt, outcome, and lifecycle records
- controlled Chronicle or resource identity
- subject identity or identities represented by the recorded scope
- requester identity and kind
- primary recipient identity and revision
- performing actor or processor identity where applicable
- receipt issuer identity and issuer kind
- referenced purpose identity and revision
- referenced data-category identities and revisions
- summarized narrowing selectors and exact resource references
- referenced action identity and revision
- referenced grant identities and revisions
- referenced policy request and decision identities
- referenced lifecycle event identities
- applicable policy revision
- decision outcome where relevant
- operation outcome where relevant
- reason codes and direct explanation
- request, decision, attempt, release, completion, failure, lifecycle, recorded, and effective times as applicable
- time-source and ordering uncertainty where applicable
- explicit statement of whether a data-release or irreversible boundary was crossed
- explicit statement of whether the receipt represents complete, partial, failed, denied, indeterminate, or unknown execution
- unresolved downstream, retention, deletion, propagation, or recipient-acknowledgment state
- person-visible summary
- challenge, correction, appeal, or support path appropriate to the record
- supersession, correction, or annotation references
- export and retention classification
- uncertainty, conflict, and evidence references

A receipt identifier must not contain an email address, provider subject, recipient URL, database key, object-storage key, credential, wallet address, or other replaceability-breaking value.

The record must remain JSON-serializable without requiring a provider SDK, database object, UI component, or authenticated session object.

## Scope snapshot and minimization

A receipt must make the authorized or attempted scope inspectable without copying unnecessary health information into the receipt ledger.

The receipt should preserve:

- stable category identities and revisions
- exact resource references where required for inspectability
- selector summaries
- subject and controlled-resource references
- purpose, recipient, action, condition, and duration references
- the minimum direct explanation necessary to understand the event

The receipt should not duplicate:

- full Chronicle values when stable references are sufficient
- raw documents, attachment bytes, or import payloads
- free-text health notes
- hidden linked records
- provider credentials or infrastructure secrets
- internal security-detection details whose disclosure would create material risk
- unrelated account, product-state, AI-memory, research, compensation, or governance information

A person-visible receipt may resolve referenced labels and summaries through versioned display data. The canonical receipt must still preserve the identities and revisions used at the time of the event.

If a referenced record is later deleted, corrected, superseded, or unavailable, the receipt must not silently rewrite history. It should preserve the minimum permitted reference, tombstone, omission reason, or unresolved state needed to explain what the receipt originally recorded.

## Receipt issuer boundary

The receipt issuer is the accountable component that records the receipt claim.

The issuer:

- does not create or expand permission
- does not independently authenticate the requester
- does not decide Chronicle truth
- does not perform the underlying operation merely by issuing a receipt
- does not convert a missing operation record into proof of no access
- does not claim cryptographic or legal assurance not supplied by the implementation
- must identify the source records and revisions from which the receipt was constructed

An application, AI system, MCP client, requester, recipient, processor, infrastructure provider, or operator may propose receipt data. It cannot authoritatively issue or alter a receipt outside the accepted domain contract.

## Append-only and correction model

Receipts are append-only at the domain-contract level.

Append-only means:

- a recorded receipt is not silently overwritten
- a later label change does not rewrite the identities or revisions used originally
- a correction creates a new linked record
- an annotation remains distinguishable from the original claim
- invalidation or dispute does not erase historical existence
- export preserves the receipt chain and correction relationships

Append-only does not mean the Sprint 4 baseline claims immutable storage, cryptographic integrity, legal evidentiary status, or impossibility of administrative tampering. Those are production security and governance questions.

A corrected receipt should identify:

- the original receipt
- correction kind
- corrected fields or interpretation
- reason
- correcting authority
- evidence
- correction time
- whether the original receipt remains operationally relied upon
- affected grants, decisions, operations, exports, or public claims
- containment, restoration, or notification behavior

## Receipt sequence and correlation

A normal allowed-access sequence may contain:

1. `receipt.policy-requested`
2. `receipt.policy-allowed`
3. `receipt.operation-attempted`
4. `receipt.access-completed`

A denied sequence may contain:

1. `receipt.policy-requested`
2. `receipt.policy-denied`

An indeterminate sequence may contain:

1. `receipt.policy-requested`
2. `receipt.policy-indeterminate`

A revocation race may contain:

1. an earlier allow receipt
2. an operation-attempt receipt
3. a lifecycle-change receipt for withdrawal or suspension
4. an operation-stopped, partial, failed, or access-completed receipt depending on ordering evidence
5. a correction or restoration receipt when required

Correlation links records; it does not collapse their meanings into one mutable status row.

## Decision and execution consistency

A receipt chain must support deterministic consistency checks.

Examples:

- an access-completed receipt must reference an applicable `allow` decision unless a separately accepted non-grant authority exists
- a denied or indeterminate decision must not be followed by an authorized operation under that decision
- an operation-attempt receipt must identify the decision and grant revisions used
- an access-completed receipt must identify whether the data-release boundary occurred before or after a relevant lifecycle change
- a receipt relying on a withdrawn, suspended, expired, exhausted, superseded, invalidated, or stale grant must not represent the operation as validly authorized
- partial completion must not be rendered as full completion
- a correction receipt must not erase the original receipt
- one receipt cannot silently stand in for multiple materially different recipients, purposes, or operations

When consistency cannot be established, the receipt must preserve conflict or uncertainty and trigger denial, containment, review, correction, or restoration as appropriate. It must not manufacture a clean narrative.

## Person inspectability

A person should be able to inspect, in direct language:

- what was requested
- who requested it
- who was the recipient
- who performed or attempted the operation
- why the operation was requested
- what categories and exact resources were involved
- which actions were requested and performed
- which grant and policy decision were relied upon
- whether the result was allowed, denied, indeterminate, attempted, partial, completed, stopped, or failed
- when the material events occurred
- whether information was released or transmitted
- whether revocation, expiry, suspension, or another lifecycle event affected the operation
- what remains unknown about downstream use, retention, deletion, or propagation
- how to challenge or correct the record

The interface must not use a green check mark, success label, or narrative flourish to hide partial completion, uncertainty, recipient mismatch, stale authority, or unresolved downstream behavior.

Receipt inspection must remain available without agreeing to research, commerce, broader consent, public visibility, payment, progression, or additional health disclosure.

## Export, portability, and deletion boundary

Receipts are part of the person’s permission history and should be included in a usable export with their linked grants, decisions, lifecycle events, corrections, and omission reasons.

Export of a receipt does not authorize secondary use of the referenced data.

Deletion of Chronicle content does not automatically delete the permission-history receipt. Receipt deletion, minimization, retention exceptions, tombstones, and completion evidence require explicit policy and must preserve the person’s ability to understand material access history where legally and technically possible.

The Sprint 4 baseline does not determine jurisdiction-specific retention periods or claim that every receipt must be retained indefinitely. It requires explicit, inspectable handling rather than silent disappearance or permanent retention by default.

## Audit boundary

A player-visible receipt and a production audit record are related but different.

### Receipt

A receipt is a domain record designed for person inspectability, permission history, challenge, export, and deterministic linkage to grants, decisions, operations, and lifecycle events.

### Operational audit record

An operational audit record may later support security investigation, reliability analysis, incident response, administrative accountability, or forensic reconstruction.

It may contain technical details that are not appropriate for ordinary receipt display, such as:

- infrastructure component identity
- execution trace identity
- network or transport metadata
- integrity verification data
- deployment revision
- security-control result
- administrative action details
- protected detection evidence

### Boundary rules

1. A receipt must not be generated solely from unreviewed log text.
2. An audit log entry does not create permission or replace a missing receipt.
3. A receipt does not prove the audit trail is complete or tamper-resistant.
4. Technical logs must not become the canonical permission model.
5. Receipt and audit references may correlate through stable identities without copying secrets into the receipt.
6. Audit access requires its own authority and must not be implied by access to player receipts.
7. Security-sensitive audit details may be minimized or protected, but material person-facing facts about access cannot be hidden merely by classifying the source as an internal log.
8. Production cryptographic integrity, signing, sequencing, storage, monitoring, retention, and incident procedures remain Sprint 5 or later implementation work.

## Receipt omission and failure

The absence of a receipt is not proof that no operation occurred.

The architecture must support explicit evidence for:

- expected receipt missing
- receipt generation failed
- receipt delivery failed
- receipt recorded late
- receipt references incomplete
- duplicate receipt
- conflicting receipts
- receipt-operation mismatch
- receipt issued for the wrong recipient, purpose, scope, or action
- receipt claims completion when only an attempt occurred
- operation completed without a valid receipt path

A missing or defective receipt for a sensitive operation is a material system failure. It should trigger containment, investigation, correction, restoration, and person notification according to later risk and incident policies.

A policy condition may require a person-visible receipt. If the system cannot satisfy that condition, the operation must not silently proceed as though receipt generation were optional.

## AI, MCP, and automated-system boundary

AI and MCP components may:

- explain a receipt using the canonical structured record
- help a person search or summarize their receipt history
- draft a challenge or correction request
- propose structured receipt fields for deterministic validation

They may not:

- create permission from a receipt
- invent missing receipt events
- claim that access, deletion, propagation, or recipient compliance occurred without evidence
- rewrite or erase a receipt
- hide uncertainty or conflict
- infer that a person accepted a purpose because a receipt exists
- treat receipt volume as reward, governance weight, health quality, loyalty, or trust

Structured receipt records remain authoritative over AI-generated summaries.

## Non-punitive receipt behavior

Receipt generation and inspection must not:

- create rewards for broader consent or more frequent access
- reduce progression when a person denies or revokes access
- require payment to inspect material access history
- shame a person for denial, revocation, challenge, or correction
- imply that high receipt volume indicates better health, better engagement, or greater trust
- hide denied or failed operations to produce a more positive product narrative
- require additional intimate disclosure to understand or challenge a receipt

## Adversarial review cases

This model must support deterministic or reviewable evidence for:

- an `allow` receipt with no applicable grant
- an access-completed receipt with no operation attempt or decision linkage
- a denied or indeterminate decision followed by execution
- a receipt issued for the wrong requester, recipient, actor, purpose, category, action, or scope
- one receipt hiding multiple recipients or materially different operations
- an attempt represented as successful access
- partial completion represented as complete
- data release occurring after effective revocation
- a stale allow decision reused after lifecycle change
- missing, delayed, duplicate, or conflicting receipts
- correction performed through in-place overwrite
- receipt deletion erasing material access history without explicit policy
- raw health values copied unnecessarily into receipt records
- internal audit logs treated as permission authority
- missing receipt treated as proof that no access occurred
- AI-generated receipt summaries overstating authorization, completion, deletion, or downstream compliance
- receipt volume used as reward, progression, compensation, or governance weight

These become contract fixtures and deterministic tests in workstreams 4.8 and 4.9.

## Initial unresolved register

- production receipt issuance, persistence, delivery, and query architecture
- cryptographic integrity, signing, hash chaining, sequencing, and tamper evidence
- exact audit-log schema and protected security-evidence handling
- incident thresholds for missing, delayed, conflicting, or false receipts
- recipient acknowledgment and downstream receipt propagation
- multi-recipient, batch, streaming, repeated, and long-running operation receipts
- exact correlation behavior under retries, idempotency, partial failure, and distributed execution
- offline operation and delayed synchronization
- receipt minimization and retention by jurisdiction and risk class
- deletion, tombstone, and retention-exception rules for permission history
- notification and service-level expectations
- accessibility review of receipt presentation and search
- privacy, legal, security, clinical, research, and retention specialist approval

These are explicit hold points, not authority or assurance granted by omission.

## Success condition

The receipt boundary is sound when a person can inspect what was requested, decided, attempted, accessed, denied, stopped, or failed; every receipt remains linked to the exact grant, policy, scope, actors, and times used; partial or uncertain outcomes stay visible; corrections append rather than erase; missing receipts are treated as failures rather than proof of no access; and neither receipts nor audit logs can silently create permission, hide downstream uncertainty, or claim production assurance that has not been established.
