# Sprint 8.5 Record — Laws, Experience, Interoperability, and Aster

[Current status](current-status.md) · [Sprint 8 plan](sprint-8-execution-plan.md) · [Workstream 8.4 record](sprint-8-workstream-8-4-record.md) · [Website architecture](../architecture/public-website-foundation-and-migration.md) · [Site README](../../apps/site/README.md) · [Issue #60](https://github.com/finalboss-tom/calypsos-promise/issues/60) · [Draft PR #61](https://github.com/finalboss-tom/calypsos-promise/pull/61)

- **Status:** VALIDATED IMPLEMENTATION
- **Entry baseline:** Sprint 8.4 validated head `c54c377ad072f745772ccf3bbbcdabf1b8193cc3`
- **Focused validated candidate:** `16fe324c508719734b8923a8f99b59fb16712726`
- **Application owner:** `apps/site`
- **Rendering boundary:** server-rendered essential information; no client component required
- **Information boundary:** public repository records and explicitly synthetic examples only
- **Deployment state:** Git-triggered Vercel deployment remains disabled
- **Signup state:** paused with no intake or forwarding

## Result

Workstream 8.5 adds four source-backed public guide routes:

- `/laws` — the frozen Seven Laws of Ogygia;
- `/how-it-works` — the planned short-session, player-confirmed, non-punitive product experience;
- `/consumer-first` — the provider-respectful consumer-first and interoperability boundary; and
- `/aster` — Aster’s proposal, confirmation, source, uncertainty, memory, fallback, and non-authority contracts.

All four routes are server-rendered, carry route metadata and canonical URLs, appear in the sitemap, and are reachable through both conventional direct navigation and the optional Ogygia narrative path.

## Seven Laws

The `/laws` route presents the exact frozen law names and statements:

1. The Law of the Open Hand
2. The Right of the Key
3. The Sanctity of the Hearth
4. The Law of the True Chronicle
5. No Oracle Above Evidence
6. The Right of Return
7. The Covenant of the Commons

The route labels the laws as live frozen public canon and links to the controlling world-and-lore record. The website may explain the laws, but it cannot amend them or create a competing canon source.

## How It Works

The `/how-it-works` route labels the experience as planned rather than playable or deployed.

It explains the accepted three-to-eight-minute daily route:

1. Arrival
2. Wayfinder route
3. Capture or action
4. Confirmation
5. Feedback
6. Departure

It preserves:

- replacement, deferral, and refusal without punishment;
- a clear stopping point;
- deterministic authority over eligibility, permission, completion, rewards, unlocks, safety gates, story order, and canon;
- AI-assisted drafting, clarification, explanation, route presentation, source-linked recall, and approved dialogue only;
- no broken-streak punishment; and
- manual capture, structured recall, permission review, correction, export, deletion, and ordinary play without AI.

## Consumer-first and interoperability boundary

The `/consumer-first` route explicitly presents both sides of the accepted decision:

- providers, clinicians, EHRs, payers, laboratories, pharmacies, devices, standards, and health systems can be valuable sources, destinations, collaborators, and partners; and
- none becomes the automatic owner of the complete longitudinal product experience or the authority over Chronicle meaning.

The route preserves the durable rule:

> Calypso’s Promise will interoperate with institutional healthcare without being architected around institutional healthcare.

It explains:

- the person as the durable continuity layer;
- standards at the edges and provider-independent meaning at the core;
- source, evidence-class, version, provenance, conflict, mapping, and uncertainty preservation;
- separate authority for personal exchange, care collaboration, institutional workflow, and research or public benefit; and
- partnership without schema, source-rank, connector, roadmap, endorsement, or governance capture.

The page explicitly states that no production provider, EHR, connector, clinical workflow, decision-support, or enterprise capability is live.

## Aster and AI boundary

The `/aster` route presents accepted pre-stable public contracts as experimental evidence and production AI as planned.

It preserves the governing transaction:

> AI proposes. The player confirms. The domain service validates and stores.

The route explains five bounded roles:

- Scribe;
- Librarian;
- Wayfinder;
- Interpreter; and
- Storykeeper.

Every role prepares proposals, recall, explanation, navigation, or presentation for review. No role can create Chronicle truth, permission, confirmation, completion, progression, rewards, diagnosis, clinical authority, provider approval, or institutional authority.

The route also preserves:

- exact proposal revision and player confirmation;
- exact source-linked person-specific statements;
- clarification or refusal for unknown, conflicting, unsupported, or consequentially ambiguous intent;
- untrusted-input isolation;
- player-controlled memory classes;
- visible uncertainty and source limitations;
- provider-neutral fallback; and
- manual capture, structured recall, permission review, correction, export, deletion, and ordinary play without AI.

It explicitly states that no production model, provider, private-data egress, memory, retrieval, queue, scheduler, workflow, or tool runtime is live.

## Navigation, metadata, and presentation

Workstream 8.5 adds all four routes to:

- direct navigation;
- narrative navigation;
- route metadata and canonical URLs; and
- the public sitemap.

The shared guide styles preserve:

- responsive layouts;
- server-rendered essential information;
- visible focus and native keyboard behavior inherited from 8.3;
- reduced-motion behavior inherited from the global shell;
- reduced-data removal of decorative gradients;
- higher-contrast borders;
- forced-colors compatibility; and
- no required animation, image, client JavaScript, account, or story traversal.

## Deterministic validation

The site validator and focused tests verify:

- all four route files and presentation-data modules;
- all Seven Laws;
- accepted daily-route and non-punitive-return language;
- deterministic and AI-assisted authority separation;
- consumer-first interoperability language and current provider limits;
- Aster’s five roles, governing transaction, fallbacks, and production limits;
- direct and narrative route parity;
- sitemap inclusion;
- source links and controlled evidence statuses;
- server-rendered surfaces without `use client`;
- accessibility and resilience media behavior;
- paused signup without intake; and
- disabled Git-triggered deployment.

The initial monorepo implementation candidate passed every substantive CI job; only formatter differences remained. During focused build validation, two source-inspection assertions proved sensitive to Prettier line wrapping. They were corrected to compare whitespace-normalized source semantics rather than contiguous formatting.

The focused validation workflow then passed:

- frozen-lockfile installation;
- repository formatting;
- production site build;
- site validator/lint;
- site typecheck;
- focused site tests;
- generated TypeScript build-state removal;
- final formatting;
- temporary workflow self-removal; and
- clean candidate commit `16fe324c508719734b8923a8f99b59fb16712726`.

No temporary validation workflow, generated `tsconfig.tsbuildinfo`, or incremental build-cache setting remains in the candidate.

## Evidence limits

Workstream 8.5 does not establish:

- a playable game or private Living Chronicle;
- production Aster, model, provider, retrieval, memory, queue, scheduler, workflow, or tools;
- production provider, EHR, payer, laboratory, pharmacy, device, connector, or enterprise integration;
- clinical workflow, decision support, diagnosis, treatment, research enrollment, or health guidance;
- standards conformance, semantic completeness, clinical safety, provider endorsement, or certification;
- representative accessibility or affected-user review;
- independent AI-safety, clinical, interoperability, privacy, security, accessibility, legal, or operational review;
- preview deployment, official production cutover, or deployed-header verification;
- final signup disposition;
- Trust Center, Open Forge, roadmap, support, or funding-transparency routes; or
- Sprint 9 gameplay.

## Handoff

Workstream 8.6 may now implement the Trust Center and Open Forge while preserving:

- frozen Product Constitution and lore authority;
- the migrated homepage and Promise;
- the Seven Laws, How It Works, consumer-first, and Aster boundaries;
- direct and narrative navigation parity;
- controlled evidence statuses and canonical source links;
- server-rendered essential information;
- provider independence, Aster non-authority, and Forge non-authority;
- accessibility and resilience foundations;
- paused signup and disabled deployment; and
- every permanent Sprint 8 non-scope boundary.

It may not claim certification, production safety, private-data capability, provider capability, clinical capability, transactions, or Sprint 9 gameplay.
