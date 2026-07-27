# Current Project Status

[Repository home](../../README.md) · [Documentation home](../README.md) · [Pre-Sprint 6 review](pre-sprint-6-alignment-review.md) · [Sprint sequence](sprints.md) · [Public institutional roadmap](../../ROADMAP.md) · [Governance](../../GOVERNANCE.md)

- **Institutional phase:** Phase 0 — Constitutional and open-source foundations
- **Design-to-build position:** Sprints 0–5 complete and merged; Sprint 6 next after the pre-Sprint 6 reconciliation merges
- **Reviewed baseline:** `main` at `43fb01894639e7484ab1553428e1381a0f51b32c`
- **Runtime status:** bounded public repository gateway only
- **Production health-data status:** none
- **Independent specialist review:** not established for the principal product, security, privacy, clinical, accessibility, interoperability, legal, operations, financial, or research boundaries
- **Phase 0 status:** active; exit review not yet completed

## Primary directive

> Build a compelling, trustworthy consumer experience that helps people build, understand, improve, and control their Living Chronicles; return personal value first; enable separately authorized collective benefit; and progressively transfer stewardship as evidence, safeguards, capacity, and legitimacy mature.

The player promise remains:

> **Build your Living Chronicle. Improve your health. Keep the key.**

Every implementation, provider, sponsor, institution, workflow, contributor practice, governance mechanism, and future economic system remains subordinate to that purpose.

## Current position

The repository has completed the foundation, open-source operating model, controlled vocabulary and content schemas, canonical Living Chronicle model, House of Keys permission architecture, and threat-model and security baseline.

It has also accepted three non-numbered Phase 0 institutional and architectural baselines:

- funding and sponsorship doctrine through Decision 0008;
- consumer-first and provider-independent product architecture through Decision 0010; and
- operational simplicity and durable workflows through Decision 0011.

A proposed health-data legacy and post-mortem stewardship boundary remains under review through Decision 0009. It does not alter Sprint 6 order or authorize a production succession, estate, fiduciary, archive, or post-mortem access system.

The [Pre-Sprint 6 Alignment Review](pre-sprint-6-alignment-review.md) confirms that the repository remains internally aligned and recommends beginning Sprint 6 after the reconciliation merges. It also defines the required Aster contract, authority, security, provider, memory, delayed-work, local-simulation, and non-AI-fallback handoff.

## Accepted and merged baselines

