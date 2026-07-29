# Public Synthetic Prologue Boundary

[Architecture index](README.md) · [Sprint 9 execution plan](../roadmap/sprint-9-execution-plan.md) · [Accepted alignment issue #64](https://github.com/finalboss-tom/calypsos-promise/issues/64) · [Sprint 9 issue #67](https://github.com/finalboss-tom/calypsos-promise/issues/67)

- **Status:** ACCEPTED SPRINT 9 IMPLEMENTATION CONTRACT
- **Owner:** `apps/site`
- **Public route:** `/prologue`
- **Data class:** PUBLIC and explicitly synthetic only
- **Persistence:** none
- **Model provider:** none required or authorized
- **Account boundary:** informational only

## Decision

The Sprint 9 prologue remains inside `apps/site`.

A separate application is not justified because the prologue does not yet have a distinct trust, runtime, release, scale, legal, persistence, platform, or ownership boundary. It uses the existing public website shell, security headers, CSP, first-party asset model, manual deployment control, and accessibility foundations. Creating another application now would add build, navigation, validation, deployment, and operability complexity without adding a legitimate isolation benefit.

This decision does not commit Sprint 10 to the same boundary. The universal browser, iOS, and Android game shell must make its own application decision from evidence.

## System context

```text
Public browser
  |
  | GET /prologue and first-party assets
  v
apps/site server-rendered route shell
  |
  | hydrates one bounded client interaction island
  v
memory-only deterministic prologue state machine
  |
  +--> pre-authored public synthetic fixtures
  +--> deterministic Aster presentation adapter
  +--> manual non-AI presentation
  +--> temporary synthetic Chronicle projection
  +--> temporary synthetic House of Keys receipt projection
  +--> deterministic First Lantern evidence

No branch crosses to:
  account/authentication
  newsletter API
  database or durable browser storage
  analytics or behavioral profiling
  model provider or remote inference
  microphone, camera, file, location, wearable, provider, connector, clinical,
  research, payment, donation, or private MCP capability
```

## Trust boundaries

### Public route shell

The server-rendered route owns:

- canonical metadata;
- one page `h1` and semantic landmarks;
- direct explanation of the synthetic, temporary, no-account boundary;
- no-JavaScript fallback explanation and exit path;
- existing security headers, nonce CSP, cache controls, and first-party resources; and
- the boundary between the public site and the client interaction island.

It does not own gameplay truth, permission, Chronicle truth, identity, account creation, storage, model inference, newsletter processing, or progression outside the prologue demonstration.

### Client interaction island

The client component owns only:

- the current deterministic scene;
- selected public synthetic fixture IDs;
- deterministic draft and correction choices;
- confirmed synthetic demonstration state;
- temporary Chronicle and receipt projections;
- First Lantern completion evidence; and
- visible status and accessibility announcements.

It has no authority to persist, authenticate, grant permission, create a real record, contact a provider, submit newsletter data, or create durable progression.

### Public synthetic fixtures

Fixtures are repository-controlled public content. They may be imported into the browser bundle because they contain no private information or secrets.

A fixture is not authoritative merely because it is accepted repository content. It is authoritative only for the bounded demonstration contract it explicitly defines. It cannot become evidence about a visitor, a real person, a medical claim, a permission grant, or a production system.

## Route model

The first Sprint 9 implementation uses one canonical route:

- `/prologue`

Scene state is not encoded in paths, query parameters, or hashes. This prevents URLs from masquerading as durable progress, avoids leaking selected state through referrers or logs, and keeps refresh behavior honest: a refreshed prologue begins again.

Later work may earn URL-addressable scenes only if accessibility, restoration, sharing, testing, or content-authority evidence justifies them without creating persistence ambiguity.

## State machine contract

### State

```ts
type PrologueScene =
  | "arrival"
  | "lantern-shore"
  | "aster-introduction"
  | "capture-choice"
  | "synthetic-draft"
  | "review-and-correction"
  | "confirmed-entry"
  | "synthetic-chronicle"
  | "synthetic-receipt"
  | "first-lantern"
  | "exit-choice"
  | "discarded"
  | "left"
  | "complete";

type PrologueState = {
  readonly scene: PrologueScene;
  readonly presentationPath: "aster" | "manual" | null;
  readonly captureMode: "synthetic-text" | "synthetic-voice" | null;
  readonly fixtureId: string | null;
  readonly draftId: string | null;
  readonly correctionId: string | null;
  readonly confirmed: boolean;
  readonly chronicleProjectionVisible: boolean;
  readonly receiptProjectionVisible: boolean;
  readonly firstLanternEvidence: readonly string[];
};
```

The exact implementation may refine names, but it must preserve the semantic separation represented here.

### Actions

Permitted action families are:

- begin;
- continue;
- skip optional narration;
- choose Aster or manual presentation;
- choose one pre-authored synthetic modality and fixture;
- review draft;
- choose one pre-authored correction or accept the draft unchanged;
- confirm synthetic entry;
- inspect synthetic Chronicle projection;
- inspect synthetic receipt projection;
- complete First Lantern from deterministic evidence;
- restart;
- discard;
- leave; and
- inspect the future account boundary without activating it.

There is no action for arbitrary text, audio, file, camera, location, contact, provider, payment, research, or real-data submission.

### Transition rules

- Invalid actions fail closed and do not mutate state.
- Every state has at least one visible non-punitive exit.
- `confirmed-entry` requires an explicit visitor confirmation action.
- `synthetic-chronicle` requires confirmed synthetic state.
- `synthetic-receipt` requires the temporary Chronicle projection to be inspectable first.
- `first-lantern` requires named deterministic evidence, including visible synthetic classification and explicit confirmation.
- `complete` does not require account creation, email, Aster, model output, payment, provider selection, or data disclosure.
- Restart and discard replace state with the accepted initial state; no hidden residue remains.

## Temporary-data contract

### Permitted locations

- React component memory;
- immutable public synthetic fixture modules;
- rendered DOM needed for the current scene and accessibility announcements; and
- deterministic test fixtures and expected outputs in the repository.

### Prohibited locations and channels

- `localStorage`;
- `sessionStorage`;
- IndexedDB;
- cookies;
- Cache Storage;
- service-worker state;
- URL query strings or hashes;
- form submission;
- newsletter API or Google Sheet;
- server actions or API routes;
- application, deployment, provider, analytics, or browser telemetry logs;
- databases, object storage, queues, schedules, or events;
- model prompts, provider egress, embeddings, or retrieval systems; and
- third-party scripts, pixels, fonts, media, or resources.

### Lifetime and destruction

The state lifetime is one mounted prologue page instance.

State is destroyed by:

- refresh;
- navigation away;
- tab or window close;
- explicit restart;
- explicit discard;
- explicit leave; or
- component teardown.

The experience must state this before the visitor chooses a synthetic capture modality.

## Synthetic input contract

The prologue may present controls labeled as synthetic text and synthetic voice demonstrations. Both controls select repository-authored fixtures.

The synthetic voice path may display a transcript and an icon or illustrated waveform. It may not:

- call `navigator.mediaDevices`;
- request microphone permission;
- record, upload, stream, transcribe, or analyze audio;
- infer speech, emotion, identity, health, or accessibility status; or
- imply that real voice capture is available.

The synthetic text path may display a pre-authored statement. It may not render a free-form text box, editable content area, paste target, or substitute field inviting personal health information.

## Aster adapter contract

Aster is implemented as a deterministic local presenter over selected public fixtures.

Inputs:

- selected fixture ID;
- selected modality label; and
- current explicit prologue state.

Outputs:

- pre-authored introduction;
- deterministic synthetic draft;
- source and synthetic classification explanation;
- available correction choices; and
- deterministic next-action explanation.

Aster output is never treated as evidence by itself. The visitor must explicitly confirm a synthetic draft before the demonstration may project a Chronicle entry.

The manual path must use the same fixtures, draft, source explanation, correction choices, confirmation control, Chronicle projection, receipt projection, and completion evidence without Aster framing.

## Synthetic Chronicle projection

The UI projection must show:

- a stable synthetic record ID;
- a visible `Synthetic demonstration` label;
- the selected pre-authored source fixture;
- source class and provenance explanation;
- draft, corrected, or confirmed status;
- the visitor’s selected correction choice, when applicable;
- a statement that nothing is stored; and
- restart, discard, and exit controls.

It may not imply a real Chronicle, account, durable record, medical validation, diagnosis, provider import, or production provenance chain.

## Synthetic House of Keys receipt projection

Where practical, the receipt view should adapt the accepted public `@calypsos-promise/house-of-keys` synthetic contracts or fixture vocabulary rather than inventing a competing permission model.

The UI projection must state:

- synthetic and non-production classification;
- no real identity exists;
- no real grant or recipient exists;
- no legal consent or production permission is created;
- no real data release occurred;
- the named purpose, data class, action, and recipient are demonstration values; and
- real permission evaluation belongs to later separately authorized systems.

The prologue may simplify the full contract into a human-readable projection, but it must link the projection to its canonical public source and must not modify the package contract to fit the story.

## First Lantern evidence

First Lantern completion evidence must be a deterministic list, not a score or model judgment.

Minimum evidence:

- the visitor reached Lantern Shore;
- the visitor selected Aster or the manual path;
- a public synthetic fixture was selected;
- the draft was visibly synthetic;
- the visitor reviewed and explicitly confirmed or corrected the draft;
- the temporary Chronicle projection was inspected;
- the synthetic receipt limitations were presented; and
- completion occurred without account, email, real data, model provider, remote service, payment, provider, or forced conversion.

Completion does not survive refresh or exit. Sprint 9 does not create durable progression.

## Refusal and exit contract

At minimum, the experience must provide:

- skip optional narration;
- choose the manual path;
- refuse synthetic capture while still receiving the core product explanation;
- restart;
- discard temporary state;
- leave for the public site;
- complete without account conversion; and
- inspect an informational future-account explanation.

The UI may not use countdowns, dark patterns, reduced rewards, shame, warnings of lost health value, or repeated contact requests to discourage refusal.

## Accessibility contract

The prologue must add evidence beyond the static website baseline for:

- logical keyboard order and no keyboard traps;
- visible focus after every state transition;
- one stable page `h1` with scene headings below it;
- programmatic scene and status announcements;
- dialogue and choice semantics;
- capture modality labels that explicitly say synthetic;
- correction and confirmation controls;
- receipt tables or definition lists with understandable reading order;
- restart, discard, refusal, and exit controls available without pointer interaction;
- no required timing or autoplay;
- reduced motion with no lost state or explanation;
- reduced data without decorative media dependency;
- forced colors and enhanced contrast;
- error messages associated with the relevant control; and
- a complete no-JavaScript explanation and exit path.

Passing source assertions alone is not independent accessibility certification.

## Security and privacy contract

- Preserve the current first-party-only CSP and security headers.
- Keep microphone, camera, geolocation, and payment permissions disabled.
- Do not add new API routes or server actions for prologue state.
- Do not add secrets or environment variables for the prologue.
- Do not log state, fixtures selected, corrections, or completion.
- Do not load remote media, analytics, fonts, scripts, models, or trackers.
- Do not accept raw HTML, Markdown, URLs, filenames, or arbitrary user-controlled content.
- Keep errors generic, local, and free of internal implementation or protected information.

## Performance contract

Sprint 9 may revise the public-site JavaScript and transfer budgets only through explicit measured evidence.

The implementation should prefer:

- one bounded client island;
- immutable fixture data;
- CSS rather than animation libraries;
- no new runtime dependency unless evidence justifies it;
- lazy decorative media;
- no web fonts; and
- no remote resources.

A larger budget is not automatic permission to consume it.

## Validation contract

Permanent validation must detect:

- storage API use;
- cookie mutation;
- microphone, camera, geolocation, or file APIs;
- arbitrary text or editable input;
- network calls from the prologue component;
- analytics and third-party resources;
- invalid or skipped state transitions;
- completion without explicit confirmation;
- receipt or Chronicle output lacking synthetic labels;
- forced account, email, newsletter, or provider paths;
- inaccessible focus or announcement contracts;
- missing restart, discard, refusal, exit, or manual fallback;
- route, canonical, sitemap, header, and CSP regressions; and
- transfer-budget regressions.

CI may exercise only public synthetic inputs and must not contact the real newsletter provider or any model provider.

## Release boundary

The existence of `/prologue` on a branch or merged commit does not authorize a public link or deployment.

Publication requires:

- all required workstreams and validation for the proposed release slice;
- exact commit provenance;
- explicit founding-steward release direction;
- manual deployment while Git-triggered deployment remains controlled;
- route, header, CSP, resource, and runtime verification;
- truthful capability labels;
- rollback ownership; and
- public-safe evidence that contains no visitor data.

## Holdpoints

The following remain unresolved and may not be implied complete:

- independent accessibility review;
- affected-user testing;
- real microphone and voice privacy design;
- real health input and safety review;
- account, authentication, identity, and recovery;
- durable local or server storage;
- production Chronicle and House of Keys operation;
- production Aster and model-provider selection;
- legal meaning of production permission and receipts;
- analytics, monitoring, incident operations, and support; and
- universal browser, iOS, and Android application architecture.

These holdpoints constrain claims and future activation. They do not prevent the bounded public synthetic demonstration defined here.