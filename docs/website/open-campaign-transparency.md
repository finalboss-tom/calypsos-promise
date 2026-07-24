# Open-Campaign Transparency Surfaces — BASELINE

**Purpose:** Define the public website and repository surfaces through which people can inspect the project’s marketing and public-relations strategy, execution, costs, results, corrections, and failures.

This document supplements `campaign-entry-points.md` and `information-architecture.md`.

## Principle

The public campaign is part of the build-in-public record.

A visitor should be able to move from any outward-facing claim to:

1. the current project status
2. the durable campaign strategy
3. the active campaign record
4. supporting evidence
5. corrections
6. measured results when available
7. the decision that follows

Publishing the strategy does not make private correspondence, personal data, security details, or abuse-enabling information public.

## Routes

Add these supporting routes to the campaign architecture.

- `/voyage/strategy` — human-readable open marketing and PR strategy
- `/voyage/log` — active and historical campaign records
- `/voyage/experiments` — marketing experiment registry
- `/voyage/reports` — monthly and campaign-completion reports
- `/voyage/costs` — aggregate campaign and communication costs
- `/press/corrections` — public correction history and request process

Repository source documents remain canonical:

- `docs/public/marketing-and-pr-strategy.md`
- `docs/public/campaign-log.md`

The website may render structured versions, but it must link to the versioned source.

## `/voyage/strategy`

### Objective

Let any visitor understand how the project intends to earn attention, trust, participation, coverage, and support.

### Required sections

- open-campaign thesis
- goals and explicit non-goals
- prohibited practices
- message architecture
- audience map
- owned, shared, earned, partner, and paid channels
- founder-led communication and succession
- media strategy
- current-events protocol
- editorial pillars
- community and creator relations
- search and email strategy
- partnerships and funding communication
- measurement and guardrails
- experimentation rules
- crisis response
- transparency boundaries
- authority and review
- operating cadence
- launch gates

### Status banner

Display:

> Baseline strategy. Tactics and results evolve through the public campaign log; constitutional rights and capability status do not change through marketing experiments.

### Direct-mode summary

Provide a plain-language summary that answers:

- Are followers, reviews, or engagement purchased?
- Are paid relationships disclosed?
- Is health information used for targeting?
- How are current events selected?
- What is published about costs and results?
- What remains private?
- Who approves public claims?

### Change history

Show meaningful strategy changes with:

- date
- changed section
- reason
- supporting campaign record
- responsible steward

Do not silently rewrite the strategy to make past decisions appear consistent with later evidence.

## `/voyage/log`

### Objective

Show what the project is doing now and preserve what it did before.

### Campaign index

Each campaign card should show:

- public title
- status
- evidence state
- owner
- date range
- objective
- audience
- primary call to action
- current-event relationship, when any
- cash cost to date
- last update
- result summary

### Campaign detail

Render all non-private fields from the campaign schema:

- context
- objective and non-objectives
- hypothesis
- messages and proof
- assets and channels
- resources
- measurement plan
- review status
- dated execution actions
- results
- interpretation
- failures
- decision
- correction history

### Empty-state honesty

When execution or measurement has not occurred, show:

> No result yet. This record is public before execution so the original hypothesis remains inspectable.

Do not replace empty states with projections presented as outcomes.

## `/voyage/experiments`

### Objective

Publish material marketing experiments and their negative, positive, or inconclusive results.

### Registry fields

- experiment ID
- title
- status
- audience
- hypothesis
- variable
- comparison
- primary measure
- guardrails
- start and end dates
- maximum cost
- stopping rule
- privacy and accessibility review
- result
- evidence quality
- interpretation
- decision

### Prohibited-experiment notice

Display the prohibited categories from the strategy:

- deceptive consent
- health fear
- shame
- false scarcity
- hidden tracking
- sensitive-person targeting
- undisclosed sponsorship
- deceptive affiliation

The absence of an experiment in these categories is a constitutional boundary, not missing innovation.

## `/voyage/reports`

### Objective

