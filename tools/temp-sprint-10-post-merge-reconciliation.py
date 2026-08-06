from pathlib import Path

MERGE_SHA = "28bb5a7ae268d28a67d737777cafdd760c796cd1"
ACCEPTED_HEAD = "edd954d0e5ce61f53918a74ec804964ad987830f"
ALIGNMENT_CHECKPOINT = "23dffb031657181d9c0ca42457b95128520f7870"


def read(path):
    return Path(path).read_text(encoding="utf-8")


def write(path, text):
    target = Path(path)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(text, encoding="utf-8")


def replace_once(path, old, new, label):
    text = read(path)
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{path}: {label}: expected exactly one match, found {count}")
    write(path, text.replace(old, new, 1))


def replace_between(path, start, end, replacement, label):
    text = read(path)
    start_count = text.count(start)
    end_count = text.count(end)
    if start_count != 1 or end_count != 1:
        raise SystemExit(
            f"{path}: {label}: expected one start/end marker, found {start_count}/{end_count}"
        )
    start_index = text.index(start)
    end_index = text.index(end, start_index)
    write(path, text[:start_index] + replacement + text[end_index:])


def replace_from(path, start, replacement, label):
    text = read(path)
    count = text.count(start)
    if count != 1:
        raise SystemExit(f"{path}: {label}: expected one start marker, found {count}")
    start_index = text.index(start)
    write(path, text[:start_index] + replacement)


def insert_before(path, marker, addition, label):
    text = read(path)
    count = text.count(marker)
    if count != 1:
        raise SystemExit(f"{path}: {label}: expected one marker, found {count}")
    write(path, text.replace(marker, addition + marker, 1))


post_merge = f"""# Post-Sprint 10 Repository Reconciliation and Sprint 11 Preparation

[Current status](current-status.md) · [Sprint 10 completion](sprint-10-completion-record.md) · [Pre-acceptance alignment](sprint-10-pre-acceptance-alignment-reconciliation.md) · [Sprint 11 handoff](sprint-10-final-reconciliation-and-sprint-11-handoff.md) · [Sprint sequence](sprints.md)

- **Status:** COMPLETE AND VALIDATED — Sprint 10 accepted and squash merged; Sprint 11 remains unstarted
- **Accepted pull request:** [#79](https://github.com/finalboss-tom/calypsos-promise/pull/79)
- **Accepted aligned head:** `{ACCEPTED_HEAD}` — CI 1519 / DCO 1624
- **Accepted squash commit:** `{MERGE_SHA}`
- **Tracking issue:** [#80](https://github.com/finalboss-tom/calypsos-promise/issues/80) — closed after this reconciliation
- **Institutional phase:** Phase 0 remains active
- **Information boundary:** public repository source and explicitly synthetic evidence only

## Reconciliation decision

Sprint 10 is accepted, squash merged, and reconciled at the repository level.

The accepted goal is satisfied at the named evidence level:

> Establish the browser, iOS, and Android playable application.

The accepted implementation remains a public/synthetic universal shell. It does not create a hosted game, official release, production identity, private Chronicle, production House of Keys, production Aster or model-provider egress, analytics, research, payment, clinical operation, Longitudinal Intelligence activation, Sprint 11 implementation, or institutional Phase 0 exit.

## Merge evidence

- PR #79 was accepted by the founding steward and squash merged.
- The accepted aligned head was `{ACCEPTED_HEAD}` with CI 1519 and DCO 1624.
- The squash commit is `{MERGE_SHA}`.
- The squash tree is required to match the accepted aligned-head tree before this reconciliation is published.
- Workstreams 10.1 through 10.10 remain one accepted Sprint 10 package rather than separate accepted releases.

The merge changes repository state only. It does not authorize deployment, signing, distribution, indexing, route ownership migration, private capability, LI progression, or the next numbered sprint.

## Repository and module state

`apps/game` is now an accepted repository application for browser, iOS, and Android. It remains unhosted, unsigned, undistributed, public/synthetic-only, and non-authoritative.

`packages/game-content` is the accepted versioned public/synthetic playable-content package used by `apps/game`.

`apps/site` remains the sole owner of:

- the live institutional website;
- canonical public routes and navigation;
- the newsletter surface;
- metadata, sitemap, robots, and public security headers; and
- the production-hosted public synthetic `/prologue`.

No application imports another application's private source. No new backend service, database, queue, CMS, identity provider, model provider, analytics service, hosted game project, signing configuration, or distribution channel is introduced by the merge or this reconciliation.

## Documentation and link reconciliation

Current-orientation records now state that Sprint 10 is accepted and merged rather than complete-but-unmerged. The reconciliation updates:

- repository and documentation entry points;
- roadmap and architecture indexes;
- current project status;
- public-site and universal-game READMEs;
- the Sprint 10 completion, cross-contract, alignment, and Sprint 11 handoff records;
- permanent Sprint 10 and Longitudinal Intelligence validation; and
- issue #80 and the persistent roadmap ledger.

Historical workstream records retain the status language true at their recorded revisions. Current status and this post-merge record control present-tense orientation.

## Site deployment decision

No Calypso's Promise public-site redeploy is justified by Sprint 10 or this reconciliation.

PR #79 changed `apps/site/README.md` only within the `apps/site` boundary. It did not change:

- `apps/site/src`;
- public routes or rendered page content;
- `/prologue` behavior;
- metadata, sitemap, or robots;
- newsletter behavior;
- security headers or deployment configuration; or
- any production asset.

A redeploy would therefore create a release event without changing the deployable public-site artifact. Production remains on deployment `dpl_CynKp4xKd3KK5BcMuRjmiZv96Aj6`, and Git-triggered deployment remains disabled for every branch.

The universal game shell is also not deployed. Any future preview, canonical-route migration, public browser deployment, mobile signing, store distribution, beta, update channel, or official release remains a separate attributable decision.

## Authority and data verification

Post-merge source remains bounded as follows:

- no production health data or private Chronicle operation;
- no production account, credential, identity, session, recovery, support, or abuse runtime;
- no production House of Keys request, grant, receipt, or policy execution;
- no production Aster, model provider, retrieval, memory, or tool egress;
- no analytics, profiling, advertising, or inferred-preference authority;
- no client-authoritative completion, reward, restoration, unlock, permission, Chronicle truth, health result, or personal progress;
- no private offline storage or synchronization;
- no research enrollment, payment, connector, or clinical workflow; and
- LI-V1 through LI-V8 remain inactive.

The 24 Sprint 10 holdpoints and 24 unresolved-work records remain open unless a later accepted record explicitly closes one.

## Validation and cleanup

This reconciliation must pass:

- frozen-lockfile installation;
- formatting and documentation links;
- repository, Longitudinal Intelligence, Sprint 10, funding, and content policy;
- lint, typecheck, and tests;
- production-site build and rendered `/prologue` validation;
- credential-free browser, iOS, and Android export;
- source-bound unsigned artifact evidence;
- generated-state cleanup;
- no tracked mutation; and
- DCO.

Temporary reconciliation scripts and workflows must be removed before the durable checkpoint.

## Issue and branch disposition

- PR #79 is merged.
- Issue #80 closes as completed after post-merge verification.
- The Sprint 10 implementation branch is historical evidence and is no longer the active implementation branch.
- The persistent roadmap ledger records Sprint 10 as accepted and merged.

Branch deletion is not required by this record and may follow ordinary repository maintenance policy.

## Sprint 11 boundary

Sprint 11 remains unstarted.

The next authorized work is a dedicated pre-Sprint 11 alignment review, not implementation. That review must resolve or explicitly retain holdpoints for:

- authoritative identity and authentication;
- private Chronicle storage, provenance, correction, conflict, export, deletion, backup, recovery, and audit;
- House of Keys authority;
- real text, voice, image, document, and import capture;
- Aster and any provider posture plus complete manual fallback;
- deterministic quest, restoration, and progression authority;
- private offline, synchronization, encryption, and key behavior;
- security, privacy, accessibility, operations, incident response, support, and abuse;
- analytics, research, clinical, payment, connector, and LI non-scope; and
- stop, rollback, correction, migration, and public-claim rules.

A roadmap title or merged predecessor does not authorize Sprint 11 implementation. A new bounded issue and pull-request plan are required after alignment acceptance.

## Phase 0 and Longitudinal Intelligence

Institutional Phase 0 remains active. Newsletter gate #63, specialist-review strategy, succession and key-person controls, distributed ownership, architecture audits, Decision 0009 disposition, explicit treatment of later LI stages, and the Phase 0 exit review remain open.

LI-V0 remains accepted and complete. LI-V1 through LI-V8 remain inactive.

## Final classification

> **Accepted and merged Sprint 10 repository implementation; post-merge reconciled; no site or game deployment, distribution, private capability, LI activation, Sprint 11 implementation, or Phase 0 exit.**
"""
write(
    "docs/roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md",
    post_merge,
)

