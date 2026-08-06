from pathlib import Path

PRE_AUDIT_HEAD = "02ff089b4dbc1a17bf2602ff9a79bc2f00f5199e"

def read(path):
    return Path(path).read_text(encoding="utf-8")

def write(path, text):
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    Path(path).write_text(text, encoding="utf-8")

def replace_once(path, old, new, label):
    text = read(path)
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{path}: {label}: expected exactly one match, found {count}")
    write(path, text.replace(old, new, 1))

def insert_before(path, marker, addition, label):
    text = read(path)
    count = text.count(marker)
    if count != 1:
        raise SystemExit(f"{path}: {label}: expected exactly one marker, found {count}")
    write(path, text.replace(marker, addition + marker, 1))

alignment = f"""# Sprint 10 Pre-Acceptance Full Alignment Reconciliation

[Current status](current-status.md) · [Sprint 10 completion](sprint-10-completion-record.md) · [Cross-contract reconciliation](../architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md) · [Control and evidence map](../architecture/universal-game-shell-sprint-10-control-and-evidence-map.md) · [Holdpoints and unresolved work](../architecture/universal-game-shell-sprint-10-specialist-holdpoint-and-unresolved-work-register.md) · [Sprint 11 handoff](sprint-10-final-reconciliation-and-sprint-11-handoff.md)

- **Status:** ALIGNMENT RECONCILIATION COMPLETE — READY FOR FOUNDING-STEWARD ACCEPTANCE AFTER EXACT-CANDIDATE VALIDATION; no acceptance or merge occurs through this record
- **Tracking issue:** [#80](https://github.com/finalboss-tom/calypsos-promise/issues/80)
- **Implementation pull request:** [#79](https://github.com/finalboss-tom/calypsos-promise/pull/79)
- **Audited predecessor:** `{PRE_AUDIT_HEAD}` — CI 1508 / DCO 1612
- **Scope:** mission, vision, player promise, incentives, architecture, governance, provider independence, operational simplicity, prior-sprint inheritance, application behavior, documentation truth, validation quality, and residual holdpoints
- **Information boundary:** public repository source and explicitly synthetic evidence only

## Decision

Sprint 10 remains substantively aligned with the frozen Product Constitution, Vision and Institutional Mandate, Architecture Foundation, Gameplay Foundation, incentive model, governance baseline, accepted consumer-first and provider-independent boundary, operational-simplicity doctrine, Longitudinal Intelligence baseline, and the accepted work of Sprints 6 through 9.

The implementation itself has no material mission, authority, incentive, privacy, provider, accessibility, release, or next-sprint blocker at the evidence level claimed.

The audit did find one material pre-acceptance defect class: several canonical entry points still described LI-V0 or pre-Sprint 10 as pending and Sprint 10 as planned or unstarted. Other entry points contained the new completion package while retaining contradictory historical orientation. That status drift could mislead contributors, reviewers, operators, and future agents even though the implementation and canonical current-status ledger were correct.

This reconciliation corrects those current-orientation records and strengthens the permanent Sprint 10 validator so a completion package cannot remain “ready” while canonical entry points contradict it.

After the corrected exact candidate passes permanent validation, the recommendation is:

> **READY FOR FOUNDING-STEWARD ACCEPTANCE AND DIRECTED SQUASH MERGE**

No material implementation blocker remains after canonical-status corrections. Acceptance, merge, issue closure, post-merge reconciliation, preview, deployment, distribution, official release, private capability, Sprint 11 entry, LI activation, and Phase 0 exit remain separate decisions.

## Authority and review order

The review applied the repository's accepted conflict order:

1. Frozen mission, Product Constitution, player promise, Architecture Foundation, Gameplay Foundation, lore, and institutional mandate.
2. Accepted decisions and cross-cutting doctrine, including Decisions 0008, 0010, and 0011 and LI-V0.
3. Governance, security, publication, economics, development, accessibility, provider-independence, and validation policy.
4. Accepted Living Chronicle, House of Keys, Aster, content, website, and module boundaries.
5. Accepted Sprints 6 through 9 and the pre-Sprint 10 authorization.
6. Sprint 10 implementation, tests, CI, records, and GitHub evidence.
7. This pre-acceptance reconciliation and the corrected exact candidate.

A lower layer may implement or explain a higher layer. It may not quietly replace it, expand authority, or use passing automation to close a specialist or institutional gate.

## Mission and player promise

**Result: aligned.**

The frozen mission requires brief, rewarding, narrative-driven participation that helps people build, understand, improve, and control a high-quality longitudinal account while returning personal value first.

Sprint 10 establishes the universal playable surface without pretending that the private value loop already exists. It provides understandable public/synthetic value through orientation, narrative, direct explanation, accessibility, state transparency, and inspectable authority limits.

The player promise remains controlling:

> **Build your Living Chronicle. Improve your health. Keep the key.**

Sprint 10 creates no private Chronicle and no health-improvement claim. That is truthful scope control, not a failure to satisfy the mission. The shell is the necessary playable foundation for the later private value loop, while the record explicitly states that Sprint 11 remains unstarted.

## Vision and institutional mandate

**Result: aligned.**

The Vision orders the project to:

1. return useful personal value;
2. preserve individual control;
3. enable separately authorized collective benefit;
4. share created value fairly; and
5. transfer stewardship only as evidence and capacity mature.

Sprint 10 advances the first operating surface without activating research, commercial access, analytics, provider enrollment, compensation, or governance weight. It preserves founder- and provider-replaceable source, content, dependency, build, and release boundaries.

The sprint does not use growth, mobile reach, cross-platform availability, engagement, or a future account boundary to justify surveillance, broader permission, secondary use, or premature authority transfer.

## Product Constitution and player rights

**Result: aligned.**

The implementation preserves:

- no-account entry;
- direct and narrative paths with materially equivalent essential information;
- meaningful refusal, deferral, restart, discard, exit, and correction;
- no punishment, shame, fake scarcity, or manufactured urgency;
- no requirement to provide health information;
- no payment, research, commercial sharing, or public visibility requirement;
- no AI write to authoritative records;
- no private data in public code, fixtures, CI, or exports; and
- accessible participation as a first-class implementation boundary.

Sprint 10 does not yet implement production permission inspection, Chronicle export, Chronicle deletion, or private correction because those require authoritative private capability. The Sprint 11 handoff keeps those obligations explicit rather than representing explanatory or synthetic state as fulfillment.

## Incentive alignment

**Result: aligned.**

The incentive model requires immediate player value, visible evidence, deterministic authority, meaningful refusal, non-punitive return, and no reward for broader consent, unnecessary intimate disclosure, raw engagement, or provider choice.

Sprint 10 satisfies the boundary appropriate to a public/synthetic shell:

- arrival, map, Hearth, direct path, and interactive presentation explain what the product is and is not;
- planned locations are honestly inactive rather than framed as behavior-locked;
- choosing the direct path does not reduce access or create a preference profile;
- refusal, pause, defer, discard, and exit remain visible and reversible;
- quest cards explicitly create no completion, reward, restoration, unlock, health result, or personal progress;
- account information is inactive, optional, and discard by default;
- analytics and preference inference are absent; and
- client rendering, storage, device time, animation, and optimistic state cannot mint progress or rewards.

The sprint intentionally does not activate Vitality, Chronicle, Fellowship, Renown, Laurels, durable restoration, or canonical progression. Activating those without authoritative domain evidence would violate the incentive model. Their deferral is therefore aligned.

## Gameplay Foundation

**Result: aligned at universal-shell scope.**

The implementation is a narrative exploration and decision surface rather than a generic health dashboard with fantasy decoration. It includes an illustrated island orientation, Lantern Shore, Hearth, Aster framing, direct-information parity, scene and dialogue presentation, quest cards, Wayfinder navigation, clear stopping paths, and planned/inactive locations.

The shell proves the form of play and accessibility of the route. It does not claim the complete daily 3–8 minute private loop, multimodal capture, persistent restoration, adaptive quest composition, or authoritative progression. Those remain later work and require accepted domain evidence.

## Architecture and module boundaries

**Result: aligned after documentation reconciliation.**

Sprint 10 implements the frozen stack and surface split:

- `apps/site` remains the Next.js institutional website, newsletter, and production `/prologue` owner;
- `apps/game` is the Expo / React Native / Expo Router browser, iOS, and Android application;
- `packages/game-content` is one earned versioned public/synthetic content package with a real consumer;
- no generic shared UI package was extracted without a second consumer;
- provider-independent content, state, authority, accessibility, and operations contracts remain inward-facing;
- AsyncStorage is isolated as a replaceable adapter rather than domain authority; and
- no backend service, database, queue, CMS, identity provider, model provider, analytics service, or deployment boundary was created prematurely.

The canonical module-boundary record had not been updated to list `apps/game` and `packages/game-content`; that documentation drift is corrected here.

## Consumer-first and provider-independent alignment

**Result: aligned.**

The universal shell works without a provider, EHR, payer, employer, researcher, enterprise relationship, model provider, or sponsor. No provider or platform receives content authority, source rank, roadmap priority, progression influence, identity control, or exclusive functionality.

Expo, EAS, Apple, Google, Vercel, registries, storage, build, and monitoring systems remain adapters with replacement or manual-fallback boundaries. The portable center remains repository source, public/synthetic content, deterministic rules, exact dependencies, and documented manual validation.

## Operational simplicity and developer experience

**Result: aligned.**

The sprint uses one application and one earned content package rather than premature service decomposition. Ordinary public/synthetic development remains credential-free. The repository provides:

- frozen-lockfile installation;
- one full `pnpm check` command;
- focused game validators;
- exact runtime and package-manager declarations;
- browser, iOS, and Android credential-free exports;
- deterministic synthetic fixtures;
- explicit failure, stale, correction, supersession, conflict, expiry, and provider-unavailable behavior;
- source-bound artifact provenance;
- generated-state cleanup; and
- no tracked build mutation.

The large pure contract files for offline resilience, operations, and content are cohesion signals to monitor, not current blockers. They retain single bounded responsibilities, focused validators, tests, explicit public surfaces, and no provider or domain leakage. Revisit decomposition when a second consumer, repeated unrelated edits, ownership split, or test-isolation failure earns it.

## Prior-sprint inheritance

### Sprint 6 — Aster contracts and AI governance

**Result: preserved.**

Aster remains pre-authored and non-authoritative. No model provider, memory, retrieval, tool, private egress, or production Aster runtime is activated. The direct path and manual operation remain complete without AI.

### Sprint 7 — Forge MCP and agent safety

**Result: preserved.**

Sprint 10 introduces no MCP dependency, tool authority, repository mutation path, arbitrary network access, or private-data bridge. Forge remains a separate local public/synthetic contributor surface.

### Sprint 8 — Public website foundation

**Result: preserved.**

`apps/site` retains institutional website ownership, source-backed public status, newsletter isolation, public security controls, and deployment policy. Sprint 10 does not duplicate or migrate canonical public routes.

### Sprint 9 — Public synthetic prologue

**Result: preserved.**

The production `/prologue` remains owned by `apps/site`, public and explicitly synthetic, no-account, memory-only, `noindex, nofollow`, absent from public navigation and the sitemap, and non-authoritative. Sprint 10 does not silently transfer prologue state, change production discovery, or convert First Lantern presentation into durable progress.

### LI-V0 and pre-Sprint 10 alignment

**Result: preserved.**

LI-V0 remains accepted and complete. LI-V1 through LI-V8 remain inactive. The accepted application ownership, content package, client-trust, offline, authentication, accessibility, provider, release, and Sprint 11 holdpoints remain intact.

## Security, privacy, and information handling

**Result: aligned for public/synthetic repository scope.**

No real health data, arbitrary personal input, credentials, account data, provider output, permission grant, analytics profile, research record, payment information, or protected clinical content enters the application, content package, storage envelope, tests, build evidence, or public records.

This is not production private-data security or privacy evidence. Identity, session, encryption, private storage, synchronization, backup, recovery, protected audit, incident response, and deletion execution remain Sprint 11 and specialist gates.

## Accessibility and platform parity

**Result: aligned at maintainer implementation level.**

The application provides text-first essential paths and executable browser, iOS, and Android coverage for keyboard, screen reader, touch, switch access, scaling, reflow, contrast, orientation, reduced motion, reduced data, low bandwidth, audio-text, haptic, and gesture alternatives.

Independent accessibility review, named assistive technology, affected-user evidence, physical-device coverage, cognitive-accessibility research, field performance, and any conformance statement remain open. Those limits are visible and release-blocking where applicable.

## Build, release, rollback, and operations quality

**Result: aligned and proportionate.**

Permanent CI independently reports formatting, documentation, repository policy, content, economics, lint, typecheck, tests, game-toolchain/export evidence, rendered-site validation, and DCO.

Unsigned artifacts are bound to exact source, lockfile, toolchain, platform, path, size, and SHA-256 digest, then removed. This is strong repository evidence without misrepresenting it as signing, store qualification, hosted operation, multi-host byte-for-byte reproducibility, production monitoring, or official release.

Merge, preview, deployment, route migration, indexing, signing, store submission, beta, updates, official release, and incident ownership remain separate attributable gates with rollback.

## Governance and incentive capture

**Result: aligned.**

The sprint does not allow money, sponsorship, provider credits, platform access, user count, engagement, or contributor activity to purchase product authority, source authority, progression, preferred defaults, roadmap control, favorable findings, governance power, or safety exceptions.

The founding-steward acceptance gate remains explicit. Specialist absence remains an open holdpoint rather than implied approval. The PR returns to ready-for-review state only after the corrected exact candidate is green.

## Open evidence and holdpoints

The existing 24 `HLD-S10-*` holdpoints and 24 `UNR-S10-*` unresolved-work records remain controlling. In particular, Sprint 10 does not close:

- hosted preview or public release;
- production signing, stores, updates, monitoring, or on-call operation;
- production identity, recovery, support, abuse, or deletion;
- private Chronicle authority, storage, export, deletion, backup, or recovery;
- production House of Keys;
- production Aster or provider egress;
- analytics, research, payments, clinical operation, or connectors;
- independent accessibility, security, privacy, legal, device, affected-user, or field review;
- LI-V1 through LI-V8;
- Sprint 11 entry; or
- institutional Phase 0 exit.

These are not defects in a correctly bounded Sprint 10. They become blockers only for claims or capabilities that require them.

## Material corrections applied

This reconciliation updates current-orientation records so they no longer contradict accepted history or the Sprint 10 completion state:

- root repository README;
- canonical documentation home;
- architecture index;
- module-boundary inventory;
- public-site README;
- universal-game README;
- product index;
- roadmap index;
- current-status ledger;
- Sprint 10 completion record; and
- Sprint 10 cross-contract reconciliation.

The permanent `sprint10:check` policy now requires the mission, vision, product, incentive, prior-sprint, module, and application orientation to remain coherent and rejects the stale statements found by this audit.

## Quality conclusion

The implementation meets or exceeds the repository quality pattern established by Sprints 6 through 9:

- explicit bounded ownership;
- narrow public APIs;
- synthetic fixtures;
- focused and repository-wide validation;
- cross-contract reconciliation;
- stable controls;
- visible holdpoints and unresolved work;
- exact revision evidence;
- release and rollback separation;
- provider replacement;
- truthful certification limits; and
- a gated next-sprint handoff.

No material implementation blocker remains after canonical-status corrections.

The corrected exact candidate must pass frozen installation, formatting, documentation links, repository policy, LI policy, strengthened Sprint 10 alignment policy, economics, content, lint, typecheck, tests, production-site and rendered-prologue validation, browser/iOS/Android credential-free export, artifact evidence, generated-state cleanup, no tracked mutation, and DCO.

The final exact candidate, CI, DCO, PR review state, and founding-steward disposition are recorded in issue #80 and PR #79 after validation.

Sprint 11 remains unstarted.
"""
write("docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md", alignment)

