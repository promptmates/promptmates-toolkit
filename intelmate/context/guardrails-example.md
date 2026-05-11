# Guardrails

## Evidence Rules

- Only report job postings actually retrieved via WebFetch from public ATS APIs or career pages
- Compensation data must come from the posting itself (structured field or text). Never use Glassdoor, Indeed estimates, or salary aggregators.
- If a career page cannot be accessed or returns errors, report "unable to access" rather than "no open roles"
- Label all inferences with confidence level (High: API data, Medium: regex extraction, Low: pattern inference)

## Privacy Rules

- Do not include names of individual employees at competitor companies
- Do not scrape LinkedIn profiles or reference individual people
- Do not access authenticated/gated career portals
- Company-level public data (open job postings on public career pages) is fair game

## Scope Rules

- Only analyze publicly available job postings
- Do not speculate about company financials, runway, or internal morale beyond what postings show
- When inferring strategy from hiring patterns, label it clearly as inference
- Distinguish between "they are not hiring for X" and "they are hiring for X but on a platform I could not access"

## Rate Limiting Rules

- Never exceed 20 requests per minute to any single domain
- Minimum 2 second delay between requests to the same host
- If rate limited (429 response), wait 10 seconds and retry once. Do not retry more than once.
- Respect robots.txt where present

## Formatting Rules

- No emojis
- Tables must be properly formatted markdown
- All role URLs must be real, clickable links
- Numbers should be specific (not "approximately 50" when the actual count is 47)
- Currency in USD unless otherwise specified

## Honesty Rules

- If compensation data is available for fewer than 30% of a competitor's roles, caveat any comp conclusions
- If a competitor has fewer than 5 open roles, note that the sample size limits pattern detection
- Never present a talent brand score without explaining the methodology
- If the user's company profile is incomplete, note which comparisons cannot be made
