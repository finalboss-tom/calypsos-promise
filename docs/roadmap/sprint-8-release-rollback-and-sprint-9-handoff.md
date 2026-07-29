# Sprint 8 Release, Rollback, and Sprint 9 Handoff

[Current status](current-status.md) · [Sprint 8 execution plan](sprint-8-execution-plan.md) · [Completion record](sprint-8-completion-record.md) · [Cross-contract reconciliation](../architecture/public-site-sprint-8-cross-contract-reconciliation.md) · [Control and evidence map](../architecture/public-site-sprint-8-control-and-evidence-map.md) · [Holdpoints and unresolved work](../architecture/public-site-sprint-8-specialist-holdpoint-and-unresolved-work-register.md) · [Sprint sequence](sprints.md)

- **Status:** READY FOR FOUNDING-STEWARD ACCEPTANCE — no hosted preview, production cutover, or official release is authorized by this record
- **Tracking issue:** [#60](https://github.com/finalboss-tom/calypsos-promise/issues/60)
- **Draft pull request:** [#61](https://github.com/finalboss-tom/calypsos-promise/pull/61)
- **Entry baseline:** `9da8034220954a1ca50420e71fd94e7795232a35`
- **Validated pre-completion head:** `0f8d6a03fda48608a2eecf9e95c4639650951d48`
- **Email-signup Phase 0 gate:** [#63](https://github.com/finalboss-tom/calypsos-promise/issues/63)
- **Next numbered sprint:** Sprint 9 — Public synthetic prologue, only after Sprint 8 acceptance, squash merge, and post-merge reconciliation

## Actual release state

At this record’s revision:

- the Sprint 8 implementation exists only on `agent/sprint-8-public-website-foundation` and draft PR #61;
- the site has passed production build and isolated local production-preview validation;
- the permanent `site-release-validation` CI job emits machine-readable route, header, metadata, resource, contrast, signup, and transfer evidence;
- Git-triggered Vercel deployment remains disabled;
- no official preview deployment is identified or verified;
- no production cutover is identified or verified;
- no hosted DNS, TLS, CDN, cache, CSP, header, redirect, monitoring, incident, or field-performance evidence is claimed;
- no email signup, account, private data, provider, connector, transaction, or gameplay capability is active; and
- PR merge, deployment, domain aliasing, public announcement, and official release remain distinct attributable decisions.

The truthful release classification is:

> **Repository implementation ready for founding-steward acceptance, with isolated local-preview evidence; not hosted or officially released.**

## Merge and release separation

Squash merging PR #61, if explicitly accepted, would:

- place the accepted Sprint 8 repository implementation on `main`;
- close the branch-level implementation phase;
- establish the completion package as the current repository record; and
- permit a separately authorized post-merge reconciliation and release decision.

Squash merging would not by itself:

- enable Git-triggered deployment;
- create or promote a hosted preview;
- change DNS, domains, aliases, certificates, or CDN behavior;
- activate email collection;
- create accounts or private data;
- close issue #63 or institutional Phase 0;
- establish independent accessibility or security review;
- start Sprint 9; or
- constitute an official public release announcement.

## Permitted release paths after acceptance and merge

### Path 1 — Merge with deployment still disabled

This is the lowest-risk default.

Required record:

- accepted squash commit;
- post-merge repository reconciliation;
- current-status update stating `main` contains Sprint 8 but no hosted cutover occurred; and
- decision on whether a later preview is useful.

### Path 2 — Separately authorized hosted preview

A hosted preview may be created only through an attributable release decision naming:

- deployment provider and project;
- preview environment and URL;
- owner and access authority;
- configuration and secret inventory;
- branch or commit deployed;
- expiry or teardown behavior;
- header, route, cache, metadata, accessibility, and performance verification;
- issue #63 and signup state;
- public claim language; and
- rollback owner and procedure.

A preview remains experimental evidence. It is not production, independent certification, or public launch.

### Path 3 — Separately authorized official production cutover

An official cutover requires all hosted-preview evidence plus:

- explicit production environment and domain authorization;
- current DNS, TLS, CDN, cache, and security-header verification;
- release provenance and rollback exercise;
- operational ownership and incident route;
- public status and correction route;
- accessibility and performance limitations;
- signup state matching public copy;
- no unexpected private data or third-party runtime resources; and
- an attributable official-release decision.

This record does not select Path 2 or Path 3.

## Rollback model

### Before merge

- Keep PR #61 draft or close it without merging.
- `main` remains at the accepted pre-Sprint 8 baseline.
- No deployment or data rollback is required.

### After merge but before hosted release

- Keep deployment disabled.
- Revert the Sprint 8 squash commit if the accepted repository state must be restored, or use a reviewed fix-forward change when narrower and safer.
- Preserve the completion and incident evidence explaining the disposition.
- No database or signup migration exists to reverse.

### Hosted preview rollback

- Remove the preview alias or deployment through the deployment provider’s attributable controls.
- Restore the prior accepted preview deployment when one exists, or leave no preview.
- Verify the preview URL no longer serves the rejected candidate.
- Preserve public-safe evidence and privately route any protected incident material.

### Official cutover rollback

- Repoint the production alias or domain to the last accepted deployment.
- Verify DNS, TLS, headers, routes, cache, metadata, and assets after rollback.
- Keep `/api/join` paused unless a separately accepted issue #63 disposition has changed it.
- Publish a reviewed correction when visitors were materially affected.
- Record residual obligations and revalidation conditions.

### Data and transaction rollback

Sprint 8 introduces no runtime database, active email collection, account store, payment system, provider connection, private Chronicle, or production transaction. Therefore the accepted rollback model has no Sprint 8 data migration, financial reconciliation, or private-record restoration step.

If any such capability is added later, this rollback model becomes insufficient and must be superseded before activation.

## Sprint 9 entry rule

Sprint 9 may begin only after:

1. explicit founding-steward acceptance of Sprint 8;
2. squash merge of PR #61;
3. issue #60 closure as completed;
4. confirmation that the accepted squash commit and current repository status agree;
5. a post-merge reconciliation confirming no unexpected deployment or private capability was activated; and
6. a dedicated pre-Sprint 9 alignment review.

Sprint 9 may proceed without resolving every institutional Phase 0 gate, but it inherits gate #63 and every applicable production, specialist, accessibility, security, privacy, provider, funding, and institutional limitation.

## Sprint 9 accepted goal

> Let anyone understand the product through play before creating an account.

Sprint 9 is bounded to the public synthetic prologue.

## Sprint 9 inherited deliverables

The accepted deliverables remain:

- an opening cinematic or illustrated sequence;
- Lantern Shore scene;
- Aster introduction;
- synthetic Chronicle;
- synthetic voice or text capture draft;
- player confirmation;
- First Lantern completion;
- synthetic House of Keys receipt demonstration; and
- exit and account-conversion choices.

## Sprint 9 inherited acceptance criteria

- No real health data or account is required.
- Temporary data behavior is disclosed.
- A visitor can complete the prologue in under ten minutes.
- Refusal and exit paths are fully functional.

## Sprint 9 mandatory inherited boundaries

### Public and synthetic only

- Use explicitly synthetic records, identities, observations, receipts, and fixtures.
- Do not accept or infer real health, genetic, wearable, location, account, contact, or provider data.
- Do not reuse the paused email signup as prologue identity or account conversion.

### No account required

- The complete prologue must work without authentication, account creation, email, provider, or enterprise enrollment.
- Account conversion remains an optional future boundary and may not retain temporary data silently.

### Temporary data

- Name every temporary data class.
- State whether it exists only in memory, browser storage, test fixtures, or logs.
- Define session lifetime, reset, discard, exit, restart, and teardown.
- Do not send temporary data to a model, analytics provider, remote service, or private destination without a separately accepted decision and review.

### Aster

- Preserve proposal, confirmation, validation, and storage separation.
- Aster may introduce, draft, clarify, and explain.
- Aster cannot confirm itself, create real Chronicle truth, grant permission, complete gameplay without deterministic evidence, or require a production model provider.
- A complete manual or deterministic fallback path remains required.

### Synthetic Chronicle

- Remain visibly synthetic, temporary, non-production, and non-authoritative.
- Preserve provenance, correction, conflict, and discard semantics appropriate to the demonstration.
- Do not imply a real private Chronicle exists.

### First Lantern and incentives

- Completion must be deterministic and tied to explicit synthetic prologue state.
- No health claim, real-world behavior, email submission, payment, provider selection, or data disclosure may create completion or rewards.
- Sprint 9 does not establish the universal game shell or durable private progression.

### House of Keys receipt demonstration

- The receipt must be synthetic and clearly labeled.
- It cannot create real identity, recipient, purpose, grant, permission, audit, legal consent, or production access.
- The demonstration must explain that real permission evaluation belongs to later separately authorized systems.

### Refusal and exit

- Refuse capture, skip optional narration, restart, discard temporary state, leave, and complete without account creation.
- Refusal must not cause punishment, shame, loss of core explanation, or coerced conversion.

### Accessibility and performance

- Inherit direct access, visible focus, semantic structure, reduced motion, reduced data, forced colors, contrast, image failure, and zero-account comprehension.
- Add playable keyboard, screen-reader, timing, dialogue, capture, confirmation, receipt, refusal, exit, and error-state evidence appropriate to the prologue.
- Static Sprint 8 page validation cannot be reused as proof that playable Sprint 9 interaction is accessible.

### Security and publication

- Preserve public-safe errors and no-secret development.
- Do not add production credentials, private logs, providers, remote models, arbitrary file access, shell, repository mutation, or protected information.
- Keep any voice or text draft synthetic and bounded.

### Funding and providers

- Funding cannot purchase prologue placement, progression, provider preference, source authority, Aster behavior, findings, roadmap priority, or account-conversion pressure.
- No provider, EHR, connector, clinical, enterprise, sponsor, or payment capability becomes live through the prologue.

## Sprint 9 non-scope inherited from Sprint 8

Sprint 9 does not automatically authorize:

- the Sprint 10 universal browser, iOS, and Android game shell;
- production authentication or accounts;
- private Living Chronicles;
- production Aster or model-provider egress;
- real voice or health-data capture;
- providers, EHRs, connectors, clinical workflows, or research enrollment;
- donations, payments, financial operations, or sponsor placement;
- private MCP or remote Forge;
- production analytics or behavioral profiling; or
- official production-health-data operation.

## Required pre-Sprint 9 review questions

Before implementation begins, the pre-Sprint 9 alignment review must resolve at least:

- application and route ownership for the prologue;
- whether the prologue remains inside `apps/site` or has earned a new application boundary;
- exact temporary-data classes and lifecycle;
- synthetic voice and text behavior without private input;
- deterministic state and completion model;
- Aster adapter and non-AI fallback;
- synthetic Chronicle and receipt schemas;
- refusal, exit, restart, and account-conversion boundaries;
- accessibility and performance acceptance evidence;
- browser storage, logs, errors, and teardown;
- content authority, canon, and rollback;
- security and publication review;
- issue and PR structure; and
- validation and completion evidence.

## Handoff conclusion

Sprint 8 provides an honest public gateway and the controls needed to keep Sprint 9 bounded.

It does not provide playable evidence. Sprint 9 remains planned and not started until the explicit Sprint 8 acceptance, squash merge, post-merge reconciliation, and pre-Sprint 9 alignment review occur.