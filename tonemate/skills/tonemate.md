---
name: tonemate
description: Pull real writing samples from Gmail, analyze communication patterns across audiences, and generate a tone of voice file that makes AI write like you instead of a robot. Uses Gmail MCP for email access.
user-invocable: true
---

# ToneMate (Voice Calibration from Email)

Reads your sent emails via Gmail MCP, identifies how you actually write (not how you think you write), and produces a detailed tone of voice guide with audience-specific registers. The output file makes any AI tool write in your authentic voice.

## When to Use

Trigger when user says:
- "/tonemate"
- "Build my tone of voice"
- "Analyze how I write"
- "Make AI sound like me"
- "Calibrate my voice"
- "Extract my writing style"

## Core Principle

Your real emails are the ground truth. What you actually write matters more than what you think you write. ToneMate reads your sent messages, maps your distinct voices by audience, and documents the patterns so AI can replicate them.

## Prerequisites

- Gmail MCP installed and connected (google-workspace MCP or equivalent with gmail_search_emails and gmail_get_email tools)
- Access to your sent email (the account you write from daily)

## Execution Sequence

### Phase 0: Interactive Setup

Do not skip this phase.

**Question 1: Email basics**

Ask:
- "What is your work email domain?" (e.g., acme.com)
- "Do you have a secondary domain I should also check?" (optional, for people with multiple accounts)

**Question 2: People mapping**

Ask:
- "Name 3-5 people you email most on your team (close peers, direct reports, your manager)"
- "Name 2-3 leaders or cross-functional partners you write to regularly"
- "Name 1-2 external contacts you email often (vendors, partners, clients)"

These names help identify which register each email falls into.

**Question 3: Self-report (optional but valuable)**

Ask:
- "How would you describe your writing style in one sentence?"
- "Are there any words or phrases you know you overuse?"
- "Anything you consciously avoid in email?"
- "Do you write differently to your team vs. your boss vs. external people?"

These answers get compared against what the emails actually show. Mismatches are the most valuable findings.

**Question 4: Search scope**

Ask:
- "How far back should I look? (default: 6 months)"
- "Any topics or threads I should skip? (e.g., sensitive HR matters, personal messages)"

### Phase 1: Sample Collection

Pull 15-20 real writing samples across different audiences and formats using Gmail MCP tools.

**Search 1: External emails (outside their domain)**
```
gmail_search_emails: "from:me -to:[domain] is:sent larger:100"
```
Pull 10 results, read the 5 most substantive.

**Search 2: Internal structured emails (updates, proposals, recaps)**
```
gmail_search_emails: "from:me to:[domain] is:sent subject:(update OR summary OR recap OR proposal OR plan OR review)"
```
Pull 10 results, read the 5 most substantive.

**Search 3: Casual and relationship emails**
```
gmail_search_emails: "from:me is:sent (hey OR hi there OR congrats OR catch up) -subject:invitation -subject:canceled -subject:accepted"
```
Pull 10 results, read the 5 most substantive.

**Search 4: Quick internal replies**
```
gmail_search_emails: "from:me is:sent to:[domain] (thanks OR thx OR appreciate)"
```
Pull 10 results, read 5 that are not duplicates from other searches.

**Search 5: Longer-form writing**
```
gmail_search_emails: "from:me is:sent larger:500"
```
Pull 10 results, read 3 genuine long-form emails (not forwarded chains).

For each email read via `gmail_get_email`, silently catalog:
- Audience type (close team, leadership, cross-functional, external vendor, external client/candidate)
- Formality level (1-5)
- Message length (one-liner, short, medium, long-form)
- Context (outreach, update, request, response, FYI, bad news, delegation, decision)
- Greeting used
- Closing used

Target: 15-20 unique, substantive messages across at least 3 different audience types.

### Phase 2: Pattern Analysis

Analyze all collected samples across 10 categories. For each category, extract the actual pattern from the emails. Use direct quotes as examples.

**Category 1: Audience Registers** (most important)
- How many distinct voices does this person have? (usually 2-4)
- For each register: what audience triggers it, what greeting/closing/structure/formality level?
- Where are the sharpest tone shifts?
- Build a table: audience, greeting pattern, structure pattern, closing pattern, formality (1-5)

**Category 2: Vocabulary and Word Choice**
- Preferred terms and phrases (words used repeatedly)
- Words or phrases never used
- Jargon level
- Casual shorthand that actually appears vs. does not
- Greeting inventory (every distinct greeting observed)
- Closing inventory (every distinct closing, mapped to audience)

**Category 3: Grammatical Patterns**
- Active vs. passive voice ratio
- Contraction frequency (always, sometimes, audience-dependent?)
- Sentence fragment usage
- Serial comma: yes or no?

**Category 4: Punctuation**
- Em dash usage (present or absent?)
- Exclamation point frequency and context
- Double punctuation quirks (??, !!)
- Parenthetical asides
- Colon/semicolon usage
- Unique punctuation habits

**Category 5: Sentence Structure and Length**
- Average sentence length
- Shortest observed sentences
- Longest observed sentences
- Minimum-viable reply patterns

