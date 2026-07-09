---
name: snap-cup
description: Scan your sources (GitHub, GitLab, Slack, Discord, Teams, open source) for good work worth recognizing. Surface candidates, draft short DMs giving people their flowers. Helps non-technical people speak credibly about technical work.
user-invocable: true
---

# Snap Cup

Scan for good work nobody is talking about, surface it, draft a short message giving someone their flowers. Discovery-first: the skill finds things worth acknowledging, not the other way around.

## Philosophy

Most people never hear that their work was noticed. A 2-sentence DM from someone outside their immediate circle costs nothing and lands hard. This skill makes it effortless to be the person who notices.

Straight from the mind of Elle Woods. A snap cup is where you drop compliments about people. This is the agent-powered version: it finds the compliments for you.

The goal is not performance management. It's not formal recognition. It's spreading a small amount of joy that compounds over time and ideally gets passed forward.

### The Bridge

There's a deeper purpose here. In many organizations, non-technical people (recruiters, PMs, HR, operations) work alongside engineers but can't credibly acknowledge their work because they don't know how to talk about it. "Great job on that PR" means nothing. "Your retry logic with exponential backoff solved the timeout cascade we've been seeing" means everything.

Snap Cup bridges that gap. The agent reads the technical work, understands what's actually impressive about it, and helps you say something specific and credible. You don't need to understand the code to recognize the person. The agent translates the work into recognition you can deliver authentically.

This is how non-technical people earn trust in technical environments: by noticing what matters and naming it correctly.

## Modes

### Scan Mode (Discovery)

The real power. The agent searches your connected sources, finds work worth recognizing, and brings it to you. You didn't have to go looking. The agent surfaces things you would have missed.

This works with any source you have API/MCP access to: GitHub, GitLab, Slack, Discord, Teams.

### Draft Mode (Acknowledgment)

You already saw something great. Maybe on LinkedIn, Reddit, a conference talk, or just scrolling through a repo. You want to say something but you're not sure how to articulate what was impressive about it, especially if it's technical and you're not.

Trigger with: "snap cup [name] for [thing]" or "I saw [name] do [thing], help me acknowledge it."

The agent helps you draft something specific and credible, translating the technical substance into language you can deliver as your own.

## Technical Depth Levels

Every draft includes a specificity layer. The agent reads the actual work (the PR, the commit, the Slack message, the plugin) and pulls out the specific technical detail that makes the recognition credible. Three levels depending on the audience relationship:

### Level 1: Informed Observer
For when you're non-technical but want to sound like you actually looked. The agent picks out the one specific thing that matters and names it in plain language.

> Hey Marcus, saw your middleware PR landed. The retry logic with backoff you built means our API calls won't hammer the server when it's already struggling. That's the kind of thing nobody notices until it saves everyone.

You don't need to know what exponential backoff is. You just need to name it.

### Level 2: Peer Recognition
For when you're in the same field and can speak to the approach, not just the output.

> Hey Marcus, the exponential backoff with jitter in your retry middleware is a good call. Most implementations skip the jitter and end up with thundering herd problems at scale. Clean API too.

### Level 3: Deep Technical
For when you're an engineer talking to another engineer and want to be precise about what impressed you.

> Hey Marcus, saw you went with decorrelated jitter on the retry instead of full jitter. Good tradeoff for our traffic pattern. The circuit breaker integration with the half-open probe is a nice touch too.

**The agent picks the right level based on context.** If you tell it you're a recruiter reaching out to an engineer, it uses Level 1. If you're an engineer recognizing a peer, Level 2 or 3. You can also ask for a specific level: "make it more technical" or "keep it simple, I'm not an engineer."

## Sources

Scan wherever your community lives. Ask which source to scan, or use whatever's connected.

| Source | What to Look For |
|--------|-----------------|
| **GitHub** | PRs merged, thorough code reviews, issues solved, discussions answered, releases shipped, first contributions, maintainer work |
| **GitLab** | Same as GitHub: MRs, reviews, releases, pipeline improvements |
| **Slack** | Helpful answers, tools shared, knowledge dropped proactively, someone saving others time |
| **Discord** | Community help, teaching moments, answering the same question patiently, building bots/tools for the server |
| **Teams** | Same energy as Slack: helpful posts, knowledge sharing, unblocking others |
| **LinkedIn** | Thoughtful posts (not engagement bait), someone sharing genuine insight (Draft Mode: paste the URL or describe what you saw) |
| **Open Source** | Side projects shipped, first contributions, maintainers doing quiet thankless work |
| **Community forums** | Stack Overflow answers, Discourse posts, Reddit help threads (Draft Mode: paste the link) |

For sources without API access (LinkedIn, Reddit, forums), use Draft Mode. Paste a URL, screenshot, or describe what you saw. The agent handles the writing, not the discovery.

## When to Use

Trigger when user says:
- "/snap-cup"
- "Who's doing good work?"
- "Give someone their flowers"
- "Find something to recognize"
- "Snap cup"
- "Who should I shout out?"
- "Snap cup [name] for [thing]" (Draft Mode)
- "Help me acknowledge [thing]" (Draft Mode)

## What Counts as Good Work

