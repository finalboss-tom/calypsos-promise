# Aster Contract Baseline

[Documentation home](../README.md) · [Architecture boundary](../architecture/aster-contract-boundary.md) · [Role contracts](../architecture/aster-role-contracts.md) · [Proposal and extraction contracts](../architecture/aster-proposal-and-extraction-contracts.md) · [Sprint 6 execution plan](../roadmap/sprint-6-execution-plan.md)

- **Status:** ACTIVE PRE-STABLE CONTRACT
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`

Sprint 6 establishes a public, dependency-free authority, role, proposal, and structured-extraction baseline for Aster's five narrative roles. The package exposes role identifiers, direct accessible names, allowed high-level input and output classes, authority-source classes, deterministic action owners, execution classifications, confirmation rules, evidence requirements, clarification triggers, qualitative confidence rules, uncertainty behavior, source-link requirements, stable failure codes, retention and egress limits, manual fallbacks, proposal and review envelopes, source and transformation provenance, extraction candidates, prohibited actions, deterministic validation, and public-surface tests.

## Current guarantees

Every Aster authority, role, proposal, and extraction contract states that Aster cannot:

- write canonical records;
- create or expand permission;
- confirm its own output;
- complete quests;
- grant rewards;
- turn a role result, proposal payload, or extraction candidate directly into canonical truth;
- invoke an authoritative domain action;
- claim that domain validation, storage, execution, progression, or reward occurred;
- own hidden retained product memory; or
- treat authority-bearing context as ordinary provider payload.

Retained memory requires a separate visible player choice. Provider egress remains future policy-gated, minimum necessary, locally replaceable, and unapproved for production.

Deterministic validation rejects authority, role, proposal, or extraction objects that attempt those escalations, diverge from the public role contracts, use unsupported evidence or taxonomy values, remove required source or transformation provenance, bind review to the wrong proposal revision, remove a required fallback, or omit a mandatory prohibition.

## Proposal and extraction guarantees

- Proposal identity, revision, role, operation, kind, subject, request, producer, intended action, source references, transformation provenance, confidence, uncertainty, clarifications, payload, review, authority boundary, and domain-outcome boundary are inspectable.
- Proposal source references are purpose-bound identifiers and revisions with `sourceMaterialCopied: false`; source records are not copied into the envelope.
- Proposal review distinguishes unreviewed, confirmed, rejected, superseded, and expired states.
- Confirmation must identify the player, bind the exact proposal revision, and reference the review decision.
- Confirmation does not prove permission freshness, domain validation, authoritative storage, or later projection and presentation.
- Proposal payloads are versioned and explicitly non-canonical.
- Structured extraction produces candidates rather than Chronicle values.
- Every extraction candidate links to source references and transformation steps and is explicitly non-canonical, unconfirmed, and not domain-accepted.
- Unparsed source material remains visible with a source reference and reason rather than being silently discarded or promoted.

## Role-specific guarantees

- **Scribe:** produces a reviewable structured draft; exact player review and confirmation remain separate from Living Chronicle validation and storage.
- **Librarian:** every recalled health statement requires an inspectable authoritative-record or clearly labeled public-education source path; retrieval score is not truth.
- **Wayfinder:** proposes routes from explicit player choice and current application state; navigation cannot expand permission or prove domain completion.
- **Interpreter:** preserves source, mapping, conflict, approximate-time, and uncertainty limitations and cannot imply diagnosis, treatment authority, or standards-based completeness, equivalence, safety, or endorsement.
- **Storykeeper:** presents current gameplay state and confirmed domain events without inventing canon, completing progression, or granting rewards.

## Current evidence

- public authority matrix for all five roles;
- detailed role-contract matrix for all five roles;
- versioned proposal envelope and structured-extraction contracts;
- stable authority, role-contract, proposal, and extraction validation issue codes;
- public-surface Node tests covering non-authority, evidence, source links, manual fallback, hidden-memory rejection, provider-egress rejection, exact-revision confirmation, role and proposal-kind alignment, canonical-payload rejection, domain-outcome rejection, and non-canonical extraction candidates; and
- architecture and execution documentation that keeps Chronicle, House of Keys, gameplay, application, memory, provider, retrieval, delayed-work, audit, and institutional authority separate.

## Current limits

This baseline does not yet complete the full intent taxonomy, confidence values and clarification lifecycle, source-linked recall and mapping explanation contracts, memory lifecycle, provider-egress policy, prompt-injection isolation evidence, delayed-result contracts, deterministic synthetic adapter, non-AI fallback fixtures, compatibility review, cross-contract completion evidence, or Sprint 6 acceptance record. Those remain tracked in issue #47 and the Sprint 6 execution plan.

No production provider, EHR, connector, clinical partner, model gateway, queue, scheduler, workflow engine, event store, vector database, account system, real-data path, or enterprise relationship is selected or approved by this contract baseline.
