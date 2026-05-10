# Claude Skills

The official repository for Claude Code skills from the PromptMates community.

## What Are Skills?

Skills are markdown files that give Claude Code specialized capabilities. Drop a skill file into your `.claude/skills/` folder and trigger it with a slash command or natural language. No coding required.

## Available Skills

| Skill | Command | What It Does |
|---|---|---|
| **SkillsMate** | `/skillsmate` | Paste a JD, get back a ranked list of companies hiring the same talent, Boolean strings, and a tactical sourcing plan |
| **CareerMate** | `/careermate` | Paste a resume, get back expanded titles you should search, live role matches from ATS boards, and a personalized search plan |
| **ToneMate** | `/tonemate` | Reads your sent emails via Gmail MCP, maps your audience registers, and generates a tone of voice file that makes AI write like you |

## Getting Started

New to GitHub or Claude Code? Each skill has its own Getting Started guide:
- [SkillsMate Getting Started](skillsmate/Getting%20Started%20Guide%20-%20PromptMates%20GitHub.md) (for recruiters sourcing talent)
- [CareerMate Getting Started](careermate/Getting%20Started%20Guide.md) (for job seekers finding roles)
- [ToneMate Getting Started](tonemate/Getting%20Started%20Guide.md) (for anyone who wants AI to write in their voice)

## Quick Install (if you already know what you are doing)

1. Download this repo (green Code button > Download ZIP)
2. Copy the skill's `.md` file into your `.claude/skills/` folder
3. Create the required context files in a `context/` folder (examples included)
4. Run the slash command in Claude Code

## Repo Structure

```
claude-skills/
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
```

## Contributing

Built a skill that works well? Open a pull request or share it in the PromptMates community and we will add it here.

## License

MIT
