# hrco.github.io — Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform hrco.github.io from a Douglas Adams placeholder into a clean, skills-first professional portfolio for Valentin Križan, with real bio, work history accordion, drone video section, and bilingual EN/SL content throughout.

**Architecture:** Static HTML/CSS/JS — no build step, no framework. All CSS lives in `css/main.css` (single stylesheet). All i18n strings live in the `content` object in `js/main.js`. HTML files are edited directly. New component styles added to `css/main.css`. Experience accordion uses native `<details>/<summary>` — zero JS needed. Verification is done by running a local HTTP server and inspecting the page visually.

**Tech Stack:** HTML5, CSS3 (custom properties), Vanilla JS, Font Awesome 6.5.1 (CDN)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `css/main.css` | Modify | Add `--color-tesla`, `btn-ghost`, hero accent line, skills strip, footer extras, experience timeline accordion, drone video grid |
| `js/main.js` | Modify | Add all new i18n keys (HERO_*, NAV_*, SKILL_*, EXP_1–9, ABOUT_*, DRONE_*, VIDEO_*); update EXPERIENCE_TITLE, PROJECTS_TITLE, FOTO_SECTION_* values |
| `index.html` | Modify | New hero block, skills strip, footer status line, Don't Panic easter egg; remove old sections |
| `about_me.html` | Modify | Real bio, certs, languages, contact; remove Adams content and inline `<style>` |
| `projects.html` | Modify | Experience accordion with 9 entries; remove project cards and inline `<style>` |
| `foto.html` | Modify | Add drone footage section above photos; rename section headers |
| `news.html` | Modify | Nav labels only (Wise Voices removed, labels updated) |
| `my_suggestions.html` | Delete | Removed entirely per spec |

**Local server command (use for all verification steps):**
```bash
python3 -m http.server 8080 --directory /home/supremeleader/mylab/hrco.github.io
```
Then open `http://localhost:8080` in a browser.

---

## Chunk 1: Foundation — CSS + i18n

### Task 1: CSS — new variables and component styles

**Files:**
- Modify: `css/main.css`

- [ ] **Step 1: Add `--color-tesla` to `:root` and `btn-ghost` button variant**

In `css/main.css`, inside the `:root {}` block (after `--shadow-lg` line, around line 32), add:
```css
    --color-tesla: #E82127;
```
**Note:** `--color-tesla` is for the hero accent line only — do not reuse it elsewhere.

After the `.btn-outline:hover` block (around line 305), add:
```css
.btn-ghost {
    background: transparent;
    border: 2px solid var(--color-text-subtle);
    color: var(--color-text-subtle);
}

.btn-ghost:hover {
    border-color: var(--color-text);
    color: var(--color-text);
    background: var(--color-surface);
}
```

- [ ] **Step 2: Add hero accent line and new hero text styles**

After the `.hero-actions` block (around line 251), add:
```css
/* Hero accent line */
.hero-accent-line {
    width: 100%;
    height: 2px;
    background: var(--color-tesla);
    margin: 1rem auto 1.2rem;
    border: none;
}

.hero-title {
    font-size: 1.3rem;
    color: var(--color-text-subtle);
    margin-bottom: 0.5rem;
    font-family: var(--font-display);
    font-weight: 500;
}

.hero-meta {
    font-size: 0.95rem;
    color: var(--color-text-subtle);
    margin-bottom: 2rem;
    font-style: italic;
}
```

- [ ] **Step 3: Add skills strip styles**

Add after the `.hero-meta` block:
```css
/* Skills strip */
.skills-strip {
    padding: 0 0 3rem;
    text-align: center;
}

.skills-pills {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
}

.skills-pills span {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    color: var(--color-text-subtle);
    padding: 0.45rem 1.1rem;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all var(--transition);
}

.skills-pills span:hover {
    border-color: var(--color-primary);
    color: var(--color-text);
}
```

- [ ] **Step 4: Add footer extras (current-status and dont-panic)**

Add after the `.skills-pills span:hover` block:
```css
/* Footer extras */
.current-status {
    text-align: center;
    color: var(--color-text-subtle);
    font-style: italic;
    font-size: 0.95rem;
    padding: 1.5rem 0 0;
    border-top: 1px solid var(--color-border);
    margin-top: 2rem;
}

.dont-panic {
    font-size: 0.8rem;
    color: var(--color-border);
    text-align: center;
    margin-top: 0.5rem;
    font-style: italic;
}
```

- [ ] **Step 5: Add experience timeline and accordion styles**

Add after the `.dont-panic` block:
```css
/* Experience timeline accordion */
.experience-timeline {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 2rem;
}

.exp-entry {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    overflow: hidden;
    transition: border-color var(--transition);
}

.exp-entry[open] {
    border-color: var(--color-primary);
}

.exp-summary {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25rem 1rem;
    padding: 1.1rem 1.5rem;
    cursor: pointer;
    list-style: none;
    user-select: none;
    position: relative;
    padding-right: 3rem;
}

.exp-summary::-webkit-details-marker {
    display: none;
}

.exp-summary::after {
    content: '+';
    position: absolute;
    right: 1.5rem;
    font-family: var(--font-display);
    font-size: 1.1rem;
    color: var(--color-primary);
}

.exp-entry[open] .exp-summary::after {
    content: '−';
}

.exp-date {
    flex: 0 0 7rem;
    font-family: var(--font-display);
    font-size: 0.72rem;
    color: var(--color-primary);
    letter-spacing: 0.04em;
}

.exp-title {
    flex: 1;
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--color-text);
}

.exp-company {
    width: 100%;
    padding-left: 8rem;
    font-size: 0.8rem;
    color: var(--color-text-subtle);
    font-style: italic;
}

.exp-detail {
    padding: 1rem 1.5rem 1.2rem;
    color: var(--color-text-subtle);
    font-size: 0.9rem;
    line-height: 1.7;
    border-top: 1px solid var(--color-border);
}

@media (max-width: 600px) {
    .exp-summary {
        flex-direction: column;
        gap: 0.25rem;
    }
    .exp-date {
        flex: none;
        width: auto;
    }
    .exp-company {
        padding-left: 0;
    }
}
```

