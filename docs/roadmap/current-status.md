# Current Project Status

**Status date:** 2026-07-24  
**Institutional phase:** Phase 0 — Constitutional and open-source foundations  
**Design-to-build sequence:** Sprints 0–2 merged; Sprint 3 complete on its review branch and pending explicit merge approval  
**Runtime status:** Minimal contributor-safe site workspace only; no production health-data runtime

## Executive status

Calypso’s Promise now has two coordinated roadmaps:

1. `docs/roadmap/sprints.md` defines the near-term design-to-build sequence.
2. `ROADMAP.md` defines the longer institutional progression from constitutional foundations to a founder-independent, hundred-year institution.

The project has completed the first three merged design-to-build sprints. Sprint 3 has also completed its architecture, schema, validation, fixture, compatibility, and cross-contract review work on draft PR #14, but it is not part of the merged baseline until an explicitly approved merge occurs.

Institutional Phase 0 remains active until its remaining organizational and evidence gates are reviewed explicitly. Sprint 3 completion does not declare the product runtime, security posture, clinical or legal review, House of Keys, research infrastructure, economics, governance transition, or Phase 0 complete.

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

The exact license file, trademark policy, branch-protection administration, and commit-level DCO enforcement remain follow-on work.

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

The Sprint 2 incentive boundary requires personal value first, deterministic rewards, meaningful refusal, non-punitive return, optional Fellowship, and no reward for broader consent or unnecessary intimate disclosure.

### Progressive-decentralization mandate

Merged through PR #10 as squash commit `2b56415b2c3ebc65dfe25690af2421bcde375afa`.

Established as a frozen institutional and architectural constraint:

- the consumer application is the first operating surface, not the final institutional form
- authority follows demonstrated capacity and public evidence gates
- early accountable leadership is compatible with the end state only when it is bounded and reduces key-person dependency
- governance distinguishes constitutional, safety, strategic, economic, technical, operational, and community decisions
- capital cannot purchase unlimited control, player rights, private-data access, or immunity from oversight
- governance participation cannot require broader health-data consent or unnecessary intimate disclosure
- token, blockchain, NFT, and on-chain DAO mechanisms remain optional and deferred
- founder independence is a success condition
- the deterministic incentive model, meaningful refusal, non-punitive return, and personal-value-first sequence are constitutional boundaries

## Institutional Phase 0 gate assessment

`ROADMAP.md` defines four Phase 0 exit gates.

### Core foundations are internally consistent

**Status:** Baseline met, subject to future evidence and specialist review.

PR #9 reconciled vocabulary, incentives, content schemas, validators, examples, and governance. PR #10 added a compatible frozen institutional mandate rather than replacing the player promise or incentive contract. Sprint 3 now supplies a review-ready Living Chronicle baseline without weakening those boundaries.

### Repository controls meet minimum viable validation

**Status:** Baseline met.

The repository provides `pnpm check`, synthetic-data-only contribution rules, independent CI checks, content and model validation, tests, and transitional DCO certification.

Administrative branch-protection settings and commit-level DCO enforcement still require verification or implementation before external contribution volume grows.

### Material decisions no longer live only in private notes or chat

**Status:** Partially met.

The principal frozen foundations, Sprint 2 contracts, progressive-decentralization decision, governance baseline, public institutional roadmap, and Sprint 3 Chronicle contract are committed or review-ready in repository artifacts.

Historical HealthDAO, CureDAO, and earlier Calypso’s Promise governance notes still need to be recovered, catalogued, and classified. Future material decisions must continue moving into decision records and repository artifacts.

### Progressive decentralization is accepted as an architectural constraint

**Status:** Met.

`VISION.md`, `GOVERNANCE.md`, `ROADMAP.md`, the Frozen Foundations register, and Decision 0003 establish the constraint.

## Remaining Phase 0 closure work

Before declaring institutional Phase 0 complete, the project should publish and review:

