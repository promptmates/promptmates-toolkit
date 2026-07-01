# SkillsMate

**Paste a job description. Get back the companies hiring that same talent, ranked by intensity, with Boolean strings and a tactical sourcing plan.**

---

## Prerequisites

| Platform | Compatible? | Notes |
|----------|-------------|-------|
| Claude Code CLI | Yes | Full functionality |
| Claude Desktop | Yes | Full functionality |
| VS Code / JetBrains | Yes | Full functionality |
| Cloud Co-Work (browser) | Yes | Full functionality |

No MCP servers or local tools required. SkillsMate works with web search capabilities built into Claude Code.

---

## What You Get

When you run `/skillsmate` and paste a JD, you get 4 deliverables:

| Deliverable | What it contains |
|-------------|-----------------|
| **Intake JSON** | The role broken down into its core skills, outcomes, and target market |
| **Signal Pack** | Companies ranked by a 0-100 skills density score, grouped into Hotbeds (go here first), Reservoirs (steady targets), and New Entrants (emerging demand) |
| **Evidence Annex** | The receipts. Every company score is backed by real job postings with URLs |
| **Battle Card** | The tactical doc you hand to a sourcer: Boolean strings, a 3-week plan, and talking points for why candidates should leave each target company |

---

## Install (15 minutes, one time)

### Step 1: Download SkillsMate

You are on GitHub right now (https://github.com/promptmates/promptmates-toolkit). Here is how to download:

1. Click the green **Code** button near the top of this page
2. Click **Download ZIP**
3. Find the downloaded ZIP file (probably in your Downloads folder) and unzip it
4. You now have a folder called `promptmates-toolkit-main`. Inside it, find the `skillsmate` subfolder.

### Step 2: Find your Claude Code project folder

You need to know where your Claude Code project lives on your computer. This is the folder you opened in Claude Code (the one shown in the terminal or sidebar).

If you are not sure, type this in Claude Code:
```
Where is my project folder?
```
Claude will tell you the path (something like `/Users/yourname/my-project` on Mac or `C:\Users\yourname\my-project` on Windows).

### Step 3: Create the required folders

Inside your project folder, you need two folders. If they do not already exist, create them:

**On Mac (Finder):**
1. Open your project folder in Finder
2. Press Cmd+Shift+. to show hidden files
3. Create a new folder called `.claude` (note the dot at the start)
4. Inside `.claude`, create a folder called `skills`
5. Back in your project folder, create a folder called `context`

**On Windows (File Explorer):**
1. Open your project folder in File Explorer
2. Create a new folder called `.claude`
3. Inside `.claude`, create a folder called `skills`
4. Back in your project folder, create a folder called `context`

Your project should now look like this:
```
your-project/
  .claude/
    skills/
      (empty for now)
  context/
      (empty for now)
```

### Step 4: Copy the skill file

From the downloaded `promptmates-toolkit-main` folder:
- Copy `skillsmate/skills/skillsmate.md` into your project's `.claude/skills/` folder

### Step 5: Create your context files

SkillsMate needs to know about YOUR company to produce useful output. You need to create 3 short files in your `context/` folder. Examples are included in the download to show you the format.

**Required files:**

| File to create | What to put in it | Example included |
|---|---|---|
| `context/company-context.md` | Your company's mission, what you do, why candidates should care, what makes you different from competitors | `context/company-context-example.md` |
| `context/tone-of-voice.md` | How you write (casual vs formal, words to avoid, formatting preferences) | `context/tone-of-voice-example.md` |
| `context/guardrails.md` | Rules the output must follow (no invented data, no emojis, etc.) | `context/guardrails-example.md` |

**How to create them:**
1. Open the example file (e.g., `company-context-example.md`) in any text editor (TextEdit on Mac, Notepad on Windows, or VS Code if you have it)
2. Save a copy as the real filename (e.g., `company-context.md`) in your `context/` folder
3. Replace the placeholder text with your actual company information
4. Repeat for all three files

**Optional file:**

| File | What it does |
|---|---|
| `context/competitor-registry.yaml` | A list of companies you want SkillsMate to check first. Speeds up results for your known competitors. See `context/competitor-registry-template.yaml` for the format. |

You can skip this one. SkillsMate works fine without it.

### Step 6: Verify it works

Open Claude Code in your project folder and type:
```
/skillsmate
```

Claude should ask you for a JD or skill cluster. Paste one in, and you should get all 4 outputs.

---

## Usage

| What you type | What happens |
|---|---|
| `/skillsmate` | Claude asks for a JD, then produces all 4 outputs |
| "SkillsMate for [role name]" | Same thing, specifying the role upfront |
| "Where is [skill] talent concentrated?" | Runs SkillsMate for a skill cluster without a full JD |
| "Who else is hiring for this?" (after pasting a JD) | Runs SkillsMate using the JD you just pasted |

---

## How It Works

### Scoring Methodology

Each company gets a score from 0-100 based on real hiring signals:

| Signal | What it means |
|--------|--------------|
| **Recency** (30%) | Companies that posted matching roles in the last few weeks score higher than those with stale postings |
| **Volume** (25%) | More matching roles = stronger signal (adjusted for company size so a 200-person startup with 5 matching roles scores higher than Google with 5) |
| **Seniority** (15%) | Director and VP-level roles indicate strategic investment, not just backfill |
| **Co-Hiring Cluster** (10%) | Posting multiple related roles at once suggests a new team or initiative |
| **Fill Speed** (10%) | Recently posted roles (< 30 days) suggest active urgency |
| **Evergreen Penalty** (-5%) | Roles that have been open 120+ days or appear to be perpetual postings get downranked |
| **Agency Penalty** (-5%) | Roles posted through staffing agencies get downranked |

**Categories:**
- **Hotbeds** (score 70+): Go here first. They are actively building teams in this skill area right now.
- **Reservoirs** (score 40-69): Steady demand. Good for relationship building and pipeline.
- **New Entrants** (score below 40, recently started posting): Just entering this space. Candidates there may not know they are about to get recruited heavily.

### What is in the Battle Card

The Battle Card is the part you actually hand to your sourcing team:

1. **Executive Snapshot** - 3 sentences on where this talent lives and what is happening right now
2. **Company Table** - All 15 target companies ranked with scores, matching roles, comp ranges, and approach angles
3. **Boolean Strings** - Copy-paste ready searches for LinkedIn Recruiter and Google X-Ray
4. **3-Week Plan** - Week 1 hit the hotbeds, Week 2 work the reservoirs, Week 3 explore new entrants
5. **Competitive Playbook** - For each top company: why their people might leave, what you offer that they do not, and a talk track

---

## Troubleshooting

**"Claude does not recognize /skillsmate"**
- Make sure `skillsmate.md` is in `.claude/skills/` (not `claude/skills/`, the dot matters)
- Make sure you are running Claude Code from your project folder (the one containing `.claude/`)

**"Output mentions placeholder text or example content"**
- You are still using the example context files. Open `context/company-context.md` and replace the placeholder text with your real company information.

**"Evidence URLs are missing or marked TBD"**
- This happens when a company's career site does not have a public API. The score is still valid based on available data. SkillsMate marks gaps honestly rather than inventing links.

**"I only got 8 companies instead of 15"**
- Normal. SkillsMate targets 15 but only includes companies with real evidence. Fewer results with real data is better than 15 results with padding.

---

## License

MIT

---

*Part of the [PromptMates Toolkit](https://github.com/promptmates/promptmates-toolkit). Questions: jason@promptmates.ai*
