---
name: browsermate
description: Direct browser control via CDP. Use when the user wants to automate, scrape, test, or interact with web pages.
---

# BrowserMate

Give your Claude Code agent full browser control. **Read this file in full before using or editing the harness.**

## Fast start

Read `helpers.py` first.

```bash
browsermate <<'PY'
new_tab("https://example.com")
wait_for_load()
print(page_info())
PY
```

- Invoke as `browsermate` — it's on `$PATH`. No `cd`, no `uv run`.
- First navigation is `new_tab(url)`, not `goto(url)` — `goto` runs in the user's active tab.

The code is the doc.

Available interaction skills:
- `interaction-skills/connection.md` — startup sequence, tab visibility, omnibox popup fix

Available domain skills:
- Check `domain-skills/` for site-specific patterns you or your agent have contributed

## Tool call shape

```bash
browsermate <<'PY'
# any python. helpers pre-imported. daemon auto-starts.
PY
```

`run.py` calls `ensure_daemon()` before `exec` — you never start/stop manually unless you want to.

### Remote browsers

Use remote for **parallel sub-agents** (each gets its own isolated browser via a distinct `BU_NAME`) or on a headless server. `BROWSER_USE_API_KEY` must be set. `start_remote_daemon`, `list_cloud_profiles`, `list_local_profiles`, `sync_local_profile` are pre-imported.

```bash
browsermate <<'PY'
start_remote_daemon("work")                               # default — clean browser, no profile
# start_remote_daemon("work", profileName="my-work")      # reuse a cloud profile (already logged in)
# start_remote_daemon("work", profileId="<uuid>")         # same, but by UUID
# start_remote_daemon("work", proxyCountryCode="de", timeout=120)   # DE proxy, 2-hour timeout
PY

BU_NAME=work browsermate <<'PY'
new_tab("https://example.com")
print(page_info())
PY
```

`start_remote_daemon` prints `liveUrl` and auto-opens it in the local browser (if a GUI is detected) so you can watch along.

## Search first

After cloning the repo, search `domain-skills/` first for the domain you are working on before inventing a new approach.

Only if you start struggling with a specific mechanic while navigating, look in `interaction-skills/` for helpers.

## Always contribute back

**If you learned anything non-obvious about how a site works, write it to `domain-skills/<site>/` before you finish. Default to contributing.** The harness gets better only because agents file what they learn.

Examples of what's worth writing:
- A **private API** the page calls (XHR/fetch endpoint, request shape, auth)
- A **stable selector** that beats the obvious one
- A **framework quirk** — React combobox that only commits on Escape, etc.
- A **URL pattern** — direct route, required query params
- A **wait** that `wait_for_load()` misses
- A **trap** — stale drafts, CAPTCHAs, beforeunload dialogs

### What a domain skill should capture

The durable shape of the site — the map, not the diary:
- URL patterns and query params
- Private APIs and their payload shape
- Stable selectors (data-*, aria-*, role, semantic classes)
- Site structure — containers, items per page, framework
- Framework/interaction quirks
- Waits and why they're needed
- Traps and selectors that don't work

### Do not write

- Raw pixel coordinates (break on viewport/zoom changes)
- Run narration or step-by-step of what you just did
- Secrets, cookies, session tokens, user-specific state

## What actually works

- **Screenshots first**: use `screenshot()` to understand the page, find targets, decide next action.
- **Clicking**: `screenshot()` → look → `click(x, y)` → `screenshot()` again to verify.
- **Bulk HTTP**: `http_get(url)` + `ThreadPoolExecutor`. No browser for static pages.
- **After goto**: `wait_for_load()`.
- **Wrong/stale tab**: `ensure_real_tab()`.
- **Verification**: `print(page_info())` for a quick health check. Screenshots for visual verification.
- **DOM reads**: use `js(...)` for inspection and extraction when screenshots show coordinates are wrong.
- **Iframe sites**: `click(x, y)` passes through; only drop to iframe DOM work when needed.
- **Auth wall**: stop and ask the user. Don't type credentials.
- **Raw CDP** for anything helpers don't cover: `cdp("Domain.method", **params)`.

## Architecture

```text
Browser (local or cloud) -> CDP WS -> daemon.py -> /tmp/bu-<NAME>.sock -> run.py
```

- Protocol is one JSON line each way.
- `BU_NAME` namespaces socket, pid, and log files.
- `BU_CDP_WS` overrides local browser discovery for remote browsers.
- `BU_BROWSER_ID` + `BROWSER_USE_API_KEY` lets the daemon stop a cloud browser on shutdown.

## Prerequisites

The harness needs a CDP-enabled browser to connect to. How you get there is up to you. Options:
- Local Chrome/Edge with remote debugging enabled
- `BU_CDP_WS` environment variable pointing at any CDP websocket
- Browser Use cloud browsers via `start_remote_daemon()`

## Gotchas

- `DevToolsActivePort` can exist before the port is actually listening. Give it a few seconds.
- The first connect may block on Chrome's Allow dialog.
- Omnibox popups are fake `page` targets. Filter them when looking for real tabs.
- CDP target order != Chrome's visible tab-strip order.
- Default daemon sessions can go stale. `ensure_real_tab()` re-attaches.
- `no close frame received or sent` usually means stale daemon. Use `restart_daemon()`.
- Browser Use API is camelCase on the wire.
- Remote `cdpUrl` is HTTPS, not ws. Resolve via `/json/version`.
- After every meaningful action, re-screenshot before assuming it worked.
- Prefer compositor-level actions over framework hacks.

## Interaction notes

- `interaction-skills/` holds reusable UI mechanics (dialogs, tabs, dropdowns, iframes, uploads).
- `domain-skills/` holds site-specific workflows — update when you discover patterns.
