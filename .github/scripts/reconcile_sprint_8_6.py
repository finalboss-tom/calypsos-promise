from pathlib import Path
import re


def read(path: str) -> str:
    return Path(path).read_text(encoding="utf-8")


def write(path: str, text: str) -> None:
    Path(path).write_text(text, encoding="utf-8")


def replace_once(path: str, old: str, new: str) -> None:
    text = read(path)
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{path}: expected one match, found {count}: {old[:100]!r}")
    write(path, text.replace(old, new, 1))


def regex_once(path: str, pattern: str, replacement: str) -> None:
    text = read(path)
    updated, count = re.subn(pattern, replacement, text, count=1, flags=re.DOTALL)
    if count != 1:
        raise SystemExit(f"{path}: regex expected one match, found {count}: {pattern[:100]!r}")
    write(path, updated)


# Canonical integrated status.
replace_once(
    "docs/roadmap/current-status.md",
    "[Workstream 8.5 record](sprint-8-workstream-8-5-record.md)",
    "[Workstream 8.6 record](sprint-8-workstream-8-6-record.md)",
)
replace_once(
    "docs/roadmap/current-status.md",
    "- **Completed workstreams:** 8.1 through 8.5\n- **Next workstream:** 8.6 — Trust Center and Open Forge",
    "- **Completed workstreams:** 8.1 through 8.6\n- **Next workstream:** 8.7 — Roadmap, capability status, support, and canonical funding transparency",
)
replace_once(
    "docs/roadmap/current-status.md",
    "- **Website runtime:** validated Next.js App Router site with homepage, Promise, Seven Laws, How It Works, consumer-first, Aster, navigation, status, and accessibility foundations; not deployed or officially released",
    "- **Website runtime:** validated Next.js App Router site with homepage, Promise, Seven Laws, How It Works, consumer-first, Aster, Trust Center, Open Forge, navigation, status, and accessibility foundations; not deployed or officially released",
)
replace_once(
    "docs/roadmap/current-status.md",
    "The controlling evidence is [Sprint 8.5 Record](sprint-8-workstream-8-5-record.md).\n\n## Current public website surface",
    """The controlling evidence is [Sprint 8.5 Record](sprint-8-workstream-8-5-record.md).

## Workstream 8.6 — validated Trust Center and Open Forge

Workstream 8.6 established:

- `/trust` with source-backed player rights, public/private information boundaries, truthful security status, authority separation, provider and connector status, funding doctrine, public and private challenge routes, and open operational and independent-review gates;
- `/forge` with all ten accepted local public/synthetic tool identities, runtime and source boundaries, receipts, public-safe errors, tool-specific denials, open holdpoints, unresolved work, and ordinary non-MCP contribution paths;
- direct and narrative navigation parity, footer links, canonical metadata, and sitemap inclusion for both routes;
- server-rendered essential information without a client-component dependency;
- inherited keyboard, focus, responsive, reduced-data, contrast, forced-colors, and image-failure behavior; and
- deterministic trust, tool-registry, receipt, error, route, signup, deployment, and non-certification validation.

The focused validation workflow passed formatting, a production site build, site lint, typecheck, focused tests, generated-state cleanup, and self-removal before producing clean candidate `e43d0a47186041599674f6608455752a4e3b7319`.

The controlling evidence is [Sprint 8.6 Record](sprint-8-workstream-8-6-record.md).

## Current public website surface""",
)
replace_once(
    "docs/roadmap/current-status.md",
    "- `/promise`, `/laws`, `/how-it-works`, `/consumer-first`, and `/aster` source-backed routes;",
    "- `/promise`, `/laws`, `/how-it-works`, `/consumer-first`, `/aster`, `/trust`, and `/forge` source-backed routes;",
)
replace_once("docs/roadmap/current-status.md", "- Trust Center or Open Forge routes;\n", "")
regex_once(
    "docs/roadmap/current-status.md",
    r"## Next workstream\n\nWorkstream 8\.6 may now implement:.*?It may not claim certification, production safety, private-data capability, provider capability, clinical capability, transactions, or Sprint 9 gameplay\.",
    """## Next workstream

Workstream 8.7 may now implement:

- roadmap and capability-status views derived from validated site-local presentation records with canonical repository sources;
- public support and contribution routes that do not become private customer-support, account, provider-intake, research-enrollment, or transaction systems;
- canonical funding and relationship transparency derived from approved public economics records or honest empty states; and
- approved and prohibited benefit, conflict, concentration, outcome, correction, and challenge explanations with transactions disabled.

It must preserve the accepted page family, canonical source authority, controlled evidence statuses, funding neutrality, server-rendered essential information, accessibility and resilience foundations, paused signup, disabled deployment, and every permanent Sprint 8 non-scope boundary.

It may not activate donations, sponsorship checkout, payments, charitable or tax claims, nonprofit or public-benefit claims, provider intake, connector placement, ranking, private support records, or Sprint 9 gameplay.""",
)
replace_once(
    "docs/roadmap/current-status.md",
    "- [`apps/site`](../../apps/site) — validated source-backed public website foundation through workstream 8.5; not deployed",
    "- [`apps/site`](../../apps/site) — validated source-backed public website foundation through workstream 8.6; not deployed",
)

