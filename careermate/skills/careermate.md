---
name: careermate
description: Turn a resume or skill profile into a ranked list of open roles you might be missing. Produces an expanded skill map, live role matches from public ATS boards, adjacency discoveries, and a personalized search plan with Boolean strings.
user-invocable: true
---

# CareerMate (Job Search Skills Density Index)

The inverse of SkillsMate. Instead of "here's a role, find me candidates," this is "here's a candidate, find me roles." Identifies open positions across public ATS boards that match your core skills AND adjacent skills you may not be searching for.

## When to Use

Trigger when user says:
- "/careermate"
- "Find roles for me"
- "What jobs match my background?"
- "What else should I be searching for?"
- "Run CareerMate"
- Pastes a resume and asks about job matches or search strategy

## Core Principle

CareerMate is universal. It works for any background, any industry, any career stage. It assumes nothing about what you "should" want and asks instead.

## Setup

Before generating output, read:
1. `context/guardrails.md` (output constraints)
2. `context/search-preferences.md` (user's location, remote preferences, comp floor, etc.)

## Execution Sequence

### Phase 0: Interactive Intake

Do not skip this phase. Ask the user what they have and what they want before proceeding.

**Question 1: What do you have?**

Ask: "What can you share with me to get started? Pick all that apply:"
- A resume (paste text or upload)
- A LinkedIn profile URL or summary
- Target job descriptions you're interested in
- A plain-language description of what you do

Accept whatever combination they provide. More inputs = better output, but one is enough.

**Question 2: What matters to you?**

Ask: "What are your non-negotiables?"
- Location preference: remote, hybrid, onsite, or flexible
- Geography: where are you willing to work (city, state, country)
- Company stage: startup, growth, enterprise, any
- Industry: specific industries or "open to anything"
- Compensation floor: minimum total comp (optional, skip if uncomfortable)
- Deal-breakers: anything that would make you immediately pass

**Question 3: What are you open to?**

Ask: "How wide should I cast the net?"
- Same title only (conservative: roles that match your current/recent title exactly)
- Adjacent roles (moderate: titles you haven't held but your skills qualify you for)
- Career pivot (wide: roles in adjacent functions where your transferable skills apply)

If the user is unsure, default to "adjacent roles" and explain what that means for their specific background.

### Phase 1: Profile Extraction

Parse all provided inputs to extract:

```json
{
  "current_title": "string",
  "years_experience": "number",
  "core_skills": ["5-10 primary skills after stopword removal"],
  "adjacent_skills": ["3-7 skills implied by experience but not explicitly listed"],
  "transferable_outcomes": ["3-5 measurable outcomes that translate across roles"],
  "title_expansion": ["5-10 titles this person could realistically hold"],
  "industry_experience": ["industries worked in"],
  "industry_adjacencies": ["industries where these skills transfer"],
  "geo_preference": "string",
  "work_model": "remote|hybrid|onsite|flexible",
  "company_stage": "startup|growth|enterprise|any",
  "comp_floor": "number|not_specified"
}
```

**Stopwords to remove during skill parsing:**
Strip these from extraction: responsible for, ability to, collaborate, cross functional, fast paced, innovative, dynamic, excellent, strong, passion, passionate, self starter, rockstar, synergy, detail oriented, team player, results driven

**Title Expansion Logic:**
Based on scope and skills, generate alternate titles. Examples:
- "Recruiting Manager" → also search: Head of Talent, TA Lead, People Operations Manager, Talent Partner (Senior), Recruiting Lead
- "Software Engineer" → also search: Developer, SDE, Backend Engineer, Platform Engineer, Full Stack Engineer
- "Data Analyst" → also search: Analytics Engineer, Business Intelligence Analyst, Insights Analyst, Decision Scientist

Always show the user the expanded title list and ask: "Do these feel right? Add or remove any before I search."

### Phase 2: Live Search

Query public ATS APIs and job boards using the expanded skill and title profile.

**ATS API Sources (in priority order):**

1. Greenhouse boards: `https://boards-api.greenhouse.io/v1/boards/{board_token}/jobs`
2. Lever postings: `https://api.lever.co/v0/postings/{company}`
3. Ashby boards: `https://jobs.ashbyhq.com/api/non-user-graphql` (company-specific)
4. Workday: `inurl:wd1.myworkdaysite.com` (via Google search)
5. Getro network boards: `inurl:getro.com`
6. Jobvite: `inurl:jobs.jobvite.com`

**Aggregator Sources:**
- Consider.com VC boards
- Wellfound (formerly AngelList)
- Climatebase (if sustainability/climate interest indicated)

**Search Strategy:**
1. Build keyword combinations from core_skills + title_expansion
2. Filter by geo_preference and work_model
3. For each source, retrieve matching roles: title, company, location, posting date, URL
4. Deduplicate across sources (same role may appear on company site AND aggregator)

**Minimum evidence standard:** Every role in the output must have a direct URL to the posting. No invented links.

### Phase 3: Match Scoring

Score each discovered role on a 0-100 scale:

| Signal | Weight | Calculation |
|--------|--------|-------------|
| Skill Overlap | 0.35 | % of role's required skills that appear in user's core_skills |
| Adjacency Bonus | 0.20 | Bonus for roles matching adjacent_skills or title_expansion (not core title) |
| Preference Alignment | 0.20 | Match on location, work model, company stage, industry |
| Recency | 0.15 | Half-life decay: score = e^(-0.693 * days_since_posting / 30). Newer = better. |
| Seniority Fit | 0.10 | Alignment between role level and user's years_experience/scope |

**Categorization:**
- **Strong Match** (score 75+): You clearly qualify. Apply with confidence.
- **Stretch Match** (score 50-74): You have most of what they need. Worth a shot.
- **Adjacency Discovery** (score 35-49, must include adjacency_bonus > 0): Roles you probably are not searching for but should consider.

### Phase 4: Generate and Display All Outputs Inline

Display all sections directly in conversation with these exact headers and in this order:

---

#### Output 1: `### 1) Your Expanded Profile`

Show the user what you extracted and expanded. This is their mirror: what the market sees when it reads their background.

```
**Core Skills:** [list]
**Adjacent Skills:** [list]
**Title Expansion:** [current title] → [expanded titles]
**Transferable Outcomes:** [list]
**Industries (direct + adjacent):** [list]
```

#### Output 2: `### 2) Matched Roles`

Table format, sorted by match score descending:

| Score | Title | Company | Location | Work Model | Posted | Why It Matches | Apply Link |
|-------|-------|---------|----------|------------|--------|----------------|------------|

Group into three sections:
- **Strong Matches** (75+)
- **Stretch Matches** (50-74)
- **Adjacency Discoveries** (35-49)

For Adjacency Discoveries, include a one-line explanation of WHY this is adjacent ("Your program management experience + data skills maps to this Analytics PM role").

#### Output 3: `### 3) Roles You Are Probably Missing`

The highest-value section. Based on adjacency analysis, identify:
- Titles the user is likely NOT searching for but should be
- Industries they have not considered where their skills transfer
- Company stages they may be overlooking

Format as a short, direct list with reasoning.

#### Output 4: `### 4) Your Personalized Search Plan`

**Section 1: Custom Boolean Strings**

Tailored to the user's expanded profile. Provide copy-paste ready strings for:
- LinkedIn job search
- Google search (site:linkedin.com/jobs format)
- Each ATS pattern from the toolkit (Greenhouse, Lever, Ashby, Workday, Getro, Jobvite)

**Section 2: Platform Strategy**

Which platforms to check and why, based on their target:
- Consider.com → VC-backed growth companies
- Wellfound → early-stage startups, also good for advisory/fractional roles
- Climatebase → mission-driven climate companies
- Direct ATS boards → for specific target companies

**Section 3: Weekly Search Routine**

A simple 3x/week cadence:
- Monday: Run Boolean strings, check new postings from last 3 days
- Wednesday: Check aggregator platforms, apply to Stretch Matches
- Friday: Review Adjacency Discoveries, update profile if new patterns emerge

**Section 4: What To Do When You Find Something**

Brief guidance on approach:
- For Strong Matches: apply directly, find a connection at the company
- For Stretch Matches: tailor resume to emphasize overlapping skills, address gaps in cover note
- For Adjacency Discoveries: lead with transferable outcomes, not title history

---

## Evidence Quality Rules

### What Counts
- A live job posting with a direct URL
- Role is currently open (not archived/filled)
- Posting date is within last 90 days

### What Does NOT Count
- Roles without a traceable URL
- Aggregator-only listings with no company source
- Roles that have been open 120+ days (likely evergreen/filled)
- Staffing agency postings (flag but deprioritize)

## What NOT to Do

- Do not invent URLs or role listings
- Do not guess at compensation unless posted
- Do not make assumptions about the user's qualifications beyond what they provided
- Do not filter roles based on your own judgment of "fit" without explaining why
- Do not skip the intake questions
- Do not be discouraging. If matches are thin, say so honestly and suggest adjustments to search parameters.

## Tone

This tool serves people in job search. That is a vulnerable position. Be:
- Direct and practical (not patronizing)
- Honest about match quality (not inflating weak matches)
- Encouraging without being fake ("It only takes one" energy)
- Focused on expanding their view, not narrowing it

## Context Files Required

| File | Purpose |
|------|---------|
| `context/search-preferences.md` | User's location, remote pref, comp floor, deal-breakers |
| `context/guardrails.md` | Output constraints (no invented data, formatting rules) |
