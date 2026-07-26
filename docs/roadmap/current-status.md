# Current Project Status

[Documentation home](../README.md) · [Roadmap index](README.md) · [Institutional roadmap](../../ROADMAP.md) · [Sprint sequence](sprints.md) · [Sprint 5 completion](sprint-5-completion-record.md) · [Sprint 5 plan](sprint-5-plan.md) · [Security architecture](../security/README.md)

**Status date:** 2026-07-26  
**Institutional phase:** Phase 0 — Constitutional and open-source foundations  
**Design-to-build sequence:** Sprints 0–4 complete and merged; Sprint 5 complete on draft PR #36 pending explicit approval and merge  
**Runtime status:** Bounded public repository gateway only; no production health-data, account, House of Keys, agent, connector, research, or security-control runtime

## Executive status

Calypso’s Promise has two coordinated roadmaps:

1. [`docs/roadmap/sprints.md`](sprints.md) defines the near-term design-to-build sequence.
2. [`ROADMAP.md`](../../ROADMAP.md) defines the longer institutional progression from constitutional foundations to a founder-independent, hundred-year institution.

Sprints 0–4 are complete and merged.

- Sprint 3 merged through PR #14 as squash commit `19c1045a24679246dae209e13c62038362c69cc1`, establishing the pre-stable Living Chronicle architecture, schema, validators, fixtures, compatibility requirements, and completion evidence.
- Sprint 4 merged through PR #33 as squash commit `51e94a19cc21a0da0c57f1ae3b09f57092aee8d1`, establishing the pre-stable House of Keys architecture, contracts, validator, pure policy evaluator, receipts, synthetic evidence, compatibility boundaries, and completion record.
- The pre-Sprint 5 reconciliation merged through PR #34 as squash commit `d135b2fdf79a3c2cca9bf7cad275fc454d22fa6d`, repairing post-merge drift and confirming the unchanged Sprint 5 handoff.

Sprint 5 — Threat model and security baseline is complete on the review branch. Issue #35 remains the acceptance and closure ledger, and draft PR #36 remains pending explicit founding-steward approval and merge.

Sprint 5 defines architecture, policy, procedures, public synthetic evidence, tabletop exercises, control status, and residual risk. It does not authorize production accounts, providers, agents, connectors, research, encryption deployment, operational key custody, security certification, or real health-data processing.

Institutional Phase 0 remains active until its organizational and evidence gates are reviewed explicitly. Completing Sprint 5 on the review branch does not declare the product runtime, deployed security posture, clinical or legal review, research infrastructure, economics, governance transition, or Phase 0 complete.

## Merged baseline

### Sprint 0 — Warehouse and governance

Established:

- frozen product, architecture, gameplay, and lore foundations
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

The Sprint 2 incentive boundary requires personal value first, deterministic rewards, meaningful refusal, non-punitive return, optional Fellowship, and no reward for broader permission or unnecessary intimate disclosure.

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

### Website Track 0A — Repository gateway

Merged through PR #26, with deployment compatibility and concept-art corrections through PRs #28 and #31.

Established:

- a bounded public repository gateway
- truthful planned-capability language
- a GitHub repository call to action
- a purpose-limited email-interest form behind a separately configured private webhook
- no account, private Chronicle, health-data intake, research enrollment, analytics, or production permission behavior

This accepted implementation slice does not replace Sprint 8 or alter the Sprint 5 boundary.

## Sprint 5 completion boundary

The [Sprint 5 Plan](sprint-5-plan.md) was executed through ten workstreams on draft PR #36:

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

All ten workstreams are complete for the accepted architecture, policy, procedure, risk, control, and founding-steward design-tabletop scope. The [Sprint 5 Completion Record](sprint-5-completion-record.md) is the canonical review-branch evidence. Completion does not imply implementation, deployment, operational verification, independent review, production readiness, or Phase 0 exit.

Sprint 5 preserves:

- useful personal value first
- individual control and meaningful refusal
- deterministic authority rather than AI or UI convenience
- private people and public code kept separate
- separately authorized research, commerce, compensation, and collective benefit
- evidence-gated institutional authority
- explicit challenge, containment, rollback, restoration, and revalidation

Security may not become a reason to pressure people into broader collection, longer retention, wider recipient access, optional analytics, model training, research, public visibility, or surrender of correction, export, deletion, refusal, accessibility, or non-AI fallback.

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

After Sprint 5 is approved and merged, Sprint 6 — Aster contracts and AI governance is next. Sprint 6 must inherit the Sprint 5 threats, controls, provider-egress, prompt-injection, retrieval, memory, non-AI fallback, evidence-status, and specialist-holdpoint boundaries rather than creating a parallel AI security model.

