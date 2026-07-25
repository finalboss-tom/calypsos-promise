# Living Chronicle Synthetic Fixtures

**Status:** BASELINE for Sprint 3 workstream 3.11  
**Schema version:** `0.1.0` pre-stable  
**Data classification:** synthetic

These fixtures exercise the Living Chronicle contracts without containing production, private, or real-person health data.

## Files

- `common.mjs` defines the synthetic identities, variables, categories, units, revision helper, and empty aggregate bundle.
- `time-source-and-correction.mjs` adds temporal, manual-entry, device-import, source-chain, normalization, derivation, and correction scenarios.
- `document-conflict.mjs` adds immutable document versions, exact locators, imported claims, attachments, and unresolved conflict.
- `duplicate-merge.mjs` adds replayed connector records, duplicate-candidate evidence, and a reversible non-destructive merge.
- `export-lifecycle.mjs` adds export request, plan, manifest, artifact, and delivery evidence.
- `deletion-lifecycle.mjs` adds deletion scope, retention exception, minimal tombstone, and completion evidence.
- `accessibility-contexts.mjs` provides a separate non-Chronicle matrix of synthetic names, age bands, locales, access needs, and data-availability conditions for inclusive contributor review.
- `index.mjs` composes the aggregate Chronicle fixture and publishes the required-scenario evidence map.

## Why ECMAScript modules

The repository does not yet claim a complete untrusted-JSON decoder or accepted JSON Schema for the Chronicle. The fixtures are therefore deterministic, inspectable ECMAScript data modules that produce a plain serializable `ChronicleSchemaBundle`.

The fixture tests require:

1. successful deterministic validation under the `public-or-synthetic` policy;
2. successful validation after a JSON serialization round trip;
3. a resolvable evidence entry for every required Sprint 3 scenario;
4. explicit synthetic and incentive-neutral declarations; and
5. varied inclusive interaction contexts that remain outside Chronicle truth and contain no health outcomes.

This format is transitional. A later JSON Schema and untrusted-decoding boundary may add generated JSON fixtures, but may not weaken the synthetic-data, provenance, correction, export, deletion, or incentive boundaries represented here.

## Inclusive context boundary

The accessibility-context matrix is not a `ChronicleSchemaBundle`, product seed data, demographic classification system, or health profile. It exists only to prevent the contributor evidence from assuming one name, age band, language direction, access mode, or data-availability condition.

Its synthetic attributes must not be used to infer health status, diagnosis, treatment, capability, consent, reward, progression, compensation, or governance authority.

## Contributor rule

Do not place real health information, private documents, copied medical records, production identifiers, access credentials, or linkable personal details in this directory. Use obviously synthetic people, sources, values, events, and accessibility contexts only.
