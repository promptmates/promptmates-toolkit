#!/usr/bin/env python3
"""
CareerMate: Who's Hiring in TA/People Right Now?

Searches all verified ATS boards for open roles in talent acquisition,
recruiting operations, people systems, people intelligence, and adjacent
functions. Returns a live snapshot of what's open today.

Usage:
    python3 find_ta_roles.py                        # Full search, all roles
    python3 find_ta_roles.py --leadership           # Director+ roles only
    python3 find_ta_roles.py --remote               # Remote-eligible only
    python3 find_ta_roles.py --us                   # US-based only (inc. remote US)
    python3 find_ta_roles.py --focus ops            # Filter by sub-function
    python3 find_ta_roles.py --json                 # Output as JSON
    python3 find_ta_roles.py --output roles.md      # Write to file

Focus areas (--focus):
    recruiting    Recruiters, sourcers, recruiting managers
    ops           Recruiting ops, talent ops, coordinators, enablement
    systems       People technology, HRIS, people systems, Workday
    analytics     People analytics, data engineers (people), workforce intelligence
    leadership    Head of, Director, VP, Chief People roles
    partners      People partners, HRBPs
    all           Everything (default)

Requires: Python 3.8+, no external dependencies
"""

import argparse
import json
import sys
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor
from collections import defaultdict
from datetime import datetime


# --- Role classification ---

FOCUS_KEYWORDS = {
    "recruiting": [
        "recruiter", "recruiting", "talent acquisition", "sourcer", "sourcing",
        "candidate experience", "employer brand", "early career recruiting",
        "executive search", "university recruiter"
    ],
    "ops": [
        "recruiting operations", "talent operations", "recruiting ops", "TA ops",
        "recruiting coordinator", "talent coordinator", "recruiting enablement",
        "recruiting program", "talent program", "recruiting optimization"
    ],
    "systems": [
        "people technology", "people systems", "HRIS", "people tech",
        "workday", "recruiting systems", "recruiting tech", "HR technology",
        "people ops", "people operations", "digital solutions"
    ],
    "analytics": [
        "people analytics", "people intelligence", "workforce intelligence",
        "people data", "people science", "talent intelligence",
        "workforce planning", "people research"
    ],
    "leadership": [
        "head of talent", "head of people", "head of recruiting",
        "director of talent", "director, talent", "director of people",
        "director, people", "director, recruiting", "VP talent", "VP people",
        "VP recruiting", "chief people", "chief talent",
        "senior director", "senior manager, head of"
    ],
    "partners": [
        "people partner", "HR business partner", "HRBP",
        "talent partner", "people business partner"
    ],
}

# False positive exclusions
EXCLUDE_PATTERNS = [
    "data center sourcing", "supply chain", "hardware sourcing",
    "strategic sourcing lead", "procurement sourcing",
    "sales workforce", "federal civilian", "account executive",
    "education & workforce development", "workforce development program",
    "sourcing manager, data center", "operations sourcing manager"
]


def classify_role(title):
    """Return which focus areas a role belongs to."""
    title_lower = title.lower()

    # Exclude false positives
    for pattern in EXCLUDE_PATTERNS:
        if pattern in title_lower:
            return []

    areas = []
    for area, keywords in FOCUS_KEYWORDS.items():
        for kw in keywords:
            if kw.lower() in title_lower:
                areas.append(area)
                break

    return areas


def is_remote(location):
    """Check if a location string indicates remote work."""
    loc_lower = location.lower() if location else ""
    return any(term in loc_lower for term in [
        "remote", "virtual", "work from home", "distributed", "anywhere"
    ])


