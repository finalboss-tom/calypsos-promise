from pathlib import Path


def edit(path: str, replacements: list[tuple[str, str]]) -> None:
    file = Path(path)
    text = file.read_text(encoding="utf-8")
    for old, new in replacements:
        count = text.count(old)
        if count != 1:
            raise SystemExit(
                f"{path}: expected one match, found {count}: {old[:120]!r}"
            )
        text = text.replace(old, new, 1)
    file.write_text(text, encoding="utf-8")


edit(
    "docs/roadmap/current-status.md",
    [
        (
            "[Workstream 8.7 record](sprint-8-workstream-8-7-record.md)",
            "[Workstream 8.9 record](sprint-8-workstream-8-9-record.md)",
        ),
        (
            "- **Completed workstreams:** 8.1 through 8.7\n- **Next workstream:** 8.8 — Signup preserve-or-retire decision and bounded implementation",
            "- **Completed workstreams:** 8.1 through 8.9\n- **Next workstream:** 8.10 — Completion, release evidence, and Sprint 9 handoff",
        ),
        (
            "- **Website runtime:** validated Next.js App Router site with homepage, Promise, Seven Laws, How It Works, consumer-first, Aster, Trust Center, Open Forge, roadmap, support, funding transparency, navigation, status, and accessibility foundations; not deployed or officially released",
            "- **Website runtime:** validated Next.js App Router site with the accepted public route family, permanent source checks, isolated local production-preview validation, explicit transfer budgets, and representative implementation review; not deployed or officially released",
        ),
        (
            "The controlling evidence is [Sprint 8.7 Record](sprint-8-workstream-8-7-record.md).\n\n## Current public website surface",
            """The controlling evidence is [Sprint 8.7 Record](sprint-8-workstream-8-7-record.md).

## Workstream 8.8 — validated paused email-signup disposition

Workstream 8.8 established:

- the public newsletter or waitlist route remains paused and no-intake for Sprint 8;
- `POST /api/join` remains `503 SIGNUP_MIGRATION_PAUSED` without parsing, storing, forwarding, cookies, a provider, webhook, database, or private destination;
- `/privacy` and `/joined` truthfully explain the interim state;
- the final safe activation-or-retirement decision is Phase 0 gate [#63](https://github.com/finalboss-tom/calypsos-promise/issues/63); and
- the surface cannot become game registration, account creation, health-data intake, research enrollment, provider intake, donation processing, or an undeclared marketing database.

The controlling evidence is [Sprint 8.8 Record](sprint-8-workstream-8-8-record.md).

## Workstream 8.9 — validated accessibility, performance, security, route, metadata, and authority baseline

Workstream 8.9 established:

- one versioned release contract for thirteen accepted routes, indexing behavior, security headers, CSP directives, contrast pairs, secret patterns, and transfer budgets;
- permanent source validation in the ordinary site lint command;
- a permanent CI job that builds and serves an isolated local production preview, validates rendered routes and supporting surfaces, uploads machine-readable evidence, removes generated state, and proves no tracked mutation;
- route, heading, ID, label, alternative-text, canonical, sitemap, robots, 404, API-method, asset-cache, funding-authority, signup, and runtime-resource checks;
- explicit HTML, JavaScript, CSS, image, zero-font, total-transfer, and request-count budgets;
- a representative founding-steward implementation review with independent-review and affected-user limitations; and
- a permanent evidence boundary that local validation is not hosted deployment, field performance, independent certification, or production readiness.

The initial normal validation candidate `24c3c48e6358251708b56452d1fd9019bf67e08f` passed CI 1110 and DCO 1192, including all nine CI jobs and the new production-preview evidence job.

The controlling evidence is [Sprint 8.9 Record](sprint-8-workstream-8-9-record.md), [Review Protocol](sprint-8-workstream-8-9-review-protocol.md), and [Representative Review](sprint-8-workstream-8-9-manual-review.md).

## Current public website surface""",
        ),
        (
            "- deterministic build, validation, typecheck, and focused tests.",
            "- permanent source validation, production builds, isolated local production-preview evidence, transfer budgets, typecheck, and tests.",
        ),
        (
            "- final signup disposition;\n- representative accessibility review or certification;\n- defined route-level performance release evidence;\n- preview or official production deployment; or",
            "- final email-signup activation or retirement, which remains Phase 0 gate #63;\n- independent accessibility certification, assistive-technology or affected-user validation, field performance, or deployed verification;\n- hosted preview or official production deployment; or",
        ),
        (
            """## Next workstream

Workstream 8.8 must choose one evidence-backed signup path:

1. preserve `/api/join`, `/privacy`, and `/joined` only with an approved provider or custody route, narrow purpose, retention, unsubscribe, correction, deletion, proxy-trust, abuse-control, incident, privacy, and rollback evidence; or
2. retire the signup surface and direct visitors to public repository-following and contribution paths until those gates can be met.

It must preserve the accepted page family, public/private information separation, canonical source authority, server-rendered essential information, accessibility and resilience foundations, disabled deployment, funding neutrality, and every permanent Sprint 8 boundary.

The signup surface may not become account creation, health-data intake, research enrollment, donation processing, provider intake, or an undeclared marketing database.""",
            """## Next workstream

Workstream 8.10 may now complete the Sprint 8 evidence package through:

- cross-contract reconciliation across route, authority, security, accessibility, performance, funding, support, and signup boundaries;
- a control and evidence map;
- a specialist-holdpoint and unresolved-work register;
- completion, release-state, rollback, and Sprint 9 handoff records;
- truthful disposition of hosted preview, production cutover, and official-release evidence according to what actually exists; and
- final repository, issue, and pull-request reconciliation before explicit founding-steward acceptance.

It must preserve Phase 0 gate #63, every independent-review limitation, disabled Git-triggered deployment, private-data boundaries, and permanent Sprint 8 non-scope.

It may not convert local preview evidence into a hosted release, close Sprint 8 without explicit acceptance, activate signup, or begin Sprint 9 gameplay.""",
        ),
        (
            "- [`apps/site`](../../apps/site) — validated source-backed public website foundation through workstream 8.7; not deployed",
            "- [`apps/site`](../../apps/site) — validated source-backed public website foundation through workstream 8.9 with permanent local-preview CI; not deployed",
        ),
    ],
)