# Root README
replace_once(
    "README.md",
    "[Documentation](docs/README.md) · [Vision](VISION.md) · [Current status](docs/roadmap/current-status.md) · [Post-Sprint 9 reconciliation](docs/roadmap/post-sprint-9-reconciliation-and-sprint-10-preparation.md) · [Sprint 9 completion](docs/roadmap/sprint-9-completion-record.md) · [Architecture](docs/architecture/README.md) · [Roadmap](ROADMAP.md) · [Governance](GOVERNANCE.md) · [Contributing](CONTRIBUTING.md)",
    "[Documentation](docs/README.md) · [Vision](VISION.md) · [Current status](docs/roadmap/current-status.md) · [Sprint 10 alignment](docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md) · [Sprint 10 completion](docs/roadmap/sprint-10-completion-record.md) · [Architecture](docs/architecture/README.md) · [Roadmap](ROADMAP.md) · [Governance](GOVERNANCE.md) · [Contributing](CONTRIBUTING.md)",
    "root navigation",
)
replace_once(
    "README.md",
    "- **See current truth:** [Current Project Status](docs/roadmap/current-status.md) → [Post-Sprint 9 Reconciliation](docs/roadmap/post-sprint-9-reconciliation-and-sprint-10-preparation.md) → [Sprint Roadmap](docs/roadmap/sprints.md)\n- **Inspect Sprint 9 evidence:** [Completion Record](docs/roadmap/sprint-9-completion-record.md) → [Cross-Contract Reconciliation](docs/architecture/public-synthetic-prologue-sprint-9-cross-contract-reconciliation.md) → [Open Holdpoints](docs/architecture/public-synthetic-prologue-sprint-9-specialist-holdpoint-and-unresolved-work-register.md)\n- **Inspect the live application boundary:** [`apps/site`](apps/site) → [Deployment Policy](apps/site/DEPLOYMENT.md)",
    "- **See current truth:** [Current Project Status](docs/roadmap/current-status.md) → [Sprint 10 Pre-Acceptance Alignment](docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md) → [Sprint Roadmap](docs/roadmap/sprints.md)\n- **Inspect Sprint 10 evidence:** [Completion Record](docs/roadmap/sprint-10-completion-record.md) → [Cross-Contract Reconciliation](docs/architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md) → [Open Holdpoints](docs/architecture/universal-game-shell-sprint-10-specialist-holdpoint-and-unresolved-work-register.md)\n- **Inspect application boundaries:** [`apps/site`](apps/site) retains the institutional site and production `/prologue`; [`apps/game`](apps/game) owns the unmerged browser, iOS, and Android universal shell",
    "root start-here orientation",
)
replace_once(
    "README.md",
    "Current governed work is:\n\n- post-Sprint 9 repository and production reconciliation under [issue #71](https://github.com/finalboss-tom/calypsos-promise/issues/71) and [draft PR #72](https://github.com/finalboss-tom/calypsos-promise/pull/72);\n- the separate Phase 0 newsletter gate [#63](https://github.com/finalboss-tom/calypsos-promise/issues/63); and\n- preparation for a dedicated pre-Sprint 10 alignment review.\n\nSprint 10 implementation has **not** started.",
    "The Sprint 10 implementation package is complete on [issue #80](https://github.com/finalboss-tom/calypsos-promise/issues/80) and [PR #79](https://github.com/finalboss-tom/calypsos-promise/pull/79). It remains unaccepted, unmerged, undeployed, undistributed, and blocked from Sprint 11 until the founding-steward gate, directed squash merge, post-merge reconciliation, and dedicated pre-Sprint 11 alignment are complete.\n\nCurrent governed work is:\n\n- final Sprint 10 pre-acceptance alignment, acceptance, and merge disposition;\n- the separate Phase 0 newsletter gate [#63](https://github.com/finalboss-tom/calypsos-promise/issues/63); and\n- the remaining specialist, succession, ownership, architecture-audit, and Phase 0 exit gates.\n\nSprint 11 remains unstarted.",
    "root current governed work",
)
insert_before(
    "README.md",
    "## Frozen foundations",
    """## Complete unmerged Sprint 10 candidate

Sprint 10 establishes the public/synthetic universal game foundation through:

- `apps/game` for browser, iOS, and Android;
- `packages/game-content` as the one earned versioned playable-content package;
- island map, Hearth, direct and narrative routes, scene/dialogue/quest presentation, and Wayfinder navigation;
- deterministic non-authoritative state;
- bounded public/synthetic offline resilience;
- an informational authentication-after-prologue boundary;
- accessibility and platform-parity contracts; and
- reproducible unsigned build, rollback, and operations evidence.

It creates no production account, private Chronicle, permission, model-provider egress, analytics, authoritative reward or progress, hosted preview, deployment, signing, store distribution, official release, LI activation, or Sprint 11 authority.

""",
    "root Sprint 10 candidate section",
)

