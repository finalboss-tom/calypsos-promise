# Living Chronicle Variable, Value, Unit, and Normalization Model

**Status:** BASELINE for Sprint 3 workstream 3.4; terminology mappings, clinical code systems, conversion catalogues, and runtime implementation remain PROPOSED or DEFERRED

## Purpose

This document defines how the Living Chronicle represents what is being asserted, the shape of the asserted value, any unit or category needed to interpret it, and deterministic normalization without erasing the source claim.

It exists to prevent connector fields, device labels, clinical code systems, database column names, AI output, or vendor-specific unit conventions from becoming the silent authority for Chronicle meaning.

This is an architecture and ontology contract. It does not select a clinical terminology, unit library, medical coding licence, connector vocabulary, database representation, analytics engine, or user-interface component.

## Governing constraints

The model must preserve:

- person-controlled records and usable export
- structured records as the authoritative Chronicle representation
- raw source values and source units after parsing or normalization
- deterministic and versioned normalization
- visible failure for unknown, ambiguous, incompatible, or context-dependent units
- distinction among direct claims, normalized representations, calculations, associations, and inferences
- provider and terminology replaceability
- no requirement for clinical coding, secondary-use consent, payment, progression, or governance participation to create a useful personal record
- no progression or governance advantage for recording more intimate or detailed data

## Core separation

The model separates five concepts that must not be collapsed:

1. **Variable definition** — what property, concept, event, state, or quantity is being represented.
2. **Value** — the asserted payload, such as a quantity, category, count, boolean, text, range, duration, or absence reason.
3. **Unit definition** — how a quantitative value is measured or expressed.
4. **External mapping** — how an internal variable, category, or unit relates to an external vocabulary or source field.
5. **Normalization record** — the declared transformation from one representation to another.

A source label such as `steps`, a clinical code, a spreadsheet heading, and a canonical variable identifier may all refer to a similar concept, but they are not interchangeable authorities.

## Identifier conventions

Sprint 3 uses stable dotted identifiers that are independent of vendors and external terminology owners.

Examples:

- `variable.activity.step-count`
- `variable.body.weight`
- `variable.symptom.pain-intensity`
- `variable.sleep.duration`
- `variable.medication.use-status`
- `unit.count.step`
- `unit.mass.kilogram`
- `unit.mass.pound`
- `category.pain-intensity.moderate`
- `normalization.mass.pound-to-kilogram.v1`

Identifiers describe the internal contract. Human-readable labels, aliases, translations, external codes, and source-specific field names remain versioned metadata.

Changing a label does not change variable identity. Changing the meaning, value shape, dimensional contract, or aggregation semantics may require a new variable identity or an explicitly governed revision.

## Variable definition

A variable definition describes what a Chronicle assertion means.

The conceptual baseline includes:

- `id`
- `schemaVersion`
- `revision`
- `status`
- `preferredLabel`
- `plainLanguageDescription`
- `aliases`
- `valueShape`
- optional `unitDimension`
- optional `allowedUnitIds`
- optional `categorySetId`
- `temporalSemantics`
- `aggregationSemantics`
- optional `sensitivityHints`
- optional `reviewRequirements`
- `externalMappings`
- `authorship`
- creation and update metadata

### Variable status

Proposed baseline states are:

- `draft`
- `review`
- `active`
- `deprecated`
- `retired`

A variable definition becoming active does not imply clinical validation, diagnostic authority, or universal interoperability.

### Preferred label and aliases

The preferred label is the project’s current plain-language name for the variable.

Aliases may include:

- prior project labels
- common-language alternatives
- source-system field names
- abbreviations
- locale-specific display terms

Aliases help search and mapping. They do not silently redefine the variable or become accepted input without a declared mapping process.

### Plain-language description

The description states what the variable represents and, where necessary, what it does not represent.

Example:

> `variable.activity.step-count` represents a count of steps asserted for a stated temporal scope. It does not prove exercise intensity, distance, energy expenditure, or health benefit.

### Temporal semantics

A variable definition declares the temporal shape expected of records using it.

