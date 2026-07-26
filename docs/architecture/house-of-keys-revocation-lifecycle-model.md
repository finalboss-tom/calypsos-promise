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
- target grant identity and target grant revision
- previous lifecycle state
- next lifecycle state
- transition kind
- actor requesting or causing the transition
- authority basis for the transition
- event reason code
- optional person-provided reason, which is never required for ordinary revocation
- requested time
- effective time
- recorded time
- policy or rule revision used
- explanation or notice reference where applicable
- evidence references
- related successor, predecessor, revocation, review, or containment event identities
- affected policy-decision or operation references known at recording time
- uncertainty, conflicts, failures, or unresolved propagation state

A lifecycle event records a claim about permission state. It does not rewrite the grant revision, Chronicle, source artifact, prior decision, operation outcome, or receipt.

## Initial lifecycle states

### `proposed`

A grant draft exists but has not been explicitly confirmed by the granting authority.

A proposed grant is non-applicable and cannot produce `allow`.

### `pending-confirmation`

The grant has a complete proposal and explanation but still awaits valid granting-authority confirmation or required comprehension evidence.

Pending confirmation is non-applicable. Continued product use, silence, inactivity, account creation, payment, prior disclosure, or recipient action cannot activate it.

### `active`

The grant has valid confirmation and is within its start, duration, scope, and review conditions.

`active` is necessary but not sufficient for an `allow` decision. The policy request must still match the purpose, recipient, categories, selectors, actions, conditions, time, and all other explicit facts.

### `suspended`

The grant is temporarily non-applicable because a defined containment, conflict, uncertainty, review, or safety condition requires future use to pause.

Suspension:

- denies future authorization while effective
- must identify who may suspend, why, and under which rule
- must identify a review time or automatic expiry
- must remain challengeable and independently reviewable in proportion to consequence
- cannot silently become permanent revocation or constitutional redesign
- does not erase prior access or receipts

A recipient, requester, processor, AI system, or infrastructure provider cannot suspend or restore authority merely for its own convenience unless a separately accepted rule grants that bounded capability.

### `expired`

The grant is non-applicable because its fixed, delayed, session, bounded-count, single-use, or review-bounded duration no longer permits future use.

Expiration is determined from explicit duration facts. It does not depend on a recipient deciding that the grant is no longer useful.

### `exhausted`

The grant is non-applicable because its authorized single-use or bounded-count capacity has been consumed under an accepted counting rule.

Missing, ambiguous, duplicated, delayed, or conflicting consumption evidence must not create additional authority. Exact idempotency and race handling remain production hold points.

### `withdrawn`

The granting authority has revoked future authority and the revocation is effective.

A withdrawn grant:

- cannot authorize future requests
- remains inspectable with its prior revisions and lifecycle events
- does not erase prior decisions, attempts, outcomes, or receipts
- does not imply that copies already delivered to recipients were deleted
- does not imply that every retention question is resolved
- does not punish the person or weaken unrelated core rights

### `declined`

The granting authority explicitly refused the proposed grant before activation.

Decline remains inspectable as an outcome of the proposal process but creates no authority. A new proposal requires a new proposal identity or revision and cannot treat the prior decline as a temporary obstacle to bypass.

### `superseded`

A successor grant or revision has replaced this grant for future evaluation under an explicit transition.

Supersession does not transfer authority automatically. The successor must have its own valid confirmation and applicable lifecycle state. The prior grant becomes non-applicable at its recorded effective time unless a separately reviewed overlap rule is explicit.

### `invalidated`

The grant is non-applicable because it was defective, misleading, unauthorized, internally inconsistent, based on invalid authority, or otherwise unsuitable for continued use.

Invalidation must identify the responsible authority, evidence, affected period, containment behavior, review path, and restoration or correction obligations. It cannot silently alter prior historical records.

## State-transition rules

The initial deterministic transition boundary is:

| From | Allowed next states | Notes |
| --- | --- | --- |
| `proposed` | `pending-confirmation`, `declined`, `invalidated` | Proposal alone never activates authority. |
| `pending-confirmation` | `active`, `declined`, `invalidated` | Activation requires explicit valid confirmation. |
| `active` | `suspended`, `expired`, `exhausted`, `withdrawn`, `superseded`, `invalidated` | Every transition has an explicit effective time and cause. |
| `suspended` | `active`, `expired`, `exhausted`, `withdrawn`, `superseded`, `invalidated` | Restoration to `active` requires an accepted review result; it is not automatic unless the suspension rule explicitly defines safe automatic expiry. |
| `expired` | none | Renewal requires a new grant or successor confirmation. |
| `exhausted` | none | Additional use requires new authority. |
| `withdrawn` | none | Re-granting requires a new grant; withdrawal is not undone in place. |
| `declined` | none | A later request is a new proposal, not activation of the declined record. |
| `superseded` | none | The successor is evaluated independently. |
| `invalidated` | none | Correction or replacement requires a new grant and explicit review. |

