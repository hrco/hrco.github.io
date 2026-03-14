# hrco.github.io — Personal Portfolio

## What This Is

Valentin Križan's (hrco) personal portfolio website. Static HTML/CSS/JS, hosted on GitHub Pages. No framework, no build step.

**Live site:** https://hrco.github.io
**Repo:** hrco/hrco.github.io (private)

## Owner

**Valentin Križan** — hrco is the brand/handle.
Full professional profile: `/home/supremeleader/mylab/ZeroFriction/Valentino.md`
Contact: +386 51 357 653 | valentin.krizan@protonmail.com | LinkedIn: valentin-krizan-zerofriction | IG: @valentin.krizan

## Stack

| Thing | Choice |
|-------|--------|
| Language | HTML5 / CSS3 / Vanilla JS |
| Hosting | GitHub Pages |
| i18n | Hand-rolled — `js/main.js` content map, `data-i18n` attributes |
| Icons | Font Awesome 6.5.1 (CDN) |
| Fonts | CSS variables via `css/main.css` |

## Site Structure

```
index.html        → Homepage (hero + skills strip)
about_me.html     → About (bio, certs, languages, contact)
projects.html     → Experience (work timeline accordion)
foto.html         → Visual (drone footage + photography)
news.html         → News (RSS digests — do not touch)
css/main.css      → All styles + CSS variables
js/main.js        → i18n content map + all JS behaviour
```

## Active Redesign

**Spec:** `docs/superpowers/specs/2026-03-13-portfolio-redesign.md`
**Status:** Spec approved — awaiting implementation plan

Professional pivot: clean, skills-first portfolio. Adams easter egg = footer only ("Don't Panic.").

## NEVER DO

- NEVER publish EMŠO, Tax ID, or any personal identifier numbers
- NEVER add Ljubo Lover (ljubo-lover.com) as a project
- NEVER add DBBP42 (dbbp42.github.io) as a project
- NEVER mention Projekt Karma
- NEVER name Tesla specifically — use "CX roles in sustainable mobility"
- NEVER remove the EN/SL language toggle — keep bilingual

## i18n Rules

All user-visible strings use `data-i18n="KEY"` attributes. Text lives in `js/main.js` `content` object with both `en` and `sl` values. Never hard-code visible strings in HTML.

## Grok Findings (2026-03-13)

- Keep EN/SL toggle: Slovenian employers expect it, 5% effort 20% appeal
- Homepage 5-sec message: "Ops + Tech Pro: Delivering Calm in Chaos"
- EU recruiters want proof of pivot (real story + metrics) not code flex
- English-default, SL secondary

## Design Tokens

```css
--color-primary: #ff6b35    /* existing orange — do not change globally */
--color-tesla:   #E82127    /* Tesla red — hero accent line ONLY */
```

## YouTube Drone Footage

Placeholders in `foto.html`. When footage is ready, replace `VIDEO_ID_HERE` with the YouTube video ID (11-char string from the URL). Three slots + one "coming soon" card. 16:9 via `padding-top: 56.25%` wrapper.
