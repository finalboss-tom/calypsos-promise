# Sprint 8 Public Website Control and Evidence Map

[Architecture index](README.md) · [Cross-contract reconciliation](public-site-sprint-8-cross-contract-reconciliation.md) · [Specialist holdpoints and unresolved work](public-site-sprint-8-specialist-holdpoint-and-unresolved-work-register.md) · [Completion record](../roadmap/sprint-8-completion-record.md) · [Release, rollback, and Sprint 9 handoff](../roadmap/sprint-8-release-rollback-and-sprint-9-handoff.md)

- **Status:** READY FOR FOUNDING-STEWARD ACCEPTANCE — repository and isolated local-preview evidence only
- **Application:** `apps/site`
- **Entry baseline:** `9da8034220954a1ca50420e71fd94e7795232a35`
- **Validated pre-completion head:** `0f8d6a03fda48608a2eecf9e95c4639650951d48`
- **Scope:** stable control objectives, owning evidence, evidence status, acceptance support, and revalidation triggers

## Purpose

This map prevents Sprint 8 completion from becoming an undifferentiated claim that “the website is accessible, secure, performant, trustworthy, or production ready.” Each control has a stable identity, bounded objective, owning evidence, current evidence status, and revalidation trigger.

## Evidence vocabulary

- **REQUIRED:** demanded by frozen commitments, accepted decisions, inherited controls, or Sprint 8 acceptance criteria.
- **DESIGNED:** expressed as an inspectable architecture rule, route contract, status model, validator, budget, lifecycle, or failure state.
- **IMPLEMENTED IN REPOSITORY:** enforced by the current `apps/site` source and configuration.
- **DETERMINISTICALLY TESTED:** exercised by repository validators and tests.
- **LOCAL PREVIEW VERIFIED:** exercised against a production build served through an isolated local Next.js process.
- **MEASURED:** produces bounded quantitative evidence such as bytes, requests, contrast, routes, or status codes.
- **FOUNDING-STEWARD REVIEWED:** reviewed through the representative implementation protocol with explicit limitations.
- **DEPLOYED:** running in an identified official hosted environment under declared operational controls.
- **OPERATIONALLY VERIFIED:** measured in representative operation with current field evidence.
- **INDEPENDENTLY REVIEWED:** reviewed by a named qualified reviewer outside proposing and implementing authority.

Sprint 8 establishes the first seven statuses where named below. It does not establish deployment, representative operation, or independent review.

## Control map

