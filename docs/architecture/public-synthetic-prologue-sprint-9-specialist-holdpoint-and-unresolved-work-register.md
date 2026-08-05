# Sprint 9 Public Synthetic Prologue Specialist Holdpoint and Unresolved-Work Register

[Architecture index](README.md) · [Cross-contract reconciliation](public-synthetic-prologue-sprint-9-cross-contract-reconciliation.md) · [Control and evidence map](public-synthetic-prologue-sprint-9-control-and-evidence-map.md) · [Completion record](../roadmap/sprint-9-completion-record.md) · [Sprint 10 handoff](../roadmap/sprint-9-release-rollback-and-sprint-10-handoff.md)

- **Status:** OPEN AFTER SPRINT 9 IMPLEMENTATION — no production, public-release, independent-specialist, affected-user, field-measurement, or institutional holdpoint is closed by this revision
- **Accepted 9.9 baseline:** `3d7c02f303e052c07fb023ff39673a15c1d62349` — CI 1286 / DCO 1371
- **Scope:** protected-preview lifecycle, public release, production operation, accessibility, usability, performance, security, privacy, legal language, identity, Chronicle, House of Keys, Aster, analytics, newsletter, providers, funding, ownership, Phase 0, and Sprint 10 entry
- **Information boundary:** public-safe descriptions and explicitly synthetic evidence only

## Purpose

Sprint completion does not authorize a capability or public claim whose safety, legitimacy, ownership, operational evidence, or specialist review remains unresolved. Each holdpoint names what it blocks, current evidence, accountable future roles, minimum closure evidence, revalidation triggers, and disposition.

A holdpoint or unresolved item may be narrowed, closed, superseded, or retired only through a versioned record preserving prior scope, evidence, decision authority, residual uncertainty, downstream consequences, and revalidation conditions.

## Status vocabulary

- **OPEN — RELEASE-BLOCKING:** no official public link, indexing, production cutover, or release claim may proceed.
- **OPEN — PRODUCTION-BLOCKING:** no production private information or consequential operation may use the capability.
- **OPEN — PILOT-BLOCKING:** no representative affected-user or real-person pilot may support the named claim.
- **OPEN — SPECIALIST HOLDPOINT:** qualified bounded review is required before the claim or capability advances.
- **OPEN — INSTITUTIONAL GATE:** ownership, continuity, governance, funding, legal, or administrative evidence is required.
- **OPEN — MEASUREMENT GATE:** representative performance, accessibility, reliability, quality, comprehension, or operational evidence is required.
- **OPEN — SPRINT 10 ENTRY GATE:** the universal-shell implementation may not begin until the named alignment record exists.
- **CURRENT REPOSITORY/PROTECTED-PREVIEW FLOW:** only the bounded repository and protected-preview evidence may continue under explicit limitations.
- **CLOSED:** every named closure requirement and residual-risk disposition is recorded. No `HLD-S9-*` holdpoint is closed in this revision.

## Holdpoints

### `HLD-S9-001` — Official public linking, indexing, and production release

- **Blocks:** Blocks adding `/prologue` to production navigation or sitemap, removing noindex, moving the production alias, or announcing a public gameplay release.
- **Current evidence:** Protected branch preview only; production remained unchanged.
- **Accountable future roles:** Founding steward, release owner, infrastructure owner, accessibility owner, security owner, communications owner.
- **Closure evidence:** Explicit release decision; exact source and deployment; canonical-domain verification; public labels; rollback exercise; current holdpoint disposition; correction route.
- **Revalidate when:** Domain, alias, linking, indexing, release target, or public claim changes.
- **Disposition:** OPEN — RELEASE-BLOCKING.

### `HLD-S9-002` — Authenticated preview lifecycle and teardown

- **Blocks:** Blocks representing the protected preview as permanent, public, or operationally owned.
- **Current evidence:** Preview deployment is READY and Vercel-auth protected; no expiring share link is stored.
- **Accountable future roles:** Founding steward and Vercel project owners.
- **Closure evidence:** Retention or teardown decision; alias/deployment ownership; access review; removal verification; evidence retention boundary.
- **Revalidate when:** Preview protection, alias, ownership, retention, or provider changes.
- **Disposition:** OPEN — INSTITUTIONAL GATE.