def is_us(location):
    """Check if a location string indicates US-based."""
    loc_lower = location.lower() if location else ""
    us_signals = [
        "united states", "usa", "us-", "remote - us", "remote us",
        "san francisco", "new york", "seattle", "austin", "denver",
        "chicago", "boston", "los angeles", "portland", "atlanta",
        "salt lake", "pittsburgh", "washington", "california",
        "colorado", "texas", "illinois", "massachusetts", "georgia",
        "pennsylvania", "arizona", "ohio", "utah", "oregon",
        ", ca", ", ny", ", tx", ", wa", ", co", ", il", ", ma",
        ", pa", ", az", ", oh", ", ut", ", or", ", ga"
    ]
    return any(s in loc_lower for s in us_signals)


def is_leadership(title):
    """Check if a title is Director+ level."""
    title_lower = title.lower()
    leadership_signals = [
        "head of", "director", "vp ", "vice president",
        "chief ", "senior director", "senior manager, head"
    ]
    return any(s in title_lower for s in leadership_signals)


# --- Board search functions ---

def search_greenhouse(token, company):
    """Search a Greenhouse board for TA/People roles."""
    url = f"https://boards-api.greenhouse.io/v1/boards/{token}/jobs"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "CareerMate/1.0"})
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode())
            jobs = data.get("jobs", [])
            matches = []
            for j in jobs:
                title = j.get("title", "")
                areas = classify_role(title)
                if areas:
                    loc = j.get("location", {}).get("name", "Unknown")
                    matches.append({
                        "title": title,
                        "company": company,
                        "platform": "greenhouse",
                        "location": loc,
                        "focus_areas": areas,
                        "url": j.get("absolute_url", f"https://boards.greenhouse.io/{token}/jobs/{j.get('id')}"),
                        "remote": is_remote(loc),
                        "us": is_us(loc),
                        "leadership": is_leadership(title),
                    })
            return matches
    except:
        return []


def search_ashby(slug, company):
    """Search an Ashby board for TA/People roles."""
    url = f"https://api.ashbyhq.com/posting-api/job-board/{slug}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "CareerMate/1.0"})
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode())
            jobs = data.get("jobs", [])
            matches = []
            for j in jobs:
                title = j.get("title", "")
                areas = classify_role(title)
                if areas:
                    loc = j.get("location", "Unknown")
                    matches.append({
                        "title": title,
                        "company": company,
                        "platform": "ashby",
                        "location": loc,
                        "focus_areas": areas,
                        "url": f"https://jobs.ashbyhq.com/{slug}/{j.get('id', '')}",
                        "remote": is_remote(loc),
                        "us": is_us(loc),
                        "leadership": is_leadership(title),
                    })
            return matches
    except:
        return []


def search_lever(slug, company):
    """Search a Lever board for TA/People roles."""
    url = f"https://api.lever.co/v0/postings/{slug}?mode=json"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "CareerMate/1.0"})
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode())
            if not isinstance(data, list):
                return []
            matches = []
            for j in data:
                title = j.get("text", "")
                areas = classify_role(title)
                if areas:
                    loc = j.get("categories", {}).get("location", "Unknown")
                    matches.append({
                        "title": title,
                        "company": company,
                        "platform": "lever",
                        "location": loc,
                        "focus_areas": areas,
                        "url": j.get("hostedUrl", ""),
                        "remote": is_remote(loc),
                        "us": is_us(loc),
                        "leadership": is_leadership(title),
                    })
            return matches
    except:
        return []


# --- Verified board registry ---