| Baseline | Merge evidence | What it establishes | What it does not establish |
| --- | --- | --- | --- |
| Sprint 0 — Warehouse and governance | repository foundation | frozen product, architecture, gameplay, lore, status, decisions, sources, assumptions, and documentation hierarchy | production product or institution |
| Sprint 1 — Open-source operating model | merged repository scaffold | monorepo, contribution, conduct, security, DCO, licensing, synthetic-only development, CI baseline | mature multi-maintainer governance or production operations |
| Sprint 2 — Controlled vocabulary and content schemas | PR #9 | versioned content contracts, canon validation, deterministic incentive boundaries, examples, minimum validation | live game engine or generated canon authority |
| Decision 0003 — Progressive Decentralization | PR #10 | founder independence, evidence-gated authority transfer, hundred-year institutional objective | a selected DAO, token, identity, voting, legal, or treasury mechanism |
| Sprint 3 — Canonical Data Model v1 | PR #14; `19c1045a24679246dae209e13c62038362c69cc1` | pre-stable Living Chronicle ontology, contracts, validation, provenance, correction, conflict, export, deletion, public synthetic fixtures | accounts, production persistence, connectors, consent enforcement, real-data ingestion, or clinical use |
| Decision 0006 — Feedback to Governed Work | merged decision and operating protocol | public-safe issue ledger, typed signals, evidence, deterministic prioritization direction, contribution and outcome loop | binding community authority during Phase 0 |
| Decision 0007 — Institutional Immune System | PR #19 | assumptions, challenge, containment, reversibility, appeal, restoration, revalidation, capture resistance | automated or independent institutional oversight |
| Sprint 4 — House of Keys Consent Architecture | PR #33; `51e94a19cc21a0da0c57f1ae3b09f57092aee8d1` | purpose and data-category taxonomies, grants, lifecycle, revocation, explanations, comprehension evidence, receipts, pure policy evaluation, public synthetic fixtures | production identity, enforcement, persistence, legal validity, or real-recipient operation |
| Pre-Sprint 5 alignment review | PR #34; `d135b2fdf79a3c2cca9bf7cad275fc454d22fa6d` | mission and incentive reconciliation, cross-contract security handoff | independent security or production-readiness certification |
| Sprint 5 — Threat Model and Security Baseline | PR #36; `4d09e8fc5b81f354c4568f97794fd9533ec68048` | threats, control objectives, residual risks, encryption and key boundaries, identity and recovery design, isolation, incident, audit, deletion procedures, synthetic abuse cases, design tabletops, specialist holdpoints | implemented, deployed, operationally verified, or independently reviewed production controls |
| Decision 0008 — Funding and Sponsorship Baseline | PR #38; `32ac27bfb35ed64f34c64108a5d54c375d429593` | funding taxonomy, prohibited purchases of authority, sponsor benefits, conflicts, public register shapes, private-source boundaries, concentration, infrastructure replacement and exit | entity, recipient, banking, payment, accounting, tax, treasury, compensation, investment, affiliate, or operating fundraising system |
| Decision 0010 — Consumer-First, Provider-Independent Product Boundary | PR #42; `188a6409de9bfc967fdb0f46bc08eb35ddfd6f9c` | person-centered continuity, provider-independent Chronicle, standards-at-the-edges mappings, institutional partnership gates, provider and sponsor neutrality | connector runtime, standards certification, provider contract, clinical workflow, enterprise product, or validated market result |
| Decision 0011 — Operational Simplicity and Durable Workflows | PR #44; `43fb01894639e7484ab1553428e1381a0f51b32c` | modular-monolith default, responsive and deferred paths, durable-work semantics, local simulation, provider isolation, operability and evidence-gated complexity | production queue, scheduler, event store, workflow engine, service topology, observability provider, local-first system, or measured performance |

## Active and proposed assumptions

### Active working hypotheses

- [AS-0012 — Consumer-First Continuity Can Create Durable Personal Value](../governance/assumption-AS-0012-consumer-first-continuity-value.md) is **ACTIVE** because it informs accepted Decision 0010 and future product and connector sequencing. Its confidence remains **WORKING HYPOTHESIS**; no real product, retention, connector, clinical, or market evidence exists.
- [AS-0013 — Operational Simplicity Can Support Durable Personal Value](../governance/assumption-AS-0013-operational-simplicity-durable-value.md) is **ACTIVE** because it informs accepted Decision 0011 and the implementation sequence. Its confidence remains **WORKING HYPOTHESIS**; no representative private runtime or operational evidence exists.

Active means the assumption currently influences design. It does not mean supported, independently reviewed, or validated.

### Proposed hypothesis

- [AS-0011 — Post-Mortem Chronicle Value](../governance/assumption-AS-0011-health-data-legacy-value.md) remains proposed with Decision 0009. It cannot justify default retention, disclosure, research use, archive publication, successor impersonation, or platform ownership.

## Implemented repository surfaces

### Applications

- [`apps/site`](../../apps/site) — bounded public repository gateway and purpose-limited signup adapter

The public site does not provide accounts, health-data capture, a private Chronicle, production House of Keys enforcement, provider or EHR connections, clinical workflows, research enrollment, enterprise services, production agents, durable workflow orchestration, legacy directives, successor access, donation checkout, sponsor intake, or financial operations.

### Packages

- [`packages/domain`](../../packages/domain) — small shared public and synthetic repository invariants
- [`packages/content-schema`](../../packages/content-schema) — content contracts, deterministic validation, graph contracts, and JSON Schema
- [`packages/health-schema`](../../packages/health-schema) — pre-stable Living Chronicle contracts, validation, and public synthetic fixtures
- [`packages/house-of-keys`](../../packages/house-of-keys) — pre-stable permission contracts, structural validation, pure policy evaluation, access receipts, and public synthetic fixtures

### Documentation and validation

