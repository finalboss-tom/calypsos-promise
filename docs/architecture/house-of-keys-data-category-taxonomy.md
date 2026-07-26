# House of Keys Data-Category Taxonomy

**Status:** PROPOSED Sprint 4 conceptual baseline  
**Workstream:** 4.3 — Data-category taxonomy  
**Tracking issue:** #32

## Purpose

The data-category taxonomy defines the semantic kind of information over which an actor requests authority.

A House of Keys data category is a stable, versioned permission-scope object. It is not a provider field, file format, database table, source system, Chronicle variable value, legal conclusion, sensitivity score, recipient, purpose, action, subject, time range, or record identifier.

A category definition does not create authority. It becomes one explicit input to a later grant, scope expression, explanation, policy request, decision, and receipt.

## Governing rules

This taxonomy implements and may not weaken:

- the frozen Product Constitution
- the frozen Architecture Foundation
- the controlled vocabulary and deterministic incentive contract
- the Sprint 3 separation among Chronicle truth, source truth, derived truth, interpretive truth, permission truth, product-state truth, and AI-memory truth
- the Living Chronicle variable, value, unit, provenance, correction, document, export, and deletion boundaries
- the House of Keys ontology and purpose taxonomy
- the Institutional Immune System
- the repository and module-boundary rules

Every category must have a direct explanation available without narrative traversal. Narrative language may describe a category, but it may not hide, merge, broaden, or substitute for the technical scope.

## Distinction from Chronicle coded values

The Living Chronicle uses category sets and category values to represent an asserted value such as a status or descriptor. Those `CategoryId` values answer what value a Chronicle record asserts.

A House of Keys data category answers what semantic class of information is in scope for a requested operation.

For example:

- `category.pain-intensity.moderate` may be a coded value inside a Chronicle record;
- `data.chronicle.symptom` may classify that record for permission evaluation.

The two identifiers have different owners, meanings, versioning rules, and authority. One must never be substituted for the other.

## Category semantics

A data category answers:

> What bounded kind of information would this exact operation read, create, transform, transmit, export, correct, delete, or otherwise affect?

A data category does not answer:

- why the operation is requested
- who requests, receives, or performs it
- which action is allowed
- which subject or Chronicle is affected
- which exact records or variables are selected
- how long authority lasts
- whether the information is accurate, clinically valid, safe, legal, or beneficial
- whether the action occurred
- whether a person understood or accepted the request

Those facts belong to separate purpose, actor, recipient, action, subject, resource-selector, duration, grant, comprehension, decision, and receipt contracts.

## Required data-category record

A data-category definition should contain:

- stable namespaced category identity
- revision
- lifecycle status
- family identity
- whether the record is a grantable leaf or a non-grantable grouping node
- concise public name
- direct plain-language explanation
- domain owner
- included semantic content
- explicitly excluded content
- whether the category represents Chronicle, source, derived, interpretive, permission, product-state, or AI-memory truth
- selector and mapping requirements
- compatibility policy
- supersession and replacement references
- review domains and sensitivity hints
- effective and review timing
- uncertainty and unresolved constraints

A category identifier must not contain an email address, provider subject, connector name, vendor code, database key, URL, object-storage key, wallet address, file path, or other replaceability-breaking value.

Sensitivity hints may require stronger explanation or review. They do not create permission, establish a legal classification, or allow one category to substitute for another.

## Taxonomy structure

The taxonomy is hierarchical for navigation and review, but grants bind only to explicit grantable leaf categories.

A family or grouping node:

- organizes related categories
- cannot be selected as authority
- cannot imply authority over its descendants
- cannot cause later-added descendants to enter an earlier grant
- cannot be used as a shortcut for “all health data,” “the whole Chronicle,” or “all current and future data”

A grantable leaf:

- identifies one bounded semantic class
- declares included and excluded content
- can be combined with purpose, recipient, action, subject, exact-resource, variable, condition, and duration facts
- cannot silently inherit broader authority from its parent family

The default compatibility rule is **exact category only**.

## Scope and selector rules

Category selection is one part of a complete data scope.

