# Contributing Guide

Thank you for interest in contributing to HRCO's Digital Consciousness! This guide explains how to maintain and extend this static portfolio site.

---

## Before You Start

Read these first:

- [README.md](README.md) — Project overview and architecture
- [agent.md](agent.md) — AI assistant guidance (applies to all contributors)
- [Core Principles](#core-principles) below

---

## Core Principles

These are **non-negotiable**:

1. **Static-first** — Everything served must be static HTML, CSS, JS, or JSON
2. **Automation over runtime** — Generate content ahead of time, not on request
3. **No frameworks** — No React, Vue, Svelte, Next.js, Astro, etc.
4. **No build tools** — No webpack, Vite, Rollup, TypeScript compilation, etc.
5. **Readable over clever** — Code must be immediately understandable
6. **Humor with discipline** — Jokes encouraged; chaos not

If adding a feature requires:
- A framework or build system
- A backend/database
- User authentication
- External APIs called from the browser

…**it does not belong here.**

---

## Contribution Types

### 1. Content Updates

**Examples:** Photography captions, about text, suggestions page

**Process:**
1. Edit the relevant HTML file
2. Update i18n translations (both EN and SLO)
3. Test locally with `python3 -m http.server 8000`
4. Commit with a descriptive message
5. Push to main (auto-deploys)

**Guidelines:**
- Match the existing tone (Douglas Adams + cosmic indifference)
- Keep humor dry and self-aware
- Don't explain the jokes
- Update both language versions always

### 2. Styling Changes

**Examples:** Colors, spacing, animations, responsive design

**Process:**
1. Edit `css/main.css`
2. Follow existing CSS variable system
3. Test at mobile (375px) and desktop (1600px)
4. Ensure dark mode works (`body.theme-dark`)
5. Commit and push

**Guidelines:**
- Use CSS variables, not hardcoded values
- Mobile-first approach
- Prefer CSS Grid/Flexbox over floats
- Keep animations performant (transforms, opacity)
- Test in Chrome, Firefox, Safari

### 3. JavaScript Enhancements

**Examples:** New widgets, improved interactions, utilities

**Process:**
1. Create a new module in `/js/` (e.g., `js/feature.js`)
2. Keep it under 200 lines
3. Include a header comment explaining purpose
4. No external dependencies
5. Test in browser console
6. Add to HTML `<script>` tag if needed
7. Commit and push

**Guidelines:**
- Vanilla JavaScript only (no jQuery, Vue, React, etc.)
- No async/await dependencies
- Keep modules single-purpose
- Comment complex logic
- Global scope pollution is OK for small sites

### 4. Automation Pipeline Changes

**Examples:** Adding RSS feeds, modifying digest generation, new data outputs

**Process:**
1. Edit `scripts/daily-digest.mjs` or create new connector
2. Test locally: `node scripts/daily-digest.mjs`
3. Verify outputs in `/data/` and `/news/`
4. Check JSON validity
5. Commit and push

**Guidelines:**
- Fail gracefully (one bad feed doesn't break everything)
- Log meaningful errors
- Add comments for non-obvious code
- Keep data structure documented

### 5. Documentation

**Examples:** README, this file, inline comments, guidelines

**Process:**
1. Edit relevant markdown file
2. Keep language clear and concise
3. Include code examples where helpful
4. Commit and push

**Guidelines:**
- Assume reader knows HTML/CSS/JS but not our system
- Use headers liberally
- Code blocks should be complete, not snippets
- Link to relevant files

---

## Workflow: Adding an RSS Feed

As an example, here's how to add a new RSS feed source:

### 1. Check Feed Validity

```bash
curl https://example.com/feed.rss | head -20
# Look for <rss> or <feed> tags
```

### 2. Edit daily-digest.mjs

Open `scripts/daily-digest.mjs` and update the `FEEDS` array:

```javascript
const FEEDS = [
  "https://hnrss.org/frontpage",
  "https://feeds.arstechnica.com/arstechnica/index",
  "https://example.com/feed.rss", // ← Add your feed here
];
```

### 3. Test Locally

```bash
node scripts/daily-digest.mjs
```

Check outputs:
```bash
cat data/digest-latest.json | jq '.items[] | .source' # See sources
ls -la news/*.html # Check daily page generated
```

### 4. Verify JSON Validity

```bash
cat data/digest-latest.json | jq . > /dev/null && echo "Valid"
```

### 5. Commit & Push

```bash
git add scripts/daily-digest.mjs data/
git commit -m "Add example.com RSS feed to daily digest"
git push origin main
```

Next scheduled run (6:20 UTC) will use the new feed. To trigger immediately:

1. Go to [GitHub Actions](https://github.com/hrco/hrco.github.io/actions)
2. Select "Daily Digest Workflow"
3. Click "Run workflow" → "Run workflow"

---

## Workflow: Updating Photo Captions

### 1. Edit foto.html

Find the photo caption and update `data-i18n` and text:

```html
<p class="photo-caption" data-i18n="PHOTO_05">
  Fog trapped between hills like confusion trapped between Monday and coffee.
</p>
```

### 2. Update i18n Dictionary

Add translation to `js/main.js`:

```javascript
const i18n = {
  // ... existing entries ...
  PHOTO_05: {
    en: "Fog trapped between hills like confusion trapped between Monday and coffee.",
    sl: "Megla ujetena med hribima kot zmešnjava med ponedeljkom in kavo."
  }
};
```

### 3. Test Locally

```bash
python3 -m http.server 8000
# Visit http://localhost:8000/foto.html
# Switch language (SLO/ENG button)
# Verify both versions render correctly
```

### 4. Commit & Push

```bash
git add foto.html js/main.js
git commit -m "Update photo caption: Fog and coffee metaphor"
git push origin main
```

---

## Workflow: Adding a New Section to Homepage

### 1. Add HTML to index.html

```html
<section class="card">
  <h2 data-i18n="NEW_SECTION_TITLE">New Section</h2>
  <p data-i18n="NEW_SECTION_TEXT">Content here.</p>
</section>
```

### 2. Add i18n Dictionary

In `js/main.js`, add translations:

```javascript
const i18n = {
  // ... existing ...
  NEW_SECTION_TITLE: {
    en: "New Section",
    sl: "Nov razdelek"
  },
  NEW_SECTION_TEXT: {
    en: "Content here.",
    sl: "Vsebina tukaj."
  }
};
```

### 3. Style if Needed

Add CSS to `css/main.css` if unique styling required. Use existing variables:

```css
/* Reference existing values */
.new-element {
  color: var(--color-text);
  background: var(--color-surface);
  padding: var(--spacing-md);
}
```

### 4. Test Locally

```bash
python3 -m http.server 8000
# Visit http://localhost:8000
# Switch language
# Verify appearance and responsiveness
```

### 5. Commit & Push

```bash
git add index.html js/main.js css/main.css
git commit -m "Add: New section to homepage"
git push origin main
```

---

## Common Tasks

### Testing Digest Generation Locally

```bash
# Generate today's digest
node scripts/daily-digest.mjs

# View latest digest
cat data/digest-latest.json

# View archive index
cat data/digest-archive.json

# Check daily page
cat news/2025-12-24.html
```

### Validating JSON Files

```bash
# Install jq if needed: brew install jq
cat data/digest-latest.json | jq . > /dev/null && echo "Valid JSON"
```

### Testing CSS Changes

```bash
# Start server
python3 -m http.server 8000

# Test at different viewport sizes:
# Chrome DevTools: Cmd+Shift+M (or Ctrl+Shift+M)
# Test at: 375px (mobile), 768px (tablet), 1200px+ (desktop)
```

### Checking for Broken Links

```bash
# Simple check: grep for .html references
grep -r 'href="' *.html | grep -v 'http' | sort

# Verify each file exists in repo
```

---

## Code Style Guide

### HTML

```html
<!-- Descriptive comment -->
<section class="card">
  <h1 data-i18n="HEADING_KEY">Fallback English</h1>
  <p>Content.</p>
</section>
```

**Rules:**
- Use semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Always include `data-i18n` for user-facing text
- Use double quotes for attributes
- 4-space indentation

### CSS

```css
/* Group related rules */
.component {
  color: var(--color-text);
  padding: var(--spacing-md);
  transition: all var(--transition);
}

.component:hover {
  color: var(--color-primary);
}
```

**Rules:**
- Use CSS variables, not hardcoded values
- Mobile-first media queries
- Single space after selector colon
- One property per line
- No duplicate selectors

### JavaScript

```javascript
// Purpose of this script/module
(function () {
  const config = { /* ... */ };

  function doSomething() {
    // Clear, simple logic
  }

  // Initialize on load
  document.addEventListener('DOMContentLoaded', doSomething);
})();
```

**Rules:**
- IIFE (Immediately Invoked Function Expression) for modules
- Const/let, no var
- Camel case for functions/variables
- Comments for "why", not "what"
- 2-space indentation

---

## Commit Message Style

Follow the site's personality:

```
Mostly harmless: Add photo caption
Update RSS feed sources for better coverage
Fix: Sheep vs Sheeps grammar issue
Refactor: CSS spacing system
Update translations for SLO section
Add: Dark mode flicker prevention
```

**Format:** `[Type]: Brief description`

**Types:**
- `Add:` — New feature or content
- `Fix:` — Bug or error correction
- `Update:` — Improvements to existing
- `Refactor:` — Code reorganization
- `Mostly harmless:` — Minor tweaks

---

## Deployment Checklist

Before pushing changes:

- [ ] Changes tested locally
- [ ] HTML validated (no broken tags)
- [ ] CSS tested at mobile/desktop
- [ ] JavaScript tested in browser console
- [ ] i18n both languages updated (if applicable)
- [ ] No hardcoded URLs (use relative paths)
- [ ] Commit message is descriptive
- [ ] No console errors/warnings

## Fixing Issues

### GitHub Issue Found a Bug

1. Reproduce it locally
2. Identify root cause
3. Fix the issue
4. Test thoroughly
5. Push with reference: `Fix #42`

### Workflow Failed

1. Check [Actions tab](https://github.com/hrco/hrco.github.io/actions)
2. Click failed run → "Digest Workflow"
3. See error message
4. Common issues:
   - Feed URL is broken → comment it out
   - Network timeout → will retry next run
   - Invalid JSON → check escaping

---

## Questions?

If something isn't clear:

1. Check [README.md](README.md)
2. Check [agent.md](agent.md)
3. Look at existing code (it's readable)
4. Ask in an issue with context

---

## Final Principles

1. **Keep it simple** — Simple systems last
2. **Keep it readable** — Future you will thank present you
3. **Keep it fun** — This is a portfolio, not a production app
4. **Keep it static** — If it can be HTML, make it HTML

**Mostly harmless.**
