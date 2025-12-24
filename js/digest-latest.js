(async () => {
  const el = document.querySelector("#latest-digest");
  if (!el) return;

  try {
    const res = await fetch("/data/digest-latest.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const d = await res.json();

    el.innerHTML = `
      <h2>Latest digest</h2>
      <p><a href="${d.page}">${d.date}</a> • ${d.count} items</p>
      <p class="muted">Updated: ${new Date(d.updated_at).toLocaleString()}</p>
      <p><a href="/news.html">View archive →</a></p>
    `;
  } catch (e) {
    el.innerHTML = `
      <h2>Latest digest</h2>
      <p class="muted">No digest yet. Check back soon.</p>
      <p><a href="/news.html">View archive →</a></p>
    `;
  }
})();