# Current Project Status

[Documentation home](../README.md) · [Roadmap index](README.md) · [Institutional roadmap](../../ROADMAP.md) · [Sprint sequence](sprints.md) · [Pre-Sprint 5 review](pre-sprint-5-alignment-review.md)

**Status date:** 2026-07-26  
**Institutional phase:** Phase 0 — Constitutional and open-source foundations  
**Design-to-build sequence:** Sprints 0–4 complete and merged; pre-Sprint 5 alignment review in progress  
**Runtime status:** Bounded public repository gateway only; no production health-data, House of Keys, account, agent, or research runtime

## Executive status

Calypso’s Promise has two coordinated roadmaps:

1. [`docs/roadmap/sprints.md`](sprints.md) defines the near-term design-to-build sequence.
2. [`ROADMAP.md`](../../ROADMAP.md) defines the longer institutional progression from constitutional foundations to a founder-independent, hundred-year institution.

Sprints 0–4 are complete and merged.

- Sprint 3 entered the merged baseline through PR #14 as squash commit `19c1045a24679246dae209e13c62038362c69cc1`, establishing the pre-stable Living Chronicle architecture, schema, validators, fixtures, compatibility requirements, and completion evidence.
- Sprint 4 entered the merged baseline through PR #33 as squash commit `51e94a19cc21a0da0c57f1ae3b09f57092aee8d1`, establishing the pre-stable House of Keys architecture, contracts, validator, pure policy evaluator, receipts, synthetic evidence, compatibility boundaries, and completion record.

