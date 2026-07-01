# TrailMate

**Your agent should leave breadcrumbs, not just outputs. TrailMate is persistent task tracking that survives between sessions.**

---

## Prerequisites

| Platform | Compatible? | Notes |
|----------|-------------|-------|
| Claude Code CLI | Yes | Full functionality |
| Claude Desktop | Yes | Full functionality |
| VS Code / JetBrains | Yes | Full functionality |
| Cloud Co-Work (browser) | Yes | Full functionality |

No MCP servers or local tools required. TrailMate is a markdown file and a skill file. No APIs, no database, no third-party accounts.

---

## What You Get

| Output | What it does |
|--------|-------------|
| **Status Board** | One-glance view of everything in flight: in progress, blocked, waiting on you, backlog |
| **Blocking Questions** | Surfaces exactly what's stuck and what's needed to unblock it |
| **Session Continuity** | Agent reads the trail at session start and knows exactly where things stand |
| **Commitment Tracking** | Things you told someone you'd do get tracked until done |
| **Archive** | Completed work moves to done without disappearing |

### The Tokens

Think of these as status labels. Each task gets one at a time:

| Token | Plain English |
|---|---|
| `BACKLOG` | On the list, hasn't been started |
| `CLAIMED` | Agent is working on it right now |
| `BLOCKED` | Stuck waiting on something external (an API key, another person, access) |
| `HUMAN HOLD` | Stuck waiting on YOU (a decision only you can make) |
| `DONE` | Finished. Here's what was produced. |
| `PARKED` | On hold on purpose. Not forgotten, just not now. |
| `RESUMED` | Was stuck, now unstuck. Picking back up. |

---

## Install (5 minutes, one time)

### Step 1: Download TrailMate

1. Click the green **Code** button on this GitHub page
2. Click **Download ZIP**
3. Unzip the downloaded file
4. Find the `trailmate` folder inside

### Step 2: Create the required folders

Inside your Claude Code project folder, create:

```
your-project/
  .claude/
    skills/
  context/
```

On Mac, press Cmd+Shift+. in Finder to see hidden folders (the `.claude` folder starts with a dot).

### Step 3: Copy the skill file

From the downloaded folder, copy:
- `trailmate/skills/trailmate.md` into your project's `.claude/skills/` folder

### Step 4: Set up your queue

Copy `context/queue-example.md` to your workspace root as `task_queue.md`. This is the file where tasks live.

### Step 5: Add the session instruction

Add this line to your `CLAUDE.md` (or create one if you don't have it):

```
Read `task_queue.md` at session start. Update when tasks change state. Write a receipt before session end or context compaction if anything is in progress.
```

### Step 6: Start working

The trail builds itself. Run `/trailmate` any time you want to check status or interact with the queue directly.

---

## Usage

| What you type | What happens |
|---|---|
| `/trailmate` | Shows current status board and asks what you want to do |
| "What's in flight?" | Shows all active tasks |
| "What needs me?" | Shows only items waiting on your decision |
| "What's blocked?" | Shows only items stuck on external dependencies |
| "Pick up where we left off" | Reads the queue, resumes the most important thing |
| "Park that until August" | Shelves something without losing it |
| "That API key came through" | Agent marks it RESUMED and continues |
| "Clear the done pile" | Archives completed work |

---

## How It Works

### The Problem

You're working with Claude on something that takes a while. Then the conversation ends. Maybe you closed the window. Maybe the context got too long. Maybe you got pulled into a meeting.

Next time you open Claude Code, it doesn't remember what was in progress. Work that was almost done starts over from scratch. That question it asked you three days ago is gone.

### The Fix

Every task that spans more than one conversation gets a status written to a simple file. Your agent leaves a trail. Future conversations read the trail and know exactly where things stand.

```
## Build analytics dashboard

- Status: BLOCKED
- Blocking Question: Need read-only API key for the metrics endpoint. Who owns that?
- Receipt History:
  - 2026-06-28 BACKLOG — added from planning session
  - 2026-06-28 CLAIMED — started schema design
  - 2026-06-28 BLOCKED — need API credentials
```

### When Breadcrumbs Fire

Three triggers:

1. **The work isn't going to finish this session.** Agent can tell it's complex, hitting a wall, or needs something it can't get. It writes a receipt before the conversation ends.
2. **The conversation is about to be compacted.** When a conversation gets long enough that Claude summarizes earlier messages, that's a signal to checkpoint anything in flight.
3. **You assign something that's clearly multi-session.** "Build me a proposal over the next few days" or "We need to redesign this process." These get a BACKLOG receipt immediately.

### What Does NOT Get a Breadcrumb

- Tasks that start and finish in one conversation
- Quick questions, one-off drafts, single reports
- Anything where nobody's waiting on the output and there's nothing left to do

Rule of thumb: if the conversation ends and the work is done, no breadcrumb. If the conversation ends and the work ISN'T done, that's when a breadcrumb fires.

### Visual Mapping

The tokens map directly to Kanban columns:

| Token | Column on a Board |
|---|---|
| BACKLOG | Backlog |
| CLAIMED | In Progress |
| BLOCKED | Blocked |
| HUMAN HOLD | Needs You |
| DONE | Done |
| PARKED | Parked |

Works with Airtable, Trello, Linear, Notion, or any tool with a Kanban view. The file stays as source of truth; the board is just the picture version.

### Multiple Projects

Each project gets its own queue file. Or you can run one central queue with a "Workstream" tag per task. Your call.

---

## Troubleshooting

**"Agent isn't writing breadcrumbs"**
- Make sure the CLAUDE.md instruction is present. The agent needs to be told to read and update `task_queue.md`.
- Verify `trailmate.md` is in `.claude/skills/` (the dot matters).

**"Queue is getting too long"**
- Run "Clear the done pile" to archive completed work.
- Use "Park that" for items you want to shelve without losing.

**"Agent picks up the wrong task"**
- Be specific: "Pick up the dashboard task" rather than "Pick up where we left off" when multiple items are in progress.

---

## License

MIT

---

*Part of the [PromptMates Toolkit](https://github.com/promptmates/promptmates-toolkit). Questions: jason@promptmates.ai*