- [ ] **Step 6: Add drone video grid styles**

Add after the mobile accordion media query:
```css
/* Drone footage / video grid */
.drone-section {
    margin-bottom: 3rem;
}

.drone-section h2 {
    font-family: var(--font-display);
    font-size: 1.4rem;
    color: var(--color-text);
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-border);
}

.video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}

.video-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    overflow: hidden;
    transition: border-color var(--transition);
}

.video-card:hover {
    border-color: var(--color-primary);
}

.video-wrapper {
    position: relative;
    padding-top: 56.25%;
    background: #111;
}

.video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
}

.video-wrapper--placeholder > span {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-subtle);
    font-size: 0.9rem;
}

.video-caption {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
    color: var(--color-text-subtle);
    font-style: italic;
}
```

- [ ] **Step 7: Verify CSS**

Start the local server and open `http://localhost:8080`. No visual changes yet (new classes are unused). Check browser DevTools console — should show zero CSS errors.

- [ ] **Step 8: Commit**

```bash
cd /home/supremeleader/mylab/hrco.github.io
git add css/main.css
git commit -m "feat: add CSS variables and component styles for portfolio redesign"
```

---

### Task 2: i18n — add all new keys to js/main.js

**Files:**
- Modify: `js/main.js`

- [ ] **Step 1: Add nav, hero, and skills keys**

In `js/main.js`, inside the `const content = {` object:

**First, delete the `SUGGESTIONS_LINK` entry** (the nav link for the removed Wise Voices page):
```javascript
// DELETE this line:
'SUGGESTIONS_LINK': { 'en': 'Wise Voices', 'sl': 'Modri Glasovi' },
```

Then add the following new keys after the removed entry (around line 49):

```javascript
        // Nav — new labels
        'NAV_EXPERIENCE': { 'en': 'Experience', 'sl': 'Izkušnje' },
        'NAV_VISUAL': { 'en': 'Visual', 'sl': 'Vizualno' },
        'NAV_ABOUT': { 'en': 'About', 'sl': 'O meni' },

        // Hero — index.html
        'HERO_NAME': { 'en': 'Valentin Križan', 'sl': 'Valentin Križan' },
        'HERO_TITLE': { 'en': 'Customer Experience & IT Professional', 'sl': 'Strokovnjak za CX in IT' },
        'HERO_META': { 'en': 'Adlešiči, Slovenia · C1 English · EU Licence B', 'sl': 'Adlešiči, Slovenija · C1 angleščina · EU izpit B' },
        'HERO_EMAIL': { 'en': 'Email', 'sl': 'E-pošta' },
        'CURRENT_STATUS': {
            'en': 'Currently applying for CX roles in sustainable mobility.',
            'sl': 'Trenutno se prijavljam na CX vloge v trajnostni mobilnosti.'
        },

        // Skills strip
        'SKILL_CX': { 'en': 'Customer Experience', 'sl': 'Gostinska izkušnja' },
        'SKILL_IT': { 'en': 'Electronics & IT', 'sl': 'Elektronika in IT' },
        'SKILL_CNC': { 'en': 'CNC / Laser', 'sl': 'CNC / Laser' },
        'SKILL_DRONE': { 'en': 'EASA Drone Pilot', 'sl': 'EASA Pilot drona' },
        'SKILL_SL': { 'en': 'Slovenian', 'sl': 'Slovenščina' },
        'SKILL_EN': { 'en': 'English C1', 'sl': 'Angleščina C1' },
        'SKILL_HR': { 'en': 'Croatian', 'sl': 'Hrvaščina' },
```

- [ ] **Step 2: Update EXPERIENCE_TITLE and PROJECTS_TITLE values**

Find the existing `'EXPERIENCE_TITLE'` entry (around line 267). Current value is `'en': 'Professional Improbabilities'`. Update it to:
```javascript
        'EXPERIENCE_TITLE': {
            'en': 'Experience',
            'sl': 'Izkušnje'
        },
```

Find the existing `'PROJECTS_TITLE'` entry (around line 175). Current value is `'en': 'Digital Improbabilities | HRCO'`. Update it to:
```javascript
        'PROJECTS_TITLE': {
            'en': 'Experience | HRCO',
            'sl': 'Izkušnje | HRCO'
        },
```

- [ ] **Step 3: Add experience accordion keys (EXP_1 through EXP_9)**

Add after the updated `EXPERIENCE_TITLE` entry:

