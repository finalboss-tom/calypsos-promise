# Sprint 6 Aster Control and Evidence Map

[Architecture index](README.md) · [Cross-contract reconciliation](aster-sprint-6-cross-contract-reconciliation.md) · [Specialist holdpoints and unresolved work](aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md) · [Completion record](../roadmap/sprint-6-completion-record.md)

- **Status:** COMPLETE ON REVIEW BRANCH — contract and public-synthetic evidence only
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`
- **Scope:** stable control objectives, owning public contracts, evidence status, acceptance mapping, and revalidation triggers

## Purpose

This map prevents Sprint 6 completion from becoming an undifferentiated claim that “AI safety is done.”

Each control has:

- a stable identifier;
- a bounded objective;
- owning public contracts and validators;
- current evidence status;
- the Sprint 6 acceptance criterion it supports; and
- a future revalidation trigger.

A control may be required, designed, or synthetically tested without being implemented, deployed, operationally verified, or independently reviewed.

## Evidence vocabulary

- **REQUIRED:** demanded by frozen commitments, accepted decisions, Sprint 6 acceptance criteria, inherited security controls, or future production gates.
- **DESIGNED:** expressed as an inspectable public contract, architecture rule, lifecycle, failure state, or validator requirement.
- **SYNTHETICALLY TESTED:** exercised through a named public deterministic fixture or public-surface test.
- **IMPLEMENTED:** present in a bounded runtime or operating process with environment-specific evidence.
- **DEPLOYED:** running in an identified environment under declared operational controls.
- **OPERATIONALLY VERIFIED:** measured in representative operation with current evidence.
- **INDEPENDENTLY REVIEWED:** reviewed by a named qualified reviewer outside proposing and implementing authority.

Sprint 6 establishes only the first three statuses for the controls below, except for the ordinary repository validation machinery in its already bounded public scope.

## Control register

| ID | Control objective | Owning evidence | Current status | Acceptance support | Revalidation trigger |
| --- | --- | --- | --- | --- | --- |
| `CTL-AST-001` | Aster roles and narrative names create no technical authority | `authority.ts`, `validate.ts`, authority tests | required; designed; synthetically tested | no canonical writes; no provider authority | role, owner, action, or authority-matrix change |
| `CTL-AST-002` | Every role remains bound to exact allowed inputs, outputs, operation, owner, evidence, failure, retention, egress, and fallback | `role-contracts.ts`, role validator, role tests | required; designed; synthetically tested | all accepted role deliverables | role contract or operation change |
| `CTL-AST-003` | Proposals remain non-canonical and exact player confirmation binds only the exact proposal revision | `proposal.ts`, proposal validator, proposal tests | required; designed; synthetically tested | no direct canonical writes | proposal, review, confirmation, or action-owner change |
| `CTL-AST-004` | Structured extraction yields reviewable candidates, not Chronicle values or domain acceptance | `proposal.ts`, extraction validation, proposal tests | required; designed; synthetically tested | no direct canonical writes | extraction schema, parser, or handoff change |
| `CTL-AST-005` | Unknown, mixed, conflicting, unsupported, and materially ambiguous consequential intent fails safely | `intent.ts`, intent validator, intent tests | required; designed; synthetically tested | safe Aster behavior; non-AI fallback | intent taxonomy, consequence, or action change |
| `CTL-AST-006` | Person-specific recall requires exact Chronicle record and revision evidence | `source-recall.ts`, source validator, recall tests | required; designed; synthetically tested | every recalled health statement can reference authoritative records | Chronicle schema, source, retrieval, or correction change |
| `CTL-AST-007` | Public education, standards, mappings, and implementation guides cannot imply person-specific truth, completeness, equivalence, safety, or endorsement | `source-recall.ts`, role contracts, recall tests | required; designed; synthetically tested | standards-conformance acceptance criterion | standard, implementation guide, mapping, or public-claim change |
| `CTL-AST-008` | Material product memory requires separate player choice and remains visible, revision-editable, exportable, and deletable | `memory.ts`, memory validator, memory tests | required; designed; synthetically tested | memory-control acceptance criterion | memory class, retention, export, or deletion change |
| `CTL-AST-009` | Transient context, record-linked memory, narrative state, and provider metadata remain separate and cannot authorize secondary use | `memory.ts`, memory validator, memory tests | required; designed; synthetically tested | memory and provider-governance criteria | memory owner, provider metadata, training, or secondary-use change |
| `CTL-AST-010` | Untrusted documents, retrieval, providers, tools, model output, and prior conversation remain data-only | `untrusted-input.ts`, isolation validator, isolation tests | required; designed; synthetically tested | no authority from AI or imported content | new input class, parser, provider, retrieval, or prompt change |
| `CTL-AST-011` | Subject, resource, purpose, authority, and allowed tools come from deterministic application context | `untrusted-input.ts`, isolation validator, isolation tests | required; designed; synthetically tested | no permission expansion; no cross-user access | identity, subject, registry, resource, or tool change |
| `CTL-AST-012` | Responsive, deferred, and manual-fallback states remain truthful and acceptance never means completion | `work-lifecycle.ts`, work validator, work tests | required; designed; synthetically tested | safe deferred behavior; non-AI fallback | work state, acknowledgement, queue, or worker change |
| `CTL-AST-013` | Retry, duplicate safety, idempotency, cancellation, stale rejection, correction, supersession, and replay preserve current authority | `work-lifecycle.ts`, work validator, work tests | required; designed; synthetically tested | no stale or duplicate authority | retry, transaction, queue, schedule, provider, or persistence change |
| `CTL-AST-014` | Provider evaluation uses only minimum-necessary public or synthetic fields and prohibits private or authority-bearing egress | `provider-governance.ts`, provider validator, provider tests | required; designed; synthetically tested | provider-governance acceptance criterion | provider, service, data class, purpose, or egress change |
| `CTL-AST-015` | Provider region, retention, logging, training, human review, subprocessors, deletion, and credentials remain explicit and bounded | `provider-governance.ts`, provider validator, provider tests | required; designed; synthetically tested | provider-governance acceptance criterion | provider terms, region, retention, logging, or deletion change |
| `CTL-AST-016` | Funding, credits, sponsorship, related parties, providers, and enterprise distribution cannot control authority, defaults, ranking, egress, findings, publication, compatibility, or governance | `provider-governance.ts`, `compatibility.ts`, validators and tests | required; designed; synthetically tested | funding and provider-independence acceptance criterion | funding, sponsor, affiliate, provider, evaluator, or enterprise relationship change |
| `CTL-AST-017` | The local adapter is deterministic, synthetic-only, provider-free, network-free, credential-free, clock-free, random-free, and persistence-free | `local-synthetic-adapter.ts`, local validator, local tests | required; designed; synthetically tested | AI unavailability does not block core paths | scenario, adapter, runtime dependency, or fixture change |
| `CTL-AST-018` | All five roles and seven core paths retain AI-free and provider-free fallback | local adapter, role contracts, local tests | required; designed; synthetically tested | AI unavailability does not block capture or permissions | role, fallback, core right, or provider dependency change |
| `CTL-AST-019` | Public components, validators, fixtures, role bindings, scenarios, fallbacks, and provider states cannot drift silently | `compatibility.ts`, compatibility validator and tests | required; designed; synthetically tested | all acceptance criteria and completion integrity | public schema, validator, fixture, scenario, fallback, or provider-state change |
| `CTL-AST-020` | Consequential serialized changes require evidence-preserving migration; unknown changes fail closed; authority changes require a new governing decision | `compatibility.ts`, compatibility validator and tests | required; designed; synthetically tested | no authority through compatibility or migration | revision, field, enum, semantics, authority, or package-version change |
| `CTL-AST-021` | Aster cannot diagnose, prescribe, direct emergency care, or represent standards or provider output as clinical authority | authority, role, intent, source, and provider contracts | required; designed; synthetically tested | standards and provider-governance criteria | intended use, health claim, population, content, or escalation change |
| `CTL-AST-022` | Aster output, memory, provider evaluation, fixtures, compatibility, and migration cannot complete quests or grant rewards | authority, proposal, memory, provider, local, and compatibility contracts | required; designed; synthetically tested | deterministic incentives and non-punitive rights | gameplay, reward, progression, or incentive change |
| `CTL-AST-023` | Public development and evidence remain synthetic or explicitly public and credential-free | package runtime exclusions, provider policy, repository policy, tests | required; designed; synthetically tested | provider-governance and public-information boundary | data source, provider, credential, fixture, or environment change |
| `CTL-AST-024` | Capability and evidence claims remain truthful: contract and synthetic evidence do not become production, deployment, quality, or certification claims | architecture, baseline, completion, holdpoint, and status records | required; designed | all acceptance criteria and Sprint closure | public status, release, provider, pilot, production, or review claim change |

## Acceptance-criterion mapping

| Sprint 6 acceptance criterion | Primary controls | Current evidence conclusion |
| --- | --- | --- |
| Aster cannot write directly to canonical records | `CTL-AST-001`, `CTL-AST-003`, `CTL-AST-004`, `CTL-AST-019`, `CTL-AST-020` | met at contract, validator, and public-synthetic-test level |
| Every recalled health statement can reference authoritative records | `CTL-AST-006`, `CTL-AST-007` | met at contract, validator, and public-synthetic-test level |
| Material memories are visible, editable, exportable, and deletable | `CTL-AST-008`, `CTL-AST-009` | met at contract, validator, and public-synthetic-test level |
| AI unavailability does not block core capture or permissions | `CTL-AST-005`, `CTL-AST-012`, `CTL-AST-017`, `CTL-AST-018` | met at deterministic fixture and public-test level |
| Funding and provider relationships cannot determine authority, defaults, ranking, egress, benchmark conclusions, or publication | `CTL-AST-014`, `CTL-AST-015`, `CTL-AST-016`, `CTL-AST-019`, `CTL-AST-020` | met at governance-contract, validator, and public-synthetic-test level |
| Aster cannot imply standards conformance proves completeness, equivalence, safety, or endorsement | `CTL-AST-007`, `CTL-AST-021`, `CTL-AST-024` | met at role, source, validator, and public-synthetic-test level |
| Provider governance is defined without selecting or endorsing a production provider, EHR, connector, or clinical partner | `CTL-AST-014`, `CTL-AST-015`, `CTL-AST-016`, `CTL-AST-023`, `CTL-AST-024` | met at provider-independent contract and documentation level |

## Sprint 5 inheritance mapping

Sprint 6 refines but does not close these inherited holdpoints:

| Sprint 5 holdpoint | Sprint 6 evidence added | Remaining gate |
| --- | --- | --- |
| `HLD-S5-002` privacy and data protection | memory, egress, retention, training, secondary-use, and deletion contracts | production data inventory, purposes, providers, rights procedures, deletion evidence, and independent privacy review |
| `HLD-S5-004` House of Keys distributed enforcement | exact authority revisions, permission-neutral proposals, deterministic permission-review fallback | production orchestration, final pre-release checks, concurrency, receipts, cancellation, and independent review |
| `HLD-S5-005` Chronicle persistence and custody | exact source revisions, non-canonical extraction, correction and deletion awareness | production storage, custody, transactions, export, deletion, restoration, and independent review |
| `HLD-S5-009` upload and media isolation | public untrusted-input classes and containment contracts | real parser, sandbox, malware, resource-limit, patching, and adversarial evidence |
| `HLD-S5-010` Aster, provider, retrieval, and prompt safety | complete Sprint 6 contract, provider-governance, memory, isolation, fallback, and fixture baseline | production provider, private context, retrieval, memory, tools, operational evidence, and independent AI-safety review |
| `HLD-S5-011` MCP and agent mediation | server-owned tool and arbitrary-resource prohibition | Sprint 7 tool registry, scopes, receipts, rate limits, isolated abuse tests, and later private-tool review |
| `HLD-S5-012` connectors | source, mapping, implementation-guide, and provider-neutral boundaries | provider-specific authentication, custody, synchronization, provenance, revocation, and contract review |
| `HLD-S5-015` clinical safety | explicit non-clinical authority and standards limitations | intended-use, claim, population, escalation, evidence, and named clinical review |
| `HLD-S5-016` accessibility | accessibility memory class and complete non-AI fallback requirements | implemented interfaces, affected-user testing, audit, and remediation evidence |
| `HLD-S5-017` reliability and incident operations | explicit work, retry, timeout, cancellation, fallback, stale, correction, and replay contracts | production objectives, monitoring, paging, workers, incident command, restoration, and measured evidence |
| `HLD-S5-018` protected audit and records governance | audit remains separate and provider references remain bounded | production fields, access, integrity, retention, holds, deletion, and specialist approval |
| `HLD-S5-019` deletion verification | memory and provider deletion uncertainty, source lifecycle, and non-overclaim rules | complete target graph, execution, provider and recipient evidence, backup expiry, and specialist review |
| `HLD-S5-020` release integrity | dependency-free package, lockfile, CI, tests, and compatibility manifest | branch protection, provenance, signing if used, release verification, rollback, and compromise exercise |
| `HLD-S5-021` repository administration | public checks and DCO continue | verified administrative settings, distributed review, recovery, and founder-independent administration |
| `HLD-S5-024` legal and hosted-service boundary | provider-independent non-production contracts and bounded claims | jurisdiction, entity, contract, consumer, privacy, clinical, AI, and hosted-service review |

## Cross-control invariants

All controls preserve these invariants:

1. AI proposes; the player confirms; deterministic domain services validate and store.
2. Chronicle truth, permission truth, source assertions, proposals, memory, work, provider governance, local fixtures, compatibility, migration, receipts, audit, application state, and gameplay state remain distinct claims.
3. Missing, stale, ambiguous, conflicting, unsupported, deleted, expired, unavailable, timed-out, cancelled, quarantined, blocked, superseded, corrected, retired, incompatible, or unknown state fails safely.
4. Public and synthetic evidence cannot authorize private data, production capability, provider approval, clinical behavior, deployment, or specialist certification.
5. Core capture, structured recall, permission review, correction, export, deletion, and ordinary play retain complete non-AI paths.
6. Funding, providers, sponsors, credits, affiliates, institutions, or enterprise distribution cannot buy authority, rank, findings, publication, exceptions, progression, or governance.
7. A standard, mapping, provider, model, retrieval score, memory, fixture, validator, compatibility label, migration plan, or passing test cannot become automatic truth.

## Closure rule

A control is not promoted because:

- a TypeScript type is comprehensive;
- a deterministic validator passes;
- CI is green;
- a synthetic scenario behaves as expected;
- a provider claims a feature;
- a founding steward approves the design sprint; or
- no incident has been observed.

Higher evidence status requires the named implementation, operational, affected-user, specialist, or independent evidence appropriate to the claim.