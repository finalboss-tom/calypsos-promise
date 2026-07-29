# Sprint 8 Workstream 8.8 Record — Paused Public Email Signup

[Current status](current-status.md) · [Sprint 8 plan](sprint-8-execution-plan.md) · [Phase 0 signup gate #63](https://github.com/finalboss-tom/calypsos-promise/issues/63) · [Site privacy route](../../apps/site/src/app/privacy/page.tsx) · [Signup API route](../../apps/site/src/app/api/join/route.ts)

- **Status:** COMPLETE FOR SPRINT 8
- **Disposition:** preserve the current paused, no-intake compatibility state
- **Final preserve-or-retire gate:** issue #63 before institutional Phase 0 exit
- **Application:** `apps/site`
- **Information class:** PUBLIC implementation and synthetic validation only

## Decision

The founding steward directed that the public website email newsletter or waitlist signup remain exactly in its current paused state for now.

This is a deliberate bounded interim disposition rather than activation of a provider or permanent retirement of the compatibility routes.

The final binary decision—safely activate the email signup or deliberately retire it—is elevated to [Phase 0 gate #63](https://github.com/finalboss-tom/calypsos-promise/issues/63). Institutional Phase 0 cannot close until that gate is explicitly accepted, implemented, validated, and reconciled.

## Current route behavior

- `POST /api/join` returns `503 SIGNUP_MIGRATION_PAUSED`.
- The route does not accept, parse, store, forward, log, or otherwise process an email address.
- The route exposes no provider, webhook, database, mailing platform, credential, or private destination.
- `/privacy` explains the paused and no-intake state.
- `/joined` states that no signup was recorded.
- Visitors are directed to public repository-following and contribution paths.

## Why activation is not authorized

The repository does not yet contain accepted operational evidence for a legitimate provider or custody route, purpose limitation, retention, unsubscribe, correction, deletion, proxy trust, abuse controls, incident handling, provider replacement, teardown, or deployed verification.

Documentation of possible controls would not make those controls deployed. Activating collection without that evidence would create an undeclared personal-information system and conflict with the private-by-default and meaningful-refusal commitments.

## Why immediate route removal is not required for Sprint 8

The compatibility routes currently collect nothing and communicate the truth. Keeping them paused preserves explicit behavior for existing links while the final preserve-or-retire decision is handled through the Phase 0 gate.

This interim state must not be represented as a functioning waitlist, newsletter, account system, or player onboarding path.

## Permanent boundaries

The public email surface may not become:

- game account creation, authentication, or player onboarding;
- health, medical, genetic, wearable, location, or Chronicle-data intake;
- research enrollment or consent;
- clinical triage or health guidance;
- provider, connector, enterprise, or partnership intake;
- donation, sponsorship, payment, or financial processing; or
- an undeclared advertising, profiling, lead-generation, or marketing database.

## Sprint 8 acceptance

Workstream 8.8 is complete for the bounded Sprint 8 purpose because:

- the current no-intake behavior is explicitly selected rather than left accidental;
- no provider or collection capability is activated;
- the final preserve-or-retire decision has a named Phase 0 gate and acceptance criteria;
- privacy and joined compatibility routes match the current API behavior;
- the state remains testable and fail-closed; and
- proceeding to full validation does not weaken the later gate.

## Evidence limits

This record does not approve an email provider, mailing list, privacy program, retention schedule, legal basis, processor, subprocessor, account system, deployed abuse control, incident capability, or production collection.

It does not close issue #63 or permit institutional Phase 0 exit.
