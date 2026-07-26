# Assumption Registry — BASELINE

**Immune-system basis:** `docs/governance/institutional-immune-system.md`  
**Decision basis:** Decision 0007  
**Current implementation:** Manual, public, and documentation-only

## Purpose

The Assumption Registry makes material beliefs visible before they become invisible architecture.

Calypso’s Promise contains protected constitutional commitments and empirical beliefs about how to fulfill them. The two must not be confused.

- A **commitment** states what the project promises or refuses to do.
- An **assumption** states what the project currently believes about causes, effects, feasibility, behavior, risk, or institutional development.

For example, “meaningful refusal must not be punished” is a protected rule. “A specific return mechanic will make refusal feel non-punitive” is an assumption that must be tested.

The registry does not turn human rights, consent, privacy, or the frozen Promise into a popularity contest. It exposes the causal and implementation theories surrounding those commitments so the project can improve them without silently weakening the rights floor.

## Registry rules

A material assumption should be registered when it:

- shapes a frozen or baseline architecture
- justifies a consequential product or incentive mechanism
- influences health, safety, consent, privacy, security, accessibility, or canonical records
- supports a governance phase or authority transfer
- affects research, economics, compensation, or public-good claims
- creates significant vendor, founder, model, or infrastructure dependence
- is difficult or costly to reverse
- is repeatedly used to justify roadmap priority
- could create concentrated harm even when aggregate metrics look positive

An assumption record must:

- have a stable identifier
- state one reviewable claim
- distinguish evidence from interpretation
- name affected groups and dependencies
- state confidence without false precision
- include evidence for and against the claim
- define what would weaken or invalidate it
- identify a review owner and review trigger
- preserve supersession and invalidation history
- link resulting work, decisions, tests, and outcomes

Absence of contradictory evidence is not proof. A record is not validated merely because it has existed for a long time, appears in a frozen document, was proposed by the founder, or is embedded in code.

## Confidence vocabulary

The initial manual vocabulary is qualitative:

- **OPEN QUESTION** — the project has not yet selected or meaningfully evaluated a claim.
- **WORKING HYPOTHESIS** — reasoned enough to guide bounded design work, but not supported by direct project evidence.
- **SUPPORTED** — multiple relevant evidence sources or project observations support the claim, with meaningful uncertainty remaining.
- **WELL SUPPORTED** — repeated, independent, decision-relevant evidence supports the claim and known alternatives have been tested.
- **DISPUTED** — credible evidence or interpretation materially conflicts.
- **WEAKENED** — evidence has reduced confidence or narrowed the claim.
- **INVALIDATED** — the claim failed its declared conditions or is no longer safe to rely on.
- **SUPERSEDED** — a more precise or useful claim replaced it without erasing history.

Confidence is not authority. A WELL SUPPORTED implementation claim cannot waive a protected right or specialist duty.

## Lifecycle

1. **Proposed** — the assumption is identified but not yet normalized.
2. **Active** — it currently influences design, policy, implementation, or governance.
3. **Under review** — a scheduled or triggered revalidation is in progress.
4. **Disputed** — a credible challenge is unresolved.
5. **Narrowed** — the claim remains useful only within a smaller scope.
6. **Weakened** — reliance must be reduced while further evidence is gathered.
7. **Invalidated** — the claim must no longer justify new decisions.
8. **Superseded** — a successor record is authoritative for new work.
9. **Retired** — the claim no longer affects the system but remains institutional memory.

A lifecycle change must name the evidence, authority, date, and linked decision or work item.

## Required record shape

Each assumption should eventually preserve:

```text
id
statement
category
scope
status
confidence
constitutional boundary
intended decision use
evidence for
evidence against
competing explanations
affected groups
rights and safety implications
dependencies
owner or steward
reviewers and independence limitations
created date
last reviewed date
next review date or trigger
invalidation conditions
containment or fallback if weakened
linked challenges
linked decisions
linked implementations
linked outcome evidence
supersedes / superseded by
public information classification
```

The exact typed contract remains future work. This Markdown registry is the Phase 0 source of truth until a versioned schema is accepted.

## Seed registry

These records expose major project theories already implied by the repository. They are initial hypotheses, not completed validations.

