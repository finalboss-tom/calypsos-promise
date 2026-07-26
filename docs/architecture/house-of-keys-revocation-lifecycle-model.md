# House of Keys Revocation and Lifecycle Model

**Status:** PROPOSED Sprint 4 conceptual baseline  
**Workstream:** 4.5 — Revocation and lifecycle behavior  
**Tracking issue:** #32

## Purpose

This model defines how a House of Keys grant becomes applicable, stops being applicable, is reviewed, is replaced, and remains inspectable over time.

Revocation is prospective. Once a valid revocation becomes effective, the revoked grant cannot authorize a future operation. Revocation does not pretend that prior access never occurred, erase prior decisions or receipts, prove downstream deletion, or silently resolve retention duties.

The model is a provider-independent permission contract. It does not implement persistence, distributed invalidation, clocks, queues, authentication, notifications, legal withdrawal requirements, or production audit infrastructure.

## Governing rules

This model implements and may not weaken:

- the frozen Product Constitution
- the frozen Architecture Foundation
- the controlled vocabulary and deterministic incentive contract
- the Sprint 3 separation of permission truth from Chronicle truth
- the House of Keys ontology
- the purpose and data-category taxonomies
- the grant, recipient, action, scope, and duration model
- the Institutional Immune System
- the repository and module-boundary rules

Refusal and revocation must remain meaningful and non-punitive. A person must not lose core Chronicle rights, core progression, service quality, dignity, governance standing, or return behavior merely because they refuse, withdraw, or do not renew optional authority.

## Lifecycle truth

Lifecycle truth answers:

> At a stated evaluation time, which revision of this grant is applicable, non-applicable, under review, or permanently closed, and why?

Lifecycle truth does not answer:

- whether the person or actor is authenticated now
- whether an operation was attempted or completed
- whether prior access was erased
- whether a recipient complied after receiving information
- whether retention is legally required or permitted
- whether a purpose, recipient, category, or action is clinically, legally, or ethically approved
- whether a Chronicle assertion is true

Those claims belong to separate identity, decision, execution, receipt, retention, specialist-review, and Chronicle contracts.

## Required lifecycle event

Every material lifecycle change should be represented by an immutable event containing:

- stable namespaced event identity
- House of Keys contract version
- target grant identity and grant revision
- previous and next lifecycle states
- transition kind
- actor requesting or causing the transition
- authority basis
- reason code
- optional person-provided reason, never required for ordinary revocation
- requested, effective, and recorded times
- policy or rule revision used
- explanation or notice reference where applicable
- evidence references
- related successor, predecessor, revocation, review, or containment events
- affected policy-decision or operation references known at recording time
- uncertainty, conflicts, failures, or unresolved propagation state

A lifecycle event records a claim about permission state. It does not rewrite the grant revision, Chronicle, source artifact, prior decision, operation outcome, or receipt.

## Initial lifecycle states

### `proposed`

A grant draft exists but has not been explicitly confirmed by the granting authority. It is non-applicable and cannot produce `allow`.

### `pending-confirmation`

The proposal and explanation are complete, but valid granting-authority confirmation or required comprehension evidence is still missing.

Continued product use, silence, inactivity, account creation, payment, prior disclosure, or recipient action cannot activate it.

### `active`

The grant has valid confirmation and is within its start, duration, scope, and review conditions.

`active` is necessary but not sufficient for an `allow` decision. The request must still match every purpose, recipient, category, selector, action, condition, and time fact.

### `suspended`

The grant is temporarily non-applicable because a defined containment, conflict, uncertainty, review, or safety condition requires future use to pause.

Suspension:

- denies future authorization while effective
- identifies who may suspend, why, and under which rule
- identifies a review time or automatic expiry
- remains challengeable and independently reviewable in proportion to consequence
- cannot silently become permanent revocation or constitutional redesign
- does not erase prior access or receipts

A recipient, requester, processor, AI system, or infrastructure provider cannot suspend or restore authority merely for its own convenience unless a separately accepted rule grants that bounded capability.

### `expired`

The grant is non-applicable because its fixed, delayed, session, bounded-count, single-use, or review-bounded duration no longer permits future use.

### `exhausted`

The grant is non-applicable because its authorized single-use or bounded-count capacity has been consumed under an accepted counting rule.

Missing, ambiguous, duplicated, delayed, or conflicting consumption evidence must not create additional authority.

### `withdrawn`

The granting authority has revoked future authority and the revocation is effective.

A withdrawn grant:

- cannot authorize future requests
- remains inspectable with prior revisions and lifecycle events
- does not erase prior decisions, attempts, outcomes, or receipts
- does not imply that copies already delivered were deleted
- does not silently resolve retention questions
- does not punish the person or weaken unrelated core rights