edit(
    "docs/roadmap/sprint-8-execution-plan.md",
    [
        (
            "[Workstream 8.7 record](sprint-8-workstream-8-7-record.md)",
            "[Workstream 8.9 record](sprint-8-workstream-8-9-record.md)",
        ),
        (
            "- **Status:** ACTIVE — workstreams 8.1 through 8.7 complete; workstream 8.8 next",
            "- **Status:** ACTIVE — workstreams 8.1 through 8.9 complete; workstream 8.10 next",
        ),
        (
            "- [ ] **8.8 — Signup disposition and bounded implementation — NEXT**\n- [ ] **8.9 — Accessibility, performance, security, route, and authority validation**\n- [ ] **8.10 — Completion, release evidence, and Sprint 9 handoff**",
            "- [x] **8.8 — Paused signup disposition and Phase 0 gate**\n- [x] **8.9 — Accessibility, performance, security, route, and authority validation**\n- [ ] **8.10 — Completion, release evidence, and Sprint 9 handoff — NEXT**",
        ),
        (
            """## 8.8 — signup disposition and bounded implementation — NEXT

Choose one evidence-backed path:

1. preserve `/api/join`, `/privacy`, and `/joined` with published provider, purpose, retention, unsubscribe, correction, deletion, proxy-trust, abuse-control, incident, and rollback behavior; or
2. retire the signup surface and redirect visitors to public repository-following paths until those gates can be met.

The signup surface cannot become account creation, health-data intake, research enrollment, donation processing, or an undeclared marketing database.

## 8.9 — accessibility, performance, security, route, and authority validation

Deliverables:

- semantic and landmark checks;
- keyboard, focus, label, reading-order, contrast, reduced-motion, responsive, image-failure, and low-bandwidth checks;
- automated accessibility checks and representative manual review record;
- page, JavaScript, image, and font budgets;
- route and redirect checks;
- security-header and secret-leakage checks;
- metadata, canonical URL, sitemap, robots, not-found, and error checks;
- status and funding source-authority checks;
- signup checks for the selected disposition;
- full repository validation; and
- preview evidence without claiming independent certification.

## 8.10 — completion, release evidence, and Sprint 9 handoff""",
            """## 8.8 result — paused email signup and Phase 0 gate

Workstream 8.8 preserves `/api/join`, `/privacy`, and `/joined` in a deliberate paused, no-intake compatibility state for Sprint 8. No provider, parser, storage, forwarding, cookie, webhook, database, account, or private destination is active.

The final safe activation-or-retirement decision is Phase 0 gate [#63](https://github.com/finalboss-tom/calypsos-promise/issues/63). Sprint 8 may complete with the interim state, but institutional Phase 0 cannot close until that gate is accepted and implemented.

The controlling evidence is [Sprint 8.8 Record](sprint-8-workstream-8-8-record.md).

## 8.9 result — full website validation

Workstream 8.9 establishes permanent source checks and a permanent isolated local production-preview CI job covering all thirteen accepted routes, semantics, focus and labels, metadata, canonical URLs, sitemap, robots, 404 behavior, security headers, nonce CSP, source authority, funding and support boundaries, paused signup, runtime resources, secret patterns, and explicit transfer budgets.

The initial normal candidate `24c3c48e6358251708b56452d1fd9019bf67e08f` passed CI 1110 and DCO 1192. The production-preview evidence recorded zero failures, thirteen 200 route responses, 404 not-found behavior, 503/405 signup behavior, zero web-font bytes, a largest total route transfer of 850,159 bytes, and all accepted solid token pairs above 7:1.

The [Representative Implementation Review](sprint-8-workstream-8-9-manual-review.md) passes at founding-steward implementation-review level while preserving explicit independent, assistive-technology, affected-user, deployed, and field-performance limitations.

The controlling evidence is [Sprint 8.9 Record](sprint-8-workstream-8-9-record.md) and [Review Protocol](sprint-8-workstream-8-9-review-protocol.md).

## 8.10 — completion, release evidence, and Sprint 9 handoff — NEXT""",
        ),
    ],
)

