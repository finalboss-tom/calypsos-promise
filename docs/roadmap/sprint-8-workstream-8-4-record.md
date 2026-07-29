# Sprint 8.4 Record — Homepage and Promise Migration

[Current status](current-status.md) · [Sprint 8 plan](sprint-8-execution-plan.md) · [Website architecture](../architecture/public-website-foundation-and-migration.md) · [Workstream 8.3 record](sprint-8-workstream-8-3-record.md) · [Site README](../../apps/site/README.md) · [Issue #60](https://github.com/finalboss-tom/calypsos-promise/issues/60) · [Draft PR #61](https://github.com/finalboss-tom/calypsos-promise/pull/61)

- **Status:** IMPLEMENTED AND VALIDATED — workstream 8.5 next
- **Entry baseline:** Sprint 8.3 final validated head `9174d713755220906144beef80bec6b43932f459`
- **Focused production-build commit:** `790bf9a79a76c28451fefcf959d92aefa59b5d03`
- **Clean validated implementation head:** `dc5986d19c691ba4dea95040be5bc5aa34a8d1b2`
- **Validation:** CI run 1010 and DCO Attestation run 1089 passed on the clean implementation head
- **Application owner:** `apps/site`
- **Content authority:** frozen Product Constitution and accepted repository records
- **Rendering boundary:** server-rendered essential information; no client component is required
- **Deployment state:** Git-triggered Vercel deployment remains disabled

## Result

Workstream 8.4 migrates the final cinematic homepage and Promise explanation through deliberate cuts and splices from the Track 0A direction while preserving the validated Sprint 8.1–8.3 application, authority, navigation, status, accessibility, resilience, signup, security, and non-scope boundaries.

The migration remains one `apps/site` application. It does not create a CMS, remote content service, second website, second source of product truth, or client-side application shell.

## Source authority

The public presentation is derived from the frozen Product Constitution, including:

- the mission;
- the player promise;
- the three connected loops;
- non-negotiable player rights;
- product prohibitions;
- the meaningfully-free principle; and
- evidence-before-expansion requirements.

The dedicated Promise page and homepage link to the frozen Product Constitution as the upstream authority. Website copy may explain that record but cannot amend it.

## Cinematic homepage

The `/` route now provides:

- a cinematic Ogygia arrival using the repository-owned hero asset and existing design tokens;
- the player promise: **Build your Living Chronicle. Improve your health. Keep the key.**;
- a plain-language mission explanation that does not hide purpose behind narrative;
- visibly distinct `experimental` website-foundation and `live` public-repository statuses;
- explicit planned-game language rather than a claim that gameplay or a private product is live;
- the three connected personal-value loops;
- the public-software/private-data Promise;
- non-negotiable rights cards;
- the existing canonical-source-linked capability status grid; and
- ordinary public contribution paths through the repository and issue tracker.

Essential content remains available without animation, audio, client JavaScript, an account, or story traversal.

## Dedicated Promise route

The new `/promise` route provides:

- canonical page metadata and sitemap inclusion;
- the player promise and mission summary;
- a direct link to the frozen Product Constitution;
- private-by-default, meaningful-refusal, player-confirmation, and correction-and-exit principles;
- the three connected loops;
- a clear statement that research, commercial sharing, public visibility, and compensated opportunities are not required for the core experience;
- the meaningfully-free requirement; and
- an explicit rule that narrative may welcome and motivate but cannot hide purpose or become a gate.

The route is available through both conventional direct navigation and the optional native Ogygia path.

## Personal value and secondary use

The homepage and Promise route preserve the required order:

1. build a useful longitudinal record;
2. receive understandable personal value; and
3. separately choose whether and how information contributes to research or compensated opportunities.

The third loop cannot become a condition for the first two. Broader consent, disclosure, payment, or progression cannot purchase essential privacy, accessibility, correction, export, revocation, or deletion controls.

## Accessibility and resilient presentation

The migration preserves or extends:

- direct and narrative navigation parity;
- skip links and semantic landmarks;
- native keyboard operation and visible focus;
- server-rendered essential information;
- no `use client` dependency;
- reduced-motion behavior;
- reduced-data removal of decorative imagery and gradients;
- image-failure-safe backgrounds;
- higher-contrast and forced-colors behavior;
- responsive homepage, navigation, loop, principle, and contribution layouts; and
- descriptive new-tab assistance for external links.

These remain implementation foundations rather than accessibility conformance certification or affected-user validation.

## Deterministic validation

The site validator and focused tests now verify:

- presence of `/promise` and its navigation parity;
- the frozen player promise;
- the public-software/private-data statement;
- the ability to use the core without agreeing to research;
- all three connected loops;
- Product Constitution source linkage;
- ordinary contribution paths;
- sitemap inclusion;
- the controlled capability-status model;
- server-only rendering;
- resilience media queries;
- route compatibility;
- paused signup without intake; and
- disabled Git-triggered deployment.

A self-removing validation workflow applied canonical formatting and ran a focused production build, site lint, typecheck, and focused tests before producing commit `790bf9a79a76c28451fefcf959d92aefa59b5d03`.

Next.js regenerated an incremental TypeScript build cache during that build. The generated `tsconfig.tsbuildinfo` file and incremental setting were removed. The source-only candidate at `dc5986d19c691ba4dea95040be5bc5aa34a8d1b2` then passed the complete repository suite and DCO.

No temporary Sprint 8.4 workflow, generated TypeScript build-info file, or incremental build-cache setting remains in the candidate.

## Evidence limits

Workstream 8.4 does not establish:

- the Seven Laws, How It Works, consumer-first, interoperability, or Aster/AI pages owned by 8.5;
- the Trust Center or Open Forge pages owned by 8.6;
- the roadmap, support, or canonical funding-transparency pages owned by 8.7;
- final signup disposition owned by 8.8;
- representative accessibility or affected-user review;
- accessibility certification;
- route-level performance budgets or release measurements;
- preview deployment, official production cutover, or deployed-header verification; or
- any account, private Chronicle, production Aster, provider, connector, clinical, research, financial, governance, or gameplay capability.

## Handoff

Workstream 8.5 may now implement the Seven Laws, How It Works, provider-respectful consumer-first and interoperability explanation, and Aster/AI page while preserving:

- the homepage and dedicated Promise route;
- frozen content authority and canonical source links;
- explicit live, experimental, planned, and long-horizon status distinctions;
- direct and narrative navigation parity;
- server-rendered essential information;
- accessibility and resilience foundations;
- paused signup;
- provider independence and Aster non-authority; and
- every permanent Sprint 8 non-scope boundary.
