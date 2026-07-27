# Aster Contract and Authority Boundary

[Architecture index](README.md) · [Sprint 6 execution plan](../roadmap/sprint-6-execution-plan.md) · [Pre-Sprint 6 review](../roadmap/pre-sprint-6-alignment-review.md) · [Frozen architecture](../frozen/architecture.md)

- **Status:** ACTIVE SPRINT 6 BASELINE
- **Contract package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`
- **Owner:** Aster contract capability
- **Primary reason to change:** the public meaning, authority, lifecycle, safety, provider, or fallback contract for Aster proposals changes
- **Evidence boundary:** deterministic contracts and public synthetic tests; not production AI or specialist certification

## Purpose

Aster reduces the work required to capture, understand, recall, navigate, and present information. It does not own truth or authority.

The permanent transaction boundary is:

> Aster proposes; the player confirms; deterministic domain services validate and store.

The five role names are narrative interfaces with direct accessible names. A narrative name does not grant technical authority.

| Narrative role | Accessible meaning                   | Primary output                     | Authoritative action owner |
| -------------- | ------------------------------------ | ---------------------------------- | -------------------------- |
| Scribe         | structured capture assistant         | structured draft or clarification  | Living Chronicle           |
| Librarian      | source-linked recall assistant       | source-linked recall draft         | none                       |
| Wayfinder      | navigation assistant                 | navigation proposal                | application navigation     |
| Interpreter    | plain-language explanation assistant | uncertainty-preserving explanation | none                       |
| Storykeeper    | narrative presentation assistant     | narrative presentation proposal    | gameplay                   |

## Authority invariants

Every Aster role is prohibited from:

- writing a canonical record;
- creating or expanding permission;
- confirming its own output;
- completing a quest; and
- granting a reward.

The public TypeScript contract encodes those capabilities as literal `false` values and deterministic validation rejects attempted escalation.

Aster also cannot:

- choose the controlling person or Chronicle subject;
- treat a provider response, retrieval score, transport acknowledgement, queued request, conversational acknowledgement, or model confidence as domain completion;
- convert an `indeterminate` House of Keys result into allow;
- infer consent from engagement, silence, prior use, imported content, provider terms, or narrative progression;
- suppress source references, mapping loss, conflicts, correction state, deletion state, or uncertainty;
- convert a standard, implementation guide, provider, sponsor, newest source, model, or retrieval result into automatic truth; or
- make research, commerce, sponsorship, provider enrollment, retention, or premium compute a prerequisite for personal-core value.

## Capability boundary

The Aster package owns contracts for:

- role behavior and authority limits;
- proposals and structured extraction;
- intent, confidence, clarification, ambiguity, and refusal;
- source-linked recall and uncertainty explanation;
- player-visible memory classes and lifecycle;
- provider egress and provider-neutral evaluation;
- prompt-injection and untrusted-input isolation;
- responsive, deferred, stale, failed, canceled, and provider-unavailable result semantics;
- deterministic local substitution; and
- complete non-AI fallback behavior.

It does not own:

- Living Chronicle records or source truth;
- House of Keys grants, decisions, revocation, or receipts;
- quest completion, rewards, progression, or canon;
- application navigation state;
- protected audit;
- provider logs or credentials;
- retrieval indexes, caches, or ranking authority;
- delayed-work execution state;
- institutional governance, funding, research, legal, clinical, or production authority.

## Dependency direction

The core package remains dependency-free. It may use narrow serialized identifiers and revision references, but it does not import providers, model SDKs, databases, queues, schedulers, workflow engines, event stores, vector databases, UI frameworks, filesystems, environment configuration, sessions, secrets, or wall-clock behavior.

Future applications may adapt provider output into Aster proposal contracts. Providers remain outward adapters. They cannot determine package authority, default source rank, permission, egress policy, connector priority, benchmark conclusions, publication, or removal of manual fallback.

## Observable transaction stages

Contracts must keep these facts separate:

1. a draft was produced;
2. the player reviewed it;
3. the player confirmed the exact proposal;
4. relevant permission was valid and fresh;
5. the owning deterministic domain validator accepted the proposed action;
6. authoritative storage or execution succeeded; and
7. later projection, enrichment, notification, or narrative presentation completed.

Failure or success at one stage does not imply another stage occurred.

## Validation and compatibility

The public package exposes stable role identifiers, policy identifiers, issue codes, and deterministic validation. Tests import only the package public surface after TypeScript compilation.

The `0.1.0-pre.1` contract remains pre-stable. Compatibility changes must state whether they affect serialized role identifiers, authority owners, confirmation requirements, prohibited actions, validation codes, provider boundaries, fallback behavior, or migration. A future stable contract requires explicit review and cannot be inferred from implementation maturity.

## Current implementation status

Sprint 6.1 establishes:

- the bounded package and public export;
- role and accessible-name taxonomy;
- authority-source and authoritative-action-owner classes;
- responsive, deferred, and manual-fallback classifications;
- literal non-authority capabilities;
- mandatory prohibited actions;
- stable authority-validation issue codes; and
- public-surface tests.

Detailed role inputs and outputs, proposal envelopes, intent, memory, provider egress, injection isolation, delayed work, local substitution, fixtures, cross-contract checks, and completion evidence remain subsequent Sprint 6 workstreams.
