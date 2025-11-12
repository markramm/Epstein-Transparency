# Contributing to Epstein Petition Tracker

Thank you for helping track progress toward transparency and accountability!

## How You Can Help

### 1. Report Office Responses
When you contact a congressional office:
1. Go to [Issues](https://github.com/markramm/Epstein-Transparency/issues/new/choose)
2. Select "Office Response Report"
3. Fill in the template with exact quotes when possible

### 2. Track Media Coverage
Submit press mentions, op-eds, or broadcasts:
1. Create an issue with [MEDIA] in the title
2. Include: outlet, date, link, key quotes

### 3. Update Signature Counts
If you have verified information about new signers:
1. Fork the repository
2. Update `data/signatures.json`
3. Submit a pull request with source citation

### 4. Improve Resources
Help refine scripts, templates, or documentation:
1. Fork the repository
2. Make your changes
3. Submit a pull request explaining improvements

## Technical Contributions

### Setup
```bash
git clone https://github.com/markramm/Epstein-Transparency.git
cd Epstein-Transparency
# Make your changes
git add .
git commit -m "Description of changes"
git push
```

### File Structure
- `data/`: JSON files with signature data (update carefully)
- `resources/`: Markdown templates for advocacy
- `assets/`: CSS and JavaScript for the dashboard
- `updates/`: Daily/weekly progress reports

### Testing Locally
```bash
# If you have Python installed:
python -m http.server 8000
# Then visit http://localhost:8000
```

## Guidelines

### Data Accuracy
- Only add confirmed signatures with sources
- Use exact office quotes when reporting responses
- Date all entries in ISO format (YYYY-MM-DD)

### Privacy
- Never add survivor names without consent
- Redact any personally identifying information
- Focus on process, not speculation

### Commit Messages
Good: "Add Rep. Smith (TX-01) to signed list per press release"
Bad: "Updated stuff"

## Questions?

Open an issue with [QUESTION] in the title or contact via repository discussions.

## Recognition

Contributors who provide verified updates will be acknowledged in the weekly summary (unless you prefer to remain anonymous).