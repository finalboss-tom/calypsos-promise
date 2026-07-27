# `@calypsos-promise/aster`

Pre-stable, provider-independent public contracts for Aster roles, proposals, AI governance, memory, provider egress, untrusted-input isolation, responsive and deferred work, deterministic local substitution, and non-AI fallback.

## Owner and reason to change

- **Owner:** Aster contract capability
- **Primary reason to change:** the public meaning, authority, lifecycle, safety, provider, or fallback contract for Aster proposals changes

## Authority boundary

Aster proposes. The player confirms. Deterministic domain services validate and store.

This package does not own Living Chronicle truth, House of Keys permission truth, gameplay completion, rewards, application state, protected audit, provider logs, retrieval indexes, delayed-work execution state, or institutional authority.

The core package intentionally has no database, network, provider, model SDK, UI, filesystem, environment, session, secret, wall-clock, queue, scheduler, workflow-engine, event-store, or vector-database dependency.

## Current public surface

- `authority.ts` defines the five roles, direct accessible names, allowed input and output classes, authority-source classes, deterministic action owners, execution classes, confirmation rules, mandatory prohibitions, and the authority matrix.
- `role-contracts.ts` defines bounded operations, evidence, clarification, qualitative confidence and uncertainty, failure, source-link, retention, provider-egress, manual fallback, and role-specific prohibitions.
- `proposal.ts` defines proposal kinds, subject, request, producer, source, transformation, confidence, uncertainty, clarification, intended action, review, authority, domain outcome, payload, and structured extraction.
- `intent.ts` defines bindable and safe meta intents, consequence classes, dispositions, ambiguity and refusal taxonomies, clarification lifecycle, candidates, and non-authoritative intent decisions.
- `source-recall.ts` defines exact Chronicle and public-education references, locators, lifecycle, mapping, implementation-guide, retrieval freshness, structured-query fallback, source-linked statements, uncertainty, and non-authority.
- `memory.ts` defines transient context, retained preferences, accessibility context, separately retained conversation, record-linked derived memory, narrative presentation state, provider operational metadata, retention, lifecycle, player controls, egress, secondary-use boundaries, and missing-memory fallback.
- `untrusted-input.ts` defines public untrusted input classes and uses, server-resolved context, server-owned tool references, input and finding contracts, dispositions, visibility, authority, and no-effect boundaries.
- `work-lifecycle.ts` defines responsive, deferred, and manual-fallback work identity, revision snapshots, attempts, retry, idempotency, dependency, fallback, result, acknowledgement, cancellation, correction, supersession, replay, and non-authority contracts.
- `validate.ts`, `validate-role-contracts.ts`, `validate-proposal.ts`, `validate-intent.ts`, `validate-source-recall.ts`, `validate-memory.ts`, `validate-untrusted-input.ts`, and `validate-work-lifecycle.ts` deterministically validate the corresponding public contracts.
- `version.ts` exposes the pre-stable contract version.

Tests import only `dist/index.js` so private file layout does not become the consumer contract.

## Responsive and deferred work guarantees

- Responsive, deferred, and manual-fallback work must match the execution classes allowed by the selected role contract.
- Deferred acceptance means accepted for later processing, not complete.
- Work binds exact request, subject, source, authority, and policy revisions at input and compares them with a current snapshot.
- Only current, successfully attempted work may publish a complete or partial proposal-only result.
- Retry policy is versioned, bounded, freshness-preserving, and independent of provider defaults.
- Domain duplicate safety cannot rely only on transport de-duplication.
- Timeout and cancellation remain explicit and cannot claim completion or reversal of external effects.
- Provider unavailability activates a manual, deterministic, or structured-query fallback without blocking core rights.
- Stale, superseded, corrected, quarantined, or unknown-outcome work cannot overwrite newer results or retry automatically under stale authority.
- Replay creates a new work identity and preserves prior results.

## Untrusted-input guarantees

- Documents, images, imported records, web content, retrieved passages, provider responses, tool results, model output, and prior conversation remain untrusted data.
- Embedded instructions cannot set policy, modify the tool registry, choose the controlling subject, create permission, expand action scope, bypass confirmation, invoke arbitrary resources, or persist themselves as memory.
- Subject, resource, purpose, authority, and allowed-tool context come from the deterministic application rather than the content.
- Allowed tools require exact revisions from the server-owned registry.
- Cross-subject claims and arbitrary tool or resource requests require explicit findings and containment.
- Material prompt-injection findings block proposal preparation or use a manual fallback.
- Sources, uncertainty, and conflicts remain visible.
- Isolation evaluation cannot itself invoke tools, access resources, persist memory, or attempt a canonical write.

