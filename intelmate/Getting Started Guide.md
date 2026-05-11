# Getting Started: IntelMate

This guide gets IntelMate running in your Claude Code. Two options: let Claude do it (fast) or do it yourself step by step.

---

## Before You Start

You need:
1. **Claude Code** installed with a project folder open
2. A list of 3-10 competitors you want to track (company names; career page URLs are helpful but optional)

No special MCP or API keys required. IntelMate uses WebFetch to hit public career page APIs.

---

## Option 1: Let Claude Do It (Recommended)

Paste this into Claude Code:

```
Install the IntelMate skill from https://github.com/promptmates/claude-skills and help me set up my company profile. My company is [YOUR COMPANY] and my competitors are [COMPETITOR 1, COMPETITOR 2, COMPETITOR 3].
```

Claude will:
1. Download the skill file from GitHub
2. Create the folder structure
3. Ask questions about your company to build your profile
4. Save everything in the right place
5. Run the first analysis

---

## Option 2: Manual Install

### Part 1: Download IntelMate

1. Go to https://github.com/promptmates/claude-skills
2. Click the green "Code" button
3. Click "Download ZIP"
4. Unzip the file
5. Find the `intelmate` folder inside

---

### Part 2: Create the folder structure

Inside your Claude Code project folder:

**On Mac:**
```
cd ~/your-project-folder
mkdir -p .claude/skills
mkdir -p context
```

**On Windows:**
```
cd %USERPROFILE%\your-project-folder
mkdir .claude\skills
mkdir context
```

---

### Part 3: Copy files into place

| Copy this file | To this location |
|---|---|
| `skills/intelmate.md` | `your-project/.claude/skills/intelmate.md` |
| `context/guardrails-example.md` | `your-project/context/guardrails.md` (rename it) |
| `context/company-profile-example.md` | `your-project/context/company-profile.md` (rename it) |

---

### Part 4: Fill in your company profile

Open `context/company-profile.md` and replace the example content with your actual company info:

**Required (minimum viable):**
- Company name
- Industry
- Approximate headcount
- Number of open roles (if known)

**Recommended (makes output much better):**
- Your comp ranges for common roles
- Your EVP (why candidates should join you)
- Your office locations and remote policy
- Functions you hire for most

**Optional (improves battle cards):**
- Known competitor advantages (why candidates sometimes pick them over you)

---

### Part 5: Run it

In Claude Code:
```
/intelmate
```

IntelMate will ask:
1. Confirm your company info (from the profile)
2. Who are your competitors? (list 3-10)
3. What do you want? (pick deliverables)

Then it scrapes, classifies, scores, and delivers.

---

## Your First Run

### What to expect

| Phase | What happens | Time |
|---|---|---|
| Intake | You answer 3 questions | 2-3 min |
| Scraping | IntelMate fetches all open roles from competitor career pages | 3-10 min (depends on competitor count) |
| Classification | Every role gets function, level, location, comp, tags | 1-2 min |
| Analysis | Scoring, comparison, pattern detection | 1-2 min |
| Delivery | Your selected deliverables displayed | Instant |

Total: 10-15 minutes for a full run with 5 competitors.

### Recommended first run

For your first time, pick 3-5 competitors and select:
- **Hiring Intensity** (quick pulse on who's growing)
- **Talent Brand Scorecard** (where you stand)
- **Battle Cards** (immediate tactical value for recruiters)

You can always run it again with more competitors or different deliverables.

---

## After Your First Run

### Hand battle cards to recruiters

The battle cards are designed to be copy-pasted directly to sourcing team members. Each one gives them:
- Why a candidate at that company might be open to a conversation
- What to say about your company that specifically counters that competitor
- Which teams to target

### Run it again quarterly

Hiring patterns shift. Run IntelMate every 60-90 days to catch:
- New competitors entering your talent market
- Strategic pivots (sudden function spikes)
- Comp adjustments (transparency changes or range shifts)
- Geographic expansion you need to respond to

### Expand your competitor list over time

Start with 3-5 direct competitors. As you learn the landscape, add:
- Companies that compete for the same talent (even if different product)
- Aspirational peers (companies your candidates mention in interviews)
- Fast-growing startups that just entered your space

---

## Deliverables Menu (Reference)

| # | Deliverable | Best for |
|---|---|---|
| 1 | Full Role Inventory | Understanding the complete hiring landscape |
| 2 | Compensation Benchmarking | Pay decisions, offer calibration |
| 3 | Hiring Intensity | Identifying aggressive growers vs. steady state |
| 4 | Strategic Signals | Understanding where the industry is headed |
| 5 | Geographic Intelligence | Office strategy, remote policy decisions |
| 6 | Seniority Distribution | Understanding org-building patterns |
| 7 | Role Aging & Reposts | Finding pain points and poach opportunities |
| 8 | Talent Brand Scorecard | Benchmarking your employer brand |
| 9 | Battle Cards | Recruiter enablement, outreach strategy |
| 10 | Everything | Executive briefing with full analysis |

---

## Troubleshooting

**"Claude does not recognize /intelmate"**
- File must be named exactly `intelmate.md` in `.claude/skills/`
- Launch Claude Code from your project folder

**"Career page not found for [company]"**
- Try providing the direct URL to their careers page
- Some companies use obscure ATS slugs. Common patterns: company name lowercase, with or without hyphens.
- If they use a gated portal, IntelMate will note it as inaccessible.

**"Scraping is taking forever"**
- IntelMate respects rate limits (2-5 second delays between requests)
- More competitors = more time. Start with 3-5.
- Workday sites are slowest.

**"Battle cards feel generic"**
- Fill in more of your company profile, especially the EVP and known competitor advantages sections.
- The more you tell IntelMate about yourself, the sharper the comparisons.

---

## Glossary

| Term | What it means |
|---|---|
| ATS | Applicant Tracking System (Greenhouse, Lever, Workday, etc.) |
| Hiring intensity | Open roles as a percentage of company headcount |
| Talent brand scorecard | A 0-100 score measuring how attractive a company looks to candidates based on their postings |
| Battle card | A one-page tactical brief for recruiting against a specific competitor |
| Functional classification | Sorting roles into 12 standard business functions (Engineering, Sales, R&D, etc.) |
| Seniority inference | Determining the level of a role from its title (Director, Senior, IC, etc.) |
| Role aging | How long a posting has been open (signal of difficulty filling) |
| Repost | The same role appearing multiple times (signal of churn or inability to close) |
| Strategic signals | Patterns in hiring that suggest company direction (new functions, tech investment, expansion) |

---

## Questions?

- Open an issue on this GitHub repo
- Email: jason@promptmates.ai
- Community: promptmates.ai
