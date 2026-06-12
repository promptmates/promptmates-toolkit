# Getting Started: ScreenMate

This guide gets ScreenMate running on your Mac. Takes about 2 minutes.

---

## Before You Start

You need:
- Claude Code installed and working
- A Mac (this uses macOS screenshot tools)

---

## Option 1: Let Claude Do It (Recommended)

Paste the following into Claude Code:

```
Install the ScreenMate skill from https://github.com/promptmates/promptmates-toolkit and set up my screenshot folder. Walk me through it.
```

Claude will:
1. Create `~/Desktop/Screenshots` if it doesn't exist
2. Set macOS to save screenshots there
3. Create `~/.claude/commands/ss.md`
4. Test that it works

That's it. You're done. The rest of this guide is only if you want to do it manually.

---

## Option 2: Manual Install

### Part 1: Set up your screenshot folder

Open Terminal (search "Terminal" in Spotlight) and paste these three lines:

```bash
mkdir -p ~/Desktop/Screenshots
defaults write com.apple.screencapture location ~/Desktop/Screenshots
killall SystemUIServer
```

What this does:
- Creates a Screenshots folder on your Desktop
- Tells macOS to save all screenshots there
- Restarts the screenshot service so the change takes effect

### Part 2: Install the skill

Still in Terminal, paste:

```bash
mkdir -p ~/.claude/commands
```

Then:

```bash
cat > ~/.claude/commands/ss.md << 'EOF'
Find the $ARGUMENTS most recent screenshot files in ~/Desktop/Screenshots (sort by modification time). If "$ARGUMENTS" is empty or not a number, default to 1. Read each file using the Read tool so I can see them. Briefly describe what you see in each and ask how I'd like to use them.
EOF
```

### Part 3: Test it

1. Take a screenshot: press `Cmd+Shift+3` (full screen) or `Cmd+Shift+4` (select area)
2. Open Claude Code
3. Type `/ss`
4. Claude should read your screenshot and describe what it sees

If it works, you're all set.

---

## Usage

| You type | What happens |
|----------|-------------|
| `/ss` | Claude reads the most recent screenshot |
| `/ss 3` | Claude reads the 3 most recent screenshots |
| `/ss N` | Claude reads N most recent screenshots |

---

## Common Issues

**"Command not found" or `/ss` doesn't appear:**
- Check that `~/.claude/commands/ss.md` exists (note the dot before `claude`)
- Restart your Claude Code session

**"No screenshots found":**
- Take a fresh screenshot and make sure it appears in `~/Desktop/Screenshots`
- If screenshots are going somewhere else, run the setup commands from Part 1 again

**Claude reads the wrong file:**
- `/ss` picks by most recent modification time. Take a fresh screenshot and try again.

---

## Uninstall

To remove ScreenMate:

```bash
rm ~/.claude/commands/ss.md
```

To also undo the screenshot folder change:

```bash
defaults delete com.apple.screencapture location
killall SystemUIServer
```

Screenshots will go back to the default location (your Desktop).
