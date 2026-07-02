#!/usr/bin/env python3
"""
CareerMate Board Token Discovery Script

Takes a list of company names and discovers working ATS board tokens
across Greenhouse, Lever, and Ashby. Outputs verified tokens to stdout
and optionally appends to target-companies.md.

Usage:
    python3 discover_boards.py                          # Run against built-in lists
    python3 discover_boards.py --file companies.txt    # One company name per line
    python3 discover_boards.py --company "Notion"      # Single company
    python3 discover_boards.py --update                 # Write results to target-companies.md

Requires: Python 3.8+, no external dependencies (uses urllib only)
"""

import argparse
import json
import sys
import time
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path


# --- Token generation patterns ---

def generate_greenhouse_tokens(company_name):
    """Generate plausible Greenhouse board tokens from a company name."""
    name = company_name.lower().strip()
    # Remove common suffixes
    for suffix in [" inc", " inc.", " co", " co.", " llc", " ltd", " corp", " corporation",
                   " technologies", " technology", " labs", " lab", " ai", " io"]:
        if name.endswith(suffix):
            name = name[:-len(suffix)].strip()

    base = name.replace(" ", "").replace("-", "").replace(".", "").replace("'", "")
    hyphenated = name.replace(" ", "-").replace(".", "").replace("'", "")
    underscored = name.replace(" ", "_").replace(".", "").replace("'", "")

    tokens = [
        base,                    # "notion"
        hyphenated,              # "palo-alto-networks"
        f"{base}hq",            # "notionhq"
        f"{base}inc",           # "notioninc"
        f"{base}io",            # "notio" (unlikely but covers patterns)
        f"{base}ai",            # "scaleai"
        f"{base}app",           # "notionapp"
        f"{base}jobs",          # "notionjobs"
        underscored,            # "palo_alto_networks"
        f"{base}careers",       # "notioncareers"
    ]

    # Also try with the original suffixes reattached differently
    if "ai" in company_name.lower():
        tokens.append(name.replace(" ", "") + "ai")
        tokens.append(name.replace(" ", "").replace("ai", "") + "ai")

    # Deduplicate while preserving order
    seen = set()
    unique = []
    for t in tokens:
        if t not in seen and t:
            seen.add(t)
            unique.append(t)
    return unique


def generate_lever_slugs(company_name):
    """Generate plausible Lever posting slugs from a company name."""
    name = company_name.lower().strip()
    for suffix in [" inc", " inc.", " co", " co.", " llc", " ltd", " corp",
                   " technologies", " technology", " labs", " lab", " ai", " io"]:
        if name.endswith(suffix):
            name = name[:-len(suffix)].strip()

    base = name.replace(" ", "").replace(".", "").replace("'", "")
    hyphenated = name.replace(" ", "-").replace(".", "").replace("'", "")

    return list(dict.fromkeys([
        base,
        hyphenated,
        f"{base}-ai",
        f"{base}hq",
    ]))


def generate_ashby_slugs(company_name):
    """Generate plausible Ashby board slugs from a company name."""
    name = company_name.lower().strip()
    for suffix in [" inc", " inc.", " co", " co.", " llc", " ltd", " corp",
                   " technologies", " technology", " labs", " lab", " ai", " io"]:
        if name.endswith(suffix):
            name = name[:-len(suffix)].strip()

    base = name.replace(" ", "").replace(".", "").replace("'", "")
    hyphenated = name.replace(" ", "-").replace(".", "").replace("'", "")

    return list(dict.fromkeys([
        base,
        hyphenated,
        f"{base}hq",
    ]))


# --- Verification functions ---

def check_greenhouse(token, timeout=8):
    """Check if a Greenhouse board token is valid and has jobs."""
    url = f"https://boards-api.greenhouse.io/v1/boards/{token}/jobs"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "CareerMate/1.0"})
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = json.loads(resp.read().decode())
            jobs = data.get("jobs", [])
            if jobs:
                return {
                    "platform": "greenhouse",
                    "token": token,
                    "job_count": len(jobs),
                    "url": url,
                    "sample_titles": [j.get("title", "") for j in jobs[:3]]
                }
    except (urllib.error.HTTPError, urllib.error.URLError, json.JSONDecodeError, TimeoutError):
        pass
    return None


