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
            "[Workstream 8.6 record](sprint-8-workstream-8-6-record.md)",
            "[Workstream 8.7 record](sprint-8-workstream-8-7-record.md)",
        ),
        (
            "- **Completed workstreams:** 8.1 through 8.6\n- **Next workstream:** 8.7 — Roadmap, capability status, support, and canonical funding transparency",
            "- **Completed workstreams:** 8.1 through 8.7\n- **Next workstream:** 8.8 — Signup preserve-or-retire decision and bounded implementation",
        ),
        (
            "- **Website runtime:** validated Next.js App Router site with homepage, Promise, Seven Laws, How It Works, consumer-first, Aster, Trust Center, Open Forge, navigation, status, and accessibility foundations; not deployed or officially released",
            "- **Website runtime:** validated Next.js App Router site with homepage, Promise, Seven Laws, How It Works, consumer-first, Aster, Trust Center, Open Forge, roadmap, support, funding transparency, navigation, status, and accessibility foundations; not deployed or officially released",
        ),
        (
            "The controlling evidence is [Sprint 8.6 Record](sprint-8-workstream-8-6-record.md).\n\n## Current public website surface",
            """The controlling evidence is [Sprint 8.6 Record](sprint-8-workstream-8-6-record.md).

## Workstream 8.7 — validated roadmap, support, and funding transparency

Workstream 8.7 established:

- `/roadmap` with the controlled evidence-status vocabulary, shared capability registry, a typed source-linked Sprint 8 presentation registry, later sprint groupings, and institutional Phase 0 gates;
- `/support` with public-safe issue, system-challenge, contribution, and status routes plus separate security, conduct, account, and personal-information boundaries;
- `/funding` with build-time reads of the two canonical public economics registers, fail-closed parsing, honest empty states, permitted and prohibited benefits, conflict and concentration controls, and an explicit disabled transaction boundary;
- direct and narrative navigation parity, footer links, canonical metadata, and sitemap inclusion for all three routes;
- server-rendered essential information without a client-component dependency;
- responsive, reduced-data, contrast, forced-colors, and image-independent presentation; and
- deterministic roadmap, support, canonical-register, empty-state, transaction-prohibition, signup, and deployment validation.

The initial focused build exposed a Turbopack incompatibility with a module-relative `URL` passed to Node file APIs. The build-time reader was corrected to search upward for two fixed canonical public repository paths using string filesystem paths.

The self-removing focused workflow then passed formatting, the production site build, site validation and lint, typecheck, focused tests, generated-state cleanup, final formatting, and cleanup before producing clean candidate `f39176f5f3a842e89ff4681f1d9810a9f2f305cf`.

The controlling evidence is [Sprint 8.7 Record](sprint-8-workstream-8-7-record.md).

## Current public website surface""",
        ),
        (
            "- `/promise`, `/laws`, `/how-it-works`, `/consumer-first`, `/aster`, `/trust`, and `/forge` source-backed routes;",
            "- `/promise`, `/laws`, `/how-it-works`, `/consumer-first`, `/aster`, `/trust`, `/forge`, `/roadmap`, `/support`, and `/funding` source-backed routes;",
        ),
        ("- canonical roadmap, support, or funding-transparency pages;\n", ""),
        (
            """## Next workstream

Workstream 8.7 may now implement:

- roadmap and capability-status views derived from validated site-local presentation records with canonical repository sources;
- public support and contribution routes that do not become private customer-support, account, provider-intake, research-enrollment, or transaction systems;
- canonical funding and relationship transparency derived from approved public economics records or honest empty states; and
- approved and prohibited benefit, conflict, concentration, outcome, correction, and challenge explanations with transactions disabled.

It must preserve the accepted page family, canonical source authority, controlled evidence statuses, funding neutrality, server-rendered essential information, accessibility and resilience foundations, paused signup, disabled deployment, and every permanent Sprint 8 non-scope boundary.

It may not activate donations, sponsorship checkout, payments, charitable or tax claims, nonprofit or public-benefit claims, provider intake, connector placement, ranking, private support records, or Sprint 9 gameplay.""",
            """## Next workstream

Workstream 8.8 must choose one evidence-backed signup path:

1. preserve `/api/join`, `/privacy`, and `/joined` only with an approved provider or custody route, narrow purpose, retention, unsubscribe, correction, deletion, proxy-trust, abuse-control, incident, privacy, and rollback evidence; or
2. retire the signup surface and direct visitors to public repository-following and contribution paths until those gates can be met.

It must preserve the accepted page family, public/private information separation, canonical source authority, server-rendered essential information, accessibility and resilience foundations, disabled deployment, funding neutrality, and every permanent Sprint 8 boundary.

The signup surface may not become account creation, health-data intake, research enrollment, donation processing, provider intake, or an undeclared marketing database.""",
        ),
        (
            "- [`apps/site`](../../apps/site) — validated source-backed public website foundation through workstream 8.6; not deployed",
            "- [`apps/site`](../../apps/site) — validated source-backed public website foundation through workstream 8.7; not deployed",
        ),
    ],
)

