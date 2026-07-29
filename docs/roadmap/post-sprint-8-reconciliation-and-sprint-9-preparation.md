# Post-Sprint 8 Reconciliation and Sprint 9 Preparation

[Current status](current-status.md) · [Sprint 8 completion](sprint-8-completion-record.md) · [Release and Sprint 9 handoff](sprint-8-release-rollback-and-sprint-9-handoff.md) · [Sprint sequence](sprints.md) · [Newsletter gate #63](https://github.com/finalboss-tom/calypsos-promise/issues/63) · [Pre-Sprint 9 gate #64](https://github.com/finalboss-tom/calypsos-promise/issues/64)

- **Status:** POST-MERGE RECONCILIATION IN REVIEW
- **Accepted Sprint 8 squash commit:** `20e2c95c96670f0ef6b972c9ebf7b482f7f9cf1a`
- **Production deployment:** `dpl_3V2e76y1fwrR19j1BzUFpo9U9kjp`
- **Deployment configuration baseline:** `a5146237356f58e8d28343e90918b70a418bccbb`
- **Newsletter disposition:** Path A — preserve and activate for narrow Phase 0 project updates; issue #63 remains open through deployed verification
- **Sprint 9:** planned and not started; alignment issue #64 is active

## Reconciled facts

Sprint 8 was explicitly accepted by the founding steward, squash merged through PR #61, and closed through issue #60.

The accepted Next.js application was deployed to the existing Vercel production project after the repository configuration was corrected to identify `apps/site` as Next.js. Deployment `dpl_3V2e76y1fwrR19j1BzUFpo9U9kjp` reached `READY`, the canonical apex and `www` domains were assigned, the homepage returned HTTP 200 with the Sprint 8 application, and immediate runtime-error inspection found no errors.

Git-triggered Vercel deployment was then restored to disabled. The retained repository configuration keeps:

- `framework: "nextjs"`; and
- `git.deploymentEnabled: false`.

The production website is therefore live while ordinary repository commits do not automatically create releases.

## Status drift repaired by this reconciliation

The merged Sprint 8 branch left public and repository copy that still described:

- Sprint 8 as active, draft, unmerged, and undeployed;
- PR #61 and issue #60 as open acceptance gates;
- the website foundation as experimental rather than live;
- Trust Center, Open Forge, roadmap, support, and funding views as branch-only review surfaces;
- the newsletter route as permanently paused for the current state; and
- Sprint 9 as lacking a dedicated alignment issue.

This reconciliation updates current status, repository navigation, website capability records, public roadmap records, validation, and tests to match the accepted and deployed state without rewriting the historical evidence that existed before acceptance.

## Newsletter Path A selection

The founding steward selected **Path A — preserve and activate** from issue #63 for the period leading to Phase 0 completion.

The narrow purpose is:

> Receive occasional public Calypso’s Promise project updates and opportunities to inspect, play, review, or contribute.

The temporary implementation reuses the previously configured server-only connection:

- `SIGNUP_WEBHOOK_URL` remains the private destination configuration;
- optional `SIGNUP_WEBHOOK_TOKEN` remains server-only;
- the destination is the existing private Google Apps Script webhook and Google Sheet;
- accepted data is limited to email address, affirmative consent, policy version, purpose, source, and submission time;
- no subscriber address enters GitHub, public logs, analytics, accounts, the Chronicle, research, providers, funding, or game state; and
- the newsletter is not an undeclared advertising, lead-generation, or profiling system.

### Implemented controls

- explicit consent before submission;
- email normalization and validation;
- hidden bot honeypot;
- bounded request size;
- best-effort per-source throttling;
- HTTPS-only forwarding except local loopback validation;
- eight-second provider timeout;
- optional bearer-token forwarding;
- public-safe error messages without subscriber logging;
- `no-store` API responses and no cookies;
- a privacy notice naming custody, data categories, retention review, correction, deletion, unsubscribe, failure, incident, and rollback behavior;
- confirmation copy that does not imply account, research, governance, payment, or gameplay enrollment; and
- permanent source and isolated-preview validation that exercises invalid and honeypot paths without contacting the provider.

### Explicit limitations

- the in-memory throttle is per runtime isolate and is not a durable distributed rate limiter;
- manual unsubscribe, correction, access, and deletion handling is required while the temporary system is used;
- Google Apps Script and Google Sheets remain temporary provider dependencies;
- the provider route has not been independently reviewed for privacy, security, communications, accessibility, or legal sufficiency;
- no public subscriber counts, addresses, screenshots, provider identifiers, webhook URLs, or protected incident details may be published; and
- issue #63 remains open until merge, production deployment, real end-to-end verification, rollback evidence, and explicit founding-steward acceptance are recorded.

## Newsletter rollback

The newsletter can be stopped without changing the rest of the public site by any of these bounded actions:

1. remove or disable the production `SIGNUP_WEBHOOK_URL` configuration;
2. restore the no-intake API behavior;
3. remove the homepage form while keeping `/privacy` and `/joined` as transparent disposition records; or
4. repoint the server-only adapter through a separately reviewed provider migration.

No account, database migration, Chronicle record, payment, or production-health-data state must be reversed.

## Sprint 9 preparation

Issue #64 is the dedicated pre-Sprint 9 alignment gate.

Sprint 9 implementation remains blocked until that review selects:

- application and route ownership;
- temporary-data classes, storage, lifetime, reset, discard, logging, and teardown;
- explicitly synthetic identities, observations, Chronicle records, and receipts;
- deterministic prologue state and First Lantern completion evidence;
- Aster proposal behavior and a complete manual or deterministic fallback;
- refusal, skip, restart, discard, exit, and optional account-conversion behavior;
- keyboard, screen-reader, reduced-motion, timing, dialogue, confirmation, error, and exit evidence;
- security, CSP, publication, performance, analytics, and no-secret boundaries;
- content authority, canon review, correction, rollback, and deployment procedure; and
- the exact issue, branch, PR, validation, review, acceptance, and completion package.

Sprint 9 remains public and explicitly synthetic only. It does not activate accounts, email identity, health-data intake, private Chronicles, production Aster, providers, connectors, research, payments, or durable progression.

## Reconciliation conclusion

The repository now has a truthful transition:

1. Sprint 8 is accepted, merged, deployed, and closed at its bounded evidence level.
2. The public website is live while Git-triggered releases remain disabled.
3. Newsletter preservation is selected and implemented for review, but gate #63 remains open through production evidence.
4. Sprint 9 is planned, issue #64 is the active alignment gate, and playable implementation has not started.
5. Institutional Phase 0 remains active until its separate exit criteria are completed and accepted.
