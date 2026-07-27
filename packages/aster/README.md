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
- `validate.ts` deterministically validates the authority matrix.
- `validate-role-contracts.ts` deterministically validates detailed role contracts against the authority matrix and shared safety boundaries.
- `version.ts` exposes the pre-stable contract version.

Tests import only `dist/index.js` so private file layout does not become the consumer contract.

## Role guarantees

- The Scribe prepares structured capture drafts but cannot store them.
- The Librarian sources every recalled health statement and cannot treat retrieval score as truth.
- The Wayfinder proposes routes without expanding permission or completing domain actions.
- The Interpreter preserves source and mapping limitations and cannot diagnose, prescribe, or imply standards-based completeness or safety.
- The Storykeeper presents confirmed events without inventing canon, progression, or rewards.

All request context is transient by default. Roles own no hidden retained memory. Any retained memory requires a separate visible player choice. Future provider egress remains policy-gated and minimum necessary; no provider is approved by this package.

See [`docs/architecture/aster-contract-boundary.md`](../../docs/architecture/aster-contract-boundary.md), [`docs/architecture/aster-role-contracts.md`](../../docs/architecture/aster-role-contracts.md), [`docs/product/aster-contract-baseline.md`](../../docs/product/aster-contract-baseline.md), and [`docs/roadmap/sprint-6-execution-plan.md`](../../docs/roadmap/sprint-6-execution-plan.md).
