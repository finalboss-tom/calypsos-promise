# Sprint 7 Forge Specialist Holdpoint and Unresolved-Work Register

[Architecture index](README.md) · [Cross-contract reconciliation](forge-sprint-7-cross-contract-reconciliation.md) · [Control and evidence map](forge-sprint-7-control-and-evidence-map.md) · [Sprint 6 holdpoints](aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md) · [Sprint 5 holdpoints](../security/sprint-5-specialist-holdpoint-and-evidence-register.md) · [Completion record](../roadmap/sprint-7-completion-record.md)

- **Status:** OPEN AFTER SPRINT 7 LOCAL IMPLEMENTATION — no production or specialist holdpoint is closed by this revision
- **Reviewed implementation head:** `32492040684c2a89e32c866888f6be0888ee1279`
- **Scope:** private, remote, consequential, provider-backed, production, pilot, specialist, institutional, operational, and public-claim gates after the bounded local public/synthetic Forge implementation
- **Information boundary:** public-safe descriptions and synthetic evidence only

## Purpose

Sprint completion does not authorize a capability whose safety, legitimacy, ownership, provider, or operational evidence remains unresolved. Each holdpoint below names what it blocks, current evidence, accountable future roles, minimum closure evidence, and revalidation triggers.

A holdpoint or unresolved item may be narrowed, closed, superseded, or retired only through a versioned record preserving prior scope, evidence, decision authority, residual uncertainty, downstream consequences, and revalidation conditions.

## Status vocabulary

- **OPEN — PRODUCTION-BLOCKING:** no production protected information or consequential action may use the capability.
- **OPEN — PILOT-BLOCKING:** no real-person, real-recipient, or representative pilot may use the capability.
- **OPEN — SPECIALIST HOLDPOINT:** qualified bounded review is required before the claim or capability advances.
- **OPEN — INSTITUTIONAL GATE:** ownership, continuity, governance, funding, or administrative evidence is required.
- **OPEN — IMPLEMENTATION GATE:** local contracts or public tooling exist, but the named runtime or operating process does not.
- **OPEN — MEASUREMENT GATE:** representative performance, reliability, quality, accessibility, safety, or operational evidence is required.
- **CURRENT LOCAL PUBLIC/SYNTHETIC FLOW:** only the bounded local Forge flow may continue under explicit limitations.
- **CLOSED:** all named closure evidence and residual-risk disposition are recorded. No `HLD-S7-*` holdpoint is closed in this revision.

## Security, privacy, and authority holdpoints

### `HLD-S7-001` — Independent Forge MCP and agent-security review

- **Blocks:** production MCP, remote agents, consequential tools, and independent-security claims.
- **Inherited gates:** `HLD-S5-001`, `HLD-S5-010`, `HLD-S5-011`, `HLD-S6-001`, `HLD-S6-013`.
- **Current evidence:** internal threat inheritance, deterministic controls, adversarial public tests, and founding-steward review only.
- **Accountable future roles:** independent MCP and agent-security reviewers with security, privacy, domain, and operations owners.
- **Closure evidence:** named reviewers and conflicts, bounded scope, protocol and tool sampling, abuse cases, findings, remediation, residual risk, date, and next review.
- **Revalidate when:** tool, transport, client, agent, authority, private-data, provider, deployment, or intended use changes.
- **Disposition:** open; production-blocking; specialist holdpoint.

### `HLD-S7-002` — Privacy review for private MCP material

- **Blocks:** private Chronicle data, personal data, protected operational evidence, private logs, caches, and deletion claims.
- **Inherited gates:** `HLD-S5-002`, `HLD-S5-018`, `HLD-S5-019`, `HLD-S6-002`.
- **Current evidence:** public/synthetic classes, disclosure-minimized receipts, and source exclusions only.
- **Accountable future roles:** privacy owner and qualified privacy or data-protection reviewer.
- **Closure evidence:** inventory, purposes, recipients, regions, retention, logs, caches, rights, deletion graph, inference and re-identification review, incidents, and residual risk.
- **Revalidate when:** information class, private tool, log, cache, provider, recipient, region, retention, or deletion claim changes.
- **Disposition:** open; production-blocking; specialist holdpoint.

