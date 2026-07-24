# Calypso Engine Architecture

**Status:** BASELINE system boundaries; implementation details remain PROPOSED

Calypso Engine is the shared architecture beneath Calypso’s Promise experiences. Ogygia is the first world built on it. This document defines responsibilities, boundaries, and relationships among major subsystems. It does not prescribe a final technology stack.

## Architectural purpose

Calypso Engine coordinates narrative progression, player-controlled records, consent, education, quests, notifications, AI assistance, and public-good participation without collapsing them into one system or one database.

The design goal is composability with strict boundaries:

```text
Experience clients
  ↓
Application orchestration
  ↓
Domain engines
  ↓
Policy and consent boundaries
  ↓
Storage, providers, and external integrations
```

No domain engine receives unrestricted access to every other engine.

## Top-level components

### Experience clients

Browser, mobile, and future interfaces that render Ogygia, Story Studio, Chronicle views, permissions, quests, and learning experiences.

Clients are presentation and interaction surfaces. They do not define canon, consent policy, clinical interpretation, reward truth, or research eligibility.

### Application orchestration

Coordinates user-visible workflows across engines. It translates an explicit user action into bounded domain commands and composes read models for presentation.

Orchestration must not become a hidden super-domain containing business logic that belongs in an engine.

### Domain engines

Initial engine boundaries:

- Story Engine
- Quest Engine
- Dialogue Engine
- Progression Engine
- Chronicle Engine
- Consent Engine
- Learning Engine
- Notification Engine
- AI Gateway
- Research and Public-Good Gateway
- Identity and Access Boundary

These are logical boundaries. They may initially share a deployable process while retaining separate contracts and authority.

## Story Engine

### Owns

- published content-pack selection
- story-state transitions
- scene eligibility
- deterministic branch traversal
- spoiler gates
- content-version pinning
- supersession and migration rules

### Does not own

- Chronicle records
- quest completion evidence semantics
- consent decisions
- AI-generated canon
- account identity

### Inputs

- published content pack
- current story state
- explicit player choice
- bounded facts from other engines

### Outputs

- eligible scenes and choices
- deterministic state-transition proposals
- content references for presentation

## Quest Engine

### Owns

- quest availability
- acceptance, decline, defer, and completion states
- requirement evaluation
- declared player value
- reward eligibility proposals
- quest audit history

### Does not own

- underlying Chronicle data
- progression balances
- medical or behavioral interpretation
- notification delivery

A requirement is evaluated through a declared interface. The Quest Engine receives only the minimum fact required to decide whether a condition is satisfied.

## Dialogue Engine

### Owns

- dialogue selection from published content
- speaker and voice constraints
- localization selection
- deterministic variants
- presentation-safe interpolation

### Does not own

- freeform AI character authority
- canon modification
- hidden persuasion optimization
- clinical advice

Authored dialogue remains canonical. AI-assisted dialogue may be used only where an explicit product policy permits it and must remain distinguishable from approved authored content.

## Progression Engine

### Owns

- renown, vitality, restoration, laurels, clues, and other progression concepts
- reward application
- progression history
- unlock facts exposed to other engines
- balancing-version compatibility

### Does not own

- quest objectives
- Chronicle records
- economic value claims
- research compensation

Progression rewards are game-state consequences, not claims of health improvement or monetary value.

## Chronicle Engine

### Owns

- player-controlled records
- record provenance
- correction and deletion semantics
- observation, reflection, goal, and related domain records
- data export and portability rules
- bounded evidence facts exposed with consent

### Does not own

- story canon
- quest pressure
- research enrollment
- AI provider policy
- account authentication

The Chronicle is not a narrative save file. Story systems may reference consented facts but must not copy the Chronicle into narrative content storage.

## Consent Engine

### Owns

- permission definitions
- grants, denials, withdrawals, and expirations
- purpose and scope
- recipient and capability boundaries
- consent receipts
- policy-version history
- checks that precede sensitive operations

### Does not own

- user identity itself
- the data governed by consent
- research protocol truth
- UI dark-pattern decisions

Consent is an active domain decision, not a boolean column attached to a user.

## Learning Engine

### Owns

- lesson completion
- comprehension interactions
- evidence and source metadata
- review-domain requirements
- educational progression facts

### Does not own

- diagnosis
- treatment recommendation
- clinician authority
- story-state mutation except through declared completion events

## Notification Engine

### Owns

- delivery eligibility
- channel policy
- quiet hours
- expiration
- frequency controls
- shame-free and pressure-aware presentation constraints
- delivery and dismissal history

### Does not own

- creation of quest truth
- consent grants
- story progression
- urgency classification outside declared policy

A notification invites attention; it does not manufacture obligation.

## AI Gateway

### Owns

- provider abstraction
- model capability declarations
- prompt and tool policy
- input minimization
- output provenance
- safety and review routing
- retention and logging policy
- failure and fallback behavior

### Does not own

- consent authority
- canonical truth
- clinical authority
- unrestricted access to engines or tools
- silent memory

All AI access passes through explicit policy. Domain engines never call providers directly.

## Research and Public-Good Gateway

### Owns

- separation between product use and research participation
- protocol and eligibility references
- participant invitations
- public-good project declarations
- compensation or benefit disclosures
- export of specifically consented data or tasks
- audit evidence for participation flows

