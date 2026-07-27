# Developer Experience and Operability Policy — BASELINE

[Policy index](README.md) · [Decision 0011](../decisions/0011-operational-simplicity-and-durable-workflows.md) · [Operational architecture](../architecture/operational-simplicity-and-durable-workflows.md) · [Minimum Viable Validation](minimum-viable-validation.md) · [Development policy](development.md) · [Pre-Sprint 6 review](../roadmap/pre-sprint-6-alignment-review.md)

- **Status:** BASELINE — accepted through Decision 0011 and PR #44
- **Evidence boundary:** policy and architecture direction only; numeric timing targets remain investigation targets until measured

## Purpose

Calypso’s Promise depends on future contributors and operators being able to understand, run, test, diagnose, replace, and recover the system without production health data, private credentials, or undocumented founder knowledge.

Developer experience is therefore not a cosmetic concern. It supports:

- safe open-source contribution;
- faster correction of defects and harmful assumptions;
- provider and founder independence;
- meaningfully free personal use;
- reproducible evidence;
- lower operating cost;
- migration and fork readiness;
- and long-horizon institutional continuity.

This policy establishes a proportional baseline. It does not require sophisticated tooling before the repository is large enough to justify it.

## Core rule

> A contributor should be able to understand the relevant boundary, run the smallest useful validation, receive an actionable failure, and reproduce the reference behavior without access to production data or undocumented services.

## Local environment requirements

The implemented repository should provide, as applicable to its current maturity:

- one documented command to install dependencies;
- one documented command to run the current local surface;
- one documented command for the full minimum validation baseline;
- focused commands for a package, capability, or journey;
- pinned or declared runtime and package-manager versions;
- a committed lockfile;
- credential-free setup for ordinary public and synthetic work;
- and truthful documentation of any capability that cannot run locally.

A new contributor should not need private chat, a founder-owned account, or production credentials to determine whether a public or synthetic change is correct.

## Synthetic and local substitutes

External systems should have deterministic local, fake, recorded-public, or synthetic substitutes where practical for ordinary development.

This may include substitutes for:

- AI extraction and explanation;
- queue and job dispatch;
- storage;
- notifications and email;
- connector endpoints;
- analytics execution;
- identity context;
- clocks and time zones;
- and provider errors.

A substitute must be clearly marked. It must not be represented as proof of production provider behavior, performance, security, conformance, or reliability.

Provider-specific contract tests may still require a controlled hosted environment. That requirement should not make provider-independent domain tests impossible.

## Controllable time

Tests for daily routes, quiet hours, expiration, retry, return, retention, approximate time, and scheduled review should use explicit time inputs or a controllable clock where deterministic behavior matters.

The wall clock should not make focused tests flaky or difficult to reproduce.

A test clock does not create trusted external evidence or legal authority.

## Background work ergonomics

Every material background operation should be runnable independently from its scheduler through an application, command-line, test, or synthetic harness appropriate to the capability.

A contributor or authorized operator should be able to determine:

- the operation kind and version;
- the synthetic or protected input boundary;
- why the operation was requested;
- whether it is safe to retry;
- current status and attempts;
- the produced result or error class;
- the relevant authority and freshness behavior;
- and the correction, replay, cancellation, or escalation path.

Do not require reading raw production logs to understand the intended contract.

## Validation tiers

The repository should distinguish at least these conceptual tiers as it grows.

### Focused feedback

The smallest command that validates the capability being edited.

Examples:

- one package’s type check;
- one validator test;
- one synthetic policy scenario;
- one documentation-link subset;
- one game journey;
- or one job replay fixture.

### Fast change gate

A practical pre-commit or iterative gate covering the most relevant formatting, static, policy, contract, and test checks for changed work.

This tier may remain manual until changed-file selection can be implemented reliably without hiding failures.

### Full repository baseline

The documented `pnpm check` or successor command that establishes the repository’s minimum merge baseline.

### Release and production evidence

Broader integration, provider, migration, security, accessibility, performance, incident, operational, and specialist evidence required for a release or live capability.

A focused check cannot substitute for the full merge gate. The full repository check cannot substitute for production evidence.

## Performance and feedback budgets

Budgets should begin with measurement rather than invented precision.

Before setting an enforceable target, record:

- machine or runner class;
- cold or warm state;
- dependency-install state;
- relevant workspace size;
- command;
- repeated observations;
- and known variability.

Candidate initial planning targets for the current and near-term repository include:

- common incremental feedback in approximately two seconds;
- focused package or domain tests within ten seconds;
- a fast local change gate within thirty seconds;
- a full installed-dependency local baseline within two minutes at the current repository scale;
- and local startup of the current relevant environment within one minute after dependencies are installed.

These are **investigation targets**, not accepted service guarantees. The baseline-measurement workstream may revise them before enforcement.

A performance target must not encourage:

- removal of meaningful tests;
- weakened privacy, security, accessibility, consent, or correctness;
- hidden skips;
- nondeterministic caching;
- or misrepresentation of cold versus warm performance.

## Build and test design

Prefer:

