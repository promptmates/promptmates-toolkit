# TrailMate

**Your agent should leave breadcrumbs, not just outputs.**

## The Problem

You're working with Claude on something that takes a while. Maybe you're building a process, drafting a multi-part proposal, or iterating on a project over several days. Then the conversation ends. Maybe you closed the window. Maybe the context got too long and things got summarized. Maybe you just got pulled into a meeting.

Next time you open Claude Code:

- It doesn't remember what was in progress
- You've forgotten the specific thing that stalled it
- Work that was almost done starts over from scratch
- That question it asked you three days ago? Gone.

## The Fix

TrailMate is a breadcrumb system. Every task that spans more than one conversation gets a status written to a simple file. Your agent leaves a trail. Future conversations read the trail and know exactly where things stand.

```
## Build analytics dashboard

- Status: BLOCKED
- Blocking Question: Need read-only API key for the metrics endpoint. Who owns that?
- Receipt History:
  - 2026-06-28 BACKLOG — added from planning session
  - 2026-06-28 CLAIMED — started schema design
  - 2026-06-28 BLOCKED — need API credentials
```

Next session, the agent reads this and immediately knows: "There's a blocked task. Has the answer come in?" If yes, it picks up where it left off. If no, it surfaces the question again.

## The Tokens

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

## What It Looks Like In Practice

**Start of your day:**
> "What's in flight?"

```
TRAIL STATUS

In Progress (2):
  - Build onboarding automation [CLAIMED 1d ago]
  - Draft Q3 proposal [CLAIMED today]

Blocked (1):
  - Dashboard integration [BLOCKED 3d: "Need API key from DevOps"]

Needs You (2):
  - Interview loop design [HUMAN HOLD 1d: "Live coding or take-home?"]
  - Vendor comparison [HUMAN HOLD 2d: "What's the budget ceiling?"]

Backlog (3):
  - Write post-mortem template
  - Update notification rules
  - Research scheduling tools
```

**Answering a question it's waiting on:**
> "The interview should be a take-home. 4 hours max, real-world problem."

Agent writes RESUMED, picks up immediately, and finishes the scorecard.

**Checking what's stuck:**
> "What's blocked on other people?"

Shows you just the things waiting on external dependencies, with how long they've been stuck.

**Quick things you can say:**
- "What needs me?" (shows only items waiting on your decision)
- "What's blocked?" (shows only items stuck on external stuff)
- "Pick up where we left off" (reads the queue, resumes the most important thing)
- "Park that until August" (shelves something without losing it)
- "That API key came through" (agent marks it RESUMED and continues)
- "Clear the done pile" (archives completed work)

## FAQ

### Does every single thing I do need a breadcrumb?

No. Most of what you do with Claude finishes in one conversation. A quick email draft, a one-off question, pulling a report. Those don't need tracking because there's nothing left to do when the conversation ends.

A task gets a breadcrumb when:
- It's going to take more than one session to finish
- The agent hits a wall it can't get past on its own
- You made a commitment to someone else ("I told Sarah I'd send that Friday")
- The deliverable needs input from another person or system
- You said "we need to do X" but didn't start it yet

A task does NOT get a breadcrumb when:
- It started and finished in one conversation
- Nobody's waiting on the output
- There's nothing left to do

Rule of thumb: if the conversation ends and the work is done, no breadcrumb. If the conversation ends and the work ISN'T done, that's when a breadcrumb fires.

### When exactly does the agent write a breadcrumb?

Three triggers:

1. **The work isn't going to finish this session.** Agent can tell it's complex, hitting a wall, or needs something it can't get. It writes a receipt before the conversation ends.

2. **The conversation is about to be compacted.** When a conversation gets long enough that Claude summarizes earlier messages to keep going, that's a signal: there's almost certainly work in progress worth checkpointing. Before compaction happens, the agent writes a receipt for anything in flight.

3. **You assign something that's clearly multi-session.** "Build me a proposal over the next few days" or "We need to redesign this process." These get a BACKLOG receipt immediately.

### What if the agent isn't sure whether something needs a breadcrumb?

If it's been working on something for more than 15 minutes and it clearly won't wrap up this session, it writes one. Better to have a breadcrumb you didn't need than to lose work you can't get back.

### What about things I ask for verbally or in a voice memo?

If you drop tasks into your agent through voice (via a chat space, voice transcription, or Siri), those become BACKLOG items the next time the agent checks in. The "Source" field tracks how something entered the queue so you can trace back.

### Can I see this visually?

Yes. The tokens map directly to Kanban columns:

| Token | Column on a Board |
|---|---|
| BACKLOG | Backlog |
| CLAIMED | In Progress |
| BLOCKED | Blocked |
| HUMAN HOLD | Needs You |
| DONE | Done |
| PARKED | Parked |

Works with Airtable, Trello, Linear, Notion, or any tool with a Kanban view. The file stays as source of truth; the board is just the picture version.

### Does this require any technical setup?

No APIs. No database. No third-party accounts. It's a markdown file and a skill file. Five-minute setup. If you want to add a visual board later, you can, but it works perfectly fine as just a file.

### What if I'm working across multiple projects?

Each project gets its own queue file. Or you can run one central queue with a "Workstream" tag per task. Your call.

## Quick Install

1. Copy `skills/trailmate.md` to `.claude/skills/` in your workspace
2. Copy `context/queue-example.md` to your workspace as `task_queue.md`
3. Add to your CLAUDE.md: "Read `task_queue.md` at session start. Update when tasks change state. Write a receipt before session end or context compaction if anything is in progress."
4. Start working. The trail builds itself.

## Folder Structure

```
trailmate/
  README.md                    (this file)
  Getting Started Guide.md     (step-by-step setup)
  skills/
    trailmate.md               (the skill file for .claude/skills/)
  context/
    queue-example.md           (starter queue with example tasks)
    guardrails-example.md      (optional rules for queue behavior)
```

## Philosophy

Most agent failures aren't capability problems. Your agent can do the work. It just can't remember that it was doing the work, or that it got stuck, or that you answered its question yesterday in a different session.

TrailMate is the minimum viable memory for work-in-progress. No infrastructure. Just a file with a protocol your agent follows. The breadcrumbs do the rest.

---

*Part of the [PromptMates](https://github.com/promptmates) toolkit for Claude Code.*
