# CareerMate

**Stop searching by title. Start searching by what you can actually do. CareerMate expands your job search into roles you qualify for but aren't looking at.**

---

## Prerequisites

| Platform | Compatible? | Notes |
|----------|-------------|-------|
| Claude Code CLI | Yes | Full functionality (recommended) |
| Claude Desktop | Yes | Full functionality |
| VS Code / JetBrains | Yes | Full functionality |
| Cloud Co-Work (browser) | Partial | Profile expansion, title mapping, and Boolean strings work. Live board search (Phase 2) requires Bash access, so it only runs on CLI, Desktop, or IDE. |

No MCP servers required. CareerMate uses public ATS APIs (Greenhouse, Ashby, Lever) that need no authentication.

**System requirements:** Python 3.8+ and curl (both pre-installed on Mac and Linux; included in all Claude Code environments). The agent uses these to fetch live job data from career boards. If you can run Claude Code, you already have what you need.

---

## What You Get

| Output | What it does |
|--------|-------------|
| **Expanded Profile** | Shows you what the market sees: your core skills, adjacent skills, and titles you qualify for but aren't searching |
| **Live Matched Roles** | Real open positions pulled from 90 company career boards, scored and categorized |
| **Adjacency Discoveries** | Roles you are probably not searching for but should consider, with reasoning |
| **Personalized Search Plan** | Copy-paste Boolean strings for 7 ATS platforms, platform strategy, and a weekly routine |

### The Categories

| Category | Score | What it means |
|----------|-------|---------------|
| Strong Match | 75+ | You clearly qualify. Apply with confidence. |
| Stretch Match | 50-74 | You have most of what they need. Worth a shot. |
| Adjacency Discovery | 35-49 | A role you probably aren't searching for but should consider. |

---

## For Talent & Recruiting Professionals

CareerMate ships with a dedicated script for people who work in TA, People Ops, and HR Technology. If that's you, this is your shortcut.

**`scripts/find_ta_roles.py`** searches all 90 verified boards for open roles in:

| Focus Area | What it finds |
|------------|---------------|
| Recruiting | Recruiters, sourcers, recruiting managers, employer brand |
| Ops | Recruiting operations, coordinators, enablement, programs |
| Systems | People technology, HRIS, Workday, recruiting systems |
| Analytics | People analytics, workforce intelligence, people science |
| Leadership | Head of, Director, VP, Chief People/Talent roles |
| Partners | People partners, HRBPs |

**Run it right now:**

```bash
python3 scripts/find_ta_roles.py                  # Everything open in TA/People
python3 scripts/find_ta_roles.py --remote         # Remote-eligible only
python3 scripts/find_ta_roles.py --leadership     # Director+ roles only
python3 scripts/find_ta_roles.py --focus ops      # Just recruiting ops roles
python3 scripts/find_ta_roles.py --us --remote    # US-based remote roles
```

No dependencies. Runs in under 3 minutes. Outputs a grouped, badged list you can scan in 60 seconds.

In our test run, it found **174 live TA/People roles across 47 companies** in a single pass.

---

## Install (10 minutes, one time)

These instructions assume you have never used Claude Code before. Every click is spelled out. If you get stuck on any step, that is the guide's fault, not yours.

---

### Step 1: Create a folder on your computer

This folder is CareerMate's permanent home. Your preferences, search results, and history will live here. It must be a real folder that stays on your computer (not Downloads, not Desktop, not a temp folder).

**On Mac:**
1. Open Finder
2. In the menu bar, click **Go > Home** (or press Shift+Cmd+H)
3. You are now in your home folder (it has your username)
4. Right-click in the empty space and choose **New Folder**
5. Name it `careermate` (all lowercase, one word)

You now have a folder at a location like `/Users/yourname/careermate`. Remember where this is.

**On Windows:**
1. Open File Explorer
2. Navigate to your Documents folder
3. Right-click in the empty space and choose **New > Folder**
4. Name it `careermate`

---

### Step 2: Open Claude Code pointed at that folder

This is the step most people get stuck on. "Pointed at that folder" means you are telling Claude Code: "this is my workspace, save everything here."

**If you use the Claude Desktop app (most common):**
1. Open the Claude app on your computer
2. At the top of the left sidebar, click the **Code** tab (not "Home")
3. Click **+ New session**
4. A file picker will appear asking you to choose a folder
5. Navigate to the `careermate` folder you just created and select it
6. You should now see the folder name at the bottom of the chat window

If you do NOT see a file picker, look at the bottom of the chat window. There may be a folder path shown there. Click it to change it to your `careermate` folder.

**If you already have a session open with the wrong folder (or the "Folder not found" error):**
1. Close that session (click X or start a new one)
2. Click **+ New session**
3. This time, choose your `careermate` folder

**IMPORTANT:** Do NOT paste the GitHub URL into the chat. That creates a temporary folder that disappears when you close the app. That is what causes the "Folder not found" error.