# Documentation home
replace_once(
    "docs/README.md",
    "2. [LI-V0 Completion Candidate](roadmap/longitudinal-intelligence-li-v0-completion-record.md)\n3. [Pre-Sprint 10 Alignment Review](roadmap/pre-sprint-10-alignment-review.md)\n4. [Longitudinal Intelligence Doctrine](architecture/longitudinal-intelligence-doctrine.md)",
    "2. [Sprint 10 Pre-Acceptance Full Alignment](roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md)\n3. [Sprint 10 Completion Record](roadmap/sprint-10-completion-record.md)\n4. [Sprint 10 Cross-Contract Reconciliation](architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md)\n5. [LI-V0 Completion Record](roadmap/longitudinal-intelligence-li-v0-completion-record.md)\n6. [Accepted Pre-Sprint 10 Alignment Review](roadmap/pre-sprint-10-alignment-review.md)\n7. [Longitudinal Intelligence Doctrine](architecture/longitudinal-intelligence-doctrine.md)",
    "docs orientation beginning",
)
text = read("docs/README.md")
for old, new in [
    ("5. [Longitudinal Intelligence Staged Validation Plan]", "8. [Longitudinal Intelligence Staged Validation Plan]"),
    ("6. [LI Evidence Kernel v1]", "9. [LI Evidence Kernel v1]"),
    ("7. [LI Protected-Invariant Traceability]", "10. [LI Protected-Invariant Traceability]"),
    ("8. [LI Holdpoints and Unresolved Work]", "11. [LI Holdpoints and Unresolved Work]"),
    ("9. [LI-V0 Tracking Issue #73]", "12. [LI-V0 Tracking Issue #73]"),
    ("10. [Pre-Sprint 10 Tracking Issue #75]", "13. [Pre-Sprint 10 Tracking Issue #75]"),
    ("11. [Post-Sprint 9 Repository and Production Reconciliation]", "14. [Post-Sprint 9 Repository and Production Reconciliation]"),
    ("12. [Sprint 9 Completion Record]", "15. [Sprint 9 Completion Record]"),
    ("13. [Sprint 9 Release, Rollback, and Sprint 10 Handoff]", "16. [Sprint 9 Release, Rollback, and Sprint 10 Handoff]"),
    ("14. [Phase 0 Newsletter Gate #63]", "17. [Phase 0 Newsletter Gate #63]"),
    ("15. [Sprint Roadmap]", "18. [Sprint Roadmap]"),
    ("16. [Architecture Index]", "19. [Architecture Index]"),
    ("17. [Security Architecture]", "20. [Security Architecture]"),
    ("18. [Funding and Sponsorship Baseline]", "21. [Funding and Sponsorship Baseline]"),
    ("19. [Repository and Module Boundaries]", "22. [Repository and Module Boundaries]"),
]:
    text = text.replace(old, new, 1)