```javascript
        // Experience accordion entries
        'EXP_1_DATE': { 'en': '2025', 'sl': '2025' },
        'EXP_1_TITLE': { 'en': 'Hospitality & Activity Coordinator', 'sl': 'Koordinator gostinstva in aktivnosti' },
        'EXP_1_COMPANY': { 'en': 'Kamp Jankovič, KOLPAS d.o.o.', 'sl': 'Kamp Jankovič, KOLPAS d.o.o.' },
        'EXP_1_DETAIL': {
            'en': 'End-to-end guest experiences for 50+ daily visitors — kayak/SUP coordination, river logistics, ground transport, hospitality on the Kolpa river.',
            'sl': 'Celostne gostinske izkušnje za 50+ dnevnih obiskovalcev — koordinacija kajaka/SUP, rečna logistika, kopenski prevoz, gostoljubnost na reki Kolpi.'
        },

        'EXP_2_DATE': { 'en': '2023–Dec 2025', 'sl': '2023–Dec 2025' },
        'EXP_2_TITLE': { 'en': 'Facility Management Specialist', 'sl': 'Specialist upravljanja objektov' },
        'EXP_2_COMPANY': { 'en': 'FM OTiS, Valentin Križan S.P.', 'sl': 'FM OTiS, Valentin Križan S.P.' },
        'EXP_2_DETAIL': {
            'en': 'Self-employed floor & wall finishing specialist — client consultation, project execution, quality control.',
            'sl': 'Samozaposleni specialist za obdelavo tal in sten — svetovanje strankam, izvedba projektov, kontrola kakovosti.'
        },

        'EXP_3_DATE': { 'en': 'May–Sep 2023', 'sl': 'Maj–Sep 2023' },
        'EXP_3_TITLE': { 'en': 'On-site IT Support Contractor', 'sl': 'Pogodbeni IT podpornik na terenu' },
        'EXP_3_COMPANY': { 'en': 'Microsoft Ljubljana', 'sl': 'Microsoft Ljubljana' },
        'EXP_3_DETAIL': {
            'en': 'Managed IT inventory and debugged AV conference room setups — punctual, jargon-free support.',
            'sl': 'Upravljanje IT inventarja in odpravljanje napak v avdiovizualnih konferenčnih prostorih — točna, razumljiva podpora.'
        },

        'EXP_4_DATE': { 'en': '2022–2023', 'sl': '2022–2023' },
        'EXP_4_TITLE': { 'en': 'Junior Technical Maintenance Specialist', 'sl': 'Mlajši tehnik tehničnega vzdrževanja' },
        'EXP_4_COMPANY': { 'en': 'LPP Fashion (Modne blagovne znamke d.o.o.)', 'sl': 'LPP Fashion (Modne blagovne znamke d.o.o.)' },
        'EXP_4_DETAIL': {
            'en': 'Maintained 20+ retail stores via ticketing system — calm, fast solutions under pressure. Led vendor onboarding (Sintal) and negotiated a director-signed national service contract.',
            'sl': 'Vzdrževanje 20+ maloprodajnih trgovin prek sistema zahtevkov — mirne, hitre rešitve pod pritiskom. Vodil uvajanje dobavitelja (Sintal) in pogajal nacionalno servisno pogodbo, podpisano s strani direktorja.'
        },

        'EXP_5_DATE': { 'en': '2020–2023', 'sl': '2020–2023' },
        'EXP_5_TITLE': { 'en': 'Self-Employed Computer Technician', 'sl': 'Samozaposleni računalniški tehnik' },
        'EXP_5_COMPANY': { 'en': 'Valentin Križan S.P.', 'sl': 'Valentin Križan S.P.' },
        'EXP_5_DETAIL': {
            'en': 'Mobile & PC repairs, small networks — translated every fix into plain language for non-technical customers.',
            'sl': 'Popravila mobilnih telefonov in računalnikov, manjša omrežja — vsako popravilo razloženo v preprostem jeziku za netehnične stranke.'
        },

        'EXP_6_DATE': { 'en': 'Dec 2021–Feb 2022', 'sl': 'Dec 2021–Feb 2022' },
        'EXP_6_TITLE': { 'en': 'Electrical Cabinet Assembly', 'sl': 'Sestavljalec elektro omaric' },
        'EXP_6_COMPANY': { 'en': 'Elmers d.o.o. / TOBOL GmbH', 'sl': 'Elmers d.o.o. / TOBOL GmbH' },
        'EXP_6_DETAIL': {
            'en': 'Full wiring & assembly per schematics — precision and quality focus.',
            'sl': 'Celotna vezava in sestavljanje po shemah — poudarek na natančnosti in kakovosti.'
        },

        'EXP_7_DATE': { 'en': 'May–Nov 2021', 'sl': 'Maj–Nov 2021' },
        'EXP_7_TITLE': { 'en': '2D Laser Operator', 'sl': 'Operater 2D laserja' },
        'EXP_7_COMPANY': { 'en': 'Akrapovič d.d.', 'sl': 'Akrapovič d.d.' },
        'EXP_7_DETAIL': {
            'en': 'Fibre-glass laser programming, parameter setup, material handling — technical drawings & G-code.',
            'sl': 'Programiranje laserja za steklena vlakna, nastavitev parametrov, rokovanje z materialom — tehnične risbe in G-koda.'
        },

        'EXP_8_DATE': { 'en': '2013–2020', 'sl': '2013–2020' },
        'EXP_8_TITLE': { 'en': 'Drywall Systems & Quality Control', 'sl': 'Mavčnokartonski sistemi in kontrola kakovosti' },
        'EXP_8_COMPANY': { 'en': 'DAMONT d.o.o. & Montaža Grabrijan', 'sl': 'DAMONT d.o.o. & Montaža Grabrijan' },
        'EXP_8_DETAIL': {
            'en': 'Knauf/Armstrong/AMF systems, measurements, quality checks.',
            'sl': 'Sistemi Knauf/Armstrong/AMF, merjenje, kontrola kakovosti.'
        },

        'EXP_9_DATE': { 'en': '2005–2013', 'sl': '2005–2013' },
        'EXP_9_TITLE': { 'en': 'Waiter & Shift Leader', 'sl': 'Natakar in vodja izmene' },
        'EXP_9_COMPANY': { 'en': 'KOLPAS d.o.o. / Napoleon Caffe', 'sl': 'KOLPAS d.o.o. / Napoleon Caffe' },
        'EXP_9_DETAIL': {
            'en': 'Led team of 6, organised events for 100+ guests — turned every frustrated customer into a regular.',
            'sl': 'Vodil ekipo 6 oseb, organiziral prireditve za 100+ gostov — vsako nezadovoljno stranko spremenil v rednega obiskovalca.'
        },
```

- [ ] **Step 4: Add about page keys**