| Control | Objective | Owning evidence | Current status | Revalidate when |
|---|---|---|---|---|
| `CTL-S8-001` | `apps/site` remains the single public website owner and the migration remains in place rather than parallel. | Website boundary, removed legacy runtime, package and route tests. | Required; designed; implemented in repository; deterministically tested. | Application ownership, runtime, CMS, service, or deployment topology changes. |
| `CTL-S8-002` | Essential information remains server rendered without a client-component dependency. | Root layout, route source, validators, release tests. | Required; designed; implemented in repository; deterministically tested; local preview verified. | Any essential route gains client state, hydration dependency, or remote content. |
| `CTL-S8-003` | Website presentation cannot create Product Constitution, canon, Chronicle, permission, Aster, Forge, funding, provider, clinical, legal, or governance authority. | Boundary architecture, source-linked view models, page copy, reconciliation. | Required; designed; implemented in repository; deterministically tested; founding-steward reviewed. | Status, source, page role, domain integration, or public claim changes. |
| `CTL-S8-004` | Public and explicitly synthetic information remain the only website evidence classes. | Publication policy, contribution rules, source adapters, secret and field scans. | Required; designed; implemented in repository; deterministically tested. | A private source, signup provider, analytics system, support system, or production data path is proposed. |
| `CTL-S8-005` | Direct navigation reaches every essential destination without narrative traversal. | Direct navigation registry, route contract, rendered link checks. | Required; designed; implemented in repository; deterministically tested; local preview verified; founding-steward reviewed. | Navigation, route, information architecture, or essential destination changes. |
| `CTL-S8-006` | The optional Ogygia path reaches the same essential information and uses native disclosure semantics. | Narrative navigation registry and component, parity tests. | Required; designed; implemented in repository; deterministically tested; founding-steward reviewed. | Narrative flow, exclusive content, animation, or client logic changes. |
| `CTL-S8-007` | Live, experimental, planned, and long-horizon statuses remain controlled, visually distinct, and source linked. | Capability status registry, badges, roadmap records, contrast checks. | Required; designed; implemented in repository; deterministically tested; local preview verified. | Status vocabulary, styling, capability claim, or source authority changes. |
| `CTL-S8-008` | The frozen player promise and public-software/private-data boundary remain exact and prominent. | Homepage, Promise route, source validators. | Required; designed; implemented in repository; deterministically tested; founding-steward reviewed. | Promise text, data boundary, homepage, or product positioning changes. |
| `CTL-S8-009` | The exact Seven Laws remain visible and non-amendable by website presentation. | Seven Laws data, route, canon source link, tests. | Required; designed; implemented in repository; deterministically tested. | Canon, law text, route, or presentation authority changes. |
| `CTL-S8-010` | Product-experience explanation preserves deterministic authority, player confirmation, non-punitive return, and non-AI fallback. | How It Works route and data, Aster route, tests. | Required; designed; implemented in repository; deterministically tested; founding-steward reviewed. | Gameplay, Aster, authority, confirmation, return, or fallback contracts change. |
| `CTL-S8-011` | Consumer-first explanation remains provider-respectful and provider independent. | Consumer First route, Decision 0010 links, source checks. | Required; designed; implemented in repository; deterministically tested; founding-steward reviewed. | Provider, connector, standard, enterprise, clinical, or interoperability claims change. |
| `CTL-S8-012` | Aster remains proposal and explanation only; production AI is not represented as live. | Aster route, Aster contracts, source and rendered checks. | Required; designed; implemented in repository; deterministically tested; local preview verified. | Model, provider, memory, retrieval, workflow, egress, or AI authority changes. |
| `CTL-S8-013` | Open Forge exposes exactly the accepted ten local public/synthetic tools and their non-authority. | Forge route, accepted tool presentation registry, tests. | Required; designed; implemented in repository; deterministically tested; local preview verified. | Tool identity, count, transport, source, remote access, or authority changes. |
| `CTL-S8-014` | Trust Center distinguishes documented, tested, deployed, operationally verified, and independently reviewed evidence. | Trust route, trust data, open-gate copy, tests. | Required; designed; implemented in repository; deterministically tested; founding-steward reviewed. | Security, privacy, accessibility, provider, funding, or certification claims change. |
| `CTL-S8-015` | Roadmap views remain typed read-only presentation backed by canonical repository sources. | Public roadmap registry, roadmap page, source links, tests. | Required; designed; implemented in repository; deterministically tested. | Sprint, phase, capability, release, or source-record status changes. |
| `CTL-S8-016` | Public support is separated from protected security, conduct, account, and personal-information evidence. | Support route registry, publication policy, security and conduct links, tests. | Required; designed; implemented in repository; deterministically tested; founding-steward reviewed. | Support intake, account support, private reporting, moderation, or incident routing changes. |
| `CTL-S8-017` | Funding transparency reads the two fixed canonical public economics registers and fails closed on unsupported structure. | Build-time funding adapter, canonical YAML, economics validator, tests. | Required; designed; implemented in repository; deterministically tested; local preview verified. | Registry path, schema, relationship, opportunity, or parser changes. |
| `CTL-S8-018` | Funding recognition cannot create recommendation, ranking, authority, endorsement, findings, or progression. | Funding page, recognition and conflict policies, source checks. | Required; designed; implemented in repository; deterministically tested; founding-steward reviewed. | A relationship, benefit, provider, sponsor, affiliate, or recognition placement changes. |
| `CTL-S8-019` | No transaction, legal-recipient, treasury, charitable, tax, donation, sponsorship-intake, or payment claim activates without operational evidence. | Funding page, empty registers, source scans, Permissions Policy, tests. | Required; designed; implemented in repository; deterministically tested; local preview verified. | Funding operations, entity, fiscal sponsor, payment rail, bank, checkout, or tax status changes. |
| `CTL-S8-020` | Email signup remains paused and no-intake for Sprint 8. | `/api/join`, `/privacy`, `/joined`, gate #63, source and preview tests. | Required; designed; implemented in repository; deterministically tested; local preview verified; founding-steward reviewed. | Any parser, provider, form, webhook, cookie, storage, forwarding, retention, or activation is proposed. |
| `CTL-S8-021` | Signup final activation or retirement remains a Phase 0 closure gate rather than silent Sprint 8 behavior. | Issue #63, 8.8 record, current status, roadmap tracking. | Required; designed; implemented in repository tracking; deterministically checked. | Gate scope, ownership, disposition, or Phase 0 closure criteria change. |
| `CTL-S8-022` | Skip links, language, main landmark, one `h1`, heading order, IDs, labels, link names, and image alternatives remain machine checked. | Release contract, source validator, local-preview validator, tests. | Required; designed; implemented in repository; deterministically tested; local preview verified. | Layout, semantic structure, component library, images, or route content changes. |
| `CTL-S8-023` | Keyboard focus remains visible and not suppressed. | Global CSS, source validator, representative review. | Required; designed; implemented in repository; deterministically tested; founding-steward reviewed. | Focus styling, interactive elements, component library, or forced-color behavior changes. |
| `CTL-S8-024` | Reduced-motion, reduced-data, increased-contrast, forced-colors, responsive, and image-failure paths remain present. | CSS media contracts, source tests, manual-review protocol. | Required; designed; implemented in repository; deterministically tested; founding-steward reviewed. | Styling, imagery, animation, layout, or breakpoint behavior changes. |
| `CTL-S8-025` | Accepted solid design-token pairs meet at least 7:1 contrast. | Release contract and measured contrast calculations. | Required; designed; implemented in repository; deterministically tested; measured. | Color tokens, backgrounds, status styling, or button styling changes. |
| `CTL-S8-026` | Route-level HTML, JavaScript, CSS, image, font, total-transfer, and request ceilings remain explicit and enforced. | Release contract, preview validator, CI artifact. | Required; designed; implemented in repository; local preview verified; measured. | Framework, dependency, route, asset, font, rendering, or build output changes. |
| `CTL-S8-027` | Zero web-font dependence remains enforced. | Release contract, runtime resource measurement, CI artifact. | Designed; implemented in repository; local preview verified; measured. | Any font preload, remote font, package, or CSS font-face is introduced. |
| `CTL-S8-028` | Public pages expose required security headers and a nonce CSP without production `unsafe-eval`. | `next.config.mjs`, proxy, source validation, local-preview header checks. | Required; designed; implemented in repository; deterministically tested; local preview verified. | Framework, proxy, route matcher, header, CSP, hosting, or asset policy changes. |
| `CTL-S8-029` | Public runtime resources remain first party and rendered source remains free of named secret patterns. | Preview resource scanner, source validator, secret patterns, CI. | Required; designed; implemented in repository; deterministically tested; local preview verified. | External script, image, font, analytics, provider, secret, or configuration path changes. |
| `CTL-S8-030` | Canonical URLs, descriptions, indexing, sitemap, robots, 404, API methods, and asset cache behavior remain verified. | Release contract, metadata routes, preview validator, tests. | Required; designed; implemented in repository; deterministically tested; local preview verified. | Domain, route, redirect, indexing, metadata, API, or cache rules change. |
| `CTL-S8-031` | Production builds and preview validation leave no tracked mutation or generated build-info file. | Permanent CI cleanup and `git diff --exit-code`. | Required; designed; implemented in repository; deterministically tested; local preview verified. | Next.js, TypeScript, build directory, generated files, or CI process changes. |
| `CTL-S8-032` | Git-triggered deployment remains disabled until an explicit attributable release decision. | `vercel.json`, tests, release-state record. | Required; designed; implemented in repository; deterministically tested. | Deployment project, Git integration, environment, release process, or authorization changes. |
| `CTL-S8-033` | Local preview evidence remains labeled as repository implementation evidence, not hosted release or certification. | Evidence schema, validator report, review protocol, completion records. | Required; designed; implemented in repository; deterministically tested; founding-steward reviewed. | Evidence class, deployment, public claim, reviewer, or release status changes. |
| `CTL-S8-034` | Rollback can restore the accepted pre-Sprint 8 site or disable public deployment without data migration. | Migration boundary, release and rollback record, no runtime database. | Required; designed; implemented as repository plan; founding-steward reviewed. | Deployment, storage, signup, remote content, domain, or data migration is introduced. |
| `CTL-S8-035` | Sprint 9 handoff remains public, synthetic, no-account, no-real-health-data, refusal-capable, and bounded to the prologue. | Sprint roadmap and handoff record. | Required; designed; recorded for future implementation. | Sprint 9 scope, temporary data, account conversion, gameplay, Aster, or receipt behavior changes. |
| `CTL-S8-036` | Sprint 8 cannot close or start Sprint 9 without explicit founding-steward acceptance and squash merge. | Execution plan, issue #60, PR #61, completion record. | Required; designed; implemented in governance tracking. | Acceptance authority, merge policy, issue state, or sprint sequencing changes. |

## Acceptance support

The controls collectively support the Sprint 8 acceptance criteria at the bounded evidence level:

- `CTL-S8-005` through `CTL-S8-007`, `CTL-S8-022` through `CTL-S8-027` support accessible, non-exclusive, resilient essential information and measured baselines.
- `CTL-S8-011`, `CTL-S8-015`, `CTL-S8-017`, and `CTL-S8-018` support consumer-first, provider-respectful, source-backed status and funding transparency.
- `CTL-S8-017` through `CTL-S8-021` support canonical economics authority, disabled transactions, and paused signup.
- `CTL-S8-028` through `CTL-S8-033` support repository and isolated local-preview security, metadata, resource, and evidence integrity.
- `CTL-S8-034` through `CTL-S8-036` support reversible release handling and bounded next-sprint sequencing.

## Residual-risk rule

A passing control proves only the evidence status named for that control. It does not automatically close a related production, pilot, specialist, institutional, or measurement holdpoint.

The [Specialist Holdpoint and Unresolved-Work Register](public-site-sprint-8-specialist-holdpoint-and-unresolved-work-register.md) remains controlling for evidence not established by Sprint 8.