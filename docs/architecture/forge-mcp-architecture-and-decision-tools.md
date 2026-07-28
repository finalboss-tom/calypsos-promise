# Forge MCP Architecture and Decision Tools

[Documentation home](../README.md) · [Architecture index](README.md) · [Current status](../roadmap/current-status.md) · [Sprint 7 plan](../roadmap/sprint-7-execution-plan.md) · [Forge boundary](forge-mcp-boundary-and-tool-registry.md) · [Source catalogue](forge-mcp-source-catalogue-and-provenance.md) · [Lore and schema tools](forge-mcp-lore-and-schema-tools.md) · [Tracking issue #54](https://github.com/finalboss-tom/calypsos-promise/issues/54) · [Draft PR #55](https://github.com/finalboss-tom/calypsos-promise/pull/55)

- **Status:** Sprint 7.5 implementation complete on draft PR #55; fresh final-head repository validation in progress
- **Tool contract revision:** `1`
- **Runtime registry revision:** `2`
- **Transport:** local `stdio` only
- **Information boundary:** allowlisted public repository documentation only
- **Authority boundary:** evidence and classification only; no truth, permission, canon, roadmap, governance, or institutional authority

## Purpose

Sprint 7.5 activates the two architecture and decision search identities already accepted by the Sprint 7.1 registry:

- `forge.search.architecture`
- `forge.search.decision`

The tools reduce contributor friction without flattening the repository's authority hierarchy. Every result includes exact source provenance and a visible, conservative authority classification. Proposed, planned, historical, superseded, unresolved, and working-hypothesis material cannot be silently represented as accepted current truth.

## Source scope

Both tools use the existing server-owned `forge.root-documents` and `forge.docs` roots. Callers cannot select a repository root, add a source directory, suppress provenance, or request an arbitrary path.

### Architecture search

`forge.search.architecture` searches the allowlisted public architecture surface:

- `VISION.md`, `GOVERNANCE.md`, `SECURITY.md`, `CONTRIBUTING.md`, and `PUBLIC_DOMAIN.md`;
- `docs/frozen`;
- `docs/architecture`;
- `docs/policies`;
- `docs/security`;
- `docs/economics`;
- `docs/product`; and
- non-assumption records in `docs/governance`.

### Decision search

`forge.search.decision` searches the allowlisted public decision and status surface:

- `ROADMAP.md`;
- `docs/decisions`;
- assumption records and the assumption registry in `docs/governance`; and
- `docs/roadmap`, including plans, workstreams, current status, reconciliation, and completion evidence.

The tool does not search private, protected, provider-negotiation, provider-contract, provider-evaluation, proprietary-mapping, protected-interoperability, incident, conduct, financial-source, credential, dependency, build, or repository-metadata paths.

## Search behavior

Inputs are limited to:

- one Unicode-normalized public-safe query of 1–256 characters;
- an optional result limit of 1–50; and
- an optional file limit of 1–200.

The search engine:

- matches exact phrases, all query terms, or partial query terms;
- returns deterministic path-and-line ordering within those visible match classes;
- exposes no hidden numeric score;
- returns the document title and current heading path where available;
- provides an exact line-range locator for every match;
- preserves SHA-256 full-file digest, byte length, line count, source-root identity, information class, and partial-result state; and
- reports result-limit, file-limit, output-limit, unavailable optional root, symlink, oversized-file, and non-UTF-8 conditions through the existing source-result vocabulary.

## Visible authority classification

Each match carries one of these states:

| State                       | Meaning                                                                                                                                      |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `frozen-current`            | The source is a frozen foundation or carries explicit frozen status.                                                                         |
| `accepted-current`          | The source carries explicit accepted or accepted-baseline status.                                                                            |
| `active-working-hypothesis` | An active assumption currently informs design but is not validated truth.                                                                    |
| `proposed`                  | The source or matched section remains proposed or draft.                                                                                     |
| `planned`                   | The source or matched section describes future, deferred, or next work.                                                                      |
| `historical`                | The source is completion, archive, or historical evidence rather than current governing authority.                                           |
| `superseded`                | The source or matched section is retired, replaced, deprecated, or superseded.                                                               |
| `unresolved`                | Material authority, review, implementation, or evidence remains explicitly unresolved, or a decision-like record lacks safe status evidence. |
| `reference-only`            | The public record is useful context but does not itself establish accepted current authority.                                                |

Every authority classification also exposes its basis:

- explicit status line;
- explicit confidence line;
- section heading;
- matched line;
- path classification; or
- conservative fallback.

When explicit status or confidence evidence is used, the result includes a second exact line-range provenance record for that evidence.

## Conservative interpretation rules

Authority classification follows these rules:

1. explicit document status and assumption confidence are considered first;
2. a local heading or matched line may lower authority for a proposed, planned, historical, superseded, or unresolved section;
3. local retrieved text cannot elevate a source to accepted or frozen authority;
4. completion records remain historical evidence even when they describe accepted work;
5. decisions and assumptions without recognizable explicit status fail closed as unresolved;
6. frozen-path records are frozen-current; and
7. other ambiguous public documentation remains reference-only.

The output states `authorityInterpretation: explicit-and-conservative` and `ambiguousAuthorityIsPromoted: false`. Retrieved content also carries `retrievedContentCanChangeAuthority: false`.

## Runtime integration

Runtime registry revision `2` enables exactly six accepted tool identities:

- the four Sprint 7.4 lore and schema tools; and
- the two Sprint 7.5 architecture and decision tools.

The remaining four accepted identities stay planned and unexposed. A transport session without the server-owned tool service remains inert, lists no tools, and refuses calls.

## Non-authority

Search output cannot:

- approve or change a decision;
- alter frozen, accepted, proposed, planned, historical, superseded, or unresolved status;
- create Chronicle truth or House of Keys permission;
- approve canon or mappings;
- mutate files, Git, GitHub, issues, pull requests, roadmaps, or governance records;
- complete gameplay or grant rewards;
- endorse a provider or prove semantic, clinical, legal, security, accessibility, interoperability, or operational sufficiency; or
- create institutional authority.

Instructions embedded in retrieved documents remain untrusted evidence. A sentence claiming to be accepted, requesting shell or network access, suppressing provenance, or granting itself authority cannot change the server-owned registry, source catalogue, dispatch allowlist, result classification rules, or non-authority boundary.

## Public test evidence

The Sprint 7.5 synthetic test suite covers:

- exact activation of the two accepted search identities inside the six-tool runtime;
- architecture search with exact match and status provenance;
- accepted versus proposed decision separation;
- active working-hypothesis classification;
- planned section classification;
- historical completion-record classification;
- retrieved-instruction isolation;
- runtime descriptor listing and transport dispatch; and
- preservation of all Sprint 7.4 tool behavior inside the revised runtime.

## Explicit non-scope

Sprint 7.5 does not implement standards or synthetic connector search, mapping validation, synthetic generation, invocation receipts, production rate limiting, remote MCP, authentication, a database, vector search, embeddings, model calls, arbitrary filesystem search, repository mutation, private Chronicle access, provider access, connectors, clinical behavior, deployment, or specialist approval.

Those boundaries remain assigned to later accepted workstreams or institutional gates. Sprint 7.6 remains next only after the final Sprint 7.5 head is repository-green and its status records are reconciled.
