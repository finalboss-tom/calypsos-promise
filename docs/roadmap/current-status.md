# Current Project Status

[Documentation home](../README.md) · [Roadmap index](README.md) · [Institutional roadmap](../../ROADMAP.md) · [Sprint sequence](sprints.md) · [Funding baseline](../economics/README.md) · [Consumer-first boundary](../decisions/0010-consumer-first-provider-independent-boundary.md) · [Legacy stewardship proposal](../decisions/0009-health-data-legacy-and-post-mortem-stewardship.md) · [Sprint 5 completion](sprint-5-completion-record.md) · [Security architecture](../security/README.md)

**Status date:** 2026-07-27  
**Institutional phase:** Phase 0 — Constitutional and open-source foundations  
**Design-to-build sequence:** Sprints 0–5 and the Phase 0 Funding and Sponsorship Baseline are complete and merged; Sprint 6 — Aster contracts and AI governance is next  
**Proposed institutional design:** Decision 0009 and Decision 0010, with their companion legacy, consumer-first, provider-independent, interoperability, assumption, website, and cross-phase workstream records, are under review; neither changes Sprint 6 order or authorizes production  
**Runtime status:** Bounded public repository gateway only; no production health-data, account, House of Keys, agent, provider, EHR, connector, clinical, research, enterprise, financial, legacy-directive, estate, successor, private Chronicle, encryption, monitoring, or deployed security-control runtime

## Executive status

Calypso’s Promise has two coordinated roadmaps:

1. [`docs/roadmap/sprints.md`](sprints.md) defines the near-term design-to-build sequence and non-numbered institutional workstreams.
2. [`ROADMAP.md`](../../ROADMAP.md) defines the longer institutional progression from constitutional foundations to a founder-independent, hundred-year institution.

Sprints 0–5 and the Phase 0 Funding and Sponsorship Baseline are complete and merged.

- Sprint 3 merged through PR #14 as squash commit `19c1045a24679246dae209e13c62038362c69cc1`, establishing the pre-stable Living Chronicle architecture, schema, validators, fixtures, compatibility requirements, and completion evidence.
- Sprint 4 merged through PR #33 as squash commit `51e94a19cc21a0da0c57f1ae3b09f57092aee8d1`, establishing the pre-stable House of Keys architecture, contracts, validator, pure policy evaluator, receipts, synthetic evidence, compatibility boundaries, and completion record.
- The pre-Sprint 5 reconciliation merged through PR #34 as squash commit `d135b2fdf79a3c2cca9bf7cad275fc454d22fa6d`, repairing post-merge drift and confirming the unchanged Sprint 5 handoff.
- Sprint 5 merged through PR #36 as squash commit `4d09e8fc5b81f354c4568f97794fd9533ec68048`, establishing the security architecture, policies, procedures, public synthetic evidence, founding-steward design tabletops, residual-risk records, reconciliation, and specialist holdpoints.
- The Phase 0 Funding and Sponsorship Baseline merged through PR #38 as squash commit `32ac27bfb35ed64f34c64108a5d54c375d429593`, establishing Decision 0008, doctrine, public register contracts, fictional relationship and opportunity examples, lightweight validation, and founding-steward design tabletop evidence.

The funding baseline does not authorize a legal recipient, donations, grants, sponsors, providers, affiliates, research funding, compensation, investment, payment rails, accounting, treasury, charitable status, tax deductibility, procurement, contracting, enterprise revenue, or financial operations.

Issue #39 tracks proposed Decision 0009, a health-data legacy and succession architecture, a future institutional workstream, and a falsifiable assumption record. This proposed documentation gives explicit form to the frozen Vision’s legacy wishes, abandoned-account stewardship, intergenerational succession, and durable-archive commitments. It does not create a universal will, property classification, executor override, estate-planning service, post-mortem research release, public archive, or successor-access runtime.

Issue #41 tracks proposed Decision 0010, a consumer-first and provider-independent architecture, AS-0012, a repository reconciliation, a public website explanation, sprint and phase inheritance, and a future Clinical and Enterprise Interoperability Partnerships workstream. The proposed boundary treats providers, EHRs, payers, laboratories, pharmacies, devices, exchanges, research institutions, and other institutional systems as important sources, destinations, and potential partners connected through versioned adapters. It does not select a standard, activate a connector, prohibit future institutional collaboration, authorize clinical use, establish an enterprise product, or represent consumer-first sequencing as validated.

