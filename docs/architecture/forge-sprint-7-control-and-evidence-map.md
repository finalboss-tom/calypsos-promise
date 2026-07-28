# Sprint 7 Forge Control and Evidence Map

[Architecture index](README.md) · [Cross-contract reconciliation](forge-sprint-7-cross-contract-reconciliation.md) · [Specialist holdpoints and unresolved work](forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md) · [Completion record](../roadmap/sprint-7-completion-record.md) · [Pre-Sprint 8 review](../roadmap/pre-sprint-8-alignment-review.md)

- **Status:** READY FOR FOUNDING-STEWARD REVIEW — local public/synthetic implementation evidence only
- **Application:** `apps/mcp-forge`
- **Accepted registry revision:** `1`
- **Runtime registry revision:** `4`
- **Execution contract revision:** `1`
- **Reviewed implementation head:** `32492040684c2a89e32c866888f6be0888ee1279`
- **Scope:** stable control objectives, owning evidence, evidence status, acceptance support, and revalidation triggers

## Purpose

This map prevents Sprint 7 completion from becoming an undifferentiated claim that “MCP security is done.” Each control has a stable identity, bounded objective, owning evidence, current evidence status, acceptance relationship, and revalidation trigger.

## Evidence vocabulary

- **REQUIRED:** demanded by frozen commitments, accepted decisions, inherited security controls, or Sprint 7 acceptance criteria.
- **DESIGNED:** expressed as an inspectable contract, architecture rule, lifecycle, validator, or failure state.
- **IMPLEMENTED LOCALLY:** enforced in the bounded local Forge runtime or source repository adapter.
- **PUBLIC/SYNTHETIC TESTED:** exercised through deterministic public or explicitly synthetic tests through the public application surface.
- **CLEAN-START TESTED:** exercised through the compiled local `stdio` entrypoint without credentials or providers.
- **DEPLOYED:** running in an identified official environment under declared operational controls.
- **OPERATIONALLY VERIFIED:** measured in representative operation with current operational evidence.
- **INDEPENDENTLY REVIEWED:** reviewed by a named qualified reviewer outside proposing and implementing authority.

Sprint 7 establishes the first five statuses where named below. It does not establish deployment, representative operation, or independent review.

## Boundary and authority controls

### `CTL-FRG-001` — Bounded application ownership

Forge remains one local contributor-tool application rather than a product database, general agent, or institutional authority.

- **Evidence:** boundary contract, execution plan, module documentation.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** all Sprint 7 criteria.
- **Revalidate when:** application ownership, transport, deployment, or responsibility changes.

### `CTL-FRG-002` — Immutable accepted tool set

Exactly ten accepted tool identities remain server-owned and appear once in immutable accepted order.

- **Evidence:** accepted registry, runtime registry, registry validators, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** versioned and testable tools.
- **Revalidate when:** tool identity, lifecycle, descriptor, ordering, or registry revision changes.

### `CTL-FRG-003` — Server-owned contracts and authority

Tool names, schemas, risk classes, source classes, limits, receipts, errors, compatibility, and authority profiles cannot be caller- or content-controlled.

- **Evidence:** boundary, registry, execution-scope, integrity, and transport validators.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** retrieved content cannot grant authority.
- **Revalidate when:** registry, schema, scope, client, or authority changes.

### `CTL-FRG-004` — Public and synthetic information only

Forge accepts only public repository information and explicitly synthetic data.

- **Evidence:** source classes, source catalogue, input contracts, fixture labels.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** public and synthetic operation.
- **Revalidate when:** source class, tool input, fixture, repository root, or publication policy changes.

## Source and provenance controls

### `CTL-FRG-005` — Server-owned source roots

Nine source roots remain server-owned, allowlisted, deterministic, and non-selectable by callers.

- **Evidence:** source catalogue, path normalizer, repository adapter, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** public/synthetic operation and protected-source exclusion.
- **Revalidate when:** root, prefix, extension, access mode, or repository layout changes.

### `CTL-FRG-006` — Path and symlink isolation

Traversal, absolute paths, encoded traversal, prohibited files, and symlink escape fail closed without host-path disclosure.

