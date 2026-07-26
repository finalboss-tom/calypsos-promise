# Public Website Status and Readiness

[Website documentation](README.md) · [Current project status](../roadmap/current-status.md) · [Information architecture](information-architecture.md) · [World experience](world-experience-framework.md) · [Security architecture](../security/README.md)

**Status date:** 2026-07-26  
**Institutional phase:** Phase 0 — Constitutional and open-source foundations  
**Website implementation status:** LIVE BOUNDED PUBLIC REPOSITORY GATEWAY — not the private health product  
**Implementation:** small Node.js HTTP application in `apps/site`; the planned Sprint 8 Next.js foundation is not implemented  
**Visual status:** implemented public gateway direction; no approved private-product screens or complete Ogygia world experience

## Executive assessment

The website now provides a deliberately bounded public entry point to Calypso’s Promise.

It explains the project, introduces Ogygia and the planned game, links to the repository, distinguishes current and planned capability, provides a Founding Expedition interest form, and publishes a signup privacy route. It does not provide accounts, authentication, private Living Chronicles, health-data intake, research enrollment, production House of Keys behavior, production AI, MCP, connectors, analytics, compensation, or governance voting.

This implementation is the accepted Website Track 0A repository gateway. It does not complete the full Sprint 8 public website foundation or Sprint 9 fictional prologue.

## Implemented bounded surface

The current `apps/site` package provides:

- a small Node.js HTTP server;
- a public homepage assembled from repository-owned HTML fragments;
- public static CSS, JavaScript, SVG, and image assets;
- a `/privacy` route for the Founding Expedition signup flow;
- a `/joined` confirmation route;
- a bounded `/api/join` adapter;
- explicit consent and email-shape validation;
- a honeypot field;
- request-body limits;
- a small in-memory rate limit;
- HTTPS enforcement for a non-loopback signup webhook;
- optional bearer-token forwarding to the private processor;
- generic public errors that do not print submitted email addresses; and
- restrictive Content Security Policy, frame, content-type, referrer, opener, and permissions headers.

The adapter forwards only:

- normalized email address;
- explicit consent;
- policy version;
- purpose;
- source label; and
- receipt time.

It does not store a mailing list in the public repository or expose the private webhook URL or token to the browser.

## Readiness by layer

| Layer | Status | Current evidence | Main remaining gate |
| --- | --- | --- | --- |
| Product promise | BASELINE / FROZEN | Product Constitution and incentive model | preserve truth and rights through later implementation |
| World and lore | FROZEN | Ogygia canon, zones, cast, Seven Laws, Seven Tides, and Fourteen Lanterns | complete the canonical map and visual system without inventing canon |
| Public repository gateway | IMPLEMENTED / LIVE BOUNDED FLOW | `apps/site`, tests, build check, deployment, current-status records | maintain truthful status, accessibility, supply-chain, and incident evidence |
| Founding Expedition signup adapter | IMPLEMENTED / CURRENT BOUNDED FLOW | explicit consent, privacy route, bounded forwarding, rate limit, HTTPS requirement | name private-list owner; complete retention, unsubscribe, correction, deletion, monitoring, provider, and incident evidence |
| Website information architecture | BASELINE | public IA, campaign, transparency, and disclosure documents | reconcile into the future Sprint 8 build sequence |
| Visual direction | IMPLEMENTED CONCEPT DIRECTION / STILL REFINABLE | current illustrated gateway and world-experience framework | rights, accessibility, asset, and canonical visual review |
| Technical framework | CURRENT NODE IMPLEMENTATION; NEXT.JS PLANNED | runnable public Node server and repository checks | migrate only through an accepted Sprint 8 implementation slice |
| Design system | PLANNED | architectural package direction only | tokens, typography, layout, motion, icon, and component rules |
| Full production pages | PARTIAL PUBLIC GATEWAY ONLY | homepage, privacy, and joined routes | Sprint 8 trust, Promise, laws, status, Forge, roadmap, and transparency surfaces |
| Synthetic prologue | PLANNED | information architecture and Sprint 9 flow | fictional Chronicle, Aster draft, confirmation, rejection, and example receipt UI |
| Private product | NOT IMPLEMENTED | none | later account, Chronicle, House of Keys, Aster, security, and product sprints |
| Analytics | DEFERRED | no production analytics design selected | purpose, minimization, retention, deletion, vendor, consent, and implementation review |
| Accessibility and performance | PARTIAL IMPLEMENTATION; AUDIT PENDING | semantic public pages and repository checks | keyboard, screen-reader, reduced-motion, contrast, cognitive, low-bandwidth, and performance evidence |
| Deployment and operations | BOUNDED PUBLIC DEPLOYMENT | public deployment and repository validation | provenance, branch administration, monitoring, rollback, incident route, and provider-exit evidence |

