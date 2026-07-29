# Sprint 8 Workstream 8.9 Representative Review Protocol

[Current status](current-status.md) · [Sprint 8 plan](sprint-8-execution-plan.md) · [Workstream 8.8 record](sprint-8-workstream-8-8-record.md) · [Phase 0 signup gate #63](https://github.com/finalboss-tom/calypsos-promise/issues/63) · [Site README](../../apps/site/README.md)

- **Status:** ACTIVE VALIDATION PROTOCOL
- **Scope:** public website implementation and isolated local production preview
- **Information class:** PUBLIC implementation and synthetic evidence only
- **Certification boundary:** repository implementation review, not independent accessibility, security, privacy, clinical, legal, financial, or production certification

## Purpose

This protocol defines the representative manual and automated review required for Sprint 8 workstream 8.9.

It supplements deterministic source checks and the permanent local production-preview CI job. It does not convert a local build, maintainer review, or automated result into independent conformance certification.

## Representative routes

The review covers every accepted public route:

- `/`;
- `/promise`;
- `/laws`;
- `/how-it-works`;
- `/consumer-first`;
- `/aster`;
- `/trust`;
- `/forge`;
- `/roadmap`;
- `/support`;
- `/funding`;
- `/privacy`; and
- `/joined` as a no-index compatibility route.

It also covers `/sitemap.xml`, `/robots.txt`, a missing route, `/assets/compass-mark.svg`, and GET and POST behavior for `/api/join`.

## Manual implementation review dimensions

A founding-steward representative review records, for desktop and narrow responsive layouts where applicable:

1. **Semantics and reading order** — one page-level heading, meaningful heading sequence, main landmark, navigation landmarks, article and section structure, and understandable order without CSS imagery.
2. **Keyboard and focus** — skip links, native disclosure behavior, visible focus, logical tab order, reachable links, and no keyboard-only dead end.
3. **Labels and names** — descriptive links, new-tab notices, alternative text, status text that does not rely on color, and understandable route names.
4. **Motion and bandwidth** — essential information without animation, reduced-motion behavior, reduced-data removal of decorative imagery and gradients, system-font fallback, and image-independent backgrounds.
5. **Responsive behavior** — readable content, single-column collapse, no intentional horizontal scrolling, and minimum control height at narrow widths.
6. **Status and authority** — live, experimental, planned, and long-horizon claims remain distinct; pages link upstream rather than becoming new authority.
7. **Funding and support boundaries** — honest canonical empty states, no transaction controls, public-safe support routing, and protected-information warnings.
8. **Signup state** — paused no-intake copy, `503 SIGNUP_MIGRATION_PAUSED`, no cookies, no provider or webhook path, and Phase 0 gate #63 linkage.
9. **Errors and recovery** — understandable not-found and error states with a path back to public information.

## Automated production-preview dimensions

The permanent `site-release-validation` CI job must:

- build the pinned Next.js application in production mode;
- start an isolated local production server;
- fetch all accepted routes without redirect substitution;
- validate language, main landmark, skip links, heading order, unique IDs, `aria-labelledby` references, image alternatives, link names, and no unexpected forms;
- validate titles, descriptions, canonical URLs, sitemap inclusion, no-index behavior, robots rules, not-found behavior, and API method behavior;
- validate CSP nonce behavior and the complete public security-header contract;
- scan rendered HTML, JavaScript, and CSS for bounded secret patterns and external runtime resources;
- enforce route-level HTML, JavaScript, CSS, image, font, request-count, and total-transfer budgets;
- enforce enhanced 7:1 contrast for accepted design-token pairs;
- confirm the paused signup and mutable asset cache contracts;
- publish `calypsos.site-release-evidence.v1` as a CI artifact; and
- restore build-modified tracked files and prove no tracked mutation remains.

## Performance budgets

The initial budgets are explicit regression ceilings for the pinned framework and current source-backed site:

- HTML: 96 KiB per route;
- JavaScript, including inline React Server Component data and fetched framework chunks: 704 KiB per route;
- CSS: 128 KiB per route;
- images: 1.5 MiB per route;
- web fonts: zero bytes;
- total first-party transfer: 2 MiB per route; and
- first-party requests: no more than 32 per route.

A budget is not a claim of ideal field performance. A change to a budget requires measured evidence and review rather than silent adjustment.

## Review evidence states

- **Automated pass:** the permanent CI job passes and publishes its evidence artifact.
- **Representative implementation review:** the founding steward records the manual dimensions reviewed and observed limitations.
- **Independent review:** not established in Sprint 8.9.
- **Affected-user validation:** not established in Sprint 8.9.
- **Deployed verification:** not established until an actual preview or production environment is intentionally created and reviewed.

## Blocking rule

Workstream 8.9 does not complete while any accepted route fails the permanent production-preview job, while the representative manual record is missing, or while the repository describes local evidence as independent or deployed certification.
