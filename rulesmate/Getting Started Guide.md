# Getting Started: RulesMate

This guide gets RulesMate running in your Claude Code project. Takes about 5 minutes.

---

## Before You Start

You need Claude Code installed and open in a permanent project folder. If you don't have one yet, create a folder on your computer (e.g. `~/my-workspace`) and open Claude Code pointed at it. Do not paste the GitHub URL directly into Claude Code as your working directory, as it creates a temp folder that disappears between sessions ("Folder not found" error).

---

## Option 1: Let Claude Do It (Recommended)

Paste the following into Claude Code:

```
Install the RulesMate rules from https://github.com/promptmates/claude-skills into my .claude/rules/ folder. Walk me through it.
```

Claude will:
1. Download the rules file from GitHub
2. Create the `.claude/rules/` folder if it doesn't exist
3. Save `rulesmate-ta-guidelines.md` in the right place

Type any recruiting-related request to test it. You should notice Claude asking clarifying questions instead of assuming, citing evidence instead of guessing, and staying scoped to what you asked for.

That's it. You're done. The rest of this guide is only if you want to do it manually.

---

## Option 2: Manual Install

### Step 1: Download from GitHub

1. Go to https://github.com/promptmates/claude-skills
2. Click the green **Code** button
3. Click **Download ZIP**
4. Unzip the downloaded file
5. Find the `rulesmate/rules/` folder inside

### Step 2: Copy the rules file

Copy `rulesmate-ta-guidelines.md` into your project's `.claude/rules/` folder.

If that folder doesn't exist, create it:

**On Mac (Terminal):**
```
mkdir -p .claude/rules
```

**On Windows (Command Prompt):**
```
mkdir .claude\rules
```

Your project should now look like:
```
your-project/
  .claude/
    rules/
      rulesmate-ta-guidelines.md
```

### Step 3: Verify

Open Claude Code in your project folder and try something like:
- "Summarize this candidate's background" (it should only state what's in the resume, nothing inferred)
- "Edit this JD" (it should ask which section, not rewrite the whole thing)
- "Where should we source for this role?" (it should ask about your data before recommending channels)

---

## Alternative: Append to CLAUDE.md

If you prefer everything in one file, open your `CLAUDE.md` and paste the contents of `rulesmate-ta-guidelines.md` at the bottom. Don't replace what's already there.

---

## Works With

| Tool | Where to put the file |
|------|----------------------|
| Claude Code | `.claude/rules/rulesmate-ta-guidelines.md` |
| Cursor | `.cursor/rules/rulesmate-ta-guidelines.mdc` (add `alwaysApply: true` frontmatter) |
| Other LLMs | Paste contents into system prompt |

---

## Questions?

If something isn't working, the most common issue is the file being in the wrong location. Make sure:
- The `.claude` folder has a dot at the start
- The `rules` folder is inside `.claude`
- You're running Claude Code from the project folder that contains `.claude/`

For anything else, open an issue on the repo or ask in the PromptMates community.
