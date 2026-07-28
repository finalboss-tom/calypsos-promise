# Public Website Foundation and Migration Boundary

[Architecture index](README.md) · [Module boundaries](module-boundaries.md) · [Current status](../roadmap/current-status.md) · [Sprint 8 plan](../roadmap/sprint-8-execution-plan.md) · [Pre-Sprint 8 review](../roadmap/pre-sprint-8-alignment-review.md) · [Site README](../../apps/site/README.md) · [Issue #60](https://github.com/finalboss-tom/calypsos-promise/issues/60)

- **Status:** SPRINT 8 BASELINE — workstream 8.1
- **Owner:** `apps/site`
- **Entry baseline:** `main` at `9da8034220954a1ca50420e71fd94e7795232a35`
- **Authority:** implements the frozen foundations, accepted decisions, public policies, and Sprint 8 roadmap without creating new product, funding, provider, security, clinical, legal, or governance authority
- **Information class:** public repository records and explicitly synthetic examples only

## Purpose

This baseline defines how Website Track 0A becomes the Sprint 8 public website foundation without creating a second site, hidden source of truth, premature service platform, or accidental private-data path.

The website exists to explain, orient, invite contribution, expose truthful capability status, organize trust evidence, and render approved public transparency records.

It does not own the policies or domain truth it explains.

## Current Track 0A inventory

`apps/site` currently contains:

- a custom Node HTTP server;
- semantic HTML fragments assembled into public pages;
- repository-owned CSS, JavaScript, SVG, and WebP presentation assets;
- one purpose-limited signup webhook adapter;
- public security headers;
- responsive and reduced-motion behavior;
- required-file and required-copy validation;
- prohibited signup-field checks;
- lint, type, and test scripts; and
- a Vercel configuration with Git-triggered deployments disabled.

Current public routes:

| Route | Current purpose | Sprint 8 migration rule |
| --- | --- | --- |
| `/` | cinematic public repository gateway | preserve as the public homepage |
| `/privacy` | signup privacy explanation | preserve if signup remains; otherwise redirect to the Trust Center or a retired-signup explanation |
| `/joined` | signup confirmation | preserve if signup remains; otherwise redirect to the homepage or retired-signup explanation |
| `/api/join` | purpose-limited signup submission | preserve only if workstream 8.8 satisfies the bounded operational gate; otherwise retire with an honest disabled response or remove after deliberate route handling |

Silent route loss is prohibited.

## Target application boundary

`apps/site` remains one application and one public deployment owner.

It may own:

- public routes and route composition;
- server-rendered page and layout composition;
- presentation-specific view models;
- repository-owned design tokens and website components;
- metadata, canonical URLs, sitemap, robots, not-found, and error presentation;
- public navigation and narrative entry;
- read-only capability, roadmap, Trust Center, Open Forge, and economics views;
- static or build-time ingestion of approved public repository records;
- public security headers and deployment configuration;
- accessibility and performance budgets; and
- the separately gated signup adapter.

It may not own:

- Product Constitution, player rights, lore canon, security policy, funding doctrine, provider policy, clinical policy, legal interpretation, or governance authority;
- Chronicle or House of Keys truth;
- Aster or Forge authority;
- accounts, authentication, private identity, or private health data;
- production providers, connectors, research, clinical workflows, or financial operations;
- a second status registry or funding ledger;
- a CMS or remote content service selected without a later evidence-backed decision; or
- Sprint 9 game state.

## Dependency direction

The website reads inward from stable public records and application-local validated view data.

```text
frozen and accepted repository records
                  ↓
public policies, status, economics, architecture, and roadmap records
                  ↓
build-time or source-controlled website adapters
                  ↓
validated site-local view models
                  ↓
server-rendered routes and optional client enhancement
```

The website must not reverse that direction. A page, component, content file, preview, analytics result, sponsor request, provider relationship, or deployment configuration cannot change upstream authority.

## Content ownership and source links

Every material status, funding, provider, connector, security, privacy, AI, MCP, or governance claim must have one of:

- a canonical repository source link;
- an explicit website-owned presentation label for static navigation or visual copy; or
- a visible honest empty state.

A website summary may simplify language. It may not silently change status, authority, scope, uncertainty, conflict, or review state.

### Capability status

Sprint 8 will use a validated site-local capability registry with:

- stable capability ID;
- public label;
- allowed evidence status;
- concise explanation;
- canonical source path or URL;
- responsible repository owner;
- last-reviewed date or revision; and
- optional holdpoint or correction link.

The site-local registry is a presentation index. It is not independent product truth.

### Funding and relationships

Funding views must derive at build time from canonical public economics records or expose honest empty states.

The website may not:

- create a second sponsor ledger;
- infer active support from private discussions, offers, credits, or draft contracts;
- rank providers or connectors through recognition;
- turn recognition into recommendation, endorsement, safety, permission, guidance, or governance power; or
- activate transactions merely because economics schemas exist.

Runtime GitHub fetching is not selected. It would introduce availability, cache, token, rate-limit, source-state, and failure behavior that Sprint 8 does not need.

## Rendering boundary

Essential information must be server-rendered or otherwise available in initial HTML.

Client JavaScript may enhance:

- navigation affordances;
- optional narrative transitions;
- non-essential progressive disclosure;
- motion that respects reduced-motion preferences; and
- public forms if the selected signup path requires it.

Client JavaScript may not be required to access:

- the Promise and player rights;
- privacy and public/private boundaries;
- current status;
- roadmap and contribution paths;
- Trust Center material;
- Open Forge boundaries;
- funding status and disabled transaction state; or
- correction and challenge routes.

No audio, animation, image, mythology knowledge, or cinematic traversal may be required for essential information.

## Design tokens and component ownership

Design tokens remain inside `apps/site` during Sprint 8.

They may cover:

- typography;
- spacing;
- color roles;
- surfaces and borders;
- focus treatment;
- motion duration and easing;
- breakpoints;
- content widths;
- status semantics; and
- image treatment.

A shared website package is not justified by one consumer. Extraction requires a second real consumer or independent contract pressure.

The approved visual direction is warm, cinematic Ogygia. Migration should use deliberate cuts and splices. A framework migration is not a visual reset by default.

## Route and navigation model

The durable direct route map should support:

- `/` — homepage;
- `/promise` — Promise and player rights;
- `/laws` — Seven Laws;
- `/how-it-works` — product and Chronicle explanation;
- `/consumer-first` — provider-independent and standards-respectful explanation;
- `/aster` — Aster and AI boundaries;
- `/trust` — Trust Center shell;
- `/forge` — Open Forge;
- `/roadmap` — roadmap and capability status;
- `/support` — support intent and canonical funding transparency without transactions; and
- the deliberate signup route disposition.

Final route names may be refined during implementation when redirects and navigation remain explicit. Material route changes must update this baseline, tests, and source links.

Narrative entry may expose the same information through an Ogygia journey, but direct navigation remains equal and complete.

## Security-header and secret boundary

Sprint 8 must preserve or strengthen:

- content-security policy;
- frame-ancestor denial;
- content-type sniffing prevention;
- referrer policy;
- permissions policy;
- cross-origin isolation choices appropriate to the site; and
- HTTPS-only production assumptions where the hosting environment supports them.

Security headers must be validated against rendered pages, metadata, images, scripts, and any retained form endpoint. A copied header string is not evidence that the deployed policy works.

Secrets must remain server-only. Build output and client bundles must be checked for:

- signup webhook URLs;
- tokens;
- environment values;
- private endpoints;
- private records; and
- protected operational information.

## Cache and asset boundary

Immutable caching is allowed only for content-addressed or framework-fingerprinted assets.

Mutable public URLs require revalidation or bounded cache semantics appropriate to their update behavior.

Sprint 8 must not carry forward Track 0A’s broad immutable caching merely because it existed before the framework migration.

HTML, status views, funding views, privacy text, and correction routes must use cache behavior that allows truthful updates.

## Signup decision gate

Workstream 8.8 must choose preserve or retire.

### Preserve requirements

Preservation requires explicit public and operational evidence for:

- purpose and lawful/authorized handling basis appropriate to the selected operation;
- provider identity and role;
- data path and server-only secrets;
- retention period;
- unsubscribe behavior;
- correction and deletion route;
- policy-version lifecycle;
- trusted proxy model before using forwarded client addresses;
- abuse controls appropriate to the deployment topology;
- incident and failure behavior;
- logs and data-minimization rules;
- preview and production configuration separation; and
- rollback.

The current in-memory limiter is single-process behavior. It is not distributed rate limiting.

### Retire requirements

Retirement requires:

- removal or honest disabled behavior for submission;
- deliberate redirects for `/privacy` and `/joined`;
- replacement calls to action such as watching or following the public repository;
- no silent collection; and
- tests proving the old endpoint cannot accept data.

## Deployment, cutover, and rollback

Sprint 8 must define three distinct states:

1. **local implementation evidence** — local build, start, tests, and static validation;
2. **preview evidence** — an inspectable preview deployment with environment-appropriate public-only data and no official-production claim; and
3. **official release evidence** — the accepted production deployment, domain, headers, routes, rollback point, and truthful status record.

Git-triggered deployment is disabled at entry. Any change to that setting is part of the explicit release plan.

Before official cutover, record:

- deployment owner;
- target project and domain;
- environment-variable inventory by name and information class, never secret value;
- current production rollback target;
- cutover procedure;
- rollback procedure;
- cache and invalidation behavior;
- route and redirect checks;
- security-header checks;
- signup state;
- known limitations; and
- status update ownership.

A successful preview is not an official release.

## Accessibility and performance evidence

Sprint 8 will define and validate:

- semantic landmarks and heading order;
- keyboard operation and visible focus;
- screen-reader labels and reading order;
- reduced-motion behavior;
- contrast;
- responsive layout;
- image-failure and low-bandwidth behavior;
- direct-navigation parity;
- automated accessibility checks;
- representative manual review;
- HTML, JavaScript, image, and font budgets; and
- route-level performance measurements.

Automated checks are not affected-user validation or accessibility certification.

## Validation contract

Sprint 8 validation must cover:

- route existence and redirects;
- required page content and canonical source links;
- capability-status schema and allowed values;
- economics-record ingestion and empty states;
- prohibited transaction claims;
- provider, connector, clinical, and enterprise live-claim denial;
- signup preserve-or-retire behavior;
- security headers;
- client-bundle secret leakage;
- cache semantics;
- metadata, canonical URLs, sitemap, robots, not-found, and errors;
- keyboard and semantic accessibility;
- reduced motion and image failure;
- performance budgets;
- local build and start; and
- full repository validation.

## Rollback and containment

The framework migration must remain reversible until explicit acceptance and official cutover.

Containment options include:

- reverting to the last accepted Track 0A commit;
- keeping Git-triggered deployments disabled;
- disabling optional client enhancement;
- retiring signup independently of public content;
- reverting one route or content view without reopening domain contracts; and
- correcting website status without changing upstream records.

## Non-scope

This baseline does not select or activate accounts, authentication, private data, production Aster, private MCP, providers, connectors, clinical workflows, research enrollment, governance voting, donations, payments, financial operations, personal-data analytics, estate directives, or Sprint 9 gameplay.

## 8.1 conclusion

The application boundary is sufficient to begin the framework shell in workstream 8.2 once the execution-plan, status, roadmap, issue, and draft-PR records agree and the repository checks pass.
