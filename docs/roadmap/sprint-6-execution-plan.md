# Sprint 6 Execution Plan — Aster Contracts and AI Governance

[Documentation home](../README.md) · [Roadmap index](README.md) · [Current status](current-status.md) · [Completion record](sprint-6-completion-record.md) · [Cross-contract reconciliation](../architecture/aster-sprint-6-cross-contract-reconciliation.md) · [Control map](../architecture/aster-sprint-6-control-and-evidence-map.md) · [Holdpoints and unresolved work](../architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md) · [Issue #47](https://github.com/finalboss-tom/calypsos-promise/issues/47) · [PR #48](https://github.com/finalboss-tom/calypsos-promise/pull/48)

- **Status:** COMPLETE AND MERGED
- **Entry baseline:** `main` at `4dfd39e7aa02ffe1ef3f5ba296378b29bd078047`
- **Working branch:** `agent/sprint-6-aster-contracts`
- **Pull request:** #48
- **Squash commit:** `5aa3540765e5573f3304ce2b624d7a02c3ba2d13`
- **Started and completed:** 2026-07-27
- **Information boundary:** public repository records and public synthetic evidence only
- **Certification boundary:** contract, governance, deterministic validation, public synthetic fixtures, compatibility, migration, and completion evidence; not production AI, clinical, privacy, security, accessibility, legal, interoperability, procurement, financial, or operational certification

## Goal

> Convert Aster from a concept into enforceable interfaces.

Sprint 6 established one bounded pre-stable package, `@calypsos-promise/aster`, while preserving the permanent transaction boundary:

> AI proposes; the player confirms; deterministic domain services validate and store.

A provider response, model output, conversational acknowledgement, queued request, deferred acceptance, retry, retrieval score, transport success, Aster role name, retained memory, untrusted input, provider account, credit, sponsorship, benchmark, local synthetic fixture, compatibility label, migration plan, passing test, or CI result is not proof of permission, canonical storage, quest completion, reward, provider approval, clinical authority, or domain success.

## Completed workstreams

1. **6.1 — Bounded capability and authority matrix:** package ownership, public exports, versioning, five roles, deterministic owners, execution classes, confirmation rules, and mandatory prohibitions.
2. **6.2 — Role contracts:** detailed Scribe, Librarian, Wayfinder, Interpreter, and Storykeeper inputs, outputs, evidence, failures, retention, egress, and fallback.
3. **6.3 — Proposal and extraction:** versioned non-canonical proposal envelope, exact-revision review, source and transformation provenance, and extraction candidates.
4. **6.4 — Intent and refusal:** bindable and meta intents, consequence classes, qualitative confidence, ambiguity, clarification, refusal, and safe fallback.
5. **6.5 — Source-linked recall:** exact Chronicle and public-education references, provenance, mapping, lifecycle, freshness, structured-query fallback, and uncertainty.
6. **6.6 — Memory lifecycle:** transient and retained classes, separate player choice, visibility, revision, export, deletion, source evidence, and non-blocking absence.
7. **6.7 — Untrusted input:** data-only handling, deterministic subject and resource context, server-owned tools, findings, containment, visibility, and non-authority.
8. **6.8 — Responsive and deferred work:** stable identity, attempts, retry, idempotency, timeout, cancellation, provider fallback, stale-result rejection, correction, supersession, and replay.
9. **6.9 — Provider governance:** minimum-necessary synthetic evaluation, handling, deletion uncertainty, evaluator independence, funding conflicts, concentration, replacement, migration, teardown, incidents, and public-claim limits.
10. **6.10 — Local substitute and non-AI fallback:** seventeen deterministic scenarios, five role fallbacks, and seven complete core non-AI paths.
11. **6.11 — Validation, fixtures, compatibility, and migration:** twelve-component manifest, twelve public synthetic fixtures, role bindings, fail-closed compatibility, evidence-preserving migrations, and public-surface tests.
12. **6.12 — Completion:** cross-contract reconciliation, twenty-four-control map, nineteen holdpoints, nineteen unresolved-work records, status repair, and completion evidence.

## Accepted acceptance-criterion result

All accepted Sprint 6 criteria were met at public contract, deterministic-validation, and public-synthetic-evidence level:

- Aster cannot write directly to canonical records.
- Person-specific recalled health statements require authoritative Chronicle references.
- Material memories remain visible, editable through revision, exportable, and deletable.
- AI unavailability does not block core capture or permission review.
- Funding and provider relationships cannot determine authority, defaults, connector rank, egress, benchmark conclusions, compatibility, migration, or publication.
- Standards conformance cannot imply clinical completeness, semantic equivalence, safety, or endorsement.
- Provider governance is defined without selecting or endorsing a production AI provider, EHR, connector, or clinical partner.

## Public evidence

- package contracts and public exports under `packages/aster`;
- deterministic validators and public-surface Node tests importing `dist/index.js`;
- architecture documents under `docs/architecture`;
- [Aster Contract Baseline](../product/aster-contract-baseline.md);
- [Sprint 6 Completion Record](sprint-6-completion-record.md);
- [Cross-Contract Reconciliation](../architecture/aster-sprint-6-cross-contract-reconciliation.md);
- [Control and Evidence Map](../architecture/aster-sprint-6-control-and-evidence-map.md); and
- [Specialist Holdpoint and Unresolved-Work Register](../architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md).

## Explicit non-scope retained after merge

Sprint 6 did not select, endorse, procure, or integrate a production AI provider, EHR, connector, clinical partner, model gateway, queue, scheduler, workflow engine, event store, vector database, sandbox, storage provider, or enterprise relationship.

It did not authorize private-data egress, production credentials, real health-data processing, accounts, production identity, permission orchestration, persistence, remote retrieval, production memory, media processing, clinical decision support, diagnosis, treatment, emergency response, research enrollment, production migrations, or secure-erasure claims.

It did not place Aster roles, prompts, memory, provider metadata, retrieval indexes, fixtures, compatibility evidence, migration state, or delayed-work execution state inside Living Chronicle truth.

## Validation record

The final review branch head `dbd1ff6cd7764500c9a1a68bec9d8ce5281890de` passed the repository validation surface before merge, including formatting, documentation links, content validation, repository policy, economics validation, lint, typecheck, tests, and DCO attestation.

PR #48 was explicitly accepted and squash merged as `5aa3540765e5573f3304ce2b624d7a02c3ba2d13`, closing issue #47.

## Handoff

Sprint 7 does not inherit production AI or private agent authority. It inherits:

- public documentation and synthetic data only;
- server-owned tool authority;
- data-only treatment of retrieved content;
- source provenance and visible limitations;
- deterministic validation and draft-only generation;
- provider, funding, sponsor, and publication independence;
- compatibility and migration discipline;
- complete non-MCP contribution paths; and
- all open production and specialist holdpoints.

The controlling next-step record is the [Pre-Sprint 7 Alignment Review](pre-sprint-7-alignment-review.md).