- **Evidence:** source paths, source errors, repository adapter, adversarial tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** protected-source exclusion.
- **Revalidate when:** filesystem API, operating system, path library, layout, or symlink policy changes.

### `CTL-FRG-007` — Exact source evidence

Source results preserve repository-relative path, SHA-256 digest, bounded locator, source authority, and visible partial state.

- **Evidence:** provenance contracts, search tools, postconditions, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** retrieved content remains evidence-only.
- **Revalidate when:** provenance, digest, locator, search, truncation, or source authority changes.

## Transport and prohibited-capability controls

### `CTL-FRG-008` — Pinned local MCP transport

Local MCP uses protocol `2025-11-25`, newline-delimited UTF-8 `stdio`, bounded framing, deterministic lifecycle, and public-safe transport errors.

- **Evidence:** transport contracts, session, stdio server, harness, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested; clean-start tested.
- **Supports:** versioned and testable tools.
- **Revalidate when:** protocol, framing, lifecycle, message limit, transport, or client compatibility changes.

### `CTL-FRG-009` — No remote, provider, shell, or mutation authority

Forge exposes no remote endpoint, authentication service, network listener, provider call, credential path, repository mutation, shell, or subprocess authority.

- **Evidence:** transport boundary, production-source audit, package dependencies, runtime tests.
- **Status:** required; designed; implemented locally; public/synthetic tested; clean-start tested.
- **Supports:** public/synthetic operation and protected-source exclusion.
- **Revalidate when:** dependencies, imports, transport, providers, credentials, deployment, or infrastructure changes.

## Tool-specific controls

### `CTL-FRG-010` — Lore evidence remains non-canonical

Lore search returns bounded source-linked evidence and cannot accept canon or create repository authority.

- **Evidence:** lore contracts, repository adapter, postconditions, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** retrieved content cannot grant authority.
- **Revalidate when:** content schema, canon process, ranking, source, or output changes.

### `CTL-FRG-011` — Content and quest validation remains non-authoritative

Content and quest validation remains deterministic, review-requiring, non-canonical, and unable to complete gameplay or grant rewards.

- **Evidence:** content-schema dependency, validation tools, non-authority contract, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** versioned tools and non-authority.
- **Revalidate when:** content or quest schema, validator, gameplay, reward, or canon changes.

### `CTL-FRG-012` — Conservative documentation authority

Architecture and decision search preserves conservative authority classifications and exact line evidence.

- **Evidence:** documentation search contracts, authority classifier, postconditions, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** retrieved content cannot grant authority.
- **Revalidate when:** status vocabulary, decision format, classifier, or source changes.

### `CTL-FRG-013` — Standards remain references, not certification

Public standards search cannot claim completeness, certification, semantic equivalence, provider preference, or endorsement.

- **Evidence:** standards contracts, search tool, postconditions, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** protected mappings and provider neutrality.
- **Revalidate when:** a standard, implementation guide, mapping, public claim, or provider relationship changes.

### `CTL-FRG-014` — Mappings remain reviewable drafts

Mapping validation accepts only revisioned drafts, requires deterministic validation and human review, and denies approval, equivalence, certification, provider preference, and production readiness.

- **Evidence:** mapping contracts, validator, security postconditions, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** generated mappings remain drafts.
- **Revalidate when:** mapping schema, status, validator, review process, standard, or connector changes.

### `CTL-FRG-015` — Connector fixtures remain explicitly synthetic

Synthetic connector search returns only explicit synthetic, credential-free, personal-data-free, non-production fixtures and exposes skipped unclassified records.

- **Evidence:** fixture contracts, search tool, postconditions, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** public/synthetic operation and protected-source exclusion.
- **Revalidate when:** fixture schema, connector class, classification, credentials, or source changes.

### `CTL-FRG-016` — Deterministic synthetic generation

Synthetic generation is deterministic for normalized input, hashes rather than echoes the seed, uses fixed synthetic time, and immediately validates every artifact.

- **Evidence:** generator contracts, generation tool, validators, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** versioned tools and draft mappings.
- **Revalidate when:** generator revision, seed rules, scenario pool, schema, validator, or timestamp derivation changes.

