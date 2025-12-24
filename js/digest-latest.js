(async () => {
  const el = document.querySelector("#latest-digest");
  if (!el) return;

  try {
    const res = await fetch("/data/digest-latest.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const d = await res.json();

    const itemsHtml = (d.items || []).slice(0, 3).map(item => `
      <div style="margin-bottom: 0.75rem;">
        <a href="${item.url}" target="_blank" rel="noopener noreferrer" style="font-weight: 500; display: block; line-height: 1.4;">${item.title}</a>
        <small class="muted" style="font-size: 0.85em;">${item.source}</small>
      </div>
    `).join("");

    el.innerHTML = `
      <h2 data-i18n="LATEST_DIGEST">Latest digest</h2>
      <div style="margin: 1rem 0;">
        ${itemsHtml}
      </div>
      <p><a href="${d.page}"><span data-i18n="READ_FULL_DIGEST">Read full digest</span> (${d.count} items) →</a></p>
      <p class="muted"><small><span data-i18n="UPDATED_LABEL">Updated:</span> ${new Date(d.updated_at).toLocaleString()}</small></p>
      <p><a href="/news.html"><span data-i18n="VIEW_ARCHIVE">View archive</span> →</a></p>
    `;

    // Update translations if available
    if (window.updateText && localStorage.getItem('language')) {
      window.updateText(localStorage.getItem('language'));
    }

  } catch (e) {
    el.innerHTML = `
      <h2 data-i18n="LATEST_DIGEST">Latest digest</h2>
      <p class="muted">No digest yet. Check back soon.</p>
      <p><a href="/news.html"><span data-i18n="VIEW_ARCHIVE">View archive</span> →</a></p>
    `;
    
    if (window.updateText && localStorage.getItem('language')) {
      window.updateText(localStorage.getItem('language'));
    }
  }
})();