Candidate semantics include:

- `instantaneous`
- `point-in-period`
- `period-total`
- `period-average`
- `period-minimum`
- `period-maximum`
- `interval-state`
- `event`
- `recurring-plan`
- `timeless-description`

The temporal semantics do not replace the temporal assertion. They constrain whether a specific record’s temporal shape is meaningful.

A period total may not be normalized into an instantaneous value merely because both are numeric.

### Aggregation semantics

A variable definition declares which aggregation operations are meaningful.

Candidate values include:

- `none`
- `sum`
- `mean`
- `minimum`
- `maximum`
- `count`
- `latest`
- `duration`
- `custom-versioned-method`

Aggregation is not automatically permitted because a value is numeric.

Examples:

- step counts may support summation over non-overlapping periods
- body weight generally does not support summation
- an ordinal pain score must not be averaged without an explicitly reviewed method and explanation
- free text has no generic numeric aggregation

## Value model

A Chronicle value is a discriminated shape rather than one untyped field.

The baseline value families are:

- quantity
- integer count
- decimal number
- boolean
- coded category
- ordinal score
- text
- numeric range
- duration
- temporal value
- absent or unknown reason

A variable definition declares which family it accepts.

### Quantity value

A quantity combines a numeric magnitude with a declared source unit.

Conceptual fields:

- `kind: quantity`
- `magnitude`
- `unitId`
- optional `sourceText`
- optional `precision`
- optional `significantDigits`

A quantity value does not contain a canonical normalized value in place of the source value. Normalization produces a separate traceable representation or derived record.

### Integer count

An integer count represents discrete occurrences.

Conceptual fields:

- `kind: integer-count`
- `value`
- optional `countUnitId`

Examples include steps, events, awakenings, and completed repetitions.

A count of zero is a valid value and must not be confused with missing, unknown, or not collected.

### Decimal number

A decimal number represents a unitless numeric assertion or a value whose interpretation is defined by the variable contract.

Conceptual fields:

- `kind: decimal`
- `value`
- optional `precision`

Floating-point implementation details must not silently change the intended decimal value. The later TypeScript and interchange contracts should preserve decimal text or another exact representation where required.

### Boolean value

A boolean represents an explicit true or false assertion.

Conceptual fields:

- `kind: boolean`
- `value`

`false` is not equivalent to unknown, unanswered, absent, or not applicable.

### Coded category

A coded category references one category from an identified internal category set.

Conceptual fields:

- `kind: coded-category`
- `categoryId`
- optional `sourceLabel`

Examples may include a person-selected symptom descriptor or a source-reported status.

External codes remain mappings. A connector or clinical terminology cannot introduce an unreviewed internal category merely by supplying a code.

### Ordinal score

An ordinal score represents an ordered scale whose numeric labels do not automatically imply equal intervals.

Conceptual fields:

- `kind: ordinal`
- `scaleId`
- `valueId`
- optional `displayNumber`

The model preserves the scale identity and version. Arithmetic on ordinal values is prohibited unless an explicit method defines and justifies it.

A pain score labelled `4` is not automatically four times a score labelled `1`.

### Text value

A text value represents person-authored, source-authored, or person-confirmed textual content within a structured record.

Conceptual fields:

- `kind: text`
- `text`
- `locale`
- optional `format`

Text may be authoritative as text without making every extractable statement authoritative as a structured observation.

### Numeric range

A numeric range represents lower and upper bounds.

Conceptual fields:

- `kind: numeric-range`
- optional `lower`
- optional `upper`
- `lowerInclusive`
- `upperInclusive`
- optional `unitId`

At least one bound is required. The range must not be replaced by a midpoint unless a separate declared transformation creates that estimate.

### Duration

A duration represents elapsed or intended time, not a calendar location.

Conceptual fields:

- `kind: duration`
- `magnitude`
- `unitId`

Duration units must belong to the time-duration dimension. Calendar months and years may require explicit semantics because their length is context-dependent.

### Temporal value