edit(
    "docs/roadmap/sprint-8-execution-plan.md",
    [
        (
            "[Workstream 8.6 record](sprint-8-workstream-8-6-record.md)",
            "[Workstream 8.7 record](sprint-8-workstream-8-7-record.md)",
        ),
        (
            "- **Status:** ACTIVE — workstreams 8.1 through 8.6 complete; workstream 8.7 next",
            "- **Status:** ACTIVE — workstreams 8.1 through 8.7 complete; workstream 8.8 next",
        ),
        (
            "- [ ] **8.7 — Roadmap, capability status, support, and funding transparency — NEXT**\n- [ ] **8.8 — Signup disposition and bounded implementation**",
            "- [x] **8.7 — Roadmap, capability status, support, and funding transparency**\n- [ ] **8.8 — Signup disposition and bounded implementation — NEXT**",
        ),
        (
            """## 8.7 — roadmap, capability status, support, and funding transparency — NEXT

Deliverables:

- roadmap and capability-status views from a validated site-local registry with canonical source links;
- build-time funding and relationship views from canonical public economics records or honest empty states;
- approved and prohibited benefit, conflict, concentration, outcome, correction, and challenge explanations; and
- disabled transaction handoff with no charitable, tax, nonprofit, payment, or public-benefit claim.

## 8.8 — signup disposition and bounded implementation""",
            """## 8.7 result — roadmap, capability status, support, and funding transparency

Workstream 8.7 established:

- `/roadmap` with controlled status definitions, the shared source-linked capability registry, typed Sprint 8 and future-roadmap presentation records, and explicit institutional gates;
- `/support` with public-safe issue, challenge, contribution, and status routes plus protected security, conduct, account, and personal-information routing;
- `/funding` with build-time ingestion of the two fixed canonical public funding registers, fail-closed parsing, honest empty states, recognition and conflict rules, concentration triggers, and no transaction handoff;
- direct and narrative navigation parity, footer links, canonical metadata, and sitemap inclusion;
- server-rendered essential information without `use client`;
- responsive public-record layouts with reduced-data, contrast, and forced-colors behavior; and
- expanded route, source-authority, canonical-register, support-boundary, empty-state, transaction, signup, and deployment validation.

The first full repository pass passed every substantive job and found only canonical formatting differences. The first focused build then exposed a Turbopack `URL` transformation at the canonical-register file boundary. The reader was corrected to search upward for two fixed repository paths using bounded string filesystem paths.

The self-removing focused workflow subsequently passed canonical formatting, the production site build, site validation and lint, typecheck, focused tests, generated-state cleanup, final formatting, and cleanup before producing candidate `f39176f5f3a842e89ff4681f1d9810a9f2f305cf`.

The controlling evidence is [Sprint 8.7 Record](sprint-8-workstream-8-7-record.md).

## 8.8 — signup disposition and bounded implementation — NEXT""",
        ),
    ],
)

