# Living Chronicle Compatibility and Migration Baseline

**Status:** BASELINE for Sprint 3 workstream 3.12  
**Schema version:** `0.1.0` pre-stable  
**Implementation state:** contract and migration requirements only; no production migration is selected or implemented

## Purpose

This document defines how future Living Chronicle schema changes must preserve person control, source truth, provenance, correction history, explicit uncertainty, exportability, and deletion state.

It does not define database migrations, deployment sequencing, backfills against real records, storage-provider procedures, or runtime rollback tooling.

## Version boundary

The Living Chronicle schema version is independent from:

- the npm package version;
- application and service releases;
- the Sprint 2 content-schema version;
- database or storage revisions;
- connector and provider versions;
- clinical terminology and external mapping versions; and
- transformation, normalization, derivation, and policy versions.

Schema `0.1.0` is pre-stable. Breaking contract changes remain possible before `1.0.0`, but every breaking change must declare its migration effects rather than treating pre-stability as permission to discard history.

## Compatibility classes

### Compatible additive change

A compatible additive change introduces an optional field, new independent collection, or new discriminator value that old readers may safely ignore without changing the meaning of existing records.

It still requires review when the addition affects authority, privacy, lifecycle, provenance, export, deletion, or incentive boundaries.

### Conditionally compatible change

A conditionally compatible change preserves existing serialized data but changes interpretation or validation requirements.

Examples include:

- making previously optional provenance mandatory for a newly defined workflow;
- adding a review state that changes default presentation;
- tightening identifier, decimal, temporal, or tombstone grammar; or
- adding a new unit-conversion context requirement.

Such a change requires a declared reader policy and synthetic evidence for old and new forms.

### Breaking change

A breaking change renames or removes a field, changes a discriminator, changes authority or lifecycle meaning, changes identifier semantics, or makes an old valid representation invalid.

Breaking changes require:

- a new schema version;
- an explicit source-to-target mapping;
- deterministic migration rules where possible;
- visible failure or review state where deterministic migration is not possible;
- synthetic before-and-after fixtures;
- validation of preserved identifiers and references; and
- rollback or re-export guidance appropriate to the later implementation.

## Preservation invariants

Every migration must preserve or explicitly account for:

1. Chronicle, record, subject, source-artifact, and source-version identity;
2. raw source values, source units, source wording, and exact locators where retained;
3. original temporal precision and uncertainty;
4. actor, method, version, input, output, and confirmation provenance;
5. proposed versus confirmed authority;
6. active, superseded, retracted, deletion-related, retained, and deleted lifecycle state;
7. correction, conflict, duplicate, merge, unmerge, and presentation-preference relationships;
8. export omissions and limitations;
9. retention exceptions, tombstones, and completion evidence; and
10. the separation of Chronicle truth from consent, receipt, story, quest, progression, AI memory, research, compensation, and governance state.

A migration may not fabricate missing source evidence, confirmation, precision, consent, legal authority, clinical validity, or deletion completion.

## Migration examples

### Optional explanatory metadata

Adding an optional plain-language explanation field is normally additive. Existing records remain valid, and migration does not invent explanation text.

### Identifier grammar change

Changing canonical identifier grammar is breaking when existing IDs no longer conform. A migration must preserve an immutable old-to-new identity map and must not use email addresses, provider subjects, database keys, URLs, or wallet addresses as replacement Chronicle identities.

### Temporal representation change

A date-only record must remain date-only. A migration cannot create midnight, a time zone, or an exact instant to satisfy a newer temporal shape.

An approximate recollection must preserve its source wording and bounds. A new precision enum may refine display, but it cannot silently narrow uncertainty.

### Unit-normalization method change

A revised pound-to-kilogram method or precision policy does not overwrite the raw `180 lb` assertion or the old derived record.

The system creates a new derived representation or record with:

- the same traceable source input;
- the new method and version;
- declared precision effects;
- a relationship to the prior derived result; and
- explicit invalidation or supersession behavior.

### Category or external-mapping change

An external-code mapping may be revised without rewriting the stable internal variable or category identity. A mapping revision records relation, review state, system version, reviewer, and effective context.

### Source-version change

Changed document bytes create a new source version. A migration cannot repoint an existing locator or extracted assertion to a different version merely because the documents appear similar.

### Correction-model change

A new correction representation must preserve predecessor, successor, responsible actor, time, reason, changed components, source chain, and dependent-record effects.

### Deletion-model change

Migrating a boolean deletion flag requires a conservative mapping into explicit lifecycle evidence. When the old state cannot distinguish request, processing, exception, completion, or failure, the migration records an unresolved or review-required state rather than claiming completed erasure.

Tombstones remain minimal and may not acquire health values, document names, excerpts, intimate categories, or source content during migration.

## Synthetic migration evidence

A future schema version must add synthetic migration fixtures covering at least:

- one unchanged additive record;
- one approximate-time record;
- one normalized and derived record with source chain;
- one correction sequence;
- one unresolved conflict;
- one source document with immutable versions and locators;
- one export with omissions;
- one deletion request with retention exception and tombstone; and
- one intentionally unmigratable case that fails visibly.

The migrated fixture must pass the target schema validator, and preserved identities and source relationships must be asserted directly in tests.

## Export compatibility

A portable export identifies every schema version it contains. Mixed-version exports must not imply that all entities have been migrated.

A reader that cannot interpret an entity must preserve its serialized form or report an explicit omission or unsupported-version state. It must not silently drop unknown health or lifecycle data.

## Rollback boundary

Sprint 3 does not select runtime rollback architecture. A future implementation must nevertheless distinguish:

- rolling back application code;
- reading an older schema version;
- reversing a deterministic migration;
- restoring a custody copy;
- reversing a merge or presentation decision; and
- resurrecting material that completed deletion.

Rollback must never be used to bypass deletion, retention, permission, or source-integrity rules.

## Deferred implementation decisions

The following remain deferred:

- a JSON Schema and untrusted-JSON decoding library;
- schema-registry and migration-runner technology;
- persistence-specific migration scripts;
- production backup and rollback procedures;
- provider migration and cryptographic verification;
- real-data dry runs and operational approval; and
- specialist privacy, legal, clinical, accessibility, and security review.

These deferrals do not weaken the preservation invariants in this document.