A temporal value is used when the variable itself represents a date, time, or period, rather than when the record merely occurred at that time.

Conceptual fields:

- `kind: temporal-value`
- `temporalAssertion`

The record’s own temporal scope remains separate from the asserted temporal value.

Example: a person may record today that an event’s recalled date was around March 2021. The recording time and the asserted event time are distinct.

### Absent or unknown reason

Absence is explicit rather than encoded as `null`, zero, an empty string, or a fabricated value.

Conceptual fields:

- `kind: absent`
- `reason`
- optional `explanation`

Initial reasons include:

- `unknown`
- `not-measured`
- `not-collected`
- `not-applicable`
- `withheld-by-person`
- `source-unavailable`
- `below-detection-limit`
- `above-measurement-limit`
- `invalid-source-value`

A withheld value must not reduce core rights, progression, or governance standing.

## Category sets

A category set defines a bounded group of internal categories.

Conceptual fields:

- `id`
- `revision`
- `preferredLabel`
- `categories`
- ordering semantics
- mutual-exclusivity semantics
- external mappings
- review requirements
- lifecycle state

A category includes:

- stable category identifier
- label and plain-language description
- aliases
- optional order
- optional parent category
- lifecycle state
- external mappings

Category sets may be unordered, ordered, hierarchical, mutually exclusive, multi-select, or open to an explicit `other` category.

`Other`, unknown, and not applicable are not interchangeable.

## Unit model

A unit definition describes how a quantity is expressed.

Conceptual fields:

- `id`
- `revision`
- `preferredLabel`
- `symbol`
- `aliases`
- `dimensionId`
- conversion capability
- optional canonical unit relationship
- precision and display guidance
- external mappings
- lifecycle state

### Unit dimensions

A dimension identifies the kind of quantity measured.

Initial conceptual dimensions include:

- count
- mass
- length
- time duration
- temperature
- volume
- frequency
- ratio
- percentage
- pressure
- energy
- amount-of-substance
- concentration
- unitless score

The list is not a clinical catalogue. New dimensions require an explicit contract decision rather than a connector-specific shortcut.

### Unit compatibility

Two units are directly convertible only when:

- they belong to compatible dimensions
- an active conversion method exists
- required context is available
- the conversion does not introduce misleading precision
- any source-specific meaning has been resolved

A compatible display label is not sufficient evidence of dimensional compatibility.

### Count units

Counts may declare a semantic count unit such as steps, events, tablets, or repetitions.

Count units are not generally interchangeable merely because all have integer magnitudes.

### Unitless values

Unitless does not mean context-free.

A ratio, percentage, index, score, and arbitrary source number may all lack a physical unit while requiring different variable contracts and normalization rules.

### Ambiguous units

An ambiguous source unit remains unresolved until context identifies its meaning.

Examples of ambiguity include:

- a source label with multiple accepted meanings
- a unit whose scale depends on a test method
- a device-specific score without its model or version
- a medication unit whose meaning depends on a product formulation

The system must preserve the source text and fail normalization visibly rather than guessing.

## Source, parsed, normalized, and display representations

The model distinguishes four representations.

### Source representation

Exactly what the source asserted, including original text, numeric spelling, unit label, category label, and relevant formatting.

### Parsed representation

A structured interpretation of the source representation.

Parsing may identify a number, unit candidate, category candidate, range, qualifier, or absence reason. A parsed representation is not automatically canonical or confirmed.

### Normalized representation

A deterministic conversion into an internal canonical representation under an identified method and version.

Normalization does not replace the source representation.

### Display representation

A person-facing rendering chosen for locale, accessibility, preference, or context.

Display formatting must not change canonical meaning or become a new source assertion.

## Normalization record

A normalization is an explicit provenance-bearing relationship.

Conceptual fields:

- `id`
- input record or value reference
- output record or value reference
- normalization method ID
- method version
- input unit or category
- output unit or category
- exact parameters or rule-set reference
- execution actor
- execution time
- deterministic result status
- warnings or precision effects

A normalized value may be represented as a derived record or as a declared normalized representation attached through provenance. The later contract decision must use one approach consistently and preserve source authority.

