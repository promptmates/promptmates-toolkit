---
name: intelmate
description: Competitive intelligence from job postings. Scrapes competitor career pages, classifies roles, extracts compensation, scores talent brands, and produces battle cards. Tell it who your competitors are and what you want to know.
user-invocable: true
---

# IntelMate (Competitive Intelligence from Job Postings)

Turns your competitors' public job postings into actionable intelligence. Scrapes their career pages, classifies every role by function and level, extracts compensation data, calculates hiring intensity, scores their talent brand, and builds battle cards for recruiting against them.

## When to Use

Trigger when user says:
- "/intelmate"
- "What are my competitors hiring for?"
- "Competitive intelligence on [company]"
- "Run intel on [company]"
- "Talent brand comparison"
- "Who's hiring what in my space?"
- "Battle card for [company]"
- "How does [company] compare to us?"

## Core Principle

Job postings are public strategic signals. Every open role tells you something about a company's direction, pain points, investment areas, and employer brand. IntelMate reads those signals systematically.

## Setup

Before generating output, read:
1. `context/guardrails.md` (output constraints)
2. `context/company-profile.md` (your company's info for comparison and battle cards)

## Execution Sequence

### Phase 0: Interactive Intake

**Question 1: Who are you?**

Ask:
- "What is your company name?"
- "What industry are you in?"
- "Approximate headcount?" (for hiring intensity comparison)
- "How many open roles do you currently have?" (optional, for benchmarking)

**Question 2: Who are your competitors?**

Ask:
- "List 3-10 competitors you want to analyze."
- "For each, do you know their careers page URL or ATS platform?" (optional; IntelMate will find them if not provided)

If the user is unsure who to track, offer: "Want me to suggest competitors based on your industry and size?"

**Question 3: What do you want?**

Present the menu. Let them pick one or multiple:

```
Which deliverables do you want? (pick any combination, or say "everything")

1. Full Role Inventory — every open role classified by function, level, and location
2. Compensation Benchmarking — posted salary ranges compared to yours
3. Hiring Intensity Report — who's growing fastest (roles as % of workforce)
4. Strategic Signals — new functions, tech keyword spikes, product direction clues
5. Geographic Intelligence — where they're hiring, remote mix, expansion signals
6. Seniority Distribution — building leadership vs. scaling ICs
7. Role Aging & Reposts — which roles are stuck (pain points / churn signals)
8. Talent Brand Scorecard — comp transparency, remote flex, JD quality, freshness
9. Battle Cards — per-competitor strengths, weaknesses, poach targets, talk tracks
10. Everything — the full package
```

### Phase 1: Discovery & Scraping

**ATS Detection:**

If the user did not provide career page URLs, detect the ATS for each competitor:
1. Try Greenhouse: `https://boards-api.greenhouse.io/v1/boards/{company-slug}/jobs`
2. Try Lever: `https://api.lever.co/v0/postings/{company}`
3. Try Ashby: WebFetch their careers page and check for Ashby markers
4. Try Workday: WebFetch and check for `myworkdaysite.com` or `myworkday.com` patterns
5. Fallback: WebFetch the company's careers page directly

Common slug patterns to try:
- Company name lowercase, no spaces: `acmecorp`
- Company name with hyphens: `acme-corp`
- Company name abbreviated: `acme`

**Data Collection:**

For each competitor, fetch all open postings and extract:
- `title` — raw job title
- `department` — organizational unit (if available)
- `location` — city, state, country, remote flag
- `posted_date` — when the role was published
- `url` — direct link to the posting
- `compensation` — salary range if disclosed (see extraction logic below)
- `description_text` — full JD text for classification

**Rate Limiting:**
- Greenhouse/Lever: 2-3 second delay between requests
- Workday/Generic: 4-5 second delay
- Never exceed 20 requests per minute to any single domain
- If rate limited, back off and retry once after 10 seconds

### Phase 2: Classification & Enrichment

**Functional Classification (12 areas):**

Classify each role into one of these functions based on title, department, and description keywords. Evaluate top-to-bottom, first match wins:

| Function | Title/Keyword Signals |
|---|---|
| G&A / People | HR, recruiter, talent, legal, compliance, facilities, admin, office manager, executive assistant |
| Regulatory / Quality | QA, QC, regulatory, validation, GMP, GLP, ISO, quality systems, CAPA |
| Clinical Operations | clinical trial, CRA, biostatistics, medical writing, clinical data, CRO |
| Medical / Scientific Affairs | MSL, medical director, genetic counselor, health economics, HEOR, medical affairs |
| Finance | accounting, FP&A, revenue, billing, reimbursement, controller, treasury, audit |
| Lab / Manufacturing | lab tech, specimen, sequencing, LIMS, phlebotomy, manufacturing, process engineer, supply chain |
| R&D / Science | research scientist, bioinformatics, assay development, computational biology, staff scientist |
| Sales / Commercial | account executive, territory, business development, sales, clinical specialist, commercial |
| Marketing | demand gen, product marketing, brand, communications, content, events, digital marketing |
| Engineering / IT | software, data engineer, ML, DevOps, product manager, security, infrastructure, SRE, platform |
| Customer Success / Support | customer success, support, patient coordinator, client services, help desk, onboarding |
| Operations / Strategy | operations, strategy, program manager, project manager, chief of staff, business operations |

**Seniority Inference:**

| Level | Title Signals |
|---|---|
| C-Suite | chief, CEO, CFO, CTO, CMO, CRO, CPO |
| VP | vice president, VP |
| Senior Director | senior director |
| Director | director (not "senior director") |
| Senior Manager | senior manager |
| Manager | manager (not "senior manager") |
| Lead / Principal | principal, staff, lead, head of |
| Senior IC | senior, sr., senior associate |
| Mid-Level IC | no seniority indicators |
| Associate / Junior | associate, junior, jr., entry |
| Intern | intern, co-op, apprentice |

**Compensation Extraction (3-layer):**

Layer 1: Structured API fields
- Greenhouse: `pay_input_ranges` field
- Lever: `salaryRange` field

Layer 2: Regex patterns in JD text
- `$XXX,XXX - $XXX,XXX` (annual)
- `$XXXk - $XXXk` (k notation)
- `$XX.XX - $XX.XX per hour` (hourly, convert to annual at 2,080 hours)

Layer 3: Contextual inference
- If "competitive compensation" or "market rate" mentioned but no numbers: mark as "not disclosed"
- If no comp language at all: mark as "not disclosed"

Never invent compensation ranges. Only report what is explicitly stated.

**Geographic Resolution:**
- Parse locations into: city, state/province, country
- Flag remote roles (look for "remote", "work from home", "distributed", "anywhere")
- Identify hybrid indicators ("hybrid", "2-3 days", "flexible location")

**Strategic Keyword Tagging:**

Scan titles and descriptions for strategic signals:
- Technology: AI/ML, automation, cloud, data platform, GenAI, LLM
- Product areas: specific product names, new verticals, emerging markets
- Growth signals: "founding", "first hire", "building from scratch", "0 to 1"
- Urgency: "immediate", "ASAP", "critical hire"

### Phase 3: Analysis & Scoring

**Hiring Intensity (per competitor):**
```
hiring_rate = (open_roles / estimated_headcount) * 100
```
Compare each competitor's rate to the user's company. Flag outliers (2x+ above or below average).

**Talent Brand Scorecard (0-100, per competitor):**

| Signal | Weight | How to Score |
|---|---|---|
| Compensation Transparency | 0.25 | % of postings with disclosed salary ranges |
| Remote Flexibility | 0.20 | % of roles offering remote or hybrid |
| Posting Freshness | 0.15 | Average age of open postings (lower = better). Score: 100 if avg < 30 days, 50 if 30-60, 25 if 60-90, 0 if 90+ |
| JD Quality | 0.15 | Average word count of descriptions (proxy for effort). 300-800 words = good, <150 = low effort, >1200 = bloated |
| Seniority Mix | 0.10 | Ratio of senior roles (Director+) to total. 10-25% = healthy, <5% = flat org, >40% = top-heavy |
| Role Diversity | 0.10 | Number of distinct functions hiring. More functions = broader investment. |
| Aging Penalty | -0.05 | % of roles open 90+ days. More stale roles = worse brand signal. |

**Categories:**
- 75+: Strong talent brand (they attract, you need to outposition)
- 50-74: Average (opportunities to differentiate)
- Below 50: Weak (their people may be frustrated; poach here)

**Role Aging Analysis:**
- Fresh: posted within 30 days
- Aging: 31-60 days
- Stale: 61-90 days
- Critical: 90+ days (likely a pain point, or evergreen/unfillable)

**Repost Detection:**
- If the same title + location combination appears multiple times across different posting dates, flag as a repost
- Reposts indicate: high turnover in that role, inability to close, or expanding a team

### Phase 4: Generate Outputs

Generate only the deliverables the user selected. Display inline with these headers:

---

#### `### 1) Full Role Inventory` (if selected)

Per competitor, table format:

| Company | Title | Function | Level | Location | Remote | Days Posted | Comp Range | URL |
|---------|-------|----------|-------|----------|--------|-------------|------------|-----|

Summary stats below the table:
- Total roles per company
- Top 3 functions per company
- % remote per company

---

#### `### 2) Compensation Benchmarking` (if selected)

**Transparency Rate:**
| Company | Roles with Comp | Total Roles | Transparency % |
|---------|----------------|-------------|----------------|

**Range Comparison by Function:**
| Function | Your Range | [Competitor A] | [Competitor B] | Market Position |
|----------|-----------|----------------|----------------|-----------------|

Market Position: "Above", "At Market", "Below" based on midpoint comparison.

Note: Only roles with disclosed compensation are included. Do not estimate or infer ranges.

---

#### `### 3) Hiring Intensity Report` (if selected)

| Company | Open Roles | Est. Headcount | Hiring Rate | vs. You | Signal |
|---------|-----------|----------------|-------------|---------|--------|

Signal column: "Aggressive Growth", "Steady", "Minimal Hiring", "Contracting" based on rate vs. industry average.

Top growing functions across all competitors (where is the industry investing?).

---

#### `### 4) Strategic Signals` (if selected)

Per competitor:
- **New functions appearing** — roles in departments they did not previously hire for
- **Keyword spikes** — technologies, products, or markets appearing in multiple recent postings
- **Product direction clues** — what their engineering/product roles tell you about their roadmap
- **Leadership hires** — Director+ roles signal new teams or strategic pivots

Summary: "Based on hiring patterns, [Competitor] appears to be investing in [X] and building capacity in [Y]."

---

#### `### 5) Geographic Intelligence` (if selected)

| Company | Top 3 Locations | % Remote | % Hybrid | New Locations (last 90 days) |
|---------|----------------|----------|----------|------------------------------|

Map of hiring concentration (text-based):
- Where are your competitors clustered?
- Where are they expanding that you are not present?
- Remote talent pools you could tap that they are also targeting

---

#### `### 6) Seniority Distribution` (if selected)

| Company | C-Suite | VP | Director | Manager | Lead/Principal | Senior IC | Mid IC | Junior | Intern |
|---------|---------|----|---------|---------|----|-----------|--------|--------|--------|

Analysis:
- Companies with heavy Director+ hiring = building new orgs (strategic moment to poach their ICs who get passed over)
- Companies with heavy IC hiring = scaling existing teams (their leaders are stretched thin)
- Companies with many intern/junior roles = investing in pipeline (long game, not immediate threat)

---

#### `### 7) Role Aging & Reposts` (if selected)

**Stale Roles (90+ days):**
| Company | Title | Days Open | Location | Signal |
|---------|-------|-----------|----------|--------|

Signal: "Hard to fill" (niche skill), "Comp issue" (below market if disclosed), "Location mismatch" (onsite in low-supply market), "Internal churn" (reposted 2+ times)

**Repost Patterns:**
| Company | Title | Times Posted | Interpretation |
|---------|-------|-------------|----------------|

---

#### `### 8) Talent Brand Scorecard` (if selected)

| Company | Comp Transparency | Remote Flex | Freshness | JD Quality | Seniority Mix | Diversity | Aging Penalty | Total Score | Grade |
|---------|-------------------|-------------|-----------|------------|---------------|-----------|---------------|-------------|-------|

Per competitor: one-line strength and one-line weakness.

**Your position:** Where you rank among the set. What you do better. What you need to improve.

---

#### `### 9) Battle Cards` (if selected)

One card per competitor:

```
## [Competitor Name] Battle Card

**Their Employer Brand Pitch:** (inferred from JDs, careers page language, comp approach)

**Their Strengths (why candidates go there):**
- [strength 1]
- [strength 2]
- [strength 3]

**Their Weaknesses (why candidates leave):**
- [weakness 1, inferred from aging roles, comp gaps, location constraints]
- [weakness 2]
- [weakness 3]

**Poachable Talent Pools:**
- [function/team where they are scaling → their people are overloaded]
- [function where roles are stale → their people are unsupported]

**Your Differentiators (use these in outreach):**
- [based on user's company profile vs. competitor's signals]

**Talk Track:**
"[2-3 sentence pitch for why a candidate at Competitor should talk to you]"
```

---

#### `### 10) Executive Summary` (always included if "Everything" selected)

3-5 paragraphs covering:
- Market hiring temperature (are your competitors aggressive or conservative right now?)
- Where the industry is investing (functions and technologies)
- Your competitive position (talent brand, comp, geographic coverage)
- Top 3 actions to take based on this intelligence
- Biggest vulnerability in your competitor set (who's weakest, where to recruit from)

---

## Evidence Quality Rules

### What Counts as Evidence
- A live job posting on a company's career site or ATS board
- Compensation data explicitly stated in a posting
- Posting dates from API metadata
- Location data from structured fields

### What Does NOT Count
- Glassdoor reviews or salary estimates (not verified)
- LinkedIn headcount (use only if user provides no headcount data)
- Rumors, press speculation, or unverified claims
- Compensation ranges from aggregator sites (Indeed estimates, etc.)

### Confidence Levels
- **High**: data from structured API fields (Greenhouse pay ranges, Lever salary fields)
- **Medium**: data from regex extraction in JD text
- **Low**: inferences from posting patterns (strategic signals, aging interpretations)

Always label the confidence level when presenting inferences.

## What NOT to Do

- Do not invent job postings or compensation ranges
- Do not present Glassdoor/Indeed salary estimates as company-disclosed data
- Do not speculate about company strategy beyond what postings support (label inferences clearly)
- Do not include names of current employees at competitor companies
- Do not access private/authenticated career portals
- Do not exceed rate limits or scrape sites that explicitly prohibit it
- Do not present a scraping failure as "no open roles" (distinguish "could not access" from "zero postings found")

## Tone

This is intelligence for decision-makers. Be:
- Factual and precise (numbers, not adjectives)
- Direct about what the data shows and does not show
- Honest about limitations (e.g., "3 of 8 competitors do not disclose compensation")
- Actionable (every insight should connect to a "so what" and "now what")

## Context Files Required

| File | Purpose |
|------|---------|
| `context/company-profile.md` | Your company info (name, industry, headcount, comp ranges, locations, open roles) for comparison |
| `context/guardrails.md` | Output constraints (evidence rules, formatting) |
