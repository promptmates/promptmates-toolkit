[Getting Started Guide - PromptMates GitHub.md](https://github.com/user-attachments/files/27541611/Getting.Started.Guide.-.PromptMates.GitHub.md)
# Getting Started: GitHub + SDI Scout

This guide walks you through everything from creating a GitHub account to getting SDI Scout running in Claude Code. No prior experience required.

---

## Part 1: Create a GitHub Account

GitHub is where we share tools, skills, and code within the PromptMates community. Think of it like Google Drive but built for sharing technical files.

1. Go to https://github.com
2. Click "Sign up" in the top right corner
3. Enter your email address (use your personal email, not your work email)
4. Create a password
5. Choose a username (this is public, so pick something professional - your name works fine, e.g., "janesmith-recruiting" or "jsmith42")
6. Complete the verification puzzle
7. Click "Create account"
8. GitHub will send a verification code to your email. Enter it.
9. You now have a GitHub account.

**Tip:** Bookmark https://github.com. You will come back here.

---

## Part 2: Get Access to the PromptMates GitHub

Our shared skills live in a public repository, so you do not need a special invitation. Anyone with the link can access it.

**The repo lives here:** https://github.com/promptmates/claude-skills

Bookmark this link. This is where all PromptMates shared skills will live going forward.

---

## Part 3: Download SDI Scout

1. Go to https://github.com/promptmates/claude-skills
2. Click the green "Code" button (near the top right of the file list)
3. Click "Download ZIP"
4. Find the downloaded file in your Downloads folder (it will be called "claude-skills-main.zip")
5. Double-click it to unzip it (on Mac this creates a folder automatically; on Windows, right-click and choose "Extract All")
6. You now have a folder called "claude-skills-main"
7. Inside it, find the "sdi-scout" folder. That is what you need.

---

## Part 4: Set Up Your Claude Code Project

If you do not already have a Claude Code project folder set up, do this first:

1. Create a folder on your computer where your Claude Code work will live. For example:
   - Mac: Create a folder on your Desktop called "my-recruiting-workspace"
   - Windows: Create a folder in Documents called "my-recruiting-workspace"

2. Open Claude Code and point it to that folder:
   - In the Claude Code terminal, type: `cd ~/Desktop/my-recruiting-workspace` (Mac) or `cd ~/Documents/my-recruiting-workspace` (Windows)
   - Or if using VS Code: File > Open Folder > select your workspace folder

---

## Part 5: Install SDI Scout

You are going to copy files from the downloaded folder into your Claude Code project. Here is exactly what goes where.

### Step 1: Create the folder structure

Inside your project folder, create these folders:

**On Mac:**
1. Open Terminal (search "Terminal" in Spotlight)
2. Type these commands one at a time, pressing Enter after each:
```
cd ~/Desktop/my-recruiting-workspace
mkdir -p .claude/skills
mkdir -p context
```

**On Windows:**
1. Open Command Prompt (search "cmd" in Start menu)
2. Type these commands one at a time, pressing Enter after each:
```
cd %USERPROFILE%\Documents\my-recruiting-workspace
mkdir .claude\skills
mkdir context
```

**Or do it manually in Finder/File Explorer:**
- Create a folder called `.claude` (with the dot) inside your project folder
- Inside `.claude`, create a folder called `skills`
- Back in your project folder, create a folder called `context`

**Mac users:** Files and folders starting with a dot are hidden by default. Press Cmd+Shift+. (period) in Finder to show them.

### Step 2: Copy the skill file

From the downloaded `claude-skills-main/sdi-scout/` folder:
- Find the file at `skills/sdi-scout.md`
- Copy it into your project's `.claude/skills/` folder

After this step, your project should look like:
```
my-recruiting-workspace/
  .claude/
    skills/
      sdi-scout.md    <-- this file makes the /sdi-scout command work
  context/
      (empty for now)
```

### Step 3: Create your company context files

SDI Scout needs to know about YOUR company to write the competitive positioning section. You need to create 3 files in your `context/` folder.

The download includes example files showing you exactly what to write. They are in the `claude-skills-main/sdi-scout/context/` folder.

**File 1: company-context.md**
1. Open `company-context-example.md` from the downloaded `sdi-scout/context/` folder (use any text editor: TextEdit, Notepad, VS Code, etc.)
2. Read through it. It has placeholder text showing what information goes in each section.
3. Create a new file called `company-context.md` in your project's `context/` folder
4. Fill in YOUR company's information following the same structure. Specifically:
   - What your company does (one paragraph)
   - Your mission
   - Why a candidate should care about working there (3-5 real reasons)
   - Your growth stage
   - What makes you different from 2-3 competitors who hire similar talent
5. Save it

**File 2: tone-of-voice.md**
1. Open `tone-of-voice-example.md` from the downloaded `sdi-scout/context/` folder
2. Create a new file called `tone-of-voice.md` in your project's `context/` folder
3. Fill in how YOU communicate:
   - Are you formal or casual in writing?
   - Any words or phrases you always use or always avoid?
   - How long should bullets be?
   - How do you talk differently to sourcers vs hiring managers vs executives?
4. Save it

**File 3: guardrails.md**
1. Open `guardrails-example.md` from the downloaded `sdi-scout/context/` folder
2. Create a new file called `guardrails.md` in your project's `context/` folder
3. You can probably use this one almost as-is. The defaults are sensible:
   - No invented data
   - No emojis
   - Active voice
   - Boolean strings must be copy-paste ready
4. Modify anything that does not match your preferences, then save

**After this step, your project looks like:**
```
my-recruiting-workspace/
  .claude/
    skills/
      sdi-scout.md
  context/
    company-context.md
    tone-of-voice.md
    guardrails.md
```

---

## Part 6: Test It

1. Open Claude Code in your project folder
2. Type: `/sdi-scout`
3. Claude should respond asking for a job description or skill cluster
4. Paste in any JD (one you are currently working on is perfect)
5. Wait for the output (it takes a minute since it is fetching real career page data)
6. You should get 4 sections back: Intake JSON, Signal Pack, Evidence Annex, and a Battle Card

**If it works:** You are done. Use it whenever you are kicking off a new search and want to know where the talent lives.

---

## Quick Reference: How to Use SDI Scout Day to Day

| What you want | What to type |
|---|---|
| Run SDI for a role you have a JD for | `/sdi-scout` then paste the JD |
| Run SDI for a skill without a full JD | "SDI scout for [skill name]" (e.g., "SDI scout for machine learning infrastructure") |
| Find where a specific talent type lives | "Where is [skill] talent concentrated?" |
| Target companies for a role you just pasted | "Who else is hiring for this?" |

---

## Troubleshooting

**"Claude does not recognize /sdi-scout"**
- Make sure the file is named exactly `sdi-scout.md` (not `sdi-scout.md.txt` or `SDI-Scout.md`)
- Make sure it is in `.claude/skills/` (with the dot on `.claude`)
- Make sure you launched Claude Code from your project folder
- On Mac: press Cmd+Shift+. in Finder to see hidden folders (the `.claude` folder is hidden)

**"Output says placeholder text or mentions example content"**
- You are still using the example files. Open your `context/company-context.md` and make sure you replaced all the placeholder text with your real company info.

**"I cannot find the .claude folder"**
- It is a hidden folder (the dot at the start makes it hidden on Mac and Windows)
- Mac: In Finder, press Cmd+Shift+. to toggle hidden files
- Windows: In File Explorer, click View > Show > Hidden Items

**"I get an error about WebFetch or tools"**
- SDI Scout needs the WebFetch tool to pull career page data. Make sure your Claude Code permissions allow WebFetch. If Claude asks you to approve WebFetch access, click Allow.

---

## Updating SDI Scout Later

When a new version is released:
1. Go back to https://github.com/promptmates/claude-skills
2. Download the ZIP again (same green Code button)
3. Copy the new `sdi-scout/skills/sdi-scout.md` into your `.claude/skills/` folder, replacing the old one
4. Your context files stay the same (you do not need to redo those)

---

## Glossary

| Term | What it means |
|---|---|
| GitHub | A website for sharing files and code. Think Google Drive for technical projects. |
| Repository (repo) | A folder of files on GitHub. "claude-skills" is our repo. |
| Clone / Download | Getting files from GitHub onto your computer. We use Download ZIP (the simple way). |
| `.claude/skills/` | The folder where Claude Code looks for skill files. The dot makes it hidden. |
| Context files | Files that tell Claude about your company so the output is specific to you. |
| WebFetch | A tool Claude uses to visit websites and pull data (like career pages). |
| Boolean string | A search query using AND/OR/NOT logic that you paste into LinkedIn Recruiter. |
| SDI Score | A 0-100 number showing how intensely a company is hiring a specific skill. |
