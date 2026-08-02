# Sprint 9.8 — Playable Validation and Measurement Record

[Current status](current-status.md) · [Sprint 9 execution plan](sprint-9-execution-plan.md) · [Pre-9.10 quality review](sprint-9-pre-9-10-quality-review.md) · [Sprint 9.7 record](sprint-9-workstream-9-7-record.md) · [Sprint 9 issue #67](https://github.com/finalboss-tom/calypsos-promise/issues/67) · [Draft PR #68](https://github.com/finalboss-tom/calypsos-promise/pull/68)

- **Status:** IMPLEMENTED — exact-candidate validation pending
- **Workstream:** 9.8 — accessibility, security, performance, storage, network, and interaction validation
- **Application:** `apps/site`
- **Route:** `/prologue`
- **Evidence environment:** isolated local production build and headless Chrome/Chromium
- **Release state:** branch-only, noindex, unlinked, unmerged, and undeployed
- **Certification boundary:** maintainer implementation evidence only

## Purpose

Workstream 9.8 closes the gap identified by the pre-9.10 quality review between static source assertions and a genuinely rendered playable experience.

The permanent evidence package must prove:

1. the accepted Aster/manual and text/voice paths render and complete;
2. visible controls activate allowed deterministic transitions;
3. scene focus, live announcements, keyboard order, and accessible names remain inspectable;
4. reduced-motion, enhanced-contrast, forced-color, narrow-screen, low-data, and no-JavaScript paths retain essential meaning and controls;
5. no browser persistence, newsletter call, provider call, arbitrary input, external runtime resource, hidden network state, or browser error is introduced;
6. direct completion paths remain under the Sprint 9 ten-minute target using a transparent reading-and-decision model; and
7. `/prologue` remains inside the accepted Sprint 8 performance ceilings rather than earning a larger budget by default.

## Evidence implementation

`apps/site/src/validate-prologue-browser.mjs` launches the Chrome or Chromium executable already present on the CI runner and communicates through the Chrome DevTools Protocol using Node’s built-in `WebSocket` implementation.

The validator adds no Playwright, Puppeteer, Cypress, browser-service, or remote-provider dependency. It creates isolated browser contexts, disables cache reuse, records runtime requests and errors, executes controls, inspects accessibility and storage state, captures representative screenshots, writes one JSON report, and destroys all browser profiles and generated output after validation.

The existing `site-release-validation` job now runs in this order:

1. build the production Next.js site;
2. start one isolated localhost preview;
3. generate the existing static route and transfer evidence;
4. execute the rendered prologue browser validator;
5. upload the static report, browser report, screenshots, and preview log;
6. stop the preview and delete `.next`, reports, screenshots, and temporary state; and
7. fail if any tracked repository file changed.

## Rendered journey coverage

The permanent browser report exercises three completion journeys:

| Journey                      | Presentation                       | Fixture                    | Review choice       | Departure                                             | Purpose                                                                             |
| ---------------------------- | ---------------------------------- | -------------------------- | ------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `shortest-manual-text`       | direct manual                      | synthetic text             | accept as written   | complete without account                              | shortest accepted direct path                                                       |
| `representative-aster-voice` | deterministic Aster                | synthetic voice transcript | prepared correction | inspect future-account boundary, return, complete     | representative path across optional framing and informational boundary              |
| `longest-direct-exploration` | Aster, manual switch, Aster return | synthetic text             | prepared correction | receipt and account-boundary review before completion | longest bounded direct completion path without refusal, restart, or arbitrary loops |

The shortest and representative journeys activate every progression step through keyboard Enter events. Scene-changing actions must move focus to `#prologue-scene-title`. In-scene correction choices must retain the scene and update the polite transition announcement.

Supplemental isolated checks cover:

- replaying arrival;
- returning to Lantern Shore;
- reconsidering the guide;
- returning from capture to guide choice;
- choosing another fixture;
- refusing a draft;
- disabled confirmation before an explicit review choice;
- reviewing or discarding confirmed state;
- opening Chronicle and receipt field-mapping disclosures;
- returning from receipt to Chronicle;
- discarding Chronicle, receipt, and First Lantern state;
- reviewing receipt evidence after completion;
- reviewing the synthetic entry after completion;
- restarting from the future-account boundary; and
- leaving the route and confirming that a later `/prologue` visit begins at `arrival` rather than restoring state.

Every visible scene button or native disclosure discovered during these journeys must appear in the exercised-control set. Public exit links and canonical GitHub source links are validated separately and are not opened as runtime dependencies.

## Accessibility and resilience evidence

The browser package checks:

- one current progress step through `aria-current="step"`;
- no positive `tabindex` values;
- scene-heading focus after every scene change;
- polite transition announcements;
- disabled confirmation until review choice;
- accessible-tree presence of main, heading, button, and link roles;
- accessible name for the opening control;
- DOM keyboard order for all controls in the Lantern Shore scene;
- no keyboard trap within the scene control sequence;
- reduced-motion media emulation with controls retained;
- enhanced-contrast media emulation with controls retained;
- forced-colors media emulation with controls retained and screenshot evidence;
- a 360 × 800 viewport with no horizontal overflow and controls at least 44 CSS pixels high;
- compiled `prefers-reduced-data` rules plus image-blocked navigation retaining essential controls; and
- script-disabled rendering of the direct no-JavaScript explanation and `/how-it-works` link.

Chrome DevTools does not expose direct `prefers-reduced-data` emulation. The report therefore distinguishes actual browser media emulation from the low-data simulation and does not represent the latter as independent device coverage.

## Privacy, security, storage, and network evidence

For every journey, the validator records page requests, WebSocket creation, console errors, runtime exceptions, cookies, `localStorage`, `sessionStorage`, IndexedDB databases, Cache Storage names, and inputs inside the prologue experience.

The candidate fails if it observes:

- an HTTP or HTTPS runtime request outside the isolated local origin;
- any `/api/join` request;
- any WebSocket;
- a browser console error or runtime exception;
- a prologue text field, file input, selector, textarea, or editable region;
- a cookie for the local origin;
- local storage, session storage, IndexedDB, or Cache Storage state; or
- state restoration after leaving and returning.

The inherited CSP, permissions policy, security headers, first-party-only resource rule, zero-font budget, secret-pattern scan, disabled Git deployment, and no-production-provider rule remain enforced by the existing release validator and repository checks.

## Duration evidence

The browser report records two distinct measurements:

- **automation elapsed time**, used only for reproducibility and CI performance; and
- **modeled human completion time**, calculated from the unique visible words encountered in each journey at 160 words per minute plus four seconds per activated control.

Every direct completion journey must remain below ten modeled minutes. The report preserves the limitation that this is a conservative maintainer model, not affected-user, cognitive-accessibility, assistive-technology, or field usability evidence.

## Performance evidence and budget disposition

The accepted Sprint 8 route ceilings at squash commit `20e2c95c96670f0ef6b972c9ebf7b482f7f9cf1a` were:

| Metric               | Sprint 8 ceiling |
| -------------------- | ---------------: |
| HTML                 |     98,304 bytes |
| JavaScript           |    720,896 bytes |
| CSS                  |    131,072 bytes |
| Images               |  1,572,864 bytes |
| Web fonts            |          0 bytes |
| Total transfer       |  2,097,152 bytes |
| First-party requests |               32 |

The most recent exact static evidence on accepted 9.7 head `a3ac15f32ca098a2955c14bf815af60cccfd56d6` measured `/prologue` as:

| Metric               |      Measured | Sprint 8 remaining margin |
| -------------------- | ------------: | ------------------------: |
| HTML                 |  37,630 bytes |              60,674 bytes |
| JavaScript           | 716,199 bytes |               4,697 bytes |
| CSS                  |  47,733 bytes |              83,339 bytes |
| Images               |     705 bytes |           1,572,159 bytes |
| Web fonts            |       0 bytes |                   0 bytes |
| Total transfer       | 802,267 bytes |           1,294,885 bytes |
| First-party requests |            15 |                        17 |

**Disposition:** Sprint 9 does not require a larger playable-route performance budget. The browser validator reads the machine-generated static report and fails if `/prologue` exceeds any accepted Sprint 8 ceiling.

The larger repository-wide ceilings currently on `main` were introduced during the post-Sprint 8 newsletter reconciliation. They are not attributed to the prologue and do not grant Sprint 9 additional growth authority.

## Generated evidence

A successful candidate produces:

- `apps/site/site-release-evidence.json` — existing static route, resource, header, metadata, contrast, and API evidence;
- `apps/site/prologue-browser-evidence/report.json` — rendered journey, control, focus, accessibility, duration, storage, network, and Sprint 8 budget evidence;
- `apps/site/prologue-browser-evidence/screenshots/prologue-complete-manual.png`;
- `apps/site/prologue-browser-evidence/screenshots/prologue-complete-aster.png`;
- `apps/site/prologue-browser-evidence/screenshots/prologue-forced-colors.png`; and
- `site-preview.log`.

These files are CI artifacts only. They are removed before the tracked-mutation check and are not committed to the repository.

## Acceptance criteria

Workstream 9.8 may be accepted only when one exact candidate passes:

- formatting;
- production build;
- static isolated-preview validation;
- rendered-browser validation;
- typecheck;
- lint;
- unit and contract tests;
- repository policy;
- content and economics validation;
- documentation links;
- DCO; and
- generated-state cleanup.

The exact report must show:

- all three completion journeys under ten modeled minutes;
- every discovered scene button or disclosure exercised;
- no external runtime request, newsletter request, WebSocket, console error, or runtime exception;
- no browser persistence;
- all `/prologue` metrics within the accepted Sprint 8 ceilings; and
- no claim of independent accessibility or usability certification.

## Limitations and inherited holdpoints

This workstream does not close:

- independent accessibility review;
- testing with named screen-reader products;
- affected-user or cognitive-accessibility research;
- browser, operating-system, device, and mobile field matrices;
- production telemetry, monitoring, or incident operations;
- real voice capture or microphone privacy design;
- production identity, account, recovery, and private-state architecture;
- production Chronicle storage or model-provider evaluation; or
- legal and communications review of future permission and account presentation.

## Current decision

The 9.8 implementation is ready for exact-candidate CI and DCO validation. It does not authorize merge, public linking, hosted deployment, or workstream 9.10.
