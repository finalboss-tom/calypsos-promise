from pathlib import Path


def replace_once(path: str, old: str, new: str) -> None:
    target = Path(path)
    content = target.read_text(encoding="utf-8")
    count = content.count(old)
    if count != 1:
        raise SystemExit(f"{path}: expected one match, found {count}: {old[:100]!r}")
    target.write_text(content.replace(old, new), encoding="utf-8")


replace_once(
    "README.md",
    "[Documentation](docs/README.md) · [Vision](VISION.md) · [Current status](docs/roadmap/current-status.md) · [Sprint 8 plan](docs/roadmap/sprint-8-execution-plan.md) · [Workstream 8.9 record](docs/roadmap/sprint-8-workstream-8-9-record.md) · [Website architecture](docs/architecture/public-website-foundation-and-migration.md)",
    "[Documentation](docs/README.md) · [Vision](VISION.md) · [Current status](docs/roadmap/current-status.md) · [Sprint 8 completion package](docs/roadmap/sprint-8-completion-record.md) · [Sprint 8 plan](docs/roadmap/sprint-8-execution-plan.md) · [Website architecture](docs/architecture/public-website-foundation-and-migration.md)",
)
replace_once(
    "README.md",
    "- **See the active work:** [Current Project Status](docs/roadmap/current-status.md) → [Sprint 8 Execution Plan](docs/roadmap/sprint-8-execution-plan.md) → [Sprint 8.9 Record](docs/roadmap/sprint-8-workstream-8-9-record.md)",
    "- **See the active work:** [Current Project Status](docs/roadmap/current-status.md) → [Sprint 8 Completion Record](docs/roadmap/sprint-8-completion-record.md) → [Release, Rollback, and Sprint 9 Handoff](docs/roadmap/sprint-8-release-rollback-and-sprint-9-handoff.md)",
)
replace_once(
    "README.md",
    "- **8.9:** permanent source and isolated local production-preview validation across routes, semantics, accessibility contracts, security headers, metadata, source authority, signup, and transfer budgets.\n\nThe initial normal 8.9 candidate `24c3c48e6358251708b56452d1fd9019bf67e08f` passed all nine CI jobs in run 1110 and DCO 1192, including production build, rendered route validation, machine-readable evidence, cleanup, and no tracked build mutation.\n\n### Next workstream: 8.10\n\nWorkstream 8.10 will reconcile controls, evidence, specialist holdpoints, unresolved work, actual release state, rollback, and the bounded Sprint 9 handoff before explicit Sprint 8 acceptance.\n\nIt will not activate signup, create a hosted release that does not exist, close Phase 0 gate #63, or begin Sprint 9 gameplay.",
    "- **8.9:** permanent source and isolated local production-preview validation across routes, semantics, accessibility contracts, security headers, metadata, source authority, signup, and transfer budgets.\n- **8.10:** cross-contract reconciliation, 36-control evidence map, 20 open holdpoints, 20 unresolved-work records, truthful release and rollback state, completion record, and bounded Sprint 9 handoff.\n\n### Sprint 8 acceptance gate\n\nThe Sprint 8 implementation package is complete and ready for explicit founding-steward acceptance. Issue #60 remains open and PR #61 remains draft and unmerged until that decision and the directed squash merge occur.\n\nNo hosted preview or production deployment is claimed. Git-triggered deployment remains disabled, Phase 0 email-signup gate #63 remains open, and Sprint 9 is planned but has not started.",
)

