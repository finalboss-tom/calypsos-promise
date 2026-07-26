# House of Keys Contract Package

`@calypsos-promise/house-of-keys` is the pre-stable, provider-independent contract and deterministic evaluation package for Sprint 4.

It contains:

- versioned TypeScript contracts for purposes, categories, recipients, actions, grants, lifecycle facts, explanation snapshots, comprehension evidence, requests, decisions, and receipt requirements
- deterministic structural validation
- a pure `allow` / `deny` / `indeterminate` policy evaluator
- public synthetic fixtures covering valid access, blanket requests, recipient and action mismatch, revocation, expiry, policy prohibitions, unresolved facts, stale comprehension, partial-grant composition, multiple independent grants, and capacity conflicts
- Node tests for validation, determinism, non-mutation, fail-closed behavior, and JSON serialization

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
- `validPersonalExportInput`
- `syntheticPolicyScenarios`

## Boundary

This package does not implement accounts, identity proofing, persistence, real recipients, providers, connectors, real-data flows, encryption, key management, distributed revocation, receipt delivery, production logging, legal authority, clinical behavior, research enrollment, compensation, or remote MCP authorization.
