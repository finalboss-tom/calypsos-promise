# Sprint 8 Public Website Specialist Holdpoint and Unresolved-Work Register

[Architecture index](README.md) · [Cross-contract reconciliation](public-site-sprint-8-cross-contract-reconciliation.md) · [Control and evidence map](public-site-sprint-8-control-and-evidence-map.md) · [Sprint 5 holdpoints](../security/sprint-5-specialist-holdpoint-and-evidence-register.md) · [Sprint 6 holdpoints](aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md) · [Sprint 7 holdpoints](forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md) · [Completion record](../roadmap/sprint-8-completion-record.md)

- **Status:** OPEN AFTER SPRINT 8 REPOSITORY IMPLEMENTATION — no production or independent specialist holdpoint is closed by this revision
- **Validated pre-completion head:** `0f8d6a03fda48608a2eecf9e95c4639650951d48`
- **Scope:** hosted release, production operation, private information, signup, accessibility, security, privacy, performance, content, funding, provider, support, legal, institutional, and Sprint 9 gates after the bounded public website foundation
- **Information boundary:** public-safe descriptions and explicitly synthetic evidence only

## Purpose

Sprint completion does not authorize a capability or public claim whose safety, legitimacy, ownership, operational evidence, or specialist review remains unresolved. Each holdpoint names what it blocks, current evidence, accountable future roles, minimum closure evidence, and revalidation triggers.

A holdpoint or unresolved item may be narrowed, closed, superseded, or retired only through a versioned record preserving prior scope, evidence, decision authority, residual uncertainty, downstream consequences, and revalidation conditions.

## Status vocabulary

- **OPEN — RELEASE-BLOCKING:** no official hosted release or production claim may proceed.
- **OPEN — PRODUCTION-BLOCKING:** no production private information or consequential operation may use the capability.
- **OPEN — PILOT-BLOCKING:** no representative real-person or affected-user pilot may support the named claim.
- **OPEN — SPECIALIST HOLDPOINT:** qualified bounded review is required before the claim or capability advances.
- **OPEN — INSTITUTIONAL GATE:** ownership, continuity, governance, funding, legal, or administrative evidence is required.
- **OPEN — IMPLEMENTATION GATE:** repository contracts or public presentation exist, but the named runtime or operating process does not.
- **OPEN — MEASUREMENT GATE:** representative performance, accessibility, reliability, quality, safety, or operational evidence is required.
- **CURRENT REPOSITORY/LOCAL-PREVIEW FLOW:** only the bounded repository and isolated local-preview flow may continue under explicit limitations.
- **CLOSED:** every named closure requirement and residual-risk disposition is recorded. No `HLD-S8-*` holdpoint is closed in this revision.

## Release, infrastructure, and security holdpoints

### `HLD-S8-001` — Official hosted-preview and production-release authorization

- **Blocks:** official preview URL, production cutover, public release claim, and routine hosted operation.
- **Current evidence:** production build and isolated local-preview validation only; Git-triggered deployment disabled.
- **Accountable future roles:** founding steward, release owner, infrastructure owner, security owner, accessibility owner, and communications owner.
- **Closure evidence:** identified environment and domain, attributable release decision, configuration inventory, deployment provenance, environment separation, release checklist, rollback exercise, public status, monitoring expectations, and residual risk.
- **Revalidate when:** host, domain, environment, release process, deployment provider, or public claim changes.
- **Disposition:** open; release-blocking; institutional gate.

### `HLD-S8-002` — Deployed security-header, CSP, TLS, DNS, CDN, and cache verification

- **Blocks:** claims that repository security configuration is operating correctly in the hosted environment.
- **Inherited gates:** Sprint 5 production security and infrastructure holdpoints.
- **Current evidence:** source configuration and isolated local-preview response headers.
- **Accountable future roles:** security, infrastructure, DNS, CDN, release, and operations owners.
- **Closure evidence:** hosted response capture, TLS and certificate state, DNS and domain control, CDN and proxy transformations, CSP nonce behavior, cache behavior, redirect behavior, origin isolation, findings, remediation, and next review.
- **Revalidate when:** host, proxy, CDN, domain, certificate, header, CSP, cache, or route changes.
- **Disposition:** open; release-blocking; specialist holdpoint.

