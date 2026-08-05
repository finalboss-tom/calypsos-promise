# Post-Sprint 9 Repository and Production Reconciliation

[Current status](current-status.md) · [Sprint 9 completion record](sprint-9-completion-record.md) · [Sprint 9 release, rollback, and Sprint 10 handoff](sprint-9-release-rollback-and-sprint-10-handoff.md) · [Sprint sequence](sprints.md) · [Issue #71](https://github.com/finalboss-tom/calypsos-promise/issues/71) · [Draft PR #72](https://github.com/finalboss-tom/calypsos-promise/pull/72)

- **Status:** IMPLEMENTATION PACKAGE COMPLETE — READY FOR FOUNDING-STEWARD ACCEPTANCE; not accepted, squash merged, or closed
- **Tracking issue:** [#71](https://github.com/finalboss-tom/calypsos-promise/issues/71) — remains open
- **Draft pull request:** [#72](https://github.com/finalboss-tom/calypsos-promise/pull/72) — remains draft and unmerged
- **Branch:** `agent/post-sprint-9-reconciliation-and-sprint-10-prep`
- **Entry repository baseline:** `main` at `54aa3f43462a0daef2173481aca4e1aef38d3f41`
- **Accepted Sprint 9 squash commit:** `b22c32ad8f40610dc95a5b49a745da5adb9c1341`
- **Accepted Sprint 9 implementation candidate:** `f976987fbac6dd0e448ac2c10dfbb63025f018cc` — CI 1288 / DCO 1374
- **Validated pre-completion reconciliation head:** `351b22e4b11cf6ec9fd9ee8462c14597f8c55ac6` — CI 1300 / DCO 1381
- **Production deployment:** `dpl_CynKp4xKd3KK5BcMuRjmiZv96Aj6`
- **Production source:** one-shot `main` release trigger `0100bbe08e0ddb3acddc5a3a926c1972b59b517d`
- **Release-control baseline:** Git-triggered deployment disabled for every branch through `54aa3f43462a0daef2173481aca4e1aef38d3f41`
- **Sprint 10:** planned and not started

## Readiness decision

The post-Sprint 9 repository and production reconciliation package is complete at the repository, issue-ledger, production-inspection, release-provenance, deterministic-validation, rendered-browser, and founding-steward review-preparation evidence level.

The package is ready for explicit founding-steward acceptance and directed squash merge of PR #72.

Readiness does not start Sprint 10, close newsletter gate #63, close Aster maintainability issue #50, close specialist or institutional holdpoints, alter production, enable Git-triggered deployment, create private capability, or complete Phase 0.

## Purpose

Reconcile the repository, production site, release evidence, status surfaces, open holdpoints, and next-sprint entry state after Sprint 9 was explicitly accepted, squash merged, manually deployed, corrected, and verified.

This work does not reopen the accepted Sprint 9 implementation package. It distinguishes immutable historical evidence from canonical present-tense status and repairs only records intended to describe the current repository or production state.

## Accepted release chain

1. Sprint 9 implementation candidate `f976987fbac6dd0e448ac2c10dfbb63025f018cc` passed CI 1288 and DCO 1374.
2. The founding steward explicitly accepted the bounded Sprint 9 package.
3. PR #68 was squash merged as `b22c32ad8f40610dc95a5b49a745da5adb9c1341`.
4. One-shot production authorization `c3a8593c36556d17f0b6e6c8a8cd47286be5038f` created production deployment `dpl_vs7uNzDD17XAycNEyBezULwcJVfE`.
5. The deployment lock was restored at `5845c528231c2bd85d2268b09f09ee951d77723f`.
6. Post-release status copy and its focused contract were reconciled at `16dc7c2c260f13b1036d7a02932268338919f3c8` and `be4356247a6adbf4b1f90eb11a65834df54f3760`.
7. One-shot correction release `0100bbe08e0ddb3acddc5a3a926c1972b59b517d` created final production deployment `dpl_CynKp4xKd3KK5BcMuRjmiZv96Aj6`.
8. The all-branch deployment lock was restored at `853b3abcdca504bbb98d12229ed9c5f42cbfbbce` and preserved through current `main`.
9. Canonical current status was reconciled at `41bdca304639b5c146496ddb2124d6f8f99781c7`.
10. Sprint 9 issue #67 was closed as completed.

## Production findings

The canonical domains resolve to production deployment `dpl_CynKp4xKd3KK5BcMuRjmiZv96Aj6`.

Live `/prologue` verification established:

- HTTP 200;
- canonical URL `https://www.calypsospromise.org/prologue`;
- `noindex, nofollow` metadata;
- absence from public navigation and the sitemap;
- expected CSP, frame, transport, referrer, permissions, opener, and content-type protections;
- accepted, squash-merged, and manually deployed status language;
- no account, private Chronicle, permission system, production Aster, health-data intake, provider, analytics, research, payment, or durable state;
- no runtime error cluster during the verification window; and
- newsletter behavior remains a separate bounded Phase 0 contact surface.

The production route is deliberately hosted but undiscoverable through ordinary site navigation and search indexing. Hosting does not convert the public synthetic demonstration into a production private-data or authoritative gameplay capability.

No new preview or production deployment was created by PR #72. The only post-release Vercel event associated with current `main` was the expected canceled deployment record from the lock-restoration commit; production remained on `dpl_CynKp4xKd3KK5BcMuRjmiZv96Aj6`.

## Protected preview disposition

Protected preview `dpl_DwkovAeCrLjWq2brifBxYXu2UJ7M` is retained as access-controlled historical release evidence.

It is not:

- an active release channel;
- a public share link;
- a production alias;
- a current acceptance candidate;
- a field-performance sample; or
- independent review evidence.

Git-triggered deployment remains disabled, so retaining the immutable preview does not authorize further branch deployments.

## Historical-record rule

The following remain immutable time-specific evidence and may continue to describe pre-acceptance or pre-production state:

- Sprint 9 workstream records;
- the pre-9.10 quality review;
- the Sprint 9 completion record;
- the Sprint 9 release, rollback, and Sprint 10 handoff;
- PR #68’s pre-merge description; and
- issue comments tied to exact historical candidates.

Current status, repository indexes, roadmap orientation, application documentation, and accepted post-merge reconciliation records supersede those time-sensitive statements without rewriting history.

## Repository findings and corrections

The initial audit found material present-tense drift in:

- the root README;
- the documentation index;
- the roadmap index;
- the architecture index;
- `apps/site/README.md`;
- the site deployment record;
- persistent roadmap issue #2; and
- newsletter gate issue #63.

Those surfaces described Sprint 9 as planned or active, the prologue as absent from production, or the newsletter as paused even though later accepted evidence superseded those statements.

The reconciliation candidate now:

- states that Sprints 0–9 are accepted and merged;
- records the Sprint 9 squash and production deployment chain;
- states the exact production-hosted but noindex and unlinked prologue boundary;
- preserves historical records rather than rewriting them;
- records the retained protected-preview disposition;
- reconciles persistent roadmap issue #2;
- reconciles newsletter gate #63 to the deployed Path A state while preserving its remaining Phase 0 obligations;
- records issue #50 as open and inactive based on actual package-consumer evidence;
- updates root, documentation, roadmap, architecture, site, deployment, and current-status entry points; and
- adds permanent drift tests for the post-merge, production, release-lock, preview, newsletter, Aster, and Sprint 10 boundaries.

## Aster maintainability trigger

Issue #50 remains open and inactive.

Sprint 9 presents deterministic Aster framing but does not import or consume the `@calypsos-promise/aster` package public surface. The issue’s activation trigger has not been met by package-consumer evidence. A later universal shell or private vertical slice may activate it when an actual package consumer identifies concrete friction.

A public checkpoint was added to issue #50 documenting this evidence-based disposition.

## Newsletter reconciliation

The newsletter remains a separate narrow Phase 0 contact surface.

Issue #63 now describes the deployed preserve-and-activate state rather than the historical paused state. It remains open until private delivery, unsubscribe, correction, access, deletion, retention, incident, provider-replacement, specialist-limitation, and final founding-steward acceptance questions are satisfied or carried forward as explicit non-conflicting holdpoints.

The newsletter cannot become prologue identity, consent, state, completion, progression, research enrollment, provider intake, payment, or Chronicle data.

## Sprint 10 entry assessment

The accepted Sprint 10 goal remains correct:

> Establish the browser, iOS, and Android playable application.

No roadmap renumbering or goal rewrite is required.

Sprint 10 implementation remains blocked until a dedicated alignment review resolves at least:

- `apps/game` versus another application boundary;
- Expo, React Native, Expo Router, and web ownership;
- one versioned content package across browser, iOS, and Android;
- server-authoritative versus local presentation state;
- the rule that no gameplay authority depends on client-side trust;
- offline, pending, synchronized, failed, stale, corrected, and conflict states;
- authentication only after the prologue;
- whether any prologue state can or cannot transfer into an account;
- keyboard, screen-reader, touch, switch, reduced-motion, reduced-data, zoom, reflow, and low-bandwidth paths;
- cross-platform performance and release evidence;
- content, design-token, and accessibility ownership;
- preview, distribution, signing, store, rollback, monitoring, and incident boundaries; and
- explicit non-scope for private Chronicles, production Aster, House of Keys, real health capture, providers, connectors, analytics, payments, and research.

## Remaining gates

This reconciliation does not close:

- independent accessibility or named assistive-technology review;
- affected-user or cognitive-accessibility research;
- browser, device, platform, touch, zoom, or field-performance evidence;
- production security, privacy, legal, or communications specialist review;
- newsletter gate #63;
- key-person, succession, founder-reserved-power, and economic-dependency work;
- branch-protection and DCO-transition evidence;
- distributed ownership and clean-machine measurements;
- Decision 0009 disposition;
- the named specialist-review strategy;
- human-readable and machine-readable architecture audit;
- the frontier-model Phase 0 exit audit; or
- explicit institutional Phase 0 exit.

## Repository validation

Validated pre-completion reconciliation head `351b22e4b11cf6ec9fd9ee8462c14597f8c55ac6` passed:

- formatting;
- documentation links;
- repository policy;
- economics validation;
- content validation;
- lint;
- typecheck;
- the complete repository test suite;
- production-site build and isolated local preview;
- route, header, metadata, authority, newsletter, and transfer-budget validation;
- rendered manual/text and Aster/voice prologue journeys;
- evidence upload and generated-state cleanup;
- CI 1300; and
- DCO 1381.

The final exact-head validation after this completion-record update is recorded in issue #71 and PR #72.

## Acceptance criteria

- [x] Repository and production provenance agree on the accepted Sprint 9 result.
- [x] Production deployment identity, canonical aliases, route behavior, headers, indexing, and runtime-error state are recorded.
- [x] Git-triggered deployment remains disabled for every branch.
- [x] The protected preview has an explicit disposition.
- [x] Historical records remain preserved as time-specific evidence.
- [x] Current-facing root, documentation, roadmap, architecture, application, and deployment surfaces are reconciled in the branch candidate.
- [x] `/prologue` remains production hosted, noindex, unlinked, synthetic, no-account, memory-only, and non-authoritative.
- [x] Newsletter, provider, funding, identity, Chronicle, permission, Aster, analytics, research, and payment boundaries remain separate.
- [x] Issue #50 activation status is decided from actual package-consumer evidence.
- [x] Sprint 10 remains planned and blocked behind a dedicated alignment review.
- [x] All open specialist, institutional, and Phase 0 gates remain visible.
- [x] Persistent roadmap issue #2 and newsletter issue #63 are reconciled.
- [x] Permanent drift validation passes.
- [x] Full repository CI and DCO pass on the validated pre-completion reconciliation head.
- [ ] Founding-steward acceptance and directed squash merge occur.

## Acceptance and merge gate

The implementation package is ready for the founding steward to decide whether to:

1. accept the reconciliation at the stated evidence level;
2. direct squash merge of PR #72;
3. close issue #71 after the merge is verified; and
4. authorize a post-merge current-status checkpoint and creation of the dedicated pre-Sprint 10 alignment issue.

Until explicit direction is given:

- PR #72 remains draft and unmerged;
- issue #71 remains open;
- production remains unchanged;
- Git-triggered deployment remains disabled;
- newsletter gate #63 remains open;
- institutional Phase 0 remains active; and
- Sprint 10 remains planned and not started.

## Completion rule

The reconciliation becomes accepted and merged only after the founding steward explicitly accepts the package and directs the squash merge of PR #72.

Acceptance and merge do not start Sprint 10. A separate pre-Sprint 10 alignment issue and accepted implementation plan remain required.
