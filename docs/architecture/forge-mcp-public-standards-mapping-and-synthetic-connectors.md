# Forge MCP Public Standards, Mapping Drafts, and Synthetic Connector Fixtures

[Documentation home](../README.md) · [Architecture index](README.md) · [Current status](../roadmap/current-status.md) · [Sprint 7 plan](../roadmap/sprint-7-execution-plan.md) · [Forge boundary](forge-mcp-boundary-and-tool-registry.md) · [Source catalogue](forge-mcp-source-catalogue-and-provenance.md) · [Architecture and decision tools](forge-mcp-architecture-and-decision-tools.md) · [Public standards boundary](../standards/README.md) · [Tracking issue #54](https://github.com/finalboss-tom/calypsos-promise/issues/54) · [Draft PR #55](https://github.com/finalboss-tom/calypsos-promise/pull/55)

- **Status:** Sprint 7.6 implementation on draft PR #55; final combined validation pending
- **Tool contract revision:** `1`
- **Runtime registry revision:** `3`
- **Transport:** local `stdio` only
- **Information boundary:** allowlisted public standards references, public mapping drafts, and explicitly synthetic connector fixtures only
- **Authority boundary:** evidence and structural validation only; no mapping approval, certification, provider preference, connector activation, production readiness, or institutional authority

## Purpose

Sprint 7.6 activates the three standards and fixture identities already accepted by the Sprint 7.1 registry:

- `forge.search.public-standards`;
- `forge.validate.mapping-draft`; and
- `forge.search.synthetic-connector-fixtures`.

The tools help contributors inspect public standards references, test bounded mapping-draft structure, and find synthetic connector examples without introducing provider calls, endpoint access, protected mappings, credentials, production data, or connector runtime behavior.

## Runtime integration

Runtime registry revision `3` enables exactly nine accepted identities:

- the four Sprint 7.4 lore and schema tools;
- the two Sprint 7.5 architecture and decision tools; and
- the three Sprint 7.6 standards, mapping-draft, and synthetic-fixture tools.

`forge.generate.synthetic-data` remains planned and unexposed until Sprint 7.7 establishes its separate reproducibility, labeling, validation, diversity, and non-authority contracts.

A transport session without the server-owned tool service remains inert, lists no tools, and refuses tool calls.

## Public standards search

`forge.search.public-standards` searches only the server-owned `forge.public-standards` source root. The accepted root is limited to allowlisted public material under `docs/sources`, `docs/standards`, `docs/architecture`, and `docs/product`.

Inputs are limited to:

- one Unicode-normalized public-safe query of 1–256 characters;
- an optional result limit of 1–50; and
- an optional file limit of 1–200.

Each result includes:

- an exact line-range locator;
- full-file SHA-256 provenance;
- source-root and information-class identity;
- deterministic exact-phrase, all-term, or partial-term matching;
- visible complete, partial, or truncated state; and
- standards metadata when the public record explicitly provides an ID or version.

Search output states that certification and completeness are not established, provider preference is `none`, and the network was not used. A successful search is not evidence that the source set is comprehensive, current for every use case, conformant with a profile, correctly implemented, clinically safe, or production-ready.

## Mapping-draft validation

`forge.validate.mapping-draft` accepts exactly one:

- bounded inline record explicitly classified as `public-standards-reference` or `public-synthetic-fixture`; or
- allowlisted JSON source beneath the public standards root.

Revision `1` requires:

- `kind: "mapping-draft"`;
- `status: "draft"`;
- bounded public-safe identity and title;
- a versioned source-standard identity and public reference;
- a versioned target-model identity;
- one to one hundred unique mapping entries;
- accepted bounded transform and confidence classes;
- optional synthetic evidence that remains `evidenceOnly`;
- human review requirements including interoperability and semantic review; and
- explicit non-authority claims.

The required claims are:

- mapping approval — `not-granted`;
- semantic equivalence — `not-proven`;
- connector behavior — `not-proven`;
- certification — `not-granted`;
- production readiness — `not-established`; and
- provider preference — `none`.

The validator rejects approval, certification, production-readiness, provider-default, or preferred-provider fields. Passing validation proves only compliance with this public structural contract. It cannot approve the mapping, prove conceptual equivalence, validate a real connector, certify interoperability, create a provider relationship, or establish production readiness.

## Synthetic connector fixture search

`forge.search.synthetic-connector-fixtures` searches only the server-owned `forge.synthetic-connectors` source root at `fixtures/connectors`.

A record is eligible only when it explicitly states:

- `synthetic: true`;
- `informationClass: "public-synthetic-connector-fixture"`;
- `productionReady: false`;
- `containsCredentials: false`; and
- `containsPersonalData: false`.

Unparseable or unclassified records are skipped and surfaced through the visible `unclassified-fixture-skipped` partial reason. Eligible results include exact object-identity provenance and repeat the non-production, credential-free, personal-data-free classification.

Fixture search does not call a provider, authenticate, use the network, activate a connector, approve a mapping, prove production behavior, or establish provider preference.

## Public evidence

Sprint 7.6 includes a deliberately narrow public evidence set:

- a pinned HL7 FHIR R4 `4.0.1` public reference;
- one public revision-1 draft mapping from a synthetic FHIR Observation shape toward a Living Chronicle candidate shape; and
- one fictional, explicitly synthetic FHIR Observation connector fixture.

The example is not connected to a person, provider, endpoint, account, credential, or production system. It is structural evidence only and does not claim FHIR profile conformance, semantic equivalence, clinical correctness, certification, connector operation, or production readiness.

## Prompt-injection and confused-authority boundary

Retrieved standards text, mapping fields, fixture payloads, and embedded instructions remain untrusted data. They cannot:

- register or enable tools;
- alter the runtime registry or source catalogue;
- select repository roots or arbitrary paths;
- suppress provenance or partial states;
- permit shell, network, provider, credential, or repository access;
- approve their own mapping;
- claim certification or production readiness;
- select a provider;
- create Chronicle truth or House of Keys permission; or
- create institutional authority.

## Public test evidence

The Sprint 7.6 synthetic test suite covers:

- exact activation of the three accepted identities inside the nine-tool runtime;
- preservation of all six previously validated tool identities;
- source-linked standards search and visible non-certification claims;
- valid inline and allowlisted mapping drafts;
- rejection of approval, certification, production, and provider-preference claims;
- fail-closed inline classification;
- explicit synthetic-only connector search;
- skipped unclassified fixture evidence;
- retrieved-instruction isolation; and
- transport discovery and dispatch.

## Explicit non-scope

Sprint 7.6 does not implement synthetic generation, network access, remote MCP, authentication, FHIR client behavior, provider endpoints, connector execution, production data import, proprietary mappings, protected interoperability findings, conformance testing, certification, terminology services, clinical validation, production deployment, or independent specialist approval.

Those boundaries remain assigned to later accepted workstreams or institutional gates.
