# Story Studio Architecture

**Status:** BASELINE for authoring boundaries; implementation details remain PROPOSED

Story Studio is the visual authoring environment for Calypso’s Promise narrative content. It exists so writers, designers, safety reviewers, accessibility reviewers, and canon stewards can build Ogygia without editing raw JSON or application code.

## Purpose

Story Studio turns structured creative work into validated content records consumed by the runtime.

The intended authoring flow is:

```text
Scene
  → dialogue
  → choices
  → quest requirements
  → rewards
  → state changes
  → unlocks
  → review
  → publishable content package
```

Story Studio does not become the source of truth for player health data, consent, accounts, analytics, or production secrets. It authors versioned content only.

## Architectural position

```text
Story Studio UI
  ↓
Authoring commands
  ↓
Content graph model
  ↓
@calypsos-promise/content-schema
  ↓
Validation and review gates
  ↓
Versioned content files
  ↓
Story runtime and game clients
```

The content files remain portable, reviewable, diffable, and usable without Story Studio.

## Core modules

### Graph canvas

Visual construction of scenes, dialogue, choices, quests, lessons, notifications, and state transitions.

### Inspector

Structured editing for the selected node, including canon references, player value, refusal paths, accessibility notes, safety boundaries, capability status, and spoiler gates.

### Review desk

Named editorial, canon, privacy, safety, clinical, and accessibility review. Approved content cannot bypass required review domains.

### Preview player

Runs a deterministic synthetic preview of a scene graph. It never loads a real player Chronicle.

### Diff and history

Shows revisions, replacements, superseded records, and rollback candidates in human-readable form.

### Publisher

Exports validated content records and a content manifest. Publishing is a controlled state transition, not a save button.

## Engine boundaries

Story Studio may call:

- content validation
- graph validation
- canon-reference validation
- story-state simulation
- synthetic preview rendering
- version and migration tools

Story Studio may not call:

- Chronicle production data
- user identity or authentication records beyond editor authorization
- clinical inference services
- research enrollment
- compensation systems
- unrestricted MCP tools
- arbitrary database queries

## Content graph

The graph is composed of typed nodes and explicit edges.

Initial node types:

- Zone
- Character
- Scene
- Dialogue
- Choice
- Quest
- Requirement
- Reward
- Lesson
- Notification
- State gate
- State grant
- Review gate

Initial edge types:

- contains
- speaks
- chooses
- requires
- grants
- unlocks
- follows
- references
- supersedes

Every graph must compile into records accepted by `@calypsos-promise/content-schema`.

## Non-negotiable authoring rules

- Every interactive sequence offers a refusal, exit, or defer path.
- Health disclosure cannot be required merely to continue the story.
- Rewards cannot depend on intimate disclosure.
- Approved AI-assisted content names its human reviewers.
- Retired terminology is blocked from active content.
- Spoiler gates and capability gates are explicit.
- Unavailable capabilities cannot be written as live.
- Published records remain reproducible from committed source content.

## Runtime separation

Story Studio creates content. The story runtime executes content.

The runtime owns:

- current story state
- deterministic eligibility checks
- node traversal
- completion events
- content-version pinning
- migration from superseded records

The runtime does not modify authored canon or silently generate new canonical dialogue.

## AI assistance

AI may help draft alternatives, summarize branches, identify broken references, or suggest plain-language variants. AI output remains a proposal.

AI may not approve content, waive review, change frozen canon, or publish directly.

## Phase plan

### Studio 0 — Contracts

- content graph types
- compiler interface
- deterministic validation
- story-state vocabulary
- review transitions

### Studio 1 — Read-only explorer

- load committed content
- render graph
- inspect references
- preview deterministic paths

### Studio 2 — Local authoring

- create and edit nodes
- validate continuously
- export canonical files
- show diffs before commit

### Studio 3 — Review workflow

- reviewer assignments
- specialist gates
- approval history
- replacement and rollback

### Studio 4 — Collaborative service

- authenticated shared drafts
- comments and presence
- branch-aware publishing
- official-deployment controls

## Acceptance boundary for the first implementation

The first usable Story Studio is complete when a non-engineer can open the Lantern Shore arrival graph, change a draft dialogue line, add a refusal choice, validate the graph, preview both branches, and export a clean content diff without accessing production data.