The accepted Sprint 4 goal, deliverables, and acceptance criteria in [`docs/roadmap/sprints.md`](sprints.md#sprint-4--house-of-keys-consent-architecture) were not modified. The [Sprint 4 Plan](sprint-4-plan.md) and [Sprint 4 Completion Record](sprint-4-completion-record.md) record implementation, cross-contract review, deterministic evidence, compatibility boundaries, hold points, and unresolved work.

Draft PR #34 performs the [pre-Sprint 5 repository alignment review](pre-sprint-5-alignment-review.md). It reconciles post-merge status, mission and incentive traceability, Sprint 2 permission references, the Sprint 3 execution clarification, the Living Chronicle and House of Keys security handoff, and the unchanged Sprint 5 boundary.

Sprint 5 — Threat model and security baseline is the next canonical sprint. It has not started or been greenlit by this status record. Entry should occur through a separate issue, plan, branch, and draft pull request after the alignment reconciliation merges.

Institutional Phase 0 remains active until its organizational and evidence gates are reviewed explicitly. Completing Sprint 4 and preparing Sprint 5 do not declare the product runtime, security posture, clinical or legal review, research infrastructure, economics, governance transition, or Phase 0 complete.

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
- independent formatting, policy, lint, typecheck, test, and DCO checks
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

### Website Track 0A — Repository gateway

Merged through PR #26, with deployment compatibility and concept-art corrections through PRs #28 and #31.

Established:

- a bounded public repository gateway
- truthful planned-capability language
- a GitHub repository call to action
- a purpose-limited email-interest form behind a separately configured private webhook
- no account, private Chronicle, health-data intake, research enrollment, analytics, or production permission behavior

This accepted implementation slice does not replace Sprint 8 or alter the Sprint 5 boundary.

## Mission and incentive alignment assessment

**Status:** Strong and internally consistent at the current pre-runtime boundary.

The Product Constitution, Vision, Architecture Foundation, Gameplay Foundation, controlled vocabulary, incentive model, institutional roadmap, Governance Baseline, Institutional Immune System, Living Chronicle, House of Keys, contributor policy, public site, and synthetic evidence reinforce the same ordering:

1. useful personal value first;
2. individual control and meaningful refusal;
3. deterministic authority rather than AI or UI convenience;
4. private people and public code kept separate;
5. separately authorized research, commerce, compensation, and collective benefit;
6. evidence-gated institutional authority; and
7. explicit challenge, containment, rollback, restoration, and revalidation.

The [Pre-Sprint 5 Alignment Review](pre-sprint-5-alignment-review.md) records the traceability table, repaired drift, security handoff, and entry recommendation.

## Institutional Phase 0 gate assessment

[`ROADMAP.md`](../../ROADMAP.md) defines four Phase 0 exit gates.

### Core foundations are internally consistent

**Status:** Baseline met, subject to future evidence and specialist review.

The merged Sprint 2, progressive-decentralization, Sprint 3, Institutional Immune System, and Sprint 4 baselines are compatible with the frozen Promise. The pre-Sprint 5 review repairs lower-layer status and vocabulary drift without changing frozen foundations.

### Repository controls meet minimum viable validation

**Status:** Baseline met.

The repository provides `pnpm check`, synthetic-data-only contribution rules, independent CI checks, documentation-link validation, content and model validation, tests, and transitional DCO certification.

Administrative branch-protection settings and commit-level DCO enforcement still require verification or implementation before external contribution volume grows.

### Material decisions no longer live only in private notes or chat

**Status:** Partially met.

The principal frozen foundations, Sprint contracts, progressive-decentralization decision, governance baseline, public institutional roadmap, feedback-to-governed-work architecture, Institutional Immune System, Living Chronicle, House of Keys, and completion reviews are committed in repository artifacts.

Historical HealthDAO, CureDAO, and earlier Calypso’s Promise governance notes still need to be recovered, catalogued, and classified. Future material decisions must continue moving into decision records and repository artifacts.

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

These are governance and resilience requirements, not reasons to introduce a token, treasury, identity system, legal wrapper, or broad vote prematurely. They remain active in parallel and do not block architecture-only Sprint 5 drafting.

## Current design-to-build boundary

The immediate boundary is completion and review of draft PR #34.

Sprint 5 — Threat model and security baseline remains next in the canonical sprint sequence. Its accepted goal, deliverables, and acceptance criteria remain unchanged. A separate entry decision should greenlight it only after the pre-Sprint 5 alignment review merges.

Sprint 5 must map defenses across:

- Living Chronicle records, sources, provenance, exports, deletion, and custody
- House of Keys taxonomies, grants, lifecycle, explanations, comprehension, decisions, capacity, and receipts
- accounts, recovery, operators, insiders, and administrative access
- connectors, uploads, documents, AI, MCP, supply chain, and future research actors
- the bounded public-site signup adapter and its secret, retention, correction, and deletion boundary

It must not represent a documented control as deployed, select providers by implication, authorize production data, or use security as a reason to weaken refusal, non-AI fallbacks, personal-core independence, export, deletion, correction, or accessibility.

## Deferred implementation boundary

The current repository does not select or implement:

- a production database topology, event model, or migration runner
- production accounts, authentication, identity proofing, delegation, or recovery
- cloud, storage, queue, analytics, document-processing, connector, or AI providers
- real health-data ingestion or connector rollout
- real recipients, research enrollment, compensation, marketplaces, or data sales
- clinical terminology, diagnosis, treatment, decision support, or causal inference
- production encryption, key management, malware controls, audit, or secure deletion
- distributed revocation, receipt delivery, or lifecycle orchestration
- story, quest, progression, notification, or Aster-memory persistence
- identity or anti-Sybil systems
- treasury or ownership mechanisms
- token, blockchain, NFT, or on-chain DAO infrastructure

Complete JSON Schema and safe decoding from unknown Chronicle or House of Keys input also remain deferred. The accepted boundaries are strict TypeScript contracts, deterministic validators and evaluators, and JSON-serializable synthetic interchange evidence.

## Publication and release status

The canonical Sprint 2 records remain examples in `specialist-review`. They are not approved production content and are not part of an immutable content release.

The Sprint 3 Living Chronicle and Sprint 4 House of Keys contracts are merged, pre-stable, and synthetic-data-only. They are not production deployments, specialist certifications, or authorization to process real health data.

The current website is an accepted public repository gateway, not a live personal-health product. It does not provide accounts, private Chronicle storage, production AI interaction, research enrollment, or production House of Keys behavior.

No claim should imply that Phase 1’s useful private product, Phase 2’s trust evidence, research infrastructure, sustainable economics, constitutional governance, or founder independence has already been achieved.

## Status update rule

This record should be updated when:

- the pre-Sprint 5 review is accepted, merged, closed, or materially revised
- Sprint 5 begins, closes, merges, or changes status
- an institutional phase gate is accepted, rejected, paused, or rolled back
- a frozen decision changes the relationship among product, incentives, governance, or founder independence
- a material unresolved gate gains an owner or evidence
- the project begins representing a capability as experimental or live
