# Current Project Status

[Repository home](../../README.md) · [Documentation home](../README.md) · [Sprint 9 execution plan](sprint-9-execution-plan.md) · [Sprint 9.8 validation record](sprint-9-workstream-9-8-validation-record.md) · [Sprint 9.8 representative review](sprint-9-workstream-9-8-manual-review.md) · [Sprint 9 quality review](sprint-9-pre-9-10-quality-review.md) · [Sprint 9 issue #67](https://github.com/finalboss-tom/calypsos-promise/issues/67) · [Draft PR #68](https://github.com/finalboss-tom/calypsos-promise/pull/68) · [Sprint sequence](sprints.md) · [Public roadmap](../../ROADMAP.md) · [Governance](../../GOVERNANCE.md)

## Status summary

- **Institutional phase:** Phase 0 — Constitutional and open-source foundations
- **Institutional Phase 0 remains active.**
- **Accepted numbered sprints:** 0–8
- **Active numbered sprint:** Sprint 9 — Public synthetic prologue
- **Sprint 9 completed workstreams:** 9.1–9.7
- **Latest accepted Sprint 9 candidate:** `a3ac15f32ca098a2955c14bf815af60cccfd56d6` — CI 1257 / DCO 1339
- **Sprint 9 active workstream:** 9.8 — playable accessibility, security, duration, interaction, and performance evidence
- **Sprint 9 unfinished workstream:** 9.9 — publication, rollback, hosted evidence, and public-status reconciliation
- **Sprint 9.10:** blocked and not started
- **Sprint 9 tracking:** issue #67 / draft PR #68 / branch `agent/sprint-9-public-synthetic-prologue`
- **Sprint 8 squash commit:** `20e2c95c96670f0ef6b972c9ebf7b482f7f9cf1a`
- **Post-Sprint 8 reconciliation and newsletter squash commit:** `032a368bcd4beb999fee9a14fe4118aead0801a5`
- **Production website:** live through Vercel deployment `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp`
- **Deployed source commit:** `1b25a2e64ff272927c65afa5e1f16aedc5e448d7`
- **Release control:** Git-triggered Vercel deployment is disabled through `6be7d20fbfe1079881a0717f30760b0e48b265b5`
- **Newsletter:** deployed on accepted live public pages under Path A; issue #63 remains open for private provider-delivery verification and final acceptance
- **Production health data, accounts, private Chronicles, production Aster, providers, connectors, clinical workflows, research enrollment, payments, or consequential actions:** none
- **Independent specialist review:** not established for accessibility, security, privacy, legal, communications, clinical, interoperability, provider, financial, operational, or research boundaries
- **Field performance and affected-user evidence:** not established
- **Phase 0 exit review:** not completed

## Primary directive

> Build a compelling, trustworthy consumer experience that helps people build, understand, improve, and control their Living Chronicles; return personal value first; enable separately authorized collective benefit; and progressively transfer stewardship as evidence, safeguards, capacity, and legitimacy mature.

The player promise remains:

> **Build your Living Chronicle. Improve your health. Keep the key.**

Every route, mechanic, data flow, model, tool, provider, funding relationship, newsletter surface, deployment, and governance action remains subordinate to that purpose.

## Current position

Sprints 0–8 are accepted and merged.

Sprint 8 established and deployed the public Next.js gateway. PR #61 was squash merged as `20e2c95c96670f0ef6b972c9ebf7b482f7f9cf1a`; PR #66 later reconciled production status and restored the bounded newsletter through squash commit `032a368bcd4beb999fee9a14fe4118aead0801a5`.

The final newsletter release reached `READY` through deployment `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp`. Automatic Git deployment was restored to disabled. The newsletter remains a separate Phase 0 contact surface and cannot become prologue identity, state, completion, research consent, Chronicle intake, or gameplay progression.

Issue #64 accepted the Sprint 9 architecture: `apps/site` ownership, one `/prologue` route, memory-only interaction state, pre-authored public synthetic inputs, deterministic Aster with a complete manual path, no microphone or free-form health input, temporary Chronicle and receipt-shaped explanations, deterministic First Lantern evidence, non-punitive refusal and exit, and an informational-only future account boundary.

Workstreams 9.1–9.6 established the route, opening, Aster/manual parity, synthetic review and confirmation, corrected Chronicle and receipt mappings, and a deterministic First Lantern. The pre-9.10 review corrected a non-functional discard control, dead duplicate UI, source-only interaction confidence, stale cross-contract references, incomplete completion evidence and quest anatomy, hidden completion after reversal, and non-semantic progress.

Workstream 9.7 is accepted on `a3ac15f32ca098a2955c14bf815af60cccfd56d6`, which passed CI 1257 and DCO 1339. It provides explicit restart, discard, departure, completion without an account, and an informational-only future-account explanation without email intake, newsletter coupling, authentication, persistence, conversion reward, or durable progression.

Workstream 9.8 is active. It adds a dependency-free Chrome DevTools Protocol harness to the isolated production-preview job. The harness executes rendered Aster/manual and text/voice journeys, exercises visible controls, checks focus and announcements, validates accessibility and resilience modes, proves no storage or external network behavior, models shortest through longest direct completion time, and compares `/prologue` against the accepted Sprint 8 performance ceilings.

Workstream 9.10 remains blocked until 9.8 and 9.9 are accepted and all repository, issue, PR, release, measurement, and holdpoint records agree.

## Live and branch-only surfaces

`apps/site` owns the live public website and the branch-only prologue.

The live site provides the public gateway, source-backed product and trust explanations, canonical funding and roadmap views, the bounded newsletter, navigation, accessibility foundations, metadata, security headers, CSP, caching, and static release evidence.

The Sprint 9 `/prologue` route remains branch-only, noindex, unlinked, outside the sitemap, unmerged, and undeployed. Passing branch CI does not make it a live capability. Git-triggered Vercel deployment is disabled.

## Sprint 9 boundary and workstream truth

Sprint 9’s goal is:

> Let anyone understand the product through play before creating an account.

Permanent constraints:

- one public `/prologue` route inside `apps/site`;
- public and explicitly synthetic information only;
- React-memory state destroyed by refresh, navigation, tab close, restart, discard, or exit;
- no arbitrary text, microphone, file, camera, location, wearable, contact, provider, model, analytics, payment, or private-data intake;
- deterministic Aster with a materially equivalent complete manual path;
- temporary Chronicle and receipt-shaped explanations with no truth or permission authority;
- deterministic, reversible, non-authoritative First Lantern completion;
- refusal, restart, discard, leave, and completion without account conversion;
- no required timing or conversion pressure;
- merge, public linking, and deployment remain separate founding-steward decisions.

| Workstream | Current state                                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 9.1        | completed and validated; executable-state requirements added by quality review                                                        |
| 9.2        | completed and validated; branch-only arrival and Lantern Shore                                                                        |
| 9.3        | completed and validated; Aster/manual parity                                                                                          |
| 9.4        | completed and validated; synthetic review, correction, refusal, and confirmation                                                      |
| 9.5        | completed and validated; corrected Chronicle and receipt-shaped explanations                                                          |
| 9.6        | completed and validated at `4d1fa7fdec3e83f282ee8ed8f16292e509d514fa` — CI 1253 / DCO 1334                                            |
| 9.7        | completed and validated at `a3ac15f32ca098a2955c14bf815af60cccfd56d6` — CI 1257 / DCO 1339                                            |
| 9.8        | implemented for exact-candidate validation; rendered browser, duration, storage, network, accessibility, and Sprint 8 budget evidence |
| 9.9        | not implemed; stable source, release, hosted evidence, rollback, and public-status work remains open                                  |
| 9.10       | blocked and not started                                                                                                               |

## Workstream 9.8 evidence boundary

The 9.8 package includes:

- browser-rendered shortest manual/text, representative Aster/voice, and longest direct journeys;
- keyboard activation, logical keyboard order, scene focus, polite announcements, accessible names, and no keyboard trap evidence;
- disabled confirmation before explicit review choice;
- refusal, restart, discard, departure, future-account, exit, and completion controls;
- reduced motion, reduced data, increased contrast, forced colors, narrow viewport, and no-JavaScript evidence;
- storage API use, cookie, IndexedDB, Cache Storage, network calls, `/api/join`, WebSocket, browser error, and external-resource checks;
- completion without explicit confirmation prohibited by the state and browser evidence;
- modeled direct completion paths under ten minutes; and
- exact route metrics compared to the accepted Sprint 8 ceilings.

The most recent accepted static evidence measures `/prologue` at 37,630 HTML bytes, 716,199 JavaScript bytes, 47,733 CSS bytes, 705 image bytes, zero font bytes, 802,267 total bytes, and 15 first-party requests. These values fit every Sprint 8 ceiling; Sprint 9 does not require a larger route budget.

This evidence is maintainer implementation evidence. Independent accessibility, named screen reader, affected-user, cognitive-load, device/browser, and field performance review remain open specialist holdpoints.

## Permanent authority boundaries

### Living Chronicle

The Living Chronicle owns longitudinal truth, values, time, provenance, correction, conflict, supersession, export, and deletion. Sprint 9 maps selected vocabulary for explanation only and creates no Chronicle record.

### House of Keys

The House of Keys owns purpose-specific permission truth. Sprint 9’s receipt-shaped explanation is not an `AccessReceipt`, grant, evaluation, consent record, audit event, recipient authority, or data release.

### Aster

Aster may draft and explain. It cannot write canonical records, create permission, confirm itself, complete quests, grant rewards, diagnose, or turn presentation output into authority. Sprint 9 uses deterministic local framing only.

### Public website and newsletter

The website may explain and host the bounded prologue after acceptance. The newsletter remains a separate contact list. Neither can create product, permission, gameplay, clinical, funding, legal, or governance authority.

## Remaining Phase 0 work

Before Phase 0 can close, the project still requires:

- private newsletter delivery verification and final acceptance of issue #63;
- completion and acceptance of Sprint 9;
- key-person, succession, founder-reserved-power, and economic-dependency records;
- historical governance-source recovery;
- branch-protection and DCO-transition evidence;
- clean-machine measurements and distributed ownership planning;
- Decision 0009 disposition;
- a named specialist-review strategy;
- the human-readable and machine-readable architecture audit; and
- an explicit Phase 0 exit review.

## Status rule

A passing test, browser journey, modeled duration, preview, deployment, subscriber delivery, or public page proves only what that environment and evidence exercise. It does not create independent accessibility, security, privacy, communications, clinical, legal, provider, financial, operational, research, identity, permission, or production-health-data approval.