# Active Sprint 8 execution plan.
replace_once(
    "docs/roadmap/sprint-8-execution-plan.md",
    "[Workstream 8.5 record](sprint-8-workstream-8-5-record.md)",
    "[Workstream 8.6 record](sprint-8-workstream-8-6-record.md)",
)
replace_once(
    "docs/roadmap/sprint-8-execution-plan.md",
    "- **Status:** ACTIVE — workstreams 8.1 through 8.5 complete; workstream 8.6 next",
    "- **Status:** ACTIVE — workstreams 8.1 through 8.6 complete; workstream 8.7 next",
)
replace_once(
    "docs/roadmap/sprint-8-execution-plan.md",
    "- [ ] **8.6 — Trust Center and Open Forge — NEXT**\n- [ ] **8.7 — Roadmap, capability status, support, and funding transparency**",
    "- [x] **8.6 — Trust Center and Open Forge**\n- [ ] **8.7 — Roadmap, capability status, support, and funding transparency — NEXT**",
)
regex_once(
    "docs/roadmap/sprint-8-execution-plan.md",
    r"## 8\.6 — Trust Center and Open Forge\n\nDeliverables:.*?## 8\.7 — roadmap, capability status, support, and funding transparency",
    """## 8.6 result — Trust Center and Open Forge

Workstream 8.6 established:

- `/trust` with the public rights floor, publication boundary, designed-versus-deployed security status, authority separation, provider and connector status, funding doctrine, public and private challenge routes, and open review gates;
- `/forge` with the exact ten-tool local public/synthetic registry, source provenance, scopes, limits, receipts, public-safe errors, compatibility and non-authority boundaries, open holdpoints, and ordinary non-MCP contribution paths;
- direct and narrative navigation parity, footer links, canonical metadata, and sitemap inclusion;
- server-rendered essential information without `use client`;
- responsive Trust and Forge layouts with reduced-data, contrast, and forced-colors behavior; and
- expanded source, trust, tool-registry, receipt, error, route, signup, deployment, and non-certification validation.

The first full repository pass passed every substantive job and found only canonical formatting differences. The self-removing focused workflow then passed formatting, the production site build, site lint, typecheck, focused tests, generated-state cleanup, final formatting, and cleanup before producing candidate `e43d0a47186041599674f6608455752a4e3b7319`.

The controlling evidence is [Sprint 8.6 Record](sprint-8-workstream-8-6-record.md).

## 8.7 — roadmap, capability status, support, and funding transparency — NEXT""",
)

