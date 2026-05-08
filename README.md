# Claude Skills

The official repository for Claude Code skills from the PromptMates community.

## What Are Skills?

Skills are markdown files that give Claude Code specialized capabilities. Drop a skill file into your `.claude/skills/` folder and trigger it with a slash command or natural language. No coding required.

## Available Skills

| Skill | Command | What It Does |
|---|---|---|
| **SDI Scout** | `/sdi-scout` | Paste a JD, get back a ranked list of companies hiring the same talent, Boolean strings, and a tactical sourcing plan |

More skills coming soon.

## Getting Started

New to GitHub or Claude Code? Read the [Getting Started Guide](sdi-scout/Getting%20Started%20Guide%20-%20PromptMates%20GitHub.md) for step-by-step setup instructions.

## Quick Install (if you already know what you are doing)

1. Download this repo (green Code button > Download ZIP)
2. Copy the skill's `.md` file into your `.claude/skills/` folder
3. Create the required context files in a `context/` folder (examples included)
4. Run the slash command in Claude Code

## Repo Structure

```
claude-skills/
  README.md              (you are here)
  sdi-scout/
    README.md            (detailed docs for SDI Scout)
    skills/
      sdi-scout.md       (the skill file you install)
    context/
      company-context-example.md
      tone-of-voice-example.md
      guardrails-example.md
      competitor-registry-template.yaml
```

## Contributing

Built a skill that works well? Open a pull request or share it in the PromptMates community and we will add it here.

## License

MIT
