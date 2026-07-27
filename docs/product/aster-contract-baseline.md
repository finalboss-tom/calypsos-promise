# Aster Contract Baseline

[Documentation home](../README.md) · [Architecture boundary](../architecture/aster-contract-boundary.md) · [Role contracts](../architecture/aster-role-contracts.md) · [Proposal and extraction contracts](../architecture/aster-proposal-and-extraction-contracts.md) · [Intent, confidence, clarification, and refusal contracts](../architecture/aster-intent-confidence-clarification-refusal.md) · [Source-linked recall and explanation contracts](../architecture/aster-source-linked-recall-and-explanation-contracts.md) · [Memory lifecycle contracts](../architecture/aster-memory-lifecycle-contracts.md) · [Sprint 6 execution plan](../roadmap/sprint-6-execution-plan.md)

- **Status:** ACTIVE PRE-STABLE CONTRACT
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`

Sprint 6 establishes a public, dependency-free authority, role, proposal, structured-extraction, intent-decision, source-linked recall, and memory-lifecycle baseline for Aster's five narrative roles. The package exposes stable role, proposal, intent, recall, memory, lifecycle, source, retention, player-control, egress, secondary-use, uncertainty, failure, and validation contracts with public-surface tests.

## Current guarantees

Every Aster authority, role, proposal, extraction, intent, recall, and memory contract states that Aster cannot:

- write canonical records;
- create or expand permission;
- confirm its own output;
- complete quests;
- grant rewards;
- turn a role result, proposal payload, extraction candidate, intent interpretation, recalled statement, or memory into canonical truth;
- invoke an authoritative domain action;
- claim that domain validation, storage, execution, progression, or reward occurred;
- diagnose, prescribe, or direct emergency care;
- retain hidden material product memory;
- treat provider operational metadata as product memory; or
- treat authority-bearing context, provider rank, retrieval score, source recency, standards profile, or remembered context as truth.

Provider egress remains future policy-gated, minimum necessary, locally replaceable, and unapproved for production.

## Memory lifecycle guarantees

- The public classes separate transient context, retained preferences, accessibility context, separately chosen conversation, record-linked derived memory, narrative presentation state, and provider operational metadata.
- Retained preferences, accessibility context, retained conversation, record-linked memory, and narrative presentation state are material product memory.
- Every material product-memory class requires a separate visible player choice and is visible, editable through revision, exportable, and deletable.
- Transient context is request-bounded and cannot silently become retained memory.
- Every retained class preserves a versioned source reference appropriate to the class.
- Record-linked memory requires exact Chronicle record and revision evidence and falls back to recomputation from authoritative records.
- Correction and supersession preserve earlier memory revisions rather than silently overwriting them.
- Deletion-requested and deleted entries preserve an inspectable deletion-request reference.
- Deleted, expired, or unavailable entries do not retain the prior value in the active contract object.
- Provider operational metadata remains outside product memory and carries only a bounded external reference, versioned policy, and expiry rather than raw provider content.
- Memory entries cannot authorize provider training, research, commercial use, or any other secondary use.
- Missing memory cannot block core capture, permission review, correction, export, deletion, or ordinary play.

## Source-linked recall and explanation guarantees

- Person-specific health statements require exact Chronicle record and revision evidence, Chronicle schema, source version, and an inspectable locator.
- Public educational material remains clearly labeled and cannot establish a person-specific fact.
- Source references preserve lifecycle, correction, conflict, deletion, mapping, implementation-guide, and availability state.
- Partial, lossy, conflicting, or unsupported mapping requires a visible loss description.
- Standards or implementation-guide conformance cannot prove clinical completeness, semantic equivalence, safety, or endorsement.
- Stale, unavailable, or unknown semantic retrieval requires a versioned structured-query fallback.
- Required uncertainty remains visible.

## Intent, confidence, clarification, and refusal guarantees

- The public taxonomy distinguishes bindable intents from non-actionable, unknown, mixed, conflicting, and unsupported outcomes.
- A bound decision selects one supported candidate, retains no material ambiguity or refusal, requires explicit player choice, and may prepare only a non-authoritative proposal.
- Unknown, mixed, conflicting, and multiply plausible consequential intent require direct clarification.
- Unsupported intent requires an inspectable refusal and safe manual fallback.
- Confidence is qualitative and explicitly non-authoritative; numeric false precision is rejected.

## Proposal and extraction guarantees

- Proposal identity, revision, role, operation, kind, subject, request, producer, intended action, source, transformation, confidence, uncertainty, clarification, payload, review, authority, and domain-outcome boundaries are inspectable.
- Confirmation binds the exact proposal revision and identifies the player.
- Proposal payloads and extraction candidates are explicitly non-canonical.
- Extraction candidates remain unconfirmed and not domain-accepted.
- Unparsed source material remains visible with a reason.

## Role-specific guarantees

- **Scribe:** produces a reviewable structured draft; player confirmation, Chronicle validation, and storage remain separate.
- **Librarian:** every personal-health statement requires exact Chronicle evidence; public education remains labeled.
- **Wayfinder:** proposes routes without expanding permission or proving domain completion.
- **Interpreter:** preserves source, mapping, lifecycle, freshness, and uncertainty limitations and cannot imply clinical or standards authority.
- **Storykeeper:** presents confirmed events without inventing canon, completing progression, or granting rewards.

## Current evidence

- public authority and detailed role-contract matrices;
- versioned proposal, extraction, intent, recall, and memory contracts;
- public memory class-policy matrix and serialized memory-entry lifecycle;
- stable authority, role, proposal, extraction, intent, recall, memory-policy, and memory-entry validation issue codes;
- public-surface Node tests covering authority separation, exact confirmation, intent clarification and refusal, source-linked recall, stale-index fallback, mapping and lifecycle uncertainty, material-memory player controls, record-linked recomputation, provider-metadata separation, deletion, secondary-use rejection, and missing-memory fallback; and
- architecture and execution documentation that keeps Chronicle, House of Keys, gameplay, application, memory, provider, retrieval, delayed-work, audit, and institutional authority separate.

## Current limits

This baseline does not yet complete provider-egress policy, prompt-injection isolation evidence, delayed-result contracts, deterministic synthetic adapter, non-AI fallback fixtures, compatibility review, cross-contract completion evidence, production persistence, secure deletion, or the Sprint 6 acceptance record. Those remain tracked in issue #47 and the Sprint 6 execution plan.

No production provider, EHR, connector, clinical partner, model gateway, queue, scheduler, workflow engine, event store, vector database, account system, real-data path, or enterprise relationship is selected or approved by this contract baseline.