The repository review found no mission-level contradiction requiring a frozen player-promise rewrite. The material gap was that the consumer-first and provider-independent strategy remained implicit rather than being stated, funded, tested, and carried through future connector and partnership gates.

Institutional Phase 0 remains active until its organizational and evidence gates are reviewed explicitly. Completing a design sprint, funding doctrine, or proposed legacy or interoperability baseline does not declare the product runtime, financial operations, deployed security posture, clinical or legal review, provider integration, research infrastructure, governance transition, succession operations, or Phase 0 complete.

## Merged baseline

### Sprint 0 — Warehouse and governance

Established:

- frozen product, architecture, gameplay, lore, and repository-governance foundations
- status vocabulary and change control
- source and assumption records
- the initial sprint roadmap
- the repository as the intended source of truth

### Sprint 1 — Repository and open-source operating model

Established:

- runnable pnpm and Turborepo workspace
- Node.js and package-manager baselines
- contributor, conduct, security, DCO, dependency, and synthetic-data policies
- independent formatting, documentation-link, repository-policy, content-validation, lint, typecheck, test, and DCO checks
- a credential-free contributor environment

The exact legal dedication instruments, trademark policy, branch-protection administration, and commit-level DCO enforcement remain follow-on work.

### Sprint 2 — Controlled vocabulary, incentives, and content schemas

Merged through PR #9 as squash commit `3cdcc6fc7fe6a500ce57c00530109c2e976c9e70`.

Established:

- controlled and retired terminology
- the pre-stable `0.1.0` content contract
- strict dotted identifiers and common review metadata
- character, zone, scene, dialogue, quest, lesson, and notification records
- deterministic quest completion and reward shapes
- meaningful defer, refuse, and exit paths
- shame-free return behavior
- JSON Schema and TypeScript contracts
- one authoritative repository validation path
- content review, replacement, publication, recall, and rollback governance
- canonical examples that remain honestly marked `specialist-review`

The Sprint 2 incentive boundary requires personal value first, deterministic rewards, meaningful refusal, non-punitive return, optional Fellowship, and no reward for broader permission, unnecessary intimate disclosure, provider choice, sponsor selection, connector selection, or enterprise enrollment.

### Progressive-decentralization mandate

Merged through PR #10 as squash commit `2b56415b2c3ebc65dfe25690af2421bcde375afa`.

Established as a frozen institutional and architectural constraint:

- the consumer application is the first operating surface, not the final institutional form
- authority follows demonstrated capacity and public evidence gates
- early accountable leadership is compatible with the end state only when it is bounded and reduces key-person dependency
- governance distinguishes constitutional, safety, strategic, economic, technical, operational, and community decisions
- capital cannot purchase unlimited control, player rights, private-data access, or immunity from oversight
- governance participation cannot require broader health-data permission or unnecessary intimate disclosure
- token, blockchain, NFT, and on-chain DAO mechanisms remain optional and deferred
- founder independence is a success condition
- deterministic incentives, meaningful refusal, non-punitive return, and personal value first are constitutional boundaries

### Sprint 3 — Canonical data model v1

Merged through PR #14 as squash commit `19c1045a24679246dae209e13c62038362c69cc1`.

Established:

- provider-independent and pseudonymous Chronicle identity
- explicit subject, actor, author, recorder, source, confirmer, transformer, and custody distinctions
- exact, date-only, local, approximate, recurring, bounded, and open temporal representations
- observations, intervals, reflections, goals, derived records, associations, and inferences
- stable variables, discriminated values, categories, units, mappings, and deterministic normalization
- raw source artifacts, immutable versions, exact locators, and provenance chains
- correction, supersession, retraction, invalidation, conflict, duplicate, merge, unmerge, and preferred-presentation semantics
- document, attachment, stored-representation, derived-representation, and replaceable custody contracts
- export, omission, deletion, retention-exception, tombstone, and completion-evidence lifecycles
- independent Living Chronicle schema version `0.1.0`
- strict TypeScript contracts and a JSON-serializable aggregate bundle
- deterministic cross-reference and invariant validation
- public synthetic fixtures and inclusive interaction contexts
- migration and compatibility requirements without executable production migrations
- cross-contract completion evidence and an explicit deferred-work register

Sprint 3 preserves person control, traceable derivation, visible uncertainty and conflict, inspectable correction history, explicit deletion, provider replaceability, and the prohibition on converting disclosure into rewards or governance power.

