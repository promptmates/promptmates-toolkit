---
name: trailmate
description: Agent receipt system for persistent task tracking across sessions. Leaves breadcrumbs so nothing evaporates when a conversation ends. Tracks what's in progress, what's blocked, and what needs your input.
user-invocable: true
---

# TrailMate (Agent Breadcrumb System)

A receipt system for AI agents. Every task gets a status token that persists across sessions. Your agent leaves breadcrumbs instead of letting work disappear when a conversation ends. One glance tells you what's moving, what's stuck, and what's waiting on you.

## When to Use

Trigger when user says:
- "/trailmate"
- "What's in flight?"
- "What are you working on?"
- "What's blocked?"
- "What do you need from me?"
- "Status update"
- "Queue check"
- "Pick up where we left off"
- "What dropped?"

Also triggers automatically:
- At the start of a new session (read the queue, surface stale items)
- When you hit a wall and can't finish something (write a receipt before the session ends)
- When a multi-session task is assigned

## Core Concept

Most agent work dies between sessions. You ask for something complex, the agent makes progress, hits a blocker, and the session ends. Next time you open a chat, that context is gone. You have to re-explain, re-orient, re-request.

TrailMate fixes this with standardized receipt tokens. Every task gets a status. Every status change gets logged. The queue persists in a local file that survives across any number of sessions.

## Receipt Tokens

| Token | Meaning | What Happens Next |
|---|---|---|
| `BACKLOG` | Queued, not started | Agent picks it up when capacity frees |
| `CLAIMED` | Agent is actively working on it | In progress this session |
| `BLOCKED` | Needs something the agent can't get | Waiting on external dependency, API access, third party |
| `HUMAN HOLD` | Needs YOUR input specifically | A decision, approval, or creative direction only you can provide |
| `RESUMED` | Picked back up after being unblocked | Transition token, logged then immediately becomes CLAIMED |
| `DONE` | Finished, deliverable exists | Links to output artifact |
| `PARKED` | Intentionally shelved, not dead | Revisit later, not forgotten |

## Setup

Before first use:
1. Copy `context/queue-example.md` to your workspace as `task_queue.md` (location of your choice)
2. Copy `context/guardrails-example.md` for output constraints (optional)
3. Tell your agent where the queue file lives

No external tools, APIs, or integrations required. This runs entirely on local files.

## Execution Sequence

### Phase 0: Queue Check (Every Session Start)

At the beginning of every session, read the queue file and report:

```
Queue Status:
- In Progress: [count] tasks
- Blocked: [count] tasks (list blocking questions)
- Needs You: [count] tasks (list what's waiting on human input)
- Backlog: [count] tasks

[If any BLOCKED items might now be unresolved based on new context, flag them]
[If any HUMAN HOLD items have answers available, flag them]
```

Keep it tight. If the queue is empty or everything is DONE/PARKED, say so in one line and move on.

### Phase 1: Receipt Writing (During Work)

When working on a task:

**Starting work:**
```
[date] CLAIMED — [one-line description of what you're doing]
```

**Hitting a wall:**
```
[date] BLOCKED — [specific question or dependency needed]
```
or
```
[date] HUMAN HOLD — [specific decision or input needed from the human]
```

The blocking question must be SPECIFIC. Not "need more info." Instead: "Need the API key for the staging environment" or "Should this report go to the whole team or just the director?"

**Finishing:**
```
[date] DONE — [link to deliverable or description of output]
```

**Shelving intentionally:**
```
[date] PARKED — [reason for shelving and conditions for revisiting]
```

### Phase 2: Queue File Update

After every receipt event, update the queue file. The file is append-only for the receipt history, but the status field gets overwritten to current state.

### Phase 3: Stale Detection

Flag tasks that look stuck:
- CLAIMED for more than 48 hours without a new receipt = possibly stalled
- BLOCKED for more than 7 days = may need escalation or a different approach
- HUMAN HOLD with no response for 3+ days = resurface the question

## Queue File Format

Each task is a markdown section:

```markdown
## [Task Title]

- **Status:** CLAIMED
- **Workstream:** [category tag]
- **Source:** [how this entered the queue: voice memo, session work, commitment, etc.]
- **Blocking Question:** [only populated when BLOCKED or HUMAN HOLD]
- **Deliverable:** [link or path when DONE]
- **Receipt History:**
  - 2026-06-30 BACKLOG — added from session
  - 2026-06-30 CLAIMED — starting research phase
  - 2026-07-01 BLOCKED — need API credentials for staging env
  - 2026-07-03 RESUMED — credentials provided
  - 2026-07-03 DONE — report at deliverables/analysis.html
```

## Optional Integrations

TrailMate is file-first by design. But if you want a visual board, the tokens map directly to Kanban columns:

| Token | Board Column |
|---|---|
| BACKLOG | Backlog |
| CLAIMED | In Progress |
| BLOCKED | Blocked |
| HUMAN HOLD | Needs You |
| DONE | Done |
| PARKED | Parked (hidden by default) |

RESUMED is a transition event, not a column. Card moves from Blocked/Needs You back to In Progress with a note saying what unblocked it.

Compatible with: Airtable, Trello, Linear, Notion databases, GitHub Projects, or any Kanban tool with an API. The local file remains source of truth; the board is the visual layer.

## Rules

1. **One task per receipt.** Don't batch. Each task gets its own section and its own trail.
2. **Never let work evaporate.** If the session is ending and something is incomplete, write a BLOCKED or HUMAN HOLD receipt BEFORE the session closes. Future sessions can pick it up.
3. **Blocking questions must be specific.** Vague blockers ("need more info") are useless to your future self or a different agent. State exactly what's needed and from whom.
4. **RESUMED always follows an unblock.** When a BLOCKED or HUMAN HOLD item gets its answer, write RESUMED with what unblocked it, then continue work.
5. **PARKED is not abandoned.** Include the condition for revisiting. "Parked until Q3 budget is approved" is good. "Parked" alone is not.
6. **Source of truth is local.** If you sync to an external board, the file wins on conflict. Never lose state because a third-party tool went down.
7. **Read before write.** Every session, read the queue before starting new work. Stale items surface first.

## Output Format

When reporting queue status, use this structure:

```
TRAIL STATUS

In Progress (2):
  - Build onboarding automation [CLAIMED 2d ago]
  - Draft Q3 hiring plan [CLAIMED today]

Blocked (1):
  - Integrate analytics API [BLOCKED 3d: "Need read-only API key from DevOps"]

Needs You (1):
  - Finalize team structure [HUMAN HOLD 1d: "Should we split the team into pods or keep it flat?"]

Backlog (3):
  - Write post-mortem template
  - Audit notification rules
  - Research vendor options for scheduling tool

Parked (1):
  - Migration to new CRM [until vendor confirms Q3 pricing]
```

## Anti-Patterns

- Writing DONE without linking to the deliverable (where's the proof?)
- Using BLOCKED when you mean HUMAN HOLD (they route differently)
- Letting the queue grow past 15-20 active items without pruning (you have a prioritization problem, not a tracking problem)
- Treating BACKLOG as a someday/maybe list (that's a separate file; backlog means "will be worked soon")
- Skipping RESUMED and going straight to DONE (breaks the audit trail)
