# Snap Cup

**Give people their flowers. Your agent finds good work nobody's talking about and helps you say something specific, credible, and human.**

---

## The Problem

Someone on your team (or in your community) shipped something great last week. You didn't notice. Or you noticed but didn't say anything because you weren't sure how to articulate what was impressive about it. Especially if it was technical and you're not.

Meanwhile that person has no idea anyone saw what they did.

## The Fix

Snap Cup scans your connected sources (GitHub, GitLab, Slack, Discord, Teams), finds work worth recognizing, and drafts a short message you can send as a DM. One specific, credible sentence that tells someone: I saw what you did and I know why it matters.

Straight from the mind of Elle Woods. A snap cup is where you drop compliments about people. This is the agent-powered version.

## The Bridge

Here's the real power: Snap Cup helps non-technical people speak credibly about technical work.

A recruiter who says "great job on that PR" gets a polite nod. A recruiter who says "your retry logic with exponential backoff solved my timeout cascade" gets a double-take and genuine respect. You don't need to understand the code. The agent reads the work, identifies what's actually impressive, and helps you name it correctly.

This is how you earn trust across the technical divide: by noticing what matters and saying it out loud.

---

## Prerequisites

| Platform | Compatible? | Notes |
|----------|-------------|-------|
| Claude Code CLI | Yes | Full functionality (Scan + Draft modes) |
| Claude Desktop | Yes | Draft Mode fully works; Scan Mode works with MCP servers connected |
| VS Code / JetBrains | Yes | Full functionality |
| Cloud Co-Work (browser) | Yes | Full functionality |

**For Scan Mode** (agent discovers good work): Connect at least one source via MCP. GitHub, GitLab, Slack, or Discord MCP servers let the agent search autonomously.

**For Draft Mode** (you bring the signal): No integrations needed. Works with just the skill file. Paste a link, describe what you saw, and the agent drafts the message.

---

## What You Get

| Feature | What it does |
|---------|-------------|
| **Discovery** | Agent scans connected sources for work worth recognizing |
| **Technical Translation** | Reads code/PRs/commits and extracts specific impressive details in plain language |
| **Depth Levels** | Three tiers: Informed Observer, Peer, Deep Technical. Picks the right one for you. |
| **Cooldown Tracking** | Logs who you've recognized, ensures love spreads wide (30-day cooldown per person) |
| **Draft Mode** | You saw something on LinkedIn/Reddit/anywhere. Agent helps you articulate why it was good. |
| **Pass-it-forward** | Optional closer encouraging the recipient to do the same |

### Technical Depth Levels

The agent picks the right level based on who's sending:

| Level | Who It's For | Example |
|-------|-------------|---------|
| **Informed Observer** | Non-technical person recognizing technical work | "Your retry logic with backoff means our API calls won't hammer the server when it's already struggling." |
| **Peer** | Same-field recognition | "The exponential backoff with jitter is a good call. Most implementations skip the jitter and end up with thundering herd problems." |
| **Deep Technical** | Engineer to engineer | "Decorrelated jitter on the retry instead of full jitter. Good tradeoff for bursty traffic. The half-open probe is a nice touch." |

You can ask for a specific level ("make it more technical" or "keep it simple") or let the agent pick.

---

## Two Modes

### Scan Mode: Agent Discovers

The agent searches your connected sources for good work from the last 7 days. It surfaces 2-4 candidates, you pick who to message, it drafts something specific.

Works with: GitHub, GitLab, Slack, Discord, Teams (anything with API/MCP access).

### Draft Mode: You Bring the Signal

You saw something worth acknowledging. Maybe on LinkedIn, at a conference, in a repo you were browsing, or in a Reddit thread. You tell the agent what you saw, and it helps you draft something credible.

Trigger: "snap cup [name] for [thing]" or "I saw [name] do [thing], help me acknowledge it"

Works with: Anything. No integrations needed.

---

## Install (5 minutes, one time)

### Step 1: Create a project folder

Create a permanent folder on your computer for your workspace, or use an existing one. Open Claude Code pointed at it.

### Step 2: Download Snap Cup

1. Click the green **Code** button on this GitHub page
2. Click **Download ZIP**
3. Unzip and find the `snap-cup` folder

### Step 3: Create the required folders