1. Every selected category must be explicit and grantable.
2. Family nodes, wildcards, negated selectors, and implicit “all” categories are invalid.
3. Multiple selected leaf categories form an explicit set; no unlisted category is implied.
4. Exact record, source-artifact, variable, or document-version selectors may narrow a category scope. They may not broaden it.
5. Subject, Chronicle, time, purpose, recipient, action, and duration constraints remain separate and must not be encoded into category identity.
6. Provider, connector, device, file type, storage location, table name, or source vocabulary may be mapping or selector metadata but cannot define canonical category meaning.
7. A category for raw source content does not imply authority over extracted Chronicle records, and a Chronicle category does not imply authority over raw source content.
8. A category for an input record does not imply authority over a derived calculation, association, or inference.
9. A category for a derived or interpretive output does not imply authority over all source inputs.
10. A category for a grant, decision, receipt, or comprehension record does not create permission to access the underlying Chronicle data.
11. Missing, unknown, retired, invalidated, or unmapped categories never default to allow.
12. A newly added category or descendant never enters an existing grant without explicit new authority or an accepted migration rule.

The complete selector expression and grant binding remain workstream 4.4.

## Record-envelope and context rule

A selected Chronicle record carries a minimum semantic envelope needed to interpret that record, including its stable identity, subject reference, record family, assertion class, temporal assertion, lifecycle state, and the provenance references required to avoid presenting it as unsupported fact.

This minimum envelope does not authorize:

- unrelated Chronicle records
- raw document or device payload content
- other source-artifact versions
- detailed custody or operator metadata
- hidden linked records
- inferred, associated, or derived outputs outside the selected category
- account, product-state, AI-memory, permission, research, or compensation records

When a requested operation needs broader provenance, source content, corrections, relationships, or linked inputs, those categories and selectors must be explicit.

## Initial category families and leaves

The initial taxonomy is a semantic permission baseline, not a complete clinical ontology. It intentionally uses broad, understandable leaves that can later be refined through versioned review without embedding a specific medical terminology.

### Chronicle record content

`data.chronicle` is a non-grantable family for person-controlled Chronicle records.

#### `data.chronicle.symptom`

**Direct explanation:** Selected Chronicle records describing a person-reported or source-reported symptom, discomfort, functional limitation, or episode.

**Includes:** Symptom observations and intervals, their minimum record envelopes, and explicit uncertainty.

**Excludes:** Diagnosis, treatment recommendation, raw documents, unrelated body measurements, derived associations, and inferences.

#### `data.chronicle.body-measurement`

**Direct explanation:** Selected Chronicle records describing a body measurement or physiological measurement.

**Includes:** Measurements such as weight, temperature, heart rate, or blood pressure when represented by an accepted internal variable.

**Excludes:** Clinical interpretation, diagnosis, raw device payloads, unrelated laboratory documents, and inferred risk.

#### `data.chronicle.activity-mobility`

**Direct explanation:** Selected Chronicle records describing movement, activity, exercise, mobility, posture, or functional activity.

**Includes:** Accepted activity and mobility variables, intervals, counts, and person-confirmed context.

**Excludes:** Automatic health-benefit claims, location history unless separately selected, raw device payloads, and unrelated goals.

#### `data.chronicle.sleep-rest`

**Direct explanation:** Selected Chronicle records describing sleep, rest, awakenings, schedules, or sleep-related experiences.

**Includes:** Accepted sleep and rest variables, intervals, observations, and person-reported context.

**Excludes:** Diagnosis, raw wearable payloads, unrelated mental-health records, and derived clinical conclusions.

#### `data.chronicle.nutrition-hydration`

**Direct explanation:** Selected Chronicle records describing food, drink, nutrition, hydration, meals, or related experiences.

**Includes:** Person-controlled observations, intervals, and notes explicitly categorized within this leaf.

**Excludes:** Purchasing data, unrelated location data, diagnosis, commercial profiling, and raw images or documents unless separately selected.

#### `data.chronicle.medication-treatment`

**Direct explanation:** Selected Chronicle records describing medication, supplement, treatment, therapy, procedure, or other intervention use.

**Includes:** Person-controlled use, schedule, adherence-state, effect, or intervention records represented by accepted variables or record families.