**If you use VS Code:**
1. Open VS Code
2. Click **File > Open Folder**
3. Navigate to your `careermate` folder and click Open
4. Open the Claude Code panel in the sidebar (the Anthropic icon)
5. Claude Code is now pointed at your careermate folder

**If you use the CLI (terminal):**
```bash
claude --project ~/careermate
```

---

### Step 3: Download the CareerMate files from GitHub

1. Go to this GitHub page (you are probably already here)
2. Look for the green button that says **<> Code** (near the top right of the file list)
3. Click it, then click **Download ZIP**
4. Find the downloaded ZIP file (check your Downloads folder)
5. Double-click the ZIP to unzip it (on Mac this creates a folder automatically; on Windows, right-click > Extract All)
6. Open the unzipped folder. Inside you will see multiple folders (browsermate, careermate, intelmate, etc.)
7. Open the **careermate** folder. Inside you will see: `skills/`, `context/`, `scripts/`

Leave this window open. You will copy files from here in the next steps.

---

### Step 4: Create folders inside your careermate workspace

Go back to your `careermate` folder (the one you created in Step 1). You need to create some subfolders inside it.

**On Mac:**
1. Open your `careermate` folder in Finder
2. Create a new folder called `context`
3. Create a new folder called `scripts`
4. Now create the hidden folder: press **Cmd+Shift+.** (period) to show hidden files. Then create a folder called `.claude` (with a dot at the start). Inside `.claude`, create a folder called `skills`.
5. Press **Cmd+Shift+.** again to hide hidden files (optional)

**On Windows:**
1. Open your `careermate` folder in File Explorer
2. Create a new folder called `context`
3. Create a new folder called `scripts`
4. Create a new folder called `.claude` (with a dot at the start). Windows may warn you about the dot; click OK. Inside `.claude`, create a folder called `skills`.

**When you are done, your careermate folder should contain:**
```
careermate/
  .claude/
    skills/         (empty for now)
  context/          (empty for now)
  scripts/          (empty for now)
```

---

### Step 5: Copy the files into your workspace

Now copy files from the downloaded GitHub folder (Step 3) into your workspace (Step 1).

| From the downloaded folder... | Copy into... |
|------|------|
| `careermate/skills/careermate.md` | your `careermate/.claude/skills/` folder |
| `careermate/context/guardrails.md` | your `careermate/context/` folder |
| `careermate/context/target-companies.md` | your `careermate/context/` folder |
| `careermate/context/search-preferences-example.md` | your `careermate/context/` folder |
| `careermate/scripts/discover_boards.py` | your `careermate/scripts/` folder |
| `careermate/scripts/find_ta_roles.py` | your `careermate/scripts/` folder |

**How to copy on Mac:** Open both folders side by side in Finder. Drag each file from the left window to the correct folder in the right window.

**How to copy on Windows:** Open both folders side by side in File Explorer. Drag or Ctrl+C / Ctrl+V each file.

---

### Step 6: Rename the preferences file

In your `careermate/context/` folder, find the file called `search-preferences-example.md`. Rename it to `search-preferences.md` (remove the `-example` part).

**On Mac:** Click the file once to select it, press Enter, change the name, press Enter again.
**On Windows:** Click the file once, press F2, change the name, press Enter.

Leave the file empty. CareerMate will fill it in during your first conversation.

---

### Step 7: (Optional) Customize target companies

Open `context/target-companies.md` in any text editor (TextEdit on Mac, Notepad on Windows, or just double-click it). Add or remove companies based on your interests. The default list covers 90 companies across AI, tech, healthcare, fintech, and more. Instructions for adding new companies are inside the file.

---

### Step 8: Run CareerMate

1. Go back to Claude Code (it should still be open and pointed at your careermate folder from Step 2)
2. In the chat, type: `/careermate`
3. Press Enter

CareerMate will start by asking you questions about your background and preferences. Follow the prompts.

---

### Checklist: Is it working?

If you see CareerMate asking "What can you share with me to get started?" then you are set up correctly.

If you see an error or nothing happens:
- Make sure Claude Code is pointed at your careermate folder (check the folder path at the bottom of the chat window)
- Make sure the file `careermate.md` is inside `.claude/skills/` (not just inside `skills/`)
- Make sure you did NOT paste the GitHub URL into the chat as your working directory
- Try closing the session and starting a new one pointed at the correct folder

---

## Usage

| What you type | What happens |
|---|---|
| `/careermate` | Full run: intake, profile extraction, live search, scored results, search plan |
| Paste a resume + "find me roles" | Same as above, skips the "what do you have" question |
| `/careermate` (second time) | Confirms saved preferences, skips intake, goes straight to search |
| "Search wider" or "cast a wider net" | Re-runs with career pivot scope |
| "Add [company] to my target list" | Agent updates target-companies.md |
| `python3 scripts/find_ta_roles.py` | TA/People role snapshot (no agent needed, runs standalone) |
| `python3 scripts/discover_boards.py --company "Figma"` | Find board tokens for any company |