## Normalization method classes

The baseline recognizes:

- identity mapping
- exact scale conversion
- affine conversion
- category mapping
- deterministic parsing
- deterministic rounding for display only
- aggregation
- context-dependent conversion

### Identity mapping

Confirms that source and canonical representation are equivalent under a versioned mapping.

### Exact scale conversion

Uses a declared multiplicative factor.

Example: a versioned conversion from pounds to kilograms.

The method should preserve enough precision to reproduce the output and disclose any display rounding separately.

### Affine conversion

Uses a declared scale and offset.

Temperature conversions are a common example. The method must be explicit rather than treated as a simple multiplicative factor.

### Category mapping

Maps a source code or label to an internal category with a declared relation and review state.

A mapping may be:

- exact
- narrower-than
- broader-than
- related-but-not-equivalent
- unmapped

Only an exact mapping may be used as silent canonical equivalence. Other relations require visible interpretation or review.

### Deterministic parsing

Transforms source text into a structured candidate under a declared grammar and version.

Parsing does not grant confirmation authority.

### Display rounding

Changes presentation precision without changing the stored normalized value.

Display rounding must not be written back as a new source or canonical assertion unless the person intentionally records it as such.

### Aggregation

Produces a derived record from identified inputs using a method permitted by the variable definition.

Aggregation requires:

- input record references
- non-overlap or overlap behavior
- temporal window
- missing-value behavior
- unit handling
- method version

### Context-dependent conversion

Requires information beyond a magnitude and unit.

Examples may include a conversion that depends on substance, formulation, body surface area, device calibration, or assay method.

Context-dependent conversions must fail closed when required context is absent. They require a domain-specific reviewed method and must not be added to a generic unit-conversion table.

## Precision and rounding

The model distinguishes:

- source precision
- parsed precision
- calculation precision
- stored normalized precision
- display precision

Normalization must not claim more precision than the source and method support.

Rules:

- preserve the original source text where available
- record significant digits or stated precision when known
- avoid binary floating-point artefacts in authoritative interchange
- use explicit rounding modes when rounding affects stored derived results
- treat display rounding as presentation unless a reviewed method states otherwise
- do not fabricate trailing decimal places to suggest accuracy

## External mappings

An external mapping relates an internal variable, unit, category, or method to an external system.

Conceptual fields:

- internal target ID
- external system identifier
- external code or field
- external version
- mapping relation
- review state
- reviewer or responsible steward
- source or licence note
- valid-from and valid-until metadata where relevant

External systems may include:

- clinical terminologies
- laboratory code systems
- unit standards
- device schemas
- connector fields
- public datasets
- personally defined local vocabularies

No specific external system is selected by this baseline.

### Mapping authority

An external mapping does not:

- transfer ownership of the internal variable
- make an external code required for manual capture
- make the external system’s licence apply to unrelated internal content
- convert a source claim into a clinically validated fact
- permit a connector to change the internal variable definition

## Variable evolution

A variable definition may receive a revision when labels, aliases, explanations, mappings, or non-semantic metadata change.

A new identity or explicit migration decision is required when changing:

- the represented concept
- accepted value family
- unit dimension
- temporal semantics
- aggregation semantics
- category-set meaning
- clinical or safety interpretation

Historical records retain the variable revision under which they were validated. A newer definition does not silently reinterpret prior records.

## Validation invariants

The eventual deterministic validator must reject or flag:

- a record whose value family is not accepted by its variable definition
- a quantity without a resolvable unit
- a unit whose dimension conflicts with the variable definition
- a category outside the declared category set
- an ordinal value without a scale identity and version
- a range with no bounds or inverted bounds
- an absent value combined with a substantive value
- normalization without input, output, method, or version
- a derived or normalized record that loses source provenance
- incompatible-dimension conversion
- context-dependent conversion without required context
- unsupported aggregation
- conversion that silently replaces raw source data
- an external mapping represented as exact when its declared relation is broader, narrower, or merely related
- identifiers tied directly to a provider account, database row, or connector field

