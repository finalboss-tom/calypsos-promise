# Sprint 9.8 — Representative Implementation Review

[Validation record](sprint-9-workstream-9-8-validation-record.md) · [Current status](current-status.md) · [Sprint 9 execution plan](sprint-9-execution-plan.md) · [Pre-9.10 quality review](sprint-9-pre-9-10-quality-review.md) · [Draft PR #68](https://github.com/finalboss-tom/calypsos-promise/pull/68)

- **Review status:** COMPLETE — final aggregate validation pending
- **Reviewer role:** founding-steward implementation review, not independent certification
- **Scope:** branch-only `/prologue` through 9.8 rendered evidence
- **Production impact:** none

## Review method

This review compares the rendered implementation against the Product Constitution, World and Lore Canon, Gameplay Foundation, Living Chronicle boundary, House of Keys boundary, Aster boundary, Sprint 8 website foundation, accepted pre-Sprint 9 issue #64, and the pre-9.10 quality review.

Evidence inspected:

- source and state-machine contracts;
- executable state tests;
- isolated production-build and static-preview evidence;
- three rendered browser journeys;
- two full native-keyboard completion journeys;
- all supplemental control branches;
- the generated JSON browser report;
- manual-path, Aster-path, and forced-colors screenshots; and
- exact route transfer measurements.

## Findings

### Product and authority coherence

The prologue remains explanation through play rather than a premature private product. It accepts only repository-authored synthetic choices and creates no account, Chronicle record, permission, health claim, reward, rank, provider relationship, or durable progression.

Aster and the direct manual path share one state machine, fixture set, correction rule, confirmation rule, projection rule, completion rule, and departure boundary. Character framing does not change the deterministic result or grant completion advantage.

### Refusal, correction, and exit

Review, prepared correction, refusal, alternate-fixture selection, discard, restart, public exit, future-account inspection, and completion without conversion are explicit. No path uses a countdown, streak loss, shame, health warning, or conversion pressure.

Leaving, navigation, or restart destroys the current temporary state. Returning to `/prologue` begins at arrival rather than restoring evidence.

### Chronicle and receipt explanation

The Chronicle-shaped view keeps source, original and corrected values, confirmation, authority meaning, lifecycle meaning, and discard behavior inspectable. The receipt-shaped view explicitly states that no request, evaluation, grant, execution, audit event, or data release exists.

Detailed contract mappings remain available behind native disclosures so direct comprehension does not require reading every technical field.

### First Lantern and canon

First Lantern is a deterministic explanation completion based on eight visible synthetic conditions. It is not one of the durable Fourteen Lanterns, a canonical unlock, rank, reward, health outcome, or production game state.

### Accessibility and resilience

The successful browser artifact confirmed:

- native Enter activation through two full completion journeys;
- expected Tab order with no trap;
- scene-heading focus after every scene change;
- polite transition announcements;
- confirmation disabled until review choice;
- every one of 41 visible buttons and disclosures exercised;
- reduced-motion, increased-contrast, and forced-colors modes retaining controls;
- no horizontal overflow in those modes or at 360 × 800;
- controls at least 44 CSS pixels high;
- reduced-data treatment with images blocked; and
- a direct no-JavaScript explanation.

The accessibility tree exposed the required main, heading, button, and link roles and a named opening control.

This remains maintainer automation, not independent assistive-technology certification.

### Security and privacy

Rendered validation discovered an inherited runtime defect: the static Next.js site used a nonce-based CSP that blocked its own client scripts. The server-rendered page looked complete, but interactive hydration could not occur.

The correction keeps the site static and adopts a static-rendering-compatible CSP while preserving same-origin scripts, first-party-only resources, denied frames and objects, denied sensitive device permissions, and denied production `unsafe-eval`.

A future account, private Chronicle, or sensitive-data capability must reopen CSP and rendering architecture rather than treating this public-site policy as sufficient.

The successful artifact recorded no external runtime request, newsletter request, WebSocket, browser error, cookie, browser storage, IndexedDB, Cache Storage, or restored state.

### Performance and duration

The route remains inside every accepted Sprint 8 ceiling. JavaScript is the closest metric at 713,812 bytes against 720,896 bytes, leaving 7,084 bytes of margin.

The two direct-completion models passed:

- manual and synthetic text: 8.45 minutes;
- Aster and synthetic voice with account-boundary inspection: 9.11 minutes.

The 23-action looped optional exploration measured 11.96 minutes and remains recorded separately. It is not represented as a direct-completion path.

### Screenshot review

The manual and Aster completion screenshots show readable hierarchy, visible completion boundaries, usable restart and return controls, no clipped content, and no accidental conversion CTA inside the prologue.

The forced-colors screenshot retained visible structure and controls.

The screenshots also revealed stale header copy saying 9.7 was under review. That copy was corrected before 9.8 acceptance.

## Remaining aggregate items

The implementation review is complete. The remaining gate is mechanical:

- all repository tests must include the restored wording contracts;
- formatter-owned output must be applied; and
- one exact head must pass the complete CI and DCO aggregate.

## Specialist and affected-user limitations

This review is not:

- independent accessibility certification;
- named screen-reader testing;
- affected-user usability evidence;
- cognitive-load research;
- a browser, operating-system, or device field matrix;
- clinical, legal, privacy, communications, or security specialist approval; or
- production-health-data readiness evidence.

Those holdpoints remain open for 9.10 and later phase gates.

## Disposition

**Representative implementation review passed.**

Workstream 9.8 remains open only until one exact aggregate candidate is fully green. This disposition does not authorize merge, public linking, hosted deployment, or 9.10.
