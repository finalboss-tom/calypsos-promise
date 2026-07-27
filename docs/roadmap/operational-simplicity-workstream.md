# Operational Simplicity and Durable Workflows Workstream

[Roadmap index](README.md) · [Decision 0011](../decisions/0011-operational-simplicity-and-durable-workflows.md) · [Operational architecture](../architecture/operational-simplicity-and-durable-workflows.md) · [Reconciliation](operational-simplicity-reconciliation.md) · [AS-0013](../governance/assumption-AS-0013-operational-simplicity-durable-value.md) · [Tracking issue #43](https://github.com/finalboss-tom/calypsos-promise/issues/43)

- **Status:** PROPOSED CROSS-PHASE WORKSTREAM
- **Entry baseline:** `main` after PR #42
- **Sequence effect:** Does not renumber or delay Sprint 6
- **Runtime effect:** None

## Purpose

This workstream carries the proposed operational-simplicity doctrine through the existing design-to-build sequence and institutional roadmap.

It prevents implementation from drifting into either extreme:

- an undifferentiated monolith with hidden state, shared authority, and cron-owned business logic; or
- a distributed maze of services, providers, build steps, and operational dependencies introduced before a real boundary justifies them.

The target is a small responsive path, explicit domain authority, durable deferred work, reproducible synthetic evidence, and complexity that appears only where rights, safety, reliability, scale, language, or institutional ownership require it.

## Phase 0 documentation scope

This Phase 0 workstream is complete when the repository contains:

- proposed Decision 0011;
- the operational architecture;
- mission-to-runtime traceability;
- the developer experience and operability policy;
- proposed AS-0013;
- this sprint and phase inheritance;
- a repository reconciliation;
- navigation and current-status updates;
- and no false claim that the architecture has been implemented or validated.

Acceptance of the doctrine does not complete:

- production persistence;
- queue or scheduler selection;
- event sourcing;
- service-level objectives;
- local-first synchronization;
- mobile background execution;
- observability;
- provider integration;
- performance optimization;
- production security controls;
- or product and operations evidence.

## Sprint inheritance

### Sprint 6 — Aster contracts and AI governance

Add or preserve:

- each Aster capability declares whether its result is required immediately, may complete later, or has a complete manual fallback;
- structured work-request and result contracts for delayed extraction, enrichment, retrieval, or explanation where used;
- explicit timeout, cancellation, retry, supersession, and provider-unavailable behavior;
- delayed output cannot become canonical truth after the player’s relevant intent, permission, source, or record has changed without required freshness checks;
- a deterministic local or synthetic Aster adapter for contract and journey tests;
- voice, image, text, and document capture converge on a source-attributed structured-draft boundary rather than provider-specific Chronicle commands;
- AI latency, egress, retention, and cost are declared where decision-relevant;
- and the complete manual core remains usable without a model call.

Acceptance additions:

- one synthetic Aster operation can time out or fail without blocking manual capture;
- delayed output is represented as pending rather than complete;
- stale or superseded AI work cannot overwrite a newer confirmed record;
- and provider credits, sponsorship, or enterprise relationships cannot determine the synchronous product boundary or remove the fallback.

Sprint 6 remains a contract and governance sprint. It does not select a production queue, model, scheduler, or orchestration provider.

### Sprint 7 — Forge MCP and agent safety

Add or preserve:

- public tools for inspecting proposed command, event, projection, and work-contract documentation;
- synthetic job creation, execution, failure, retry, quarantine, replay, and correction fixtures;
- controllable-clock utilities for public and synthetic workflows;
- local `stdio` operation without hosted infrastructure;
- provider-independent tools cannot require production credentials or private endpoints;
- retrieved content and job payloads cannot grant themselves authority;
- and a tool timeout or transport error cannot be interpreted as authoritative operation failure or success without checking the operation record.

Acceptance additions:

- Forge can exercise one synthetic durable-work lifecycle entirely on public or synthetic information;
- a duplicate tool request does not duplicate the simulated domain effect;
- and tool contracts remain useful when the production provider choices are unknown.

### Sprint 8 — Public website foundation

Add or preserve:

- explicit page and asset performance baselines proportionate to the public gateway;
- essential public content renders independently from private product APIs, queues, or AI providers;
- external form, funding, status, or provider failure degrades honestly;
- capability status is sourced from public institutional records rather than inferred from deployment existence;
- and operational-simplicity claims distinguish architecture targets from measured results.

Acceptance additions:

- a failed optional integration does not make the documentation and trust surfaces unavailable;
- and no fast-loading claim is made without a documented measurement context.

### Sprint 9 — Public synthetic prologue

Add:

- deterministic local or bundled behavior for the canonical prologue;
- a controllable clock where timing affects the journey;
- synthetic pending, processing, failed, corrected, and completed states;
- a fake or deterministic Aster path;
- and no required production queue, model, connector, account, or private service.

Acceptance additions:

- the canonical prologue can complete without network access after required public assets are available, where platform constraints permit;
- a simulated deferred operation can fail without trapping the visitor;
- and temporary or synthetic state remains clearly distinguished from a real Chronicle.

### Sprint 10 — Universal game shell

Add:

- thin-client and explicit-authority rules;
- local draft and synchronization-state boundaries;
- pending, unsynchronized, synchronized, failed, stale, corrected, and superseded presentation states;
- responsive startup and primary-interaction measurement;
- background work that does not block authored navigation or safe local actions;
- and a declared boundary between local convenience state and authoritative server or domain state.

Acceptance additions:

- the client never creates authority merely because it accepted an offline action;
- no gameplay rule depends on client-side trust;
- low-bandwidth and temporarily unavailable-provider paths remain understandable;
- and the shell does not freeze a complete local-first security or conflict-resolution design before review.

### Sprint 11 — First Lantern vertical slice

This is the primary architectural proof.

Extend the reference journey to cover:

1. create a synthetic private Chronicle;
2. evaluate and grant one personal-core permission;
3. enter an observation manually or through a synthetic Aster draft;
4. review and confirm the draft;
5. store an authoritative record with source and provenance;
6. create a durable enrichment or reconciliation request;
7. fail one attempt;
8. retry safely;
9. receive duplicate delivery without a duplicate record, quest completion, reward, or receipt;
10. update a versioned quest or player projection;
11. inspect pending, completed, and source-linked state;
12. correct the original record;
13. invalidate or supersede affected derivatives;
14. rebuild the projection;
15. export the relevant record, provenance, permission, receipt, operation, and correction evidence;
16. and exercise the defined deletion behavior.

Acceptance additions:

- the synthetic journey runs locally through documented commands without production credentials;
- a controllable clock can exercise delayed work;
- each major operation can be inspected independently;
- AI and optional enrichment failure do not block the manual value loop;
- authority is checked at the appropriate execution boundary;
- and no transport acknowledgement is treated as proof of domain completion.

### Sprint 12 — Fourteen Lanterns content and routing

Add or preserve:

- daily route preparation as an explicit idempotent workflow;
- versioned route inputs and policy or content references;
- safe reruns and supersession;
- a controllable clock for missed days, quiet periods, return, and route expiration;
- current player actions override stale prepared routes;
- and scheduled work cannot create shame, punishment, fabricated completion, or pressure for broader permission.

Acceptance additions:

- replaying daily preparation does not duplicate rewards or notifications;
- stale routes are replaced or clearly marked;
- and scheduler failure does not remove direct access to the underlying personal product.

### Sprint 13 — Chronicle recall and Memory Chamber

Add or preserve:

- semantic and search indexes are disposable derivatives;
- index revision, source coverage, and freshness are inspectable where material;
- structured Chronicle records remain available when indexing is delayed or unavailable;
- corrections, retractions, and deletion requests invalidate or supersede affected recall derivatives;
- recall projections can be rebuilt without rewriting source truth;
- and delayed retrieval output cannot elevate a sponsor, provider, or newest source into automatic truth.

Acceptance additions:

- one synthetic index rebuild reproduces expected source-linked recall;
- stale or missing index state has an understandable fallback;
- and source, mapping, model, and retrieval revisions remain traceable.

### Sprint 14 — Connector foundation

Extend the Decision 0010 inheritance with durable synchronization behavior:

- versioned synchronization requests;
- stable connector operation identities;
- cursor and checkpoint versioning;
- bounded batching and concurrency;
- retry and backoff by error class;
- idempotent import and duplicate handling;
- quarantine for malformed, hostile, unsupported, or semantically ambiguous payloads;
- replay from preserved source artifacts and mapping revisions;
- revocation freshness before future access;
- source-specific schedules isolated in adapters;
- lag, failure, retry, mapping-loss, and cost metrics;
- suspension, teardown, replacement, and migration behavior;
- and no provider-specific rule inside the Chronicle contract.

Acceptance additions:

- one synchronization can be replayed without duplicate authoritative import;
- failed connector work cannot corrupt or broaden the Chronicle;
- revocation stops future retrieval and retry where authority no longer applies;
- provider failure leaves manual capture, correction, export, and deletion paths usable;
- and a connector can be disabled or replaced without rewriting Chronicle identity or semantics.

### Sprint 15 — Athena’s Observatory

Add or preserve:

- batch-first analysis when real-time computation is not required for the player’s current action;
- versioned analysis requests, source windows, methods, and outputs;
- rebuildable derived results;
- source, mapping, and method provenance;
- explicit stale and superseded analysis behavior;
- resource and cost attribution by analysis class where material;
- and no expensive optional analysis inside the authoritative capture transaction.

Acceptance additions:

- delayed or failed analysis does not block inspection, correction, export, deletion, or ordinary gameplay;
- one result can be reproduced from declared synthetic inputs and versions;
- and batching does not conceal uncertainty or turn association into diagnosis.

### Sprint 16 — Chronicle MCP through the Veil

Add:

- long-running operation handles rather than assuming every tool call completes synchronously;
- status inspection and bounded result retrieval;
- cancellation and expiration;
- stable operation identity across retries;
- per-tool compute, time, and result-size budgets;
- receipts that distinguish request, authorization, execution, and completion;
- and explicit behavior when an MCP client disconnects or times out.

Acceptance additions:

- a client timeout does not create an unknown duplicate effect on retry;
- revoked clients cannot retrieve later results or initiate future attempts;
- and no tool exposes arbitrary queue, database, filesystem, or operator control.

### Sprint 17 — Clinical, safety, and accessibility governance

Add:

- review criteria for when a distinct service, queue, execution environment, or specialist-controlled workflow is required by consequence rather than scale;
- accessibility review for pending, stale, failed, retrying, offline, and corrected states;
- clinical and safety review of delayed-result presentation and notification timing;
- and rules preventing operational convenience from deferring emergency or high-risk routing that must be immediate.

Acceptance additions:

- a background or batching strategy cannot delay a required safety response;
- operational simplicity does not substitute for specialist review;
- and direct language communicates consequential state without requiring lore comprehension.

### Sprint 18 — Beta evidence and release gate

Add evidence for AS-0013:

- clean setup and local startup time;
- focused package and journey test time;
- full validation time;
- game startup and primary-interaction latency;
- capture acknowledgement latency;
- delayed work lag and completion distribution;
- retry, duplicate-delivery, quarantine, replay, and correction reliability;
- offline-tolerant and provider-unavailable completion;
- external AI, connector, and infrastructure dependency;
- compute and storage cost per meaningful route or operation class where measurable;
- operator burden and incident diagnosis time;
- second-maintainer ability to run and recover the reference journey;
- accessibility and low-bandwidth performance;
- and whether operational simplicity is concentrating complexity in hidden manual work.

Acceptance additions:

- quantitative targets are approved before using them as release claims;
- aggregate latency cannot conceal a harmful accessibility or low-bandwidth segment;
- coherent architecture is not represented as validated operations;
- and evidence may justify a bounded service extraction without weakening protected rights.

### Sprint 19 — Open-source public launch

Add:

- installation and focused-validation documentation;
- a synthetic reference vertical slice runnable from a clean machine;
- public operational architecture and capability status;
- documented job contracts and failure semantics for public components;
- clear distinction among targets, measured development results, synthetic evidence, deployed controls, and production behavior;
- dependency and provider replacement information appropriate for public release;
- and deliberate release rather than automatic deployment of every repository commit.

Acceptance additions:

- a new contributor can run one focused check without understanding the entire task graph;
- the synthetic vertical slice requires no production data, secret, or mandatory provider account;
- public measurements state their environment and limitations;
- and no scalability, reliability, local-first, or operational-readiness claim exceeds evidence.

## Institutional phase inheritance

### Phase 0 — Constitutional and open-source foundations

Add or preserve:

- Decision 0011, AS-0013, the architecture, policy, and workstream are reviewable;
- current install, startup, focused-check, package-test, and full-validation baselines are measured before numeric gates are accepted;
- service and complexity-expansion gates are explicit;
- schedules cannot become hidden domain authority;
- the first synthetic vertical-slice evidence plan has an owner;
- public development remains credential-free and synthetic where practical;
- and unresolved persistence, queue, event, offline, observability, and provider choices remain named.

Phase 0 acceptance of the doctrine does not require the private product to exist.

### Phase 1 — Useful private product

Add or preserve:

- core capture, permission, inspection, correction, export, deletion, refusal, and return remain usable without optional enrichment;
- manual and non-AI paths remain complete;
- background failure does not block the personal-core product;
- degraded, pending, stale, and corrected states are understandable;
- operational cost is compatible with the meaningfully free core;
- no enterprise or provider relationship is required for complete personal value;
- and at least two people can maintain every critical build, release, and workflow function.

### Phase 2 — Evidence and trust

Add or preserve:

- deployed job and operation observability;
- retry, replay, quarantine, and correction procedures;
- authority freshness across deferred work;
- duplicate-delivery protection;
- backlog and failure recovery;
- latency, availability, and cost evidence;
- protected logging and audit boundaries;
- deletion and retention behavior across jobs and derivatives;
- and independent evaluation where a queue, worker, model, or service becomes consequential.

### Phase 3 — Community stewardship

Add or preserve:

- multiple maintainers can build, release, operate, diagnose, replay, and recover critical workflows;
- a material worker, queue, storage, model, connector, implementation guide, or infrastructure replacement has been exercised;
- operational knowledge and provider strategy do not remain founder-only;
- service and dependency inventories have public-safe owners and exit plans;
- and affected contributors and specialists participate in material architecture exceptions.

### Phase 4 — Research Commons and public-good infrastructure

Add or preserve:

- research computation is isolated where data sensitivity, governance, scale, or failure consequence requires it;
- research workloads cannot become authoritative product state;
- research batching cannot starve or destabilize personal-core workflows;
- research models and environments remain purpose-specific and replaceable;
- and public-good infrastructure does not create hidden access or operational dependence.

### Phase 5 — Sustainable economics and shared value

Add or preserve:

- infrastructure, compute, storage, model, queue, connector, and operator costs are measured against personal and public value;
- free credits and subsidies do not justify lock-in or unnecessary complexity;
- premium compute does not remove the complete manual core;
- service proliferation and operator burden are treated as economic liabilities;
- concentration and replacement cost are considered before accepting a dependency;
- and enterprise economics cannot force a synchronous, provider-owned, or inaccessible product architecture.

### Phase 6 — Constitutional governance

Add:

- a material architecture-exception process with evidence, decision class, affected constituencies, alternatives, cost, rights and safety impact, owner, rollback, and revalidation;
- no funder, vendor, popular vote, maintainer, founder, or one technical constituency can unilaterally force a consequential complexity expansion outside its authority;
- and architecture governance remains comprehensible enough for affected participants to challenge.

### Phase 7 — Founder-independent institution

Add to founder-absence and leadership-transition evidence:

- clean setup;
- release and deployment;
- scheduled-work operation;
- failed-job diagnosis;
- replay and correction;
- credential and key recovery;
- provider replacement;
- rollback and incident escalation;
- and continued player rights during transition.

Founder independence is not achieved when ordinary operations still require undocumented founder intuition.

### Phase 8 — Hundred-Year stewardship

Add recurring exercises for:

- rebuilding derivatives from preserved authoritative sources;
- migrating command, event, job, and projection contracts;
- replacing schedulers, providers, languages, and infrastructure;
- validating historical work under newer versions without rewriting prior truth;
- preserving provenance and institutional memory during migration;
- retiring obsolete infrastructure;
- and operating fork, merger, archive, succession, or wind-down paths without abandoning personal rights.

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

This workstream should not close until:

- the mission connection is explicit;
- commitment and hypothesis are distinguished;
- modular monolith remains the default deployment posture;
- separate services require evidence;
- schedules cannot own domain logic;
- durable work includes identity, retry, replay, correction, cancellation, and failure semantics proportionate to consequence;
- responsive and deferred paths are distinguishable;
- manual and non-AI core behavior remains complete;
- local public development remains credential-free where practical;
- event-informed architecture is not misrepresented as universal event sourcing;
- offline-tolerant direction is not misrepresented as a completed local-first design;
- timing and complexity targets require measurement context;
- Decision 0008 and Decision 0010 are inherited;
- Sprint 6 remains next;
- and no production technology or measured outcome is claimed without evidence.

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
- specialist review;
- and provider replacement.