Add after the EXP_9 block:
```javascript
        // About page
        'ABOUT_BIO': {
            'en': 'Stress-resistant professional with a background spanning customer hospitality, IT, electronics, and field operations. I make complexity disappear — whether diagnosing a broken network or coordinating 50+ guests on a river. C1 English, EASA Drone Pilot, full EU driving licence.',
            'sl': 'Stresno odporen strokovnjak z izkušnjami na področju gostinstva, IT, elektronike in terenskih operacij. Kompleksnost naredim preprosto — naj gre za odpravljanje napak v omrežju ali koordinacijo 50+ gostov na reki. C1 angleščina, EASA pilot drona, polno EU vozniško dovoljenje.'
        },
        'ABOUT_CERTS_TITLE': { 'en': 'Certifications', 'sl': 'Certifikati' },
        'ABOUT_LANG_TITLE': { 'en': 'Languages', 'sl': 'Jeziki' },
        'ABOUT_CONTACT_TITLE': { 'en': 'Contact', 'sl': 'Kontakt' },
```

- [ ] **Step 5: Add drone/video keys and update foto section headers**

Add after the about page block:
```javascript
        // Drone footage — foto.html
        'DRONE_TITLE': { 'en': 'Drone Footage', 'sl': 'Posnetki z drona' },
        'VIDEO_1_CAPTION': { 'en': 'Kolpa river — summer 2025', 'sl': 'Reka Kolpa — poletje 2025' },
        'VIDEO_2_CAPTION': { 'en': 'Aerial view — Bela Krajina', 'sl': 'Pogled iz zraka — Bela Krajina' },
        'VIDEO_3_CAPTION': { 'en': 'Drone footage — coming soon', 'sl': 'Posnetek z drona — kmalu' },
        'VIDEO_SOON': { 'en': 'More footage coming soon', 'sl': 'Kmalu več posnetkov' },
        // NOTE: VIDEO_1_CAPTION and VIDEO_2_CAPTION assume real footage is available.
        // VIDEO_3_CAPTION and VIDEO_SOON are explicit placeholders until more footage is ready.
        // All three video iframes use VIDEO_ID_HERE — see foto.html task precondition.
```

Then find the existing `FOTO_SECTION_FOG`, `FOTO_SECTION_WINTER`, `FOTO_SECTION_RIVER`, `FOTO_SECTION_PASTORAL` entries (around lines 333–348) and update their values:
```javascript
        'FOTO_SECTION_FOG': { 'en': 'Fog & Sunrise', 'sl': 'Megla in sončni vzhod' },
        'FOTO_SECTION_WINTER': { 'en': 'Winter', 'sl': 'Zima' },
        'FOTO_SECTION_RIVER': { 'en': 'River Aerials', 'sl': 'Rečni posnetki iz zraka' },
        'FOTO_SECTION_PASTORAL': { 'en': 'Pastoral', 'sl': 'Pastoralno' },
```

- [ ] **Step 6: Remove stale EXP stubs from `js/main.js`**

The `about_me.html` page previously used Adams-flavour `EXP_1_TITLE`, `EXP_1_DESC`, `EXP_2_TITLE`, `EXP_2_DESC`, `SKILLS_TITLE`, `SKILL_WEB`, `SKILL_BACKEND`, `SKILL_OTHER` keys. These are being replaced by the new `EXP_1_TITLE` through `EXP_9_*` keys and will have no HTML references after Chunk 2. Delete these now-orphaned entries from the `content` object:
```javascript
// DELETE these stale keys:
'EXP_1_TITLE': { ... },  // "System Architect & Digital Plumber"
'EXP_1_DESC': { ... },
'EXP_2_TITLE': { ... },  // "Data Whisperer & Automation Enthusiast"
'EXP_2_DESC': { ... },
'SKILLS_TITLE': { ... }, // "Technical Arsenal (Don't Panic)"
'SKILL_WEB': { ... },
'SKILL_BACKEND': { ... },
'SKILL_OTHER': { ... },
```
Also delete the project-page keys that will be orphaned after Chunk 2 (`PROJECT_LJUBO_DESC`, `PROJECT_GITHUB_DESC`, `PROJECT_PANIC_DESC`, `PROJECT_STATUS_LIVE`, `PROJECT_STATUS_DEV`, `PROJECT_VISIT_SITE`, `PROJECT_COMING_SOON`, `PROJECT_STATIC_SITE`, `PROJECT_LEARNING_NOTE`, `PROJECTS_HEADING`, `PROJECTS_INTRO`).

- [ ] **Step 7: Verify i18n**

Start local server. Open `http://localhost:8080` — still looks like the old site (new keys not yet referenced in HTML). Toggle SLO/ENG buttons — page should switch correctly with no JS console errors.

- [ ] **Step 8: Commit**

```bash
git add js/main.js
git commit -m "feat: add i18n keys for portfolio redesign (hero, nav, skills, exp, about, drone); remove stale keys"
```

---

## Chunk 2: HTML Pages

### Task 3: index.html — new hero, skills strip, footer

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace the hero section**

Find and replace the entire `<section class="hero-section">` block (the one containing `data-i18n="GREETING"` heading) with:

```html
            <!-- Hero Section -->
            <section class="hero-section">
                <div class="hero-content">
                    <h1 data-i18n="HERO_NAME">Valentin Križan</h1>
                    <div class="hero-accent-line"></div>
                    <p class="hero-title" data-i18n="HERO_TITLE">Customer Experience & IT Professional</p>
                    <p class="hero-meta" data-i18n="HERO_META">Adlešiči, Slovenia · C1 English · EU Licence B</p>
                    <div class="hero-actions">
                        <a href="about_me.html" class="btn btn-primary" data-i18n="NAV_ABOUT">About</a>
                        <a href="projects.html" class="btn btn-secondary" data-i18n="NAV_EXPERIENCE">Experience</a>
                        <a href="https://www.linkedin.com/in/valentin-krizan-zerofriction/"
                           class="btn btn-ghost" target="_blank" rel="noopener">LinkedIn</a>
                        <a href="mailto:valentin.krizan@protonmail.com"
                           class="btn btn-ghost" data-i18n="HERO_EMAIL">Email</a>
                    </div>
                </div>
            </section>
```

