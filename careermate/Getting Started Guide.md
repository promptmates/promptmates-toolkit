# Getting Started with CareerMate

## Quick Start (under 5 minutes)

1. Create a permanent folder on your computer (e.g. `~/careermate`) and open Claude Code pointed at it
2. Copy `skills/careermate.md` to your project's `.claude/skills/` folder
3. Copy the three files from `context/` to your project's `context/` folder
4. Rename `search-preferences-example.md` to `search-preferences.md`
5. Type `/careermate` in Claude Code

That's it. The agent handles the rest.

**Important:** Step 1 is not optional. If you paste the GitHub URL directly into Claude Code without creating your own folder first, Claude will use a temporary directory that disappears when you close the session. That causes the "Folder not found" error next time you open it. Create a real folder, point Claude Code at it, then install the files there.

## What Happens on First Run

1. The agent asks what you can share (resume, LinkedIn, job descriptions, or a plain description of what you do)
2. It asks about your preferences (location, remote/hybrid, company stage, deal-breakers)
3. It asks how wide to search (same title, adjacent roles, or career pivot)
4. It shows you an expanded title list and asks you to confirm before searching
5. It searches 15-30 live career boards (takes 2-4 minutes)
6. It delivers: matched roles, adjacency discoveries, and a personalized search plan with Boolean strings

## What Happens on Repeat Runs

The agent reads your saved preferences and confirms they're still current. If nothing changed, it skips intake and goes straight to search. Your preferences file grows smarter over time.

## Tips

- **Upload a resume PDF** if you have one. It extracts more signal than a plain description.
- **Include a target JD** if you have one in mind. The agent uses it to calibrate the search direction.
- **Say "adjacent roles"** when asked about scope. This is where CareerMate's value shows: titles you qualify for but aren't searching.
- **Edit target-companies.md** to add companies you're specifically interested in. The default list is a good start but your interests are more specific.
- **Run the Boolean strings yourself** in your browser. The agent gives you copy-paste strings for LinkedIn, Google, and specific ATS sites. These reach places the agent's API calls cannot.

## Folder Structure After Install

```
your-project/
  .claude/
    skills/
      careermate.md          <- the skill (agent instructions)
  context/
    guardrails.md            <- output quality rules
    target-companies.md      <- which boards to search
    search-preferences.md    <- your preferences (populated after first run)
```
