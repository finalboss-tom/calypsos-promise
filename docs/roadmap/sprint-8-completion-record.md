# Sprint 8 Completion Record — Public Website Foundation

[Current status](current-status.md) · [Sprint 8 execution plan](sprint-8-execution-plan.md) · [Release, rollback, and Sprint 9 handoff](sprint-8-release-rollback-and-sprint-9-handoff.md) · [Cross-contract reconciliation](../architecture/public-site-sprint-8-cross-contract-reconciliation.md) · [Control and evidence map](../architecture/public-site-sprint-8-control-and-evidence-map.md) · [Specialist holdpoints and unresolved work](../architecture/public-site-sprint-8-specialist-holdpoint-and-unresolved-work-register.md)

- **Status:** IMPLEMENTATION PACKAGE COMPLETE — READY FOR FOUNDING-STEWARD ACCEPTANCE; not accepted, merged, deployed, officially released, or closed
- **Tracking issue:** [#60](https://github.com/finalboss-tom/calypsos-promise/issues/60) — remains open
- **Draft pull request:** [#61](https://github.com/finalboss-tom/calypsos-promise/pull/61) — remains draft and unmerged
- **Entry baseline:** `9da8034220954a1ca50420e71fd94e7795232a35`
- **Validated pre-completion head:** `0f8d6a03fda48608a2eecf9e95c4639650951d48` — CI 1117 and DCO 1199 passed; metadata DCO 1200 passed
- **Application:** `apps/site`
- **Email-signup Phase 0 gate:** [#63](https://github.com/finalboss-tom/calypsos-promise/issues/63) — open
- **Scope:** one public Next.js website foundation, source-backed public explanation and transparency, paused email signup, deterministic validation, isolated local-preview evidence, completion package, release and rollback state, and bounded Sprint 9 handoff

## Readiness decision

The Sprint 8 implementation package is complete for the accepted goal:

> Publish an honest, accessible gateway to Ogygia.

The package is ready for explicit founding-steward acceptance and squash merge.

Readiness applies at the repository implementation, deterministic source-validation, isolated local-production-preview, measured-transfer, and founding-steward representative-review evidence level.

It does not authorize hosted deployment, official release, active email collection, accounts, private data, production AI, providers, connectors, clinical workflows, research, transactions, independent certification, institutional Phase 0 exit, or Sprint 9 implementation.

Sprint 8 becomes complete and merged only after the founding steward explicitly accepts the package and directs the squash merge of PR #61.

## Accepted implementation package

### Website application boundary and migration

Sprint 8 establishes `apps/site` as the single public website owner and migrates the accepted public surface in place.

The prior custom Node server, HTML fragments, legacy page assembly, legacy browser script, and prior signup-forwarding adapter are removed rather than retained as a parallel site.

The site does not introduce a CMS, database, remote content service, queue, scheduler, analytics platform, account service, provider runtime, financial runtime, shared website package, or Sprint 9 gameplay surface.

### Pinned Next.js application shell

The site uses:

- Next.js `16.2.12`;
- React and React DOM `19.2.8`;
- Node.js 24 and pnpm `10.13.1` repository expectations;
- App Router routes and metadata;
- one server-rendered root layout;
- nonce CSP through the Next.js proxy convention;
- public security headers;
- `no-store` API caching;
- mutable repository-asset revalidation; and
- disabled Git-triggered Vercel deployment.

### Public route family

The accepted HTML route contract contains thirteen routes:

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
- `/joined`.

`/api/join`, `/robots.txt`, `/sitemap.xml`, not-found, error, global-error, and repository-owned asset behavior are separately validated.

### Direct and narrative navigation

The public site provides direct navigation and an optional native Ogygia path to the same essential information.

No story traversal, animation, JavaScript enhancement, account, AI, provider, payment, or email submission is required to understand the public project.

### Controlled capability status

The site uses exactly four controlled presentation statuses:

- `live`;
- `experimental`;
- `planned`; and
- `long-horizon`.

Status records are source linked and remain presentation derivatives rather than product, funding, provider, clinical, permission, or governance authority.

### Homepage and Promise

The migrated homepage and dedicated Promise route preserve:

> Build your Living Chronicle. Improve your health. Keep the key.

They explain:

- the public-software/private-data boundary;
- private by default;
- meaningful refusal;
- player confirmation;
- correction and exit;
- meaningfully free access;
- personal value before secondary benefit; and
- the three connected loops of building a record, improving health, and controlling and sharing in created value.

### Seven Laws, How It Works, Consumer First, and Aster

Sprint 8 provides:

- the exact frozen Seven Laws with their non-amendment boundary;
- a planned three-to-eight-minute, player-confirmed, non-punitive experience explanation;
- deterministic authority and non-AI fallback;
- a provider-respectful consumer-first explanation with standards at the edges and provider-independent meaning at the core; and
- an Aster explanation preserving proposal, confirmation, source, uncertainty, memory choice, fallback, and non-authority.

No provider, EHR, connector, clinical workflow, production Aster, model provider, private-data egress, memory service, retrieval service, queue, scheduler, or workflow runtime is live.

### Trust Center

`/trust` organizes:

- player rights;
- public and private information boundaries;
- truthful designed-versus-deployed status;
- authority separation;
- provider and connector status;
- funding doctrine;
- public and private challenge routes; and
- open production and independent-review gates.

It is not a second policy system or a certification surface.

### Open Forge

`/forge` exposes all ten accepted local public/synthetic Forge tool identities, provenance, scopes, limits, receipts, errors, compatibility, tool-specific denials, open holdpoints, unresolved work, and ordinary non-MCP contribution paths.

Forge remains local only, public and synthetic only, non-mutating, provider independent, and non-authoritative.

### Roadmap and capability status

`/roadmap` renders the controlled status vocabulary, shared capability registry, Sprint 8 workstreams, future sprint groupings, and institutional gates through source-linked typed presentation records.

It does not guarantee dates, create release authority, or start future work.

### Support and contribution

`/support` separates public-safe issues, system challenges, contributions, and status orientation from protected security, conduct, account, personal-health, correspondence, export, screenshot, witness, and support evidence.

No private customer-support or account-support system is operating.

### Funding transparency

`/funding` reads the two fixed canonical public economics registers during the build, fails closed on unsupported registry structure, and currently renders honest empty states for:

- zero accepted funding relationships; and
- zero live funding opportunities.

It explains permitted recognition, prohibited benefits, conflict, concentration, correction, continuity, and disabled transactions.

No legal recipient, checkout, donation, sponsorship intake, affiliate flow, payment processor, bank, treasury, charitable status, nonprofit status, tax status, or financial operation is active.

### Paused email signup

The public email newsletter or waitlist remains deliberately paused for Sprint 8:

- `POST /api/join` returns `503 SIGNUP_MIGRATION_PAUSED`;
- `GET /api/join` returns 405;
- input is not parsed;
- no email address is accepted, stored, forwarded, or logged;
- no cookie is set;
- no provider, webhook, mailing platform, database, account, or private destination is active; and
- `/privacy` and `/joined` link to Phase 0 gate #63.

The final preserve-or-retire decision remains outside Sprint 8 completion and blocks institutional Phase 0 exit.

### Accessibility and resilient presentation

The implementation includes:

- server-rendered essential information;
- skip links;
- English language declaration;
- semantic landmarks;
- one `h1` and heading-order validation;
- visible focus;
- native keyboard semantics;
- accessible link names;
- image alternative-text checks;
- reduced motion;
- reduced data;
- increased contrast;
- forced colors;
- responsive layouts;
- image-failure backgrounds; and
- zero web-font dependence.

All nine accepted solid design-token pairs exceed 7:1. The lowest measured pair is long-horizon status at 7.86:1.

A founding-steward representative implementation review is recorded. Independent review, formal conformance, direct assistive-technology testing, affected-user testing, physical-device coverage, zoom and reflow sampling, and field evidence remain open.

### Performance budgets and measured evidence

The permanent release contract enforces:

- HTML: 98,304 bytes per route;
- JavaScript: 720,896 bytes per route;
- CSS: 131,072 bytes per route;
- images: 1,572,864 bytes per route;
- web fonts: zero bytes;
- total transfer: 2,097,152 bytes per route; and
- first-party requests: 32 per route.

The exact 8.9 local-preview evidence measured:

- largest HTML: `/roadmap` at 64,830 bytes;
- largest JavaScript total: `/roadmap` at 689,664 bytes;
- CSS: 21,374 bytes;
- largest image transfer: `/` at 92,319 bytes;
- web fonts: zero bytes;
- largest total transfer: `/` at 850,159 bytes; and
- largest first-party request count: `/` at 14.

These are regression ceilings and isolated local-preview measurements, not field or Core Web Vitals evidence.

### Permanent validation

Ordinary CI now includes nine jobs:

1. formatting;
2. documentation links;
3. repository policy;
4. economics validation;
5. content validation;
6. lint and permanent source validation;
7. typecheck;
8. tests; and
9. `site-release-validation`.

The permanent release job:

- builds the production site;
- starts an isolated local production server;
- validates all accepted routes and supporting surfaces;
- checks structure, links, metadata, canonical URLs, indexing, headers, nonce CSP, first-party resources, secrets, budgets, signup, sitemap, robots, 404, API methods, and asset caching;
- emits `calypsos.site-release-evidence.v1`;
- uploads the JSON report and preview log;
- removes generated build state; and
- proves no tracked build mutation.

### Release, rollback, and handoff

The [Release, Rollback, and Sprint 9 Handoff](sprint-8-release-rollback-and-sprint-9-handoff.md) records:

- no hosted preview or production deployment is claimed;
- merge and release remain separate decisions;
- deployment stays disabled by default;
- repository, preview, production, and data rollback boundaries;
- no Sprint 8 data or transaction migration exists;
- Sprint 9 entry conditions;
- the public synthetic prologue scope; and
- inherited temporary-data, no-account, synthetic Chronicle, Aster, receipt, refusal, accessibility, security, funding, and provider boundaries.

## Acceptance-criterion status

The implementation package supports all Sprint 8 acceptance criteria at the named evidence level:

- **Distinct statuses:** implemented, source linked, visually distinct, and contrast tested.
- **Essential information without animation or story traversal:** implemented through direct navigation, server rendering, native narrative disclosure, reduced-motion behavior, and parity checks.
- **Accessibility and performance baselines:** defined and passed at automated, deterministic, isolated-local-preview, measured-transfer, and founding-steward representative-review level.
- **Canonical funding source:** implemented through fixed canonical economics registers and fail-closed parsing.
- **Consumer-first accuracy:** implemented without representing providers, EHRs, connectors, clinical, or enterprise capability as live.
- **Recognition separation:** implemented without recommendation, ranking, endorsement, permission, safety, guidance, findings, or progression authority.
- **Transactions disabled:** implemented with empty live registers, no transaction controls, denied payment capability, and no operational financial claims.

The sprint-level checkboxes remain subject to explicit founding-steward acceptance. Independent-review and hosted-operation limitations remain visible rather than being treated as acceptance-criterion failure or silently erased.

## Completion-package evidence

The package records:

- thirty-six stable control objectives;
- twenty open Sprint 8 holdpoints;
- twenty unresolved-work records;
- one cross-contract reconciliation;
- one release and rollback record;
- one bounded Sprint 9 handoff;
- deterministic repository validation;
- isolated local production-preview validation;
- measured route and contrast evidence;
- a representative founding-steward implementation review;
- truthful release and certification boundaries; and
- the Phase 0 email-signup gate.

Pre-completion immutable evidence includes:

- workstream 8.7 final head `cf01f028dc9986c01559ff440fa9069a57e0837e` — CI 1094, DCO 1175;
- workstream 8.9 final head `0f8d6a03fda48608a2eecf9e95c4639650951d48` — CI 1117, DCO 1199, metadata DCO 1200; and
- `site-release-evidence` artifact tied to `0f8d6a03fda48608a2eecf9e95c4639650951d48` with JSON report and preview log.

The final 8.10 exact-head validation is recorded in issue #60 and PR #61 after the completion package itself passes the permanent suite.

## Evidence limits

Sprint 8 does not establish:

- hosted preview or production deployment;
- official release or deployed environment ownership;
- deployed DNS, TLS, CDN, cache, header, CSP, monitoring, incident, backup, or rollback verification;
- independent accessibility or security review;
- formal WCAG conformance;
- assistive-technology, affected-user, physical-device, browser-matrix, zoom, reflow, or field-performance evidence;
- active email collection or final email-signup retirement;
- accounts, authentication, private identity, or private Living Chronicles;
- production Aster, model providers, private MCP, remote Forge, providers, connectors, clinical workflows, research, or transactions;
- operating funding, payment, treasury, tax, charitable, or nonprofit systems;
- institutional Phase 0 completion; or
- playable Sprint 9 evidence.

## Open holdpoints

The controlling follow-up record is the [Sprint 8 Public Website Specialist Holdpoint and Unresolved-Work Register](../architecture/public-site-sprint-8-specialist-holdpoint-and-unresolved-work-register.md).

No production, release, independent specialist, affected-user, field-measurement, signup, funding, provider, or institutional holdpoint closes because Sprint 8 is accepted or merged.

## Acceptance and merge gate

The implementation package is ready for the founding steward to decide whether to:

1. accept Sprint 8 at the stated evidence level;
2. direct squash merge of PR #61;
3. close issue #60 as completed after the merge is verified; and
4. authorize a post-merge reconciliation.

Until that explicit direction is given:

- PR #61 remains draft and unmerged;
- issue #60 remains open;
- Sprint 8 remains active;
- deployment remains disabled;
- issue #63 remains open;
- Sprint 9 remains planned and not started; and
- this record is readiness evidence, not a completed merge record.

## Handoff

After acceptance, squash merge, issue closure, and post-merge reconciliation, a dedicated pre-Sprint 9 alignment review becomes the controlling next step.

Sprint 9 inherits the exact boundaries in the [Release, Rollback, and Sprint 9 Handoff](sprint-8-release-rollback-and-sprint-9-handoff.md).