Provide durable monthly and campaign-completion reports.

### Monthly report card

- month
- active campaigns
- major assets
- qualified reach
- comprehension findings
- participation actions
- media outcomes
- costs
- corrections and incidents
- failures
- changes made
- next decisions

### Campaign-completion report

A completed campaign should receive a final report when:

- its planned window ends
- its current-event hook sunsets
- its primary hypothesis is invalidated
- it is intentionally retired
- a successor campaign replaces it

The report should not wait for favorable outcomes.

## `/voyage/costs`

### Objective

Make material campaign resource use visible without exposing individual compensation where confidentiality or safety requires aggregation.

### Cost categories

- creative production
- paid distribution
- contractors
- events and travel
- software and services
- sponsorship
- public-relations support
- other

Show:

- cash committed
- cash spent
- in-kind support
- estimated founder hours
- estimated contributor hours
- reporting period
- funding source where public

### Relationship disclosure

Where a vendor, contractor, sponsor, partner, or related entity has a material relationship with the founder, maintainers, Calypso’s Promise, or Optimitron, disclose the category and nature of the relationship.

Do not imply that volunteer time is cash expenditure or that estimated labor is a donation unless the contributor characterized it that way.

## `/press/corrections`

### Objective

Give journalists, creators, community members, and ordinary visitors a clear path to request or inspect corrections.

### Required content

- correction contact or form
- information required to evaluate a correction
- expected acknowledgement standard
- current open corrections
- completed project corrections
- material external corrections requested
- source evidence
- affected pages or posts
- date resolved

### Correction request fields

- public claim or URL
- what appears incorrect
- supporting source
- contact information, optional unless follow-up is necessary
- permission to publish the submitter’s name, default no

The form must warn people not to submit personal health information.

### Privacy

Public records should describe the correction and outcome without publishing private correspondence or contact information.

## Campaign dashboard

The `/voyage` hub should include a compact open-campaign panel.

Show:

- active campaign
- current stage
- current hypothesis
- public launch window
- current-event sunset
- cash spend to date
- latest result state
- latest correction
- latest decision
- links to strategy, log, and current status

The panel should not show a progress bar that implies the campaign or project will finish on a predetermined date.

## Structured data

Where appropriate, expose machine-readable campaign records containing only public fields.

Recommended record types:

- campaign
- outreach
- experiment
- correction
- monthly report
- cost summary

Each record should include:

- stable ID
- schema version
- created and updated timestamps
- status
- source repository path
- public URL
- responsible steward

Do not expose private contact, signup, health, moderation, or security fields through APIs, page source, analytics payloads, or structured metadata.

## Analytics

The transparency surfaces should themselves use minimal analytics.

Useful measures:

- strategy-page visits
- campaign-log visits
- current-status transitions
- correction-page visits
- source-document clicks
- comprehension responses

Avoid ranking individual journalists, creators, contributors, or critics by perceived favorability.

## Accessibility

Provide:

- plain-language strategy summary
- semantic headings and tables
- non-visual status labels
- downloadable or printable text views
- accessible chart alternatives
- currency values as text
- dates in unambiguous form
- change histories readable without color
- no essential information hidden behind animation

## Governance and maintenance

During the current phase, the founding steward owns publication and accuracy, subject to:

- maintainer review for repository and status claims
- specialist review for health, privacy, security, accessibility, legal, research, scientific, and funding claims
- public correction and decision records

Later authority should separate:

- campaign execution
- factual status review
- specialist claim review
- financial reporting
- corrections
- incident communication
- constitutional oversight

## Acceptance criteria

The open-campaign surfaces are ready when:

- the complete strategy is publicly readable
- the initial campaign record is public before launch
- source documents are linked and versioned
- costs can be reported without exposing protected information
- experiment and correction schemas are implemented
- empty results are represented honestly
- current status remains one click away
- private outreach and signup information cannot leak through public views
- accessibility review is complete
- every current-event campaign displays a sunset date
- historical strategies and results remain available after replacement
