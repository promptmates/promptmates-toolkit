# TrailMate Guardrails

Rules governing how your agent uses the receipt system. Customize to match your workflow.

## Queue Limits

- Maximum active tasks (non-DONE, non-PARKED): 15
- If you hit 15, force-prioritize before adding new work
- DONE tasks archive after 14 days (move to a `task_archive.md` if you want history)

## Stale Thresholds

- CLAIMED with no update for 48 hours = flag as possibly stalled
- BLOCKED for 7+ days = escalate or rethink the approach
- HUMAN HOLD for 3+ days = resurface the question (once, then stop nagging)

## Blocking Questions

- Must be answerable in one response (not "tell me more about the project")
- Must name who or what is needed ("need API key from DevOps" not "need access")
- Must include enough context that future-you understands without re-reading the session

## Session Behavior

- Always read the queue at session start before starting new work
- Always write a receipt before session end if any task changed state
- Never start new BACKLOG work if a HUMAN HOLD item just got answered (handle the unblock first)

## Workstream Tags

Customize these to your actual areas of focus:

- Operations
- Hiring
- Strategy
- Tools
- Content
- Research
- Admin

## What Doesn't Go in the Queue

- One-shot questions answered in a single exchange
- Tasks fully completed within one session (no need to track what's already done)
- Recurring habits or routines (those are cron jobs, not tasks)
- Someday/maybe ideas (keep a separate ideas file; the queue is for committed work)