# Site-local ownership and route record.
replace_once(
    "apps/site/README.md",
    "Workstreams 8.1 through 8.5 are complete; workstream 8.6 is next.",
    "Workstreams 8.1 through 8.6 are complete; workstream 8.7 is next.",
)
replace_once(
    "apps/site/README.md",
    "[Workstream 8.5 Record](../../docs/roadmap/sprint-8-workstream-8-5-record.md)",
    "[Workstream 8.6 Record](../../docs/roadmap/sprint-8-workstream-8-6-record.md)",
)
replace_once(
    "apps/site/README.md",
    "- source-backed `/promise`, `/laws`, `/how-it-works`, `/consumer-first`, and `/aster` routes;",
    "- source-backed `/promise`, `/laws`, `/how-it-works`, `/consumer-first`, `/aster`, `/trust`, and `/forge` routes;",
)
replace_once(
    "apps/site/README.md",
    "| `/aster`          | Aster proposal, confirmation, source, uncertainty, fallback, and non-authority |\n| `/privacy`",
    "| `/aster`          | Aster proposal, confirmation, source, uncertainty, fallback, and non-authority |\n| `/trust`          | source-backed rights, safeguards, open gates, and challenge routes             |\n| `/forge`          | ten bounded local public/synthetic tools with visible evidence limits          |\n| `/privacy`",
)
replace_once(
    "apps/site/README.md",
    "No production model, provider, private-data egress, memory, retrieval, queue, scheduler, workflow, or tool runtime is live.\n\n## Direct and narrative navigation",
    """No production model, provider, private-data egress, memory, retrieval, queue, scheduler, workflow, or tool runtime is live.

### Trust Center

`/trust` organizes the frozen rights floor, public/private information boundary, truthful security status, authority separation, provider and connector status, funding doctrine, correction routes, public-versus-private reporting paths, and open production and independent-review gates.

It is a read-only derivative of canonical repository records. It is not security, privacy, accessibility, clinical, legal, financial, provider, or institutional certification.

### Open Forge

`/forge` exposes all ten accepted local public/synthetic tool identities, source provenance, bounded scopes, receipts, errors, compatibility and non-authority limits, nineteen open holdpoints, eighteen unresolved-work records, and the ordinary repository contribution path.

Forge remains local-only, public-and-synthetic-only, non-mutating, provider-independent, and non-authoritative. No remote, private, provider, connector, repository-writing, shell, network, or production-sandbox capability is live.

## Direct and narrative navigation""",
)
replace_once(
    "apps/site/README.md",
    "- Aster and AI;\n- capability status;",
    "- Aster and AI;\n- Trust Center;\n- Open Forge;\n- capability status;",
)
replace_once("apps/site/README.md", "- Trust Center or Open Forge;\n", "")
replace_once(
    "apps/site/README.md",
    "Workstream 8.5 focused candidate `16fe324c508719734b8923a8f99b59fb16712726` passed repository formatting, the production site build, site validator/lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.\n\nThis evidence",
    "Workstream 8.5 focused candidate `16fe324c508719734b8923a8f99b59fb16712726` passed repository formatting, the production site build, site validator/lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.\n\nWorkstream 8.6 focused candidate `e43d0a47186041599674f6608455752a4e3b7319` passed repository formatting, the production site build, site validator/lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.\n\nThis evidence",
)

