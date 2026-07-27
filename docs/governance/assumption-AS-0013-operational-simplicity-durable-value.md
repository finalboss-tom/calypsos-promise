# AS-0013 — Operational Simplicity Can Support Durable Personal Value

[Assumption Registry](assumption-registry.md) · [Decision 0011](../decisions/0011-operational-simplicity-and-durable-workflows.md) · [Operational architecture](../architecture/operational-simplicity-and-durable-workflows.md) · [Cross-phase workstream](../roadmap/operational-simplicity-workstream.md)

- **Category:** Architecture, product operations, contributor experience, economics, and institutional continuity
- **Status:** ACTIVE
- **Confidence:** WORKING HYPOTHESIS
- **Created:** 2026-07-27
- **Last reviewed:** 2026-07-27 through the pre-Sprint 6 reconciliation
- **Public information classification:** PUBLIC
- **Review owner:** Founding steward until a qualified architecture and operations ownership model is established
- **Acceptance link:** Decision 0011 accepted through [PR #44](https://github.com/finalboss-tom/calypsos-promise/pull/44)

## Statement

A modular, locally simulatable, batch-oriented core with a small responsive path, durable background work, provider-independent adapters, and evidence-gated decomposition can create meaningful longitudinal personal value and support multimodal interaction without requiring high-frequency distributed infrastructure for the ordinary Calypso’s Promise product loop.

## Constitutional boundary

Operational simplicity is a strategy for fulfilling the Promise, not a right that overrides it.

Weak evidence for the baseline architecture may require:

- a different persistence model;
- a new service or runtime boundary;
- stronger synchronization;
- greater redundancy;
- provider-specific operational controls;
- or a revised product sequence.

It may not justify weakening:

- personal value first;
- privacy;
- purpose-specific permission;
- correction;
- export;
- deletion;
- meaningful refusal;
- accessibility;
- deterministic authority;
- or the meaningfully free personal product.

## Intended decision use

This assumption informs:

- modular-monolith default posture;
- responsive-versus-deferred boundaries;
- strategic daily and scheduled processing;
- local and synthetic development;
- provider abstraction;
- service-extraction gates;
- performance and operability measurement;
- game-shell and vertical-slice design;
- connector and analytics scheduling;
- infrastructure economics;
- and long-horizon replacement planning.

## Evidence for

Current repository evidence is architectural rather than operational:

- the frozen architecture already selects a modular TypeScript application, durable workers, shared domain packages, provider neutrality, and isolated analytics;
- Calypso Engine already specifies explicit commands, bounded facts, idempotency, domain events, failure isolation, and a modular-monolith deployment posture;
- the Gameplay Foundation defines brief sessions, clear stopping points, deterministic authority, and assisted multimodal capture rather than continuous high-frequency simulation;
- the repository has a small credential-free executable core, deterministic packages, synthetic fixtures, and one documented validation command;
- many expected workloads—imports, route preparation, indexing, analytics, notifications, reconciliation, export assembly, and deletion propagation—can be modeled as bounded deferred work;
- and the consumer-first, provider-independent boundary favors a person-controlled continuity layer over enterprise-dependent runtime assumptions.

## Evidence against or missing

No private product runtime or representative operational evidence exists.

Important missing or contrary evidence includes:

- real voice, image, document, and model latency;
- multi-device synchronization and conflict behavior;
- mobile offline and background-execution constraints;
- large historical imports;
- connector rate limits and source variability;
- permission freshness across deferred work;
- encryption and key-management overhead;
- export and deletion propagation time;
- analytics cost and resource contention;
- notification timing and platform restrictions;
- disaster recovery and regional availability;
- research computation;
- real retention and daily-use patterns;
- accessibility performance on constrained devices and networks;
- and the operational burden of long-lived personal records.

A lightweight architecture can also become difficult to operate if it accumulates hidden jobs, shared tables, broad modules, or undocumented coupling.

## Competing explanations

- The product may require more real-time processing than currently expected to feel useful.
- Mobile and multi-device behavior may force a stronger synchronization architecture earlier.
- Security and privacy isolation may justify more deployment boundaries than product scale alone.
- Connectors and document processing may become the dominant operational load rather than daily gameplay.
- Hosted AI may be economically or ergonomically necessary for enough of the experience that local and manual fallbacks are rarely used.
- A modular monolith may reduce deployment count while still producing slow builds and tangled ownership.
- The principal complexity may come from legal authority, data semantics, support, and operations rather than compute volume.

## Affected groups

- players using manual, assisted, offline-tolerant, or connector paths;
- people with low-bandwidth, older-device, accessibility, or limited-provider contexts;
- contributors and maintainers;
- security, privacy, clinical, interoperability, accessibility, and research reviewers;
- operators and incident responders;
- funders and infrastructure providers;
- forks and successor institutions;
- and people whose Chronicles must remain understandable over long periods.

## Rights and safety implications

A poorly chosen simplicity strategy could:

- hide stale or failed processing;
- lose or duplicate state;
- delay revocation or deletion;
- collapse isolation;
- make local data unsafe;
- create inaccessible degraded modes;
- or leave critical operation dependent on one maintainer.

A poorly chosen complexity strategy could:

- make the product unaffordable;
- create provider lock-in;
- slow correction and contribution;
- increase attack surface;
- make the open-source software impractical to operate;
- and undermine founder independence and forkability.

Both directions require evidence and challenge.

## Dependencies

- explicit domain and authority boundaries;
- House of Keys enforcement;
- Sprint 5 security implementation;
- durable work contracts;
- truthful pending and failure states;
- local and synthetic adapters;
- controllable clocks;
- portable Chronicle contracts;
- provider replacement;
- cost and performance measurement;
- operator ownership;
- and the Institutional Immune System.

## Evidence plan

### Phase 0

- measure current install, startup, focused-test, package-test, and full-validation behavior;
- document the responsive and deferred boundaries;
- define durable job and simulation requirements;
- and review complexity inheritance across sprints and phases.

### Sprints 6–10

- validate Aster fallback and delayed-result contracts;
- add public synthetic job and clock simulation;
- prove the prologue requires no live model or private service;
- and establish game-shell pending, offline-tolerant, and synchronization states.

### Sprint 11

Run the first complete synthetic private-value reference journey:

- manual or assisted capture;
- confirmation;
- authoritative Chronicle write;
- durable enrichment request;
- failed and retried attempt;
- exactly-once domain effect despite duplicate delivery;
- quest or projection update;
- correction;
- and projection rebuild.

### Sprints 12–16

Measure and exercise:

- daily route preparation;
- missed-day and controllable-clock behavior;
- semantic-index rebuilding;
- connector lag and replay;
- analytics batching and cost;
- and long-running MCP tool behavior.

### Sprint 18 and phase gates

Review:

- player interaction latency;
- provider-unavailable completion;
- meaningful retention by source and device constraints;
- job lag, retries, quarantine, and replay;
- build and validation time;
- operational cost;
- operator burden;
- incident and recovery behavior;
- and whether complexity is concentrated or merely hidden.

## Evidence that would support the claim

- the core manual path remains responsive without optional providers;
- delayed work completes reliably and can be retried without duplicate domain effects;
- projections can be rebuilt from authoritative inputs;
- a clean machine can run the synthetic reference journey;
- another maintainer can diagnose and replay a failed workflow;
- provider replacement does not require domain-contract rewrites;
- infrastructure cost remains compatible with the meaningfully free core;
- and measured product utility does not depend on continuous high-frequency processing.

## Evidence that would weaken the claim

- the ordinary product repeatedly requires synchronous heavy inference to be useful;
- deferred processing creates unacceptable confusion, delay, or harm;
- queue and projection consistency cannot preserve permission, correction, or deletion safely;
- local substitutes systematically fail to reproduce material provider behavior;
- the modular monolith creates unacceptable release, security, scaling, or ownership coupling;
- build and validation performance becomes poor despite proportionate optimization;
- or operational simplicity depends on undocumented human intervention.

## Invalidation conditions

The claim should be invalidated or materially narrowed when direct project evidence shows that the declared architecture cannot meet accepted utility, rights, safety, reliability, cost, accessibility, or continuity gates after reasonable remediation.

One large workload or one justified service extraction does not invalidate the entire claim. The assumption may narrow to specific product paths, phases, or domains.

## Containment or fallback

When evidence weakens the assumption:

- preserve the responsive manual path where safe;
- isolate the failing workload;
- expose limitations and pending state;
- pause scale or release claims;
- create a reviewed architecture exception;
- extract or replace only the evidenced boundary;
- preserve portable source records and domain contracts;
- and maintain rollback or migration capability.

Do not compensate for weak architecture by coercing broader consent, retaining more data without purpose, hiding failures, or making one provider the canonical product.

## Review triggers

Review this assumption:

- during Sprint 6 completion review;
- at the Sprint 11 vertical-slice review;
- before any service extraction;
- before a production queue, workflow engine, event store, or mandatory hosted development service is selected;
- after material build, latency, cost, job, replay, or outage evidence;
- during provider replacement;
- at Phase 1, Phase 2, Phase 3, and Phase 7 exit reviews;
- and when a credible challenge identifies hidden complexity or concentrated harm.

## Independence limitations

The founding steward proposed the direction and currently controls roadmap acceptance. Repository consistency and founding-steward review are not independent architecture, security, accessibility, operations, or product validation.

Future evidence should include review by affected maintainers, operators, players, and relevant specialists rather than treating implementation authors as their own independent evaluators.

## Linked work

- [Issue #43](https://github.com/finalboss-tom/calypsos-promise/issues/43)
- [PR #44](https://github.com/finalboss-tom/calypsos-promise/pull/44)
- [Decision 0011](../decisions/0011-operational-simplicity-and-durable-workflows.md)
- [Operational architecture](../architecture/operational-simplicity-and-durable-workflows.md)
- [Cross-phase workstream](../roadmap/operational-simplicity-workstream.md)
- [Pre-Sprint 6 Alignment Review](../roadmap/pre-sprint-6-alignment-review.md)
