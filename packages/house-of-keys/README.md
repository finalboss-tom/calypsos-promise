# House of Keys Contract Package

`@calypsos-promise/house-of-keys` is the merged, pre-stable, provider-independent contract and deterministic evaluation package established by Sprint 4. Its contract version is `0.1.0-pre.1`.

It contains:

- versioned TypeScript contracts for purposes, categories, recipients, actions, grants, lifecycle facts, explanation snapshots, comprehension evidence, requests, decisions, access receipts, and correction references
- deterministic structural validation
- a pure `allow` / `deny` / `indeterminate` policy evaluator
- one public synthetic schema bundle and one public synthetic completed-access receipt
- seventeen public synthetic policy scenarios covering valid access, blanket requests, recipient and action mismatch, revocation, expiry, policy prohibitions, unresolved facts, stale comprehension, partial-grant composition, multiple independent grants, and capacity conflicts
- twenty-nine Node tests for validation, determinism, non-mutation, fail-closed behavior, receipt integrity, and JSON serialization

The package is deliberately separate from `@calypsos-promise/health-schema`. Permission truth may authorize an operation over Chronicle data, but it does not become Chronicle truth.

## Public exports

- `HOUSE_OF_KEYS_CONTRACT_VERSION`
- `HOUSE_OF_KEYS_EVALUATOR_ID`
- `HOUSE_OF_KEYS_EVALUATOR_REVISION`
- `HOUSE_OF_KEYS_POLICY_ID`
- `HOUSE_OF_KEYS_POLICY_REVISION`
- TypeScript contract types from `types.ts`
- `validateHouseOfKeysSchemaBundle`
- `evaluateHouseOfKeysPolicy`
- `syntheticHouseOfKeysBundle`
- `syntheticAccessReceipt`
- `validPersonalExportInput`
- `syntheticPolicyScenarios`

## Boundary

This package is a synthetic contract baseline, not a production consent system. It does not implement accounts, identity proofing, persistence, real recipients, providers, connectors, real-data flows, encryption, key management, distributed revocation, single-use consumption, receipt delivery, production logging, legal authority, clinical behavior, research enrollment, compensation, or remote MCP authorization.
