# Sprint 8 Workstream 8.9 Representative Implementation Review

[Review protocol](sprint-8-workstream-8-9-review-protocol.md) · [Workstream 8.8 record](sprint-8-workstream-8-8-record.md) · [Current status](current-status.md) · [Site README](../../apps/site/README.md) · [Draft PR #61](https://github.com/finalboss-tom/calypsos-promise/pull/61)

- **Review class:** founding-steward representative implementation review
- **Status:** PASS WITH EXPLICIT LIMITATIONS
- **Evidence environment:** repository source plus isolated local production-preview evidence
- **Routes:** all thirteen accepted public and compatibility routes
- **Information class:** PUBLIC implementation and synthetic evidence only
- **Independent review:** not established

## Review method

The review combined:

- source inspection of the shared layout, navigation, route components, metadata, CSS, CSP proxy, security headers, sitemap, robots, errors, canonical public-record readers, and paused signup route;
- deterministic source and unit tests;
- a production-mode Next.js build;
- an isolated local production server;
- rendered HTML, header, resource, route, metadata, sitemap, robots, API, cache, contrast, and transfer-budget validation; and
- review of the generated `calypsos.site-release-evidence.v1` report.

This review did not use real people, real health information, production accounts, a hosted preview, production infrastructure, or private operational evidence.

## Findings

### Semantics and reading order — pass

- The root layout declares English and provides one main landmark.
- Every accepted route renders one page-level heading.
- Heading-order checks passed across the rendered route family.
- Direct and narrative navigation use native navigation and disclosure elements.
- The optional Ogygia path exposes no essential information unavailable through direct navigation.
- `aria-labelledby` references and rendered IDs passed deterministic checks.

### Keyboard and focus foundations — pass at implementation level

- Two visible-on-focus skip links target primary navigation and main content.
- Links, buttons, native disclosure summaries, and the programmatic main target have explicit `:focus-visible` treatment.
- Interactive controls retain a minimum height of 2.8 rem.
- Navigation and disclosure behavior rely on native browser semantics rather than a client-side interaction framework.
- No accepted essential route requires a client component.

This is implementation evidence. Direct keyboard traversal across a representative browser matrix and assistive-technology pairing remains unperformed.

### Labels, names, and alternatives — pass

- Rendered links have discernible text or an accessible label.
- New-tab links provide hidden explanatory text and use `rel="noreferrer"`.
- Images expose alternative text, including intentionally empty alternatives for decorative marks.
- Status badges contain visible status words and do not depend on color alone.
- Route titles, descriptions, canonical URLs, and the joined no-index directive passed rendered validation.

### Contrast — pass for accepted token pairs

Every accepted pair exceeds the enhanced 7:1 threshold:

| Pair                |   Ratio |
| ------------------- | ------: |
| primary text        | 16.23:1 |
| secondary text      | 11.28:1 |
| gold links          |  9.93:1 |
| sea links           |  8.53:1 |
| live status         |  9.28:1 |
| experimental status |  8.69:1 |
| planned status      |  9.93:1 |
| long-horizon status |  7.86:1 |
| primary button      | 11.88:1 |

These calculations validate the accepted solid token pairs. They do not replace visual review of every translucent, composited, image-backed, or browser-rendered state.

### Motion, bandwidth, and image failure — pass at implementation level

- Reduced motion disables smooth scrolling and compresses animation and transition duration.
- Reduced data removes the hero image and decorative background images and gradients from accepted surfaces.
- Essential information remains server-rendered and present without animation or imagery.
- The site uses system fonts and the enforced web-font transfer budget is zero.
- Background colors remain when imagery fails or is suppressed.

Network throttling on representative devices and browsers remains unperformed.

### Responsive behavior — pass at stylesheet and rendered-structure level

- Shared navigation, status, guide, Trust, Forge, roadmap, support, and funding grids collapse from multi-column to single-column layouts at defined breakpoints.
- Header content stacks at narrow widths.
- The implementation contains no intentionally horizontally scrolling essential region.
- Text and controls remain in normal document flow.

Physical-device and browser zoom testing remains unperformed.

### Status and authority — pass

- Live, experimental, planned, and long-horizon labels remain controlled and visibly named.
- Roadmap, capability, Trust, Forge, funding, and support views link to canonical public repository sources.
- Website presentation does not create Chronicle, permission, Aster, Forge, provider, funding, clinical, legal, or governance authority.
- No page represents production providers, connectors, private Chronicles, production AI, transactions, or gameplay as live.

### Funding and support boundaries — pass

- The funding page renders the canonical zero-relationship and zero-opportunity states.
- No accepted informational route contains a form.
- No payment runtime or external runtime resource was detected.
- Public-safe issue and challenge routes remain separate from protected security, conduct, account, and personal-information routes.

### Email signup disposition — pass for the selected paused state

- `POST /api/join` returns `503 SIGNUP_MIGRATION_PAUSED` with `Cache-Control: no-store` and `Retry-After: 86400`.
- `GET /api/join` returns 405.
- The route sets no cookie and does not parse, accept, store, or forward an email address.
- `/privacy` and `/joined` explain the paused state and link Phase 0 gate issue #63.
- The surface is not represented as game registration, account creation, health-data intake, research enrollment, provider intake, or financial processing.

### Errors and recovery — pass

- A missing route returns 404 with a public-safe explanation and a route back to the site.
- Application error components remain present.
- Sitemap and robots routes return 200 and preserve the public/API indexing boundary.

## Measured transfer evidence

All thirteen routes passed the accepted ceilings:

- largest HTML response: `/roadmap`, 64,830 bytes against 98,304;
- largest JavaScript total: `/roadmap`, 689,664 bytes against 720,896;
- CSS: 21,374 bytes against 131,072;
- largest image transfer: `/`, 92,319 bytes against 1,572,864;
- web fonts: zero bytes;
- largest total transfer: `/`, 850,159 bytes against 2,097,152; and
- largest first-party request count: `/`, 14 against 32.

The JavaScript figure includes inline React Server Component data and fetched pinned-framework chunks. These are regression ceilings for the current framework and implementation, not field-performance targets or an assertion that the baseline is optimal.

## Limitations carried forward

This review does not establish:

- independent accessibility certification or a formal WCAG conformance claim;
- direct screen-reader, switch-control, voice-control, magnification, keyboard-only browser-matrix, cognitive-accessibility, or affected-user testing;
- physical mobile-device or browser-zoom evidence;
- field performance, Core Web Vitals, slow-device execution, or real-network evidence;
- hosted preview or production deployment;
- deployed CSP, header, caching, DNS, CDN, image-optimization, or infrastructure verification;
- independent security, privacy, clinical, legal, financial, provider, interoperability, or operational review; or
- closure of Phase 0 signup gate issue #63.

These limitations remain visible inputs to workstream 8.10, later specialist review, deployment evidence, and Phase 0 exit review.

## Review decision

The public website passes the representative founding-steward implementation review required for Sprint 8.9, subject to the limitations above.

No limitation may be silently restated as certification, affected-user validation, deployed verification, or production readiness.
