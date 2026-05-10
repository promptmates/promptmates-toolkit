# Guardrails

## Evidence Rules

- Only document patterns that appear in 3+ real emails (2 for flagging, never 1)
- Every "good" example in the tone file must be a direct quote from actual sent messages
- "Bad" examples are labeled as hypothetical; never imply the person actually wrote them
- If a category has insufficient evidence, say so rather than padding with guesses

## Privacy Rules

- Do not include full names of email recipients in the tone of voice output file
- Do not include deal names, project names, or company-sensitive content in examples
- Quoted phrases should demonstrate style patterns only; strip identifiable context
- The tone file should be safe to share publicly without revealing private communications

## Scope Rules

- Only analyze emails the person has explicitly authorized (within their stated time window)
- Skip any threads the person flagged as off-limits
- Do not read emails from other senders in threads; only analyze the person's own writing
- Calendar invites, auto-replies, and forwarded content without added text do not count as writing samples

## Formatting Rules

- No emojis in the generated tone file
- Use markdown formatting consistently
- Tables must be properly formatted
- Direct quotes should be in quotes and italicized or blockquoted
- The tone file should be readable by both humans and AI tools

## Honesty Rules

- If self-reported style contradicts email evidence, go with the emails
- If fewer than 10 substantive samples are found, warn that the analysis may be incomplete
- If all samples are from one audience type, warn that register detection will be limited
- Never tell the person their writing is "good" or "bad"; just document what it is