edit(
    "apps/site/README.md",
    [
        (
            "Workstreams 8.1 through 8.6 are complete; workstream 8.7 is next.",
            "Workstreams 8.1 through 8.7 are complete; workstream 8.8 is next.",
        ),
        (
            "[Workstream 8.6 Record](../../docs/roadmap/sprint-8-workstream-8-6-record.md)",
            "[Workstream 8.7 Record](../../docs/roadmap/sprint-8-workstream-8-7-record.md)",
        ),
        (
            "- source-backed `/promise`, `/laws`, `/how-it-works`, `/consumer-first`, `/aster`, `/trust`, and `/forge` routes;",
            "- source-backed `/promise`, `/laws`, `/how-it-works`, `/consumer-first`, `/aster`, `/trust`, `/forge`, `/roadmap`, `/support`, and `/funding` routes;",
        ),
        (
            "| `/forge`          | ten bounded local public/synthetic tools with visible evidence limits          |\n| `/privacy`",
            "| `/forge`          | ten bounded local public/synthetic tools with visible evidence limits          |\n| `/roadmap`        | evidence-based capability status and source-linked roadmap gates               |\n| `/support`        | public-safe contribution paths and protected-information routing               |\n| `/funding`        | canonical public funding registers, empty states, and anti-capture rules        |\n| `/privacy`",
        ),
        (
            """Forge remains local-only, public-and-synthetic-only, non-mutating, provider-independent, and non-authoritative. No remote, private, provider, connector, repository-writing, shell, network, or production-sandbox capability is live.

## Direct and narrative navigation""",
            """Forge remains local-only, public-and-synthetic-only, non-mutating, provider-independent, and non-authoritative. No remote, private, provider, connector, repository-writing, shell, network, or production-sandbox capability is live.

### Roadmap and capability status

`/roadmap` renders the controlled evidence statuses, shared capability registry, typed Sprint 8 gates, later sprint groups, and institutional roadmap links. It remains presentation data backed by canonical repository records rather than a second roadmap.

### Support and contribution

`/support` separates public-safe issues, system challenges, contributions, and status orientation from private security, conduct, account, personal-health, screenshot, export, correspondence, and support evidence. No private customer-support or account system is operating.

### Funding transparency

`/funding` reads the two fixed canonical public economics registers during the build, fails closed on unsupported registry structure, and currently shows honest empty states for zero accepted relationships and zero live opportunities. It explains recognition, prohibited benefits, conflicts, concentration, correction, continuity, and the disabled transaction boundary without creating a second ledger or payment system.

## Direct and narrative navigation""",
        ),
        (
            "- Open Forge;\n- capability status;",
            "- Open Forge;\n- Roadmap;\n- Support;\n- Funding transparency;\n- capability status;",
        ),
        ("- roadmap, support, or canonical funding-transparency pages;\n", ""),
        (
            "Workstream 8.6 focused candidate `e43d0a47186041599674f6608455752a4e3b7319` passed repository formatting, the production site build, site validator/lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.\n\nThis evidence",
            "Workstream 8.6 focused candidate `e43d0a47186041599674f6608455752a4e3b7319` passed repository formatting, the production site build, site validator/lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.\n\nWorkstream 8.7 focused candidate `f39176f5f3a842e89ff4681f1d9810a9f2f305cf` passed repository formatting, the production site build, site validator/lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.\n\nThis evidence",
        ),
    ],
)

