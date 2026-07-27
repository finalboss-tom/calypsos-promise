# Sprint 6 Cross-Contract Reconciliation — Aster Contracts and AI Governance

[Architecture index](README.md) · [Sprint 6 execution plan](../roadmap/sprint-6-execution-plan.md) · [Completion record](../roadmap/sprint-6-completion-record.md) · [Control and evidence map](aster-sprint-6-control-and-evidence-map.md) · [Specialist holdpoints and unresolved work](aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md)

- **Status:** COMPLETE ON REVIEW BRANCH — founding-steward acceptance and merge pending
- **Tracking issue:** [#47](https://github.com/finalboss-tom/calypsos-promise/issues/47)
- **Pull request:** [#48](https://github.com/finalboss-tom/calypsos-promise/pull/48)
- **Scope:** public provider-independent contracts, deterministic validators, public synthetic fixtures, compatibility and migration evidence, status truth, residual work, and specialist holdpoints only

## Reconciliation decision

Sprint 6 is internally coherent with the frozen Promise, architecture, gameplay, controlled vocabulary, deterministic incentives, Living Chronicle, House of Keys, Sprint 5 security baseline, funding doctrine, consumer-first and provider-independent boundary, operational-simplicity baseline, publication rules, Institutional Immune System, repository policies, and bounded public website.

The review found no basis to:

- grant authority from an Aster role name, model output, provider response, retrieval result, tool result, memory, fixture, compatibility label, migration plan, CI run, sponsor, or benchmark;
- collapse Chronicle truth, House of Keys permission truth, source assertions, Aster proposals, memory, work state, provider governance, local fixtures, compatibility evidence, migration evidence, receipts, audit, gameplay state, or application state;
- reward broader data collection, permission, retention, model use, provider use, research participation, or sponsor relationships;
- select a production provider, EHR, connector, clinical partner, model gateway, queue, scheduler, workflow engine, event store, vector database, storage provider, or enterprise relationship;
- represent public synthetic fixtures as production quality, clinical safety, privacy, security, accessibility, interoperability, legal, reliability, deletion, or migration evidence; or
- promote designed and synthetically tested controls to implemented, deployed, operationally verified, or independently reviewed status.

The review did identify stale status surfaces that still represented Sprint 6 as merely next or planned. Workstream 6.12 updates repository navigation and status language so the review branch truthfully states that Sprint 6 is complete on the branch and awaiting explicit acceptance and merge.

## Review authority and precedence

The reconciliation used this order:

1. [Product Constitution](../frozen/product-constitution.md), [Architecture Foundation](../frozen/architecture.md), [World and Lore Canon](../frozen/world-and-lore-canon.md), [Gameplay Foundation](../product/gameplay-foundation.md), and frozen institutional commitments;
2. accepted decisions, including progressive decentralization, feedback to governed work, and the [Institutional Immune System](../governance/institutional-immune-system.md);
3. [Security Policy](../../SECURITY.md), [Publication and Confidentiality Policy](../policies/publication-and-confidentiality.md), development, validation, economics, consumer-first, provider-independent, and operational-simplicity policies;
4. deterministic incentive, Living Chronicle, House of Keys, status, and controlled-vocabulary contracts;
5. the accepted [Sprint 6 goal, deliverables, and acceptance criteria](../roadmap/sprints.md#sprint-6--aster-contracts-and-ai-governance);
6. the [Sprint 6 execution plan](../roadmap/sprint-6-execution-plan.md);
7. the public Aster package, validators, tests, architecture records, compatibility manifest, and migration rules; and
8. this reconciliation, the control map, holdpoint register, and completion record.

A lower layer may make a protected requirement more explicit. It may not silently weaken a higher-authority boundary.

## Reviewed Sprint 6 baseline

### Package and public surface

- [`packages/aster`](../../packages/aster)
- [`packages/aster/README.md`](../../packages/aster/README.md)
- [`authority.ts`](../../packages/aster/src/authority.ts)
- [`role-contracts.ts`](../../packages/aster/src/role-contracts.ts)
- [`proposal.ts`](../../packages/aster/src/proposal.ts)
- [`intent.ts`](../../packages/aster/src/intent.ts)
- [`source-recall.ts`](../../packages/aster/src/source-recall.ts)
- [`memory.ts`](../../packages/aster/src/memory.ts)
- [`untrusted-input.ts`](../../packages/aster/src/untrusted-input.ts)
- [`work-lifecycle.ts`](../../packages/aster/src/work-lifecycle.ts)
- [`provider-governance.ts`](../../packages/aster/src/provider-governance.ts)
- [`local-synthetic-adapter.ts`](../../packages/aster/src/local-synthetic-adapter.ts)
- [`compatibility.ts`](../../packages/aster/src/compatibility.ts)
- public validators and public-surface tests under `packages/aster/src` and `packages/aster/test`

### Architecture and product records

- [Aster Contract Boundary](aster-contract-boundary.md)
- [Aster Role Contracts](aster-role-contracts.md)
- [Aster Proposal and Structured Extraction Contracts](aster-proposal-and-extraction-contracts.md)
- [Aster Intent, Confidence, Clarification, and Refusal Contracts](aster-intent-confidence-clarification-refusal.md)
- [Aster Source-Linked Recall and Explanation Contracts](aster-source-linked-recall-and-explanation-contracts.md)
- [Aster Memory Classes and Lifecycle Contracts](aster-memory-lifecycle-contracts.md)
- [Aster Prompt-Injection and Untrusted-Input Isolation Contracts](aster-untrusted-input-isolation-contracts.md)
- [Aster Responsive and Deferred Work Contracts](aster-responsive-and-deferred-work-contracts.md)
- [Aster Provider Governance and Egress Contracts](aster-provider-governance-and-egress-contracts.md)
- [Aster Local Synthetic Adapter and Non-AI Fallbacks](aster-local-synthetic-adapter-and-non-ai-fallbacks.md)
- [Aster Compatibility, Migration, and Cross-Contract Evidence](aster-compatibility-migration-and-cross-contract-evidence.md)
- [Aster Contract Baseline](../product/aster-contract-baseline.md)

## Cross-contract findings

### Product Constitution and player rights

**Result:** consistent.

Sprint 6 returns value through drafting, recall, explanation, navigation, and presentation while preserving person control, meaningful refusal, correction, export, deletion, accessibility context, and complete non-AI paths.

Aster cannot condition core rights, progression, rewards, superior treatment, or product access on broader data collection, retention, provider use, model use, research, sponsorship, or permission.

### Architecture Foundation and bounded capability ownership

**Result:** consistent.

Aster is a bounded proposal and explanation capability. It does not own Chronicle truth, House of Keys permission truth, domain execution, gameplay completion, application state, provider logs, retrieval indexes, queues, schedules, protected audit, or institutional authority.

The package remains dependency-free with no database, network, provider SDK, UI, filesystem, environment, session, secret, wall clock, queue, scheduler, workflow engine, event store, or vector database dependency.

### Living Chronicle contract

**Result:** consistent.

Person-specific recall requires exact Chronicle record and revision evidence. Structured extraction produces reviewable candidates rather than Chronicle values. Proposals, memory, retrieval, provider output, local fixtures, and migration derivatives remain non-canonical.

Correction, conflict, supersession, source lifecycle, deletion, mapping, and uncertainty remain visible. Aster cannot create, alter, store, delete, or resurrect Chronicle truth.

### House of Keys contract

**Result:** consistent.

Permission truth remains external, exact, purpose-specific, subject-specific, action-specific, lifecycle-aware, and fail-closed. Aster cannot create, expand, infer, persist, or override permission.

A proposal may identify an intended action and require exact player confirmation. Confirmation is not permission, and neither confirmation nor permission proves domain execution or storage.

The Wayfinder may route a player to permission review but cannot issue an allow decision, consume authority, or claim that an operation occurred.

### Gameplay and deterministic incentives

**Result:** consistent.

The Storykeeper may present a confirmed domain event but cannot invent canon, complete a quest, grant rewards, or convert model output, engagement, data volume, permission, provider use, or sponsor relationships into progression.

Aster roles, memory, provider evaluation, successful work, compatibility, and migration remain explicitly unable to grant Fellowship, Renown, rewards, governance weight, or superior core rights.

### Intent, clarification, refusal, and uncertainty

**Result:** consistent.

Unknown, mixed, conflicting, unsupported, or materially ambiguous consequential requests fail safely. Qualitative confidence remains explained and non-authoritative. Numeric false precision is rejected.

Direct clarification and refusal preserve player control and do not punish uncertainty, refusal, withdrawal, correction, or manual fallback.

### Source, standards, mapping, and explanation

**Result:** consistent.

Every person-specific health statement requires authoritative Chronicle evidence. Public education remains clearly labeled. Mapping and implementation-guide references preserve exact versions and visible loss, conflict, lifecycle, freshness, and uncertainty.

Standards conformance cannot prove clinical completeness, semantic equivalence, safety, endorsement, permission, or source authority.

### Memory and retention

**Result:** consistent.

Transient context remains request-bounded. Material product memory requires a separate visible player choice and remains inspectable, revision-editable, exportable, and deletable.

Record-linked memory preserves exact Chronicle evidence and falls back to recomputation or direct source inspection. Provider operational metadata remains outside product memory. Memory cannot authorize training, research, commerce, secondary use, canonical writes, permission, confirmation, progression, or rewards.

### Sprint 5 untrusted-input and agent-security inheritance

**Result:** consistent and refined.

Documents, images, imported records, web content, retrieved passages, provider responses, tool results, model output, and prior conversation remain untrusted data.

Deterministic application context owns subject binding, authority revisions, resources, and server-owned tool identities. Embedded instructions cannot modify policy, choose a subject, expand action scope, bypass confirmation, suppress sources or uncertainty, invoke arbitrary resources, cross subject boundaries, or persist themselves as memory.

This satisfies the Sprint 6 contract portion of Sprint 5 holdpoint `HLD-S5-010`. The holdpoint remains open for production provider, private context, retrieval, memory, tool, operational, and independent-review evidence.

### Responsive and deferred work

**Result:** consistent with Decision 0011.

Responsive, deferred, and manual-fallback work preserve stable identity, exact revisions, attempts, bounded retry, domain idempotency, cancellation, provider fallback, stale-result rejection, correction, supersession, and replay.

Acceptance for processing is not completion. Transport de-duplication is not domain duplicate safety. Unknown external outcomes cannot retry automatically. Stale authority cannot be reused.

The contracts do not select or implement a queue, scheduler, workflow engine, event store, worker, database, or observability provider.

### Provider governance and funding doctrine

**Result:** consistent with Decisions 0008 and 0010.

The provider-governance taxonomy intentionally omits production approval. Public or synthetic evaluation uses minimum-necessary fields and prohibits private personal data, Chronicle records, subject identifiers, House of Keys facts, receipts, memory, protected audit, provider operational content, and credentials.

Retention, logging, training, model improvement, human review, abuse monitoring, subprocessors, deletion evidence, regions, concentration, replacement, migration, teardown, incidents, and public claims remain explicit.

A provider-funded evaluator cannot claim independence. Credits, sponsorship, affiliate terms, infrastructure support, related parties, enterprise distribution, or provider relationships cannot control defaults, source rank, connector rank, egress, criteria, findings, benchmark conclusions, publication, compatibility, migration, or governance.

### Consumer-first and provider-independent boundary

**Result:** consistent.

The Living Chronicle remains the provider-independent product center. Aster may explain or prepare drafts around clinical, claims, device, laboratory, pharmacy, EHR, or other imported information only through exact source, mapping, implementation-guide, lifecycle, and uncertainty references.

No external schema, provider, EHR, sponsor, or institutional relationship becomes Chronicle truth, product authority, or a prerequisite for the personal-value loop.

### Compatibility and migration

**Result:** consistent and fail-closed.

The twelve-component manifest binds every public component to exact schemas, revisions, validators, fixtures, compatibility state, migration state, and non-authority.

Optional additive change may remain compatible. Required additions, enum expansion, field removal, semantic change, and revision rebases require evidence-preserving migration. Unknown change fails closed. Authority-boundary changes are incompatible with ordinary migration and require a new governing decision.

Migration preserves source artifacts and prior revisions, creates a new revision, records rollback or forward-only behavior, and cannot create canonical, permission, confirmation, provider-default, source-rank, publication, progression, or reward authority.

### Publication and confidentiality

**Result:** consistent.

All Sprint 6 repository evidence is public or explicitly synthetic. The branch contains no production health data, credentials, provider negotiations, private contracts, private evaluations, protected mappings, real exploit details, private operational evidence, or unsafe source version intentionally committed for later redaction.

Provider-specific operational evidence, vulnerabilities, contracts, credentials, private handling terms, and real user data remain outside public project systems unless a reviewed minimized public derivative is appropriate.

### Institutional Immune System

**Result:** consistent.

Sprint 6 exposes uncertainty, refusal, failure, stale state, conflict, correction, supersession, provider unavailability, concentration, funding conflicts, replacement, teardown, compatibility, migration, residual work, and revalidation triggers.

Controls target harmful conditions and mechanisms rather than people. Containment remains narrow and reversible. Unknown compatibility, stale authority, ambiguous intent, cross-subject claims, and unknown external outcomes fail closed.

### Repository and contributor policy

**Result:** consistent with bounded current evidence.

Public tests import only the package public surface. The branch is subject to formatting, documentation-link validation, repository policy, economics validation, content validation, lint, typecheck, tests, and DCO attestation.

CI validates repository contracts. It does not establish production AI safety, private-runtime security, provider suitability, independent review, or operational reliability.

### Public website and capability claims

**Result:** no runtime expansion.

The existing public website remains a bounded repository gateway and purpose-limited signup adapter. Sprint 6 does not add accounts, health-data intake, private Aster, provider calls, retrieval, memory storage, connectors, clinical workflows, research enrollment, enterprise services, agent tools, or production House of Keys behavior.

Repository navigation and status records may describe Sprint 6 as complete on the review branch. They must continue to distinguish that evidence from merged, deployed, operating, experimental, independently reviewed, or live capability.

### Sprint 7 handoff

**Result:** correctly bounded.

Sprint 7 may implement public documentation and synthetic contributor tooling through Forge MCP after Sprint 6 is explicitly accepted and merged.

Sprint 7 inherits server-owned tool authority, untrusted retrieval, public and synthetic information boundaries, deterministic validation, draft-only generated mappings, provider and funding independence, public receipt and error concepts, and complete non-AI contribution paths.

Sprint 7 does not inherit authority to access private Chronicles, production providers, protected mappings, credentials, private negotiations, real health data, production identity, or consequential domain actions.

## Control-status reconciliation

The accepted evidence vocabulary remains:

- **required** for controls demanded by frozen commitments, accepted decisions, sprint criteria, contracts, threats, or production gates;
- **designed** for documented behavior, authority, lifecycle, failure handling, dependencies, and evidence expectations;
- **synthetically tested** only where a public fixture or scenario records deterministic expected and observed behavior;
- **independently reviewed** only when a named qualified reviewer outside proposing and implementing authority records a bounded review;
- **implemented**, **deployed**, and **operationally verified** only with environment-specific evidence; and
- **deferred**, **not applicable**, **rejected**, or **retired** only through explicit records preserving rationale and residual risk.

Sprint 6 establishes required and designed status for its public contracts and synthetically tested status for the named deterministic fixtures. It does not establish independent review, production implementation, deployment, or operational verification.

## Residual-work reconciliation

All production and specialist gates remain open unless the [specialist holdpoint and unresolved-work register](aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md) records closure evidence.

Principal unresolved areas include:

- provider-specific selection, procurement, contracts, handling, deletion, and exit evidence;
- production identity, House of Keys orchestration, Chronicle persistence, and deterministic domain handoff;
- private context, provider egress, retrieval, indexes, memory storage, tools, credentials, and tenant isolation;
- queue, scheduler, worker, workflow, idempotency, cancellation, monitoring, and incident operations;
- document, image, speech, and imported-record isolation with adversarial testing;
- accessibility and affected-user validation;
- clinical intended-use and health-safety review;
- privacy, legal, records-governance, and regulatory review;
- deletion, provider-copy, backup, restoration, and correction evidence;
- independent security and AI-safety review;
- repository administration, release integrity, founder dependence, and operational ownership; and
- representative performance, reliability, cost, quality, and prompt-injection measurements.

No unresolved item is closed because a contract is comprehensive, a fixture passes, CI is green, a provider advertises a feature, or no incident has been observed.

## Remediations completed in 6.12

- created the Sprint 6 completion record;
- created this cross-contract reconciliation;
- created the Aster control and evidence map;
- created the specialist holdpoint and unresolved-work register;
- mapped every accepted deliverable and acceptance criterion to inspectable evidence;
- reconciled the Sprint 5 security holdpoints with the new Sprint 6 contract evidence;
- preserved provider, funding, source, memory, work, compatibility, migration, and non-AI boundaries;
- identified stale status and navigation records for correction; and
- prepared the bounded Sprint 7 handoff.

## Completion conclusion

Sprint 6 is complete for its accepted public contract, deterministic validation, public synthetic fixture, provider-governance, compatibility, migration, and documentation scope on the review branch.

This conclusion does not claim:

- production readiness;
- a production AI, retrieval, memory, provider, queue, scheduler, workflow, tool, connector, identity, permission, persistence, or clinical runtime;
- private-data egress;
- model or provider quality;
- clinical, privacy, security, accessibility, legal, interoperability, records-governance, procurement, financial, or operational approval;
- deployed backward compatibility or production migration readiness;
- independent specialist certification; or
- completion of institutional Phase 0.

Issue #47 and PR #48 remain open and draft until the founding steward explicitly accepts the completed baseline. Merge records acceptance of the design sprint, not activation of the gated capabilities.