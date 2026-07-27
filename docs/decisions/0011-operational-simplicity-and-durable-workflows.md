# Decision 0011 — Operational Simplicity and Durable Workflows

[Decision index](README.md) · [Operational architecture](../architecture/operational-simplicity-and-durable-workflows.md) · [Mission traceability](../architecture/mission-to-runtime-traceability.md) · [Cross-phase workstream](../roadmap/operational-simplicity-workstream.md) · [Tracking issue #43](https://github.com/finalboss-tom/calypsos-promise/issues/43)

- **Status:** BASELINE — accepted through PR #44
- **Decision class:** Architecture, product operations, developer experience, institutional continuity, and economics
- **Acceptance authority:** Founding steward under the current Phase 0 governance baseline
- **Pull request:** [#44](https://github.com/finalboss-tom/calypsos-promise/pull/44)
- **Squash commit:** `43fb01894639e7484ab1553428e1381a0f51b32c`
- **Runtime effect:** None; documentation and future-work constraints only
- **Sequence effect:** Does not renumber or delay Sprint 6

## Decision

Calypso’s Promise will prefer the smallest operational architecture that can preserve the Promise, produce trustworthy personal value, and survive failure, correction, provider replacement, maintainer transition, and long-horizon migration.

The default implementation posture is:

> **A modular monolith with explicit domain contracts, a small responsive path, durable deferred work, replaceable adapters, reproducible local simulation, and evidence-gated decomposition.**

Operational simplicity is not permission to weaken security, privacy, consent, accessibility, correctness, audit, clinical safeguards, research governance, or long-horizon custody. It is a discipline for concentrating necessary complexity in explicit, testable boundaries rather than distributing it across hidden infrastructure, provider conventions, build systems, schedules, or maintainer memory.

## Mission basis

This decision implements rather than changes the frozen Product Constitution, Vision, and Architecture Foundation.

The project cannot remain meaningfully free, provider-independent, founder-independent, forkable, or understandable if ordinary product development and operation require:

- opaque cloud-only environments;
- long and fragile feedback loops;
- undocumented operator knowledge;
- unnecessary distributed services;
- provider-specific domain logic;
- non-replayable background work;
- expensive processing on every interaction;
- or infrastructure whose replacement would abandon records, rights, or institutional memory.

The player promise remains controlling:

> **Build your Living Chronicle. Improve your health. Keep the key.**

## Protected boundaries

This decision may not be interpreted to permit:

- reducing purpose-specific permission to improve performance;
- making security, privacy, deletion, receipt, provenance, or correction optional;
- allowing AI, schedules, queues, providers, clients, or read models to become canonical authority;
- using eventual processing as an excuse to conceal stale, failed, conflicting, or incomplete state;
- making the complete personal-core product dependent on research, enterprise enrollment, sponsorship, premium compute, or broader permission;
- putting production data or credentials into public contributor environments;
- or representing an architectural target as measured scalability, reliability, latency, cost, or product evidence.

Decision 0008 funding boundaries and Decision 0010 consumer-first, provider-independent boundaries apply to all infrastructure, model, queue, storage, connector, observability, integration, and developer-tool relationships.

## Architecture rules

### 1. Modular monolith by default

A single deployable process may contain multiple bounded domain capabilities when their contracts, authority, tests, storage ownership, and dependency direction remain explicit.

A separate service requires evidence of at least one material need:

- distinct security or trust boundary;
- independently necessary scaling profile;
- separate failure domain;
- different language or runtime justified by the workload;
- materially different release cadence;
- independent operational ownership;
- legal or governance isolation;
- or a reliability requirement that cannot be met proportionately inside the existing deployment.

Package count, diagram symmetry, vendor examples, anticipated scale, or a planned topology are not sufficient evidence.

### 2. Two-speed product behavior

The system distinguishes:

- **responsive work** required to acknowledge, validate, authorize, confirm, refuse, correct, or safely navigate a current player action; and
- **deferred work** that may enrich, reconcile, import, index, analyze, prepare, notify, or update a projection without blocking the current interaction.

A player should not wait for optional enrichment before receiving a truthful acknowledgement of what was and was not completed.

### 3. Schedules trigger work; they do not own truth

Cron expressions, timers, recurring workflows, and provider schedulers may request a bounded domain operation. They may not contain the authoritative policy, completion rule, permission decision, progression rule, or Chronicle semantics for that operation.

Every scheduled workflow must be invokable and testable independently from its schedule.

### 4. Durable work contracts

Retryable or delayed work must have, in proportion to consequence:

- a stable operation identity;
- explicit input and contract version;
- initiating actor or service;
- declared purpose and authority context;
- current status;
- attempt and timing evidence;
- duplicate-safe or explicitly non-repeatable semantics;
- timeout and cancellation behavior;
- retry and backoff rules;
- failure and quarantine behavior;
- result provenance;
- correction, supersession, replay, or compensation behavior;
- and an owner for unresolved failure.

A transport acknowledgement is not evidence that a domain operation completed.

### 5. Commands, events, projections, and jobs remain distinct

- A **command** requests an operation.
- A **domain event** records a material fact that occurred.
- A **projection** is a rebuildable or replaceable view derived for a purpose.
- A **job** coordinates delayed execution.

One record may correlate these concepts, but their meanings may not collapse merely because a queue, workflow engine, or database uses one technical envelope.

This decision permits event-informed architecture. It does not select universal event sourcing, one event store, or one message broker.

### 6. Authoritative state remains explicit

A read model, cache, vector index, analytics table, notification schedule, generated summary, or game projection does not become authoritative because it is convenient or fast.

When a derivative may be stale, the system must define whether to:

- show its freshness and limitations;
- rebuild it;
- fall back to authoritative structured data;
- block a consequential action;
- or fail closed.

### 7. Provider and adapter isolation

External AI, storage, queue, scheduler, connector, notification, analytics, identity, and observability systems implement inward-facing ports. Provider terminology and SDKs do not belong in provider-independent domain contracts.

Ordinary development should use deterministic local, fake, or synthetic adapters where practical. A provider may be unavailable without making core domain tests impossible.

### 8. Core manual and non-AI paths remain complete

Hosted AI or optional deferred processing may improve speed, extraction, explanation, personalization, or convenience. They may not remove:

- core manual capture;
- player confirmation;
- purpose-specific permission;
- correction;
- inspection;
- export;
- deletion;
- refusal;
- accessibility;
- or the ability to understand whether work is pending, complete, failed, or corrected.

### 9. Local-capable does not mean unreviewed local-first

The product should remain usable through appropriate local state, offline-tolerant capture, and graceful provider failure where safe. This decision does not select a complete local-first data, encryption, identity, synchronization, recovery, or multi-device conflict architecture.

Those choices remain subject to the House of Keys, Sprint 5 security baseline, and later implementation evidence.

### 10. Performance and complexity are governed evidence

Build time, test time, startup, interaction latency, job lag, replay duration, operational cost, dependency count, service count, and operator burden should be measured when they become decision-relevant.

Targets are baselines to review, not guarantees or substitutes for correctness. A budget may be revised through evidence, but silent degradation is not an acceptable default.

### 11. Complexity exceptions are reviewable and reversible

A material exception should state:

- the observed problem;
- evidence that the current architecture is insufficient;
- alternatives considered;
- rights, safety, cost, and contributor impact;
- the new owner and operational burden;
- local-development behavior;
- migration and rollback path;
- and a sunset or revalidation trigger.

## Alternatives considered

### Premature microservices

Rejected as the default. They increase deployment, networking, observability, security, test, and ownership cost before a real boundary proves the need.

### Business logic embedded in cron handlers

Rejected. It makes behavior difficult to invoke, replay, test, correct, and migrate independently from one scheduler.

### Universal event sourcing now

Deferred. Append-oriented facts and replay may be valuable, but not every domain requires a persisted event log as its primary storage model.

### Cloud-only development

Rejected for ordinary contribution. Some future controls or integrations may require hosted environments, but the core public and synthetic development path must remain credential-free where practical.

### Synchronous processing for every capability

Rejected. It couples player responsiveness to optional providers and expensive work.

### Abstracting every planned capability immediately

Rejected. An abstraction without a current consumer, testable contract, owner, and replacement need creates complexity rather than portability.

## Consequences

### Positive

- clearer mental model for contributors and operators;
- faster and more deterministic local feedback;
- reduced provider and founder dependence;
- graceful AI and integration failure;
- replayable and inspectable delayed work;
- lower risk that schedules or infrastructure become hidden authority;
- better fit for the short-session game and strategic daily processing model;
- stronger migration, fork, and hundred-year continuity posture;
- and more legible cost and complexity tradeoffs.

### Costs and risks

- explicit work contracts require design effort before implementation;
- asynchronous state creates freshness and user-communication obligations;
- a modular monolith still requires disciplined boundaries and may become tangled without review;
- local substitutes can diverge from provider behavior;
- performance budgets can become vanity metrics or encourage unsafe shortcuts;
- and delayed decomposition can become avoidance if evidence is ignored.

These risks are handled through synthetic journeys, observability, provider contract tests, architecture review, specialist holdpoints, rollback, and the Institutional Immune System.

## Evidence and revalidation

This decision begins as a reasoned architecture baseline, not a validated product or scaling result.

Revalidate it when:

- the first private vertical slice is implemented;
- measured player latency or reliability is unacceptable;
- a workload cannot be isolated, secured, scaled, or recovered proportionately;
- local development or full validation exceeds accepted budgets repeatedly;
- a major provider or runtime is selected or replaced;
- a service extraction is proposed;
- a material outage or replay failure occurs;
- a second maintainer cannot operate a critical workflow from documentation;
- or an institutional phase-exit review occurs.

Weak evidence for one implementation pattern may justify replacement or decomposition. It may not weaken the Product Constitution or make complexity an institutional objective.

## Unresolved implementation decisions

This decision does not select:

- database topology or persistence model by domain;
- event store, queue, scheduler, workflow engine, cache, or message broker;
- consistency model;
- offline synchronization protocol;
- multi-device conflict algorithm;
- observability or telemetry provider;
- deployment topology;
- service-level objectives;
- numeric performance budgets before baseline measurement;
- or provider-specific retry and retention behavior.
