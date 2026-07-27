# Aster Contract Baseline

[Documentation home](../README.md) · [Architecture boundary](../architecture/aster-contract-boundary.md) · [Sprint 6 execution plan](../roadmap/sprint-6-execution-plan.md)

- **Status:** ACTIVE PRE-STABLE CONTRACT
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`

Sprint 6 begins with a public, dependency-free authority contract for Aster's five narrative roles. The package exposes role identifiers, direct accessible names, allowed high-level input and output classes, authoritative source classes, deterministic action owners, execution classifications, confirmation rules, mandatory prohibited actions, stable validation issues, and public-surface tests.

## Current guarantees

Every role contract states that Aster cannot:

- write canonical records;
- create or expand permission;
- confirm its own output;
- complete quests; or
- grant rewards.

Deterministic validation rejects an authority matrix that attempts any of those escalations or omits a role or mandatory prohibition.

## Current limits

This first workstream does not yet complete the detailed role contracts, proposal envelope, extraction schemas, intent taxonomy, confidence and clarification rules, source-linked recall, memory lifecycle, provider egress, prompt-injection isolation, delayed-result contracts, synthetic adapter, non-AI fallback fixtures, compatibility review, or completion evidence. Those remain tracked in issue #47 and the Sprint 6 execution plan.
