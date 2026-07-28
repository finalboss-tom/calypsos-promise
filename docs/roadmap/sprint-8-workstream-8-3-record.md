# Sprint 8.3 Record — Navigation, Status, and Accessibility Foundations

[Current status](current-status.md) · [Sprint 8 plan](sprint-8-execution-plan.md) · [Website architecture](../architecture/public-website-foundation-and-migration.md) · [Workstream 8.2 record](sprint-8-workstream-8-2-record.md) · [Site README](../../apps/site/README.md) · [Issue #60](https://github.com/finalboss-tom/calypsos-promise/issues/60) · [Draft PR #61](https://github.com/finalboss-tom/calypsos-promise/pull/61)

- **Status:** IMPLEMENTED — final exact-head validation pending
- **Entry baseline:** Sprint 8.2 final validated head `2e9170efebd68562e0dbf8775815066e2a042e4e`
- **Formatted implementation head:** `641f298c13f030951fa9af3f8b1f82b2b9c1ef04`
- **Application owner:** `apps/site`
- **Rendering boundary:** server-rendered essential information; no client component is required
- **Information boundary:** public repository records and explicitly synthetic examples only
- **Deployment state:** Git-triggered Vercel deployment remains disabled

## Result

Workstream 8.3 adds the shared navigation, evidence-status, landmark, focus, reduced-motion, low-bandwidth, image-failure, and no-client-JavaScript foundations required before the final homepage and Promise migration.

The implementation remains one `apps/site` application. It does not create a second site, content service, client-side application shell, independent status registry, or new source of authority.

## Direct navigation

The shared direct-navigation registry provides conventional links to:

- the public homepage;
- capability status;
- signup privacy;
- the canonical repository current-status record; and
- the public GitHub repository.

Each item includes a concise description. External links identify their new-tab behavior for assistive technology.

The shared root layout provides:

- a visible-on-focus skip link to primary navigation;
- a visible-on-focus skip link to the main content;
- semantic `header`, `nav`, `main`, and `footer` landmarks;
- a focusable main target; and
- labelled primary and footer navigation.

## Optional narrative path

The Ogygia path uses native `details` and `summary` semantics rather than a custom client-side disclosure.

It links to the same essential destinations as the direct path:

1. the Promise and current website boundary;
2. capability status;
3. signup privacy and the private-data boundary; and
4. the public repository contribution path.

The narrative path exposes no exclusive essential information and creates no hidden authority or progression requirement.

## Capability-status primitives

The site-local controlled vocabulary is:

- `live` — publicly available and inspectable now;
- `experimental` — implemented for review but not an accepted production release;
- `planned` — accepted roadmap work that is not implemented yet; and
- `long-horizon` — a future direction behind later evidence and safety gates.

Every capability record includes:

- a stable ID;
- public label;
- controlled status;
- concise summary;
- canonical source URL; and
- source-link label.

The status registry is presentation data. It cannot create upstream product truth, funding truth, provider status, clinical authority, permission, or governance power.

## Accessibility and resilient-presentation foundations

The implementation adds or strengthens:

- visible focus for links, buttons, summaries, and programmatic main focus;
- native keyboard operation for direct and narrative navigation;
- visually hidden explanatory text for external links;
- responsive one-, two-, three-, four-, and five-column layout behavior;
- reduced-motion behavior that removes smooth scrolling and non-essential transition/animation duration;
- reduced-data behavior that removes decorative hero imagery and gradients;
- lazy loading and reduced quality for the decorative hero image;
- a non-image hero background so image failure does not remove essential content;
- increased-border treatment for higher-contrast preferences;
- forced-colors behavior that removes decorative overlays and imagery; and
- all essential copy in server-rendered HTML.

These are implementation foundations, not accessibility conformance certification or affected-user validation.

## Deterministic validation

The site validator and focused tests verify:

- required navigation, status, component, and data files;
- direct and narrative navigation landmarks;
- native `details` and `summary` disclosure;
- no `use client` directive in the 8.3 navigation or status surface;
- all four controlled capability statuses;
- structured `sourceHref` and `sourceLabel` evidence;
- reduced-motion, reduced-data, contrast, and forced-colors CSS;
- lazy decorative imagery;
- server-rendered essential-information claims;
- existing route compatibility;
- paused signup without intake; and
- disabled Git-triggered deployment.

The first implementation run found one test assertion tied to wording rather than the structured source fields. The assertion was corrected to verify the actual schema. CI formatting was then applied through a self-removing workflow; no temporary workflow remains at the formatted implementation head.

## Evidence limits

Workstream 8.3 does not establish:

- final homepage or Promise content;
- final route architecture for later Sprint 8 pages;
- a Trust Center, Open Forge, roadmap, support, or funding-transparency page;
- final signup disposition;
- representative screen-reader, keyboard, low-vision, cognitive-accessibility, low-bandwidth, or affected-user review;
- accessibility conformance or certification;
- performance budgets or measured route-level performance;
- preview deployment, official production cutover, or deployed-header verification; or
- any private, provider, connector, clinical, research, financial, governance, or gameplay capability.

## Handoff

Workstream 8.4 may now migrate the final cinematic homepage and Promise explanation through deliberate cuts and splices while preserving:

- the shared direct and narrative navigation foundations;
- server-rendered essential information;
- the controlled status vocabulary and canonical source fields;
- reduced-motion, reduced-data, image-failure, contrast, and forced-colors behavior;
- signup pause; and
- every permanent Sprint 8 non-scope boundary.