---

### AS-0001 — Personal utility can sustain participation before secondary use

- **Category:** Product and institutional sequencing
- **Status:** Active
- **Confidence:** WORKING HYPOTHESIS
- **Statement:** A private product that helps a person build, understand, and use a longitudinal Living Chronicle can create enough recurring personal value to sustain participation before research, markets, compensation, broad governance, or collective-data use are introduced.
- **Constitutional boundary:** Personal value before secondary use remains binding even if the hypothesis is weakened. Failure would require improving or replacing the personal-value strategy, not coercing secondary participation.
- **Intended decision use:** Phase 1 product scope, roadmap order, and exclusion of premature extraction or governance mechanics.
- **Evidence for:** The project has a coherent product thesis, longitudinal record model, narrative framework, and incentive design centered on personal utility.
- **Evidence against or missing:** No real product, retention, usefulness, comprehension, or longitudinal outcome evidence exists yet.
- **Affected groups:** All prospective players, especially people who do not want research, social, governance, or compensated participation.
- **Dependencies:** Useful Living Chronicle, trustworthy capture, understandable provenance, correction, export, deletion, accessibility, and meaningful game loops.
- **Invalidation or weakening conditions:** The complete personal-value loop repeatedly fails to produce meaningful utility or voluntary return after reasonable product iterations; value depends primarily on coercive engagement or secondary-use incentives.
- **Containment or fallback:** Narrow scope, remove ineffective mechanics, preserve data rights, and reconsider the product route before unlocking later institutional phases.
- **Next review trigger:** First complete personal-value-loop validation and every Phase 1 exit review.

---

### AS-0002 — Narrative play can improve comprehension and return without obscuring purpose

- **Category:** Product, behavior, and accessibility
- **Status:** Active
- **Confidence:** WORKING HYPOTHESIS
- **Statement:** The Ogygia narrative, illustrated exploration, quests, characters, and progression can make health-data capture, learning, reflection, and return more understandable and emotionally sustainable without concealing purpose, creating coercion, or excluding people who prefer direct interaction.
- **Constitutional boundary:** Narrative may not conceal purpose, secondary use, uncertainty, consent, or consequential health information. Direct and accessible alternatives remain required.
- **Intended decision use:** Website, game, onboarding, content, progression, return, and educational design.
- **Evidence for:** The world, lore, gameplay, controlled vocabulary, direct-mode, accessibility, and deterministic incentive foundations have been designed together rather than added independently.
- **Evidence against or missing:** No participant comprehension, accessibility, anxiety, compulsion, retention-quality, or direct-versus-narrative comparison evidence exists yet.
- **Affected groups:** Players with different health literacy, cognitive, sensory, language, cultural, gaming, and accessibility needs.
- **Dependencies:** Direct-mode parity, capability-status language, accessible controls, meaningful refusal, non-punitive return, content review, and truthful AI behavior.
- **Invalidation or weakening conditions:** Narrative materially reduces comprehension, hides consequences, increases pressure or anxiety, creates compulsive behavior, or systematically excludes people despite reasonable remediation.
- **Containment or fallback:** Disable or narrow the responsible mechanic, prioritize direct-mode access, revise content, and preserve the underlying personal utility without requiring narrative participation.
- **Next review trigger:** First usability and comprehension studies, first complete gameplay loop, and each material progression redesign.

---

### AS-0003 — Deterministic multidimensional incentives can align behavior without extraction