### `CTL-FRG-017` — Generated labels and non-authority

Generated records retain synthetic, non-production, credential-free, personal-data-free, human-review-required, and literal non-authority labels.

- **Evidence:** generation contracts, security postconditions, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** public/synthetic operation and non-authority.
- **Revalidate when:** generated family, labels, output schema, validator, or intended use changes.

## Execution, receipt, and error controls

### `CTL-FRG-018` — Immutable execution scopes

Every enabled tool has one immutable execution scope derived from the accepted registry.

- **Evidence:** execution contracts, scope validator, runtime integrity, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** versioned and testable tools.
- **Revalidate when:** limits, risk class, schema, tool, scope, or runtime revision changes.

### `CTL-FRG-019` — Central resource enforcement

Request serialization, input bytes, files scanned, result count, complete output, timeout, cancellation, per-tool concurrency, and serialized-materialization limits are centrally enforced.

- **Evidence:** execution controller, scopes, receipts, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** bounded public/synthetic operation.
- **Revalidate when:** limits, runtime, source size, concurrency, timeout, memory model, or tool behavior changes.

### `CTL-FRG-020` — Stable visible result states

Complete, partial, truncated, cancelled, timed-out, and failed states remain distinguishable and cannot be silently promoted.

- **Evidence:** source results, tool outputs, execution metrics, receipts, postconditions, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** truthful evidence and errors.
- **Revalidate when:** state vocabulary, truncation, timeout, cancellation, or error handling changes.

### `CTL-FRG-021` — Bounded public-safe receipts

Invocation receipts are server-owned, bounded, deterministic, non-authoritative, and omit raw input, host paths, environment values, traces, credentials, protected sources, and wall-clock timestamps.

- **Evidence:** receipt contract, execution controller, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** public/synthetic operation and protected-source exclusion.
- **Revalidate when:** receipt schema, disclosures, metrics, errors, sources, or transport changes.

### `CTL-FRG-022` — Stable public-safe errors

Stable errors use public codes, do not echo arbitrary caller input, and cannot fabricate an accepted scope for unknown tools.

- **Evidence:** error contract, execution controller, transport errors, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** versioned tools and protected-source exclusion.
- **Revalidate when:** error schema, parser, source adapter, tool input, transport, or logging changes.

## Security, compatibility, and operability controls

### `CTL-FRG-023` — Runtime contract integrity

Runtime-integrity fingerprints detect changes to the boundary, registries, catalogue, descriptors, enabled identities, and scopes before real tool operations.

- **Evidence:** security postconditions, secure controller, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** retrieved content cannot grant authority.
- **Revalidate when:** any fingerprinted contract, serialization, runtime, or startup behavior changes.

### `CTL-FRG-024` — Successful-result security postconditions

Successful raw results must preserve tool identity, non-authority, provenance, visible partial state, synthetic labels, mapping draft status, and tool-specific safety claims before receipt assembly.

- **Evidence:** successful-result postconditions, secure controller, adversarial tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** all Sprint 7 criteria.
- **Revalidate when:** output schema, tool behavior, provenance, authority, mapping, or generation changes.

### `CTL-FRG-025` — Exact compatibility and migration

Compatibility remains pre-stable, exact-revision, migration-bearing, fail-closed, and unable to expand authority through ordinary migration.

- **Evidence:** compatibility manifest, migration records, validators, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** versioned and testable tools.
- **Revalidate when:** contract, registry, protocol, schema, receipt, error, or authority changes.

### `CTL-FRG-026` — Funding and provider neutrality

Funding, providers, sponsors, credits, affiliates, and institutions cannot control tools, sources, limits, ranking, validation, generation, mappings, receipts, compatibility, publication, or governance.

- **Evidence:** funding boundary, baseline validator, security matrix, tests.
- **Status:** required; designed; implemented locally; public/synthetic tested.
- **Supports:** sponsor-funded equality and provider neutrality.
- **Revalidate when:** a funding source, provider, sponsor, affiliate, evaluator, enterprise, or infrastructure relationship changes.

### `CTL-FRG-027` — Clean provider-independent contributor operation

