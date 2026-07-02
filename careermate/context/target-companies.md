# Target Companies

Verified ATS board tokens for live API search. Confirmed working July 2026. 90 boards across 3 platforms.

## How This Works

The agent searches these boards during Phase 2. You can customize this list:
- Add companies you're interested in
- Remove industries that don't apply
- The agent will search ALL of these unless your preferences filter some out

## API Endpoints

| Platform | URL Pattern | Auth Required |
|----------|-------------|---------------|
| Greenhouse | `https://boards-api.greenhouse.io/v1/boards/{token}/jobs` | No |
| Lever | `https://api.lever.co/v0/postings/{slug}?mode=json` | No |
| Ashby | `https://api.ashbyhq.com/posting-api/job-board/{slug}` | No |

---

## Greenhouse Boards (55 verified)

### AI / ML
| Company | Token | ~Jobs | Notes |
|---------|-------|-------|-------|
| Anthropic | anthropic | 390 | AI safety, SF, hybrid |
| Scale AI | scaleai | 179 | AI data infrastructure |
| Together AI | togetherai | 56 | Open-source AI infra |
| Inflection AI | inflectionai | 5 | Personal AI |
| DeepMind | deepmind | 10 | Google AI research |
| Weights & Biases | weights_and_biases | 8 | ML ops platform |
| Stability AI | stabilityai | 1 | Image generation (small) |

### Growth-Stage Tech
| Company | Token | ~Jobs | Notes |
|---------|-------|-------|-------|
| Figma | figma | 171 | Design platform |
| Vercel | vercel | 65 | Frontend deployment |
| Webflow | webflow | 24 | Visual web dev |
| Discord | discord | 61 | Community platform |
| LaunchDarkly | launchdarkly | 36 | Feature flags |
| Amplitude | amplitude | 49 | Product analytics |
| PlanetScale | planetscale | 12 | Serverless databases |
| Netlify | netlify | 4 | Web deployment |

### Enterprise SaaS
| Company | Token | ~Jobs | Notes |
|---------|-------|-------|-------|
| Stripe | stripe | 490 | Payments infrastructure |
| Okta | okta | 371 | Identity / security |
| Samsara | samsara | 326 | IoT / operations |
| Verkada | verkada | 307 | Physical security, onsite-heavy |
| Brex | brex | 257 | Corporate cards |
| Databricks | databricks | 792 | Big data / AI |
| Datadog | datadog | 411 | Observability |
| Cloudflare | cloudflare | 231 | Edge computing / security |
| Twilio | twilio | 153 | Communications APIs |
| HubSpot | hubspotjobs | 157 | Marketing / CRM |
| Intercom | intercom | 140 | Customer messaging |
| GitLab | gitlab | 145 | DevOps, all-remote |
| Toast | toast | 286 | Restaurant tech |
| Instacart | instacart | 157 | Grocery / delivery |

### HR Tech / People
| Company | Token | ~Jobs | Notes |
|---------|-------|-------|-------|
| Lattice | lattice | 11 | Performance management |
| Gusto | gusto | 78 | Payroll / HR for SMB |
| Culture Amp | cultureamp | 18 | Employee engagement |

### Healthcare / Life Sciences
| Company | Token | ~Jobs | Notes |
|---------|-------|-------|-------|
| Veracyte | veracyte | 40 | Genomic diagnostics |
| Flatiron Health | flatironhealth | 24 | Oncology data |
| Ginkgo Bioworks | ginkgobioworks | 15 | Synthetic biology |
| Cerebral | cerebral | 3 | Mental health (small) |

### Fintech
| Company | Token | ~Jobs | Notes |
|---------|-------|-------|-------|
| Coinbase | coinbase | 129 | Crypto (filter if excluded) |
| Robinhood | robinhood | 133 | Trading platform |
| Affirm | affirm | 177 | Buy now pay later |
| SoFi | sofi | 94 | Digital banking |
| Chime | chime | 64 | Neobank |
| Bill.com | billcom | 28 | Business payments |
| Marqeta | marqeta | 32 | Card issuing |
| Mercury | mercury | 53 | Banking for startups |