- **Category:** Incentives and behavior
- **Status:** Active
- **Confidence:** WORKING HYPOTHESIS
- **Statement:** Vitality, Chronicle, Fellowship, Renown, Laurels, meaningful refusal, and the Broken Lantern principle can encourage useful health, learning, record-building, and contribution behaviors without rewarding unnecessary disclosure, broader consent, compulsive use, social pressure, wealth, or permanent status accumulation.
- **Constitutional boundary:** No incentive may reward broader consent, unnecessary intimate disclosure, punishment for refusal, or loss of the complete personal product.
- **Intended decision use:** Progression, rewards, contribution recognition, return, quests, notifications, and future governance-adjacent reputation.
- **Evidence for:** The incentive model separates dimensions, hardcodes prohibited rewards, keeps Fellowship optional, and validates deterministic reward shapes.
- **Evidence against or missing:** No real behavior, gaming, compulsion, fairness, accessibility, longitudinal effect, or anti-abuse evidence exists yet.
- **Affected groups:** All players and contributors, with special attention to vulnerable people, high-frequency users, people under financial or social pressure, and people who decline participation.
- **Dependencies:** Deterministic policies, observable outcomes, guardrails, refusal behavior, contributor-credit rules, anti-abuse controls, and accessible explanations.
- **Invalidation or weakening conditions:** Incentives systematically encourage disclosure, anxiety, compulsion, performative activity, avoidance of needed care, gaming, exclusion, or status capture; personal utility becomes gated by participation.
- **Containment or fallback:** Pause or remove the responsible reward, preserve earned records where safe, restore affected state, and replace the mechanic through a versioned policy.
- **Next review trigger:** Before live progression, after each bounded incentive pilot, and at every material reward-policy revision.

---

### AS-0004 — Structured public feedback can become legitimate governed work

- **Category:** Product operations and governance
- **Status:** Active
- **Confidence:** WORKING HYPOTHESIS
- **Statement:** Public-safe issue intake, typed community signals, deterministic priority assessment, accountable overrides, contribution credit, implementation links, validation, and outcome review can improve product quality and institutional legitimacy more effectively than fragmented private support, raw reaction voting, or permanent maintainer intuition.
- **Constitutional boundary:** Public participation may not require protected disclosure, bypass specialist duties, or convert popularity into authority over rights and safety.
- **Intended decision use:** Decision 0006 implementation, issue workflows, priority policy, contribution pathways, and bounded delegated pilots.
- **Evidence for:** The repository now defines the complete loop, information boundary, issue template, decision classes, phased authority, failure modes, and minimum viable validation.
- **Evidence against or missing:** No product intake, typed-signal, priority-policy, representative participation, delegated pilot, or outcome evidence exists yet. GitHub itself may exclude ordinary users.
- **Affected groups:** Players, nontechnical users, contributors, maintainers, specialists, minorities, people with accessibility barriers, and people unwilling to maintain a public technical identity.
- **Dependencies:** Safe private routing, non-GitHub participation, identity and anti-abuse controls, explainable policy, appeals, outcome measurement, and immune-system challenge paths.
- **Invalidation or weakening conditions:** The loop repeatedly privileges popularity or contributor status, excludes affected people, exposes protected information, creates governance theater, hides unresolved outcomes, or cannot improve product decisions at reasonable cost.
- **Containment or fallback:** Keep signals advisory, reduce delegated scope, restore maintainer accountability with published rationale, and redesign the mechanism without abandoning traceable feedback and outcome learning.
- **Next review trigger:** First manual operating review, first in-product intake, first priority-policy simulation, and every delegated governance pilot.

---

### AS-0005 — Gate-based progressive decentralization can reduce founder dependence safely

- **Category:** Governance and institutional development
- **Status:** Active
- **Confidence:** WORKING HYPOTHESIS
- **Statement:** Authority can transfer through evidence gates, decision classes, bounded charters, appeals, specialist controls, rollback, and measured outcomes in a way that reduces founder dependence without sacrificing coherent execution, player rights, safety, or institutional purpose.
- **Constitutional boundary:** Founder independence is a frozen objective. Weak evidence for one transfer mechanism requires a better mechanism, not permanent founder control.
- **Intended decision use:** Institutional phases, founder-reserved powers, council pilots, delegated roadmap capacity, succession, and constitutional governance design.
- **Evidence for:** The repository defines decision classes, authority gates, capital limits, affectedness, competence, delegation, succession, emergency limits, and explicit capture risks.
- **Evidence against or missing:** No council, representative body, delegated authority, binding roadmap capacity, leadership transition, founder-absence exercise, or constitutional cycle has occurred.
- **Affected groups:** Players, contributors, maintainers, specialists, founder, donors, operators, and future institutional participants.
- **Dependencies:** Community capacity, representative participation, identity and anti-Sybil controls, transparent authority maps, removal, appeals, succession, recovery, and sustainable economics.
- **Invalidation or weakening conditions:** Transfers repeatedly cause capture, deadlock, rights violations, safety delay, incoherence, illegitimacy, or hidden re-centralization; founder powers remain practically irreplaceable despite formal delegation.
- **Containment or fallback:** Pause or roll back the bounded transfer, preserve transparent reasons and outcomes, restore accountable temporary authority, and redesign the gate or charter.
- **Next review trigger:** Every institutional phase-exit review, authority-transfer proposal, delegated pilot, and founder-absence exercise.