Closed states remain closed. The system must not reactivate a closed grant by editing its state, extending its time, replacing its recipient, or interpreting continued engagement as renewed permission.

## Revocation instruction

A revocation instruction should contain:

- stable revocation identity
- target grant identity and revision
- revoking authority identity and authority basis
- exact revocation scope
- requested effective behavior
- request time
- effective time or explicit pending state
- optional reason
- authentication or authority-evidence reference supplied by a later integration boundary
- confirmation evidence
- processing status
- resulting lifecycle event reference
- failure, conflict, or appeal information

A person is not required to justify ordinary revocation. A user interface may ask for optional feedback only after making clear that feedback is not required and does not delay or condition revocation.

Revocation may require proportionate confirmation that the actor holds the relevant authority, but it must not require payment, additional health disclosure, secondary-use consent, research participation, completion of a survey, contact with the recipient, or acceptance of a replacement grant.

## Revocation scope

The initial baseline favors revoking a complete grant revision.

A request to remove only part of an active grant is represented as:

1. withdrawal of the broader grant for future use; and
2. a separately proposed and confirmed narrower successor grant, when the person chooses one.

This preserves inspectability and prevents in-place mutation from hiding what authority previously existed.

Revocation of one grant does not automatically revoke another independently valid grant. A policy decision must identify every grant relied upon. If another grant still authorizes the same operation, the explanation must not misleadingly imply that the operation is blocked merely because one grant was withdrawn.

## Effective-time rule

A lifecycle change has both a recorded time and an effective time.

- The effective time determines applicability for policy evaluation.
- The recorded time describes when the system recorded the event.
- Backdating must never be used to fabricate that prior access was unauthorized, erased, or never occurred.
- A future-effective withdrawal remains active only until the stated effective time and only if every other condition still matches.
- Missing, ambiguous, conflicting, or untrusted effective-time facts produce `deny` or `indeterminate`, never implicit continued authority.

Clock source, synchronization, distributed ordering, offline behavior, and authoritative timestamping remain Sprint 5 or production implementation hold points.

## Policy-decision freshness

A policy decision is valid only for its recorded request facts, policy revision, grant revisions, lifecycle facts, and evaluation time.

An earlier `allow` decision cannot be reused after:

- the relied-upon grant is withdrawn, suspended, expired, exhausted, superseded, or invalidated
- a relevant purpose, category, recipient, action, selector, condition, or policy revision becomes non-applicable
- the decision’s own freshness or execution window ends
- the requester, recipient, performing actor, controlled resource, or other material fact changes

A cached decision is not authority independent of the grant. Production cache invalidation remains deferred, but the contract requires stale decisions to fail closed rather than survive a known lifecycle change.

## Revocation and in-flight operations

Revocation affects future authority, but operation timing must remain explicit.

The lifecycle and receipt contracts must distinguish:

1. policy request time
2. decision time
3. operation start time
4. data-release or irreversible-action time
5. operation completion or failure time
6. revocation request and effective times

Initial boundary rules:

- An operation not yet started at the revocation effective time must not start under the withdrawn grant.
- An operation that has started but has not released data or crossed an irreversible boundary must stop or re-evaluate when the architecture can do so safely.
- An operation completed before revocation remains historical access and must remain visible through its decision and receipt records.
- An operation that races with revocation must record the ordering evidence, outcome, uncertainty, and any required containment or restoration action.
- A missing or ambiguous ordering must not be represented as confidently authorized.

Exact transaction isolation, cancellation guarantees, distributed enforcement, and recipient-side interruption are deferred implementation questions.

## Expiration, exhaustion, and review

### Expiration

Expiration follows the accepted duration model and is not discretionary. Future use after expiry requires new authority.

### Exhaustion

Single-use and bounded-count grants require explicit consumption evidence. Retries, duplicate delivery, idempotency, partial failure, and concurrent requests must not silently increase the permitted count.

### Review-bounded authority

A review-bounded grant becomes non-applicable at its review deadline unless an accepted renewal or successor is explicitly confirmed. Internal review delay cannot extend authority by default.

### Renewal

Renewal is not a state reset. It creates a new grant or successor confirmation with a new duration, explanation, comprehension evidence where required, and inspectable relationship to the prior grant.

## Suspension and containment

Suspension is a reversible containment tool, not a substitute for revocation or invalidation.

A suspension rule should define:

