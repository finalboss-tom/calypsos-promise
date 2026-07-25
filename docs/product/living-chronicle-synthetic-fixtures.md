# Living Chronicle Synthetic Fixture Baseline

**Status:** BASELINE for Sprint 3 workstream 3.11  
**Schema version:** `0.1.0` pre-stable

## Purpose

This document defines the first public synthetic-fixture evidence for the Living Chronicle contract.

The fixtures exist to demonstrate that the architecture, TypeScript contracts, and deterministic validators can represent the required Sprint 3 scenarios without using production data, private health data, copied medical records, or linkable personal details.

They are contract evidence, not product seed data, clinical examples, training data, diagnostic guidance, or implied implementation state.

## Fixture boundary

The baseline Chronicle fixture is composed from deterministic ECMAScript data modules under `packages/health-schema/fixtures/`.

This representation is intentional while JSON Schema and an untrusted-JSON decoding boundary remain deferred. The composed result is a plain `ChronicleSchemaBundle`, and tests require it to remain valid after a JSON serialization round trip.

A separate synthetic accessibility-context matrix varies names, age bands, locales, language direction, access needs, and data-availability conditions. That matrix is not Chronicle data, a demographic classification system, or product seed data.

The fixtures do not introduce:

- persistence, migrations, repositories, or database topology
- runtime services, providers, connectors, or real ingestion
- production document storage or export delivery
- clinical terminology selection
- diagnosis, treatment, safety recommendation, or causality
- consent, receipt, research, compensation, market, treasury, ownership, or governance implementation
- story, quest, progression, notification, or Aster-memory persistence

## Required-scenario coverage

| Required scenario                                                 | Fixture evidence                                                                                                     |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Exact device timestamp                                            | proposed imported step observation with an offset-qualified exact instant and device source version                  |
| Calendar date without time                                        | confirmed manual step observation using a calendar date without fabricated midnight                                  |
| Approximate historical recollection                               | confirmed reflection preserving the words “around spring 2021” with bounded seasonal uncertainty                     |
| Open interval                                                     | confirmed sleep-state interval with a start and explicitly open end                                                  |
| Bounded interval                                                  | confirmed sleep-state interval with separate local start and end boundaries                                          |
| Manual observation                                                | person-authored step and weight observations with manual source artifacts and capture events                         |
| Imported external claim                                           | proposed medication-dose claims from two immutable document versions                                                 |
| Unit normalization with preserved raw value                       | corrected `180 lb` source claim plus a separate kilogram-derived record                                              |
| Deterministic derived value with source chain                     | versioned pound-to-kilogram transformation and derivation events pointing to the source record                       |
| Correction with inspectable history                               | wrong-unit record, corrected successor, shared source truth, correction reason, and dependent record                 |
| Conflicting sources                                               | two document versions with exact locators and an unresolved conflict relationship                                    |
| Duplicate candidate and reversible merge                          | two replayed connector records, duplicate-candidate evidence, preserved source chains, and non-destructive composite |
| Versioned source document with exact locator                      | synthetic PDF versions `v1` and `v2`, each with its own page locator and source snapshot                             |
| Export containing records and provenance                          | request, plan, manifest, artifact, and delivery chain with explicit omission evidence                                |
| Deletion, retention exception, tombstone, and completion evidence | scoped request, dependency resolution, accountable temporary exception, minimal tombstone, and completion record     |

## Inclusive interaction coverage

The separate accessibility-context matrix includes obviously synthetic contexts with varied:

- display names
- teen, adult, and older-adult age bands
- left-to-right and right-to-left locales
- English-first, Spanish-first, multilingual, and culturally adaptable presentation contexts
- screen-reader, keyboard-only, large-text, high-contrast, reduced-motion, plain-language, and touch-spacing needs
- manual-only, document-import, device-export, intermittent-connectivity, offline, and paper-source availability

The matrix assigns no health status, diagnosis, treatment, capability judgment, outcome, consent, reward, progression, compensation, or governance authority to any context.

## Public and synthetic requirements

All source artifacts in the Chronicle fixture are classified `synthetic`.

The test suite validates the aggregate under the `public-or-synthetic` fixture policy. A future fixture contribution fails this policy when it marks any source artifact `private`.

The fixture declarations also state that they contain:

- no production or private health data
- no diagnosis, treatment recommendation, or causal claim
- no secondary-use permission
- no compensation, progression, or governance effect
- no real-person accessibility or demographic profile

These are repository and review boundaries, not claims that an automated validator can prove every privacy, accessibility, or legal property of arbitrary prose.

## Evidence requirements

The fixture baseline is accepted only when tests demonstrate:

1. the complete bundle passes deterministic invariant validation;
2. the same bundle passes after JSON serialization and parsing;
3. every required scenario maps to one or more globally resolvable fixture identities;
4. the fixture declarations remain explicitly synthetic and incentive-neutral;
5. inclusive contexts vary without adding health outcomes or institutional authority; and
6. repository formatting, policy, content validation, lint, typecheck, tests, and DCO pass on the current head.

## Change rules

Fixture changes must preserve source truth, Chronicle truth, authority, lifecycle, provenance, correction, conflict, export, deletion, and incentive boundaries.

A fixture must not be made easier to validate by:

- silently confirming imported or AI-produced claims
- replacing approximate time with false precision
- deleting the record or source that demonstrates correction history
- treating a duplicate candidate as permission for destructive merge
- omitting retained-under-exception state
- retaining sensitive values in tombstones
- rewarding disclosure, source volume, retention, broader consent, or intimate detail
- encoding stereotyped health outcomes into accessibility or cultural contexts

Changes that reveal a contract inconsistency should update the contract or document the unresolved question rather than disguising the inconsistency in fixture data.