### Does not own

- Chronicle records
- consent decisions
- identity
- economic guarantees
- progression rewards

Public-good participation must remain optional and legible. Optimitron’s public-good principle of taking no percentage from public-good efforts is a governance constraint, not a reward mechanic.

## Identity and Access Boundary

### Owns

- accounts and authentication
- sessions
- roles
- editor and reviewer authorization
- service identity
- security-relevant access decisions

### Does not own

- narrative identity
- Chronicle content
- consent purpose
- reviewer judgment

An authenticated person is not automatically authorized for every engine operation.

## Story Studio

Story Studio is an authoring application above the content schema and review system. It creates and reviews content but is not itself a runtime engine.

It may interact with:

- content-schema validation
- canon reference services
- synthetic story-state simulation
- review workflow
- publication controls

It may not access production Chronicle records or unrestricted player state.

## Cross-engine interaction rules

### Commands and facts

Engines exchange explicit commands and bounded facts, not shared mutable domain objects.

Examples:

- Story Engine asks whether a declared unlock fact is present.
- Quest Engine asks whether a requirement is satisfied.
- Consent Engine decides whether a proposed sensitive operation is permitted.
- Chronicle Engine returns a minimal yes/no or scoped record only after consent is verified.
- Progression Engine applies a declared reward after receiving a valid completion event.

### No implicit side effects

A read from one engine must not silently mutate another. Cross-engine mutations require explicit commands and auditable causation.

### Idempotency

Commands that may be retried must carry stable operation identities. Reward application, completion, consent withdrawal, and publication must be safe against duplicate delivery.

### Provenance

Every material state change should record:

- initiating actor or service
- command or event identity
- source engine
- policy or content version
- timestamp
- resulting state transition

### Minimum necessary data

Each engine receives only the data required for its decision. Cross-engine interfaces should prefer specific facts over raw-record access.

## Event vocabulary

The implementation may use events internally, but event names should reflect domain facts rather than technical transport.

Examples:

- `story.scene-completed`
- `story.choice-selected`
- `quest.accepted`
- `quest.declined`
- `quest.completed`
- `progression.reward-applied`
- `chronicle.record-created`
- `chronicle.record-corrected`
- `consent.granted`
- `consent.withdrawn`
- `learning.lesson-completed`
- `notification.dismissed`
- `content.release-published`

Whether these are persisted events, integration messages, or both remains PROPOSED.

## Data ownership matrix

| Domain information | Authoritative owner |
| --- | --- |
| Canon and published narrative content | Content repository and publication process |
| Player story progression | Story Engine |
| Quest lifecycle | Quest Engine |
| Game rewards and unlock balances | Progression Engine |
| Player-controlled health and life records | Chronicle Engine |
| Permissions and withdrawals | Consent Engine |
| Lesson completion | Learning Engine |
| Notification delivery state | Notification Engine |
| AI invocation provenance | AI Gateway |
| Accounts and sessions | Identity and Access Boundary |
| Research participation state | Research and Public-Good Gateway |

No replicated read model becomes authoritative merely because it is convenient to query.

## Trust boundaries

At minimum, the architecture recognizes these trust zones:

1. Public unauthenticated experience
2. Authenticated player experience
3. Sensitive Chronicle domain
4. Administrative and support operations
5. Story Studio authors and reviewers
6. Research and public-good operations
7. External AI and integration providers
8. Build, release, and publication infrastructure

Crossing a trust boundary requires explicit authentication, authorization, purpose, minimization, and audit treatment appropriate to the data involved.

## Failure principles

- Consent uncertainty fails closed for sensitive operations.
- AI unavailability degrades gracefully and does not block access to authored core experiences.
- Story runtime errors do not corrupt Chronicle records.
- Reward retries do not duplicate rewards.
- Publication failure leaves the prior content release available.
- External provider failure does not silently switch to a provider with weaker policy.
- A failed research integration never changes ordinary product eligibility.

## Deployment posture

Initial implementation may use a modular monolith to reduce operational complexity. This is compatible with the architecture only if:

- engine contracts remain explicit
- storage ownership is documented
- direct cross-domain writes are prohibited
- sensitive boundaries are enforceable
- modules can be tested independently

Microservices are not an architectural goal. Clear authority and safe boundaries are.

## Architecture invariants

The following are BASELINE invariants:

- No story or quest flow requires health disclosure merely to continue.
- Consent can be denied or withdrawn without narrative punishment.
- AI cannot approve content, alter canon, or bypass policy.
- Chronicle data remains player-controlled and separable from narrative state.
- Research participation remains distinct from ordinary product use.
- Rewards do not imply clinical, economic, or research value.
- Every published content release is versioned and reversible.
- Domain engines interact through explicit contracts.
- Sensitive operations are auditable.
- Public-good purpose does not justify hidden access or coercion.

## Open architectural decisions

The following remain PROPOSED:

- persistence model for each engine
- synchronous versus asynchronous integration boundaries
- content-pack distribution format
- runtime compatibility strategy
- player story-state migration mechanism
- offline-first behavior
- multi-device conflict resolution
- identity-provider selection
- AI-provider selection
- observability and audit-storage implementation
- research integration standards

These decisions should be made through ADRs when implementation constraints are known.
