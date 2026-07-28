# Current Project Status

[Repository home](../../README.md) · [Documentation home](../README.md) · [Sprint 7 plan](sprint-7-execution-plan.md) · [Forge boundary](../architecture/forge-mcp-boundary-and-tool-registry.md) · [Local transport](../architecture/forge-mcp-local-stdio-transport.md) · [Source catalogue](../architecture/forge-mcp-source-catalogue-and-provenance.md) · [Lore and schema tools](../architecture/forge-mcp-lore-and-schema-tools.md) · [Architecture and decision tools](../architecture/forge-mcp-architecture-and-decision-tools.md) · [Standards, mapping, and synthetic connectors](../architecture/forge-mcp-public-standards-mapping-and-synthetic-connectors.md) · [Public standards boundary](../standards/README.md) · [Pre-Sprint 7 review](pre-sprint-7-alignment-review.md) · [Sprint 6 completion](sprint-6-completion-record.md) · [Sprint sequence](sprints.md) · [Public institutional roadmap](../../ROADMAP.md) · [Governance](../../GOVERNANCE.md)

- **Institutional phase:** Phase 0 — Constitutional and open-source foundations
- **Design-to-build position:** Sprints 0–6 and the pre-Sprint 7 reconciliation complete and merged; Sprint 7 active
- **Merged baseline:** `main` at pre-Sprint 7 reconciliation squash commit `a41ca5ad9d2c0fe8a009946f376705bb7910e223`
- **Active implementation surface:** issue #54, branch `agent/sprint-7-forge-mcp`, and draft PR #55
- **Completed Sprint 7 workstreams:** 7.1 — Forge boundary and registry; 7.2 — local transport; 7.3 — source catalogue and provenance; 7.4 — lore and schema tools; 7.5 — architecture and decision tools
- **Implemented with final status-head validation pending:** 7.6 — standards and synthetic connector fixtures
- **Next unstarted workstream:** 7.7 — synthetic generation
- **Runtime status:** local Forge `stdio` transport, server-owned allowlisted source core, runtime registry revision `3`, and exactly nine enabled read-only or validation tools; `forge.generate.synthetic-data` remains planned and unexposed
- **Production health-data status:** none
- **Production AI, connector, or private MCP status:** none
- **Independent specialist review:** not established for the principal product, AI, MCP, security, privacy, clinical, accessibility, interoperability, legal, operations, financial, or research boundaries
- **Phase 0 status:** active; exit review not yet completed

## Primary directive

> Build a compelling, trustworthy consumer experience that helps people build, understand, improve, and control their Living Chronicles; return personal value first; enable separately authorized collective benefit; and progressively transfer stewardship as evidence, safeguards, capacity, and legitimacy mature.

The player promise remains:

> **Build your Living Chronicle. Improve your health. Keep the key.**

Every implementation, provider, sponsor, institution, workflow, contributor practice, governance mechanism, and future economic system remains subordinate to that purpose.

## Current position

The repository has completed and merged:

- the frozen product, architecture, gameplay, lore, and governance foundations;
- the open-source operating model;
- controlled vocabulary, content schemas, and deterministic incentive boundaries;
- the pre-stable Living Chronicle contract baseline;
- the pre-stable House of Keys permission baseline;
- the threat-model and security design baseline;
- the funding and sponsorship doctrine;
- the consumer-first and provider-independent boundary;
- the operational-simplicity and durable-workflow boundary;
- the pre-Sprint 6 repository reconciliation; and
- Sprint 6 — Aster Contracts and AI Governance.

Sprint 6 merged through PR #48 as squash commit `5aa3540765e5573f3304ce2b624d7a02c3ba2d13`. It establishes public provider-independent Aster contracts, deterministic validators, public synthetic fixtures, provider governance, local substitution, non-AI fallbacks, compatibility, migration, control mapping, specialist holdpoints, unresolved-work records, and completion evidence.

Sprint 6 does not activate production AI, private health data, provider calls, retrieval, memory storage, identity, permission orchestration, persistence, durable execution, MCP tools, connectors, clinical behavior, deployment, or specialist certification.

