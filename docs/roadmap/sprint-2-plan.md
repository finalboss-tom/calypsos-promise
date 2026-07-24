# Sprint 2 — Controlled Vocabulary and Content Schemas

**Status:** IN PROGRESS  
**Goal:** Keep public, in-world, technical, and governance language synchronized and make active content machine-validatable without losing the project’s core incentive model.

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

### Incentive integrity

- Personal value before secondary use
- Explicit connected product loop and player value for quests
- Deterministic completion and reward rules
- Vitality, Chronicle, Fellowship, Renown, Laurels, restoration, story unlocks, and clues
- No reward for broader consent or unnecessary intimate disclosure
- Meaningful decline, deferral, exit, and non-punitive return

### Canon and policy validation

- Unique namespaced content IDs
- Required metadata and authorship provenance
- Schema version `0.1.0`
- Review-state and capability-status separation
- Retired-term checks
- Mandatory refusal, defer, or exit routes for interactive scenes
- Decline and deferral support for quests
- Shame-free notification declaration
- Deterministic references to approved canon and content
- Reward-type allowlist

### Minimum viable validation

- One contributor command: `pnpm check`
- Separate CI results for formatting, repository policy, content validation, lint, typecheck, tests, and DCO
- Public or synthetic data only
- Actionable failures without private infrastructure or credentials
- Human review for contextual canon, privacy, safety, accessibility, clinical, research, and economic judgments

## Reconciliation completed

- One pre-stable schema version
- One common metadata vocabulary
- Dotted namespaced IDs and kebab-case slugs
- Explicit authorship, review requirements, and named approvals
- Review state separated from publication state
- TypeScript contracts aligned with canonical examples
- Reusable and repository-wide validators aligned with the same baseline
- MVV test fixtures for incentive integrity, review completeness, retired language, and player agency

## Remaining during this sprint

- Resolve formatting differences
- Confirm all separated CI checks run to completion
- Add canonical quest, lesson, and notification examples
- Add JSON Schema export for authoring tools
- Finalize review, publication, rollback, and replacement documentation
- Capture the Sprint 2 completion record

## Acceptance criteria

- Lore and product content validate without running the game.
- Public, in-world, technical, and governance terms map explicitly.
- Active content containing retired language fails validation.
- AI-assisted or human-authored content cannot become publishable without explicit human review metadata.
- Scene and quest contracts preserve refusal and player agency.
- Quest contracts expose the connected loop, immediate player value, deterministic completion, and approved reward type.
- CI reports formatting, policy, content, lint, typecheck, tests, and DCO independently.