edit(
    "README.md",
    [
        (
            "[Workstream 8.6 record](docs/roadmap/sprint-8-workstream-8-6-record.md)",
            "[Workstream 8.7 record](docs/roadmap/sprint-8-workstream-8-7-record.md)",
        ),
        (
            "[Sprint 8.6 Record](docs/roadmap/sprint-8-workstream-8-6-record.md)",
            "[Sprint 8.7 Record](docs/roadmap/sprint-8-workstream-8-7-record.md)",
        ),
        (
            """- **8.6:** source-backed Trust Center and Open Forge routes with truthful rights, security, funding, challenge, tool-registry, provenance, receipt, error, holdpoint, and non-authority explanations.

The 8.6 focused candidate `e43d0a47186041599674f6608455752a4e3b7319` passed formatting, the production site build, site lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.

### Next workstream: 8.7

Workstream 8.7 will implement roadmap, capability-status, support, and canonical funding-transparency views derived from approved public repository records or honest empty states.

It will not activate donations, sponsorship checkout, payments, charitable or tax claims, nonprofit or public-benefit claims, provider intake, connector placement, ranking, private support records, or Sprint 9 gameplay.""",
            """- **8.6:** source-backed Trust Center and Open Forge routes with truthful rights, security, funding, challenge, tool-registry, provenance, receipt, error, holdpoint, and non-authority explanations.
- **8.7:** source-backed roadmap and capability views, public-safe support routing, and build-time canonical funding-register transparency with honest empty states and transactions disabled.

The 8.7 focused candidate `f39176f5f3a842e89ff4681f1d9810a9f2f305cf` passed formatting, the production site build, site lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.

### Next workstream: 8.8

Workstream 8.8 will make the explicit signup preserve-or-retire decision and implement only the accepted bounded path.

It will not turn signup into account creation, health-data intake, research enrollment, donation processing, provider intake, or an undeclared marketing database.""",
        ),
        (
            "- `/laws`, `/how-it-works`, `/consumer-first`, `/aster`, `/trust`, and `/forge` source-backed guide and trust routes;",
            "- `/laws`, `/how-it-works`, `/consumer-first`, `/aster`, `/trust`, `/forge`, `/roadmap`, `/support`, and `/funding` source-backed guide, trust, and transparency routes;",
        ),
        (
            "It does not yet provide canonical roadmap, support, or funding-transparency views, final signup disposition, representative accessibility review, route-level performance release evidence, preview deployment, official production cutover, or any private product capability.",
            "It does not yet provide a final signup disposition, representative accessibility review, route-level performance release evidence, preview deployment, official production cutover, or any private product capability.",
        ),
    ],
)

docs_orientation_old = """1. [Current Project Status](roadmap/current-status.md)
2. [Sprint 8 Execution Plan](roadmap/sprint-8-execution-plan.md)
3. [Sprint 8.6 Trust Center and Open Forge Record](roadmap/sprint-8-workstream-8-6-record.md)
4. [Sprint 8.5 Laws, Experience, Interoperability, and Aster Record](roadmap/sprint-8-workstream-8-5-record.md)
5. [Sprint 8.4 Homepage and Promise Record](roadmap/sprint-8-workstream-8-4-record.md)
6. [Sprint 8.3 Navigation, Status, and Accessibility Record](roadmap/sprint-8-workstream-8-3-record.md)
7. [Sprint 8.2 Next.js Shell Record](roadmap/sprint-8-workstream-8-2-record.md)
8. [Sprint 8.1 Boundary Record](roadmap/sprint-8-workstream-8-1-record.md)
9. [Public Website Foundation and Migration Boundary](architecture/public-website-foundation-and-migration.md)
10. [Pre-Sprint 8 Alignment Review](roadmap/pre-sprint-8-alignment-review.md)
11. [Sprint Roadmap](roadmap/sprints.md)
12. [Sprint 7 Completion Record](roadmap/sprint-7-completion-record.md)
13. [Sprint 7 Cross-Contract Reconciliation](architecture/forge-sprint-7-cross-contract-reconciliation.md)
14. [Sprint 7 Control and Evidence Map](architecture/forge-sprint-7-control-and-evidence-map.md)
15. [Sprint 7 Specialist Holdpoints and Unresolved Work](architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)
16. [Sprint 6 Completion Record](roadmap/sprint-6-completion-record.md)
17. [Aster Contract Baseline](product/aster-contract-baseline.md)
18. [Security Architecture](security/README.md)
19. [Phase 0 Funding and Sponsorship Baseline](economics/README.md)
20. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](decisions/0010-consumer-first-provider-independent-boundary.md)
21. [Decision 0011 — Operational Simplicity and Durable Workflows](decisions/0011-operational-simplicity-and-durable-workflows.md)
22. [Repository and Module Boundaries](architecture/module-boundaries.md)
23. [Developer Experience and Operability Policy](policies/developer-experience-and-operability.md)
24. [Minimum Viable Validation](policies/minimum-viable-validation.md)
25. [Decision 0009 — Health Data Legacy and Post-Mortem Stewardship](decisions/0009-health-data-legacy-and-post-mortem-stewardship.md) — proposed future boundary"""

