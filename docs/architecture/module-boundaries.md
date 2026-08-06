# Repository and Module Boundaries

[Architecture index](README.md) · [Documentation home](../README.md) · [Frozen architecture](../frozen/architecture.md) · [Current status](../roadmap/current-status.md) · [Sprint 10 alignment](../roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md)

- **Status:** BASELINE repository architecture guidance
- **Authority:** implements the frozen Architecture Foundation and accepted Decisions 0010 and 0011 without changing the selected stack or domain boundaries
- **Reviewed baseline:** `main` at Sprint 7 squash commit `f28f054fe16d550fad37663cf234e06c5622dd42`
- **Current reconciliation:** Sprint 10 pre-acceptance full alignment; the baseline rules remain unchanged while the implemented application and package inventory is updated

## Purpose

Calypso’s Promise begins as a modular monolith with explicit domain contracts, replaceable adapters, deterministic authority, and isolated production-data boundaries.

Modularity preserves the Promise. It is not a reason to create empty packages, distributed systems, shared abstractions, CMSs, databases, providers, or services before they have a real owner and use.

## Dependency direction

Dependencies point inward toward stable contracts and domain rules:

```text
user and agent surfaces
        ↓
applications and orchestration
        ↓
domain capabilities and policy-enforced use cases
        ↓
pure schemas, values, invariants, and deterministic rules

infrastructure and provider adapters ──implement──> inward-facing ports
```

The inner layer must not import the outer layer.

- Applications may compose packages and adapters.
- Domain packages may depend on narrower value or schema packages only when the dependency is part of the domain contract.
- Infrastructure adapters may depend on domain ports and contracts.
- Domain contracts must not depend on databases, queues, cloud SDKs, analytics vendors, AI providers, HTTP frameworks, or UI libraries.
- One application must not import another application’s internal source.
- Packages must not import another package through private `src` paths.
- Circular package dependencies are prohibited.

## Repository surface responsibilities

### `apps/`

Deployable or directly runnable composition roots.

An application may own:

- routes, screens, commands, requests, or transports;
- dependency construction;
- authentication-context handoff;
- use-case orchestration;
- presentation-specific mapping; and
- application-level error translation.

An application must not become the canonical home for reusable domain rules, provider-independent policy, or another application’s implementation.

Current applications:

- [`apps/site`](../../apps/site) — accepted Next.js institutional website, newsletter surface, and production-hosted public synthetic `/prologue`
- [`apps/game`](../../apps/game) — complete unmerged Expo / React Native / Expo Router public/synthetic browser, iOS, and Android universal shell from Sprint 10
- [`apps/mcp-forge`](../../apps/mcp-forge) — accepted local public/synthetic contributor-tool application from Sprint 7

Planned applications such as `apps/api` and `apps/mcp-chronicle` must not be created as empty placeholders.

### `packages/`

Versioned, testable capabilities and contracts shared by one or more applications or services.

A package should have one primary reason to change and a narrow public API. It should expose only the contracts or functions downstream consumers are expected to use.

Current packages:

- [`domain`](../../packages/domain) — small repository-wide public and synthetic contributor invariants; not a miscellaneous utilities package
- [`content-schema`](../../packages/content-schema) — story and product-content contracts, deterministic validation, and graph contracts
- [`health-schema`](../../packages/health-schema) — Living Chronicle contracts, versioning, deterministic validation, and synthetic fixtures
- [`house-of-keys`](../../packages/house-of-keys) — purpose-specific permission contracts, lifecycle, explanation evidence, receipts, deterministic validation, pure policy evaluation, and public synthetic fixtures
- [`aster`](../../packages/aster) — provider-independent Aster role, proposal, source, memory, work, provider-governance, compatibility, migration, and local synthetic contracts
- [`game-content`](../../packages/game-content) — versioned public/synthetic playable-content records and deterministic validation consumed by `apps/game`; not gameplay authority, private content, or a generic UI package

Do not extract a website or universal UI package merely because applications contain internal shared components. A package requires a second real consumer or an independently changing contract boundary.

### `services/`

Independently operated capabilities should be introduced only when they require a distinct runtime, scaling profile, security boundary, language, failure domain, release cadence, legal boundary, or institutional owner.

A planned service is not evidence that a separate deployment is justified.

### `content/`

Versioned public or synthetic product content governed by content contracts and specialist review. Content must not contain executable authority, credentials, production payloads, or hidden provider configuration.

### `fixtures/`