replace_once(
    "docs/README.md",
    "[Repository home](../README.md) · [Vision](../VISION.md) · [Roadmap](../ROADMAP.md) · [Governance](../GOVERNANCE.md) · [Current status](roadmap/current-status.md) · [Sprint 8 plan](roadmap/sprint-8-execution-plan.md) · [Workstream 8.9 record](roadmap/sprint-8-workstream-8-9-record.md) · [Website architecture](architecture/public-website-foundation-and-migration.md)",
    "[Repository home](../README.md) · [Vision](../VISION.md) · [Roadmap](../ROADMAP.md) · [Governance](../GOVERNANCE.md) · [Current status](roadmap/current-status.md) · [Sprint 8 completion package](roadmap/sprint-8-completion-record.md) · [Sprint 8 plan](roadmap/sprint-8-execution-plan.md) · [Website architecture](architecture/public-website-foundation-and-migration.md)",
)
replace_once(
    "docs/README.md",
    "1. [Current Project Status](roadmap/current-status.md)\n2. [Sprint 8 Execution Plan](roadmap/sprint-8-execution-plan.md)\n3. [Sprint 8.9 Full Website Validation Record](roadmap/sprint-8-workstream-8-9-record.md)\n4. [Sprint 8.9 Representative Implementation Review](roadmap/sprint-8-workstream-8-9-manual-review.md)\n5. [Sprint 8.8 Paused Email-Signup Record](roadmap/sprint-8-workstream-8-8-record.md)\n6. [Sprint 8.7 Roadmap, Support, and Funding Transparency Record](roadmap/sprint-8-workstream-8-7-record.md)\n7. [Sprint 8.6 Trust Center and Open Forge Record](roadmap/sprint-8-workstream-8-6-record.md)\n8. [Sprint 8.5 Laws, Experience, Interoperability, and Aster Record](roadmap/sprint-8-workstream-8-5-record.md)\n9. [Sprint 8.4 Homepage and Promise Record](roadmap/sprint-8-workstream-8-4-record.md)\n10. [Sprint 8.3 Navigation, Status, and Accessibility Record](roadmap/sprint-8-workstream-8-3-record.md)\n11. [Sprint 8.2 Next.js Shell Record](roadmap/sprint-8-workstream-8-2-record.md)\n12. [Sprint 8.1 Boundary Record](roadmap/sprint-8-workstream-8-1-record.md)\n13. [Public Website Foundation and Migration Boundary](architecture/public-website-foundation-and-migration.md)",
    "1. [Current Project Status](roadmap/current-status.md)\n2. [Sprint 8 Completion Record](roadmap/sprint-8-completion-record.md)\n3. [Sprint 8 Cross-Contract Reconciliation](architecture/public-site-sprint-8-cross-contract-reconciliation.md)\n4. [Sprint 8 Control and Evidence Map](architecture/public-site-sprint-8-control-and-evidence-map.md)\n5. [Sprint 8 Holdpoints and Unresolved Work](architecture/public-site-sprint-8-specialist-holdpoint-and-unresolved-work-register.md)\n6. [Release, Rollback, and Sprint 9 Handoff](roadmap/sprint-8-release-rollback-and-sprint-9-handoff.md)\n7. [Sprint 8 Execution Plan](roadmap/sprint-8-execution-plan.md)\n8. [Sprint 8.9 Full Website Validation Record](roadmap/sprint-8-workstream-8-9-record.md)\n9. [Sprint 8.9 Representative Implementation Review](roadmap/sprint-8-workstream-8-9-manual-review.md)\n10. [Sprint 8.8 Paused Email-Signup Record](roadmap/sprint-8-workstream-8-8-record.md)\n11. [Sprint 8.7 Roadmap, Support, and Funding Transparency Record](roadmap/sprint-8-workstream-8-7-record.md)\n12. [Sprint 8.6 Trust Center and Open Forge Record](roadmap/sprint-8-workstream-8-6-record.md)\n13. [Sprint 8.5 Laws, Experience, Interoperability, and Aster Record](roadmap/sprint-8-workstream-8-5-record.md)\n14. [Sprint 8.4 Homepage and Promise Record](roadmap/sprint-8-workstream-8-4-record.md)\n15. [Sprint 8.3 Navigation, Status, and Accessibility Record](roadmap/sprint-8-workstream-8-3-record.md)\n16. [Sprint 8.2 Next.js Shell Record](roadmap/sprint-8-workstream-8-2-record.md)\n17. [Sprint 8.1 Boundary Record](roadmap/sprint-8-workstream-8-1-record.md)\n18. [Public Website Foundation and Migration Boundary](architecture/public-website-foundation-and-migration.md)",
)
replace_once(
    "docs/README.md",
    "Sprint 8 — Public Website Foundation is active through issue #60 and draft PR #61. Workstreams 8.1 through 8.9 are complete; workstream 8.10 is next.",
    "Sprint 8 — Public Website Foundation is active through issue #60 and draft PR #61. Workstreams 8.1 through 8.10 have completed their implementation package; explicit founding-steward acceptance and squash merge remain pending.",
)
replace_once(
    "docs/README.md",
    "The initial normal 8.9 candidate `24c3c48e6358251708b56452d1fd9019bf67e08f` passed CI 1110 and DCO 1192, including permanent source validation and the isolated local production-preview evidence job.\n\nWorkstream 8.10 is next. It owns cross-contract reconciliation, control and evidence mapping, specialist holdpoints, unresolved work, actual release-state evidence, rollback, completion, and the bounded Sprint 9 handoff.\n\nThe site is not a hosted preview, official release, final signup system, accessibility certification, performance release, payment system, private support system, or private product capability. Phase 0 gate #63 remains open.",
    "The completion package records 36 stable controls, 20 open holdpoints, 20 unresolved-work items, release and rollback paths, and a bounded Sprint 9 handoff. It is ready for acceptance but does not itself accept or merge Sprint 8.\n\nThe site is not a hosted preview, official release, final signup system, accessibility certification, field-performance report, payment system, private support system, or private product capability. Deployment remains disabled, Phase 0 gate #63 remains open, and Sprint 9 is planned but not started.",
)