- [ ] **Step 2: Add skills strip (after hero section, before the next section)**

After the closing `</section>` of the hero, add:
```html
            <!-- Skills Strip -->
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

- [ ] **Step 3: Remove the projects preview, photo preview, and about teaser sections**

Delete the three `<section class="section-preview">` blocks and the `<section class="section-preview about-teaser">` block (everything between the skills strip and `</main>`). The `<main>` tag should close directly after the skills strip section.

- [ ] **Step 4: Update nav links to use new i18n keys**

In the `<nav id="main-nav">` block of `index.html`, change:
- `data-i18n="PROJECTS_LINK"` → `data-i18n="NAV_EXPERIENCE"` and inner text → "Experience"
- `data-i18n="FOTO_LINK"` → `data-i18n="NAV_VISUAL"` and inner text → "Visual"
- `data-i18n="ABOUT_LINK"` → `data-i18n="NAV_ABOUT"` and inner text → "About"
- Remove the Wise Voices `<a>` link entirely (if present — check current file)

- [ ] **Step 5: Add current-status and Don't Panic to footer**

Find the `<footer class="footer">` block. Inside `<div class="container">`, before the copyright `<p>`, add:
```html
            <p class="current-status" data-i18n="CURRENT_STATUS">Currently applying for CX roles in sustainable mobility.</p>
            <p class="dont-panic">Don't Panic.</p>
```

- [ ] **Step 6: Verify index.html**

Open `http://localhost:8080/index.html`. Check:
- Hero shows "Valentin Križan" heading with a red accent line
- Four buttons below (About, Experience, LinkedIn, Email)
- Seven skill pills below hero
- No project cards, no photo preview, no "About HRCO" teaser
- Footer shows current-status text and "Don't Panic." in small grey
- Toggle SLO — hero meta switches to Slovenian

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "feat: replace index.html hero with professional content and skills strip"
```

---

### Task 4: Nav cleanup — all 5 pages

**Files:**
- Modify: `about_me.html`, `projects.html`, `foto.html`, `news.html`
- (`index.html` nav already updated in Task 3)

For each of the four files below, apply the same nav changes:
- Change `data-i18n="PROJECTS_LINK"` → `data-i18n="NAV_EXPERIENCE"`, text → "Experience"
- Change `data-i18n="FOTO_LINK"` → `data-i18n="NAV_VISUAL"`, text → "Visual"
- Change `data-i18n="ABOUT_LINK"` → `data-i18n="NAV_ABOUT"`, text → "About"
- Remove the entire `<a href="my_suggestions.html" ...>Wise Voices</a>` nav link

- [ ] **Step 1: Update about_me.html nav**

In `about_me.html` `<nav id="main-nav">`:
```html
            <nav id="main-nav">
                <a href="index.html" class="nav-link" data-i18n="HOME_LINK">Start</a>
                <a href="news.html" class="nav-link" data-i18n="NEWS_LINK">News</a>
                <a href="foto.html" class="nav-link" data-i18n="NAV_VISUAL">Visual</a>
                <a href="projects.html" class="nav-link" data-i18n="NAV_EXPERIENCE">Experience</a>
                <a href="about_me.html" class="nav-link active" data-i18n="NAV_ABOUT">About</a>
            </nav>
```

- [ ] **Step 2: Update projects.html nav**

In `projects.html` `<nav id="main-nav">`:
```html
            <nav id="main-nav">
                <a href="index.html" class="nav-link" data-i18n="HOME_LINK">Start</a>
                <a href="news.html" class="nav-link" data-i18n="NEWS_LINK">News</a>
                <a href="foto.html" class="nav-link" data-i18n="NAV_VISUAL">Visual</a>
                <a href="projects.html" class="nav-link active" data-i18n="NAV_EXPERIENCE">Experience</a>
                <a href="about_me.html" class="nav-link" data-i18n="NAV_ABOUT">About</a>
            </nav>
```

- [ ] **Step 3: Update foto.html nav**

In `foto.html` `<nav id="main-nav">`:
```html
            <nav id="main-nav">
                <a href="index.html" class="nav-link" data-i18n="HOME_LINK">Start</a>
                <a href="news.html" class="nav-link" data-i18n="NEWS_LINK">News</a>
                <a href="foto.html" class="nav-link active" data-i18n="NAV_VISUAL">Visual</a>
                <a href="projects.html" class="nav-link" data-i18n="NAV_EXPERIENCE">Experience</a>
                <a href="about_me.html" class="nav-link" data-i18n="NAV_ABOUT">About</a>
            </nav>
```

- [ ] **Step 4: Update news.html nav**

In `news.html` `<nav id="main-nav">`, replace the current block (which has `FOTO_LINK`, `PROJECTS_LINK`, `ABOUT_LINK`, and Wise Voices) with:
```html
            <nav id="main-nav">
                <a href="index.html" class="nav-link" data-i18n="HOME_LINK">Start</a>
                <a href="news.html" class="nav-link active" data-i18n="NEWS_LINK">News</a>
                <a href="foto.html" class="nav-link" data-i18n="NAV_VISUAL">Visual</a>
                <a href="projects.html" class="nav-link" data-i18n="NAV_EXPERIENCE">Experience</a>
                <a href="about_me.html" class="nav-link" data-i18n="NAV_ABOUT">About</a>
            </nav>
```

- [ ] **Step 5: Verify nav across pages**

Open each of these URLs and confirm:
- `http://localhost:8080/about_me.html` — nav shows: Start | News | Visual | Experience | About
- `http://localhost:8080/projects.html` — same nav, "Experience" is active
- `http://localhost:8080/foto.html` — same nav, "Visual" is active
- `http://localhost:8080/news.html` — same nav, "News" is active
- No page has a "Wise Voices" link
- Toggle SLO on any page — nav labels switch language

- [ ] **Step 6: Commit**