### `HLD-S8-003` — Independent public-site security review

- **Blocks:** independent-security, penetration-test, hardened-production, or externally reviewed claims.
- **Current evidence:** inherited threat model, source validators, secret scans, deterministic tests, and founding-steward review.
- **Accountable future roles:** independent application-security reviewer with security and release owners.
- **Closure evidence:** named reviewer and conflicts, bounded scope, dependency and configuration review, route and header sampling, abuse cases, findings, remediation, residual risk, date, and next review.
- **Revalidate when:** dependency, route, form, provider, script, deployment, private data, or public claim changes.
- **Disposition:** open; release-blocking; specialist holdpoint.

### `HLD-S8-004` — Production observability, incident response, backup, and recovery

- **Blocks:** reliable hosted-service, incident-detection, recovery-time, audit-completeness, and operational-continuity claims.
- **Current evidence:** local deterministic errors, public-safe logs, cleanup, and rollback design; no production observability.
- **Accountable future roles:** operations, reliability, security, privacy, release, and incident owners.
- **Closure evidence:** service objectives, monitoring, alerting, minimized logs, protected incident system, retention, escalation, recovery, backup where applicable, exercises, public derivative rules, and residual risk.
- **Revalidate when:** deployment, logging, provider, uptime target, incident process, storage, or backup changes.
- **Disposition:** open; production-blocking; specialist holdpoint.

### `HLD-S8-005` — Dependency and framework upgrade governance

- **Blocks:** unsupported framework operation and unreviewed major dependency changes.
- **Current evidence:** pinned Next.js `16.2.12`, React `19.2.8`, lockfile, build, source validation, tests, and budgets.
- **Accountable future roles:** site owner, dependency owner, security owner, accessibility owner, and release owner.
- **Closure evidence:** supported-version policy, advisories, upgrade ownership, compatibility evidence, migration, rollback, budget comparison, and release decision.
- **Revalidate when:** Next.js, React, Node, pnpm, image pipeline, build system, or security advisory changes.
- **Disposition:** open; institutional gate; recurring implementation gate.

## Accessibility, usability, and performance holdpoints

### `HLD-S8-006` — Independent accessibility review and conformance claim

- **Blocks:** independent accessibility approval, formal WCAG conformance, accessibility certification, and broad accessible-product claims.
- **Current evidence:** automated semantic checks, contrast calculations, resilient CSS contracts, and founding-steward representative review.
- **Accountable future roles:** independent accessibility specialist, site owner, content owner, and affected-user representatives.
- **Closure evidence:** named reviewer and conflicts, target standard and scope, page and state sample, methods, findings, remediation, exceptions, residual risk, and dated conformance statement if justified.
- **Revalidate when:** route, layout, design token, interaction, media, component library, or target standard changes.
- **Disposition:** open; release-blocking for conformance claims; specialist holdpoint.

### `HLD-S8-007` — Direct assistive-technology and affected-user validation

- **Blocks:** claims of screen-reader, switch, magnification, voice-control, cognitive-accessibility, disability-inclusive, or affected-user usability validation.
- **Current evidence:** source and rendered semantic checks only; no direct assistive-technology or affected-user sessions.
- **Accountable future roles:** accessibility owner, affected-user reviewers, research or usability owner, privacy owner, and support owner.
- **Closure evidence:** ethical and privacy-safe protocol, representative tasks, assistive technologies, browsers and devices, findings, comprehension, failure and recovery behavior, remediation, and limitations.
- **Revalidate when:** audience, content, route, interaction, device, browser, or assistive technology changes.
- **Disposition:** open; pilot-blocking; measurement gate.

### `HLD-S8-008` — Zoom, reflow, physical-device, browser, and input matrix

- **Blocks:** comprehensive responsive, mobile, cross-browser, zoom, touch, keyboard, and input-method claims.
- **Current evidence:** responsive CSS, native semantics, source checks, and one local rendering environment.
- **Accountable future roles:** accessibility, quality, frontend, device-lab, and release owners.
- **Closure evidence:** accepted matrix, zoom and reflow samples, portrait and landscape devices, keyboard, touch, pointer, browser engines, failures, remediation, and residual coverage limits.
- **Revalidate when:** CSS, breakpoints, browser support, device targets, interaction, or layout changes.
- **Disposition:** open; measurement gate.

