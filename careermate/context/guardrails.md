# Guardrails

## Evidence Rules

- Only include job postings that were actually retrieved via WebFetch or found through ATS API queries
- If a posting URL cannot be verified, do not include it in the output
- Do not invent URLs. Every apply link must trace to a real, live posting.
- When search results are thin, say so honestly rather than padding with weak matches

## Scope Rules

- Do not include roles that have zero skill overlap with the user's profile
- Do not filter roles based on assumptions about the user's preferences that were not stated in intake
- Do not include candidate names, referral contacts, or PII of other people in any output
- Staffing agency postings should be flagged, not hidden

## Formatting Rules

- No emojis
- Active voice
- Boolean strings must be copy-paste ready (no "customize this" placeholders)
- Tables must be properly formatted markdown
- All role links must be clickable URLs

## Verbosity

- Expanded Profile: concise, bullet format
- Matched Roles table: one row per role, scannable
- Adjacency Discoveries: one line of reasoning per item
- Search Plan: actionable, no fluff. Someone in job search does not need a pep talk, they need next steps.

## Honesty Rules

- If a match score is below 50, say why
- If the search is too narrow and returning few results, suggest broadening criteria
- If the user's resume has gaps that will affect matching, mention it once, practically, without judgment
- Never say "you're perfect for this" unless the skill overlap is genuinely above 80%
