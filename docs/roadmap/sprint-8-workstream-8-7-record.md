# Sprint 8.7 Record — Roadmap, Support, and Funding Transparency

[Current status](current-status.md) · [Sprint 8 plan](sprint-8-execution-plan.md) · [Workstream 8.6 record](sprint-8-workstream-8-6-record.md) · [Website architecture](../architecture/public-website-foundation-and-migration.md) · [Economics](../economics/README.md)

- **Status:** implementation complete; repository-wide reconciliation and exact-head validation recorded separately
- **Workstream:** 8.7 — Roadmap, capability status, support, and canonical funding transparency
- **Application:** `apps/site`
- **Branch:** `agent/sprint-8-public-website-foundation`
- **Draft pull request:** #61
- **Focused implementation candidate:** `f39176f5f3a842e89ff4681f1d9810a9f2f305cf`
- **Information boundary:** public repository records and explicitly synthetic evidence only
- **Transaction boundary:** no donation, sponsorship, checkout, payment, refund, tax, treasury, provider-intake, or private-support runtime

## Goal

Make the project’s roadmap, evidence status, contribution routes, and funding doctrine legible without creating parallel sources of truth or operational systems that the repository has not authorized.

## Public routes

### `/roadmap`

The roadmap page provides:

- the controlled `live`, `experimental`, `planned`, and `long-horizon` status definitions;
- the shared source-linked public capability registry;
- a typed site-local Sprint 8 presentation registry;
- explicit 8.7 implementation, 8.8 signup, 8.9 validation, and 8.10 completion gates;
- future Sprint 9–19 groupings with canonical source links;
- the institutional Phase 0 and progressive-stewardship horizon; and
- plain language that a roadmap is an evidence sequence rather than a release-date, production-readiness, funding, or authority promise.

The site-local roadmap registry is presentation data. The canonical current-status record, Sprint 8 plan, sprint sequence, and institutional roadmap remain upstream authority.

### `/support`

The support page provides:

- a public-safe issue-form route;
- the system-challenge and revalidation route;
- the ordinary contribution guide;
- current-status orientation before duplicate questions or work;
- separate security-vulnerability and accidental-disclosure direction;
- separate conduct and harassment direction;
- explicit prohibition on publishing personal health, account, support, correspondence, screenshot, export, witness, or other protected evidence; and
- explicit absence of an account-specific customer-support, health-advice, clinical-triage, provider-intake, or research-enrollment service.

GitHub issues remain the public-safe governed-work ledger. The website does not create a private support database, ticket system, account system, or moderation archive.

### `/funding`

The funding page provides:

- build-time reading of `docs/economics/funding-records.yml` and `docs/economics/funding-opportunities.yml`;
- a bounded upward repository-root search for those two fixed public paths;
- fail-closed parsing when a canonical register is neither explicitly empty nor parseable;
- registry schema, revision, status, information class, review date, and operational notice;
- honest empty states for the current zero accepted relationships and zero live opportunities;
- future rendering of bounded public relationship summaries without importing raw private source records;
- permitted recognition and prohibited-benefit explanations;
- funding conflict, independence, correction, and ordinary-review boundaries;
- 10%, 20%, and 33% provisional concentration review triggers; and
- an explicit disabled transaction, legal-recipient, entity, payment, tax, treasury, and public-benefit boundary.

The website does not maintain an independent sponsor database, donor CRM, bank ledger, tax ledger, contract archive, payroll source, payment processor, or funding authority.

## Capability registry

The site-local capability registry now distinguishes:

- the live public repository;
- the experimental public website foundation;
- the experimental Trust Center and Open Forge;
- the experimental roadmap, support, and funding-transparency views;
- the planned signup disposition;
- the planned public synthetic prologue; and
- the long-horizon private Living Chronicle product.

Every record has a stable ID, controlled status, summary, canonical source URL, and source label.

## Navigation and presentation

The three routes are available through:

- conventional direct navigation;
- the optional narrative navigation path;
- footer navigation; and
- the sitemap.

All essential information remains server-rendered. No `use client` boundary, form, input, payment control, remote content system, CMS, database, or tracking dependency was introduced.

`public-records.css` preserves responsive single-column behavior, reduced-data behavior, higher-contrast borders, forced-colors behavior, and non-image essential presentation.

## Deterministic validation

Validation now checks:

- required route, registry, module, and stylesheet files;
- direct and narrative navigation parity;
- sitemap inclusion;
- typed source-linked roadmap records and all four controlled statuses;
- public-safe and protected support-route separation;
- canonical funding YAML empty states and operational notices;
- build-time repository file loading and fail-closed parsing;
- absence of funding forms, inputs, buttons, Stripe, PayPal, checkout-session, or payment-intent behavior;
- no client-component dependency for essential information;
- paused signup and disabled Git-triggered deployment; and
- reduced-data, contrast, forced-colors, and responsive presentation.

## Validation evidence

The first implementation pass passed every substantive repository CI job and found only canonical formatting differences.

The initial focused production build exposed one repository-file loading defect: Turbopack transformed a module-relative `URL` object before Node consumed it. The reader was corrected to search upward from `process.cwd()` for two fixed canonical repository paths using string filesystem paths.

The self-removing focused workflow then passed:

- canonical repository formatting;
- the Next.js production build;
- site deterministic validation and lint;
- TypeScript checking;
- focused site tests;
- generated TypeScript build-state cleanup;
- final formatting; and
- temporary workflow self-removal.

It produced clean focused candidate `f39176f5f3a842e89ff4681f1d9810a9f2f305cf`.

## Evidence limits

Workstream 8.7 does not establish:

- a production or officially released website;
- preview or deployed-environment evidence;
- final signup disposition;
- independent accessibility, security, privacy, clinical, interoperability, legal, accounting, tax, financial-control, provider, procurement, research, or governance review;
- an approved legal recipient, entity, fiscal sponsor, payment processor, bank, accounting platform, treasury, refund system, tax status, or donation path;
- accepted funding relationships or live funding opportunities;
- private customer support, account support, provider intake, research enrollment, or personal-data handling;
- provider ranking, connector placement, endorsement, recommendation, health guidance, or sponsor authority; or
- Sprint 9 gameplay.

## Handoff

Workstream 8.8 may now make the explicit signup preserve-or-retire decision and implement only the accepted bounded path.

It must preserve the accepted page family, canonical source authority, public/private information separation, server-rendered essential information, accessibility and resilience foundations, disabled deployment, funding neutrality, transaction prohibition, and every permanent Sprint 8 non-scope boundary.
