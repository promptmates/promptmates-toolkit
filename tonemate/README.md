# ToneMate

**Your AI writes like a robot because it has never read how you actually write. ToneMate fixes that.**

---

## Prerequisites

| Platform | Compatible? | Notes |
|----------|-------------|-------|
| Claude Code CLI | Yes | Requires Gmail MCP server running locally |
| Claude Desktop | Yes | Requires Gmail MCP server running locally |
| VS Code / JetBrains | No | Gmail MCP requires local server process |
| Cloud Co-Work (browser) | No | Cannot run local MCP servers in browser |

**Required:** A Gmail MCP server connected to Claude Code with search and read permissions. Common options:
- Google Workspace MCP (official, most common)
- Gmail MCP (standalone implementations)
- Any MCP server with `gmail_search_emails` and `gmail_get_email` tools (or equivalently named)

If you do not have a Gmail MCP set up yet, search "Gmail MCP server Claude Code" for installation guides. Setup typically takes 10-15 minutes and requires a Google OAuth consent screen.

---

## What You Get

A single markdown file (`tone-of-voice.md`) containing your complete writing profile:

| Section | What it captures |
|---------|-----------------|
| Audience Registers | Your distinct voices mapped by audience (team, leadership, external), with greeting/closing/formality patterns |
| Vocabulary | Words you use, words you never use, your greeting and closing inventories |
| Grammar | Active/passive, contractions, fragments, serial comma preference |
| Punctuation | Your quirks (double question marks? parenthetical asides?) |
| Sentence Structure | Average length, shortest replies, longest messages |
| Message Structure | How you format quick replies vs. formal deliverables |
| Tone and Mood | Baseline warmth, how you express enthusiasm vs. pushback |
| Communication Patterns | How you deliver bad news, delegate, make decisions |
| Idiosyncrasies | Everything that makes your writing distinctly yours |
| Quick Reference | Do's and don'ts for fast calibration |

Every example in the file is a direct quote from your actual emails. Not hypothetical. Not AI-generated. Yours.

---

## Install (15 minutes, one time)

### Step 1: Create a project folder

Create a permanent folder on your computer that will be ToneMate's home (e.g. `~/tonemate` or `~/Documents/tonemate`). This is where your tone profile and context files will live across sessions.

Then open Claude Code pointed at that folder:
- **CLI:** `claude --project ~/tonemate`
- **VS Code:** File > Open Folder > select your folder, then open Claude Code in the sidebar
- **Desktop app:** Choose your folder when asked for a working directory

Do not skip this step. If you paste the GitHub URL directly into Claude Code without creating your own folder first, it will use a temporary directory that disappears when you close the session, causing a "Folder not found" error on your next visit.

### Step 2: Download ToneMate

1. Click the green **Code** button on this GitHub page
2. Click **Download ZIP**
3. Unzip the downloaded file
4. Find the `tonemate` folder inside

### Step 3: Create the required folders

Inside your project folder (the one you created in Step 1), create:

```
your-project/
  .claude/
    skills/
  context/
```

On Mac, press Cmd+Shift+. in Finder to see hidden folders (the `.claude` folder starts with a dot).

### Step 4: Copy the skill file

From the downloaded folder, copy:
- `tonemate/skills/tonemate.md` into your project's `.claude/skills/` folder

### Step 5: Set up context

Copy `context/guardrails-example.md` to `context/guardrails.md` (modify if needed).

### Step 6: Verify Gmail MCP is working

Before running ToneMate, confirm your Gmail MCP is connected. Try a simple Gmail search in Claude Code to verify.

### Step 7: Run it

Open Claude Code in your project folder and type:

```
/tonemate
```

The output file lands at `personal_context/tone-of-voice.md` in your workspace.

---

## Usage

| What you type | What happens |
|---|---|
| `/tonemate` | Full flow: questions, email analysis, findings, file generation |
| "Analyze how I write" | Same thing |
| "Build my tone of voice" | Same thing |
| "Calibrate my voice" | Same thing |

### Tips for Best Results

- **Use your primary work email.** The account you send 80% of your messages from.
- **Let it go back 6 months.** More history = better pattern detection.
- **Be honest in the self-report.** Mismatches between what you think and what you do are the most useful findings.
- **Review the findings carefully.** If something feels wrong, say so. The file should feel like you.

### After Your First Run

- **Test it:** Ask Claude to draft an email using your tone file. Give it a real scenario. See if it sounds like you.
- **Update it:** Your writing evolves. Run ToneMate again in 6 months, or manually update the file when you notice patterns changing.
- **Use the registers:** When asking AI to write something, specify the audience. "Write this to my team" vs. "Write this to my VP" should produce noticeably different outputs.

---

## How It Works

### Step 1: Answer a few questions

ToneMate asks about your email domain, the people you write to most, and (optionally) how you think you write. Takes 2-3 minutes.

### Step 2: Watch it read your emails

Claude searches your sent messages across 5 categories (external, formal internal, casual, quick replies, long-form) and reads 15-20 real emails. You will see the MCP tool calls happening. This takes 3-5 minutes.

### Step 3: Review the findings

Claude presents a full analysis of your writing organized by 10 categories, with direct quotes from your emails. It also shows where your self-perception matches reality and where it does not.

This is the most valuable part. Most people discover something: "I didn't realize I always double-question-mark when I'm genuinely curious" or "I thought I was formal with leadership but I'm actually pretty casual."

Review it. Tell Claude what is right and what is off. It will not generate the file until you confirm.

### Step 4: Get your tone file

After confirmation, Claude generates a complete `tone-of-voice.md` and saves it to your workspace.

### Step 5: Use it

From now on, any AI tool that reads your tone file before generating content will write in your voice. Tell it who the audience is, and it picks the right register.

---

## Troubleshooting

**"Gmail MCP is not connected"**
- Check your MCP configuration. ToneMate needs a working Gmail connection with search and read permissions.
- Try running a simple Gmail search manually to verify the MCP works.

**"Not enough samples found"**
- Extend the time window (try 12 months instead of 6)
- Check that you are searching the right account (work vs. personal)
- If you primarily communicate via Slack or Teams, email may not be your best source; consider pasting writing samples manually.

**"The analysis does not sound like me"**
- This is exactly what the review phase is for. Tell Claude what is wrong and it will adjust before generating the file.
- If major patterns are missed, suggest specific emails or threads for Claude to read.

**"My tone file is too long"**
- The file is meant to be comprehensive (read by AI, not memorized by humans). Length is fine.
- If you want a shorter version for sharing, ask Claude to generate a "Quick Reference" standalone.

---

## Privacy and Security

- ToneMate only reads emails you authorize (your sent messages, within your stated time window)
- The generated tone file contains short quoted phrases demonstrating style patterns; it does not contain full emails
- No email content is stored, indexed, or sent anywhere beyond the Claude conversation
- You review everything before it is saved
- The guardrails file enforces that recipient names and sensitive content are stripped from examples

---

## License

MIT

---

*Part of the [PromptMates Toolkit](https://github.com/promptmates/promptmates-toolkit). Questions: jason@promptmates.ai*