write("docs/README.md", text)
replace_once(
    "docs/README.md",
    "LI-V0 closure and the mandatory pre-Sprint 10 alignment review are implemented as a candidate on `agent/li-v0-closure-and-pre-sprint-10-alignment` under issues #73 and #75. Founding-steward acceptance remains pending.\n\nLI-V1 through LI-V8 remain inactive. Sprint 10 remains planned and not started.",
    "LI-V0 closure and the mandatory pre-Sprint 10 alignment review are accepted and merged through PR #76. LI-V0 is accepted and complete; LI-V1 through LI-V8 remain inactive.\n\nThe Sprint 10 implementation package is complete on PR #79 and has passed its workstream-level completion suite. The pre-acceptance full alignment reconciliation corrects canonical status drift and requires one new exact candidate to pass permanent validation before PR #79 returns to ready-for-review state. Sprint 10 remains unaccepted and unmerged. Sprint 11 remains unstarted.",
    "docs current LI/Sprint state",
)
replace_once(
    "docs/README.md",
    "### Pre-Sprint 10 alignment\n\nThe candidate review recommends `AUTHORIZED WITH NAMED HOLDPOINTS` for one public/synthetic universal shell:\n\n- proposed application owner: `apps/game`;\n- continuing public site and prologue owner: `apps/site`;\n- proposed shared content owner: `packages/game-content`;\n- no generic shared UI package without a second real consumer;\n- no client-authoritative progression, permission, Chronicle truth, LI claim, or reward;\n- no production authentication, analytics, private data, app-store release, or LI-V1 through LI-V8; and\n- explicit accessibility, offline, release, rollback, monitoring, incident, and provider-replacement boundaries.\n\nSprint 10 remains blocked until the candidate is accepted and squash merged.\n\n",
    "### Sprint 10 universal shell\n\nThe accepted pre-Sprint 10 review authorized one bounded public/synthetic universal shell with named holdpoints. The complete unmerged package now establishes:\n\n- `apps/game` as the browser, iOS, and Android application owner;\n- `apps/site` as the continuing institutional site, newsletter, and production `/prologue` owner;\n- `packages/game-content` as the one earned versioned public/synthetic content package;\n- no generic shared UI package without a second real consumer;\n- deterministic presentation and synthetic-session state with no client-authoritative progression, permission, Chronicle truth, LI claim, or reward;\n- bounded public/synthetic offline storage;\n- an informational, provider-free, discard-by-default account boundary;\n- explicit accessibility, release, rollback, incident, and provider-replacement evidence; and\n- no production authentication, analytics, private data, deployment, store release, or LI-V1 through LI-V8.\n\nThe package remains unaccepted, unmerged, undeployed, and undistributed until the final founding-steward gate.\n\n### Sprint 11 boundary\n\nSprint 11 remains unstarted. Its private-value-loop goal requires Sprint 10 acceptance and merge, post-merge reconciliation, and a dedicated alignment decision covering identity, private Chronicle authority, House of Keys, capture, authentication, export, deletion, backup, recovery, offline synchronization, security, privacy, accessibility, operations, providers, and specialist holdpoints.\n\n",
    "docs current product Sprint boundary",
)

