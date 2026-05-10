# CareerMate

**Your job search is too narrow.** You are searching for titles you have held, at companies you have heard of, on platforms you already know. CareerMate expands your search by mapping the skills you have to roles you have not considered.

Paste your resume into Claude Code, answer a few questions, and CareerMate will:
1. Map your core skills AND adjacent skills you may not realize you have
2. Expand your title to 5-10 alternate titles that match your actual scope
3. Search public ATS boards live for matching roles
4. Surface "adjacency discoveries" - roles you are probably not searching for but should be
5. Generate copy-paste Boolean strings and a weekly search routine

---

## How It Works

CareerMate inverts the logic of a corporate sourcing tool. Instead of "here's a role, find candidates," it asks "here's a candidate, find roles."

The key insight: most job seekers search too narrowly. If your title is "Recruiting Manager," you are probably only searching for that exact phrase. But your actual skills (program management, stakeholder communication, data analysis, vendor management, process design) qualify you for roles with titles you have never searched for.

CareerMate identifies those gaps and fills them.

---

## What You Get

| Output | What it does |
|--------|-------------|
| **Expanded Profile** | Shows you what the market sees: your core skills, adjacent skills, and the full list of titles your experience maps to |
| **Matched Roles** | Live job postings from public ATS boards, scored and ranked by fit. Grouped into Strong Matches, Stretch Matches, and Adjacency Discoveries |
| **Roles You Are Probably Missing** | The highest-value section. Titles, industries, and company types you should be searching but are not |
| **Personalized Search Plan** | Custom Boolean strings for every major platform, a weekly routine, and guidance on how to approach each match type |

---

## Setup (15 minutes, one time)

### Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed and working
- A project folder open in Claude Code

### Step 1: Download CareerMate

1. Click the green **Code** button on this GitHub page
2. Click **Download ZIP**
3. Unzip the downloaded file
4. Find the `careermate` folder inside

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
- `skills/careermate.md` → into your project's `.claude/skills/` folder

### Step 4: Create your context file

Copy `context/search-preferences-example.md` to `context/search-preferences.md` and fill in your actual preferences (location, remote/hybrid, comp floor, deal-breakers).

Copy `context/guardrails-example.md` to `context/guardrails.md`. The defaults are sensible; modify only if you want different output rules.

### Step 5: Run it

Open Claude Code in your project folder and type:

```
/careermate
```

Claude will ask what you have (resume, LinkedIn, target JDs) and what matters to you, then run the search.

---

## Usage

| What you type | What happens |
|---|---|
| `/careermate` | Full interactive flow: intake questions, profile expansion, live search, results |
| "Find roles for me" | Same thing |
| "What jobs match my background?" | Same thing |
| "What else should I be searching for?" | Focuses on adjacency discoveries |

### Tips for Best Results

- **Paste your full resume** rather than a summary. More detail = better skill extraction.
- **Include 1-2 target JDs** if you have them. This helps calibrate what "good match" means to you.
- **Be honest about preferences** in intake. Saying "open to anything" when you actually need remote work wastes your time reviewing irrelevant results.
- **Run it again** after adjusting search width. Start with "adjacent roles," and if results are thin, try "career pivot."

---

## How Scoring Works

Each role gets a score from 0-100:

| Signal | Weight | What it means |
|--------|--------|--------------|
| **Skill Overlap** (35%) | How many of the role's required skills appear in your profile |
| **Adjacency Bonus** (20%) | Extra credit for roles matching your expanded titles or adjacent skills |
| **Preference Alignment** (20%) | Match on location, remote/hybrid, company stage, industry |
| **Recency** (15%) | Recently posted roles score higher. Stale postings get downranked. |
| **Seniority Fit** (10%) | Alignment between role level and your experience level |

**Categories:**
- **Strong Match** (75+): You clearly qualify. Apply with confidence.
- **Stretch Match** (50-74): You have most of what they need. Worth applying.
- **Adjacency Discovery** (35-49): Roles you are not searching for but should consider. These are the ones that change your search.

---

## Where It Searches

CareerMate queries public ATS APIs and job boards:

| Source | What it covers |
|--------|---------------|
| Greenhouse boards | Thousands of companies (startups to enterprise) |
| Lever postings | Mid-market and growth companies |
| Ashby boards | Modern tech companies |
| Workday sites | Large enterprises |
| Consider.com | VC-backed portfolio companies (a16z, Lightspeed, Sequoia, etc.) |
| Wellfound | Early-stage startups, advisory roles, fractional work |
| Climatebase | Climate and sustainability companies |
| Getro | Network-powered job boards |
| Jobvite | Mid-market companies |

---

## Boolean Strings

CareerMate generates Boolean search strings customized to your expanded profile. These are copy-paste ready for:

- LinkedIn job search
- Google (site:linkedin.com/jobs)
- Direct ATS board searches (Greenhouse, Lever, Ashby, Workday, Getro, Jobvite)

The strings use your expanded title list and adjacent skills, not just your current title. This is where most of the "hidden roles" come from.

---

## A Few Things Worth Remembering

- **Finding a new role is hard.** Hard does not mean bad. There will be good days, tough days, and disappointing days. None of those reflect your value.
- **It only takes one.** You are not looking for a pile of offers. You are looking for one good match.
- **You are not your job.** A job is something you do to support the life you want.
- **AI is a tool, not a magic wand.** CareerMate expands your search. You still need to apply, network, and show up. But now you are searching smarter.
- **The process can feel lonely. If you are reading this, you are not alone.**

---

## Troubleshooting

**"Claude does not recognize /careermate"**
- Make sure `careermate.md` is in `.claude/skills/` (the dot matters)
- Make sure you are running Claude Code from your project folder

**"I got very few results"**
- Your search criteria may be too narrow. Try broadening location or switching to "adjacent roles" or "career pivot" mode.
- Some ATS boards may be temporarily unavailable. Try again later.

**"Some links are broken"**
- Job postings get filled and taken down. If a link is dead, the role was likely filled. That is actually a good signal: it means the company is actively hiring in that space.

**"The expanded titles do not feel right"**
- CareerMate asks you to confirm titles before searching. Remove any that feel off and add any it missed. Your judgment matters here.

---

## Contributing

PRs welcome. If you find a new ATS board pattern, a better scoring signal, or a bug, open an issue or submit a fix.

---

## License

MIT. Use it, modify it, share it. If it helps you land a role, that is all that matters.

---

Built by [PromptMates](https://promptmates.ai). Questions: jason@promptmates.ai