## Institutional Phase 0 gate assessment

### Core foundations are internally consistent

**Status:** Baseline met, subject to future evidence and specialist review.

The merged Sprint 2, progressive-decentralization, Sprint 3, Institutional Immune System, Sprint 4, and pre-Sprint 5 reconciliation baselines are compatible with the frozen Promise.

### Repository controls meet minimum viable validation

**Status:** Baseline met.

The repository provides `pnpm check`, synthetic-data-only contribution rules, independent CI checks, documentation-link validation, content and model validation, tests, and transitional DCO certification.

Administrative branch-protection settings and commit-level DCO enforcement still require verification or implementation before external contribution volume grows.

### Material decisions no longer live only in private notes or chat

**Status:** Partially met.

The principal frozen foundations, sprint contracts, progressive-decentralization decision, governance baseline, public institutional roadmap, feedback-to-governed-work architecture, Institutional Immune System, Living Chronicle, House of Keys, repository reconciliations, and Sprint 5 plan are committed in repository artifacts.

Historical HealthDAO, CureDAO, and earlier Calypso’s Promise governance notes still need to be recovered, catalogued, and classified.

### Progressive decentralization is accepted as an architectural constraint

**Status:** Met.

[`VISION.md`](../../VISION.md), [`GOVERNANCE.md`](../../GOVERNANCE.md), [`ROADMAP.md`](../../ROADMAP.md), the [Frozen Foundations register](../frozen/README.md), and [Decision 0003](../decisions/0003-progressive-decentralization.md) establish the constraint.

## Remaining Phase 0 closure work

Before declaring institutional Phase 0 complete, the project should publish and review:

1. an initial key-person dependency register
2. a succession and emergency-recovery ownership map
3. an inventory of founder-reserved powers with scope, justification, review date, and transfer or sunset conditions
4. the recovered historical governance-source catalogue
5. evidence that required GitHub branch protections and administrative controls are configured
6. a decision on when transitional PR-level DCO is replaced by commit-level enforcement
7. an explicit Phase 0 exit review identifying unresolved risks, responsible stewards, and rollback conditions

These are governance and resilience requirements, not reasons to introduce a token, treasury, identity system, legal wrapper, or broad vote prematurely. They remain active in parallel and do not block architecture-only Sprint 5 work.

## Deferred implementation boundary

The current repository does not select or implement:

- a production database topology, event model, or migration runner
- production accounts, authentication, identity proofing, delegation, or recovery
- cloud, storage, queue, analytics, document-processing, connector, or AI providers
- real health-data ingestion or connector rollout
- real recipients, research enrollment, compensation, marketplaces, or data sales
- clinical terminology, diagnosis, treatment, decision support, or causal inference
- production encryption, key management, malware controls, audit, monitoring, or secure deletion
- distributed revocation, receipt delivery, or lifecycle orchestration
- story, quest, progression, notification, or Aster-memory persistence
- identity or anti-Sybil systems
- treasury or ownership mechanisms
- token, blockchain, NFT, or on-chain DAO infrastructure

Complete JSON Schema and safe decoding from unknown Chronicle or House of Keys input also remain deferred. The accepted boundaries are strict TypeScript contracts, deterministic validators and evaluators, and JSON-serializable synthetic interchange evidence.

## Publication and release status

The canonical Sprint 2 records remain examples in `specialist-review`. They are not approved production content and are not part of an immutable content release.

The Sprint 3 Living Chronicle and Sprint 4 House of Keys contracts are merged, pre-stable, and synthetic-data-only. They are not production deployments, specialist certifications, or authorization to process real health data.

Sprint 5 documents are internal architecture and design baselines under public review. They must distinguish design, synthetic evidence, internal acceptance, independent review, implementation, deployment, and operational verification.

The current website is an accepted public repository gateway, not a live personal-health product. It does not provide accounts, private Chronicle storage, production AI interaction, research enrollment, or production House of Keys behavior.

No claim should imply that Phase 1’s useful private product, Phase 2’s trust evidence, research infrastructure, sustainable economics, constitutional governance, or founder independence has already been achieved.

## Status update rule

This record should be updated when:

- Sprint 5 workstreams, review status, or acceptance evidence materially change
- Sprint 5 closes or merges
- an institutional phase gate is accepted, rejected, paused, or rolled back
- a frozen decision changes the relationship among product, incentives, governance, security, or founder independence
- a material unresolved gate gains an owner or evidence
- the project begins representing a capability or control as experimental, implemented, deployed, or operationally verified