### `HLD-S9-003` — Deployed application headers, CSP, cache, TLS, DNS, and CDN verification

- **Blocks:** Blocks claims that repository and local-preview controls operate on a public production route.
- **Current evidence:** Local production preview plus Vercel protection-response evidence; authenticated app response was not used as production evidence.
- **Accountable future roles:** Security, infrastructure, DNS/CDN, release, and operations owners.
- **Closure evidence:** Canonical-domain route capture, TLS/DNS/CDN state, application response headers and CSP, cache behavior, redirects, findings, remediation, and residual risk.
- **Revalidate when:** Host, domain, proxy, rendering mode, headers, CSP, cache, or route changes.
- **Disposition:** OPEN — RELEASE-BLOCKING.

### `HLD-S9-004` — Independent application-security review

- **Blocks:** Blocks independent-security, penetration-test, hardened-production, or externally reviewed claims.
- **Current evidence:** Threat boundaries, source scans, deterministic tests, browser network/storage denial, and maintainer review.
- **Accountable future roles:** Independent application-security reviewer with security and release owners.
- **Closure evidence:** Named reviewer and conflicts; scoped abuse cases; dependency/configuration review; interaction and browser-state review; findings, remediation, residual risk, and next review.
- **Revalidate when:** Input, storage, account, provider, script, deployment, or private-data scope changes.
- **Disposition:** OPEN — SPECIALIST HOLDPOINT.

### `HLD-S9-005` — Production observability, incident response, and rollback exercise

- **Blocks:** Blocks reliability, monitoring, incident-detection, recovery-time, and operational-continuity claims.
- **Current evidence:** No runtime error cluster during bounded preview review; documented rollback ownership; no operational monitoring claim.
- **Accountable future roles:** Operations, reliability, security, privacy, release, and incident owners.
- **Closure evidence:** Service objectives, minimized logs, alerts, protected incident route, escalation, rollback exercise, public correction rules, retention, and residual risk.
- **Revalidate when:** Production release, logging, monitoring, uptime target, storage, or incident process changes.
- **Disposition:** OPEN — PRODUCTION-BLOCKING.

### `HLD-S9-006` — Independent accessibility review and conformance statement

- **Blocks:** Blocks formal WCAG conformance, certification, or independent-accessibility approval.
- **Current evidence:** Automated semantics, contrast, CDP journeys, media modes, and maintainer review.
- **Accountable future roles:** Independent accessibility specialist, product and content owners, affected-user representatives.
- **Closure evidence:** Named reviewer and conflicts; target standard; route/state sample; methods; findings; remediation; exceptions; residual risk; dated statement if justified.
- **Revalidate when:** Interaction, layout, content, design tokens, components, or target standard changes.
- **Disposition:** OPEN — SPECIALIST HOLDPOINT.

### `HLD-S9-007` — Named screen-reader and assistive-technology testing

- **Blocks:** Blocks claims of screen-reader, switch, magnification, voice-control, or assistive-technology validation.
- **Current evidence:** Accessibility tree and native-keyboard evidence only; no named assistive technology session.
- **Accountable future roles:** Accessibility owner, affected-user reviewers, QA, privacy, and support owners.
- **Closure evidence:** Named AT/browser/device matrix; representative tasks; announcements, focus, error and recovery results; remediation; limitations.
- **Revalidate when:** Controls, dialogue, focus, announcements, browser support, or AT targets change.
- **Disposition:** OPEN — PILOT-BLOCKING.

### `HLD-S9-008` — Affected-user, cognitive-accessibility, and comprehension research