### `declined`

The granting authority explicitly refused the proposed grant before activation. A later request is a new proposal, not activation of the declined record.

### `superseded`

A successor grant has replaced this grant for future evaluation under an explicit transition.

The successor must have its own valid confirmation and applicable lifecycle state. Authority does not transfer merely because the records are related.

### `invalidated`

The grant is non-applicable because it was defective, misleading, unauthorized, internally inconsistent, based on invalid authority, or otherwise unsuitable for continued use.

Invalidation must identify the responsible authority, evidence, affected period, containment behavior, review path, and restoration or correction obligations.

## State-transition rules

The initial deterministic transition boundary is:

- `proposed` may become `pending-confirmation`, `declined`, or `invalidated`.
- `pending-confirmation` may become `active`, `declined`, or `invalidated`.
- `active` may become `suspended`, `expired`, `exhausted`, `withdrawn`, `superseded`, or `invalidated`.
- `suspended` may return to `active` only through an accepted review result, or may become `expired`, `exhausted`, `withdrawn`, `superseded`, or `invalidated`.
- `expired`, `exhausted`, `withdrawn`, `declined`, `superseded`, and `invalidated` are closed states.

Closed grants are not reactivated by editing their state, extending their time, replacing their recipient, or interpreting continued engagement as renewed permission. Renewal or replacement requires a new grant or successor confirmation.

## Revocation instruction

A revocation instruction should contain:

- stable revocation identity
- target grant identity and revision
- revoking authority identity and authority basis
- exact revocation scope
- request time
- effective time or explicit pending state
- optional reason
- authentication or authority-evidence reference supplied by a later integration boundary
- confirmation evidence
- processing status
- resulting lifecycle event reference
- failure, conflict, or appeal information

A person is not required to justify ordinary revocation. Optional feedback cannot delay or condition it.

Revocation may require proportionate confirmation that the actor holds the relevant authority, but it must not require payment, additional health disclosure, secondary-use consent, research participation, survey completion, recipient contact, or acceptance of a replacement grant.

## Revocation scope

The initial baseline favors revoking a complete grant revision.

Removing only part of an active grant is represented as:

1. withdrawal of the broader grant for future use; and
2. a separately proposed and confirmed narrower successor, when the person chooses one.

This prevents hidden in-place mutation from concealing what authority previously existed.

Revocation of one grant does not automatically revoke another independently valid grant. Every policy decision must identify all grants it relies upon.

## Effective-time rule

A lifecycle event has both recorded and effective times.

- Effective time controls applicability.
- Recorded time states when the event was recorded.
- Backdating cannot fabricate that prior access never occurred.
- A future-effective withdrawal remains active only until its effective time and only while every other condition matches.
- Missing, ambiguous, conflicting, or untrusted effective-time facts produce `deny` or `indeterminate`, never implicit continued authority.

Clock source, synchronization, distributed ordering, offline behavior, and authoritative timestamping remain implementation hold points.

## Policy-decision freshness

A policy decision is valid only for its recorded request facts, policy revision, grant revisions, lifecycle facts, and evaluation time.

An earlier `allow` decision cannot be reused after:

- a relied-upon grant becomes suspended, expired, exhausted, withdrawn, superseded, or invalidated
- a relevant purpose, category, recipient, action, selector, condition, or policy revision becomes non-applicable
- the decision freshness or execution window ends
- the requester, recipient, performing actor, controlled resource, or another material fact changes

A cached decision is not authority independent of the grant. Stale decisions must fail closed rather than survive a known lifecycle change.

## Revocation and in-flight operations

The lifecycle and receipt contracts must distinguish:

1. policy request time
2. decision time
3. operation start time
4. data-release or irreversible-action time
5. operation completion or failure time
6. revocation request and effective times

Initial rules:

- An operation not yet started at the revocation effective time must not start under the withdrawn grant.
- An operation started but not past its data-release or irreversible boundary must stop or re-evaluate when this can be done safely.
- An operation completed before revocation remains historical access and stays visible through decisions and receipts.
- A race must record ordering evidence, outcome, uncertainty, and any containment or restoration action.
- Missing or ambiguous ordering must not be represented as confidently authorized.

Exact transaction isolation, cancellation guarantees, distributed enforcement, and recipient-side interruption remain deferred.

## Expiration, exhaustion, and renewal

Expiration follows the accepted duration model. Future use after expiry requires new authority.

Single-use and bounded-count grants require explicit consumption evidence. Retries, duplicate delivery, idempotency, partial failure, and concurrent requests must not silently increase the permitted count.

A review-bounded grant becomes non-applicable at its deadline unless an accepted renewal or successor is explicitly confirmed. Internal review delay cannot extend authority by default.