GREENHOUSE_BOARDS = [
    ("anthropic", "Anthropic"), ("scaleai", "Scale AI"), ("togetherai", "Together AI"),
    ("inflectionai", "Inflection AI"), ("deepmind", "DeepMind"),
    ("weights_and_biases", "Weights & Biases"), ("stabilityai", "Stability AI"),
    ("figma", "Figma"), ("vercel", "Vercel"), ("webflow", "Webflow"),
    ("discord", "Discord"), ("launchdarkly", "LaunchDarkly"),
    ("amplitude", "Amplitude"), ("planetscale", "PlanetScale"), ("netlify", "Netlify"),
    ("stripe", "Stripe"), ("okta", "Okta"), ("samsara", "Samsara"),
    ("verkada", "Verkada"), ("brex", "Brex"), ("databricks", "Databricks"),
    ("datadog", "Datadog"), ("cloudflare", "Cloudflare"), ("twilio", "Twilio"),
    ("hubspotjobs", "HubSpot"), ("intercom", "Intercom"), ("gitlab", "GitLab"),
    ("toast", "Toast"), ("instacart", "Instacart"), ("lattice", "Lattice"),
    ("gusto", "Gusto"), ("cultureamp", "Culture Amp"), ("veracyte", "Veracyte"),
    ("flatironhealth", "Flatiron Health"), ("ginkgobioworks", "Ginkgo Bioworks"),
    ("coinbase", "Coinbase"), ("robinhood", "Robinhood"), ("affirm", "Affirm"),
    ("sofi", "SoFi"), ("chime", "Chime"), ("billcom", "Bill.com"),
    ("marqeta", "Marqeta"), ("mercury", "Mercury"), ("airbnb", "Airbnb"),
    ("duolingo", "Duolingo"), ("faire", "Faire"), ("stockx", "StockX"),
    ("chainguard", "Chainguard"), ("wizinc", "Wiz"), ("flexport", "Flexport"),
]

ASHBY_BOARDS = [
    ("openai", "OpenAI"), ("snowflake", "Snowflake"), ("notion", "Notion"),
    ("cohere", "Cohere"), ("ramp", "Ramp"), ("plaid", "Plaid"),
    ("vanta", "Vanta"), ("cerebras", "Cerebras"), ("hims-and-hers", "Hims & Hers"),
    ("perplexity", "Perplexity"), ("clickup", "ClickUp"), ("ashby", "Ashby"),
    ("drata", "Drata"), ("temporal", "Temporal"), ("benchling", "Benchling"),
    ("confluent", "Confluent"), ("supabase", "Supabase"), ("miro", "Miro"),
    ("modal", "Modal"), ("poshmark", "Poshmark"), ("render", "Render"),
    ("linear", "Linear"), ("posthog", "PostHog"), ("character", "Character AI"),
    ("oyster", "Oyster"), ("anyscale", "Anyscale"), ("color-health", "Color Health"),
    ("railway", "Railway"), ("runway", "Runway"),
]

LEVER_BOARDS = [
    ("palantir", "Palantir"), ("mistral", "Mistral"), ("ro", "Ro"),
    ("spotify", "Spotify"),
]


# --- Output formatting ---

def format_markdown(roles, focus_filter=None, show_urls=True):
    """Format roles as readable markdown."""
    lines = []
    today = datetime.now().strftime("%Y-%m-%d")
    lines.append(f"# Who's Hiring in TA/People ({today})")
    lines.append(f"\n{len(roles)} open roles across {len(set(r['company'] for r in roles))} companies\n")

    if focus_filter and focus_filter != "all":
        lines.append(f"**Filtered to:** {focus_filter}\n")

    # Group by company
    by_company = defaultdict(list)
    for r in roles:
        by_company[r["company"]].append(r)

    # Sort companies by number of roles (most hiring first)
    for company in sorted(by_company.keys(), key=lambda c: -len(by_company[c])):
        company_roles = by_company[company]
        lines.append(f"\n## {company} ({len(company_roles)} roles)\n")

        for r in sorted(company_roles, key=lambda x: x["title"]):
            badges = []
            if r["remote"]:
                badges.append("REMOTE")
            if r["leadership"]:
                badges.append("LEADERSHIP")
            badge_str = f" [{', '.join(badges)}]" if badges else ""

            lines.append(f"- **{r['title']}**{badge_str}")
            lines.append(f"  {r['location']}")
            if show_urls:
                lines.append(f"  {r['url']}")
            lines.append("")

    return "\n".join(lines)


