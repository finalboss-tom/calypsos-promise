# Calypso’s Promise public site

`apps/site` is the single owner of the Calypso’s Promise public website.

Sprint 8 — Public Website Foundation is active through issue #60 and draft PR #61. Workstream 8.1 defines the migration boundary before Next.js dependencies are added.

Controlling records:

- [Sprint 8 Execution Plan](../../docs/roadmap/sprint-8-execution-plan.md)
- [Public Website Foundation and Migration Boundary](../../docs/architecture/public-website-foundation-and-migration.md)
- [Current Project Status](../../docs/roadmap/current-status.md)
- [Accepted Pre-Sprint 8 Review](../../docs/roadmap/pre-sprint-8-alignment-review.md)

## Current implementation

Website Track 0A currently uses:

- `src/server.mjs` — custom Node HTTP server and route composition;
- `src/signup.mjs` — isolated purpose-limited signup webhook adapter;
- `src/views/` — semantic HTML fragments;
- `public/` — CSS, JavaScript, SVG, and WebP presentation assets;
- `src/check-site.mjs` — required-file, required-copy, and prohibited-signup-field checks; and
- `node --test` — site tests.

The application has no runtime package dependencies at Sprint 8 entry.

Workstream 8.1 does not change that. Framework dependency and version selection belong to 8.2 after the application boundary is validated.

## Current public routes

| Route | Current purpose | Sprint 8 rule |
| --- | --- | --- |
| `/` | cinematic repository gateway | preserve as homepage |
| `/privacy` | Founding Expedition signup privacy notice | preserve if signup remains; otherwise redirect deliberately |
| `/joined` | signup confirmation | preserve if signup remains; otherwise redirect deliberately |
| `/api/join` | purpose-limited email signup endpoint | preserve only if workstream 8.8 satisfies the operational gate; otherwise retire deliberately |
| `/assets/*`, `/styles/*`, `/site.js` | public presentation assets | migrate to framework-fingerprinted assets or correct cache semantics |

Silent route loss is prohibited.

## What is implemented

- cinematic Ogygia landing page using repository-owned concept-art crops;
- live semantic HTML for the game loop, Aster boundary, canonical zones, Promise, and capability status;
- prominent repository and current-status paths;
- purpose-limited Founding Expedition email form;
- private, provider-agnostic signup webhook adapter;
- privacy notice and confirmation page;
- responsive layout and reduced-motion behavior; and
- CSP, frame, content-type, referrer, opener, and permissions headers.

The images are presentation assets. Essential copy, links, controls, status labels, and form behavior remain live HTML rather than being embedded only in flattened imagery.

## What is not implemented

- Sprint 8 Next.js foundation;
- narrative and direct multi-route navigation modes;
- design-token system;
- Trust Center, Open Forge, roadmap, or canonical funding views;
- defined accessibility and performance baselines;
- accounts or authentication;
- real health-data capture;
- private Living Chronicles;
- production Aster or private MCP;
- providers or connectors;
- research enrollment, governance voting, or transactions;
- production analytics over personal information; or
- independent accessibility, security, privacy, legal, clinical, or production review.

## Sprint 8 application boundary

`apps/site` may own:

- public routes and route composition;
- server-rendered page and layout presentation;
- repository-owned design tokens and website components;
- metadata, canonical URLs, sitemap, robots, not-found, and error presentation;
- public navigation and optional narrative entry;
- read-only capability, roadmap, Trust Center, Open Forge, and economics views;
- build-time ingestion of approved public repository records;
- public security headers and deployment configuration;
- accessibility and performance budgets; and
- the separately gated signup adapter.

It may not own:

- Product Constitution, lore canon, security policy, funding doctrine, provider policy, clinical policy, legal interpretation, or governance authority;
- Chronicle or House of Keys truth;
- Aster or Forge authority;
- accounts, private identity, or private health data;
- production providers, connectors, research, clinical workflows, or financial operations;
- a second status registry or funding ledger;
- a CMS or remote content service selected without later evidence; or
- Sprint 9 game state.

## Current evidence limits

### Deployment

`vercel.json` currently sets `git.deploymentEnabled` to `false`. Git-triggered preview and production deployments remain disabled at Sprint 8 entry.

Sprint 8 may change deployment behavior only through an explicit preview, official cutover, rollback, and release-evidence gate. A successful preview is not an official production release.

### Caching

The custom server currently sends immutable one-day caching for static-file URLs, although not every URL is content-fingerprinted.

Sprint 8 must replace this with framework-managed hashed assets, versioned filenames, or correct mutable cache semantics. HTML, status, funding, privacy, and correction views must remain updateable.

### Signup

The current adapter:

- accepts one email address and purpose-specific consent;
- includes a honeypot field;
- limits request bodies to 16 KB;
- uses an in-memory per-address attempt counter;
- optionally forwards to one server-configured HTTPS webhook;
- times out provider delivery after eight seconds;
- does not write email addresses to the repository or public filesystem; and
- logs only a generic delivery failure message.

These controls are bounded implementation evidence, not a production privacy or abuse-protection claim.

The current in-memory limiter is not distributed rate limiting. Forwarded client-address headers are not trustworthy without an explicit hosting-proxy trust model. Provider, retention, unsubscribe, correction, deletion, policy-version, incident, and operational ownership remain open gates.

Workstream 8.8 must choose either:

1. preserve `/api/join`, `/privacy`, and `/joined` with equivalent or stronger disclosure and behavior; or
2. remove or disable signup until those gates are met.

Signup must never become account creation, health-data intake, research enrollment, donation processing, or an undeclared marketing profile.

### Security and accessibility

Existing semantic HTML, skip-link, responsive behavior, reduced motion, security headers, no-health-data form fields, and generic logs are foundations to preserve or strengthen.

They are not accessibility certification, privacy approval, independent penetration testing, production security evidence, or affected-user validation.

## Workstream 8.1 exit

8.1 closes when:

- route, content-authority, rendering, design-token, security, secret, cache, asset, signup, deployment, rollback, accessibility, performance, metadata, and validation contracts are recorded;
- repository status, issue #2, issue #60, and PR #61 agree;
- no Next.js dependency or implementation has been added; and
- the full repository checks pass.

## Run locally

```bash
pnpm --filter @calypsos-promise/site dev
```

Open `http://localhost:3000`.

## Configure private signup delivery

Configure an approved private HTTPS endpoint only when the current disclosure and operational gates are satisfied:

```bash
SIGNUP_WEBHOOK_URL=https://example.org/private-signup-webhook
SIGNUP_WEBHOOK_TOKEN=replace-me
```

Private provider identity, retention, unsubscribe, correction, deletion, and incident details do not belong in this public repository unless separately approved for publication.

## Validate

```bash
pnpm --filter @calypsos-promise/site build
pnpm --filter @calypsos-promise/site lint
pnpm --filter @calypsos-promise/site typecheck
pnpm --filter @calypsos-promise/site test
```

Run `pnpm check` from the repository root before review.
