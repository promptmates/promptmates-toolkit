# RulesMate

**Behavioral guardrails for AI assistants used in talent acquisition.** Drop these rules into your Claude Code project and your AI stops hallucinating candidate details, over-editing JDs, and giving you "best practices" recommendations with no data behind them.

Inspired by the [Karpathy Guidelines](https://github.com/multica-ai/andrej-karpathy-skills) (131k stars for four universal coding principles). RulesMate takes the same structural idea and clamps it to recruiting-specific failure modes.

---

## What You Get

Five principles that prevent the most common AI mistakes in TA workflows:

1. **Candidate Truth Over Convenience** - Never invent, infer, or embellish candidate data
2. **Audience-Aware Output** - Know who reads it and what decision it supports
3. **Surgical Scope** - Only touch what was requested
4. **Process-Aware Execution** - Respect TA's sequential dependencies
5. **Evidence-Based Recommendations** - Cite the data or call it a hypothesis

---

## Why Not Just Use the Karpathy Guidelines?

You can and should. They are excellent universal principles. But they don't catch TA-specific failure modes:

- A hallucinated candidate detail that biases an interview panel
- A JD edit that mushrooms beyond the one section you flagged
- A pipeline report scoped to the wrong audience
- A sourcing recommendation backed by "industry best practices" instead of your actual funnel data
- An interview kit generated before the JD was even approved

RulesMate layers on top of whatever universal guidelines you already run. It doesn't replace your existing `CLAUDE.md`. It adds to it.

---

## Setup (5 minutes)

### Option 1: Let Claude Do It (Recommended)

Paste this into Claude Code:

```
Install the RulesMate rules from https://github.com/promptmates/claude-skills into my .claude/rules/ folder. Walk me through it.
```

Claude will download the rules file and place it in the right location.

### Option 2: Manual Install

1. Download this repo (green Code button > Download ZIP)
2. Find the `rulesmate/rules/` folder
3. Copy `rulesmate-ta-guidelines.md` into your project's `.claude/rules/` folder

If you don't have a `.claude/rules/` folder yet, create one:
```
your-project/
  .claude/
    rules/
      rulesmate-ta-guidelines.md
```

### Option 3: Append to CLAUDE.md

If you prefer a single instructions file, copy the contents of `rulesmate-ta-guidelines.md` and append it to your existing `CLAUDE.md`. Do not replace what you already have.

---

## The Five Principles (Summary)

### 1. Candidate Truth Over Convenience

Only use evidence explicitly provided: resume text, LinkedIn profile text, ATS notes, scorecard comments. Never infer employers, seniority, metrics, or motivations not stated. When evidence is missing, say "not stated."

**The test:** Can you point to the exact source text for every claim?

### 2. Audience-Aware Output

Before drafting anything, identify who will read it and what decision it supports.

| Audience | They need | They don't need |
|----------|-----------|-----------------|
| Hiring Manager | fit signal, gaps, risk flags | sourcing methodology, ATS mechanics |
| Recruiter | actionable next steps, stage context | strategic rationale, org design |
| Executive | headcount trajectory, velocity, blockers | individual candidate details |
| Candidate | role clarity, team context, growth path | internal process, comp philosophy |

If the audience is ambiguous, ask one question. One question saves a rewrite.

### 3. Surgical Scope

When editing a JD, touch only the section requested. When fixing outreach, fix the outreach. Every changed line traces back to the request. If you want to suggest something beyond scope, flag it as a separate recommendation after delivering what was asked.

### 4. Process-Aware Execution

TA has sequential dependencies. Before executing a multi-step workflow: state the steps, identify inputs needed, flag missing inputs, and deliver each step as a checkpoint. Do not produce an interview kit for a role whose JD hasn't been approved.

### 5. Evidence-Based Recommendations

When recommending sourcing channels, interview structures, or pipeline actions, cite the basis. "Based on your last 6 hires in this function" is useful. "Based on best practices" is not. If you don't have data, say so.

---

## Compatibility

- **Claude Code**: `.claude/rules/` or append to `CLAUDE.md`
- **Cursor**: Save as `.cursor/rules/rulesmate-ta-guidelines.mdc` with `alwaysApply: true` in frontmatter
- **Any LLM**: Paste into your system prompt or project instructions

---

## Related

- [Karpathy Guidelines](https://github.com/multica-ai/andrej-karpathy-skills) - The universal coding principles that inspired this
- [PromptMates Claude Skills](https://github.com/promptmates/claude-skills) - The full PromptMates toolkit (SkillsMate, ToneMate, IntelMate, CareerMate)

---

## License

MIT - use it however you want, modify it, share it.
