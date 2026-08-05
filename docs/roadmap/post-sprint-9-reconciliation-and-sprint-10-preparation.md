# Post-Sprint 9 Repository and Production Reconciliation

[Current status](current-status.md) · [Sprint 9 completion record](sprint-9-completion-record.md) · [Sprint 9 release, rollback, and Sprint 10 handoff](sprint-9-release-rollback-and-sprint-10-handoff.md) · [Sprint sequence](sprints.md) · [Public roadmap](../../ROADMAP.md)

- **Status:** ACTIVE — repository and production reconciliation after accepted Sprint 9 release
- **Entry repository baseline:** `main` at `54aa3f43462a0daef2173481aca4e1aef38d3f41`
- **Accepted Sprint 9 squash commit:** `b22c32ad8f40610dc95a5b49a745da5adb9c1341`
- **Accepted implementation candidate:** `f976987fbac6dd0e448ac2c10dfbb63025f018cc` — CI 1288 / DCO 1374
- **Production deployment:** `dpl_CynKp4xKd3KK5BcMuRjmiZv96Aj6`
- **Production source:** one-shot `main` release trigger `0100bbe08e0ddb3acddc5a3a926c1972b59b517d`
- **Release-control baseline:** Git-triggered deployment disabled for every branch through `54aa3f43462a0daef2173481aca4e1aef38d3f41`
- **Sprint 10:** planned and not started

## Purpose

Reconcile the repository, production site, release evidence, status surfaces, open holdpoints, and next-sprint entry state after Sprint 9 was explicitly accepted, squash merged, manually deployed, corrected, and verified.

This work does not reopen the accepted Sprint 9 implementation package. It distinguishes immutable historical evidence from canonical present-tense status and repairs only the records intended to describe the current repository or production state.

## Accepted release chain

The accepted release sequence is:

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

Current status, repository indexes, roadmap orientation, application documentation, and the persistent roadmap issue supersede those time-sensitive statements without rewriting history.

## Repository reconciliation scope

The reconciliation must verify and, where needed, repair:

- root and documentation entry points;
- roadmap and architecture indexes;
- current status and sprint sequence;
- application and deployment documentation;
- persistent roadmap issue #2;
- Sprint 9 issue and PR closure links;
- production deployment and restored-lock provenance;
- current capability labels and non-authority boundaries;
- protected-preview disposition;
- newsletter separation;
- open specialist, Phase 0, and institutional gates; and
- the exact pre-Sprint 10 entry boundary.

## Aster maintainability trigger

Issue #50 remains open and inactive.

Sprint 9 presents deterministic Aster framing but does not import or consume the `@calypsos-promise/aster` package public surface. The issue’s activation trigger therefore has not been met by package-consumer evidence. A later universal shell or private vertical slice may activate it when an actual package consumer identifies concrete friction.

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
- preview, distribution, signing, store, rollback, and incident boundaries; and
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

## Acceptance criteria

- [ ] Repository and production provenance agree on the accepted Sprint 9 result.
- [ ] Current-facing status and navigation surfaces no longer describe Sprint 9 as active, draft, unmerged, or absent from production.
- [ ] Historical records remain preserved as time-specific evidence.
- [ ] `/prologue` remains production hosted, noindex, unlinked, synthetic, no-account, memory-only, and non-authoritative.
- [ ] Canonical domains, deployment identity, route behavior, headers, indexing, and runtime-error state are recorded.
- [ ] Git-triggered deployment remains disabled for every branch.
- [ ] The protected preview has an explicit disposition.
- [ ] Newsletter, provider, funding, identity, Chronicle, permission, Aster, analytics, research, and payment boundaries remain separate.
- [ ] Issue #50 activation status is decided from actual package-consumer evidence.
- [ ] Sprint 10 remains planned and blocked behind a dedicated alignment review.
- [ ] All open specialist, institutional, and Phase 0 gates remain visible.
- [ ] Repository validation passes on the exact reconciliation candidate.

## Completion rule

This reconciliation is complete only after its exact branch candidate passes the permanent repository suite, the founding steward accepts it, and it is squash merged.

Completion does not start Sprint 10. A separate pre-Sprint 10 alignment issue and accepted implementation plan remain required.
