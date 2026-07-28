# Forge MCP Deterministic Synthetic Generation

[Documentation home](../README.md) · [Architecture index](README.md) · [Current status](../roadmap/current-status.md) · [Sprint 7 plan](../roadmap/sprint-7-execution-plan.md) · [Forge boundary](forge-mcp-boundary-and-tool-registry.md) · [Lore and schema tools](forge-mcp-lore-and-schema-tools.md) · [Standards and mapping tools](forge-mcp-public-standards-mapping-and-synthetic-connectors.md) · [Tracking issue #54](https://github.com/finalboss-tom/calypsos-promise/issues/54) · [Draft PR #55](https://github.com/finalboss-tom/calypsos-promise/pull/55)

- **Status:** COMPLETE at the public-contract and synthetic-evidence level
- **Tool:** `forge.generate.synthetic-data`
- **Tool contract revision:** `1`
- **Generator:** `forge.synthetic.generator`
- **Generator revision:** `1`
- **Runtime registry revision:** `4`
- **Transport:** local `stdio` only
- **Information boundary:** contributor-supplied public-safe seed plus server-owned synthetic scenario catalogues and deterministic validators
- **Authority boundary:** synthetic draft generation only; no repository write, canon, mapping approval, clinical use, provider selection, connector activation, gameplay, permission, or institutional authority

## Purpose

Sprint 7.7 activates the final identity already accepted by the Sprint 7.1 registry: `forge.generate.synthetic-data`.

The tool gives contributors reproducible public test records without requiring production health information, credentials, provider access, network calls, mutable repository state, current time, or nondeterministic randomness. It generates two bounded artifact families:

- synthetic quest drafts validated through `@calypsos-promise/content-schema`; and
- synthetic mapping drafts validated through `forge.validate.mapping-draft`.

Generation is an optional contributor convenience. The ordinary repository workflow remains complete without MCP.

## Runtime integration

Runtime registry revision `4` exposes all ten identities accepted by the immutable Sprint 7.1 registry in their accepted order.

The prior runtime surfaces remain nested and unchanged:

- the six lore, schema, architecture, and decision identities validated through Sprint 7.5;
- the three standards, mapping-draft, and synthetic-connector identities added in Sprint 7.6; and
- the deterministic generation identity added in Sprint 7.7.

A transport session without the server-owned tool service remains inert, lists no tools, and refuses tool calls.

## Input contract

The tool accepts exactly:

- `kind`: `quest` or `mapping-draft`;
- `seed`: one Unicode-normalized public-safe string of 1–128 characters;
- optional `count`: an integer from 1–25, defaulting to 4; and
- optional `profile`: `balanced`, `accessibility`, or `edge-cases`, defaulting to `balanced`.

Unknown fields, unsupported kinds or profiles, control characters, oversized seeds, non-integer counts, and counts outside the accepted range fail closed with public-safe errors.

A syntactically public-safe seed is not proof that private information is appropriate input. Contributors remain responsible for using only public or explicitly synthetic material. The seed is not repeated in output; the result contains a SHA-256 seed digest.

## Determinism and reproducibility

The generator derives every case from:

- the normalized seed;
- artifact kind;
- generation profile;
- zero-based case index;
- generator identity and revision; and
- fixed server-owned scenario catalogues.

The same accepted input produces byte-equivalent structured output under generator revision `1`. Different seeds produce different case identities. Quest timestamps are derived from a fixed synthetic epoch and case digest rather than wall-clock time.

The generator does not use:

- `Math.random` or another random source;
- current time;
- network access;
- model or provider calls;
- credentials;
- production endpoints;
- arbitrary filesystem reads; or
- repository writes.

A future scenario, schema, validation, or generation change requires an explicit revision or compatibility decision rather than silently changing the meaning of revision `1`.

## Synthetic quest family

Quest generation creates draft, experimental, fictional `QuestContent` records with:

- explicit synthetic and Forge-generated tags;
- empty canon references and dependencies;
- deterministic fictional identifiers and timestamps;
- no review approvals;
- meaningful deferral and refusal paths;
- synthetic-only data categories;
- no permission-purpose claim;
- a general safety classification; and
- literal statements that no Chronicle, permission, gameplay, or institutional state changes.

The server-owned scenario catalogue includes:

- daily reflection;
- plain-language review;
- screen-reader sequence;
- reduced-motion interaction;
- low-dexterity interaction;
- decline-and-return behavior; and
- minimal-duration behavior.

The accessibility profile selects only accessibility-relevant cases. The edge-case profile selects decline-and-return and minimal-duration cases. The balanced profile may exercise any accepted scenario.

Each quest is immediately passed through `validateContent`. The tool fails safely rather than returning a quest that does not satisfy the accepted content contract.

## Synthetic mapping-draft family

Mapping generation creates revision-1 records with:

- `kind: "mapping-draft"`;
- `status: "draft"`;
- a pinned public FHIR R4 source reference;
- a versioned Living Chronicle target-model identity;
- one bounded structural candidate entry;
- evidence-only synthetic fixture references;
- required interoperability, semantic, and privacy review;
- accessibility review where relevant; and
- explicit non-authority claims.

The fixed scenario catalogue includes numeric values, coded observations, effective dates, plain-language display, unsupported components, and unit-conversion candidates.

Every generated mapping repeats:

- mapping approval — `not-granted`;
- semantic equivalence — `not-proven`;
- connector behavior — `not-proven`;
- certification — `not-granted`;
- production readiness — `not-established`; and
- provider preference — `none`.

Each mapping is immediately passed through the existing deterministic mapping-draft validator. The tool fails safely rather than returning an invalid or self-approving mapping.

## Result evidence

Every generated record includes:

- explicit synthetic, non-production, credential-free, and personal-data-free labels;
- generator identity and revision;
- SHA-256 seed digest;
- case index, profile, and scenario identity;
- schema identity and revision;
- validator identity and revision;
- successful validation evidence;
- a stable case identity;
- the generated artifact; and
- required human review.

The aggregate result includes generated count, distinct scenarios, accessibility-relevant case count, edge-case count, and literal confirmation that all returned records passed their deterministic validators.

Diversity evidence describes the generated batch. It does not prove demographic representativeness, accessibility conformance, clinical realism, statistical validity, privacy guarantees for arbitrary caller input, or fitness for model evaluation.

## Non-authority

Tool success cannot:

- write the generated artifact to the repository;
- approve or publish canon;
- accept a mapping or prove semantic equivalence;
- authorize clinical use;
- select or endorse a provider;
- activate or validate a production connector;
- create Chronicle truth or House of Keys permission;
- complete a quest or grant a reward;
- establish production readiness; or
- create institutional authority.

Instruction-like seed text remains data. It cannot alter the registry, scenario catalogues, validators, limits, source authority, transport, provider boundary, or output classification.

## Public test evidence

The Sprint 7.7 test suite covers:

- exact activation of all ten accepted identities in accepted registry order;
- preservation of all nine previously validated identities;
- same-input repeatability;
- different-seed separation;
- explicit synthetic and non-production classification;
- immediate quest and mapping validation;
- visible accessibility and edge-case coverage;
- draft-only mapping claims;
- bounded input rejection;
- public-safe errors;
- instruction-like seed isolation;
- cancellation; and
- transport discovery and dispatch.

Implementation head `eed685814046f0cf5996fde37b084ebff457faa9` passed GitHub Actions CI run 847 and DCO Attestation run 918.

## Explicit non-scope

Sprint 7.7 does not implement production data synthesis, de-identification, differential privacy, statistical population modeling, demographic representativeness, clinical validation, synthetic-person simulation, model training datasets, provider adapters, terminology services, network access, remote MCP, persistence, repository mutation, automatic publication, production deployment, or independent specialist approval.

Those capabilities remain outside this workstream and require their own evidence, authority, privacy, safety, legal, interoperability, and governance gates.
