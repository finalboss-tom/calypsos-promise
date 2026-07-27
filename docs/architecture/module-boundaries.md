# Repository and Module Boundaries

[Architecture index](README.md) · [Documentation home](../README.md) · [Frozen architecture](../frozen/architecture.md) · [Current status](../roadmap/current-status.md) · [Pre-Sprint 6 review](../roadmap/pre-sprint-6-alignment-review.md)

**Status:** BASELINE repository architecture guidance  
**Authority:** Implements the frozen Architecture Foundation and accepted Decisions 0010 and 0011 without changing the selected stack or domain boundaries

## Purpose

Calypso’s Promise is intended to begin as a modular monolith with explicit domain contracts, replaceable adapters, deterministic authority, and isolated production-data boundaries. Modularity is a means of preserving the Promise—not a reason to create empty packages, distributed systems, or abstraction layers before they have a real owner and use.

This document defines how applications, packages, services, content, fixtures, and tools should relate as the repository expands.

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
- Domain packages may depend on narrower value or schema packages when the dependency is part of the domain contract.
- Infrastructure adapters may depend on domain ports and contracts.
- Domain contracts must not depend on databases, queues, cloud SDKs, analytics vendors, AI providers, HTTP frameworks, or UI libraries.
- One application must not import another application’s internal source.
- Packages must not import another package through its private `src` path. Use the declared public export surface.
- Circular package dependencies are prohibited.

## Repository surface responsibilities

### `apps/`

Deployable or directly runnable composition roots.

An application may own:

- request, route, screen, command, or transport composition;
- dependency construction;
- authentication context handoff;
- use-case orchestration;
- presentation-specific mapping; and
- application-level error translation.

An application must not become the canonical home for reusable domain rules, schemas, or provider-independent policy.

### `packages/`

Versioned, testable capabilities and contracts shared by one or more applications or services.

A package should have one primary reason to change and a narrow public API. It should expose only the contracts or functions that downstream consumers are expected to use.

Current packages:

- [`domain`](../../packages/domain) — repository-wide public and synthetic contributor invariants; keep this small and do not turn it into a miscellaneous utilities package
- [`content-schema`](../../packages/content-schema) — story and product-content contracts, deterministic validation, and graph contracts
- [`health-schema`](../../packages/health-schema) — Living Chronicle contracts, versioning, deterministic validation, and synthetic fixtures
- [`house-of-keys`](../../packages/house-of-keys) — pre-stable purpose-specific permission contracts, lifecycle and explanation evidence, access receipts, deterministic structural validation, pure policy evaluation, and public synthetic fixtures; complete and merged through PR #33

The House of Keys package is the accepted refinement of the frozen planned `consent` capability name. This naming refinement does not change the domain boundary: permission truth remains separate from Chronicle truth and from future production orchestration, persistence, audit, identity, and provider adapters.

### `services/`

Independently operated capabilities should be introduced only when they require a distinct runtime, scaling profile, security boundary, language, failure domain, release cadence, legal boundary, or institutional owner. A planned service is not evidence that a separate deployment is currently justified.

### `content/`

Versioned public or synthetic product content governed by content contracts and specialist review. Content must not contain executable authority, credentials, production payloads, or hidden provider configuration.

### `fixtures/` and package fixtures

Synthetic or explicitly public evidence used to validate contracts and end-to-end behavior. Fixtures are not seed copies of production data and must remain safe to publish permanently.

### `tools/`

Repository policy, validation, migration, generation, and contributor tooling. Tools may inspect repository files but must not quietly become production-domain services.

## Domain ownership rules

### Living Chronicle

The Chronicle owns longitudinal records, values, temporal assertions, provenance, correction, conflict, source artifacts, export, and deletion contracts.

It does **not** own:

- account authentication or identity proofing;
- purpose-specific consent grants;
- access-policy decisions;
- permission explanations or comprehension evidence;
- access receipts or operational audit records;
- research enrollment;
- compensation or marketplace behavior;
- quest progression;
- narrative state;
- AI-provider behavior;
- Aster prompts, proposals, conversational memory, provider logs, or delayed-work state; or
- connector synchronization and provider-specific mappings.

