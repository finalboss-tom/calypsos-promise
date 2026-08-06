# Sprint 10.9 — Build, release, rollback, and operations evidence

- **Status:** COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10
- **Parent:** Sprint 10 — universal game shell
- **Tracker:** issue #80
- **Implementation:** draft PR #79

## Decision

Establish reproducible-input and artifact-provenance evidence, release decision gates, provider replacement, public/synthetic incident ownership, rollback, and generated-state cleanup without creating a release pipeline or authorizing deployment.

## Build provenance

The universal application continues to export browser, iOS, and Android bundles without credentials. CI now writes and validates a temporary versioned manifest containing:

- exact source revision;
- lockfile SHA-256;
- pinned Node, pnpm, Expo, Expo Router, React Native, React, and game-content versions;
- exact export command and platform set;
- sorted artifact paths;
- artifact byte sizes; and
- artifact SHA-256 digests.

The manifest classifies the output as repository/CI unsigned evidence. It explicitly records that no credentials were used and that signing, distribution, preview, production, and release authority remain false. Generated artifacts and the manifest are removed after validation.

This establishes inspectable rebuild inputs and artifact identity for the named environment. It does not claim byte-for-byte reproducibility across independent hosts.

## Preview and production decisions

No hosted game preview is authorized or active. A future hosted preview requires an attributable record naming:

- exact source revision;
- provider and project;
- access state;
- indexing and discovery behavior;
- configuration and secret inventory;
- runtime limitations;
- data classes;
- monitoring and incident ownership;
- expiry or teardown behavior; and
- rollback.

Merge, hosted preview, browser deployment, canonical-domain routing, public navigation, indexing, signing, store submission, store approval, public beta, over-the-air update, official release, account activation, private capability, and Longitudinal Intelligence activation remain separate closed gates.

## Signing and distribution

Sprint 10.9 configures no EAS project, Apple signing, Google signing, store credentials, store listing, update channel, public beta, or official mobile release.

Unsigned local and CI exports are build evidence, not distributable release artifacts. Credentials and signing material remain outside repository source and require separately reviewed ownership, rotation, revocation, compromise response, and rollback before use.

## Provider replacement

Expo, EAS, Apple, Google, Vercel, package registries, build services, and monitoring services remain adapters.

Repository source, the versioned public/synthetic content package, deterministic rules, authority contracts, exact dependency versions, manual local export, and public-safe evidence remain the portable center. Provider failure cannot grant product authority or silently activate a replacement.

## Monitoring and incident ownership

Current ownership covers repository source and CI evidence for the public/synthetic shell only. Each future preview, production, store, or update decision must name its operational and incident owner.

The current incident classes cover public/synthetic content errors, unexpected discovery, provenance mismatch, unexpected network or secret dependencies, accessibility regressions, offline-state failures, and provider outages affecting an authorized public surface.

Private health data, authentication, payments, clinical workflows, research records, personal inference, production House of Keys, and production Aster/model incidents remain out of scope until those capabilities exist and receive separate operations plans.

Protected logs, credentials, private provider records, and sensitive incident evidence do not belong in the public repository.

## Rollback

The currently active rollback path is repository-only: keep PR #79 draft, close it without merge, or revert/fix forward through ordinary reviewed changes while preserving the last accepted `main` revision.

Future preview, production-browser, and mobile-distribution rollback scenarios are defined but inactive. They require removal or restoration of discovery and aliases, exact source verification, provider-neutral evidence, correction when people were materially affected, and explicit platform limitations.

No private-data, account, payment, permission, model-memory, or durable-gameplay migration exists to reverse in Sprint 10.

## Generated-state cleanup

`.expo`, `dist`, generated `android`, and generated `ios` directories are temporary validation state and are removed after build evidence is validated. Native projects, credentials, signing material, deployment output, and build artifacts remain untracked.

CI verifies no tracked build mutation after cleanup.

## Residual limitations

Sprint 10.9 is maintainer repository, CI, unsigned-export, and operations-contract evidence. It is not:

- independent release-engineering certification;
- byte-for-byte multi-host reproducibility evidence;
- emulator, simulator, physical-device, store, signing, or update qualification;
- hosted-preview or production readiness;
- a monitoring service, service-level objective, or on-call program;
- independent security, privacy, accessibility, legal, incident-response, or affected-user evidence; or
- authorization to merge, deploy, distribute, release, begin Sprint 11, activate LI-V1 through LI-V8, or exit institutional Phase 0.

## Validation target

The exact implementation checkpoint must pass focused operations and build-evidence tests, the complete permanent repository suite, real browser/iOS/Android unsigned export, source-bound build-manifest generation and validation, existing production-site validation, generated-state cleanup, no tracked mutation, and DCO.

## Validated checkpoint

Exact clean implementation checkpoint: `7ef342452d3561151203605a1d6401133d28c86d`

- CI 1496: success
- DCO 1600: success
- focused build, release, rollback, and operations validation: success
- exact source, lockfile, pinned-toolchain, platform-set, sorted-artifact, byte-size, and SHA-256 provenance checks: success
- real credential-free browser, iOS, and Android export: success
- source-bound unsigned build evidence for 76 exported artifacts: success
- unsigned, credentials-unused, preview-unauthorized, distribution-unauthorized, and release-unauthorized assertions: success
- hosted-preview decision fields and no-active-preview boundary: success
- merge, deployment, routing, navigation, indexing, signing, store, update, beta, release, account, private-capability, and Longitudinal Intelligence gates remain false: success
- seven provider-adapter replacement and manual-fallback contracts: success
- public/synthetic incident ownership and protected-evidence separation: success
- repository, hosted-preview, browser-production, and mobile-distribution rollback contracts: success
- complete permanent repository suite: success
- existing production-site and rendered-prologue validation: success
- generated-state cleanup and no tracked build mutation: success
- temporary implementation and repair transport: removed before clean checkpoint validation

This is maintainer repository, CI, unsigned-export, artifact-provenance, and operations-contract evidence inside active Sprint 10. It is not multi-host byte-for-byte reproducibility evidence, a hosted preview, production deployment, signing or store qualification, an update channel, a monitoring service, independent release-engineering, security, privacy, accessibility, legal, incident-response, device, or affected-user certification, a release authorization, Sprint 11 authorization, activation of LI-V1 through LI-V8, or institutional Phase 0 exit.

## Sprint-level gate

This workstream is an internal Sprint 10 checkpoint in the single draft PR #79. It creates no separate founding-steward acceptance or merge gate. After exact validation and reconciliation, the next implementation step is Sprint 10.10 on the same branch and PR.