replace_once(
    "docs/roadmap/README.md",
    "[Documentation home](../README.md) · [Institutional roadmap](../../ROADMAP.md) · [Current status](current-status.md) · [Sprint 8 plan](sprint-8-execution-plan.md) · [Workstream 8.9 record](sprint-8-workstream-8-9-record.md)",
    "[Documentation home](../README.md) · [Institutional roadmap](../../ROADMAP.md) · [Current status](current-status.md) · [Sprint 8 completion package](sprint-8-completion-record.md) · [Sprint 8 plan](sprint-8-execution-plan.md)",
)
replace_once(
    "docs/roadmap/README.md",
    "1. [Current Project Status](current-status.md)\n2. [Sprint 8 Execution Plan](sprint-8-execution-plan.md)\n3. [Sprint 8.9 Full Website Validation Record](sprint-8-workstream-8-9-record.md)\n4. [Sprint 8.9 Representative Implementation Review](sprint-8-workstream-8-9-manual-review.md)\n5. [Sprint 8.8 Paused Email-Signup Record](sprint-8-workstream-8-8-record.md)\n6. [Sprint 8.7 Roadmap, Support, and Funding Transparency Record](sprint-8-workstream-8-7-record.md)",
    "1. [Current Project Status](current-status.md)\n2. [Sprint 8 Completion Record](sprint-8-completion-record.md)\n3. [Release, Rollback, and Sprint 9 Handoff](sprint-8-release-rollback-and-sprint-9-handoff.md)\n4. [Sprint 8 Cross-Contract Reconciliation](../architecture/public-site-sprint-8-cross-contract-reconciliation.md)\n5. [Sprint 8 Control and Evidence Map](../architecture/public-site-sprint-8-control-and-evidence-map.md)\n6. [Sprint 8 Holdpoints and Unresolved Work](../architecture/public-site-sprint-8-specialist-holdpoint-and-unresolved-work-register.md)\n7. [Sprint 8 Execution Plan](sprint-8-execution-plan.md)\n8. [Sprint 8.9 Full Website Validation Record](sprint-8-workstream-8-9-record.md)\n9. [Sprint 8.9 Representative Implementation Review](sprint-8-workstream-8-9-manual-review.md)\n10. [Sprint 8.8 Paused Email-Signup Record](sprint-8-workstream-8-8-record.md)\n11. [Sprint 8.7 Roadmap, Support, and Funding Transparency Record](sprint-8-workstream-8-7-record.md)",
)
replace_once(
    "docs/roadmap/README.md",
    "- [Sprint 8.9 Representative Review](sprint-8-workstream-8-9-manual-review.md) — founding-steward implementation review with explicit limitations",
    "- [Sprint 8.9 Representative Review](sprint-8-workstream-8-9-manual-review.md) — founding-steward implementation review with explicit limitations\n- [Sprint 8 Completion Record](sprint-8-completion-record.md) — implementation package ready for explicit acceptance; not merged or released\n- [Sprint 8 Release, Rollback, and Sprint 9 Handoff](sprint-8-release-rollback-and-sprint-9-handoff.md) — actual release state and bounded next-sprint entry",
)
replace_once(
    "docs/roadmap/README.md",
    "Workstreams 8.1 through 8.9 established the single-site boundary, accepted source-backed route family, paused signup gate, direct and narrative navigation parity, controlled status and authority views, accessibility and resilience foundations, security headers, transfer budgets, permanent source validation, isolated local production-preview CI, and representative implementation review.\n\nThe initial normal 8.9 candidate `24c3c48e6358251708b56452d1fd9019bf67e08f` passed CI 1110 and DCO 1192, including the permanent production-preview evidence job.\n\nWorkstream 8.10 is next. It owns Sprint 8 completion, cross-contract reconciliation, unresolved work, actual release-state evidence, rollback, and the bounded Sprint 9 handoff. Phase 0 signup gate #63 remains open.",
    "Workstreams 8.1 through 8.10 have produced the complete Sprint 8 implementation package: the single-site boundary, accepted route family, paused signup gate, navigation parity, controlled status and authority views, accessibility and resilience foundations, security headers, transfer budgets, permanent source and local-preview validation, cross-contract reconciliation, control map, open holdpoints, unresolved work, release and rollback record, completion record, and bounded Sprint 9 handoff.\n\nThe package is ready for explicit founding-steward acceptance. Sprint 8 remains active until PR #61 is squash merged and issue #60 is closed after verification. No hosted release exists, Phase 0 gate #63 remains open, and Sprint 9 has not started.",
)

