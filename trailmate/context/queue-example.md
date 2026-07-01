# Task Queue

Your agent's persistent task tracker. This file survives across sessions. Status tokens tell you and your agent exactly where everything stands.

## Tokens Reference

| Token | Meaning |
|---|---|
| BACKLOG | Queued, not started |
| CLAIMED | Agent actively working |
| BLOCKED | Needs external dependency |
| HUMAN HOLD | Needs your decision/input |
| RESUMED | Just unblocked, back in progress |
| DONE | Complete, deliverable linked |
| PARKED | Shelved intentionally |

---

## [Example: Build weekly report automation]

- **Status:** DONE
- **Workstream:** Operations
- **Source:** Session work
- **Blocking Question:** —
- **Deliverable:** deliverables/weekly-report-v1.html
- **Receipt History:**
  - 2026-06-28 BACKLOG — added from brainstorm session
  - 2026-06-28 CLAIMED — researching data sources
  - 2026-06-28 BLOCKED — need read access to analytics dashboard API
  - 2026-06-30 RESUMED — API key provided
  - 2026-06-30 DONE — deliverables/weekly-report-v1.html

## [Example: Design interview loop for senior role]

- **Status:** HUMAN HOLD
- **Workstream:** Hiring
- **Source:** Commitment from 1:1
- **Blocking Question:** Should the technical screen be a live coding exercise or a take-home? Need your call before building the scorecard.
- **Deliverable:** —
- **Receipt History:**
  - 2026-06-29 BACKLOG — committed to hiring manager
  - 2026-06-30 CLAIMED — drafted competency framework
  - 2026-06-30 HUMAN HOLD — need format decision for technical screen

## [Example: Vendor comparison for scheduling tool]

- **Status:** PARKED
- **Workstream:** Tools
- **Source:** Session work
- **Blocking Question:** —
- **Deliverable:** —
- **Receipt History:**
  - 2026-06-25 BACKLOG — added during tools audit
  - 2026-06-25 CLAIMED — started research
  - 2026-06-26 PARKED — deprioritized until Q3 budget confirmed

---

<!-- Delete the examples above and start tracking your own tasks below -->
