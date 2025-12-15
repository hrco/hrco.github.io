# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is HRCO's personal portfolio website - a "mostly harmless" static site built entirely with pure HTML, CSS, and JavaScript. Hosted on GitHub Pages, it features a minimalist Apple-inspired design with a humorous Hitchhiker's Guide to the Galaxy writing style throughout.

## Architecture

### Design Philosophy
- **Pure HTML/CSS/JS** - No frameworks, no build tools, no dependencies (except Font Awesome CDN)
- **Don't Panic Theme System** - Three-mode theme cycling (light → dark → system)
- **Bilingual** - English and Slovenian (Slovenian translations maintain HHGTTG humor)
- **Optimized** - CSS reduced by 30%, JavaScript streamlined for performance

### CSS Architecture (`css/main.css`)
- Uses CSS custom properties extensively for theming
- Single consolidated file (~294 lines, highly optimized)
- Mobile-first responsive design (breakpoint: 768px)
- Theme variables switch via `body.theme-dark` class
- Key variables: `--spacing`, `--transition`, `--color-*` family

### JavaScript Modules

**main.js** - Core controller (~214 lines)
- Theme cycling: Single round button rotates through light/dark/system
- Icon updates dynamically (sun/moon/desktop) based on theme
- i18n system using `data-i18n` attributes
- Content dictionary with HHGTTG-style text in both languages
- Optional chaining (`?.`) for safe DOM queries

**gallery.js** - Photo carousel (~24 lines)
- CSS scroll-snap implementation
- Touch event listeners for enhanced mobile swipe
- Minimal JavaScript, mostly relies on CSS

### Content Structure
All content follows Hitchhiker's Guide to the Galaxy humor:
- **index.html**: "Don't Panic" landing page
- **about_me.html**: "Improbable Entity" bio
- **foto.html**: "Visual Evidence" gallery
- **my_suggestions.html**: "Mostly Harmless Influencers"

### Theme Toggle
Single 32px round button that cycles through themes:
```
light (☀️) → dark (🌙) → system (🖥️) → light...
```
- Hover: 1.05x scale
- Active: 0.95x scale
- Persists via localStorage
- System theme respects `prefers-color-scheme`

### Internationalization
Lightweight custom i18n:
```html
<h1 data-i18n="GREETING">Don't Panic...</h1>
```
All translations in `main.js` content dictionary. To add:
1. Add `data-i18n="KEY"` attribute to HTML element
2. Add `'KEY': { 'en': '...', 'sl': '...' }` to content object

### Image Organization
- Gallery images: `images/web_1600_wm/`
- Naming: `gallery_01.jpg`, `gallery_02.jpg`, etc.
- Optimized to ~1600px width

## Development Workflow

### Local Testing
```bash
# Python simple server
python -m http.server 8000

# Node http-server
npx http-server

# Then visit localhost:8000
```

### Deployment
GitHub Pages auto-deploys from main branch:
```bash
git add .
git commit -m "Your witty commit message here"
git push origin main
```

### Adding New Pages
1. Create HTML file in root
2. Copy header structure (maintain consistency)
3. Update nav links in ALL pages:
   - Start (index.html)
   - Visual Evidence (foto.html)
   - The Entity (about_me.html)
   - Wise Voices (my_suggestions.html)
4. Add translations to `main.js` content object
5. Maintain HHGTTG humor style

### Modifying Themes
Edit CSS variables in `css/main.css`:
- `:root` - light theme colors
- `body.theme-dark` - dark theme overrides
- Follow Apple's system color guidelines

### Adding Gallery Images
1. Optimize images to ~1600px width
2. Add to `images/web_1600_wm/`
3. Add photo-item div to `foto.html`
4. Add captions with HHGTTG-style humor

## Writing Style Guide

All text must channel Douglas Adams:
- Self-aware and absurdist humor
- References to towels, improbability, and the number 42
- Gentle mockery of human civilization
- "Mostly harmless" as recurring motif
- Technical competence described with cosmic indifference

**Good Examples:**
- "Don't Panic" as greeting
- "Improbable Entity" instead of "Person"
- "Mostly harmless" instead of "Safe"
- Descriptions that acknowledge life's fundamental absurdity

**Bad Examples:**
- Corporate marketing speak
- Excessive emoji use
- Sincere self-promotion
- Taking anything too seriously

## Key Constraints
- NO build tools, preprocessors, or bundlers
- NO frameworks (React, Vue, etc.)
- NO backend or database
- MUST work as static files on GitHub Pages
- MUST maintain HHGTTG humor throughout
- Maintain clean, readable code despite jokes

## Performance Optimizations
- CSS: Consolidated, removed redundancies (422 → 294 lines)
- JS: Streamlined, optional chaining, efficient event handling
- Minimal dependencies (only Font Awesome icons)
- Leverages native browser APIs
- CSS scroll-snap for smooth gallery

## Common Modifications

### Header Spacing
Carefully tuned for minimal vertical space:
- Mobile: `calc(var(--spacing) * 0.5)` padding
- Desktop: `calc(var(--spacing) * 0.2)` padding

### Footer Style
Fixed position, transparent background, text-shadow for readability.

### Button Styles
- Theme toggle: 32px circle, primary color icons
- Language toggles: 0.6rem font, grouped in container

## File Size Reference
- `main.css`: ~294 lines
- `main.js`: ~214 lines
- `gallery.js`: ~24 lines
- Total HTML: 4 pages, ~140 lines average each

The whole project embodies the principle: "Simple, functional, and mostly harmless."
