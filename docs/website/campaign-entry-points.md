# Founder Campaign Website Entry Points — BASELINE

**Purpose:** Extend the public website information architecture with campaign-specific routes, components, conversion flows, and provenance requirements.

This document supplements `docs/website/information-architecture.md`. It does not replace the requirement that narrative and direct modes remain equally available.

## Campaign architecture

The founder campaign should enter the existing site through one canonical campaign hub rather than a disconnected microsite.

Recommended route:

- `/voyage` — founder campaign hub

Supporting routes:

- `/voyage/origin` — founder essay and project genealogy
- `/voyage/provenance` — dated artifacts, including 99designs work
- `/commons` — public-domain declaration and legal migration status
- `/covenant` — health-data covenant
- `/current-status` — live, experimental, planned, and long-horizon capabilities
- `/founding-expedition` — low-data signup and interest routing
- `/press` — media brief, approved images, facts, and contact

Existing direct routes should remain primary sources for product and trust details.

## `/voyage` page

### Page objective

Convert cultural curiosity into accurate understanding and one low-risk action.

### Hero

Narrative headline:

> Calypso’s Promise has already had an odyssey.

Supporting line:

> A public-domain health journey, rebuilt through failure, now leaving the island in public.

Actions:

- Read the origin
- See exactly what exists
- Join the founding expedition

Direct-mode banner:

> Independent project. Ancient public-domain source material. No affiliation with any modern film adaptation.

### Section 1 — Why now

Use no film imagery.

Copy direction:

The Odyssey has returned to global conversation. Calypso’s Promise predates the current attention, but the moment gives millions of people a shared vocabulary for understanding its world and central question: can a gift be good when accepting it requires surrendering agency?

Link:

- Read the dated attention context

### Section 2 — The project in one minute

Use a split panel.

**The human problem**

One life produces fragmented records across memory, devices, habits, clinics, and institutions.

**The product direction**

Build a Living Chronicle through brief, rewarding, narrative-driven participation.

**The trust promise**

Private by default. Specific permission. Meaningful refusal. AI proposes; the player confirms.

**The institutional direction**

Public-domain foundations and progressive decentralization toward founder independence.

### Section 3 — The project’s own odyssey

Interactive horizontal or vertical timeline:

1. ConstitutionDAO spark
2. HealthDAO
3. Public design experiments
4. CureDAO intersection
5. Shipwreck and retreat
6. Calypso’s Promise
7. Frozen foundations
8. Public-domain commons
9. Founding expedition

Each node opens a short card with:

- what was believed
- what was built
- what failed
- what changed
- source artifact

### Section 4 — Preserved failures

Headline:

> The old maps remain visible.

Explain why the 99designs work and earlier language are preserved.

Required visual behavior:

- historical date displayed
- “historical artifact” label
- direct link to current policy
- annotation, not deletion or ridicule
- no implication that the old design is a current product screen

### Section 5 — Built from the commons

Headline:

> The story belongs to everyone. The project is being built to belong to everyone too.

Show the public-domain scope matrix:

- code
- lore
- schemas
- designs
- governance
- synthetic fixtures

Place the private-person boundary beside it:

- personal health data
- account information
- consent records
- private correspondence
- credentials

Link:

- Read the full public-domain declaration

### Section 6 — Current status

Use four visible status categories.

#### Live

- public repository
- frozen foundations
- governance and roadmap documentation
- content schemas and synthetic examples
- public-domain decision and migration plan

#### Experimental

- minimal site workspace
- synthetic content and validation
- campaign content and public world concepts

#### Planned

- public synthetic prologue
- private Living Chronicle
- player-confirmed assisted capture
- access receipts and permissions interface

#### Long-horizon

- research commons
- compensated opportunities
- broad player governance
- founder-independent institution

Do not present a planned feature with a product screenshot unless clearly labeled concept or prototype.

### Section 7 — The founding expedition

Primary form fields:

- Email
- Name or handle, optional
- Interest path, optional
- Consent to receive project updates

Interest paths:

- Future player
- Builder or designer
- Health, privacy, security, accessibility, research, or governance reviewer
- Public-good supporter
- Writer, artist, educator, or storyteller

The form must not ask for:

- health conditions
- diagnoses
- medical records
- device data
- demographic data not necessary for communication
- wallet address
- investment interest

Confirmation copy:

> You have joined the founding expedition. We will send public project updates and clear opportunities to inspect, play, review, or contribute. Do not send personal health information through campaign replies or public project channels.

## `/voyage/origin`

### Content

- founder essay
- compact chapter navigation
- evidence-linked timeline
- founder note distinguishing memory, documented fact, and interpretation
- current project-status panel
- link to repository decisions that implement each claimed lesson

### Required chapter links

- ConstitutionDAO
- HealthDAO
- 99designs
- CureDAO
- the shipwreck
- Ogygia
- the public-domain decision
- progressive decentralization
- the new voyage

### Editorial standard

The page may contain first-person memory, but factual claims should link to a source when a public artifact exists.

## `/voyage/provenance`

### Purpose

Create an institutional memory surface that preserves evidence without requiring visitors to search scattered platforms.

### Artifact schema

Each artifact should include:

- title
- date or date range
- project name used at the time
- artifact type
- creator or source
- original link
- archived copy status
- rights status
- what it attempted
- what endured
- what changed
- current related document
- founder commentary

### Initial inventory

- ConstitutionDAO inspiration note
- HealthDAO concept material
- CureDAO collaboration or merger records suitable for public release
- 99designs contest briefs, submissions, and selected directions
- naming and brand explorations
- early “sell access” language
- first Calypso’s Promise world concepts
- frozen foundation documents
- Decision 0003 progressive decentralization
- Decision 0004 public-domain commons

### Privacy and legal boundary

Do not publish private correspondence, confidential agreements, personal allegations, personal information, or third-party work without permission or a valid public basis.

## `/commons`

### Hero

> Built from a story no one can own.

Supporting line:

> Calypso’s Promise is formalizing a public-domain dedication for its original software, lore, schemas, designs, documentation, and institutional tools.

### Required sections

- human-readable declaration
- what is included
- what is excluded
- personal data boundary
- third-party material boundary
- legal migration status
- public-domain instrument matrix
- fork freedoms
- canonical provenance
- known risks and tradeoffs
- migration checklist
- decision record

### Legal-status badge

Until migration is complete:

**Constitutional direction accepted — legal dedication in progress**

After completion, update only with a published migration report and qualified review.

## `/covenant`

### Page objective

Give ordinary visitors the shortest accurate statement of the project’s health-data obligations.

### Content

Present the ten covenant commitments from `docs/public/campaign-system.md` with links to the Product Constitution and Seven Laws.

Every commitment should include:

- plain-language promise
- corresponding product behavior
- current capability status
- how a violation can be reported

## `/current-status`

### Status model

Every capability appears in exactly one category:

- Live
- Experimental
- Planned
- Long-horizon
- Retired, when applicable

Each capability record should include:

- plain-language description
- evidence link
- last reviewed date
- responsible steward
- known limitations
- next gate

### Campaign requirement

The founder essay, posts, press page, and signup confirmation should link here whenever they mention future product capabilities.

## `/founding-expedition`

### Page objective

Capture interest without creating a false account-creation flow or collecting sensitive information.

### After signup

Route the visitor to one optional next step based on selected interest:

- Future player → prologue and player research updates
- Builder → repository getting started
- Specialist → bounded review registry
- Supporter → public-good funding status
- Storyteller → public-domain world and contribution guidance

Do not automatically enroll anyone in research, product testing, donations, governance, or data sharing.

## `/press`

### Required contents

- one-sentence description
- current status
- founder biography
- project genealogy
- relationship to current film attention
- public-domain and private-data distinction
- approved original images
- image rights and attribution status
- facts and figures with last-checked dates
- pronunciation and spelling guide
- media contact
- correction contact

### Prohibited press assets

- film stills
- actor images
- modern adaptation logos
- imitation key art
- unlicensed mythology art
- concept screens that appear live without labels

## Search and discovery

### Page titles

Prefer project-specific titles:

- Calypso’s Promise — A Public-Domain Health Journey
- The Long Way Back to Ogygia — Founder Origin
- Public-Domain Commons — Calypso’s Promise
- Health-Data Covenant — Calypso’s Promise

Do not create titles designed to imply an official film connection.

### Metadata description

> Calypso’s Promise is an independent public-domain health project inspired by ancient mythology. Build a Living Chronicle, improve your understanding, and keep control of your private information.

### Structured data

Use appropriate organization, article, breadcrumb, software-source-code, and creative-work metadata only when truthful. Do not use movie schema or studio entities.

## Analytics and privacy

Campaign analytics should be minimal and disclosed.

Preferred initial measures:

- page views by campaign route
- referral source
- completion of the founding-expedition form
- outbound repository clicks
- current-status page visits
- anonymous comprehension survey responses

Avoid:

- session replay
- health-interest profiling
- cross-site advertising identifiers
- hidden pixels in health-related content
- enrichment with inferred medical or demographic profiles

Retention and deletion rules should be published before analytics are enabled.

## Accessibility

Campaign routes must satisfy the existing accessibility baseline and additionally provide:

- plain-language summaries of the founder essay and public-domain declaration
- transcripts for founder video
- alt text that describes meaning rather than ornamental mythology
- reduced-motion timeline and map alternatives
- no film knowledge required to understand the project
- dates in readable text, not image-only timelines
- accessible labels for status categories
- no forced parallax or scroll-jacking

## Conversion integrity

The campaign must never use the current attention cycle to manufacture urgency around:

- health-data submission
- research enrollment
- compensated opportunities
- donations
- governance participation
- investment
- account creation

Cultural urgency may justify paying attention to the story. It does not justify rushed consent.

## Acceptance criteria

The campaign website entry points are ready when:

- the founder essay and project genealogy are published
- historical artifacts are annotated
- public-domain status and migration are accurate
- the current-status page is canonical
- the health-data covenant is public
- the signup collects no sensitive health information
- direct mode answers every material question without narrative traversal
- no modern adaptation assets or affiliation cues appear
- analytics and cookies are disclosed
- all core routes meet accessibility review
- every major claim links to evidence or an accountable project document