Those domains may reference Chronicle identifiers through explicit contracts; they must not be folded into the Chronicle aggregate merely because they interact with health records.

### House of Keys consent

The House of Keys owns provider-independent purpose, category, grant, recipient, action, selector, duration, lifecycle, explanation, comprehension, confirmation, access-receipt, and policy-evaluation contracts.

Consent may authorize an operation over Chronicle data; it does not become Chronicle truth.

The `@calypsos-promise/house-of-keys` package:

- accepts explicit facts and returns inspectable `allow`, `deny`, or `indeterminate` decisions;
- exposes only deliberate public exports;
- has no database, provider, network, filesystem, UI, authenticated-session, or model dependency;
- does not authenticate actors, execute operations, mutate grants, consume authority, issue production receipts, or write Chronicle records; and
- contains only public or synthetic fixtures.

Future applications and adapters may orchestrate identity, lifecycle projection, persistence, enforcement, execution, and receipt delivery, but they must do so through separately accepted boundaries and may not bypass the deterministic permission contract.

### Aster contracts

Sprint 6 should create a bounded pre-stable Aster contract capability rather than extending Chronicle truth.

The clean default is a package such as `packages/aster` with a deliberate public export such as `@calypsos-promise/aster`, subject to the Sprint 6 execution plan and module-creation gate.

The Aster contract capability may own:

- role contracts for Scribe, Librarian, Wayfinder, Interpreter, and Storykeeper;
- intent, clarification, confidence, refusal, and uncertainty contracts;
- structured proposal envelopes;
- source-linked recall and explanation shapes;
- player-visible memory classes and lifecycle contracts;
- provider-egress and provider-neutral evaluation contracts;
- responsive, deferred, provider-unavailable, stale, and superseded result shapes; and
- deterministic local or synthetic adapter fixtures.

It must not own:

- canonical Chronicle records;
- House of Keys grants or decisions;
- account authentication or identity proofing;
- quest completion, rewards, or progression;
- production provider selection or model SDKs;
- arbitrary database, filesystem, queue, scheduler, network, or MCP authority;
- protected operational audit;
- or clinical conclusions.

The Aster package should remain one bounded capability until current consumers and independent change pressure justify separate gateway, contracts, safety, memory, or retrieval packages.

### Access receipts and operational audit

Player-visible access receipts and protected operational or security audit records remain related but distinct capabilities.

The Sprint 4 package defines the provider-independent person-visible receipt contract and validation boundary. It does not implement production logging, signing, sequencing, retention, monitoring, incident response, or protected audit access.

A technical log does not create permission or replace a missing receipt. A receipt does not prove a complete or tamper-resistant audit trail.

### Content and story

Content contracts own versioned narrative and educational records. The story engine may compile and evaluate allowed content relationships, but it must not infer health truth, grant permissions, or complete quests without domain evidence.

### AI and MCP

AI and MCP components are adapters and interaction layers.

- AI may create drafts, explanations, retrieval requests, and structured proposals.
- MCP may expose explicitly authorized domain capabilities.
- Neither may write directly to canonical records, change permissions, bypass confirmation, convert `indeterminate` into allow, or access a database outside domain and policy enforcement.
- Imported, retrieved, model-generated, or tool-returned content is untrusted and cannot grant itself authority.
- A delayed or provider-returned result cannot act under stale identity, intent, permission, source, policy, or record state.

The frozen transaction rule remains:

> AI proposes. The player confirms. The domain service validates and stores.

## Public API rules

Every package should:

- declare a deliberate export surface;
- avoid exposing private file layout as a contract;
- use stable domain language rather than provider terminology;
- return structured errors or validation issues rather than relying on log text;
- version externally meaningful serialized contracts independently from package versions when needed;
- keep schema versioning, compatibility, and migration behavior explicit; and
- include tests for public exports rather than only private helpers.