### `HLD-S8-009` — Field performance and Core Web Vitals

- **Blocks:** production performance, Core Web Vitals, low-end-device, slow-network, CDN, and real-user performance claims.
- **Current evidence:** isolated local-preview transfer and request measurements with regression ceilings.
- **Accountable future roles:** performance, frontend, infrastructure, analytics/privacy, accessibility, and release owners.
- **Closure evidence:** privacy-reviewed measurement plan, representative devices and networks, field or controlled lab metrics, route sample, cache state, regressions, remediation, budgets, and next review.
- **Revalidate when:** framework, asset, route, hosting, CDN, analytics, font, or audience changes.
- **Disposition:** open; release-blocking for production-performance claims; measurement gate.

### `HLD-S8-010` — Content comprehension, literacy, language, and localization review

- **Blocks:** broad plain-language, health-literacy, multilingual, culturally inclusive, or internationally usable claims.
- **Current evidence:** English public copy, source links, direct navigation, and founding-steward review.
- **Accountable future roles:** content design, accessibility, health literacy, localization, affected-user, legal, and product owners.
- **Closure evidence:** audience and reading-level goals, terminology review, comprehension testing, localization strategy, translation governance, correction process, and limitations.
- **Revalidate when:** audience, language, claim, terminology, route, lore, or institutional context changes.
- **Disposition:** open; specialist and measurement holdpoint.

## Privacy, signup, support, and information holdpoints

### `HLD-S8-011` — Public email-signup final disposition