```bash
git add about_me.html projects.html foto.html news.html
git commit -m "feat: update nav labels and remove Wise Voices link from all pages"
```

---

### Task 5: about_me.html — real bio, certs, languages, contact

**Files:**
- Modify: `about_me.html`

- [ ] **Step 1: Remove the inline `<style>` block**

Delete the entire `<style>` block inside `<head>` of `about_me.html` (lines 10–63 — the `.experience-section`, `.experience-card`, `.skills-list` styles). These components are being replaced.

- [ ] **Step 2: Update page title**

Change:
```html
<title data-i18n="ABOUT_ME_TITLE">About This Improbable Entity</title>
```
To:
```html
<title data-i18n="NAV_ABOUT">About</title>
```

- [ ] **Step 3: Replace the main content**

Replace everything inside `<main>` with:
```html
        <main>
            <!-- Bio -->
            <section class="card">
                <h1 data-i18n="NAV_ABOUT">About</h1>
                <p data-i18n="ABOUT_BIO">Stress-resistant professional with a background spanning customer hospitality, IT, electronics, and field operations. I make complexity disappear — whether diagnosing a broken network or coordinating 50+ guests on a river. C1 English, EASA Drone Pilot, full EU driving licence.</p>
            </section>

            <!-- Certifications -->
            <section class="card">
                <h2 data-i18n="ABOUT_CERTS_TITLE">Certifications</h2>
                <ul class="skills-list">
                    <li>C1 Advanced English — International English Test, Sep 2024</li>
                    <li>EASA UAS Drone Pilot A1/A3 Open — Slovenian CAA, valid Dec 2029</li>
                    <li>NPK CNC Operator A-108 — 2015</li>
                    <li>Driving Licences: AM, B1, B, F, G (EU car + tractor/agricultural)</li>
                </ul>
            </section>

            <!-- Languages -->
            <section class="card">
                <h2 data-i18n="ABOUT_LANG_TITLE">Languages</h2>
                <ul class="skills-list">
                    <li>Slovenian (native)</li>
                    <li>English (C1)</li>
                    <li>Croatian (fluent)</li>
                    <li>Spanish (learning)</li>
                </ul>
            </section>

            <!-- Contact -->
            <section class="card">
                <h2 data-i18n="ABOUT_CONTACT_TITLE">Contact</h2>
                <ul class="skills-list">
                    <li><a href="tel:+38651357653" style="color: inherit;">+386 51 357 653</a></li>
                    <li><a href="mailto:valentin.krizan@protonmail.com" style="color: inherit;">valentin.krizan@protonmail.com</a></li>
                    <li><a href="https://www.linkedin.com/in/valentin-krizan-zerofriction/" target="_blank" rel="noopener" style="color: inherit;">LinkedIn: valentin-krizan-zerofriction</a></li>
                    <li><a href="https://instagram.com/valentin.krizan" target="_blank" rel="noopener" style="color: inherit;">IG: @valentin.krizan</a></li>
                </ul>
            </section>
        </main>
```

- [ ] **Step 4: Add `.skills-list` styles to `css/main.css`**

The original `about_me.html` defined `.skills-list` in an inline `<style>` block (now removed in Step 1). Add the replacement to `css/main.css` after the `.exp-detail` block:

```css
/* Shared list style for about page */
.skills-list {
    list-style: none;
    padding-left: 0;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
}

.skills-list li {
    padding: 0.6rem 1rem;
    background: rgba(255, 107, 53, 0.06);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    font-size: 0.9rem;
    color: var(--color-text);
}

.skills-list li a {
    text-decoration: none;
}

.skills-list li a:hover {
    text-decoration: underline;
}
```

- [ ] **Step 5: Verify about_me.html**

Open `http://localhost:8080/about_me.html`. Check:
- Bio paragraph renders correctly
- Four sections: bio, certs, languages, contact — all as card blocks
- No Adams content ("Origin Story", "Professional Improbabilities", etc.)
- Toggle SLO — bio text switches to Slovenian; section headings switch language
- Contact links are clickable

- [ ] **Step 6: Commit**

```bash
git add about_me.html css/main.css
git commit -m "feat: rewrite about_me.html with real bio, certs, languages and contact"
```

---

### Task 6: projects.html → Experience accordion

**Files:**
- Modify: `projects.html`

- [ ] **Step 1: Remove the inline `<style>` block**

Delete the entire `<style>` block inside `<head>` of `projects.html` (the block containing `.projects-grid`, `.project-card`, `.project-status`, etc.).

- [ ] **Step 2: Update page title tag**

Change:
```html
<title data-i18n="PROJECTS_TITLE">Digital Improbabilities | HRCO</title>
```
To:
```html
<title data-i18n="PROJECTS_TITLE">Experience | HRCO</title>
```

- [ ] **Step 3: Replace the entire `<main>` content with the accordion**