### Consumer / Marketplace
| Company | Token | ~Jobs | Notes |
|---------|-------|-------|-------|
| Airbnb | airbnb | 224 | Travel / hospitality |
| Duolingo | duolingo | 65 | EdTech |
| Faire | faire | 73 | Wholesale marketplace |
| StockX | stockx | 36 | Sneaker / collectibles |
| Calm | calm | 1 | Wellness (small) |

### Security / Defense
| Company | Token | ~Jobs | Notes |
|---------|-------|-------|-------|
| Chainguard | chainguard | 71 | Supply chain security, remote-first |
| Wiz | wizinc | 165 | Cloud security |
| Orca Security | orcasecurity | 5 | Cloud security (small) |

### Infrastructure
| Company | Token | ~Jobs | Notes |
|---------|-------|-------|-------|
| Flexport | flexport | 127 | Logistics platform |

---

## Ashby Boards (30 verified)

| Company | Token | ~Jobs | Notes |
|---------|-------|-------|-------|
| OpenAI | openai | 719 | AI research, SF onsite |
| Snowflake | snowflake | 420 | Data cloud |
| Notion | notion | 148 | Workspace platform |
| Cohere | cohere | 129 | Enterprise AI |
| Ramp | ramp | 126 | Corporate spend |
| Plaid | plaid | 108 | Financial data APIs |
| Vanta | vanta | 108 | Security compliance |
| Cerebras | cerebras | 96 | AI chips |
| Hims and Hers | hims-and-hers | 80 | Telehealth / DTC |
| Perplexity | perplexity | 79 | AI search |
| ClickUp | clickup | 67 | Project management |
| Ashby | ashby | 59 | ATS / HR tech |
| Drata | drata | 54 | Compliance automation |
| Temporal | temporal | 52 | Workflow orchestration |
| Amplitude | amplitude | 49 | Product analytics (also on GH) |
| Benchling | benchling | 48 | Life sciences R&D |
| Confluent | confluent | 49 | Data streaming |
| Supabase | supabase | 49 | Open-source Firebase |
| Miro | miro | 34 | Visual collaboration |
| Modal | modal | 31 | Serverless compute for AI |
| Poshmark | poshmark | 28 | Fashion marketplace |
| Render | render | 23 | Cloud hosting |
| Linear | linear | 23 | Project management |
| PostHog | posthog | 21 | Product analytics, open-source |
| Character AI | character | 16 | Conversational AI |
| Oyster | oyster | 15 | Global employment |
| Anyscale | anyscale | 13 | Ray / distributed compute |
| Color Health | color-health | 10 | Population health genomics |
| Railway | railway | 9 | App deployment |
| Runway | runway | 4 | Creative AI video |

---

## Lever Boards (5 verified)

| Company | Slug | ~Jobs | Notes |
|---------|------|-------|-------|
| Palantir | palantir | 276 | Data analytics / defense |
| Mistral | mistral | 175 | Open-source AI, Paris + remote |
| Ro | ro | 57 | Telehealth |
| 15Five | 15five | 1 | HR tech (very small) |

---

## Adding Your Own Companies

**To find a board token:**

1. Go to their careers page
2. Click any job posting
3. Look at the URL:
   - `boards.greenhouse.io/COMPANY/jobs/123` -> token is `COMPANY`
   - `job-boards.greenhouse.io/COMPANY/jobs/123` -> token is `COMPANY`
   - `jobs.lever.co/COMPANY/abc-123` -> slug is `COMPANY`
   - `jobs.ashbyhq.com/COMPANY` -> Ashby token is `COMPANY`
4. Add it to the appropriate section above

**Or run the discovery script:**

```bash
python3 scripts/discover_boards.py --company "Company Name"
```

This tries common token patterns across all 3 platforms and reports which one works.

**To discover boards for a whole list:**

```bash
python3 scripts/discover_boards.py --file my_companies.txt --output results.md
```

---

## Search Priority

When running a search, the agent should:
1. Start with companies matching the user's industry preferences
2. Always include AI/ML companies (they hire across all functions)
3. Always include HR Tech companies (if user has People/TA background)
4. Search at least 20 boards per run for meaningful coverage
5. Skip any board that returns a 404 without retrying
6. Prioritize boards with 50+ jobs (more likely to have diverse roles)