replace_once(
    "docs/architecture/README.md",
    "[Documentation home](../README.md) · [Frozen architecture](../frozen/architecture.md) · [Module boundaries](module-boundaries.md) · [Current status](../roadmap/current-status.md) · [Sprint 8 plan](../roadmap/sprint-8-execution-plan.md) · [Workstream 8.9 record](../roadmap/sprint-8-workstream-8-9-record.md)",
    "[Documentation home](../README.md) · [Frozen architecture](../frozen/architecture.md) · [Module boundaries](module-boundaries.md) · [Current status](../roadmap/current-status.md) · [Sprint 8 completion package](../roadmap/sprint-8-completion-record.md) · [Sprint 8 plan](../roadmap/sprint-8-execution-plan.md)",
)
replace_once(
    "docs/architecture/README.md",
    "- [Sprint 8.9 Representative Implementation Review](../roadmap/sprint-8-workstream-8-9-manual-review.md)\n- [Public Website Foundation and Migration Boundary](public-website-foundation-and-migration.md)",
    "- [Sprint 8.9 Representative Implementation Review](../roadmap/sprint-8-workstream-8-9-manual-review.md)\n- [Sprint 8 Cross-Contract Reconciliation](public-site-sprint-8-cross-contract-reconciliation.md)\n- [Sprint 8 Control and Evidence Map](public-site-sprint-8-control-and-evidence-map.md)\n- [Sprint 8 Holdpoints and Unresolved Work](public-site-sprint-8-specialist-holdpoint-and-unresolved-work-register.md)\n- [Sprint 8 Completion Record](../roadmap/sprint-8-completion-record.md)\n- [Release, Rollback, and Sprint 9 Handoff](../roadmap/sprint-8-release-rollback-and-sprint-9-handoff.md)\n- [Public Website Foundation and Migration Boundary](public-website-foundation-and-migration.md)",
)
replace_once(
    "docs/architecture/README.md",
    "Workstream 8.10 is next. It may reconcile accepted website contracts, controls, evidence, holdpoints, unresolved work, actual release state, rollback, and the bounded Sprint 9 handoff. It may not close signup gate #63, claim independent or deployed verification, activate private capabilities, or begin Sprint 9 gameplay.",
    "Workstream 8.10 has produced the cross-contract reconciliation, 36-control evidence map, 20 open holdpoints, 20 unresolved-work records, truthful release and rollback record, completion record, and bounded Sprint 9 handoff. The package is ready for explicit acceptance but remains unmerged and undeployed; signup gate #63 stays open and Sprint 9 remains planned but not started.",
)

