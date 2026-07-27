# `@calypsos-promise/aster`

Pre-stable, provider-independent public contracts for Aster roles, proposals, AI governance, memory, provider egress, untrusted-input isolation, delayed results, deterministic local substitution, and non-AI fallback.

## Owner and reason to change

- **Owner:** Aster contract capability
- **Primary reason to change:** the public meaning, authority, lifecycle, safety, provider, or fallback contract for Aster proposals changes

## Authority boundary

Aster proposes. The player confirms. Deterministic domain services validate and store.

This package does not own Living Chronicle truth, House of Keys permission truth, gameplay completion, rewards, application state, protected audit, provider logs, retrieval indexes, delayed-work state, or institutional authority.

The core package intentionally has no database, network, provider, model SDK, UI, filesystem, environment, session, secret, wall-clock, queue, scheduler, workflow-engine, event-store, or vector-database dependency.

## Current public surface

- `authority.ts` defines the five roles, direct accessible names, allowed input and output classes, authority-source classes, deterministic action owners, execution classes, confirmation rules, mandatory prohibitions, and the authority matrix.
- `role-contracts.ts` defines the bounded operation, evidence requirements, clarification triggers, qualitative confidence and uncertainty rules, failure codes, source-link rules, retention limits, provider-egress limits, manual fallback, and role-specific prohibitions for each role.
- `proposal.ts` defines proposal kinds, subject, request, producer, source, transformation, confidence, uncertainty, clarification, intended-action, review, authority, domain-outcome, payload, and structured-extraction contracts.
- `intent.ts` defines bindable and safe meta intents, consequence classes, dispositions, ambiguity and refusal taxonomies, clarification lifecycle, intent candidates, and non-authoritative intent decisions.
- `source-recall.ts` defines exact Chronicle and public-education source references, locators, lifecycle, mapping, implementation-guide, retrieval-freshness, structured-query fallback, source-linked statements, uncertainty, and non-authority contracts.
- `validate.ts` deterministically validates the authority matrix.
- `validate-role-contracts.ts` deterministically validates detailed role contracts against the authority matrix and shared safety boundaries.
- `validate-proposal.ts` deterministically validates proposal envelopes and structured extraction candidates against role, source, review, provenance, non-authority, and domain-handoff boundaries.
- `validate-intent.ts` deterministically validates intent binding, qualitative confidence, clarification, refusal, safe proposal preparation, and non-authority.
- `validate-source-recall.ts` deterministically validates exact source revisions, personal versus public statements, lifecycle and mapping visibility, semantic-retrieval fallback, uncertainty, clinical limits, and non-authority.
- `version.ts` exposes the pre-stable contract version.

Tests import only `dist/index.js` so private file layout does not become the consumer contract.

## Recall and explanation guarantees

- Every person-specific health statement requires at least one exact Chronicle record and revision reference.
- Public educational material remains clearly labeled and cannot establish a person-specific fact.
- Source references preserve source-version identity, locator, lifecycle, correction, conflict, deletion, mapping, and implementation-guide state where applicable.
- Partial, lossy, conflicting, or unsupported mapping requires a direct loss description.
- Standards or implementation-guide conformance cannot prove clinical completeness, semantic equivalence, safety, or endorsement.
- Stale, unavailable, or unknown semantic retrieval must use the structured-query fallback before returning statements.
- Required uncertainty remains visible for correction, conflict, mapping loss, implementation-guide limits, deleted sources, and public education.
- Recall cannot diagnose, prescribe, direct emergency care, write canonical records, create permission, or treat provider rank, retrieval score, recency, or standards profile as truth.

## Intent guarantees

- The public taxonomy distinguishes capture, recall, explanation, navigation, permission review, correction, export, deletion preparation, support routing, non-actionable conversation, unknown, mixed, conflicting, and unsupported intent.
- Unknown, mixed, conflicting, or multiply plausible bindable intent requires clarification rather than choosing the most likely action.
- Unsupported intent requires an inspectable refusal, explanation, and safe manual fallback.
- Confidence is qualitative, explained, and explicitly non-authoritative; numeric probabilities, scores, and percentages are rejected.
- A bound intent requires explicit player choice and may prepare only a non-authoritative proposal.
- Intent classification cannot invoke actions, create or expand permission, confirm proposals, or claim domain completion.

## Proposal guarantees

- Proposal identity, role, operation, kind, subject, request, producer, source references, transformation provenance, intended action, and review revision are inspectable.
- Confirmation binds the exact proposal revision and must identify the player as the confirming actor.
- Source references remain minimum-necessary identifiers; proposal envelopes do not copy source records.
- Proposal payloads are non-canonical and cannot claim permission, domain invocation, validation, storage, execution, progression, or rewards.
- Structured extraction produces candidates, not Chronicle values. Candidates are explicitly unconfirmed, non-canonical, and not domain-accepted.
- Unparsed material remains visible with a source reference and reason rather than being silently discarded.

## Role guarantees

- The Scribe prepares structured capture drafts but cannot store them.
- The Librarian sources every recalled health statement and cannot treat retrieval score as truth.
- The Wayfinder proposes routes without expanding permission or completing domain actions.
- The Interpreter preserves source and mapping limitations and cannot diagnose, prescribe, or imply standards-based completeness or safety.
- The Storykeeper presents confirmed events without inventing canon, progression, or rewards.

All request context is transient by default. Roles own no hidden retained memory. Any retained memory requires a separate visible player choice. Future provider egress remains policy-gated and minimum necessary; no provider is approved by this package.

See [`docs/architecture/aster-contract-boundary.md`](../../docs/architecture/aster-contract-boundary.md), [`docs/architecture/aster-role-contracts.md`](../../docs/architecture/aster-role-contracts.md), [`docs/architecture/aster-proposal-and-extraction-contracts.md`](../../docs/architecture/aster-proposal-and-extraction-contracts.md), [`docs/architecture/aster-intent-confidence-clarification-refusal.md`](../../docs/architecture/aster-intent-confidence-clarification-refusal.md), [`docs/architecture/aster-source-linked-recall-and-explanation-contracts.md`](../../docs/architecture/aster-source-linked-recall-and-explanation-contracts.md), [`docs/product/aster-contract-baseline.md`](../../docs/product/aster-contract-baseline.md), and [`docs/roadmap/sprint-6-execution-plan.md`](../../docs/roadmap/sprint-6-execution-plan.md).
