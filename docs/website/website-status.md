# Public Website Status and Readiness

**Status date:** 2026-07-24  
**Institutional phase:** Phase 0 — Constitutional and open-source foundations  
**Website implementation status:** Minimal local workspace; no production public website  
**Visual status:** Concept direction only; no approved product screens

## Executive assessment

The website is conceptually well-defined but technically almost unbuilt.

The repository now contains enough product, lore, trust, governance, incentive, campaign, and publication doctrine to design the site coherently. The remaining problem is no longer “what should this website mean?” It is “which bounded website slice may be implemented now, and which capabilities must remain in later sprints?”

The current `apps/site` workspace is a small Node HTTP server that proves the monorepo can run without credentials, cloud services, production data, or real health information. It is not a Next.js shell, design system, navigable Ogygia experience, campaign hub, trust center, or prologue.

## Readiness by layer

| Layer | Status | Evidence | Main gap |
| --- | --- | --- | --- |
| Product promise | BASELINE / FROZEN | Product Constitution and incentive model | translate into page-level copy and interactions |
| World and lore | FROZEN | Ogygia canon, zones, cast, Seven Laws, Seven Tides, Fourteen Lanterns | produce approved map and visual language without inventing canon |
| Website information architecture | BASELINE | public IA plus campaign, transparency, and disclosure supplements | reconcile the documents into one build sequence |
| Public campaign content | BASELINE content exists | founder essay, launch kit, strategy, campaign log, calendar | create truthful public rendering and source links |
| Public-domain direction | ACCEPTED direction | public-domain declaration and Decision 0004 | legal migration, file notices, contributor dedication, and rights audit remain incomplete |
| Public-information boundary | BASELINE | Decision 0005, publication policy, website controls | implement separate PUBLIC schemas and publishing controls |
| Visual direction | EXPLORATORY | three website concept directions and the world-experience framework | select and refine one canonical target; complete rights and accessibility review |
| Technical framework | FROZEN direction | Next.js for `apps/site`; pnpm/Turborepo monorepo | replace the minimal Node server during an accepted website implementation slice |
| Design system | PLANNED | architecture reserves design-token and web-UI packages | tokens, typography, layout, icon, motion, and component rules do not exist |
| Production pages | NOT IMPLEMENTED | none | homepage, Promise, status, trust, commons, campaign, Forge, support, and press routes |
| Synthetic prologue | PLANNED | IA and Sprint 9 flow | no browser interaction, fictional Chronicle, Aster draft, confirmation, or receipt UI |
| Analytics | DEFERRED pending rules | minimal-measurement requirements documented | retention, deletion, consent, vendor, and implementation not selected |
| Accessibility and performance | ACCEPTANCE CRITERIA ONLY | keyboard, reduced-motion, direct-mode, low-bandwidth, and no-scroll-jacking rules | no implementation or audit evidence |
| Deployment and operations | NOT SELECTED | domains are directional; vendors remain unfrozen | hosting, previews, release, caching, monitoring, and incident operations |

## What is already coherent

### The website’s job

The website has a clear role as the public gateway to:

- discovery and Ogygia
- accurate product explanation
- trust and capability status
- public-domain and institutional commitments
- open-source contribution
- public campaign provenance
- support and funding transparency
- a fictional-data prologue

### The interaction model

The frozen direction supports an illustrated, map-based narrative experience rather than a 3D world or a generic dashboard with fantasy decoration.

### The trust model

The website must make narrative and direct modes equally available, label capabilities honestly, render only PUBLIC records, avoid private-system dependencies, and preserve a correction path.

### The browser and mobile split

The browser is the correct first surface for public discovery, public documentation, and the fictional prologue. The later Expo application is the universal private playable client for web, iOS, and Android.

## Reconciliation completed by the website framework

The website world framework resolves several inconsistencies between the visual exploration and repository canon:

- Ogygia remains the world, the Odyssey remains the journey, and the Promise remains the constitutional contract.
- Lantern Shore replaces a generic Harbor as the canonical arrival.
- Mnemosyne’s Library replaces “Library of Threads.”
- Athena’s Observatory and the Open Forge retain their canonical names.
- The House of Keys owns permissions and privacy.
- The House of Oaths owns institutional and governance commitments.
- The Wayfinder Orb and Aster provide navigation; “The Compass” is not introduced as a new zone.
- The First Light may function as a lighthouse-like visual motif without creating a new canonical location.
- proposed role cards do not become permanent player classes.