- package-scoped builds;
- dependency-aware caching with inspectable invalidation;
- tests that import public package surfaces;
- deterministic fixtures;
- independent failure reporting;
- and avoiding repeated compilation of identical inputs where safe.

Avoid:

- global setup for a focused unit test;
- mandatory network access for provider-independent checks;
- rebuilding every unrelated application for one package change;
- hidden environment mutation;
- tests that rely on execution order;
- and a single long command whose failure cannot be attributed to one responsibility.

The repository should not adopt a heavy affected-test, remote-cache, container, or orchestration system until its maintenance cost is justified by measured repository behavior.

## Actionable failures

A check or runtime diagnostic should identify, where safe:

- the failing capability or file;
- stable error or reason code where appropriate;
- the violated invariant;
- the relevant input or synthetic fixture reference;
- and the next useful command or documentation path.

Logs should not be the only contract for errors returned to applications, tests, or tools.

Protected data, credentials, private prompts, documents, contracts, and security evidence must remain outside ordinary error messages and public CI artifacts.

## Dependency additions

A material dependency proposal should state:

- current problem and owner;
- why existing language or repository capabilities are insufficient;
- license and maintenance posture;
- security and telemetry behavior;
- runtime and build impact;
- local-development impact;
- test strategy;
- production-data and provider boundary;
- replacement or removal path;
- and expected effect on install, build, startup, and validation time where material.

A free service, grant, sponsorship, model credit, provider integration, or enterprise relationship does not remove these requirements.

## Service and infrastructure additions

A new deployable service, queue, workflow engine, database, cache, hosted emulator, or mandatory local container requires:

- a current consumer;
- a bounded responsibility;
- an evidence-based decomposition need;
- named operational ownership;
- health, security, privacy, consent, accessibility, and publication effects;
- local or synthetic development behavior;
- observability and incident ownership;
- data migration and deletion behavior;
- cost and concentration review;
- replacement and rollback;
- and a revalidation trigger.

Do not introduce a mandatory infrastructure dependency solely to mirror a planned architecture diagram.

## Pull-request requirements

A material implementation pull request should report, where relevant:

- which bounded capability owns the change;
- whether work is responsive, deferred, scheduled, or mixed;
- commands used for focused and full validation;
- local startup and credential requirements;
- new dependencies or services;
- expected build, test, startup, or runtime impact;
- synthetic fixture or local adapter behavior;
- retry, replay, cancellation, and failure behavior;
- provider-unavailable behavior;
- and replacement or rollback path.

Documentation-only and low-impact changes may state that these dimensions are not applicable rather than inventing evidence.

## Operability documentation

Before a critical workflow is represented as live, documentation should identify:

- responsible owner and backup owner;
- normal initiation path;
- authority and credential boundary;
- dependencies;
- expected observable states;
- alerts or review triggers;
- common failure classes;
- retry and replay procedure;
- quarantine or containment;
- correction and rollback;
- incident escalation;
- data, audit, receipt, retention, and deletion implications;
- and provider replacement or teardown.

Operational documentation may reference protected runbooks. Public documents should contain reviewed, minimized institutional derivatives rather than credentials or exploitable detail.

## Second-operator standard

A critical workflow should not be considered institutionally mature merely because its creator can operate it.

Evidence should eventually show that another authorized maintainer or operator can:

- set up the relevant environment;
- run the synthetic reference path;
- identify a failed operation;
- determine whether retry is safe;
- replay or correct it;
- perform rollback or containment;
- and locate escalation and provider-exit instructions.

This standard supports Phase 1 operational redundancy, Phase 3 community stewardship, and Phase 7 founder independence.

## Regression and exception handling

A material recurring regression in setup, build, test, startup, interaction latency, background lag, cost, or operator burden should create an inspectable work item.

A temporary exception should name:

- measurement or observed problem;
- affected contributors, players, or operators;
- why remediation is deferred;
- responsible owner;
- containment or workaround;
- expiry or review trigger;
- and evidence required to close or extend it.

One slow run is not automatically a blocker. Silent permanent degradation is not acceptable either.

## Anti-goals

This policy does not require:

- every developer to run production infrastructure;
- identical local and production topology;
- universal containerization;
- one-command simulation of every future service before it exists;
- maximum test coverage percentage;
- aggressive build optimization before measurement;
- automatic affected-test selection before it is trustworthy;
- or sacrificing correctness for a benchmark.

## Initial evidence backlog

Before Sprint 11 closes, the project should have evidence for:

- clean installation from documentation;
- current local startup;
- focused validation;
- full validation;
- a synthetic first-Lantern journey;
- a controllable-clock daily workflow;
- one failed and retried durable job;
- one duplicate-delivery scenario;
- one provider-unavailable fallback;
- one correction and projection rebuild;
- and operation by someone other than the original implementation author when capacity permits.

## Review and revalidation

Review this policy when:

- workspace or package count materially grows;
- `pnpm check` repeatedly exceeds an accepted budget;
- a new mandatory service enters local development;
- a major provider or framework is selected;
- contributor setup failures become recurring;
- a critical workflow cannot be diagnosed or replayed;
- a second operator cannot reproduce the documented process;
- or an institutional phase-exit review occurs.