The [Pre-Sprint 7 Alignment Review](pre-sprint-7-alignment-review.md) merged through PR #52 as squash commit `a41ca5ad9d2c0fe8a009946f376705bb7910e223`.

Sprint 7 is active through issue #54 and draft PR #55. Workstreams 7.1–7.6 now define the Forge application boundary, accepted and runtime registries, finalized local `stdio` transport, server-owned source catalogue, exact allowlists, path and symlink isolation, SHA-256 provenance, deterministic search, public content and quest validation, fixed quest-schema inspection, architecture and decision search, conservative authority classification, public standards search, mapping-draft validation, synthetic connector-fixture search, public-safe errors, non-authority, validators, and public tests.

Runtime registry revision `3` exposes exactly nine accepted tool identities through local `stdio`. The tenth accepted identity, `forge.generate.synthetic-data`, remains planned and unexposed for Sprint 7.7.

A proposed health-data legacy and post-mortem stewardship boundary remains under review through Decision 0009. It does not authorize a production succession, estate, fiduciary, archive, research-release, or post-mortem access system.

## Accepted and merged baselines

| Baseline                                                      | Merge evidence                                     | What it establishes                                                                                                                                                                                        | What it does not establish                                                                                                                                                              |
| ------------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sprint 0 — Warehouse and Governance                           | repository foundation                              | frozen product, architecture, gameplay, lore, status, decisions, sources, assumptions, and documentation hierarchy                                                                                         | production product or institution                                                                                                                                                       |
| Sprint 1 — Open-Source Operating Model                        | merged repository scaffold                         | monorepo, contribution, conduct, security, DCO, licensing, synthetic-only development, and CI baseline                                                                                                     | mature multi-maintainer governance or production operations                                                                                                                             |
| Sprint 2 — Controlled Vocabulary and Content Schemas          | PR #9                                              | versioned content contracts, canon validation, deterministic incentive boundaries, examples, and minimum validation                                                                                        | live game engine or generated canon authority                                                                                                                                           |
| Decision 0003 — Progressive Decentralization                  | PR #10                                             | founder independence, evidence-gated authority transfer, and hundred-year institutional objective                                                                                                          | selected DAO, token, identity, voting, legal, or treasury mechanism                                                                                                                     |
| Sprint 3 — Canonical Data Model v1                            | PR #14; `19c1045a24679246dae209e13c62038362c69cc1` | pre-stable Living Chronicle ontology, contracts, validation, provenance, correction, conflict, export, deletion, and public synthetic fixtures                                                             | accounts, production persistence, connectors, permission enforcement, real-data ingestion, or clinical use                                                                              |
| Decision 0006 — Feedback to Governed Work                     | merged decision and operating protocol             | public-safe issue ledger, typed signals, evidence, deterministic prioritization direction, contribution, outcome, and learning loop                                                                        | binding community authority during Phase 0                                                                                                                                              |
| Decision 0007 — Institutional Immune System                   | PR #19                                             | assumptions, challenge, containment, reversibility, appeal, restoration, revalidation, and capture resistance                                                                                              | automated or independent institutional oversight                                                                                                                                        |
| Sprint 4 — House of Keys Consent Architecture                 | PR #33; `51e94a19cc21a0da0c57f1ae3b09f57092aee8d1` | purpose and data-category taxonomies, grants, lifecycle, revocation, explanations, comprehension evidence, receipts, pure evaluation, and public synthetic fixtures                                        | production identity, enforcement, persistence, legal validity, or real-recipient operation                                                                                              |
| Sprint 5 — Threat Model and Security Baseline                 | PR #36; `4d09e8fc5b81f354c4568f97794fd9533ec68048` | threats, controls, residual risks, isolation, encryption and key boundaries, recovery, incident, audit, deletion procedures, synthetic abuse cases, design tabletops, and specialist holdpoints            | implemented, deployed, operationally verified, or independently reviewed production controls                                                                                            |
| Decision 0008 — Funding and Sponsorship Baseline              | PR #38; `32ac27bfb35ed64f34c64108a5d54c375d429593` | funding taxonomy, prohibited purchases of authority, sponsor benefits, conflicts, public records, concentration, replacement, and exit                                                                     | entity, banking, payment, accounting, tax, treasury, compensation, investment, affiliate, or operating fundraising system                                                               |
| Decision 0010 — Consumer-First, Provider-Independent Boundary | PR #42; `188a6409de9bfc967fdb0f46bc08eb35ddfd6f9c` | person-centered continuity, provider-independent Chronicle, standards-at-the-edges mappings, partnership gates, and provider and sponsor neutrality                                                        | connector runtime, standards certification, provider contract, clinical workflow, enterprise product, or validated market result                                                        |
| Decision 0011 — Operational Simplicity and Durable Workflows  | PR #44; `43fb01894639e7484ab1553428e1381a0f51b32c` | modular-monolith default, responsive and deferred paths, durable-work semantics, local simulation, provider isolation, operability, and evidence-gated complexity                                          | production queue, scheduler, event store, workflow engine, service topology, observability provider, local-first system, or measured performance                                        |
| Pre-Sprint 6 Alignment Review                                 | PR #46; `4dfd39e7aa02ffe1ef3f5ba296378b29bd078047` | repository-wide mission, incentive, architecture, provider, funding, workflow, and Aster handoff reconciliation                                                                                            | Sprint 6 implementation, production readiness, or specialist review                                                                                                                     |
| Sprint 6 — Aster Contracts and AI Governance                  | PR #48; `5aa3540765e5573f3304ce2b624d7a02c3ba2d13` | pre-stable Aster authority, role, proposal, intent, recall, memory, untrusted-input, work, provider, local-fixture, compatibility, migration, validator, test, control, holdpoint, and completion baseline | production AI, private egress, provider approval, identity, persistence, retrieval, memory storage, durable runtime, tools, connectors, clinical use, deployment, or independent review |
| Pre-Sprint 7 Repository Alignment Review                      | PR #52; `a41ca5ad9d2c0fe8a009946f376705bb7910e223` | post-Sprint 6 status reconciliation and bounded Forge MCP implementation handoff                                                                                                                           | Sprint 7 implementation, remote MCP, private data, provider selection, production tools, or specialist approval                                                                         |