Replace everything inside `<main>` with:
```html
        <main>
            <section class="card">
                <h1 data-i18n="EXPERIENCE_TITLE">Experience</h1>
            </section>

            <div class="experience-timeline">

                <details class="exp-entry">
                    <summary class="exp-summary">
                        <span class="exp-date" data-i18n="EXP_1_DATE">2025</span>
                        <span class="exp-title" data-i18n="EXP_1_TITLE">Hospitality & Activity Coordinator</span>
                        <span class="exp-company" data-i18n="EXP_1_COMPANY">Kamp Jankovič, KOLPAS d.o.o.</span>
                    </summary>
                    <p class="exp-detail" data-i18n="EXP_1_DETAIL">End-to-end guest experiences for 50+ daily visitors — kayak/SUP coordination, river logistics, ground transport, hospitality on the Kolpa river.</p>
                </details>

                <details class="exp-entry">
                    <summary class="exp-summary">
                        <span class="exp-date" data-i18n="EXP_2_DATE">2023–2025</span>
                        <span class="exp-title" data-i18n="EXP_2_TITLE">Facility Management Specialist</span>
                        <span class="exp-company" data-i18n="EXP_2_COMPANY">FM OTiS, Valentin Križan S.P.</span>
                    </summary>
                    <p class="exp-detail" data-i18n="EXP_2_DETAIL">Self-employed floor & wall finishing specialist — client consultation, project execution, quality control.</p>
                </details>

                <details class="exp-entry">
                    <summary class="exp-summary">
                        <span class="exp-date" data-i18n="EXP_3_DATE">May–Sep 2023</span>
                        <span class="exp-title" data-i18n="EXP_3_TITLE">On-site IT Support Contractor</span>
                        <span class="exp-company" data-i18n="EXP_3_COMPANY">Microsoft Ljubljana</span>
                    </summary>
                    <p class="exp-detail" data-i18n="EXP_3_DETAIL">Managed IT inventory and debugged AV conference room setups — punctual, jargon-free support.</p>
                </details>

                <details class="exp-entry">
                    <summary class="exp-summary">
                        <span class="exp-date" data-i18n="EXP_4_DATE">2022–2023</span>
                        <span class="exp-title" data-i18n="EXP_4_TITLE">Junior Technical Maintenance Specialist</span>
                        <span class="exp-company" data-i18n="EXP_4_COMPANY">LPP Fashion (Modne blagovne znamke d.o.o.)</span>
                    </summary>
                    <p class="exp-detail" data-i18n="EXP_4_DETAIL">Maintained 20+ retail stores via ticketing system — calm, fast solutions under pressure. Led vendor onboarding (Sintal) and negotiated a director-signed national service contract.</p>
                </details>

                <details class="exp-entry">
                    <summary class="exp-summary">
                        <span class="exp-date" data-i18n="EXP_5_DATE">2020–2023</span>
                        <span class="exp-title" data-i18n="EXP_5_TITLE">Self-Employed Computer Technician</span>
                        <span class="exp-company" data-i18n="EXP_5_COMPANY">Valentin Križan S.P.</span>
                    </summary>
                    <p class="exp-detail" data-i18n="EXP_5_DETAIL">Mobile & PC repairs, small networks — translated every fix into plain language for non-technical customers.</p>
                </details>

                <details class="exp-entry">
                    <summary class="exp-summary">
                        <span class="exp-date" data-i18n="EXP_6_DATE">Dec 2021–Feb 2022</span>
                        <span class="exp-title" data-i18n="EXP_6_TITLE">Electrical Cabinet Assembly</span>
                        <span class="exp-company" data-i18n="EXP_6_COMPANY">Elmers d.o.o. / TOBOL GmbH</span>
                    </summary>
                    <p class="exp-detail" data-i18n="EXP_6_DETAIL">Full wiring & assembly per schematics — precision and quality focus.</p>
                </details>

                <details class="exp-entry">
                    <summary class="exp-summary">
                        <span class="exp-date" data-i18n="EXP_7_DATE">May–Nov 2021</span>
                        <span class="exp-title" data-i18n="EXP_7_TITLE">2D Laser Operator</span>
                        <span class="exp-company" data-i18n="EXP_7_COMPANY">Akrapovič d.d.</span>
                    </summary>
                    <p class="exp-detail" data-i18n="EXP_7_DETAIL">Fibre-glass laser programming, parameter setup, material handling — technical drawings & G-code.</p>
                </details>

                <details class="exp-entry">
                    <summary class="exp-summary">
                        <span class="exp-date" data-i18n="EXP_8_DATE">2013–2020</span>
                        <span class="exp-title" data-i18n="EXP_8_TITLE">Drywall Systems & Quality Control</span>
                        <span class="exp-company" data-i18n="EXP_8_COMPANY">DAMONT d.o.o. & Montaža Grabrijan</span>
                    </summary>
                    <p class="exp-detail" data-i18n="EXP_8_DETAIL">Knauf/Armstrong/AMF systems, measurements, quality checks.</p>
                </details>

                <details class="exp-entry">
                    <summary class="exp-summary">
                        <span class="exp-date" data-i18n="EXP_9_DATE">2005–2013</span>
                        <span class="exp-title" data-i18n="EXP_9_TITLE">Waiter & Shift Leader</span>
                        <span class="exp-company" data-i18n="EXP_9_COMPANY">KOLPAS d.o.o. / Napoleon Caffe</span>
                    </summary>
                    <p class="exp-detail" data-i18n="EXP_9_DETAIL">Led team of 6, organised events for 100+ guests — turned every frustrated customer into a regular.</p>
                </details>

            </div>
        </main>
```

- [ ] **Step 4: Verify projects.html**

Open `http://localhost:8080/projects.html`. Check:
- Page heading shows "Experience"
- 9 accordion entries listed with date, title, company
- Click any entry — it expands to show the detail text and the `+` changes to `−`
- Multiple entries can be open at the same time (native `<details>` behaviour — no JS)
- Open entry has an orange border (from `exp-entry[open]` CSS rule)
- Toggle SLO — all text switches to Slovenian
- No project cards, no "Digital Improbabilities" heading, no "learning note"

- [ ] **Step 5: Commit**

```bash
git add projects.html
git commit -m "feat: replace projects.html with Experience accordion (9 entries, native details/summary)"
```

---

### Task 7: foto.html — drone section + rename headers

**Files:**
- Modify: `foto.html`

- [ ] **Step 1: Remove the inline `<style>` block from `<head>`**

Delete the entire `<style>` block inside `<head>` of `foto.html` (the block containing `.photo-grid`, `.photo-item`, `.photo-caption` styles). These styles will remain needed — move them to `css/main.css` by adding the following after the `.video-caption` block:

