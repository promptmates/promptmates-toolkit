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
3. `context/target-companies.md` (verified board tokens for live search)

If `search-preferences.md` is blank or contains only the template, run Phase 0 in full. If it already has populated fields, confirm with the user: "I have your preferences from last time [summarize]. Still good, or want to adjust anything?"

## Runtime Expectation

This skill performs live API searches across 15-30 company career boards. Expect the full run to take 2-4 minutes once intake is complete. The agent will search in parallel batches, but each batch requires a network round-trip. Let the user know: "This will take a few minutes while I search live boards. I'll show you what I find."

## Execution Sequence

### Phase 0: Interactive Intake

Do not skip this phase on first run. Ask the user what they have and what they want before proceeding.

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

**After intake: Save preferences.** Write the user's answers to `context/search-preferences.md` so future runs can skip Phase 0.

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
- "Recruiting Manager" -> also search: Head of Talent, TA Lead, People Operations Manager, Talent Partner (Senior), Recruiting Lead
- "Software Engineer" -> also search: Developer, SDE, Backend Engineer, Platform Engineer, Full Stack Engineer
- "Data Analyst" -> also search: Analytics Engineer, Business Intelligence Analyst, Insights Analyst, Decision Scientist

---

**STOP. Show the user the expanded title list and ask: "Do these feel right? Add or remove any before I search."**

Do not proceed to Phase 2 until the user confirms or adjusts the title expansion. This is the moment where CareerMate shows its value: surfacing titles the user hadn't considered. Rushing past it defeats the purpose.

---

### Phase 2: Live Search

Query public ATS APIs using the verified board tokens in `context/target-companies.md`.

**How the agent searches (API-based):**

IMPORTANT: Do NOT use WebFetch for these API calls. WebFetch truncates large JSON responses and will miss most jobs on boards with 50+ roles. Use Bash with curl + python3 instead. This is mandatory.

**Method: Bash tool with curl and python3 for all board searches.**

The agent calls each API via curl, pipes through python3 for JSON parsing, and extracts title matches. No browser or Google search required.

**Batch search pattern (search multiple boards in a single Bash call):**

```bash
python3 -c "
import json, urllib.request, urllib.error, sys

# Define boards to search (copy from target-companies.md)
greenhouse_boards = [('anthropic', 'Anthropic'), ('scaleai', 'Scale AI'), ...]  # fill from target list
ashby_boards = [('openai', 'OpenAI'), ('snowflake', 'Snowflake'), ...]
lever_boards = [('palantir', 'Palantir'), ...]

# Define title keywords from user's title_expansion
titles = ['head of talent', 'director people', 'recruiting operations', ...]  # from Phase 1

matches = []

def check_title(title, keywords):
    t = title.lower()
    return any(kw in t for kw in keywords)

# Greenhouse
for token, company in greenhouse_boards:
    try:
        req = urllib.request.Request(f'https://boards-api.greenhouse.io/v1/boards/{token}/jobs', headers={'User-Agent': 'CareerMate/1.0'})
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode())
            for j in data.get('jobs', []):
                if check_title(j.get('title',''), titles):
                    matches.append({'title': j['title'], 'company': company, 'location': j.get('location',{}).get('name',''), 'url': j.get('absolute_url',''), 'platform': 'greenhouse'})
    except: pass

# Ashby
for slug, company in ashby_boards:
    try:
        req = urllib.request.Request(f'https://api.ashbyhq.com/posting-api/job-board/{slug}', headers={'User-Agent': 'CareerMate/1.0'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
            for j in data.get('jobs', []):
                if check_title(j.get('title',''), titles):
                    matches.append({'title': j['title'], 'company': company, 'location': j.get('location',''), 'url': f'https://jobs.ashbyhq.com/{slug}/{j.get(\"id\",\"\")}', 'platform': 'ashby'})
    except: pass

# Lever
for slug, company in lever_boards:
    try:
        req = urllib.request.Request(f'https://api.lever.co/v0/postings/{slug}?mode=json', headers={'User-Agent': 'CareerMate/1.0'})
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode())
            if isinstance(data, list):
                for j in data:
                    if check_title(j.get('text',''), titles):
                        matches.append({'title': j['text'], 'company': company, 'location': j.get('categories',{}).get('location',''), 'url': j.get('hostedUrl',''), 'platform': 'lever'})
    except: pass

print(json.dumps(matches, indent=2))
print(f'\\n--- SEARCHED: {len(greenhouse_boards)} Greenhouse + {len(ashby_boards)} Ashby + {len(lever_boards)} Lever = {len(greenhouse_boards)+len(ashby_boards)+len(lever_boards)} boards ---', file=sys.stderr)
print(f'--- MATCHED: {len(matches)} roles ---', file=sys.stderr)
"
```

