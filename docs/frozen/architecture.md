# Architecture Foundation — FROZEN

## Architectural thesis

Calypso’s Promise is one product expressed through three surfaces:

1. **Public website** — discovery, lore, trust, documentation, donation, contribution, and a synthetic-data prologue.
2. **Playable application** — web, iOS, and Android experience for the Living Chronicle, quests, zones, Aster, and personal insight.
3. **Developer and agent interfaces** — open-source contribution, synthetic fixtures, APIs, and guarded MCP tools.

## Selected baseline stack

- Primary language: TypeScript
- Analytics language: Python
- Public website: Next.js
- Universal playable client: Expo / React Native / Expo Router
- Backend: modular TypeScript application, initially deployed as a modular monolith
- Canonical database: PostgreSQL
- Raw documents and source payloads: encrypted object storage
- Background work: durable queue and workers
- Analytics: isolated Python workers and services
- Repository: TypeScript monorepo with shared domain packages

Vendors remain unfrozen. The contracts and boundaries are more important than a specific cloud provider.

## Domain boundaries

- Identity and accounts
- Living Chronicle
- Variables, units, and normalization
- Provenance and corrections
- Consent and purpose grants
- Access receipts and audit
- Quests and evidence
- Progression and restoration
- Lore and story state
- Aster memory
- Connectors and imports
- Notifications
- Exports and deletion
- Personal analytics
- Research and opportunities, gated and deferred

## AI foundation

Aster is the interaction layer, not the source of truth.

Aster may:

- Extract structured drafts from voice, text, images, and documents
- Ask useful clarifying questions
- Search authorized records
- Explain provenance, uncertainty, and permissions
- Route people to quests, zones, tools, or support
- Phrase lore-consistent dialogue inside deterministic story boundaries

Aster may not:

- Write directly to canonical health records
- Change permissions
- Complete quests without domain evidence
- Delete records
- Enroll a person in research
- Transfer money
- Query the database through arbitrary SQL
- Invent clinical conclusions

Frozen transaction rule:

> AI proposes. The player confirms. The domain service validates and stores.

## Retrieval foundation

- Structured queries are authoritative for measurements, dates, units, sources, permissions, enrollment, and balances.
- Semantic retrieval supports notes, documents, opted-in retained conversations, lore, and educational content.
- Retrieval results must preserve source references.
- Vector indexes are disposable derivatives, not canonical records.

## MCP foundation

MCP is an adapter over domain services for authorized agents. It is not the application’s primary client protocol and never bypasses policy enforcement.

Planned servers:

- **Forge MCP** — documentation, lore, schemas, synthetic data, validation, and contributor workflows
- **Chronicle MCP** — private, user-scoped tools for capture drafts, recall, quests, permissions, export preparation, and other bounded actions
- **Commons MCP** — deferred research tools for approved aggregates and study operations

Local transport may use `stdio`. Remote operation may use authenticated HTTP behind a private origin route. The narrative term **The Veil** names the secure connection; **The House of Keys** names authorization and policy.

## Required security properties

- Open code never implies open production data
- Production, staging, and synthetic development environments are isolated
- Caller identity is derived from authentication, never from caller-supplied user IDs
- Every agent tool has explicit scopes, purpose, risk class, and confirmation behavior
- Every sensitive access produces a player-visible receipt
- Imported content is untrusted and cannot grant itself tool authority
- Health identity and account identity are separated through internal pseudonymous identifiers
- Export and deletion are first-class domain capabilities

## Planned repository topology

```text
apps/
  site/
  game/
  api/
  worker/
  admin/
  mcp-forge/
  mcp-chronicle/
  story-studio/
services/
  analytics/
  research/
  document-processing/
packages/
  domain/
  database/
  health-schema/
  consent/
  audit/
  quest-engine/
  progression/
  lore-engine/
  connectors/
  connector-sdk/
  ai-gateway/
  ai-contracts/
  ai-safety/
  retrieval/
  mcp-tools/
  security/
  telemetry/
  ui-native/
  ui-web/
  design-tokens/
content/
fixtures/
infrastructure/
docs/
tools/
```

This topology is a frozen direction; exact package names may be refined during repository bootstrapping without changing the architecture.