- **Blocks:** institutional Phase 0 exit and any active collection or final-retirement claim.
- **Tracking:** [issue #63](https://github.com/finalboss-tom/calypsos-promise/issues/63).
- **Current evidence:** paused no-intake endpoint, compatibility pages, no parser, provider, storage, forwarding, or cookie.
- **Accountable future roles:** founding steward, privacy, security, communications, legal, operations, accessibility, and provider owners.
- **Closure evidence:** explicit preserve-or-retire decision and every acceptance criterion in issue #63, including deployed verification where activation is selected.
- **Revalidate when:** form, provider, purpose, email field, retention, cookie, webhook, analytics, or route behavior changes.
- **Disposition:** open; institutional Phase 0 gate; production-blocking for collection.

### `HLD-S8-012` — Privacy review for hosted logs, analytics, telemetry, and support evidence

- **Blocks:** production analytics, session replay, behavioral profiling, private support intake, and broad privacy claims.
- **Current evidence:** no analytics, session replay, account support, private support database, or production logging system selected.
- **Accountable future roles:** privacy, security, analytics, support, infrastructure, legal, and product owners.
- **Closure evidence:** exact event inventory, purpose, consent or lawful basis, minimization, retention, recipients, regions, access, deletion, correction, incidents, re-identification review, and public notice.
- **Revalidate when:** analytics, logs, cookies, identifiers, support tools, provider, region, or purpose changes.
- **Disposition:** open; production-blocking; specialist holdpoint.

### `HLD-S8-013` — Protected support and conduct operating routes

- **Blocks:** claims that private account, privacy, conduct, accessibility, or personal-information support is operationally complete.
- **Current evidence:** public-safe routing and policy links; no private customer-support system or account system.
- **Accountable future roles:** support, conduct, privacy, security, accessibility, governance, and operations owners.
- **Closure evidence:** private channels, ownership, service expectations, confidentiality, access, retention, escalation, correction, deletion, abuse handling, public derivatives, and continuity.
- **Revalidate when:** accounts, users, support volume, conduct process, private evidence, or provider changes.
- **Disposition:** open; implementation and institutional gate.

### `HLD-S8-014` — Public-record and source-authority change management

- **Blocks:** unattended website claims that can drift from canonical repository truth.
- **Current evidence:** repository-owned sources, typed view models, build-time funding adapter, deterministic tests, and manual reconciliation.
- **Accountable future roles:** documentation, website, economics, governance, release, and domain owners.
- **Closure evidence:** ownership map, change triggers, stale-source detection, review cadence, correction route, rollback, and conflict resolution for every public derivative.
- **Revalidate when:** source paths, registry schemas, authority order, automation, CMS, or release cadence changes.
- **Disposition:** open; recurring institutional gate.

## Funding, provider, legal, and institutional holdpoints

### `HLD-S8-015` — Funding, sponsorship, and recognition operations

- **Blocks:** active support opportunities, sponsor recognition, donations, sponsorship intake, affiliate links, payment, and operational funding claims.
- **Current evidence:** accepted doctrine and empty canonical live registers only.
- **Accountable future roles:** funding acceptance, finance, legal, accounting, tax, privacy, procurement, provider governance, communications, and institutional owners.
- **Closure evidence:** lawful recipient, custody, accounting, tax, payment, refund, privacy, public record, conflict, benefit, concentration, continuity, correction, outcome, and independent-review evidence.
- **Revalidate when:** relationship, opportunity, recipient, payment rail, recognition, provider, affiliate, or public claim changes.
- **Disposition:** open; production-blocking; institutional and specialist holdpoint.

### `HLD-S8-016` — Provider, connector, clinical, and enterprise public claims

- **Blocks:** active provider, EHR, connector, clinical, standards-conformance, enterprise, partner, preferred-source, or production-exchange claims.
- **Current evidence:** provider-respectful architecture explanation and explicit absence of live capability.
- **Accountable future roles:** product, clinical, interoperability, privacy, security, legal, procurement, provider governance, accessibility, and communications owners.
- **Closure evidence:** accepted capability scope, contracts, authority, mappings, implementation-guide status, evaluation, conflicts, correction, replacement, incidents, public records, and specialist review.
- **Revalidate when:** provider, connector, standard, mapping, enterprise relationship, clinical workflow, or public claim changes.
- **Disposition:** open; production-blocking; specialist holdpoint.

### `HLD-S8-017` — Legal, trademark, public-domain, and public-claim review

- **Blocks:** broad legal compliance, trademark clearance, public-domain completeness, charitable, tax, clinical, privacy, or institutional approval claims.
- **Current evidence:** repository policies, public-domain direction, rights-cleared repository assets, and explicit non-certification language.
- **Accountable future roles:** qualified legal, trademark, privacy, tax, clinical, publication, and institutional reviewers as applicable.
- **Closure evidence:** named questions, jurisdictions, assets and claims sampled, conflicts, findings, remediation, residual uncertainty, and limits of advice.
- **Revalidate when:** entity, jurisdiction, asset, name, logo, funding, health claim, data practice, or distribution changes.
- **Disposition:** open; specialist holdpoint.

### `HLD-S8-018` — Website ownership, key-person dependency, and successor operability

- **Blocks:** founder-independent operation, reliable recovery, and institutional Phase 0 exit.
- **Current evidence:** one public repository, documented architecture, deterministic CI, and founding-steward ownership.
- **Accountable future roles:** founding steward, successor maintainers, repository, domain, deployment, security, communications, and governance owners.
- **Closure evidence:** ownership and recovery map, branch and release authority, domain and deployment recovery, credential custody, successor runbook, exercises, conflict and emergency behavior, and public accountability.
- **Revalidate when:** maintainer, repository, domain, provider, deployment, legal entity, or governance changes.
- **Disposition:** open; institutional Phase 0 gate.

## Sprint 9 handoff holdpoints

### `HLD-S8-019` — Sprint 9 temporary-data and no-account behavior

- **Blocks:** public prologue playtests or release without disclosed temporary-data lifecycle and verified refusal and exit.
- **Current evidence:** accepted Sprint 9 roadmap only; no gameplay implementation.
- **Accountable future roles:** Sprint 9 product, gameplay, privacy, security, accessibility, Aster, House of Keys, and content owners.
- **Closure evidence:** exact synthetic data classes, storage location, lifetime, reset, exit, refusal, browser storage, logs, export or discard behavior, tests, public disclosure, and review.
- **Revalidate when:** storage, session, account conversion, voice, text, analytics, Aster, or prologue flow changes.
- **Disposition:** open; Sprint 9 entry implementation gate.

### `HLD-S8-020` — Sprint 9 playable accessibility, comprehension, and under-ten-minute evidence

- **Blocks:** public prologue completion and release claims.
- **Current evidence:** static website accessibility foundations and an accepted under-ten-minute target only.
- **Accountable future roles:** Sprint 9 gameplay, accessibility, content, performance, affected-user, and product owners.
- **Closure evidence:** complete prologue tasks, keyboard and screen-reader paths, reduced motion and data, refusal and exit, timing samples, comprehension, errors, temporary-data disclosure, remediation, and limitations.
- **Revalidate when:** scene, dialogue, capture, confirmation, receipt, exit, account conversion, or performance changes.
- **Disposition:** open; Sprint 9 acceptance measurement gate.

## Unresolved-work register

### `UR-S8-001` — Hosted release decision

Decide whether Sprint 8 is merged without deployment, followed by a separately authorized preview, or followed by an official production cutover. Record the actual state; do not infer release from merge.

### `UR-S8-002` — Deployment provider and environment ownership

Identify the official deployment project, owner, environment boundaries, domain binding, credentials, recovery, and replacement only when a hosted release is authorized.

### `UR-S8-003` — Rollback exercise

Exercise the chosen rollback path in the actual hosted environment before representing rollback as operationally verified.

### `UR-S8-004` — Independent accessibility strategy

Name the scope, reviewer qualification, conflicts, target standard, affected-user participation, timing, funding, and correction process for later accessibility review.

### `UR-S8-005` — Browser, device, zoom, and assistive-technology matrix

Define a proportionate matrix before official release or before making broad compatibility claims.

### `UR-S8-006` — Field-performance measurement

Define privacy-safe field or representative lab measurement only after a hosted environment and audience exist.

### `UR-S8-007` — Public email-signup disposition

Resolve issue #63 before Phase 0 exit. Keep the current endpoint paused until the accepted path is implemented and verified.

### `UR-S8-008` — Protected support operations

Design private support, conduct, privacy, and accessibility routes before accounts, real users, or protected evidence require them.

### `UR-S8-009` — Analytics and telemetry decision

Prefer no analytics by default. Any future measurement must earn its purpose and pass privacy, accessibility, security, retention, deletion, and public-notice review.

### `UR-S8-010` — Source-authority freshness

Define stale-source detection and ownership if website content begins updating independently from ordinary repository review.

### `UR-S8-011` — Funding operations

Do not populate live funding relationships or opportunities until the separate Funding Operations and Financial Controls workstream satisfies its entry conditions.

### `UR-S8-012` — Provider and connector status evolution

Update public claims only from accepted capability and relationship records. Preserve provider neutrality, mapping uncertainty, and correction visibility.

### `UR-S8-013` — Domain, DNS, certificate, and official email recovery

Include the public website in the Phase 0 key-person, succession, and emergency-recovery ownership map.

### `UR-S8-014` — Dependency support and security advisories

Define review cadence and ownership for pinned framework and runtime versions before routine hosted operation.

### `UR-S8-015` — Content comprehension and localization

Determine audience, health-literacy, reading-level, terminology, localization, translation, and correction needs before broad public outreach.

### `UR-S8-016` — Sprint 9 synthetic prologue architecture

Prepare a separate pre-Sprint 9 alignment review after Sprint 8 merge. Do not reuse static website status as gameplay evidence.

### `UR-S8-017` — Sprint 9 temporary data

Resolve browser storage, voice and text drafts, reset, session lifetime, discard, logs, and account-conversion handoff before prologue implementation can be accepted.

### `UR-S8-018` — Sprint 9 receipt demonstration

Define a synthetic House of Keys receipt demonstration that cannot create real permission, identity, recipient authority, or production audit claims.

### `UR-S8-019` — Sprint 9 Aster introduction

Use the accepted Aster proposal and confirmation contracts without selecting a production provider or requiring AI for the manual prologue path.

### `UR-S8-020` — Sprint 9 exit and refusal

Make refusal, restart, discard, leave, and no-account completion testable before adding account-conversion choices.

## Closure rule

A Sprint 8 acceptance or squash merge does not close any holdpoint in this register.

Every later closure must identify the exact holdpoint or unresolved item, evidence level reached, reviewer and conflicts, residual uncertainty, downstream consequences, and next revalidation trigger.