```css
/* Photo gallery */
.photo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    margin-bottom: 36px;
    padding: 18px;
}

.photo-item {
    background-color: var(--color-surface);
    border-radius: var(--border-radius);
    border: 2px solid var(--color-border);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    transition: all var(--transition);
    position: relative;
    will-change: transform;
}

.photo-item:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg), 0 0 15px var(--color-glow);
    border-color: var(--color-primary);
}

.photo-item img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    aspect-ratio: 4/3;
    transition: transform var(--transition);
}

.photo-item:hover img {
    transform: scale(1.02);
}

.photo-caption {
    padding: 18px;
    font-size: 0.9rem;
    color: var(--color-text-subtle);
    font-style: italic;
    border-top: 1px solid var(--color-border);
}
```

- [ ] **Step 2: Rename Adams-flavour section headers**

The four existing `<h2 class="section-header">` elements use i18n keys. The JS values have already been updated in Task 2 (Step 5). No HTML changes needed for the section headers — the `data-i18n` keys remain the same; the JS now returns neutral text.

Confirm the existing keys are still in place in the HTML:
- `data-i18n="FOTO_SECTION_FOG"` → now reads "Fog & Sunrise"
- `data-i18n="FOTO_SECTION_WINTER"` → now reads "Winter"
- `data-i18n="FOTO_SECTION_RIVER"` → now reads "River Aerials"
- `data-i18n="FOTO_SECTION_PASTORAL"` → now reads "Pastoral"

- [ ] **Step 3: Add drone footage section above the existing photo grid**

**Precondition:** YouTube video IDs are not yet known. All three iframe `src` values use `VIDEO_ID_HERE`. These will produce broken embeds until real IDs are substituted. Replace `VIDEO_ID_HERE` with the actual 11-character YouTube video ID when footage is published.

In `foto.html`, inside `<main>`, before the first `<h2 class="section-header"...>` tag, add:
```html
        <!-- Drone Footage -->
        <section class="drone-section">
            <h2 data-i18n="DRONE_TITLE">Drone Footage</h2>
            <div class="video-grid">

                <div class="video-card">
                    <div class="video-wrapper">
                        <iframe
                            src="https://www.youtube.com/embed/VIDEO_ID_HERE"
                            title="Drone footage — Kolpa river"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <p class="video-caption" data-i18n="VIDEO_1_CAPTION">Kolpa river — summer 2025</p>
                </div>

                <div class="video-card">
                    <div class="video-wrapper">
                        <iframe
                            src="https://www.youtube.com/embed/VIDEO_ID_HERE"
                            title="Drone footage — Bela Krajina"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <p class="video-caption" data-i18n="VIDEO_2_CAPTION">Aerial view — Bela Krajina</p>
                </div>

                <div class="video-card">
                    <div class="video-wrapper">
                        <iframe
                            src="https://www.youtube.com/embed/VIDEO_ID_HERE"
                            title="Drone footage"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <p class="video-caption" data-i18n="VIDEO_3_CAPTION">Drone footage — coming soon</p>
                </div>

                <div class="video-card video-card--soon">
                    <div class="video-wrapper video-wrapper--placeholder">
                        <span>▶ More coming soon</span>
                    </div>
                    <p class="video-caption" data-i18n="VIDEO_SOON">More footage coming soon</p>
                </div>

            </div>
        </section>
```

**Note:** `VIDEO_ID_HERE` are placeholders. When real YouTube footage is available, replace each with the 11-character YouTube video ID from the URL (e.g. `dQw4w9WgXcQ`).

- [ ] **Step 4: Verify foto.html**

Open `http://localhost:8080/foto.html`. Check:
- "Drone Footage" section appears above photos
- Four video cards in a grid (3 iframe placeholders + 1 "coming soon" card)
- 16:9 aspect ratio maintained for all video slots
- Section headers below read: "Fog & Sunrise", "Winter", "River Aerials", "Pastoral" (not Adams names)
- Toggle SLO — "Drone Footage" → "Posnetki z drona", section headers switch

- [ ] **Step 5: Commit**

```bash
git add foto.html css/main.css
git commit -m "feat: add drone footage section to foto.html, move photo styles to main.css, rename section headers"
```

---

### Task 8: Delete my_suggestions.html

**Files:**
- Delete: `my_suggestions.html`

- [ ] **Step 1: Delete the file**

```bash
git rm /home/supremeleader/mylab/hrco.github.io/my_suggestions.html
```

- [ ] **Step 2: Verify no broken links remain**

Search all HTML files for any remaining reference to `my_suggestions.html`:
```bash
grep -r "my_suggestions" /home/supremeleader/mylab/hrco.github.io/*.html
```
Expected output: no matches (all nav links were removed in Task 4).

- [ ] **Step 3: Commit**

```bash
git commit -m "feat: remove my_suggestions.html (Wise Voices page retired)"
```

---

## Final Verification

After all tasks are complete:

- [ ] Open `http://localhost:8080` — full index page loads, hero shows Valentin Križan, skills strip visible, footer has "Don't Panic."
- [ ] Navigate all 5 pages — nav is consistent, no "Wise Voices" link appears anywhere
- [ ] `http://localhost:8080/projects.html` — 9 accordion entries, all expand/collapse independently
- [ ] `http://localhost:8080/about_me.html` — bio, certs, languages, contact — no Adams content
- [ ] `http://localhost:8080/foto.html` — drone section at top, neutral section headers
- [ ] `http://localhost:8080/news.html` — nav updated, page content unchanged
- [ ] Toggle SLO on every page — all redesigned strings switch language; no broken/missing i18n keys (check browser console for missing key warnings)
- [ ] Open DevTools → Network — no 404s on `my_suggestions.html`
- [ ] Test on mobile viewport (320px): hero actions stack vertically, accordion entries readable, skills pills wrap cleanly
- [ ] Verify no sensitive data: `grep -rn "EMŠO\|davčna\|tax.id\|matična" /home/supremeleader/mylab/hrco.github.io/*.html` — expected: zero matches

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-03-13-portfolio-redesign.md`. Ready to execute?

**This harness has subagents — use superpowers:subagent-driven-development to execute.**
