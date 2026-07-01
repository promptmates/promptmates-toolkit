# IntelMate

**Your competitors' job postings are a public window into their strategy. IntelMate reads them systematically.**

---

## Prerequisites

| Platform | Compatible? | Notes |
|----------|-------------|-------|
| Claude Code CLI | Yes | Full functionality |
| Claude Desktop | Yes | Full functionality |
| VS Code / JetBrains | Yes | Full functionality |
| Cloud Co-Work (browser) | Yes | Full functionality |

No MCP servers or local tools required. IntelMate works with web search and fetch capabilities built into Claude Code.

---

## What You Get

| Deliverable | What it tells you |
|-------------|-------------------|
| **Full Role Inventory** | Every open role at each competitor, classified by function, level, location |
| **Compensation Benchmarking** | Their posted salary ranges vs. yours, by function and level |
| **Hiring Intensity** | Who's growing fastest (open roles as % of workforce) |
| **Strategic Signals** | New functions, tech keyword spikes, product direction clues |
| **Geographic Intelligence** | Where they're hiring, remote mix, expansion into new markets |
| **Seniority Distribution** | Building leadership (new teams) vs. scaling ICs (growing existing) |
| **Role Aging & Reposts** | Which roles are stuck (pain points, churn, or comp issues) |
| **Talent Brand Scorecard** | 0-100 score: comp transparency, remote flex, JD quality, freshness |
| **Battle Cards** | Per-competitor: strengths, weaknesses, poach targets, talk tracks |

Pick one deliverable, a few, or say "everything."

---

## Install (15 minutes, one time)

### Step 1: Download IntelMate

1. Click the green **Code** button on this GitHub page
2. Click **Download ZIP**
3. Unzip the downloaded file
4. Find the `intelmate` folder inside

### Step 2: Create the required folders

Inside your Claude Code project folder, create:

```
your-project/
  .claude/
    skills/
  context/
```

On Mac, press Cmd+Shift+. in Finder to see hidden folders (the `.claude` folder starts with a dot).

### Step 3: Copy the skill file

From the downloaded folder, copy:
- `intelmate/skills/intelmate.md` into your project's `.claude/skills/` folder

### Step 4: Create your context files

Copy `context/company-profile-example.md` to `context/company-profile.md` and fill in your company info (mission, headcount, EVP, comp ranges).

Copy `context/guardrails-example.md` to `context/guardrails.md`.

### Step 5: Run it

Open Claude Code in your project folder and type:

```
/intelmate
```

Claude will ask who your competitors are and what deliverables you want.

---

## Usage

| What you type | What happens |
|---|---|
| `/intelmate` | Full interactive flow: intake, scraping, analysis, deliverables |
| "Competitive intel on [company]" | Quick single-competitor analysis |
| "Battle card for [company]" | Generates a battle card for one competitor |
| "Talent brand comparison" | Scorecard across your competitor set |
| "What are my competitors hiring for?" | Full role inventory + strategic signals |

### Tips for Best Results

- **Fill in your company profile.** The more detail you provide (especially comp ranges and EVP), the better the battle cards and benchmarking.
- **Start with 3-5 competitors.** More is fine, but each one adds scraping time.
- **Include direct competitors AND aspirational peers.** Compare against who you compete with for talent, not just product competitors.
- **Run it quarterly.** Hiring patterns shift. What was true 6 months ago may not be today.
- **Use battle cards immediately.** Hand them to your recruiters before outreach calls.

---

## How It Works

### Collection Process

1. **Answer three questions:** Who are you (company, industry, headcount), who are your competitors (3-10 names), and what do you want (pick deliverables from the menu).
2. **IntelMate scrapes their career pages.** It hits public ATS APIs (Greenhouse, Lever, Ashby, Workday) and career pages. No login required. No authentication. Just public job postings anyone can see.
3. **Classify and enrich.** Every role gets functional classification, seniority level, location + remote flag, compensation range (if disclosed), strategic keyword tags, and days-posted + repost detection.
4. **Deliver.** Scored, compared, and presented in the format you selected.

### Scoring Methodology

**Hiring Intensity:**
```
Hiring Rate = (Open Roles / Headcount) * 100
```
A company with 50 open roles and 1,000 employees has a 5% hiring rate. Compare across your set to identify who's growing aggressively vs. holding steady.

**Talent Brand Scorecard (0-100):**