### `HLD-S7-003` — Production identity and House of Keys binding

- **Blocks:** remote or private tools, subject-specific reads, recipient actions, and consequential calls.
- **Inherited gates:** `HLD-S5-003`, `HLD-S5-004`, `HLD-S6-006`, `HLD-S6-013`.
- **Current evidence:** no authentication, subject, tenant, session, permission, or recipient authority exists.
- **Accountable future roles:** identity, House of Keys, application, privacy, security, and domain owners.
- **Closure evidence:** identity proofing, tenant isolation, subject derivation, delegation, fresh policy evaluation, invocation envelope, final pre-action check, cancellation, receipts, challenge path, and independent review.
- **Revalidate when:** identity provider, population, subject, recipient, action, purpose, delegation, or jurisdiction changes.
- **Disposition:** open; production-blocking; implementation gate.

### `HLD-S7-004` — Private Chronicle tool and domain mediation

- **Blocks:** private Chronicle search, write, correction, export, deletion, and derived-record actions.
- **Inherited gates:** `HLD-S5-005`, `HLD-S6-007`, `HLD-S6-013`.
- **Current evidence:** Forge is public/synthetic only and has no Chronicle dependency or authoritative invocation.
- **Accountable future roles:** Chronicle, House of Keys, MCP, application, records, privacy, and security owners.
- **Closure evidence:** private registry, exact subject and resource binding, source custody, validation, confirmation, permission, transaction, idempotency, receipts, deletion, rollback, and specialist review.
- **Revalidate when:** Chronicle schema, storage, action, source, transaction, export, deletion, or tool changes.
- **Disposition:** open; production-blocking; specialist holdpoint.

### `HLD-S7-005` — Remote MCP and session security

- **Blocks:** hosted MCP, remote clients, shared servers, internet exposure, and official remote-agent claims.
- **Inherited gates:** `HLD-S5-007`, `HLD-S5-008`, `HLD-S6-008`, `HLD-S6-013`.
- **Current evidence:** local `stdio` only; no listener, authentication, network, or remote endpoint.
- **Accountable future roles:** infrastructure, security, MCP, privacy, reliability, and operations owners.
- **Closure evidence:** authenticated transport, workload identity, client authorization, replay and downgrade controls, tenant isolation, rate limits, logging minimization, incident response, teardown, and independent review.
- **Revalidate when:** transport, deployment, client, authentication, network, region, or tenancy changes.
- **Disposition:** open; production-blocking; specialist holdpoint.

### `HLD-S7-006` — Production source and parser isolation

- **Blocks:** real documents, images, speech, camera, archives, complex imports, and broader checkout access.
- **Inherited gates:** `HLD-S5-009`, `HLD-S6-009`.
- **Current evidence:** repository-relative allowlists, traversal and symlink rejection, bounded text and JSON parsing, and synthetic tests.
- **Accountable future roles:** source-processing, security, privacy, accessibility, records, and domain owners.
- **Closure evidence:** file-type allowlists, safe decoding, expansion and size limits, quarantine, malware handling, sandboxing, patching, provenance, deletion, incidents, and isolated adversarial review.
- **Revalidate when:** file type, parser, archive, media library, source root, capture mode, or processing path changes.
- **Disposition:** open; production-blocking; specialist holdpoint.

### `HLD-S7-007` — Shell, subprocess, and dynamic-code containment