# Architecture index
replace_once(
    "docs/architecture/README.md",
    "[Documentation home](../README.md) · [Frozen architecture](../frozen/architecture.md) · [Module boundaries](module-boundaries.md) · [Longitudinal Intelligence](longitudinal-intelligence-doctrine.md) · [Current status](../roadmap/current-status.md) · [Pre-Sprint 10 alignment](../roadmap/pre-sprint-10-alignment-review.md)",
    "[Documentation home](../README.md) · [Frozen architecture](../frozen/architecture.md) · [Module boundaries](module-boundaries.md) · [Longitudinal Intelligence](longitudinal-intelligence-doctrine.md) · [Current status](../roadmap/current-status.md) · [Sprint 10 alignment](../roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md) · [Sprint 10 completion](../roadmap/sprint-10-completion-record.md)",
    "architecture navigation",
)
replace_once(
    "docs/architecture/README.md",
    "- [LI-V0 Completion Candidate](../roadmap/longitudinal-intelligence-li-v0-completion-record.md)",
    "- [LI-V0 Completion Record](../roadmap/longitudinal-intelligence-li-v0-completion-record.md)",
    "LI completion label",
)
replace_once(
    "docs/architecture/README.md",
    "The doctrine is an accepted BASELINE architecture direction. The LI-V0 closure candidate adds machine-readable evidence, traceability, holdpoints, validation, and Sprint 10 inheritance. It does not activate production measurement, private-data analysis, personal experimentation, causal health claims, clinical behavior, or a production model or provider.",
    "The doctrine is an accepted BASELINE architecture direction. LI-V0 closure is accepted and complete with machine-readable evidence, traceability, holdpoints, validation, and Sprint inheritance. It does not activate production measurement, private-data analysis, personal experimentation, causal health claims, clinical behavior, or a production model or provider.",
    "LI current state",
)
insert_before(
    "docs/architecture/README.md",
    "## Sprint 9 — public synthetic prologue",
    """## Current universal game architecture

`apps/game` owns the complete unmerged Sprint 10 browser, iOS, and Android shell. `packages/game-content` owns the one earned versioned public/synthetic playable-content package. `apps/site` retains the institutional website, newsletter, and production `/prologue`.

The universal shell composes public/synthetic content, deterministic presentation and state, a bounded offline adapter, accessibility and platform contracts, and provider-neutral build evidence. It creates no private Chronicle, production identity, permission runtime, model-provider egress, analytics, authoritative reward or progression, deployment, signing, or distribution.

The [pre-acceptance alignment reconciliation](../roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md) verifies this surface against frozen mission, vision, gameplay, incentives, prior sprints, and repository quality requirements.

""",
    "architecture universal game section",
)
replace_once(
    "docs/architecture/README.md",
    "## Pre-Sprint 10 entry boundary\n\n- [Pre-Sprint 10 Alignment Review](../roadmap/pre-sprint-10-alignment-review.md)\n- [Alignment Issue #75](https://github.com/finalboss-tom/calypsos-promise/issues/75)\n\nThe candidate review recommends `AUTHORIZED WITH NAMED HOLDPOINTS` and proposes:\n\n- `apps/game` as the Expo and Expo Router universal application owner;\n- `apps/site` remaining the public site and prologue owner;\n- `packages/game-content` as one earned public/synthetic content package;\n- no generic shared UI package without a second real consumer;\n- public/synthetic local presentation and deterministic session state only;\n- no client-authoritative completion, rewards, permission, Chronicle truth, LI claims, or canonical progression;\n- discard-by-default temporary state at the future authentication boundary;\n- explicit accessibility, offline, release, rollback, monitoring, incident, and provider-replacement requirements; and\n- LI-V1 through LI-V8 remaining inactive.\n\nSprint 10 remains planned and not started until the alignment candidate is explicitly accepted and squash merged.\n\n",
    "## Accepted pre-Sprint 10 boundary\n\n- [Accepted Pre-Sprint 10 Alignment Review](../roadmap/pre-sprint-10-alignment-review.md)\n- [Alignment Issue #75](https://github.com/finalboss-tom/calypsos-promise/issues/75)\n\nThe accepted decision was `AUTHORIZED WITH NAMED HOLDPOINTS`. Sprint 10 implements that bounded direction through `apps/game`, retained `apps/site` ownership, one earned `packages/game-content` package, public/synthetic state, no client authority, discard-by-default future account handoff, accessibility and offline contracts, release separation, provider replacement, and inactive LI-V1 through LI-V8.\n\nThe complete implementation package remains unaccepted and unmerged pending the final alignment candidate, founding-steward acceptance, and directed squash merge.\n\n",
    "accepted pre-Sprint10 architecture boundary",
)

# Module boundaries
replace_once(
    "docs/architecture/module-boundaries.md",
    "[Architecture index](README.md) · [Documentation home](../README.md) · [Frozen architecture](../frozen/architecture.md) · [Current status](../roadmap/current-status.md) · [Pre-Sprint 8 review](../roadmap/pre-sprint-8-alignment-review.md)",
    "[Architecture index](README.md) · [Documentation home](../README.md) · [Frozen architecture](../frozen/architecture.md) · [Current status](../roadmap/current-status.md) · [Sprint 10 alignment](../roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md)",
    "module navigation",
)
replace_once(
    "docs/architecture/module-boundaries.md",
    "- **Reviewed baseline:** `main` at Sprint 7 squash commit `f28f054fe16d550fad37663cf234e06c5622dd42`",
    "- **Reviewed baseline:** `main` at Sprint 7 squash commit `f28f054fe16d550fad37663cf234e06c5622dd42`\n- **Current reconciliation:** Sprint 10 pre-acceptance full alignment; the baseline rules remain unchanged while the implemented application and package inventory is updated",
    "module current reconciliation",
)
replace_once(
    "docs/architecture/module-boundaries.md",
    "Current applications:\n\n- [`apps/site`](../../apps/site) — Website Track 0A public repository gateway; Sprint 8 will migrate this application in place into the public website foundation\n- [`apps/mcp-forge`](../../apps/mcp-forge) — accepted local public/synthetic contributor-tool application from Sprint 7\n\nPlanned applications such as `apps/game`, `apps/api`, and `apps/mcp-chronicle` must not be created as empty placeholders.",
    "Current applications:\n\n- [`apps/site`](../../apps/site) — accepted Next.js institutional website, newsletter surface, and production-hosted public synthetic `/prologue`\n- [`apps/game`](../../apps/game) — complete unmerged Expo / React Native / Expo Router public/synthetic browser, iOS, and Android universal shell from Sprint 10\n- [`apps/mcp-forge`](../../apps/mcp-forge) — accepted local public/synthetic contributor-tool application from Sprint 7\n\nPlanned applications such as `apps/api` and `apps/mcp-chronicle` must not be created as empty placeholders.",
    "current application inventory",
)
replace_once(
    "docs/architecture/module-boundaries.md",
    "- [`aster`](../../packages/aster) — provider-independent Aster role, proposal, source, memory, work, provider-governance, compatibility, migration, and local synthetic contracts\n\nDo not extract a website package merely because Sprint 8 introduces shared components inside `apps/site`. A package requires a second real consumer or an independently changing contract boundary.",
    "- [`aster`](../../packages/aster) — provider-independent Aster role, proposal, source, memory, work, provider-governance, compatibility, migration, and local synthetic contracts\n- [`game-content`](../../packages/game-content) — versioned public/synthetic playable-content records and deterministic validation consumed by `apps/game`; not gameplay authority, private content, or a generic UI package\n\nDo not extract a website or universal UI package merely because applications contain internal shared components. A package requires a second real consumer or an independently changing contract boundary.",
    "current package inventory",
)
replace_once(
    "docs/architecture/module-boundaries.md",
    "- fundraising transactions; or\n- Sprint 9 gameplay.",
    "- fundraising transactions;\n- the universal application shell; or\n- private or authoritative gameplay.",
    "public website exclusions",
)
insert_before(
    "docs/architecture/module-boundaries.md",
    "### Access receipts and protected audit",
    """### Universal game shell

`apps/game` owns browser, iOS, and Android presentation composition for the bounded universal shell.

It may compose:

- versioned public/synthetic game content;
- shell routes and navigation;
- scene, dialogue, quest-card, and Wayfinder presentation;
- temporary deterministic synthetic-session state;
- bounded public/synthetic offline storage;
- informational account-boundary presentation;
- accessibility and platform adapters; and
- unsigned build and operations evidence.

It does not own:

- private Chronicle truth;
- production identity, authentication, recovery, or sessions;
- House of Keys grants, receipts, or execution;
- production Aster, model providers, memory, retrieval, or tools;
- authoritative quest completion, rewards, restoration, unlocks, or progression;
- analytics, inferred preference, research, payments, clinical operation, or connectors;
- canonical public-site routes, newsletter state, or production `/prologue`; or
- deployment, signing, store distribution, official release, LI activation, or Sprint 11 authority.

`packages/game-content` supplies validated public/synthetic content. Client rendering, storage, navigation, animation, device time, and local events remain presentation evidence only.

""",
    "universal game ownership",
)
replace_once(
    "docs/architecture/module-boundaries.md",
    "## Sprint 8 boundary\n\nSprint 8 should migrate `apps/site` in place.",
    "## Historical Sprint 8 boundary\n\nSprint 8 migrated `apps/site` in place and the accepted boundary remains controlling.",
    "historical Sprint8 heading",
)
replace_once(
    "docs/architecture/module-boundaries.md",
    "It should not create:",
    "The accepted Sprint 8 change did not create:",
    "historical Sprint8 verb",
)
insert_before(
    "docs/architecture/module-boundaries.md",
    "## Pull-request review checklist",
    """## Sprint 10 boundary

Sprint 10 earned `apps/game` and `packages/game-content` because both have a current deliverable, bounded responsibility, explicit owner, public API, synthetic fixtures, focused tests, all-platform validation, operability, provider-exit behavior, and rollback boundaries.

It did not earn a generic shared UI package, backend service, production identity service, database, queue, CMS, analytics runtime, model provider, connector, deployment surface, or authoritative gameplay domain.

The [Sprint 10 pre-acceptance alignment reconciliation](../roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md) is the controlling current inventory review. Sprint 11 remains separately gated.

""",
    "module Sprint10 boundary",
)

