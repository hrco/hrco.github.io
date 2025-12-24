(async () => {
  const updated = document.querySelector("#updated");
  const list = document.querySelector("#list");

  try {
    const res = await fetch("data/digest-archive.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const archive = await res.json();

    updated.textContent = `Updated: ${archive.updated_at}`;

    list.innerHTML = (archive.days || []).map(d => `
      <article class="card">
        <h2><a href="${d.page}">${d.date}</a></h2>
        <p class="muted">${d.teaser}</p>
        <p><small>${d.count} items</small></p>
      </article>
    `).join("") || "<p>No digests yet.</p>";
  } catch {
    updated.textContent = "No archive yet.";
    list.innerHTML = "<p>No digests yet.</p>";
  }
})();