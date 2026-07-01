# RulesMate

**Behavioral guardrails for AI assistants used in talent acquisition. Drop these rules in and your AI stops hallucinating candidate details and giving unsupported recommendations.**

---

## Prerequisites

| Platform | Compatible? | Notes |
|----------|-------------|-------|
| Claude Code CLI | Yes | Install in `.claude/rules/` |
| Claude Desktop | Yes | Install in `.claude/rules/` |
| VS Code / JetBrains | Yes | Install in `.claude/rules/` |
| Cloud Co-Work (browser) | Yes | Install in `.claude/rules/` |
| Cursor | Yes | Save as `.cursor/rules/rulesmate-ta-guidelines.mdc` with `alwaysApply: true` in frontmatter |
| Any LLM | Yes | Paste into system prompt or project instructions |

No MCP servers, local tools, or dependencies required.

Inspired by the [Karpathy Guidelines](https://github.com/multica-ai/andrej-karpathy-skills) (131k stars for four universal coding principles). RulesMate takes the same structural idea and clamps it to recruiting-specific failure modes.

---

## What You Get

Five principles that prevent the most common AI mistakes in TA workflows:

| Principle | What it prevents |
|-----------|-----------------|
| **Candidate Truth Over Convenience** | Never invent, infer, or embellish candidate data |
| **Audience-Aware Output** | Know who reads it and what decision it supports |
| **Surgical Scope** | Only touch what was requested |
| **Process-Aware Execution** | Respect TA's sequential dependencies |
| **Evidence-Based Recommendations** | Cite the data or call it a hypothesis |

---

## Install (5 minutes, one time)

### Option 1: Let Claude Do It (Recommended)

Paste this into Claude Code:

```
Install the RulesMate rules from https://github.com/promptmates/promptmates-toolkit into my .claude/rules/ folder. Walk me through it.
```

Claude will download the rules file and place it in the right location.

### Option 2: Manual Install

1. Download this repo (green Code button > Download ZIP)
2. Find the `rulesmate/rules/` folder
3. Copy `rulesmate-ta-guidelines.md` into your project's `.claude/rules/` folder

On Mac, press Cmd+Shift+. in Finder to see hidden folders (the `.claude` folder starts with a dot).

If you don't have a `.claude/rules/` folder yet, create one:
```
your-project/
  .claude/
    rules/
      rulesmate-ta-guidelines.md
```

### Option 3: Append to CLAUDE.md

If you prefer a single instructions file, copy the contents of `rulesmate-ta-guidelines.md` and append it to your existing `CLAUDE.md`. Do not replace what you already have.

### Verify it works

Rules load automatically on every interaction. There is no slash command. To verify, ask Claude Code:

```
What rules are loaded in this project?
```

You should see the five TA principles listed.

---

## Usage

RulesMate is not a slash command. It runs in the background on every interaction. Once installed, your AI will:

| Behavior | Without RulesMate | With RulesMate |
|----------|-------------------|----------------|
| Candidate details | May infer employers, metrics, or motivations not stated | Only uses evidence explicitly provided; says "not stated" for gaps |
| JD edits | May rewrite entire document when you asked to fix one section | Touches only the section requested |
| Pipeline reports | May scope to wrong audience | Asks who reads it before drafting |
| Recommendations | "Based on best practices" | Cites your actual data or labels it a hypothesis |
| Multi-step workflows | May skip dependencies | States steps, identifies inputs needed, flags missing inputs |

---

## How It Works

### The Five Principles (Detail)

**1. Candidate Truth Over Convenience**

Only use evidence explicitly provided: resume text, LinkedIn profile text, ATS notes, scorecard comments. Never infer employers, seniority, metrics, or motivations not stated. When evidence is missing, say "not stated."

The test: Can you point to the exact source text for every claim?

**2. Audience-Aware Output**

Before drafting anything, identify who will read it and what decision it supports.

| Audience | They need | They don't need |
|----------|-----------|-----------------|
| Hiring Manager | fit signal, gaps, risk flags | sourcing methodology, ATS mechanics |
| Recruiter | actionable next steps, stage context | strategic rationale, org design |
| Executive | headcount trajectory, velocity, blockers | individual candidate details |
| Candidate | role clarity, team context, growth path | internal process, comp philosophy |

If the audience is ambiguous, ask one question. One question saves a rewrite.

**3. Surgical Scope**

When editing a JD, touch only the section requested. When fixing outreach, fix the outreach. Every changed line traces back to the request. If you want to suggest something beyond scope, flag it as a separate recommendation after delivering what was asked.

**4. Process-Aware Execution**

TA has sequential dependencies. Before executing a multi-step workflow: state the steps, identify inputs needed, flag missing inputs, and deliver each step as a checkpoint. Do not produce an interview kit for a role whose JD hasn't been approved.

**5. Evidence-Based Recommendations**

When recommending sourcing channels, interview structures, or pipeline actions, cite the basis. "Based on your last 6 hires in this function" is useful. "Based on best practices" is not. If you don't have data, say so.

### Why Not Just Use the Karpathy Guidelines?

You can and should. They are excellent universal principles. But they don't catch TA-specific failure modes:

- A hallucinated candidate detail that biases an interview panel
- A JD edit that mushrooms beyond the one section you flagged
- A pipeline report scoped to the wrong audience
- A sourcing recommendation backed by "industry best practices" instead of your actual funnel data
- An interview kit generated before the JD was even approved

RulesMate layers on top of whatever universal guidelines you already run. It doesn't replace your existing `CLAUDE.md`. It adds to it.

---

## Troubleshooting

**"Claude is still hallucinating candidate details"**
- Verify the rules file is in `.claude/rules/` (not `claude/rules/`, the dot matters)
- Check that the file has not been truncated or corrupted during copy

**"Rules don't seem to be loading"**
- Ask Claude Code "What rules are loaded?" to confirm detection
- Make sure you are running Claude Code from the project folder containing `.claude/`

**"Rules are too restrictive for my workflow"**
- The file is plain markdown. Edit any principle to match your risk tolerance. The structure matters more than the exact wording.

---

## Related

- [Karpathy Guidelines](https://github.com/multica-ai/andrej-karpathy-skills) - The universal coding principles that inspired this
- [PromptMates Toolkit](https://github.com/promptmates/promptmates-toolkit) - The full collection (SkillsMate, ToneMate, IntelMate, CareerMate, and more)

---

## License

MIT

---

*Part of the [PromptMates Toolkit](https://github.com/promptmates/promptmates-toolkit). Questions: jason@promptmates.ai*
