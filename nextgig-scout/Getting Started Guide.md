# Getting Started with NextGig Scout

This guide walks you through setup step by step. No coding experience required.

---

## What You Need

1. **Claude Code** installed on your computer. If you do not have it yet:
   - Visit https://docs.anthropic.com/en/docs/claude-code
   - Follow the installation instructions for your operating system (Mac, Windows, or Linux)
   - Claude Code is available as a CLI, desktop app, and IDE extension

2. **A project folder** - any folder on your computer where you want to run NextGig Scout from. This can be an empty folder you create just for this purpose.

---

## Installation (Step by Step)

### 1. Download the files

On this GitHub page:
1. Click the green **Code** button (top right area of the file list)
2. Click **Download ZIP**
3. Find the ZIP in your Downloads folder and unzip it (double-click on Mac, right-click > Extract on Windows)

You now have a folder with the NextGig Scout files inside.

### 2. Set up your project folder

Pick or create a folder for your job search. For example:
- Mac: `/Users/yourname/job-search/`
- Windows: `C:\Users\yourname\job-search\`

Inside that folder, create this structure:

```
job-search/
  .claude/
    skills/
  context/
```

**On Mac:**
- Open Terminal
- Run: `mkdir -p ~/job-search/.claude/skills ~/job-search/context`

**On Windows:**
- Open Command Prompt
- Run: `mkdir %USERPROFILE%\job-search\.claude\skills %USERPROFILE%\job-search\context`

**Or just use Finder/File Explorer** to create the folders manually. Note: `.claude` starts with a dot, which makes it hidden by default. On Mac, press Cmd+Shift+. to show hidden files. On Windows, check "Hidden items" in the View menu.

### 3. Copy files into place

From the downloaded folder:

| Copy this file | To this location |
|---|---|
| `skills/nextgig-scout.md` | `your-project/.claude/skills/nextgig-scout.md` |
| `context/guardrails-example.md` | `your-project/context/guardrails.md` (rename it) |
| `context/search-preferences-example.md` | `your-project/context/search-preferences.md` (rename it) |

### 4. Fill in your search preferences

Open `context/search-preferences.md` in any text editor (TextEdit, Notepad, VS Code, whatever you have).

Replace the example content with your actual preferences:
- Where you are located
- Whether you want remote, hybrid, or onsite
- What industries interest you
- Your compensation floor (optional)
- Any deal-breakers

This file is private to your computer. It never gets uploaded anywhere.

### 5. Verify it works

1. Open Claude Code
2. Navigate to your project folder (or open it from the desktop app)
3. Type: `/nextgig-scout`
4. Claude should respond by asking what you have (resume, LinkedIn, etc.)

If Claude does not recognize the command, double-check that `nextgig-scout.md` is in the `.claude/skills/` folder (with the dot).

---

## Your First Run

When you type `/nextgig-scout`, here is what happens:

**Step 1: Claude asks what you have**

Share whatever you have:
- Paste your resume text
- Paste a LinkedIn "About" section or experience summary
- Paste 1-2 job descriptions you are interested in
- Or just describe what you do in plain language

Any combination works. More detail = better results.

**Step 2: Claude asks what matters to you**

Answer honestly:
- Location and remote preferences
- Company type (startup vs. enterprise)
- Industry preferences
- Comp expectations (optional)
- Deal-breakers

**Step 3: Claude asks how wide to search**

Three options:
- **Same title only**: Conservative. Only finds roles matching your exact current/recent title.
- **Adjacent roles**: Moderate. Finds roles your skills qualify you for even if the title is different. This is the recommended starting point.
- **Career pivot**: Wide. Looks at functions adjacent to yours where your transferable skills apply.

**Step 4: You get results**

Claude returns:
1. Your expanded profile (skills + title expansion)
2. Matched roles with links
3. Roles you are probably missing
4. A search plan with Boolean strings

---

## After Your First Run

### Run it again with different settings

- If results were too narrow: switch from "same title" to "adjacent roles"
- If results were too broad: add more deal-breakers or narrow the industry
- If a specific adjacency discovery surprised you: ask Claude to dig deeper on that direction

### Use the Boolean strings

The search plan includes copy-paste Boolean strings for:
- LinkedIn job search bar
- Google
- Direct ATS boards (Greenhouse, Lever, Ashby, Workday)

Paste these into the respective search bars exactly as written. They are pre-built for your expanded profile.

### Set a weekly routine

The search plan includes a suggested cadence. Job searching is a grind. A routine makes it sustainable:
- Monday: Run fresh Booleans
- Wednesday: Check aggregator platforms
- Friday: Review adjacency angles

---

## FAQ

**Do I need to pay for Claude Code?**
Claude Code requires an Anthropic account. Check current pricing at anthropic.com.

**Does NextGig Scout apply to jobs for me?**
No. It finds and surfaces roles. You decide which to pursue and apply yourself.

**Is my resume data sent somewhere?**
Your data stays between you and Claude. It is not stored, indexed, or shared with employers. Claude processes it in the conversation and that is it.

**Can I use this if I am not in tech?**
Yes. NextGig Scout works for any background. The skill adjacency logic is universal. If you are a nurse, a teacher, a marketer, or an accountant, it will still map your skills to roles you are missing.

**How often should I run it?**
Weekly is a good cadence. New roles get posted constantly. Running it fresh each week catches postings from the last 7 days.

**What if I do not have a resume?**
That is fine. You can describe what you do in plain language, paste your LinkedIn summary, or share a job description you are interested in. Any starting point works.

---

## Getting Help

- Open an issue on this GitHub repo
- Email: jason@promptmates.ai
- Community: promptmates.ai
