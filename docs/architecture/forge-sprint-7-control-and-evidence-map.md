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

This map prevents Sprint 7 completion from becoming an undifferentiated claim that “MCP security is done.”

Each control has a stable identity, bounded objective, owning evidence, current evidence status, acceptance mapping, and revalidation trigger.

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

## Control register

| ID | Control objective | Owning evidence | Current evidence | Acceptance support | Revalidation trigger |
| --- | --- | --- | --- | --- | --- |
| `CTL-FRG-001` | Forge remains one bounded local contributor-tool application rather than a product database, general agent, or institutional authority | boundary contract, execution plan, module documentation | required; designed; implemented locally; public/synthetic tested | all criteria | application owner, transport, deployment, or responsibility change |
| `CTL-FRG-002` | Exactly ten accepted tool identities remain server-owned and appear once in immutable accepted order | accepted registry, runtime registry, registry validators and tests | required; designed; implemented locally; public/synthetic tested | versioned and testable tools | tool identity, lifecycle, descriptor, order, or registry revision change |
| `CTL-FRG-003` | Tool names, schemas, risk classes, source classes, limits, receipts, errors, compatibility, and authority profiles cannot be caller- or content-controlled | boundary, registry, execution-scope, integrity, and transport validators | required; designed; implemented locally; public/synthetic tested | retrieved content cannot grant authority | registry, schema, scope, client, or authority change |
| `CTL-FRG-004` | Forge accepts only public repository information and explicitly synthetic data | source classes, source catalogue, input contracts, fixture labels | required; designed; implemented locally; public/synthetic tested | public and synthetic operation | source class, tool input, fixture, repository root, or publication change |
| `CTL-FRG-005` | Nine source roots remain server-owned, allowlisted, deterministic, and non-selectable by callers | source catalogue, path normalizer, repository adapter, tests | required; designed; implemented locally; public/synthetic tested | public and synthetic operation; protected-source exclusion | source root, path prefix, extension, access mode, or repository-layout change |
| `CTL-FRG-006` | Traversal, absolute paths, encoded traversal, prohibited files, and symlink escape fail closed without host-path disclosure | source paths, source errors, repository adapter, adversarial tests | required; designed; implemented locally; public/synthetic tested | protected-source exclusion | filesystem API, operating system, path library, repository layout, or symlink-policy change |
| `CTL-FRG-007` | Source results preserve repository-relative path, SHA-256 digest, bounded locator, source authority, and visible partial state | source provenance contracts, search tools, postconditions, tests | required; designed; implemented locally; public/synthetic tested | retrieved content remains evidence-only | provenance, digest, locator, search, truncation, or source-authority change |
| `CTL-FRG-008` | Local MCP uses pinned protocol `2025-11-25`, newline-delimited UTF-8 `stdio`, bounded framing, deterministic lifecycle, and public-safe transport errors | transport contracts, session, stdio server, harness, tests | required; designed; implemented locally; public/synthetic tested; clean-start tested | versioned and testable tools | protocol, framing, lifecycle, message limit, transport, or client-compatibility change |
| `CTL-FRG-009` | Forge exposes no remote endpoint, authentication service, network listener, provider call, credential path, repository mutation, shell, or subprocess authority | transport boundary, production-source audit, package dependencies, runtime tests | required; designed; implemented locally; public/synthetic tested; clean-start tested | public/synthetic operation; protected-source exclusion | dependency, import, transport, provider, credential, deployment, or infrastructure change |
| `CTL-FRG-010` | Lore search returns bounded source-linked evidence and cannot accept canon or create repository authority | lore search contracts, repository adapter, postconditions, tests | required; designed; implemented locally; public/synthetic tested | retrieved content cannot grant authority | content schema, canon process, search ranking, source, or result-shape change |
| `CTL-FRG-011` | Content and quest validation remains deterministic, review-requiring, non-canonical, and unable to complete gameplay or grant rewards | content-schema dependency, validation tools, non-authority contract, tests | required; designed; implemented locally; public/synthetic tested | versioned tools; non-authority | content schema, quest schema, validator, gameplay, reward, or canon change |
| `CTL-FRG-012` | Architecture and decision search preserves conservative authority classifications and exact line evidence | documentation search contracts, authority classifier, postconditions, tests | required; designed; implemented locally; public/synthetic tested | retrieved content cannot grant authority | documentation status vocabulary, decision format, classifier, or source change |
| `CTL-FRG-013` | Public standards search cannot claim completeness, certification, semantic equivalence, provider preference, or endorsement | standards contracts, search tool, postconditions, tests | required; designed; implemented locally; public/synthetic tested | protected mappings and provider neutrality | standard, implementation guide, mapping, public claim, or provider relationship change |
| `CTL-FRG-014` | Mapping validation accepts only revisioned drafts, requires deterministic validation and human review, and denies approval, equivalence, certification, provider preference, and production readiness | mapping contracts, validator, security postconditions, tests | required; designed; implemented locally; public/synthetic tested | generated mappings remain drafts | mapping schema, status, validator, review process, standard, or connector change |
| `CTL-FRG-015` | Synthetic connector search returns only explicit synthetic, credential-free, personal-data-free, non-production fixtures and exposes skipped unclassified records | connector fixture contracts, search tool, postconditions, tests | required; designed; implemented locally; public/synthetic tested | public/synthetic operation; protected-source exclusion | fixture schema, connector class, classification, credential, or source change |
| `CTL-FRG-016` | Synthetic generation is deterministic for normalized input, hashes rather than echoes the seed, uses fixed synthetic time, and immediately validates every artifact | generator contracts, generation tool, validators, tests | required; designed; implemented locally; public/synthetic tested | versioned tools; generated mappings remain drafts | generator revision, seed rules, scenario pool, schema, validator, or timestamp derivation change |
| `CTL-FRG-017` | Generated records retain synthetic, non-production, credential-free, personal-data-free, human-review-required, and literal non-authority labels | generation contracts, security postconditions, tests | required; designed; implemented locally; public/synthetic tested | public/synthetic operation; non-authority | generated family, label, output schema, validator, or intended-use change |
| `CTL-FRG-018` | Every enabled tool has one immutable execution scope derived from the accepted registry | execution contracts, scope validator, runtime integrity, tests | required; designed; implemented locally; public/synthetic tested | versioned and testable tools | accepted limit, risk class, schema, tool, scope, or runtime revision change |
| `CTL-FRG-019` | Request serialization, input bytes, files scanned, result count, complete output, timeout, cancellation, per-tool concurrency, and serialized-materialization limits are centrally enforced | execution controller, scopes, receipts, tests | required; designed; implemented locally; public/synthetic tested | bounded public/synthetic operation | limit, runtime, source size, concurrency, timeout, memory model, or tool behavior change |
| `CTL-FRG-020` | Complete, partial, truncated, cancelled, timed-out, and failed states remain distinguishable and cannot be silently promoted | source results, tool outputs, execution metrics, receipts, postconditions, tests | required; designed; implemented locally; public/synthetic tested | truthful evidence and errors | result-state vocabulary, truncation, timeout, cancellation, or error-handling change |
| `CTL-FRG-021` | Invocation receipts are server-owned, bounded, deterministic, non-authoritative, and omit raw input, host paths, environment values, traces, credentials, protected sources, and wall-clock timestamps | receipt contract, execution controller, tests | required; designed; implemented locally; public/synthetic tested | public/synthetic operation; protected-source exclusion | receipt schema, disclosure, metric, error, source, or transport change |
| `CTL-FRG-022` | Stable errors use public codes, do not echo arbitrary caller input, and cannot fabricate an accepted scope for unknown tools | stable error contract, execution controller, transport errors, tests | required; designed; implemented locally; public/synthetic tested | versioned and testable tools; protected-source exclusion | error schema, parser, source adapter, tool input, transport, or logging change |
| `CTL-FRG-023` | Runtime-integrity fingerprints detect changes to boundary, registries, catalogue, descriptors, enabled identities, and scopes before real tool operations | security postconditions, secure controller, tests | required; designed; implemented locally; public/synthetic tested | retrieved content cannot grant authority | any fingerprinted contract, serialization, runtime, or startup change |
| `CTL-FRG-024` | Successful raw results must preserve tool identity, non-authority, provenance, visible partial state, synthetic labels, mapping draft status, and tool-specific safety claims before receipt assembly | successful-result postconditions, secure controller, adversarial tests | required; designed; implemented locally; public/synthetic tested | all criteria | output schema, tool behavior, provenance, authority, mapping, or generation change |
| `CTL-FRG-025` | Compatibility remains pre-stable, exact-revision, migration-bearing, fail-closed, and unable to expand authority through ordinary migration | compatibility manifest, migration records, validators, tests | required; designed; implemented locally; public/synthetic tested | versioned and testable tools | contract, registry, protocol, schema, receipt, error, or authority change |
| `CTL-FRG-026` | Funding, providers, sponsors, credits, affiliates, and institutions cannot control tools, sources, limits, ranking, validation, generation, mappings, receipts, compatibility, publication, or governance | funding boundary, baseline validator, security matrix, tests | required; designed; implemented locally; public/synthetic tested | sponsor-funded equality and provider neutrality | funding source, provider, sponsor, affiliate, evaluator, enterprise, or infrastructure relationship change |
| `CTL-FRG-027` | Clean local startup and focused contributor validation require no credentials, provider, network, database, remote service, queue, scheduler, or Aster dependency | operability contract, child-process test, package manifest, README | required; designed; implemented locally; public/synthetic tested; clean-start tested | versioned tools; public/synthetic operation | dependency, setup, entrypoint, repository discovery, provider, or developer-workflow change |
| `CTL-FRG-028` | Capability claims remain truthful: local implementation and public tests do not become production, deployment, independent review, private-data safety, or certification claims | architecture, status, completion, holdpoint, and handoff records | required; designed | all criteria and completion integrity | public status, merge, release, deployment, provider, pilot, production, incident, or review claim change |

