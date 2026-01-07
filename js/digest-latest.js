(async () => {
  // Configuration for all three digests
  const digests = [
    {
      id: "latest-ai-digest",
      dataFile: "data/digest-latest.json",
      title: "Latest AI/Tech Digest",
      titleI18n: "LATEST_AI_DIGEST"
    },
    {
      id: "latest-news-digest",
      dataFile: "data/news-digest-latest.json",
      title: "Latest News Digest",
      titleI18n: "LATEST_NEWS_DIGEST"
    },
    {
      id: "latest-sport-digest",
      dataFile: "data/sport-digest-latest.json",
      title: "Latest Sport Digest",
      titleI18n: "LATEST_SPORT_DIGEST"
    }
  ];

  // Load each digest
  for (const digest of digests) {
    const el = document.querySelector(`#${digest.id}`);
    if (!el) continue;

    try {
      const res = await fetch(digest.dataFile, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const d = await res.json();

      const itemsHtml = (d.items || []).slice(0, 3).map(item => `
        <div style="margin-bottom: 0.75rem;">
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" style="font-weight: 500; display: block; line-height: 1.4;">${item.title}</a>
          <small class="muted" style="font-size: 0.85em;">${item.source}</small>
        </div>
      `).join("");

      el.innerHTML = `
        <h2 data-i18n="${digest.titleI18n}">${digest.title}</h2>
        <div style="margin: 1rem 0;">
          ${itemsHtml}
        </div>
        <p><a href="${d.page}"><span data-i18n="READ_FULL_DIGEST">Read full digest</span> (${d.count} items) →</a></p>
        <p class="muted"><small><span data-i18n="UPDATED_LABEL">Updated:</span> ${new Date(d.updated_at).toLocaleString()}</small></p>
        <p><a href="news.html"><span data-i18n="VIEW_ARCHIVE">View archive</span> →</a></p>
      `;

    } catch (e) {
      console.error(`Failed to load ${digest.id}:`, e);
      el.innerHTML = `
        <h2 data-i18n="${digest.titleI18n}">${digest.title}</h2>
        <p class="muted">No digest yet. Check back soon.</p>
        <p><a href="news.html"><span data-i18n="VIEW_ARCHIVE">View archive</span> →</a></p>
      `;
    }
  }

  // Update translations if available
  if (window.updateText && localStorage.getItem('language')) {
    window.updateText(localStorage.getItem('language'));
  }
})();