The historical Sprint 3 deliverable list named story, quest, permission, receipt, Aster-memory, and database-migration directions. The accepted completion record kept those domains outside Chronicle truth and deferred executable production migrations. This is an execution clarification, not a retroactive scope change.

### Sprint 4 — House of Keys consent architecture

Merged through PR #33 as squash commit `51e94a19cc21a0da0c57f1ae3b09f57092aee8d1`. Closed issue #32 contains the workstream and acceptance ledger.

Established:

- a separate House of Keys bounded capability rather than permission state inside `packages/health-schema`
- versioned purpose and data-category taxonomies with non-grantable families and explicit grantable leaves
- atomic grants binding controlling authority, recipient, resource, subjects, exact category and action revisions, selectors, conditions, duration, explanation, comprehension requirement, and confirmation
- prospective revocation and explicit lifecycle states and events
- person-inspectable access-receipt contracts separated from decisions, execution, and protected operational audit records
- direct and narrative explanation parity, accessible alternatives, and non-punitive comprehension evidence
- a pure, provider-independent, side-effect-free `allow`, `deny`, or `indeterminate` evaluator
- the independent package `@calypsos-promise/house-of-keys` at contract version `0.1.0-pre.1`
- deterministic structural validation, seventeen public synthetic policy scenarios, one synthetic completed-access receipt, and twenty-nine Node tests
- cross-contract remediation for exact revisions, selector narrowing, explanation parity, grant authority, lifecycle evidence, receipt validation, decision correlation, required actors, and personal-core independence

The accepted Sprint 4 criteria are met:

- blanket permission cannot authorize an action
- active grants and receipts are inspectable
- withdrawn authority denies future access
- personal-core use remains independent from optional research or commerce
- missing or conflicting material authority fails closed

The [Sprint 4 Completion Record](sprint-4-completion-record.md) is the canonical evidence, compatibility, hold-point, and unresolved-work record.

### Pre-Sprint 5 repository reconciliation

Merged through PR #34 as squash commit `d135b2fdf79a3c2cca9bf7cad275fc454d22fa6d`.

Established:

- truthful Sprint 4 merge status across repository surfaces
- content-to-House-of-Keys identifier alignment
- public-site live-versus-planned permission claims
- the Sprint 3 execution clarification
- the Living Chronicle and House of Keys security handoff
- the unchanged Sprint 5 scope and entry conditions
- explicit requirements for privacy threats, authority-bearing flows, policy freshness, untrusted inputs, recoverability, control-status truth, residual risk, and independent-review status

### Sprint 5 — Threat model and security baseline

Merged through PR #36 as squash commit `4d09e8fc5b81f354c4568f97794fd9533ec68048`.

Established:

1. security scope, assets, classifications, authorities, data flows, and trust boundaries
2. identity, account, session, tenant, operator, recovery, and emergency-power boundaries
3. integrated security and privacy threats and residual risk
4. Living Chronicle source, provenance, inference, export, deletion, and custody threats
5. House of Keys enforcement, freshness, lifecycle, receipt, and audit threats
6. upload, connector, document, AI, MCP, dependency, and untrusted-input isolation
7. encryption, key management, secrets, and environment isolation
8. availability, backup, restore, incident response, audit retention, and deletion verification
9. public synthetic abuse cases and tabletop exercises
10. cross-contract review, control-status truth, specialist hold points, and completion evidence

All ten workstreams are complete for the accepted architecture, policy, procedure, risk, control, and founding-steward design-tabletop scope. The [Sprint 5 Completion Record](sprint-5-completion-record.md) is the canonical evidence. Completion does not imply implementation, deployment, operational verification, independent review, production readiness, or Phase 0 exit.

Sprint 5 preserves:

- useful personal value first
- individual control and meaningful refusal
- deterministic authority rather than AI or UI convenience
- private people and public code kept separate
- separately authorized research, commerce, compensation, and collective benefit
- evidence-gated institutional authority
- explicit challenge, containment, rollback, restoration, and revalidation

Security may not become a reason to pressure people into broader collection, longer retention, wider recipient access, optional analytics, model training, research, public visibility, or surrender of correction, export, deletion, refusal, accessibility, or non-AI fallback.

### Phase 0 Funding and Sponsorship Baseline

Merged through PR #38 as squash commit `32ac27bfb35ed64f34c64108a5d54c375d429593`.

Established at doctrine, public-register-contract, fictional-example, lightweight-validation, and founding-steward design-tabletop levels:

