# Operational Simplicity and Durable Workflows

[Architecture index](README.md) · [Decision 0011](../decisions/0011-operational-simplicity-and-durable-workflows.md) · [Mission traceability](mission-to-runtime-traceability.md) · [Developer experience policy](../policies/developer-experience-and-operability.md) · [Cross-phase workstream](../roadmap/operational-simplicity-workstream.md)

- **Status:** PROPOSED architecture baseline
- **Decision basis:** Proposed Decision 0011
- **Implementation status:** No production orchestration, queue, scheduler, event store, or private-data runtime
- **Sequence effect:** Sprint 6 remains the next numbered sprint

## Purpose

Calypso’s Promise is conceptually broad but does not require every player interaction to become a large distributed computation.

Its primary value comes from:

- consistent, person-controlled longitudinal records;
- brief and understandable capture;
- trustworthy permission and provenance;
- deterministic quests and progression;
- well-timed reconciliation and reflection;
- useful daily and longitudinal feedback;
- graceful voice, image, text, document, and connector assistance;
- and a system that can be operated, migrated, forked, and improved without abandoning the Promise.

This architecture concentrates complexity in explicit domain contracts and durable workflows while keeping the ordinary interaction path responsive and the contributor environment understandable.

## Architectural posture

The initial runtime should be treated as one product expressed through bounded capabilities, not as a collection of services searching for a reason to communicate.

```text
experience clients
    ↓
application orchestration
    ↓
provider-independent domain capabilities
    ↓
ports for persistence, work dispatch, providers, and delivery

infrastructure adapters ──implement──> inward-facing ports
```

Logical separation does not require deployment separation. The modular monolith remains the default until evidence supports extraction.

## The two-speed system

### Responsive path

The responsive path includes work whose truthful result is needed for the current interaction:

- validate a command shape;
- derive current caller identity from authentication;
- evaluate a House of Keys request;
- present and confirm an Aster draft;
- store or reject an authoritative Chronicle operation;
- record an explicit refusal, correction, or deletion request;
- evaluate deterministic quest or story facts when required immediately;
- and acknowledge what is complete, pending, denied, failed, or unknown.

The responsive path should be small enough to reason about and should not depend on optional enrichment when a safe manual path exists.

### Deferred path

The deferred path includes work that can complete later without falsifying the current interaction:

- connector synchronization;
- large document processing;
- image or voice enrichment after a confirmed draft boundary;
- duplicate and conflict review preparation;
- semantic indexing;
- personal analytics;
- trend and period comparison;
- daily route preparation;
- notification scheduling;
- projection rebuilding;
- export assembly;
- deletion propagation and verification;
- migration exercises;
- and other bounded reconciliation.

A deferred operation must not be represented as complete merely because it was accepted for processing.

## Reference interaction

```text
player action
  → authenticated and validated command
  → deterministic authority and policy checks
  → authoritative synchronous state change, denial, or pending record
  → immediate truthful acknowledgement
  → optional durable work request
  → delayed processing or enrichment
  → versioned result or projection update
  → player-visible outcome, limitation, receipt, or correction path
```

The reference flow does not require every step for every interaction. It defines where meaning changes.

## Core concepts

### Command

A command asks a bounded capability to perform an operation.

A command should identify:

- operation identity;
- command kind and version;
- initiating actor or authenticated service;
- target capability and resource;
- purpose and authority context where applicable;
- proposed input;
- expected preconditions;
- creation and expiration timing where relevant;
- and correlation to the player interaction or upstream operation.

A command is not proof that the operation occurred.

### Domain event

A domain event records a material fact that a domain capability determined occurred.

Examples may include:

- `chronicle.record-created`;
- `chronicle.record-corrected`;
- `house-of-keys.grant-withdrawn`;
- `quest.completed`;
- `progression.reward-applied`;
- `connector.sync-failed`;
- or `projection.rebuild-completed`.

Event names describe domain facts rather than queue technology.

A domain may use events without using event sourcing as its primary persistence model.

### Work request or job

A job coordinates delayed execution. It references the command, event, or source condition that created the work and defines how execution can proceed safely later.

A job must not silently invent new authority when it runs. Sensitive authority should be re-evaluated or checked for freshness at the execution boundary where required.

### Projection

A projection is a purpose-specific view derived from authoritative facts.

Examples:

- current player story state;
- quest availability;
- a Chronicle timeline view;
- a daily route;
- a search index;
- a personal trend summary;
- or a notification eligibility view.

A projection is rebuildable or replaceable. Its freshness, version, and source boundary should be inspectable when consequence warrants it.

### Receipt and audit evidence

A person-visible receipt and protected operational audit remain distinct from commands, events, jobs, and projections.

A queue record does not replace an access receipt. A receipt does not by itself prove complete operational audit integrity.

## Scheduling boundary

A schedule may state:

- when to request a daily route preparation;
- when to check a connector cursor;
- when to expire an eligible notification;
- when to retry a failed operation;
- when to review retention or deletion state;
- or when to run a revalidation exercise.

The schedule may not define the domain rule that determines:

- permission;
- completion;
- reward;
- clinical meaning;
- record truth;
- consent validity;
- research eligibility;
- or institutional authority.

