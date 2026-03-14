# hrco.github.io — Portfolio Redesign Spec
**Date:** 2026-03-13
**Owner:** Valentin Križan (hrco)
**Status:** Ready for implementation plan

---

## Goal

Transform hrco.github.io from a quirky Douglas Adams placeholder into a clean, professional personal portfolio. Skills-first, honest, no fake projects. Adams survives only as a subtle footer whisper. EN primary, SL toggle kept (EU/SLO employer best practice per Grok 2026).

**Hard constraints:**
- Keep existing HTML/CSS/JS scaffold — no framework swap
- No new pages — reuse existing 5 pages
- Remove Ljubo Lover and DBBP42 from all visible content immediately
- Remove "Wise Voices" nav link and `my_suggestions.html` page entirely
- Tesla not named — "currently applying for CX roles in sustainable mobility"
- No Volunteer Fire Brigade
- No Projekt Karma / ljubo-lover.com / DBBP42.github.io references anywhere
- EMŠO and Tax ID must NEVER appear on the public site
- All new strings must use `data-i18n` attributes + entries added to `js/main.js` content map (both `en` and `sl` values)

---

## CSS Variables

Add to `:root` in `css/main.css`:
```css
--color-tesla: #E82127;
```
Use `--color-tesla` ONLY for the hero accent line. Do NOT change `--color-primary` globally.

---

## Nav Changes (ALL 5 page files)

Apply these label changes in every `<nav>` block across `index.html`, `about_me.html`, `projects.html`, `foto.html`, `news.html`:

| Old label | New label | i18n key |
|---|---|---|
| "Projects" | "Experience" | `NAV_EXPERIENCE` |
| "Visual Evidence" | "Visual" | `NAV_VISUAL` |
| "The Entity" | "About" | `NAV_ABOUT` |
| "Wise Voices" | *(remove entirely)* | — |

Logo text `HRCO` — keep as-is (brand handle, not real name).

---

## Page 1: `index.html` — Homepage

**Remove:**
- "HRCO's Digital Consciousness" headline
- "42% probability" tagline
- All Adams-as-hero copy
- Ljubo Lover card
- DBBP42 card
- Don't Panic card
- Entire Projects preview section
- "Visual Perspectives" photo preview section
- "About HRCO" teaser section

**Hero block (replace `.hero-section`):**
```html
<section class="hero-section">
  <div class="hero-content">
    <h1 data-i18n="HERO_NAME">Valentin Križan</h1>
    <div class="hero-accent-line"></div>  <!-- --color-tesla, 2px, full width -->
    <p class="hero-title" data-i18n="HERO_TITLE">Customer Experience & IT Professional</p>
    <p class="hero-meta" data-i18n="HERO_META">
      Adlešiči, Slovenia · C1 English · EU Licence B
    </p>
    <div class="hero-actions">
      <a href="about_me.html" class="btn btn-primary" data-i18n="NAV_ABOUT">About</a>
      <a href="projects.html" class="btn btn-secondary" data-i18n="NAV_EXPERIENCE">Experience</a>
      <a href="https://www.linkedin.com/in/valentin-krizan-zerofriction/"
         class="btn btn-ghost" target="_blank">LinkedIn</a>
      <a href="mailto:valentin.krizan@protonmail.com"
         class="btn btn-ghost" data-i18n="HERO_EMAIL">Email</a>
    </div>
  </div>
</section>
```

**Skills strip (add below hero):**
```html
<section class="skills-strip">
  <div class="skills-pills">
    <span data-i18n="SKILL_CX">Customer Experience</span>
    <span data-i18n="SKILL_IT">Electronics & IT</span>
    <span data-i18n="SKILL_CNC">CNC / Laser</span>
    <span data-i18n="SKILL_DRONE">EASA Drone Pilot</span>
    <span data-i18n="SKILL_SL">Slovenian</span>
    <span data-i18n="SKILL_EN">English C1</span>
    <span data-i18n="SKILL_HR">Croatian</span>
  </div>
</section>
```

**Footer one-liner (add above existing footer):**
```html
<p class="current-status" data-i18n="CURRENT_STATUS">
  Currently applying for CX roles in sustainable mobility.
</p>
```

**Adams easter egg — keep in footer only:**
```html
<p class="dont-panic">Don't Panic.</p>
```

---

## Page 2: `about_me.html` — About

**Remove:** All placeholder/lorem content, all Adams-flavour section headings.

**Bio text (inline — do not defer to external file):**

EN: *"Stress-resistant professional with a background spanning customer hospitality, IT, electronics, and field operations. I make complexity disappear — whether diagnosing a broken network or coordinating 50+ guests on a river. C1 English, EASA Drone Pilot, full EU driving licence."*

SL: *"Stresno odporen strokovnjak z izkušnjami na področju gostinstva, IT, elektronike in terenskih operacij. Kompleksnost naredim preprosto — naj gre za odpravljanje napak v omrežju ali koordinacijo 50+ gostov na reki. C1 angleščina, EASA pilot drona, polno EU vozniško dovoljenje."*

**Certifications block:**
- C1 Advanced English — International English Test, Sep 2024
- EASA UAS Drone Pilot A1/A3 Open — Slovenian CAA, valid Dec 2029
- NPK CNC Operator A-108 — 2015
- Driving Licences: AM, B1, B, F, G (EU car + tractor/agricultural)

**Languages block:**
- Slovenian (native) · English (C1) · Croatian (fluent) · Spanish (learning)