# Root repository orientation.
replace_once(
    "README.md",
    "[Documentation](docs/README.md) · [Vision](VISION.md) · [Current status](docs/roadmap/current-status.md) · [Sprint 10 alignment](docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md) · [Sprint 10 completion](docs/roadmap/sprint-10-completion-record.md)",
    "[Documentation](docs/README.md) · [Vision](VISION.md) · [Current status](docs/roadmap/current-status.md) · [Post-Sprint 10 reconciliation](docs/roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md) · [Sprint 10 completion](docs/roadmap/sprint-10-completion-record.md)",
    "root navigation",
)
replace_once(
    "README.md",
    "- **See current truth:** [Current Project Status](docs/roadmap/current-status.md) → [Sprint 10 Pre-Acceptance Alignment](docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md) → [Sprint Roadmap](docs/roadmap/sprints.md)",
    "- **See current truth:** [Current Project Status](docs/roadmap/current-status.md) → [Post-Sprint 10 Reconciliation](docs/roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md) → [Sprint Roadmap](docs/roadmap/sprints.md)",
    "root current truth",
)
replace_once(
    "README.md",
    "- **Inspect application boundaries:** [`apps/site`](apps/site) retains the institutional site and production `/prologue`; [`apps/game`](apps/game) owns the unmerged browser, iOS, and Android universal shell",
    "- **Inspect application boundaries:** [`apps/site`](apps/site) retains the institutional site and production `/prologue`; accepted [`apps/game`](apps/game) owns the unhosted browser, iOS, and Android universal shell",
    "root application boundaries",
)
replace_once(
    "README.md",
    "**Sprints 0–9 are accepted and merged.** Sprint 9 was squash merged through PR #68 as `b22c32ad8f40610dc95a5b49a745da5adb9c1341` and closed through issue #67.",
    f"**Sprints 0–10 are accepted and merged.** Sprint 10 was squash merged through PR #79 as `{MERGE_SHA}` after final aligned head `{ACCEPTED_HEAD}` passed CI 1519 and DCO 1624.",
    "root accepted sprints",
)
replace_once(
    "README.md",
    "The Sprint 10 implementation package is complete on [issue #80](https://github.com/finalboss-tom/calypsos-promise/issues/80) and [PR #79](https://github.com/finalboss-tom/calypsos-promise/pull/79). It remains unaccepted, unmerged, undeployed, undistributed, and blocked from Sprint 11 until the founding-steward gate, directed squash merge, post-merge reconciliation, and dedicated pre-Sprint 11 alignment are complete.",
    f"The Sprint 10 implementation package is accepted and merged through [PR #79](https://github.com/finalboss-tom/calypsos-promise/pull/79) as `{MERGE_SHA}`. [Issue #80](https://github.com/finalboss-tom/calypsos-promise/issues/80) closes after post-merge verification. The shell remains unhosted, unsigned, undistributed, and blocked from Sprint 11 until a dedicated pre-Sprint 11 alignment is accepted.",
    "root Sprint 10 status",
)
replace_once(
    "README.md",
    "- final Sprint 10 pre-acceptance alignment, acceptance, and merge disposition;",
    "- post-Sprint 10 reconciliation and dedicated pre-Sprint 11 alignment preparation;",
    "root governed work",
)
replace_once(
    "README.md",
    "## Complete unmerged Sprint 10 candidate",
    "## Accepted and merged Sprint 10 foundation",
    "root Sprint 10 heading",
)
replace_once(
    "README.md",
    "It creates no production account, private Chronicle, permission, model-provider egress, analytics, authoritative reward or progress, hosted preview, deployment, signing, store distribution, official release, LI activation, or Sprint 11 authority.",
    f"Sprint 10 is merged as `{MERGE_SHA}` but creates no production account, private Chronicle, permission, model-provider egress, analytics, authoritative reward or progress, hosted preview, deployment, signing, store distribution, official release, LI activation, or Sprint 11 authority.",
    "root Sprint 10 limits",
)

# Canonical documentation home.
replace_once(
    "docs/README.md",
    "1. [Current Project Status](roadmap/current-status.md)\n2. [Sprint 10 Pre-Acceptance Full Alignment](roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md)\n3. [Sprint 10 Completion Record](roadmap/sprint-10-completion-record.md)",
    "1. [Current Project Status](roadmap/current-status.md)\n2. [Post-Sprint 10 Repository Reconciliation](roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md)\n3. [Sprint 10 Completion Record](roadmap/sprint-10-completion-record.md)\n4. [Sprint 10 Pre-Acceptance Full Alignment](roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md)",
    "docs current orientation",
)
replace_once(
    "docs/README.md",
    "4. [Sprint 10 Cross-Contract Reconciliation](architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md)",
    "5. [Sprint 10 Cross-Contract Reconciliation](architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md)",
    "docs renumber cross",
)
replace_once(
    "docs/README.md",
    "Sprints 0–9, the post-Sprint 9 repository and production reconciliation, and the Longitudinal Intelligence doctrine and staged validation baseline are accepted and merged.",
    f"Sprints 0–10, the post-Sprint 9 repository and production reconciliation, and the Longitudinal Intelligence doctrine and staged validation baseline are accepted and merged. Sprint 10 was squash merged through PR #79 as `{MERGE_SHA}`.",
    "docs accepted sprints",
)
replace_once(
    "docs/README.md",
    "The Sprint 10 implementation package is complete on PR #79 and has passed its workstream-level completion suite. The pre-acceptance full alignment reconciliation corrects canonical status drift and requires one new exact candidate to pass permanent validation before PR #79 returns to ready-for-review state. Sprint 10 remains unaccepted and unmerged. Sprint 11 remains unstarted.",
    f"The Sprint 10 implementation package passed complete permanent validation and pre-acceptance alignment, was accepted by the founding steward, and was squash merged through PR #79 as `{MERGE_SHA}`. Post-merge reconciliation is complete. Sprint 11 remains unstarted.",
    "docs Sprint 10 state",
)
replace_once(
    "docs/README.md",
    "The complete unmerged package now establishes:",
    "The accepted and merged package establishes:",
    "docs universal shell",
)
replace_once(
    "docs/README.md",
    "The package remains unaccepted, unmerged, undeployed, and undistributed until the final founding-steward gate.",
    "The package is accepted and merged but remains unhosted, undeployed, unsigned, and undistributed. Any public release remains separately gated.",
    "docs package disposition",
)

