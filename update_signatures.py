#!/usr/bin/env python3
"""
Script to scrape the House Clerk's discharge petition page and update signers.json
with the latest signature count and signer information.

Usage: python3 update_signatures.py
"""

import json
import re
import sys
from datetime import datetime
from urllib.request import urlopen, Request
from urllib.error import URLError, HTTPError
import html

DISCHARGE_PETITION_URL = "https://clerk.house.gov/DischargePetition/2025090209"
SIGNERS_JSON_PATH = "data/signers.json"

def fetch_petition_page():
    """Fetch the HTML content of the discharge petition page."""
    try:
        # Add headers to avoid being blocked
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        req = Request(DISCHARGE_PETITION_URL, headers=headers)
        
        with urlopen(req) as response:
            html_content = response.read().decode('utf-8')
            return html_content
    except HTTPError as e:
        print(f"HTTP Error: {e.code} - {e.reason}")
        return None
    except URLError as e:
        print(f"URL Error: {e.reason}")
        return None
    except Exception as e:
        print(f"Error fetching page: {e}")
        return None

def parse_signatures(html_content):
    """Parse the HTML to extract signature information."""
    if not html_content:
        return None
    
    # Extract individual signers from the table structure
    # Pattern: <a href="/Members/..." ... >Name</a></td><td style="display:none;">Name</td><td data-label="State">State</td><td data-label="Party">Party</td>
    signers = []
    
    # Updated pattern to match the actual HTML structure with district field
    signer_pattern = r'<a href="/Members/[^"]*"[^>]*>([^<]+)</a>\s*</td>\s*<td[^>]*>[^<]*</td>\s*<td data-label="State">([^<]+)</td>\s*<td[^>]*>[^<]*</td>\s*<td data-label="District">(\d+)</td>\s*<td data-label="Party">([^<]+)</td>'
    
    signer_matches = re.findall(signer_pattern, html_content)
    
    # Map state names to abbreviations
    state_abbrev = {
        'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
        'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
        'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
        'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
        'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
        'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
        'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
        'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
        'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
        'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY'
    }
    
    party_abbrev = {
        'Democratic': 'D',
        'Republican': 'R',
        'Independent': 'I'
    }
    
    for match in signer_matches:
        name, state, district, party = match
        # Clean up the name
        name = html.unescape(name.strip())
        state = state.strip()
        district = district.strip()
        party = party.strip()
        
        signers.append({
            "name": name,
            "party": party_abbrev.get(party, party[0] if party else '?'),
            "state": state_abbrev.get(state, state[:2].upper() if len(state) >= 2 else state),
            "district": district
        })
    
    total_signatures = len(signers)
    
    if total_signatures > 0:
        print(f"Found {total_signatures} total signatures")
        
        # Count by party
        party_counts = {}
        for signer in signers:
            party = signer['party']
            party_counts[party] = party_counts.get(party, 0) + 1
        
        print(f"Breakdown: {', '.join([f'{count} {party}s' for party, count in party_counts.items()])}")
    else:
        print("Warning: Could not extract any signatures from page")
    
    return {
        "total_signatures": total_signatures,
        "signers": signers
    }

def update_json_file(signature_data):
    """Update the signers.json file with new data."""
    
    # Read existing JSON file
    try:
        with open(SIGNERS_JSON_PATH, 'r') as f:
            existing_data = json.load(f)
    except FileNotFoundError:
        print(f"Creating new {SIGNERS_JSON_PATH} file")
        existing_data = {
            "metadata": {},
            "signers": [],
            "expected_signers": {}
        }
    except json.JSONDecodeError as e:
        print(f"Error reading existing JSON: {e}")
        return False
    
    # Update metadata
    now = datetime.now()
    existing_data["metadata"].update({
        "last_updated": now.isoformat(),
        "total_signatures": signature_data["total_signatures"] if signature_data["total_signatures"] else existing_data["metadata"].get("total_signatures", 0),
        "total_needed": 218,
        "signatures_remaining": 218 - (signature_data["total_signatures"] if signature_data["total_signatures"] else existing_data["metadata"].get("total_signatures", 0)),
        "discharge_petition_number": 9,
        "congress": 119,
        "official_source": DISCHARGE_PETITION_URL,
        "last_scraped": now.isoformat(),
        "note": "This is the canonical source for signature counts. Updated from House Clerk records."
    })
    
    # Update signers if we found any new ones
    if signature_data["signers"]:
        # Create a set of existing signer names for quick lookup
        existing_names = {s["name"] for s in existing_data.get("signers", [])}
        
        # Add new signers
        new_signers = []
        for signer in signature_data["signers"]:
            if signer["name"] not in existing_names:
                new_signers.append({
                    **signer,
                    "date_signed": now.strftime("%Y-%m-%d"),
                    "source_url": DISCHARGE_PETITION_URL,
                    "notes": "Scraped from House Clerk website"
                })
        
        if new_signers:
            print(f"Found {len(new_signers)} new signers")
            existing_data["signers"].extend(new_signers)
    
    # Write updated JSON back to file
    try:
        with open(SIGNERS_JSON_PATH, 'w') as f:
            json.dump(existing_data, f, indent=2)
        print(f"Successfully updated {SIGNERS_JSON_PATH}")
        return True
    except Exception as e:
        print(f"Error writing JSON file: {e}")
        return False

def main():
    """Main function to orchestrate the scraping and updating process."""
    print(f"Fetching discharge petition data from {DISCHARGE_PETITION_URL}...")
    
    html_content = fetch_petition_page()
    if not html_content:
        print("Failed to fetch petition page")
        sys.exit(1)
    
    print("Parsing signature data...")
    signature_data = parse_signatures(html_content)
    
    if not signature_data or not signature_data["total_signatures"]:
        print("Warning: Could not extract signature count from page")
        print("The page format may have changed. Manual inspection required.")
        
        # Save the HTML for debugging
        debug_file = f"debug_petition_page_{datetime.now().strftime('%Y%m%d_%H%M%S')}.html"
        with open(debug_file, 'w') as f:
            f.write(html_content)
        print(f"Saved page content to {debug_file} for debugging")
        sys.exit(1)
    
    print(f"\nSummary:")
    print(f"  Total signatures: {signature_data['total_signatures']}")
    print(f"  Signatures needed: {218 - signature_data['total_signatures']}")
    if signature_data['signers']:
        print(f"  Individual signers found: {len(signature_data['signers'])}")
    
    print("\nUpdating JSON file...")
    if update_json_file(signature_data):
        print("✓ Update complete!")
        
        # Display what changed
        with open(SIGNERS_JSON_PATH, 'r') as f:
            updated_data = json.load(f)
            print(f"\nCurrent status:")
            print(f"  Total signatures: {updated_data['metadata']['total_signatures']}")
            print(f"  Signatures remaining: {updated_data['metadata']['signatures_remaining']}")
            print(f"  Last updated: {updated_data['metadata']['last_updated']}")
    else:
        print("✗ Update failed")
        sys.exit(1)

if __name__ == "__main__":
    main()