---

### AS-0006 — Modularity and portable contracts can preserve continuity across replacement

- **Category:** Architecture and operations
- **Status:** Active
- **Confidence:** WORKING HYPOTHESIS
- **Statement:** Stable domain boundaries, provider-independent identity, versioned schemas, provenance, exports, replaceable adapters, reproducible builds, and open specifications can let Calypso’s Promise replace technologies, vendors, models, operators, and institutions without abandoning personal records, player rights, or the mission.
- **Constitutional boundary:** Technology replacement may not silently weaken privacy, consent, provenance, export, deletion, correction, or authoritative-record boundaries.
- **Intended decision use:** Architecture, provider selection, data contracts, migration design, MCP boundaries, vendor strategy, operational succession, and fork readiness.
- **Evidence for:** The frozen architecture and current Sprint 3 direction explicitly separate domain authority from providers and preserve provenance, correction, export, deletion, and source identity.
- **Evidence against or missing:** No major provider, schema, model, infrastructure, operator, or governance migration has been executed. Open code alone does not prove operational portability.
- **Affected groups:** Players with long-lived records, maintainers, operators, downstream authorized systems, future forks, and successor institutions.
- **Dependencies:** Canonical data model, migration contracts, export fidelity, reproducible environments, secret and key transfer, documentation, tests, and operational exercises.
- **Invalidation or weakening conditions:** A major replacement requires loss of rights, provenance, data fidelity, service continuity, institutional memory, or practical forkability; proprietary dependence becomes unavoidable and unbounded.
- **Containment or fallback:** Block or narrow the dependency, require an exit plan, preserve portable source records, and fund replacement or migration work before authority or data expands.
- **Next review trigger:** First production provider selection, every major vendor or schema decision, and each migration or disaster-recovery exercise.

---

### AS-0007 — An explicit immune system will improve correction without causing paralysis

- **Category:** Institutional corrigibility
- **Status:** Active
- **Confidence:** WORKING HYPOTHESIS
- **Statement:** A shared architecture for outcomes, assumptions, challenge, containment, reversibility, appeal, restoration, revalidation, and forkability will improve the project’s ability to correct itself without creating unbounded process, shadow governance, or suppression disguised as safety.
- **Constitutional boundary:** Meaningful correction, appeal, rights protection, and accountable emergency limits remain required even if this particular architecture is replaced.
- **Intended decision use:** Decision 0007 implementation and all later immune-system modules.
- **Evidence for:** Existing repository safeguards already perform distributed immune functions, and consolidating them creates clearer interfaces and reusable validation requirements.
- **Evidence against or missing:** The protocol has not yet been used on a real project decision, challenged by an external contributor, measured for delay, or tested against capture and bad-faith use.
- **Affected groups:** Everyone subject to project decisions, especially critics, minorities, affected users, maintainers, specialists, and people seeking appeal or restoration.
- **Dependencies:** Proportional scrutiny, public-safe and private challenge paths, independence, due process, anti-abuse controls, clear authority, and metrics that do not reward challenge volume.
- **Invalidation or weakening conditions:** The system routinely blocks low-risk work, centralizes unreviewable correction power, labels dissenters as threats, exposes protected evidence, rewards controversy, or fails to correct material harms.
- **Containment or fallback:** Narrow required process, replace captured bodies, suspend unsafe challenge surfaces, preserve direct issue and appeal paths, and redesign the architecture through a public decision record.
- **Next review trigger:** After the first five material challenge records, the first emergency activation, the first rejected appeal, and every institutional phase-exit review.

---

### AS-0008 — Public-good underwriting can fund development without purchasing authority