# Roadmap index.
replace_once(
    "docs/roadmap/README.md",
    "[Documentation home](../README.md) · [Institutional roadmap](../../ROADMAP.md) · [Current status](current-status.md) · [Sprint 10 alignment](sprint-10-pre-acceptance-alignment-reconciliation.md)",
    "[Documentation home](../README.md) · [Institutional roadmap](../../ROADMAP.md) · [Current status](current-status.md) · [Post-Sprint 10 reconciliation](post-sprint-10-reconciliation-and-sprint-11-preparation.md) · [Sprint 10 alignment](sprint-10-pre-acceptance-alignment-reconciliation.md)",
    "roadmap navigation",
)
replace_once(
    "docs/roadmap/README.md",
    "1. [Current Project Status](current-status.md)\n2. [Sprint 10 Pre-Acceptance Full Alignment](sprint-10-pre-acceptance-alignment-reconciliation.md)\n3. [Sprint 10 Completion Record](sprint-10-completion-record.md)",
    "1. [Current Project Status](current-status.md)\n2. [Post-Sprint 10 Repository Reconciliation](post-sprint-10-reconciliation-and-sprint-11-preparation.md)\n3. [Sprint 10 Completion Record](sprint-10-completion-record.md)\n4. [Sprint 10 Pre-Acceptance Full Alignment](sprint-10-pre-acceptance-alignment-reconciliation.md)",
    "roadmap current orientation",
)
replace_once(
    "docs/roadmap/README.md",
    "4. [Sprint 10 Final Reconciliation and Sprint 11 Handoff](sprint-10-final-reconciliation-and-sprint-11-handoff.md)",
    "5. [Sprint 10 Final Reconciliation and Sprint 11 Handoff](sprint-10-final-reconciliation-and-sprint-11-handoff.md)",
    "roadmap renumber handoff",
)
replace_once(
    "docs/roadmap/README.md",
    "Sprints 0–9, post-Sprint 9 reconciliation, LI doctrine and staged validation baseline, LI-V0 closure, pre-Sprint 10 alignment, and accepted-state reconciliation are accepted and merged.",
    f"Sprints 0–10, post-Sprint 9 reconciliation, LI doctrine and staged validation baseline, LI-V0 closure, pre-Sprint 10 alignment, accepted-state reconciliation, and Sprint 10 post-merge reconciliation are accepted and merged. Sprint 10 squash commit: `{MERGE_SHA}`.",
    "roadmap accepted state",
)
replace_once(
    "docs/roadmap/README.md",
    "The Sprint 10 implementation package is complete and ready for founding-steward acceptance. It is not yet accepted or merged. No hosted `apps/game` preview, deployment, route migration, indexing, signing, store submission, beta, update channel, official release, account, private Chronicle, House of Keys operation, Aster/provider egress, analytics, real capture, payment, research, clinical operation, or LI-V1 through LI-V8 capability is active.",
    f"Sprint 10 is accepted and squash merged through PR #79 as `{MERGE_SHA}`. No hosted `apps/game` preview, deployment, route migration, indexing, signing, store submission, beta, update channel, official release, account, private Chronicle, House of Keys operation, Aster/provider egress, analytics, real capture, payment, research, clinical operation, or LI-V1 through LI-V8 capability is active.",
    "roadmap boundary",
)
replace_once(
    "docs/roadmap/README.md",
    "- [Sprint 10 Pre-Acceptance Full Alignment](sprint-10-pre-acceptance-alignment-reconciliation.md)",
    "- [Post-Sprint 10 Repository Reconciliation](post-sprint-10-reconciliation-and-sprint-11-preparation.md)\n- [Sprint 10 Pre-Acceptance Full Alignment](sprint-10-pre-acceptance-alignment-reconciliation.md)",
    "roadmap package links",
)
replace_once(
    "docs/roadmap/README.md",
    "Sprint 11's roadmap goal is to prove the complete private value loop. The title and roadmap are not implementation authorization. Sprint 11 may begin only after Sprint 10 acceptance and merge, issue closure after verification, post-merge reconciliation, and a dedicated pre-Sprint 11 alignment decision covering identity, private Chronicle authority, House of Keys, real capture, authentication, security, privacy, accessibility, operations, export, deletion, backup, recovery, offline/sync, provider independence, manual fallback, and applicable specialist holdpoints.",
    "Sprint 11's roadmap goal is to prove the complete private value loop. The title and roadmap are not implementation authorization. Sprint 10 acceptance, merge, and post-merge reconciliation are complete. Sprint 11 may begin only after a dedicated pre-Sprint 11 alignment decision covering identity, private Chronicle authority, House of Keys, real capture, authentication, security, privacy, accessibility, operations, export, deletion, backup, recovery, offline/sync, provider independence, manual fallback, and applicable specialist holdpoints, followed by a new bounded issue and pull-request plan.",
    "roadmap Sprint 11 gate",
)

# Architecture index.
replace_once(
    "docs/architecture/README.md",
    "[Documentation home](../README.md) · [Frozen architecture](../frozen/architecture.md) · [Module boundaries](module-boundaries.md) · [Longitudinal Intelligence](longitudinal-intelligence-doctrine.md) · [Current status](../roadmap/current-status.md) · [Sprint 10 alignment](../roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md)",
    "[Documentation home](../README.md) · [Frozen architecture](../frozen/architecture.md) · [Module boundaries](module-boundaries.md) · [Longitudinal Intelligence](longitudinal-intelligence-doctrine.md) · [Current status](../roadmap/current-status.md) · [Post-Sprint 10 reconciliation](../roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md) · [Sprint 10 alignment](../roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md)",
    "architecture navigation",
)
replace_once(
    "docs/architecture/README.md",
    "`apps/game` owns the complete unmerged Sprint 10 browser, iOS, and Android shell.",
    f"`apps/game` owns the accepted and merged Sprint 10 browser, iOS, and Android shell from squash commit `{MERGE_SHA}`.",
    "architecture game state",
)
replace_once(
    "docs/architecture/README.md",
    "The complete implementation package remains unaccepted and unmerged pending the final alignment candidate, founding-steward acceptance, and directed squash merge.",
    f"The complete implementation package was accepted after final alignment and squash merged through PR #79 as `{MERGE_SHA}`. It remains unhosted, unsigned, and undistributed.",
    "architecture pre-Sprint outcome",
)
replace_once(
    "docs/architecture/README.md",
    "- [Sprint 10 Cross-Contract Reconciliation](universal-game-shell-sprint-10-cross-contract-reconciliation.md)",
    "- [Post-Sprint 10 Repository Reconciliation](../roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md)\n- [Sprint 10 Cross-Contract Reconciliation](universal-game-shell-sprint-10-cross-contract-reconciliation.md)",
    "architecture package links",
)
replace_once(
    "docs/architecture/README.md",
    "The package reconciles the complete public/synthetic browser, iOS, and Android shell at maintainer repository and CI evidence level. It does not establish acceptance, merge, hosted operation, distribution, private capability, independent certification, LI activation, Sprint 11 entry, or institutional Phase 0 exit.",
    f"The package reconciles the complete public/synthetic browser, iOS, and Android shell at maintainer repository and CI evidence level and was accepted and squash merged as `{MERGE_SHA}`. It does not establish hosted operation, distribution, private capability, independent certification, LI activation, Sprint 11 entry, or institutional Phase 0 exit.",
    "architecture package outcome",
)

