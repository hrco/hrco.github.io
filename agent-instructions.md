# HRCO Portfolio Site - Implementation Instructions

## ⚠️ DISCLAIMER

This is a **learning project** by a developer actively improving their skills. The codebase:
- Uses vanilla HTML/CSS/JS intentionally (no frameworks)
- May contain experimental code and unconventional approaches
- Is a work in progress — expect rough edges
- Prioritizes learning over production-grade polish

**For the Agent:** Be patient, explain changes clearly, and maintain the existing Hitchhiker's Guide to the Galaxy aesthetic throughout.

---

## 📁 Project Structure

```
hrco.github.io/
├── index.html
├── news.html
├── foto.html
├── about_me.html
├── my_suggestions.html
├── projects.html          ← NEW: Create this
├── css/
│   └── main.css
├── js/
│   ├── main.js            ← Contains i18n logic, theme, year
│   ├── news.js            ← Needs rewrite for filters/search
│   ├── gallery.js
│   └── digest-latest.js
├── images/
│   └── web_1600_wm/
└── lang/                   ← i18n JSON files (if exists)
```

---

## 🔧 TASK 1: Create projects.html

**Location:** Root directory

**Action:** Create new file with content from the projects.html artifact provided in conversation.

**Post-creation checklist:**
- [ ] Verify CSS variables from main.css are applied
- [ ] Test responsive layout (grid should collapse on mobile)
- [ ] Confirm links work: ljubo-lover.com, dbbp42.github.io
- [ ] donotpanic.space link should be visually disabled (in dev)

---

## 🔧 TASK 2: Update Navigation on ALL Pages

**Files to modify:**
- index.html
- news.html  
- foto.html
- about_me.html
- my_suggestions.html

**Find this nav block:**
```html
<nav>
    <a href="index.html" class="nav-link" data-i18n="HOME_LINK">Start</a>
    <a href="news.html" class="nav-link" data-i18n="NEWS_LINK">News</a>
    <a href="foto.html" class="nav-link" data-i18n="FOTO_LINK">Visual Evidence</a>
    <a href="about_me.html" class="nav-link" data-i18n="ABOUT_LINK">The Entity</a>
    <a href="my_suggestions.html" class="nav-link" data-i18n="SUGGESTIONS_LINK">Wise Voices</a>
</nav>
```

**Replace with:**
```html
<nav>
    <a href="index.html" class="nav-link" data-i18n="HOME_LINK">Start</a>
    <a href="news.html" class="nav-link" data-i18n="NEWS_LINK">News</a>
    <a href="foto.html" class="nav-link" data-i18n="FOTO_LINK">Visual Evidence</a>
    <a href="projects.html" class="nav-link" data-i18n="PROJECTS_LINK">Projects</a>
    <a href="about_me.html" class="nav-link" data-i18n="ABOUT_LINK">The Entity</a>
    <a href="my_suggestions.html" class="nav-link" data-i18n="SUGGESTIONS_LINK">Wise Voices</a>
</nav>
```

**Note:** Set `class="nav-link active"` on the appropriate link for each page.

---

## 🔧 TASK 3: Rewrite news.js for Functional Filters

**File:** `js/news.js`

**Requirements:**
1. Load news data (from JSON file or embedded array)
2. Implement real-time search filtering
3. Implement category filter buttons
4. Show results count
5. Handle "no results" state gracefully

