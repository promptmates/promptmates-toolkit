[skillsmate.md](https://github.com/user-attachments/files/27541615/skillsmate.md)
---
name: skillsmate
description: Turn a JD or skill cluster into a ranked Skills Density Index showing which companies are actively hiring that talent. Produces Intake JSON, Signal Pack, Evidence Annex, and a tactical Battle Card with Booleans and sourcing plan.
user-invocable: true
---

# SkillsMate (Skills Density Index)

Identify where specific skill clusters are concentrated across the hiring market. Produces 4 outputs inline: Intake JSON, SkillsMate Signal Pack, Evidence Annex, and a Human Battle Card for sourcing execution.

## When to Use

Trigger when user says:
- "/skillsmate"
- "SkillsMate for [role]"
- "Skills density index for [skill]"
- "Where is [skill] talent concentrated?"
- "Where should we poach from for this role?"
- "Who else is hiring for this?"
- Pastes a JD and asks about talent density or company targeting

## Core Principle

SkillsMate is universal. It works for any role, any industry, any skill cluster.

## Setup

Before generating output, read:
1. `context/guardrails.md` (output constraints)
2. `context/company-context.md` (your company positioning for competitive playbook)
3. `context/tone-of-voice.md` (communication style)
4. `context/competitor-registry.yaml` (optional: your tracked competitors for DB enrichment)

## Stopwords (Remove During Skill Parsing)

Strip these from skill extraction: add, manage, responsible, ability to, collaborate, cross functional, fast paced, innovative, dynamic, excellent, strong, passion, passionate, self starter, rockstar, synergy

## Execution Sequence

### Phase 1: Intake Extraction (internal, do not output yet)

Parse the JD and/or kickoff notes to extract:
- `role_title`: exact title from JD
- `function`: classify into functional area (Engineering, Product, Sales, Marketing, Clinical, Operations, Data/Analytics, Finance, Legal, HR/People, Medical Affairs, Commercial)
- `company`: user's company name from context/company-context.md
- `jd_text`: raw JD text (truncated to key sections if very long)
- `kickoff_notes`: verbatim kickoff notes if provided
- `must_have_outcomes`: 3-8 key outcomes from responsibilities section
- `top_skills_seed`: 5-10 core skills after stopword removal and deduplication
- `adjacent_skills_seed`: 3-7 adjacent/platform/infrastructure skills
- `time_window_days`: default 90
- `markets_or_industry`: inferred from JD context
- `geo_focus`: inferred from location requirements

If skill seeds are ambiguous, ask to confirm the top 3-5 skills before proceeding.

### Phase 2: Evidence Gathering

**Identify and query target companies:**

Based on extracted skill seeds:
1. Determine 15-20 companies likely hiring this skill cluster. Consider: industry leaders, growing startups, companies known for this function, companies in the same geo.
2. Use WebFetch to query public ATS APIs:
   - Greenhouse: `https://boards-api.greenhouse.io/v1/boards/{board_token}/jobs`
   - Lever: `https://api.lever.co/v0/postings/{company}`
   - For other ATS platforms: WebFetch their public careers page
3. For each company, extract matching roles: title, location, posting date (or days open), URL, seniority indicators.
4. Minimum evidence standard: 2 matching postings per company OR 1 posting + 1 corroborating signal (eng blog, press release, conference talk).

**Optional: Competitor registry enrichment**

If `context/competitor-registry.yaml` exists and contains companies relevant to this skill cluster, use it to supplement evidence with any pre-tracked data.

### Phase 3: SkillsMate Scoring

Score each company on a 0-100 scale using these weighted signals:

| Signal | Weight | Calculation |
|--------|--------|-------------|
| Recency | 0.30 | Half-life decay: score = e^(-0.693 * days_since_posting / 45). Average across all matching roles. |
| Volume | 0.25 | matching_roles / log(employee_count). Normalize to 0-100 scale across the set. |
| Seniority | 0.15 | Weighted average of seniority multipliers: Associate=0.5, Manager=1.0, Director=1.4, VP=1.8 |
| Co-Hiring Cluster | 0.10 | Bonus if 2+ aligned roles posted simultaneously (different titles, same skill cluster) |
| Fill Speed | 0.10 | Roles open < 30 days suggest urgency. Score inversely proportional to avg days open. |
| Evergreen Penalty | -0.05 | Apply if: role open 120+ days, identical text across locations, "always hiring" language |
| Agency Penalty | -0.05 | Apply if: staffing agency domain detected in posting source |

**Categorization thresholds:**
- **Hotbeds:** SkillsMate >= 70, has roles posted within last 45 days, volume >= 3 matching roles
- **Reservoirs:** SkillsMate 40-69, steady posting cadence, roles currently active
- **New Entrants:** First posting in this skill cluster appeared within last 60 days (new demand signal)

Target: 5 hotbeds, 5 reservoirs, 5 new entrants (best-effort; fewer is acceptable if data is thin)

### Phase 4: Generate and Display All Outputs Inline

Display all 4 sections directly in conversation with these exact headers and in this exact order:

---

#### Output 1: `### 1) Intake JSON (Pre-filled)`

Fenced json block:
```json
{
  "role_title": "string",
  "function": "string",
  "company": "string",
  "jd_text": "string (first 500 chars or key excerpt)",
  "kickoff_notes": "string",
  "must_have_outcomes": ["string"],
  "top_skills_seed": ["string"],
  "adjacent_skills_seed": ["string"],
  "time_window_days": 90,
  "markets_or_industry": ["string"],
  "geo_focus": ["string"]
}
```

#### Output 2: `### 2) SKILLSMATE_SIGNAL_PACK (JSON)`

Fenced json block:
```json
{
  "skill_focus": "string",
  "time_window_days": 90,
  "weights_version": "v1.0",
  "company_sets": {
    "hotbeds": [
      {
        "company": "string",
        "skillsmate_score": 0.0,
        "size_norm_factor": 0.0,
        "reasons": ["string"],
        "likely_titles": ["string"],
        "evidence_urls": ["string"],
        "risk_flags": ["string"]
      }
    ],
    "reservoirs": [],
    "new_entrants": []
  },
  "method_notes": "string"
}
```

#### Output 3: `### 3) SkillsMate Evidence & Scoring Annex (JSON)`

Fenced json block with per-company deep dive:
```json
{
  "annex_version": "v1.0",
  "time_window_days": 90,
  "companies": [
    {
      "company": "string",
      "score_breakdown": {
        "recency": 0.0,
        "seniority": 0.0,
        "stack_alignment": 0.0,
        "co_hiring_cluster": 0.0,
        "fill_speed": 0.0,
        "evergreen_penalty": 0.0,
        "agency_penalty": 0.0,
        "size_normalization": 0.0,
        "total": 0.0
      },
      "signals": ["YYYY-MM-DD - Title (source URL) - short relevance note"],
      "evidence": [
        {
          "type": "career_post|eng_blog|press|repo",
          "title": "string",
          "url": "string",
          "posting_date": "YYYY-MM-DD|TBD",
          "location": "string|TBD",
          "notes": "short relevance note"
        }
      ],
      "evergreen_checks": {
        "text_duplicate_hash": "hash|TBD",
        "seen_dates": ["YYYY-MM-DD"],
        "multi_location_generic": true/false,
        "agency_domain": true/false
      },
      "risk_flags": []
    }
  ],
  "method": "string"
}
```

#### Output 4: `### 4) Human Battle Card`

Five sections:

**Section 1: Executive Snapshot**
3-5 sentences: dominant skill signals, strongest company clusters, urgency signals, recommended action window.

**Section 2: Ranked Company Intelligence Table**

| Rank | Company | SkillsMate Score | Category | Matching Roles | Comp Range | Signal Summary | Approach Angle |
|------|---------|-----------|----------|----------------|------------|----------------|----------------|

**Section 3: Boolean Search Strings**

LinkedIn Recruiter Boolean (copy-paste ready, excludes interns/students/new grads).
Google X-Ray Boolean (`site:linkedin.com/in` format).

**Section 4: 3-Week Tactical Sourcing Plan**
- Week 1: Hotbeds (companies, why now, approach tactic)
- Week 2: Reservoirs (companies, why now, approach tactic)
- Week 3: New Entrants (companies, why now, approach tactic)

**Section 5: Competitive Positioning Playbook**
For top 3-5 companies: candidate pain points, your differentiators, suggested talk track.

---

## Evidence Quality Rules

### Source Priority (best to worst)
1. Company career site (direct URL from their ATS API)
2. Company engineering blog, research page, press release
3. Official ATS frameworks (Greenhouse/Lever/Workday board URLs)
4. Aggregator sites (LinkedIn Jobs, Indeed) - use only if no direct source
5. Staffing agencies - apply agency penalty

### What Counts as Evidence
- A job posting on the company's career site matching the skill cluster
- An engineering blog post describing work in the skill domain
- A press release announcing a new team, product, or initiative
- A GitHub repo or conference talk from company employees in the domain

### What Does NOT Count
- LinkedIn profiles of employees (candidate data, not company signal)
- Speculation about hiring based on product announcements alone
- Aggregator listings without a traceable company-hosted source

## What NOT to Do

- Do not invent URLs or evidence items
- Do not speculate about company hiring intent beyond what postings show
- Do not include candidate names or PII
- Do not skip the evidence annex even if evidence is thin (mark gaps honestly)

## Context Files Required

| File | Purpose |
|------|---------|
| `context/company-context.md` | Your company's positioning (for competitive playbook section) |
| `context/tone-of-voice.md` | Communication style rules |
| `context/guardrails.md` | Hard output constraints |
| `context/competitor-registry.yaml` | Optional: pre-tracked competitors for enrichment |