# Product index.
replace_once(
    "docs/product/README.md",
    "The [pre-acceptance full alignment reconciliation](../roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md) verifies the shell against the Product Constitution, Gameplay Foundation, incentive model, prior sprints, and current quality gates.",
    "The [pre-acceptance full alignment reconciliation](../roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md) verifies the shell against the Product Constitution, Gameplay Foundation, incentive model, prior sprints, and current quality gates. The [post-merge reconciliation](../roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md) records acceptance and merge without expanding product authority.",
    "product reconciliation link",
)

# Public site README and deployment disposition.
replace_once(
    "apps/site/README.md",
    "- [Current Project Status](../../docs/roadmap/current-status.md)\n- [Sprint 10 Pre-Acceptance Alignment](../../docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md)",
    "- [Current Project Status](../../docs/roadmap/current-status.md)\n- [Post-Sprint 10 Reconciliation](../../docs/roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md)\n- [Sprint 10 Pre-Acceptance Alignment](../../docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md)",
    "site reconciliation link",
)
replace_once(
    "apps/site/README.md",
    "The complete unmerged Sprint 10 package establishes `apps/game` as the browser, iOS, and Android universal shell",
    f"The accepted and merged Sprint 10 package establishes `apps/game` as the browser, iOS, and Android universal shell at squash commit `{MERGE_SHA}`",
    "site Sprint 10 disposition",
)
replace_once(
    "apps/site/README.md",
    "No route ownership, public navigation, sitemap, indexing, domain, deployment, newsletter, or production-prologue state changed through Sprint 10. Any future consolidation or public game release remains a separately attributable decision with current security, accessibility, operations, and rollback evidence.",
    "No route ownership, public navigation, sitemap, indexing, domain, deployment, newsletter, or production-prologue state changed through Sprint 10. No site redeploy was performed because PR #79 changed only this README within `apps/site` and did not change the deployable site artifact. Any future consolidation or public game release remains a separately attributable decision with current security, accessibility, operations, and rollback evidence.",
    "site no redeploy",
)

# Universal game README.
replace_once(
    "apps/game/README.md",
    "## Current Sprint 10 boundary",
    "## Accepted Sprint 10 boundary",
    "game heading",
)
replace_once(
    "apps/game/README.md",
    "Sprint 10.10 closes the unmerged repository package without activating Sprint 11.",
    "Sprint 10.10 closes the repository package without activating Sprint 11; the complete package is accepted and merged but remains unhosted and undistributed.",
    "game 10.10 disposition",
)
replace_once(
    "apps/game/README.md",
    "## Sprint 10 completion and alignment",
    "## Sprint 10 completion, merge, and reconciliation",
    "game completion heading",
)
replace_once(
    "apps/game/README.md",
    "The complete implementation package is documented in the [Sprint 10 completion record](../../docs/roadmap/sprint-10-completion-record.md), [cross-contract reconciliation](../../docs/architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md), and [pre-acceptance full alignment reconciliation](../../docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md).",
    "The complete implementation package is documented in the [Sprint 10 completion record](../../docs/roadmap/sprint-10-completion-record.md), [cross-contract reconciliation](../../docs/architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md), [pre-acceptance full alignment reconciliation](../../docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md), and [post-merge reconciliation](../../docs/roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md).",
    "game completion links",
)
replace_once(
    "apps/game/README.md",
    "The application remains unmerged, unhosted, unsigned, undistributed, and non-authoritative. Sprint 11 remains unstarted.",
    "The application is merged into `main` but remains unhosted, unsigned, undistributed, and non-authoritative. Sprint 11 remains unstarted.",
    "game merge disposition",
)

# Completion record.
replace_once(
    "docs/roadmap/sprint-10-completion-record.md",
    "[Current status](current-status.md) · [Pre-acceptance alignment](sprint-10-pre-acceptance-alignment-reconciliation.md)",
    "[Current status](current-status.md) · [Post-merge reconciliation](post-sprint-10-reconciliation-and-sprint-11-preparation.md) · [Pre-acceptance alignment](sprint-10-pre-acceptance-alignment-reconciliation.md)",
    "completion navigation",
)
replace_once(
    "docs/roadmap/sprint-10-completion-record.md",
    "- **Status:** IMPLEMENTATION PACKAGE COMPLETE — READY FOR FOUNDING-STEWARD ACCEPTANCE; not accepted, squash merged, deployed, distributed, officially released, or used to begin Sprint 11\n- **Tracking issue:** [#80](https://github.com/finalboss-tom/calypsos-promise/issues/80) — remains open\n- **Implementation pull request:** [#79](https://github.com/finalboss-tom/calypsos-promise/pull/79) — remains unmerged",
    f"- **Status:** ACCEPTED AND SQUASH MERGED — repository implementation complete; no preview, deployment, distribution, official release, private capability, LI activation, Sprint 11 start, or Phase 0 exit\n- **Tracking issue:** [#80](https://github.com/finalboss-tom/calypsos-promise/issues/80) — closes after post-merge verification\n- **Implementation pull request:** [#79](https://github.com/finalboss-tom/calypsos-promise/pull/79) — squash merged as `{MERGE_SHA}`\n- **Accepted aligned head:** `{ACCEPTED_HEAD}` — CI 1519 / DCO 1624",
    "completion status",
)
replace_once(
    "docs/roadmap/sprint-10-completion-record.md",
    "## Readiness decision",
    "## Acceptance and merge decision",
    "readiness heading",
)
replace_once(
    "docs/roadmap/sprint-10-completion-record.md",
    "It is ready for explicit founding-steward acceptance and a directed squash merge.",
    f"The founding steward accepted the complete package and directed the squash merge of PR #79. Sprint 10 is merged as `{MERGE_SHA}`.",
    "readiness decision",
)
replace_once(
    "docs/roadmap/sprint-10-completion-record.md",
    "Sprint 10 becomes accepted and merged only after the founding steward explicitly accepts the complete package and directs the squash merge of PR #79.",
    "Sprint 10 is accepted and merged. The merge changes repository state only and does not authorize any hosted, production, distribution, private-data, LI, Sprint 11, or Phase 0 capability.",
    "acceptance condition",
)
replace_once(
    "docs/roadmap/sprint-10-completion-record.md",
    "The exact final durable candidate must pass frozen installation, formatting, documentation links, repository and LI policy, Sprint 10 completion policy, economics and content validation, lint, typecheck, tests, production-site and rendered-prologue validation, browser/iOS/Android credential-free export, source-bound artifact evidence, generated-state cleanup, no tracked mutation, and DCO.",
    f"The final aligned candidate `{ACCEPTED_HEAD}` passed frozen installation, formatting, documentation links, repository and LI policy, Sprint 10 completion policy, economics and content validation, lint, typecheck, tests, production-site and rendered-prologue validation, browser/iOS/Android credential-free export, source-bound artifact evidence, generated-state cleanup, no tracked mutation, and DCO. The squash commit `{MERGE_SHA}` preserves the same repository tree.",
    "validation package",
)
replace_once(
    "docs/roadmap/sprint-10-completion-record.md",
    "The exact final head, CI, DCO, review state, acceptance, and merge disposition are recorded in issue #80 and PR #79 after this completion package passes permanent validation.",
    "The exact final head, CI, DCO, acceptance, squash commit, post-merge disposition, and issue closure are recorded in issue #80, PR #79, and the post-Sprint 10 reconciliation.",
    "validation evidence disposition",
)