- **Blocks:** Blocks claims that people with relevant disabilities or health-literacy needs understand and can complete the prologue.
- **Current evidence:** Modeled duration and maintainer review; no affected-user sessions.
- **Accountable future roles:** Affected-user representatives, accessibility, research/usability, privacy, content, and product owners.
- **Closure evidence:** Ethical privacy-safe protocol; representative participants and tasks; comprehension and cognitive-load findings; refusal/exit behavior; remediation; limitations.
- **Revalidate when:** Audience, copy, scene, timing, interaction, or research purpose changes.
- **Disposition:** OPEN — MEASUREMENT GATE.

### `HLD-S9-009` — Browser, device, zoom, reflow, touch, and platform matrix

- **Blocks:** Blocks comprehensive compatibility, mobile, touch, zoom, or cross-browser claims.
- **Current evidence:** Chrome 150 CI evidence, forced modes, and 360×800 viewport.
- **Accountable future roles:** QA, accessibility, frontend, device-lab, and release owners.
- **Closure evidence:** Accepted matrix across browser engines, devices, orientations, zoom/reflow, keyboard, touch and pointer; failures, remediation, residual limits.
- **Revalidate when:** CSS, browser support, interaction, breakpoint, or platform targets change.
- **Disposition:** OPEN — MEASUREMENT GATE.

### `HLD-S9-010` — Field performance and real-user completion measurement

- **Blocks:** Blocks production Core Web Vitals, low-end-device, slow-network, and real-user under-ten-minute claims.
- **Current evidence:** Isolated transfer budgets and conservative modeled duration only.
- **Accountable future roles:** Performance, frontend, infrastructure, privacy, accessibility, research, and release owners.
- **Closure evidence:** Privacy-reviewed field or representative lab plan; devices/networks; route and cache states; timing and web metrics; regressions, remediation, limitations.
- **Revalidate when:** Hosting, assets, framework, audience, analytics, or direct path changes.
- **Disposition:** OPEN — MEASUREMENT GATE.

### `HLD-S9-011` — Content design, health literacy, localization, and cultural review

- **Blocks:** Blocks broad plain-language, multilingual, health-literacy, or culturally inclusive claims.
- **Current evidence:** English source-linked copy and maintainer review.
- **Accountable future roles:** Content design, accessibility, health literacy, localization, affected-user, legal, lore, and product owners.
- **Closure evidence:** Audience and reading goals; terminology and lore review; comprehension testing; localization and translation governance; correction process; limitations.
- **Revalidate when:** Audience, language, terminology, lore, jurisdiction, or public outreach changes.
- **Disposition:** OPEN — SPECIALIST HOLDPOINT.

### `HLD-S9-012` — Legal and communications review of Chronicle, receipt, permission, and account language

- **Blocks:** Blocks claims that the demonstration is legally sufficient consent, permission, privacy notice, health guidance, or account disclosure.
- **Current evidence:** Explicit non-authority wording and canonical source mapping; no legal specialist approval.
- **Accountable future roles:** Legal, privacy, communications, House of Keys, Chronicle, product, and accessibility owners.
- **Closure evidence:** Named questions and jurisdictions; copy/state sample; findings; remediation; residual uncertainty; public-claim limits; re-review date.
- **Revalidate when:** Permission, consent, account, health, privacy, receipt, or jurisdictional language changes.
- **Disposition:** OPEN — SPECIALIST HOLDPOINT.

### `HLD-S9-013` — Real voice, free-form input, and capture privacy architecture

- **Blocks:** Blocks microphone, transcription, arbitrary health text, file, image, location, or sensor capture.
- **Current evidence:** No such input or API exists; synthetic transcript choices only.
- **Accountable future roles:** Privacy, security, accessibility, product, clinical, data-governance, and operations owners.
- **Closure evidence:** Purpose and data classes; device and provider path; consent/lawful basis; minimization; local/remote processing; retention/deletion; errors; abuse; accessibility; security; specialist review.
- **Revalidate when:** Any real capture or arbitrary input is proposed.
- **Disposition:** OPEN — PRODUCTION-BLOCKING.

### `HLD-S9-014` — Authentication, account creation, recovery, and prologue handoff