replace_once(
    "docs/roadmap/current-status.md",
    "[Repository home](../../README.md) · [Documentation home](../README.md) · [Sprint 8 plan](sprint-8-execution-plan.md) · [Workstream 8.9 record](sprint-8-workstream-8-9-record.md)",
    "[Repository home](../../README.md) · [Documentation home](../README.md) · [Sprint 8 completion package](sprint-8-completion-record.md) · [Sprint 8 plan](sprint-8-execution-plan.md)",
)
replace_once(
    "docs/roadmap/current-status.md",
    "- **Completed workstreams:** 8.1 through 8.9\n- **Next workstream:** 8.10 — Completion, release evidence, and Sprint 9 handoff",
    "- **Implementation workstreams:** 8.1 through 8.10 complete\n- **Next action:** explicit founding-steward acceptance and directed squash merge of PR #61; not yet accepted or merged",
)
replace_once(
    "docs/roadmap/current-status.md",
    "## Current public website surface",
    "## Workstream 8.10 — completion package ready for acceptance\n\nWorkstream 8.10 established:\n\n- cross-contract reconciliation across product, canon, architecture, Chronicle, permission, Aster, Forge, gameplay, provider, funding, support, signup, security, accessibility, performance, metadata, publication, operations, institutional, and Sprint 9 boundaries;\n- thirty-six stable control objectives with explicit evidence levels and revalidation triggers;\n- twenty open specialist, production, release, measurement, implementation, and institutional holdpoints;\n- twenty unresolved-work records;\n- truthful release classification: repository implementation with isolated local-preview evidence, not hosted or officially released;\n- merge, hosted preview, production cutover, and official release as separate attributable decisions;\n- rollback paths before merge, after merge, for hosted preview, and for official cutover;\n- no Sprint 8 database, active signup, payment, provider, private Chronicle, or transaction migration to reverse;\n- a completion record ready for explicit founding-steward acceptance; and\n- a bounded Sprint 9 handoff requiring acceptance, squash merge, issue closure, post-merge reconciliation, and a dedicated pre-Sprint 9 review.\n\nThe implementation package is complete, but Sprint 8 remains active. Issue #60 stays open and PR #61 stays draft and unmerged until explicit acceptance and squash merge. Git-triggered deployment remains disabled, signup gate #63 remains open, no hosted release exists, and Sprint 9 is planned but not started.\n\nThe controlling evidence is [Sprint 8 Completion Record](sprint-8-completion-record.md), [Cross-Contract Reconciliation](../architecture/public-site-sprint-8-cross-contract-reconciliation.md), [Control and Evidence Map](../architecture/public-site-sprint-8-control-and-evidence-map.md), [Holdpoints and Unresolved Work](../architecture/public-site-sprint-8-specialist-holdpoint-and-unresolved-work-register.md), and [Release, Rollback, and Sprint 9 Handoff](sprint-8-release-rollback-and-sprint-9-handoff.md).\n\n## Current public website surface",
)
replace_once(
    "docs/roadmap/current-status.md",
    "## Next workstream\n\nWorkstream 8.10 may now complete the Sprint 8 evidence package through:\n\n- cross-contract reconciliation across route, authority, security, accessibility, performance, funding, support, and signup boundaries;\n- a control and evidence map;\n- a specialist-holdpoint and unresolved-work register;\n- completion, release-state, rollback, and Sprint 9 handoff records;\n- truthful disposition of hosted preview, production cutover, and official-release evidence according to what actually exists; and\n- final repository, issue, and pull-request reconciliation before explicit founding-steward acceptance.\n\nIt must preserve Phase 0 gate #63, every independent-review limitation, disabled Git-triggered deployment, private-data boundaries, and permanent Sprint 8 non-scope.\n\nIt may not convert local preview evidence into a hosted release, close Sprint 8 without explicit acceptance, activate signup, or begin Sprint 9 gameplay.",
    "## Acceptance and merge gate\n\nThe next decision is whether the founding steward accepts Sprint 8 at the bounded repository implementation, deterministic validation, isolated local-preview, measured-transfer, and representative implementation-review evidence level.\n\nIf accepted, PR #61 may be squash merged, issue #60 may be closed after the squash commit is verified, and a post-merge reconciliation may begin. Merge does not deploy the site, close gate #63, establish independent certification, complete institutional Phase 0, or start Sprint 9.\n\nUntil explicit direction is given, the PR remains draft and unmerged, the issue remains open, deployment remains disabled, and Sprint 9 remains planned but not started.",
)
replace_once(
    "docs/roadmap/current-status.md",
    "- [`apps/site`](../../apps/site) — validated source-backed public website foundation through workstream 8.9 with permanent local-preview CI; not deployed",
    "- [`apps/site`](../../apps/site) — Sprint 8 implementation package complete and ready for explicit acceptance, with permanent local-preview CI; not merged, deployed, or officially released",
)
replace_once(
    "docs/roadmap/current-status.md",
    "Before Phase 0 can close, the project still requires key-person and succession records, founder-reserved-power and economic-dependency records, historical governance-source recovery, branch-protection evidence, DCO transition, clean-machine measurements, distributed ownership planning, Decision 0009 disposition, a named specialist-review strategy, the human-readable and machine-readable architecture audit, and an explicit Phase 0 exit review.",
    "Before Phase 0 can close, the project still requires email-signup disposition gate #63, key-person and succession records, founder-reserved-power and economic-dependency records, historical governance-source recovery, branch-protection evidence, DCO transition, clean-machine measurements, distributed ownership planning, Decision 0009 disposition, a named specialist-review strategy, the human-readable and machine-readable architecture audit, and an explicit Phase 0 exit review.",
)