docs_orientation_new = """1. [Current Project Status](roadmap/current-status.md)
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

edit(
    "docs/README.md",
    [
        (
            "[Workstream 8.6 record](roadmap/sprint-8-workstream-8-6-record.md)",
            "[Workstream 8.7 record](roadmap/sprint-8-workstream-8-7-record.md)",
        ),
        (docs_orientation_old, docs_orientation_new),
        (
            "Workstreams 8.1 through 8.6 are complete; workstream 8.7 is next.",
            "Workstreams 8.1 through 8.7 are complete; workstream 8.8 is next.",
        ),
        (
            "- `/laws`, `/how-it-works`, `/consumer-first`, `/aster`, `/trust`, and `/forge` source-backed routes;",
            "- `/laws`, `/how-it-works`, `/consumer-first`, `/aster`, `/trust`, `/forge`, `/roadmap`, `/support`, and `/funding` source-backed routes;",
        ),
        (
            "The 8.6 focused candidate `e43d0a47186041599674f6608455752a4e3b7319` passed formatting, the production site build, site lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.\n\nWorkstream 8.7 is next. It owns roadmap, capability-status, support, and canonical funding-transparency views while preserving frozen authority, canonical sources, funding neutrality, server-rendering, accessibility and resilience controls, paused signup, disabled deployment, and permanent non-scope.\n\nThe site is not a preview deployment, official release, canonical roadmap or funding view, final signup system, accessibility certification, performance release, or private product capability.",
            "The 8.7 focused candidate `f39176f5f3a842e89ff4681f1d9810a9f2f305cf` passed formatting, the production site build, site lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.\n\nWorkstream 8.8 is next. It owns the explicit signup preserve-or-retire decision and the bounded implementation of the accepted path.\n\nThe site is not a preview deployment, official release, final signup system, accessibility certification, performance release, payment system, private support system, or private product capability.",
        ),
    ],
)

roadmap_orientation_old = """1. [Current Project Status](current-status.md)
2. [Sprint 8 Execution Plan](sprint-8-execution-plan.md)
3. [Sprint 8.6 Trust Center and Open Forge Record](sprint-8-workstream-8-6-record.md)
4. [Sprint 8.5 Laws, Experience, Interoperability, and Aster Record](sprint-8-workstream-8-5-record.md)
5. [Sprint 8.4 Homepage and Promise Record](sprint-8-workstream-8-4-record.md)
6. [Sprint 8.3 Navigation, Status, and Accessibility Record](sprint-8-workstream-8-3-record.md)
7. [Sprint 8.2 Next.js Shell Record](sprint-8-workstream-8-2-record.md)
8. [Sprint 8.1 Boundary Record](sprint-8-workstream-8-1-record.md)
9. [Public Website Foundation and Migration Boundary](../architecture/public-website-foundation-and-migration.md)
10. [Pre-Sprint 8 Alignment Review](pre-sprint-8-alignment-review.md)
11. [Sprint Sequence](sprints.md)
12. [Sprint 7 Completion Record](sprint-7-completion-record.md)
13. [Sprint 7 Cross-Contract Reconciliation](../architecture/forge-sprint-7-cross-contract-reconciliation.md)
14. [Sprint 7 Specialist Holdpoints and Unresolved Work](../architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)
15. [Sprint 6 Completion Record](sprint-6-completion-record.md)
16. [Decision 0011 — Operational Simplicity and Durable Workflows](../decisions/0011-operational-simplicity-and-durable-workflows.md)
17. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](../decisions/0010-consumer-first-provider-independent-boundary.md)
18. [Phase 0 Funding and Sponsorship Baseline](../economics/README.md)
19. [Security Architecture](../security/README.md)
20. [Public Institutional Roadmap](../../ROADMAP.md)"""

roadmap_orientation_new = """1. [Current Project Status](current-status.md)
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