- **Blocks:** Blocks production identity, account conversion, retained prologue state, or recovery claims.
- **Current evidence:** Informational-only future-account page; no identity or state transfer.
- **Accountable future roles:** Identity, security, privacy, accessibility, support, product, and operations owners.
- **Closure evidence:** Threat model; identity and recovery contracts; consent and state-transfer rule; session and device behavior; support/incident routes; deletion; accessibility; rollback.
- **Revalidate when:** Sprint 10 auth boundary, account, recovery, state transfer, or login changes.
- **Disposition:** OPEN — PRODUCTION-BLOCKING.

### `HLD-S9-015` — Private Living Chronicle storage, correction, export, and deletion

- **Blocks:** Blocks creating or implying a production private Chronicle.
- **Current evidence:** Temporary explanation only; no record or storage.
- **Accountable future roles:** Chronicle, privacy, security, data, product, support, and operations owners.
- **Closure evidence:** Authoritative schema and storage; provenance; correction/conflict/supersession; encryption; export/deletion; recovery; audit; testing; specialist review.
- **Revalidate when:** Sprint 11 or earlier private Chronicle capability is proposed.
- **Disposition:** OPEN — PRODUCTION-BLOCKING.

### `HLD-S9-016` — Production House of Keys identity, policy evaluation, receipt, and audit

- **Blocks:** Blocks real permission, consent, recipient, grant, execution, audit, or legal-access claims.
- **Current evidence:** Receipt-shaped explanation only; no request, evaluation, grant, or release.
- **Accountable future roles:** House of Keys, identity, privacy, security, legal, product, audit, and operations owners.
- **Closure evidence:** Actor and recipient identity; purpose and scope; deterministic evaluation; grant/revocation; execution boundary; protected audit; explanation; testing; legal/privacy review.
- **Revalidate when:** Any real permission or data operation is proposed.
- **Disposition:** OPEN — PRODUCTION-BLOCKING.

### `HLD-S9-017` — Production Aster, model-provider, memory, retrieval, and egress governance

- **Blocks:** Blocks production AI, model, agent, memory, retrieval, tool, or private-data egress.
- **Current evidence:** Deterministic local framing only; manual path complete; no model call.
- **Accountable future roles:** Aster, privacy, security, product, accessibility, provider governance, operations, and evaluation owners.
- **Closure evidence:** Provider selection and exit; egress and retention; prompt/input isolation; memory classes; retrieval; uncertainty; evaluation; fallback; incidents; contracts; specialist review.
- **Revalidate when:** Any model, provider, tool, memory, retrieval, or private-data use is proposed.
- **Disposition:** OPEN — PRODUCTION-BLOCKING.

### `HLD-S9-018` — Analytics, telemetry, experimentation, and behavioral profiling

- **Blocks:** Blocks production analytics, session replay, user profiling, or experiment claims.
- **Current evidence:** No analytics, identifiers, cookies, telemetry, or remote measurement in the prologue.
- **Accountable future roles:** Privacy, security, analytics, accessibility, product, legal, and operations owners.
- **Closure evidence:** Exact event inventory and purpose; lawful basis/consent; minimization; retention; recipients/regions; deletion/correction; re-identification and fairness review; public notice.
- **Revalidate when:** Any analytics, experiment, identifier, cookie, or telemetry is proposed.
- **Disposition:** OPEN — PRODUCTION-BLOCKING.

### `HLD-S9-019` — Newsletter final acceptance and separation

- **Blocks:** Blocks institutional Phase 0 exit and any claim that newsletter contact is account, consent, identity, or prologue state.
- **Current evidence:** Separate bounded newsletter Path A; issue #63 remains open; no prologue call.
- **Accountable future roles:** Founding steward, privacy, security, communications, legal, operations, accessibility, and provider owners.
- **Closure evidence:** Every acceptance criterion in issue #63, including private delivery verification or an explicit retirement decision.
- **Revalidate when:** Newsletter provider, purpose, fields, retention, routes, or prologue relationship changes.
- **Disposition:** OPEN — INSTITUTIONAL GATE.

