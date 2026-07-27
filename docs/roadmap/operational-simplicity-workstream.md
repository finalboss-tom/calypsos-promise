# Operational Simplicity and Durable Workflows Workstream

[Roadmap home](README.md) · [Decision 0011](../decisions/0011-operational-simplicity-and-durable-workflows.md) · [Operational architecture](../architecture/operational-simplicity-and-durable-workflows.md) · [Mission traceability](../architecture/mission-to-runtime-traceability.md) · [Operability policy](../policies/developer-experience-and-operability.md) · [AS-0013](../governance/assumption-AS-0013-operational-simplicity-durable-value.md) · [Pre-Sprint 6 review](pre-sprint-6-alignment-review.md)

- **Status:** ACCEPTED CROSS-PHASE BASELINE — Decision 0011 accepted through PR #44
- **Tracking issue:** [#43](https://github.com/finalboss-tom/calypsos-promise/issues/43)
- **Pull request:** [#44](https://github.com/finalboss-tom/calypsos-promise/pull/44)
- **Squash commit:** `43fb01894639e7484ab1553428e1381a0f51b32c`
- **Sequence effect:** does not renumber or delay Sprint 6
- **Runtime effect:** none; no production queue, scheduler, workflow engine, event store, database topology, service topology, observability provider, offline protocol, or performance guarantee is authorized

## Purpose

This workstream carries the accepted operational-simplicity and durable-workflows boundary through the existing sprint and institutional phase sequence.

It protects the project from two opposite errors:

1. hiding necessary correctness, security, privacy, consent, accessibility, audit, recovery, or migration complexity under a slogan of simplicity; and
2. introducing distributed services, provider-specific domain logic, cloud-only contribution, expensive synchronous work, non-replayable jobs, or opaque operations before evidence justifies them.

The accepted default is:

> A modular monolith with explicit domain contracts, a small responsive path, durable deferred work, replaceable adapters, reproducible local simulation, and evidence-gated decomposition.

## Phase 0 accepted scope

The Phase 0 documentation slice contains:

- accepted Decision 0011;
- an operational architecture distinguishing commands, events, projections, jobs, schedules, responsive work, deferred work, authoritative state, derivatives, replay, correction, and provider adapters;
- mission-to-runtime traceability;
- the baseline Developer Experience and Operability Policy;
- active AS-0013 as a falsifiable working hypothesis;
- sprint and institutional phase inheritance;
- complexity and service-extraction gates; and
- no false claim that a production workflow runtime or measured performance exists.

Acceptance of the doctrine does not complete:

- database topology or persistence design by domain;
- event store, queue, scheduler, workflow engine, cache, or message-broker selection;
- service topology;
- offline synchronization or multi-device conflict behavior;
- observability or telemetry selection;
- production retries, quarantine, replay, compensation, or disaster recovery;
- production deployment or service-level objectives;
- numeric performance budgets before measurement; or
- independent architecture, security, accessibility, operations, or product validation.

## Protected rules

This workstream cannot be used to:

- reduce purpose-specific permission for performance;
- make security, privacy, deletion, receipts, provenance, correction, accessibility, or refusal optional;
- allow clients, AI, schedules, queues, providers, projections, caches, indexes, or analytics to become canonical authority;
- conceal pending, stale, failed, duplicate, conflicting, superseded, or incomplete state;
- make the complete personal-core product depend on research, enterprise enrollment, sponsorship, premium compute, broader permission, or one hosted provider;
- put production data or credentials into public contributor environments; or
- represent architecture targets as validated scalability, latency, cost, reliability, or product outcomes.

Decision 0008 funding boundaries and Decision 0010 provider-independent boundaries apply to every infrastructure, model, queue, storage, connector, analytics, identity, notification, observability, integration, and developer-tool relationship.

## Sprint inheritance

### Sprint 6 — Aster contracts and AI governance

Add or preserve:

- a declared responsive, deferred, or manual-fallback class for each Aster result;
- structured request and result contracts distinct from Chronicle truth, permission truth, memory, receipts, audit, quest completion, and provider logs;
- timeout, cancellation, retry, duplicate, supersession, provider-unavailable, and stale-result behavior;
- freshness checks for identity, intent, source, permission, policy, record revision, and retrieval state;
- stable operation identity where delayed or retryable work is modeled;
- source-linked proposals that converge on player-confirmed, domain-validated records;
- a deterministic local or synthetic Aster adapter requiring no provider credentials;
- latency, egress, retention, training, cost, concentration, and provider-replacement governance; and
- a complete manual and non-AI path for core capture, permission review, correction, export, deletion, and refusal.

Sprint 6 remains a contract and governance sprint. It does not select a production provider, model gateway, queue, scheduler, event store, workflow engine, or vector database.

### Sprint 7 — Forge MCP and agent safety

Add or preserve:

- synthetic job, clock, provider, and failure tools that expose no production data or credentials;
- bounded operation handles for work that is not truly synchronous;
- exact tool scopes, purpose, risk, confirmation, result-size, time, and compute budgets;
- no arbitrary queue, scheduler, database, filesystem, environment, secret, or operator authority;
- deterministic replay of public synthetic workflows; and
- client disconnect or timeout behavior that cannot create unknown duplicate domain effects.

### Sprint 8 — Public website foundation

The public site remains a fast, bounded, mostly static discovery and trust surface. It must not require production accounts, health data, queues, model providers, analytics, private APIs, or cloud-only development to explain the project.

Public architecture claims must distinguish accepted direction from measured and deployed behavior.

### Sprint 9 — Public synthetic prologue

Add or preserve:

- a deterministic prologue runnable without a live model or private service;
- public synthetic fixtures only;
- explicit clock and randomness inputs where behavior depends on them;
- no background job whose completion is required to understand the core public experience; and
- truthful degraded or unavailable states for optional enrichment.

### Sprint 10 — Universal game shell

Add:

- explicit client synchronization, local pending, server-confirmed, stale, failed, superseded, corrected, and offline-tolerant states;
- no client-side assumption that request submission equals authoritative completion;
- versioned commands and responses;
- bounded cache and projection semantics; and
- accessible direct-language status independent from lore.

This does not complete a full local-first encryption, identity, synchronization, recovery, or multi-device conflict architecture.

### Sprint 11 — First Lantern vertical slice

This is the first complete synthetic durable-work proof.

The reference journey should include:

1. manual or assisted capture;
2. structured draft;
3. player confirmation;
4. authoritative Chronicle write;
5. durable enrichment request;
6. failed and retried attempt;
7. duplicate delivery with one authoritative domain effect;
8. quest or projection update;
9. correction or supersession; and
10. projection rebuild.

Acceptance requires a credential-free clean-machine synthetic path, explicit authority at each step, visible pending and failure state, provider-unavailable completion, and no hidden manual intervention.

### Sprint 12 — Fourteen Lanterns content and routing

Add or preserve:

- idempotent daily route preparation;
- controllable clocks and time zones;
- explicit route revision and supersession;
- no hidden streak or shame penalty caused by scheduler or notification failure;
- route generation as a request over current facts rather than canonical Chronicle mutation; and
- safe behavior for missed, duplicate, late, and corrected work.

### Sprint 13 — Chronicle recall and Memory Chamber

Add or preserve:

- rebuildable recall and semantic projections;
- source, record, mapping, index, and retrieval freshness;
- structured-query fallback when an index is missing or stale;
- visible corrected, retracted, conflicting, or deleted state;
- replay and reindex behavior; and
- no vector index, summary, cache, or model memory as canonical truth.

### Sprint 14 — Connector foundation

Add or preserve:

- durable, versioned, idempotent synchronization operations;
- stable source cursors and checkpoint semantics;
- permission freshness before retrieval and authoritative import;
- source and transformation provenance;
- duplicate and out-of-order handling;
- replay, correction, deletion, and revocation behavior;
- lag, failure, retry, mapping-loss, concentration, and cost metrics;
- suspension, teardown, replacement, and migration; and
- no provider-specific rule inside the Chronicle contract.

One synchronization must be replayable without duplicate authoritative import, and provider failure must leave manual capture, correction, export, and deletion usable.

### Sprint 15 — Athena’s Observatory

Use batch-first analysis when real-time computation is not required for the current player action.

Analysis requests, windows, methods, sources, mappings, and outputs remain versioned and attributable. Derived results are rebuildable, stale and superseded behavior is explicit, and optional expensive analysis does not block authoritative capture or core rights.

### Sprint 16 — Chronicle MCP through the Veil

Add:

- long-running operation handles;
- status inspection and bounded result retrieval;
- cancellation and expiration;
- stable operation identity across retries;
- per-tool compute, time, and result-size budgets;
- receipts distinguishing request, authorization, execution, and completion; and
- disconnect and timeout behavior.

A client timeout cannot create an unknown duplicate effect. Revoked clients cannot retrieve later results or initiate future attempts.

### Sprint 17 — Clinical, safety, and accessibility governance

Add:

- review criteria for when consequence requires a separate service, environment, queue, or specialist-controlled workflow;
- accessibility review for pending, stale, failed, retrying, offline, and corrected states;
- clinical and safety review of delayed-result presentation and notification timing; and
- rules preventing batching or deferred work from delaying a required emergency or high-risk response.

Operational simplicity does not substitute for specialist review.

### Sprint 18 — Beta evidence and release gate

Gather evidence for active AS-0013:

- clean setup and local startup;
- focused package and journey tests;
- full validation;
- game startup and primary interaction;
- capture acknowledgement;
- delayed-work lag and completion distribution;
- retry, duplicate-delivery, quarantine, replay, and correction reliability;
- offline-tolerant and provider-unavailable completion;
- external AI, connector, and infrastructure dependency;
- compute and storage cost where measurable;
- operator burden and incident diagnosis;
- second-maintainer operation and recovery;
- accessibility and low-bandwidth behavior; and
- whether apparent simplicity is hiding manual work.

Quantitative targets must be approved before use as release claims. Aggregate performance cannot conceal harmful accessibility or low-bandwidth segments.

### Sprint 19 — Open-source public launch

Publish:

- installation and focused-validation documentation;
- a synthetic reference vertical slice runnable from a clean machine;
- public operational architecture and capability status;
- job contracts and failure semantics for public components;
- distinction among targets, development measurements, synthetic evidence, deployed controls, and production behavior;
- dependency and provider replacement information; and
- deliberate release rather than automatic deployment of every repository commit.

No scalability, reliability, local-first, or operational-readiness claim may exceed evidence.

## Institutional phase inheritance

### Phase 0 — Constitutional and open-source foundations

Decision 0011, AS-0013, architecture, policy, and workstream are accepted and reviewable. Current install, startup, focused-check, package-test, and full-validation baselines must be measured before numeric gates are accepted. Service and complexity-expansion gates remain explicit. Public development remains credential-free and synthetic where practical. Persistence, queue, event, offline, observability, and provider choices remain named and unresolved.

Phase 0 acceptance of the doctrine does not require the private product to exist.

### Phase 1 — Useful private product

Core capture, permission, inspection, correction, export, deletion, refusal, and return remain usable without optional enrichment. Manual and non-AI paths remain complete. Background failure does not block the personal-core product. Pending, stale, failed, and corrected states are understandable. Cost remains compatible with the meaningfully free core. No enterprise or provider relationship is required for complete personal value. At least two people can maintain critical build, release, and workflow functions before the phase closes.

### Phase 2 — Evidence and trust

Add deployed job and operation observability; retry, replay, quarantine, and correction procedures; authority freshness; duplicate protection; backlog and failure recovery; latency, availability, and cost evidence; protected logging and audit; deletion and retention across derivatives; and independent evaluation where a queue, worker, model, or service becomes consequential.

### Phase 3 — Community stewardship

Multiple maintainers can build, release, operate, diagnose, replay, and recover critical workflows. Material worker, queue, storage, model, connector, implementation-guide, or infrastructure replacement is exercised. Operational knowledge and provider strategy do not remain founder-only. Service and dependency inventories have public-safe owners and exit plans.

### Phase 4 — Research Commons

Research computation is isolated where sensitivity, governance, scale, or consequence requires it. Research workloads cannot become authoritative product state or destabilize personal-core workflows. Research models and environments remain purpose-specific and replaceable.

### Phase 5 — Sustainable economics

Infrastructure, compute, storage, model, queue, connector, and operator costs are measured against personal and public value. Free credits and subsidies do not justify lock-in or unnecessary complexity. Premium compute does not remove the complete manual core. Service proliferation, operator burden, concentration, and replacement cost are economic liabilities.

### Phase 6 — Constitutional governance

A material architecture-exception process records evidence, decision class, affected constituencies, alternatives, cost, rights and safety impact, owner, rollback, and revalidation. No funder, vendor, popular vote, maintainer, founder, or one technical constituency can force consequential complexity outside its authority.

### Phase 7 — Founder-independent institution

Founder-absence and leadership-transition evidence must cover clean setup, release, deployment, scheduled-work operation, failed-job diagnosis, replay, correction, credential and key recovery, provider replacement, rollback, incident escalation, and continued player rights.

Founder independence is not achieved when ordinary operations still require undocumented founder intuition.

### Phase 8 — Hundred-Year stewardship

Exercise rebuilding derivatives from authoritative sources; migrating command, event, job, and projection contracts; replacing schedulers, providers, languages, and infrastructure; validating historical work under newer versions; preserving provenance and institutional memory; retiring obsolete infrastructure; and operating fork, merger, archive, succession, or wind-down paths without abandoning personal rights.

## Complexity-exception record

A future material exception should include:

```text
observed problem
measurement and evidence
current architecture limitation
rights and safety impact
alternatives considered
selected boundary
owner and backup owner
provider and funding conflicts
local-development behavior
data and authority ownership
migration plan
operability and incident plan
cost and concentration
rollback or removal
review date or trigger
linked assumption and challenge records
```

The exact typed contract remains future work.

## Acceptance criteria

The accepted workstream requires:

- explicit mission connection;
- commitment and hypothesis kept distinct;
- modular monolith as the default deployment posture;
- evidence before separate services;
- schedules that trigger but do not own domain logic;
- durable work with identity, retry, duplicate, replay, correction, cancellation, supersession, and failure semantics proportionate to consequence;
- distinguishable responsive and deferred paths;
- complete manual and non-AI core behavior;
- credential-free public local development where practical;
- event-informed architecture not misrepresented as universal event sourcing;
- offline-tolerant direction not misrepresented as completed local-first design;
- timing and complexity targets tied to measurement context;
- Decision 0008 and Decision 0010 inheritance;
- Sprint 6 remaining next; and
- no production technology or measured outcome claimed without evidence.

## Future implementation gate

Before a production durable-work system is represented as live, create a separate accepted implementation plan covering:

- provider and technology selection;
- data classification;
- identity and authority;
- transactional boundaries;
- persistence and ordering;
- retry and quarantine;
- encryption and secrets;
- observability and audit;
- deletion and retention;
- incident and disaster recovery;
- accessibility of operation status;
- performance and cost evidence;
- specialist review; and
- provider replacement.

## Completion rule

This workstream succeeds when the project can remain responsive, correctable, understandable, locally testable, provider-replaceable, and operable by successor maintainers without turning hidden infrastructure or founder knowledge into authority.

It remains subject to challenge, evidence, narrowing, architecture exceptions, rollback, and replacement.