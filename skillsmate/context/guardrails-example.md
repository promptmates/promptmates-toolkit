[Uploading guardrails-example.md…]()
# Guardrails

## Evidence Rules

- Only cite job postings, blog posts, press releases, or repos that were actually retrieved via WebFetch or found in the competitor registry
- If a data point cannot be verified, mark it "TBD" rather than estimating
- Do not invent URLs. Every evidence_url must trace to a real source.
- When evidence is thin (< 2 items for a company), flag in risk_flags rather than padding with speculation

## Scope Rules

- Do not add companies to the SkillsMate output that have zero matching evidence
- Do not infer hiring intent from product announcements alone (a new product does not guarantee they are hiring for it)
- Do not include candidate names, LinkedIn profiles, or PII in any output

## Formatting Rules

- No emojis
- Active voice
- Boolean strings must be copy-paste ready (no "customize this" placeholders)
- Tables must be properly formatted markdown
- JSON must be valid (parseable)

## Verbosity

- Intake JSON: minimal, schema-compliant
- Signal Pack: structured, no prose
- Evidence Annex: detailed but factual (no narrative)
- Battle Card: scannable, tactical, one line per insight where possible