- [`docs/security`](../security/README.md) — merged Sprint 5 architecture, controls, residual risk, procedures, synthetic scenarios, table exercises, reconciliation, and specialist holdpoints
- [`docs/economics`](../economics/README.md) — merged funding and sponsorship doctrine, public record contracts, fictional examples, validation, and design table exercises
- [`tools`](../../tools) — documentation-link, repository-policy, funding-register, and content validation
- `pnpm check` — formatting, documentation links, repository policy, economics, content, lint, type checking, and tests
- GitHub Actions — independent formatting and validation jobs with read-only repository content permissions in the main CI workflow

## Planned and gated surfaces

Planned surfaces are not empty placeholders and should not be created until the module-creation gate is met.

- a bounded Aster contract capability for Sprint 6
- `apps/game` for the future universal Expo experience
- `apps/api` for future modular application composition
- `apps/mcp-forge` for public documentation and synthetic contributor tools
- `apps/mcp-chronicle` for future private, user-scoped tools
- production identity, accounts, sessions, recovery, delegation, capacity, and representative authority
- production Chronicle persistence, source custody, attachments, exports, deletion, and backups
- production House of Keys orchestration, enforcement, receipts, and protected audit
- command, event, job, projection, queue, scheduler, replay, observability, and workflow runtime
- AI provider, model gateway, retrieval, vector indexing, and production memory systems
- standards registries, mappings, connectors, provider, EHR, payer, laboratory, pharmacy, device, exchange, clinical, and enterprise systems
- analytics and research environments
- notifications and communication systems
- legacy directive, incapacity, estate, fiduciary, successor, archive, research-release, and post-mortem deletion systems
- funding receipt, payment, banking, accounting, expenditure, treasury, compensation, procurement, contracting, and financial reporting

## Authority and domain boundaries

### Living Chronicle

The Living Chronicle owns longitudinal records, values, temporal assertions, source provenance, correction, conflict, supersession, source artifacts, export, and deletion contracts.

It does not own:

- account authentication or identity proofing;
- purpose-specific permission grants;
- access-policy decisions;
- access receipts or protected operational audit;
- quest progression or narrative state;
- research enrollment or compensation;
- provider selection;
- AI-provider behavior, prompts, conversational memory, or model logs; or
- delayed-work orchestration.

### House of Keys

The House of Keys owns purpose-specific permission truth. It accepts explicit facts and returns inspectable `allow`, `deny`, or `indeterminate` decisions.

It does not authenticate actors, execute operations, mutate grants, create Chronicle truth, consume authority, issue production receipts, or convert model confidence into permission.

### Aster

Aster remains an interaction layer.

Aster may draft, clarify, retrieve authorized information, explain provenance and uncertainty, route, and phrase approved narrative behavior.

Aster may not:

- write directly to canonical records;
- change permissions;
- complete quests without deterministic domain evidence;
- delete records;
- enroll a person in research;
- transfer money;
- query a database through arbitrary SQL;
- invent clinical conclusions;
- grant tool authority;
- or treat provider, retrieval, or conversational output as canonical truth.

The frozen transaction rule remains:

> AI proposes. The player confirms. The domain service validates and stores.

## Security control and evidence status

Sprint 5 distinguishes:

- required controls;
- designed controls;
- controls with public synthetic evidence;
- independently reviewed controls;
- implemented controls;
- deployed controls;
- operationally verified controls; and
- deferred, rejected, retired, or not-applicable controls.

These statuses do not collapse into one score. A designed or synthetically tested control is not deployed. Founding-steward review is not independent specialist review.

The repository currently has no named independent security reviewer. This remains an explicit holdpoint.

Security cannot become a reason to pressure people into broader collection, longer retention, wider access, optional analytics, model training, research participation, public visibility, or surrender of correction, export, deletion, refusal, accessibility, or non-AI fallback.

## Funding and institutional relationship status

The Phase 0 funding baseline defines doctrine and public record contracts. It does not accept or operate money.

The project currently has no accepted repository record establishing:

- a legal recipient or fiscal sponsor;
- charitable or nonprofit status;
- tax deductibility;
- a bank or payment processor;
- accounting or treasury operation;
- compensation or investment instruments;
- active sponsor, grant, provider, connector, affiliate, research-funding, or enterprise relationships; or
- production financial controls.

