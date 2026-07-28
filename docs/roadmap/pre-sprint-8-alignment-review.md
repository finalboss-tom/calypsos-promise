# Pre-Sprint 8 Repository Alignment Review

[Documentation home](../README.md) · [Roadmap index](README.md) · [Current status](current-status.md) · [Sprint sequence](sprints.md) · [Sprint 7 execution plan](sprint-7-execution-plan.md) · [Sprint 7 completion record](sprint-7-completion-record.md) · [Forge reconciliation](../architecture/forge-sprint-7-cross-contract-reconciliation.md) · [Tracking issue #54](https://github.com/finalboss-tom/calypsos-promise/issues/54) · [Draft PR #55](https://github.com/finalboss-tom/calypsos-promise/pull/55)

- **Status:** PREPARED ON SPRINT 7 BRANCH — blocked pending Sprint 7 founding-steward acceptance and squash merge
- **Reviewed baseline:** Sprint 7 candidate head `32492040684c2a89e32c866888f6be0888ee1279` plus the 7.10 completion package
- **Review date:** 2026-07-28
- **Next accepted sprint:** Sprint 8 — Public website foundation
- **Existing website surface:** `apps/site`, Website Track 0A — Repository Gateway
- **Scope:** mission, player promise, incentives, governance, architecture, security, funding, provider independence, operability, website status, current implementation, open-source maintenance, and bounded Sprint 8 handoff
- **Certification boundary:** internal repository-consistency and readiness review; not independent accessibility, security, privacy, clinical, legal, interoperability, operations, financial, AI-safety, user-research, performance, or production-readiness certification

## Decision summary

The accepted Sprint 8 goal, deliverables, acceptance criteria, and numbered sequence remain correct:

> Publish an honest, accessible gateway to Ogygia.

No decision record is required before Sprint 8 if the work remains within the accepted public website scope.

Sprint 8 must evolve the existing `apps/site` repository gateway rather than creating a duplicate public website. The current surface is a custom Node-served cinematic landing page with semantic HTML, repository-owned concept-art crops, honest capability status, reduced-motion behavior, security headers, and a purpose-limited signup adapter. It is not yet the accepted Sprint 8 Next.js foundation.

**Recommendation:** after explicit Sprint 7 acceptance and squash merge, begin Sprint 8 through its own issue, execution plan, branch, draft pull request, public-only implementation evidence, accessibility and performance baselines, completion record, and explicit founding-steward acceptance.

## Entry gates

Sprint 8 should not begin until:

1. Sprint 7 workstream 7.10 is complete;
2. issue #54 records an explicit founding-steward acceptance decision;
3. PR #55 is squash merged to `main`;
4. the final Sprint 7 squash commit is inserted into completion and status records if needed; and
5. the Sprint 8 issue and execution plan explicitly inherit this review.

Sprint 8 does not require closing Forge production or specialist holdpoints because its accepted scope is a public website over public records and explicitly synthetic examples.

## Review authority and precedence

The review used this order:

1. frozen Product Constitution, Vision, Architecture Foundation, Gameplay Foundation, World and Lore Canon, and institutional commitments;
2. accepted decisions, including progressive decentralization, the Institutional Immune System, funding doctrine, consumer-first provider independence, and operational simplicity;
3. security, publication, development, economics, accessibility, and contributor policies;
4. controlled vocabulary, deterministic incentives, Living Chronicle, House of Keys, Aster, and Forge baselines;
5. accepted Sprint 8 goal, deliverables, and acceptance criteria;
6. the current `apps/site` Track 0A implementation and public claims;
7. Sprint 7 completion evidence, holdpoints, unresolved work, and capability status; and
8. this handoff review.

A lower layer may implement, test, or explain a higher-authority requirement. It may not silently weaken it.

## Repository state entering Sprint 8

After Sprint 7 acceptance, the repository will contain:

- a bounded public repository gateway at `apps/site`;
- a complete local public/synthetic Forge application at `apps/mcp-forge`;
- frozen product, lore, architecture, gameplay, and institutional foundations;
- pre-stable Living Chronicle, House of Keys, and Aster contract baselines;
- security, funding, consumer-first, provider-independent, operational-simplicity, and publication policies;
- public standards references, draft mappings, and explicitly synthetic connector fixtures;
- honest status and capability vocabulary; and
- open production, specialist, institutional, accessibility, and measurement holdpoints.

No account system, private Chronicle, production Aster, provider call, connector runtime, donation checkout, research enrollment, governance vote, private MCP, or production health-data path is active.

## Existing `apps/site` disposition

### Retain

Sprint 8 should preserve or deliberately migrate:

- the warm cinematic Ogygia visual direction;
- repository-owned concept-art crops and their presentation role;
- semantic live HTML for essential information and controls;
- prominent GitHub, documentation, and current-status paths;
- reduced-motion support;
- responsive behavior;
- security headers;
- honest live-versus-planned language;
- the purpose-limited signup boundary; and
- the principle that essential information is not embedded only in flattened imagery.

### Replace or mature

Sprint 8 should replace or mature:

- the custom Node server with the accepted Next.js site foundation;
- one-page gateway structure with durable route and content architecture;
- ad hoc page styling with versioned design tokens;
- implicit narrative traversal with explicit narrative and direct navigation modes;
- high-level status copy with reusable capability-status components;
- scattered trust explanations with a Trust Center shell;
- high-level Forge references with an honest Open Forge page;
- hand-maintained funding recognition with canonical economics-record views; and
- temporary website-specific patterns that duplicate repository source-of-truth records.

The migration should use cuts and splices that preserve the approved look and feel where it remains aligned. Sprint 8 is not a visual reset by default.

## Mission-to-website traceability

### Personal utility and control

The homepage and Promise explanation must lead with “Build your Living Chronicle. Improve your health. Keep the key.” Personal utility and control come before institutional benefit.

### Public software and private personal data

The Trust Center, Open Forge, How It Works, and status components must distinguish public code and public/synthetic evidence from private future personal data.

### Personal value before secondary use

The visitor journey must explain the personal loop before research, funding, partner, or institutional possibilities.

### Meaningful refusal and non-punitive return

Narrative and direct modes remain optional. Essential content must require no story traversal, animation, audio, or mythological knowledge.

### Deterministic authority around AI

The Aster and AI explanation must distinguish proposals, player confirmation, deterministic domain validation, fallbacks, and current non-production status.

### MCP remains bounded tooling

The Open Forge page must explain local public/synthetic tools, source evidence, limits, receipts, non-authority, and open holdpoints without presenting MCP as the product database or general agent authority.

### Provider and standards replaceability

The consumer-first explanation must distinguish standards support, planned connectors, active relationships, and production exchange. Providers and standards remain additive, attributed, and replaceable.

### Funding cannot purchase authority

Support views must derive from canonical economics records and keep recognition separate from endorsement, recommendation, ranking, safety, guidance, permissions, and governance.

### Complexity must earn its place

Sprint 8 should remain one understandable Next.js public site with clear routes, content ownership, local build, and no premature service platform.

### Status must describe evidence

Reusable status components must distinguish live, experimental, planned, long-horizon, deferred, frozen, baseline, and proposed states where relevant.

## Binding Sprint 8 execution clarifications

These clarifications do not change the accepted Sprint 8 scope. They define how the scope should be implemented.

### 1. One public site, no duplicate gateway

- `apps/site` remains the public website owner.
- Migrate Track 0A into the Next.js foundation rather than creating another site application.
- Preserve public URLs or provide deliberate redirects where practical.
- Do not create empty applications, shared packages, a CMS, database, or service merely because they may be useful later.

### 2. Narrative and direct modes are equal paths

- Narrative mode may welcome visitors into Ogygia through lore, atmosphere, exploration, and progressive disclosure.
- Direct mode must expose all essential information through conventional navigation and plain language.
- No visitor should have to animate, play, scroll through a cinematic sequence, hear audio, or understand mythology to access the Promise, trust, privacy, status, support, or contribution information.

### 3. Content authority remains repository-owned

- Frozen and accepted repository records remain the source of truth.
- Website copy may summarize and explain; it may not silently create product, security, funding, provider, clinical, legal, or governance policy.
- Material claims should link to controlling records or structured public data where appropriate.
- Generated navigation and status views must preserve source, status, uncertainty, and update ownership.

### 4. Capability status is a reusable system

- Live, experimental, planned, and long-horizon distinctions from the acceptance criteria must be visually obvious.
- The complete repository status vocabulary should remain available where relevant.
- A merged contract or completed sprint must not be labeled as a live product capability without deployment evidence.
- Forge should be described as a local contributor tool, not a production consumer health feature.

### 5. Trust Center is a shell, not certification

The initial Trust Center may organize:

- the Promise and player rights;
- privacy and public-information boundaries;
- security policy and disclosure route;
- Living Chronicle, House of Keys, Aster, and Forge boundaries;
- provider and connector status;
- funding and sponsorship doctrine;
- open holdpoints and specialist review status;
- capability status and corrections; and
- public issue and challenge routes.

It must not imply independent certification, production security, legal compliance, clinical approval, operational reliability, or private-data processing.

### 6. Open Forge inherits Sprint 7 truth

The Open Forge page should explain:

- its contributor purpose;
- the ten bounded tools;
- public and synthetic information only;
- local `stdio` operation;
- source provenance and conservative authority;
- deterministic validation and generation;
- execution limits, receipts, stable errors, and compatibility;
- no shell, network, mutation, private data, providers, connectors, or consequential actions;
- open production and specialist holdpoints; and
- ordinary non-MCP contribution paths.

It should not expose protected security details or claim that local adversarial tests prove production safety.

### 7. Funding transparency derives from canonical records

- Public support and relationship views must derive from canonical economics records or explicit empty states.
- Recognition must remain separate from recommendation, provider preference, connector ranking, clinical endorsement, health guidance, safety, permissions, and governance authority.
- Approved and prohibited benefits, relationship state, delivery, outcomes, conflicts, concentration, corrections, and challenge routes should remain inspectable.
- A website sponsor model must not become a second source of funding truth.

### 8. Transaction surfaces remain disabled

No donation, sponsorship, checkout, payment, charitable, tax-deductible, nonprofit, public-benefit, refund, or financial-control surface may activate until the legitimate recipient, custody, accounting, tax, privacy, refund, and payment-rail gates are accepted.

The site may explain support intent and current status without accepting money.

### 9. Consumer-first and provider-independent explanation

The explanation must:

- acknowledge substantial and evolving healthcare standards;
- avoid disparaging clinicians, providers, EHRs, institutions, or standards work;
- distinguish source systems from Chronicle truth;
- explain versioned mappings, provenance, conflict, and uncertainty;
- preserve personal-core value without enterprise enrollment; and
- avoid representing a provider, connector, clinical, or enterprise relationship as live.

Historical Google and Microsoft references must remain within cited evidence when used.

### 10. Accessibility and performance are release criteria

Sprint 8 should define measurable baselines before closure for:

- semantic structure and landmarks;
- keyboard operation;
- screen-reader labels and reading order;
- reduced motion;
- contrast and focus visibility;
- responsive layout;
- low-bandwidth and image-failure behavior;
- direct-navigation parity;
- automated accessibility checks;
- representative manual review; and
- page performance and asset budgets.

Passing automated checks alone is not affected-user validation or accessibility certification.

### 11. Signup remains purpose-limited and separately gated

The existing signup adapter should remain isolated from public content and health-data flows.

Sprint 8 must either preserve its current disabled or bounded status with honest provider, retention, unsubscribe, correction, deletion, and privacy disclosures, or remove it until those requirements can be met.

It must not become account creation, health-data intake, research enrollment, donation processing, or an undeclared marketing database.

### 12. No production expansion through website code

Sprint 8 does not activate:

- accounts or authentication;
- real health-data capture;
- private Living Chronicles;
- production Aster or private MCP;
- provider calls or connectors;
- clinical workflows;
- research enrollment;
- governance voting;
- donation or payment processing;
- estate or legacy directives; or
- production analytics over personal data.

## Sprint 8 implementation sequence

A bounded execution plan should proceed in this order:

1. inventory the existing Track 0A routes, assets, copy, tests, signup boundary, and public URLs;
2. define the Next.js application boundary, route map, content ownership, design tokens, and migration strategy;
3. implement shared layout, direct navigation, narrative entry, status components, and accessibility foundations;
4. migrate and reconcile the homepage and Promise content;
5. implement Seven Laws, How It Works, consumer-first explanation, and Aster and AI;
6. implement Trust Center and Open Forge pages from accepted records;
7. implement roadmap, capability status, and funding transparency from canonical data;
8. preserve or deliberately retire the signup surface under its own privacy and operational gates;
9. validate essential-information parity without animation, story, images, or client JavaScript where practical;
10. run accessibility, performance, security-header, link, content-authority, status-truth, and full repository checks; and
11. publish a completion package and explicit founding-steward acceptance decision.

## Sprint 8 acceptance interpretation

The accepted criteria remain unchanged:

- live, experimental, planned, and long-horizon claims are visually distinct;
- essential information is accessible without animation or story traversal;
- core pages pass defined accessibility and performance baselines;
- funding displays derive from canonical economics records;
- consumer-first explanation remains accurate and provider-respectful;
- sponsor recognition remains separate from recommendation, ranking, endorsement, permission, safety, and guidance; and
- transaction claims remain disabled without accepted operational evidence.

Sprint 8 completion will establish a public website foundation at its stated evidence level. It will not establish production health-data operation, private product capability, independent accessibility certification, legal approval, security certification, provider approval, clinical approval, fundraising operation, or product-market validation.

## Open holdpoints inherited by Sprint 8

Sprint 8 inherits, without closing:

- accessibility and affected-user review;
- public security and disclosure correctness;
- signup privacy, provider, retention, unsubscribe, correction, deletion, and operational gates;
- legal, trademark, consumer, charitable, tax, nonprofit, and public-claim review;
- provider and institutional relationship truth;
- funding record, transaction, custody, accounting, and payment gates;
- release integrity, branch settings, second-owner, succession, and founder-independent administration;
- representative performance and user-benefit measurement; and
- every production health-data, Aster, connector, clinical, research, private MCP, and account gate.

## Handoff conclusion

Sprint 8 is correctly scoped as the next numbered sprint after Sprint 7.

This review is a prepared handoff, not authorization to start before Sprint 7 acceptance and merge. Once that gate closes, Sprint 8 should begin by reconciling and migrating the existing `apps/site` Track 0A surface into one honest, accessible, durable Next.js public website foundation.