- Decision 0008
- funding taxonomy and acceptance policy
- sponsor benefit and recognition policy
- conflict, recusal, related-party, authority, exception, suspension, and termination policy
- public ledger and private-source boundary
- empty canonical real funding and opportunity registers
- five fictional funding relationship records and six fictional funding opportunity records
- public-good underwriting catalogue
- infrastructure sponsorship, provider-neutrality, portability, replacement, and exit rules
- concentration, continuity, donor-capture, and founder-subsidy treatment
- sixteen fictional sponsor-capture and continuity table exercises
- funding-register validation through `pnpm economics:check`
- explicit inheritance into Governance, Website Information Architecture, Sprints 6, 7, 8, 17, 18, and 19, Phase 2, Phase 5, and a future Funding Operations and Financial Controls workstream

The proposed Decision 0010 extension makes funded provider, EHR, payer, laboratory, pharmacy, device, exchange, connector, mapping, distribution, and enterprise support explicit economic and product conflicts. Support may fund an integration; it may not purchase Chronicle meaning, source rank, connector priority, provider placement, roadmap control, private access, clinical endorsement, or favorable findings.

The baseline does not accept or operate money. It does not establish a recipient, entity, fiscal sponsor, bank, processor, accounting system, tax status, treasury, compensation system, provider, affiliate program, investment instrument, research-funding program, nonprofit status, charitable status, tax deductibility, procurement, contracting, or enterprise revenue.

## Proposed consumer-first and provider-independent boundary

Tracked by issue #41 and intentionally separate from the merged historical sprint records.

The proposed set includes:

- Decision 0010 — Consumer-First, Provider-Independent Product Boundary;
- a source-backed consumer-first and provider-independent architecture;
- AS-0012, a proposed assumption that a provider-independent Living Chronicle can create enough recurring personal value to justify beginning without institutional adoption as a prerequisite;
- a repository reconciliation across mission, vision, incentives, architecture, governance, funding, website, sprints, and institutional phases;
- a cross-phase workstream with Sprint 14 connector inheritance and future Clinical and Enterprise Interoperability Partnership gates; and
- a public website explanation baseline.

The proposed design establishes:

- the person as the continuity layer across providers, payers, devices, applications, geography, and life stages;
- the Living Chronicle as the provider-independent canonical longitudinal product model;
- institutional systems as important source-attributed inputs, destinations, and potential partners;
- standards, profiles, implementation guides, terminologies, mappings, and exports as versioned adapter concerns rather than unquestioned Chronicle authority;
- explicit mapping loss, ambiguity, conflict, provenance, correction, replacement, migration, and teardown behavior;
- no reward or product-right dependency tied to provider, sponsor, connector, or enterprise selection;
- no purchased schema authority, source ranking, connector priority, provider placement, roadmap control, private access, or favorable findings; and
- a separate future workstream before material provider-facing, institutional, B2B, B2B2C, or enterprise operation.

It expressly does not claim that healthcare lacks standards, that providers oppose interoperability, that all B2B health technology fails, or that Calypso’s Promise replaces an EHR or clinical care.

This set remains proposed. It does not establish specialist approval, standards selection, a connector SDK, provider contracting, implementation, deployment, clinical use, production readiness, or validated consumer demand.

## Proposed health-data legacy and succession baseline

Tracked by issue #39 and intentionally separate from the merged historical sprint records.

The proposed set includes:

- Decision 0009 — Health Data Legacy and Post-Mortem Stewardship;
- a health-data legacy and succession architecture;
- a future cross-phase institutional workstream; and
- AS-0011, a proposed assumption that a provenance-rich Living Chronicle can retain enough legitimate value after death to justify an optional person-controlled capability when its risks and costs can be bounded.

The proposed design distinguishes:

- ordinary living control;
- ordinary delegation;
- incapacity stewardship;
- post-mortem stewardship;
- account recovery;
- abandoned-account administration; and
- institutional continuity.

It keeps the Legacy Directive, event evidence, external authority, succession case, House of Keys decision, execution, receipts, protected audit, research governance, archive governance, source restrictions, and third-party subject rights as separate authority domains.

It explicitly prohibits activation from inactivity alone, automatic next-of-kin access, platform ownership after death, automatic research or public release, successor impersonation, AI continuation of the deceased, reward for broader legacy permission, and claims that a platform directive is a universal will or estate plan.