Funding cannot purchase data, private access, research authority, health influence, product authority, source rank, provider defaults, connector placement, roadmap control, governance power, favorable findings, safety exceptions, game progression, or publication control.

## Open-source operating assessment

### Baseline strengths

The repository has:

- a canonical documentation entry point and authority order;
- frozen foundations and decision records;
- synthetic-only public development;
- public issue intake and private security, privacy, and conduct routes;
- DCO certification;
- pull-request review and squash-merge policy;
- a comprehensive contribution guide and pull-request template;
- explicit module ownership, public API, dependency direction, and decomposition criteria;
- pinned Node and pnpm expectations and a committed lockfile;
- credential-free ordinary development;
- independent CI checks;
- dependency, service, provider, funding, replacement, rollback, and publication review rules;
- an assumption registry and challenge mechanism; and
- progressive authority-transfer and founder-exit constraints.

### Evidence still missing

The repository does not yet evidence:

- administrative branch protection and required-check configuration;
- commit-level DCO enforcement;
- distributed code ownership backed by qualified second owners;
- signed releases;
- clean-machine and second-operator setup;
- accepted install, startup, focused-test, package-test, and full-validation budgets;
- implemented production incident, observability, backup, recovery, deletion, migration, or provider-replacement operation;
- or mature multi-maintainer release and succession capacity.

An owner-only CODEOWNERS file would not reduce key-person dependency. Code-owner enforcement should begin when a qualified second owner or bounded specialist group can actually provide review.

## Next design-to-build boundary

### Sprint 6 — Aster contracts and AI governance

Sprint 6 remains next.

**Goal:** Convert Aster from a concept into enforceable interfaces.

It must inherit:

- the Product Constitution, frozen Aster transaction rule, controlled vocabulary, and gameplay boundaries;
- Living Chronicle source, provenance, uncertainty, correction, conflict, export, deletion, and authoritative-record rules;
- House of Keys purpose, scope, freshness, confirmation, revocation, receipt, and fail-closed rules;
- Sprint 5 prompt-injection, untrusted-input, retrieval, memory, provider-egress, non-AI-fallback, evidence-status, residual-risk, and specialist-holdpoint boundaries;
- Decision 0008 model-credit, sponsor, affiliate, related-party, provider-neutrality, benchmark, publication, replacement, and conflict rules;
- Decision 0010 source-class, implementation-guide, mapping, provenance, institutional-source, provider-neutrality, and non-canonical external-schema rules; and
- Decision 0011 responsive-versus-deferred, timeout, cancellation, retry, duplicate, stale-output, provider-unavailable, local-simulation, and complete manual-fallback rules.

The [Pre-Sprint 6 Alignment Review](pre-sprint-6-alignment-review.md) adds execution-plan clarifications for:

- a bounded pre-stable Aster contract package rather than expansion of Chronicle truth;
- Scribe, Librarian, Wayfinder, Interpreter, and Storykeeper authority matrices;
- a structured proposal envelope;
- exact confirmation and domain-validation stages;
- intent, confidence, clarification, ambiguity, and refusal;
- source-linked recall and retrieval freshness;
- visible, editable, exportable, deletable memory classes;
- prompt-injection and untrusted-input isolation;
- responsive and deferred result classification;
- stable delayed-operation identity, timeout, cancellation, retry, duplicate, supersession, and stale-result behavior;
- a deterministic local or synthetic adapter;
- complete non-AI and manual core paths;
- provider-egress and funding-conflict governance;
- compatibility and migration requirements;
- public synthetic fixtures and tests;
- security-control and specialist-holdpoint mapping; and
- a completion record that separates contract evidence from implementation, deployment, independent review, and production readiness.

Sprint 6 does not select or endorse a production AI provider, EHR, connector, clinical partner, queue, scheduler, workflow engine, event store, vector database, model gateway, cloud, or enterprise relationship.

## Sprint 6 entry conditions

Before implementation begins:

1. merge the pre-Sprint 6 reconciliation;
2. open a dedicated Sprint 6 issue with workstreams and acceptance evidence;
3. publish a Sprint 6 execution plan linked to the accepted roadmap and this status record;
4. create a focused branch and draft pull request;
5. use public or synthetic information only;
6. keep production and specialist-review holdpoints explicit; and
7. preserve all accepted non-scope and rollback boundaries.