- **Blocks:** coding agents, command execution, arbitrary modules, plugins, browser automation, and general resource access.
- **Inherited gates:** `HLD-S5-011`, `HLD-S6-013`.
- **Current evidence:** explicit prohibition, static source audit, no runtime capability, and adversarial input tests.
- **Accountable future roles:** agent platform, security, sandbox, repository, and operations owners.
- **Closure evidence:** accepted capability decision, isolated execution, allowlists, image or VM provenance, quotas, network policy, secrets isolation, output handling, incident response, and independent review.
- **Revalidate when:** capability, dependency, plugin, command, runtime, resource, deployment, or client changes.
- **Disposition:** open; production-blocking; specialist holdpoint.

### `HLD-S7-008` — Network, provider, credential, and egress controls

- **Blocks:** model providers, standards APIs, GitHub mutation, hosted search, external connectors, and provider-backed tools.
- **Inherited gates:** `HLD-S5-007`, `HLD-S5-008`, `HLD-S5-024`, `HLD-S6-005`, `HLD-S6-008`.
- **Current evidence:** no network calls, provider dependency, credential path, or production endpoint.
- **Accountable future roles:** provider governance, infrastructure, security, privacy, procurement, legal, and operations owners.
- **Closure evidence:** provider-specific purpose and data review, credentials, least privilege, egress controls, terms, retention, logging, deletion, incidents, concentration, replacement, exit, and approvals.
- **Revalidate when:** provider, API, endpoint, credential, region, terms, funding, or incident changes.
- **Disposition:** open; production-blocking; specialist holdpoint.

### `HLD-S7-009` — Production resource isolation and abuse containment

- **Blocks:** sandbox claims, denial-of-service resistance, shared hosting, and production resource control.
- **Inherited gates:** `HLD-S5-017`, `HLD-S6-008`, `HLD-S6-016`.
- **Current evidence:** request and output ceilings, local per-tool concurrency, timeout, cancellation, serialized-materialization model, and public tests.
- **Accountable future roles:** infrastructure, security, reliability, performance, and operations owners.
- **Closure evidence:** process or container isolation, CPU and heap controls, filesystem and network policy, per-principal quotas, distributed rate limits, overload behavior, monitoring, abuse response, capacity tests, and independent review.
- **Revalidate when:** deployment, runtime, tenant, workload, resource profile, traffic, or service objective changes.
- **Disposition:** open; production-blocking; specialist holdpoint.

### `HLD-S7-010` — Repository mutation and maintainer actions

- **Blocks:** write tools, issue or PR mutation, commits, branches, releases, dependency updates, and maintainer automation.
- **Inherited gates:** `HLD-S5-020`, `HLD-S5-021`, `HLD-S5-023`, `HLD-S6-017`.
- **Current evidence:** no mutation capability; human-reviewed workflows remain complete.
- **Accountable future roles:** repository, release, security, governance, and maintainer owners.
- **Closure evidence:** action taxonomy, least privilege, branch controls, explicit confirmation, review separation, audit, rollback, compromise containment, rate limits, recovery, and independent review.
- **Revalidate when:** write tool, token, workflow permission, branch policy, release, maintainer, or repository transfer changes.
- **Disposition:** open; production-blocking; institutional gate.

## Interoperability, synthetic-data, and funding holdpoints

### `HLD-S7-011` — Proprietary mappings and real connectors

- **Blocks:** private mappings, provider-specific schemas, connector credentials, continuous sync, and institutional findings.
- **Inherited gates:** `HLD-S5-012`, `HLD-S5-013`, `HLD-S6-014`.
- **Current evidence:** public references, draft validator, and explicitly synthetic fixtures only.
- **Accountable future roles:** interoperability, connector, Chronicle, privacy, security, legal, clinical, vendor, and domain owners.
- **Closure evidence:** classification and custody, provider terms, mapping governance, specialist semantic review, connector identity, credentials, replay, partial sync, correction, revocation, deletion, incidents, and approvals.
- **Revalidate when:** provider, standard, guide, mapping, payload, credential, cursor, or sync changes.
- **Disposition:** open; production-blocking; specialist holdpoint.