- Someone shipped a tool, plugin, template, or automation
- Someone answered a question thoroughly and helped someone else
- Someone shared knowledge proactively (a doc, a how-to, a finding)
- Someone solved a problem that was blocking others
- Someone did quiet maintenance work that nobody thanks them for
- Someone wrote something that demonstrates real thinking (not just volume)
- Someone's first contribution to a project or community
- Someone helped a newcomer get oriented
- Someone made a technically sound decision that prevented future problems

## What Does NOT Count

- Routine activity (attending meetings, basic replies, showing up)
- Self-promotion (someone hyping their own work)
- Things that already got plenty of recognition (trending posts, viral threads)
- Anyone in the cooldown window (check `context/snap-cup-log.md`)

## Cooldown Rule

Check `context/snap-cup-log.md` before surfacing candidates. Do not suggest someone who was recognized within the last 30 days. Spread the love wide rather than stacking praise on the same people.

## Process

### Step 1: Discover (Scan Mode) or Receive (Draft Mode)

**Scan Mode:** Search the specified source (or ask which to scan). Look for work from the last 7 days that fits the criteria above and hasn't already been recognized.

**Draft Mode:** User provides a name and what they did. Agent reads the source material (if a link is provided) to understand the technical substance.

### Step 2: Present Candidates (Scan Mode only)

Show 2-4 candidates in a compact format:

```
1. [Name] - [What they did] - [Where you found it]
2. [Name] - [What they did] - [Where you found it]
3. [Name] - [What they did] - [Where you found it]
```

Ask: "Any of these land? I'll draft a message for whoever you want to reach out to."

If none land, offer to scan a different source or time window.

### Step 3: Draft the Message

**Core rules:**
- **1-3 sentences max.** This is a DM, not a speech.
- **Specific over generic.** Name the exact technical detail. "Your retry logic with exponential backoff" not "your code contribution."
- **No performative language.** No "I just wanted to take a moment to recognize..." No "I wanted to give you a shoutout for..."
- **Lead with what you saw, not how you feel.** "Found your X" or "Saw your Y land" before any reaction.
- **Casual tone.** "Hey [Name]," opening. Write like a human sending a quick message, not a manager filling out a form.
- **Pick the right technical depth level** based on who's sending and who's receiving.
- **Never use**: "kudos", "props", "hats off", "keep up the great work", "just wanted to say", "incredible", "truly exceptional"
- **End clean.** No ask, no follow-up, no trailing question unless there's a genuine reason to connect further.

**The specificity rule:** Every draft must contain at least one detail that proves you actually looked at the work. The recipient should read it and think "they actually saw what I did" not "they saw I did something."

### Step 4: Deliver

Present the draft. If the user approves:
- If you have Slack/Discord/Teams access: offer to send directly
- If not: provide the message ready to paste

If sending multiple, confirm each one individually.

### Step 5: Log

After a message is sent or confirmed, append a row to `context/snap-cup-log.md` with: date, name, what they were recognized for, and where it was sent.

## Examples

### Level 1 (Non-technical sender, technical recipient):

> Hey Jordan, saw your PR that fixed the checkout timeout issue. Switching to async validation so the form doesn't freeze while it talks to the payment API is exactly the kind of thing customers feel but can't articulate. Good catch.

The sender doesn't need to know what async means. They just need to name it.

### Level 2 (Peer recognition):

> Hey Priya, saw your breakdown of the auth flow in #help-backend yesterday. The sequence diagram with the token refresh race condition was the thing nobody else was seeing. Saved at least three people from the same rabbit hole.

### Level 3 (Deep technical):

> Hey Alex, the circuit breaker you added to the payments service with the half-open probe and sliding window is solid. Most people skip the adaptive threshold and just hardcode the failure count. Good choice for our bursty traffic.

### Draft Mode (Non-technical person saw something on LinkedIn):

User: "snap cup Sarah Chen for her post about data mesh architecture"

Agent reads the post, identifies what's actually insightful about it, drafts:

> Hey Sarah, your data mesh post on LinkedIn hit something I don't see discussed enough. The point about domain ownership failing when teams don't have data engineers embedded was the real insight. Most posts about data mesh stay theoretical. Yours didn't.

### Bad draft:

> Hey Jordan, I just wanted to take a moment to recognize your incredible work on the checkout flow. The elegant solution you've crafted truly showcases your engineering excellence. Keep up the amazing work!

(Too long, performative, generic, no technical specificity, uses "incredible" and "truly" which are AI tells, ends with empty praise. The recipient knows this was written by a bot or a form letter.)

## Spreading It Forward

If the moment feels right, you can close with a one-liner encouraging the pass-forward:

> "Pass it forward if you see someone else doing good work nobody's talking about."

Don't force it. Don't add it every time. But when it fits, it fits. The goal is a culture where noticing becomes contagious.

## Frequency

This skill works best as a weekly habit:
- Friday afternoons (end the week by making someone's day)
- After scanning a new community or repo for the first time
- When you have 5 minutes between things and want to do something small that compounds
- After a sprint ships (people are tired and underappreciated)
- When you notice a quiet contributor who never self-promotes

## What This Skill Does NOT Do

- Public channel recognition (keep it private and genuine)
- Formal award nominations or performance review input
- Messages to someone's manager about them
- Auto-send without your approval (every message gets confirmed first)
- Recognize people who are already getting plenty of attention
- Fake understanding (if the agent can't identify what's technically impressive, it says so and asks for more context rather than generating vague praise)