## Synthetic examples

These examples are conceptual and do not contain real health data.

### Manual weight observation

```text
variable: variable.body.weight
source value: 150
source unit: unit.mass.pound
normalization: normalization.mass.pound-to-kilogram.v1
normalized value: derived and traceable
source value remains inspectable
```

### Device step count

```text
variable: variable.activity.step-count
value kind: integer-count
count unit: unit.count.step
temporal semantics: period-total
source field mapping: device-specific and versioned
```

### Ordinal symptom score

```text
variable: variable.symptom.pain-intensity
value kind: ordinal
scale: scale.pain-intensity.self-report.v1
selected value: scale-value.pain-intensity.4
no assumption of equal distance between adjacent values
```

### Unknown source unit

```text
source text: "12 units"
parsed magnitude: 12
unit status: unresolved
normalization status: failed-visible
canonical quantity: not created until meaning is resolved and confirmed
```

### Withheld value

```text
value kind: absent
reason: withheld-by-person
core product rights: unchanged
progression and governance weight: unchanged
```

## Boundary with incentives and governance

Variable detail, measurement frequency, sensitive categories, or external terminology richness must not become a proxy for worthiness, product access, progression, compensation eligibility, or governance authority.

The model must not create incentives to:

- record more intimate detail than the person needs
- select a clinical code when plain language is sufficient
- grant broader permission to obtain normalization or export
- connect a device to obtain core rights
- accept an AI-proposed mapping to complete a quest
- expose a source document to improve governance weight

Game progression may consume only a bounded deterministic fact defined by the Quest Engine contract. It does not inspect disclosure volume or intimate content.

## Boundary with AI

AI may propose:

- a variable candidate
- a parsed value
- a unit candidate
- a category candidate
- a mapping candidate
- a clarification question

AI may not:

- activate a variable definition
- declare an ambiguous unit resolved without evidence
- confirm a Chronicle record
- invent a normalization method
- choose a clinically meaningful code silently
- overwrite source values
- convert uncertainty into fabricated precision

Material AI-assisted mappings require responsible human provenance and review appropriate to their risk.

## Boundary with providers and operators

A provider or operator may store definitions, mappings, and values, but custody does not confer semantic authority.

The contract must support:

- exporting internal variable definitions
- exporting unit and category definitions needed to interpret records
- exporting normalization method identities and versions
- rebuilding normalized outputs from source values where methods are available
- replacing terminology, device, cloud, database, or analytics providers without rewriting Chronicle identity or source history

## Open questions for later Sprint 3 work

1. Which baseline value families belong in schema version `0.1.0`, and which should remain extensions?
2. Should normalized representations be Chronicle records, provenance-linked representations within a record, or both under distinct conditions?
3. What exact decimal representation should the TypeScript and JSON Schema contracts use?
4. Which unit dimensions and units are required for the first synthetic fixtures?
5. Which external terminology mappings require legal, clinical, or licensing review before distribution?
6. How are category mappings represented when a source code is broader or narrower than an internal category?
7. Which normalization methods may be maintained as project-owned deterministic rules, and which require specialist ownership?
8. How should recalculation behave when a method version changes or a source record is corrected or deleted?
9. Which aggregation semantics are safe enough for the pre-stable baseline?
10. What minimum metadata allows a person to understand a normalized value without exposing implementation complexity?

These questions must be answered through contracts, fixtures, and review rather than hidden in connector code, database migrations, or analytics jobs.

## Workstream 3.4 exit condition

Workstream 3.4 is complete at the architecture level when:

- variable identity is independent of vendors and external codes
- value families distinguish zero, false, unknown, missing, withheld, and invalid
- units declare dimensions and compatibility
- raw, parsed, normalized, and display representations remain distinct
- normalization requires a method, version, inputs, outputs, and provenance
- unsupported or ambiguous conversions fail visibly
- mappings preserve relation and review state
- no variable, value, unit, or normalization choice creates disclosure-based progression or governance power
- implementation and specialist questions remain explicit