## Public capability boundary

### Live now

- public project explanation;
- Ogygia and planned-game introduction;
- repository and documentation links;
- public capability-status language;
- public static assets;
- Founding Expedition project-interest signup forwarding; and
- signup privacy and confirmation pages.

### Planned and gated

- accounts and authentication;
- private Living Chronicle capture or storage;
- health-data upload or connector import;
- production House of Keys orchestration;
- Aster, private AI context, retrieval, or memory;
- MCP Chronicle tools;
- research enrollment or person-level research processing;
- compensation or marketplace flows;
- analytics and behavioral tracking;
- governance voting;
- the complete Ogygia map and narrative/direct site modes; and
- the public fictional-data prologue.

Any future capability must remain labeled planned, experimental, deferred, or long-horizon until its accepted implementation and validation gate is met.

## Trust and publication boundary

The website must:

- render only PUBLIC repository content or approved PUBLIC derivatives;
- keep private people and public code separate;
- avoid direct public access to private databases, queues, object stores, analytics, administration, or provider endpoints;
- preserve direct, conventional navigation alongside narrative presentation;
- keep current status and correction routes easy to reach;
- state the purpose and recipient of every form;
- avoid publishing form submissions;
- minimize logs and errors;
- preserve accessible non-narrative and low-bandwidth paths; and
- never use the Promise, lore, urgency, rewards, or community belonging to coerce disclosure or broader permission.

## Current signup holdpoint

The current signup flow may continue only as a narrow public-interest flow.

Before it expands, the project must record:

1. the named private-list owner and processor;
2. the retention period;
3. unsubscribe behavior;
4. correction and deletion procedures;
5. access control and operator roles;
6. monitoring and failed-delivery handling;
7. provider terms and replacement path;
8. the private incident route;
9. public-notice consistency; and
10. safe teardown and data transfer behavior.

The current absence of a known incident does not close these requirements.

## Sprint 8 boundary

Sprint 8 remains the accepted public website foundation. It may replace or evolve the current gateway through a bounded implementation that adds:

- the canonical Ogygia map and visual system;
- narrative and direct navigation modes;
- complete homepage and Promise explanation;
- Seven Laws;
- Aster and AI explanation;
- Trust Center shell;
- Open Forge page;
- roadmap and capability-status components;
- donation transparency;
- accessibility and performance evidence; and
- release and operational evidence.

Track 0A should be evolved rather than misrepresented as Sprint 8 completion.

## Sprint 9 boundary

Sprint 9 remains the accepted fictional-data prologue. It may implement:

- an illustrated opening sequence;
- Lantern Shore;
- Aster introduction;
- a fictional Chronicle;
- a proposed draft;
- player confirmation or rejection;
- First Lantern completion;
- an example House of Keys receipt; and
- an account-or-exit choice.

No real health information or account is required.

## Minimum validation for the current bounded gateway

The current surface remains acceptable only while:

- routes render without production health-data or private-product services;
- public builds contain only PUBLIC or synthetic material;
- protected fields do not enter source, logs, URLs, analytics, or artifacts;
- planned capabilities remain labeled honestly;
- forms state their purpose and privacy boundary;
- no form publishes submissions directly;
- security headers and bounded input controls remain intact;
- current-status, repository, privacy, and correction paths remain available;
- formatting, documentation links, repository policy, content validation, lint, typecheck, tests, and build checks pass; and
- incidents, provider changes, purpose changes, new fields, or retention changes trigger revalidation.

## Current conclusion

The website is live as a bounded public repository gateway and project-interest signup surface.

It is not a working private health product, production House of Keys system, research platform, AI health assistant, complete Ogygia website, or security-certified service. The next full public-site implementation gate remains Sprint 8, after the design-to-build sequence reaches it.