edit(
    "README.md",
    [
        (
            "[Workstream 8.7 record](docs/roadmap/sprint-8-workstream-8-7-record.md)",
            "[Workstream 8.9 record](docs/roadmap/sprint-8-workstream-8-9-record.md)",
        ),
        (
            "[Sprint 8.7 Record](docs/roadmap/sprint-8-workstream-8-7-record.md)",
            "[Sprint 8.9 Record](docs/roadmap/sprint-8-workstream-8-9-record.md)",
        ),
        (
            """- **8.7:** source-backed roadmap and capability views, public-safe support routing, and build-time canonical funding-register transparency with honest empty states and transactions disabled.

The 8.7 focused candidate `f39176f5f3a842e89ff4681f1d9810a9f2f305cf` passed formatting, the production site build, site lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.

### Next workstream: 8.8

Workstream 8.8 will make the explicit signup preserve-or-retire decision and implement only the accepted bounded path.

It will not turn signup into account creation, health-data intake, research enrollment, donation processing, provider intake, or an undeclared marketing database.""",
            """- **8.7:** source-backed roadmap and capability views, public-safe support routing, and build-time canonical funding-register transparency with honest empty states and transactions disabled.
- **8.8:** deliberate paused, no-intake public email-signup state for Sprint 8 with final activation-or-retirement tracked by Phase 0 gate #63.
- **8.9:** permanent source and isolated local production-preview validation across routes, semantics, accessibility contracts, security headers, metadata, source authority, signup, and transfer budgets.

The initial normal 8.9 candidate `24c3c48e6358251708b56452d1fd9019bf67e08f` passed all nine CI jobs in run 1110 and DCO 1192, including production build, rendered route validation, machine-readable evidence, cleanup, and no tracked build mutation.

### Next workstream: 8.10

Workstream 8.10 will reconcile controls, evidence, specialist holdpoints, unresolved work, actual release state, rollback, and the bounded Sprint 9 handoff before explicit Sprint 8 acceptance.

It will not activate signup, create a hosted release that does not exist, close Phase 0 gate #63, or begin Sprint 9 gameplay.""",
        ),
        (
            "- production-build, lint, typecheck, validator, and focused-test evidence.",
            "- permanent source validation and isolated local production-preview evidence with explicit transfer budgets.",
        ),
        (
            "It does not yet provide a final signup disposition, representative accessibility review, route-level performance release evidence, preview deployment, official production cutover, or any private product capability.",
            "It does not yet provide final email-signup activation or retirement, independent accessibility certification or affected-user validation, a hosted preview, official production cutover, or any private product capability.",
        ),
    ],
)