## Institutional Phase 0 gate assessment

### Core foundations are internally consistent

**Status:** baseline met, subject to future evidence and specialist review.

The Product Constitution, Vision, Architecture Foundation, Gameplay Foundation, Living Chronicle, House of Keys, security baseline, funding baseline, consumer-first boundary, operational-simplicity boundary, progressive-decentralization mandate, and Institutional Immune System are internally compatible.

### Repository controls meet minimum viable validation

**Status:** baseline met; administrative and operational evidence incomplete.

The repository has one full validation command, package-focused commands, independent CI checks, synthetic-only contribution rules, DCO certification, documentation-link validation, repository policy, funding-record validation, content validation, tests, and explicit public/private boundaries.

Branch-protection evidence, commit-level DCO, clean-machine measurements, accepted timing budgets, second-operator evidence, and production operations remain pending.

### Material decisions no longer live only in private notes or chat

**Status:** substantially met.

Principal product, architecture, incentive, governance, security, publication, public-domain, Chronicle, House of Keys, funding, consumer-first, provider-independent, operational-simplicity, and legacy-succession intent are committed in repository records.

Historical HealthDAO, CureDAO, and earlier Calypso’s Promise governance sources still need recovery, classification, and reviewed migration.

### Progressive decentralization is accepted as an architectural constraint

**Status:** met.

The Vision, Governance Baseline, Public Institutional Roadmap, frozen-foundations register, and Decision 0003 establish the constraint.

## Remaining Phase 0 closure work

Before institutional Phase 0 is declared complete, the project must publish and review:

1. an initial key-person dependency register;
2. a succession and emergency-recovery ownership map for institutional roles, repositories, releases, domains, critical accounts, private reporting, signing, infrastructure, and future financial systems;
3. an inventory of founder-reserved powers with scope, justification, review date, transfer, removal, and sunset conditions;
4. the recovered historical HealthDAO, CureDAO, and Calypso’s Promise governance-source catalogue;
5. evidence that required branch protections, checks, review rules, administrative permissions, and emergency paths are configured;
6. a decision and implementation path for commit-level DCO enforcement when external contribution volume warrants it;
7. an initial founder-subsidy and economic-dependency register using public-safe categories, responsible owners, replacement conditions, and private-source boundaries;
8. baseline measurements for clean installation, current local startup, focused validation, package tests, and full validation before numeric operability gates are accepted;
9. an ownership and review plan for CODEOWNERS or equivalent distributed responsibility when qualified second maintainers and specialist groups exist;
10. explicit review, revision, acceptance, or decline of proposed Decision 0009 and its companion records when appropriate;
11. a named specialist-review strategy and truthful interim holdpoints across security, privacy, accessibility, clinical, interoperability, legal, operations, financial, and research domains; and
12. an explicit Phase 0 exit review identifying unresolved risks, owners, conflicts, dependencies, evidence, containment, rollback, and revalidation conditions.

These are governance, resilience, evidence, and ownership requirements. They do not require a token, treasury, identity system, broad vote, legal wrapper, payment rail, production queue, production provider, enterprise contract, or production estate workflow prematurely.

## Deferred implementation boundary

The repository does not currently select or implement:

- production database topology, event store, queue, scheduler, workflow engine, consistency model, cache, migration runner, or observability provider;
- production accounts, authentication, identity proofing, delegation, recovery, incapacity, estate, fiduciary, or successor authority;
- cloud, storage, model, analytics, document-processing, connector, archive, verification, notification, or research providers;
- exact FHIR, US Core, USCDI, SMART, bulk-data, terminology, imaging, claims, clinical-document, or proprietary connector choices;
- provider-facing summaries, care collaboration, clinical workflows, enterprise tenancy, procurement, contracting, B2B, or B2C operation;
- real health-data ingestion or real connector rollout;
- real recipients, research enrollment, compensation, affiliate, investment, donation, sponsorship, treasury, payment, or financial operation;
- production Legacy Directives, post-mortem access, research release, archive publication, or deletion execution; or
- production AI memory, model training, arbitrary agent access, or clinical decision support.

Documentation, contracts, synthetic fixtures, design tabletops, and CI passing do not activate those capabilities.

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