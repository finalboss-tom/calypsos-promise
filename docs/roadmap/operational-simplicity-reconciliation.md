# Operational Simplicity and Durable Workflows — Repository Reconciliation

[Roadmap index](README.md) · [Decision 0011](../decisions/0011-operational-simplicity-and-durable-workflows.md) · [Operational architecture](../architecture/operational-simplicity-and-durable-workflows.md) · [Workstream](operational-simplicity-workstream.md) · [Tracking issue #43](https://github.com/finalboss-tom/calypsos-promise/issues/43)

- **Status:** PROPOSED repository-wide reconciliation
- **Baseline reviewed:** `main` after PR #42, squash commit `188a6409de9bfc967fdb0f46bc08eb35ddfd6f9c`
- **Runtime effect:** None
- **Sequence effect:** Sprint 6 remains next
- **Certification boundary:** Internal repository consistency review; not production, scaling, security, privacy, accessibility, clinical, legal, financial, or operations certification

## Executive conclusion

The operational-simplicity direction is already substantially present in Calypso’s Promise. It is not a new technical strategy imposed after the frozen foundations.

The repository already establishes:

- TypeScript as the primary implementation language;
- a modular TypeScript backend initially deployed as a modular monolith;
- durable queues and workers for background work;
- isolated Python analytics where the workload justifies a distinct runtime;
- explicit domain boundaries and inward dependency direction;
- provider-independent contracts and replaceable adapters;
- logical engines that may share a deployable process;
- idempotent commands and proposed domain-event vocabulary;
- short daily game sessions with a clear stopping point;
- assisted multimodal drafts followed by player confirmation;
- AI and MCP as proposal and adapter layers rather than canonical authority;
- credential-free, public-or-synthetic contributor workflows;
- and Minimum Viable Validation that should remain deterministic, fast, local, and understandable.

The gap is not architectural contradiction. The gap is that these rules are distributed across frozen architecture, Calypso Engine, module boundaries, gameplay, validation, security, consumer-first interoperability, and institutional continuity documents without one canonical operational doctrine.

## Mission finding

Operational simplicity directly supports the mission when it makes the system:

- responsive enough for brief, ergonomic personal use;
- affordable enough to preserve a meaningfully free core;
- understandable enough for open contribution and correction;
- portable enough to replace providers and technologies;
- reproducible enough to evaluate with synthetic evidence;
- operable by more than the founder or original implementation author;
- and durable enough to preserve long-lived Chronicles and institutional memory.

It would conflict with the mission if “simple” became a reason to weaken privacy, consent, audit, accessibility, correction, deletion, security isolation, clinical safeguards, or legal authority.

The proposed Decision 0011 therefore defines simplicity as the smallest architecture capable of preserving the Promise—not the fewest files, checks, controls, or safeguards.

## Existing repository support

### Frozen Architecture Foundation

Already selects:

- a modular monolith;
- durable queue and workers;
- provider-neutral contracts;
- a TypeScript monorepo;
- isolated analytics;
- structured authoritative records;
- AI proposal boundaries;
- and planned applications that should not be created as empty placeholders.

No frozen-stack amendment is required.

### Gameplay Foundation

Already supports:

- approximately three-to-eight-minute sessions;
- a clear stopping point;
- tap, type, voice, image, document, import, learning, movement, reflection, and review actions;
- draft-before-storage behavior;
- deterministic permissions, completion, rewards, unlocks, and story order;
- and non-punitive return.

This naturally supports a small responsive path and deferred enrichment.

### Calypso Engine

Already defines:

- experience, orchestration, domain, policy, and provider layers;
- logical engines sharing one process;
- bounded commands and facts;
- no implicit cross-domain mutation;
- idempotency;
- provenance for material state changes;
- domain event names;
- failure isolation;
- and microservices as a non-goal.

The open questions—persistence, sync versus async integration, offline behavior, conflict resolution, observability, and provider selection—remain correctly deferred.

### Repository and Module Boundaries

Already requires:

- inward dependencies;
- no provider SDKs in domain contracts;
- no empty topology packages;
- separate services only for evidenced runtime, scaling, security, failure, language, or release needs;
- a current consumer and testable contract before module creation;
- and explicit decomposition triggers.

Decision 0011 adds operational-complexity and local-simulation review rather than replacing these rules.

### Minimum Viable Validation

Already requires:

- one documented `pnpm check` command;
- deterministic, fast, local, credential-free checks where practical;
- actionable and independent failures;
- and no check without a concrete defect class.

The current repository does not yet record measured timing budgets or validation tiers. That is an evidence gap, not a current failure.

### Current code and CI

The implemented codebase remains intentionally small and understandable:

- one bounded public site;
- four provider-independent or public-content packages;
- direct Node and TypeScript scripts;
- Turborepo task orchestration;
- synthetic fixtures;
- and independent CI checks.

Potential future pressure is visible:

- local `pnpm check` is sequential;
- multiple package tests rebuild before execution;
- CI validation jobs repeat dependency installation;
- and no timing baseline prevents slow degradation as packages and checks grow.

These are not merge blockers. They justify measurement and proportional future optimization before the repository becomes painful to change.

## Consumer-first and funding inheritance

Decision 0010 reinforces this work:

- institutional systems remain adapters rather than canonical product owners;
- manual and personal paths remain complete without enterprise enrollment;
- provider-specific behavior is isolated;
- and connector replacement, migration, and teardown are explicit future requirements.

Decision 0008 applies when infrastructure complexity arrives through:

- cloud or service credits;
- model credits;
- hosted databases, queues, storage, analytics, or observability;
- free integration labor;
- sponsored developer tooling;
- enterprise distribution;
- or related-party providers.

Support cannot purchase architecture authority, provider defaults, favorable benchmarks, suppressed limitations, roadmap control, or dependency without an exit path.

## Security inheritance

Sprint 5 prevents operational simplicity from becoming under-designed production behavior.

Before live private-data work, the architecture must still establish and verify:

- authentication and tenant isolation;
- permission freshness and revocation propagation;
- secure job input and result handling;
- encryption and key management;
- untrusted-input isolation;
- receipt and audit integrity;
- backup, restore, and disaster recovery;
- deletion verification;
- incident response;
- protected observability;
- residual-risk ownership;
- and specialist holdpoints.

A modular monolith may reduce some operational and network attack surface. It does not prove deployed security.

## Principal additions

This workstream adds:

1. proposed Decision 0011;
2. an operational architecture for responsive work, durable jobs, scheduling, events, projections, replay, and failure;
3. mission-to-runtime traceability;
4. a developer experience and operability policy;
5. proposed AS-0013;
6. sprint and phase inheritance;
7. navigation and current-status updates;
8. and a review boundary that separates architecture coherence from measured results.

## What does not change

- The Product Constitution and player promise do not change.
- The selected frozen stack does not change.
- Sprint 6 remains the next numbered sprint.
- Completed Sprints 0–5 are not reopened.
- Decision 0010’s consumer-first and provider-independent boundary remains controlling.
- The current public site remains the only live application surface.
- No provider, queue, scheduler, event store, database topology, authentication, connector, AI model, or observability system is selected.
- No performance, scalability, availability, security, cost, or product result is claimed.

## Key precision boundaries

### Event-informed is not universal event sourcing

Domain events, causation, replay, and append-oriented evidence may be useful. The repository does not yet require every domain’s primary state to be reconstructed exclusively from a persisted event log.

### Batch-oriented is not eventually correct by default

Delayed work must preserve authority freshness, truthful status, correction, error ownership, and player understanding. Consequential permission and safety decisions cannot be deferred merely for convenience.

### Local-capable is not a completed local-first design

Offline-tolerant capture and provider failure are important product goals. Device security, encryption, identity, revocation, deletion, recovery, and multi-device conflicts remain unresolved implementation decisions.

### Modular monolith is not unrestricted shared state

Modules still require explicit contracts, data ownership, dependency direction, tests, and no direct cross-domain writes.

### Fast feedback is not fewer safeguards

Performance budgets may drive caching, focused tests, or build-graph improvements. They may not justify hidden skips, removed invariant tests, or weaker review.

## Risks and challenge questions

The architecture should be challenged if:

- the ordinary product requires more real-time compute than assumed;
- background work produces confusing or harmful stale state;
- local substitutes conceal critical provider differences;
- a modular monolith becomes a shared-database super-domain;
- security isolation requires earlier service boundaries;
- build budgets create pressure to weaken evidence;
- queues or schedules become hidden business logic;
- operating the system still requires founder intuition;
- or infrastructure cost threatens the meaningfully free core.

## Recommended implementation sequence

1. Accept, revise, or reject Decision 0011 and AS-0013.
2. Inherit the contracts in the Sprint 6 execution plan without selecting a provider or runtime.
3. Establish synthetic job, clock, failure, and replay tools in Sprint 7.
4. Preserve a provider-free deterministic prologue in Sprint 9.
5. Define game-shell pending, synchronized, and degraded states in Sprint 10.
6. Make Sprint 11 the complete architectural proof.
7. Carry idempotent daily scheduling, connector work, analytics batching, and long-running tools through Sprints 12–16.
8. Measure product, performance, cost, and operator evidence at Sprint 18.
9. Require a clean-machine synthetic vertical slice for Sprint 19.
10. Revalidate at institutional phase gates and every proposed service extraction.

## Acceptance assessment

The repository is conceptually ready to accept an operational-simplicity baseline without changing its frozen mission or architecture.

Acceptance should remain proposal-level until the founding steward reviews:

- the exact decision language;
- sprint and phase inheritance;
- candidate performance targets;
- security and accessibility precision boundaries;
- Decision 0008 and Decision 0010 inheritance;
- and the explicit unresolved implementation choices.

Repository CI can validate formatting, links, policy, contracts, lint, types, tests, and DCO. It cannot validate the underlying product and operations hypothesis.