1. an initial key-person dependency register
2. a succession and emergency-recovery ownership map
3. an inventory of founder-reserved powers with scope, justification, review date, and transfer or sunset conditions
4. the recovered historical governance-source catalogue
5. evidence that required GitHub branch protections and administrative controls are configured
6. a decision on when transitional PR-level DCO is replaced by commit-level enforcement
7. an explicit Phase 0 exit review identifying unresolved risks, responsible stewards, and rollback conditions

These are governance and resilience requirements, not reasons to introduce a token, treasury, identity system, legal wrapper, or broad vote prematurely.

## Completed design-to-build target: Sprint 3

Sprint 3 now defines a review-ready authoritative Living Chronicle contract covering:

- account-independent and pseudonymous Chronicle identity
- observations, intervals, reflections, goals, derived records, associations, and inferences
- variables, categories, values, units, mappings, and normalization
- raw sources, immutable versions, exact locators, and provenance chains
- exact, local, approximate, recurring, bounded, and open time
- correction, supersession, retraction, conflict, duplicate, merge, unmerge, and preferred presentation
- attachments, custody references, and derived source representations
- export, omission, deletion, retention-exception, tombstone, and completion-evidence lifecycles
- the independent pre-stable Living Chronicle schema version `0.1.0`
- strict TypeScript contracts and a JSON-serializable aggregate bundle
- deterministic cross-reference and invariant validation
- public synthetic fixtures for every required scenario
- separate inclusive synthetic interaction contexts
- migration and compatibility requirements
- explicit separation among Chronicle truth, story state, quest state, progression, consent, receipts, Aster memory, research, compensation, and governance

The Sprint 3 plan is in `docs/roadmap/sprint-3-plan.md`. The conceptual model is in `docs/architecture/living-chronicle-ontology.md`. The completion decision and deferred register are in `docs/roadmap/sprint-3-completion-record.md`.

### Sprint 3 constitutional tests

The completed branch preserves:

- person-controlled records and portable exports
- provenance for every normalized or derived record
- correction without silent history rewriting
- visible conflict and reversible duplicate handling
- deletion semantics that are explicit and testable
- no requirement for research, commerce, governance participation, or broader consent to receive core personal value
- no conversion of health disclosure into progression or governance power
- provider and storage choices that remain replaceable enough to support founder independence
- no production or private health data in public contributor workflows

### Sprint 3 deferred implementation boundary

Sprint 3 completion does not select or implement:

- a production database topology, event model, or migration runner
- production accounts, authentication, identity proofing, or recovery
- cloud, storage, queue, analytics, document-processing, connector, or AI providers
- real health-data ingestion or connector rollout
- House of Keys consent evaluation or access receipts
- research access, compensation, marketplaces, or data sales
- clinical terminology, diagnosis, treatment, decision support, or causal inference
- production encryption, key management, malware controls, audit, or secure deletion
- story, quest, progression, notification, or Aster-memory persistence
- identity or anti-Sybil systems
- treasury or ownership mechanisms
- token, blockchain, NFT, or on-chain DAO infrastructure

A complete JSON Schema and safe decoder from untrusted input also remain deferred. The accepted `0.1.0` boundary is the strict TypeScript contract, deterministic validator, and JSON-serializable synthetic interchange evidence.

## Publication and release status

The canonical Sprint 2 records remain examples in `specialist-review`. They are not approved production content and are not part of an immutable content release.

The Sprint 3 Living Chronicle contract is pre-stable, review-ready, and synthetic-data-only. It is not a production data model deployment or authorization to process real health data.

The current application remains a minimal, credential-free workspace proving that the repository can install, validate, and run without production services or real health data.

No claim should imply that Phase 1’s useful private product, Phase 2’s trust evidence, research infrastructure, sustainable economics, constitutional governance, or founder independence has already been achieved.

## Status update rule

This record should be updated when:

- a design-to-build sprint closes, merges, or changes status
- an institutional phase gate is accepted, rejected, paused, or rolled back
- a frozen decision changes the relationship among product, incentives, governance, or founder independence
- a material unresolved gate gains an owner or evidence
- the project begins representing a capability as experimental or live
