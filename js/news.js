(async () => {
  const updated = document.querySelector("#updated");
  const list = document.querySelector("#list");
  const searchBox = document.querySelector("#search-box");
  const filterBtns = document.querySelectorAll(".filter-btn");

  let allDays = [];
  let allItems = [];
  let currentFilter = "all";
  let currentSearch = "";

  // Source mapping for filtering
  const sourceMap = {
    "hnrss.org": ["hnrss.org"],
    "arstechnica": ["feeds.arstechnica.com", "arstechnica"],
    "nytimes": ["rss.nytimes.com", "nytimes"],
    "bloomberg": ["feeds.bloomberg.com", "bloomberg"]
  };

  try {
    // Fetch archive for day cards
    const archiveRes = await fetch("data/digest-archive.json", { cache: "no-store" });
    if (!archiveRes.ok) throw new Error(`HTTP ${archiveRes.status}`);
    const archive = await archiveRes.json();
    allDays = archive.days || [];

    // Fetch latest digest for item-level filtering
    try {
      const latestRes = await fetch("data/digest-latest.json", { cache: "no-store" });
      if (latestRes.ok) {
        const latest = await latestRes.json();
        allItems = latest.items || [];
      }
    } catch (e) {
      console.warn("Could not load latest digest items:", e);
    }

    updated.innerHTML = `<span data-i18n="UPDATED_LABEL">Updated:</span> ${archive.updated_at}`;

    // Initial render
    renderDays();

    // Search functionality
    searchBox?.addEventListener("input", (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      render();
    });

    // Filter functionality
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

  function render() {
    // If filtering or searching, show items from latest digest
    if (currentFilter !== "all" || currentSearch) {
      renderFilteredItems();
    } else {
      renderDays();
    }
  }

  function renderDays() {
    list.innerHTML = allDays.map(d => `
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
    let filtered = allItems;

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

    if (filtered.length === 0) {
      list.innerHTML = '<p class="muted">No matching items found in latest digest.</p>';
      return;
    }

    list.innerHTML = `
      <div class="card">
        <p class="muted" style="margin-bottom: 1rem;">
          <i class="fas fa-filter"></i>
          Showing ${filtered.length} item${filtered.length !== 1 ? 's' : ''} from latest digest
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