def check_lever(slug, timeout=8):
    """Check if a Lever posting slug is valid and has jobs."""
    url = f"https://api.lever.co/v0/postings/{slug}?mode=json"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "CareerMate/1.0"})
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = json.loads(resp.read().decode())
            if isinstance(data, list) and len(data) > 0:
                return {
                    "platform": "lever",
                    "token": slug,
                    "job_count": len(data),
                    "url": f"https://jobs.lever.co/{slug}",
                    "sample_titles": [j.get("text", "") for j in data[:3]]
                }
    except (urllib.error.HTTPError, urllib.error.URLError, json.JSONDecodeError, TimeoutError):
        pass
    return None


def check_ashby(slug, timeout=8):
    """Check if an Ashby board exists via their Posting API."""
    url = f"https://api.ashbyhq.com/posting-api/job-board/{slug}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "CareerMate/1.0"})
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = json.loads(resp.read().decode())
            jobs = data.get("jobs", [])
            if jobs:
                return {
                    "platform": "ashby",
                    "token": slug,
                    "job_count": len(jobs),
                    "url": f"https://jobs.ashbyhq.com/{slug}",
                    "sample_titles": [j.get("title", "") for j in jobs[:3]]
                }
    except (urllib.error.HTTPError, urllib.error.URLError, json.JSONDecodeError, TimeoutError):
        pass
    return None


# --- Discovery orchestration ---

def discover_company(company_name, platforms=None):
    """Try all platforms for a single company. Returns first hit per platform."""
    if platforms is None:
        platforms = ["greenhouse", "lever", "ashby"]

    results = []

    if "greenhouse" in platforms:
        for token in generate_greenhouse_tokens(company_name):
            result = check_greenhouse(token)
            if result:
                result["company"] = company_name
                results.append(result)
                break  # One hit per platform is enough

    if "lever" in platforms:
        for slug in generate_lever_slugs(company_name):
            result = check_lever(slug)
            if result:
                result["company"] = company_name
                results.append(result)
                break

    if "ashby" in platforms:
        for slug in generate_ashby_slugs(company_name):
            result = check_ashby(slug)
            if result:
                result["company"] = company_name
                results.append(result)
                break

    return results


def discover_batch(companies, platforms=None, max_workers=10):
    """Discover board tokens for a batch of companies in parallel."""
    all_results = []
    total = len(companies)

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {
            executor.submit(discover_company, company, platforms): company
            for company in companies
        }

        completed = 0
        for future in as_completed(futures):
            completed += 1
            company = futures[future]
            try:
                results = future.result()
                if results:
                    all_results.extend(results)
                    for r in results:
                        count = r["job_count"] if r["job_count"] > 0 else "?"
                        print(f"  [{completed}/{total}] {r['company']}: "
                              f"{r['platform']} ({r['token']}) - {count} jobs",
                              file=sys.stderr)
                else:
                    print(f"  [{completed}/{total}] {company}: no boards found",
                          file=sys.stderr)
            except Exception as e:
                print(f"  [{completed}/{total}] {company}: error - {e}",
                      file=sys.stderr)

    return all_results


# --- Output formatting ---

def format_results_table(results):
    """Format results as a markdown table grouped by platform."""
    output = []

    for platform in ["greenhouse", "lever", "ashby"]:
        platform_results = [r for r in results if r["platform"] == platform]
        if not platform_results:
            continue

        output.append(f"\n## {platform.title()} Boards (discovered)\n")
        output.append("| Company | Token | Jobs | Sample Titles |")
        output.append("|---------|-------|------|---------------|")

        for r in sorted(platform_results, key=lambda x: x["company"]):
            count = str(r["job_count"]) if r["job_count"] > 0 else "?"
            titles = "; ".join(r["sample_titles"][:2])
            if len(titles) > 60:
                titles = titles[:57] + "..."
            output.append(f"| {r['company']} | {r['token']} | {count} | {titles} |")

    return "\n".join(output)


def format_results_json(results):
    """Format results as JSON for programmatic use."""
    return json.dumps(results, indent=2)


# --- Built-in company lists ---

