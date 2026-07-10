# Getting Started with CareerMate

This guide assumes zero technical knowledge. If you can download a file and create a folder, you can do this.

---

## Before You Start

You need one thing: **The Claude app installed on your computer.** 

- If you already have it, great. Move to Step 1.
- If you do not have it yet, go to [claude.ai](https://claude.ai), sign in, and download the desktop app for Mac or Windows. You need a Pro plan ($20/month) for Claude Code features.

---

## Step 1: Create a folder called "careermate" on your computer

This folder is where CareerMate will save your preferences and results. It needs to be a permanent folder (not Downloads, not your Desktop).

**On Mac:**
1. Open **Finder** (the blue smiley face in your dock)
2. In the menu bar at the top of the screen, click **Go**, then click **Home**
3. You are now in your home folder. It has your username and a little house icon.
4. Right-click anywhere in the empty white space
5. Click **New Folder**
6. Name it `careermate` (all lowercase, one word, no spaces)
7. Press Enter

Done. You now have a folder. Leave this Finder window open.

**On Windows:**
1. Open **File Explorer** (the folder icon in your taskbar)
2. Click **Documents** in the left sidebar
3. Right-click in the empty space
4. Click **New > Folder**
5. Name it `careermate`
6. Press Enter

---

## Step 2: Open Claude Code pointed at your careermate folder

"Pointed at" means you are telling Claude: "work inside this folder. Save things here."

**Here is exactly how to do this in the Claude Desktop app:**

1. Open the **Claude** app on your computer
2. Look at the top of the left sidebar. You will see two tabs: **Home** and **Code**
3. Click the **Code** tab
4. Click **+ New session** (it's at the top of the sidebar)
5. A window will pop up asking you to **choose a folder**
6. Navigate to the `careermate` folder you created in Step 1 and select it
7. Click **Open** (or **Select** on Windows)

**How to confirm it worked:** Look at the very bottom of the chat window. You should see a folder path that ends in `/careermate`. If you see that, you are pointed at the right place.

**Common mistake:** Do NOT type a GitHub URL or "open careermate" into the chat. That does not work. You must use the file picker (the popup window) to select your folder.

---

## Step 3: Download the CareerMate files from GitHub

1. In your web browser, go to: **https://github.com/promptmates/promptmates-toolkit**
2. Find the green button that says **<> Code** (it is near the top right, above the file list)
3. Click it. A dropdown appears.
4. Click **Download ZIP**
5. Wait for the download to finish (check your Downloads folder if you are not sure where it went)
6. Find the downloaded file. It will be called something like `promptmates-toolkit-main.zip`
7. **Unzip it:**
   - On Mac: double-click the .zip file. A folder appears next to it.
   - On Windows: right-click the .zip file, click **Extract All**, click **Extract**
8. Open the unzipped folder. You will see multiple subfolders (browsermate, careermate, intelmate, etc.)
9. Open the **careermate** subfolder

Leave this window open. You will copy files from it in the next steps.

---

## Step 4: Create subfolders inside your careermate workspace

Go back to your `careermate` folder (the one from Step 1, NOT the one from the download).

You need to create three subfolders inside it:

1. **Create a folder called `context`:**
   - Right-click in the empty space > New Folder > name it `context`

2. **Create a folder called `scripts`:**
   - Right-click in the empty space > New Folder > name it `scripts`

3. **Create a hidden folder called `.claude` with a subfolder called `skills`:**
   - On Mac: press **Cmd+Shift+.** (the period key) to show hidden files. Then right-click > New Folder > name it `.claude` (with the dot at the start). Open `.claude`, then create another folder inside it called `skills`. Press Cmd+Shift+. again when done.
   - On Windows: right-click > New Folder > name it `.claude` (Windows may show a warning about the dot; click OK or Yes). Open `.claude`, then create another folder inside it called `skills`.

**What your careermate folder should look like now:**
```
careermate/
  .claude/
    skills/       <- empty for now
  context/        <- empty for now
  scripts/        <- empty for now
```

---

## Step 5: Copy the files into your workspace

You are going to copy files from the downloaded folder (Step 3) into your workspace (Step 1). Open both folders side by side so you can drag files between them.

**Copy these files (drag them from left to right, or use copy/paste):**

| This file from the download... | Goes into this folder in your workspace... |
|---|---|
| `careermate/skills/careermate.md` | `.claude/skills/` |
| `careermate/context/guardrails.md` | `context/` |
| `careermate/context/target-companies.md` | `context/` |
| `careermate/context/search-preferences-example.md` | `context/` |
| `careermate/scripts/discover_boards.py` | `scripts/` |
| `careermate/scripts/find_ta_roles.py` | `scripts/` |

**Reminder:** The `.claude` folder is hidden. On Mac, press Cmd+Shift+. to see it. On Windows, click View > Show > Hidden items.

---

## Step 6: Rename one file

In your workspace's `context/` folder, find the file called:
`search-preferences-example.md`

Rename it to:
`search-preferences.md`

(Just remove the `-example` part.)

**On Mac:** Click the file once, press Enter, edit the name, press Enter.
**On Windows:** Click the file once, press F2, edit the name, press Enter.

Leave the file empty. CareerMate fills it in during your first conversation.

---

## Step 7: Run CareerMate

1. Go back to Claude Code (it should still be open from Step 2, pointed at your careermate folder)
2. Click in the chat area at the bottom
3. Type exactly this: `/careermate`
4. Press Enter (or Return on Mac)

CareerMate will greet you and ask what you can share (resume, LinkedIn, etc.). Follow the prompts from there.

---

## How to know it is working

You will see CareerMate ask: **"What can you share with me to get started?"**

If you see that, you are done. Everything is installed correctly.

---

## If something goes wrong

**"Folder not found" error:**
You pasted the GitHub URL into the chat at some point, which created a temp folder that is now gone. Fix: click + New session, choose your real careermate folder.

**Nothing happens when you type /careermate:**
The skill file is not in the right place. Check that `careermate.md` is inside `.claude/skills/` (not just `skills/`). The `.claude` folder is hidden; press Cmd+Shift+. on Mac to see it.

**Claude says it does not know what /careermate is:**
Same as above. The file needs to be in `.claude/skills/` inside your careermate workspace folder.

**You see "choose a folder" but can't find your careermate folder:**
On Mac, check your Home directory (Go > Home in Finder). On Windows, check Documents.

---

## What Happens Next

1. CareerMate asks what you have (resume, LinkedIn, job descriptions, or a plain description)
2. It asks about your preferences (location, remote/hybrid, company stage, deal-breakers)
3. It asks how wide to search (same title, adjacent roles, or career pivot)
4. It shows you an expanded title list and asks you to confirm
5. It searches 15-30 live career boards (takes 2-4 minutes)
6. It delivers: matched roles, adjacency discoveries, and a personalized search plan with Boolean strings you can copy-paste into LinkedIn and Google

## Tips for best results

- **Upload a resume PDF** if you have one. It extracts more signal than a plain description.
- **Include a target JD** if you have one in mind. The agent uses it to calibrate what to look for.
- **Say "adjacent roles"** when asked about scope. This is where CareerMate shows its value: titles you qualify for but are not searching.
- **Run the Boolean strings yourself** in LinkedIn and Google after. They reach places the agent cannot search directly.

---

## Your final folder structure

```
careermate/
  .claude/
    skills/
      careermate.md           <- the brain (agent instructions)
  context/
    guardrails.md             <- output quality rules
    target-companies.md       <- which company boards to search
    search-preferences.md     <- your preferences (auto-filled after first run)
  scripts/
    discover_boards.py        <- find new company boards
    find_ta_roles.py          <- TA/People role scanner
```
