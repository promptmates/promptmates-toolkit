# PromptMates Toolkit

**Markdown skills that give Claude Code specialized capabilities. No coding required.**

---

## What's In Here?

Skills are markdown files you drop into your Claude Code project. They trigger with slash commands and give your AI specific workflows, scoring logic, and output formats it wouldn't know otherwise. Rules run in the background on every interaction. Utilities are one-command installs that extend what Claude can do.

Think of it like an app store: download what you need, install in 15 minutes, and your AI gets a new capability.

### Don't have Claude Code installed?

You don't need to. Most of these skills work with [Cloud Co-Work](https://claude.ai/code), the browser-based version of Claude Code. No install, no terminal, no setup. Just open it in your browser and upload the skill files. See the "Compatible Platforms" column below to check which tools work there.

---

## Available Tools

| Tool | Command | What It Does | Compatible Platforms |
|------|---------|--------------|---------------------|
| **SkillsMate** | `/skillsmate` | Paste a JD, get ranked companies hiring the same talent, Boolean strings, and a tactical sourcing plan | CLI, Desktop, VS Code, JetBrains, Cloud Co-Work |
| **CareerMate** | `/careermate` | Paste a resume, get expanded titles, live role matches from ATS boards, and a personalized search plan | CLI, Desktop, VS Code, JetBrains, Cloud Co-Work |
| **ToneMate** | `/tonemate` | Reads your sent emails, maps your audience registers, and generates a tone of voice file that makes AI write like you | CLI, Desktop (requires local Gmail MCP) |
| **IntelMate** | `/intelmate` | Scrapes competitor career pages, classifies roles, extracts comp data, scores talent brands, and builds battle cards | CLI, Desktop, VS Code, JetBrains, Cloud Co-Work |
| **RulesMate** | `.claude/rules/` | Five TA-specific behavioral principles that stop AI from hallucinating candidate data and giving unsupported recommendations | CLI, Desktop, VS Code, JetBrains, Cloud Co-Work |
| **ScreenMate** | `/ss` | Take a screenshot, type `/ss`, and Claude reads it and asks what you want to do with it | CLI, Desktop (requires Mac screenshot folder access) |
| **TrailMate** | `/trailmate` | Agent receipt system for persistent task tracking. Leaves breadcrumbs so nothing evaporates between sessions | CLI, Desktop, VS Code, JetBrains, Cloud Co-Work |
| **BrowserMate** | `browsermate` | CDP browser harness that lets your agent control a real browser for web automation | CLI, Desktop (requires local CDP browser connection) |
| **Snap Cup** | `/snap-cup` | Scans your sources for good work worth recognizing, drafts specific credible DMs. Helps non-technical people speak about technical work. | CLI, Desktop, VS Code, JetBrains, Cloud Co-Work |

---

## Getting Started

New to GitHub or Claude Code? Each tool has its own Getting Started guide:

- [SkillsMate Getting Started](skillsmate/Getting%20Started%20Guide%20-%20PromptMates%20GitHub.md) (for recruiters sourcing talent)
- [CareerMate Getting Started](careermate/Getting%20Started%20Guide.md) (for job seekers finding roles)
- [ToneMate Getting Started](tonemate/Getting%20Started%20Guide.md) (for anyone who wants AI to write in their voice)
- [IntelMate Getting Started](intelmate/Getting%20Started%20Guide.md) (for competitive intelligence from job postings)
- [RulesMate Getting Started](rulesmate/Getting%20Started%20Guide.md) (for TA-specific AI guardrails)
- [ScreenMate Getting Started](screenmate/Getting%20Started%20Guide.md) (for screenshot-to-action in Claude Code)
- [TrailMate Getting Started](trailmate/Getting%20Started%20Guide.md) (for persistent task tracking across sessions)
- [BrowserMate Getting Started](browsermate/README.md) (for browser automation via CDP)
- [Snap Cup Getting Started](snapcup/Getting%20Started%20Guide.md) (for giving people their flowers)

---

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

**For BrowserMate:**
1. Clone the repo and install with `uv tool install -e .`
2. Add `@~/path/to/browsermate/SKILL.md` to your `CLAUDE.md`

---

## Repo Structure

```
promptmates-toolkit/
  README.md              (you are here)
  skillsmate/
    README.md
    skills/
      skillsmate.md
    context/
      company-context-example.md
      tone-of-voice-example.md
      guardrails-example.md
      competitor-registry-template.yaml
  careermate/
    README.md
    Getting Started Guide.md
    skills/
      careermate.md
    context/
      target-companies.md
      search-preferences-example.md
      guardrails.md
    scripts/
      discover_boards.py
      find_ta_roles.py
  tonemate/
    README.md
    Getting Started Guide.md
    skills/
      tonemate.md
    context/
      guardrails-example.md
  intelmate/
    README.md
    Getting Started Guide.md
    skills/
      intelmate.md
    context/
      company-profile-example.md
      guardrails-example.md
  rulesmate/
    README.md
    Getting Started Guide.md
    rules/
      rulesmate-ta-guidelines.md
  screenmate/
    README.md
    Getting Started Guide.md
    skills/
      ss.md
  trailmate/
    README.md
    Getting Started Guide.md
    skills/
      trailmate.md
    context/
      queue-example.md
      guardrails-example.md
  browsermate/
    README.md
    SKILL.md
    helpers.py
    daemon.py
    run.py
    admin.py
    domain-skills/
  snapcup/
    README.md
    Getting Started Guide.md
    skills/
      snap-cup.md
    context/
      snap-cup-log.md
```

---

## Contributing

Built a skill that works well? Open a pull request or share it in the PromptMates community and we will add it here.

---

## License

MIT

---

*Part of the [PromptMates Toolkit](https://github.com/promptmates/promptmates-toolkit). Questions: jason@promptmates.ai*
