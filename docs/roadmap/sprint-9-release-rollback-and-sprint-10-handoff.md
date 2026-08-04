# Sprint 9 Release, Rollback, and Sprint 10 Handoff

[Current status](current-status.md) · [Sprint 9 execution plan](sprint-9-execution-plan.md) · [Completion record](sprint-9-completion-record.md) · [Cross-contract reconciliation](../architecture/public-synthetic-prologue-sprint-9-cross-contract-reconciliation.md) · [Control and evidence map](../architecture/public-synthetic-prologue-sprint-9-control-and-evidence-map.md) · [Holdpoints and unresolved work](../architecture/public-synthetic-prologue-sprint-9-specialist-holdpoint-and-unresolved-work-register.md) · [Sprint sequence](sprints.md)

- **Status:** READY FOR FOUNDING-STEWARD ACCEPTANCE — protected-preview evidence exists; no production cutover, public link, indexing, official release, or Sprint 10 start is authorized by this record
- **Tracking issue:** [#67](https://github.com/finalboss-tom/calypsos-promise/issues/67)
- **Draft pull request:** [#68](https://github.com/finalboss-tom/calypsos-promise/pull/68)
- **Entry baseline:** `main` at `722f44d8ddcfe2692eb833ce6e879b5b2dc3b7e0`
- **Validated pre-completion head:** `3d7c02f303e052c07fb023ff39673a15c1d62349` — CI 1286 / DCO 1371
- **Protected preview:** `dpl_DwkovAeCrLjWq2brifBxYXu2UJ7M` from `66979c71732f0bc343000fe143485d06e0bc7fec`
- **Production deployment:** `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp` from `1b25a2e64ff272927c65afa5e1f16aedc5e448d7`
- **Next numbered sprint:** Sprint 10 — Universal game shell, only after Sprint 9 acceptance, squash merge, issue closure, preview disposition, post-merge reconciliation, and a dedicated alignment review

## Actual release state

At this record’s revision:

- the complete Sprint 9 implementation exists on `agent/sprint-9-public-synthetic-prologue` and draft PR #68;
- `/prologue` is `noindex`, absent from public navigation and the sitemap, unmerged, and absent from the production domain;
- the route passed production build, isolated local preview, rendered click and native-keyboard journeys, storage/network denial, accessibility-mode checks, duration gates, and performance ceilings;
- workstream 9.9 created one Vercel-auth-protected non-production preview bound to exact commit `66979c71732f0bc343000fe143485d06e0bc7fec`;
- the protected preview reached `READY` at deployment `dpl_DwkovAeCrLjWq2brifBxYXu2UJ7M`;
- production remained `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp` from `1b25a2e64ff272927c65afa5e1f16aedc5e448d7`;
- Git-triggered Vercel deployment remains disabled for every branch;
- no account, authentication, private Chronicle, production House of Keys, production Aster, real voice, provider, connector, analytics, payment, research, or health-data capability is active through Sprint 9; and
- PR merge, preview retention, public linking, indexing, production deployment, announcement, Sprint 9 acceptance, Phase 0 exit, and Sprint 10 start remain distinct attributable decisions.

The truthful release classification is:

> **Repository implementation ready for founding-steward acceptance, with isolated and protected-preview evidence; not publicly linked, indexed, deployed to production, or officially released.**

## Merge and release separation

Squash merging PR #68, if explicitly accepted, would:

- place the accepted Sprint 9 repository implementation and completion package on `main`;
- close the branch-level implementation phase;
- establish the bounded public synthetic prologue as accepted repository capability;
- permit issue #67 closure after verification; and
- permit a separately authorized post-merge reconciliation, preview disposition, and public-release decision.

Squash merging would not by itself:

- enable Git-triggered deployment;
- move the production alias;
- add `/prologue` to production navigation or the sitemap;
- remove `noindex`;
- publish or expose a preview URL;
- create an account or authentication flow;
- retain temporary state;
- activate private Chronicles, House of Keys, production Aster, real voice, providers, connectors, analytics, payments, research, or production health data;
- close issue #63 or institutional Phase 0;
- establish independent accessibility, security, privacy, legal, or affected-user review;
- start Sprint 10; or
- constitute an official public release announcement.

## Permitted post-acceptance release paths

### Path 1 — Merge with deployment still disabled

This is the lowest-risk default.

Required record:

- accepted squash commit;
- issue #67 closure after merge verification;
- post-merge repository reconciliation;
- current-status update stating `main` contains Sprint 9 but `/prologue` is not publicly linked or deployed to production;
- decision on protected-preview retention or teardown; and
- decision on whether a later public preview or production release is useful.

### Path 2 — Retain or replace the protected preview

A protected preview may remain or be replaced only through an attributable decision naming:

- deployment provider and project;
- exact source commit;
- preview URL or alias;
- owner and access authority;
- protection and indexing behavior;
- configuration and secret inventory;
- retention, expiry, or teardown behavior;
- route, header, cache, metadata, accessibility, duration, and performance verification;
- public claim language;
- issue #63 and newsletter state;
- correction route; and
- rollback owner and procedure.

A protected preview remains maintainer evidence. It is not production, independent certification, or public launch.

### Path 3 — Separately authorized public preview

A public preview requires all protected-preview evidence plus:

- explicit public-access decision;
- public-safe canonical source links;
- noindex or indexing decision;
- public navigation and discovery decision;
- security, privacy, accessibility, communications, and legal review proportionate to the claims;
- affected-user and platform limitations;
- operational owner and incident route;
- abuse, monitoring, and correction expectations;
- rollback exercise; and
- public status that cannot be confused with production health-data operation.

### Path 4 — Separately authorized production cutover

An official production cutover requires all public-preview evidence plus:

- explicit production environment and domain authorization;
- current DNS, TLS, CDN, cache, application-header, and CSP verification;
- production release provenance and rollback exercise;
- operational ownership, monitoring, incident, and correction routes;
- production accessibility and performance limitations;
- newsletter state matching public copy;
- confirmation of no unexpected private data or third-party runtime resource;
- capability status update; and
- an attributable official-release decision.

This record selects none of Paths 2–4.

## Rollback model

### Before merge

- Keep PR #68 draft or close it without merging.
- Move the branch to the accepted 9.9 baseline or another reviewed candidate if the completion package is rejected.
- Production remains unchanged.
- No user-data, account, financial, or permission rollback is required.

### After merge but before public release

- Keep Git-triggered deployment disabled.
- Revert the Sprint 9 squash commit if the accepted repository state must be restored, or use a reviewed fix-forward change when narrower and safer.
- Preserve completion and incident evidence explaining the disposition.
- Remove or retain the protected preview according to an attributable decision.
- No database or private-data migration exists to reverse.

### Protected-preview rollback

- Remove the preview alias or deployment through the Vercel control plane after authorization.
- Verify the preview hostname or alias no longer serves the rejected candidate.
- Preserve public-safe provenance and privately route protected incident material.
- Confirm production aliases remain on `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp`.

### Public-preview rollback

- Remove public discovery and the preview alias.
- Restore protection or remove the deployment.
- Verify no public navigation, sitemap, indexing, or cached announcement continues to expose the rejected candidate.
- Publish a reviewed correction when visitors were materially affected.

### Production cutover rollback

- Repoint production aliases to the last accepted deployment.
- Verify DNS, TLS, application headers, CSP, routes, cache, metadata, assets, newsletter behavior, and public capability labels.
- Publish a reviewed correction when visitors were materially affected.
- Record residual obligations and revalidation conditions.

### Data and transaction rollback

Sprint 9 introduces no runtime database, account store, active prologue contact intake, payment system, provider connection, private Chronicle, real permission, production model, or durable gameplay state.

Therefore the accepted rollback model has no Sprint 9 user-record migration, financial reconciliation, permission revocation, model-memory deletion, or private-state restoration step.

If any such capability is later introduced, this rollback model becomes insufficient and must be superseded before activation.

## Sprint 10 entry rule

Sprint 10 may begin only after:

1. explicit founding-steward acceptance of Sprint 9;
2. directed squash merge of PR #68;
3. issue #67 closure as completed after the merge is verified;
4. confirmation that the accepted squash commit and current repository status agree;
5. an attributable protected-preview retention or teardown decision;
6. a post-merge reconciliation confirming no unexpected deployment, public link, indexing, or private capability was activated; and
7. a dedicated pre-Sprint 10 alignment review satisfying `HLD-S9-024`.

Sprint 10 may proceed without resolving every institutional Phase 0 gate, but it inherits issue #63 and every applicable production, specialist, accessibility, security, privacy, provider, funding, ownership, and institutional limitation.

## Sprint 10 accepted goal

> Establish the browser, iOS, and Android playable application.

Sprint 10 is bounded to the universal game shell. It is not the Sprint 11 private value loop.

## Sprint 10 inherited deliverables

The roadmap deliverables remain:

- Expo application;
- island map navigation;
- Hearth;
- zone and scene renderer;
- dialogue choices;
- quest cards;
- Wayfinder Orb;
- accessibility settings;
- offline state strategy; and
- authentication boundary after the prologue.

## Sprint 10 inherited acceptance criteria

- One content package renders consistently on web, iOS, and Android.
- Keyboard, screen-reader, reduced-motion, and low-bandwidth paths exist.
- No gameplay rule depends on client-side trust.

## Sprint 10 mandatory inherited boundaries

### Dedicated alignment and earned application boundaries

- Run a separate pre-Sprint 10 alignment review before implementation.
- Decide whether to create a new Expo application, a shared content package, or both.
- Do not duplicate website authority or extract generic packages without an earned current consumer, distinct responsibility, tests, ownership, operability, and rollback.
- Preserve `apps/site` ownership of the public institutional site and bounded prologue until a reviewed migration says otherwise.

### One content package without one unbounded runtime

- Define a versioned content package or equivalent contract that can render consistently across browser, iOS, and Android.
- Keep content, presentation, deterministic game rules, authoritative state, platform adapters, and operational services separable.
- A shared package may express content and validated contracts; it may not become a hidden second domain authority.

### No client-side trust

- Define the authoritative gameplay and quest-evidence boundary before rewards, progression, or private state exist.
- Client rendering, cached state, offline state, device time, animations, optimistic UI, and local storage cannot independently create authoritative completion, rewards, permission, health results, or canonical progression.
- Invalid and conflicting state must fail closed or enter an explicit reconciliation path.

### Browser, iOS, and Android parity

- Define supported platform and version ranges.
- Preserve the same essential content, choices, refusal, correction, exit, and authority across platforms.
- Platform-specific affordances may improve presentation but cannot create exclusive rights, evidence, progression, or conversion.

### Accessibility settings and direct paths

- Provide keyboard and screen-reader paths on supported platforms.
- Preserve reduced motion, low-bandwidth behavior, visible focus where applicable, text scaling, contrast, touch target, orientation, and input-method needs.
- Settings must be available without completing gameplay or creating an account where technically feasible.
- No story animation, Aster, sound, haptic, or gesture may be required for essential comprehension.

### Offline state strategy

- Name which content and state may exist offline, where it is stored, how long it lives, how it is encrypted where applicable, how it is cleared, and how conflicts are reconciled.
- Distinguish public cached content, temporary local game state, authenticated state, authoritative domain state, and protected private data.
- Offline state cannot silently become authoritative or bypass revocation, correction, permission, or deletion.

### Authentication boundary after the prologue

- Keep the public prologue completable without authentication.
- Define when authentication is offered, what value it enables, what state may transfer, what is discarded, and what consent or disclosure is required.
- Do not silently retain public prologue state into an account.
- Account creation, recovery, session, support, deletion, abuse, and incident behavior require separate security, privacy, accessibility, and operations review.

### Data and privacy non-scope

- Sprint 10 may establish shell and authentication boundaries but does not automatically authorize private Chronicle storage, production House of Keys, real voice or health capture, model-provider egress, providers, connectors, clinical workflows, research enrollment, analytics, payments, or production health-data operation.
- Use public or explicitly synthetic content and state until later accepted work earns private capability.

### Aster and manual parity

- If Aster framing appears in the universal shell, preserve the complete manual path and deterministic authority.
- Do not select a production model provider or require AI to render content, navigate, complete a quest, access settings, refuse, exit, or recover.
- Aster cannot create authoritative state, permission, rewards, or progression.

### Security and platform supply chain

- Define Expo, React Native, web, iOS, Android, native module, signing, store, update, deep-link, storage, and dependency ownership.
- Record secrets, build provenance, environment separation, release channels, update rollback, compromised-client assumptions, and platform-specific abuse cases.
- Do not place production credentials or private data in client bundles.

### Validation and evidence

- Test the same content package across web, iOS, and Android.
- Add deterministic rule tests independent of UI.
- Add platform interaction, accessibility, offline, authentication-boundary, failure, recovery, update, and rollback evidence.
- Keep repository, emulator/simulator, device, hosted preview, production, field, and independent-review evidence classes distinct.

### Funding, providers, and distribution

- Funding, app-store relationships, distribution, device vendors, providers, sponsors, or enterprise opportunities cannot purchase platform priority, progression, ranking, source authority, Aster behavior, findings, or player coercion.
- Preserve provider replaceability and exit plans for infrastructure dependencies.

## Sprint 10 non-scope inherited from Sprint 9

Sprint 10 does not automatically authorize:

- the Sprint 11 private Living Chronicle and complete private value loop;
- production House of Keys permission evaluation;
- real voice, free-form health, genetic, wearable, location, provider, or clinical data;
- production Aster, model-provider memory, retrieval, tools, or private-data egress;
- providers, EHRs, connectors, research enrollment, or clinical workflows;
- analytics, behavioral profiling, advertising, payments, donations, or sponsor placement;
- authoritative rewards or progression based only on client state;
- remote Forge or private MCP;
- official production-health-data operation; or
- institutional Phase 0 completion.

## Required pre-Sprint 10 review questions

Before implementation begins, the pre-Sprint 10 alignment review must resolve at least:

- application, package, and deployment ownership;
- whether Expo is earned now and how browser rendering is supported;
- one-content-package schema, versioning, migration, and rollback;
- zone, scene, dialogue, quest-card, Hearth, map, and Wayfinder Orb ownership;
- deterministic rule and authoritative-state boundaries;
- offline data classes, storage, encryption, lifecycle, sync, conflict, and deletion;
- authentication timing, state transfer, recovery, support, deletion, and incident boundaries;
- public, synthetic, temporary, authenticated, authoritative, and private data classes;
- web, iOS, and Android platform/version support;
- keyboard, screen-reader, scaling, reduced-motion, low-bandwidth, touch, orientation, and input-method evidence;
- Aster presentation and complete manual fallback;
- client compromise, secrets, signing, stores, updates, deep links, dependencies, and supply-chain threats;
- release channels, preview, production, monitoring, rollback, and correction ownership;
- analytics and telemetry default;
- funding, provider, distribution, and app-store influence boundaries;
- issue and PR structure;
- validation and completion evidence; and
- exact Sprint 11 non-scope.

## Handoff conclusion

Sprint 9 provides a bounded, no-account, public synthetic explanation-through-play experience and the evidence required to keep the universal shell honest.

It does not provide the universal browser, iOS, and Android application. Sprint 10 remains planned and not started until Sprint 9 acceptance, squash merge, issue closure, preview disposition, post-merge reconciliation, and the dedicated alignment review occur.
