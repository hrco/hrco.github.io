(async () => {
  const updated = document.querySelector("#updated");
  const list = document.querySelector("#list");

  try {
    const res = await fetch("data/digest-archive.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const archive = await res.json();

    updated.innerHTML = `<span data-i18n="UPDATED_LABEL">Updated:</span> ${archive.updated_at}`;

    list.innerHTML = (archive.days || []).map(d => `
      <article class="card">
        <h2><a href="${d.page}">${d.date}</a></h2>
        <p class="muted">${d.teaser}</p>
        <p><small>${d.count} <span data-i18n="ITEMS_COUNT">items</span></small></p>
      </article>
    `).join("") || "<p data-i18n=\"NO_DIGESTS\">No digests yet.</p>";

    if (window.updateText && localStorage.getItem('language')) {
      window.updateText(localStorage.getItem('language'));
    }

  } catch {
    updated.innerHTML = '<span data-i18n="NO_ARCHIVE">No archive yet.</span>';
    list.innerHTML = '<p data-i18n="NO_DIGESTS">No digests yet.</p>';
    
    if (window.updateText && localStorage.getItem('language')) {
      window.updateText(localStorage.getItem('language'));
    }
  }
})();