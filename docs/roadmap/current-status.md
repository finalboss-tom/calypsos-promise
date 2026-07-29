# Current Project Status

[Repository home](../../README.md) · [Documentation home](../README.md) · [Sprint 9 execution plan](sprint-9-execution-plan.md) · [Pre-9.10 quality review](sprint-9-pre-9-10-quality-review.md) · [Sprint 9 issue #67](https://github.com/finalboss-tom/calypsos-promise/issues/67) · [Accepted alignment issue #64](https://github.com/finalboss-tom/calypsos-promise/issues/64) · [Sprint sequence](sprints.md) · [Public roadmap](../../ROADMAP.md) · [Governance](../../GOVERNANCE.md)

## Status summary

- **Institutional phase:** Phase 0 — Constitutional and open-source foundations
- **Accepted numbered sprints:** 0–8
- **Active numbered sprint:** Sprint 9 — Public synthetic prologue
- **Sprint 9 tracking:** issue #67 / draft PR #68 / branch `agent/sprint-9-public-synthetic-prologue`
- **Sprint 9 entry gate:** issue #64 accepted and closed on July 29, 2026
- **Sprint 9 completed and previously validated workstreams:** 9.1–9.5
- **Sprint 9 active gate:** 9.6 remediation and exact-candidate validation after the pre-9.10 quality review
- **Sprint 9 unfinished workstreams:** 9.7, 9.8, and 9.9
- **Sprint 9.10:** blocked; it has not started
- **Latest fully validated workstream candidate:** `e819c71f31041632998b5f468c492e8b1c810a44` for 9.5 — CI 1221 / DCO 1300
- **Quality review:** the initial 9.6 head contained material state, test, cross-contract, canon, and status defects; the remediation is recorded in [`sprint-9-pre-9-10-quality-review.md`](sprint-9-pre-9-10-quality-review.md)
- **Sprint 8 squash commit:** `20e2c95c96670f0ef6b972c9ebf7b482f7f9cf1a`
- **Post-Sprint 8 reconciliation and newsletter squash commit:** `032a368bcd4beb999fee9a14fe4118aead0801a5` through PR #66
- **Production website:** live on the canonical domains through Vercel deployment `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp`
- **Deployed source commit:** `1b25a2e64ff272927c65afa5e1f16aedc5e448d7`
- **Release control:** Git-triggered Vercel deployment is disabled through `6be7d20fbfe1079881a0717f30760b0e48b265b5`
- **Newsletter:** deployed on every accepted public page under Path A; private provider-delivery verification and final gate acceptance remain open in issue #63
- **Production health data:** none
- **Accounts, private Chronicles, production Aster, private MCP, providers, connectors, clinical workflows, research enrollment, payments, or consequential actions:** none
- **Independent specialist review:** not established for the principal product or the website’s accessibility, security, privacy, legal, communications, clinical, interoperability, provider, financial, operational, or research boundaries
- **Phase 0 exit review:** not completed

## Primary directive

> Build a compelling, trustworthy consumer experience that helps people build, understand, improve, and control their Living Chronicles; return personal value first; enable separately authorized collective benefit; and progressively transfer stewardship as evidence, safeguards, capacity, and legitimacy mature.

The player promise remains:

> **Build your Living Chronicle. Improve your health. Keep the key.**

Every route, game mechanic, data flow, model, tool, provider, funding relationship, newsletter surface, deployment, and governance action remains subordinate to that purpose.

## Current position

Sprints 0–8 are accepted, merged, and represented by their accepted completion and handoff records. The public Next.js gateway and bounded newsletter remain live; Sprint 9 remains branch-only and cannot affect production while Git-triggered deployment is disabled.

Pre-Sprint 9 alignment issue #64 accepted `apps/site` ownership, `/prologue`, memory-only state, pre-authored public synthetic inputs, deterministic Aster with a complete manual fallback, no microphone or free-form health input, temporary Chronicle and receipt-shaped explanations, deterministic First Lantern evidence, non-punitive refusal and exit, and an informational-only future account boundary.

Workstreams 9.1–9.5 established the contract, arrival and Lantern Shore, deterministic Aster/manual parity, synthetic fixture review and confirmation, and temporary Chronicle and receipt-shaped explanation. Their bounded direction remains accepted.

A pre-9.10 review compared the actual package against the standards used by Sprints 7 and 8. It found that 9.7–9.9 were not implemented and that the initial 9.6 package contained material defects, including a visible no-op discard action, unreachable duplicate UI, source-string tests that did not execute the state machine, stale House of Keys provenance, a misleading opposite-state receipt fixture reference, an under-mapped Chronicle projection, incomplete First Lantern evidence and quest anatomy, hidden completion after reversal, non-semantic progress steps, unmeasured performance-budget increases, and no under-ten-minute completion evidence.

The draft branch now contains remediation for the implementation defects and executable state-machine tests. Workstream 9.6 remains under review until the exact remediated candidate passes every required check and the tracking records are reconciled. Workstreams 9.7, 9.8, and 9.9 must then be implemented and validated before 9.10 may begin.

## Live public website surface

`apps/site` remains the single public website owner and currently provides:

- the cinematic server-rendered homepage;
- `/promise`, `/laws`, `/how-it-works`, `/consumer-first`, and `/aster` source-backed product explanations;
- `/trust` and `/forge` trust and bounded-tool explanations;
- `/roadmap`, `/support`, and `/funding` public status, contribution, and canonical funding-transparency views;
- `/privacy`, `/joined`, and `/api/join` as the bounded newsletter surface under Phase 0 gate #63;
- exactly one shared newsletter opt-in on each accepted live public route;
- shared direct navigation and an optional narrative path reaching the same essential information;
- skip links, semantic landmarks, visible focus, keyboard foundations, reduced motion, reduced data, forced colors, contrast, responsive behavior, and image-failure behavior; and
- canonical metadata, sitemap, robots, not-found, error, security-header, nonce-CSP, caching, route, and transfer-budget controls.

The website is live evidence of the public gateway. It is not evidence of a private health product, independent accessibility certification, production-health-data security, clinical safety, provider interoperability, or institutional readiness.

The Sprint 9 `/prologue` route is not a live public capability. It exists only on draft PR #68, remains noindex, unlinked, outside the sitemap, unmerged, undeployed, and subject to the remaining Sprint 9 workstreams and explicit release acceptance.

## Newsletter disposition — Phase 0 gate #63

The founding steward selected **Path A — preserve and activate** for the period leading to Phase 0 completion.

The deployed implementation reuses the existing server-only `SIGNUP_WEBHOOK_URL` and optional `SIGNUP_WEBHOOK_TOKEN` connection to the private Google Apps Script webhook and private Google Sheet. It collects email address, affirmative consent, privacy-policy version, narrow purpose, source, and submission time only.

The newsletter cannot become an account, Chronicle identity, research consent, health intake, provider lead system, donation flow, advertising profile, governance electorate, gameplay requirement, or Sprint 9 state store. Issue #63 remains open for private delivery verification, rollback evidence, and final founding-steward acceptance.

## Sprint 9 — Public synthetic prologue

Sprint 9’s goal is:

> Let anyone understand the product through play before creating an account.

The accepted permanent boundary remains:

- `apps/site` owns the one `/prologue` route;
- interactive state is React memory only and is destroyed by refresh, navigation, tab close, restart, discard, or exit;
- every identity, observation, Chronicle projection, receipt-shaped explanation, timestamp, source, and fixture is public and explicitly synthetic;
- synthetic text and voice are pre-authored choices, not arbitrary input or microphone capture;
- Aster is deterministic and optional, with a materially equivalent manual path;
- the Chronicle and receipt views are temporary explanations and cannot create truth, identity, permission, consent, audit, or production access;
- First Lantern completion depends only on explicit inspectable synthetic evidence;
- refusal, skip, restart, discard, leave, and completion without account creation remain non-punitive and functional;
- future account conversion is informational only and cannot retain state or request email; and
- no analytics, model provider, external service, secret, storage, or new server endpoint is authorized.

### Workstream truth

| Workstream | Current state |
| --- | --- |
| 9.1 | completed and previously validated; validation contract strengthened by the quality review |
| 9.2 | completed and previously validated; branch-only |
| 9.3 | completed and previously validated; Aster/manual authority parity retained |
| 9.4 | completed and previously validated; unreachable duplicate UI removed during review |
| 9.5 | completed and previously validated; Chronicle/receipt cross-contract mapping corrected during review and awaiting exact-candidate revalidation |
| 9.6 | implemented, remediated, and under exact-candidate validation |
| 9.7 | not implemented as a complete workstream |
| 9.8 | not implemented as a complete playable validation and measurement record |
| 9.9 | not implemented |
| 9.10 | blocked and not started |

The implementation contract, review findings, remaining evidence requirements, release separation, rollback model, and inherited holdpoints are recorded in [Sprint 9 Execution Plan](sprint-9-execution-plan.md), [Public Synthetic Prologue Boundary](../architecture/public-synthetic-prologue-boundary.md), and [Sprint 9 Pre-9.10 Quality and Coherence Review](sprint-9-pre-9-10-quality-review.md).

Sprint 9 does not authorize the Sprint 10 universal game shell, real accounts, private Chronicles, production Aster, real voice capture, providers, connectors, clinical workflows, research enrollment, payments, donations, analytics, or production health-data operation.

## Permanent authority boundaries

### Living Chronicle

The Living Chronicle owns longitudinal records, values, temporal assertions, source provenance, correction, conflict, supersession, source artifacts, export, and deletion contracts. A Sprint 9 synthetic projection maps selected vocabulary for explanation only and is not a Chronicle record or durable truth.

### House of Keys

The House of Keys owns purpose-specific permission truth. The Sprint 9 receipt-shaped explanation uses selected field meanings only; it is not an `AccessReceipt`, policy decision, grant, consent record, audit event, recipient authority, or data release.

### Aster

Aster may draft, clarify, explain provenance and uncertainty, route, and prepare narrative presentation. It cannot write canonical records, create permission, confirm itself, invoke authoritative actions, complete quests, grant rewards, diagnose, or convert model or presentation output into truth. Sprint 9 uses deterministic scripted framing with a complete manual fallback and no model provider.

### Public website and newsletter

The website explains, navigates, invites contribution, displays status, renders accepted public transparency records, and may host the bounded public synthetic prologue only after acceptance. The newsletter remains a narrow contact list for public project updates and cannot become product or gameplay authority.

## Remaining Phase 0 work

Before Phase 0 can close, the project still requires:

- private delivery verification and final acceptance of newsletter gate #63;
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

A capability must remain labeled according to evidence. A passing test, accepted sprint, production deployment, subscriber delivery, preview, provider connection, public page, or playable synthetic interaction proves only what that environment and evidence actually exercise. It does not create independent accessibility, security, privacy, communications, clinical, legal, provider, financial, operational, research, identity, permission, or production-health-data approval.
