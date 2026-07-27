# Aster Responsive and Deferred Work Contracts

[Architecture index](README.md) · [Aster boundary](aster-contract-boundary.md) · [Role contracts](aster-role-contracts.md) · [Memory lifecycle](aster-memory-lifecycle-contracts.md) · [Untrusted-input isolation](aster-prompt-injection-and-untrusted-input-isolation.md) · [Operational simplicity](operational-simplicity-and-durable-workflows.md) · [Product contract baseline](../product/aster-contract-baseline.md) · [Sprint 6 execution plan](../roadmap/sprint-6-execution-plan.md)

- **Status:** ACTIVE PRE-STABLE CONTRACT
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`
- **Evidence boundary:** deterministic public contracts and synthetic tests; not production queue, scheduler, workflow engine, worker, provider, persistence, delivery, monitoring, or operational certification

## Purpose

Aster roles may produce a result during the current interaction, coordinate work that finishes later, or use a manual or deterministic substitute. Those paths require truthful and inspectable state without allowing a queue acknowledgement, provider response, retry, duplicate delivery, or stale result to become authority.

The permanent transaction boundary remains:

> AI proposes; the player confirms; deterministic domain services validate and store.

A work record coordinates Aster proposal or explanation work. It is not a Living Chronicle record, House of Keys decision, access receipt, protected audit record, canonical gameplay event, provider log, retrieval index, or authoritative domain outcome.

## Execution classes

The existing Aster role matrix defines three execution classes:

- `responsive` — the current interaction receives a truthful result, failure, refusal, or limitation;
- `deferred` — the current interaction may record that bounded work was accepted, delayed, or failed, while the result completes later; and
- `manual-fallback` — a manual or deterministic path replaces optional AI or provider work.

A role may use only the execution classes declared in its public role contract. The work lifecycle cannot make a responsive-only role deferred merely because infrastructure supports a queue.

## Work lifecycle states

The public lifecycle states are:

- `requested`;
- `accepted`;
- `running`;
- `succeeded`;
- `failed-retryable`;
- `failed-terminal`;
- `timed-out`;
- `cancelled`;
- `stale`;
- `superseded`;
- `provider-unavailable`;
- `quarantined`; and
- `corrected`.

These are bounded work facts, not domain facts. In particular:

- `accepted` means deferred work was accepted for later processing;
- `running` means one identified attempt is active;
- `succeeded` means the declared non-authoritative Aster result was produced;
- `provider-unavailable` means an optional provider dependency could not be used; and
- `corrected` means a prior work result is no longer current because another work record corrected it.

Acceptance for processing is never represented as completion.

## Stable work identity and revision snapshots

Every work envelope identifies:

- stable work identity and revision;
- Aster role, operation, and execution class;
- exact request, intent-decision, proposal, and subject references where applicable;
- input-time subject, authority, source, and policy revision references;
- the corresponding current revision snapshot; and
- whether the work remains `current`, `stale`, `superseded`, or `unknown`.

Current applicability requires the input and current snapshots to match exactly. Stale applicability requires an inspectable revision difference.

A completed result produced against stale, superseded, or unknown facts cannot replace a current result or silently act under the older authority state.

## Attempts and truthful acknowledgement

Each attempt has a stable identity, contiguous attempt number, state, and optional failure detail. At most one attempt may be pending or running.

Player-facing acknowledgements distinguish:

- requested;
- accepted or pending;
- processing or delayed;
- complete or partial;
- failed or timed out;
- cancelled;
- stale or superseded;
- provider unavailable;
- manual fallback;
- quarantined; and
- corrected.

Only `succeeded` work may claim completion. Acknowledgements cannot claim an authoritative domain effect.

## Result boundary

A work result remains:

- proposal-only;
- non-canonical;
- not an authoritative action invocation;
- not domain-accepted; and
- unable to prove Chronicle storage, permission, progression, reward, delivery, or downstream effect.

A complete or partial result identifies the exact result revision and work revision that produced it. States without a usable result cannot carry a result identity.

## Retry policy

Retry policy is explicit and versioned. It records:

- stable policy identity and revision;
- whether retry is permitted, blocked, requires manual review, or is not applicable;
- a bounded maximum attempt count where relevant;
- a written reason;
- mandatory authority-freshness review; and
- the fact that a provider default is not authority.

A retry cannot reuse stale player intent, stale subject state, stale permission, stale source revisions, stale policy, or a superseded proposal as current authority.

`failed-retryable` requires:

- a retryable attempt failure;
- explicit bounded retry permission;
- a maximum attempt count; and
- an idempotency strategy safe for repetition.

An unknown external outcome cannot be retried automatically. It requires blocking or manual reconciliation because the irreversible effect may already have occurred.

## Idempotency and duplicate delivery

The work contract supports:

- natural idempotency;
- de-duplication by operation identity;
- expected-version checks;
- single-use operations;
- append-only duplicate detection; and
- explicitly non-repeatable operations.

Duplicate disposition is explicit:

- return the existing result;
- ignore the duplicate;
- reject the duplicate; or
- require manual reconciliation.

Transport de-duplication is useful but is never sufficient by itself. Retry or duplicate delivery cannot repeat an authoritative effect.

## Timeout and cancellation

A timeout records a timed-out attempt and an explicit retry decision. It cannot claim completion.

Cancellation requires:

- an inspectable cancellation reference;
- no pending or running attempt;
- blocked future retry; and
- a cancelled result state.

Cancellation stops future work. It does not claim that an external effect was reversed or that downstream copies disappeared.

## Provider unavailability and fallback

Provider dependency state is bounded to an abstract dependency class and reference. This contract does not select or approve a provider.

When a required optional provider is unavailable or its availability is unknown:

- the state is explicit;
- the player receives a direct acknowledgement;
- a manual, deterministic, or structured-query fallback may activate;
- the fallback records a reason and description; and
- the fallback cannot block core capture, permission review, correction, export, deletion, or ordinary play.

Provider selection, egress, retention, funding conflicts, teardown, and replacement remain Sprint 6.9 work.

## Stale and superseded work

Stale work cannot:

- replace a current result;
- retry automatically under stale authority;
- overwrite a newer proposal or source-linked result; or
- represent an old provider or policy response as current.

Superseded work identifies the replacing work identity and revision. It cannot retry or replace current results.

The newest result is not automatically authoritative. Current applicability still depends on exact subject, source, authority, and policy revisions.

## Correction and replay

Correction and replay preserve prior evidence rather than rewriting it in place.

A correction relationship may identify:

- the prior work being corrected; or
- the later work that corrected a prior result.

Replay modes are:

- `same-input`;
- `current-input`;
- `historical-reproduction`; or
- `not-replay`.

Every replay:

- creates a new work identity;
- preserves the prior result;
- identifies the exact source work revision; and
- cannot silently rewrite source truth or prior operational evidence.

Operational replay uses current authority facts. Historical reproduction does not replace current results.

## Quarantine and hostile input

Deferred work inherits the [Aster prompt-injection and untrusted-input isolation contract](aster-prompt-injection-and-untrusted-input-isolation.md) and the accepted Sprint 5 security baseline.

Quarantined work:

- requires manual review;
- cannot replace current results;
- cannot retry automatically; and
- remains separate from canonical source, permission, and domain state.

## Authority boundary

The work lifecycle cannot:

- write canonical records;
- create or expand permission;
- reuse stale authority;
- claim queue acceptance as completion;
- duplicate an authoritative effect;
- overwrite a newer result;
- retry an unknown external outcome automatically;
- block core paths because a provider is unavailable;
- complete quests; or
- grant rewards.

## Validation

`validateAsterWorkLifecycle` checks:

- contract, identity, role, operation, and execution-class alignment;
- stable request and revision references;
- exact input and current snapshot applicability;
- contiguous, unique attempts and one active attempt maximum;
- versioned retry policy and bounded retry safety;
- idempotency and duplicate behavior;
- dependency and non-blocking fallback state;
- proposal-only result and truthful acknowledgement state;
- cancellation, correction, supersession, duplicate, and replay relationships;
- responsive, deferred, timeout, failure, provider-unavailable, stale, quarantined, cancelled, corrected, and superseded state evidence;
- stale-result overwrite attempts;
- unknown-outcome automatic retry; and
- authority escalation.

The public synthetic tests cover responsive success, deferred acceptance, retryable failure, timeout, cancellation, provider unavailability, stale-result rejection, replay, correction relationships, unknown external outcomes, and authority escalation.

## Non-scope

This contract does not create or select:

- a queue;
- a scheduler;
- a workflow engine;
- a worker runtime;
- an event store;
- a persistence model;
- a provider;
- numeric latency targets;
- production monitoring;
- delivery infrastructure;
- offline synchronization; or
- a real-data path.

Passing tests proves only that the checked public contracts preserve these declared boundaries. It does not prove production reliability, exactly-once delivery, security, privacy, provider behavior, deletion completion, operational readiness, or specialist review.
