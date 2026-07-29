# Sprint 8.6 Record — Trust Center and Open Forge

[Current status](current-status.md) · [Sprint 8 plan](sprint-8-execution-plan.md) · [Site README](../../apps/site/README.md) · [Trust Center](../../apps/site/src/app/trust/page.tsx) · [Open Forge](../../apps/site/src/app/forge/page.tsx) · [Tracking issue #60](https://github.com/finalboss-tom/calypsos-promise/issues/60) · [Draft PR #61](https://github.com/finalboss-tom/calypsos-promise/pull/61)

- **Status:** IMPLEMENTED AND FOCUSED-VALIDATED — final repository reconciliation pending
- **Entry head:** `26eb19d2522a82bc010aa1f7da64a650a6c94dae`
- **Focused clean candidate:** `e43d0a47186041599674f6608455752a4e3b7319`
- **Application owner:** `apps/site`
- **Information boundary:** public repository records and explicitly synthetic evidence only
- **Deployment boundary:** Git-triggered deployment remains disabled; no preview or official cutover is claimed

## Purpose

Workstream 8.6 makes trust, challenge, and contributor-tool boundaries directly inspectable without creating new authority.

It establishes:

1. a public Trust Center derived from the Product Constitution, publication policy, security architecture, consumer-first decision, funding doctrine, Institutional Immune System, and current status; and
2. an Open Forge explanation derived from the merged Sprint 7 completion record and Forge architecture.

Both routes are read-only website presentations. They cannot amend upstream rights, controls, decisions, funding records, security status, tool contracts, or institutional authority.

## Trust Center result

The `/trust` route provides:

- explicit `live`, `experimental`, and `planned` evidence labels;
- the frozen player-rights floor and Seven Laws authority boundary;
- the public-software and private-personal-data boundary;
- truthful security status separating documented and synthetically exercised controls from deployed controls and independent certification;
- explicit separation among Chronicle truth, permission truth, identity, execution, receipts, protected audit, product state, AI proposals, providers, and public institutional records;
- provider and connector status that welcomes future bounded interoperability without representing any provider, EHR, connector, recommendation, ranking, or clinical workflow as live;
- accepted funding doctrine without claiming an operating treasury, legal entity, payment rail, donation runtime, accepted sponsor, provider relationship, tax status, or independent financial review;
- public challenge and correction routes using public or synthetic evidence;
- a distinct private security and accidental-disclosure route through the repository owner under `SECURITY.md`;
- explicit absence of a permanent tribunal, ombuds office, independent institutional review body, or dedicated disclosure address; and
- open production, accessibility, security, privacy, clinical, provider, financial, and institutional-review gates.

The page does not publish protected vulnerability details, private reports, credentials, personal data, contracts, negotiations, raw financial records, or operational security evidence.

## Open Forge result

The `/forge` route exposes exactly ten accepted tool identities:

1. `forge.search.lore`
2. `forge.validate.content`
3. `forge.inspect.quest-schema`
4. `forge.validate.quest`
5. `forge.search.architecture`
6. `forge.search.decision`
7. `forge.search.public-standards`
8. `forge.validate.mapping-draft`
9. `forge.search.synthetic-connector-fixtures`
10. `forge.generate.synthetic-data`

It explains:

- one local `apps/mcp-forge` application using newline-delimited UTF-8 `stdio` and MCP protocol revision `2025-11-25`;
- runtime registry revision `4` and execution contract revision `1`;
- nine server-owned source roots with exact allowlists, traversal rejection, symlink isolation, bounded reads, repository-relative locators, and SHA-256 provenance;
- bounded input, scans, results, serialized output, timeout, cancellation, one active call per tool identity, and materialization;
- `forge.invocation-receipt.v1` for scoped success and stable failure evidence;
- `forge.error.v1` for stable public-safe errors;
- receipt and error minimization excluding raw input, host paths, environment values, internal traces, credentials, protected source material, and wall-clock timestamps;
- tool-specific denials against canon approval, architecture approval, decision acceptance, permission, Chronicle truth, quest completion, rewards, mapping approval, interoperability certification, provider preference, clinical authority, production readiness, or institutional legitimacy;
- ordinary repository, issue, documentation, test, and pull-request contribution paths that do not require MCP; and
- nineteen open specialist holdpoints and eighteen unresolved-work records.

Forge remains local-only, public-and-synthetic-only, non-mutating, provider-independent, and non-authoritative.

## Explicit Forge non-scope

The route does not claim or activate:

- production deployment or official service operation;
- remote MCP, authentication, tenancy, or private-data processing;
- private Chronicle or House of Keys tools;
- repository mutation, shell, general-agent, network, provider, or connector capability;
- production process isolation, CPU or heap enforcement, distributed quota, rate limiting, monitoring, incident response, backup, recovery, or deletion verification;
- representative security, reliability, performance, cost, accessibility, usability, contributor-benefit, clinical, statistical, or publication evidence;
- production synthetic-data generation, de-identification, statistical population validity, or dataset publication; or
- independent penetration testing or specialist review.

## Navigation, metadata, and rendering

Workstream 8.6 adds `/trust` and `/forge` to:

- direct navigation;
- the optional native narrative route;
- footer navigation;
- canonical metadata; and
- the sitemap.

All essential information remains server-rendered. No `use client` boundary, animation, story traversal, model, provider, remote data source, CMS, database, or runtime fetch is required.

## Accessibility and resilience inheritance

The routes preserve:

- skip links and semantic landmarks;
- native keyboard operation and visible focus;
- responsive one-, two-, and three-column layouts;
- reduced-motion inheritance;
- reduced-data behavior;
- higher-contrast borders;
- forced-colors behavior;
- non-image essential content; and
- no-JavaScript information parity.

These are implementation foundations, not accessibility conformance certification or representative affected-user validation.

## Deterministic validation

The site validator and focused tests now require:

- both route files and presentation models;
- both navigation paths and sitemap entries;
- the Trust Center’s status distinctions, public/private reporting split, open gates, and non-certification language;
- all ten Forge tool identities;
- receipt and error schema names;
- open holdpoint and unresolved-work counts;
- ordinary non-MCP contribution paths;
- no client-component dependency;
- inherited reduced-data, contrast, and forced-colors behavior;
- paused signup without intake; and
- disabled Git-triggered deployment.

## Focused validation evidence

The first full repository pass at implementation head `bbebdfb7f38d8b5840df90c20cebd113d3b4c5c1` passed documentation links, repository policy, economics validation, content validation, lint, typecheck, and tests. Formatting differences were the only failure.

A self-removing workflow then:

1. applied canonical repository formatting;
2. passed the production site build;
3. passed site lint and deterministic validation;
4. passed site typecheck;
5. passed focused site tests;
6. restored the source-controlled TypeScript configuration;
7. removed `apps/site/tsconfig.tsbuildinfo`;
8. removed itself; and
9. committed clean candidate `e43d0a47186041599674f6608455752a4e3b7319`.

No temporary workflow, generated TypeScript build-info file, or incremental build-cache setting remains.

## Evidence limits

This record proves repository implementation, deterministic validation, and one focused production build. It does not prove:

- preview or production deployment;
- deployed security headers, cache behavior, or incident response;
- accessibility conformance or affected-user validation;
- performance release budgets;
- production security, privacy, clinical, provider, legal, financial, or operational readiness;
- independent review or certification;
- private-data operation;
- remote or production Forge operation; or
- Sprint 9 gameplay.

## Next workstream

Workstream 8.7 may implement roadmap, capability-status, support, and canonical funding-transparency views derived from approved public repository records.

It must preserve:

- the accepted page family through `/trust` and `/forge`;
- canonical source links and read-only derivative status;
- controlled evidence labels;
- funding neutrality and honest empty states;
- disabled donation, sponsorship, checkout, payment, tax, charitable, nonprofit, provider-intake, connector-placement, ranking, and transaction claims;
- server-rendered essential information;
- accessibility and resilience foundations;
- paused signup;
- disabled deployment; and
- every permanent Sprint 8 non-scope boundary.