old_docs_orientation = """1. [Current Project Status](roadmap/current-status.md)
2. [Sprint 8 Execution Plan](roadmap/sprint-8-execution-plan.md)
3. [Sprint 8.7 Roadmap, Support, and Funding Transparency Record](roadmap/sprint-8-workstream-8-7-record.md)
4. [Sprint 8.6 Trust Center and Open Forge Record](roadmap/sprint-8-workstream-8-6-record.md)
5. [Sprint 8.5 Laws, Experience, Interoperability, and Aster Record](roadmap/sprint-8-workstream-8-5-record.md)
6. [Sprint 8.4 Homepage and Promise Record](roadmap/sprint-8-workstream-8-4-record.md)
7. [Sprint 8.3 Navigation, Status, and Accessibility Record](roadmap/sprint-8-workstream-8-3-record.md)
8. [Sprint 8.2 Next.js Shell Record](roadmap/sprint-8-workstream-8-2-record.md)
9. [Sprint 8.1 Boundary Record](roadmap/sprint-8-workstream-8-1-record.md)
10. [Public Website Foundation and Migration Boundary](architecture/public-website-foundation-and-migration.md)
11. [Pre-Sprint 8 Alignment Review](roadmap/pre-sprint-8-alignment-review.md)
12. [Sprint Roadmap](roadmap/sprints.md)
13. [Sprint 7 Completion Record](roadmap/sprint-7-completion-record.md)
14. [Sprint 7 Cross-Contract Reconciliation](architecture/forge-sprint-7-cross-contract-reconciliation.md)
15. [Sprint 7 Control and Evidence Map](architecture/forge-sprint-7-control-and-evidence-map.md)
16. [Sprint 7 Specialist Holdpoints and Unresolved Work](architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)
17. [Sprint 6 Completion Record](roadmap/sprint-6-completion-record.md)
18. [Aster Contract Baseline](product/aster-contract-baseline.md)
19. [Security Architecture](security/README.md)
20. [Phase 0 Funding and Sponsorship Baseline](economics/README.md)
21. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](decisions/0010-consumer-first-provider-independent-boundary.md)
22. [Decision 0011 — Operational Simplicity and Durable Workflows](decisions/0011-operational-simplicity-and-durable-workflows.md)
23. [Repository and Module Boundaries](architecture/module-boundaries.md)
24. [Developer Experience and Operability Policy](policies/developer-experience-and-operability.md)
25. [Minimum Viable Validation](policies/minimum-viable-validation.md)
26. [Decision 0009 — Health Data Legacy and Post-Mortem Stewardship](decisions/0009-health-data-legacy-and-post-mortem-stewardship.md) — proposed future boundary"""
new_docs_orientation = """1. [Current Project Status](roadmap/current-status.md)
2. [Sprint 8 Execution Plan](roadmap/sprint-8-execution-plan.md)
3. [Sprint 8.9 Full Website Validation Record](roadmap/sprint-8-workstream-8-9-record.md)
4. [Sprint 8.9 Representative Implementation Review](roadmap/sprint-8-workstream-8-9-manual-review.md)
5. [Sprint 8.8 Paused Email-Signup Record](roadmap/sprint-8-workstream-8-8-record.md)
6. [Sprint 8.7 Roadmap, Support, and Funding Transparency Record](roadmap/sprint-8-workstream-8-7-record.md)
7. [Sprint 8.6 Trust Center and Open Forge Record](roadmap/sprint-8-workstream-8-6-record.md)
8. [Sprint 8.5 Laws, Experience, Interoperability, and Aster Record](roadmap/sprint-8-workstream-8-5-record.md)
9. [Sprint 8.4 Homepage and Promise Record](roadmap/sprint-8-workstream-8-4-record.md)
10. [Sprint 8.3 Navigation, Status, and Accessibility Record](roadmap/sprint-8-workstream-8-3-record.md)
11. [Sprint 8.2 Next.js Shell Record](roadmap/sprint-8-workstream-8-2-record.md)
12. [Sprint 8.1 Boundary Record](roadmap/sprint-8-workstream-8-1-record.md)
13. [Public Website Foundation and Migration Boundary](architecture/public-website-foundation-and-migration.md)
14. [Pre-Sprint 8 Alignment Review](roadmap/pre-sprint-8-alignment-review.md)
15. [Sprint Roadmap](roadmap/sprints.md)
16. [Sprint 7 Completion Record](roadmap/sprint-7-completion-record.md)
17. [Sprint 7 Cross-Contract Reconciliation](architecture/forge-sprint-7-cross-contract-reconciliation.md)
18. [Sprint 7 Control and Evidence Map](architecture/forge-sprint-7-control-and-evidence-map.md)
19. [Sprint 7 Specialist Holdpoints and Unresolved Work](architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)
20. [Sprint 6 Completion Record](roadmap/sprint-6-completion-record.md)
21. [Aster Contract Baseline](product/aster-contract-baseline.md)
22. [Security Architecture](security/README.md)
23. [Phase 0 Funding and Sponsorship Baseline](economics/README.md)
24. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](decisions/0010-consumer-first-provider-independent-boundary.md)
25. [Decision 0011 — Operational Simplicity and Durable Workflows](decisions/0011-operational-simplicity-and-durable-workflows.md)
26. [Repository and Module Boundaries](architecture/module-boundaries.md)
27. [Developer Experience and Operability Policy](policies/developer-experience-and-operability.md)
28. [Minimum Viable Validation](policies/minimum-viable-validation.md)
29. [Decision 0009 — Health Data Legacy and Post-Mortem Stewardship](decisions/0009-health-data-legacy-and-post-mortem-stewardship.md) — proposed future boundary"""

