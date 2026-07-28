# Calypso’s Promise public site

`apps/site` currently implements **Website Track 0A — Repository Gateway**: an honest, accessible public front door for the open-source project and the planned Calypso’s Promise game.

Sprint 8 has not started. Issue #58 is reconciling the post-Sprint 7 repository and freezing the in-place migration contract before Next.js implementation begins.

## Current implementation

Track 0A uses:

- `src/server.mjs` — custom Node HTTP server and route composition;
- `src/signup.mjs` — isolated purpose-limited signup webhook adapter;
- `src/views/` — semantic HTML fragments;
- `public/` — CSS, JavaScript, SVG, and WebP presentation assets;
- `src/check-site.mjs` — required-file, required-copy, and prohibited-signup-field checks; and
- `node --test` — site tests.

The application has no runtime package dependencies.

## Current public routes

- `/` — cinematic repository gateway
- `/privacy` — Founding Expedition signup privacy notice
- `/joined` — signup confirmation
- `/api/join` — purpose-limited email signup endpoint
- `/assets/*`, `/styles/*`, and `/site.js` — public presentation assets

Sprint 8 must preserve, redirect, or explicitly retire every public route. Silent route loss is not an acceptable framework migration.

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
- Trust Center, Open Forge, roadmap, or canonical funding views;
- accounts or authentication;
- real health-data capture;
- private Living Chronicles;
- production Aster or private MCP;
- providers or connectors;
- research enrollment, compensated opportunities, governance voting, or donations;
- production analytics over personal information; or
- independent accessibility, security, privacy, legal, clinical, or production review.

## Current evidence limits

### Deployment

`vercel.json` currently sets `git.deploymentEnabled` to `false`. Git-triggered preview and production deployments are intentionally disabled.

Sprint 8 may change deployment behavior only through an explicit preview, cutover, rollback, and official-release gate. A framework migration must not silently publish an unfinished site or remove the ability to restore Track 0A.

### Caching

The custom server currently sends immutable one-day caching for static-file URLs, although not every URL is content-fingerprinted.

Sprint 8 must replace this with framework-managed hashed assets, versioned filenames, or correct mutable cache semantics. Status corrections, public records, and rollback must not be trapped behind stale immutable URLs.

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

Sprint 8 must deliberately choose either:

1. preserve `/api/join`, `/privacy`, and `/joined` with equivalent or stronger disclosure and behavior; or
2. remove or disable signup until those gates are met.

Signup must never become account creation, health-data intake, research enrollment, donation processing, or an undeclared marketing profile.

### Security and accessibility

Existing semantic HTML, skip-link, responsive behavior, reduced motion, security headers, no-health-data form fields, and generic logs are foundations to preserve or strengthen.

They are not accessibility certification, privacy approval, independent penetration testing, production security evidence, or affected-user validation.

## Sprint 8 migration boundary

Sprint 8 must:

- keep `apps/site` as the single public website owner;
- migrate Track 0A in place rather than create a duplicate application;
- preserve the approved cinematic Ogygia direction through deliberate cuts and splices;
- provide equal narrative and direct information paths;
- use repository-owned public records as content authority;
- use a validated site-local public capability registry with canonical source links;
- render canonical economics records or honest empty states rather than create a second funding ledger;
- preserve or strengthen security headers;
- define correct cache behavior;
- define preview, production cutover, and rollback evidence;
- establish metadata, sitemap, robots, not-found, and error-page behavior;
- define accessibility and performance budgets; and
- retain server-rendered essential information when JavaScript, animation, audio, or images fail.

Sprint 8 must not add a CMS, database, runtime GitHub fetch, account system, private-data path, provider runtime, connector, transaction surface, or Sprint 9 prologue.

The controlling record is the [Pre-Sprint 8 Alignment Review](../../docs/roadmap/pre-sprint-8-alignment-review.md).

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

The endpoint currently receives:

```json
{
  "email": "seeker@example.com",
  "consent": true,
  "policyVersion": "2026-07-25",
  "purpose": "Calypso's Promise public project updates",
  "source": "founding-expedition-website",
  "receivedAt": "2026-07-25T00:00:00.000Z"
}
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