## Active Sprint 7 implementation

| Workstream                                   | Evidence                                                                                                                                                                                            | Purpose                                                                                                                                                                                                                                      | What it does not establish                                                                                                                                                           |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Sprint 7.1 — Forge boundary and registry     | issue #54; draft PR #55; [plan](sprint-7-execution-plan.md); [architecture](../architecture/forge-mcp-boundary-and-tool-registry.md)                                                                | application ownership, public source classes, server-owned registry, risk classes, planned tools, prohibitions, validators, and public tests                                                                                                 | MCP transport, repository reads, enabled tools, remote hosting, private data, mutation, provider calls, or production readiness                                                     |
| Sprint 7.2 — Local transport                 | issue #54; draft PR #55; [transport](../architecture/forge-mcp-local-stdio-transport.md)                                                                                                            | finalized-version local `stdio`, initialization, empty inert-session discovery, cancellation, shutdown, framing, errors, direct harness, and tests                                                                                           | repository reads by inert sessions, source provenance, remote hosting, private data, providers, or production readiness                                                             |
| Sprint 7.3 — Source catalogue and provenance | issue #54; draft PR #55; [source architecture](../architecture/forge-mcp-source-catalogue-and-provenance.md)                                                                                        | server-owned roots, exact allowlists, path and symlink isolation, digests, locators, deterministic listing, truncation, errors, and tests                                                                                                    | arbitrary filesystem access, caller-selected roots, search behavior, validation execution, generation, or authority                                                                 |
| Sprint 7.4 — Lore and schema tools           | issue #54; draft PR #55; [tool architecture](../architecture/forge-mcp-lore-and-schema-tools.md); CI run 767; DCO run 832                                                                           | exact four-tool runtime activation, source-linked lore search, deterministic public content and quest validation, fixed quest-schema inspection, transport gating, non-authority, and tests                                                  | architecture or decision search, standards search, mapping validation, generation, private data, mutation, remote hosting, clinical claims, canon, rewards, or power               |
| Sprint 7.5 — Architecture and decision tools | issue #54; draft PR #55; [tool architecture](../architecture/forge-mcp-architecture-and-decision-tools.md); final head `fc2f11c72e21aef573f6c1212880aed4cffb47f1`; CI run 801; DCO run 870          | exact six-tool runtime activation, architecture and decision search, exact line and authority-evidence provenance, conservative status classes, ambiguous-record fail-closed behavior, instruction isolation, and tests                      | standards or connector search, mapping validation, generation, receipts, production limits, private data, mutation, remote hosting, or institutional authority                     |
| Sprint 7.6 — Standards and connector fixtures | issue #54; draft PR #55; [tool architecture](../architecture/forge-mcp-public-standards-mapping-and-synthetic-connectors.md); functional CI run 815; DCO run 885                                    | runtime revision `3`, nine enabled tools, source-linked public standards search, strict draft mapping validation, explicit synthetic-only connector search, non-authority, public fixtures, and adversarial tests                              | synthetic generation, network access, provider endpoints, connector execution, proprietary mappings, certification, semantic approval, production readiness, or institutional power |

