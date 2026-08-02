# Sprint 9.8 — Playable Validation and Measurement Record

[Current status](current-status.md) · [Sprint 9 execution plan](sprint-9-execution-plan.md) · [Pre-9.10 quality review](sprint-9-pre-9-10-quality-review.md) · [Representative review](sprint-9-workstream-9-8-manual-review.md) · [Sprint 9 issue #67](https://github.com/finalboss-tom/calypsos-promise/issues/67) · [Draft PR #68](https://github.com/finalboss-tom/calypsos-promise/pull/68)

- **Status:** IMPLEMENTED — final aggregate validation pending
- **Workstream:** 9.8 — accessibility, security, performance, storage, network, duration, and interaction validation
- **Application:** `apps/site`
- **Route:** `/prologue`
- **Evidence environment:** isolated production build and Chrome 150 through the Chrome DevTools Protocol
- **Release state:** branch-only, noindex, unlinked, unmerged, and undeployed
- **Certification boundary:** maintainer implementation evidence only

## Purpose

Workstream 9.8 closes the gap identified by the pre-9.10 quality review between source-string confidence and an actually rendered playable experience.

The permanent package proves rendered journeys, visible controls, focus movement, live announcements, native keyboard activation, browser-storage denial, external-network denial, fallback behavior, transfer budgets, and modeled direct-completion duration. It does not claim independent accessibility, security, or usability certification.

## Permanent evidence implementation

The site release job now:

1. builds the production Next.js application;
2. starts one isolated localhost production preview;
3. generates static route, header, API, contrast, and transfer evidence;
4. launches the runner-provided Chrome executable without a browser-service dependency;
5. executes rendered prologue journeys through a dependency-free Node and Chrome DevTools Protocol harness;
6. captures a JSON report and representative screenshots;
7. removes browser profiles, `.next`, reports, screenshots, and temporary state; and
8. fails if a tracked file changed.

No Playwright, Puppeteer, Cypress, analytics service, remote browser, model provider, or production endpoint was added.

## Runtime security correction discovered by 9.8

The first rendered runs exposed a real inherited defect: the statically generated Next.js pages used a per-request nonce and `'strict-dynamic'` CSP, but Next's statically emitted client scripts did not receive that nonce. Server markup rendered, while browser hydration was blocked.

The corrected contract preserves static generation and uses a static-rendering-compatible policy:

- scripts remain same-origin;
- Next's required inline bootstrap is allowed;
- external scripts remain denied;
- frames, objects, cameras, geolocation, microphones, and payments remain denied;
- production `'unsafe-eval'` remains denied; and
- nonce-based CSP remains a future dynamic-rendering security decision rather than a false current control.

Dedicated source, preview, and unit contracts now reject reintroducing a per-request nonce into the current static site. Production identity, private Chronicle state, or sensitive-data routes must revisit this architecture rather than inheriting the public-site policy unchanged.

## Exact rendered evidence established on CI 1272

Rendered browser validation passed on candidate `c6a9d4a656062acec1fe8bd64589aaff23735de5` in CI 1272. The aggregate run remained red only for formatting and three preserved wording assertions that were subsequently restored.

### Journey and duration evidence

The duration model counts unique visible scene words at 160 words per minute and adds four seconds per activated control. Automation elapsed time is recorded separately.

| Journey | Classification | Actions | Visible words | Modeled duration | Result |
| --- | --- | ---: | ---: | ---: | --- |
| `shortest-manual-text` | direct completion | 13 | 1,214 | 8.45 minutes | passes under-ten gate |
| `representative-aster-voice` | direct completion | 15 | 1,297 | 9.11 minutes | passes under-ten gate |
| `longest-optional-exploration` | looped optional exploration | 23 | 1,668 | 11.96 minutes | measured separately |

The optional route switches guides, revisits evidence, and opens additional explanations. It remains fully executed and timed but is not misrepresented as a direct-completion path.

The model is conservative maintainer evidence, not affected-user, cognitive-accessibility, assistive-technology, or field-usability evidence.

### Native keyboard evidence

The report completed two full native-keyboard journeys using Chrome's accepted `enter-keydown-text` strategy:

- manual and synthetic-text completion: 13 actions, final scene `complete`;
- Aster and synthetic-voice completion: 15 actions, final scene `complete`.

Scene-changing controls moved focus to `#prologue-scene-title`. In-scene review choices retained the scene and updated the polite status announcement.

### Control and accessibility evidence

The rendered report discovered and exercised all 41 visible buttons and native disclosures. No visible control was missing from the exercised set.

The report also confirmed:

- expected Lantern Shore tab order with no keyboard trap;
- confirmation disabled before an explicit review choice;
- exactly one `aria-current="step"` progress item;
- no positive `tabindex` values;
- required accessibility-tree roles and an accessible opening-button name;
- reduced-motion, increased-contrast, and forced-colors media matches;
- no horizontal overflow in those modes;
- no horizontal overflow at 360 × 800;
- minimum visible control height of 44.796875 CSS pixels;
- compiled reduced-data treatment with controls retained when images are blocked; and
- a script-disabled direct explanation with a `/how-it-works` link.

### Privacy, storage, and network evidence

The successful rendered report observed:

- zero external runtime requests;
- zero newsletter API requests;
- zero WebSockets;
- zero browser console or runtime errors;
- zero cookies for the local origin;
- zero local-storage or session-storage entries;
- zero IndexedDB databases;
- zero Cache Storage names; and
- no state restoration after leaving and returning to `/prologue`.

The route still exposes no text field, textarea, editable region, file input, microphone API, account form, payment path, model call, or provider call.

## Performance evidence

CI 1272 measured `/prologue` as:

| Metric | Measured | Accepted Sprint 8 ceiling | Remaining margin |
| --- | ---: | ---: | ---: |
| HTML | 37,652 bytes | 98,304 bytes | 60,652 bytes |
| JavaScript | 713,812 bytes | 720,896 bytes | 7,084 bytes |
| CSS | 47,733 bytes | 131,072 bytes | 83,339 bytes |
| Images | 705 bytes | 1,572,864 bytes | 1,572,159 bytes |
| Web fonts | 0 bytes | 0 bytes | 0 bytes |
| Total transfer | 799,902 bytes | 2,097,152 bytes | 1,297,250 bytes |
| First-party requests | 15 | 32 | 17 |

**Disposition:** Sprint 9 does not require a larger playable-route budget. The permanent browser validator reads the machine-generated static report and fails against the accepted Sprint 8 ceilings.

The larger repository-wide ceilings introduced during the post-Sprint 8 newsletter reconciliation are not attributed to the prologue and do not grant Sprint 9 additional growth authority.

## Screenshot review

The CI artifact includes:

- completed manual-path rendering;
- completed Aster-path rendering; and
- forced-colors rendering.

Review confirmed readable completion state, visible focus, usable actions, no clipped content, and no narrow-layout overflow. It also found stale page copy claiming 9.7 was still under review. That copy was corrected to show 9.1–9.7 validated and 9.8 under review before acceptance.

## Generated artifacts

Successful browser validation produces, uploads, and then removes:

- `apps/site/site-release-evidence.json`;
- `apps/site/prologue-browser-evidence/report.json`;
- `prologue-complete-manual.png`;
- `prologue-complete-aster.png`;
- `prologue-forced-colors.png`; and
- `site-preview.log`.

These are CI artifacts, not tracked repository state.

## Acceptance criteria

Workstream 9.8 may be accepted only when one exact candidate passes:

- formatting;
- production build and static isolated-preview validation;
- rendered click and native-keyboard journeys;
- direct-completion duration gates;
- optional-exploration measurement;
- visible-control coverage;
- accessibility and fallback checks;
- storage and network denial checks;
- Sprint 8 performance ceilings;
- typecheck, lint, tests, repository policy, content, economics, and documentation links;
- DCO; and
- generated-state cleanup.

The exact report must retain the limitation that this evidence is not independent accessibility, security, or usability certification.

## Open specialist and affected-user holdpoints

This workstream does not close:

- independent accessibility review;
- named screen-reader product testing;
- affected-user and cognitive-accessibility research;
- browser, operating-system, mobile, and device field matrices;
- production monitoring and incident operations;
- real voice capture or microphone privacy design;
- production identity, account, recovery, and private-state architecture;
- production Chronicle storage or model-provider evaluation; or
- legal, communications, privacy, and security specialist approval for future account or permission presentation.

## Current decision

The rendered evidence package is substantively established. Final 9.8 acceptance still requires one exact aggregate candidate with formatting and all repository tests green. This record authorizes neither merge, public linking, hosted deployment, nor workstream 9.10.
