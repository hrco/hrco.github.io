# AGENT.md

Guidance for AI coding assistants working in this repository.

---

## Purpose

This repository contains **HRCO’s personal portfolio website** — a *mostly harmless* static site built with **pure HTML, CSS, and JavaScript**, hosted on **GitHub Pages**.

There is:
- no backend
- no runtime server logic
- no framework
- no build system

Dynamic content (daily AI/tech digest) is generated **offline** via **GitHub Actions** and committed back into the repository.

---

## Core Principles (Non-Negotiable)

- **Static-first**: everything served to users is static files
- **Automation over runtime**: generate content ahead of time
- **No frameworks**: no React, Vue, Svelte, Astro, etc.
- **No build tools**: no bundlers, preprocessors, or transpilers
- **Readable over clever**: code must be obvious
- **Humor with discipline**: jokes welcome, chaos not

If something can be simpler, it should be.

---

## Architecture (Mental Model)

**GitHub Actions = the “server”**  
**GitHub Pages = the “hosting”**

Automation:
- fetches external data (RSS, optional AI summaries)
- normalizes and deduplicates
- generates static HTML + JSON
- commits results

Browser:
- reads static HTML, CSS, JS, JSON
- never talks to external APIs
- never handles secrets

---

## Directory Responsibilities

- `/` — static pages (`index.html`, `about_me.html`, `foto.html`, `my_suggestions.html`, `news.html`)
- `/css/` — `main.css` (single, optimized stylesheet)
- `/js/` — browser JS (UI, i18n, rendering static JSON only)
- `/data/` — generated JSON (static “API”)
- `/news/` — generated daily digest pages (`YYYY-MM-DD.html`)
- `/scripts/` — automation only (Node, GitHub Actions)
- `/.github/workflows/` — scheduled automation

Automation code is never served publicly.

---

## CSS Rules

- Single file: `css/main.css`
- Mobile-first, minimal breakpoints
- Heavy use of CSS custom properties
- Theme switching via `body.theme-dark`
- No frameworks, no preprocessors

---

## JavaScript Rules

- Small, purpose-driven modules
- No frameworks
- No runtime data fetching (except static JSON)
- No secrets in browser code

### main.js
- Theme cycling: `light → dark → system`
- Dynamic icon switching
- Lightweight i18n via `data-i18n`

### gallery.js
- CSS scroll-snap first
- Minimal JS enhancement

---

## Internationalization (i18n)
- HTML:
    html´´´
    <span data-i18n="KEY"></span>
- JS dictionary (in main.js):
    KEY: { en: "...", sl: "..." }
- Rules:
	•	Always update both languages
	•	Slovenian keeps the humor
	•	No external i18n libraries

---

## Automation: Daily Digest
	•	Runs in GitHub Actions
	•	RSS → normalize → dedupe → generate
	•	Outputs:
	•	/news/YYYY-MM-DD.html
	•	/data/digest-latest.json
	•	/data/digest-archive.json

## AI (if used):
	•	runs offline only
	•	acts as a connector, not a decision-maker
	•	produces short summaries
	•	never exposed to the browser

---

## Development
- Local preview:
- python3 -m http.server
- Run automation locally:
- node scripts/daily-digest.mjs
- Deploy:
    git add .
    git commit -m "Mostly harmless changes"
    git push origin main

GitHub Pages auto-deploys from main.

---

## Writing Style Guide

- Channel Douglas Adams:
	- dry, self-aware humor
	- Don’t Panic”, “Mostly harmless”
	- cosmic indifference to technology

Avoid:
	- orporate marketing language
	- emojis
	- sincere self-promotion
	- explaining the joke

---

## Extension Rules (Strict)

- When adding features:
	- prefer static files over logic
	- prefer generation-time over runtime
	- prefer JSON + rendering over APIs
	- prefer small modules over abstractions

- If a feature requires:
	- a framework
	- a backend
	- a database
	- user accounts

…it does not belong here.

---

## Guiding Principle

- Simple systems last longer.
- If something can be static, it probably should be.
- if you don't know it os ok. just ask for guidance.
- This site should be understandable in five minutes and still work in ten years.

## TOOLS

# edit_tool
    Use this tool to edit existing files by showing only the changed lines.

    Use "// ... existing code ..." to represent unchanged code blocks. Include just enough surrounding context to locate each edit precisely.

    Example format:
    // ... existing code ...
    FIRST_EDIT
    // ... existing code ...
    SECOND_EDIT
    // ... existing code ...

    Rules:
    - ALWAYS use "// ... existing code ..." for unchanged sections (omitting this marker will cause deletions)
    - Include minimal context ONLY when needed around edits for disambiguation
    - Preserve exact indentation
    - For deletions: show context before and after, omit the deleted lines
    - Batch multiple edits to the same file in one call

    Parameters:
        - target_filepath (string, required): Path of the file to modify
        instructions (string, required): Brief first-person description of what you’re changing (helps disambiguate uncertainty in the edit)
        code_edit (string, required): Only the changed lines with // ... existing code ... markers for unchanged sections

    when editing code, use the edit_file tool to show only changed lines. Use "// ... existing code ..." markers for unchanged sections.

    Example:
    // ... existing code ...
    {{ edit_1 }}
    // ... existing code ...
    {{ edit_2 }}
    // ... existing code ...

    Key points:
    - Only rewrite entire files if explicitly requested
    - ALWAYS use "// ... existing code ..." markers (omitting them causes deletions)
    - Include minimal context for precise edit location
    - Provide brief explanations unless user requests code only