## Active and proposed assumptions

### Active working hypotheses

- [AS-0012 — Consumer-First Continuity Can Create Durable Personal Value](../governance/assumption-AS-0012-consumer-first-continuity-value.md) remains **ACTIVE** and **WORKING HYPOTHESIS**. No real product, retention, connector, clinical, or market evidence exists.
- [AS-0013 — Operational Simplicity Can Support Durable Personal Value](../governance/assumption-AS-0013-operational-simplicity-durable-value.md) remains **ACTIVE** and **WORKING HYPOTHESIS**. No representative private runtime or operational evidence exists.

Active means the assumption currently influences design. It does not mean supported, independently reviewed, or validated.

### Proposed hypothesis

- [AS-0011 — Post-Mortem Chronicle Value](../governance/assumption-AS-0011-health-data-legacy-value.md) remains proposed with Decision 0009. It cannot justify default retention, disclosure, research use, archive publication, successor impersonation, or platform ownership.

## Implemented repository surfaces

### Applications

- [`apps/site`](../../apps/site) — bounded public repository gateway and purpose-limited signup adapter
- [`apps/mcp-forge`](../../apps/mcp-forge) — active Sprint 7 local `stdio` contributor-tool application with nine server-owned public or synthetic search and validation tools

The public site does not provide accounts, health-data capture, a private Chronicle, production House of Keys enforcement, production Aster, private MCP, provider or EHR connections, clinical workflows, research enrollment, enterprise services, durable workflow orchestration, legacy directives, successor access, donation checkout, sponsor intake, or financial operations.

Forge does not provide network access, a provider client, production connectors, certification, mapping approval, private data, repository mutation, or consequential domain actions.

### Packages

- [`packages/domain`](../../packages/domain) — small shared public and synthetic repository invariants
- [`packages/content-schema`](../../packages/content-schema) — content contracts, deterministic validation, graph contracts, and JSON Schema
- [`packages/health-schema`](../../packages/health-schema) — pre-stable Living Chronicle contracts, validation, and public synthetic fixtures
- [`packages/house-of-keys`](../../packages/house-of-keys) — pre-stable permission contracts, structural validation, pure policy evaluation, access receipts, and public synthetic fixtures
- [`packages/aster`](../../packages/aster) — merged pre-stable provider-independent Aster contracts, validators, public synthetic fixtures, compatibility, migration, and completion evidence

`packages/aster` has no production provider, network, database, credential, UI, queue, scheduler, workflow, event-store, or vector-database dependency.

### Documentation and validation

