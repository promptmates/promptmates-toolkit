# BrowserMate

**A CDP browser harness for Claude Code. Your agent controls a real browser via WebSocket, with no framework between.**

---

## Prerequisites

| Platform | Compatible? | Notes |
|----------|-------------|-------|
| Claude Code CLI | Yes | Requires local CDP browser connection |
| Claude Desktop | Yes | Requires local CDP browser connection |
| VS Code / JetBrains | No | Requires daemon process and Unix socket |
| Cloud Co-Work (browser) | No | Cannot connect to local browser instance |

**Required:** One of the following:
- A local browser with remote debugging enabled (Chrome, Edge, Chromium)
- A remote browser via Browser Use cloud (`BROWSER_USE_API_KEY` in `.env`)
- Any CDP endpoint via `BU_CDP_WS` environment variable

**Also required:**
- Python with `uv` package manager
- Git (for cloning the repo)

---

## What You Get

| Capability | What it does |
|------------|-------------|
| **Direct browser control** | Navigate, click, type, screenshot, read DOM |
| **Self-extending helpers** | If a helper doesn't exist yet, the agent adds it to `helpers.py` and keeps going |
| **Domain skills** | Site-specific knowledge that agents contribute as they work (selectors, private APIs, URL patterns) |
| **Remote browser support** | Free tier from Browser Use (3 concurrent, no card required) |
| **Unix socket architecture** | Daemon holds the CDP connection; scripts relay commands |

---

## Install (10 minutes, one time)

### Step 1: Clone the repo

```bash
git clone https://github.com/promptmates/browsermate
cd browsermate
```

### Step 2: Install globally

```bash
uv tool install -e .
```

This puts `browsermate` on your PATH globally while pointing at the repo checkout, so edits to `helpers.py` take effect immediately.

### Step 3: Integrate with Claude Code

Add an import to your project's `CLAUDE.md` or `~/.claude/CLAUDE.md`:

```
@~/path/to/browsermate/SKILL.md
```

Now Claude Code knows how to drive the browser in any project.

### Step 4: Start a CDP-enabled browser

**Option A: Local Chrome**

```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
```

**Option B: Remote browser (Browser Use cloud)**

```bash
# Grab a key at cloud.browser-use.com/new-api-key
# Add to .env: BROWSER_USE_API_KEY=your-key

browsermate <<'PY'
start_remote_daemon("work")
PY
```

### Step 5: Test it

```bash
browsermate <<'PY'
new_tab("https://example.com")
wait_for_load()
screenshot()
PY
```

You should see a screenshot of example.com in your terminal.

---

## Usage

| What you type | What happens |
|---|---|
| `browsermate <<'PY' ... PY` | Executes Python with browser helpers pre-imported |
| `new_tab(url)` | Opens a URL in a new tab (use for first navigation) |
| `goto(url)` | Navigates current tab (clobbers active page) |
| `screenshot()` | Captures current page state |
| `page_info()` | Quick health check (URL, title, ready state) |
| `click(selector)` | Clicks an element |
| `type_text(selector, text)` | Types into a form field |
| `wait_for_load()` | Waits for page load to complete |

### Remote Browser Usage

```bash
# Start a named remote session
browsermate <<'PY'
start_remote_daemon("work")
PY

# Use it
BU_NAME=work browsermate <<'PY'
new_tab("https://example.com")
print(page_info())
PY
```

Free tier from Browser Use: 3 concurrent sessions, no credit card required.

---

## How It Works

```
Browser -> CDP WebSocket -> daemon.py -> Unix socket -> run.py
```

- `daemon.py` holds the CDP connection and relays commands
- `run.py` reads Python from stdin, executes with helpers pre-imported
- `helpers.py` has the browser primitives (click, type, screenshot, navigate)
- `admin.py` handles daemon lifecycle and remote browser provisioning

The architecture is ~590 lines of Python. No framework, no recipes, no rails. One websocket to a browser, nothing between.

### Domain Skills

The `domain-skills/` directory holds site-specific knowledge that agents contribute as they work. When the harness figures out how a site works (selectors, private APIs, URL patterns, framework quirks), it writes a skill file so the next run doesn't rediscover it.

Start with an empty directory. Your agent will populate it as it works.

---

## Troubleshooting

**"Connection refused" or "Cannot connect to browser"**
- Make sure Chrome is running with `--remote-debugging-port=9222`
- Check that no other process is using port 9222
- For remote browsers, verify your `BROWSER_USE_API_KEY` is set in `.env`

**"Daemon not responding"**
- Try `restart_daemon()` once
- If that fails, kill any existing daemon process and start fresh

**"Screenshot shows blank page"**
- Add `wait_for_load()` after navigation
- Some pages require additional wait time for JS rendering

**"Agent can't find an element"**
- Use `screenshot()` to verify what the page actually looks like
- Check if the element is inside an iframe (requires frame switching)
- The agent can write a new domain skill to handle site-specific quirks

---

## Contributing

PRs welcome. The best contribution is a new domain skill for a site you use often. Skills are written by agents during real tasks, not hand-authored.

---

## License

MIT

---

*Part of the [PromptMates Toolkit](https://github.com/promptmates/promptmates-toolkit). Questions: jason@promptmates.ai*
