# Sprint 6 Execution Plan — Aster Contracts and AI Governance

[Documentation home](../README.md) · [Roadmap index](README.md) · [Current status](current-status.md) · [Sprint sequence](sprints.md) · [Pre-Sprint 6 review](pre-sprint-6-alignment-review.md) · [Tracking issue #47](https://github.com/finalboss-tom/calypsos-promise/issues/47) · [Draft PR #48](https://github.com/finalboss-tom/calypsos-promise/pull/48)

- **Status:** ACTIVE
- **Entry baseline:** `main` at `4dfd39e7aa02ffe1ef3f5ba296378b29bd078047`
- **Branch:** `agent/sprint-6-aster-contracts`
- **Draft pull request:** #48
- **Started:** 2026-07-27
- **Information boundary:** public repository records and public synthetic evidence only
- **Certification boundary:** contract, governance, deterministic validation, and synthetic evidence; not production AI, clinical, privacy, security, accessibility, legal, interoperability, procurement, financial, or operational certification

## Goal

Convert Aster from a concept into enforceable interfaces.

This sprint makes Aster useful and inspectable without making it authoritative. The governing transaction remains:

> AI proposes; the player confirms; deterministic domain services validate and store.

A provider response, model output, conversational acknowledgement, queued request, retrieval score, transport success, or Aster role name is never proof of permission, canonical storage, quest completion, reward, or domain success.

## Accepted scope

Sprint 6 implements the accepted deliverables and acceptance criteria in [`sprints.md`](sprints.md) without changing their meaning or order.

The implementation establishes one bounded pre-stable package, `@calypsos-promise/aster`, with deliberate public exports, independently versioned serialized contracts, stable issue and refusal codes, deterministic validators, public synthetic fixtures, and tests that import only the package public surface.

The core contract has no database, network, model SDK, provider, UI, filesystem, environment, session, secret, wall-clock, queue, scheduler, workflow-engine, event-store, or vector-database dependency.

## Non-scope

Sprint 6 does not:

- select, endorse, procure, or integrate a production AI provider, EHR, connector, clinical partner, model gateway, queue, scheduler, workflow engine, event store, vector database, or enterprise relationship;
- process production health data or create a real-data contributor path;
- implement accounts, production identity, production consent enforcement, production persistence, remote retrieval, provider credentials, clinical decision support, diagnosis, treatment, emergency response, or research enrollment;
- place Aster roles, prompt state, provider metadata, memory, retrieval indexes, or delayed-work state inside Living Chronicle truth;
- allow Aster to create or expand permission, confirm its own proposal, write canonical records, complete quests, grant rewards, or determine institutional authority; or
- represent synthetic contract evidence as model quality, clinical safety, privacy, security, accessibility, interoperability, legal sufficiency, production reliability, latency, or conformance evidence.

## Authority and package boundary

`@calypsos-promise/aster` owns the pre-stable contracts that describe Aster proposals, role behavior, intent, clarification, confidence, memory, provider egress, untrusted-input isolation, delayed-result handling, deterministic local substitution, and non-AI fallback.

It does not own:

- Living Chronicle records, source truth, correction, export, or deletion;
- House of Keys grants, policy decisions, revocation, or access receipts;
- quest completion, rewards, progression, or narrative canon;
- application navigation state;
- provider request or response logs;
- retrieval indexes or caches;
- delayed-work execution state;
- protected audit; or
- institutional, clinical, legal, research, funding, or governance authority.

The package may reference external identifiers and revisions through narrow serialized contracts. It may not import another bounded capability merely to gain authority over that capability.

## Execution workstreams

### 6.1 Bounded capability and authority matrix

**Implementation status:** IMPLEMENTED ON DRAFT PR #48; final Sprint 6 validation and acceptance remain pending.

- create `@calypsos-promise/aster` as one dependency-free pre-stable package;
- define package owner, reason to change, public exports, contract version, role identifiers, accessible role names, authority-source classes, action-owner classes, execution classifications, mandatory prohibited actions, and stable validation issues;
- publish an explicit role authority matrix for Scribe, Librarian, Wayfinder, Interpreter, and Storykeeper;
- prove through public-surface tests that every role remains non-authoritative; and
- document that narrative role names create no technical authority.

**Exit evidence:** package builds, authority matrix validates, tests import only `dist/index.js`, and no role can write canonical records, alter permission, confirm its own output, complete quests, or grant rewards.

### 6.2 Role contracts

**Implementation status:** IMPLEMENTED ON DRAFT PR #48; final Sprint 6 validation and acceptance remain pending.

Define allowed inputs, outputs, prohibited actions, required evidence, clarification, confidence, failure, retention, egress, responsive/deferred/manual classification, and deterministic domain ownership for Scribe, Librarian, Wayfinder, Interpreter, and Storykeeper.

**Current evidence:** stable role-specific contract and operation identifiers; authority-aligned input, output, execution, confirmation, and owner fields; structured evidence requirements; clarification triggers; qualitative confidence and uncertainty rules; stable failure codes; source-link behavior; explicit player-review requirements; non-canonical and non-invoking result flags; transient-by-default context; no role-owned memory; separate player choice before retention; policy-gated minimum-necessary future egress; complete manual or deterministic fallback; role-specific prohibitions; deterministic validation; architecture documentation; and public-surface Node tests.

**Exit evidence:** every detailed role contract validates against the authority matrix; every role preserves mandatory non-authority; every health-related Librarian recall requires source links; the Interpreter cannot imply clinical or standards authority; the Storykeeper accepts only confirmed events for presentation; and tests reject canonical-result, authoritative-invocation, hidden-memory, and unrestricted-egress escalation.

### 6.3 Proposal and extraction contracts

Define a structured Aster proposal envelope and extraction schemas separate from Chronicle records, House of Keys facts, memory, receipts, provider logs, retrieval indexes, product state, and delayed-work state.

### 6.4 Intent, confidence, clarification, and refusal

Define capture, recall, explanation, navigation, permission review, correction, export, deletion preparation, support routing, non-actionable conversation, unknown, mixed, conflicting, and unsupported intent. Consequential ambiguity must fail safely and require clarification.

### 6.5 Source-linked recall and explanation

Require health-related recall to reference authoritative Chronicle records or clearly labeled public educational material. Preserve record and revision identifiers, source class, provenance, mapping revision, implementation-guide revision, correction state, conflict, deletion, index freshness, and uncertainty.

### 6.6 Memory classes and lifecycle

Separate transient context, player-visible retained preferences or accessibility context, separately chosen retained conversation, derived record-linked memory, narrative presentation state, and provider-side operational metadata. Define visibility, editability, export, deletion, retention, expiry, correction, supersession, egress, secondary-use boundaries, and missing-memory fallback.

### 6.7 Prompt injection and untrusted input

Treat documents, images, imported records, web content, retrieved passages, provider responses, tool results, model output, and prior conversation content as untrusted. Prove they cannot grant authority, change permission, expand action scope, choose the controlling person, bypass confirmation, suppress sources or uncertainty, cross user boundaries, invoke arbitrary resources, or persist themselves as memory.

### 6.8 Responsive and deferred behavior

Define responsive, deferred, and manual-replaceable work. Where delayed work is represented, define stable identity, input and authority revisions, pending, completion, timeout, cancellation, retry safety, duplicate behavior, failure, provider unavailability, supersession, stale-result rejection, correction, and replay without selecting an execution engine.

### 6.9 Provider governance and egress

Define minimum-necessary egress, prohibited authority-bearing context, region, retention, logging, training, human review, subcontractor, deletion, revision attribution, credential boundaries, specialist holdpoints, fallback, replacement, migration, teardown, cost, concentration, incidents, corrections, public claims, provider-neutral evaluation, and funding-conflict rules.

### 6.10 Local substitute and non-AI fallback

Provide a deterministic local synthetic adapter covering every role, successful structured drafting, unknown and ambiguous intent, clarification, low confidence, refusal, prompt injection, timeout, provider unavailability, stale or superseded work, source-linked recall, manual capture, and permission review.

### 6.11 Validation, fixtures, compatibility, and cross-contract checks

Add deterministic validators, stable issue and refusal codes, public synthetic fixtures, public-surface Node tests, compatibility and migration requirements, and checks against Chronicle, House of Keys, content, incentives, security, funding, provider-independence, and operational-simplicity boundaries.

### 6.12 Completion and acceptance

Publish a completion record, unresolved-work register, control mapping, specialist holdpoints, validation evidence, final reviewed head, CI and DCO results, and explicit founding-steward acceptance. Completion must distinguish accepted contract evidence from implementation, deployment, specialist review, or production readiness.

## Cross-contract invariants

Every workstream must preserve:

1. Aster output is a proposal, explanation, navigation aid, or presentation proposal—not canonical truth.
2. Exact player confirmation applies only to the exact proposal and cannot be inferred from engagement, silence, conversational acknowledgement, provider terms, or prior permission.
3. House of Keys evaluation remains fail-closed; `indeterminate` never becomes allow.
4. Domain validation and authoritative storage remain separate observable steps after confirmation.
5. Chronicle truth, permission truth, source assertions, Aster proposals, memory, receipts, audit, product state, retrieval derivatives, provider logs, and delayed-work state remain distinct claims.
6. Broader data collection, retention, permission, provider use, research, commerce, sponsorship, or premium compute cannot buy progression, rewards, core rights, source rank, defaults, placement, favorable findings, or governance authority.
7. Core capture, permission review, correction, export, deletion, and ordinary play retain complete manual and non-AI paths.
8. Stale, superseded, canceled, failed, or provider-unavailable output cannot overwrite newer confirmed truth or act under stale permission, intent, source, policy, or subject state.
9. A standard, implementation guide, mapping, provider, sponsor, newest source, model, or retrieval score cannot become automatic truth or proof of completeness, equivalence, safety, endorsement, or conformance.
10. Public development remains credential-free and uses only public or synthetic information.

## Validation strategy

Each workstream adds focused deterministic tests. Before Sprint 6 is represented as ready for acceptance:

- package tests must exercise only the public package surface;
- `pnpm --filter @calypsos-promise/aster test` must pass;
- `pnpm check` must pass;
- GitHub Actions CI and DCO Attestation must pass on the final reviewed head;
- documentation, issue status, roadmap status, completion evidence, and contract versions must agree; and
- residual risks, deferred production work, unavailable specialist review, and revalidation triggers must remain explicit.

## Acceptance authority

Passing tests proves only that the checked public contracts and deterministic fixtures behave as asserted. Sprint 6 closes only after explicit founding-steward review and merge. Neither branch existence, a draft pull request, CI success, model output, nor synthetic evidence grants production or specialist-review status.