# Site README
replace_once(
    "apps/site/README.md",
    "- [Post-Sprint 9 Repository and Production Reconciliation](../../docs/roadmap/post-sprint-9-reconciliation-and-sprint-10-preparation.md)\n- [Sprint 9 Completion Record](../../docs/roadmap/sprint-9-completion-record.md)\n- [Sprint 9 Release, Rollback, and Sprint 10 Handoff](../../docs/roadmap/sprint-9-release-rollback-and-sprint-10-handoff.md)\n- [Public Synthetic Prologue Boundary](../../docs/architecture/public-synthetic-prologue-boundary.md)\n- [Phase 0 Newsletter Gate #63](https://github.com/finalboss-tom/calypsos-promise/issues/63)\n- [Post-Sprint 9 Reconciliation Issue #71](https://github.com/finalboss-tom/calypsos-promise/issues/71)\n- [Draft Reconciliation PR #72](https://github.com/finalboss-tom/calypsos-promise/pull/72)",
    "- [Sprint 10 Pre-Acceptance Alignment](../../docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md)\n- [Sprint 10 Completion Record](../../docs/roadmap/sprint-10-completion-record.md)\n- [Sprint 10 Final Reconciliation and Sprint 11 Handoff](../../docs/roadmap/sprint-10-final-reconciliation-and-sprint-11-handoff.md)\n- [Sprint 9 Completion Record](../../docs/roadmap/sprint-9-completion-record.md)\n- [Post-Sprint 9 Repository and Production Reconciliation](../../docs/roadmap/post-sprint-9-reconciliation-and-sprint-10-preparation.md)\n- [Public Synthetic Prologue Boundary](../../docs/architecture/public-synthetic-prologue-boundary.md)\n- [Phase 0 Newsletter Gate #63](https://github.com/finalboss-tom/calypsos-promise/issues/63)\n- [Sprint 10 Issue #80](https://github.com/finalboss-tom/calypsos-promise/issues/80)\n- [Sprint 10 PR #79](https://github.com/finalboss-tom/calypsos-promise/pull/79)",
    "site controlling records",
)
replace_once(
    "apps/site/README.md",
    "## Sprint 10 boundary\n\nSprint 10 remains planned and not started. A dedicated alignment review must resolve application ownership, one browser/iOS/Android content package, cross-platform accessibility, offline and synchronization states, authentication after the prologue, authority, release, distribution, rollback, monitoring, and incident behavior before implementation begins.",
    "## Sprint 10 boundary\n\nThe complete unmerged Sprint 10 package establishes `apps/game` as the browser, iOS, and Android universal shell and `packages/game-content` as its versioned public/synthetic content source. `apps/site` retains the institutional website, newsletter, canonical public routes, and production `/prologue`.\n\nNo route ownership, public navigation, sitemap, indexing, domain, deployment, newsletter, or production-prologue state changed through Sprint 10. Any future consolidation or public game release remains a separately attributable decision with current security, accessibility, operations, and rollback evidence.\n\nSprint 11 remains unstarted.",
    "site Sprint10 boundary",
)

# Game README
replace_once(
    "apps/game/README.md",
    "- **10.8:** executable browser/iOS/Android accessibility matrix, contrast, reflow, modality alternatives, direct-path parity, and residual limitations.",
    "- **10.8:** executable browser/iOS/Android accessibility matrix, contrast, reflow, modality alternatives, direct-path parity, and residual limitations.\n- **10.9:** source-bound unsigned export evidence, closed release gates, provider replacement, incident scope, rollback, and generated-state cleanup.\n- **10.10:** cross-contract reconciliation, 60 controls, 24 holdpoints, 24 unresolved-work records, completion evidence, and bounded Sprint 11 handoff.",
    "game workstream list",
)
replace_once(
    "apps/game/README.md",
    "Production authentication, independent accessibility certification, release, and production-authority work remain separately gated. Sprint 10.7 implements only the informational account boundary, and Sprint 10.8 implements maintainer source and CI parity evidence.",
    "Production authentication, independent accessibility certification, hosted operation, release, and production-authority work remain separately gated. Sprint 10.7 implements only the informational account boundary, Sprint 10.8 implements maintainer source and CI parity evidence, Sprint 10.9 implements unsigned operations evidence, and Sprint 10.10 closes the unmerged repository package without activating Sprint 11.",
    "game current boundary paragraph",
)
replace_once(
    "apps/game/README.md",
    "| `/map`           | island map and availability orientation                   |\n| `/accessibility` | modality and platform-parity evidence                     |",
    "| `/map`           | island map and availability orientation                   |\n| `/operations`    | build, release-gate, provider-exit, incident, and rollback evidence |\n| `/accessibility` | modality and platform-parity evidence                     |",
    "game operations route",
)
replace_once(
    "apps/game/README.md",
    "pnpm --filter @calypsos-promise/game validate:accessibility-parity\n```",
    "pnpm --filter @calypsos-promise/game validate:accessibility-parity\npnpm --filter @calypsos-promise/game validate:operations\n```",
    "game focused operations command",
)
replace_once(
    "apps/game/README.md",
    "Run `validate:toolchain`, `validate:shell`, `validate:presentation`, `validate:state-authority`, `validate:offline-resilience`, `validate:authentication-boundary`, and `validate:accessibility-parity` to enforce these boundaries.",
    "Run `validate:toolchain`, `validate:shell`, `validate:presentation`, `validate:state-authority`, `validate:offline-resilience`, `validate:authentication-boundary`, `validate:accessibility-parity`, and `validate:operations` to enforce these boundaries.",
    "game validator list",
)
insert_before(
    "apps/game/README.md",
    "## Sprint 10.9 build and operations evidence",
    """## Sprint 10 completion and alignment

The complete implementation package is documented in the [Sprint 10 completion record](../../docs/roadmap/sprint-10-completion-record.md), [cross-contract reconciliation](../../docs/architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md), and [pre-acceptance full alignment reconciliation](../../docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md).

The application remains unmerged, unhosted, unsigned, undistributed, and non-authoritative. Sprint 11 remains unstarted.

""",
    "game completion section",
)

