# Sprint 6 Completion Record — Aster Contracts and AI Governance

[Current status](current-status.md) · [Sprint 6 execution plan](sprint-6-execution-plan.md) · [Aster architecture](../architecture/README.md#aster-architecture) · [Cross-contract reconciliation](../architecture/aster-sprint-6-cross-contract-reconciliation.md) · [Control and evidence map](../architecture/aster-sprint-6-control-and-evidence-map.md) · [Specialist holdpoints and unresolved work](../architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md)

- **Status:** COMPLETE ON REVIEW BRANCH — explicit founding-steward acceptance and merge pending
- **Tracking issue:** [#47](https://github.com/finalboss-tom/calypsos-promise/issues/47)
- **Pull request:** [#48](https://github.com/finalboss-tom/calypsos-promise/pull/48)
- **Entry baseline:** `main` at `4dfd39e7aa02ffe1ef3f5ba296378b29bd078047`
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`
- **Scope:** public provider-independent contracts, deterministic validators, public synthetic fixtures, compatibility and migration rules, completion evidence, and specialist holdpoints only

## Completion decision

Sprint 6 produced a coherent pre-stable Aster contract baseline for the accepted goal:

> Convert Aster from a concept into enforceable interfaces.

The review branch now contains bounded authority, role, proposal, extraction, intent, recall, memory, untrusted-input, work-lifecycle, provider-governance, local-adapter, compatibility, migration, and validation contracts for Aster's five narrative roles.

The permanent transaction boundary remains:

> AI proposes; the player confirms; deterministic domain services validate and store.

This record does not claim production AI, private-data processing, model quality, clinical safety, legal sufficiency, privacy certification, security certification, accessibility conformance, interoperability conformance, provider approval, operational reliability, production migration readiness, or independent specialist review.

Branch completion means the accepted Sprint 6 contract and public-synthetic evidence scope is ready for explicit founding-steward review. It does not authorize merge, deployment, provider selection, private egress, real health data, production memory, retrieval, durable execution, agents, connectors, or clinical behavior.

## Review authority and precedence

The completion review used this order:

1. frozen Product Constitution, Architecture Foundation, Gameplay Foundation, World and Lore Canon, and institutional commitments;
2. accepted decisions, progressive decentralization, and the Institutional Immune System;
3. security, publication, development, economics, consumer-first, provider-independent, and operational-simplicity policies;
4. Living Chronicle, House of Keys, deterministic incentive, and public-status contracts;
5. the accepted Sprint 6 goal, deliverables, and acceptance criteria;
6. Sprint 6 authority, role, proposal, intent, recall, memory, isolation, work, provider, local-fixture, compatibility, migration, validator, and test evidence;
7. the [cross-contract reconciliation](../architecture/aster-sprint-6-cross-contract-reconciliation.md);
8. the [control and evidence map](../architecture/aster-sprint-6-control-and-evidence-map.md);
9. the [specialist holdpoint and unresolved-work register](../architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md); and
10. this completion record.

A lower layer may make a protected requirement more explicit. It may not silently weaken a higher-authority boundary.

## Accepted deliverable mapping

### Scribe contract

**Status:** met at public contract and synthetic-fixture level.

The Scribe prepares reviewable structured-capture proposals and extraction candidates. It cannot confirm, validate, store, correct, or delete Chronicle truth.

Evidence:

- [`authority.ts`](../../packages/aster/src/authority.ts)
- [`role-contracts.ts`](../../packages/aster/src/role-contracts.ts)
- [`proposal.ts`](../../packages/aster/src/proposal.ts)
- [`aster-role-contracts.md`](../architecture/aster-role-contracts.md)
- [`aster-proposal-and-extraction-contracts.md`](../architecture/aster-proposal-and-extraction-contracts.md)

### Librarian contract

**Status:** met at public contract and synthetic-fixture level.

The Librarian prepares source-linked recall from exact Chronicle revisions or clearly labeled public educational material. Retrieval score, source recency, provider identity, and public material cannot become person-specific truth.

Evidence:

- [`role-contracts.ts`](../../packages/aster/src/role-contracts.ts)
- [`source-recall.ts`](../../packages/aster/src/source-recall.ts)
- [`aster-source-linked-recall-and-explanation-contracts.md`](../architecture/aster-source-linked-recall-and-explanation-contracts.md)

### Wayfinder contract

**Status:** met at public contract and synthetic-fixture level.

The Wayfinder proposes product routes and permission-review navigation without creating permission, proving completion, or invoking authoritative actions.

Evidence:

- [`role-contracts.ts`](../../packages/aster/src/role-contracts.ts)
- [`intent.ts`](../../packages/aster/src/intent.ts)
- [`local-synthetic-adapter.ts`](../../packages/aster/src/local-synthetic-adapter.ts)

### Interpreter contract

**Status:** met at public contract and synthetic-fixture level.

The Interpreter prepares source-aware explanations while preserving uncertainty, mapping loss, source lifecycle, implementation-guide limits, and the separation between standards conformance and clinical completeness, equivalence, safety, or endorsement.

Evidence:

- [`role-contracts.ts`](../../packages/aster/src/role-contracts.ts)
- [`source-recall.ts`](../../packages/aster/src/source-recall.ts)
- [`aster-source-linked-recall-and-explanation-contracts.md`](../architecture/aster-source-linked-recall-and-explanation-contracts.md)

### Storykeeper contract

**Status:** met at public contract and synthetic-fixture level.

The Storykeeper prepares narrative presentation only from confirmed domain events and cannot invent canon, progression, quest completion, or rewards.

Evidence:

- [`role-contracts.ts`](../../packages/aster/src/role-contracts.ts)
- [`local-synthetic-adapter.ts`](../../packages/aster/src/local-synthetic-adapter.ts)
- [`aster-local-synthetic-adapter-and-non-ai-fallbacks.md`](../architecture/aster-local-synthetic-adapter-and-non-ai-fallbacks.md)

### Intent, extraction, confidence, clarification, and refusal

**Status:** met at public contract, deterministic validation, and synthetic-fixture level.

The baseline defines supported bindable intents, safe meta intents, consequence classes, qualitative confidence, ambiguity, clarification lifecycle, refusal reasons, extraction candidates, and visible unsupported material. Consequential uncertainty fails safely rather than choosing the most likely action.

Evidence:

- [`intent.ts`](../../packages/aster/src/intent.ts)
- [`proposal.ts`](../../packages/aster/src/proposal.ts)
- [`validate-intent.ts`](../../packages/aster/src/validate-intent.ts)
- [`validate-proposal.ts`](../../packages/aster/src/validate-proposal.ts)

### AI memory classes and retention rules

**Status:** met at public contract and synthetic-test level.

Material product memory requires a separate visible player choice and remains visible, revision-editable, exportable, and deletable. Transient context does not silently become retained memory. Provider operational metadata remains outside product memory.

Evidence:

- [`memory.ts`](../../packages/aster/src/memory.ts)
- [`validate-memory.ts`](../../packages/aster/src/validate-memory.ts)
- [`aster-memory-lifecycle-contracts.md`](../architecture/aster-memory-lifecycle-contracts.md)

### Provider egress, evaluation, and funding conflicts

**Status:** met at provider-independent governance-contract and synthetic-test level.

The baseline permits only minimum-necessary public or synthetic evaluation, explicitly records handling and deletion uncertainty, prohibits production approval, and prevents credits, sponsorship, funding, related parties, provider relationships, or enterprise distribution from controlling source authority, defaults, connector rank, egress, benchmark conclusions, publication, or governance.

Evidence:

- [`provider-governance.ts`](../../packages/aster/src/provider-governance.ts)
- [`validate-provider-governance.ts`](../../packages/aster/src/validate-provider-governance.ts)
- [`aster-provider-governance-and-egress-contracts.md`](../architecture/aster-provider-governance-and-egress-contracts.md)

### Source, mapping, provenance, and uncertainty explanation

**Status:** met at public contract and synthetic-test level.

Exact Chronicle sources, public educational sources, source locators, source and record revisions, lifecycle, correction, conflict, deletion, mapping, implementation-guide, retrieval-freshness, fallback, confidence, and uncertainty remain inspectable.

Evidence:

- [`source-recall.ts`](../../packages/aster/src/source-recall.ts)
- [`validate-source-recall.ts`](../../packages/aster/src/validate-source-recall.ts)
- [`aster-source-linked-recall-and-explanation-contracts.md`](../architecture/aster-source-linked-recall-and-explanation-contracts.md)

### Prompt-injection isolation

**Status:** met at public contract and synthetic-test level.

Documents, images, imported records, web content, retrieval, providers, tools, model output, and prior conversation remain untrusted data. Embedded instructions cannot select the subject, create permission, change policy, bypass confirmation, invoke arbitrary resources, hide sources or uncertainty, cross user boundaries, or persist themselves as memory.

Evidence:

- [`untrusted-input.ts`](../../packages/aster/src/untrusted-input.ts)
- [`validate-untrusted-input.ts`](../../packages/aster/src/validate-untrusted-input.ts)
- [`aster-untrusted-input-isolation-contracts.md`](../architecture/aster-untrusted-input-isolation-contracts.md)

### Non-AI fallback behavior

**Status:** met at deterministic local-fixture and public-test level.

Five role fallbacks and seven core paths preserve manual capture, structured recall, permission review, correction, export, deletion, and ordinary play without AI or a provider.

Evidence:

- [`local-synthetic-adapter.ts`](../../packages/aster/src/local-synthetic-adapter.ts)
- [`validate-local-synthetic-adapter.ts`](../../packages/aster/src/validate-local-synthetic-adapter.ts)
- [`aster-local-synthetic-adapter-and-non-ai-fallbacks.md`](../architecture/aster-local-synthetic-adapter-and-non-ai-fallbacks.md)

## Accepted acceptance-criterion mapping

### Aster cannot write directly to canonical records

**Status:** met at contract, validator, and public-synthetic-test level.

Every public authority, role, proposal, memory, untrusted-input, work, provider, local-adapter, compatibility, and migration boundary denies canonical-write authority. Domain acceptance, validation, and storage remain separate after exact player confirmation.

### Every recalled health statement can reference authoritative records

**Status:** met at contract, validator, and public-synthetic-test level.

Person-specific health statements require exact Chronicle record and revision evidence. Public educational material remains labeled and cannot establish a person-specific fact.

### Material memories are visible, editable, exportable, and deletable

**Status:** met at contract, validator, and public-synthetic-test level.

All material product-memory classes require separate player choice, visibility, revision-based editing, export, and deletion. Missing memory cannot block core rights.

### AI unavailability does not block core capture or permissions

**Status:** met at deterministic local-fixture and public-test level.

Manual capture and deterministic House of Keys permission review remain available without AI or a provider. Structured recall, correction, export, deletion, and ordinary play also retain complete non-AI paths.

### Funding and provider relationships cannot determine authority, defaults, ranking, egress, benchmark conclusions, or publication

**Status:** met at provider-governance, compatibility, migration, validator, and public-synthetic-test level.

Funding and provider influence are explicitly prohibited from controlling source authority, provider defaults, connector rank, egress policy, evaluation conclusions, publication, compatibility outcomes, migration decisions, or governance.

### Aster cannot imply that standards conformance proves clinical completeness, semantic equivalence, safety, or endorsement

**Status:** met at source-recall, role, validator, and public-synthetic-test level.

Mapping and implementation-guide evidence remains bounded. Partial, lossy, conflicting, unsupported, stale, or unavailable source states require visible limitations and uncertainty.

### Provider governance is defined without selecting or endorsing a production provider, EHR, connector, or clinical partner

**Status:** met at provider-independent contract and documentation level.

The public governance taxonomy intentionally has no production-approved state. No provider, EHR, connector, clinical partner, model gateway, private-data route, or enterprise relationship is selected.

## Workstream completion mapping

| Workstream | Completion evidence                                                                                                  | Evidence status                                                |
| ---------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| 6.1        | bounded package, version, authority matrix, prohibitions, and public exports                                         | complete at contract and test level                            |
| 6.2        | five detailed role contracts with evidence, failure, retention, egress, and fallback                                 | complete at contract and test level                            |
| 6.3        | proposal envelope, exact review revision, transformation provenance, and extraction candidates                       | complete at contract and test level                            |
| 6.4        | intent, confidence, ambiguity, clarification, refusal, and safe fallback                                             | complete at contract and test level                            |
| 6.5        | exact source-linked recall, mapping, lifecycle, freshness, fallback, and uncertainty                                 | complete at contract and test level                            |
| 6.6        | memory classes, separate player choice, lifecycle, correction, export, deletion, and non-blocking absence            | complete at contract and test level                            |
| 6.7        | untrusted-input and prompt-injection isolation                                                                       | complete at contract and test level                            |
| 6.8        | responsive and deferred work, retry, duplicate safety, cancellation, stale rejection, correction, and replay         | complete at contract and test level                            |
| 6.9        | provider egress, handling, deletion uncertainty, evaluation independence, funding conflicts, concentration, and exit | complete at contract and test level                            |
| 6.10       | seventeen deterministic scenarios, five role fallbacks, and seven core non-AI paths                                  | complete at public-synthetic-fixture and test level            |
| 6.11       | twelve-component manifest, public fixture catalogue, compatibility, migration, and cross-contract validation         | complete at contract and test level                            |
| 6.12       | completion record, reconciliation, control map, specialist holdpoints, unresolved work, and final validation         | complete on review branch; founding-steward acceptance pending |

## Validation and evidence status

The branch must pass the repository's complete validation surface on the final reviewed head. Exact head, CI run, DCO run, and any formatter-remediation evidence are recorded in issue #47 and PR #48 so this file does not create a self-referential head update.

The public evidence establishes:

- deliberate public exports and public-surface tests importing only `dist/index.js`;
- deterministic validation with stable issue, refusal, ambiguity, finding, failure, compatibility, and migration codes;
- twelve public component identities and twelve public fixture records;
- seventeen deterministic local scenarios, five role fallbacks, and seven core non-AI paths;
- exact role, operation, proposal-kind, success-scenario, and fallback bindings;
- exact provider-governance state coverage with production approval absent;
- fail-closed compatibility and evidence-preserving migration rules; and
- repository-wide formatting, documentation-link, content, policy, economics, lint, typecheck, test, and DCO checks.

The public evidence does not establish:

- model or provider quality;
- production prompt-injection detection rates;
- production privacy, security, accessibility, clinical, legal, interoperability, reliability, or deletion assurance;
- deployed backward compatibility or production migration readiness;
- private-data provider egress;
- production identity, permission orchestration, persistence, retrieval, memory, queues, schedulers, workflows, tools, connectors, or agents; or
- independent specialist review.

## Specialist holdpoints and unresolved work

No production or specialist holdpoint is closed merely because Sprint 6 is complete at contract and public-synthetic evidence level.

The controlling follow-up record is the [Sprint 6 Specialist Holdpoint and Unresolved-Work Register](../architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md). It inherits and refines the Sprint 5 Aster, privacy, identity, Chronicle, House of Keys, upload, MCP, connector, clinical, accessibility, reliability, audit, deletion, supply-chain, repository, founder-dependence, and legal holdpoints.

## Sprint 7 handoff

After explicit acceptance and merge, Sprint 7 — Forge MCP and Agent Safety may begin within its accepted public-documentation and synthetic-data boundary.

Sprint 7 inherits:

- server-owned tool authority and resource binding;
- data-only treatment of retrieved content;
- exact public and synthetic source provenance;
- deterministic validation and draft-only generated mappings;
- provider, funding, sponsor, and publication independence;
- stable operation, failure, refusal, retry, cancellation, and receipt concepts where applicable;
- complete non-AI repository contribution paths; and
- all open production, private-data, identity, provider, clinical, legal, accessibility, security, and operational holdpoints.

Sprint 7 may not reinterpret Sprint 6 completion as authority to access private Chronicles, production providers, protected mappings, private negotiations, credentials, real health data, or consequential domain actions.

## Acceptance authority

Sprint 6 is complete on the review branch for its accepted contract, deterministic validation, public synthetic fixture, governance, compatibility, migration, and documentation scope.

The sprint is not accepted or merged until the founding steward explicitly reviews and approves PR #48. That decision must remain inspectable in the issue and pull-request record.

Approval and merge will record acceptance of the design sprint only. They will not authorize production AI, private data, clinical behavior, provider selection, deployment, specialist certification, or Phase 0 exit.
