# Sprint 6 Aster Control and Evidence Map

[Architecture index](README.md) · [Cross-contract reconciliation](aster-sprint-6-cross-contract-reconciliation.md) · [Specialist holdpoints and unresolved work](aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md) · [Completion record](../roadmap/sprint-6-completion-record.md) · [Pre-Sprint 7 review](../roadmap/pre-sprint-7-alignment-review.md)

- **Status:** COMPLETE AND MERGED — contract and public-synthetic evidence only
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`
- **Merge commit:** `5aa3540765e5573f3304ce2b624d7a02c3ba2d13`
- **Scope:** stable control objectives, owning public contracts, evidence status, acceptance mapping, and revalidation triggers

## Purpose

This map prevents Sprint 6 completion from becoming an undifferentiated claim that “AI safety is done.”

Each control has a stable identity, bounded objective, owning evidence, current status, acceptance mapping, and revalidation trigger.

A control may be required, designed, or synthetically tested without being implemented, deployed, operationally verified, or independently reviewed.

## Evidence vocabulary

- **REQUIRED:** demanded by frozen commitments, accepted decisions, Sprint 6 acceptance criteria, inherited security controls, or future production gates.
- **DESIGNED:** expressed as an inspectable public contract, architecture rule, lifecycle, failure state, or validator requirement.
- **SYNTHETICALLY TESTED:** exercised through a named public deterministic fixture or public-surface test.
- **IMPLEMENTED:** present in a bounded runtime or operating process with environment-specific evidence.
- **DEPLOYED:** running in an identified environment under declared operational controls.
- **OPERATIONALLY VERIFIED:** measured in representative operation with current evidence.
- **INDEPENDENTLY REVIEWED:** reviewed by a named qualified reviewer outside proposing and implementing authority.

Sprint 6 establishes only the first three statuses for the controls below, except for ordinary repository validation machinery in its already bounded public scope.

## Control register

| ID | Control objective | Owning evidence | Current status | Acceptance support | Revalidation trigger |
| --- | --- | --- | --- | --- | --- |
| `CTL-AST-001` | Aster roles and narrative names create no technical authority | `authority.ts`, authority validator and tests | required; designed; synthetically tested | no canonical writes; no provider authority | role, owner, action, or authority-matrix change |
| `CTL-AST-002` | Every role remains bound to exact inputs, outputs, operation, owner, evidence, failure, retention, egress, and fallback | `role-contracts.ts`, role validator and tests | required; designed; synthetically tested | all accepted role deliverables | role contract or operation change |
| `CTL-AST-003` | Proposals remain non-canonical and exact player confirmation binds only the exact proposal revision | `proposal.ts`, proposal validator and tests | required; designed; synthetically tested | no direct canonical writes | proposal, review, confirmation, or action-owner change |
| `CTL-AST-004` | Structured extraction yields reviewable candidates, not Chronicle values or domain acceptance | proposal contracts, extraction validation and tests | required; designed; synthetically tested | no direct canonical writes | extraction schema, parser, or handoff change |
| `CTL-AST-005` | Unknown, mixed, conflicting, unsupported, and materially ambiguous consequential intent fails safely | `intent.ts`, intent validator and tests | required; designed; synthetically tested | safe Aster behavior; non-AI fallback | intent taxonomy, consequence, or action change |
| `CTL-AST-006` | Person-specific recall requires exact Chronicle record and revision evidence | `source-recall.ts`, source validator and tests | required; designed; synthetically tested | authoritative recall evidence | Chronicle schema, source, retrieval, or correction change |
| `CTL-AST-007` | Public education, standards, mappings, and implementation guides cannot imply person-specific truth, completeness, equivalence, safety, or endorsement | source and role contracts, tests | required; designed; synthetically tested | standards-conformance criterion | standard, guide, mapping, or public-claim change |
| `CTL-AST-008` | Material product memory requires separate player choice and remains visible, revision-editable, exportable, and deletable | `memory.ts`, memory validator and tests | required; designed; synthetically tested | memory-control criterion | memory class, retention, export, or deletion change |
| `CTL-AST-009` | Transient context, record-linked memory, narrative state, and provider metadata remain separate and cannot authorize secondary use | memory contracts, validator and tests | required; designed; synthetically tested | memory and provider criteria | memory owner, provider metadata, training, or secondary-use change |
| `CTL-AST-010` | Untrusted documents, retrieval, providers, tools, model output, and prior conversation remain data-only | `untrusted-input.ts`, isolation validator and tests | required; designed; synthetically tested | no authority from AI or imported content | input class, parser, provider, retrieval, or prompt change |
| `CTL-AST-011` | Subject, resource, purpose, authority, and allowed tools come from deterministic application context | isolation contracts, validator and tests | required; designed; synthetically tested | no permission expansion or cross-user access | identity, subject, registry, resource, or tool change |
| `CTL-AST-012` | Responsive, deferred, and manual-fallback states remain truthful and acceptance never means completion | `work-lifecycle.ts`, work validator and tests | required; designed; synthetically tested | safe deferred behavior; fallback | work state, acknowledgement, queue, or worker change |
| `CTL-AST-013` | Retry, duplicate safety, idempotency, cancellation, stale rejection, correction, supersession, and replay preserve current authority | work contracts, validator and tests | required; designed; synthetically tested | no stale or duplicate authority | retry, transaction, queue, schedule, provider, or persistence change |
| `CTL-AST-014` | Provider evaluation uses only minimum-necessary public or synthetic fields and prohibits private or authority-bearing egress | provider contracts, validator and tests | required; designed; synthetically tested | provider-governance criterion | provider, service, data class, purpose, or egress change |
| `CTL-AST-015` | Provider region, retention, logging, training, human review, subprocessors, deletion, and credentials remain explicit and bounded | provider contracts, validator and tests | required; designed; synthetically tested | provider-governance criterion | provider terms, region, retention, logging, or deletion change |
| `CTL-AST-016` | Funding, credits, sponsorship, related parties, providers, and enterprise distribution cannot control authority, defaults, ranking, egress, findings, publication, compatibility, or governance | provider and compatibility contracts, tests | required; designed; synthetically tested | funding and provider independence | funding, sponsor, affiliate, provider, evaluator, or enterprise relationship change |
| `CTL-AST-017` | The local adapter remains deterministic, synthetic-only, provider-free, network-free, credential-free, clock-free, random-free, and persistence-free | local adapter, validator and tests | required; designed; synthetically tested | AI unavailability criterion | scenario, adapter, runtime dependency, or fixture change |
| `CTL-AST-018` | All five roles and seven core paths retain AI-free and provider-free fallback | local adapter, role contracts and tests | required; designed; synthetically tested | AI unavailability criterion | role, fallback, core right, or provider dependency change |
| `CTL-AST-019` | Public components, validators, fixtures, role bindings, scenarios, fallbacks, and provider states cannot drift silently | compatibility contracts, validator and tests | required; designed; synthetically tested | completion integrity | public schema, validator, fixture, scenario, fallback, or provider-state change |
| `CTL-AST-020` | Consequential serialized changes require evidence-preserving migration; unknown changes fail closed; authority changes require a new decision | compatibility contracts, validator and tests | required; designed; synthetically tested | no authority through compatibility or migration | revision, field, enum, semantics, authority, or package-version change |
| `CTL-AST-021` | Aster cannot diagnose, prescribe, direct emergency care, or represent standards or provider output as clinical authority | authority, role, intent, source, and provider contracts | required; designed; synthetically tested | standards and provider criteria | intended use, health claim, population, content, or escalation change |
| `CTL-AST-022` | Aster output, memory, provider evaluation, fixtures, compatibility, and migration cannot complete quests or grant rewards | authority, proposal, memory, provider, local, and compatibility contracts | required; designed; synthetically tested | deterministic incentives | gameplay, reward, progression, or incentive change |
| `CTL-AST-023` | Public development and evidence remain synthetic or explicitly public and credential-free | runtime exclusions, provider policy, repository policy and tests | required; designed; synthetically tested | public-information boundary | data source, provider, credential, fixture, or environment change |
| `CTL-AST-024` | Capability and evidence claims remain truthful: contract and synthetic evidence do not become production, deployment, quality, or certification claims | architecture, baseline, completion, holdpoint, and status records | required; designed | all acceptance criteria and closure | public status, release, provider, pilot, production, or review claim change |

## Acceptance-criterion mapping

| Sprint 6 acceptance criterion | Primary controls | Evidence conclusion |
| --- | --- | --- |
| Aster cannot write directly to canonical records | `CTL-AST-001`, `003`, `004`, `019`, `020` | met at contract, validator, and public-synthetic-test level |
| Every recalled health statement can reference authoritative records | `CTL-AST-006`, `007` | met at contract, validator, and public-synthetic-test level |
| Material memories are visible, editable, exportable, and deletable | `CTL-AST-008`, `009` | met at contract, validator, and public-synthetic-test level |
| AI unavailability does not block core capture or permissions | `CTL-AST-005`, `012`, `017`, `018` | met at deterministic fixture and public-test level |
| Funding and providers cannot determine authority, defaults, ranking, egress, conclusions, or publication | `CTL-AST-014`, `015`, `016`, `019`, `020` | met at governance-contract, validator, and public-synthetic-test level |
| Standards conformance cannot imply completeness, equivalence, safety, or endorsement | `CTL-AST-007`, `021`, `024` | met at role, source, validator, and public-synthetic-test level |
| Provider governance is defined without selecting a production provider, EHR, connector, or clinical partner | `CTL-AST-014`, `015`, `016`, `023`, `024` | met at provider-independent contract and documentation level |

## Sprint 5 inheritance

Sprint 6 refines but does not close inherited privacy, House of Keys enforcement, Chronicle persistence, media isolation, Aster and prompt safety, MCP mediation, connector, clinical, accessibility, reliability, audit, deletion, release, repository-administration, and legal holdpoints.

The detailed inherited and Sprint 6 holdpoints remain in the [Specialist Holdpoint and Unresolved-Work Register](aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md).

Sprint 7 specifically inherits MCP holdpoint `HLD-S5-011` and every applicable Sprint 6 tool, provider, identity, infrastructure, media, retrieval, reliability, governance, and legal gate.

## Cross-control invariants

1. AI proposes; the player confirms; deterministic domain services validate and store.
2. Chronicle truth, permission truth, source assertions, proposals, memory, work, provider governance, fixtures, compatibility, migration, receipts, audit, application state, and gameplay state remain distinct claims.
3. Missing, stale, ambiguous, conflicting, unsupported, deleted, expired, unavailable, timed-out, cancelled, quarantined, blocked, superseded, corrected, retired, incompatible, or unknown state fails safely.
4. Public and synthetic evidence cannot authorize private data, production capability, provider approval, clinical behavior, deployment, or specialist certification.
5. Core capture, structured recall, permission review, correction, export, deletion, and ordinary play retain complete non-AI paths.
6. Funding, providers, sponsors, credits, affiliates, institutions, or enterprise distribution cannot buy authority, rank, findings, publication, exceptions, progression, or governance.

## Closure rule

A control is not promoted because a TypeScript type is comprehensive, a deterministic validator passes, CI is green, a synthetic scenario behaves as expected, a provider claims a feature, a founding steward approves the design sprint, or no incident has been observed.

Higher evidence status requires the named implementation, operational, affected-user, specialist, or independent evidence appropriate to the claim.