**Minimal Implementation:**
```javascript
(function() {
    'use strict';
    
    // Config - adjust data source as needed
    const NEWS_DATA_URL = 'data/news.json'; // or embed array
    
    let newsData = [];
    let currentFilter = 'all';
    let searchTerm = '';
    
    const elements = {
        searchBox: document.getElementById('search-box'),
        filterBtns: document.querySelectorAll('#category-filters .filter-btn'),
        newsList: document.getElementById('list'),
        resultsCount: document.getElementById('results-count')
    };
    
    async function init() {
        try {
            // Option A: Fetch from JSON
            // const res = await fetch(NEWS_DATA_URL);
            // newsData = await res.json();
            
            // Option B: Use embedded data (simpler for now)
            newsData = getSampleData();
            
            bindEvents();
            render();
        } catch (err) {
            console.error('Failed to load news:', err);
            elements.newsList.innerHTML = '<p class="card">Failed to load news data.</p>';
        }
    }
    
    function bindEvents() {
        elements.searchBox?.addEventListener('input', (e) => {
            searchTerm = e.target.value.toLowerCase().trim();
            render();
        });
        
        elements.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                elements.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                render();
            });
        });
    }
    
    function render() {
        const filtered = newsData.filter(item => {
            const matchFilter = currentFilter === 'all' || item.category === currentFilter;
            const matchSearch = !searchTerm || 
                item.title.toLowerCase().includes(searchTerm) ||
                (item.summary || '').toLowerCase().includes(searchTerm);
            return matchFilter && matchSearch;
        });
        
        if (elements.resultsCount) {
            elements.resultsCount.textContent = `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`;
        }
        
        if (filtered.length === 0) {
            elements.newsList.innerHTML = `
                <div class="card" style="text-align:center; padding:2rem;">
                    <p>No matching articles. The void stares back.</p>
                </div>`;
            return;
        }
        
        elements.newsList.innerHTML = filtered.map(item => `
            <article class="card news-item" style="margin-bottom:1rem;">
                <h3><a href="${item.url || '#'}" target="_blank" style="color:var(--color-primary);text-decoration:none;">${item.title}</a></h3>
                <p style="font-size:0.85rem;color:var(--color-text-subtle);margin:0.5rem 0;">
                    <span style="background:var(--color-highlight);padding:2px 8px;border-radius:4px;text-transform:uppercase;font-size:0.75rem;">${item.category}</span>
                    ${item.date ? `<span style="margin-left:1rem;">${item.date}</span>` : ''}
                </p>
                ${item.summary ? `<p>${item.summary}</p>` : ''}
            </article>
        `).join('');
    }
    
    function getSampleData() {
        return [
            { id: 1, title: "Sample Article", category: "tech", date: "2025-01-06", summary: "Replace with real data." }
        ];
    }
    
    document.addEventListener('DOMContentLoaded', init);
})();
```

---

## 🔧 TASK 4: Add i18n Keys

**File:** Language JSON files (e.g., `lang/en.json`, `lang/sl.json`)

**Add these keys:**

```json
{
    "PROJECTS_LINK": "Projects",
    "PROJECTS_TITLE": "Digital Improbabilities | HRCO",
    "PROJECTS_HEADING": "Digital Improbabilities",
    "PROJECTS_INTRO": "A collection of web-based experiments...",
    "PROJECT_LJUBO_DESC": "A digital tribute to something worth celebrating...",
    "PROJECT_GITHUB_DESC": "The GitHub-hosted corner of my digital existence...",
    "PROJECT_PANIC_DESC": "Currently being assembled in the improbability drive's spare cycles..."
}
```

**Slovenian equivalents needed** — translate appropriately.

---

## 🐛 ISSUES OBSERVED

### Issue 1: Digest sections show "Loading..."
**Location:** index.html  
**Problem:** `digest-latest.js` may be failing silently  
**Fix:** Check console for errors, verify data source URLs, add error handling

### Issue 2: Footer year is empty
**Location:** All pages  
**Problem:** `<span id="current-year"></span>` not populated  
**Fix:** Ensure main.js includes:
```javascript
document.getElementById('current-year').textContent = new Date().getFullYear();
```

### Issue 3: Potential mobile nav issues
**Check:** Test hamburger menu / nav collapse on mobile viewports

---

## ✅ TESTING CHECKLIST

After implementation:

- [ ] All 6 nav links work on every page
- [ ] Projects page renders correctly
- [ ] News search filters in real-time
- [ ] News category buttons filter correctly
- [ ] i18n toggle (SLO/ENG) works on new pages
- [ ] Footer year displays correctly
- [ ] Mobile responsive layout works
- [ ] No console errors
- [ ] Links to external projects work

---

## 🚀 DEPLOYMENT

```bash
git add .
git commit -m "Add projects page, fix news filters, update navigation"
git push origin main
```

GitHub Pages will auto-deploy. Clear browser cache if changes don't appear.