# Root repository entry point.
replace_once(
    "README.md",
    "[Workstream 8.5 record](docs/roadmap/sprint-8-workstream-8-5-record.md)",
    "[Workstream 8.6 record](docs/roadmap/sprint-8-workstream-8-6-record.md)",
)
replace_once(
    "README.md",
    "[Sprint 8.5 Record](docs/roadmap/sprint-8-workstream-8-5-record.md)",
    "[Sprint 8.6 Record](docs/roadmap/sprint-8-workstream-8-6-record.md)",
)
regex_once(
    "README.md",
    r"- \*\*8\.5:\*\* source-backed Seven Laws.*?It will not claim certification, production safety, private-data capability, provider or clinical capability, transactions, or Sprint 9 gameplay\.",
    """- **8.5:** source-backed Seven Laws, How It Works, consumer-first/interoperability, and Aster/AI routes with metadata, sitemap inclusion, both navigation paths, explicit status boundaries, production-build evidence, and deterministic validation.
- **8.6:** source-backed Trust Center and Open Forge routes with truthful rights, security, funding, challenge, tool-registry, provenance, receipt, error, holdpoint, and non-authority explanations.

The 8.6 focused candidate `e43d0a47186041599674f6608455752a4e3b7319` passed formatting, the production site build, site lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.

### Next workstream: 8.7

Workstream 8.7 will implement roadmap, capability-status, support, and canonical funding-transparency views derived from approved public repository records or honest empty states.

It will not activate donations, sponsorship checkout, payments, charitable or tax claims, nonprofit or public-benefit claims, provider intake, connector placement, ranking, private support records, or Sprint 9 gameplay.""",
)
replace_once(
    "README.md",
    "- `/laws`, `/how-it-works`, `/consumer-first`, and `/aster` source-backed guide routes;",
    "- `/laws`, `/how-it-works`, `/consumer-first`, `/aster`, `/trust`, and `/forge` source-backed guide and trust routes;",
)
replace_once(
    "README.md",
    "It does not yet provide Trust Center, Open Forge, canonical roadmap or funding views, final signup disposition, representative accessibility review, route-level performance release evidence, preview deployment, official production cutover, or any private product capability.",
    "It does not yet provide canonical roadmap, support, or funding-transparency views, final signup disposition, representative accessibility review, route-level performance release evidence, preview deployment, official production cutover, or any private product capability.",
)

# Documentation home: replace the whole numbered orientation block.
replace_once(
    "docs/README.md",
    "[Workstream 8.5 record](roadmap/sprint-8-workstream-8-5-record.md)",
    "[Workstream 8.6 record](roadmap/sprint-8-workstream-8-6-record.md)",
)
regex_once(
    "docs/README.md",
    r"## Current orientation\n\n.*?\n\n## Mission and non-negotiable boundaries",
    """## Current orientation

1. [Current Project Status](roadmap/current-status.md)
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
25. [Decision 0009 — Health Data Legacy and Post-Mortem Stewardship](decisions/0009-health-data-legacy-and-post-mortem-stewardship.md) — proposed future boundary

## Mission and non-negotiable boundaries""",
)
replace_once(
    "docs/README.md",
    "Workstreams 8.1 through 8.5 are complete; workstream 8.6 is next.",
    "Workstreams 8.1 through 8.6 are complete; workstream 8.7 is next.",
)
replace_once(
    "docs/README.md",
    "- `/laws`, `/how-it-works`, `/consumer-first`, and `/aster` source-backed guide routes;",
    "- `/laws`, `/how-it-works`, `/consumer-first`, `/aster`, `/trust`, and `/forge` source-backed routes;",
)
regex_once(
    "docs/README.md",
    r"The 8\.5 focused candidate `16fe324c508719734b8923a8f99b59fb16712726`.*?The site is not a preview deployment, official release, Trust Center, Open Forge, canonical funding view, final signup system, accessibility certification, performance release, or private product capability\.",
    """The 8.6 focused candidate `e43d0a47186041599674f6608455752a4e3b7319` passed formatting, the production site build, site lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.

Workstream 8.7 is next. It owns roadmap, capability-status, support, and canonical funding-transparency views while preserving frozen authority, canonical sources, funding neutrality, server-rendering, accessibility and resilience controls, paused signup, disabled deployment, and permanent non-scope.

The site is not a preview deployment, official release, canonical roadmap or funding view, final signup system, accessibility certification, performance release, or private product capability.""",
)