### `HLD-S7-012` — Production synthetic-data assurance

- **Blocks:** claims of representative, privacy-safe, statistically valid, de-identified, trainable, or publishable datasets.
- **Current evidence:** deterministic small public fixtures with explicit non-representative and non-production labels.
- **Accountable future roles:** synthetic-data, privacy, statistics, research, clinical, security, and publication owners.
- **Closure evidence:** intended use, source population, privacy model, attack testing, representativeness, bias, utility, clinical plausibility, documentation, governance, publication review, and independent approval.
- **Revalidate when:** source data, population, generator, model, use, publication, or privacy claim changes.
- **Disposition:** open; production-blocking; specialist holdpoint.

### `HLD-S7-013` — Funding and infrastructure-conflict operations

- **Blocks:** funded tools, service credits, provider benefits, sponsored evaluation, paid placement, and related-party Forge work.
- **Inherited gates:** Decision 0008, `HLD-S5-024`, `HLD-S6-015`.
- **Current evidence:** anti-capture contracts and funding mutation tests; no active relationship selected.
- **Accountable future roles:** funding acceptance, provider governance, procurement, legal, finance, evaluation, and institutional owners.
- **Closure evidence:** classified relationship, public record, conflicts and recusal, evaluator independence, benefit limits, no authority or ranking control, concentration, replacement, exit, accounting and legal evidence, and challenge route.
- **Revalidate when:** funder, benefit, evaluator, provider, affiliate, related party, concentration, or enterprise relationship changes.
- **Disposition:** open; institutional gate; specialist holdpoint.

## Operations, accessibility, release, and legal holdpoints

### `HLD-S7-014` — Reliability, audit, incidents, backup, and recovery

- **Blocks:** production-service, tool-abuse, protected-log, recovery, and complete-deletion claims.
- **Inherited gates:** `HLD-S5-017`, `HLD-S5-018`, `HLD-S5-019`, `HLD-S6-016`.
- **Current evidence:** local deterministic errors, cancellation, timeout, clean exit, and no production observability.
- **Accountable future roles:** reliability, security, privacy, records, incident, and infrastructure owners.
- **Closure evidence:** service objectives, monitoring, paging, private incident system, minimized audit, retention, deletion targets, backup and restore, exercises, measured evidence, and independent review.
- **Revalidate when:** deployment, provider, audit field, retention, backup, region, incident, or deletion claim changes.
- **Disposition:** open; production-blocking; specialist holdpoint.

### `HLD-S7-015` — Accessibility and contributor operability

- **Blocks:** official setup, critical-error comprehension, direct-mode, assistive-technology, and broad usability claims.
- **Inherited gates:** `HLD-S5-016`, `HLD-S6-004`.
- **Current evidence:** concise README, deterministic commands, stable errors, and automated clean-start test.
- **Accountable future roles:** accessibility, developer experience, product, support, and affected-user reviewers.
- **Closure evidence:** keyboard and screen-reader paths where applicable, plain-language errors, cognitive and language review, low-bandwidth setup, diverse contributor testing, support path, remediation, and revalidation.
- **Revalidate when:** client UI, setup, error, documentation, input mode, language, or contributor population changes.
- **Disposition:** open; measurement gate; specialist holdpoint.

### `HLD-S7-016` — Real ecosystem compatibility and rollback

- **Blocks:** stable support claims, breaking upgrades, deprecated clients, persisted configuration, and production rollback.
- **Inherited gates:** `HLD-S6-017` and compatibility gates.
- **Current evidence:** exact-revision manifest and additive repository migrations without installed-user or production state.
- **Accountable future roles:** package, MCP, release, operations, repository, and client owners.
- **Closure evidence:** supported-version policy, deprecation notice, client matrix, persisted-state migration, rollback or forward recovery, telemetry boundaries, fixtures, release notes, and representative upgrade tests.
- **Revalidate when:** protocol, registry, schema, package, runtime, client, persisted state, or support policy changes.
- **Disposition:** open; implementation and measurement gate.

