# Sprint 8.2 Record — Next.js Shell, Tokens, Security, Metadata, and Assets

[Current status](current-status.md) · [Sprint 8 plan](sprint-8-execution-plan.md) · [Website architecture](../architecture/public-website-foundation-and-migration.md) · [Workstream 8.1 record](sprint-8-workstream-8-1-record.md) · [Site README](../../apps/site/README.md) · [Issue #60](https://github.com/finalboss-tom/calypsos-promise/issues/60) · [Draft PR #61](https://github.com/finalboss-tom/calypsos-promise/pull/61)

- **Status:** IMPLEMENTED AND VALIDATED — workstream 8.3 next
- **Entry baseline:** Sprint 8.1 validated head `d780a8c31cc484ede9b110b4dd0e43918ae88f42`
- **Validated implementation head:** `8c757e9482e616db7c86689a1d1d9c99d70ca6cd`
- **Validation:** CI run 957 and DCO Attestation run 1034 passed
- **Application owner:** `apps/site`
- **Information boundary:** public repository records and explicitly synthetic examples only
- **Deployment state:** local implementation evidence only; Git-triggered Vercel deployment remains disabled

## Result

Workstream 8.2 replaces the custom Node page server with one bounded Next.js App Router shell while preserving the workstream 8.1 ownership, route, authority, rollback, security, cache, signup, and non-scope boundaries.

The shell is intentionally a compatibility foundation. It does not complete the 8.3 navigation system, the 8.4 homepage and Promise migration, the later Trust Center or Open Forge pages, canonical funding views, final signup disposition, accessibility certification, performance release gate, preview deployment, or official production cutover.

## Pinned dependency baseline

The application pins:

- `next` `16.2.12`;
- `react` `19.2.8`;
- `react-dom` `19.2.8`;
- `@types/react` `19.2.17`; and
- `@types/react-dom` `19.2.3`.

The versions were selected from the current stable package releases and are recorded exactly in `apps/site/package.json` and `pnpm-lock.yaml`. The repository already requires Node.js 24 or later, which satisfies the framework runtime requirement.

No floating ranges are used for the website framework baseline.

## Application shell

The shell establishes:

- an App Router root layout;
- server-rendered compatibility homepage content;
- `/privacy` and `/joined` compatibility pages;
- an `/api/join` route handler that refuses intake during migration;
- `not-found`, route-error, and global-error presentation;
- sitemap and robots metadata routes;
- canonical, Open Graph, Twitter, icon, viewport, and theme metadata;
- `next/image` for repository-owned presentation images;
- application-local design tokens and global styling;
- one public deployment owner at `apps/site`; and
- no client component or browser-only requirement for essential shell content.

The previous custom Node server, HTML fragment runtime, legacy page styles, browser script, and server tests are removed rather than retained as a parallel website implementation.

## Route compatibility

The shell preserves the current public route contracts:

| Route | Workstream 8.2 behavior |
| --- | --- |
| `/` | server-rendered compatibility homepage |
| `/privacy` | explicit migration-period signup privacy explanation |
| `/joined` | explicit migration-period no-submission confirmation |
| `/api/join` | `503 SIGNUP_MIGRATION_PAUSED`; no address accepted or forwarded |
| `/robots.txt` | App Router metadata route |
| `/sitemap.xml` | App Router metadata route |

The signup route is paused, not silently removed. Workstream 8.8 still owns the final preserve-or-retire decision.

## Security and secret boundary

The shell preserves or strengthens:

- nonce-bearing content-security policy through the Next.js 16 `proxy.ts` convention;
- `frame-ancestors 'none'` and `X-Frame-Options: DENY`;
- content-type sniffing prevention;
- strict-origin referrer policy;
- camera, geolocation, microphone, and payment denial;
- cross-origin opener policy;
- disabled framework-identifying response header;
- `no-store` API caching;
- no signup webhook URL, token, provider, or private endpoint in application source; and
- no email or private-data intake in the compatibility endpoint.

The CSP and header tests are repository implementation evidence, not independent penetration testing or deployed-environment security certification.

## Cache and asset behavior

Framework-managed build assets use their generated content-addressed paths.

Repository-owned `/assets/*` compatibility URLs use `public, max-age=0, must-revalidate`, replacing Track 0A’s overly broad immutable caching. HTML, privacy, correction, status, and later funding views remain eligible for truthful updates.

The shell retains the repository-owned SVG and WebP assets needed for the approved cinematic direction. Full design migration and image-failure treatment remain later workstreams.

## Design-token baseline

`apps/site/src/app/globals.css` owns application-local tokens for:

- color roles;
- text and muted text;
- surfaces and borders;
- accent and focus treatment;
- spacing;
- content widths;
- radii;
- shadows; and
- status semantics.

No shared design-system package is created. One website consumer does not justify extraction.

## Validation surface

Workstream 8.2 adds focused validation for:

- exact framework and React versions;
- required App Router files and compatibility routes;
- server-rendered shell copy;
- security-header configuration;
- nonce CSP proxy configuration;
- mutable public-asset cache semantics;
- paused signup behavior;
- absent private signup configuration;
- metadata, sitemap, robots, not-found, and error files; and
- continued disabled Git-triggered deployment.

The application passed:

- dependency installation and lockfile generation;
- formatting;
- Next.js production build;
- site shell validation;
- TypeScript typecheck;
- focused Node tests;
- full repository documentation links;
- repository policy;
- economics validation;
- content validation;
- lint;
- full typecheck; and
- full tests.

CI run 957 and DCO Attestation run 1034 passed on exact implementation head `8c757e9482e616db7c86689a1d1d9c99d70ca6cd`.

## Evidence limits

Workstream 8.2 does not establish:

- final direct or narrative navigation;
- final homepage or Promise content;
- Trust Center, Open Forge, Seven Laws, consumer-first, roadmap, or support pages;
- canonical status or economics rendering;
- production signup handling;
- automated or affected-user accessibility validation;
- performance budgets or representative measurements;
- preview deployment;
- official domain cutover;
- deployed header, cache, redirect, or rollback verification;
- independent security, privacy, accessibility, legal, clinical, provider, financial, or operations review; or
- any private or production product capability.

## Next workstream

Workstream 8.3 may now implement the shared header, footer, direct navigation, optional narrative entry, reusable capability-status primitives, focus and keyboard foundations, reduced-motion behavior, image-failure and low-bandwidth paths, and server-rendered essential-information parity.

It may not reopen the single-site boundary, introduce a CMS or second source of truth, activate signup intake, or begin later content and transaction work prematurely.
