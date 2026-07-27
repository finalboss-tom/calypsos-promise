# Aster Contract Baseline

[Documentation home](../README.md) · [Architecture boundary](../architecture/aster-contract-boundary.md) · [Role contracts](../architecture/aster-role-contracts.md) · [Proposal and extraction contracts](../architecture/aster-proposal-and-extraction-contracts.md) · [Intent, confidence, clarification, and refusal contracts](../architecture/aster-intent-confidence-clarification-refusal.md) · [Source-linked recall and explanation contracts](../architecture/aster-source-linked-recall-and-explanation-contracts.md) · [Memory lifecycle contracts](../architecture/aster-memory-lifecycle-contracts.md) · [Untrusted-input isolation contracts](../architecture/aster-untrusted-input-isolation-contracts.md) · [Responsive and deferred work contracts](../architecture/aster-responsive-and-deferred-work-contracts.md) · [Provider governance and egress contracts](../architecture/aster-provider-governance-and-egress-contracts.md) · [Local synthetic adapter and non-AI fallbacks](../architecture/aster-local-synthetic-adapter-and-non-ai-fallbacks.md) · [Sprint 6 execution plan](../roadmap/sprint-6-execution-plan.md)

- **Status:** ACTIVE PRE-STABLE CONTRACT
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`

Sprint 6 establishes a public, dependency-free authority, role, proposal, structured-extraction, intent-decision, source-linked recall, memory-lifecycle, untrusted-input isolation, responsive/deferred work, provider-governance, deterministic-local-adapter, and non-AI-fallback baseline for Aster's five narrative roles. The package exposes stable role, proposal, intent, recall, memory, isolation, work, provider, local scenario, lifecycle, attempt, retry, idempotency, fallback, source, retention, player-control, egress, handling, deletion, evaluation, funding-conflict, concentration, replacement, migration, teardown, uncertainty, finding, failure, and validation contracts with public-surface tests.

## Current guarantees

Every Aster authority, role, proposal, extraction, intent, recall, memory, untrusted-input, work, provider-governance, and local-adapter contract states that Aster cannot:

- write canonical records;
- create or expand permission;
- confirm its own output;
- complete quests;
- grant rewards;
- turn a role result, proposal payload, extraction candidate, intent interpretation, recalled statement, memory, document, retrieval result, tool result, provider response, model output, prior conversation, queued request, retry, deferred result, provider account, sponsorship, credit, benchmark, or local synthetic fixture into canonical truth;
- invoke an authoritative domain action;
- claim that acceptance for processing proves completion;
- claim that domain validation, storage, execution, progression, or reward occurred;
- diagnose, prescribe, or direct emergency care;
- retain hidden material product memory;
- treat provider operational metadata as product memory;
- let untrusted content modify policy, tools, subject, permission, action scope, confirmation, memory, sources, uncertainty, or conflicts;
- retry unknown external outcomes automatically;
- use stale authority or overwrite newer results;
- let provider funding determine defaults, source rank, connector rank, egress policy, benchmark conclusions, publication, or governance;
- use local fixtures as model-quality, provider-quality, production-readiness, or specialist-review evidence; or
- treat authority-bearing context, provider rank, retrieval score, source recency, standards profile, remembered context, successful processing, transport acknowledgement, provider promises, or provider deletion labels as truth.

There is intentionally no production-provider approval state in this pre-stable contract.

## Local synthetic adapter and non-AI guarantees

- The public adapter contains seventeen stable scenarios covering all five roles and the required success, clarification, refusal, security, degraded-work, and fallback cases.
- The pure runner returns identical serialized output for the same scenario identifier.
- Local execution is synthetic-only and uses no provider, network, credentials, wall clock, randomness, or persistent storage.
- Every successful role fixture uses the exact operation from the public role contract and remains non-authoritative.
- Librarian recall, Interpreter explanation, and Storykeeper presentation preserve exact synthetic source revisions.
- Unknown, ambiguous, and low-confidence consequential intent requires direct clarification and cannot prepare a proposal.
- Explicit player choice is required before the clarification-resolved fixture may prepare a bounded proposal.
- Unsupported and prompt-injection scenarios remain refused or contained and cannot become proposal work.
- Timeout and provider-unavailable scenarios activate visible provider-independent fallback.
- Stale and superseded fixtures cannot replace current results.
- Every Aster role has a local provider-independent fallback matching its role contract.
- Manual capture, structured-record recall, permission review, correction, export, deletion, and ordinary play remain visible, available without AI or a provider, permission-neutral, and unable to block core rights.

## Provider governance and egress guarantees

- Governance states distinguish not approved, synthetic-evaluation only, specialist review required, blocked, and retired.
- Synthetic evaluation permits only public or synthetic minimum-necessary fields and rejects private personal data and protected operational information.
- Real player expressions, Chronicle records, subject and account identifiers, House of Keys facts, permission decisions, receipts, memory, provider metadata, protected audit, and credentials remain prohibited from egress.
- Regions, retention, logging, abuse monitoring, training, model improvement, provider human review, and subprocessors remain explicit.
- Training, model improvement, and provider human review are prohibited for synthetic evaluation.
- Deletion behavior records a bounded deadline and evidence class while preserving downstream-copy uncertainty and rejecting universal deletion or zero-retention claims.
- Credentials remain secret-free in the public contract, least privilege, environment bound, revocable, rotatable, and absent from public repository records.
- Provider-neutral evaluation covers quality, source fidelity, uncertainty, privacy, security, accessibility, reliability, latency, cost, portability, fallback, replacement, deletion, and concentration.
- A provider-funded evaluator cannot claim independence and requires separate review.
- Providers cannot set controlling criteria or weights, suppress negative findings, or control publication.
- Credits and sponsor benefits require an exact public funding-record reference and disclosed conflicts.
- Funding cannot determine provider defaults, source rank, connector rank, egress, benchmark conclusions, publication, or governance authority.
- Every candidate requires a provider-independent adapter, local or manual fallback, and versioned replacement, migration, and teardown plans.
- Critical dependency without an exit plan, unknown concentration, or exception-level concentration cannot remain evaluation eligible.
- Provider claims cannot establish production approval, preferred status, source authority, clinical suitability, standards-based safety, independent review, zero retention, or complete deletion.

## Responsive and deferred work guarantees

- Responsive, deferred, and manual-fallback work must match the selected role's public execution classes.
- Stable work identity, revision, request, subject, authority, source, and policy snapshots remain inspectable.
- Current applicability requires exact input and current revision snapshots; stale applicability requires a visible difference.
- Deferred `accepted` state means accepted for later processing and cannot include an execution attempt or completion claim.
- Only current `succeeded` work with a successful attempt may expose a complete or partial proposal-only result.
- Retry policy is explicit, versioned, bounded, freshness-preserving, and independent of provider defaults.
- Idempotency prevents duplicate authoritative effects and cannot rely only on transport de-duplication.
- Timeout and cancellation preserve direct state and cannot claim completion or universal reversal.
- Provider unavailability activates a manual, deterministic, or structured-query fallback without blocking core rights.
- Stale, superseded, corrected, quarantined, or unknown-outcome work cannot replace current results or retry automatically under stale authority.
- Replay creates a new work identity, identifies the source work revision, and preserves prior results.

## Prompt-injection and untrusted-input guarantees

- The public classes cover documents, images, imported records, web content, retrieved passages, provider responses, tool results, model output, and prior conversation.
- Every class treats content and embedded instructions as data-only.
- The deterministic application supplies the exact subject, purpose, authority revisions, allowed resources, and server-owned tool revisions.
- Input-supplied subject, permission, resource, tool, policy, confirmation, canonical, clinical, and memory claims are not accepted as authority.
- Cross-subject claims and untrusted resource or tool requests require explicit findings and containment.
- Material prompt-injection findings require blocking or a manual fallback and cannot prepare a proposal.
- Source, uncertainty, and conflict visibility remain literal and inspectable.
- Isolation evaluation itself cannot invoke tools, access resources, persist memory, or attempt canonical writes.

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
- versioned proposal, extraction, intent, recall, memory, untrusted-input, work-lifecycle, provider-governance, and local-synthetic-adapter contracts;
- public memory, untrusted-input, provider, local-scenario, local-outcome, runtime, role-fallback, and core-fallback taxonomies;
- serialized memory lifecycle, untrusted-input isolation, responsive/deferred work, provider-governance, and local synthetic run envelopes;
- stable authority, role, proposal, extraction, intent, recall, memory, untrusted-input, work, provider-governance, and local-adapter validation issue codes;
- public-surface Node tests covering authority separation, exact confirmation, intent clarification and refusal, source-linked recall, stale-index fallback, mapping and lifecycle uncertainty, material-memory player controls, record-linked recomputation, provider-metadata separation, deletion, secondary-use rejection, missing-memory fallback, prompt-injection containment, cross-subject isolation, arbitrary resource rejection, visibility preservation, memory self-persistence rejection, responsive success, truthful deferred acceptance, bounded retry, duplicate safety, timeout, cancellation, provider fallback, stale-result rejection, replay, correction relationships, unknown external outcomes, synthetic-only provider evaluation, private-egress rejection, provider training and human-review rejection, evaluator independence, funding conflicts, public funding records, concentration, exit planning, deterministic repeatability, all-role local coverage, source-linked local fixtures, clarification, local refusal, local prompt-injection containment, complete core non-AI fallback, and runtime, fallback, role, and authority escalation rejection; and
- architecture and execution documentation that keeps Chronicle, House of Keys, gameplay, application, memory, provider, retrieval, work, local fixtures, audit, funding, and institutional authority separate.

## Current limits

This baseline does not yet complete compatibility review, cross-contract completion evidence, production provider selection, procurement, private-data egress, production queueing, scheduling, workflow execution, sandboxing, persistence, secure deletion, or the Sprint 6 acceptance record. Those remain tracked in issue #47 and the Sprint 6 execution plan.

No production provider, EHR, connector, clinical partner, model gateway, queue, scheduler, workflow engine, event store, vector database, account system, real-data path, sandbox, or enterprise relationship is selected or approved by this contract baseline.
