# Sprint 2 — Controlled Vocabulary and Content Schemas

**Status:** IN PROGRESS  
**Goal:** Keep public, in-world, technical, and governance language synchronized and make active content machine-validatable.

## Workstreams

### Vocabulary

- Controlled mapping among public, narrative, technical, and governance terms
- Evidence-language rules
- Capability-status labels
- Retired terminology warehouse and enforcement

### Content contracts

Versioned contracts for:

- Zones
- Characters
- Scenes and choices
- Dialogue
- Quests, requirements, and rewards
- Lessons
- Notifications

### Canon and policy validation

- Unique content IDs
- Required metadata
- Schema-version and review status
- Retired-term checks
- Mandatory refusal routes for interactive scenes
- Decline support for quests
- Shame-free notification declaration
- Deterministic references to approved canon

### Content operations

Still to add during this sprint:

- Reference and dependency validation
- Spoiler-state rules
- Review-domain and approval-state workflow
- Content rollback and replacement rules
- JSON Schema exports for authoring tools
- Tests for valid and invalid content fixtures
- Additional canonical examples covering all content kinds

## Acceptance criteria

- Lore and product content validate without running the game.
- Public, in-world, technical, and governance terms map explicitly.
- Active content containing retired language fails validation.
- AI-generated or human-authored content cannot become publishable without explicit review metadata.
- Scene and quest contracts preserve refusal and player agency.
- CI runs the content validator for every pull request.