Synthetic or explicitly public evidence used to validate contracts and end-to-end behavior. Fixtures are not seed copies of production data and must remain safe to publish permanently.

### `tools/`

Repository policy, validation, migration, generation, and contributor tooling. Tools may inspect explicitly allowed repository files but must not quietly become production-domain services.

## Domain ownership rules

### Living Chronicle

The Chronicle owns longitudinal records, values, temporal assertions, provenance, correction, conflict, source artifacts, export, and deletion contracts.

It does not own:

- account authentication or identity proofing;
- purpose-specific permission grants or policy decisions;
- access receipts or protected operational audit;
- research enrollment or compensation;
- quest progression or narrative state;
- Aster prompts, proposals, memory, provider logs, or work state;
- MCP registries or tool execution;
- connector synchronization; or
- provider-specific mappings.

Those domains may reference Chronicle identifiers through explicit contracts; they must not be folded into the Chronicle aggregate merely because they interact with health records.

### House of Keys

The House of Keys owns provider-independent purpose, category, grant, recipient, action, selector, duration, lifecycle, explanation, comprehension, confirmation, access-receipt, and policy-evaluation contracts.

Permission may authorize an operation over Chronicle data; it does not become Chronicle truth.

The package:

- accepts explicit facts and returns inspectable `allow`, `deny`, or `indeterminate` decisions;
- exposes only deliberate public exports;
- has no database, provider, network, filesystem, UI, authenticated-session, or model dependency;
- does not authenticate actors, execute operations, mutate grants, consume authority, issue production receipts, or write Chronicle records; and
- contains only public or synthetic fixtures.

### Aster

Aster owns bounded provider-independent contracts for:

- Scribe, Librarian, Wayfinder, Interpreter, and Storykeeper roles;
- intent, clarification, confidence, refusal, and uncertainty;
- structured proposals and extraction candidates;
- source-linked recall and explanation;
- player-visible memory classes and lifecycle;
- provider egress and provider-neutral evaluation;
- responsive, deferred, unavailable, stale, corrected, and superseded work; and
- deterministic local or synthetic fixtures.

Aster does not own:

- canonical Chronicle records;
- House of Keys grants or decisions;
- authentication or identity proofing;
- quest completion, rewards, or progression;
- production provider selection or model SDKs;
- arbitrary database, filesystem, queue, scheduler, network, or MCP authority;
- protected operational audit; or
- clinical conclusions.

### Forge MCP

Forge owns one local contributor-tool application boundary for:

- accepted tool identities and risk classes;
- public/synthetic source allowlists and provenance;
- deterministic search, inspection, validation, and synthetic draft generation;
- execution scopes, resource limits, cancellation, timeout, receipts, and stable errors;
- runtime integrity, result postconditions, compatibility, migrations, and local operability; and
- public adversarial tests.

Forge does not own:

- repository or Git mutation;
- arbitrary filesystem access;
- shell, subprocess, dynamic-module, browser, or network authority;
- private Chronicle or House of Keys operations;
- providers or connectors;
- canon, mapping, clinical, gameplay, reward, financial, or institutional authority; or
- production sandboxing, distributed quotas, monitoring, or incident response.

### Public website

`apps/site` owns public presentation, navigation, route composition, metadata, public status views, public funding views, Trust Center organization, Open Forge explanation, and the separately bounded signup adapter.

It may summarize and render accepted public records. It does not own:

- Product Constitution, security, funding, provider, clinical, legal, or governance policy;
- Chronicle or permission truth;
- account identity or private data;
- production Aster or private MCP;
- provider or connector operation;
- fundraising transactions;
- the universal application shell; or
- private or authoritative gameplay.

Website status and funding views must remain read-only derivatives with canonical source links and validation. They cannot become independent authority.

### Universal game shell

`apps/game` owns browser, iOS, and Android presentation composition for the bounded universal shell.

It may compose:

- versioned public/synthetic game content;
- shell routes and navigation;
- scene, dialogue, quest-card, and Wayfinder presentation;
- temporary deterministic synthetic-session state;
- bounded public/synthetic offline storage;
- informational account-boundary presentation;
- accessibility and platform adapters; and
- unsigned build and operations evidence.

It does not own:

- private Chronicle truth;
- production identity, authentication, recovery, or sessions;
- House of Keys grants, receipts, or execution;
- production Aster, model providers, memory, retrieval, or tools;
- authoritative quest completion, rewards, restoration, unlocks, or progression;
- analytics, inferred preference, research, payments, clinical operation, or connectors;
- canonical public-site routes, newsletter state, or production `/prologue`; or
- deployment, signing, store distribution, official release, LI activation, or Sprint 11 authority.