When a type or function is intended for package consumers, export it from the package entry point. When it is not, keep it internal and avoid downstream deep imports.

## Module creation gate

Create a package or deployable service only when all of the following are true:

1. A bounded responsibility and owner can be named.
2. The public contract can be described without referencing private implementation files.
3. The dependency direction is clear.
4. At least one real consumer or current sprint deliverable exists.
5. Synthetic fixtures or tests can validate the boundary.
6. Security, privacy, consent, accessibility, operability, and rollback implications are recorded.
7. The module does not duplicate an existing package or prematurely implement a deferred provider choice.
8. A deployable service has evidence that a package inside the modular monolith is insufficient.

Do not create placeholder packages solely to make the repository resemble the frozen target topology.

The House of Keys package met this gate through the accepted Sprint 4 deliverables, architecture, public contract, deterministic validator and evaluator, synthetic receipts and policy scenarios, tests, completion review, and explicit production non-scope.

A Sprint 6 Aster contract package will meet the gate only when its issue and plan identify the current deliverables, public contract, owner, dependency direction, synthetic evidence, security inheritance, non-AI fallback, provider non-scope, and compatibility behavior.

## Decomposition triggers

Split a file or internal module when one or more of these conditions appear:

- it contains multiple independent validation or policy domains;
- unrelated teams or sprints repeatedly edit the same file;
- a change requires loading fixtures from unrelated domains;
- one type union begins absorbing concepts owned by another bounded context;
- a provider-specific concern leaks into a provider-independent contract;
- tests cannot isolate failures to one responsibility;
- the public entry point becomes a large undifferentiated export barrel; or
- a module has more than one primary reason to change.

Line count alone is not the rule, but very large contract and validator files are a signal to inspect cohesion before adding another domain.

## Current reconciliation assessment

The current implementation has a sound package-level baseline:

- content, Living Chronicle, and House of Keys permission contracts are separate;
- deterministic validators and the policy evaluator are separate from application composition;
- tests use public synthetic fixtures;
- the House of Keys evaluator has no hidden provider, network, database, clock, session, environment, random, or model lookup;
- grants, decisions, execution, receipts, audit, Chronicle truth, and AI proposals remain separate claims;
- the site is a bounded runnable surface rather than a premature production application;
- provider, identity, enforcement, workflow, and production-data choices remain deferred; and
- accepted Decisions 0010 and 0011 preserve provider-independent inward dependency and evidence-gated complexity.

The next cleanup boundary for the Chronicle remains internal decomposition of [`packages/health-schema/src/types.ts`](../../packages/health-schema/src/types.ts) and [`packages/health-schema/src/validate.ts`](../../packages/health-schema/src/validate.ts) before materially extending those files.

The House of Keys package has internal `contract-utils`, `types`, `validate`, `evaluate`, and `fixtures` modules behind one public entry point. Future expansion should preserve that separation and split receipt, lifecycle, or taxonomy internals further if independent change pressure appears.

The content package should expose its intended graph contracts through its public entry point and keep graph compilation or runtime evaluation separate from record validation.

Sprint 6 should not use the need for Aster contracts as a reason to reopen or extend Chronicle internals. The [Pre-Sprint 6 Alignment Review](../roadmap/pre-sprint-6-alignment-review.md) is the controlling handoff.

## Pull-request review checklist

A material implementation pull request should answer:

- Which bounded capability owns this behavior?
- Is the dependency direction inward?
- Does the change use only public package exports?
- Is a new module justified by a current consumer and testable contract?
- Could this logic remain deterministic and provider-independent?
- Does AI, MCP, content, infrastructure, a provider, or a sponsor gain authority it should not have?
- Are responsive, deferred, failed, stale, corrected, superseded, and provider-unavailable states explicit where relevant?
- Are consent, access, audit, correction, export, deletion, memory, and rollback effects explicit?
- Does the change preserve synthetic-data-only public development and a complete non-AI path?
- What would cause the module to be split, replaced, contained, or rolled back?