edit(
    "docs/README.md",
    [
        (
            "[Workstream 8.7 record](roadmap/sprint-8-workstream-8-7-record.md)",
            "[Workstream 8.9 record](roadmap/sprint-8-workstream-8-9-record.md)",
        ),
        (old_docs_orientation, new_docs_orientation),
        (
            "Workstreams 8.1 through 8.7 are complete; workstream 8.8 is next.",
            "Workstreams 8.1 through 8.9 are complete; workstream 8.10 is next.",
        ),
        (
            "- focused production-build and repository validation evidence.",
            "- permanent source validation, isolated local production-preview evidence, explicit route budgets, and a representative implementation review.",
        ),
        (
            "The 8.7 focused candidate `f39176f5f3a842e89ff4681f1d9810a9f2f305cf` passed formatting, the production site build, site lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.",
            "The initial normal 8.9 candidate `24c3c48e6358251708b56452d1fd9019bf67e08f` passed CI 1110 and DCO 1192, including permanent source validation and the isolated local production-preview evidence job.",
        ),
        (
            "Workstream 8.8 is next. It owns the explicit signup preserve-or-retire decision and the bounded implementation of the accepted path.",
            "Workstream 8.10 is next. It owns cross-contract reconciliation, control and evidence mapping, specialist holdpoints, unresolved work, actual release-state evidence, rollback, completion, and the bounded Sprint 9 handoff.",
        ),
        (
            "The site is not a preview deployment, official release, final signup system, accessibility certification, performance release, payment system, private support system, or private product capability.",
            "The site is not a hosted preview, official release, final signup system, independent accessibility certification, affected-user validation, field-performance study, payment system, private support system, or private product capability. Phase 0 gate #63 remains open.",
        ),
    ],
)

