# Story Content Ontology

**Status:** BASELINE terminology and relationship model

This document defines the conceptual model used by Story Studio, authored content, validation, and the future story runtime. It is an ontology and planning artifact, not an implementation specification.

## Core distinction

Calypso’s Promise separates four different kinds of truth:

1. **Canon truth** — facts about Ogygia, its laws, characters, places, and history.
2. **Authored narrative truth** — versioned scenes, dialogue, quests, lessons, and notifications.
3. **Player story state** — what a particular player has seen, chosen, unlocked, deferred, or completed.
4. **Chronicle truth** — player-controlled health and life records.

Narrative content may reference Chronicle capabilities, but the content system never becomes the Chronicle and never stores production health records.

## Primary entities

### World

A coherent narrative setting governed by canon and content rules. Ogygia is the first world.

### Zone

A meaningful place or domain within a world. A zone may contain scenes, characters, lessons, quests, and system affordances.

### Character

An authored persona with identity, role, values, voice constraints, prohibited behaviors, and zone relationships.

### Scene

A bounded interactive narrative situation. A scene establishes context, presents dialogue or choices, and may grant or require story state.

### Dialogue

Authored language spoken or presented by a character or system voice. Dialogue is not inherently a scene; it is reusable content referenced by scenes.

### Choice

A player-selectable branch within a scene. Every choice has a consequence description. Interactive sequences must include a refusal, defer, or exit path.

### Quest

An optional structured invitation to act, learn, reflect, organize, or review permissions. A quest must state player value and must permit decline without shame or penalty.

### Requirement

A deterministic condition used to establish quest or scene eligibility and completion. Requirements do not perform clinical inference.

### Reward

A declared narrative or progression consequence. Rewards may not depend on intimate disclosure and must not misrepresent uncertain future value.

### Lesson

Educational content with learning objectives, claims, evidence classification, source references, plain-language treatment, and appropriate review domains.

### Notification

A pressure-aware message that may direct a player to a story, quest, permission, safety, or system destination.

### Story state

A discrete, named fact about narrative progression. Examples include scene completion, clue discovery, invitation deferral, and permission review.

### Gate

A deterministic eligibility condition based on story state, capability status, spoiler protection, or review state.

### Review

A named human evaluation in a defined domain such as canon, privacy, safety, clinical accuracy, accessibility, or editorial quality.

### Revision

An immutable version of authored content. Corrections create a new revision or replacement relationship rather than silently changing published history.

## Relationship vocabulary

- **contains** — a world or zone includes another content entity.
- **located-in** — an entity belongs primarily to a zone.
- **guided-by** — a zone or scene is associated with a guide character.
- **speaks** — a character presents dialogue.
- **presents** — a scene offers dialogue, a lesson, a quest, or a notification.
- **chooses** — a choice branches from a scene.
- **follows** — one scene or state transition may follow another.
- **requires** — an entity depends on a state, review, capability, or content record.
- **grants** — completion or choice creates story state or progression.
- **unlocks** — a state or completion makes content eligible.
- **references** — content cites canon, evidence, or another content record without owning it.
- **reviews** — a named reviewer evaluates a revision in a review domain.
- **supersedes** — a revision or record replaces an earlier record prospectively.
- **retires** — a record is no longer active but remains historically traceable.

## Identity rules

- IDs are stable conceptual identities.
- Revisions change while IDs remain stable when the same concept is being corrected or improved.
- A materially different concept receives a new ID.
- Slugs are human-readable locators and may change only through an explicit migration plan.
- Display names are presentation content, not identifiers.

## State model

Story state should be expressible as named facts rather than hidden application behavior.

Recommended forms:

- `scene.<id>.completed`
- `scene.<id>.deferred`
- `choice.<id>.selected`
- `quest.<id>.accepted`
- `quest.<id>.declined`
- `quest.<id>.completed`
- `lesson.<id>.completed`
- `clue.<id>.discovered`
- `permission.<id>.reviewed`
- `zone.<id>.unlocked`

The exact serialization remains PROPOSED. The semantic distinction between accepted, declined, deferred, and completed is BASELINE.

## Capability ontology

Content must distinguish:

- **live** — available and supported in the current product.
- **experimental** — available only within an explicitly limited experiment.
- **planned** — approved direction without current availability.
- **long-horizon** — strategically relevant but not committed to a near-term release.
- **deferred** — intentionally postponed or blocked.

Narrative language must not present planned or long-horizon capabilities as live.

## Review ontology

Review domains are independent dimensions, not a single approval score.

Initial domains:

- editorial
- canon
- privacy
- safety
- clinical
- accessibility
- security
- research governance
- economic claims

A content type declares required review domains. Publication requires every required domain to be satisfied by a named human reviewer.

## Publication ontology

Recommended lifecycle:

```text
draft
  → editorial-review
  → specialist-review
  → approved
  → published
  → superseded or retired
```

`approved` means the content is eligible to publish. `published` means it is part of an identified content release. These concepts must remain distinct even if the initial repository stores only approved source records.

## Boundary rules

- Canon may constrain content, but ordinary content does not silently change canon.
- Story state may affect presentation and eligibility, but it is not Chronicle data.
- Chronicle events may satisfy explicit requirements only through consented, deterministic domain interfaces.
- AI output is always a proposal until human-authored or human-reviewed status is recorded.
- Review status is not inferred from authorship or repository location.
- Economic, health, or research claims require explicit evidence and review treatment.

## Open questions

The following remain PROPOSED and should be decided before runtime implementation:

- whether story state is event-sourced, snapshot-based, or both
- how content packs declare compatibility with runtime versions
- how localization revisions relate to source-language revisions
- whether canon references resolve to records, document anchors, or both
- how experiments fork content without fragmenting canonical history
- how published content is recalled when a safety issue is discovered
