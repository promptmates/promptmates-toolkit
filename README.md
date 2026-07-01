# PromptMates Toolkit

The official repository for Claude Code skills, rules, and utilities from the PromptMates community.

## What's In Here?

Markdown files that give Claude Code specialized capabilities. Skills trigger with slash commands. Rules run in the background. Utilities are one-command installs that extend what Claude can do. No coding required.

## Available Skills

| Skill | Command | What It Does |
|---|---|---|
| **SkillsMate** | `/skillsmate` | Paste a JD, get back a ranked list of companies hiring the same talent, Boolean strings, and a tactical sourcing plan |
| **CareerMate** | `/careermate` | Paste a resume, get back expanded titles you should search, live role matches from ATS boards, and a personalized search plan |
| **ToneMate** | `/tonemate` | Reads your sent emails via Gmail MCP, maps your audience registers, and generates a tone of voice file that makes AI write like you |
| **IntelMate** | `/intelmate` | Scrapes competitor career pages, classifies roles, extracts comp data, scores talent brands, and builds recruiting battle cards |
| **ScreenMate** | `/ss` | Take a screenshot, type `/ss`, and Claude reads it, describes what it sees, and asks what you want to do with it |
| **TrailMate** | `/trailmate` | Agent receipt system for persistent task tracking. Leaves breadcrumbs so nothing evaporates between sessions. One glance shows what's moving, stuck, or waiting on you |

## Rules

Not everything is a skill. Some things are behavioral guardrails that run in the background on every interaction.

| Rules | Install Location | What It Does |
|---|---|---|
| **RulesMate** | `.claude/rules/` | Five TA-specific behavioral principles that stop your AI from hallucinating candidate data, over-editing JDs, and giving recommendations with no evidence. Inspired by the [Karpathy Guidelines](https://github.com/multica-ai/andrej-karpathy-skills). |

## Getting Started

New to GitHub or Claude Code? Each skill has its own Getting Started guide:
- [SkillsMate Getting Started](skillsmate/Getting%20Started%20Guide%20-%20PromptMates%20GitHub.md) (for recruiters sourcing talent)
- [CareerMate Getting Started](careermate/Getting%20Started%20Guide.md) (for job seekers finding roles)
- [ToneMate Getting Started](tonemate/Getting%20Started%20Guide.md) (for anyone who wants AI to write in their voice)
- [IntelMate Getting Started](intelmate/Getting%20Started%20Guide.md) (for competitive intelligence from job postings)
- [RulesMate Getting Started](rulesmate/Getting%20Started%20Guide.md) (for TA-specific AI guardrails)
- [ScreenMate Getting Started](screenmate/Getting%20Started%20Guide.md) (for screenshot-to-action in Claude Code)
- [TrailMate Getting Started](trailmate/Getting%20Started%20Guide.md) (for persistent task tracking across sessions)

## Quick Install (if you already know what you are doing)

**For skills:**
1. Download this repo (green Code button > Download ZIP)
2. Copy the skill's `.md` file into your `.claude/skills/` folder
3. Create the required context files in a `context/` folder (examples included)
4. Run the slash command in Claude Code

**For rules (RulesMate):**
1. Download this repo
2. Copy `rulesmate/rules/rulesmate-ta-guidelines.md` into your `.claude/rules/` folder
3. That's it. Rules load automatically on every interaction.

**For utilities (ScreenMate):**
1. Download this repo
2. Copy `screenmate/skills/ss.md` into `~/.claude/commands/`
3. Set your screenshot folder (see [ScreenMate docs](screenmate/README.md))

## Repo Structure

```
promptmates-toolkit/
  README.md              (you are here)
  skillsmate/
    README.md            (detailed docs for SkillsMate)
    skills/
      skillsmate.md       (the skill file you install)
    context/
      company-context-example.md
      tone-of-voice-example.md
      guardrails-example.md
      competitor-registry-template.yaml
  careermate/
    README.md            (detailed docs for CareerMate)
    Getting Started Guide.md
    skills/
      careermate.md   (the skill file you install)
    context/
      search-preferences-example.md
      guardrails-example.md
  tonemate/
    README.md            (detailed docs for ToneMate)
    Getting Started Guide.md
    skills/
      tonemate.md      (the skill file you install)
    context/
      guardrails-example.md
  intelmate/
    README.md            (detailed docs for IntelMate)
    Getting Started Guide.md
    skills/
      intelmate.md     (the skill file you install)
    context/
      company-profile-example.md
      guardrails-example.md
  rulesmate/
    README.md            (detailed docs for RulesMate)
    Getting Started Guide.md
    rules/
      rulesmate-ta-guidelines.md  (the rules file you install)
  screenmate/
    README.md            (detailed docs for ScreenMate)
    Getting Started Guide.md
    skills/
      ss.md              (the command file you install)
  trailmate/
    README.md            (detailed docs for TrailMate)
    Getting Started Guide.md
    skills/
      trailmate.md       (the skill file you install)
    context/
      queue-example.md   (starter queue with example tasks)
      guardrails-example.md (optional behavior rules)
```

## Contributing

Built a skill that works well? Open a pull request or share it in the PromptMates community and we will add it here.

## License

MIT