## Memory guarantees

- Material product memory is separately chosen, player-visible, editable through inspectable revision, exportable, and deletable.
- Transient context is request-bounded and cannot silently become retained memory.
- Record-linked derived memory requires exact Chronicle record and revision evidence and falls back to recomputation or direct record inspection.
- Correction and supersession preserve prior memory revisions rather than silently overwriting them.
- Deleted, expired, or unavailable memory does not retain the prior value in the active contract object.
- Provider operational metadata remains outside product memory; the core carries only a bounded external reference, policy, and expiry rather than raw provider content.
- Memory does not authorize provider training, research, commerce, secondary use, canonical writes, permission, proposal confirmation, progression, or rewards.
- Missing memory cannot block core capture, permission review, correction, export, deletion, or ordinary play.

## Recall and explanation guarantees

- Every person-specific health statement requires an exact Chronicle record and revision reference.
- Public educational material remains clearly labeled and cannot establish a person-specific fact.
- Source references preserve source-version identity, locator, lifecycle, correction, conflict, deletion, mapping, and implementation-guide state where applicable.
- Partial, lossy, conflicting, or unsupported mapping requires a direct loss description.
- Standards or implementation-guide conformance cannot prove clinical completeness, semantic equivalence, safety, or endorsement.
- Stale, unavailable, or unknown semantic retrieval must use the structured-query fallback before returning statements.
- Required uncertainty remains visible for correction, conflict, mapping loss, implementation-guide limits, deleted sources, and public education.

## Intent guarantees

- The public taxonomy distinguishes capture, recall, explanation, navigation, permission review, correction, export, deletion preparation, support routing, non-actionable conversation, unknown, mixed, conflicting, and unsupported intent.
- Unknown, mixed, conflicting, or multiply plausible bindable intent requires clarification rather than choosing the most likely action.
- Unsupported intent requires an inspectable refusal, explanation, and safe manual fallback.
- Confidence is qualitative, explained, and explicitly non-authoritative; numeric probabilities, scores, and percentages are rejected.
- A bound intent requires explicit player choice and may prepare only a non-authoritative proposal.

## Proposal guarantees

- Proposal identity, role, operation, kind, subject, request, producer, source references, transformation provenance, intended action, and review revision are inspectable.
- Confirmation binds the exact proposal revision and must identify the player as the confirming actor.
- Proposal payloads are non-canonical and cannot claim permission, domain invocation, validation, storage, execution, progression, or rewards.
- Structured extraction produces candidates, not Chronicle values. Candidates are explicitly unconfirmed, non-canonical, and not domain-accepted.

## Role guarantees

- The Scribe prepares structured capture drafts but cannot store them.
- The Librarian sources every recalled health statement and cannot treat retrieval score as truth.
- The Wayfinder proposes routes without expanding permission or completing domain actions.
- The Interpreter preserves source and mapping limitations and cannot diagnose, prescribe, or imply standards-based completeness or safety.
- The Storykeeper presents confirmed events without inventing canon, progression, or rewards.

See [`docs/architecture/aster-contract-boundary.md`](../../docs/architecture/aster-contract-boundary.md), [`docs/architecture/aster-role-contracts.md`](../../docs/architecture/aster-role-contracts.md), [`docs/architecture/aster-proposal-and-extraction-contracts.md`](../../docs/architecture/aster-proposal-and-extraction-contracts.md), [`docs/architecture/aster-intent-confidence-clarification-refusal.md`](../../docs/architecture/aster-intent-confidence-clarification-refusal.md), [`docs/architecture/aster-source-linked-recall-and-explanation-contracts.md`](../../docs/architecture/aster-source-linked-recall-and-explanation-contracts.md), [`docs/architecture/aster-memory-lifecycle-contracts.md`](../../docs/architecture/aster-memory-lifecycle-contracts.md), [`docs/architecture/aster-untrusted-input-isolation-contracts.md`](../../docs/architecture/aster-untrusted-input-isolation-contracts.md), [`docs/architecture/aster-responsive-and-deferred-work-contracts.md`](../../docs/architecture/aster-responsive-and-deferred-work-contracts.md), [`docs/product/aster-contract-baseline.md`](../../docs/product/aster-contract-baseline.md), and [`docs/roadmap/sprint-6-execution-plan.md`](../../docs/roadmap/sprint-6-execution-plan.md).