Renewal is not a state reset. It creates a new grant or successor confirmation with a new duration, explanation, comprehension evidence where required, and an inspectable relationship to the prior grant.

## Suspension and containment

Suspension is a reversible containment tool, not a substitute for revocation or invalidation.

A suspension rule should define:

- triggering condition
- actor permitted to trigger it
- affected grant or grant class
- effective time and maximum duration
- review authority and evidence threshold
- notice and challenge behavior
- restoration conditions
- automatic expiry or escalation
- audit and receipt expectations

Emergency or automated suspension may pause future access when a defined threat is detected, but it must be narrow, logged, expiring, reviewable, and unable to permanently redesign the permission model.

## Supersession and replacement

Supersession requires:

- explicit predecessor and successor identities
- reason for replacement
- effective times
- comparison of purpose, recipient, categories, actions, selectors, conditions, and duration
- confirmation evidence for the successor
- explanation of any overlap or gap
- rollback or containment behavior if the successor is invalid

A broader successor always requires new authority. A narrower successor also requires explicit confirmation and cannot be silently substituted.

## Retention and downstream use after revocation

Revocation removes future authority supplied by the withdrawn grant. It does not by itself answer:

- whether data already delivered must be returned or deleted
- whether a recipient retains a permitted copy
- whether a derived output remains usable
- whether a legal or safety retention exception applies
- whether an external recipient honored the instruction
- whether a downstream recipient exists

Continued retention, downstream use, or deletion obligations require separate explicit authority and lifecycle records. Silence, technical possession, or inability to delete does not become permission.

Sprint 4 records this boundary without claiming legal validity or production enforcement.

## Inspectability

A person should be able to inspect:

- current lifecycle state
- exact grant revision affected
- when and why the state changed
- who requested and recorded the change
- whether future access is blocked
- whether an operation was already completed
- unresolved propagation, downstream deletion, or retention
- successor or replacement grants
- challenge and appeal path

The interface must not use “revoked” to imply that prior access was erased or every copy was deleted. Detailed explanations remain workstream 4.7, and receipt structure remains workstream 4.6.

## Non-punitive refusal and revocation

The system must not:

- remove core Chronicle capture, inspection, correction, export, deletion, or permission-history rights
- reduce progression, restoration, return behavior, or governance standing
- withhold earned non-consent-dependent value
- require a new grant before honoring revocation
- use shame, fear, fake urgency, or misleading loss language
- repeatedly re-prompt in a way that defeats stated refusal
- treat revocation as a negative health, trust, loyalty, risk, or engagement signal
- reward keeping broader or longer authority active

A later request must be a new, distinguishable proposal with a clear reason and meaningful decline path.

## Adversarial review cases

This model must support deterministic or reviewable evidence for:

- future access attempted after effective revocation
- stale cached `allow` decisions
- revocation racing with data release or an irreversible action
- a recipient or processor ignoring a lifecycle change
- a withdrawn grant silently reactivated
- partial revocation implemented as hidden mutation
- one revoked grant masking another active grant
- a review deadline extended because internal review was late
- reuse after single-use or bounded-count exhaustion
- suspension without authority, expiry, review, or challenge
- suspension used as permanent revocation
- successor authority inherited without confirmation
- prior receipts treated as continued authority
- retention or technical possession treated as permission
- revocation conditioned on payment, explanation, survey completion, or replacement consent
- revocation reducing progression, service quality, or core rights
- AI claims that revocation propagated or erased data without evidence

These become contract fixtures and deterministic tests in workstreams 4.8 and 4.9.

## Initial unresolved register

- production authentication and proof that the revoking actor holds authority
- multi-person, delegated, caregiver, dependent, estate, emergency, minor, and shared-control revocation
- transaction isolation and exact ordering between revocation and data release
- distributed clocks, offline operation, stale caches, and propagation guarantees
- single-use and bounded-count idempotency, retry, and consumption rules
- recipient and subprocessor notification, acknowledgment, deletion, and downstream propagation
- retention exceptions and jurisdiction-specific withdrawal obligations
- restoration and remedy after unauthorized post-revocation access
- service levels for revocation processing and propagation
- cryptographic integrity of lifecycle events
- specialist privacy, legal, accessibility, security, clinical, and research approval

These are explicit hold points, not authority granted by omission.

## Success condition

The lifecycle boundary is sound when a person can revoke future authority without punishment; every state and transition is inspectable; stale, suspended, expired, exhausted, withdrawn, superseded, invalidated, or ambiguous authority fails closed; prior access remains honestly visible; replacement requires new confirmation; and the system never confuses prospective revocation with retroactive erasure, downstream deletion, or resolved retention.
