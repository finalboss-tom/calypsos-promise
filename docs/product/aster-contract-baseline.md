# Aster Contract Baseline

[Documentation home](../README.md) · [Architecture boundary](../architecture/aster-contract-boundary.md) · [Role contracts](../architecture/aster-role-contracts.md) · [Sprint 6 execution plan](../roadmap/sprint-6-execution-plan.md)

- **Status:** ACTIVE PRE-STABLE CONTRACT
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`

Sprint 6 establishes a public, dependency-free authority and role-contract baseline for Aster's five narrative roles. The package exposes role identifiers, direct accessible names, allowed high-level input and output classes, authority-source classes, deterministic action owners, execution classifications, confirmation rules, evidence requirements, clarification triggers, qualitative confidence rules, uncertainty behavior, source-link requirements, stable failure codes, retention and egress limits, manual fallbacks, prohibited actions, deterministic validation, and public-surface tests.

## Current guarantees

Every Aster authority and role contract states that Aster cannot:

- write canonical records;
- create or expand permission;
- confirm its own output;
- complete quests;
- grant rewards;
- turn a role result directly into canonical truth;
- invoke an authoritative domain action;
- own hidden retained product memory; or
- treat authority-bearing context as ordinary provider payload.

Retained memory requires a separate visible player choice. Provider egress remains future policy-gated, minimum necessary, locally replaceable, and unapproved for production.

Deterministic validation rejects an authority or role-contract matrix that attempts those escalations, diverges from the public authority matrix, uses unsupported evidence or taxonomy values, removes a role or required fallback, or omits a mandatory prohibition.

## Role-specific guarantees

- **Scribe:** produces a reviewable structured draft; exact player review and confirmation remain separate from Living Chronicle validation and storage.
- **Librarian:** every recalled health statement requires an inspectable authoritative-record or clearly labeled public-education source path; retrieval score is not truth.
- **Wayfinder:** proposes routes from explicit player choice and current application state; navigation cannot expand permission or prove domain completion.
- **Interpreter:** preserves source, mapping, conflict, approximate-time, and uncertainty limitations and cannot imply diagnosis, treatment authority, or standards-based completeness, equivalence, safety, or endorsement.
- **Storykeeper:** presents current gameplay state and confirmed domain events without inventing canon, completing progression, or granting rewards.

## Current evidence

- public authority matrix for all five roles;
- detailed role-contract matrix for all five roles;
- stable authority-validation and role-contract-validation issue codes;
- public-surface Node tests covering non-authority, evidence, source links, manual fallback, hidden-memory rejection, provider-egress rejection, and role-specific prohibitions; and
- architecture and execution documentation that keeps Chronicle, House of Keys, gameplay, application, memory, provider, retrieval, delayed-work, audit, and institutional authority separate.

## Current limits

This baseline does not yet complete the proposal envelope, extraction schemas, full intent taxonomy, confidence values and clarification objects, source-reference payloads, memory lifecycle, provider-egress policy, prompt-injection isolation evidence, delayed-result contracts, deterministic synthetic adapter, non-AI fallback fixtures, compatibility review, cross-contract completion evidence, or Sprint 6 acceptance record. Those remain tracked in issue #47 and the Sprint 6 execution plan.

No production provider, EHR, connector, clinical partner, model gateway, queue, scheduler, workflow engine, event store, vector database, account system, real-data path, or enterprise relationship is selected or approved by this contract baseline.