- [`docs/security`](../security/README.md) — merged Sprint 5 architecture, controls, residual risks, procedures, synthetic scenarios, design tabletops, reconciliation, and specialist holdpoints
- [`docs/architecture`](../architecture/README.md) — architecture, merged Aster contracts, and active Forge boundary, transport, source, lore, schema, architecture, decision, standards, mapping, and synthetic-fixture contracts
- [`docs/standards`](../standards/README.md) — public reference boundary and public mapping-draft examples; no certification or production connector claims
- [`docs/economics`](../economics/README.md) — merged funding and sponsorship doctrine, public record contracts, fictional examples, validation, and design tabletops
- [`fixtures/connectors`](../../fixtures/connectors) — explicitly synthetic, non-production, credential-free, personal-data-free connector examples
- [`tools`](../../tools) — documentation-link, repository-policy, funding-register, and content validation
- `pnpm check` — formatting, documentation links, repository policy, economics, content, lint, type checking, and tests
- GitHub Actions — independent formatting and validation jobs with read-only repository content permissions in the main CI workflow

## Planned and gated surfaces

Planned surfaces are not empty placeholders and should not be created until the module-creation gate is met.

- `forge.generate.synthetic-data` for Sprint 7.7 reproducible synthetic generation
- `apps/game` for the future universal Expo experience
- `apps/api` for future modular TypeScript application
- `apps/mcp-chronicle` for future private, user-scoped tools
- production identity, accounts, sessions, recovery, delegation, capacity, and representative authority
- production Chronicle persistence, source custody, attachments, exports, deletion, backups, and migrations
- production House of Keys orchestration, enforcement, receipts, and protected audit
- command, event, job, projection, queue, scheduler, replay, observability, and workflow runtime
- production AI provider, model gateway, retrieval, vector indexing, memory storage, media processing, and provider administration
- production standards registries, approved mappings, connectors, provider, EHR, payer, laboratory, pharmacy, device, exchange, clinical, and enterprise systems
- analytics and research environments
- notifications and communication systems
- legacy directive, incapacity, estate, fiduciary, successor, archive, research-release, and post-mortem deletion systems
- funding receipt, payment, banking, accounting, expenditure, treasury, compensation, procurement, contracting, and financial reporting

## Authority and domain boundaries

### Living Chronicle

The Living Chronicle owns longitudinal records, values, temporal assertions, source provenance, correction, conflict, supersession, source artifacts, export, and deletion contracts.

It does not own authentication, permission, receipts, gameplay, research enrollment, provider selection, AI behavior, MCP tools, model logs, retrieval indexes, product memory, mappings, connectors, or delayed-work orchestration.

### House of Keys

The House of Keys owns purpose-specific permission truth. It accepts explicit facts and returns inspectable `allow`, `deny`, or `indeterminate` decisions.

It does not authenticate actors, execute operations, mutate grants, create Chronicle truth, consume authority, issue production receipts, or convert model or tool confidence into permission.

### Aster

Aster owns public proposal, explanation, player-controlled memory, untrusted-input, work-lifecycle, provider-governance, local-fixture, compatibility, and migration contracts.

Aster may draft, clarify, recall source-linked information, explain provenance and uncertainty, route, and prepare narrative presentation.

Aster cannot write canonical records, create permission, confirm itself, invoke authoritative actions, complete quests, grant rewards, diagnose, retain hidden material memory, let untrusted content choose authority, or treat model, provider, retrieval, fixture, compatibility, migration, or CI output as truth.

The frozen transaction rule remains:

> AI proposes. The player confirms. The domain service validates and stores.

### Forge MCP

Sprint 7 currently exposes exactly nine bounded public or synthetic contributor tools through a server-owned local `stdio` runtime. `forge.generate.synthetic-data` remains planned and unexposed.

Forge MCP is not the repository database, a general shell, a repository mutation agent, a private Chronicle service, a House of Keys service, a standards authority, a mapping authority, a provider gateway, a connector runtime, or an institutional authority.

Retrieved, supplied, or generated content cannot register tools, alter risk classes, expand source access, invoke arbitrary resources, elevate its own authority, approve mappings, claim certification, select providers, create canon, write Chronicle truth, change permission, complete gameplay, grant rewards, or create governance authority.