# Forbes Cloud 100 + YC top companies + Inc 5000 tech subset
DEFAULT_COMPANIES = [
    # AI / ML
    "OpenAI", "Anthropic", "Scale AI", "Hugging Face", "Cohere", "Mistral",
    "Perplexity", "Runway", "Stability AI", "Inflection AI", "Character AI",
    "Weights and Biases", "Anyscale", "Modal", "Replicate", "Together AI",
    "Cerebras", "SambaNova", "Adept AI", "DeepMind",
    # Growth-stage tech
    "Figma", "Notion", "Airtable", "Linear", "Vercel", "Webflow",
    "Retool", "Miro", "Loom", "Canva", "Amplitude", "LaunchDarkly",
    "PostHog", "Supabase", "PlanetScale", "Railway", "Fly.io",
    # Enterprise SaaS
    "Stripe", "Brex", "Ramp", "Mercury", "Plaid", "Marqeta",
    "GitLab", "GitHub", "Atlassian", "Confluent", "Databricks",
    "Snowflake", "Datadog", "Cloudflare", "CrowdStrike",
    "Okta", "Auth0", "OneLogin",
    "HubSpot", "Salesforce", "ServiceNow",
    "Twilio", "Sendgrid", "Segment",
    "Slack", "Discord", "Zoom",
    # Fintech
    "Coinbase", "Robinhood", "Chime", "SoFi", "Affirm",
    "Navan", "Expensify", "Bill.com", "Gusto",
    # Healthcare / Life Sciences
    "Tempus", "Benchling", "Flatiron Health", "Color Health",
    "Veracyte", "23andMe", "Ginkgo Bioworks",
    "Ro", "Hims and Hers", "Cerebral",
    # HR Tech / People
    "Lattice", "Rippling", "Deel", "Remote", "Oyster",
    "Gem", "Ashby", "Lever", "BambooHR", "Personio",
    "Culture Amp", "15Five", "Workday",
    # Consumer / Marketplace
    "Airbnb", "DoorDash", "Instacart", "Faire",
    "Duolingo", "Calm", "Headspace",
    "Etsy", "Poshmark", "StockX",
    # Security
    "Snyk", "Chainguard", "Wiz", "Lacework", "Orca Security",
    "Verkada", "Anduril", "Palantir",
    # Infrastructure
    "HashiCorp", "Pulumi", "Temporal", "Cockroach Labs",
    "DigitalOcean", "Render", "Netlify",
    # Other notable
    "Flexport", "Samsara", "Toast", "Procore",
    "Vanta", "Drata", "Moveworks", "Intercom",
    "Notion", "Coda", "ClickUp",
]


# --- Main ---

def main():
    parser = argparse.ArgumentParser(
        description="Discover ATS board tokens for companies"
    )
    parser.add_argument("--file", help="File with one company name per line")
    parser.add_argument("--company", help="Single company to check")
    parser.add_argument("--platforms", default="greenhouse,lever,ashby",
                        help="Comma-separated platforms to check (default: all)")
    parser.add_argument("--workers", type=int, default=10,
                        help="Parallel workers (default: 10)")
    parser.add_argument("--json", action="store_true",
                        help="Output as JSON instead of markdown")
    parser.add_argument("--update", action="store_true",
                        help="Append results to context/target-companies.md")
    parser.add_argument("--output", help="Write results to this file")

    args = parser.parse_args()
    platforms = [p.strip() for p in args.platforms.split(",")]

    # Determine company list
    if args.company:
        companies = [args.company]
    elif args.file:
        with open(args.file) as f:
            companies = [line.strip() for line in f if line.strip()]
    else:
        companies = DEFAULT_COMPANIES

    # Deduplicate
    companies = list(dict.fromkeys(companies))

    print(f"\nDiscovering board tokens for {len(companies)} companies "
          f"across {', '.join(platforms)}...\n", file=sys.stderr)

    results = discover_batch(companies, platforms=platforms, max_workers=args.workers)

    # Summary
    print(f"\n{'='*60}", file=sys.stderr)
    print(f"RESULTS: {len(results)} boards found across {len(companies)} companies",
          file=sys.stderr)
    for platform in platforms:
        count = len([r for r in results if r["platform"] == platform])
        print(f"  {platform}: {count} verified", file=sys.stderr)
    print(f"{'='*60}\n", file=sys.stderr)

    # Output
    if args.json:
        output = format_results_json(results)
    else:
        output = format_results_table(results)

    if args.output:
        with open(args.output, "w") as f:
            f.write(output)
        print(f"Results written to {args.output}", file=sys.stderr)
    elif args.update:
        target = Path(__file__).parent.parent / "context" / "target-companies.md"
        with open(target, "a") as f:
            f.write("\n\n# Auto-Discovered Boards\n")
            f.write(f"# Discovered: {time.strftime('%Y-%m-%d')}\n")
            f.write(output)
        print(f"Results appended to {target}", file=sys.stderr)
    else:
        print(output)


if __name__ == "__main__":
    main()
