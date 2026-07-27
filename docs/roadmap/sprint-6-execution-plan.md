# Sprint 6 Execution Plan — Aster Contracts and AI Governance

[Documentation home](../README.md) · [Roadmap index](README.md) · [Current status](current-status.md) · [Completion record](sprint-6-completion-record.md) · [Cross-contract reconciliation](../architecture/aster-sprint-6-cross-contract-reconciliation.md) · [Control map](../architecture/aster-sprint-6-control-and-evidence-map.md) · [Holdpoints and unresolved work](../architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md) · [Tracking issue #47](https://github.com/finalboss-tom/calypsos-promise/issues/47) · [Draft PR #48](https://github.com/finalboss-tom/calypsos-promise/pull/48)

- **Status:** COMPLETE ON REVIEW BRANCH — explicit founding-steward acceptance and merge pending
- **Entry baseline:** `main` at `4dfd39e7aa02ffe1ef3f5ba296378b29bd078047`
- **Branch:** `agent/sprint-6-aster-contracts`
- **Draft pull request:** #48
- **Started:** 2026-07-27
- **Information boundary:** public repository records and public synthetic evidence only
- **Certification boundary:** contract, governance, deterministic validation, public synthetic fixtures, compatibility, migration, and completion evidence; not production AI, clinical, privacy, security, accessibility, legal, interoperability, procurement, financial, or operational certification

## Goal

Convert Aster from a concept into enforceable interfaces.

The sprint makes Aster useful and inspectable without making it authoritative. The governing transaction remains:

> AI proposes; the player confirms; deterministic domain services validate and store.

A provider response, model output, conversational acknowledgement, queued request, deferred acceptance, retry, retrieval score, transport success, Aster role name, retained memory, untrusted input, provider account, credit, sponsorship, benchmark, local synthetic fixture, compatibility label, migration plan, passing test, or CI result is never proof of permission, canonical storage, quest completion, reward, provider approval, clinical authority, or domain success.

## Accepted scope

Sprint 6 implements the accepted deliverables and acceptance criteria in [`sprints.md`](sprints.md) without changing their meaning or order.

The implementation establishes one bounded pre-stable package, `@calypsos-promise/aster`, with:

- deliberate public exports and contract version `0.1.0-pre.1`;
- independently versioned serialized authority, role, proposal, extraction, intent, recall, memory, isolation, work, provider, local-fixture, compatibility, and migration contracts;
- stable issue, refusal, ambiguity, finding, failure, compatibility, and migration codes;
- deterministic validators;
- public synthetic fixtures;
- public-surface tests importing only `dist/index.js`;
- a complete non-AI fallback catalogue;
- a cross-contract compatibility manifest;
- completion, control, holdpoint, and unresolved-work records; and
- a bounded Sprint 7 handoff.

The core contract has no database, network, model SDK, provider, UI, filesystem, environment, session, secret, wall-clock, queue, scheduler, workflow-engine, event-store, or vector-database dependency.

## Non-scope

Sprint 6 does not:

- select, endorse, procure, or integrate a production AI provider, EHR, connector, clinical partner, model gateway, queue, scheduler, workflow engine, event store, vector database, sandbox, or enterprise relationship;
- authorize private-data provider egress, production credentials, provider placement, connector ranking, affiliate revenue, procurement, or a provider funding relationship;
- process production health data or create a real-data contributor path;
- implement accounts, production identity, production permission enforcement, production persistence, remote retrieval, production memory storage, provider credentials, clinical decision support, diagnosis, treatment, emergency response, or research enrollment;
- place Aster roles, prompt state, provider metadata, memory, retrieval indexes, local fixtures, compatibility evidence, migration state, or delayed-work execution state inside Living Chronicle truth;
- allow Aster, untrusted input, queue state, retry state, deferred work, provider evaluation, funding, local fixtures, compatibility, or migration to create or expand permission, confirm a proposal, write canonical records, invoke arbitrary resources, determine provider defaults or source rank, complete quests, grant rewards, or determine institutional authority; or
- represent synthetic contract evidence as model quality, clinical safety, privacy, security, accessibility, interoperability, legal sufficiency, production reliability, exactly-once delivery, latency, prompt-injection detection quality, provider suitability, deletion completeness, deployed backward compatibility, production migration readiness, or conformance evidence.

## Authority and package boundary

`@calypsos-promise/aster` owns the pre-stable contracts describing Aster proposals, role behavior, intent, clarification, confidence, source-linked recall and explanation, memory lifecycle, provider governance and egress, untrusted-input isolation, responsive and deferred work, deterministic local substitution, compatibility, migration, cross-contract evidence, and non-AI fallback.

It does not own:

- Living Chronicle records, source truth, correction, export, deletion, persistence, or custody;
- House of Keys grants, policy decisions, revocation, execution, or access receipts;
- quest completion, rewards, progression, or narrative canon;
- application navigation state;
- provider request or response logs;
- provider selection, procurement, credentials, contracts, funding records, or operational approval;
- production migrations, persistence rollback, or real-record transformation;
- retrieval indexes or caches;
- delayed-work execution state;
- protected audit; or
- institutional, clinical, legal, research, funding, or governance authority.

The package may reference external identifiers and revisions through narrow serialized contracts. It may not import another bounded capability merely to gain authority over that capability.

## Execution workstreams

| Workstream | Result | Review-branch status |
| --- | --- | --- |
| 6.1 Bounded capability and authority matrix | dependency-free package, version, roles, owners, prohibitions, authority matrix, and public exports | implemented and validated |
| 6.2 Role contracts | Scribe, Librarian, Wayfinder, Interpreter, and Storykeeper operations, evidence, failure, retention, egress, and fallback | implemented and validated |
| 6.3 Proposal and extraction contracts | proposal identity, provenance, exact-revision review, non-canonical payload, and extraction candidates | implemented and validated |
| 6.4 Intent, confidence, clarification, and refusal | bindable and safe meta intents, consequences, qualitative confidence, ambiguity, clarification, refusal, and fallback | implemented and validated |
| 6.5 Source-linked recall and explanation | exact Chronicle and public-education sources, provenance, mapping, lifecycle, freshness, fallback, and uncertainty | implemented and validated |
| 6.6 Memory classes and lifecycle | transient and retained classes, separate player choice, visibility, revision, export, deletion, egress, and missing-memory fallback | implemented and validated |
| 6.7 Prompt injection and untrusted input | data-only input classes, deterministic context, server-owned tools, findings, containment, and no-effect boundaries | implemented and validated |
| 6.8 Responsive and deferred behavior | identity, attempts, retry, duplicate safety, cancellation, timeout, fallback, stale rejection, correction, supersession, and replay | implemented and validated |
| 6.9 Provider governance and egress | synthetic-only evaluation, minimum-necessary egress, handling, deletion uncertainty, conflicts, concentration, replacement, migration, teardown, and public-claim limits | implemented and validated |
| 6.10 Local substitute and non-AI fallback | seventeen deterministic scenarios, five role fallbacks, and seven complete core non-AI paths | implemented and validated |
| 6.11 Validation, fixtures, compatibility, and cross-contract checks | twelve-component manifest, twelve public fixtures, exact role and scenario bindings, fail-closed compatibility, and evidence-preserving migration | implemented and validated |
| 6.12 Completion and acceptance | completion record, reconciliation, control map, specialist holdpoints, unresolved-work register, status reconciliation, and validation evidence | completion package implemented; explicit founding-steward acceptance and merge pending |

Detailed evidence is preserved in the [Aster Contract Baseline](../product/aster-contract-baseline.md), [Completion Record](sprint-6-completion-record.md), [Cross-Contract Reconciliation](../architecture/aster-sprint-6-cross-contract-reconciliation.md), [Control and Evidence Map](../architecture/aster-sprint-6-control-and-evidence-map.md), and [Specialist Holdpoint and Unresolved-Work Register](../architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md).

## Accepted acceptance-criterion result

| Acceptance criterion | Review-branch conclusion |
| --- | --- |
| Aster cannot write directly to canonical records | met at contract, validator, and public-synthetic-test level |
| Every recalled health statement can reference authoritative records | met at contract, validator, and public-synthetic-test level |
| Material memories are visible, editable, exportable, and deletable | met at contract, validator, and public-synthetic-test level |
| AI unavailability does not block core capture or permissions | met at deterministic local-fixture and public-test level |
| Funding and provider relationships cannot determine authority, defaults, connector rank, egress, benchmark conclusions, or publication | met at governance-contract, compatibility, migration, validator, and public-synthetic-test level |
| Aster cannot imply standards conformance proves clinical completeness, semantic equivalence, safety, or endorsement | met at role, source, validator, and public-synthetic-test level |
| Provider-governance requirements are defined without selecting or endorsing a production provider, EHR, connector, or clinical partner | met at provider-independent contract and documentation level |

These conclusions establish the accepted Sprint 6 design and public-synthetic evidence scope. They do not establish a production implementation or specialist approval.

## Cross-contract invariants

Every workstream preserves:

1. Aster output is a proposal, explanation, navigation aid, presentation proposal, bounded player-controlled memory, bounded work result, provider-evaluation derivative, local synthetic fixture, or compatibility derivative—not canonical truth.
2. Exact player confirmation applies only to the exact proposal and cannot be inferred from engagement, silence, conversational acknowledgement, provider terms, provider credits, prior permission, retained memory, embedded content instructions, queue acceptance, retry state, local scenarios, compatibility labels, or migration plans.
3. House of Keys evaluation remains fail-closed; `indeterminate` never becomes allow.
4. Domain validation and authoritative storage remain separate observable steps after confirmation.
5. Chronicle truth, permission truth, source assertions, Aster proposals, memory, untrusted inputs, work lifecycle, provider governance, local fixtures, compatibility evidence, migration plans, funding records, receipts, audit, product state, retrieval derivatives, provider logs, and delayed-work execution state remain distinct claims.
6. Broader data collection, retention, permission, provider use, research, commerce, sponsorship, credits, affiliate terms, or premium compute cannot buy progression, rewards, core rights, source rank, defaults, placement, favorable findings, benchmark conclusions, compatibility outcomes, publication control, or governance authority.
7. Core capture, structured recall, permission review, correction, export, deletion, and ordinary play retain complete manual and non-AI paths and cannot be blocked by missing memory, unsafe input, delayed work, provider unavailability, funding loss, provider retirement, or migration status.
8. Stale, superseded, canceled, failed, timed-out, provider-unavailable, deleted, expired, unavailable, quarantined, blocked, corrected, retired, incompatible, unknown, or invalidated output, memory, input, work, provider policy, local fixture, compatibility claim, or migration cannot overwrite newer confirmed truth or act under stale authority.
9. A standard, implementation guide, mapping, provider, sponsor, newest source, model, retrieval score, remembered context, successful scan, schema validation, tool result, citation, queue acknowledgement, retry, transport de-duplication, provider promise, benchmark, credit, deletion label, local fixture, compatibility label, or migration plan cannot become automatic truth or proof of completeness, equivalence, safety, endorsement, permission, completion, provider suitability, deletion, independence, backward compatibility, migration readiness, or conformance.
10. Public development remains credential-free and uses only public or synthetic information.

## Validation strategy

Before Sprint 6 is presented for acceptance:

- package tests exercise only the public package surface;
- `pnpm --filter @calypsos-promise/aster test` passes;
- `pnpm check` passes;
- GitHub Actions CI and DCO Attestation pass on the final reviewed head;
- documentation, issue status, roadmap status, completion evidence, and contract versions agree; and
- residual risks, deferred production work, unavailable specialist review, and revalidation triggers remain explicit.

Exact final head, CI run, DCO run, and formatter-remediation evidence are recorded in issue #47 and PR #48 rather than embedded here, preventing a self-referential head update.

## Sprint 7 handoff

After explicit acceptance and squash merge of PR #48, Sprint 7 — Forge MCP and Agent Safety becomes the next numbered boundary.

Sprint 7 may use public documentation and synthetic data, server-owned tool authority, deterministic validation, draft-only generated mappings, public-safe receipts and error contracts, provider and funding independence, and complete non-AI contribution paths.

Sprint 7 may not access private Chronicles, production providers, protected mappings, private negotiations, credentials, real health data, or consequential domain actions.

## Acceptance authority

Passing tests proves only that the checked public contracts and deterministic fixtures behave as asserted.

Sprint 6 is complete on the review branch for its accepted contract, governance, deterministic validation, public synthetic fixture, compatibility, migration, and completion-evidence scope. It closes only after explicit founding-steward review and squash merge.

Neither branch existence, a draft pull request, CI success, model output, retained memory, untrusted input, queued work, retry state, deferred acceptance, provider evaluation, credits, sponsorship, local fixtures, compatibility evidence, migration plans, nor synthetic evidence grants production or specialist-review status.