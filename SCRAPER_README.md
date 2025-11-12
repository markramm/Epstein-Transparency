# Discharge Petition Scraper

## Purpose
This Python script automatically fetches the latest signature count from the House Clerk's official discharge petition page and updates the `data/signers.json` file.

## Usage

```bash
python3 update_signatures.py
```

## What it does

1. Fetches the HTML from https://clerk.house.gov/DischargePetition/2025090209
2. Parses all member signatures from the table
3. Updates `data/signers.json` with:
   - Total signature count (currently 215)
   - Individual signer details (name, party, state, district)
   - Timestamp of last update
4. Shows breakdown by party (e.g., "4 Rs, 211 Ds")

## Requirements

- Python 3.6+
- No external dependencies (uses only standard library)

## Schedule Updates

To run automatically every hour:

```bash
# Add to crontab
0 * * * * cd /path/to/epstein-petition-tracker && python3 update_signatures.py
```

## Output Example

```
Fetching discharge petition data from https://clerk.house.gov/DischargePetition/2025090209...
Parsing signature data...
Found 215 total signatures
Breakdown: 4 Rs, 211 Ds

Summary:
  Total signatures: 215
  Signatures needed: 3
  Individual signers found: 215

Updating JSON file...
✓ Update complete!

Current status:
  Total signatures: 215
  Signatures remaining: 3
  Last updated: 2025-09-04T15:02:02.744882
```

## Notes

- The script is resilient to page format changes and will save debug HTML if parsing fails
- All new signers are automatically added with proper attribution
- The website's JavaScript (`tracker.js`) will automatically load the latest counts from `signers.json`