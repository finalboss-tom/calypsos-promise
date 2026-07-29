# Sprint 8 Workstream 8.9 Record — Full Website Validation

[Current status](current-status.md) · [Sprint 8 plan](sprint-8-execution-plan.md) · [Workstream 8.8 record](sprint-8-workstream-8-8-record.md) · [Review protocol](sprint-8-workstream-8-9-review-protocol.md) · [Representative review](sprint-8-workstream-8-9-manual-review.md) · [Draft PR #61](https://github.com/finalboss-tom/calypsos-promise/pull/61)

- **Status:** COMPLETE FOR THE ACCEPTED SPRINT 8.9 SCOPE
- **Application:** `apps/site`
- **Initial normal validation candidate:** `24c3c48e6358251708b56452d1fd9019bf67e08f`
- **Initial normal CI evidence:** CI 1110 and DCO 1192 passed
- **Information class:** PUBLIC implementation and synthetic evidence only
- **Deployment status:** not deployed and not officially released

## Result

Workstream 8.9 establishes a permanent source and isolated local production-preview validation layer for the accepted public website.

It validates the current route family, accessibility implementation contracts, route metadata, security headers, CSP, sitemap, robots, not-found behavior, source authority, funding transparency, paused signup state, resource provenance, transfer budgets, secret patterns, generated-state cleanup, and repository consistency.

## Workstream 8.8 inheritance

Workstream 8.8 selected the bounded interim email-signup disposition:

- keep `/api/join`, `/privacy`, and `/joined` in the paused no-intake state;
- accept, parse, store, and forward no email address;
- activate no provider, webhook, database, mailing platform, account, or private destination; and
- defer final safe activation or deliberate retirement to Phase 0 gate issue #63.

The 8.9 validation layer treats any silent reactivation, parser, provider configuration, forwarding path, cookie, or contradictory public copy as a failure.

## Permanent validation implementation

### Source contract

`apps/site/src/release-contract.mjs` defines:

- thirteen accepted routes and their indexing behavior;
- route-level HTML, JavaScript, CSS, image, web-font, total-transfer, and request-count budgets;
- the complete public security-header contract;
- required CSP directives;
- nine accepted design-token contrast pairs;
- bounded rendered-output secret patterns; and
- the Phase 0 signup gate.

### Source validation

`apps/site/src/validate-release-source.mjs` runs in the ordinary site lint command and checks:

- route registry, page source, canonical metadata, no-index behavior, and server rendering;
- skip links, main landmark, optional narrative path, navigation parity, sitemap, and robots;
- focus treatment, minimum target height, reduced motion, reduced data, contrast, and forced-colors foundations;
- security-header and CSP source contracts;
- paused signup non-collection behavior and issue #63 linkage;
- secret-pattern absence; and
- absence of payment runtime behavior.

### Isolated production-preview validation

The permanent `site-release-validation` CI job:

1. builds the pinned Next.js application in production mode;
2. starts an isolated local production server;
3. fetches every accepted route and supporting metadata/API surface;
4. validates rendered semantics, headings, IDs, labels, alternatives, canonical metadata, no-index behavior, headers, CSP, resources, and budgets;
5. validates sitemap, robots, 404, asset caching, and paused signup behavior;
6. emits `calypsos.site-release-evidence.v1`;
7. uploads the JSON evidence and server log;
8. removes build output and generated TypeScript state; and
9. proves that no tracked build mutation remains.

This job is part of ordinary pull-request and main-branch CI rather than a one-time temporary workflow.

## Initial failures and corrections

The first integrated 8.9 run found validation-layer defects and one budget calibration need while the production build itself passed:

- root canonical comparison treated equivalent slash forms as different;
- optimized-image query strings retained HTML entity encoding before fetch;
- duplicate-ID collection contained unnecessary logic;
- the source validator looked for the optional-navigation statement in the data module rather than the navigation component;
- broad source matching interpreted validator and public policy language as payment runtime; and
- the initial 512 KiB JavaScript ceiling was below the measured pinned Next.js production baseline.

Corrections:

- canonical URLs are compared semantically;
- attribute entities are decoded before resource fetch;
- ID collection is direct and deterministic;
- the navigation component is included in the source check;
- validator files are excluded from public application-source scans and payment matching targets executable runtime patterns; and
- the JavaScript ceiling is 704 KiB, approximately four percent above the largest measured current route.

The corrections did not remove route, accessibility, security, metadata, authority, signup, or resource checks.

## Automated evidence

The first normal candidate passed all nine CI jobs:

- formatting;
- documentation links;
- repository policy;
- economics validation;
- content validation;
- lint and source validation;
- typecheck;
- tests; and
- site release validation.

The production-preview report recorded:

- all thirteen accepted routes returned 200;
- sitemap and robots returned 200;
- the missing route returned 404;
- signup POST returned 503 and GET returned 405;
- the repository-owned asset returned 200;
- no report failures;
- no external runtime resource;
- no web-font transfer; and
- no tracked build mutation.

## Measured performance evidence

| Metric | Largest measured route or value | Budget |
| --- | ---: | ---: |
| HTML | `/roadmap` — 64,830 bytes | 98,304 bytes |
| JavaScript | `/roadmap` — 689,664 bytes | 720,896 bytes |
| CSS | all routes — 21,374 bytes | 131,072 bytes |
| images | `/` — 92,319 bytes | 1,572,864 bytes |
| web fonts | all routes — 0 bytes | 0 bytes |
| total transfer | `/` — 850,159 bytes | 2,097,152 bytes |
| first-party requests | `/` — 14 | 32 |

These are isolated local production-preview measurements and regression ceilings. They are not field-performance evidence, Core Web Vitals, a slow-device study, or a production CDN measurement.

## Contrast evidence

All accepted solid design-token pairs exceed 7:1. The lowest accepted pair is the long-horizon status at 7.86:1; the highest is primary text at 16.23:1.

The calculations do not independently certify every translucent, composited, image-backed, hover, focus, browser, or operating-system state.

## Representative review

The [Representative Implementation Review](sprint-8-workstream-8-9-manual-review.md) records a founding-steward pass with explicit limitations across:

- semantics and reading order;
- keyboard and focus foundations;
- labels, names, and alternatives;
- contrast;
- motion, bandwidth, and image failure;
- responsive behavior;
- status and authority;
- funding and support boundaries;
- paused email signup; and
- errors and recovery.

It is not independent specialist review or affected-user testing.

## Acceptance decision

Workstream 8.9 is complete for its accepted repository implementation, isolated local production-preview, deterministic validation, transfer-budget, and founding-steward representative-review scope.

The permanent CI job must remain green through workstream 8.10 and later website changes.

## Evidence limits and open holdpoints

Sprint 8.9 does not establish:

- a hosted public preview or production deployment;
- deployed security-header, CSP, caching, DNS, CDN, or infrastructure verification;
- independent accessibility certification or a formal WCAG conformance claim;
- assistive-technology, affected-user, physical-device, browser-matrix, zoom, or field-performance evidence;
- production security, privacy, clinical, interoperability, legal, financial, provider, operational, or research approval;
- final email-signup activation or retirement; or
- closure of issue #63, institutional Phase 0, Sprint 8, issue #60, or PR #61.

These limits become explicit inputs to workstream 8.10 and later specialist, deployment, and Phase 0 gates.