| Signal | Weight | What it measures |
|--------|--------|------------------|
| Compensation Transparency | 25% | % of postings with disclosed salary ranges |
| Remote Flexibility | 20% | % of roles offering remote or hybrid work |
| Posting Freshness | 15% | Average age of open postings (newer = better) |
| JD Quality | 15% | Description word count as proxy for effort (300-800 = good) |
| Seniority Mix | 10% | Healthy ratio of leadership to IC roles (10-25% Director+) |
| Role Diversity | 10% | Number of distinct functions hiring (broader = more investment) |
| Aging Penalty | -5% | % of roles open 90+ days (stale = bad signal) |

**Grades:**
- 75+: Strong brand (they attract; you need to outposition)
- 50-74: Average (opportunities to differentiate)
- Below 50: Weak (their people may be frustrated; recruit here)

### Functional Classification

12 areas, evaluated top-to-bottom (first match wins):

| Function | What lands here |
|----------|-----------------|
| G&A / People | HR, legal, compliance, facilities, admin |
| Regulatory / Quality | QA, QC, regulatory affairs, validation |
| Clinical Operations | Clinical trials, CRAs, biostatistics |
| Medical / Scientific Affairs | MSLs, medical directors, genetic counselors |
| Finance | Accounting, FP&A, revenue, billing |
| Lab / Manufacturing | Lab techs, sequencing, supply chain, manufacturing |
| R&D / Science | Research scientists, bioinformatics, assay development |
| Sales / Commercial | AEs, territory managers, business development |
| Marketing | Demand gen, product marketing, brand, content |
| Engineering / IT | Software, data/ML, DevOps, product management |
| Customer Success / Support | CS, patient coordinators, help desk |
| Operations / Strategy | Ops, strategy, program/project management |

### Seniority Levels

| Level | Title signals |
|-------|--------------|
| C-Suite | Chief, CEO, CFO, CTO |
| VP | Vice President, VP |
| Director | Director, Senior Director |
| Manager | Manager, Senior Manager |
| Lead / Principal | Principal, Staff, Lead, Head of |
| Senior IC | Senior, Sr. |
| Mid-Level IC | No seniority indicator |
| Associate / Junior | Associate, Junior, Entry |
| Intern | Intern, Co-op |

### Battle Cards

The most actionable deliverable. One card per competitor with:

1. **Their employer brand pitch** (inferred from JD language and career page)
2. **Their strengths** (why candidates go there)
3. **Their weaknesses** (inferred from stale roles, comp gaps, location constraints)
4. **Poachable talent pools** (teams that are scaling = overloaded, teams with stale roles = unsupported)
5. **Your differentiators** (pulled from your company profile)
6. **Talk track** (2-3 sentences for recruiters to use in outreach)

Battle cards are built from data, not opinion. Every strength and weakness traces to observable posting patterns.

### ATS Platforms Supported

| Platform | Method | Coverage |
|----------|--------|----------|
| Greenhouse | Public API (`boards-api.greenhouse.io`) | Excellent (structured data, comp fields) |
| Lever | Public API (`api.lever.co`) | Good (structured data) |
| Ashby | Career page scrape | Good (structured, newer companies) |
| Workday | Career page scrape | Moderate (requires JS rendering patterns) |
| Jobvite | Career page scrape | Moderate |
| Custom career pages | WebFetch + parsing | Variable |

If a company uses an unsupported or gated ATS, IntelMate will report which competitors could not be accessed rather than silently excluding them.

### What IntelMate Does NOT Do

- Access private or authenticated career portals
- Scrape LinkedIn profiles or reference individual employees
- Use Glassdoor, Indeed, or other aggregator salary estimates
- Speculate beyond what postings support (inferences are labeled)
- Guarantee completeness (some companies post on platforms that cannot be scraped)

---

## Troubleshooting

**"Could not access [company] career page"**
- Their ATS may not have a public API. IntelMate will note this and suggest alternatives.
- Some companies gate their careers page behind a CAPTCHA or require login. These cannot be scraped.

**"Very few roles found for [company]"**
- They may post primarily on LinkedIn or aggregators rather than their own career page.
- They may be a small company with genuinely few open roles.
- The ATS slug may be wrong. Try alternate company name formats.

**"No compensation data found"**
- Many companies do not disclose salary ranges in postings. This is noted in the Talent Brand Scorecard (lower transparency score).
- If you are in a state/country with pay transparency laws, check whether the company has a separate portal for those jurisdictions.

**"Scraping took a long time"**
- IntelMate respects rate limits. 8-10 competitors with 50+ roles each can take 5-10 minutes.
- Workday sites are slowest (requires JS rendering patterns).

---

## License

MIT

---

*Part of the [PromptMates Toolkit](https://github.com/promptmates/promptmates-toolkit). Questions: jason@promptmates.ai*