replace_from(
    "docs/roadmap/sprint-10-completion-record.md",
    "## Acceptance and merge rule",
    f'''## Acceptance and merge outcome

The founding steward accepted the complete Sprint 10 implementation and directed one squash merge of PR #79.

Accepted aligned head: `{ACCEPTED_HEAD}` — CI 1519 / DCO 1624.

Accepted squash commit: `{MERGE_SHA}`.

The merge places the repository implementation on `main` only. It does not deploy, distribute, officially release, start Sprint 11, activate LI, create private capability, or close institutional Phase 0.

## Post-merge reconciliation

The [Post-Sprint 10 Repository Reconciliation and Sprint 11 Preparation](post-sprint-10-reconciliation-and-sprint-11-preparation.md) verifies merge state, tree identity, current documentation, tracker disposition, generated-state absence, dependency integrity, unchanged deployment state, and continuing release, specialist, LI, Sprint 11, and Phase 0 holdpoints.
''',
    "completion merge outcome",
)

# Pre-acceptance alignment record.
replace_once(
    "docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md",
    "- **Status:** ALIGNMENT RECONCILIATION COMPLETE AND VALIDATED — READY FOR FOUNDING-STEWARD ACCEPTANCE; no acceptance or merge occurs through this record",
    f"- **Status:** ALIGNMENT RECONCILIATION COMPLETE AND ACCEPTED THROUGH SPRINT 10 MERGE; no preview, deployment, distribution, private capability, LI activation, Sprint 11 start, or Phase 0 exit occurs through this record\n- **Accepted squash commit:** `{MERGE_SHA}`",
    "alignment status",
)
replace_once(
    "docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md",
    "No material implementation blocker remains after canonical-status corrections. Acceptance, merge, issue closure, post-merge reconciliation, preview, deployment, distribution, official release, private capability, Sprint 11 entry, LI activation, and Phase 0 exit remain separate decisions.",
    f"No material implementation blocker remained after canonical-status corrections. The founding steward accepted the package and PR #79 was squash merged as `{MERGE_SHA}`. Preview, deployment, distribution, official release, private capability, Sprint 11 entry, LI activation, and Phase 0 exit remain separate decisions.",
    "alignment decision disposition",
)
replace_once(
    "docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md",
    "The exact final durable head and PR review state after evidence-record reconciliation are recorded in issue #80 and PR #79. This checkpoint creates no acceptance, merge, deployment, distribution, release, private capability, Sprint 11 entry, LI activation, or Phase 0 exit.",
    f"Final durable aligned head: `{ACCEPTED_HEAD}` — CI 1519 / DCO 1624. The founding steward accepted the package and PR #79 was squash merged as `{MERGE_SHA}`. This record creates no deployment, distribution, release, private capability, Sprint 11 entry, LI activation, or Phase 0 exit.",
    "alignment validated outcome",
)
replace_once(
    "docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md",
    "The corrected exact candidate must pass frozen installation, formatting, documentation links, repository policy, LI policy, strengthened Sprint 10 alignment policy, economics, content, lint, typecheck, tests, production-site and rendered-prologue validation, browser/iOS/Android credential-free export, artifact evidence, generated-state cleanup, no tracked mutation, and DCO.",
    f"The corrected exact candidate `{ACCEPTED_HEAD}` passed frozen installation, formatting, documentation links, repository policy, LI policy, strengthened Sprint 10 alignment policy, economics, content, lint, typecheck, tests, production-site and rendered-prologue validation, browser/iOS/Android credential-free export, artifact evidence, generated-state cleanup, no tracked mutation, and DCO.",
    "alignment validation tense",
)
replace_once(
    "docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md",
    "The final exact candidate, CI, DCO, PR review state, and founding-steward disposition are recorded in issue #80 and PR #79 after validation.",
    "The final exact candidate, CI, DCO, founding-steward acceptance, squash commit, and post-merge disposition are recorded in issue #80, PR #79, and the post-Sprint 10 reconciliation.",
    "alignment evidence records",
)

# Final handoff.
replace_once(
    "docs/roadmap/sprint-10-final-reconciliation-and-sprint-11-handoff.md",
    "[Current status](current-status.md) · [Sprint sequence](sprints.md)",
    "[Current status](current-status.md) · [Post-merge reconciliation](post-sprint-10-reconciliation-and-sprint-11-preparation.md) · [Sprint sequence](sprints.md)",
    "handoff navigation",
)
replace_once(
    "docs/roadmap/sprint-10-final-reconciliation-and-sprint-11-handoff.md",
    "- **Status:** READY FOR FOUNDING-STEWARD ACCEPTANCE — no merge, preview, deployment, distribution, production private capability, official release, or Sprint 11 start is authorized by this record",
    f"- **Status:** ACCEPTED AND SQUASH MERGED — no preview, deployment, distribution, production private capability, official release, LI activation, or Sprint 11 start is authorized by this record\n- **Accepted aligned head:** `{ACCEPTED_HEAD}` — CI 1519 / DCO 1624\n- **Accepted squash commit:** `{MERGE_SHA}`",
    "handoff status",
)
replace_once(
    "docs/roadmap/sprint-10-final-reconciliation-and-sprint-11-handoff.md",
    "- **Next numbered sprint:** Sprint 11 — First Lantern vertical slice, only after Sprint 10 acceptance, directed squash merge, issue closure after verification, post-merge reconciliation, and a dedicated pre-Sprint 11 alignment decision",
    "- **Next numbered sprint:** Sprint 11 — First Lantern vertical slice, only after a dedicated pre-Sprint 11 alignment decision, applicable holdpoint disposition, and a new bounded implementation issue and PR plan",
    "handoff next sprint",
)
replace_once(
    "docs/roadmap/sprint-10-final-reconciliation-and-sprint-11-handoff.md",
    "The complete Sprint 10 implementation package exists on PR #79. `apps/game` builds browser, iOS, and Android unsigned artifacts but is not hosted or distributed.",
    f"The complete Sprint 10 implementation package was accepted and squash merged through PR #79 as `{MERGE_SHA}`. `apps/game` builds browser, iOS, and Android unsigned artifacts but is not hosted or distributed.",
    "handoff actual state",
)
replace_once(
    "docs/roadmap/sprint-10-final-reconciliation-and-sprint-11-handoff.md",
    "> **Complete unmerged universal-shell implementation with repository and CI evidence; not hosted, deployed, distributed, officially released, privately operational, or authorized to begin Sprint 11.**",
    "> **Accepted and merged universal-shell repository implementation with CI evidence; not hosted, deployed, distributed, officially released, privately operational, or authorized to begin Sprint 11.**",
    "handoff classification",
)
replace_once(
    "docs/roadmap/sprint-10-final-reconciliation-and-sprint-11-handoff.md",
    "## Merge and release separation\n\nA directed squash merge of PR #79 would place the accepted repository implementation on `main`. It would not by itself create a hosted preview, move `/prologue`, change public discovery, enable deployment, sign or distribute native applications, create private capability, close specialist or Phase 0 holdpoints, activate LI, or start Sprint 11.",
    f"## Merge and release separation\n\nPR #79 was squash merged as `{MERGE_SHA}`. The merge placed the accepted repository implementation on `main` and did not create a hosted preview, move `/prologue`, change public discovery, enable deployment, sign or distribute native applications, create private capability, close specialist or Phase 0 holdpoints, activate LI, or start Sprint 11.",
    "handoff merge outcome",
)
replace_once(
    "docs/roadmap/sprint-10-final-reconciliation-and-sprint-11-handoff.md",
    "## Required post-merge reconciliation\n\nAfter an accepted squash merge and before issue #80 closure, record the accepted squash commit, CI/DCO on `main`, absence of unintended workflows/dependencies/generated state/deployment/private capability, branch and PR disposition, status/roadmap agreement, and continuing release, specialist, Phase 0, LI, and Sprint 11 holdpoints.",
    "## Post-merge reconciliation\n\nThe [post-Sprint 10 reconciliation](post-sprint-10-reconciliation-and-sprint-11-preparation.md) records the accepted squash commit, accepted-head CI/DCO, tree identity, absence of unintended workflows, dependencies, generated state, deployment, or private capability, branch and PR disposition, status and roadmap agreement, issue closure, and continuing release, specialist, Phase 0, LI, and Sprint 11 holdpoints.",
    "handoff post-merge",
)
replace_once(
    "docs/roadmap/sprint-10-final-reconciliation-and-sprint-11-handoff.md",
    "Sprint 11 may begin only after explicit founding-steward acceptance of Sprint 10, directed squash merge of PR #79, issue #80 closure after merge verification, post-merge reconciliation, confirmation that no unintended preview/deployment/distribution/private capability/LI/Phase 0 exit occurred, a dedicated pre-Sprint 11 alignment review, explicit disposition of every applicable `HLD-S10-*` holdpoint, and a new bounded implementation issue and PR plan.",
    "Sprint 10 acceptance, squash merge, and post-merge repository reconciliation are complete. Sprint 11 may begin only after a dedicated pre-Sprint 11 alignment review, explicit disposition of every applicable `HLD-S10-*` holdpoint, confirmation that no unintended preview, deployment, distribution, private capability, LI activation, or Phase 0 exit occurred, and a new bounded implementation issue and PR plan.",
    "handoff entry rule",
)

