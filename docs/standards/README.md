# Public Standards Reference Boundary

[Documentation home](../README.md) · [Architecture index](../architecture/README.md) · [Current status](../roadmap/current-status.md) · [Sprint 7 plan](../roadmap/sprint-7-execution-plan.md) · [Forge boundary](../architecture/forge-mcp-boundary-and-tool-registry.md) · [Sprint 7 issue #54](https://github.com/finalboss-tom/calypsos-promise/issues/54) · [Draft PR #55](https://github.com/finalboss-tom/calypsos-promise/pull/55)

- **Status:** BASELINE — Sprint 7.6 public-reference and draft-validation boundary
- **Runtime effect:** public local Forge search and deterministic draft validation only
- **Authority:** reference evidence only
- **Network behavior:** none

This directory contains explicitly public standards references and public mapping-draft examples that the local Forge application may inspect through its server-owned source catalogue.

A record in this directory does not establish:

- standards completeness;
- implementation correctness;
- semantic equivalence;
- certification or conformance;
- clinical safety;
- production readiness;
- connector behavior;
- provider preference;
- a provider relationship; or
- institutional approval.

## Source rule

Each standards record should identify a stable public reference and the exact version used by any mapping draft. A reference may explain what a standard is or where its public specification can be found. It may not copy restricted source material into the repository or represent a project interpretation as the standard itself.

## Mapping-draft rule

A revision-1 mapping draft must remain `status: "draft"` and carry explicit claims that mapping approval and certification are not granted, semantic equivalence and connector behavior are not proven, production readiness is not established, and provider preference is `none`.

Passing deterministic validation proves only that the draft follows the public structural contract. Human interoperability and semantic review remain required before repository acceptance, and later production gates remain separate.

## Information handling

No production health data, private exports, credentials, endpoint secrets, provider contracts, proprietary mappings, protected interoperability findings, or account-specific material belongs in this directory.
