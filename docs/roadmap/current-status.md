# Current Project Status

[Repository home](../../README.md) · [Documentation home](../README.md) · [Sprint 9 execution plan](sprint-9-execution-plan.md) · [Sprint 9.8 validation](sprint-9-workstream-9-8-validation-record.md) · [Sprint 9.9 publication and rollback](sprint-9-workstream-9-9-publication-and-rollback.md) · [Pre-9.10 quality review](sprint-9-pre-9-10-quality-review.md) · [Sprint 9 issue #67](https://github.com/finalboss-tom/calypsos-promise/issues/67) · [Draft PR #68](https://github.com/finalboss-tom/calypsos-promise/pull/68) · [Sprint sequence](sprints.md) · [Public roadmap](../../ROADMAP.md)

## Status summary

- **Institutional phase:** Phase 0 — Constitutional and open-source foundations
- **Institutional Phase 0 remains active.**
- **Accepted numbered sprints:** 0–8
- **Active numbered sprint:** Sprint 9 — Public Synthetic Prologue
- **Accepted Sprint 9 workstreams:** 9.1–9.9
- **Next workstream:** 9.10 — cross-contract reconciliation, completion, and Sprint 10 handoff; planned and not started
- **Sprint 9 tracking:** issue #67, draft PR #68, branch `agent/sprint-9-public-synthetic-prologue`
- **Accepted 9.8 evidence:** `b1fdba193e1ebaa8096695192ddd5f6965255529` — CI 1280 / DCO 1365
- **Accepted 9.9 technical baseline:** `0ac02609dc18ab7ff1f2b4f55ba058b6536f505c` — CI 1284 / DCO 1369
- **Protected hosted preview:** Vercel deployment `dpl_DwkovAeCrLjWq2brifBxYXu2UJ7M`, sourced from `66979c71732f0bc343000fe143485d06e0bc7fec`
- **Production website:** Vercel deployment `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp`, sourced from `1b25a2e64ff272927c65afa5e1f16aedc5e448d7`
- **Git-triggered Vercel deployment is disabled.**
- **Newsletter:** Path A — preserve and activate; issue #63 remains open for private provider-delivery verification and final acceptance
- **Production health data, accounts, private Chronicles, production Aster, providers, connectors, clinical workflows, research enrollment, payments, or consequential actions:** none
- **Independent accessibility, affected-user, device/browser, and field performance evidence:** not established
- **Specialist approval:** not established for accessibility, security, privacy, legal, communications, clinical, interoperability, provider, financial, operational, or research boundaries
- **Phase 0 exit review:** not completed

## Primary directive

> Build a compelling, trustworthy consumer experience that helps people build, understand, improve, and control their Living Chronicles; return personal value first; enable separately authorized collective benefit; and progressively transfer stewardship as evidence, safeguards, capacity, and legitimacy mature.

The player promise remains:

> **Build your Living Chronicle. Improve your health. Keep the key.**

Every route, mechanic, data flow, model, tool, provider, funding relationship, newsletter surface, deployment, and governance action remains subordinate to that purpose.

## Current position

Sprints 0–8 are accepted and merged.

Sprint 8 established the public Next.js gateway. The accepted Sprint 8 squash commit is `20e2c95c96670f0ef6b972c9ebf7b482f7f9cf1a`. Its first production release was recorded as `dpl_3V2e76y1fwrR19j1BzUFpo9U9kjp`; the later newsletter release is the current production deployment. Git-triggered Vercel deployment was then restored to disabled.

Issue #64 accepted the Sprint 9 architecture: one `/prologue` route in `apps/site`, public synthetic information only, memory-only interaction state, deterministic optional Aster with a complete manual path, no arbitrary health or voice intake, temporary Chronicle- and receipt-shaped explanations, deterministic First Lantern evidence, non-punitive refusal and exit, and an informational future-account boundary.

Workstreams 9.1–9.7 established and corrected the complete deterministic prologue. Workstream 9.8 added rendered browser, native keyboard, accessibility-mode, duration, storage, network, performance, and cleanup evidence. Workstream 9.9 established exact source provenance, protected hosted-preview evidence, capability labels, production isolation, release ownership, correction ownership, and rollback procedures, then restored the permanent deployment lock.

## Hosted and production surfaces

The production domain remains `https://www.calypsospromise.org`. No production alias, environment variable, or production source revision changed during 9.9.

The Sprint 9 preview was built from commit `66979c71732f0bc343000fe143485d06e0bc7fec` and reached `READY` as deployment `dpl_DwkovAeCrLjWq2brifBxYXu2UJ7M`. It is protected by Vercel authentication, returns a noindex protection response, and is not a public release.

The `/prologue` route remains:

- outside public navigation and the sitemap;
- noindex and nofollow;
- unmerged;
- absent from the production domain;
- public and explicitly synthetic in content;
- deterministic and memory-only; and
- not a production capability.

The route has no account, email, arbitrary text, microphone, file, camera, location, wearable, provider, model, analytics, payment, private-data, or durable-state path. Chronicle and receipt-shaped views remain explanations without truth, permission, consent, audit, release, or clinical authority.

## Sprint 9 workstream truth

- **9.1:** contracts accepted at `6bd992f91ea0948fe248ef55817afcd520664205` — CI 1169 / DCO 1247.
- **9.2:** opening and Lantern Shore accepted at `6565fbc43c9356e7b72acaed30b50cbff2907a38` — CI 1180 / DCO 1258.
- **9.3:** Aster/manual parity accepted at `72f72223d7a07d460e89ec69b87b2003e84cdd3b` — CI 1188 / DCO 1266.
- **9.4:** synthetic review and confirmation accepted at `bed6ef4ed58ac5dcf918e2f05751586e2e0b293a` — CI 1205 / DCO 1283.
- **9.5:** Chronicle and receipt explanations accepted at `e819c71f31041632998b5f468c492e8b1c810a44` — CI 1221 / DCO 1300, with later corrections.
- **9.6:** First Lantern aggregate accepted at `4d1fa7fdec3e83f282ee8ed8f16292e509d514fa` — CI 1253 / DCO 1334.
- **9.7:** refusal, restart, discard, departure, and future-account boundaries accepted at `a3ac15f32ca098a2955c14bf815af60cccfd56d6` — CI 1257 / DCO 1339.
- **9.8:** playable validation accepted at `b1fdba193e1ebaa8096695192ddd5f6965255529` — CI 1280 / DCO 1365.
- **9.9:** protected hosted evidence and restored release controls accepted at `0ac02609dc18ab7ff1f2b4f55ba058b6536f505c` — CI 1284 / DCO 1369.
- **9.10:** planned and not started. It may now perform final cross-contract reconciliation and assemble the founding-steward completion decision; it may not silently merge, link, or deploy the prologue.

## Evidence boundaries

The 9.8 package completed manual/text and Aster/voice direct paths in 8.45 and 9.11 modeled minutes. It exercised all 41 visible controls, native keyboard completion, scene focus, announcements, reduced motion, reduced data, increased contrast, forced colors, narrow viewport, no-JavaScript behavior, and Sprint 8 route budgets. It observed no external runtime request, newsletter request, WebSocket, browser error, cookie, local or session storage, IndexedDB, Cache Storage, or hidden state restoration.

The 9.9 package proved that the exact preview candidate built successfully on Vercel, that `/prologue` existed in the hosted artifact, that the preview was protected and noindex, that no runtime error cluster was found during review, and that the production deployment remained untouched. The permanent repository state again disables Git-triggered deployment for every branch.

This is maintainer implementation and release evidence. It is not independent accessibility certification, named screen-reader testing, affected-user research, legal approval, production security authorization, or field performance evidence.

## Remaining Phase 0 work

Before Phase 0 can close, the project still requires completion and acceptance of Sprint 9, private newsletter delivery verification under issue #63, key-person and succession records, founder-reserved-power and economic-dependency records, historical governance-source recovery, branch-protection and DCO-transition evidence, clean-machine and distributed-ownership planning, Decision 0009 disposition, a named specialist-review strategy, the human-readable and machine-readable architecture audit, and an explicit Phase 0 exit review.

## Status rule

A passing test, browser journey, modeled duration, protected preview, deployment, subscriber delivery, or public page proves only what that environment and evidence exercised. It does not create independent accessibility, security, privacy, communications, clinical, legal, provider, financial, operational, research, identity, permission, or production-health-data approval.