This set remains proposed. It does not establish legal sufficiency, specialist approval, implementation, deployment, or production readiness.

## Security control and review status

Sprint 5 distinguishes:

- required controls
- designed controls
- synthetically tested controls
- independently reviewed controls
- implemented controls
- deployed controls
- operationally verified controls
- deferred, rejected, retired, or not-applicable controls

These statuses do not collapse into one maturity score. A documented or synthetically tested control is not deployed. Founding-steward acceptance is not independent specialist review.

The canonical vocabulary is maintained in [`docs/security/control-status-and-risk-vocabulary.md`](../security/control-status-and-risk-vocabulary.md).

The project currently has no named independent security reviewer. This must remain explicit until a qualified reviewer is recorded or a separately reviewed temporary exception is accepted.

## Next design-to-build boundary

Sprint 6 — Aster contracts and AI governance is next. Sprint 6 must inherit:

- Sprint 5 threats, controls, provider-egress, prompt-injection, retrieval, memory, non-AI fallback, evidence-status, and specialist-holdpoint boundaries;
- Decision 0008 provider-neutrality, funding-conflict, model-credit, sponsored-benchmark, affiliate, related-party, and publication-independence boundaries; and
- if accepted, Decision 0010 source-class, institutional provenance, mapping, uncertainty, provider-neutrality, non-canonical external-schema, and sponsor-independent evaluation boundaries.

Sprint 6 defines AI-provider governance requirements. It does not select or endorse a production AI provider, EHR, connector, clinical partner, or enterprise relationship.

The proposed consumer-first documentation does not alter this sequence. Its primary connector implementation inheritance begins in Sprint 14, while its future institutional partnership workstream begins before any material provider-facing, clinical, institutional, B2B, B2B2C, or enterprise capability becomes operational.

The proposed legacy documentation likewise does not alter this sequence. Its implementation entry condition occurs later, before any Legacy Directive, incapacity, death, fiduciary, estate, successor, research, archive, or post-mortem deletion capability is represented as LIVE.

## Institutional Phase 0 gate assessment

### Core foundations are internally consistent

**Status:** Baseline met, subject to future evidence and specialist review.

The Product Constitution, Vision, architecture, incentives, progressive decentralization, Institutional Immune System, Living Chronicle, House of Keys, security baseline, publication policy, public-domain commitment, and funding baseline are internally compatible.

The proposed Decision 0010 set appears consistent with those foundations by making the consumer application and provider-independent Chronicle the product center while preserving institutional interoperability, standards, clinical evidence, funding safeguards, and future partnership pathways. It is not part of the accepted baseline until repository review accepts it.

The proposed Decision 0009 set appears consistent with those foundations by extending person control into incapacity and post-mortem design while keeping legal authority, permission, Chronicle truth, execution, and receipts separate. It is not part of the accepted baseline until repository review accepts it.

### Repository controls meet minimum viable validation

**Status:** Baseline met.

The repository provides `pnpm check`, synthetic-data-only contribution rules, independent CI checks, documentation-link validation, funding-register validation, content and model validation, tests, and transitional DCO certification.

Administrative branch-protection settings and commit-level DCO enforcement still require verification or implementation before external contribution volume grows.

### Material decisions no longer live only in private notes or chat

**Status:** Partially met.

Principal product, architecture, incentive, governance, security, publication, public-domain, Chronicle, House of Keys, funding, proposed provider and interoperability, and proposed legacy-succession decisions are committed in repository artifacts.

Historical HealthDAO, CureDAO, and earlier Calypso’s Promise governance notes still need recovery, cataloguing, classification, and reviewed migration.

### Progressive decentralization is accepted as an architectural constraint

**Status:** Met.

[`VISION.md`](../../VISION.md), [`GOVERNANCE.md`](../../GOVERNANCE.md), [`ROADMAP.md`](../../ROADMAP.md), the [Frozen Foundations register](../frozen/README.md), and [Decision 0003](../decisions/0003-progressive-decentralization.md) establish the constraint.

## Remaining Phase 0 closure work

Before declaring institutional Phase 0 complete, the project should publish and review:

1. an initial key-person dependency register;
2. a succession and emergency-recovery ownership map for institutional roles and critical systems;
3. an inventory of founder-reserved powers with scope, justification, review date, and transfer or sunset conditions;
4. the recovered historical governance-source catalogue;
5. evidence that required GitHub branch protections and administrative controls are configured;
6. a decision on when transitional PR-level DCO is replaced by commit-level enforcement;
7. an initial founder-subsidy and economic-dependency register using public-safe categories, responsible owners, replacement conditions, and private-source boundaries;
8. explicit review, revision, acceptance, or decline of proposed Decision 0010 and its companion records;
9. explicit review, revision, acceptance, or decline of proposed Decision 0009 and its companion records; and
10. an explicit Phase 0 exit review identifying unresolved risks, responsible stewards, conflicts, dependencies, and rollback conditions.

Review of proposed Decisions 0009 and 0010 is useful institutional design work but does not activate production legacy, provider, connector, clinical, or enterprise systems and does not replace the separate institutional succession ownership map above.

These are governance, economic-boundary, and resilience requirements. They do not require a token, treasury, identity system, legal wrapper, payment rail, broad vote, operating sponsor program, provider contract, enterprise revenue, or production estate workflow prematurely.

## Deferred implementation boundary

The current repository does not select or implement:

- a production database topology, event model, or migration runner;
- production accounts, authentication, identity proofing, delegation, recovery, incapacity, estate, fiduciary, or successor authority;
- cloud, storage, queue, analytics, document-processing, connector, archive, verification, AI, EHR, payer, laboratory, pharmacy, device, exchange, terminology, mapping, or institutional providers;
- exact FHIR, US Core, USCDI, SMART, bulk-data, clinical-document, terminology, imaging, claims, or proprietary implementation choices;
- provider-facing summaries, care collaboration, clinical workflows, enterprise tenancy, procurement, contracting, B2B, or B2B2C operation;
- real health-data ingestion or connector rollout;
- real recipients, research enrollment, compensation, marketplaces, data sales, family-health derivatives, historical archives, or post-mortem release;
- clinical terminology, diagnosis, treatment, decision support, or causal inference;
- production encryption, key management, escrow, malware controls, audit, monitoring, secure deletion, or long-term preservation;
- distributed revocation, receipt delivery, connector synchronization, succession-case, or lifecycle orchestration;
- story, quest, progression, notification, or Aster-memory persistence;
- identity or anti-Sybil systems;
- a legal entity, fiscal sponsor, donation rail, grant recipient, accounting system, treasury, budget, reserve, compensation, ownership, affiliate, research-funding, provider-placement, connector-ranking, estate-planning, archival, or successor-custody mechanism; or
- token, blockchain, NFT, or on-chain DAO infrastructure.

Complete JSON Schema and safe decoding from unknown Chronicle, House of Keys, connector, provider, or future legacy-domain input also remain deferred. The accepted boundaries are strict TypeScript contracts, deterministic validators and evaluators, and JSON-serializable synthetic interchange evidence.

## Publication and release status

- Canonical Sprint 2 records remain `specialist-review` examples rather than approved production content.
- Sprint 3 Living Chronicle and Sprint 4 House of Keys contracts are merged, pre-stable, and synthetic-only.
- Sprint 5 is a merged architecture and design baseline, not deployed security or independent certification.
- The Phase 0 funding workstream is merged doctrine, public register structure, synthetic examples, and design-tabletop evidence, not operating finance.
- Decision 0010, its architecture, AS-0012, reconciliation, website brief, and future workstream remain proposed documentation, not a production provider, connector, clinical, enterprise, or standards-certification capability.
- Decision 0009, the legacy architecture, future workstream, and AS-0011 remain proposed documentation, not a legal service or production capability.
- The current website is a live bounded public repository gateway, not the private health product, provider portal, connector runtime, fundraising runtime, or legacy-planning interface.
- No claim should imply Phase 1’s useful private product, Phase 2’s trust evidence, Research Commons, sustainable economics, clinical or enterprise integration, constitutional governance, post-mortem stewardship, or founder independence has been achieved.

## Status update rule

Update this record when:

- a funding, provider, connector, enterprise, legacy, succession, or other institutional baseline changes proposal, review, acceptance, or merge status;
- a sprint starts, closes, merges, pauses, or changes scope through accepted authority;
- an institutional phase gate is accepted, rejected, paused, or rolled back;
- a frozen or accepted decision changes product, incentive, governance, security, economics, interoperability, succession, or founder-independence boundaries;
- a material unresolved gate gains an owner or evidence; or
- a capability, control, financial relationship, provider relationship, connector, mapping, succession authority, or institutional status begins being represented as experimental, implemented, deployed, operating, independently reviewed, or live.