**Adapt this pattern for each run:**
1. Copy ALL board tuples from `context/target-companies.md` into the script (minus any excluded industries)
2. Set `titles` to the lowercased keywords from the user's title_expansion (Phase 1 output)
3. Run it as a single Bash call. It will complete in 2-4 minutes.
4. Parse the JSON output for scoring in Phase 3.

**You may split into 2-3 Bash calls if the board list is very long** (to avoid timeout), but do NOT use WebFetch.

**Individual job detail (Greenhouse only):** `https://boards-api.greenhouse.io/v1/boards/{token}/jobs/{job_id}`
   - Fetch full description for promising matches to confirm skill overlap
   - Use curl or python3 urllib for this too
   - Only fetch detail for roles where title is a strong match

**Search Strategy:**
1. Read `context/target-companies.md` for the board token list
2. Search ALL boards in the list unless the user has explicitly excluded an industry in their deal-breakers. "Filter by preference" means REMOVE excluded industries only, not select favorites. When in doubt, search more, not fewer.
3. Target: search all 90 boards. Minimum acceptable: 60. If you search fewer than 60, explain why.
4. For each board: fetch all jobs, scan titles for matches against title_expansion + core_skills
5. For strong title matches: fetch full job description to confirm skill overlap and extract comp/location/remote status
6. Deduplicate (same role may appear under multiple tokens if a company has changed names)

**What the agent CANNOT do:**
- Google site-search (Google blocks automated access)
- Workday career sites (JavaScript-rendered, no public API)
- iCIMS, Taleo, SuccessFactors (enterprise ATS with no public API)

These limitations are why the Boolean strings in Phase 4 exist: they are for the USER to run in their own browser.

**Handling 404s and failures:**
Many company board tokens change over time. If a board returns 404 or empty results:
- Skip it without comment
- Do not retry
- Do not tell the user "I couldn't reach X" unless more than half of boards fail (which indicates a network issue)

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
**Title Expansion:** [current title] -> [expanded titles]
**Transferable Outcomes:** [list]
**Industries (direct + adjacent):** [list]
```

#### Output 2: `### 2) Matched Roles`

Table format, sorted by match score descending:

| Score | Title | Company | Location | Work Model | Why It Matches | Apply Link |
|-------|-------|---------|----------|------------|----------------|------------|

Group into three sections:
- **Strong Matches** (75+)
- **Stretch Matches** (50-74)
- **Adjacency Discoveries** (35-49)

For Adjacency Discoveries, include a one-line explanation of WHY this is adjacent ("Your program management experience + data skills maps to this Analytics PM role").

If a section is empty, say so: "No strong matches found in this search. Consider broadening your title expansion or industry scope."

#### Output 3: `### 3) Roles You Are Probably Missing`

The highest-value section. Based on adjacency analysis, identify:
- Titles the user is likely NOT searching for but should be
- Industries they have not considered where their skills transfer
- Company stages they may be overlooking

Format as a short, direct list with reasoning. 3-5 items max. Each one should be specific enough to act on.