### `HLD-S7-017` — Release integrity and founder-independent continuity

- **Blocks:** official releases, hardened governance, privileged CI, external contributor scale, and durable ownership claims.
- **Inherited gates:** `HLD-S5-020`, `HLD-S5-021`, `HLD-S5-023`, `HLD-S6-017`.
- **Current evidence:** public checks, DCO, open contracts, and founder-led review only.
- **Accountable future roles:** repository, release, security, governance, succession, and future second-owner roles.
- **Closure evidence:** verified branch settings, required reviews, admin inventory, recovery, dependency policy, artifact provenance, rollback, second-owner evidence, succession, absence exercise, and public institutional record.
- **Revalidate when:** contributor volume, maintainer, repository transfer, workflow permission, release, entity, funding, or founder availability changes.
- **Disposition:** open; institutional gate.

### `HLD-S7-018` — Legal and public-claim review

- **Blocks:** compliance claims, approved hosted MCP, binding provider obligations, official-agent safety, and production terms.
- **Inherited gates:** `HLD-S5-024`, `HLD-S6-018`.
- **Current evidence:** public policies and explicit non-production claims only.
- **Accountable future roles:** legal and institutional owners with privacy, AI, consumer, trademark, security, and hosted-service specialists.
- **Closure evidence:** jurisdiction and role analysis, entity and contract decisions, consumer and privacy terms, provider duties, AI-agent obligations, incident duties, trademark and official-deployment policy, residual uncertainty, and approved public claims.
- **Revalidate when:** entity, jurisdiction, public launch, paid service, provider, agent, recipient, or brand changes.
- **Disposition:** open; specialist holdpoint.

### `HLD-S7-019` — Representative measurement

- **Blocks:** claims of exploit resistance, startup reliability, throughput, latency, cost efficiency, usability, accessibility, and contributor benefit.
- **Current evidence:** deterministic CI, local tests, and one clean-start scenario only.
- **Accountable future roles:** product research, security, reliability, performance, developer experience, finance, and independent evaluation roles.
- **Closure evidence:** representative tasks and environments, preregistered criteria, baseline comparison, failure analysis, latency and resource measurement, accessibility, cost, conflicts, independent review, publication, and revalidation plan.
- **Revalidate when:** runtime, client, task, contributor population, deployment, dependency, cost, or intended outcome changes.
- **Disposition:** open; measurement gate; specialist holdpoint.

## Unresolved implementation and decision register

### `UWR-S7-001` — Founding-steward acceptance and merge

Workstream 7.10 prepares evidence but cannot supply the human decision. Required evidence is review of the completion package and an inspectable acceptance decision through issue #54 and PR #55.

**Disposition:** pending human acceptance.

### `UWR-S7-002` — Private Chronicle MCP tools

Requires closure of `HLD-S7-002`–`004` and applicable inherited gates.

**Disposition:** deferred; production-blocking.

### `UWR-S7-003` — Remote MCP and authenticated clients

Requires `HLD-S7-003`, `005`, `009`, `014`, and `018` evidence.

**Disposition:** deferred; production-blocking.

### `UWR-S7-004` — Production isolation, quotas, and rate limiting

Requires all `HLD-S7-009` evidence.

**Disposition:** deferred; production-blocking.

### `UWR-S7-005` — Shell, browser, dynamic-code, or arbitrary-resource agents

Requires a separate accepted capability decision and all `HLD-S7-007` evidence.

**Disposition:** rejected for current scope; specialist hold.

### `UWR-S7-006` — Networked provider, GitHub, standards, search, or connector tools

Requires applicable `HLD-S7-008`, `010`, `011`, and `013` evidence.

**Disposition:** deferred; production-blocking.

