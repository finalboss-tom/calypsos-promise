# Pre-Sprint 8 Repository Alignment Review

[Documentation home](../README.md) · [Roadmap index](README.md) · [Current status](current-status.md) · [Sprint sequence](sprints.md) · [Sprint 7 completion](sprint-7-completion-record.md) · [Forge reconciliation](../architecture/forge-sprint-7-cross-contract-reconciliation.md) · [Tracking issue #58](https://github.com/finalboss-tom/calypsos-promise/issues/58)

- **Status:** ACTIVE POST-MERGE RECONCILIATION — Sprint 8 implementation has not started
- **Reviewed baseline:** `main` at Sprint 7 squash commit `f28f054fe16d550fad37663cf234e06c5622dd42`
- **Review date:** 2026-07-28
- **Next accepted sprint:** Sprint 8 — Public website foundation
- **Existing website surface:** `apps/site`, Website Track 0A — Repository Gateway
- **Scope:** mission, player promise, incentives, governance, architecture, security, funding, provider independence, operability, website status, current implementation, deployment and migration risks, open-source maintenance, and bounded Sprint 8 handoff
- **Certification boundary:** internal repository-consistency and implementation-readiness review; not independent accessibility, security, privacy, clinical, legal, interoperability, operations, financial, AI-safety, user-research, performance, or production-readiness certification

## Decision summary

The accepted Sprint 8 goal, deliverables, acceptance criteria, and numbered sequence remain correct:

> Publish an honest, accessible gateway to Ogygia.

No decision record or Sprint 8 scope change is required if implementation remains inside this review.

Sprint 8 must evolve the existing `apps/site` repository gateway in place. It must not create a duplicate public website, parallel status system, independent funding ledger, CMS, database, account system, private-data path, provider runtime, or premature service boundary.

Sprint 7 is accepted and squash merged. The remaining entry gate is this post-merge reconciliation: repair status truth, bind the actual migration risks, validate the repository, obtain founding-steward acceptance, and squash merge the reconciliation before opening a Sprint 8 implementation branch.

## Entry-gate status

1. Sprint 7 workstream 7.10 is complete — **met**.
2. Issue #54 records founding-steward acceptance — **met**.
3. PR #55 is squash merged — **met** as `f28f054fe16d550fad37663cf234e06c5622dd42`.
4. Sprint 7 completion and status evidence exists — **met**, subject to post-merge status repair in this reconciliation.
5. The pre-Sprint 8 repository review is merged — **open** through issue #58.
6. A separate Sprint 8 issue, execution plan, branch, and draft PR inherit this review — **not started**.

Sprint 8 does not require closing Forge production or specialist holdpoints because its accepted scope is a public website over public records and explicitly synthetic examples.

## Review authority and precedence

The review used this order:

1. frozen Product Constitution, Vision, Architecture Foundation, Gameplay Foundation, World and Lore Canon, and institutional commitments;
2. accepted decisions, including progressive decentralization, the Institutional Immune System, funding doctrine, consumer-first provider independence, and operational simplicity;
3. security, publication, development, economics, accessibility, and contributor policies;
4. controlled vocabulary, deterministic incentives, Living Chronicle, House of Keys, Aster, and Forge baselines;
5. accepted Sprint 8 goal, deliverables, and acceptance criteria;
6. the merged Sprint 7 completion package and open holdpoints;
7. the actual `apps/site` Track 0A implementation, deployment configuration, public URLs, assets, copy, tests, and signup adapter; and
8. this reconciliation.

A lower layer may implement, test, or explain a higher-authority requirement. It may not silently weaken it.

## Review conclusion

Calypso’s Promise remains aligned from the frozen Promise through the merged Forge baseline and into the public website foundation.

The review found no basis to:

- reopen the Product Constitution, frozen architecture, lore, gameplay, funding doctrine, consumer-first boundary, or operational-simplicity decision;
- change the accepted Sprint 8 goal, deliverables, acceptance criteria, or sequence;
- create another site application or extract a shared website package before a second consumer exists;
- add a CMS, database, remote content service, analytics platform, account system, provider service, or donation runtime;
- treat the website as the source of product, security, funding, provider, clinical, legal, or governance authority; or
- activate Sprint 9 prologue, private-product, provider, connector, financial, or institutional capabilities through website implementation.

The material work before Sprint 8 is status repair and implementation clarification, not architecture redesign.

## Repository state entering Sprint 8

The merged repository contains:

- Website Track 0A at `apps/site`;
- the complete local public/synthetic Forge application at `apps/mcp-forge`;
- frozen product, lore, architecture, gameplay, and institutional foundations;
- pre-stable Living Chronicle, House of Keys, and Aster contract baselines;
- security, funding, consumer-first, provider-independent, operational-simplicity, accessibility, and publication policies;
- public standards references, draft mappings, and explicitly synthetic connector fixtures;
- honest capability-status vocabulary; and
- open production, specialist, institutional, accessibility, release, and measurement holdpoints.

No account system, private Chronicle, production Aster, provider call, connector runtime, donation checkout, research enrollment, governance vote, private MCP, or production health-data path is active.

## Actual Website Track 0A inventory

### Application and runtime

`apps/site` is a private workspace application with no runtime package dependencies. It currently uses:

- `src/server.mjs` as a custom Node HTTP server;
- `src/signup.mjs` as an isolated signup webhook adapter;
- HTML fragments under `src/views/`;
- CSS, JavaScript, SVG, and WebP assets under `public/`;
- `src/check-site.mjs` for required-file, required-copy, and prohibited-signup-field checks; and
- `node --test` for its public test suite.

The repository-wide Turbo configuration already recognizes `.next/**` build output, so an in-place Next.js migration fits the existing monorepo boundary without a new application or package.

### Public routes and contracts

The current server exposes:

- `/` — cinematic repository gateway;
- `/privacy` — Founding Expedition signup privacy notice;
- `/joined` — signup confirmation;
- `/api/join` — purpose-limited email signup endpoint; and
- static assets under `/assets`, `/styles`, and `/site.js`.

Sprint 8 must preserve, redirect, or explicitly retire each public route. Silent route loss is not an acceptable migration strategy.

### Current public content

The homepage currently contains semantic HTML for:

- the player promise and planned game;
- the game loop;
- Aster’s proposal-only authority;
- Ogygia and canonical zones;
- privacy, meaningful refusal, confirmation, correction, export, and deletion principles;
- live-versus-planned capability status;
- repository and current-status links; and
- the Founding Expedition signup surface.

The warm cinematic Ogygia direction remains approved. Sprint 8 should preserve it through deliberate cuts and splices rather than treating the framework migration as permission for a generic visual reset.

### Current security and accessibility foundations

Track 0A already provides:

- semantic HTML and one skip link;
- named landmarks and navigation;
- reduced-motion and responsive behavior;
- live text rather than flattened copy inside images;
- a content security policy;
- frame, content-type, referrer, opener, and permissions headers;
- bounded request bodies;
- no health-data signup fields; and
- generic signup failure logging without email content.

These are useful foundations, not accessibility, privacy, security, or production certification.

### Current deployment state

`apps/site/vercel.json` sets `git.deploymentEnabled` to `false`. Git-triggered preview and production deployments are therefore intentionally disabled today.

Sprint 8 may change deployment behavior only through an explicit preview, cutover, rollback, and official-release decision. Framework migration must not silently switch the public site, expose an unfinished preview as official, or remove the ability to restore Track 0A.

## Retain, mature, and retire deliberately

### Retain or deliberately migrate

- the warm cinematic Ogygia visual direction;
- repository-owned concept-art crops and truthful captions;
- semantic live HTML for essential information and controls;
- prominent GitHub, documentation, current-status, and contribution paths;
- the player promise as the primary message;
- reduced-motion, responsive, keyboard, and image-failure resilience;
- the current security-header intent;
- honest live-versus-planned language;
- the isolated purpose-limited signup boundary; and
- the rule that essential information does not depend on flattened imagery, animation, audio, lore knowledge, or client JavaScript.

### Replace or mature

- the custom Node server with one Next.js application in `apps/site`;
- the one-page structure with durable public routes and shared layout;
- section-specific ad hoc styling with versioned design tokens;
- implicit narrative traversal with equal narrative and direct navigation modes;
- hand-written status summaries with a validated site-local public status registry linked to canonical records;
- scattered trust explanations with a Trust Center shell;
- high-level Forge references with an honest Open Forge page;
- hand-maintained support copy with build-time views over canonical economics records or explicit empty states;
- the phrase-only bundle check with route, content-authority, accessibility, metadata, status-truth, and performance validation; and
- non-fingerprinted immutable asset caching with framework-managed fingerprints or correct cache headers.

### Do not introduce

- a second site application;
- a shared website package without a second consumer;
- a CMS, database, remote content API, runtime GitHub fetch, or vector index;
- a second funding or capability-status source of truth;
- accounts, authentication, health-data intake, private Chronicles, production Aster, private MCP, providers, connectors, clinical workflows, research enrollment, governance voting, or transactions; or
- analytics, tracking, advertising, personalization, or third-party scripts without a separately accepted privacy and operational boundary.

## Mission-to-website traceability

### Personal utility and control

The homepage and Promise explanation must lead with:

> Build your Living Chronicle. Improve your health. Keep the key.

Personal utility and control come before research, funding, partner, or institutional benefit.

### Public software and private personal data

The Trust Center, Open Forge, How It Works, and status components must distinguish public code and public/synthetic evidence from private future personal data.

### Meaningful refusal and direct access

Narrative and direct modes remain optional. Essential content must require no story traversal, animation, sound, image, account, or mythological knowledge.

### Deterministic authority around AI

The Aster explanation must distinguish proposals, player confirmation, deterministic domain validation, non-AI fallbacks, and current non-production status.

### MCP remains bounded tooling

Open Forge must explain local public/synthetic tools, provenance, limits, receipts, non-authority, and open holdpoints without presenting MCP as the product database or a general agent.

### Provider and standards replaceability

The consumer-first explanation must distinguish standards support, planned connectors, active relationships, and production exchange. Providers and standards remain additive, attributed, versioned, and replaceable.

### Funding cannot purchase authority

Support views must derive from canonical economics records and keep recognition separate from recommendation, ranking, endorsement, safety, guidance, permission, and governance.

### Complexity must earn its place

Sprint 8 remains one understandable site application with static or build-time public content where practical. A new service or runtime dependency requires current evidence, ownership, tests, and a distinct boundary.

## Binding Sprint 8 execution clarifications

### 1. One application and one cutover

- `apps/site` remains the only public website owner.
- Migrate Track 0A in place.
- Keep the current site deployable until the replacement passes its release gate.
- Define preview, production cutover, rollback owner, rollback command or procedure, asset compatibility, and DNS or project-setting impact before changing official deployment behavior.
- Do not delete Track 0A implementation until the replacement has passed accepted verification and rollback evidence exists.

### 2. Public route map

The initial durable route set should include:

- `/` — homepage and narrative entry;
- `/promise` — player promise and rights;
- `/laws` — Seven Laws;
- `/how-it-works` — personal value loop and product model;
- `/aster` — Aster and AI boundaries;
- `/trust` — Trust Center shell;
- `/forge` — Open Forge;
- `/status` — roadmap and capability status;
- `/support` — funding and support transparency; and
- `/privacy` — public-site and signup privacy information.

`/joined` and `/api/join` must be preserved, redirected, or deliberately retired under the signup decision. Route names may be refined in the Sprint 8 execution plan, but every accepted content responsibility must remain directly addressable.

### 3. Narrative and direct modes are equal

- Narrative mode may welcome visitors through Ogygia, atmosphere, exploration, and progressive disclosure.
- Direct mode must expose the same essential information through conventional navigation and plain language.
- Mode selection cannot create a separate policy, status, or content source.
- Server-rendered essential content must remain available when client JavaScript, animation, images, or audio fail.

### 4. Content authority remains repository-owned

- Frozen and accepted repository records remain the source of truth.
- Website copy may summarize and explain; it may not create policy.
- Use small site-local, typed, read-only content or data adapters at build time where structured views are needed.
- Do not parse arbitrary Markdown at request time or fetch repository content from GitHub at runtime.
- Every material status, funding, Forge, provider, connector, security, and governance claim should carry a canonical source link and explicit status.

### 5. Capability status is a validated system

- Define one site-local public capability registry with stable IDs, public labels, evidence status, source links, owner, and last-reviewed metadata.
- Validate allowed statuses against repository vocabulary.
- A completed sprint or merged contract cannot be labeled as a live product capability without deployment evidence.
- Forge is a local contributor tool, not a consumer health feature.
- Status records must fail validation when a source is missing, a status is unknown, or a live claim lacks an allowed evidence reference.

### 6. Funding transparency uses canonical economics data

- Render `docs/economics/funding-records.yml` and `funding-opportunities.yml` only through a bounded build-time adapter or explicit checked-in derivative with provenance.
- The current live registers are empty; the website must display an honest empty state rather than fictional support.
- Synthetic funding files may be used only in tests or clearly fictional demonstrations.
- A website sponsor model cannot become a second ledger.
- No donation, sponsorship, grant-intake, affiliate, referral, provider-intake, payment, charitable, tax-deductible, nonprofit, or refund claim activates without separately accepted operational evidence.

### 7. Signup migration is a separate bounded decision

Sprint 8 must explicitly choose one of two paths:

1. preserve `/api/join`, `/privacy`, and `/joined` with equivalent or stronger disclosure, validation, no-email logging, provider configuration, timeout, error, and response behavior; or
2. remove or disable signup until its provider, retention, unsubscribe, correction, deletion, privacy, and operational ownership are accepted.

If preserved:

- retain email-only, purpose-specific consent and honeypot behavior;
- do not add health, account, research, donation, demographic, or marketing-profile fields;
- update and version the privacy policy and payload purpose together;
- do not treat the current in-memory throttling as distributed abuse protection;
- do not trust forwarded client-address headers without an explicit hosting-proxy trust model;
- keep webhook credentials server-only;
- never log email addresses, tokens, payloads, or provider responses containing personal data; and
- document correction, deletion, unsubscribe, provider, retention, and failure paths before representing signup as production-ready.

### 8. Security headers must survive the framework migration

- Preserve or strengthen CSP, frame-ancestor, content-type, referrer, opener, and permissions policies.
- Do not weaken CSP merely to accommodate framework defaults, analytics, or third-party scripts.
- Test response headers on all public routes and error pages.
- Keep secrets and server-only modules out of client bundles.
- Verify that source maps, build output, errors, and previews expose no credentials or private operational material.

### 9. Cache and asset behavior must be correct

The current server applies immutable caching to static URLs that are not all content-fingerprinted. Sprint 8 must:

- use framework-managed hashed assets or versioned filenames for immutable caching;
- avoid immutable caching for mutable public URLs;
- define HTML, structured public data, image, font, and API cache behavior explicitly;
- ensure corrections and status changes can propagate without a stale-content trap; and
- test image failure, stale asset, and rollback behavior.

### 10. Deployment and official status remain explicit

- `git.deploymentEnabled: false` is the current repository state.
- Preview deployment may be enabled only with public-data-only content, no production signup secrets by default, truthful preview labeling, and no implication of official release.
- Production cutover requires accepted build, accessibility, performance, security-header, content-authority, link, route, signup, and rollback evidence.
- Deployment success does not promote planned product capabilities to live.
- The official site and repository must remain mutually navigable.

### 11. Accessibility and performance are release criteria

Define measurable baselines before implementation closes for:

- semantic structure and landmarks;
- keyboard operation and visible focus;
- screen-reader names, descriptions, and reading order;
- reduced motion;
- contrast;
- responsive and zoom behavior;
- low-bandwidth and image-failure behavior;
- direct-navigation parity;
- automated accessibility checks;
- representative manual review;
- JavaScript, CSS, image, font, and page-weight budgets;
- Core Web Vitals or equivalent page-performance evidence; and
- no essential-content dependency on hydration.

Automated checks alone are not affected-user validation or accessibility certification.

### 12. Metadata and public-web completeness

The foundation should include:

- canonical titles and descriptions;
- social preview metadata using repository-owned assets;
- canonical URLs;
- sitemap and robots behavior;
- accessible not-found and error pages;
- noindex behavior for non-official previews where practical;
- truthful structured data without product, medical, nonprofit, or organizational claims unsupported by evidence; and
- link checking for internal routes and canonical repository sources.

### 13. Validation strategy

Sprint 8 should add proportionate tests for:

- route coverage and redirects;
- direct and narrative essential-content parity;
- server-rendered content without client JavaScript;
- status-registry vocabulary, sources, and evidence rules;
- funding-registry empty and synthetic separation;
- signup preservation or retirement behavior;
- security headers and client-bundle isolation;
- caching and rollback assumptions;
- metadata, sitemap, robots, and error pages;
- accessibility automation and manual checklist evidence;
- asset and page-performance budgets;
- public links and source references; and
- full repository validation.

### 14. No production expansion through website code

Sprint 8 does not activate:

- accounts or authentication;
- real health-data capture;
- private Living Chronicles;
- production Aster or private MCP;
- provider calls or connectors;
- clinical workflows;
- research enrollment;
- governance voting;
- donation or payment processing;
- estate or legacy directives; or
- production analytics over personal data.

## Recommended Sprint 8 implementation sequence

1. create the Sprint 8 issue and execution plan from this merged review;
2. inventory Track 0A URLs, assets, copy, tests, signup behavior, deployment settings, and rollback path;
3. pin the framework and testing versions through normal dependency review;
4. define route map, content ownership, design tokens, status registry, funding adapter, security headers, cache policy, and migration strategy;
5. implement shared layout, direct navigation, narrative entry, metadata, and accessibility foundations;
6. migrate the homepage and Promise content without visual reset;
7. implement Seven Laws, How It Works, consumer-first explanation, and Aster pages;
8. implement Trust Center, Open Forge, status, roadmap, and support views from accepted records;
9. preserve or deliberately retire signup under its separate gate;
10. establish preview, cutover, rollback, and official-release evidence;
11. validate essential-information parity without animation, story, images, client JavaScript, or provider dependencies where practical; and
12. publish the Sprint 8 completion package and obtain explicit founding-steward acceptance.

## Sprint 8 acceptance interpretation

The accepted criteria remain unchanged:

- live, experimental, planned, and long-horizon claims are visually distinct;
- essential information is accessible without animation or story traversal;
- core pages pass defined accessibility and performance baselines;
- funding displays derive from canonical economics records;
- consumer-first explanation remains accurate and provider-respectful;
- sponsor recognition remains separate from recommendation, ranking, endorsement, permission, safety, and guidance; and
- transaction claims remain disabled without accepted operational evidence.

Sprint 8 completion will establish a public website foundation at its stated evidence level. It will not establish production health-data operation, private product capability, independent accessibility certification, legal approval, security certification, provider approval, clinical approval, fundraising operation, or product-market validation.

## Open holdpoints inherited by Sprint 8

Sprint 8 inherits, without closing:

- accessibility and affected-user review;
- public security and disclosure correctness;
- signup privacy, provider, retention, unsubscribe, correction, deletion, and operational gates;
- deployment, release, rollback, branch-setting, second-owner, succession, and founder-independent administration;
- legal, trademark, consumer, charitable, tax, nonprofit, and public-claim review;
- provider and institutional relationship truth;
- funding record, transaction, custody, accounting, and payment gates;
- representative performance and user-benefit measurement; and
- every production health-data, Aster, connector, clinical, research, private MCP, and account gate.

## Handoff conclusion

Sprint 8 remains the correct next numbered sprint. No decision record or scope amendment is required.

The repository is ready to begin Sprint 8 only after this reconciliation is validated, explicitly accepted, and squash merged. The Sprint 8 issue and implementation branch must then inherit this review and preserve `apps/site` as the single public website owner.