**Category 6: Paragraph and Message Structure**
- Short reply format (greeting + body + closing, or just body?)
- Long email format (sections, order, headers?)
- Bullet list usage
- How they close messages (offer, question, statement, next step?)

**Category 7: Tone and Mood**
- Baseline tone
- Warmth by audience
- How they express enthusiasm, concern, pushback

**Category 8: Communication Patterns**
- Bad news delivery pattern
- Delegation style
- Decision-making in email
- Response to long inbound messages (match length or compress?)

**Category 9: Call-to-Action Patterns**
- How they make asks
- How they close messages needing action
- Urgency creation or open-ended style

**Category 10: Idiosyncrasies**
- Unique phrases appearing multiple times
- Punctuation quirks
- Formatting habits
- Anything distinctly theirs

### Phase 3: Present Findings (STOP HERE)

Present the full analysis organized by category with direct email quotes as examples.

Then add a **"Self-report vs. Reality"** section:
- Where does self-reported style match actual writing? (reinforce)
- Where does it NOT match? (flag; go with what emails show)
- What patterns did the analysis reveal that the person did not mention?

End with: **"Review these findings. Tell me what's accurate, what's off, and what's missing. Once you confirm, I'll generate your tone of voice file."**

Do NOT proceed until the person confirms.

### Phase 4: Generate Tone of Voice File

Once confirmed, produce the file with this structure:

```markdown
# [Name] Tone of Voice Guidelines

## Purpose and Critical Requirements
[Absolute prohibitions derived from analysis. Quality standard.]

## 1. Audience Registers
[Full register table. Each register: audience, greeting, structure, closing, formality, 2-3 real examples.]

## 2. Vocabulary and Word Choice
[Preferred terms, avoided terms, greeting/closing inventories.]

## 3. Grammatical Patterns
[Active/passive, contractions, fragments, serial comma.]

## 4. Punctuation
[All quirks documented with examples.]

## 5. Sentence Structure and Length
[Average length, fragments, minimum-viable patterns.]

## 6. Paragraph and Message Structure
[Short reply format, long email template, bullet usage.]

## 7. Tone and Mood
[Baseline, warmth shifts, enthusiasm/pushback patterns.]

## 8. Communication Patterns
[Bad news, delegation, decisions, response length matching.]

## 9. Idiosyncrasies and Quirks
[Everything unique. This section makes the voice distinctive.]

## 10. Figurative Language
[Colloquialisms, humor style, hyperbole usage if present.]

## Final Reminders
[5-7 most critical rules as imperatives.]

## Quick Reference
Do: [5-7 items]
Don't: [5-7 items]
```

Rules for file generation:
- Every "good" example MUST be a direct quote from their actual emails
- "Bad" examples should be labeled as hypothetical
- If a pattern was not observed, do not invent one
- The audience registers section is the most important; get it right
- Include the person's actual name in the filename and headers

### Phase 5: Offer Next Steps

After saving the file, explain:
- "This file goes in your project's `context/` folder. Any AI tool that reads it before generating content will write in your voice."
- "The audience registers are the most powerful part. When you ask AI to write an email, tell it who the audience is and it will pick the right voice."
- "This is a living document. When you notice AI getting your voice wrong, update the file. Add new examples, remove patterns that have changed."

Offer:
- "Want me to test it? Give me a scenario (e.g., 'write a reply to my manager declining a meeting') and I'll draft it using your tone file."

---

## Evidence Quality Rules

### What Counts as a Pattern
- A behavior observed in 3+ emails across different contexts = strong pattern
- A behavior observed in 2 emails = possible pattern (flag as "observed twice")
- A behavior observed once = anecdote, not a pattern (mention in analysis, do not codify as a rule)

### What Does NOT Count
- What the person says they do but emails don't show
- Patterns from a single outlier email (bad day, unusual context)
- Formatting imposed by email clients (signatures, disclaimers)

## What NOT to Do

- Do not read emails the person asked you to skip
- Do not include actual email content (names, deals, projects) in the output file beyond short quoted phrases demonstrating style
- Do not guess at patterns not supported by evidence
- Do not generate a generic tone guide if samples are too few; say "I need more samples" and suggest additional searches
- Do not proceed past Phase 3 without confirmation
- Do not include PII from email recipients in the tone file

## Gmail MCP Tool Reference

This skill requires a Gmail MCP with these capabilities:
- `gmail_search_emails` (or equivalent): search sent messages with Gmail query syntax
- `gmail_get_email` (or equivalent): read full email body by message ID

Common MCP server names that provide these tools:
- `google-workspace` (official Google Workspace MCP)
- `gmail` (standalone Gmail MCP servers)
- Any MCP providing Gmail read access to sent messages

If the tool names differ in your installation, map them:
- Search tool = whatever searches Gmail messages
- Read tool = whatever retrieves a full email by ID

## Context Files Required

| File | Purpose |
|------|---------|
| `context/guardrails.md` | Output constraints (no invented data, formatting rules) |

No other context files needed. This skill generates context; it does not consume it.