# Product index
insert_before(
    "docs/product/README.md",
    "## Product rule",
    """## Current universal-shell implementation

Sprint 10 implements the bounded public/synthetic product surface through [`apps/game`](../../apps/game) and [`packages/game-content`](../../packages/game-content). The [pre-acceptance full alignment reconciliation](../roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md) verifies the shell against the Product Constitution, Gameplay Foundation, incentive model, prior sprints, and current quality gates.

The shell preserves direct and narrative parity, refusal, deferral, discard, exit, deterministic non-authority, no-account access, provider independence, and accessibility. It intentionally creates no private Chronicle, production permission, authoritative completion, reward, restoration, progression, analytics, or secondary-use incentive.

""",
    "product current universal shell",
)

# Roadmap index
replace_once(
    "docs/roadmap/README.md",
    "[Documentation home](../README.md) · [Institutional roadmap](../../ROADMAP.md) · [Current status](current-status.md) · [Sprint 10 completion](sprint-10-completion-record.md)",
    "[Documentation home](../README.md) · [Institutional roadmap](../../ROADMAP.md) · [Current status](current-status.md) · [Sprint 10 alignment](sprint-10-pre-acceptance-alignment-reconciliation.md) · [Sprint 10 completion](sprint-10-completion-record.md)",
    "roadmap navigation alignment",
)
replace_once(
    "docs/roadmap/README.md",
    "2. [Sprint 10 Completion Record](sprint-10-completion-record.md)",
    "2. [Sprint 10 Pre-Acceptance Full Alignment](sprint-10-pre-acceptance-alignment-reconciliation.md)\n3. [Sprint 10 Completion Record](sprint-10-completion-record.md)",
    "roadmap orientation alignment",
)
text = read("docs/roadmap/README.md")
for old, new in [
    ("3. [Sprint 10 Final Reconciliation and Sprint 11 Handoff]", "4. [Sprint 10 Final Reconciliation and Sprint 11 Handoff]"),
    ("4. [Sprint 10.10 Workstream Record]", "5. [Sprint 10.10 Workstream Record]"),
    ("5. [Sprint 10 Cross-Contract Reconciliation]", "6. [Sprint 10 Cross-Contract Reconciliation]"),
    ("6. [Sprint 10 Control and Evidence Map]", "7. [Sprint 10 Control and Evidence Map]"),
    ("7. [Sprint 10 Holdpoints and Unresolved Work]", "8. [Sprint 10 Holdpoints and Unresolved Work]"),
    ("8. [Sprint 10 Tracking Issue #80]", "9. [Sprint 10 Tracking Issue #80]"),
    ("9. [Sprint 10 Pull Request #79]", "10. [Sprint 10 Pull Request #79]"),
    ("10. [LI-V0 Completion Record]", "11. [LI-V0 Completion Record]"),
    ("11. [Longitudinal Intelligence Doctrine]", "12. [Longitudinal Intelligence Doctrine]"),
    ("12. [Longitudinal Intelligence Validation Plan]", "13. [Longitudinal Intelligence Validation Plan]"),
    ("13. [Phase 0 Newsletter Gate #63]", "14. [Phase 0 Newsletter Gate #63]"),
    ("14. [Sprint Sequence]", "15. [Sprint Sequence]"),
    ("15. [Public Institutional Roadmap]", "16. [Public Institutional Roadmap]"),
]:
    text = text.replace(old, new, 1)
write("docs/roadmap/README.md", text)
replace_once(
    "docs/roadmap/README.md",
    "- [Sprint 10.1 Application and Toolchain](sprint-10.1-application-toolchain-foundation.md)",
    "- [Sprint 10 Pre-Acceptance Full Alignment](sprint-10-pre-acceptance-alignment-reconciliation.md)\n- [Sprint 10.1 Application and Toolchain](sprint-10.1-application-toolchain-foundation.md)",
    "roadmap completion package alignment",
)

# Current status and completion/cross records
replace_once(
    "docs/roadmap/current-status.md",
    "· [Sprint 10.10 final reconciliation](sprint-10.10-final-reconciliation-and-sprint-11-handoff.md) · [Sprint 10 completion](sprint-10-completion-record.md)",
    "· [Sprint 10.10 final reconciliation](sprint-10.10-final-reconciliation-and-sprint-11-handoff.md) · [Sprint 10 pre-acceptance alignment](sprint-10-pre-acceptance-alignment-reconciliation.md) · [Sprint 10 completion](sprint-10-completion-record.md)",
    "current status alignment link",
)
replace_once(
    "docs/roadmap/current-status.md",
    "- **Sprint 10 implementation package is complete and ready for founding-steward acceptance.**",
    "- **Sprint 10 implementation package is complete.**\n- **Pre-acceptance full alignment found and corrected canonical status and module-inventory drift; one new exact candidate must pass permanent validation before review readiness is restored.**",
    "current status preacceptance state",
)
insert_before(
    "docs/roadmap/sprint-10-completion-record.md",
    "## Acceptance and merge rule",
    """## Pre-acceptance full alignment

The [Sprint 10 Pre-Acceptance Full Alignment Reconciliation](sprint-10-pre-acceptance-alignment-reconciliation.md) compares the complete package against frozen mission, vision, player rights, gameplay, incentives, architecture, provider independence, operational simplicity, prior Sprints 6 through 9, LI-V0, and repository quality standards.

It found no material implementation blocker. It did find contradictory canonical orientation in repository, documentation, architecture, module, and application entry points. Those records and the permanent validator are corrected before the final acceptance candidate is restored to ready-for-review state.

""",
    "completion preacceptance section",
)
replace_once(
    "docs/roadmap/sprint-10-completion-record.md",
    "[Current status](current-status.md) · [Sprint sequence](sprints.md)",
    "[Current status](current-status.md) · [Pre-acceptance alignment](sprint-10-pre-acceptance-alignment-reconciliation.md) · [Sprint sequence](sprints.md)",
    "completion alignment link",
)
replace_once(
    "docs/architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md",
    "[Architecture index](README.md) · [Control and evidence map]",
    "[Architecture index](README.md) · [Pre-acceptance full alignment](../roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md) · [Control and evidence map]",
    "cross alignment link",
)
insert_before(
    "docs/architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md",
    "## Release classification",
    """## Pre-acceptance alignment follow-up

A later full alignment pass found no product, architecture, incentive, authority, privacy, provider, or release-boundary contradiction in this reconciliation. It did find that several canonical entry points retained obsolete current-state language from LI-V0, pre-Sprint 10, Sprint 8, or post-Sprint 9 while also linking this completion package.

The [pre-acceptance full alignment reconciliation](../roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md) corrects that status and module-inventory drift and strengthens permanent validation to reject the same contradiction class. The PR remains draft until the corrected exact candidate is green.

""",
    "cross preacceptance followup",
)