**Excludes:** Prescribing authority, treatment recommendation, legal or clinical validation, pharmacy account data, and raw documents unless separately selected.

#### `data.chronicle.laboratory-test`

**Direct explanation:** Selected Chronicle records containing a laboratory, test, screening, imaging, or examination claim extracted or entered into the Chronicle.

**Includes:** Accepted structured result records and their minimum provenance references.

**Excludes:** The raw report, image bytes, full document, diagnosis, treatment recommendation, and unrelated results outside the selected scope.

#### `data.chronicle.reproductive-sexual`

**Direct explanation:** Selected Chronicle records describing reproductive, menstrual, pregnancy, fertility, sexual-health, or related lived-experience information.

**Includes:** Only records explicitly classified into this leaf through accepted mappings or person confirmation.

**Excludes:** Assumptions based on age, sex, gender, relationship status, medications, or other proxy signals; raw documents and unrelated identity data.

#### `data.chronicle.mental-emotional`

**Direct explanation:** Selected Chronicle records describing mood, emotion, stress, mental experience, cognitive experience, or related reflections.

**Includes:** Explicit observations, intervals, reflections, or accepted variables in this leaf.

**Excludes:** Diagnosis, crisis classification, hidden inference from unrelated behavior, raw conversations, and AI memory.

#### `data.chronicle.environment-location-context`

**Direct explanation:** Selected Chronicle records describing an environment, place, exposure, weather, social context, or other contextual condition attached to lived experience.

**Includes:** Explicitly recorded or imported contextual assertions classified into this leaf.

**Excludes:** Continuous location tracking, account network data, hidden device metadata, and context inferred from unrelated records unless separately authorized.

#### `data.chronicle.reflection-note`

**Direct explanation:** Selected person-authored or person-confirmed Chronicle reflections, notes, recollections, or narrative descriptions.

**Includes:** Chronicle reflection records and text values explicitly selected by the person or scope.

**Excludes:** AI conversation history, private correspondence, raw support records, source documents, and notes outside the selected scope.

#### `data.chronicle.goal-plan`

**Direct explanation:** Selected Chronicle records describing a person’s goals, intentions, plans, schedules, or self-chosen targets.

**Includes:** Goal and plan records under the person’s control.

**Excludes:** Quest progression, incentives, adherence scoring, treatment orders, governance commitments, and inferred intentions.

#### `data.chronicle.other-unmapped`

This is a non-grantable holdpoint for Chronicle records that cannot be resolved to an active leaf category. It cannot produce `allow` until the record is mapped or a separately reviewed exact-record exception exists.

### Derived and interpretive Chronicle content

`data.chronicle.computed` is a non-grantable family. Inputs and outputs remain separately scoped.

#### `data.chronicle.derived-calculation`

**Direct explanation:** Selected deterministic calculations or normalized representations produced from identified Chronicle inputs and a versioned method.

**Excludes:** Descriptive associations, model inferences, clinical conclusions, and unselected source inputs.

#### `data.chronicle.descriptive-association`

**Direct explanation:** Selected descriptive associations stating that defined events or values tended to occur together during a stated period.

**Excludes:** Causality, diagnosis, treatment advice, model inference, and automatic access to all source inputs.

#### `data.chronicle.inference`

**Direct explanation:** Selected classifications, predictions, or inferred claims that remain explicitly distinguishable from observations and calculations.

**Excludes:** Direct observations, source truth, legal or clinical authority, and automatic access to all model inputs or training data.

### Source artifacts and detailed provenance

`data.source` is a non-grantable family for source truth and evidence artifacts that remain separate from Chronicle truth.

#### `data.source.document-content`

**Direct explanation:** Selected raw document content or immutable source-document versions.

**Includes:** Only the exact document versions and locators selected by the scope.

**Excludes:** Other document versions, extracted Chronicle claims, unrelated attachments, and provider storage metadata.

#### `data.source.attachment-content`

**Direct explanation:** Selected attachment bytes or attachment representations associated with a Chronicle or source artifact.

**Excludes:** Other attachments, the full parent document unless separately selected, derived representations, and custody credentials.

#### `data.source.raw-import-payload`

**Direct explanation:** Selected raw payload content received from a device, connector, import, or source system before canonical interpretation.