old_roadmap_orientation = """1. [Current Project Status](current-status.md)
2. [Sprint 8 Execution Plan](sprint-8-execution-plan.md)
3. [Sprint 8.7 Roadmap, Support, and Funding Transparency Record](sprint-8-workstream-8-7-record.md)
4. [Sprint 8.6 Trust Center and Open Forge Record](sprint-8-workstream-8-6-record.md)
5. [Sprint 8.5 Laws, Experience, Interoperability, and Aster Record](sprint-8-workstream-8-5-record.md)
6. [Sprint 8.4 Homepage and Promise Record](sprint-8-workstream-8-4-record.md)
7. [Sprint 8.3 Navigation, Status, and Accessibility Record](sprint-8-workstream-8-3-record.md)
8. [Sprint 8.2 Next.js Shell Record](sprint-8-workstream-8-2-record.md)
9. [Sprint 8.1 Boundary Record](sprint-8-workstream-8-1-record.md)
10. [Public Website Foundation and Migration Boundary](../architecture/public-website-foundation-and-migration.md)
11. [Pre-Sprint 8 Alignment Review](pre-sprint-8-alignment-review.md)
12. [Sprint Sequence](sprints.md)
13. [Sprint 7 Completion Record](sprint-7-completion-record.md)
14. [Sprint 7 Cross-Contract Reconciliation](../architecture/forge-sprint-7-cross-contract-reconciliation.md)
15. [Sprint 7 Specialist Holdpoints and Unresolved Work](../architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)
16. [Sprint 6 Completion Record](sprint-6-completion-record.md)
17. [Decision 0011 — Operational Simplicity and Durable Workflows](../decisions/0011-operational-simplicity-and-durable-workflows.md)
18. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](../decisions/0010-consumer-first-provider-independent-boundary.md)
19. [Phase 0 Funding and Sponsorship Baseline](../economics/README.md)
20. [Security Architecture](../security/README.md)
21. [Public Institutional Roadmap](../../ROADMAP.md)"""
new_roadmap_orientation = """1. [Current Project Status](current-status.md)
2. [Sprint 8 Execution Plan](sprint-8-execution-plan.md)
3. [Sprint 8.9 Full Website Validation Record](sprint-8-workstream-8-9-record.md)
4. [Sprint 8.9 Representative Implementation Review](sprint-8-workstream-8-9-manual-review.md)
5. [Sprint 8.8 Paused Email-Signup Record](sprint-8-workstream-8-8-record.md)
6. [Sprint 8.7 Roadmap, Support, and Funding Transparency Record](sprint-8-workstream-8-7-record.md)
7. [Sprint 8.6 Trust Center and Open Forge Record](sprint-8-workstream-8-6-record.md)
8. [Sprint 8.5 Laws, Experience, Interoperability, and Aster Record](sprint-8-workstream-8-5-record.md)
9. [Sprint 8.4 Homepage and Promise Record](sprint-8-workstream-8-4-record.md)
10. [Sprint 8.3 Navigation, Status, and Accessibility Record](sprint-8-workstream-8-3-record.md)
11. [Sprint 8.2 Next.js Shell Record](sprint-8-workstream-8-2-record.md)
12. [Sprint 8.1 Boundary Record](sprint-8-workstream-8-1-record.md)
13. [Public Website Foundation and Migration Boundary](../architecture/public-website-foundation-and-migration.md)
14. [Pre-Sprint 8 Alignment Review](pre-sprint-8-alignment-review.md)
15. [Sprint Sequence](sprints.md)
16. [Sprint 7 Completion Record](sprint-7-completion-record.md)
17. [Sprint 7 Cross-Contract Reconciliation](../architecture/forge-sprint-7-cross-contract-reconciliation.md)
18. [Sprint 7 Specialist Holdpoints and Unresolved Work](../architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)
19. [Sprint 6 Completion Record](sprint-6-completion-record.md)
20. [Decision 0011 — Operational Simplicity and Durable Workflows](../decisions/0011-operational-simplicity-and-durable-workflows.md)
21. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](../decisions/0010-consumer-first-provider-independent-boundary.md)
22. [Phase 0 Funding and Sponsorship Baseline](../economics/README.md)
23. [Security Architecture](../security/README.md)
24. [Public Institutional Roadmap](../../ROADMAP.md)"""