replace_once(
    "docs/roadmap/sprint-8-execution-plan.md",
    "[Documentation home](../README.md) · [Roadmap index](README.md) · [Current status](current-status.md) · [Workstream 8.9 record](sprint-8-workstream-8-9-record.md)",
    "[Documentation home](../README.md) · [Roadmap index](README.md) · [Current status](current-status.md) · [Sprint 8 completion package](sprint-8-completion-record.md)",
)
replace_once(
    "docs/roadmap/sprint-8-execution-plan.md",
    "- **Status:** ACTIVE — workstreams 8.1 through 8.9 complete; workstream 8.10 next",
    "- **Status:** IMPLEMENTATION PACKAGE COMPLETE — ready for explicit founding-steward acceptance; not accepted, merged, deployed, released, or closed",
)
replace_once(
    "docs/roadmap/sprint-8-execution-plan.md",
    "- [ ] **8.10 — Completion, release evidence, and Sprint 9 handoff — NEXT**",
    "- [x] **8.10 — Completion, release evidence, and Sprint 9 handoff**\n- [ ] **Explicit founding-steward acceptance and squash merge**",
)
replace_once(
    "docs/roadmap/sprint-8-execution-plan.md",
    "## 8.10 — completion, release evidence, and Sprint 9 handoff — NEXT\n\nDeliverables:\n\n- cross-contract reconciliation;\n- control and evidence map;\n- specialist holdpoints and unresolved-work register;\n- completion record;\n- preview, cutover, rollback, and official-release evidence appropriate to the actual deployment state;\n- current-status and navigation reconciliation; and\n- bounded Sprint 9 handoff.\n\nSprint 8 closes only through explicit founding-steward acceptance and squash merge.\n\n## Sprint-level acceptance criteria\n\nThe sprint does not close until:\n\n- live, experimental, planned, and long-horizon claims are visually distinct;\n- all essential information is accessible without animation or story traversal;\n- core pages pass defined accessibility and performance baselines;\n- funding displays derive from canonical public economics records rather than an independent website sponsor model;\n- the consumer-first explanation remains accurate, provider-respectful, and does not represent provider, EHR, connector, clinical, or enterprise capability as live;\n- sponsor and partner recognition remains separate from recommendation, connector ranking, clinical endorsement, permission, safety, and health guidance; and\n- no donation, sponsorship, checkout, payment, charitable, tax-deductible, nonprofit, or public-benefit transaction claim activates without accepted operational evidence.",
    "## 8.10 result — completion package and bounded handoff\n\nWorkstream 8.10 established the [Cross-Contract Reconciliation](../architecture/public-site-sprint-8-cross-contract-reconciliation.md), [Control and Evidence Map](../architecture/public-site-sprint-8-control-and-evidence-map.md), [Specialist Holdpoints and Unresolved Work](../architecture/public-site-sprint-8-specialist-holdpoint-and-unresolved-work-register.md), [Completion Record](sprint-8-completion-record.md), and [Release, Rollback, and Sprint 9 Handoff](sprint-8-release-rollback-and-sprint-9-handoff.md).\n\nThe package records 36 controls, 20 open holdpoints, and 20 unresolved-work items. It states the actual release condition—repository and isolated local-preview evidence only, no hosted release—and keeps merge, preview, production cutover, official release, signup gate #63, Phase 0 exit, and Sprint 9 start as separate gates.\n\n## Sprint-level readiness conclusion\n\nThe implementation package supports every Sprint 8 acceptance criterion at the repository implementation, deterministic source-validation, isolated local-production-preview, measured-transfer, and founding-steward representative-review level. Independent, hosted, deployed, affected-user, assistive-technology, and field evidence remain explicit open holdpoints rather than being silently claimed.\n\nSprint 8 closes only through explicit founding-steward acceptance and squash merge.",
)

