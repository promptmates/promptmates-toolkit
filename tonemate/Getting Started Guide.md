# Getting Started: ToneMate

This guide gets ToneMate running in your Claude Code. Two options: let Claude do it (fast) or do it yourself step by step.

---

## Before You Start

You need two things:
1. **Claude Code** installed and open in a permanent project folder. Create a folder on your computer (e.g. `~/tonemate`) and open Claude Code pointed at it. Do not use a temp directory or paste the GitHub URL directly into Claude Code, as that creates a session folder that disappears when you close it ("Folder not found" error).
2. **A Gmail MCP** connected (this gives Claude permission to search and read your sent emails)

If you do not have a Gmail MCP set up, you will need to do that first. Search "Gmail MCP Claude Code" for setup guides for your specific MCP server. Common options: Google Workspace MCP, standalone Gmail MCP servers.

---

## Option 1: Let Claude Do It (Recommended)

Paste this into Claude Code:

```
Install the ToneMate skill from https://github.com/promptmates/claude-skills and run it. My work email domain is [YOUR DOMAIN].
```

Replace `[YOUR DOMAIN]` with your actual email domain (e.g., acme.com).

Claude will:
1. Download the skill file from GitHub
2. Create the folder structure
3. Walk you through the intake questions
4. Read your sent emails
5. Present findings for your review
6. Generate your tone of voice file after you confirm

That is it. The rest of this guide is for manual setup.

---

## Option 2: Manual Install

### Part 1: Create a GitHub Account (skip if you already have one)

1. Go to https://github.com
2. Click "Sign up"
3. Enter your email, create a password, choose a username
4. Complete verification
5. Done. Bookmark https://github.com.

---

### Part 2: Download ToneMate

1. Go to https://github.com/promptmates/claude-skills
2. Click the green "Code" button
3. Click "Download ZIP"
4. Unzip the downloaded file
5. Find the `tonemate` folder inside

---

### Part 3: Create the folder structure

Inside your Claude Code project folder, create:

**On Mac (Terminal):**
```
cd ~/your-project-folder
mkdir -p .claude/skills
mkdir -p context
mkdir -p personal_context
```

**On Windows (Command Prompt):**
```
cd %USERPROFILE%\your-project-folder
mkdir .claude\skills
mkdir context
mkdir personal_context
```

**Or use Finder/File Explorer.** Note: `.claude` starts with a dot (hidden by default). Mac: Cmd+Shift+. to show hidden files. Windows: View > Hidden Items.

---

### Part 4: Copy files into place

| Copy this file | To this location |
|---|---|
| `skills/tonemate.md` | `your-project/.claude/skills/tonemate.md` |
| `context/guardrails-example.md` | `your-project/context/guardrails.md` (rename it) |

Your project should look like:
```
your-project/
  .claude/
    skills/
      tonemate.md       <-- makes /tonemate work
  context/
    guardrails.md
  personal_context/
    (empty, this is where tone-of-voice.md will be generated)
```

---

### Part 5: Verify Gmail MCP works

Before running ToneMate, verify your Gmail MCP is connected. In Claude Code, try:

```
Search my Gmail for recent sent messages
```

If Claude can search your email, you are good. If it says the tool is not available or errors out, you need to fix your Gmail MCP connection first.

---

### Part 6: Run it

In Claude Code, type:

```
/tonemate
```

Claude will ask:
1. Your email domain
2. Names of people you email often (team, leadership, external)
3. Optional self-report about your style
4. How far back to search

Then it reads 15-20 of your sent emails, analyzes patterns, and presents findings. You review and confirm before it generates the file.

---

## What Happens During a Run

| Phase | What Claude does | What you do |
|---|---|---|
| Setup | Asks 3-4 questions | Answer them (2-3 min) |
| Collection | Searches and reads 15-20 sent emails | Watch (3-5 min) |
| Analysis | Maps patterns across 10 categories | Wait (2-3 min) |
| Review | Presents findings with real quotes | Read, confirm, correct (5-10 min) |
| Generation | Writes your tone-of-voice.md file | Review final file (2-3 min) |

Total time: 15-25 minutes. Most of it is your review, not waiting.

---

## After Your First Run

### Test the output

Ask Claude to draft something using your new tone file:
```
Using my tone of voice file, draft a reply to my manager declining a meeting request tomorrow.
```

Does it sound like you? If not, update the file.

### Use the audience registers

The most powerful feature. When asking AI to write, specify who it is for:
- "Write this to my team" → casual register
- "Write this to my VP" → formal register
- "Write this to a vendor" → warm/professional register

Each register has its own greeting, closing, structure, and formality level based on your actual patterns.

### Keep it current

Your writing evolves. Run ToneMate again in 6-12 months, or manually update the file when:
- You get a new job or change roles
- You notice AI getting your voice wrong consistently
- Your audience changes (new team, new leadership)

---

## Troubleshooting

**"Claude does not recognize /tonemate"**
- File must be named exactly `tonemate.md` in `.claude/skills/`
- Launch Claude Code from your project folder (the one containing `.claude/`)

**"Gmail search returns no results"**
- Check you entered the right domain
- Try extending the time window
- Verify your Gmail MCP is connected (test with a simple search first)

**"Not enough samples"**
- Some people write mostly in Slack or Teams, not email
- Extend the window to 12 months
- Or paste 5-10 writing samples manually when Claude asks for input

**"The analysis is wrong"**
- That is what the review phase is for. Tell Claude specifically what is off.
- Suggest particular emails or threads for it to read as counterexamples.

**"I cannot see the .claude folder"**
- It is hidden (starts with a dot)
- Mac: Cmd+Shift+. in Finder
- Windows: File Explorer > View > Hidden Items

---

## Glossary

| Term | What it means |
|---|---|
| Gmail MCP | A plugin that gives Claude Code permission to search and read your Gmail |
| Audience register | A distinct voice you use with a specific audience (you probably have 2-4) |
| Tone file | The markdown file that documents your writing patterns for AI to use |
| Self-report vs. reality | The comparison between how you describe your style and how you actually write |
| Formality level | A 1-5 scale: 1 = texting a close friend, 5 = writing to the board |

---

## Questions?

- Open an issue on this GitHub repo
- Email: jason@promptmates.ai
- Community: promptmates.ai