---

## How It Works

### The Problem

Job boards make you search by title. But titles are inconsistent across companies. The role you want might be called "Head of Talent Operations" at one company, "Director, People Systems" at another, and "VP Recruiting Strategy" at a third. If you only search for one title, you miss two-thirds of relevant roles.

Worse: you might qualify for roles in adjacent functions you've never searched for at all.

### The Fix

CareerMate reads your background and expands outward. It generates alternate titles based on your scope and skills, searches live career boards for all of them, and surfaces roles you would have missed.

The three phases:
1. **Intake** - What you have, what you want, how wide to search
2. **Expansion** - Your skills mapped to titles, industries, and functions you hadn't considered
3. **Live Search** - Real-time API calls to 90 company career boards across 3 platforms, scored and categorized

### What Makes It Different

- Searches by skill density, not title match
- Surfaces "adjacency discoveries" (roles you aren't looking for but qualify for)
- Every result links to a live posting (no hallucinated URLs)
- Searches Greenhouse, Ashby, AND Lever (most tools only cover one)
- Gives you copy-paste Boolean strings for 7 ATS platforms for manual follow-up
- Learns your preferences and skips intake on repeat runs
- Ships with scripts to grow your company list and find TA-specific roles

### Runtime

The live search takes 2-4 minutes. The agent searches career boards in parallel batches, but each batch is a real network request. This is not instant, and that's the tradeoff for real data instead of memorized training data.

---

## Scripts

### `discover_boards.py` - Grow Your Company List

Don't settle for 90 boards. Find more.

```bash
python3 scripts/discover_boards.py --company "Notion"        # Single company
python3 scripts/discover_boards.py --file my_targets.txt     # Batch (one per line)
python3 scripts/discover_boards.py                           # Built-in 131 companies
python3 scripts/discover_boards.py --update                  # Auto-append to target-companies.md
```

Tries multiple token patterns per company across all 3 platforms. In our test run, hit a 69% success rate (90 boards from 131 companies).

Feed it VC portfolio pages, Cloud 100 lists, or Inc 5000 companies. The more names you give it, the bigger your searchable universe becomes.

### `find_ta_roles.py` - Who's Hiring in TA Right Now?

Dedicated search for talent acquisition, recruiting operations, people systems, and adjacent roles. See the [For Talent & Recruiting Professionals](#for-talent--recruiting-professionals) section above for full usage.

---

## Customization

### Adding companies to search

Edit `context/target-companies.md` directly, or use the discovery script:

```bash
python3 scripts/discover_boards.py --company "Company Name" --update
```

### Changing scoring weights

The match scoring formula is in the skill file (`skills/careermate.md`, Phase 3). Adjust weights if you want to prioritize different signals.

### Narrowing or widening scope

On repeat runs, tell the agent: "only search remote roles" or "include startups this time" or "drop healthcare companies." It will adjust.

---

## Troubleshooting

**"Folder not found - This session's working folder no longer exists"**
- This means Claude Code was pointed at a temporary folder that got deleted between sessions.
- Fix: Create a permanent folder (e.g. `~/careermate`), copy the CareerMate files into it, and open Claude Code pointed at that folder. See Step 1 in the Install section above.
- If you previously pasted the GitHub URL into Claude Code and let it auto-create a working directory, that directory was temporary. You need to start fresh with a permanent folder.

**"Agent isn't finding many roles"**
- Check that `context/target-companies.md` includes companies in your industry
- Try widening scope: "adjacent roles" or "career pivot" instead of "same title only"
- Run `discover_boards.py` to add more companies to your list

**"Some companies return no results"**
- Board tokens change. If a company rebrands or switches ATS providers, their old token stops working.
- The agent skips 404s silently. This is by design.
- Run `discover_boards.py --company "Name"` to find the updated token.

**"Search is slow"**
- 2-4 minutes is normal. The agent is making real API calls, not pulling from memory.
- More boards = more coverage = more time. 20 boards is the minimum for useful results.

**"Agent skipped the title expansion question"**
- This is a known pattern with some models. If it happens, say: "Wait, show me the title expansion before you search."

**"find_ta_roles.py gives a Python error"**
- Requires Python 3.8+. Check with `python3 --version`.
- No external packages needed. If it runs, it works.

---

## Limitations

- Cannot search Workday or other JavaScript-rendered career sites via API
- Cannot run Google searches (blocked for automated access)
- Board tokens may go stale over time (companies rebrand, switch ATS providers)
- Results limited to companies in your target list (run `discover_boards.py` to expand)
- Does not access LinkedIn's job API (no public access exists)

The Boolean strings in your search plan compensate for these gaps. They cover 7 ATS platforms (Greenhouse, Ashby, Lever, Workday, Getro, Jobvite, Taleo) and are designed for you to run in your browser.

---

## License

MIT

---

*Part of the [PromptMates Toolkit](https://github.com/promptmates/promptmates-toolkit). Questions: jason@promptmates.ai*
