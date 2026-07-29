# Sprint 9.7 Record — Refusal, Restart, Departure, and Informational Account Boundary

[Current status](current-status.md) · [Sprint 9 execution plan](sprint-9-execution-plan.md) · [Pre-9.10 quality review](sprint-9-pre-9-10-quality-review.md) · [Sprint 9 issue #67](https://github.com/finalboss-tom/calypsos-promise/issues/67) · [Draft PR #68](https://github.com/finalboss-tom/calypsos-promise/pull/68)

- **Status:** IMPLEMENTED — awaiting exact-candidate validation
- **Application:** `apps/site`
- **Route:** `/prologue`
- **Data class:** PUBLIC and explicitly synthetic only
- **Persistence:** none
- **Account operation:** none
- **Newsletter use:** none
- **Deployment:** none

## Goal

Complete the bounded prologue’s non-punitive departure behavior without turning completion into conversion.

## Implemented state contract

Workstream 9.7 adds three explicit scenes to the existing deterministic memory-only state machine:

- `exit-choice` — presents equally visible completion, future-boundary inspection, restart, and leave choices;
- `future-account` — explains future account responsibilities without activating identity or intake; and
- `complete` — records an honest page-memory-only stopping point without conversion.

It adds five actions:

- `continue-to-departure`;
- `view-future-account-boundary`;
- `return-to-departure`;
- `complete-without-account`; and
- `restart-prologue`.

`continue-to-departure` and `complete-without-account` fail closed unless deterministic First Lantern evidence is complete. `restart-prologue` returns the exact frozen `initialOpeningState`, clearing scene, presentation, fixture, correction, confirmation, inspection, and completion evidence.

## Visible behavior

### Restart

Every non-arrival scene exposes a restart control. Before the departure sequence, one global utility control owns restart. Departure scenes own their local restart control so the same screen does not contain duplicate restart buttons.

Restart:

- asks for no confirmation data;
- makes no remote call;
- retains no prior fixture, correction, guide, receipt, or completion state; and
- returns focus to the arrival heading through the existing scene-change focus behavior.

### Departure choices

After First Lantern, visitors may:

- complete without an account;
- inspect the informational future account boundary;
- restart the prologue; or
- leave for the public site.

No choice provides a reward, progression advantage, priority, eligibility, health benefit, or governance authority.

### Informational account boundary

The future-account scene states that account creation is unavailable in Sprint 9 and that identity, authentication, recovery, deletion, and private Chronicle storage require future separately reviewed systems.

It contains:

- no email or contact field;
- no account, signup, sign-in, authentication, or recovery endpoint;
- no `/api/join` or newsletter component;
- no state persistence;
- no model, provider, analytics, payment, or external service; and
- no implication that the account architecture is complete.

### Completion without conversion

The terminal `complete` scene states that the visitor completed the bounded public synthetic prologue without:

- an account;
- email submission;
- real health information;
- a model or provider;
- payment;
- newsletter coupling; or
- conversion acceptance.

It remains page-memory-only and creates no rank, reward, canonical unlock, Fourteen Lantern progression, health outcome, or production account state.

## Deterministic evidence

Executable state tests cover:

- premature departure and completion failing closed;
- both Aster/manual and text/voice paths reaching departure;
- future-account inspection preserving but not expanding synthetic evidence;
- completion without account creation;
- restart from every non-arrival scene returning the exact initial object;
- all new scenes exposing at least one valid action; and
- existing refusal, discard, review invalidation, and reversible First Lantern behavior remaining intact.

Source and presentation tests cover:

- visible departure and account-boundary language;
- no arbitrary input or account/contact endpoint;
- no storage, cookies, network calls, newsletter use, or authentication behavior;
- responsive layout;
- visible focus;
- reduced-data behavior;
- enhanced contrast; and
- forced colors.

## Accessibility and interaction boundary

Workstream 9.7 provides native buttons and links, ordered progress with a Departure step, scene-heading focus, live transition announcements, visible focus styles, responsive stacking, reduced-data presentation, increased contrast, and forced-color behavior.

This remains implementation evidence. Browser-driven interaction, assistive-technology review, representative timed completion, and manual accessibility review remain workstream 9.8 requirements.

## Security and privacy boundary

The slice introduces no:

- secret or environment variable;
- API route or server action;
- database or browser storage;
- arbitrary content or HTML;
- account identity;
- newsletter call;
- analytics or telemetry;
- remote resource; or
- private information.

Navigating away or restarting destroys the current React state. No deletion workflow is needed because no durable record exists.

## Acceptance support

Workstream 9.7 is ready for acceptance only if one exact branch candidate passes formatting, build, typecheck, lint, tests, repository policy, content validation, economics validation, documentation links, isolated production preview, and DCO.

Acceptance of 9.7 does not authorize merge, public linking, deployment, production accounts, private Chronicle storage, analytics, or workstream 9.10.

## Remaining gates

- 9.8 playable accessibility, interaction, duration, storage, network, and measured-performance evidence;
- 9.9 stable sources, publication, hosted evidence, rollback, and public-status reconciliation;
- 9.10 cross-contract reconciliation and completion package;
- independent specialist and affected-user review; and
- every inherited Phase 0 holdpoint.