# Cross-contract reconciliation.
replace_once(
    "docs/architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md",
    "[Architecture index](README.md) · [Pre-acceptance full alignment](../roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md)",
    "[Architecture index](README.md) · [Post-merge reconciliation](../roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md) · [Pre-acceptance full alignment](../roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md)",
    "cross navigation",
)
replace_once(
    "docs/architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md",
    "- **Status:** IMPLEMENTATION PACKAGE COMPLETE — READY FOR FOUNDING-STEWARD ACCEPTANCE; not accepted, squash merged, deployed, distributed, officially released, or used to start Sprint 11",
    f"- **Status:** ACCEPTED AND SQUASH MERGED — repository implementation complete; not hosted, deployed, distributed, officially released, privately operational, or used to start Sprint 11\n- **Accepted aligned head:** `{ACCEPTED_HEAD}` — CI 1519 / DCO 1624\n- **Accepted squash commit:** `{MERGE_SHA}`",
    "cross status",
)
replace_once(
    "docs/architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md",
    "The package is ready for explicit founding-steward acceptance and a directed squash merge.",
    f"The founding steward accepted the package and PR #79 was squash merged as `{MERGE_SHA}`.",
    "cross decision",
)
replace_once(
    "docs/architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md",
    "Clean alignment checkpoint `23dffb031657181d9c0ca42457b95128520f7870` passed CI 1513 and DCO 1618; the exact final durable head and PR review state are recorded in GitHub.",
    f"Clean alignment checkpoint `{ALIGNMENT_CHECKPOINT}` passed CI 1513 and DCO 1618. Final durable aligned head `{ACCEPTED_HEAD}` passed CI 1519 and DCO 1624 before acceptance and squash merge.",
    "cross alignment evidence",
)
replace_once(
    "docs/architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md",
    "> **Complete unmerged Sprint 10 repository implementation package, ready for founding-steward acceptance; no hosted game preview, deployment, distribution, production private capability, official release, or Sprint 11 implementation.**",
    "> **Accepted and merged Sprint 10 repository implementation package; no hosted game preview, deployment, distribution, production private capability, official release, LI activation, or Sprint 11 implementation.**",
    "cross release classification",
)
replace_once(
    "docs/architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md",
    "Acceptance, squash merge, issue closure, post-merge reconciliation, preview decision, route migration, deployment, signing, distribution, official release, Phase 0 exit, and Sprint 11 authorization remain separate attributable decisions.",
    "Acceptance and squash merge are complete. Issue closure and post-merge reconciliation are recorded separately; preview, route migration, deployment, signing, distribution, official release, Phase 0 exit, LI activation, and Sprint 11 authorization remain separate attributable decisions.",
    "cross decision separation",
)
replace_once(
    "docs/architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md",
    "The final exact durable candidate, CI, DCO, review state, acceptance, and merge disposition are recorded in issue #80 and PR #79 after the complete package itself passes permanent validation.",
    "The final exact durable candidate, CI, DCO, acceptance, squash commit, issue closure, and post-merge disposition are recorded in issue #80, PR #79, and the post-Sprint 10 reconciliation.",
    "cross final evidence",
)

# Current status.
replace_once(
    "docs/roadmap/current-status.md",
    "· [Sprint 10 pre-acceptance alignment](sprint-10-pre-acceptance-alignment-reconciliation.md) · [Sprint 10 completion](sprint-10-completion-record.md)",
    "· [Post-Sprint 10 reconciliation](post-sprint-10-reconciliation-and-sprint-11-preparation.md) · [Sprint 10 pre-acceptance alignment](sprint-10-pre-acceptance-alignment-reconciliation.md) · [Sprint 10 completion](sprint-10-completion-record.md)",
    "status navigation",
)
replace_once(
    "docs/roadmap/current-status.md",
    "- **Accepted and merged numbered sprints:** 0–9.",
    "- **Accepted and merged numbered sprints:** 0–10.",
    "status sprint count",
)
replace_once(
    "docs/roadmap/current-status.md",
    "- **Sprint 10 is authorized with named holdpoints and active through issue #80.**",
    f"- **Sprint 10 is accepted and squash merged through PR #79 as `{MERGE_SHA}`; issue #80 closes after post-merge verification.**",
    "status Sprint 10 state",
)
replace_once(
    "docs/roadmap/current-status.md",
    "- **Sprint 10.1 through Sprint 10.10 are complete as validated internal checkpoints.**",
    "- **Sprint 10.1 through Sprint 10.10 are complete, accepted, and merged as one bounded package.**",
    "status workstreams",
)
replace_once(
    "docs/roadmap/current-status.md",
    "- **Sprint 10 implementation package is complete and ready for founding-steward acceptance.**",
    "- **Sprint 10 implementation package is accepted and merged.**",
    "status package",
)
replace_once(
    "docs/roadmap/current-status.md",
    "- **PR #79 is the complete unmerged Sprint 10 candidate; exact review state and final candidate evidence are recorded in GitHub.**",
    f"- **PR #79 is squash merged as `{MERGE_SHA}` from accepted aligned head `{ACCEPTED_HEAD}` — CI 1519 / DCO 1624.**\n- **Post-Sprint 10 repository reconciliation is complete; no site redeploy, game deployment, distribution, private capability, LI activation, Sprint 11 start, or Phase 0 exit occurred.**",
    "status PR disposition",
)
replace_once(
    "docs/roadmap/current-status.md",
    "Sprint 10 is active through issue #80. PR #79 is the single draft implementation pull request for the entire sprint. Workstreams 10.1 through 10.9 are complete as validated internal checkpoints. Workstream 10.7 was repaired because its prior reported completion had not landed durable implementation. No hosted game preview, provider selection, deployment, indexing change, signing, store submission, update channel, official release, or Sprint 11 work has begun.",
    f"Sprint 10 is accepted and squash merged through PR #79 as `{MERGE_SHA}`. Workstreams 10.1 through 10.10 are complete as one bounded package. The post-merge reconciliation confirms no hosted game preview, provider selection, deployment, indexing change, signing, store submission, update channel, official release, private capability, LI activation, or Sprint 11 work began.",
    "status accepted authorization",
)
replace_once(
    "docs/roadmap/current-status.md",
    "- the completion record classifies the package as ready for founding-steward acceptance but not accepted, merged, deployed, distributed, released, privately operational, or authorized to begin Sprint 11;",
    "- the completion record classifies the package as accepted and merged but not hosted, deployed, distributed, released, privately operational, or authorized to begin Sprint 11;",
    "status 10.10 classification",
)
replace_once(
    "docs/roadmap/current-status.md",
    "The validated predecessor entering 10.10 is `23ec622ec6dfdb4e3a13f42ee30c679222661cd0` with CI 1500 and DCO 1604. Sprint 10 acceptance and merge remain pending.",
    f"The validated predecessor entering 10.10 is `23ec622ec6dfdb4e3a13f42ee30c679222661cd0` with CI 1500 and DCO 1604. Final aligned head `{ACCEPTED_HEAD}` passed CI 1519 and DCO 1624 before squash merge as `{MERGE_SHA}`.",
    "status 10.10 outcome",
)
replace_between(
    "docs/roadmap/current-status.md",
    "## Sprint 10 pull-request model",
    "## Sprint 10 named holdpoints",
    f"""## Sprint 10 merge outcome

PR #79 was the single implementation pull request for workstreams 10.1 through 10.10. The founding steward accepted the complete package and directed one squash merge.

- Accepted aligned head: `{ACCEPTED_HEAD}` — CI 1519 / DCO 1624.
- Accepted squash commit: `{MERGE_SHA}`.
- The squash tree matches the accepted aligned-head tree.
- No preview, deployment, route migration, indexing, signing, store submission, distribution, private capability, LI activation, Sprint 11 start, or Phase 0 exit occurred.
- Issue #80 closes after post-merge reconciliation verification.

""",
    "status merge model",
)
replace_between(
    "docs/roadmap/current-status.md",
    "## Current next decision",
    "## Status rule",
    """## Current next decision

Sprint 10 is complete, accepted, merged, and reconciled. Issue #80 closes as completed after post-merge verification.

The next authorized work is a dedicated pre-Sprint 11 alignment review. Sprint 11 implementation remains unstarted and requires explicit treatment of identity, private Chronicle authority, House of Keys, real capture, export, deletion, backup, recovery, private offline and synchronization behavior, security, privacy, accessibility, operations, providers, applicable specialist holdpoints, and a new bounded issue and pull-request plan.

No hosted game preview, route migration, deployment, indexing, signing, store submission, beta, update channel, official release, production authentication, private Chronicle, House of Keys, Aster/provider, analytics, real capture, payment, research, clinical workflow, or LI-V1 through LI-V8 capability is active.

Institutional Phase 0 remains active.

""",
    "status next decision",
)