Scheduled work must be callable through the same bounded application or domain interface used by manual and test invocation.

## Durable job lifecycle

A general lifecycle may include:

1. **Requested** — durable intent to perform work exists.
2. **Eligible** — timing, dependency, and authority checks permit an attempt.
3. **Running** — one identified attempt is executing.
4. **Succeeded** — the declared result was produced and recorded.
5. **Failed-retryable** — a bounded retry remains permitted.
6. **Failed-terminal** — ordinary retries are exhausted or unsafe.
7. **Quarantined** — input or behavior requires review before further processing.
8. **Cancelled** — future execution is intentionally stopped.
9. **Superseded** — newer work replaces the requested result.
10. **Compensating** — a prior effect requires explicit correction or reversal.
11. **Corrected** — a follow-on operation repaired or reclassified the result.

Not every low-risk job needs every state, but high-consequence work must not hide meaningful lifecycle transitions inside logs.

## Idempotency and duplicate delivery

Work that may be retried or redelivered uses a stable operation identity.

The owning domain defines whether an operation is:

- naturally idempotent;
- deduplicated by operation identity;
- conditional on an expected version;
- single-use and atomically consumed;
- append-only with duplicate detection;
- or non-repeatable and therefore blocked from automated retry.

Transport-level de-duplication is useful but cannot replace domain-level duplicate safety.

Examples requiring explicit duplicate behavior include:

- reward application;
- quest completion;
- grant withdrawal;
- receipt issuance;
- connector import;
- publication;
- export delivery;
- deletion propagation;
- notification delivery;
- and compensation or future financial operations.

## Retry and backoff

Retry policy belongs to the operation contract or a versioned operational policy, not an undocumented provider default.

A policy should consider:

- error classification;
- safety of repetition;
- authority freshness;
- data sensitivity;
- dependency recovery characteristics;
- expiration;
- player expectations;
- rate and cost limits;
- and whether a human decision is required.

Retries must not turn an old permission, stale player intent, expired route, or superseded record into current authority.

## Quarantine and hostile input

Imported documents, connector payloads, images, prompts, tool results, and generated output remain untrusted.

Deferred processing may isolate, scan, parse, transform, or classify untrusted content, but the content cannot:

- grant itself tool authority;
- choose its own recipient or purpose;
- become Chronicle truth without the accepted confirmation path;
- bypass malware, policy, or source restrictions;
- or instruct a later worker to exceed its declared capability.

Quarantine records should minimize exposed content and preserve protected evidence outside public systems.

## Replay and rebuilding

Replay may be used to:

- re-run a failed job;
- rebuild a projection;
- apply a corrected transformation;
- migrate a contract version;
- validate a provider replacement;
- or reproduce an incident with synthetic evidence.

Replay must state what it reuses:

- original source artifact;
- immutable source version;
- command or event;
- policy revision;
- mapping revision;
- model or provider declaration;
- and current or historical authority facts.

Replaying a transformation does not authorize silently rewriting source truth or erasing prior outputs. Corrected and superseded results retain appropriate provenance.

## Corrections and compensating work

Not every operation can be rolled back by deleting a row.

The architecture should distinguish:

- correcting a Chronicle assertion;
- superseding a projection;
- cancelling future notification delivery;
- invalidating derived analytics;
- issuing a corrected receipt;
- reversing a duplicate progression reward;
- requesting downstream deletion;
- and recording an effect that cannot be fully undone.

Compensating work is explicit and auditable. It is not a claim that all downstream effects have disappeared.

## Multimodal capture adapters

Voice, text, image, document, device, and connector inputs are capture or source adapters.

```text
voice ────────┐
image ────────┤
text ─────────┼──> source-attributed structured draft
file ─────────┤
connector ────┘
```

The draft preserves:

- source class;
- source reference;
- extraction method;
- uncertainty;
- omitted or unsupported fields;
- and the player-confirmation requirement.

The downstream Chronicle command should not need to know which model or vendor produced the draft.

## AI execution boundary

Aster and other AI systems may:

- prepare structured drafts;
- ask clarifying questions;
- produce bounded explanations;
- request authorized retrieval;
- classify a proposed route;
- or phrase content within approved constraints.

AI output can create a work proposal. It does not create:

- caller identity;
- permission;
- canonical health truth;
- completion evidence;
- reward authority;
- research enrollment;
- or financial authority.

An AI timeout, refusal, or provider failure should degrade to an explicit fallback rather than trapping the player in an indeterminate interface.

## Local development and simulation

The ordinary contributor path should support:

- one documented environment-start command for the current implemented surface;
- deterministic synthetic people and journeys;
- controllable clocks;
- local or fake work dispatch;
- local adapters for external services where practical;
- independent job invocation;
- inspectable inputs and outputs;
- replay of synthetic commands, events, and failures;
- and focused package or journey tests.

A developer should eventually be able to run a reference journey such as:

```text
create synthetic player
→ confirm one observation
→ store authoritative Chronicle record
→ enqueue synthetic enrichment
→ fail and retry the enrichment
→ update quest projection once
→ inspect provenance and status
→ correct the source record
→ rebuild the affected projection
```