## Acceptance-criterion mapping

| Sprint 7 acceptance criterion | Primary controls | Evidence conclusion before founding acceptance |
| --- | --- | --- |
| Forge operates entirely on public documentation and synthetic data | `CTL-FRG-004`–`009`, `015`–`017`, `027`, `028` | met at local implementation and public/synthetic-test level |
| Retrieved content cannot grant itself tool authority | `CTL-FRG-002`, `003`, `007`, `010`, `012`, `018`, `023`, `024` | met at contract, runtime-integrity, postcondition, and adversarial-test level |
| Tool contracts are versioned and testable | `CTL-FRG-002`, `008`, `018`–`025`, `027` | met at public contract, migration, aggregate-validation, and clean-start level |
| Generated mappings remain drafts requiring deterministic validation and human review | `CTL-FRG-014`, `016`, `017`, `024` | met at validator, generator, postcondition, and public-test level |
| Sponsor-funded tools retain the same information, risk, provider-neutrality, review, and publication boundaries | `CTL-FRG-003`, `013`, `014`, `018`, `024`–`028` | met at governance-contract, integrity-validator, and adversarial-test level |
| Forge cannot access private negotiations, contracts, credentials, production endpoints, proprietary mappings, or protected findings | `CTL-FRG-004`–`009`, `021`, `022`, `026`, `027` | met at source allowlist, prohibited-path, static-audit, disclosure, and adversarial-test level |