# Permanent Sprint 10 validator: accepted/merged and post-merge-reconciled state.
replace_once(
    "tools/policy/check-sprint-10-completion.mjs",
    '''  alignment:
    "docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md",
  rootReadme: "README.md",''',
    '''  alignment:
    "docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md",
  postMerge:
    "docs/roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md",
  rootReadme: "README.md",''',
    "validator post-merge path",
)
replace_once(
    "tools/policy/check-sprint-10-completion.mjs",
    '''    paths.cross,
    texts.cross,
    [
      "IMPLEMENTATION PACKAGE COMPLETE — READY FOR FOUNDING-STEWARD ACCEPTANCE",
      "Sprint 11 remains unstarted",
      "No workstream silently expanded",
    ],''',
    f'''    paths.cross,
    texts.cross,
    [
      "ACCEPTED AND SQUASH MERGED",
      "{MERGE_SHA}",
      "Sprint 11 remains unstarted",
      "No workstream silently expanded",
    ],''',
    "validator cross accepted",
)
replace_once(
    "tools/policy/check-sprint-10-completion.mjs",
    '''    paths.completion,
    texts.completion,
    [
      "IMPLEMENTATION PACKAGE COMPLETE — READY FOR FOUNDING-STEWARD ACCEPTANCE",
      "one cross-contract reconciliation with 24 findings",
      "60 stable controls",
      "24 holdpoints and 24 unresolved records",
      "Sprint 10 becomes accepted and merged only after",
    ],''',
    f'''    paths.completion,
    texts.completion,
    [
      "ACCEPTED AND SQUASH MERGED",
      "{ACCEPTED_HEAD}",
      "{MERGE_SHA}",
      "one cross-contract reconciliation with 24 findings",
      "60 stable controls",
      "24 holdpoints and 24 unresolved records",
      "Acceptance and merge outcome",
    ],''',
    "validator completion accepted",
)
replace_once(
    "tools/policy/check-sprint-10-completion.mjs",
    '''    paths.status,
    texts.status,
    [
      "Sprint 10.1 through Sprint 10.10 are complete as validated internal checkpoints",
      "Sprint 10 implementation package is complete and ready for founding-steward acceptance",
      "23dffb031657181d9c0ca42457b95128520f7870",
      "Sprint 11 remains unstarted",
      "explicit founding-steward acceptance",
    ],''',
    f'''    paths.status,
    texts.status,
    [
      "Accepted and merged numbered sprints:** 0–10",
      "Sprint 10.1 through Sprint 10.10 are complete, accepted, and merged as one bounded package",
      "Sprint 10 implementation package is accepted and merged",
      "{ALIGNMENT_CHECKPOINT}",
      "{ACCEPTED_HEAD}",
      "{MERGE_SHA}",
      "Sprint 11 remains unstarted",
      "dedicated pre-Sprint 11 alignment review",
    ],''',
    "validator current status accepted",
)
replace_once(
    "tools/policy/check-sprint-10-completion.mjs",
    '''    paths.roadmapIndex,
    texts.roadmapIndex,
    [
      "Sprint 10 completion package",
      "Sprint 11 remains unstarted",
      "Phase 0 remains active",
    ],''',
    f'''    paths.roadmapIndex,
    texts.roadmapIndex,
    [
      "Post-Sprint 10 Repository Reconciliation",
      "Sprint 10 is accepted and squash merged",
      "{MERGE_SHA}",
      "Sprint 11 remains unstarted",
      "Phase 0 remains active",
    ],''',
    "validator roadmap accepted",
)
replace_once(
    "tools/policy/check-sprint-10-completion.mjs",
    '''    paths.architectureIndex,
    texts.architectureIndex,
    [
      "Sprint 10 universal game shell completion package",
      "universal-game-shell-sprint-10-cross-contract-reconciliation.md",
    ],''',
    f'''    paths.architectureIndex,
    texts.architectureIndex,
    [
      "Sprint 10 universal game shell completion package",
      "accepted and squash merged",
      "{MERGE_SHA}",
      "universal-game-shell-sprint-10-cross-contract-reconciliation.md",
    ],''',
    "validator architecture accepted",
)
replace_once(
    "tools/policy/check-sprint-10-completion.mjs",
    '''    paths.rootReadme,
    texts.rootReadme,
    [
      "Sprint 10 implementation package is complete",

      "Complete unmerged Sprint 10 candidate",
      "apps/game",
      "packages/game-content",
      "Sprint 11 remains unstarted",
    ],''',
    f'''    paths.rootReadme,
    texts.rootReadme,
    [
      "Sprints 0–10 are accepted and merged",
      "{MERGE_SHA}",
      "Accepted and merged Sprint 10 foundation",
      "apps/game",
      "packages/game-content",
      "Sprint 11 remains unstarted",
    ],''',
    "validator root accepted",
)
replace_once(
    "tools/policy/check-sprint-10-completion.mjs",
    '''    paths.docsIndex,
    texts.docsIndex,
    [
      "Sprint 10 Pre-Acceptance Full Alignment",
      "Sprint 10 implementation package is complete",
      "Sprint 10 universal shell",
      "Sprint 11 remains unstarted",
    ],''',
    f'''    paths.docsIndex,
    texts.docsIndex,
    [
      "Post-Sprint 10 Repository Reconciliation",
      "Sprint 10 is accepted and squash merged",
      "{MERGE_SHA}",
      "Sprint 10 universal shell",
      "Sprint 11 remains unstarted",
    ],''',
    "validator docs accepted",
)
replace_once(
    "tools/policy/check-sprint-10-completion.mjs",
    '''    paths.siteReadme,
    texts.siteReadme,
    [
      "Sprint 10 Pre-Acceptance Alignment",
      "complete unmerged Sprint 10 package",
      "apps/game",
      "Sprint 11 remains unstarted",
    ],''',
    f'''    paths.siteReadme,
    texts.siteReadme,
    [
      "Post-Sprint 10 Reconciliation",
      "accepted and merged Sprint 10 package",
      "{MERGE_SHA}",
      "No site redeploy",
      "apps/game",
      "Sprint 11 remains unstarted",
    ],''',
    "validator site accepted",
)
replace_once(
    "tools/policy/check-sprint-10-completion.mjs",
    '''    paths.gameReadme,
    texts.gameReadme,
    [
      "10.9",
      "10.10",
      "/operations",
      "Sprint 10 completion and alignment",
      "Sprint 11 remains unstarted",
    ],''',
    f'''    paths.gameReadme,
    texts.gameReadme,
    [
      "10.9",
      "10.10",
      "/operations",
      "Sprint 10 completion, merge, and reconciliation",
      "{MERGE_SHA}",
      "merged into `main`",
      "Sprint 11 remains unstarted",
    ],''',
    "validator game accepted",
)
insert_before(
    "tools/policy/check-sprint-10-completion.mjs",
    '''  [
    paths.vision,''',
    f'''  [
    paths.postMerge,
    texts.postMerge,
    [
      "COMPLETE AND VALIDATED",
      "{ACCEPTED_HEAD}",
      "{MERGE_SHA}",
      "No Calypso's Promise public-site redeploy is justified",
      "Issue #80",
      "Sprint 11 remains unstarted",
      "LI-V1 through LI-V8 remain inactive",
    ],
  ],
''',
    "validator post-merge requirements",
)