#### Output 4: `### 4) Your Personalized Search Plan`

**Section 1: Custom Boolean Strings (for your browser)**

These are for the user to run manually in their browser. The agent cannot run Google searches.

Tailored to the user's expanded profile. Provide copy-paste ready strings for each platform. Use the user's title_expansion and geo preferences to fill in the terms.

**Template (replace [TITLES] and [LOCATIONS] with user's profile):**

```
inurl:boards.greenhouse.io ([TITLES]) AND ([LOCATIONS])
inurl:jobs.ashbyhq.com ([TITLES]) AND ([LOCATIONS])
inurl:jobs.lever.co ([TITLES]) AND ([LOCATIONS])
inurl:wd1.myworkdaysite.com ([TITLES]) AND ([LOCATIONS])
inurl:getro.com ("jobs" OR "careers" OR "openings") AND ([TITLES]) AND ([LOCATIONS])
inurl:jobs.jobvite.com ([TITLES]) AND ([LOCATIONS])
inurl:taleo.net ([TITLES]) AND ([LOCATIONS])
```

**Example for a recruiter searching remote + SF:**

```
inurl:boards.greenhouse.io ("recruit*" OR "talent acquisition" OR "sourcer") AND ("remote" OR "virtual" OR "work from home" OR "San Francisco")
inurl:jobs.ashbyhq.com ("recruit*" OR "talent acquisition" OR "sourcer") AND ("remote" OR "virtual" OR "work from home" OR "San Francisco")
inurl:jobs.lever.co ("recruit*" OR "talent acquisition" OR "sourcer") AND ("remote" OR "virtual" OR "work from home" OR "San Francisco")
inurl:wd1.myworkdaysite.com ("recruit*" OR "talent acquisition" OR "sourcer") AND ("remote" OR "virtual" OR "work from home" OR "San Francisco")
inurl:getro.com ("jobs" OR "careers" OR "openings") AND ("recruit*" OR "talent acquisition" OR "sourcer") AND ("remote" OR "virtual" OR "work from home" OR "San Francisco")
inurl:jobs.jobvite.com ("recruit*" OR "talent acquisition" OR "sourcer") AND ("remote" OR "virtual" OR "work from home" OR "San Francisco")
inurl:taleo.net ("recruit*" OR "talent acquisition" OR "sourcer") AND ("remote" OR "virtual" OR "work from home" OR "San Francisco")
```

Also provide a LinkedIn-specific string:
```
("Title A" OR "Title B" OR "Title C") AND ("remote" OR "City, State")
```

**Section 2: Platform Strategy**

Which platforms to check and why, based on their target:
- Consider.com -> VC-backed growth companies
- Wellfound -> early-stage startups, also good for advisory/fractional roles
- Climatebase -> mission-driven climate companies (only if relevant to user)
- Direct ATS boards -> for specific target companies
- Bolster.com -> executive and fractional placements (if senior)

**Section 3: Weekly Search Routine**

A simple 3x/week cadence:
- Monday: Run Boolean strings in your browser, check new postings from last 3 days
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
- A live job posting with a direct URL retrieved via API
- Role is currently open (appeared in the board's active jobs list)
- URL resolves to an actual posting page

### What Does NOT Count
- Roles without a traceable URL
- Aggregator-only listings with no company source
- Roles the agent "remembers" from training data but did not verify live
- Staffing agency postings (flag but deprioritize)

## What NOT to Do

- Do not invent URLs or role listings
- Do not guess at compensation unless it appeared in the job description
- Do not make assumptions about the user's qualifications beyond what they provided
- Do not filter roles based on your own judgment of "fit" without explaining why
- Do not skip the intake questions on first run
- Do not skip the title expansion confirmation step
- Do not be discouraging. If matches are thin, say so honestly and suggest adjustments to search parameters.
- Do not apologize for 404s or failed board lookups. Just skip them.

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
| `context/target-companies.md` | Verified board tokens for API search |