No production secret or private record belongs in that journey.

## Time and controllable clocks

Daily routes, expiration, quiet hours, retry, return, retention, and longitudinal comparisons depend on time.

Domain and application tests should receive explicit time facts or a controllable clock rather than relying on the wall clock where deterministic simulation matters.

A controllable clock may not override trusted external event evidence or create legal, death, incapacity, consent, or custody authority.

## Offline-tolerant and degraded behavior

The game should define what remains possible when network, AI, connector, or deferred processing is unavailable.

Potential locally available actions may include:

- authored navigation;
- draft capture;
- review of already available records or story state;
- explicit refusal or deferral;
- accessibility settings;
- and queued synchronization.

A future offline design must address:

- device security;
- encryption;
- authentication freshness;
- permission freshness;
- conflicting edits;
- deletion requests;
- lost devices;
- recovery;
- and multi-device ordering.

This architecture records the need but does not select the solution.

## Freshness and user-visible state

A user-facing surface should distinguish consequential states such as:

- saved authoritatively;
- stored locally but not synchronized;
- accepted for processing;
- processing;
- delayed;
- failed;
- awaiting confirmation;
- denied;
- stale;
- corrected;
- superseded;
- and deleted or pending verified deletion.

Narrative language may explain these states, but direct language and accessible alternatives remain required.

## Observability boundary

Operational observability should answer, within authorized access:

- which operation was requested;
- which contract and policy revisions applied;
- whether and when an attempt ran;
- what dependency was involved;
- whether it succeeded, retried, failed, or was quarantined;
- which result was produced;
- and what correction or owner is required.

Observability must minimize protected content. Raw health payloads, prompts, documents, credentials, private contracts, and sensitive authority evidence do not belong in ordinary logs.

Metrics and traces are operational derivatives, not canonical personal records.

## Cost and resource attribution

Where external compute or infrastructure becomes material, the system should attribute cost to bounded capabilities or operation classes without exposing private content.

Cost evidence may support:

- batching;
- caching;
- model selection;
- local execution;
- provider replacement;
- subsidy design;
- or removal of ineffective work.

Cost may not justify coercive data use, hidden sponsorship influence, weaker providers, or removal of the meaningfully free core.

## Decomposition triggers

A module or deployment boundary should be reconsidered when evidence shows:

- one workload repeatedly exhausts shared resources;
- a distinct trust boundary cannot be enforced proportionately;
- failure isolation is inadequate;
- one language or runtime is materially required;
- independent scaling produces clear value;
- release coupling creates unacceptable risk;
- separate specialist or legal authority is required;
- operational ownership is genuinely independent;
- or a provider-specific adapter cannot be safely contained.

Before extraction, record:

- baseline measurements;
- expected improvement;
- migration plan;
- contract boundary;
- data and authority ownership;
- local-development impact;
- observability and incident ownership;
- rollback;
- and provider exit.

## Failure principles

- AI failure does not block core manual capture or permissions.
- A schedule failure does not create domain truth.
- A queue acknowledgement does not imply completion.
- A retry does not broaden authority.
- Duplicate delivery does not duplicate rewards, records, receipts, or irreversible effects.
- Connector failure does not corrupt the Chronicle.
- Projection failure does not rewrite authoritative records.
- Search-index failure does not make structured records unavailable.
- Story failure does not corrupt Chronicle data.
- Analytics failure does not block correction, export, deletion, or refusal.
- A provider outage does not silently switch to a weaker policy boundary.
- A deferred failure has an inspectable owner, containment, or correction path proportionate to consequence.

## Security and privacy inheritance

All production work inherits Sprint 5 requirements for:

- identity and tenant isolation;
- policy freshness;
- revocation propagation;
- untrusted inputs;
- encryption and key management;
- audit and receipts;
- backup and restore;
- incident response;
- deletion verification;
- provider and environment isolation;
- residual-risk ownership;
- and specialist holdpoints.

A simpler topology may reduce attack surface. It does not prove the remaining system is secure.

## Architecture acceptance tests

Before the private vertical slice is accepted, synthetic evidence should demonstrate:

- the reference journey runs without hosted AI;
- one work request can be failed, retried, and completed without duplicate authoritative effects;
- stale authority cannot be converted into permission during retry;
- a corrected source invalidates or supersedes affected derivatives;
- a projection can be rebuilt without rewriting source truth;
- delayed enrichment does not block the manual personal-value loop;
- a provider adapter can be replaced with a local fake;
- and each state transition can be inspected through public-safe synthetic evidence.

## Open decisions

The following remain deferred until implementation constraints and evidence are known:

- persistence model by domain;
- queue and workflow technology;
- event persistence strategy;
- transaction and outbox patterns;
- consistency and ordering model;
- offline synchronization and conflict resolution;
- numeric latency and operability budgets;
- telemetry and observability provider;
- runtime and deployment topology;
- regional and disaster-recovery architecture;
- and service extraction.

## Non-scope

This document does not create a production worker, queue, scheduler, event store, database, connector, model, monitoring system, offline mode, notification service, analytics runtime, or private-data path.