Clean local startup and focused validation require no credentials, provider, network, database, remote service, queue, scheduler, or Aster dependency.

- **Evidence:** operability contract, child-process test, package manifest, README.
- **Status:** required; designed; implemented locally; public/synthetic tested; clean-start tested.
- **Supports:** versioned tools and public/synthetic operation.
- **Revalidate when:** dependencies, setup, entrypoint, repository discovery, provider, or developer workflow changes.

### `CTL-FRG-028` — Truthful capability status

Local implementation and public tests do not become production, deployment, independent review, private-data safety, or certification claims.

- **Evidence:** architecture, status, completion, holdpoint, and handoff records.
- **Status:** required; designed.
- **Supports:** all criteria and completion integrity.
- **Revalidate when:** public status, merge, release, deployment, provider, pilot, production, incident, or review claims change.

## Acceptance-criterion mapping

### Public and synthetic operation

Primary controls: `CTL-FRG-004`–`009`, `015`–`017`, `027`, and `028`.

**Conclusion before founding acceptance:** met at local implementation and public/synthetic-test level.

### Retrieved content cannot grant authority

Primary controls: `CTL-FRG-002`, `003`, `007`, `010`, `012`, `018`, `023`, and `024`.

**Conclusion before founding acceptance:** met at contract, runtime-integrity, postcondition, and adversarial-test level.

### Versioned and testable tools

Primary controls: `CTL-FRG-002`, `008`, `018`–`025`, and `027`.

**Conclusion before founding acceptance:** met at public contract, migration, aggregate-validation, and clean-start level.

### Draft mappings with deterministic validation and human review

Primary controls: `CTL-FRG-014`, `016`, `017`, and `024`.

**Conclusion before founding acceptance:** met at validator, generator, postcondition, and public-test level.

### Equal boundaries for sponsor-funded tools

Primary controls: `CTL-FRG-003`, `013`, `014`, `018`, and `024`–`028`.

**Conclusion before founding acceptance:** met at governance-contract, integrity-validator, and adversarial-test level.

### Protected information remains inaccessible

Primary controls: `CTL-FRG-004`–`009`, `021`, `022`, `026`, and `027`.

**Conclusion before founding acceptance:** met at source-allowlist, prohibited-path, static-audit, disclosure, and adversarial-test level.

The evidence package supports the criteria. Their final acceptance remains a founding-steward decision recorded through issue #54 and PR #55.

## Inherited and future holdpoints

Sprint 7 narrows the public/synthetic portion of inherited MCP holdpoint `HLD-S6-013`. It does not close that holdpoint for private Chronicle tools, remote agents, provider tools, authentication, production deployment, consequential actions, or independent review.

The detailed inherited and Forge-specific holdpoints remain in the [Specialist Holdpoint and Unresolved-Work Register](forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md).

## Cross-control invariants

1. The software is open; the person's health data is private.
2. MCP is an adapter over bounded capabilities, not the product database or authority source.
3. Repository evidence, canon, Chronicle truth, permission truth, mappings, tool state, receipts, gameplay, provider state, and institutional decisions remain distinct claims.
4. Retrieved, caller-supplied, generated, prior-tool, provider, and sponsor content remains untrusted data.
5. Missing, partial, truncated, stale, cancelled, timed-out, altered, incompatible, unsupported, prohibited, unavailable, or unknown state fails safely.
6. Public and synthetic evidence cannot authorize private data, production capability, provider approval, clinical behavior, deployment, or specialist certification.
7. Ordinary contribution remains complete without MCP, a provider, a model, credentials, or sponsor-funded infrastructure.
8. Funding, providers, sponsors, credits, affiliates, or institutions cannot buy tool authority, source rank, findings, publication, exceptions, progression, or governance.

## Closure rule

A control is not promoted because a TypeScript contract is comprehensive, a local controller enforces a postcondition, CI is green, a synthetic fixture behaves as expected, an adversarial test passes, a provider offers credits, a sponsor funds work, a founding steward accepts Sprint 7, or no incident has been observed.

Higher evidence status requires the named deployment, operational, affected-user, specialist, independent, or institutional evidence appropriate to the claim.
