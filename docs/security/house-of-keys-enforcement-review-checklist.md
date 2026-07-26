# House of Keys Enforcement Review Checklist

[Security architecture](README.md) · [Enforcement security model](house-of-keys-enforcement-security-model.md) · [Control register](house-of-keys-control-register.md) · [Lifecycle register](house-of-keys-decision-execution-lifecycle-register.md)

**Status:** Sprint 5 workstream 5.5 internal review aid  
**Production boundary:** checklist only; completion does not represent implementation, deployment, operational verification, or independent review

Use this checklist when reviewing a future policy gateway, queue, performer, release, receipt, audit, agent, connector, migration, or incident design.

## Authority and request

- [ ] Actor, controlled resource, subjects, recipient, performer, and processor are derived from bounded authoritative context.
- [ ] The request represents one atomic operation with exact purpose, category, selector, action, condition, duration, and revisions.
- [ ] Missing, stale, ambiguous, conflicting, unsupported, or unmapped facts fail closed.
- [ ] The pure evaluator remains isolated from network, storage, provider, clock, model, session, and environment access.

## Freshness and lifecycle

- [ ] The decision preserves every authority-bearing dependency and its revision.
- [ ] Freshness ends at the shortest applicable grant, session, condition, capacity, membership, policy, or execution boundary.
- [ ] Lifecycle changes invalidate dependent decisions, reservations, envelopes, queued work, agents, and active operations.
- [ ] An authoritative final check occurs immediately before release or another irreversible action.
- [ ] Revocation races preserve effective ordering; ambiguous ordering becomes explicit unknown state.

## Execution and capacity

- [ ] One non-transferable envelope binds one decision to one operation, service audience, environment, resource, recipient, and expiry.
- [ ] Retries reuse one operation and idempotency identity.
- [ ] Single-use or bounded-count authority obtains an operation-bound reservation before execution.
- [ ] Capacity is committed only under the declared irreversible-boundary rule.
- [ ] Capacity is released only when evidence proves that the irreversible boundary was not crossed.
- [ ] Unknown or conflicting outcomes quarantine capacity and block automatic retry.

## Queue and recipient

- [ ] Queue manifests contain minimized references and do not create authority by possession.
- [ ] Expired or invalidated envelopes cannot execute from retry or dead-letter storage.
- [ ] Duplicate delivery cannot create duplicate release or consumption.
- [ ] Recipient, performer, processor, destination, purpose, scope, conditions, and freshness are verified at release.
- [ ] Long-running and streaming operations re-evaluate at meaningful checkpoints.
- [ ] Materially distinct batch members retain independent decisions, operations, capacity, and receipts.

## Receipt and audit

- [ ] Required receipt intent is durable before the irreversible boundary.
- [ ] Receipt existence, delivery, failure, accessibility, acknowledgment, correction, and deletion remain distinct.
- [ ] Missing, duplicate, conflicting, delayed, inaccessible, or false receipts trigger reconciliation and incident handling.
- [ ] Receipt correction is append-only and preserves the original claim.
- [ ] Receipts minimize personal content and do not become shadow Chronicle records.
- [ ] Protected audit uses event-specific field allowlists and scoped search.
- [ ] Audit evidence cannot create permission or replace a missing person-visible receipt.

## Correction, migration, and restoration

- [ ] Reconciliation detects mismatched decisions, capacity, execution, release, receipt, and audit evidence.
- [ ] Corrections preserve prior records and do not manufacture a clean authorized narrative.
- [ ] Migrations preserve revisions, lifecycle ordering, capacity history, release claims, receipts, and audit correlation.
- [ ] Affected people have safe explanation, notification, challenge, correction, and restoration paths.
- [ ] Irreversible or downstream harm is recorded explicitly when full restoration is impossible.

## Constitutional and evidence boundary

- [ ] Refusal, denial, indeterminate state, expiry, exhaustion, revocation, challenge, or receipt volume does not affect core rights, rewards, progression, compensation, or governance.
- [ ] AI, MCP, connectors, operators, recipients, providers, and queues cannot create or broaden authority.
- [ ] Control status distinguishes required, designed, synthetically tested, independently reviewed, implemented, deployed, and operationally verified evidence.
- [ ] Production-facing residual risks remain blocking until their required evidence and specialist gates are satisfied.