### `HLD-S9-020` — Provider, connector, clinical, research, and enterprise claims

- **Blocks:** Blocks live provider/EHR/connector, clinical, research-enrollment, enterprise, standards-conformance, or production-exchange claims.
- **Current evidence:** Explicit absence; provider-respectful explanation only.
- **Accountable future roles:** Product, clinical, interoperability, privacy, security, legal, provider governance, accessibility, and communications owners.
- **Closure evidence:** Accepted scope; contracts and mappings; authority and conflict rules; evaluation; correction/replacement; incidents; public records; named specialist review.
- **Revalidate when:** Provider, connector, standard, clinical, research, or enterprise scope changes.
- **Disposition:** OPEN — PRODUCTION-BLOCKING.

### `HLD-S9-021` — Funding, sponsorship, recognition, and influence controls

- **Blocks:** Blocks paid placement, sponsor-shaped progression, provider ranking, source authority, conversion pressure, or active transaction claims.
- **Current evidence:** Funding doctrine and empty/controlled public records; no prologue funding runtime.
- **Accountable future roles:** Funding acceptance, finance, legal, accounting, tax, privacy, provider governance, communications, and institutional owners.
- **Closure evidence:** Accepted relationship/benefit records; conflicts; concentration; evaluator independence; continuity/exit; transactions and public records where applicable.
- **Revalidate when:** Funding, sponsor, affiliate, provider, recognition, or transaction changes.
- **Disposition:** OPEN — INSTITUTIONAL GATE.

### `HLD-S9-022` — Release ownership, key-person dependency, and successor operability

- **Blocks:** Blocks founder-independent release, reliable recovery, and institutional Phase 0 exit.
- **Current evidence:** Documented source, CI, deployment policy, preview provenance, and founding-steward authority.
- **Accountable future roles:** Founding steward, successor maintainers, repository/domain/deployment/security/communications/governance owners.
- **Closure evidence:** Ownership and credential-recovery map; branch and release authority; domain/deployment recovery; successor runbook and exercises; conflict/emergency behavior; public accountability.
- **Revalidate when:** Maintainer, repository, provider, domain, deployment, entity, or governance changes.
- **Disposition:** OPEN — INSTITUTIONAL GATE.

### `HLD-S9-023` — Institutional Phase 0 exit

- **Blocks:** Blocks claiming Phase 0 complete or the institution ready for autonomous operation.
- **Current evidence:** Sprints 0–8 merged; Sprint 9 branch package; multiple named Phase 0 gates remain open.
- **Accountable future roles:** Founding steward, governance, legal, finance, security, privacy, operations, accessibility, community, and successor roles.
- **Closure evidence:** Explicit Phase 0 exit review resolving or accepting every controlling gate, residual risk, ownership, and next phase authority.
- **Revalidate when:** Any Phase 0 gate, entity, governance, funding, ownership, or release state changes.
- **Disposition:** OPEN — INSTITUTIONAL GATE.

### `HLD-S9-024` — Pre-Sprint 10 universal-shell alignment

- **Blocks:** Blocks implementation of the Expo/browser/iOS/Android shell without agreed ownership, content, trust, offline, authentication, accessibility, and release boundaries.
- **Current evidence:** Sprint 10 goal/deliverables/acceptance plus this handoff; no universal shell implementation.
- **Accountable future roles:** Founding steward, product, mobile/web architecture, gameplay, security, privacy, accessibility, content, operations, and QA owners.
- **Closure evidence:** Dedicated alignment review covering application/package ownership, one content package, renderer and state authority, offline/sync, authentication after prologue, accessibility settings, platform matrix, no client trust, validation, rollback, issue/PR structure, and non-scope.
- **Revalidate when:** Sprint 10 scope, framework, application boundary, offline, authentication, or client authority changes.
- **Disposition:** OPEN — SPRINT 10 ENTRY GATE.

## Unresolved-work register

### `UR-S9-001`

