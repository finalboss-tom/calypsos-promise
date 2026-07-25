# Living Chronicle Temporal Model

**Status:** BASELINE for Sprint 3 workstream 3.2; interchange encoding and implementation remain PROPOSED

## Purpose

This document defines how the Living Chronicle represents when an assertion applies without inventing precision that the source did not provide.

It distinguishes exact instants, local dates and times, intervals, approximate and named periods, recurrence, source-reported time, and normalized time. It does not select a database type, date-time library, external standard, clinical terminology, API encoding, or storage provider.

## Governing constraints

The temporal model must:

- preserve the person’s original temporal assertion
- distinguish source truth from normalized representation
- support correction and provenance
- represent uncertainty explicitly
- avoid converting dates or approximate periods into fabricated midnight timestamps
- survive provider and storage replacement
- support open machine-readable export
- avoid requiring unnecessary intimate detail for core personal value

## Temporal truth is not record metadata

The time an assertion is about is distinct from:

- when the record was created
- when it was imported
- when it was confirmed
- when it was corrected
- when a source artifact was captured
- when a transformation ran
- when an export was generated

A record’s `createdAt` or import time must never silently substitute for its asserted health or lived-experience time.

## Core temporal shapes

Sprint 3 defines the following conceptual temporal shapes.

### Exact instant

An exact instant identifies one point on the global timeline with enough offset or zone information to resolve it unambiguously.

Examples:

- a device event at `2026-07-24T08:12:03-04:00`
- a laboratory system event with an explicit UTC timestamp

An exact instant requires:

- a complete date and time
- a resolvable offset or zone basis
- source representation or provenance
- declared precision appropriate to the source

A naive local date-time is not an exact instant.

### Calendar date

A calendar date states that an assertion applies to a date while time-of-day is unknown, irrelevant, or intentionally not collected.

Examples:

- “I received the vaccination on 2024-10-12.”
- a daily step total reported for 2026-07-23

A calendar date must not be converted to midnight UTC or local midnight merely to fit a timestamp field.

### Local date-time

A local date-time preserves a stated date and clock time whose global instant cannot yet be resolved safely.

Examples:

- “The appointment was at 9:30 a.m.” with no known zone
- a source export containing a local timestamp but omitting its offset

A local date-time may later be normalized when reliable zone context becomes available. The original local assertion remains preserved.

### Time of day

A time of day may be meaningful without a date.

Examples:

- “usually around 10 p.m.”
- a medication instruction that names a daily clock time

A time-of-day assertion is not an observed instance and must not be anchored to an arbitrary date.

### Bounded interval

A bounded interval has a start and end with explicit boundary meaning.

Examples:

- “from Monday through Wednesday”
- a sleep episode with device-reported start and end instants
- medication use from a stated date through another stated date

The model must state whether boundaries are inclusive, exclusive, or source-defined when that distinction matters.

### Open interval

An open interval has one known boundary and one intentionally unknown or continuing boundary.

Examples:

- “symptoms began on Tuesday and are continuing”
- “I stopped taking this sometime before March”

Open does not mean missing by error. The model must state which boundary is open and why.

### Approximate instant or interval

An approximate temporal assertion represents uncertainty explicitly.

Examples:

- “around March 2021”
- “sometime in the summer”
- “about two weeks before the appointment”

Approximation may use:

- earliest and latest plausible bounds
- a central estimate plus a precision class
- a named calendar period
- a relative relationship to another event
- preserved source text with optional normalized bounds

An approximate assertion must never be presented as an exact instant merely because a system selected one representative timestamp.

### Named period or life phase

A named period preserves human temporal context that may not map cleanly to one calendar range.

Examples:

- “during high school”
- “in my first pregnancy”
- “during the 2020 lockdown”
- “the winter after moving”

A named period includes its human-readable label and provenance. Optional normalized bounds are interpretations with method, assumptions, and uncertainty; they do not replace the named source assertion.

### Relative time

A relative temporal assertion locates one event relative to another.

Examples:

- “three days after surgery”
- “before breakfast”
- “about two weeks before the flare”

A relative assertion references an anchor record or event and declares the relation, amount, unit, and approximation. If the anchor changes or is corrected, dependent normalized time must be reevaluated.

### Recurrence

A recurrence describes a repeated pattern, schedule, or expectation.

Examples:

- every weekday
- twice per month
- each evening for six weeks

A recurrence rule is not proof that each occurrence happened. Observed instances remain separate Chronicle records or source claims.

## Temporal assertion envelope

A temporal assertion should conceptually include:

- temporal identity when referenced independently
- shape discriminator
- source representation
- parsed representation when available
- normalized representation when available
- precision or uncertainty
- zone and offset evidence
- calendar basis where relevant
- boundary behavior for intervals
- source and provenance references
- transformation method and version for normalized time
- lifecycle and correction references

The source representation may be structured, unstructured, or both.

## Source time and normalized time

### Source-reported time

Source-reported time records what the source actually supplied.

Examples:

- raw device timestamp and offset
- document text “March 2021”
- questionnaire answer “during college”
- manual entry date selected by the person

Source time is immutable evidence except through source-version or correction semantics.

### Parsed time

Parsed time is a structured interpretation of the source representation.

Parsing may identify fields without claiming the assertion is globally resolved. For example, a parser may identify local date `2024-03-12` and local time `09:30` while keeping zone status unknown.