- **Category:** Economics, public-good funding, and institutional legitimacy
- **Status:** Active
- **Confidence:** WORKING HYPOTHESIS
- **Statement:** Donations, grants, sponsorships, and in-kind support can fund bounded public-good work when benefits are limited to transparent attribution and outcome evidence, funded work follows ordinary governance, and money cannot purchase private information, product authority, research access, provider status, favorable findings, player progression, or governance power.
- **Constitutional boundary:** Funding may never purchase the Promise, player rights, private-data access, broader permission, safety exceptions, constitutional control, or exemption from ordinary review. Weak evidence for underwriting requires narrowing or replacing the funding model, not selling those boundaries.
- **Intended decision use:** Decision 0008, sponsor-benefit limits, public-good opportunities, grant restrictions, fellowship underwriting, provider-credit treatment, and support-page design.
- **Evidence for:** The repository already separates decision classes, limits capital power, keeps Fellowship optional, requires public decisions and outcome review, and now defines explicit benefit, conflict, record, concentration, and termination rules. Comparable open-source projects demonstrate that adjacent institutions may fund useful public software when sponsor value is legible.
- **Evidence against or missing:** Calypso’s Promise has no accepted sponsor, operating donation history, funded fellowship, real outcome report, independent financial review, public support runtime, or evidence that supporters will accept the constraints. Recognition may still distort attention or priorities informally.
- **Affected groups:** Players, prospective players, contributors, maintainers, specialists, funders, vendors, public-interest partners, and future governance participants.
- **Dependencies:** Legitimate entity or custodian, accounting and tax treatment, conflict review, public ledger, ordinary governed work, specialist review, outcome measurement, provider neutrality, concentration controls, and termination capacity.
- **Invalidation or weakening conditions:** Material funding repeatedly changes roadmap priorities without evidence, buys preferred placement or access, suppresses findings, creates rights or safety exceptions, rewards payment or status, excludes unfunded contributors, or makes the project unable to refuse or lose a source.
- **Containment or fallback:** Pause new benefits and obligations, preserve public history, terminate or narrow incompatible relationships, reduce scope, diversify, migrate critical dependencies, and return or redirect restricted value only through reviewed authority.
- **Next review trigger:** First material relationship, first funded artifact or fellowship, first sponsor challenge, first suspension or termination, every concentration trigger, and each institutional phase-exit review.

---

### AS-0009 — Funding transparency can increase trust without exposing protected financial sources

- **Category:** Transparency, privacy, and financial accountability
- **Status:** Active
- **Confidence:** WORKING HYPOTHESIS
- **Statement:** Reviewed public derivatives can make material funding relationships, restrictions, benefits, conflicts, dependencies, work, outcomes, and corrections legible while raw donor, payment, banking, tax, contract, negotiation, compensation, and correspondence records remain protected in separate source systems.
- **Constitutional boundary:** Transparency may not expose people, private financial records, privileged advice, credentials, or protected negotiations merely to appear radical. Confidentiality may not conceal paid relationships, material influence, related parties, conflicts, institutional spending, or public-reporting control.
- **Intended decision use:** Public funding ledger, donor privacy, amount bands, website funding transparency, partner announcements, aggregate reports, and correction records.
- **Evidence for:** Decision 0005 and the publication policy already distinguish public institutional facts from protected source records. The funding ledger now defines stable identifiers, material fields, amount bands, re-identification review, correction, and private-system separation.
- **Evidence against or missing:** No real donor or sponsor records have been processed. Amount bands may be too coarse or too revealing, private-to-public mapping may fail, small groups may remain identifiable, and contracts or law may complicate publication.
- **Affected groups:** Individual donors, organizational supporters, partners, contributors, staff, affected users, journalists, regulators, auditors, and future governance bodies.
- **Dependencies:** Information classification, data minimization, lawful source systems, accounting accuracy, permission where names are used, re-identification review, contract authority, correction procedures, and secure separation of public and private records.
- **Invalidation or weakening conditions:** Public derivatives repeatedly expose individuals, omit material conflicts or restrictions, cannot reconcile with private accounting, misstate pledged or available value, hide failed or terminated relationships, or create an unreviewable shadow financial system.
- **Containment or fallback:** Withhold or generalize unsafe fields, correct public records, pause publication or intake, improve private reconciliation and review, and publish the institutional limitation rather than false precision.
- **Next review trigger:** First live funding record, first individual-donor aggregate report, first contractual withholding, first correction or dispute, first financial incident, and every public funding report.

