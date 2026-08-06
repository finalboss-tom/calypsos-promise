# Product Documentation

[Documentation home](../README.md) · [Product Constitution](../frozen/product-constitution.md) · [Architecture](../architecture/README.md) · [Consumer-first boundary](../decisions/0010-consumer-first-provider-independent-boundary.md) · [Current status](../roadmap/current-status.md)

This directory contains gameplay, vocabulary, incentive, content, Living Chronicle, and House of Keys product contracts. The [Product Constitution](../frozen/product-constitution.md) remains authoritative when a baseline, example, integration, provider request, sponsor request, or implementation detail appears to conflict with the player promise or non-negotiable rights.

## Product foundations

1. [Gameplay Foundation](gameplay-foundation.md)
2. [Controlled Vocabulary](controlled-vocabulary.md)
3. [Retired Terminology](retired-terminology.md)
4. [Incentive Model](incentive-model.md)
5. [Consumer-First and Provider-Independent Architecture](../architecture/consumer-first-provider-independent-boundary.md)

## Story and content contracts

1. [Content Schema Baseline](content-schema-baseline.md)
2. [Content Schema Migration Map](content-schema-migration-map.md)

Related architecture and governance:

- [Story Content Ontology](../architecture/story-content-ontology.md)
- [Calypso Engine](../architecture/calypso-engine.md)
- [Story Studio](../architecture/story-studio.md)
- [Content Governance](../governance/content-governance.md)

## Living Chronicle contracts

1. [Living Chronicle Schema Baseline](living-chronicle-schema-baseline.md)
2. [Living Chronicle Validation Baseline](living-chronicle-validation-baseline.md)
3. [Living Chronicle Synthetic Fixtures](living-chronicle-synthetic-fixtures.md)
4. [Living Chronicle Compatibility and Migration](living-chronicle-compatibility-migration.md)

For the underlying domain models, use the [Living Chronicle architecture index](../architecture/README.md#living-chronicle-architecture).

External clinical, claims, laboratory, pharmacy, device, EHR, payer, and research records remain source-attributed inputs mapped through future versioned adapters. A source schema, implementation guide, provider relationship, sponsor, or enterprise contract does not silently become Chronicle truth.

## House of Keys contracts

1. [House of Keys Contract and Validation Baseline](house-of-keys-contract-baseline.md)

For the underlying permission models, use the [House of Keys architecture index](../architecture/README.md#house-of-keys-architecture).

## Current universal-shell implementation

Sprint 10 implements the bounded public/synthetic product surface through [`apps/game`](../../apps/game) and [`packages/game-content`](../../packages/game-content). The [pre-acceptance full alignment reconciliation](../roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md) verifies the shell against the Product Constitution, Gameplay Foundation, incentive model, prior sprints, and current quality gates.

The shell preserves direct and narrative parity, refusal, deferral, discard, exit, deterministic non-authority, no-account access, provider independence, and accessibility. It intentionally creates no private Chronicle, production permission, authoritative completion, reward, restoration, progression, analytics, or secondary-use incentive.

## Product rule

A schema, mapping, connector, provider integration, quest, reward, notification, narrative flow, permission request, policy decision, or receipt must preserve personal value first, meaningful refusal, non-punitive return, purpose-specific permission, visible uncertainty, accessibility, source provenance, provider replaceability, and the separation between authoritative records and AI-generated proposals.

No reward, progression, core capability, or governance privilege may depend on selecting a preferred provider, sponsor, EHR, connector, enterprise partner, or broader institutional permission.
