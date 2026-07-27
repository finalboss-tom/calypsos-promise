# `@calypsos-promise/aster`

Pre-stable, provider-independent public contracts for Aster roles, proposals, AI governance, memory, provider egress, untrusted-input isolation, responsive and deferred work, deterministic local substitution, compatibility, migration, and non-AI fallback.

## Owner and reason to change

- **Owner:** Aster contract capability
- **Primary reason to change:** the public meaning, authority, lifecycle, safety, provider, compatibility, migration, or fallback contract for Aster proposals changes

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
- `provider-governance.ts` defines provider candidates, synthetic-only evaluation states, minimum-necessary egress, handling, deletion, credential, evaluation, funding-conflict, concentration, replacement, migration, teardown, incident, public-claim, specialist-holdpoint, and non-authority contracts.
- `local-synthetic-adapter.ts` defines a deterministic provider-free scenario catalogue, pure runner, five role fallbacks, seven core non-AI paths, runtime exclusions, synthetic source references, degraded behavior, and literal non-authority.
- `compatibility.ts` defines the twelve-component public manifest, public synthetic fixture catalogue, role cross-contract bindings, compatibility classifications, migration policy and plan, and compatibility non-authority boundary.
- `validate.ts`, `validate-role-contracts.ts`, `validate-proposal.ts`, `validate-intent.ts`, `validate-source-recall.ts`, `validate-memory.ts`, `validate-untrusted-input.ts`, `validate-work-lifecycle.ts`, `validate-provider-governance.ts`, `validate-local-synthetic-adapter.ts`, and `validate-compatibility.ts` deterministically validate the corresponding public contracts.
- `version.ts` exposes the pre-stable contract version.

Tests import only `dist/index.js` so private file layout does not become the consumer contract.

## Compatibility, fixtures, and migration guarantees

- Twelve public component entries bind current schema, revision, validator, fixture, compatibility, migration, and non-authority state.
- Every public component has a synthetic, public-safe, credential-free, non-authoritative fixture entry bound to one or more deterministic local scenarios.
- Five role bindings preserve exact role, operation, primary proposal kind, success fixture, and provider-independent fallback alignment.
- The manifest contains the exact seventeen local scenarios and seven core non-AI paths.
- The provider-state taxonomy remains exact and cannot add a production-approved state.
- Optional additive changes may remain compatible; required additions, enum expansion, field removal, semantic changes, and revision rebases require migration evidence.
- Authority-boundary changes are incompatible with ordinary migration and require a new governing decision.
- Unknown compatibility fails closed.
- Migration preserves source artifacts and prior revisions, creates a new revision, declares rollback or forward-only behavior, and cites public synthetic fixtures.
- Compatibility and migration cannot write canonical records, create permission, confirm proposals, select provider defaults, set source rank, control publication, complete quests, or grant rewards.

## Local synthetic adapter and non-AI guarantees

- Seventeen versioned synthetic scenarios cover every role, successful drafting, source-linked recall, navigation, explanation, confirmed-event presentation, unknown and ambiguous intent, clarification, low confidence, refusal, prompt injection, timeout, provider unavailability, stale and superseded work, manual capture, and permission review.
- Running the same scenario identifier returns the same serialized result.
- The adapter uses no provider, network, credentials, wall clock, randomness, or persistent storage.
- Every successful role scenario uses the exact operation from the public role contract and remains non-authoritative.
- Recall, explanation, and confirmed-event presentation fixtures preserve exact synthetic source revisions.
- Unknown, ambiguous, and low-confidence consequential requests require direct clarification before proposal preparation.
- Unsupported and prompt-injection scenarios cannot become proposal work.
- Five role fallbacks and seven core fallback paths remain available without AI or a provider.
- Manual capture, structured recall, permission review, correction, export, deletion, and ordinary play remain visible, permission-neutral, and non-blocking.
- Stale and superseded synthetic results cannot replace current work.

## Provider governance guarantees

- The public governance states intentionally omit production approval; this Sprint supports only public or synthetic evaluation, specialist hold, blocking, or retirement.
- Provider evaluation transmits only minimum-necessary public or synthetic fields and prohibits private personal data, Chronicle records, subject identifiers, House of Keys facts, receipts, memory, audit, and secrets.
- Regions, retention, logging, abuse monitoring, human review, training, model improvement, and subprocessors remain explicit and versioned.
- Training, model improvement, and provider human review are prohibited for synthetic evaluation.
- Provider deletion evidence preserves downstream-copy uncertainty and cannot prove universal deletion or zero retention.
- Provider-neutral criteria cover quality, source fidelity, uncertainty, privacy, security, accessibility, reliability, latency, cost, portability, fallback, replacement, deletion, and concentration.
- A provider-funded evaluator cannot be the independent reviewer or control criteria, findings, or publication.
- Credits, sponsorship, or other benefits require an exact public funding-record reference and cannot determine defaults, rank, egress, benchmark conclusions, publication, or governance.
- Every candidate requires provider-independent adapters, local or manual fallback, and versioned replacement, migration, and teardown plans.
- Provider claims cannot establish production approval, preference, source authority, clinical suitability, standards-based safety, independent review, or complete deletion.

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

See [`docs/architecture/aster-contract-boundary.md`](../../docs/architecture/aster-contract-boundary.md), [`docs/architecture/aster-role-contracts.md`](../../docs/architecture/aster-role-contracts.md), [`docs/architecture/aster-proposal-and-extraction-contracts.md`](../../docs/architecture/aster-proposal-and-extraction-contracts.md), [`docs/architecture/aster-intent-confidence-clarification-refusal.md`](../../docs/architecture/aster-intent-confidence-clarification-refusal.md), [`docs/architecture/aster-source-linked-recall-and-explanation-contracts.md`](../../docs/architecture/aster-source-linked-recall-and-explanation-contracts.md), [`docs/architecture/aster-memory-lifecycle-contracts.md`](../../docs/architecture/aster-memory-lifecycle-contracts.md), [`docs/architecture/aster-untrusted-input-isolation-contracts.md`](../../docs/architecture/aster-untrusted-input-isolation-contracts.md), [`docs/architecture/aster-responsive-and-deferred-work-contracts.md`](../../docs/architecture/aster-responsive-and-deferred-work-contracts.md), [`docs/architecture/aster-provider-governance-and-egress-contracts.md`](../../docs/architecture/aster-provider-governance-and-egress-contracts.md), [`docs/architecture/aster-local-synthetic-adapter-and-non-ai-fallbacks.md`](../../docs/architecture/aster-local-synthetic-adapter-and-non-ai-fallbacks.md), [`docs/architecture/aster-compatibility-migration-and-cross-contract-evidence.md`](../../docs/architecture/aster-compatibility-migration-and-cross-contract-evidence.md), [`docs/product/aster-contract-baseline.md`](../../docs/product/aster-contract-baseline.md), and [`docs/roadmap/sprint-6-execution-plan.md`](../../docs/roadmap/sprint-6-execution-plan.md).
