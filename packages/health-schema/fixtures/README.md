# Living Chronicle Synthetic Fixtures

**Status:** BASELINE for Sprint 3 workstream 3.11  
**Schema version:** `0.1.0` pre-stable  
**Data classification:** synthetic

These fixtures exercise the Living Chronicle contracts without containing production, private, or real-person health data.

## Files

- `common.mjs` defines the synthetic identities, variables, categories, units, revision helper, and empty aggregate bundle.
- `time-source-and-correction.mjs` adds temporal, manual-entry, device-import, source-chain, normalization, derivation, and correction scenarios.
- `conflict-export-and-deletion.mjs` adds source-version conflict, duplicate candidate, reversible merge, export, deletion, retention-exception, tombstone, and completion-evidence scenarios.
- `index.mjs` composes the aggregate fixture and publishes the required-scenario evidence map.

## Why ECMAScript modules

The repository does not yet claim a complete untrusted-JSON decoder or accepted JSON Schema for the Chronicle. The fixtures are therefore deterministic, inspectable ECMAScript data modules that produce a plain serializable `ChronicleSchemaBundle`.

The fixture tests require:

1. successful deterministic validation under the `public-or-synthetic` policy;
2. successful validation after a JSON serialization round trip;
3. a resolvable evidence entry for every required Sprint 3 scenario.

This format is transitional. The later JSON Schema and cross-contract review may add generated JSON fixtures, but may not weaken the synthetic-data, provenance, correction, export, deletion, or incentive boundaries represented here.

## Contributor rule

Do not place real health information, private documents, copied medical records, production identifiers, access credentials, or linkable personal details in this directory. Use obviously synthetic people, sources, values, and events only.
