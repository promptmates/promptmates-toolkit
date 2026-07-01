# TrailMate

**Your agent should leave breadcrumbs, not just outputs.**

TrailMate is a receipt system for AI agents working in Claude Code. It solves the number one problem with multi-session agent work: context death. When a conversation ends, everything in progress evaporates. Next session, you start from zero.

TrailMate fixes this with a dead-simple protocol: standardized status tokens written to a local file. Your agent leaves a trail of where it's been, what it's stuck on, and what it needs from you. Future sessions read the trail and pick up exactly where things left off.

## The Problem

You're working with your agent on something complex. You hit a wall (need an API key, need a decision, need external input). The session ends. Next time you open Claude Code:

- The agent doesn't know what was in progress
- You've forgotten the specific blocker
- Work that was 80% done restarts from 0%
- Commitments made during the session vanish

## The Fix: Receipt Tokens

Every task gets a status token. Every status change gets logged.

```
## Build analytics dashboard

- Status: BLOCKED
- Blocking Question: Need read-only API key for the metrics endpoint. Who owns that?
- Receipt History:
  - 2026-06-28 BACKLOG — added from planning session
  - 2026-06-28 CLAIMED — started schema design
  - 2026-06-28 BLOCKED — need API credentials
```

Next session, the agent reads this and immediately knows: "There's a blocked task. Has the human provided the API key?" If yes, it resumes. If no, it surfaces the question again.

## Tokens

| Token | Meaning |
|---|---|
| `BACKLOG` | Queued, not started |
| `CLAIMED` | Agent is actively working |
| `BLOCKED` | Needs external dependency |
| `HUMAN HOLD` | Needs YOUR decision |
| `DONE` | Complete, deliverable linked |
| `PARKED` | Shelved intentionally |
| `RESUMED` | Unblocked, back in progress |

## Key Design Decisions

- **File-first.** No external dependencies. Works offline. No API keys needed.
- **Append-only history.** The trail never gets rewritten. You can see the full lifecycle of every task.
- **Specific blockers.** "Need more info" is banned. Every BLOCKED or HUMAN HOLD must state exactly what's needed and from whom.
- **Kanban-compatible.** Tokens map 1:1 to board columns if you want a visual layer (Airtable, Trello, Linear, whatever).
- **Read-before-write.** Every session starts by reading the queue. Stale items surface before new work begins.

## Quick Install

1. Copy `skills/trailmate.md` to `.claude/skills/` in your workspace
2. Copy `context/queue-example.md` to your workspace as `task_queue.md`
3. Add to your CLAUDE.md: "Read `task_queue.md` at session start. Update when tasks change state."
4. Start working. The trail builds itself.

## Folder Structure

```
trailmate/
  README.md                    (this file)
  Getting Started Guide.md     (step-by-step for setup)
  skills/
    trailmate.md               (the skill file for .claude/skills/)
  context/
    queue-example.md           (starter queue file with example tasks)
    guardrails-example.md      (optional rules for queue behavior)
```

## Works With

- Any Claude Code workspace (CLI, VS Code, JetBrains)
- Any project type (doesn't care what you're building)
- Any external Kanban tool as an optional visual layer
- Multi-workspace setups (each workspace gets its own queue; cross-reference by task title)

## Philosophy

Most agent failures aren't capability problems. They're memory problems. Your agent can do the work. It just can't remember that it was doing the work, or that it got stuck, or that you answered its question yesterday in a different session.

TrailMate is the minimum viable memory for agent work-in-progress. No database. No infrastructure. Just a markdown file with a protocol your agent follows.

---

*Part of the [PromptMates](https://github.com/promptmates) skill library for Claude Code.*