`packages/game-content` supplies validated public/synthetic content. Client rendering, storage, navigation, animation, device time, and local events remain presentation evidence only.

### Access receipts and protected audit

Player-visible receipts and protected operational or security audit records remain related but distinct capabilities.

A technical log does not create permission or replace a missing receipt. A receipt does not prove a complete or tamper-resistant audit trail.

### Content and story

Content contracts own versioned narrative and educational records. The story engine may compile and evaluate allowed content relationships, but it must not infer health truth, grant permissions, or complete quests without domain evidence.

### AI and MCP

AI and MCP components are adapters and interaction layers.

- AI may create drafts, explanations, retrieval requests, and structured proposals.
- MCP may expose explicitly authorized capabilities.
- Neither may write directly to canonical records, change permissions, bypass confirmation, convert `indeterminate` into allow, or access production resources outside accepted enforcement.
- Imported, retrieved, model-generated, or tool-returned content remains untrusted.
- A delayed or provider-returned result cannot act under stale identity, intent, permission, source, policy, or record state.

The frozen transaction rule remains:

> AI proposes. The player confirms. The domain service validates and stores.

## Public API rules

Every package should:

- declare a deliberate export surface;
- avoid exposing private file layout as a contract;
- use stable domain language rather than provider terminology;
- return structured errors or issues rather than rely on log text;
- version externally meaningful serialized contracts independently where needed;
- keep compatibility and migration behavior explicit; and
- test public exports rather than only private helpers.

## Module creation gate

Create a package, application, or deployable service only when all of the following are true:

1. A bounded responsibility and owner can be named.
2. The public contract can be described without private implementation paths.
3. Dependency direction is clear.
4. At least one real consumer or current sprint deliverable exists.
5. Synthetic fixtures or tests validate the boundary.
6. Security, privacy, permission, accessibility, operability, and rollback implications are recorded.
7. The module does not duplicate an existing surface or prematurely select a provider.
8. A deployable service has evidence that an in-process package or application boundary is insufficient.

Do not create placeholder modules solely to resemble a future topology.

## Decomposition triggers

Split a file or internal module when one or more of these conditions appear:

- it contains multiple independent validation or policy domains;
- unrelated teams or sprints repeatedly edit the same file;
- one type union absorbs concepts owned by another bounded context;
- provider-specific concerns leak into provider-independent contracts;
- tests cannot isolate failures to one responsibility;
- the public entry point becomes an undifferentiated export barrel; or
- a module has more than one primary reason to change.

Line count alone is not the rule, but very large files are a signal to inspect cohesion.

## Historical Sprint 8 boundary

Sprint 8 migrated `apps/site` in place and the accepted boundary remains controlling.

It may add internal components, routes, typed site-local public data, build-time adapters, tests, and design tokens inside the application.

The accepted Sprint 8 change did not create:

- a second site;
- a shared website package without a second consumer;
- a CMS, database, remote content service, or runtime GitHub fetch;
- an account, identity, private-data, provider, connector, transaction, or analytics service; or
- a Sprint 9 prologue surface.

The [Pre-Sprint 8 Alignment Review](../roadmap/pre-sprint-8-alignment-review.md) is the controlling handoff.

## Sprint 10 boundary

Sprint 10 earned `apps/game` and `packages/game-content` because both have a current deliverable, bounded responsibility, explicit owner, public API, synthetic fixtures, focused tests, all-platform validation, operability, provider-exit behavior, and rollback boundaries.

It did not earn a generic shared UI package, backend service, production identity service, database, queue, CMS, analytics runtime, model provider, connector, deployment surface, or authoritative gameplay domain.

The [Sprint 10 pre-acceptance alignment reconciliation](../roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md) is the controlling current inventory review. Sprint 11 remains separately gated.

## Pull-request review checklist

A material implementation pull request should answer:

- Which bounded capability owns this behavior?
- Is dependency direction inward?
- Does the change use only public package exports?
- Is a new module justified by a current consumer and testable contract?
- Could the logic remain deterministic and provider-independent?
- Does AI, MCP, content, infrastructure, a provider, sponsor, or website gain authority it should not have?
- Are failure, stale, correction, supersession, cancellation, and rollback states explicit where relevant?
- Are permission, audit, correction, export, deletion, memory, signup, and privacy effects explicit?
- Does the change preserve public/synthetic-only development and complete non-AI paths?
- What would cause the module to be split, replaced, contained, or rolled back?