replace_once(
    "apps/site/README.md",
    "Sprint 8 — Public Website Foundation is active through issue #60 and draft PR #61. Workstreams 8.1 through 8.9 are complete; workstream 8.10 is next.",
    "Sprint 8 — Public Website Foundation is active through issue #60 and draft PR #61. Workstreams 8.1 through 8.10 have completed their implementation package; explicit founding-steward acceptance and squash merge remain pending.",
)
replace_once(
    "apps/site/README.md",
    "- [Workstream 8.9 Record](../../docs/roadmap/sprint-8-workstream-8-9-record.md)\n- [Current Project Status](../../docs/roadmap/current-status.md)",
    "- [Sprint 8 Completion Record](../../docs/roadmap/sprint-8-completion-record.md)\n- [Cross-Contract Reconciliation](../../docs/architecture/public-site-sprint-8-cross-contract-reconciliation.md)\n- [Control and Evidence Map](../../docs/architecture/public-site-sprint-8-control-and-evidence-map.md)\n- [Holdpoints and Unresolved Work](../../docs/architecture/public-site-sprint-8-specialist-holdpoint-and-unresolved-work-register.md)\n- [Release, Rollback, and Sprint 9 Handoff](../../docs/roadmap/sprint-8-release-rollback-and-sprint-9-handoff.md)\n- [Current Project Status](../../docs/roadmap/current-status.md)",
)
replace_once(
    "apps/site/README.md",
    "## What is not implemented",
    "## Sprint 8 completion package\n\nThe repository now includes cross-contract reconciliation, 36 stable controls, 20 open holdpoints, 20 unresolved-work records, truthful release and rollback paths, and a bounded Sprint 9 handoff. The package is ready for explicit acceptance but remains unmerged and undeployed.\n\nPR #61 remains draft, issue #60 remains open, deployment remains disabled, Phase 0 signup gate #63 remains open, and Sprint 9 remains planned but not started.\n\n## What is not implemented",
)
replace_once(
    "apps/site/README.md",
    "Workstream 8.8 records the paused no-intake email state and Phase 0 gate #63. The initial normal 8.9 candidate `24c3c48e6358251708b56452d1fd9019bf67e08f` passed CI 1110 and DCO 1192, including the permanent production-preview validation job and representative review record.\n\nThis evidence does not prove preview deployment, official release, deployed headers or caching, accessibility conformance, performance targets, provider integration, clinical safety, production AI, or production readiness.",
    "Workstream 8.8 records the paused no-intake email state and Phase 0 gate #63. Workstream 8.9 established permanent source and local-preview validation. Workstream 8.10 records the reconciliation, controls, open holdpoints, unresolved work, release and rollback state, completion readiness, and bounded Sprint 9 handoff.\n\nThis evidence does not prove hosted deployment, official release, deployed headers or caching, accessibility conformance, assistive-technology or affected-user validation, field performance, provider integration, clinical safety, production AI, or production readiness.",
)

print("Sprint 8.10 status reconciliation applied successfully.")