### Normalized time

Normalized time is a deterministic or reviewed representation created for comparison, ordering, or interoperability.

Every normalized time requires:

- source temporal assertion reference
- method identity and version
- assumptions
- zone or offset behavior
- uncertainty effect
- responsible actor or process

Normalization does not delete or overwrite source time.

## Precision

Precision describes the granularity the source supports.

Candidate precision classes include:

- second
- minute
- hour
- day
- week
- month
- season
- year
- life phase
- unknown

Precision is not confidence. A person may be highly confident that something occurred in 2021 while not knowing the month.

## Uncertainty

Temporal uncertainty may include:

- explicit earliest and latest bounds
- symmetric or asymmetric tolerance
- approximate marker
- source confidence statement
- unresolved zone
- ambiguous date ordering or calendar
- named-period uncertainty
- relative-anchor uncertainty

Unknown, approximate, conflicting, and not collected are different states.

## Time-zone and offset semantics

### Offset

An offset states the difference from UTC at the represented moment.

### Zone identifier

A zone identifier may support historical daylight-saving and civil-time rules.

### Zone status

Candidate zone statuses:

- `explicit-offset`
- `explicit-zone`
- `inferred-zone`
- `unknown-zone`
- `not-applicable`

An inferred zone must preserve its inference method and uncertainty. A current account setting must not silently rewrite historical source times.

### Travel and zone changes

A person’s account zone is not necessarily the event zone. Imported device records, travel, and historical recollections may use different zones or unknown zones.

## Interval semantics

An interval should define:

- start boundary
- end boundary
- whether either boundary is open
- boundary inclusivity when relevant
- source representation
- duration only when directly stated or deterministically derived

A duration does not necessarily identify exact boundaries. “For three days” may remain a duration assertion until an anchor is known.

When start and end use different precision, the model must preserve both rather than coercing them to the finer precision.

## Recurrence semantics

A recurrence should distinguish:

- schedule or intention
- source-reported repeated pattern
- generated expected occurrences
- confirmed observed instances
- exceptions and skipped occurrences
- recurrence time zone
- start and optional end of the recurrence definition

Expected occurrences are derivatives and must not become confirmed observations without evidence.

## Temporal relationships

Records may declare temporal relationships such as:

- before
- after
- overlaps
- during
- contains
- starts-with
- ends-with
- approximately-coincident

A relationship may exist even when exact values are unknown. The relationship itself requires source or derivation provenance.

## Corrections and temporal history

Temporal correction creates a new revision or successor assertion and preserves:

- prior temporal representation
- corrected representation
- reason
- actor
- time of correction
- affected normalized or derived records

A correction from “March 2021” to “April 2021” must not mutate the earlier source claim out of history.

## Conflict

Two sources may report different times for the same or related event.

The model may record a conflict and a preferred presentation, but it must preserve:

- each source temporal assertion
- each source’s zone and precision
- conflict rationale
- review state
- any preference decision and actor

Preference is not deletion and does not prove one source false.

## Deletion and temporal derivatives

When a source temporal assertion is deleted or retained under exception, normalized and relative derivatives must be reevaluated.

A non-sensitive tombstone may preserve only the minimum identity and lifecycle information necessary for referential integrity. It must not preserve sensitive source text or time details without an accepted rule.

## Export requirements

A machine-readable export should preserve:

- temporal shape
- source representation when included in scope
- parsed and normalized representations as distinct values
- precision and uncertainty
- zone and offset evidence
- method and version for normalization
- correction, conflict, and source references

A human-readable export should explain approximate and unresolved time without presenting fabricated exactness.

## Accessibility and person experience

The model must support interfaces that let a person say:

- exact date and time
- date only
- approximate date
- named life period
- duration without exact boundaries
- unknown
- prefer not to add more detail

Core personal value must not depend on supplying a more precise or intimate time than the person knows or chooses to record.

## Initial temporal invariants

Sprint 3 contracts and validators should eventually enforce:

- an exact instant has a resolvable offset or zone basis
- a calendar date is not encoded as an arbitrary timestamp
- local date-time with unknown zone is not labeled an exact instant
- comparable interval start is not after interval end
- open boundaries are explicit
- approximate bounds are ordered when comparable
- normalized time references source time and an identified method version
- source representation remains preserved after normalization
- recurrence definitions do not create confirmed occurrences
- record creation time is not substituted for asserted time
- corrections preserve the prior temporal assertion
- public fixtures contain only synthetic temporal data

## Workstream 3.2 acceptance

This baseline satisfies the workstream’s architecture acceptance when it can represent without false precision:

- a precise device timestamp
- a date without time
- a local date-time with unknown zone
- “around March 2021”
- “during high school”
- “from Monday through Wednesday”
- a continuing open interval
- a duration without known boundaries
- a recurrence distinct from observed instances
- source-reported time and a versioned normalized representation

## Deferred decisions

- TypeScript and JSON Schema encoding
- database and index types
- external interoperability mappings
- exact calendar support beyond the initial baseline
- locale-specific parsing
- daylight-saving ambiguity resolution policy
- timezone inference sources
- recurrence-rule syntax
- temporal query language
- retention rules for sensitive temporal tombstones
- clinical or research interpretation of temporal relationships