Inside your project folder:

```
your-project/
  .claude/
    skills/
  context/
```

On Mac, press Cmd+Shift+. in Finder to see hidden folders.

### Step 4: Copy the files

- Copy `snap-cup/skills/snap-cup.md` into your project's `.claude/skills/` folder
- Copy `snap-cup/context/snap-cup-log.md` into your project's `context/` folder

### Step 5: Start giving flowers

Run `/snap-cup` to scan, or say "snap cup [name] for [thing]" to draft.

---

## Usage

| What you type | What happens |
|---|---|
| `/snap-cup` | Scans connected sources, surfaces candidates |
| `/snap-cup github` | Scans a specific source |
| "snap cup Priya for her auth flow diagram" | Draft Mode: helps you articulate why it was good |
| "who's doing good work?" | Same as `/snap-cup` |
| "make it more technical" | Adjusts the draft up a depth level |
| "keep it simple, I'm not an engineer" | Adjusts the draft to Level 1 |
| "pass it forward version" | Adds the pay-it-forward closer |

---

## How It Works

### The Discovery Loop

1. Agent scans your connected source (GitHub PRs, Slack messages, GitLab MRs, etc.)
2. Filters for work that's specific, helpful, or technically interesting
3. Cross-checks against the cooldown log (no repeats within 30 days)
4. Presents 2-4 candidates with a one-line summary of what they did
5. You pick who to message (or say "none of these, try [other source]")
6. Agent reads the actual work (the PR, the commit, the message) and drafts something specific
7. You approve, edit, or ask for a different tone/level
8. Send (via connected platform) or copy/paste

### The Specificity Engine

Every draft must contain at least one detail that proves you actually looked at the work. The agent reads the technical artifact (PR diff, commit message, Slack thread) and extracts the one thing that's genuinely impressive. Not "you contributed" but "your circuit breaker with the sliding window threshold."

This is what makes the message land. The recipient reads it and thinks "they actually saw what I did" instead of "they saw that I did something."

### The Cooldown

A log file tracks who you've recognized and when. After 30 days, someone becomes eligible again. This prevents the natural human tendency to keep praising the same visible people while quieter contributors go unnoticed.

---

## What Counts as Good Work

- Someone shipped a tool, plugin, template, or automation
- Someone answered a question thoroughly and helped someone else
- Someone shared knowledge proactively
- Someone solved a problem that was blocking others
- Someone did quiet maintenance work nobody thanks them for
- Someone's first contribution to a project or community
- Someone helped a newcomer get oriented
- Someone made a technically sound decision that prevented future problems
- Someone wrote something that demonstrates real thinking (not just volume)

## What Does NOT Count

- Routine activity (attending meetings, basic replies)
- Self-promotion
- Things that already got plenty of recognition
- Anyone in the 30-day cooldown window

---

## Why This Matters

Recognition is asymmetric. The cost of sending a 2-sentence DM is near zero. The impact of receiving one from someone outside your immediate circle is disproportionately high. People remember.

For non-technical people in technical environments, this is a trust accelerator. When a recruiter, PM, or ops person can name the specific technical thing someone did, it signals: I'm paying attention. I understand what matters here. That builds bridges that no amount of "great teamwork" ever will.

The pay-it-forward angle means this compounds. One message becomes two. Two becomes a culture where noticing is normal.

---

## Troubleshooting

**"Agent isn't finding anything"**
- Make sure you have at least one source connected (GitHub/GitLab MCP, Slack MCP, etc.)
- Try a wider time window: "scan the last 2 weeks"
- Try a different source: "try the Discord server instead"

**"The messages sound too corporate"**
- Say "more casual" or "write it like a text message"
- The agent should never use: kudos, props, hats off, keep up the great work, just wanted to say

**"I want to recognize something but I'm not sure what was impressive about it"**
- Use Draft Mode: "snap cup [name] for [thing], but I'm not sure what specifically was impressive about it"
- The agent will read the source material and tell you what's technically interesting before drafting

**"The cooldown is too long/short"**
- Edit the number in `context/snap-cup-log.md` header. Default is 30 days.

---

## License

MIT

---

*Part of the [PromptMates Toolkit](https://github.com/promptmates/promptmates-toolkit). Questions: jason@promptmates.ai*