edit(
    "docs/roadmap/README.md",
    [
        (
            "[Workstream 8.6 record](sprint-8-workstream-8-6-record.md)",
            "[Workstream 8.7 record](sprint-8-workstream-8-7-record.md)",
        ),
        (roadmap_orientation_old, roadmap_orientation_new),
        (
            "- [Sprint 8.6 Record](sprint-8-workstream-8-6-record.md) — validated Trust Center and Open Forge public evidence surfaces",
            "- [Sprint 8.6 Record](sprint-8-workstream-8-6-record.md) — validated Trust Center and Open Forge public evidence surfaces\n- [Sprint 8.7 Record](sprint-8-workstream-8-7-record.md) — validated roadmap, support, and canonical funding-transparency views",
        ),
        (
            "Workstreams 8.1 through 8.6 established the single-site boundary, pinned Next.js shell, direct and narrative navigation parity, source-linked status model, accessibility and resilience foundations, migrated homepage and Promise, frozen Seven Laws, planned experience explanation, consumer-first interoperability boundary, Aster non-authority explanation, Trust Center, and Open Forge.\n\nThe 8.6 focused candidate `e43d0a47186041599674f6608455752a4e3b7319` passed formatting, production build, site lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.\n\nWorkstream 8.7 is next. It owns roadmap, capability status, support, and canonical funding transparency.",
            "Workstreams 8.1 through 8.7 established the single-site boundary, pinned Next.js shell, direct and narrative navigation parity, source-linked status model, accessibility and resilience foundations, migrated homepage and Promise, frozen Seven Laws, planned experience explanation, consumer-first interoperability boundary, Aster non-authority explanation, Trust Center, Open Forge, roadmap and capability views, public-safe support routing, and canonical funding transparency.\n\nThe 8.7 focused candidate `f39176f5f3a842e89ff4681f1d9810a9f2f305cf` passed formatting, production build, site lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.\n\nWorkstream 8.8 is next. It owns the explicit signup preserve-or-retire decision and bounded implementation.",
        ),
    ],
)

edit(
    "docs/architecture/README.md",
    [
        (
            "[Workstream 8.6 record](../roadmap/sprint-8-workstream-8-6-record.md)",
            "[Workstream 8.7 record](../roadmap/sprint-8-workstream-8-7-record.md)",
        ),
        (
            "- [Sprint 8.6 Trust Center and Open Forge Record](../roadmap/sprint-8-workstream-8-6-record.md)",
            "- [Sprint 8.6 Trust Center and Open Forge Record](../roadmap/sprint-8-workstream-8-6-record.md)\n- [Sprint 8.7 Roadmap, Support, and Funding Transparency Record](../roadmap/sprint-8-workstream-8-7-record.md)",
        ),
        (
            "The focused validation workflow passed formatting, a production site build, site lint, typecheck, focused tests, generated-state cleanup, and self-removal before producing clean candidate `e43d0a47186041599674f6608455752a4e3b7319`.\n\nThe website may own",
            """The focused validation workflow passed formatting, a production site build, site lint, typecheck, focused tests, generated-state cleanup, and self-removal before producing clean candidate `e43d0a47186041599674f6608455752a4e3b7319`.

Workstream 8.7 implemented:

- `/roadmap` as a typed source-linked presentation of the shared capability registry, Sprint 8 gates, future sprint groupings, and institutional roadmap;
- `/support` as public-safe issue, challenge, contribution, and orientation routing with protected security, conduct, account, and personal-information boundaries;
- `/funding` as a build-time read-only derivative of the two fixed canonical public economics registers with fail-closed parsing, honest empty states, benefit and conflict boundaries, concentration triggers, and transactions disabled;
- direct and narrative navigation parity, footer links, canonical metadata, and sitemap inclusion;
- server-rendered essential information and inherited accessibility and resilience behavior; and
- focused production-build and deterministic source-authority, register, support, transaction, signup, and deployment validation.

The focused workflow passed formatting, the production site build, site lint and validation, typecheck, focused tests, generated-state cleanup, and self-removal before producing clean candidate `f39176f5f3a842e89ff4681f1d9810a9f2f305cf`.

The website may own""",
        ),
        (
            "Workstream 8.7 is next. It may implement roadmap, capability-status, support, and canonical funding-transparency views derived from approved public repository records while preserving frozen authority, accepted public routes, direct and narrative navigation parity, controlled status values, source links, funding neutrality, server-rendered essential information, accessibility and resilience foundations, paused signup, disabled deployment, and permanent non-scope boundaries.",
            "Workstream 8.8 is next. It may preserve the signup surface only under accepted provider or custody, purpose, retention, unsubscribe, correction, deletion, proxy-trust, abuse-control, incident, privacy, and rollback evidence, or retire it in favor of public repository-following paths. It may not create accounts, health-data intake, research enrollment, donation processing, provider intake, or an undeclared marketing database.",
        ),
    ],
)

print("Sprint 8.7 repository status reconciliation completed.")
