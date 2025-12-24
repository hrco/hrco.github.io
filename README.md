# HRCO's Digital Consciousness

A beautifully crafted, entirely static portfolio website built with **pure HTML, CSS, and JavaScript** — no frameworks, no build tools, no runtime server logic.

**Live at:** [hrco.github.io](https://hrco.github.io)

---

## What This Is

A personal portfolio and daily AI/tech digest aggregator hosted on GitHub Pages. The site features:

- **Static-first architecture** — everything served to users is plain HTML, CSS, and JSON
- **Automated digest system** — daily RSS feed aggregation via GitHub Actions
- **Multi-language support** — English and Slovenian with localStorage persistence
- **Photography showcase** — aerial drone photography with thematic galleries
- **Zero dependencies** — except one: `fast-xml-parser` for RSS/Atom parsing
- **Dark mode** — retro-futuristic terminal aesthetic with smooth theme switching

---

## Project Structure

```
hrco.github.io/
├── index.html                    # Homepage with digest widget
├── about_me.html                 # Professional profile
├── foto.html                     # Photo galleries (4 themed sections)
├── news.html                     # Digest archive listing
├── my_suggestions.html           # Curated creators/resources
│
├── css/
│   └── main.css                  # Single stylesheet (~500 lines)
│
├── js/
│   ├── main.js                   # i18n, theme switching, utilities
│   ├── digest-latest.js          # Fetch & render latest digest widget
│   ├── gallery.js                # Photo gallery enhancements
│   └── news.js                   # Archive page interactions
│
├── data/                         # Generated static "API"
│   ├── digest-latest.json        # Latest digest payload
│   └── digest-archive.json       # Index of all past digests
│
├── news/                         # Generated daily digest pages
│   └── YYYY-MM-DD.html           # Individual daily digest pages
│
├── images/web_1600_wm/           # Optimized photos (22 aerial images)
│
├── scripts/                      # GitHub Actions automation (not served)
│   ├── daily-digest.mjs          # Main digest generation script
│   └── connectors/
│       └── rss.mjs               # RSS/Atom feed parser
│
├── .github/workflows/
│   └── daily-digest.yml          # Scheduled automation (6:20 AM UTC daily)
│
└── .github/
    └── copilot-instructions.md   # AI assistant guidance
```

---

## How It Works

### Architecture

```
GitHub Actions (6:20 UTC daily)
        ↓
  daily-digest.mjs
        ↓
  Fetch RSS feeds
        ↓
  Normalize, deduplicate, limit
        ↓
  Generate /news/YYYY-MM-DD.html
  Generate /data/digest-latest.json
  Update /data/digest-archive.json
        ↓
  git commit && git push
        ↓
  GitHub Pages auto-deploys
        ↓
  Browser loads homepage
        ↓
  digest-latest.js fetches /data/digest-latest.json
        ↓
  Renders latest digest widget
```

### RSS Feed Sources

The digest aggregates from multiple sources:

```javascript
// scripts/daily-digest.mjs
const FEEDS = [
  "https://hnrss.org/frontpage",              // HackerNews
  "https://feeds.arstechnica.com/arstechnica/index", // ArsTechnica
  "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml", // NY Times
  "https://feeds.bloomberg.com/markets/news.rss", // Bloomberg
];
```

**To add more feeds:** Edit `scripts/daily-digest.mjs`, update the `FEEDS` array, commit, and push. The workflow will use new sources on next run.

### Data Structure

**Latest digest** (`/data/digest-latest.json`):
```json
{
  "date": "2025-12-24",
  "updated_at": "2025-12-24T06:20:00.000Z",
  "page": "/news/2025-12-24.html",
  "count": 12,
  "items": [
    {
      "id": "sha1-hash-of-url",
      "title": "Article Title",
      "url": "https://...",
      "source": "example.com",
      "published_at": "2025-12-24T10:30:00Z",
      "summary": "Summary: Article Title"
    }
  ]
}
```

**Archive index** (`/data/digest-archive.json`):
```json
{
  "updated_at": "2025-12-24T06:20:00.000Z",
  "days": [
    {
      "date": "2025-12-24",
      "page": "/news/2025-12-24.html",
      "teaser": "Top: Latest Article Title",
      "count": 12,
      "ids": ["sha1-hash-1", "sha1-hash-2", ...]
    }
  ]
}
```

---

## Local Development

### Prerequisites

- Node.js 20+ (for running digest scripts)
- A text editor (any will do)
- Python 3 (for local preview server)

### Setup

```bash
# Clone the repository
git clone https://github.com/hrco/hrco.github.io.git
cd hrco.github.io

# Install dependencies
npm install
```

### Local Preview

```bash
# Start a simple HTTP server
python3 -m http.server 8000

# Open browser to http://localhost:8000
```

### Run Digest Locally

```bash
# Generate today's digest
node scripts/daily-digest.mjs

# Check outputs:
# - news/YYYY-MM-DD.html (daily page)
# - data/digest-latest.json (latest payload)
# - data/digest-archive.json (archive index)
```

### Testing Workflow Changes

```bash
# Before committing changes to automation scripts:
node scripts/daily-digest.mjs

# Verify generated files are correct
cat data/digest-latest.json
```

---

## CSS System

Single file: `css/main.css` (~513 lines)

### Features

- **CSS Variables** — Define colors, spacing, fonts once, use everywhere
- **Mobile-first** — Responsive grid, flexbox, modern layouts
- **Theme switching** — `body.theme-dark` for dark mode
- **Animations** — Smooth transitions, hover effects, starfield background
- **Typography** — Orbitron (display), Work Sans (body) from Google Fonts

### Customization

All theme values are CSS custom properties at the top of `main.css`:

```css
:root {
  --color-bg: #0a0e27;
  --color-primary: #00d4ff;
  --color-accent: #ff00ff;
  /* ... 8+ more variables */
}
```

---

## JavaScript Modules

### main.js

Theme switching, language selection, i18n rendering:

```javascript
// Change language
localStorage.setItem("language", "slo"); // or "en"

// Switch theme
cycleTheme(); // light → dark → system
```

### digest-latest.js

Fetches latest digest JSON and renders a widget on the homepage:

```javascript
// Automatically runs on page load
// Fetches /data/digest-latest.json
// Renders: date, item count, archive link
```

### gallery.js

Minimal JS for photo gallery scroll-snap enhancements.

### news.js

Archive page interactions (if needed).

---

## Internationalization (i18n)

All UI text supports English and Slovenian.

### Adding Translations

1. **HTML:** Use `data-i18n="KEY"` attribute
   ```html
   <h1 data-i18n="MY_HEADING">Default English Text</h1>
   ```

2. **JavaScript:** Add to `main.js` dictionary
   ```javascript
   const i18n = {
     MY_HEADING: {
       en: "Default English Text",
       sl: "Privzeto besedilo v slovenščini"
     }
   };
   ```

3. **Rules:**
   - Always update both languages
   - Slovenian copy keeps the humor
   - Use consistent terminology

---

## Deployment

### Automatic (Recommended)

1. Make changes locally
2. Commit and push to `main` branch
3. GitHub Pages auto-deploys within 30 seconds

```bash
git add .
git commit -m "Mostly harmless changes"
git push origin main
```

### Manual Digest Trigger

GitHub Actions has `workflow_dispatch` enabled. Trigger from GitHub:

1. Go to [Actions → Daily Digest Workflow](https://github.com/hrco/hrco.github.io/actions)
2. Click "Run workflow" → "Run workflow" button
3. Workflow executes immediately (no need to wait until 6:20 AM)

---

## Architecture Principles

These are non-negotiable:

- **Static-first** — Everything served as static files
- **Automation over runtime** — Generate content ahead of time, not on request
- **No frameworks** — No React, Vue, Svelte, Astro, etc.
- **No build tools** — No bundlers, preprocessors, or transpilers
- **Readable over clever** — Code must be obvious at a glance
- **Humor with discipline** — Jokes welcome, chaos not

### Adding Features

When adding new features, follow this priority:

1. Can it be static? Make it static.
2. Can it be generated ahead of time? Generate it.
3. Can it use JSON + rendering instead of APIs? Use that.
4. Must it be JavaScript? Keep it minimal and modular.

If a feature requires:
- A framework
- A backend
- A database
- User authentication

…it does not belong here.

---

## Troubleshooting

### Digest Widget Shows "Loading..." Forever

1. Check if `/data/digest-latest.json` exists:
   ```bash
   ls -la data/digest-latest.json
   ```

2. If missing, run digest locally:
   ```bash
   node scripts/daily-digest.mjs
   ```

3. Check browser console for fetch errors (F12 → Console)

4. Verify file path in `js/digest-latest.js` is `/data/digest-latest.json`

### RSS Feeds Failing

1. Check workflow logs: [Actions tab on GitHub](https://github.com/hrco/hrco.github.io/actions)

2. Test feed URL manually:
   ```bash
   curl https://hnrss.org/frontpage
   ```

3. If feed is down, comment it out in `scripts/daily-digest.mjs` and commit

### Images Not Loading

1. Verify image files exist:
   ```bash
   ls images/web_1600_wm/ | wc -l  # Should show ~22 files
   ```

2. Check file permissions (should be readable)

3. Verify paths in HTML use forward slashes: `images/web_1600_wm/gallery_01.jpg`

---

## Writing Style

This site channels **Douglas Adams**:

- Dry, self-aware humor
- References to "Don't Panic" and cosmic indifference
- Dry observations about technology
- Witty captions that don't explain the joke

Avoid:
- Corporate marketing language
- Emojis
- Sincere self-promotion
- Explaining the joke

---

## Guiding Philosophy

> **Simple systems last longer.**

If something can be static, it probably should be. This site should be:
- Understandable in five minutes
- Still working in ten years
- Readable without documentation (but this helps)
- Maintainable by anyone comfortable with HTML/CSS/JS

---

## Contributing

Want to improve the site? Follow these steps:

1. **Make small, focused changes** — One feature or fix per commit
2. **Test locally** — Preview in browser, run digest script if needed
3. **Follow the style guide** — Check [agent.md](agent.md) for detailed guidance
4. **Commit with humor** — Message should match site's personality
5. **Push to main** — GitHub Pages deploys automatically

Example commits:
```
Mostly harmless updates to photo captions
Fix RSS feed source for Bloomberg
Add Slovenian translations for new section
Update forecast: mostly static, with occasional JavaScript
```

---

## License

This is a personal portfolio website. Code is available for learning and inspiration. Drone photography is HRCO's original work.

---

## FAQ

**Q: Why no build tools?**  
A: Simpler to deploy, faster to load, easier to understand, no dependency hell.

**Q: Why no framework?**  
A: Not needed. Vanilla HTML/CSS/JS is sufficient and more maintainable.

**Q: Can I add a comments section?**  
A: No. This is a static site. Comments require backend/database.

**Q: Can I use this as a template?**  
A: Absolutely! It's MIT-licensed and designed to be forkable.

**Q: Where's the database?**  
A: Git. Generated files are committed back to the repository.

---

**Mostly harmless.** 🚀