edit(
    "docs/roadmap/README.md",
    [
        (
            "[Workstream 8.7 record](sprint-8-workstream-8-7-record.md)",
            "[Workstream 8.9 record](sprint-8-workstream-8-9-record.md)",
        ),
        (old_roadmap_orientation, new_roadmap_orientation),
        (
            "- [Sprint 8.7 Record](sprint-8-workstream-8-7-record.md) — validated roadmap, support, and canonical funding-transparency views",
            "- [Sprint 8.7 Record](sprint-8-workstream-8-7-record.md) — validated roadmap, support, and canonical funding-transparency views\n- [Sprint 8.8 Record](sprint-8-workstream-8-8-record.md) — paused no-intake email-signup disposition with Phase 0 gate #63\n- [Sprint 8.9 Record](sprint-8-workstream-8-9-record.md) — permanent source and isolated local production-preview validation\n- [Sprint 8.9 Representative Review](sprint-8-workstream-8-9-manual-review.md) — founding-steward implementation review with explicit limitations",
        ),
        (
            "Workstreams 8.1 through 8.7 established the single-site boundary, pinned Next.js shell, direct and narrative navigation parity, source-linked status model, accessibility and resilience foundations, migrated homepage and Promise, frozen Seven Laws, planned experience explanation, consumer-first interoperability boundary, Aster non-authority explanation, Trust Center, Open Forge, roadmap and capability views, public-safe support routing, and canonical funding transparency.",
            "Workstreams 8.1 through 8.9 established the single-site boundary, accepted source-backed route family, paused signup gate, direct and narrative navigation parity, controlled status and authority views, accessibility and resilience foundations, security headers, transfer budgets, permanent source validation, isolated local production-preview CI, and representative implementation review.",
        ),
        (
            "The 8.7 focused candidate `f39176f5f3a842e89ff4681f1d9810a9f2f305cf` passed formatting, production build, site lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.",
            "The initial normal 8.9 candidate `24c3c48e6358251708b56452d1fd9019bf67e08f` passed CI 1110 and DCO 1192, including the permanent production-preview evidence job.",
        ),
        (
            "Workstream 8.8 is next. It owns the explicit signup preserve-or-retire decision and bounded implementation.",
            "Workstream 8.10 is next. It owns Sprint 8 completion, cross-contract reconciliation, unresolved work, actual release-state evidence, rollback, and the bounded Sprint 9 handoff. Phase 0 signup gate #63 remains open.",
        ),
        (
            "Institutional Phase 0 remains active pending key-person, succession, founder-reserved-power, economic-dependency, historical-source, branch-protection, DCO, operability, distributed-ownership, specialist-review, Decision 0009, human-readable and machine-readable architecture audit, and phase-exit evidence.",
            "Institutional Phase 0 remains active pending signup gate #63, key-person, succession, founder-reserved-power, economic-dependency, historical-source, branch-protection, DCO, operability, distributed-ownership, specialist-review, Decision 0009, human-readable and machine-readable architecture audit, and phase-exit evidence.",
        ),
    ],
)

edit(
    "docs/architecture/README.md",
    [
        (
            "[Workstream 8.7 record](../roadmap/sprint-8-workstream-8-7-record.md)",
            "[Workstream 8.9 record](../roadmap/sprint-8-workstream-8-9-record.md)",
        ),
        (
            "- [Sprint 8.7 Roadmap, Support, and Funding Transparency Record](../roadmap/sprint-8-workstream-8-7-record.md)",
            "- [Sprint 8.7 Roadmap, Support, and Funding Transparency Record](../roadmap/sprint-8-workstream-8-7-record.md)\n- [Sprint 8.8 Paused Email-Signup Record](../roadmap/sprint-8-workstream-8-8-record.md)\n- [Sprint 8.9 Full Website Validation Record](../roadmap/sprint-8-workstream-8-9-record.md)\n- [Sprint 8.9 Representative Implementation Review](../roadmap/sprint-8-workstream-8-9-manual-review.md)",
        ),
        (
            "The focused workflow passed formatting, the production site build, site lint and validation, typecheck, focused tests, generated-state cleanup, and self-removal before producing clean candidate `f39176f5f3a842e89ff4681f1d9810a9f2f305cf`.\n\nThe website may own",
            """The focused workflow passed formatting, the production site build, site lint and validation, typecheck, focused tests, generated-state cleanup, and self-removal before producing clean candidate `f39176f5f3a842e89ff4681f1d9810a9f2f305cf`.

Workstream 8.8 preserves the public email signup as a paused, no-intake compatibility boundary for Sprint 8 and moves final activation-or-retirement to Phase 0 gate #63.

Workstream 8.9 adds one versioned route and release contract, permanent source validation, a permanent isolated local production-preview CI job, machine-readable route evidence, transfer budgets, contrast evidence, and a representative founding-steward implementation review. The first normal candidate passed CI 1110 and DCO 1192.

The website may own""",
        ),
        (
            "Workstream 8.8 is next. It may preserve the signup surface only under accepted provider or custody, purpose, retention, unsubscribe, correction, deletion, proxy-trust, abuse-control, incident, privacy, and rollback evidence, or retire it in favor of public repository-following paths. It may not create accounts, health-data intake, research enrollment, donation processing, provider intake, or an undeclared marketing database.",
            "Workstream 8.10 is next. It may reconcile accepted website contracts, controls, evidence, holdpoints, unresolved work, actual release state, rollback, and the bounded Sprint 9 handoff. It may not close signup gate #63, claim independent or deployed verification, activate private capabilities, or begin Sprint 9 gameplay.",
        ),
    ],
)