# Current-orientation phrases that must never return after merge.
insert_before(
    "tools/policy/check-sprint-10-completion.mjs",
    '''  [
    paths.rootReadme,
    texts.rootReadme,
    "Sprint 10 implementation has **not** started",
  ],''',
    '''  [
    paths.rootReadme,
    texts.rootReadme,
    "Complete unmerged Sprint 10 candidate",
  ],
  [
    paths.rootReadme,
    texts.rootReadme,
    "It remains unaccepted, unmerged",
  ],
  [
    paths.docsIndex,
    texts.docsIndex,
    "Sprint 10 remains unaccepted and unmerged",
  ],
  [
    paths.roadmapIndex,
    texts.roadmapIndex,
    "not yet accepted or merged",
  ],
  [
    paths.architectureIndex,
    texts.architectureIndex,
    "complete unmerged Sprint 10",
  ],
  [
    paths.siteReadme,
    texts.siteReadme,
    "complete unmerged Sprint 10 package",
  ],
  [
    paths.gameReadme,
    texts.gameReadme,
    "The application remains unmerged",
  ],
  [
    paths.status,
    texts.status,
    "Sprint 10 acceptance and merge remain pending",
  ],
''',
    "validator post-merge forbidden phrases",
)
replace_once(
    "tools/policy/check-sprint-10-completion.mjs",
    '''            "temp-sprint-10-alignment-evidence.yml",
          ].includes(entry);''',
    '''            "temp-sprint-10-alignment-evidence.yml",
            "temp-sprint-10-post-merge-reconciliation.yml",
          ].includes(entry);''',
    "validator temporary post-merge workflow",
)
replace_once(
    "tools/policy/check-sprint-10-completion.mjs",
    '''  "Sprint 10 completion and alignment package validated: frozen mission and incentive inheritance, current canonical orientation, 24 findings, 60 controls, 24 holdpoints, 24 unresolved records, closed release gates, and bounded Sprint 11 handoff.",''',
    '''  "Sprint 10 accepted and post-merge-reconciled package validated: frozen mission and incentive inheritance, current canonical orientation, 24 findings, 60 controls, 24 holdpoints, 24 unresolved records, closed release gates, no site redeploy, and bounded Sprint 11 handoff.",''',
    "validator success message",
)

# Longitudinal Intelligence validator: keep LI boundaries coherent with accepted Sprint 10.
replace_once(
    "tools/policy/check-longitudinal-intelligence.mjs",
    '''    sprintTenCompletionPath,
    sprintTenCompletion,
    [
      "IMPLEMENTATION PACKAGE COMPLETE — READY FOR FOUNDING-STEWARD ACCEPTANCE",
      "LI-V1 through LI-V8",''',
    f'''    sprintTenCompletionPath,
    sprintTenCompletion,
    [
      "ACCEPTED AND SQUASH MERGED",
      "{MERGE_SHA}",
      "LI-V1 through LI-V8",''',
    "LI validator completion accepted",
)
replace_once(
    "tools/policy/check-longitudinal-intelligence.mjs",
    '''    currentStatusPath,
    currentStatus,
    [
      "LI-V0 is accepted and complete",
      "Sprint 10 is authorized with named holdpoints",
      "Sprint 10 is active through issue #80",
      "Sprint 10.1 through Sprint 10.10 are complete as validated internal checkpoints",
      "Sprint 10 implementation package is complete and ready for founding-steward acceptance",
      "Sprint 11 remains unstarted",
      "LI-V1 through LI-V8 remain inactive",
    ],''',
    f'''    currentStatusPath,
    currentStatus,
    [
      "LI-V0 is accepted and complete",
      "Sprint 10 is accepted and squash merged",
      "Sprint 10 is accepted and squash merged through PR #79",
      "Sprint 10.1 through Sprint 10.10 are complete, accepted, and merged as one bounded package",
      "Sprint 10 implementation package is accepted and merged",
      "{MERGE_SHA}",
      "Sprint 11 remains unstarted",
      "LI-V1 through LI-V8 remain inactive",
    ],''',
    "LI validator current accepted",
)

# Final post-merge sanity checks.
for path in [
    "README.md",
    "docs/README.md",
    "docs/roadmap/README.md",
    "docs/roadmap/current-status.md",
    "docs/architecture/README.md",
    "apps/site/README.md",
    "apps/game/README.md",
]:
    content = read(path)
    for stale in [
        "Complete unmerged Sprint 10 candidate",
        "Sprint 10 remains unaccepted and unmerged",
        "not yet accepted or merged",
        "complete unmerged Sprint 10 package",
        "The application remains unmerged",
        "Sprint 10 acceptance and merge remain pending",
    ]:
        if stale in content:
            raise SystemExit(f"{path}: stale post-merge phrase remains: {stale}")

for path in [
    "docs/roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md",
    "docs/roadmap/current-status.md",
    "docs/roadmap/sprint-10-completion-record.md",
]:
    content = read(path)
    for expected in [MERGE_SHA, ACCEPTED_HEAD, "Sprint 11 remains unstarted"]:
        if expected not in content:
            raise SystemExit(f"{path}: missing post-merge evidence {expected}")

if "No Calypso's Promise public-site redeploy is justified" not in read(
    "docs/roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md"
):
    raise SystemExit("post-merge record: missing no-redeploy decision")