## The current sequencing conflict

The design-to-build roadmap places the full public website foundation in Sprint 8 and the fictional prologue in Sprint 9.

PR #15 now establishes near-term public campaign routes, a founder-origin experience, a public-domain page, a health-data covenant, a canonical current-status page, campaign transparency surfaces, and a public disclosure page.

That creates a real sequencing decision:

1. keep all website implementation in Sprint 8 and publish only repository documents until then; or
2. authorize a bounded Phase 0 public-information shell before Sprint 8.

The project should not silently choose option 2 by calling a full site build “campaign content.” It should also not publish campaign claims through an improvised surface that ignores the accepted website, accessibility, status, and confidentiality rules.

## Recommended sequencing

### Website Track 0 — Phase 0 public-information shell

Authorize this only through an explicit roadmap issue or accepted planning record.

Bounded scope:

- migrate `apps/site` from the proof server to the selected Next.js baseline
- implement repository-owned public content only
- create the site shell, design tokens, direct navigation, status labels, and source links
- publish `/voyage`, `/voyage/origin`, `/commons`, `/covenant`, `/current-status`, `/founding-expedition`, `/press`, and `/voyage/disclosure`
- render campaign strategy, log, experiments, reports, costs, and corrections only from allowlisted PUBLIC records
- provide conventional, accessible pages before immersive map work

Explicit non-scope:

- accounts or authentication
- real health-data capture
- private Living Chronicles
- research enrollment
- compensation or marketplace flows
- governance voting
- production AI interaction
- private campaign-source integration
- an interactive prologue represented as complete

This track is a public publishing and trust surface, not a consumer health product release.

### Website Track 1 — Sprint 8 public website foundation

Complete the planned site foundation:

- canonical Ogygia map and visual system
- narrative and direct modes
- homepage and core product explanation
- Seven Laws
- Aster and AI
- Trust Center
- Open Forge
- roadmap and capability-status components
- donation transparency
- accessibility, performance, and release evidence

Track 0 work should be designed to survive into Sprint 8 rather than become a disposable microsite.

### Website Track 2 — Sprint 9 fictional prologue

Implement the complete fictional-data path:

- opening illustrated sequence
- Lantern Shore
- Aster introduction
- fictional Chronicle
- proposed draft
- player confirmation or rejection
- First Lantern completion
- example House of Keys receipt
- account-or-exit choice

No real health information or account is required.

## Immediate design decisions still needed

Before implementation begins, record:

1. which visual direction becomes the canonical refinement target
2. the initial map composition and visible zones
3. the direct-navigation structure on desktop and mobile
4. the design-token baseline
5. the typography and asset-rights strategy
6. the content-rendering source and schema
7. the relationship between `calypsospromise.org`, `play`, and `forge` during the first deployment
8. the exact Phase 0 Track 0 scope, if accepted
9. hosting, preview, cache, and rollback requirements for PUBLIC content
10. the form processor and retention model for the founding expedition

Vendor selection can remain replaceable. The public/private boundary, accessibility, source provenance, and capability-status rules cannot.

## Minimum viable website validation

A first public shell is reviewable only when:

- all routes render without credentials or private services
- only PUBLIC repository content or allowlisted PUBLIC records enter the build
- no protected fields appear in page source, logs, analytics, structured data, URLs, or artifacts
- every future capability is labeled PLANNED, LONG-HORIZON, or DEFERRED
- every concept image is labeled concept art
- canonical zone and product terms pass vocabulary review
- retired extraction-oriented terminology is absent from active copy
- keyboard, screen-reader, reduced-motion, high-contrast, and low-bandwidth paths are tested
- forms state purpose, recipients, publication status, retention expectation, and deletion or correction path
- no form publishes directly
- current status and correction routes remain one click away
- source repository links and last-reviewed dates are visible
- format, policy, lint, typecheck, test, and build checks pass

## Current conclusion

The website is ready for a disciplined design and publishing phase, not for claims of a working health product.

The strongest next move is to approve a bounded Phase 0 public-information shell that implements the campaign, commons, covenant, current-status, and disclosure surfaces without private data or product simulation. The full Ogygia homepage and fictional prologue can then mature through the existing Sprint 8 and Sprint 9 gates.