def format_summary(roles):
    """Print a quick summary to stderr."""
    total = len(roles)
    companies = len(set(r["company"] for r in roles))
    remote = len([r for r in roles if r["remote"]])
    us = len([r for r in roles if r["us"]])
    leadership = len([r for r in roles if r["leadership"]])

    by_area = defaultdict(int)
    for r in roles:
        for area in r["focus_areas"]:
            by_area[area] += 1

    print(f"\n{'='*60}", file=sys.stderr)
    print(f"  {total} roles | {companies} companies | {remote} remote | {leadership} leadership", file=sys.stderr)
    print(f"{'='*60}", file=sys.stderr)
    print(f"\n  By function:", file=sys.stderr)
    for area in ["recruiting", "ops", "systems", "analytics", "leadership", "partners"]:
        count = by_area.get(area, 0)
        bar = "#" * min(count, 40)
        print(f"    {area:<12} {count:>3}  {bar}", file=sys.stderr)
    print(f"\n  US-based: {us} | Remote-eligible: {remote}", file=sys.stderr)
    print(f"{'='*60}\n", file=sys.stderr)


# --- Main ---

def main():
    parser = argparse.ArgumentParser(
        description="Find open TA/People roles across 90 company boards"
    )
    parser.add_argument("--focus", default="all",
                        choices=["recruiting", "ops", "systems", "analytics",
                                 "leadership", "partners", "all"],
                        help="Filter by sub-function (default: all)")
    parser.add_argument("--remote", action="store_true",
                        help="Only show remote-eligible roles")
    parser.add_argument("--us", action="store_true",
                        help="Only show US-based roles (includes remote US)")
    parser.add_argument("--leadership", action="store_true",
                        help="Only show Director+ level roles")
    parser.add_argument("--json", action="store_true",
                        help="Output as JSON")
    parser.add_argument("--output", help="Write results to file")
    parser.add_argument("--workers", type=int, default=15,
                        help="Parallel workers (default: 15)")
    parser.add_argument("--no-urls", action="store_true",
                        help="Hide URLs in markdown output")

    args = parser.parse_args()

    print(f"Searching {len(GREENHOUSE_BOARDS)} Greenhouse + "
          f"{len(ASHBY_BOARDS)} Ashby + {len(LEVER_BOARDS)} Lever boards...\n",
          file=sys.stderr)

    all_roles = []

    # Search all platforms in parallel
    with ThreadPoolExecutor(max_workers=args.workers) as ex:
        # Greenhouse
        gh_results = list(ex.map(lambda b: search_greenhouse(b[0], b[1]), GREENHOUSE_BOARDS))
        for results in gh_results:
            all_roles.extend(results)
        print(f"  Greenhouse: {len(all_roles)} roles found", file=sys.stderr)

        # Ashby
        ashby_count_before = len(all_roles)
        ashby_results = list(ex.map(lambda b: search_ashby(b[0], b[1]), ASHBY_BOARDS))
        for results in ashby_results:
            all_roles.extend(results)
        print(f"  Ashby: {len(all_roles) - ashby_count_before} roles found", file=sys.stderr)

        # Lever
        lever_count_before = len(all_roles)
        lever_results = list(ex.map(lambda b: search_lever(b[0], b[1]), LEVER_BOARDS))
        for results in lever_results:
            all_roles.extend(results)
        print(f"  Lever: {len(all_roles) - lever_count_before} roles found", file=sys.stderr)

    # Apply filters
    filtered = all_roles

    if args.focus != "all":
        filtered = [r for r in filtered if args.focus in r["focus_areas"]]

    if args.remote:
        filtered = [r for r in filtered if r["remote"]]

    if args.us:
        filtered = [r for r in filtered if r["us"]]

    if args.leadership:
        filtered = [r for r in filtered if r["leadership"]]

    # Summary
    format_summary(filtered)

    # Output
    if args.json:
        output = json.dumps(filtered, indent=2)
    else:
        output = format_markdown(filtered, focus_filter=args.focus, show_urls=not args.no_urls)

    if args.output:
        with open(args.output, "w") as f:
            f.write(output)
        print(f"Results written to {args.output}", file=sys.stderr)
    else:
        print(output)


if __name__ == "__main__":
    main()