---

### AS-0010 — Diverse support can reduce founder dependence without creating donor dependence

- **Category:** Economics, succession, and institutional continuity
- **Status:** Active
- **Confidence:** WORKING HYPOTHESIS
- **Statement:** A diversified mix of unrestricted donations, grants, public-good underwriting, in-kind support, earned service value, and later sustainable economics can replace founder subsidy while concentration triggers, critical-function analysis, provider portability, public conflicts, and continuity plans prevent a new single point of capture.
- **Constitutional boundary:** Founder independence remains binding. Failure of a particular funding mix cannot justify permanent founder control, donor control, surveillance, broader consent, speculative assets, or sacrifice of the meaningfully free product.
- **Intended decision use:** Founder-subsidy register, concentration thresholds, provider and infrastructure credits, diversification plans, Phase 5 reserves and runway, succession, and source-loss exercises.
- **Evidence for:** The institutional roadmap already requires operations without founder subsidy, bounded donor capture, replaceable vendors, distributed critical authority, and public financial controls. Decision 0008 now treats both financial share and critical-function dependency as concentration.
- **Evidence against or missing:** No operating budget, funding history, revenue mix, reserve, treasury, independent financial review, entity, or source-loss exercise exists. Diversification may increase administrative burden, incompatible funders, or hidden correlation while founder labor remains difficult to replace.
- **Affected groups:** Founder, maintainers, contributors, operators, players, donors, vendors, future employees or contractors, and successor institutions.
- **Dependencies:** Founder-subsidy inventory, legal recipient, accounting, public reporting, multiple maintainers, portable infrastructure, reserves when authorized, source-loss plans, conflict controls, and willingness to narrow scope.
- **Invalidation or weakening conditions:** The project repeatedly depends on one donor, sponsor, provider, founder-controlled entity, payment rail, or sector; diversification is nominal rather than practical; losing a source forces rights violations or mission abandonment; or funding replaces transparent founder dependence with hidden donor leverage.
- **Containment or fallback:** Pause additional dependency, publish concentration, narrow commitments, reduce scope, diversify only into compatible support, migrate critical functions, establish time-bounded exceptions, and preserve the ability to continue or wind down legitimately.
- **Next review trigger:** Initial founder-subsidy register, first operating budget, first material source, every 10%, 20%, or 33% trigger, every critical-function sponsorship, first source-loss exercise, and each Phase 2, Phase 3, Phase 5, and Phase 7 gate review.

## Review protocol

A registry review should:

1. confirm the claim remains one reviewable statement
2. gather evidence that supports and contradicts it
3. identify changes in scope, affected groups, dependencies, or external conditions
4. review linked outcomes, incidents, overrides, challenges, and residual harms
5. state reviewer conflicts and independence limitations
6. retain, narrow, weaken, invalidate, supersede, or retire the claim
7. define containment or migration when reliance must change
8. update the next review trigger
9. link the decision and resulting governed work

A review that only collects confirming evidence is incomplete.

## Public-information boundary

This registry contains only PUBLIC institutional claims and synthetic or public evidence.

Do not place personal health information, account records, private correspondence, security details, conduct evidence, production payloads, legal advice, private negotiations, donor lists, payment or banking records, contracts, compensation records, or identifying participant records here. Protected evidence must remain in an authorized private system. A public registry update may cite only a reviewed, minimized institutional derivative.

## Near-term work

- normalize these seed records through repository review
- connect relevant roadmap, governance, incentive, architecture, security, and funding decisions to assumption identifiers
- define a challenge record that can target an assumption
- test the registry against synthetic contradictory evidence
- add review-owner and independence records before any assumption is represented as validated
- define a typed, versioned contract only after manual use reveals the necessary fields

The registry succeeds when an important belief can be found, understood, challenged, tested, narrowed, replaced, and remembered without requiring access to the founder’s private reasoning or the project’s historical chat record.
