# Getting Started with TrailMate

A step-by-step guide to set up persistent task tracking for your Claude Code agent.

## What TrailMate Does

Your agent forgets everything between sessions. TrailMate gives it a memory for work-in-progress. Instead of tasks disappearing when a conversation ends, your agent leaves breadcrumbs: standardized status tokens that tell you and future sessions exactly where things stand.

Open your queue file and instantly see: what's moving, what's stuck, what's waiting on you.

## Prerequisites

- Claude Code installed and working
- A permanent project folder on your computer (e.g. `~/my-workspace`). Open Claude Code pointed at this folder. Do not use a temp directory or paste the GitHub URL directly into Claude Code as your working directory, as it creates a session folder that disappears when you close it ("Folder not found" error).
- That's it. No APIs, no integrations, no accounts.

## Installation (5 minutes)

### Step 1: Install the skill

Copy `skills/trailmate.md` into your workspace's skill directory:

```
cp skills/trailmate.md /path/to/your/project/.claude/skills/trailmate.md
```

Or if you use a global skills folder:

```
cp skills/trailmate.md ~/.claude/skills/trailmate.md
```

### Step 2: Create your queue file

Copy the example queue file to your workspace:

```
cp context/queue-example.md /path/to/your/project/task_queue.md
```

Delete the example tasks and start fresh, or leave them as reference until you get the hang of it.

### Step 3: Set up guardrails (optional)

Copy the guardrails file if you want to customize behavior:

```
cp context/guardrails-example.md /path/to/your/project/context/guardrails.md
```

Edit the workstream tags to match your actual areas of focus.

### Step 4: Tell your agent where the queue lives

Add a line to your project's CLAUDE.md or agent instructions:

```
Read `task_queue.md` at the start of every session. Update it when tasks change state. Write a receipt before the session ends if anything is in progress.
```

That's the entire setup.

## Your First Trail

Try it out:

1. Open Claude Code and ask for something that will take multiple sessions
2. Watch for the CLAIMED receipt in your queue file
3. End the session mid-task
4. Open a new session and say "What's in flight?" or "Pick up where we left off"
5. Your agent reads the queue and knows exactly what was happening

## How to Read the Queue

```
## [Task Title]

- Status: CLAIMED          <-- where it stands right now
- Workstream: Operations   <-- category tag
- Blocking Question: —     <-- empty unless stuck
- Receipt History:         <-- full breadcrumb trail
  - 2026-06-30 CLAIMED — started initial research
```

## The Tokens at a Glance

| You see this | It means |
|---|---|
| BACKLOG | Queued up, not started yet |
| CLAIMED | Agent is working on it |
| BLOCKED | Stuck on something external |
| HUMAN HOLD | Stuck on YOU (needs your decision) |
| DONE | Finished |
| PARKED | Intentionally on hold |

## Tips

- **Check "Needs You" items first.** Those are decisions only you can make. Unblock them and your agent can resume.
- **Don't let the queue grow past 15 active items.** If it does, you have a prioritization problem, not a tracking problem.
- **PARKED is not a graveyard.** Include when you'll revisit it. "Until Q3" or "after the reorg settles" tells your future self when to look again.
- **The blocking question is everything.** A good one gets answered in one response. A bad one starts another conversation.

## Optional: Connect to a Visual Board

The tokens map directly to Kanban columns. If you want a visual view:

| Token | Column |
|---|---|
| BACKLOG | Backlog |
| CLAIMED | In Progress |
| BLOCKED | Blocked |
| HUMAN HOLD | Needs You |
| DONE | Done |
| PARKED | Parked |

Works with Airtable, Trello, Linear, Notion, GitHub Projects, or anything with a Kanban view. The local file stays as source of truth; the board is just the visual layer.

## Troubleshooting

**Agent isn't reading the queue at session start:**
Make sure your CLAUDE.md or agent instructions include the directive to read the queue file. The skill defines the behavior, but the agent needs to know where the file lives.

**Queue is getting cluttered:**
Archive DONE tasks older than 2 weeks. Move them to a `task_archive.md` if you want the history, or just delete them.

**Agent writes vague blocking questions:**
This is a prompting issue. Add to your guardrails: "Blocking questions must be answerable in one response and must name what specifically is needed."

**Tasks keep reappearing after being DONE:**
Make sure the status field is being overwritten (not just appended to history). The current status is always the single value in the Status field.