**Excludes:** Provider credentials, unrelated payload fields, normalized Chronicle records, and future synchronization authority.

#### `data.source.detailed-provenance`

**Direct explanation:** Selected detailed source, transformation, derivation, confirmation, locator, and custody-reference metadata beyond the minimum Chronicle record envelope.

**Excludes:** Raw source content unless separately selected, provider credentials, operator secrets, and authority over linked records.

### House of Keys records

`data.permission` is a non-grantable family for permission truth and inspectability records.

#### `data.permission.grant-record`

**Direct explanation:** Selected versioned grant records, including their scope, lifecycle, authority, and supersession history.

**Excludes:** Underlying Chronicle content and authority not expressed by the grant itself.

#### `data.permission.policy-decision`

**Direct explanation:** Selected deterministic policy decisions and the explicit facts, policy revision, outcomes, and reasons recorded for them.

**Excludes:** Proof that an operation occurred and access to underlying data not otherwise authorized.

#### `data.permission.access-receipt`

**Direct explanation:** Selected access receipts describing a request, decision, attempt, access, denial, or failure.

**Excludes:** Retroactive authorization and access to the underlying data merely because it is referenced by a receipt.

#### `data.permission.comprehension-evidence`

**Direct explanation:** Selected records showing what explanation was presented and what comprehension evidence was collected for a permission decision.

**Excludes:** A claim that understanding was perfect, legal consent was valid, or unrelated health and product-state information may be accessed.

### Explicitly separate and deferred domains

The following do not enter a Chronicle or House of Keys category by convenience:

- account authentication, identity proofing, recovery, and provider identifiers
- story, quest, progression, reward, and notification state
- AI conversation history, retained preferences, and AI memory
- support, conduct, personnel, security, and private correspondence records
- research datasets, study operations, enrollment, and analysis outputs
- compensation, payments, marketplaces, treasury, ownership, and governance records
- production logs, infrastructure telemetry, secrets, and administrative credentials

Future work may define separate taxonomies and policies for these domains. Until then, an operation requiring them must be denied, indeterminate, or separately reviewed rather than relabeled as Chronicle data.

## Lifecycle states

Data-category definitions use explicit lifecycle states:

- `proposed` — under design; not grantable
- `active` — accepted for use under its current revision and review gates
- `deprecated` — no new grants; existing references require review and an explicit compatibility decision
- `superseded` — replaced by another definition; prior grants do not transfer automatically
- `retired` — unavailable for future authorization
- `invalidated` — determined unsafe, misleading, contradictory, or otherwise unusable; future evaluation must not allow

Lifecycle changes do not rewrite prior grants, decisions, receipts, source artifacts, or Chronicle records.

Deprecation, supersession, retirement, or invalidation must identify:

- reason
- responsible authority
- effective time
- affected grants, decisions, receipts, and mappings
- replacement or migration path, when any
- review and appeal path
- whether immediate containment is required

## Versioning and semantic change

A category revision must preserve an inspectable history.

The following require at least a new revision:

- explanation clarification
- exclusion clarification
- mapping correction that does not change semantic scope
- lifecycle or review metadata change
- translation correction
- additional non-authorizing examples

The following require a new category identity and new authority rather than automatic migration:

- broader included content
- removal of a material exclusion
- addition of raw source content to a Chronicle category
- addition of derived or inferred content to an input category
- addition of a separate domain such as account, product state, AI memory, research, or commerce
- merging two previously distinct categories
- changing the domain owner or truth class
- converting a non-grantable family or holdpoint into a grantable leaf with materially broader meaning

A narrower successor still does not silently inherit grants. Migration behavior must be explicit and testable.

## Compatibility rules

Category compatibility is conservative and versioned.

1. Exact identity and accepted revision are the default requirement.
2. Shared family membership does not imply compatibility.
3. Similar wording, variable names, clinical codes, provider fields, file formats, or connector mappings do not imply compatibility.
4. A policy may recognize a later clarification revision only when semantic equivalence is recorded and the grant’s compatibility behavior permits it.
5. A broader category is never compatible with a narrower grant.
6. A split, merge, rename with changed meaning, or cross-domain move requires explicit review and usually new authority.
7. An AI system, connector, or external terminology may suggest a mapping but cannot authoritatively declare compatibility.
8. Unknown, retired, invalidated, or unmapped categories cannot produce implicit allow.

