# House of Keys Enforcement, Freshness, Receipt, and Audit Security Model

[Security architecture](README.md) · [House of Keys control register](house-of-keys-control-register.md) · [Decision and execution lifecycle register](house-of-keys-decision-execution-lifecycle-register.md) · [Integrated threat model](integrated-threat-model.md) · [House of Keys architecture](../architecture/house-of-keys-policy-evaluation-model.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent security, privacy, accessibility, legal, and records-governance review pending  
**Workstream:** 5.5  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** provider-independent design only; no production grant store, lifecycle projection, policy gateway, capacity service, queue, execution service, release service, receipt service, audit system, recipient integration, or real-data operation is authorized or represented as deployed

## Purpose

This model defines how one exact House of Keys policy decision may control one exact operation from request through execution, release, receipt, correction, and audit.

It closes the gap between the pure Sprint 4 evaluator and a future distributed runtime without converting a point-in-time `allow` result into a durable bearer capability.

The model refines the integrated threat and residual-risk records:

- `THR-017` / `RSK-017` — self-grant, blanket authority, purpose laundering, and scope broadening;
- `THR-018` / `RSK-018` — stale decisions and revocation races;
- `THR-019` / `RSK-019` — single-use and bounded-count replay or double consumption;
- `THR-020` / `RSK-020` — requester, recipient, performer, processor, release, retention, or onward-use mismatch;
- `THR-021` / `RSK-021` — missing, forged, duplicated, inaccessible, or misleading receipts;
- `THR-022` / `RSK-022` — audit evidence becoming surveillance, shadow permission, or forged evidence; and
- `THR-031` / `RSK-031` — queue replay, reordering, duplication, delay, cancellation failure, or lost authority context.

The model does not replace those threat or risk identities. It supplies House of Keys-specific control behavior and lifecycle semantics.

## Governing decision

A House of Keys policy decision is immutable point-in-time evidence about exact facts.

It is not:

- a bearer token;
- a reusable session capability;
- an execution instruction by itself;
- a queue credential;
- proof that data was released;
- proof that a single-use grant was consumed;
- a receipt;
- an audit record;
- a Chronicle mutation;
- proof of external-recipient compliance; or
- authority after a relied-upon fact changes.

A future runtime may proceed only through a separate, bounded execution-enforcement process that preserves the exact request and decision identities, verifies freshness, reserves bounded capacity when required, identifies the irreversible boundary, records execution truth, creates the required receipt path, and fails closed when ordering or authority cannot be established.

## Protected properties

The enforcement boundary protects:

- exact purpose, recipient, performer, processor, resource, subject, category, selector, action, condition, and duration scope;
- meaningful refusal, suspension, revocation, expiry, exhaustion, supersession, and invalidation;
- single-use and bounded-count limits;
- server-derived resource and actor context;
- separation of permission, decision, execution, receipt, audit, Chronicle, source, product, and AI truth;
- recipient and release-boundary integrity;
- person-visible access history;
- correction without silent overwrite;
- non-punitive refusal and withdrawal;
- no reward or governance advantage from broader authority or receipt volume;
- cancellation and containment after authority change;
- explicit uncertainty when ordering or external outcome cannot be proven;
- provider and operator replaceability; and
- truthful control status.

## Enforcement actors and authority

### Requesting actor

The requester asks for one atomic operation. Requesting does not grant authority.

### Granting authority

The granting authority is the person or later separately reviewed representative whose confirmation created the applicable grant.

### Policy gateway

A future policy gateway may assemble explicit facts and invoke the pure evaluator.

The gateway:

- authenticates no actor merely by receiving an identifier;
- derives account, resource, subject, and actor context from bounded identity services;
- loads exact versioned definitions and grant facts;
- records missing, stale, conflicting, or unsupported facts;
- does not repair an invalid request by broadening scope; and
- does not perform the operation.

### Pure policy evaluator

The existing pure evaluator returns `allow`, `deny`, or `indeterminate` for explicit facts.

The evaluator does not:

- fetch current facts;
- mutate lifecycle state;
- reserve or consume capacity;
- issue an execution envelope;
- start work;
- release data;
- issue a receipt; or
- write audit evidence.

### Enforcement coordinator

A future enforcement coordinator binds a fresh `allow` decision to one operation.

It may:

- verify the decision and its dependencies;
- create one operation identity;
- create or obtain one capacity reservation;
- construct a non-transferable execution envelope;
- schedule or invoke a bounded performer;
- cancel or stop work after authority changes;
- require a pre-release freshness check;
- record execution state; and
- coordinate receipt intent and protected audit evidence.

It cannot create new grant authority or broaden the policy request.

### Performing actor

The performer executes one named action under one exact envelope.

Technical ability, service identity, queue possession, operator status, provider ownership, or network location does not create discretion to browse, select another resource, change the recipient, or reuse the decision.

### Recipient

The recipient is the exact party or reviewed bounded class named in the decision and verified at the release boundary.

The recipient cannot silently become the requester, performer, processor, onward recipient, or holder of unrelated future authority.

### Receipt issuer

The receipt issuer records one person-visible claim from authoritative decision, lifecycle, execution, and release facts.

It does not create permission or infer missing events.

### Protected audit service

The audit service records minimized technical and security evidence for accountability and incident response.

It is not the permission system, a shadow Chronicle, a person-facing receipt, or an unrestricted analytics surface.

## Atomic operation boundary

The initial enforcement boundary authorizes one atomic operation.

An atomic operation has one:

- requester;
- primary recipient;
- performing actor and processor constraints;
- controlled resource;
- subject set;
- purpose and revision;
- category and revision set;
- narrowing selector;
- action and revision set;
- operation boundary;
- condition set;
- duration and capacity basis;
- release or irreversible boundary; and
- receipt expectation.

A batch is not atomic merely because one interface submitted it.

Requests with materially different recipients, purposes, optionality, data sets, actions, retention behavior, onward-use rules, or consequences must be decomposed into independently decidable and receiptable operations.

## Decision dependency snapshot

Every decision used for enforcement must preserve exact references to:

- policy and evaluator identity and revision;
- normalization revision;
- policy request identity and revision;
- controlled resource and subject scope;
- requester, recipient, performer, and processor identities;
- purpose, category, action, and recipient definition revisions;
- grant identities and revisions evaluated;
- independently authorizing grants;
- lifecycle events or normalized lifecycle snapshot revisions;
- explanation, comprehension, and confirmation evidence;
- condition facts;
- capacity facts;
- identity and class-membership resolution facts;
- evaluation time;
- execution-window boundary;
- receipt requirement;
- missing or conflicting facts; and
- whether re-evaluation is required before execution.

A dependency reference that cannot be resolved or compared is not silently treated as unchanged.

## Freshness model

### Shortest-bound rule

A decision freshness boundary cannot extend beyond the earliest applicable boundary among:

- grant start or end;
- single-use or bounded-count capacity state;
- review deadline;
- session expiry or revocation;
- account-access-link expiry or suspension;
- delegation or capacity expiry;
- purpose, category, recipient, action, policy, evaluator, or mapping revision applicability;
- recipient or performing-actor membership expiry;
- condition validity;
- containment or suspension state;
- explicit execution-window end; and
- project-defined maximum decision age for the operation class.

A caller cannot extend freshness by supplying a later deadline.

### Known-change invalidation

A decision becomes stale for future enforcement when any material dependency changes, including:

- relied-upon grant lifecycle;
- authority-profile or account-link state;
- session state;
- requester, recipient, performer, processor, resource, or subject context;
- purpose, category, action, selector, condition, policy, evaluator, or mapping revision;
- comprehension or confirmation applicability;
- capacity or reservation state;
- containment or emergency state;
- export or deletion target state; or
- security policy requiring re-evaluation.

### Invalidation is not sufficient by itself

Best-effort cache, queue, or notification invalidation reduces exposure but is not the final correctness control.

Immediately before the release or irreversible boundary, the enforcing service must either:

1. verify the authoritative dependency revisions and freshness state; or
2. obtain a new decision from current explicit facts.

If the authoritative state cannot be reached or ordering cannot be established, the operation does not cross the irreversible boundary.

## Execution authorization envelope

A future runtime may derive one non-transferable execution envelope from one fresh `allow` decision.

The envelope should bind:

- stable envelope identity and revision;
- policy decision and request identities;
- correlation and operation identities;
- one controlled resource and subject set;
- requester, recipient, performer, and processor identities;
- exact purpose, category, selector, action, condition, and definition revisions;
- independently authorizing grant identities and the rendering grant identity;
- dependency snapshot identity;
- issue time and absolute expiry;
- maximum start time;
- required pre-release re-evaluation behavior;
- capacity reservation identity when applicable;
- idempotency identity;
- release or irreversible-boundary definition;
- permitted service identity, environment, and audience;
- receipt requirement and expected receipt event classes;
- cancellation and containment reference;
- data-minimization and output constraints; and
- current status.

The envelope:

- is valid for one operation identity;
- cannot be transferred to another actor, recipient, service, environment, action, or resource;
- cannot be broadened by a queue, worker, model, tool, or operator;
- expires automatically;
- is invalidated by relevant authority changes;
- cannot outlive the decision or grant boundary; and
- does not authorize a retry as a new operation.

## Operation identity and idempotency

Every attempted operation requires one stable operation identity.

All retries, duplicate deliveries, worker restarts, or reconciliation attempts for the same intended operation must reuse that identity.

A new operation identity means a new authorization and capacity decision.

The idempotency record must distinguish:

- no attempt recorded;
- reservation obtained;
- operation started;
- irreversible boundary not crossed;
- irreversible boundary crossed;
- completion recorded;
- partial outcome;
- stopped outcome;
- failed before release;
- unknown or ambiguous outcome; and
- reconciled final outcome.

An unknown outcome cannot be retried as a new operation merely to obtain a clean result.

## Single-use and bounded-count capacity

### Capacity is separate from decision truth

The evaluator may inspect a capacity snapshot. It does not reserve or consume capacity.

A future capacity service owns reservation and consumption state for the applicable grant revision.

### Reservation requirement

Before beginning an operation that may consume single-use or bounded-count authority, the enforcement coordinator must obtain one reservation bound to:

- the grant identity and revision;
- operation identity;
- decision identity;
- controlled resource and subjects;
- action and release boundary;
- reservation issue and expiry times; and
- expected consumption count.

A reservation does not prove release or consumption.

### Consumption rule

Capacity is consumed only under an accepted rule tied to the defined irreversible boundary.

The preferred internal boundary is an atomic or transactionally consistent record of:

- the operation identity;
- release-boundary claim;
- consumption commitment;
- execution state; and
- receipt intent.

External delivery may not be atomically reversible. When external outcome is uncertain, capacity and execution become contested or ambiguous rather than being released for automatic reuse.

### Reservation release

A reservation may return capacity only when evidence establishes that the irreversible boundary was not crossed.

Timeout, worker loss, missing receipt, provider error, or absent acknowledgment alone is insufficient proof that no release occurred.

## Decision-to-execution sequence

A compliant future path follows these stages.

### 1. Resolve context

Derive authenticated actor, account-access link, controlled resource, subjects, recipient, performer, processor, environment, and service context server-side.

### 2. Normalize the atomic request

Create one immutable policy request with exact revisions, selectors, conditions, operation boundary, and receipt requirement.

### 3. Load explicit authority facts

Load exact grants, lifecycle, confirmation, explanation, comprehension, definitions, mappings, identity facts, conditions, capacity, and containment state.

### 4. Evaluate policy

Invoke the pure evaluator and persist the immutable decision and dependency snapshot.

`deny` and `indeterminate` never proceed under that decision.

### 5. Obtain bounded capacity

For single-use or bounded-count authority, obtain one operation-bound reservation.

Conflicting, unavailable, or exhausted capacity blocks execution.

### 6. Construct the execution envelope

Bind the fresh decision, reservation, operation identity, actor and resource scope, expiry, release boundary, receipt requirement, and cancellation behavior.

### 7. Start the performer

The performer validates envelope audience, environment, service identity, operation identity, scope, expiry, and current cancellation state.

### 8. Re-evaluate before release

Immediately before data release or another irreversible action, verify current lifecycle, identity, recipient, condition, capacity, session, and policy state.

A material change produces stop, deny, or indeterminate handling, never continued execution by inertia.

### 9. Cross or do not cross the boundary

Record the exact irreversible-boundary outcome and any partial effects.

### 10. Commit execution and receipt intent

Record execution truth, consumption outcome, and required receipt intent through an accepted consistent internal boundary.

### 11. Issue and deliver receipts

Construct canonical person-visible receipts from structured authoritative records. Delivery state remains separate from receipt existence.

### 12. Record protected audit evidence

Record minimized technical evidence and any anomaly, without copying unnecessary Chronicle content.

## Revocation and lifecycle propagation

A lifecycle change must identify:

- grant and revision;
- prior and next state;
- transition actor and authority basis;
- effective and recorded times;
- lifecycle sequence or comparable monotonic revision;
- reason and evidence;
- affected decisions, reservations, envelopes, queued jobs, operations, recipients, and receipts known at that time;
- propagation state;
- unresolved conflicts; and
- review and restoration requirements.

Propagation targets include:

- policy and lifecycle projections;
- decision caches;
- execution-envelope stores;
- capacity reservations;
- active performers;
- queues and dead-letter stores;
- derived agent or API credentials;
- export and delivery workers;
- connector and synchronization jobs;
- receipt and notification services; and
- protected audit and incident workflows.

A lifecycle event does not rewrite prior decisions or completed receipts. It prevents or contains future execution according to effective ordering.

## Revocation race rules

The runtime must distinguish:

1. decision time;
2. reservation time;
3. operation start time;
4. pre-release check time;
5. release or irreversible-boundary time;
6. completion time;
7. revocation request time;
8. revocation effective time; and
9. revocation recorded and propagated times.

### Revocation effective before operation start

The operation must not start.

The envelope and reservation are invalidated or released when safe, and stopped or denial evidence is recorded.

### Revocation effective after start but before irreversible boundary

The operation stops or re-evaluates.

If safe cancellation succeeds, capacity may be released under explicit evidence.

### Revocation effective after irreversible boundary

The operation remains historical access or effect.

The system records ordering, completion or partial outcome, receipt, downstream obligations, containment, notification, and residual harm. It does not claim the prior release was erased.

### Ordering ambiguous

The outcome is `unknown` or `ambiguous` rather than confidently authorized or safely retryable.

The system contains dependent work, preserves evidence, blocks automatic capacity reuse, investigates, corrects receipts, notifies where appropriate, and records residual harm.

## Queues and asynchronous work

A queued operation manifest should contain only minimized references and exact enforcement facts:

- operation and correlation identities;
- execution-envelope identity and revision;
- controlled resource and subjects;
- recipient, performer, processor, action, and purpose references;
- decision and grant revisions;
- capacity reservation identity;
- issue, start-by, pre-release-check, and expiry boundaries;
- cancellation and lifecycle sequence references;
- receipt requirement;
- idempotency identity; and
- encrypted or protected pointers to required inputs rather than broad raw payloads.

A queue message cannot establish authority by possessing these fields.

The consumer must revalidate the envelope and current authority state.

Retry rules:

- retries reuse the same operation and idempotency identities;
- expired envelopes do not execute;
- dead-letter replay requires fresh review and cannot silently mint a new operation;
- cancellation and revocation remain effective in delayed and dead-letter states;
- duplicate delivery cannot create duplicate release or capacity consumption;
- an ambiguous prior release blocks automatic retry; and
- a new request requires a new decision and operation identity.

## Long-running, streaming, and batch operations

### Long-running operations

Long-running work uses checkpoints before every meaningful disclosure or irreversible effect.

A checkpoint verifies current lifecycle, recipient, performer, purpose, scope, condition, capacity, execution window, and containment state.

### Streaming operations

Streaming authority is never implied by one indefinite `allow` decision.

A future stream requires:

- a defined stream identity;
- exact purpose, recipient, data class, and maximum duration;
- periodic and event-driven re-evaluation;
- bounded checkpoints or windows;
- immediate stop behavior after applicable revocation;
- explicit accounting of data already released; and
- interval or event receipts that remain understandable without creating excessive receipt volume or surveillance.

### Batch operations

A batch may use shared orchestration only when every member preserves independent authorization, result, capacity, and receipt semantics.

One allowed item cannot authorize a denied or indeterminate item.

## Recipient and release integrity

Immediately before release, the enforcing service verifies:

- exact recipient identity and revision;
- recipient class membership when applicable;
- performing actor and processor identity;
- delivery destination binding;
- exact purpose and allowed action;
- selected categories and resource scope;
- no-onward-transmission, retention, training, advertising, profiling, or method conditions;
- encryption or protected transport requirements defined later in 5.7;
- current decision and lifecycle freshness;
- receipt capability; and
- release-boundary idempotency.

A destination change requires new authority or an accepted recipient-replacement process. Redirects, provider aliases, operator edits, model suggestions, or queue payload changes do not preserve recipient identity automatically.

## Receipt enforcement

### Receipt capability precondition

When policy or product rules require a person-visible receipt, the system verifies before the irreversible boundary that it can durably record the required structured receipt intent.

If that capability is unavailable, the operation does not silently proceed as though the receipt were optional.

### Durable receipt intent

At the irreversible boundary, the internal consistency boundary should record:

- operation identity;
- decision and grant references;
- execution state;
- release-boundary state;
- required receipt event kind;
- receipt issuer and correlation identity;
- capacity commitment when applicable; and
- protected audit correlation.

This may later use an outbox, event log, transaction, workflow, or equivalent mechanism. Sprint 5 does not select the implementation.

### Receipt existence versus delivery

A receipt may be durably recorded while delivery is pending, delayed, failed, or inaccessible.

Delivery failure does not mean the access did not occur. It triggers retry, support, correction, notification, and incident behavior according to later service-level rules.

### Missing or defective receipt

An expected but missing, delayed, duplicate, conflicting, inaccessible, or false receipt is a material control failure.

It triggers:

- containment where ongoing access may continue;
- reconciliation against decision, execution, release, capacity, and audit evidence;
- append-only correction or late issuance;
- person notification where appropriate and safe;
- incident linkage;
- restoration or downstream correction where possible; and
- residual-harm documentation when full repair is impossible.

## Receipt correction and history

Receipts remain append-only at the domain level.

A correction record identifies:

- original receipt;
- corrected claim or interpretation;
- correction kind;
- reason and evidence;
- correcting authority;
- correction time;
- affected decision, operation, recipient, grant, capacity, export, notification, or public claim;
- containment and restoration behavior; and
- whether the original receipt remains relied upon.

A correction does not erase historical existence or fabricate that access never occurred.

## Protected audit boundary

Protected audit evidence and person-visible receipts are separate.

Audit records use field allowlists appropriate to event class and should prefer references, digests, revisions, reason codes, and bounded technical metadata over copied health values or source content.

Required audit event classes include:

- request normalization;
- authority fact resolution;
- policy decision;
- lifecycle change;
- decision invalidation;
- capacity reservation and consumption;
- envelope issuance and validation;
- queue scheduling, delivery, retry, cancellation, and dead-letter state;
- operation start and checkpoints;
- irreversible-boundary claim;
- completion, partial, stopped, failed, or ambiguous outcome;
- receipt intent, issuance, delivery, failure, and correction;
- operator or emergency intervention;
- external-recipient release; and
- incident, challenge, correction, restoration, and residual harm.

Audit evidence:

- cannot create permission;
- cannot replace a missing receipt;
- cannot become a raw-data browser;
- cannot be universally searchable by operators;
- requires its own authority and retention policy;
- must preserve correction and integrity behavior; and
- must not hide material person-facing access facts merely because technical evidence is protected.

Cryptographic signing, hash chaining, storage integrity, retention, monitoring, and incident procedures remain 5.7 and 5.8 work.

## Decision, execution, receipt, and audit consistency

A future validator or reconciliation process must detect at least:

- execution under `deny` or `indeterminate`;
- execution under stale or unsupported decision dependencies;
- release after effective revocation when the boundary had not yet been crossed;
- operation, recipient, performer, processor, purpose, scope, selector, action, or environment mismatch;
- duplicate operation identity with conflicting release outcomes;
- capacity consumed without release evidence;
- release evidence without capacity commitment when required;
- released capacity after ambiguous external outcome;
- access completed without an expected receipt intent;
- receipt claiming access with no matching release evidence;
- receipt claiming completion when execution was partial, stopped, failed, or ambiguous;
- receipt or audit record with a different controlled resource or recipient;
- correction performed through in-place overwrite;
- audit evidence used as permission authority; and
- one receipt or decision hiding multiple materially different operations.

Consistency failure never manufactures a clean authorized narrative. It produces containment, investigation, correction, notification, restoration, and residual-risk handling.

## Lifecycle and definition migrations

A policy, taxonomy, evaluator, grant, lifecycle, receipt, or audit migration must preserve:

- prior revisions;
- exact semantics and direct explanations;
- grant scope and optionality;
- lifecycle effective and recorded times;
- decision dependencies and outcomes;
- capacity reservation and consumption history;
- execution and release ordering;
- receipt and correction chains;
- protected audit correlations;
- challenge and appeal state;
- personal-core independence; and
- fail-closed behavior for unsupported or ambiguous versions.

A migration cannot reinterpret a prior broad label as specific authority, reactivate a closed grant, reset consumed capacity, erase a denial or indeterminate result, or convert an attempt into completed access.

## AI, MCP, and automated execution boundary

AI, MCP, and other agents may request one bounded operation through the same policy and enforcement path.

They may not:

- supply authoritative person, resource, tenant, recipient, or grant context;
- retain a reusable `allow` decision as a general capability;
- alter an execution envelope;
- select hidden tools or new recipients;
- suppress re-evaluation;
- mint a new operation identity to bypass idempotency or capacity;
- claim access or receipt success from model output; or
- summarize uncertainty as authorization.

5.6 will refine untrusted input, tool, prompt, provider, and agent isolation.

## Non-punitive enforcement

The enforcement layer must not:

- require optional secondary-use permission for personal-core operations;
- delay ordinary revocation for feedback, replacement consent, payment, or recipient approval;
- create rewards from broader grants, longer duration, higher use counts, receipt volume, or fewer denials;
- reduce core rights after refusal, expiry, exhaustion, challenge, correction, or withdrawal;
- treat denial or indeterminate outcomes as health, loyalty, risk, intelligence, or trust scores;
- hide denied, stopped, partial, failed, corrected, or inaccessible outcomes to improve product metrics; or
- repeatedly re-prompt in a way that defeats meaningful refusal.

## Current evidence and unresolved dependencies

Current evidence includes:

- Sprint 4 architecture and pre-stable contracts;
- the pure deterministic evaluator;
- grant, lifecycle, explanation, comprehension, capacity, decision, and receipt contracts;
- seventeen public synthetic policy scenarios;
- one synthetic completed-access receipt;
- twenty-nine Sprint 4 tests;
- 5.1 asset and crossing maps;
- 5.2 identity, session, isolation, recovery, operator, and emergency boundaries;
- 5.3 integrated threats and residual risks; and
- 5.4 Chronicle source, dependency, export, deletion, and custody controls.

Still unresolved:

- production persistence and event-to-state projections;
- authoritative lifecycle sequence design;
- exact clock, ordering, and synchronization controls;
- decision, reservation, execution, and receipt transaction boundaries;
- queue and durable-workflow implementation;
- external delivery acknowledgment and downstream instruction handling;
- recipient registration and verification;
- batch, streaming, and long-running receipt ergonomics;
- receipt and audit retention, deletion, and legal holdpoints;
- cryptographic integrity and key custody;
- incident thresholds and service levels;
- independent security, privacy, accessibility, legal, and records-governance review; and
- public synthetic enforcement and tabletop evidence in 5.9.

## Workstream 5.5 completion evidence

Workstream 5.5 is complete at the internal architecture level when:

- a decision is explicitly point-in-time and non-transferable;
- exact decision dependencies and freshness boundaries are defined;
- final pre-release re-evaluation is required;
- lifecycle changes invalidate dependent decisions, reservations, envelopes, queues, and agents;
- one operation identity controls retries and idempotency;
- single-use and bounded-count reservation, commitment, release, conflict, and ambiguity are explicit;
- revocation races preserve effective ordering and irreversible effects;
- queue replay and dead-letter behavior cannot recreate authority;
- recipient and release identity are verified at the irreversible boundary;
- required receipt intent is durable before release;
- receipt existence, delivery, correction, and failure remain distinct;
- protected audit remains separate and minimized;
- batch, stream, long-running, migration, and correction boundaries are explicit;
- integrated threats and residual risks remain blocking where evidence is absent; and
- independent specialist review remains visibly pending.

No architecture statement in this document is evidence that a production control exists.