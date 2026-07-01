# BrowserMate

A CDP browser harness for Claude Code. Your agent controls a real browser.

~590 lines of Python. No framework, no recipes, no rails. One websocket to a browser, nothing between.

```
  browsermate <<'PY'
  new_tab("https://example.com")
  wait_for_load()
  screenshot()
  PY
```

The agent writes what's missing, mid-task. If a helper doesn't exist yet, the agent adds it to `helpers.py` and keeps going.

## Install

```bash
git clone https://github.com/promptmates/browsermate
cd browsermate
uv tool install -e .
```

That puts `browsermate` on your PATH globally while pointing at the repo checkout, so edits to `helpers.py` take effect immediately.

## Claude Code integration

Add an import to your project's `CLAUDE.md` or `~/.claude/CLAUDE.md`:

```
@~/path/to/browsermate/SKILL.md
```

Now Claude Code knows how to drive the browser in any project.

## Prerequisites

The harness needs a CDP-enabled browser to connect to. Options:

1. **Local browser** with remote debugging enabled (Chrome, Edge, Chromium)
2. **Remote browser** via Browser Use cloud (`BROWSER_USE_API_KEY` in `.env`)
3. **Any CDP endpoint** via `BU_CDP_WS` environment variable

## How it works

```
Browser -> CDP WebSocket -> daemon.py -> Unix socket -> run.py
```

- `daemon.py` holds the CDP connection and relays commands
- `run.py` reads Python from stdin, executes with helpers pre-imported
- `helpers.py` has the browser primitives (click, type, screenshot, navigate)
- `admin.py` handles daemon lifecycle and remote browser provisioning

## Remote browsers

Free tier from Browser Use (3 concurrent, no card required):

```bash
# grab a key at cloud.browser-use.com/new-api-key
# add to .env: BROWSER_USE_API_KEY=your-key

browsermate <<'PY'
start_remote_daemon("work")
PY

BU_NAME=work browsermate <<'PY'
new_tab("https://example.com")
print(page_info())
PY
```

## Domain skills

The `domain-skills/` directory holds site-specific knowledge that agents contribute as they work. When the harness figures out how a site works (selectors, private APIs, URL patterns, framework quirks), it writes a skill file so the next run doesn't rediscover it.

Start with an empty directory. Your agent will populate it.

## Contributing

PRs welcome. The best contribution is a new domain skill for a site you use often. Skills are written by agents during real tasks, not hand-authored.

## License

MIT