Compatibility evidence must name the compared identities and revisions, reviewing authority, reason, uncertainty, affected grants, and rollback condition.

## Mapping rules

Mappings connect external or Chronicle-specific concepts to House of Keys categories without transferring authority.

A mapping record should identify:

- mapping identity and revision
- source vocabulary or variable identity
- target House of Keys category identity and revision
- mapping kind: exact, narrower, broader, partial, contextual, or unresolved
- conditions and exclusions
- author and reviewing authority
- evidence and uncertainty
- lifecycle and review time

Only an accepted `exact` mapping may classify a record automatically for an otherwise valid request. A narrower, broader, partial, contextual, unknown, or conflicting mapping produces review, `deny`, or `indeterminate` behavior under the accepted policy.

A source system cannot make a category active by sending a familiar label or code.

## Anti-broadening prohibitions

The following are invalid category shortcuts:

- “all health data”
- “the whole Chronicle”
- “all current and future information”
- “anything relevant”
- “wellness data” without active leaf categories
- “sensitive data” as a substitute for semantic scope
- “de-identified data” as a category
- “device data,” “provider data,” or a file format as canonical meaning
- “AI context” as authority over Chronicle records, source documents, or retained conversations
- a single category that silently combines direct observations, raw sources, derived values, associations, and inferences
- a grant to one category automatically including corrections, linked records, descendants, future variables, or future category leaves

A precise purpose label cannot cure an overbroad or unresolved data category.

## Direct explanation requirements

Every grantable category must support a direct explanation that states:

- what kind of information is included
- materially different information that is excluded
- whether raw source content, derived values, associations, inferences, or permission records are included
- how exact records, variables, subjects, and time ranges further narrow the scope
- whether the category has heightened review or sensitivity hints
- what happens when a record cannot be mapped confidently
- where purpose, recipient, action, duration, revocation, and receipt details will appear

The explanation must not:

- use narrative as the only description
- substitute a provider, device, file type, source label, or clinical code for semantic meaning
- imply diagnosis, treatment, legality, safety, or research approval
- hide raw source access inside structured-record wording
- hide derived or inferred outputs inside input categories
- imply that refusal reduces dignity, worth, core progression, or basic rights

Full explanation templates and comprehension evidence remain workstream 4.7.

## Adversarial review cases

The data-category taxonomy must support deterministic or reviewable evidence for:

- blanket-category requests
- family-node or wildcard selection
- implicit expansion to future descendants or variables
- provider labels being treated as canonical category authority
- raw source content being hidden inside structured Chronicle access
- derived, association, or inference outputs being bundled with source inputs
- input data being inferred from access to an output
- exact-resource selectors that point outside their declared category
- purpose laundering combined with broad category wording
- unknown, legacy, deprecated, superseded, or invalidated category use
- conflicting external mappings
- AI-generated category substitution or broadening
- a receipt or prior access being treated as authority for a broader category

These become fixtures and tests during workstreams 4.8 and 4.9.

## Initial unresolved register

- specialist review of the initial category leaves and sensitivity hints
- clinical terminology and external-code mapping
- finer-grained categories within medications, reproductive health, mental health, laboratory data, genetics, imaging, and location
- multi-subject and shared-record category behavior
- category behavior for account, product-state, AI-memory, support, security, research, and economic domains
- exact selector expression, set operations, and conflict handling
- minimum provenance closure for every action class
- downstream-recipient and transformed-output category propagation
- de-identification, aggregation, and privacy-transformation categories
- retention and deletion behavior by category
- production mapping registries, cache behavior, and concurrent category revisions
- privacy, legal, accessibility, security, clinical, and research approval

These are explicit hold points, not authority granted by omission.

## Success condition

The data-category boundary is sound when a person can understand what kind of information is included and excluded; raw sources, Chronicle records, calculations, associations, inferences, and permission records remain distinguishable; exact selectors can narrow but never broaden the scope; and no provider label, family node, wildcard, future category, or implementation convenience silently expands authority.