**Contact block:**
- +386 51 357 653
- valentin.krizan@protonmail.com
- LinkedIn: valentin-krizan-zerofriction
- IG: @valentin.krizan

---

## Page 3: `projects.html` → Experience

**Page title:** "Experience" (data-i18n: `EXPERIENCE_TITLE`)
**Remove:** All existing project cards.

**Accordion implementation — use native `<details>`/`<summary>` (no JS required):**

```html
<div class="experience-timeline">
  <details class="exp-entry">
    <summary class="exp-summary">
      <span class="exp-date">2025</span>
      <span class="exp-title">Hospitality & Activity Coordinator</span>
      <span class="exp-company">Kamp Jankovič, KOLPAS d.o.o.</span>
    </summary>
    <p class="exp-detail">End-to-end guest experiences for 50+ daily visitors — kayak/SUP coordination, river logistics, ground transport, hospitality on the Kolpa river.</p>
  </details>
  <!-- repeat for all 9 entries -->
</div>
```

**All 9 entries with descriptions:**

| Period | Title | Company | One-line description |
|---|---|---|---|
| 2025 | Hospitality & Activity Coordinator | Kamp Jankovič, KOLPAS d.o.o. | End-to-end guest experiences for 50+ daily visitors — kayak/SUP coordination, river logistics, hospitality on the Kolpa river. |
| 2023–Dec 2025 | Facility Management Specialist | FM OTiS, Valentin Križan S.P. | Self-employed floor & wall finishing specialist — client consultation, project execution, quality control. |
| May–Sep 2023 | On-site IT Support Contractor | Microsoft Ljubljana | Managed IT inventory and debugged AV conference room setups — punctual, jargon-free support. |
| May 2022–May 2023 | Junior Technical Maintenance Specialist | LPP Fashion (Modne blagovne znamke d.o.o.) | Maintained 20+ retail stores via ticketing system — calm, fast solutions under pressure. Led vendor onboarding (Sintal) and negotiated a director-signed national service contract. |
| Jan 2020–May 2023 | Self-Employed Computer Technician | Valentin Križan S.P. | Mobile & PC repairs, small networks — translated every fix into plain language for non-technical customers. |
| Dec 2021–Feb 2022 | Electrical Cabinet Assembly | Elmers d.o.o. / TOBOL GmbH | Full wiring & assembly per schematics — precision and quality focus. |
| May–Nov 2021 | 2D Laser Operator | Akrapovič d.d. | Fibre-glass laser programming, parameter setup, material handling — technical drawings & G-code. |
| 2013–2020 | Drywall Systems & Quality Control | DAMONT d.o.o. & Montaža Grabrijan | Knauf/Armstrong/AMF systems, measurements, quality checks. |
| 2005–2013 | Waiter & Shift Leader | KOLPAS d.o.o. / Napoleon Caffe | Led team of 6, organised events for 100+ guests — turned every frustrated customer into a regular. |

**Behaviour:** Native `<details>` — multiple entries can be open simultaneously. No custom JS needed.

---

## Page 4: `foto.html` → Visual

**Nav label:** "Visual"
**Remove/rename:** Adams-flavour section headers ("Morning Fog Chronicles" etc.) → neutral labels ("Drone Footage", "Photography").

**Add above existing photo grid — Drone Footage section:**

```html
<section class="drone-section">
  <h2 data-i18n="DRONE_TITLE">Drone Footage</h2>
  <div class="video-grid">

    <!-- Video card template (repeat 3x) -->
    <div class="video-card">
      <div class="video-wrapper"> <!-- 16:9 via padding-top: 56.25% trick -->
        <iframe
          src="https://www.youtube.com/embed/VIDEO_ID_HERE"
          title="Drone footage"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
      <p class="video-caption" data-i18n="VIDEO_1_CAPTION">Kolpa river — summer 2025</p>
    </div>

    <!-- Coming soon card (4th slot) -->
    <div class="video-card video-card--soon">
      <div class="video-wrapper video-wrapper--placeholder">
        <span>▶ More coming soon</span>
      </div>
      <p class="video-caption" data-i18n="VIDEO_SOON">More footage coming soon</p>
    </div>

  </div>
</section>
```

**CSS for 16:9 responsive iframe:**
```css
.video-wrapper {
  position: relative;
  padding-top: 56.25%;
  background: #111;
}
.video-wrapper iframe {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  border: 0;
}
.video-wrapper--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

## Page 5: `news.html`

No changes. Leave untouched.

---

## i18n Keys to Add (`js/main.js`)

All keys below need both `en` and `sl` values added to the `content` map:

```
HERO_NAME, HERO_TITLE, HERO_META, HERO_EMAIL,
NAV_EXPERIENCE, NAV_VISUAL, NAV_ABOUT,
SKILL_CX, SKILL_IT, SKILL_CNC, SKILL_DRONE, SKILL_SL, SKILL_EN, SKILL_HR,
CURRENT_STATUS,
EXPERIENCE_TITLE, (exp entry keys for each of 9 jobs — EXP_1 through EXP_9 title/company/date/detail),
DRONE_TITLE, VIDEO_1_CAPTION, VIDEO_2_CAPTION, VIDEO_3_CAPTION, VIDEO_SOON,
ABOUT_BIO, ABOUT_CERTS_TITLE, ABOUT_LANG_TITLE, ABOUT_CONTACT_TITLE
```

---

## Non-Goals

- No new pages
- No framework
- No backend
- No CV download link
- No blog
- No analytics
- No EMŠO / Tax ID on public site

---

## Adams Easter Egg

`Don't Panic.` — footer only, small grey text. Nothing else.