### `UWR-S7-007` — Repository and release mutation tools

Requires all `HLD-S7-010` evidence.

**Disposition:** deferred; production-blocking.

### `UWR-S7-008` — Real documents, media, archives, or health records

Requires all `HLD-S7-006` evidence.

**Disposition:** deferred; production-blocking.

### `UWR-S7-009` — Protected provider and interoperability material

Requires classification, custody, purpose, access controls, legal and interoperability review, and `HLD-S7-011` evidence.

**Disposition:** rejected for current scope; specialist hold.

### `UWR-S7-010` — Production synthetic data and publication

Requires all `HLD-S7-012` evidence.

**Disposition:** deferred; production-blocking.

### `UWR-S7-011` — Independent review strategy

Requires named qualified reviewers, conflicts, scope, findings, remediation, residual risk, and next review before relevant pilot, deployment, or public claim.

**Disposition:** open specialist strategy.

### `UWR-S7-012` — Production monitoring and recovery

Requires all `HLD-S7-014` evidence.

**Disposition:** deferred; production-blocking.

### `UWR-S7-013` — Official release and second-owner continuity

Requires all `HLD-S7-017` evidence and the relevant Phase 0 institutional records.

**Disposition:** open institutional gate.

### `UWR-S7-014` — Representative measurement

Requires all `HLD-S7-015` and `019` evidence.

**Disposition:** deferred; measurement gate.

### `UWR-S7-015` — Funded or provider-supported Forge work

Requires funding classification, public records, conflicts, independence, concentration, replacement, exit, and legal or accounting evidence where applicable.

**Disposition:** open institutional gate.

### `UWR-S7-016` — Installed-client compatibility and recovery

Requires all `HLD-S7-016` evidence.

**Disposition:** deferred; implementation and measurement gate.

### `UWR-S7-017` — Aster public API review under issue #50

Forge does not import Aster and produced no concrete Aster API or validator friction. Activation requires a genuine consumer flow and named before-and-after ergonomics evidence.

**Disposition:** not triggered.

### `UWR-S7-018` — Sprint 8 Open Forge and Trust Center explanations

Requires accepted and merged Sprint 7 completion, followed by a Sprint 8 issue, execution plan, branch, accessibility evidence, status evidence, tests, and ordinary review.

**Disposition:** next sprint after acceptance; public-only.

## Public and synthetic work that may proceed after acceptance

After explicit Sprint 7 acceptance and merge, bounded public work may include:

- Sprint 8 public website work, including an honest Open Forge page and Trust Center shell;
- public documentation, source-linked search, deterministic validation, and synthetic generation through local Forge;
- additional public synthetic fixtures and validators;
- public provider-neutral evaluation design without private data or endorsement;
- ordinary non-MCP repository contribution and validation;
- public architecture, threat, assumption, decision, challenge, compatibility, migration, and correction records; and
- design prototypes that do not collect real health data, create accounts, invoke production providers, expose remote MCP, or make clinical or certification claims.

These activities remain subject to ordinary issue, pull-request, review, testing, information-handling, funding-conflict, and publication rules.

## Cross-cutting closure rules

A holdpoint or unresolved item is not closed because a contract compiles, a validator passes, a local control rejects a fixture, CI and DCO are green, the server starts cleanly, a provider offers credits, a sponsor funds work, the founding steward accepts Sprint 7, or no incident has been observed.

Closure requires the named evidence, accountable authority, residual-risk disposition, conflict record, and revalidation trigger appropriate to the capability or claim.

## Relationship to Sprint 7 acceptance

Sprint 7 may be accepted and merged while every `HLD-S7-*` holdpoint remains open because its accepted scope is a bounded local public/synthetic Forge implementation with deterministic validation, adversarial tests, compatibility, operability, and documentation evidence.

Acceptance does not waive or weaken any holdpoint. It establishes the baseline that later implementations, deployments, measurements, and reviews must satisfy.