The evidence package supports the criteria. Their final acceptance remains a founding-steward decision recorded through issue #54 and PR #55.

## Inherited and future holdpoints

Sprint 7 narrows the public/synthetic portion of inherited MCP holdpoint `HLD-S6-013`. It does not close that holdpoint for private Chronicle tools, remote agents, provider tools, authentication, production deployment, consequential actions, or independent review.

The detailed inherited and Forge-specific holdpoints remain in the [Specialist Holdpoint and Unresolved-Work Register](forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md).

## Cross-control invariants

1. The software is open; the person's health data is private.
2. MCP is an adapter over bounded capabilities, not the product database or authority source.
3. Repository source evidence, canon, Chronicle truth, permission truth, mappings, tool state, receipts, gameplay, provider state, and institutional decisions remain distinct claims.
4. Retrieved, caller-supplied, generated, prior-tool, provider, and sponsor content remains untrusted data.
5. Missing, partial, truncated, stale, cancelled, timed-out, altered, incompatible, unsupported, prohibited, unavailable, or unknown state fails safely.
6. Public and synthetic evidence cannot authorize private data, production capability, provider approval, clinical behavior, deployment, or specialist certification.
7. Ordinary contribution remains complete without MCP, a provider, a model, credentials, or sponsor-funded infrastructure.
8. Funding, providers, sponsors, credits, affiliates, or institutions cannot buy tool authority, source rank, findings, publication, exceptions, progression, or governance.

## Closure rule

A control is not promoted because a TypeScript contract is comprehensive, a local controller enforces a postcondition, CI is green, a synthetic fixture behaves as expected, an adversarial test passes, a provider offers credits, a sponsor funds work, a founding steward accepts Sprint 7, or no incident has been observed.

Higher evidence status requires the named deployment, operational, affected-user, specialist, independent, or institutional evidence appropriate to the claim.
