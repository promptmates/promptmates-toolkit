# Getting Started: GitHub + SkillsMate

This guide gets SkillsMate running in your Claude Code. Two install options: let Claude do it (2 minutes) or do it yourself step by step.

---

## Before You Start

You need Claude Code installed and a project folder open. If you do not have that yet, set it up first:

1. Create a folder on your computer for your Claude Code work (e.g., "my-recruiting-workspace" on your Desktop)
2. Open Claude Code in that folder

---

## Option 1: Let Claude Do It (Recommended)

This is the fastest way. Paste the following message into Claude Code exactly as written:

```
Install the SkillsMate skill from https://github.com/promptmates/claude-skills and help me set up the context files. Walk me through it.
```

Claude will:
1. Download the skill file from GitHub
2. Create the `.claude/skills/` folder if it does not exist
3. Save the skill file in the right place
4. Ask you questions about your company to generate your context files (company positioning, communication style, output rules)
5. Save those context files in a `context/` folder

When it is done, type `/skillsmate` to test it. Paste a JD and you should get all 4 outputs.

That is it. You are done. The rest of this guide is only if you want to do it manually.

---

## Option 2: Manual Install (Step by Step)

Use this if Claude's automated install did not work, or if you prefer to set things up yourself.

---

### Part 1: Create a GitHub Account (skip if you already have one)

GitHub is where we share tools and skills. Think of it like Google Drive for technical files.

1. Go to https://github.com
2. Click "Sign up" in the top right corner
3. Enter your email address (use your personal email, not your work email)
4. Create a password
5. Choose a username (something professional, your name works fine)
6. Complete the verification puzzle
7. Click "Create account"
8. Enter the verification code from your email
9. Done. Bookmark https://github.com.

---

### Part 2: Access the PromptMates Repo

Our skills live in a public repository. No invitation needed.

**The repo:** https://github.com/promptmates/claude-skills

Bookmark this. All PromptMates shared skills live here.

---

### Part 3: Download SkillsMate

1. Go to https://github.com/promptmates/claude-skills
2. Click the green "Code" button (near the top right of the file list)
3. Click "Download ZIP"
4. Find the downloaded file in your Downloads folder ("claude-skills-main.zip")
5. Double-click to unzip (Mac does this automatically; Windows: right-click > "Extract All")
6. Open the unzipped folder. Find the "skillsmate" subfolder. That is what you need.

---

### Part 4: Create the folder structure

Inside your Claude Code project folder, create these folders:

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
2. Type these commands:
```
cd %USERPROFILE%\Documents\my-recruiting-workspace
mkdir .claude\skills
mkdir context
```

**Or manually in Finder/File Explorer:**
- Create a folder called `.claude` (with the dot) inside your project folder
- Inside `.claude`, create a folder called `skills`
- Back in your project folder, create a folder called `context`

**Mac users:** Files starting with a dot are hidden. Press Cmd+Shift+. in Finder to see them.

---

### Part 5: Copy the skill file

From the downloaded `claude-skills-main/skillsmate/` folder:
- Copy `skills/skillsmate.md` into your project's `.claude/skills/` folder

Your project should now look like:
```
my-recruiting-workspace/
  .claude/
    skills/
      skillsmate.md    <-- this makes /skillsmate work
  context/
      (empty for now)
```

---

### Part 6: Create your context files

SkillsMate needs to know about YOUR company. You need 3 files in your `context/` folder.

The download includes examples showing you the format. They are in `claude-skills-main/skillsmate/context/`.

**File 1: company-context.md**
1. Open `company-context-example.md` from the download (any text editor works)
2. Create a new file called `company-context.md` in your project's `context/` folder
3. Fill in your company's information:
   - What your company does (one paragraph)
   - Your mission
   - Why a candidate should care (3-5 real reasons)
   - Your growth stage
   - What makes you different from 2-3 competitors hiring similar talent
4. Save it

**File 2: tone-of-voice.md**
1. Open `tone-of-voice-example.md` from the download
2. Create `tone-of-voice.md` in your `context/` folder
3. Fill in:
   - Formal or casual?
   - Words/phrases you use or avoid?
   - How do you write differently for sourcers vs hiring managers vs executives?
4. Save it

**File 3: guardrails.md**
1. Open `guardrails-example.md` from the download
2. Create `guardrails.md` in your `context/` folder
3. The defaults are sensible (no invented data, no emojis, copy-paste ready Booleans). Modify if needed.
4. Save it

**Done. Your project looks like:**
```
my-recruiting-workspace/
  .claude/
    skills/
      skillsmate.md
  context/
    company-context.md
    tone-of-voice.md
    guardrails.md
```

---

### Part 7: Test It

1. Open Claude Code in your project folder
2. Type: `/skillsmate`
3. Claude asks for a JD or skill cluster
4. Paste a real JD you are working on
5. Wait about a minute (it fetches live career page data)
6. You get 4 sections: Intake JSON, Signal Pack, Evidence Annex, and Battle Card

If it works, you are done.

---

## Using SkillsMate Day to Day

| What you want | What to type |
|---|---|
| Run SkillsMate for a role you have a JD for | `/skillsmate` then paste the JD |
| Run SkillsMate for a skill without a full JD | "SkillsMate for [skill name]" (e.g., "SkillsMate for machine learning infrastructure") |
| Find where a specific talent type lives | "Where is [skill] talent concentrated?" |
| Target companies for a role you just pasted | "Who else is hiring for this?" |

---

## Troubleshooting

**"Claude does not recognize /skillsmate"**
- Make sure the file is named exactly `skillsmate.md` (not `skillsmate.md.txt` or `SkillsMate-Scout.md`)
- Make sure it is in `.claude/skills/` (with the dot on `.claude`)
- Make sure you launched Claude Code from your project folder
- On Mac: press Cmd+Shift+. in Finder to see hidden folders

**"Output says placeholder text or mentions example content"**
- Your context files still have placeholder text. Open `context/company-context.md` and replace with your real company info.

**"I cannot find the .claude folder"**
- It is hidden (the dot makes it invisible by default)
- Mac: Cmd+Shift+. in Finder to toggle hidden files
- Windows: File Explorer > View > Show > Hidden Items

**"I get an error about WebFetch or tools"**
- SkillsMate needs WebFetch to pull career page data. If Claude asks to approve WebFetch access, click Allow.

---

## Updating SkillsMate Later

When a new version is released:
1. Go to https://github.com/promptmates/claude-skills
2. Download the ZIP again (green Code button)
3. Copy the new `skillsmate/skills/skillsmate.md` into your `.claude/skills/` folder, replacing the old one
4. Your context files stay the same

Or paste this into Claude Code:
```
Update SkillsMate from https://github.com/promptmates/claude-skills
```

---

## Glossary

| Term | What it means |
|---|---|
| GitHub | A website for sharing files. Think Google Drive for technical projects. |
| Repository (repo) | A folder of files on GitHub. "claude-skills" is our repo. |
| `.claude/skills/` | The folder where Claude Code looks for skill files. The dot makes it hidden. |
| Context files | Files that tell Claude about your company so output is specific to you. |
| WebFetch | A tool Claude uses to visit websites and pull data (like career pages). |
| Boolean string | A search query using AND/OR/NOT logic for LinkedIn Recruiter. |
| SkillsMate Score | A 0-100 number showing how intensely a company is hiring a specific skill. |
