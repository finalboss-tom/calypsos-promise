# House of Keys Decision, Capacity, Execution, Receipt, and Audit Lifecycle Register

[Security architecture](README.md) · [Enforcement security model](house-of-keys-enforcement-security-model.md) · [House of Keys control register](house-of-keys-control-register.md) · [Revocation and lifecycle model](../architecture/house-of-keys-revocation-lifecycle-model.md) · [Receipt and audit boundary](../architecture/house-of-keys-access-receipt-audit-boundary.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent specialist review pending  
**Workstream:** 5.5  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** state and evidence vocabulary only; no runtime state machine, transaction, queue, receipt service, audit store, clock, recipient, or production operation is authorized or represented as deployed

## Purpose

This register provides stable vocabulary for the runtime states that surround the existing pure House of Keys policy decision.

It preserves the distinction among:

- grant lifecycle truth;
- decision truth;
- decision freshness and invalidation;
- capacity reservation and consumption;
- execution-envelope state;
- queue and delivery state;
- operation and irreversible-boundary state;
- person-visible receipt state;
- protected audit evidence; and
- incident, correction, restoration, and residual harm.

The TypeScript `0.1.0-pre.1` contract remains the accepted Sprint 4 contract. This register defines future security and orchestration semantics and does not silently alter that contract.

## Identifier families

- Decision states use `HKD-*`.
- Lifecycle-propagation states use `HKL-*`.
- Capacity states use `HKC-*`.
- Execution-envelope states use `HKE-*`.
- Queue and asynchronous-work states use `HKQ-*`.
- Operation states use `HKO-*`.
- Ordering outcomes use `ORD-*`.
- Receipt lifecycle states use `HKR-*`.
- Protected audit evidence classes use `HKA-*`.
- Reconciliation outcomes use `REC-*`.

These are architecture references, not permissions or deployed workflow identifiers.

## Decision states

### `HKD-REQUEST-RECORDED`

One normalized atomic policy request is recorded with exact facts and revisions.

This state does not imply that evaluation occurred.

### `HKD-ALLOW-FRESH`

The pure evaluator returned `allow`, the exact dependency snapshot is preserved, and the decision remains inside every applicable freshness boundary.

This state is necessary but not sufficient for execution.

### `HKD-DENY`

The evaluator returned `deny` from sufficient explicit facts.

No operation may proceed under this decision.

### `HKD-INDETERMINATE`

The evaluator could not safely determine authority because a material fact was missing, stale, ambiguous, conflicting, unsupported, unresolved, or unmapped.

No operation may proceed under this decision.

### `HKD-STALE`

The decision was once eligible for enforcement but a freshness boundary ended or a material dependency changed.

The decision remains inspectable historical evidence and cannot authorize future execution.

### `HKD-INVALIDATED`

The decision is not eligible for enforcement because its input, policy, lifecycle, identity, mapping, compatibility, or correction basis was found defective or non-applicable.

Invalidation does not rewrite or delete the original decision.

### `HKD-EXPIRED`

The decision’s explicit execution window or maximum decision age ended.

A later operation requires a new decision from current facts.

### `HKD-SUPERSEDED`

A newer decision exists for a corrected, changed, or newly evaluated request.

The prior decision remains immutable and linked.

### `HKD-CONTESTED`

A challenge, conflict, incident, or correction process disputes the decision or its facts.

Future dependent execution is blocked or contained according to the accepted rule.

## Decision transition rules

- `HKD-REQUEST-RECORDED` may become `HKD-ALLOW-FRESH`, `HKD-DENY`, or `HKD-INDETERMINATE`.
- `HKD-ALLOW-FRESH` may become `HKD-STALE`, `HKD-INVALIDATED`, `HKD-EXPIRED`, `HKD-SUPERSEDED`, or `HKD-CONTESTED`.
- `HKD-DENY` and `HKD-INDETERMINATE` may be followed by a new request and new decision but are not edited into allow.
- `HKD-STALE`, `HKD-INVALIDATED`, and `HKD-EXPIRED` are non-authorizing historical states.
- A correction creates a new linked record or decision rather than mutating a prior outcome.

## Lifecycle-propagation states

### `HKL-NOT-REQUIRED`

No dependent live decision, reservation, envelope, queue item, operation, or credential is known to require invalidation.

### `HKL-PENDING`

A lifecycle event is authoritative, but propagation to one or more dependent systems is not yet confirmed.

Future irreversible operations remain blocked when they depend on the affected authority.

### `HKL-APPLIED`

Every identified dependent decision, reservation, envelope, queue item, active operation, and derived credential is invalidated, cancelled, stopped, or reconciled as required.

### `HKL-PARTIAL`

Some propagation targets confirm application while others remain pending, failed, unavailable, or unknown.

This state cannot be rendered as complete revocation enforcement.

### `HKL-FAILED`

A known propagation target failed to apply the lifecycle change.

Containment and incident handling are required.

### `HKL-CONFLICTING`

Different projections or services report incompatible lifecycle or sequence state.

Affected execution fails closed until reconciled.

### `HKL-RECONCILED`

A prior partial, failed, or conflicting propagation state has an accepted correction and final bounded outcome.

The original evidence remains inspectable.

## Capacity states

### `HKC-AVAILABLE`

The current capacity record supports a new reservation under the exact grant revision and counting rule.

### `HKC-RESERVED`

One count or bounded quantity is held for one operation identity until consumption, release, expiry, or reconciliation.

Reservation is not consumption or release.

### `HKC-COMMITTED`

Capacity is consumed under the accepted irreversible-boundary rule.

The event is correlated with operation, decision, release, and receipt intent.

### `HKC-RELEASED`

A prior reservation returned to available capacity because evidence established that the irreversible boundary was not crossed.

### `HKC-EXPIRED`

A reservation ended without beginning valid execution and evidence supports safe release or closure under the accepted policy.

Expiry alone does not prove no external release if execution state is ambiguous.

### `HKC-EXHAUSTED`

No further use is available under the grant revision.

### `HKC-CONFLICTING`

Concurrent, duplicated, reordered, or inconsistent records disagree about available, reserved, or consumed count.

No new consuming operation may proceed.

### `HKC-UNKNOWN`

Current capacity cannot be established from authoritative evidence.

No new consuming operation may proceed.

### `HKC-QUARANTINED`

Capacity remains unavailable while an ambiguous release, incident, correction, or reconciliation is reviewed.

This prevents an uncertain operation from being repeated through a new reservation.

## Capacity transition rules

- `HKC-AVAILABLE` may become `HKC-RESERVED`.
- `HKC-RESERVED` may become `HKC-COMMITTED`, `HKC-RELEASED`, `HKC-EXPIRED`, `HKC-CONFLICTING`, `HKC-UNKNOWN`, or `HKC-QUARANTINED`.
- `HKC-COMMITTED` contributes to exhaustion and is not reversed merely because delivery acknowledgment is missing.
- `HKC-CONFLICTING`, `HKC-UNKNOWN`, and `HKC-QUARANTINED` require reconciliation before reuse.
- A retry for the same operation reuses the reservation or its reconciled state; it does not create a new count.

## Execution-envelope states

### `HKE-ISSUED`

One non-transferable envelope is created from one fresh `allow` decision.

### `HKE-VALIDATED`

The intended performing service verified envelope integrity, audience, environment, service identity, operation identity, scope, expiry, cancellation, and reservation.

### `HKE-ACTIVE`

The envelope may govern the one intended operation before its release boundary, subject to current freshness and containment state.

### `HKE-CONSUMED`

The envelope has governed its one permitted operation and cannot be reused.

### `HKE-CANCELLED`

The envelope is cancelled before completion because of user cancellation, lifecycle change, containment, or accepted orchestration behavior.

### `HKE-INVALIDATED`

A dependency changed or the envelope was defective, mismatched, transferred, broadened, or otherwise unsuitable for enforcement.

### `HKE-EXPIRED`

The envelope’s start or absolute expiry boundary ended.

### `HKE-CONFLICTING`

Different services report incompatible envelope revision, validation, cancellation, or consumption state.

Execution fails closed and enters reconciliation.

## Queue and asynchronous-work states

### `HKQ-NOT-SCHEDULED`

No background work exists for the operation.

### `HKQ-SCHEDULED`

One minimized manifest is durably associated with the operation and envelope.

### `HKQ-DELIVERED`

The manifest reached an eligible consumer. Delivery does not prove validation or execution.

### `HKQ-VALIDATED`

The consumer validated envelope, identity, environment, freshness, scope, cancellation, capacity, and idempotency.

### `HKQ-RETRY-PENDING`

The same operation may be retried under the same idempotency identity because evidence establishes that the irreversible boundary was not crossed and authority remains fresh.

### `HKQ-DEAD-LETTERED`

The work could not safely complete and is isolated for review.

Dead-letter state does not preserve authority indefinitely.

### `HKQ-CANCELLED`

The queued work is cancelled before the irreversible boundary.

### `HKQ-STALE`

The envelope, decision, lifecycle, identity, capacity, or execution window is no longer applicable.

### `HKQ-DUPLICATE`

A duplicate message or delivery is detected for an existing operation identity.

It cannot create a second execution.

### `HKQ-CONFLICTING`

Queue, consumer, or operation records disagree about delivery, retry, cancellation, or outcome.

The item is contained and reconciled rather than replayed automatically.

## Operation states

### `HKO-PLANNED`

The operation is defined but has not obtained every required decision, reservation, envelope, or receipt capability.

### `HKO-RESERVED`

Required capacity and bounded execution resources are reserved.

### `HKO-STARTED`

The performing actor began reversible work.

This does not prove data release or completion.

### `HKO-PRE-RELEASE-CHECK`

The operation is paused at the irreversible boundary while current authority, recipient, condition, capacity, session, and containment facts are verified.

### `HKO-RELEASED`

The system has evidence that the defined data-release or irreversible boundary was crossed.

### `HKO-COMPLETED`

The exact operation completed after any required release and post-release actions.

### `HKO-PARTIAL`

Some defined effects occurred and others did not.

The completed and incomplete boundaries remain explicit.

### `HKO-STOPPED`

The operation stopped before completion because of revocation, suspension, cancellation, containment, invalidation, or another accepted rule.

The state identifies whether the irreversible boundary had already occurred.

### `HKO-FAILED-BEFORE-RELEASE`

The operation failed and evidence establishes that the irreversible boundary was not crossed.

### `HKO-FAILED-AFTER-RELEASE`

The irreversible boundary occurred, but a later stage failed.

The failure does not erase the release.

### `HKO-UNKNOWN`

Available evidence cannot determine whether the irreversible boundary or another material effect occurred.

Automatic retry and capacity release are blocked.

### `HKO-CONTESTED`

A challenge, correction, incident, or recipient dispute contests the operation record.

## Operation transition rules

- `HKO-PLANNED` may become `HKO-RESERVED` or stop without execution.
- `HKO-RESERVED` may become `HKO-STARTED`, `HKO-STOPPED`, or `HKO-FAILED-BEFORE-RELEASE`.
- `HKO-STARTED` must pass through `HKO-PRE-RELEASE-CHECK` before the declared irreversible boundary.
- `HKO-PRE-RELEASE-CHECK` may become `HKO-RELEASED`, `HKO-STOPPED`, `HKO-FAILED-BEFORE-RELEASE`, or `HKO-UNKNOWN`.
- `HKO-RELEASED` may become `HKO-COMPLETED`, `HKO-PARTIAL`, `HKO-FAILED-AFTER-RELEASE`, `HKO-UNKNOWN`, or `HKO-CONTESTED`.
- A state cannot move backward to conceal release or partial effects.
- Corrections create linked reconciliation records.

## Ordering outcomes

### `ORD-REVOCATION-BEFORE-START`

Revocation or suspension was effective before operation start.

Expected result: no start, envelope invalidation, safe reservation release when established, and stopped or denial evidence.

### `ORD-REVOCATION-AFTER-START-BEFORE-RELEASE`

The lifecycle change became effective after reversible work started but before the irreversible boundary.

Expected result: stop or new evaluation; no release under the stale decision.

### `ORD-RELEASE-BEFORE-REVOCATION`

The irreversible boundary occurred before the lifecycle change became effective.

Expected result: historical access remains recorded, capacity remains consumed, receipt describes release, and downstream obligations remain explicit.

### `ORD-REVOCATION-AND-RELEASE-SAME-ORDERED-BOUNDARY`

An accepted transaction or authoritative ordering rule establishes which event occurred first even when timestamps appear equal.

Expected result follows the established order with evidence.

### `ORD-AMBIGUOUS`

Ordering cannot be proven.

Expected result: unknown or contested execution, capacity quarantine, no automatic retry, containment, investigation, correction, notification, and residual-harm record.

## Receipt lifecycle states

### `HKR-EXPECTED`

Policy, envelope, or operation rules require one or more person-visible receipt records.

### `HKR-INTENT-RECORDED`

The durable structured intent and authoritative references are recorded at the accepted internal boundary.

### `HKR-RECORDED`

The canonical receipt exists and passes deterministic validation.

### `HKR-DELIVERY-PENDING`

The receipt exists but has not yet been delivered through the selected person-visible channel.

### `HKR-DELIVERED`

Delivery evidence exists for the intended person-visible destination.

This does not prove the person read or understood the receipt.

### `HKR-DELIVERY-FAILED`

Delivery failed while the canonical receipt remains recorded.

The underlying operation outcome remains unchanged.

### `HKR-INACCESSIBLE`

The person cannot meaningfully access or understand the receipt through the available channel or representation.

Accessibility correction is required.

### `HKR-DELAYED`

The receipt was recorded or delivered outside the accepted service-level boundary.

Delay does not change the historical operation time.

### `HKR-MISSING`

An expected receipt cannot be found even though decision, operation, release, or lifecycle evidence indicates it should exist.

This is a material control failure and not proof that no access occurred.

### `HKR-DUPLICATE`

Multiple receipts claim the same event without an accepted reason or correction relationship.

### `HKR-CONFLICTING`

Receipts disagree about material actors, recipient, purpose, scope, outcome, release, lifecycle, or time.

### `HKR-CORRECTED`

A linked append-only correction or annotation addresses a prior receipt.

The original remains inspectable.

### `HKR-DISPUTED`

The person or accountable reviewer challenges the receipt or its interpretation.

### `HKR-RETAINED-UNDER-EXCEPTION`

A receipt or minimum permission-history evidence remains under one explicit reviewed retention exception.

### `HKR-DELETION-PROCESSING`

An accepted receipt-specific deletion or minimization request is being resolved without silently erasing material access history.

### `HKR-DELETED`

The applicable receipt target was deleted according to explicit policy and completion evidence.

This state must not be used to claim the underlying operation never occurred.

## Receipt consistency rules

- `HKR-RECORDED` must reference an existing request, decision, and applicable event basis.
- Access-completed receipts require release evidence.
- A denied or indeterminate decision cannot have an authorized completion receipt under that decision.
- Partial, stopped, failed, and unknown operations retain matching receipt semantics.
- Delivery state does not rewrite receipt existence or operation truth.
- `HKR-MISSING`, `HKR-DUPLICATE`, and `HKR-CONFLICTING` trigger reconciliation and incident handling.
- Receipt correction is append-only.
- Receipt deletion requires separate policy, minimization, exception, and completion evidence.

## Protected audit evidence classes

### `HKA-REQUEST-NORMALIZATION`

Records request identity, revision, structural validation, server-derived context references, and normalization revision.

### `HKA-AUTHORITY-RESOLUTION`

Records bounded references to identity, recipient membership, grants, lifecycle, definitions, conditions, capacity, and unresolved facts.

### `HKA-POLICY-DECISION`

Records policy request, evaluator, policy, outcome, reason codes, independently authorizing grants, freshness boundary, and decision dependency identity.

### `HKA-LIFECYCLE-EVENT`

Records grant lifecycle transition, effective and recorded times, authority basis, sequence, reason, and propagation state.

### `HKA-DECISION-INVALIDATION`

Records which decision dependencies changed and which live artifacts were invalidated or remain unresolved.

### `HKA-CAPACITY-EVENT`

Records reservation, commitment, release, exhaustion, conflict, unknown, or quarantine state without copying unrelated content.

### `HKA-ENVELOPE-EVENT`

Records issuance, validation, invalidation, cancellation, expiry, consumption, and service or environment binding.

### `HKA-QUEUE-EVENT`

Records scheduling, delivery, validation, duplicate, retry, dead letter, cancellation, stale, and conflicting state.

### `HKA-EXECUTION-EVENT`

Records operation start, checkpoint, stop, failure, partial, completion, and actor or service identity.

### `HKA-RELEASE-EVENT`

Records the declared irreversible boundary, ordering evidence, recipient and destination binding, and outcome.

### `HKA-RECEIPT-EVENT`

Records receipt expectation, intent, issuance, delivery, failure, delay, missing, duplicate, conflict, correction, and deletion lifecycle.

### `HKA-OPERATOR-OR-EMERGENCY-EVENT`

Records one bounded administrative or emergency intervention with authority, purpose, scope, expiry, and review linkage.

### `HKA-INCIDENT-AND-RESTORATION`

Records anomaly, containment, investigation, correction, notification, restoration, downstream action, and residual harm.

Audit evidence classes specify purpose and minimum references. They do not authorize universal fields or search.

## Reconciliation outcomes

### `REC-CONSISTENT`

Decision, lifecycle, capacity, envelope, queue, execution, release, receipt, and audit evidence agree for the bounded operation.

### `REC-CORRECTED`

A defect was corrected through append-only records and the final bounded interpretation is established.

### `REC-CONTAINED`

Ongoing authority or execution is stopped while complete resolution remains pending.

### `REC-RESTORED`

Affected access, permission history, notification, capacity, or person-facing state was repaired as far as possible.

### `REC-PARTIAL-RESTORATION`

Some repair occurred, but downstream or irreversible harm remains.

### `REC-UNRESOLVED`

Material conflict, missing evidence, external uncertainty, or specialist holdpoint prevents a final conclusion.

### `REC-RESIDUAL-HARM`

The record identifies what cannot be restored, who remains affected, why the harm persists, and the next review trigger.

## Retry decision rules

A retry may proceed under the same operation identity only when all of the following are established:

- the prior irreversible boundary was not crossed;
- current decision and dependencies remain fresh or a new decision is recorded;
- the envelope remains applicable or a new envelope is issued for the same operation under an accepted rule;
- capacity remains reserved or was safely reconciled;
- recipient, performer, processor, resource, purpose, scope, action, and conditions are unchanged;
- the retry window remains valid;
- no cancellation, lifecycle, containment, or incident block applies; and
- receipt and audit correlation remain the same.

A retry is blocked when:

- prior release is known;
- prior outcome is unknown or ambiguous;
- capacity is committed, conflicting, unknown, or quarantined;
- the operation identity changes without new authorization;
- authority or recipient facts changed;
- the envelope expired or was invalidated;
- the dead-letter item is stale; or
- evidence is insufficient to distinguish duplicate execution.

## Batch and streaming record rules

### Batch

Every materially distinct item has its own:

- policy request and decision;
- operation and idempotency identity;
- capacity state;
- execution outcome;
- release marker; and
- receipt chain.

A batch-level summary may aggregate only after preserving item-level truth.

### Stream

A stream has:

- one bounded stream identity;
- independently reviewable scope and maximum duration;
- periodic authorization checkpoints;
- event-driven revocation and containment;
- explicit released intervals or event windows;
- capacity or rate accounting where applicable;
- person-visible receipt behavior proportionate to comprehension and privacy; and
- a final closure or ambiguous-state record.

## Correction and migration rules

Corrections and migrations must preserve:

- prior IDs and revisions;
- original outcomes and reason codes;
- effective and recorded ordering;
- capacity reservations and consumption;
- envelope and queue history;
- release and irreversible-boundary claims;
- receipt and delivery state;
- append-only corrections;
- audit correlation;
- challenge and restoration state; and
- unsupported-version fail-closed behavior.

They must not:

- convert `deny` or `indeterminate` into historical allow;
- reactivate a closed grant;
- reset consumed capacity;
- replace an unknown release with failure-before-release without evidence;
- rewrite a partial operation as complete;
- erase a missing-receipt failure; or
- collapse receipt and audit truth.

## Current capability truth

At workstream 5.5 completion:

- the state vocabulary is designed;
- the Sprint 4 policy evaluator, contracts, validators, fixtures, and tests remain pre-stable and synthetic-only;
- no lifecycle projection or propagation runtime exists;
- no capacity reservation or consumption service exists;
- no execution envelope, queue, performer, release service, or recipient exists;
- no production receipt or audit service exists;
- no production clock, sequence, transaction, signing, retention, notification, or reconciliation system exists; and
- no state in this register is operationally verified or independently reviewed.

## Review triggers

Review this register when:

- a House of Keys contract or lifecycle state changes;
- a decision cache, policy gateway, queue, worker, workflow, or retry system is introduced;
- single-use or bounded-count authority is implemented;
- an operation gains a new irreversible boundary;
- a recipient, connector, external provider, AI, or MCP agent is introduced;
- receipt, audit, monitoring, notification, or correction systems are designed;
- clocks, regions, failover, backups, or migrations can alter ordering;
- an incident or tabletop reveals an unrepresented state; or
- specialist review requires a narrower or additional outcome.

A new state or transition must identify affected threats, risks, controls, evidence, and backward-compatibility behavior.