# Roadmap index.
replace_once(
    "docs/roadmap/README.md",
    "[Workstream 8.5 record](sprint-8-workstream-8-5-record.md)",
    "[Workstream 8.6 record](sprint-8-workstream-8-6-record.md)",
)
regex_once(
    "docs/roadmap/README.md",
    r"## Current orientation\n\n.*?\n\n## Completion records and plans",
    """## Current orientation

1. [Current Project Status](current-status.md)
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
20. [Public Institutional Roadmap](../../ROADMAP.md)

## Completion records and plans""",
)
replace_once(
    "docs/roadmap/README.md",
    "- [Sprint 8.5 Record](sprint-8-workstream-8-5-record.md) — validated laws, experience, consumer-first interoperability, and Aster guide family",
    "- [Sprint 8.5 Record](sprint-8-workstream-8-5-record.md) — validated laws, experience, consumer-first interoperability, and Aster guide family\n- [Sprint 8.6 Record](sprint-8-workstream-8-6-record.md) — validated Trust Center and Open Forge public evidence surfaces",
)
regex_once(
    "docs/roadmap/README.md",
    r"Workstreams 8\.1 through 8\.5 established.*?Workstream 8\.6 is next\. It owns the Trust Center and Open Forge\.",
    """Workstreams 8.1 through 8.6 established the single-site boundary, pinned Next.js shell, direct and narrative navigation parity, source-linked status model, accessibility and resilience foundations, migrated homepage and Promise, frozen Seven Laws, planned experience explanation, consumer-first interoperability boundary, Aster non-authority explanation, Trust Center, and Open Forge.

The 8.6 focused candidate `e43d0a47186041599674f6608455752a4e3b7319` passed formatting, production build, site lint, typecheck, focused tests, generated-state cleanup, and temporary workflow self-removal.

Workstream 8.7 is next. It owns roadmap, capability status, support, and canonical funding transparency.""",
)

# Architecture index.
replace_once(
    "docs/architecture/README.md",
    "[Workstream 8.5 record](../roadmap/sprint-8-workstream-8-5-record.md)",
    "[Workstream 8.6 record](../roadmap/sprint-8-workstream-8-6-record.md)",
)
replace_once(
    "docs/architecture/README.md",
    "- [Sprint 8.5 Guide Family Record](../roadmap/sprint-8-workstream-8-5-record.md)",
    "- [Sprint 8.5 Guide Family Record](../roadmap/sprint-8-workstream-8-5-record.md)\n- [Sprint 8.6 Trust Center and Open Forge Record](../roadmap/sprint-8-workstream-8-6-record.md)",
)
replace_once(
    "docs/architecture/README.md",
    "The focused validation workflow passed formatting, a production site build, site lint, typecheck, focused tests, generated-state cleanup, and self-removal before producing clean candidate `16fe324c508719734b8923a8f99b59fb16712726`.\n\nThe website may own",
    """The focused validation workflow passed formatting, a production site build, site lint, typecheck, focused tests, generated-state cleanup, and self-removal before producing clean candidate `16fe324c508719734b8923a8f99b59fb16712726`.

Workstream 8.6 implemented:

- `/trust` as a source-backed view of rights, public/private information handling, security status, authority separation, provider and connector status, funding doctrine, challenge routes, and open gates;
- `/forge` as a source-backed view of the exact ten local public/synthetic tools, provenance, scopes, receipts, errors, compatibility, holdpoints, unresolved work, and ordinary contribution paths;
- direct and narrative navigation parity, footer links, canonical metadata, and sitemap inclusion;
- server-rendered essential information and inherited accessibility and resilience behavior; and
- focused production-build and deterministic trust, registry, receipt, error, route, signup, deployment, and non-certification validation.

The focused validation workflow passed formatting, a production site build, site lint, typecheck, focused tests, generated-state cleanup, and self-removal before producing clean candidate `e43d0a47186041599674f6608455752a4e3b7319`.

The website may own""",
)
replace_once(
    "docs/architecture/README.md",
    "Workstream 8.6 is next. It may implement the Trust Center and Open Forge pages while preserving frozen authority, accepted public routes, direct and narrative navigation parity, controlled status values, source links, server-rendered essential information, provider independence, Aster and Forge non-authority, accessibility and resilience foundations, paused signup, disabled deployment, and permanent non-scope boundaries.",
    "Workstream 8.7 is next. It may implement roadmap, capability-status, support, and canonical funding-transparency views derived from approved public repository records while preserving frozen authority, accepted public routes, direct and narrative navigation parity, controlled status values, source links, funding neutrality, server-rendered essential information, accessibility and resilience foundations, paused signup, disabled deployment, and permanent non-scope boundaries.",
)