Decide whether the protected Sprint 9 preview remains available, is removed after acceptance, or is replaced by a later authorized environment. Record the actual disposition.

### `UR-S9-002`

Do not add a production `/prologue` link, sitemap entry, indexing, domain alias, or launch claim without a separate attributable release decision.

### `UR-S9-003`

Exercise the selected preview or production rollback path in the actual Vercel environment before representing rollback as operationally verified.

### `UR-S9-004`

Name the independent accessibility review strategy, target standard, reviewer qualifications and conflicts, affected-user participation, timing, funding, and correction process.

### `UR-S9-005`

Define named screen-reader, assistive-technology, browser, device, zoom, reflow, touch, and orientation matrices proportionate to the intended release.

### `UR-S9-006`

Define privacy-safe affected-user, cognitive-accessibility, comprehension, and completion-time research before making representative usability claims.

### `UR-S9-007`

Define field or representative lab performance measurement only after a target hosted environment and audience exist.

### `UR-S9-008`

Resolve issue #63 through private provider-delivery verification and acceptance or an explicit retirement decision before Phase 0 exit.

### `UR-S9-009`

Preserve the no-analytics default. Any future telemetry or experimentation must earn its purpose and pass privacy, security, accessibility, retention, deletion, fairness, and public-notice review.

### `UR-S9-010`

Obtain legal and communications review before production Chronicle, receipt, permission, consent, account, privacy, or health-adjacent language is relied upon.

### `UR-S9-011`

Design real voice and arbitrary-input architecture separately, including on-device/remote boundaries, consent, minimization, provider exit, retention, deletion, errors, abuse, and accessibility.

### `UR-S9-012`

Design production identity, authentication, account creation, recovery, session, support, and prologue-state handoff before activating the Sprint 10 authentication boundary.

### `UR-S9-013`

Keep private Living Chronicle storage, authoritative correction, provenance, export, deletion, recovery, and operations for the separately gated private-value-loop work.

### `UR-S9-014`

Keep real House of Keys identity, policy evaluation, grant, revocation, execution, receipt, and protected audit outside the synthetic prologue.

### `UR-S9-015`

Keep production Aster, model providers, memory, retrieval, tools, private-data egress, evaluations, incident response, and provider replacement outside Sprint 9.

### `UR-S9-016`

Update provider, connector, standards, clinical, research, and enterprise public claims only from accepted capability and relationship records.

### `UR-S9-017`

Do not permit funding, sponsorship, affiliate, provider, or distribution relationships to purchase prologue placement, progression, source authority, Aster behavior, findings, ranking, or conversion pressure.

### `UR-S9-018`

Include repository, branch, Vercel project, production domain, preview alias, official email, and release authority in the Phase 0 successor and emergency-recovery map.

### `UR-S9-019`

Track the known Turbopack NFT trace warning as an optimization and operability item; do not misclassify it as a Sprint 9 acceptance failure or silently ignore it if scope grows.

### `UR-S9-020`

Define ownership and stale-source detection if the prologue boundary, Chronicle/House of Keys mappings, or public capability labels begin updating outside ordinary repository review.

### `UR-S9-021`

Run a dedicated pre-Sprint 10 alignment review after Sprint 9 acceptance, squash merge, issue closure, and post-merge reconciliation.

### `UR-S9-022`

Decide whether Sprint 10 creates a new Expo application, a shared content package, or both without duplicating website authority or prematurely extracting generic packages.

### `UR-S9-023`

Specify the Sprint 10 deterministic server/domain authority model so no gameplay rule, quest completion, reward, permission, or authoritative state depends on client-side trust.

### `UR-S9-024`

Specify Sprint 10 offline, sync, conflict, authentication-after-prologue, accessibility-settings, platform-release, telemetry, rollback, and no-private-data boundaries before implementation.

## Closure rule

A Sprint 9 acceptance or squash merge does not close any holdpoint in this register.

Every later closure must identify the exact holdpoint or unresolved item, evidence level reached, reviewer and conflicts, residual uncertainty, downstream consequences, and next revalidation trigger.
