# Sprint 6 Completion Record — Aster Contracts and AI Governance

[Current status](current-status.md) · [Sprint 6 execution plan](sprint-6-execution-plan.md) · [Pre-Sprint 7 review](pre-sprint-7-alignment-review.md) · [Aster architecture](../architecture/README.md#aster-architecture) · [Cross-contract reconciliation](../architecture/aster-sprint-6-cross-contract-reconciliation.md) · [Control and evidence map](../architecture/aster-sprint-6-control-and-evidence-map.md) · [Specialist holdpoints and unresolved work](../architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md)

- **Status:** COMPLETE AND MERGED
- **Tracking issue:** [#47](https://github.com/finalboss-tom/calypsos-promise/issues/47)
- **Pull request:** [#48](https://github.com/finalboss-tom/calypsos-promise/pull/48)
- **Squash commit:** `5aa3540765e5573f3304ce2b624d7a02c3ba2d13`
- **Entry baseline:** `main` at `4dfd39e7aa02ffe1ef3f5ba296378b29bd078047`
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`
- **Scope:** public provider-independent contracts, deterministic validators, public synthetic fixtures, compatibility and migration rules, completion evidence, and specialist holdpoints only

## Completion decision

Sprint 6 produced and merged a coherent pre-stable Aster contract baseline for the accepted goal:

> Convert Aster from a concept into enforceable interfaces.

The permanent transaction boundary remains:

> AI proposes; the player confirms; deterministic domain services validate and store.

Founding-steward acceptance and the squash merge record completion of the Sprint 6 design and public-synthetic evidence scope. They do not authorize production AI, private-data processing, model quality, clinical safety, legal sufficiency, privacy certification, security certification, accessibility conformance, interoperability conformance, provider approval, operational reliability, production migration readiness, or independent specialist review.

## Accepted deliverables

### Role contracts

The merged baseline defines bounded contracts for:

- **Scribe:** prepares reviewable structured-capture proposals and extraction candidates without confirming, validating, or storing Chronicle truth;
- **Librarian:** prepares source-linked recall from exact Chronicle revisions or clearly labeled public educational material;
- **Wayfinder:** proposes product routes and permission-review navigation without creating permission or proving completion;
- **Interpreter:** prepares source-aware explanations while preserving uncertainty, mapping loss, lifecycle, and implementation-guide limits; and
- **Storykeeper:** prepares narrative presentation from confirmed domain events without inventing canon, progression, quest completion, or rewards.

### Intent, extraction, confidence, clarification, and refusal

The baseline defines supported and unsupported intents, consequence classes, qualitative confidence, ambiguity, clarification lifecycle, refusal reasons, extraction candidates, visible unparsed material, and safe manual fallback.

Consequential uncertainty fails safely rather than choosing the most likely action.

### Source-linked recall and explanation

Person-specific health statements require exact Chronicle record and revision evidence. Public educational material remains clearly labeled and cannot establish a person-specific fact.

Source references preserve lifecycle, correction, conflict, deletion, mapping, implementation-guide, freshness, and uncertainty state.

### Memory classes and lifecycle

Material product memory requires a separate visible player choice and remains visible, revision-editable, exportable, and deletable. Transient context does not silently become retained memory. Provider operational metadata remains outside product memory.

### Prompt-injection and untrusted-input isolation

Documents, images, imported records, web content, retrieved passages, provider responses, tool results, model output, and prior conversation remain untrusted data.

Embedded instructions cannot select the subject, create permission, alter policy, bypass confirmation, invoke arbitrary resources, suppress sources or uncertainty, cross subject boundaries, or persist themselves as memory.

### Responsive and deferred work

Work contracts preserve stable identity, exact revisions, attempts, bounded retry, domain idempotency, timeout, cancellation, provider fallback, stale-result rejection, correction, supersession, and replay.

Acceptance for processing is not completion. Unknown external outcomes cannot retry automatically. Stale authority cannot be reused.

### Provider governance and egress

The provider-governance taxonomy intentionally contains no production-approved state.

Public or synthetic evaluation uses minimum-necessary fields and preserves handling, region, retention, logging, training, human-review, subprocessor, deletion-evidence, concentration, replacement, migration, teardown, incident, funding-conflict, evaluator-independence, and public-claim boundaries.

### Local substitute and non-AI fallback

Seventeen deterministic scenarios cover successful role behavior, clarification, refusal, prompt injection, timeout, provider unavailability, stale and superseded work, manual capture, and permission review.

Five role fallbacks and seven core paths preserve capture, structured recall, permission review, correction, export, deletion, and ordinary play without AI or a provider.

### Compatibility and migration

A twelve-component manifest binds public components to exact schemas, revisions, validators, fixtures, compatibility state, migration state, and non-authority.

Optional additive change may remain compatible. Required additions, enum expansion, field removal, semantic change, and revision rebases require evidence-preserving migration. Unknown change fails closed. Authority expansion requires a new governing decision rather than ordinary migration.

## Accepted acceptance criteria

All Sprint 6 acceptance criteria are met at contract, deterministic-validation, and public-synthetic-evidence level:

- Aster cannot write directly to canonical records.
- Every person-specific recalled health statement can reference authoritative Chronicle records.
- Material memories are visible, editable through revision, exportable, and deletable.
- AI unavailability does not block core capture or permission review.
- Funding, credits, sponsorship, affiliate terms, related parties, provider relationships, and enterprise distribution cannot determine source authority, provider defaults, connector ranking, egress, benchmark conclusions, compatibility, migration, or publication.
- Aster cannot imply that standards conformance proves clinical completeness, semantic equivalence, safety, or endorsement.
- Provider governance is defined without selecting or endorsing a production AI provider, EHR, connector, or clinical partner.

## Evidence status

The merged branch establishes:

- deliberate public exports;
- deterministic validators;
- public-surface tests importing only `dist/index.js`;
- public synthetic scenarios and fixtures;
- role, operation, proposal, source, fallback, component, provider-state, compatibility, and migration bindings;
- twenty-four stable control objectives;
- nineteen open holdpoints; and
- nineteen explicit unresolved-work records.

It does not establish:

- production implementation, deployment, or operational verification;
- representative model, prompt, latency, reliability, cost, accessibility, clinical, or benefit measurements;
- private-data egress or real-person operation;
- production identity, persistence, retrieval, memory, tools, queues, schedules, workflows, connectors, incidents, or deletion verification; or
- independent specialist review.

## Validation and merge evidence

The final review branch head `dbd1ff6cd7764500c9a1a68bec9d8ce5281890de` passed formatting, documentation links, content validation, repository policy, economics validation, lint, typecheck, tests, and DCO attestation.

PR #48 was explicitly accepted and squash merged as `5aa3540765e5573f3304ce2b624d7a02c3ba2d13`, closing issue #47.

## Open holdpoints

The controlling follow-up record remains the [Sprint 6 Specialist Holdpoint and Unresolved-Work Register](../architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md).

No production or specialist holdpoint closed merely because Sprint 6 merged.

## Handoff

The [Pre-Sprint 7 Alignment Review](pre-sprint-7-alignment-review.md) reconciles the merged status and defines the bounded Forge MCP entry conditions.

Sprint 7 inherits public documentation and synthetic data only, server-owned tool authority, data-only treatment of retrieved content, deterministic validation, source provenance, draft-only generation, compatibility, migration, provider and funding independence, complete non-MCP contribution paths, and every open production and specialist holdpoint.