# Strengthen validator
path = "tools/policy/check-sprint-10-completion.mjs"
text = read(path)
old = """function requireText(path, content, expected) {
  if (!content.includes(expected)) {
    fail(`${path}: missing ${JSON.stringify(expected)}`);
  }
}
"""
new = """function requireText(path, content, expected) {
  if (!content.includes(expected)) {
    fail(`${path}: missing ${JSON.stringify(expected)}`);
  }
}

function requireAbsentText(path, content, forbidden) {
  if (content.includes(forbidden)) {
    fail(`${path}: contains stale or forbidden ${JSON.stringify(forbidden)}`);
  }
}
"""
if text.count(old) != 1:
    raise SystemExit("validator requireText anchor mismatch")
text = text.replace(old, new, 1)
old = """  architectureIndex: "docs/architecture/README.md",
  package: "package.json",
"""
new = """  architectureIndex: "docs/architecture/README.md",
  alignment:
    "docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md",
  rootReadme: "README.md",
  docsIndex: "docs/README.md",
  productIndex: "docs/product/README.md",
  moduleBoundaries: "docs/architecture/module-boundaries.md",
  siteReadme: "apps/site/README.md",
  gameReadme: "apps/game/README.md",
  vision: "VISION.md",
  constitution: "docs/frozen/product-constitution.md",
  architectureFoundation: "docs/frozen/architecture.md",
  gameplayFoundation: "docs/product/gameplay-foundation.md",
  incentiveModel: "docs/product/incentive-model.md",
  package: "package.json",
"""
if text.count(old) != 1:
    raise SystemExit("validator paths anchor mismatch")
text = text.replace(old, new, 1)
old = """  [
    paths.ci,
    texts.ci,
"""
new = """  [
    paths.alignment,
    texts.alignment,
    [
      "ALIGNMENT RECONCILIATION COMPLETE",
      "Mission and player promise",
      "Incentive alignment",
      "Prior-sprint inheritance",
      "Operational simplicity and developer experience",
      "Material corrections applied",
      "No material implementation blocker remains",
      "Sprint 11 remains unstarted",
    ],
  ],
  [
    paths.rootReadme,
    texts.rootReadme,
    [
      "Sprint 10 implementation package is complete",
      "Complete unmerged Sprint 10 candidate",
      "apps/game",
      "packages/game-content",
      "Sprint 11 remains unstarted",
    ],
  ],
  [
    paths.docsIndex,
    texts.docsIndex,
    [
      "Sprint 10 Pre-Acceptance Full Alignment",
      "Sprint 10 implementation package is complete",
      "Sprint 10 universal shell",
      "Sprint 11 remains unstarted",
    ],
  ],
  [
    paths.productIndex,
    texts.productIndex,
    [
      "Current universal-shell implementation",
      "pre-acceptance full alignment reconciliation",
      "deterministic non-authority",
    ],
  ],
  [
    paths.moduleBoundaries,
    texts.moduleBoundaries,
    ["apps/game", "game-content", "Universal game shell", "Sprint 10 boundary"],
  ],
  [
    paths.siteReadme,
    texts.siteReadme,
    [
      "Sprint 10 Pre-Acceptance Alignment",
      "complete unmerged Sprint 10 package",
      "apps/game",
      "Sprint 11 remains unstarted",
    ],
  ],
  [
    paths.gameReadme,
    texts.gameReadme,
    [
      "10.9",
      "10.10",
      "/operations",
      "Sprint 10 completion and alignment",
      "Sprint 11 remains unstarted",
    ],
  ],
  [
    paths.vision,
    texts.vision,
    [
      "Return useful personal value",
      "Preserve individual control",
      "Enable separately authorized collective benefit",
      "Progressive decentralization means authority follows demonstrated capacity",
    ],
  ],
  [
    paths.constitution,
    texts.constitution,
    [
      "Build your Living Chronicle. Improve your health. Keep the key.",
      "Meaningful refusal without punishment",
      "Accessible participation",
      "Evidence before expansion",
    ],
  ],
  [
    paths.architectureFoundation,
    texts.architectureFoundation,
    [
      "Universal playable client: Expo / React Native / Expo Router",
      "AI proposes. The player confirms. The domain service validates and stores.",
      "Open code never implies open production data",
    ],
  ],
  [
    paths.gameplayFoundation,
    texts.gameplayFoundation,
    [
      "The first player is **people**",
      "The player can replace, defer, or reject a route without punishment",
      "There are no broken streak punishments",
    ],
  ],
  [
    paths.incentiveModel,
    texts.incentiveModel,
    [
      "The first two loops must create a worthwhile product without requiring the third",
      "A quest must provide immediate player value",
      "punish refusal, deferral, withdrawal, correction, export, deletion, or return after interruption",
      "Engagement without increasing personal utility",
    ],
  ],
  [
    paths.ci,
    texts.ci,
"""
if text.count(old) != 1:
    raise SystemExit("validator matrix insertion anchor mismatch")
text = text.replace(old, new, 1)
old = """requireUniqueCount(
  paths.controls,
"""
new = """for (const [path, content, forbidden] of [
  [paths.rootReadme, texts.rootReadme, "Sprint 10 implementation has **not** started"],
  [paths.rootReadme, texts.rootReadme, "draft PR #72"],
  [
    paths.rootReadme,
    texts.rootReadme,
    "preparation for a dedicated pre-Sprint 10 alignment review",
  ],
  [paths.docsIndex, texts.docsIndex, "Founding-steward acceptance remains pending"],
  [paths.docsIndex, texts.docsIndex, "Sprint 10 remains planned and not started"],
  [paths.architectureIndex, texts.architectureIndex, "LI-V0 closure candidate adds"],
  [
    paths.architectureIndex,
    texts.architectureIndex,
    "Sprint 10 remains planned and not started",
  ],
  [
    paths.moduleBoundaries,
    texts.moduleBoundaries,
    "Planned applications such as `apps/game`",
  ],
  [
    paths.moduleBoundaries,
    texts.moduleBoundaries,
    "Sprint 8 will migrate this application",
  ],
  [paths.siteReadme, texts.siteReadme, "Sprint 10 remains planned and not started"],
  [paths.siteReadme, texts.siteReadme, "Draft Reconciliation PR #72"],
]) {
  requireAbsentText(path, content, forbidden);
}

requireUniqueCount(
  paths.controls,
"""
if text.count(old) != 1:
    raise SystemExit("validator forbidden anchor mismatch")
text = text.replace(old, new, 1)
old = """          directory === ".github/workflows" &&
          entry === "temp-sprint-10-10-implementation.yml";"""
new = """          directory === ".github/workflows" &&
          [
            "temp-sprint-10-10-implementation.yml",
            "temp-sprint-10-alignment-reconciliation.yml",
          ].includes(entry);"""
if text.count(old) != 1:
    raise SystemExit("validator temp allowance anchor mismatch")
text = text.replace(old, new, 1)
old = """  "Sprint 10 completion package validated: 24 findings, 60 controls, 24 holdpoints, 24 unresolved records, closed release gates, exact permanent validation requirements, and bounded Sprint 11 handoff.",
);"""
new = """  "Sprint 10 completion and alignment package validated: frozen mission and incentive inheritance, current canonical orientation, 24 findings, 60 controls, 24 holdpoints, 24 unresolved records, closed release gates, and bounded Sprint 11 handoff.",
);"""
if text.count(old) != 1:
    raise SystemExit("validator success message anchor mismatch")
text = text.replace(old, new, 1)
write(path, text)
