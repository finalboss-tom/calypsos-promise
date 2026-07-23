# Calypso’s Promise

**Build your Living Chronicle. Improve your health. Keep the key.**

Calypso’s Promise is an open-source, narrative-driven health platform that helps people build, understand, and control a longitudinal record of their lives. The playable world of Ogygia turns brief health actions, data capture, learning, and reflection into quests—while keeping private health data separate from the open-source codebase.

## Project status

The repository is being established from a completed product, Octalysis, architecture, and lore design phase.

**Frozen foundations**

- Product thesis and player promise
- First player: people—any human may begin, with adaptive paths rather than a narrow persona gate
- Ogygia world, central mythology, Seven Laws, zones, principal cast, Seven Tides, and Fourteen Lanterns
- Illustrated, map-based narrative play rather than a conventional 3D game
- Open code and synthetic fixtures; private production health data
- AI proposes, the player confirms, and deterministic domain services store
- Structured records remain authoritative
- MCP exposes selected domain capabilities to authorized agents; it is not the product’s database or core application protocol

**Still to be validated or selected**

- Clinical, regulatory, privacy, and research-governance implementation details
- Infrastructure and AI vendors
- Open-source license and trademark policy
- Hosted-service economics
- Connector rollout order
- Research and compensated-opportunity gates

## Planned repository surfaces

- `apps/site` — public website and playable prologue
- `apps/game` — universal Expo game for web, iOS, and Android
- `apps/api` — modular TypeScript domain application
- `apps/mcp-chronicle` — private, policy-controlled agent tools
- `apps/mcp-forge` — contributor and documentation tools using synthetic data
- `content` — versioned canon, quests, dialogue, education, and safety content
- `docs` — frozen foundations, architecture decisions, website briefs, and sprint plans

## Core rule

> The software is open. The person’s health data is private.

No contributor workflow, public demo, test environment, or open-source agent may require production health data. Synthetic fixtures are the default development material.

## Documentation

The initial documentation warehouse and implementation sprint plan are being prepared in a review branch before becoming the repository baseline.
