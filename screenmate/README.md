# ScreenMate

**Screenshot skill for Claude Code.** Take a screenshot, type `/ss`, and Claude reads it, describes what it sees, and asks what you want to do with it.

Works great for quick reactions to Slack messages, pulling text from images, debugging UI issues, reviewing dashboards, or anything else you'd normally screenshot and describe manually.

---

## What You Get

One command that turns screenshots into actionable context:

| Command | What it does |
|---------|-------------|
| `/ss` | Grabs the most recent screenshot (default) |
| `/ss 2` | Grabs the 2 most recent screenshots |
| `/ss 5` | Grabs the 5 most recent screenshots |
| `/ss N` | Grabs the N most recent screenshots |

No need to create separate skills for different counts. One skill, one argument.

---

## Prerequisites

- Claude Code installed and working
- Mac (uses `~/Desktop/Screenshots` as the default screenshot folder)

---

## Setup (2 minutes)

### Step 1: Set your screenshot save location

Your screenshots need to land in `~/Desktop/Screenshots`. If you already save screenshots there, skip this.

Open Terminal and run:

```bash
mkdir -p ~/Desktop/Screenshots
defaults write com.apple.screencapture location ~/Desktop/Screenshots
killall SystemUIServer
```

That last command restarts the screenshot service so the new location takes effect immediately.

### Step 2: Create the Claude Code commands folder

```bash
mkdir -p ~/.claude/commands
```

### Step 3: Install the /ss skill

**Option A: Let Claude do it**

Paste this into Claude Code:

```
Install the ScreenMate skill from https://github.com/promptmates/promptmates-toolkit and set up my screenshot folder. Walk me through it.
```

**Option B: Manual**

```bash
cat > ~/.claude/commands/ss.md << 'EOF'
Find the $ARGUMENTS most recent screenshot files in ~/Desktop/Screenshots (sort by modification time). If "$ARGUMENTS" is empty or not a number, default to 1. Read each file using the Read tool so I can see them. Briefly describe what you see in each and ask how I'd like to use them.
EOF
```

### Step 4: Test it

1. Take a screenshot (`Cmd+Shift+3` for full screen, `Cmd+Shift+4` to select an area)
2. Open a Claude Code conversation
3. Type `/ss` — Claude grabs the most recent screenshot and asks what you want to do

That's it. You're done.

---

## Use Cases

- **Quick context sharing**: screenshot a Slack thread, type `/ss`, ask Claude to draft a reply
- **Data extraction**: screenshot a table or dashboard, have Claude pull the numbers into a structured format
- **UI review**: screenshot a design or page, get Claude's read on it
- **Error debugging**: screenshot an error message, let Claude diagnose
- **Meeting prep**: screenshot a calendar view or agenda, ask Claude to prep talking points

---

## How It Works

Claude Code slash commands are markdown files in `~/.claude/commands/`. The filename becomes the command name. The file contents become the prompt. `$ARGUMENTS` is a built-in variable that captures whatever you type after the command name — so `/ss 4` passes `4` as the argument.

That's the whole system. You can create any custom skill by dropping a `.md` file in that folder.

---

## Troubleshooting

**"No files found"**: Make sure your screenshots are saving to `~/Desktop/Screenshots`. Take a fresh screenshot and check that it appears there.

**Command not showing up**: Make sure the file is in `~/.claude/commands/` (note the dot before `claude`). Restart your Claude Code session.

**Wrong screenshot**: `/ss` grabs the most recent file by modification time. If something else modified a file in that folder more recently, it'll grab that instead. Take a fresh screenshot and try again.

---

## License

MIT