- triggering condition
- actor permitted to trigger it
- affected grant or grant class
- effective time
- maximum duration
- review authority
- evidence threshold
- notice and challenge behavior
- restoration conditions
- automatic expiry or escalation behavior
- audit and receipt expectations

Emergency or automated suspension may pause future access when a defined threat is detected, but it must be narrow, logged, expiring, reviewable, and incapable of permanently redesigning the permission model.

## Supersession and replacement

A successor grant may narrow, replace, or otherwise change future authority. It must not inherit authority merely because it references the prior grant.

Supersession requires:

- explicit predecessor and successor identities
- reason for replacement
- effective time for each grant
- comparison of purpose, recipient, categories, actions, selectors, conditions, and duration
- confirmation evidence for the successor
- explanation of any overlap or gap
- rollback or containment behavior if the successor is invalid

A broader successor always requires new authority. A narrower successor also requires explicit confirmation; it cannot be silently substituted for the prior grant.

## Retention and downstream use after revocation

Revocation removes future authority supplied by the withdrawn grant. It does not by itself answer:

- whether data already delivered must be returned or deleted
- whether a recipient retains a permitted copy
- whether a derived output remains usable
- whether a legal or safety retention exception applies
- whether an external recipient actually honored the instruction
- whether a downstream recipient exists

Any continued retention, downstream use, or deletion obligation requires a separate, explicit authority and lifecycle record. Silence, technical possession, or inability to delete does not become continued permission.

Sprint 4 records this boundary without claiming legal validity or production enforcement.

## Inspectability and explanation

A person should be able to inspect:

- current lifecycle state
- the exact grant revision affected
- when and why the state changed
- who requested and recorded the change
- whether future access is blocked
- whether an operation was already completed
- whether propagation, downstream deletion, or retention remains unresolved
- successor or replacement grants
- challenge and appeal path

The interface must not use “revoked” to imply that prior access was erased or that every copy was deleted. Detailed explanation templates remain workstream 4.7, and receipt structure remains workstream 4.6.

## Non-punitive refusal and revocation

The system must not:

- remove core Chronicle capture, inspection, correction, export, deletion, or permission-history rights because optional authority was refused or withdrawn
- reduce progression, restoration, return behavior, or governance standing
- withhold earned non-consent-dependent value
- require a new grant before honoring revocation
- introduce shame, fear, fake urgency, or misleading loss language
- repeatedly re-prompt in a way that defeats the person’s stated refusal
- treat revocation as a negative health, trust, loyalty, risk, or engagement signal
- reward a person for keeping broader or longer authority active

A later request may be presented only as a new, distinguishable proposal with a clear reason and a meaningful decline path.

## Adversarial review cases

This model must support deterministic or reviewable evidence for:

- future access attempted after effective revocation
- stale cached `allow` decisions
- revocation racing with a data release or irreversible action
- a recipient or processor ignoring a lifecycle change
- a withdrawn grant silently reactivated
- a partial revocation implemented as hidden in-place mutation
- one revoked grant masking another still-active grant
- a review deadline extended because internal review was late
- single-use or bounded-count reuse after exhaustion
- suspension without authority, expiry, review, or challenge
- suspension used as permanent revocation
- successor grants inheriting authority without confirmation
- prior receipts treated as continued authority
- retention or technical possession treated as permission
- revocation conditioned on payment, explanation, survey completion, or replacement consent
- revocation reducing progression, service quality, or core rights
- AI-generated claims that revocation completed, propagated, or erased data without evidence

These become contract fixtures and deterministic tests in workstreams 4.8 and 4.9.

## Initial unresolved register

- production authentication and proof that the revoking actor holds authority
- multi-person, delegated, caregiver, dependent, estate, emergency, minor, and shared-control revocation
- transaction isolation and exact ordering between revocation and data release
- distributed clocks, offline operation, stale policy caches, and propagation guarantees
- single-use and bounded-count idempotency, retry, and consumption rules
- recipient and subprocessor notification, acknowledgment, deletion, and downstream propagation
- retention exceptions and jurisdiction-specific withdrawal obligations
- restoration and remedy after unauthorized post-revocation access
- service levels for revocation processing and propagation
- cryptographic integrity and non-repudiation of lifecycle events
- specialist privacy, legal, accessibility, security, clinical, and research approval

These are explicit hold points, not authority granted by omission.

## Success condition

The lifecycle boundary is sound when a person can revoke future authority without punishment; every grant state and transition is inspectable; stale, suspended, expired, exhausted, withdrawn, superseded, invalidated, or ambiguous authority fails closed; prior access remains honestly visible; replacement requires new confirmation; and the system never confuses prospective revocation with retroactive erasure, downstream deletion, or resolved retention.