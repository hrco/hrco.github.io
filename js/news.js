/**
 * news.js - News Digest Archive with Search and Filtering
 * "Time is an illusion. Lunchtime doubly so."
 */

(async () => {
  const updated = document.querySelector("#updated");
  const list = document.querySelector("#list");
  const searchBox = document.querySelector("#search-box");
  const filterBtns = document.querySelectorAll("#category-filters .filter-btn");
  const digestBtns = document.querySelectorAll("[data-digest]");
  const resultsCount = document.querySelector("#results-count");

  let allDigests = {
    "ai-tech": { days: [], items: [], archive: null },
    "news": { days: [], items: [], archive: null },
    "sport": { days: [], items: [], archive: null }
  };
  let currentDigest = "ai-tech";
  let currentFilter = "all";
  let currentSearch = "";

  // Source mapping for filtering by category
  const sourceMap = {
    "tech": [
      "hnrss.org", "lobste.rs", "schneier.com", "feeds.arstechnica.com", "feeds.bloomberg.com",
      "arxiv.org", "huggingface.co", "blog.google", "deepmind.google", "paperswithcode.com",
      "techcrunch.com", "venturebeat.com", "technologyreview.com", "wired.com", "theverge.com",
      "kdnuggets.com", "github.blog", "dev.to"
    ],
    "sports": [
      "outsideonline.com", "surfer.com", "surfertoday.com", "redbull.com",
      "espn.com", "bbci.co.uk/sport", "cbssports.com",
      "formula1.com", "motogp.com", "nascar.com",
      "atptour.com", "wtatennis.com",
      "ufc.com", "boxrec.com",
      "cyclingnews.com", "golfdigest.com", "worldathletics.org",
      "fifa.com", "olympics.com"
    ],
    "gaming": ["feeds.ign.com", "dotesports.com"],
    "slovenian": ["delo.si", "24ur.com", "rtvslo.si"],
    "security": [
      "krebsonsecurity.com", "thehackersnews", "bleepingcomputer.com",
      "nvd.nist.gov", "exploit-db.com", "2600.com"
    ],
    "transparency": [
      "propublica.org", "theintercept.com", "theconversation.com", "icij.org"
    ]
  };

  // Digest configuration
  const digestConfig = {
    "ai-tech": {
      archiveFile: "data/digest-archive.json",
      latestFile: "data/digest-latest.json",
      name: "AI/Tech"
    },
    "news": {
      archiveFile: "data/news-digest-archive.json",
      latestFile: "data/news-digest-latest.json",
      name: "News"
    },
    "sport": {
      archiveFile: "data/sport-digest-archive.json",
      latestFile: "data/sport-digest-latest.json",
      name: "Sport"
    }
  };

  // Load all digests
  async function loadDigest(digestType) {
    const config = digestConfig[digestType];
    if (!config) return;

    try {
      // Fetch archive
      const archiveRes = await fetch(config.archiveFile, { cache: "no-store" });
      if (!archiveRes.ok) throw new Error(`HTTP ${archiveRes.status}`);
      const archive = await archiveRes.json();
      allDigests[digestType].days = archive.days || [];
      allDigests[digestType].archive = archive;

      // Fetch latest digest for item-level filtering
      try {
        const latestRes = await fetch(config.latestFile, { cache: "no-store" });
        if (latestRes.ok) {
          const latest = await latestRes.json();
          allDigests[digestType].items = latest.items || [];
        }
      } catch (e) {
        console.warn(`Could not load latest ${digestType} digest items:`, e);
      }
    } catch (err) {
      console.error(`Failed to load ${digestType} digest:`, err);
    }
  }

  // Load all digests in parallel
  try {
    await Promise.all([
      loadDigest("ai-tech"),
      loadDigest("news"),
      loadDigest("sport")
    ]);

    updateDisplay();

    // Digest type selection
    digestBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        digestBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentDigest = btn.dataset.digest;
        updateDisplay();
      });
    });

    // Real-time search functionality
    searchBox?.addEventListener("input", (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      render();
    });

    // Category filter functionality
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        render();
      });
    });

    // Update translations if available
    if (window.updateText && localStorage.getItem('language')) {
      window.updateText(localStorage.getItem('language'));
    }

  } catch (err) {
    updated.innerHTML = '<span data-i18n="NO_ARCHIVE">No archive yet.</span>';
    list.innerHTML = '<p data-i18n="NO_DIGESTS">No digests yet.</p>';

    if (window.updateText && localStorage.getItem('language')) {
      window.updateText(localStorage.getItem('language'));
    }
  }

  function updateDisplay() {
    const digest = allDigests[currentDigest];
    const config = digestConfig[currentDigest];

    if (digest.archive) {
      updated.innerHTML = `<span data-i18n="UPDATED_LABEL">Updated:</span> ${digest.archive.updated_at} • <strong>${config.name} Digest</strong>`;
    } else {
      updated.innerHTML = `<strong>${config.name} Digest</strong> - <span class="muted">Loading...</span>`;
    }

    render();
  }

  function render() {
    // If filtering or searching, show items from latest digest
    if (currentFilter !== "all" || currentSearch) {
      renderFilteredItems();
    } else {
      renderDays();
    }
  }

  function renderDays() {
    const days = allDigests[currentDigest].days;

    // Update results count
    if (resultsCount) {
      resultsCount.textContent = `${days.length} digest${days.length !== 1 ? 's' : ''}`;
    }

    list.innerHTML = days.map(d => `
      <article class="card">
        <h2><a href="${d.page}">${d.date}</a></h2>
        <p class="muted">${d.teaser}</p>
        <p><small>${d.count} <span data-i18n="ITEMS_COUNT">items</span></small></p>
      </article>
    `).join("") || "<p data-i18n=\"NO_DIGESTS\">No digests yet.</p>";

    if (window.updateText && localStorage.getItem('language')) {
      window.updateText(localStorage.getItem('language'));
    }
  }

  function renderFilteredItems() {
    const items = allDigests[currentDigest].items;
    let filtered = items;

    // Apply source filter
    if (currentFilter !== "all") {
      const sources = sourceMap[currentFilter] || [];
      filtered = filtered.filter(item =>
        sources.some(src => item.source.includes(src))
      );
    }

    // Apply search filter
    if (currentSearch) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(currentSearch)
      );
    }

    // Update results count
    if (resultsCount) {
      resultsCount.textContent = `${filtered.length} article${filtered.length !== 1 ? 's' : ''}`;
    }

    // Handle no results with themed message
    if (filtered.length === 0) {
      list.innerHTML = `
        <div class="card" style="text-align: center; padding: 3rem 1rem;">
          <p style="font-size: 3rem; margin-bottom: 1rem;">🤷</p>
          <h3 style="margin-bottom: 0.5rem;">No Matching Results Found</h3>
          <p class="muted">
            "The ships hung in the sky in much the same way that bricks don't."<br>
            <em>- Similarly, your search results are conspicuously absent.</em>
          </p>
          <p class="muted" style="margin-top: 1rem;">
            Try adjusting your search terms or filter selection.
          </p>
        </div>
      `;
      return;
    }

    list.innerHTML = `
      <div class="card">
        <p class="muted" style="margin-bottom: 1rem;">
          <i class="fas fa-filter"></i>
          Showing ${filtered.length} item${filtered.length !== 1 ? 's' : ''} from latest ${digestConfig[currentDigest].name} digest
        </p>
      </div>
      ${filtered.map(item => `
        <article class="card">
          <h3>
            <a href="${item.url}" target="_blank" rel="noopener noreferrer">
              ${escapeHtml(item.title)}
            </a>
          </h3>
          <p class="muted">
            <i class="fas fa-newspaper"></i> ${escapeHtml(item.source)}
            ${item.published_at ? ` • ${escapeHtml(item.published_at.slice(0,10))}` : ""}
          </p>
        </article>
      `).join("")}
    `;
  }

  function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }
})();
