# House of Keys Enforcement Control Register

[Security architecture](README.md) · [Enforcement security model](house-of-keys-enforcement-security-model.md) · [Decision and execution lifecycle register](house-of-keys-decision-execution-lifecycle-register.md) · [Threat control objectives](threat-control-objective-register.md) · [Control status vocabulary](control-status-and-risk-vocabulary.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent security, privacy, accessibility, legal, and records-governance review pending  
**Workstream:** 5.5  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** design register only; no control in this file is implemented, deployed, operationally verified, or independently reviewed merely because it is documented

## Purpose

This register assigns stable `CTL-HK-*` identities to the House of Keys enforcement controls required between policy request, decision, lifecycle, capacity, execution, release, receipt, correction, and protected audit.

The controls refine `CTL-TM-*` objectives and `CTL-ID-*` identity controls. They do not replace the integrated threat or residual-risk records.

## Control families

- Request and policy integrity: `CTL-HK-001` through `CTL-HK-005`
- Freshness and lifecycle enforcement: `CTL-HK-006` through `CTL-HK-011`
- Execution and capacity integrity: `CTL-HK-012` through `CTL-HK-019`
- Queue, recipient, and long-running operations: `CTL-HK-020` through `CTL-HK-024`
- Receipt and correction integrity: `CTL-HK-025` through `CTL-HK-030`
- Protected audit, migration, and governance: `CTL-HK-031` through `CTL-HK-036`

## Request and policy integrity

### `CTL-HK-001` — Server-derived atomic policy request

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** exact authority scope, cross-user isolation, meaningful choice
- **Threats:** `THR-001`, `THR-017`, `THR-020`, `THR-023`
- **Requirement:** construct one immutable atomic request from server-derived actor, recipient, resource, subject, purpose, category, selector, action, condition, and operation-boundary facts; do not accept caller-supplied ownership or tenant authority
- **Evidence:** Sprint 4 request contract, `CTL-ID-002`, 5.5 enforcement model
- **Residual risk:** private gateway and domain integration do not exist
- **Owner:** future identity, policy-gateway, and domain owners
- **Revalidation:** first private API, MCP tool, agent tool, or policy-gateway implementation

### `CTL-HK-002` — Exact revision and definition pinning

- **Status:** required and designed
- **Classes:** preventive, detective
- **Protects:** purpose specificity, taxonomy integrity, recipient and action meaning
- **Threats:** `THR-017`, `THR-018`, `THR-020`
- **Requirement:** request, grant, explanation, decision, envelope, execution, and receipt records preserve exact purpose, category, recipient, action, policy, evaluator, mapping, and rule revisions
- **Evidence:** Sprint 4 contracts and deterministic validation
- **Residual risk:** production registry, compatibility, and migration services are absent
- **Owner:** future House of Keys taxonomy and policy owners
- **Revalidation:** every definition, policy, evaluator, mapping, or compatibility change

### `CTL-HK-003` — Pure evaluator isolation

- **Status:** required and designed; synthetically tested at Sprint 4 contract boundary
- **Classes:** preventive, limiting, detective
- **Protects:** deterministic decisions and separation of authority from infrastructure
- **Threats:** `THR-017`, `THR-018`, `THR-045`, `THR-046`
- **Requirement:** policy evaluation receives all facts explicitly, performs no network, database, filesystem, model, clock, provider, session, or environment lookup, and produces deterministic `allow`, `deny`, or `indeterminate`
- **Evidence:** `evaluateHouseOfKeysPolicy`, deterministic tests, Sprint 4 completion record
- **Residual risk:** integration can still supply incorrect or stale facts
- **Owner:** House of Keys contract and future policy-gateway owners
- **Revalidation:** evaluator or input-contract revision

### `CTL-HK-004` — Immutable decision and dependency snapshot

- **Status:** required and designed
- **Classes:** preventive, detective, corrective
- **Protects:** inspectability, stale-decision detection, correction
- **Threats:** `THR-018`, `THR-019`, `THR-020`, `THR-021`, `THR-031`
- **Requirement:** persist the decision and every authority-bearing dependency used without in-place mutation; corrections or new facts create linked records and new decisions
- **Evidence:** policy-decision contract and 5.5 enforcement model
- **Residual risk:** persistence and integrity implementation are absent
- **Owner:** future policy-decision and audit owners
- **Revalidation:** decision-store or correction-workflow implementation

### `CTL-HK-005` — Fail-closed unresolved fact handling

- **Status:** required, designed, and synthetically tested at evaluator boundary
- **Classes:** preventive, limiting
- **Protects:** no implicit authority from missing, stale, ambiguous, conflicting, unsupported, or unmapped facts
- **Threats:** `THR-017`, `THR-018`, `THR-019`, `THR-020`, `THR-023`, `THR-031`
- **Requirement:** unresolved material facts produce `deny`, `indeterminate`, stopped execution, or blocked release as appropriate; they never become probable or temporary allow
- **Evidence:** Sprint 4 reason codes and scenarios
- **Residual risk:** distributed integration and operational fallback remain untested
- **Owner:** future policy-gateway, execution, and service owners
- **Revalidation:** every new authority source, integration, fallback, or degradation mode

## Freshness and lifecycle enforcement

### `CTL-HK-006` — Shortest-bound decision freshness

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** revocation, expiry, review deadlines, session and capacity bounds
- **Threats:** `THR-003`, `THR-018`, `THR-019`, `THR-031`
- **Requirement:** decision freshness ends at the earliest applicable grant, lifecycle, session, account-link, delegation, condition, definition, recipient-membership, capacity, execution-window, or maximum-age boundary
- **Evidence:** revocation model, evaluator input, 5.5 enforcement model
- **Residual risk:** exact clock and distributed time controls remain unresolved
- **Owner:** future policy, identity, and infrastructure owners
- **Revalidation:** time-source, cache, session, or queue design

### `CTL-HK-007` — Known-change decision invalidation

- **Status:** required and designed
- **Classes:** preventive, containment, corrective
- **Protects:** lifecycle truth and dependent operations
- **Threats:** `THR-018`, `THR-019`, `THR-031`, `THR-034`
- **Requirement:** changes to relied-upon grants, definitions, actors, recipient membership, sessions, conditions, capacity, policy, containment, or resource state invalidate future use of dependent decisions
- **Evidence:** 5.2 authority propagation, revocation model, 5.5 model
- **Residual risk:** propagation latency and partial failure remain unresolved
- **Owner:** future House of Keys, identity, domain, and infrastructure owners
- **Revalidation:** event projection, cache, queue, or distributed invalidation implementation

### `CTL-HK-008` — Authoritative final pre-release check

- **Status:** required and designed
- **Classes:** preventive, containment
- **Protects:** data release and irreversible actions
- **Threats:** `THR-018`, `THR-020`, `THR-023`, `THR-031`
- **Requirement:** immediately before the irreversible boundary, verify authoritative dependency revisions or obtain a new decision; best-effort invalidation alone is insufficient
- **Evidence:** 5.5 enforcement model
- **Residual risk:** external-recipient delivery may remain partly non-atomic
- **Owner:** future execution and release owners
- **Revalidation:** every release, deletion, connector, export, remote-agent, or irreversible action implementation

### `CTL-HK-009` — Immutable lifecycle events and monotonic comparison

- **Status:** required and designed
- **Classes:** preventive, detective, corrective
- **Protects:** grant state, ordering, correction, restoration
- **Threats:** `THR-018`, `THR-019`, `THR-031`, `THR-034`
- **Requirement:** lifecycle changes use immutable events with effective and recorded times, prior and next states, authority basis, reason, and a monotonic sequence or comparable authoritative revision
- **Evidence:** Sprint 4 lifecycle model and contract
- **Residual risk:** event-store and projection implementation are absent
- **Owner:** future House of Keys lifecycle owner
- **Revalidation:** lifecycle persistence, projection, synchronization, or migration design

### `CTL-HK-010` — Revocation and suspension propagation

- **Status:** required and designed
- **Classes:** containment, limiting, corrective
- **Protects:** future access after withdrawal or containment
- **Threats:** `THR-018`, `THR-023`, `THR-027`, `THR-031`
- **Requirement:** propagate effective lifecycle changes to decisions, reservations, envelopes, queues, workers, derived credentials, connectors, exports, recipients, receipts, notifications, and audit workflows
- **Evidence:** Sprint 4 lifecycle model, 5.2 propagation control, 5.5 model
- **Residual risk:** exact service levels, partial failure, and external-recipient control are unresolved
- **Owner:** future House of Keys, execution, connector, and incident owners
- **Revalidation:** each asynchronous or external integration

### `CTL-HK-011` — Revocation-race ordering and honest ambiguity

- **Status:** required and designed
- **Classes:** detective, containment, restorative
- **Protects:** truthful authorization and post-release accountability
- **Threats:** `THR-018`, `THR-021`, `THR-031`
- **Requirement:** compare decision, reservation, start, pre-release, release, completion, revocation-effective, and recorded times; ambiguous ordering becomes explicit unknown state, not clean authorization or safe retry
- **Evidence:** Sprint 4 lifecycle and receipt models, 5.5 lifecycle register
- **Residual risk:** authoritative clock and cross-provider ordering remain unresolved
- **Owner:** future execution, lifecycle, receipt, audit, and incident owners
- **Revalidation:** queue, recipient, clock, or distributed-execution implementation

## Execution and capacity integrity

### `CTL-HK-012` — One-operation non-transferable execution envelope

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** exact operation, actor, resource, recipient, environment, and expiry binding
- **Threats:** `THR-018`, `THR-019`, `THR-020`, `THR-023`, `THR-031`
- **Requirement:** derive one expiring envelope from one fresh decision and bind it to one operation, service audience, environment, actor set, resource, recipient, scope, capacity reservation, release boundary, and receipt expectation
- **Evidence:** 5.5 enforcement model
- **Residual risk:** token or message format and signing are unresolved
- **Owner:** future enforcement-coordinator and service-identity owners
- **Revalidation:** first execution-envelope implementation

### `CTL-HK-013` — Stable operation and idempotency identity

- **Status:** required and designed
- **Classes:** preventive, detective
- **Protects:** retry correctness and duplicate-release prevention
- **Threats:** `THR-019`, `THR-021`, `THR-031`
- **Requirement:** retries, worker restarts, delivery duplicates, and reconciliation for one intended operation reuse one operation and idempotency identity; a new identity requires new authorization
- **Evidence:** 5.5 model and lifecycle register
- **Residual risk:** storage, uniqueness, and transaction implementation are absent
- **Owner:** future execution and infrastructure owners
- **Revalidation:** queue, workflow, or retry implementation

### `CTL-HK-014` — Operation-bound capacity reservation

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** single-use and bounded-count grants
- **Threats:** `THR-019`, `THR-031`
- **Requirement:** reserve capacity before beginning a consuming operation and bind reservation to grant revision, decision, operation, resource, action, count, issue time, and expiry
- **Evidence:** Sprint 4 capacity snapshot and 5.5 model
- **Residual risk:** capacity service and concurrency semantics are absent
- **Owner:** future House of Keys capacity and execution owners
- **Revalidation:** first single-use or bounded-count runtime

### `CTL-HK-015` — Capacity commit at accepted irreversible boundary

- **Status:** required and designed
- **Classes:** preventive, detective, corrective
- **Protects:** count accuracy and release accountability
- **Threats:** `THR-019`, `THR-020`, `THR-031`
- **Requirement:** commit consumption according to a defined irreversible boundary and correlate the operation, release claim, capacity event, execution state, and receipt intent through a consistent internal boundary
- **Evidence:** 5.5 model
- **Residual risk:** external delivery cannot always be atomic with internal state
- **Owner:** future capacity, execution, release, and receipt owners
- **Revalidation:** transaction or external-release implementation

### `CTL-HK-016` — Safe reservation release and ambiguous-outcome quarantine

- **Status:** required and designed
- **Classes:** preventive, containment, recovery
- **Protects:** no double use after uncertain release
- **Threats:** `THR-019`, `THR-021`, `THR-031`
- **Requirement:** return capacity only when evidence proves the irreversible boundary was not crossed; timeout, worker loss, provider error, or missing acknowledgment alone cannot release capacity
- **Evidence:** 5.5 model and lifecycle register
- **Residual risk:** reconciliation service and external evidence are absent
- **Owner:** future capacity, execution, and incident owners
- **Revalidation:** failure and timeout behavior for every consuming operation

### `CTL-HK-017` — Exact execution-state machine

- **Status:** required and designed
- **Classes:** detective, limiting, corrective
- **Protects:** separation of planned, attempted, released, partial, stopped, failed, and unknown outcomes
- **Threats:** `THR-018`, `THR-019`, `THR-020`, `THR-021`, `THR-031`
- **Requirement:** preserve explicit execution states and timestamps; attempts and partial outcomes cannot be rendered as completed access
- **Evidence:** Sprint 4 receipt contract and 5.5 lifecycle register
- **Residual risk:** production execution store and transition enforcement are absent
- **Owner:** future execution owner
- **Revalidation:** every operation-family implementation

### `CTL-HK-018` — Irreversible-boundary declaration and marker

- **Status:** required and designed
- **Classes:** preventive, detective
- **Protects:** revocation, cancellation, receipt accuracy, capacity consumption
- **Threats:** `THR-018`, `THR-019`, `THR-020`, `THR-021`
- **Requirement:** every operation defines and records the point at which data was released or another effect became irreversible; unknown boundaries block release
- **Evidence:** Sprint 4 receipt model and 5.5 enforcement model
- **Residual risk:** operation-specific boundary selection requires review
- **Owner:** future domain, execution, privacy, and legal owners
- **Revalidation:** each new action or external integration

### `CTL-HK-019` — Consistency reconciliation across decision, capacity, execution, receipt, and audit

- **Status:** required and designed
- **Classes:** detective, corrective, restorative
- **Protects:** truthful event chains and anomaly response
- **Threats:** `THR-018` through `THR-022`, `THR-031`
- **Requirement:** detect mismatched identities, revisions, recipients, outcomes, release claims, capacity events, receipts, and audit references and trigger containment rather than manufacturing a clean narrative
- **Evidence:** 5.5 consistency rules
- **Residual risk:** reconciliation cadence, service levels, and incident thresholds are unresolved
- **Owner:** future security, execution, receipt, and audit owners
- **Revalidation:** execution and receipt implementation and every incident exercise

## Queue, recipient, and long-running operations

### `CTL-HK-020` — Minimized authority-bearing queue manifest

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** delayed and asynchronous work
- **Threats:** `THR-018`, `THR-019`, `THR-023`, `THR-031`
- **Requirement:** queue jobs carry minimized exact references to operation, envelope, decision, grants, resource, recipient, expiry, cancellation, capacity, and receipt requirement; possession of a message does not create authority
- **Evidence:** 5.5 model
- **Residual risk:** queue implementation, encryption, and visibility controls are absent
- **Owner:** future infrastructure and execution owners
- **Revalidation:** queue or durable-workflow selection

### `CTL-HK-021` — Retry, duplicate, and dead-letter safety

- **Status:** required and designed
- **Classes:** preventive, containment, recovery
- **Protects:** no duplicate release or stale replay
- **Threats:** `THR-019`, `THR-021`, `THR-031`
- **Requirement:** retries reuse one operation identity, expired envelopes stop, dead-letter replay requires current review, revocation remains effective, and ambiguous prior outcomes block automatic retry
- **Evidence:** 5.5 model and lifecycle register
- **Residual risk:** operational queue semantics are unresolved
- **Owner:** future infrastructure, execution, and incident owners
- **Revalidation:** every retry, dead-letter, scheduler, or replay implementation

### `CTL-HK-022` — Recipient, performer, processor, and destination verification at release

- **Status:** required and designed
- **Classes:** preventive, limiting, detective
- **Protects:** correct external and internal release
- **Threats:** `THR-020`, `THR-023`, `THR-027`
- **Requirement:** verify exact recipient identity and revision, class membership, performer, processor, destination, purpose, action, scope, conditions, transport requirements, and current freshness immediately before release
- **Evidence:** Sprint 4 grant and receipt contracts, 5.5 model
- **Residual risk:** recipient registration, federation, redirect, and acknowledgment are unresolved
- **Owner:** future recipient, execution, connector, privacy, and legal owners
- **Revalidation:** every external or multi-organization release

### `CTL-HK-023` — Long-running and streaming authorization checkpoints

- **Status:** required and designed
- **Classes:** preventive, containment, limiting
- **Protects:** authority changes during prolonged operations
- **Threats:** `THR-018`, `THR-020`, `THR-023`, `THR-031`
- **Requirement:** re-evaluate at meaningful disclosure or irreversible checkpoints and on lifecycle events; one indefinite `allow` cannot authorize an open-ended stream
- **Evidence:** 5.5 model
- **Residual risk:** checkpoint frequency, ergonomics, and service objectives are unresolved
- **Owner:** future execution, product, and House of Keys owners
- **Revalidation:** every streaming or long-running capability

### `CTL-HK-024` — Independent authorization for batch members

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** atomic choice and no authorization spillover
- **Threats:** `THR-017`, `THR-019`, `THR-020`, `THR-031`
- **Requirement:** each materially distinct batch member preserves independent policy, execution, capacity, result, and receipt semantics; one allowed member cannot authorize another
- **Evidence:** Sprint 4 atomic-request model and 5.5 model
- **Residual risk:** batch orchestration and receipt presentation are unresolved
- **Owner:** future policy-gateway, execution, and product owners
- **Revalidation:** every batch or bulk-operation design

## Receipt and correction integrity

### `CTL-HK-025` — Receipt capability precondition

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** person-visible evidence required by policy or condition
- **Threats:** `THR-021`, `THR-020`
- **Requirement:** before release, verify that required structured receipt intent can be durably recorded; unavailable receipt capability blocks an operation when receipt is a required condition
- **Evidence:** Sprint 4 receipt condition and 5.5 model
- **Residual risk:** durable event and availability implementation are absent
- **Owner:** future receipt and execution owners
- **Revalidation:** receipt service and every receipt-required action

### `CTL-HK-026` — Durable receipt intent at release boundary

- **Status:** required and designed
- **Classes:** detective, corrective
- **Protects:** linkage among decision, execution, release, capacity, and receipt
- **Threats:** `THR-019`, `THR-021`, `THR-031`
- **Requirement:** record receipt intent and authoritative references through the same accepted internal consistency boundary as the release claim and capacity commitment
- **Evidence:** 5.5 model
- **Residual risk:** exact transaction, outbox, event-log, or workflow design is unresolved
- **Owner:** future execution, receipt, and infrastructure owners
- **Revalidation:** receipt issuance architecture

### `CTL-HK-027` — Receipt existence separated from delivery and acknowledgment

- **Status:** required and designed
- **Classes:** detective, informational, restorative
- **Protects:** truthful access history
- **Threats:** `THR-021`
- **Requirement:** preserve receipt recording, delivery pending, delivered, failed, inaccessible, and acknowledgment states separately; delivery failure cannot imply no access
- **Evidence:** Sprint 4 receipt boundary and 5.5 lifecycle register
- **Residual risk:** delivery channels, accessibility, support, and service levels are unresolved
- **Owner:** future receipt, notification, accessibility, and support owners
- **Revalidation:** receipt delivery implementation

### `CTL-HK-028` — Append-only receipt correction

- **Status:** required and designed
- **Classes:** corrective, restorative, informational
- **Protects:** history, challenge, correction, and accountability
- **Threats:** `THR-021`, `THR-022`
- **Requirement:** correct or annotate through new linked records that preserve the original claim, evidence, correcting authority, effects, and restoration state
- **Evidence:** Sprint 4 receipt contract and correction model
- **Residual risk:** persistence, retention, and notification implementation are absent
- **Owner:** future receipt and records-governance owners
- **Revalidation:** receipt persistence and correction workflow

### `CTL-HK-029` — Missing, delayed, duplicate, conflicting, or false receipt detection

- **Status:** required and designed
- **Classes:** detective, containment, corrective, restorative
- **Protects:** material access-history completeness
- **Threats:** `THR-021`, `THR-022`
- **Requirement:** compare expected receipt intents with canonical receipts, delivery, execution, and audit evidence; defects become material control failures with incident and correction handling
- **Evidence:** Sprint 4 receipt omission model and 5.5 consistency rules
- **Residual risk:** monitoring and incident thresholds are unresolved
- **Owner:** future receipt, audit, security, and incident owners
- **Revalidation:** receipt monitoring and tabletop exercises

### `CTL-HK-030` — Receipt minimization and protected references

- **Status:** required and designed
- **Classes:** preventive, limiting, informational
- **Protects:** privacy and inspectability without shadow data duplication
- **Threats:** `THR-014`, `THR-021`, `THR-022`
- **Requirement:** receipts use stable identities, revisions, categories, selector summaries, times, outcomes, and minimum explanations instead of copying raw documents, full health values, secrets, or unrelated metadata
- **Evidence:** Sprint 4 receipt model
- **Residual risk:** exact field allowlists and jurisdictional retention are unresolved
- **Owner:** future receipt, privacy, accessibility, and records-governance owners
- **Revalidation:** receipt schema or display change

## Protected audit, migration, and governance

### `CTL-HK-031` — Receipt and audit domain separation

- **Status:** required and designed
- **Classes:** preventive, limiting
- **Protects:** permission truth, person inspectability, and security evidence
- **Threats:** `THR-021`, `THR-022`
- **Requirement:** receipt and audit records have separate authority, schemas, access, minimization, correction, retention, and purposes; neither substitutes for the other
- **Evidence:** Sprint 4 audit boundary and 5.1 authority map
- **Residual risk:** production schemas and persistence are absent
- **Owner:** future receipt, security, audit, privacy, and records-governance owners
- **Revalidation:** audit or observability implementation

### `CTL-HK-032` — Protected audit field allowlists and scoped search

- **Status:** required and designed
- **Classes:** preventive, limiting, detective
- **Protects:** against surveillance, shadow Chronicle, and re-identification
- **Threats:** `THR-008`, `THR-014`, `THR-022`
- **Requirement:** event-class-specific allowlists prefer identities, revisions, reason codes, digests, and bounded metadata; access and search require explicit purpose and cannot expose universal raw-data browsing
- **Evidence:** integrated threat model, `CTL-ID-014`, 5.5 model
- **Residual risk:** fields, roles, query controls, and retention are unresolved
- **Owner:** future security, audit, privacy, and operations owners
- **Revalidation:** observability, audit, or incident-search implementation

### `CTL-HK-033` — Least-capability lifecycle and permission administration

- **Status:** required and designed
- **Classes:** preventive, limiting, detective
- **Protects:** against raw database bypass and operator self-grant
- **Threats:** `THR-008`, `THR-009`, `THR-017`, `THR-022`
- **Requirement:** grant, lifecycle, receipt, and correction changes use named domain commands with explicit authority, private origins, short-lived operator sessions, and protected evidence; no arbitrary SQL or in-place edits
- **Evidence:** 5.2 operator model and House of Keys contracts
- **Residual risk:** administrative tooling and separation of duties are unresolved
- **Owner:** future House of Keys, operations, and security owners
- **Revalidation:** first permission-administration service

### `CTL-HK-034` — Version-preserving migration and compatibility

- **Status:** required and designed
- **Classes:** preventive, corrective, recovery
- **Protects:** historical authority, decision, execution, capacity, receipt, and audit meaning
- **Threats:** `THR-013`, `THR-018`, `THR-019`, `THR-021`, `THR-034`
- **Requirement:** migrations preserve prior revisions, scope, optionality, lifecycle times, reason meanings, capacity history, execution ordering, receipt corrections, and fail-closed unsupported-version behavior
- **Evidence:** Sprint 4 compatibility boundary and 5.5 model
- **Residual risk:** executable migration and rollback evidence are absent
- **Owner:** future House of Keys, migration, and records-governance owners
- **Revalidation:** every contract, schema, policy, evaluator, or storage migration

### `CTL-HK-035` — Challenge, notification, restoration, and residual-harm linkage

- **Status:** required and designed
- **Classes:** informational, corrective, restorative
- **Protects:** affected people after stale, unauthorized, partial, missing-receipt, or ambiguous operations
- **Threats:** `THR-018` through `THR-022`, `THR-031`
- **Requirement:** material anomalies link to person-visible explanation, safe notification, challenge, correction, containment, downstream action, restoration, and explicit residual harm
- **Evidence:** Institutional Immune System, 5.2 notification control, 5.5 model
- **Residual risk:** support, communication, accessibility, service levels, and downstream authority are unresolved
- **Owner:** future receipt, support, security, privacy, and accessibility owners
- **Revalidation:** incident response and tabletop exercises

### `CTL-HK-036` — Non-punitive enforcement and metric separation

- **Status:** required and designed
- **Classes:** preventive, informational, deterrent
- **Protects:** meaningful refusal, personal-core independence, incentive integrity
- **Threats:** `THR-038`, `THR-045`, `THR-046`
- **Requirement:** denial, indeterminate, expiry, exhaustion, suspension, revocation, challenge, correction, receipt volume, and optional authority breadth cannot reduce core rights or create health, loyalty, trust, reward, compensation, progression, or governance scores
- **Evidence:** Product Constitution, incentive model, House of Keys baseline
- **Residual risk:** product metrics and interface implementation remain unresolved
- **Owner:** future product, House of Keys, analytics, and governance owners
- **Revalidation:** every permission, receipt, progression, analytics, or governance integration

## Current control-state summary

At workstream 5.5 completion:

- all `CTL-HK-*` controls are **required and designed**;
- `CTL-HK-003` and portions of `CTL-HK-005` have Sprint 4 public synthetic evidence at the pure contract boundary;
- no `CTL-HK-*` control is implemented or deployed in a production environment;
- none is operationally verified;
- none has named independent specialist review;
- queue, execution, capacity, receipt, audit, recipient, clock, persistence, and cryptographic implementation remain production-blocking; and
- 5.9 must exercise the highest-consequence enforcement and receipt failures with public synthetic scenarios and tabletop records.

## Review and revalidation triggers

Review all affected `CTL-HK-*` controls when introducing or changing:

- accounts, sessions, delegates, representative authority, or recovery;
- purpose, category, recipient, action, condition, explanation, comprehension, or confirmation contracts;
- grant lifecycle or projection;
- decision caches or policy gateways;
- single-use or bounded-count grants;
- queues, workflows, retries, schedulers, or dead-letter behavior;
- remote agents, MCP tools, connectors, or service credentials;
- exports, deletion, corrections, recipient releases, or long-running operations;
- receipt issuance, delivery, search, export, correction, deletion, or retention;
- audit, monitoring, incident, operator, or emergency systems;
- clocks, regions, providers, environments, or failover;
- encryption, keys, signatures, or integrity systems;
- contract, schema, evaluator, policy, or storage migrations; or
- an incident, challenge, exercise, specialist finding, or public correction.

No control claim may be promoted beyond its evidence.