edit(
    "apps/site/README.md",
    [
        (
            "Workstreams 8.1 through 8.7 are complete; workstream 8.8 is next.",
            "Workstreams 8.1 through 8.9 are complete; workstream 8.10 is next.",
        ),
        (
            "[Workstream 8.7 Record](../../docs/roadmap/sprint-8-workstream-8-7-record.md)",
            "[Workstream 8.9 Record](../../docs/roadmap/sprint-8-workstream-8-9-record.md)",
        ),
        (
            "- deterministic source, route, authority, signup, and deployment validation; and",
            "- permanent source, route, authority, signup, security, metadata, and budget validation;\n- isolated local production-preview CI with machine-readable evidence; and",
        ),
        (
            "| `/privacy`        | migration-period signup privacy explanation                                    |\n| `/joined`         | migration-period no-submission confirmation",
            "| `/privacy`        | paused no-intake email-signup privacy explanation and Phase 0 gate link        |\n| `/joined`         | no-index no-submission confirmation and Phase 0 gate link",
        ),
        (
            "Workstream 8.8 owns the final signup preserve-or-retire decision.",
            "Workstream 8.8 preserves the paused no-intake state for Sprint 8. Final activation or retirement remains Phase 0 gate #63.",
        ),
        (
            "These are validated implementation foundations, not accessibility conformance certification or affected-user validation.",
            "These foundations now have permanent source and rendered local-preview validation plus a representative founding-steward implementation review. They are not independent accessibility certification, assistive-technology testing, affected-user validation, or deployed verification.",
        ),
        (
            "- final signup disposition;\n- representative accessibility review or certification;\n- defined route-level performance release evidence;\n- preview deployment or official production cutover;",
            "- final email-signup activation or retirement under Phase 0 gate #63;\n- independent accessibility certification, assistive-technology or affected-user testing, and field-performance evidence;\n- hosted preview deployment or official production cutover;",
        ),
        (
            "The site does not accept or forward email addresses. `POST /api/join` returns `503 SIGNUP_MIGRATION_PAUSED`.\n\nWorkstream 8.8 must either preserve signup under accepted provider, purpose, retention, unsubscribe, correction, deletion, proxy-trust, abuse-control, incident, privacy, and rollback evidence, or retire the surface deliberately.",
            "The site does not accept, store, or forward email addresses. `POST /api/join` returns `503 SIGNUP_MIGRATION_PAUSED`; `/privacy` and `/joined` link Phase 0 gate #63. Workstream 8.8 is complete for this bounded Sprint 8 interim state, while final activation or retirement remains unresolved for Phase 0 exit.",
        ),
        (
            "pnpm --filter @calypsos-promise/site test\n```",
            "pnpm --filter @calypsos-promise/site test\n# With a production server running on 127.0.0.1:3000:\npnpm --filter @calypsos-promise/site validate:preview\n```",
        ),
        (
            "Workstream 8.7 focused candidate `f39176f5f3a842e89ff4681f1d9810a9f2f305cf` passed repository formatting, the production site build, site validator/lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.\n\nThis evidence",
            "Workstream 8.7 focused candidate `f39176f5f3a842e89ff4681f1d9810a9f2f305cf` passed repository formatting, the production site build, site validator/lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.\n\nWorkstream 8.8 records the paused no-intake email state and Phase 0 gate #63. The initial normal 8.9 candidate `24c3c48e6358251708b56452d1fd9019bf67e08f` passed CI 1110 and DCO 1192, including the permanent production-preview validation job and representative review record.\n\nThis evidence",
        ),
    ],
)