## Active Sprint 7 boundary

Sprint 7 is active through issue #54 and draft PR #55. Workstreams 7.1–7.6 are implemented; the final combined 7.6 status-head validation is pending. Sprint 7.7 is next and has not started.

**Goal:** Provide useful agent tooling without private health-data risk.

Sprint 7 must preserve:

- one bounded local `stdio` Forge application;
- public documentation and synthetic data only;
- explicit allowlisted repository roots and prohibited paths;
- server-owned tool identity, revision, schemas, risk classes, scopes, and limits;
- no arbitrary repository mutation, shell execution, module loading, network access, private-data access, provider call, connector execution, or consequential action;
- deterministic validation and source-linked results;
- draft-only mappings and clearly labeled synthetic output;
- public-safe receipts and stable errors;
- compatibility and migration rules;
- provider, funding, sponsor, and publication independence;
- complete non-MCP contributor paths; and
- every open production and specialist holdpoint.

Issue #50 remains trigger-based. It activates only if a real Forge or other repository consumer uses the Aster public surface and records concrete ergonomics evidence.

## Funding and institutional relationship status

The funding baseline defines doctrine and public record contracts. It does not accept or operate money.

The project currently has no accepted repository record establishing an operating legal recipient, tax-deductible status, bank, payment processor, accounting or treasury operation, compensation or investment instrument, active sponsor, provider, connector, affiliate, research-funding, or enterprise relationship.

Funding cannot purchase data, private access, research authority, health influence, product authority, source rank, tool authority, provider defaults, connector placement, mapping approval, certification outcomes, roadmap control, governance power, favorable findings, safety exceptions, compatibility outcomes, game progression, or publication control.

## Open-source operating assessment

The repository has a credible Phase 0 baseline: frozen foundations, accepted decisions, synthetic-only public development, public issue intake and private reporting routes, DCO, pull-request review, squash merge, module boundaries, pinned tooling, credential-free development, independent CI, provider and funding review, compatibility and migration rules, assumptions, and progressive authority-transfer constraints.

Still missing are verified branch settings, commit-level DCO, distributed ownership, signed releases, clean-machine and second-operator evidence, accepted operability budgets, production operations, and mature succession capacity.

An owner-only CODEOWNERS file would not reduce key-person dependency. Code-owner enforcement should begin when qualified second owners or specialist groups can provide real review.

## Remaining Phase 0 closure work

Before institutional Phase 0 is complete, the project still requires key-person and succession records, founder-reserved-power and economic-dependency records, historical governance-source recovery, branch-protection evidence, DCO transition, clean-machine measurements, distributed ownership planning, Decision 0009 disposition, a named specialist-review strategy, and an explicit Phase 0 exit review.

These gates do not require a token, treasury, identity system, broad vote, legal wrapper, payment rail, production queue, production provider, enterprise contract, or production estate workflow prematurely.

## Deferred implementation boundary

The repository does not currently select or implement production databases, queues, schedulers, workflow engines, observability, identity, providers, connectors, real health-data ingestion, research enrollment, financial operations, legacy systems, production AI memory, private retrieval, arbitrary agent access, or clinical decision support.

Documentation, contracts, synthetic fixtures, mapping drafts, design tabletops, completion records, local public tools, and CI passing do not activate those capabilities.

## Status rule

A capability or control must remain labeled according to evidence:

- **LIVE** only when available in the official product under current release and operational controls;
- **EXPERIMENTAL** only when available to a bounded audience with explicit uncertainty;
- **PLANNED** when accepted but unavailable;
- **LONG-HORIZON** when part of the vision without a committed release;
- **DEFERRED** when intentionally excluded pending named gates;
- **FROZEN** for protected foundations;
- **BASELINE** for accepted Phase 0 direction; and
- **PROPOSED** for reviewable direction not yet accepted.

A merged document may still describe a proposed future capability. An accepted doctrine may still have no runtime. A completed sprint may still have no independent review. Status must describe what the evidence proves, not what the project hopes to build.
