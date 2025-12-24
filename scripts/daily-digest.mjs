import fs from "node:fs";
import crypto from "node:crypto";
import { fetchRss } from "./connectors/rss.mjs";

const FEEDS = [
  "https://hnrss.org/frontpage",
  // add more RSS/Atom URLs here
];

const LIMIT_ITEMS = 12;
const KEEP_DAYS = 30;

const today = new Date().toISOString().slice(0, 10);
const updatedAt = new Date().toISOString();

const latestPath = "data/digest-latest.json";
const archivePath = "data/digest-archive.json";
const dayPagePath = `news/${today}.html`;

fs.mkdirSync("data", { recursive: true });
fs.mkdirSync("news", { recursive: true });

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function sha1(s) {
  return crypto.createHash("sha1").update(s).digest("hex");
}

// Lightweight “summary” (replace with AI later if you want)
function summaryFromTitle(title) {
  return `Summary: ${title}`;
}

function renderDayHtml({ date, updated_at, items }) {
  const lis = items
    .map(
      (i) => `
<li class="item">
  <a href="${i.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(i.title)}</a>
  <div class="meta">${escapeHtml(i.source)}${i.published_at ? ` • ${escapeHtml(i.published_at.slice(0,10))}` : ""}</div>
  <p class="summary">${escapeHtml(i.summary)}</p>
</li>`
    )
    .join("");

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Digest ${date}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <link rel="stylesheet" href="/assets/style.css" />
</head>
<body>
  <main class="wrap">
    <nav><a href="/news.html">← Archive</a></nav>
    <h1>Daily AI/Tech Digest</h1>
    <p class="muted">${date} • Updated ${updated_at}</p>
    <ol class="digest">${lis || "<p>No items today.</p>"}</ol>
  </main>
</body>
</html>`;
}

async function main() {
  // Load archive (for listing + dedupe across days)
  let archive = { updated_at: "", days: [] };
  if (fs.existsSync(archivePath)) {
    archive = JSON.parse(fs.readFileSync(archivePath, "utf8"));
  }

  // Keep a “seen” set to avoid repeating old links
  const seen = new Set((archive.days ?? []).flatMap(d => d.ids ?? []));

  // Fetch all feeds (fail-soft per feed)
  let all = [];
  for (const feed of FEEDS) {
    try {
      const items = await fetchRss(feed);
      all.push(...items);
    } catch (e) {
      console.error(`Feed failed: ${feed}\n${e?.stack ?? e}`);
    }
  }

  // Dedupe within this run + vs archive
  const runSeen = new Set();
  const fresh = [];
  for (const it of all) {
    if (seen.has(it.id)) continue;
    if (runSeen.has(it.id)) continue;
    runSeen.add(it.id);
    fresh.push(it);
  }

  // Sort newest first (null dates last)
  fresh.sort((a, b) => (b.published_at ?? "").localeCompare(a.published_at ?? ""));

  const items = fresh.slice(0, LIMIT_ITEMS).map(it => ({
    ...it,
    summary: summaryFromTitle(it.title),
  }));

  const ids = items.map(i => i.id);

  // Write daily page
  fs.writeFileSync(dayPagePath, renderDayHtml({ date: today, updated_at: updatedAt, items }), "utf8");

  // Write latest JSON for homepage widget
  fs.writeFileSync(
    latestPath,
    JSON.stringify(
      {
        date: today,
        updated_at: updatedAt,
        page: `/${dayPagePath}`,
        count: items.length,
        items,
      },
      null,
      2
    ),
    "utf8"
  );

  // Update archive JSON (light listing + store ids for dedupe)
  const teaser = items[0]?.title ? `Top: ${items[0].title}` : "No items today.";
  const day = { date: today, page: `/${dayPagePath}`, teaser, count: items.length, ids };

  const days = [day, ...(archive.days ?? []).filter(d => d.date !== today)].slice(0, KEEP_DAYS);

  fs.writeFileSync(
    archivePath,
    JSON.stringify({ updated_at: updatedAt, days }, null, 2),
    "utf8"
  );

  console.log(`Digest done: ${today} (${items.length} items)`);
}

main().catch((e) => {
  console.error(e?.stack ?? e);
  process.exit(1);
});