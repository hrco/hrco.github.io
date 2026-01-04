import fs from "node:fs";
import crypto from "node:crypto";
import { fetchRss } from "./connectors/rss.mjs";

const FEEDS = [
  // General News - Major Outlets
  "https://feeds.bbci.co.uk/news/rss.xml",        // BBC News
  "https://rss.nytimes.com/services/xml/rss/nyt/World.xml", // NYT World
  "https://www.theguardian.com/world/rss",        // Guardian World News
  "https://feeds.npr.org/1001/rss.xml",           // NPR News
  // "https://rss.cnn.com/rss/edition_world.rss",    // CNN World (feed unavailable)

  // International Perspectives
  "https://www.aljazeera.com/xml/rss/all.xml",    // Al Jazeera: Global South perspective
  "https://rss.dw.com/xml/rss_en_top",            // Deutsche Welle: European/international
  "https://www.france24.com/en/rss",              // France 24: French/global perspective
  "https://www.scmp.com/rss/91/feed",             // South China Morning Post: Asia-Pacific
  "https://www.abc.net.au/news/feed/51120/rss.xml", // ABC Australia: Oceania perspective
  // "https://www.cbc.ca/webfeed/rss/rss-world",     // CBC Canada (feed unavailable)

  // Analysis & Deep Reporting
  // "https://rsshub.app/economist/homepage",        // The Economist (RSSHub blocked)
  // "https://rsshub.app/apnews/homepage",           // Associated Press (RSSHub blocked)

  // Science & Research
  "https://www.sciencenews.org/feed",             // Science News: science journalism
  "https://www.nature.com/nature.rss",            // Nature News: global science/policy
  "https://www.newscientist.com/section/news/feed/", // New Scientist: science/tech news

  // Slovenian Content
  "https://www.delo.si/rss",                      // Slovenia's top newspaper
  "https://www.24ur.com/rss",                     // Most visited Slovenian news site
  "https://www.rtvslo.si/feeds/00.xml",           // RTV Slovenia (public broadcaster)

  // Investigative & Transparency
  "https://www.propublica.org/feed/",             // ProPublica: investigative journalism
  "https://theintercept.com/feed/?lang=en",       // The Intercept: leaks, whistleblowers
  // "https://theconversation.com/us/rss.xml",       // The Conversation (feed unavailable)
  "https://www.icij.org/feed/",                   // ICIJ: global investigations
];

const LIMIT_ITEMS = 12;
const KEEP_DAYS = 30;

const today = new Date().toISOString().slice(0, 10);
const updatedAt = new Date().toISOString();

const latestPath = "data/news-digest-latest.json";
const archivePath = "data/news-digest-archive.json";
const dayPagePath = `news/${today}-news.html`;

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

// Lightweight "summary" (replace with AI later if you want)
function summaryFromTitle(title) {
  return `Summary: ${title}`;
}

function renderDayHtml({ date, updated_at, items }) {
  const lis = items
    .map(
      (i) => {
        const encodedUrl = encodeURIComponent(i.url);
        const encodedTitle = encodeURIComponent(i.title);
        return `
<li class="item">
  <a href="${i.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(i.title)}</a>
  <div class="meta">${escapeHtml(i.source)}${i.published_at ? ` • ${escapeHtml(i.published_at.slice(0,10))}` : ""}</div>
  <p class="summary">${escapeHtml(i.summary)}</p>
  <div class="share-buttons">
    <a href="https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}" target="_blank" rel="noopener noreferrer" class="share-btn" title="Share on X/Twitter">
      <i class="fab fa-x-twitter"></i>
    </a>
    <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}" target="_blank" rel="noopener noreferrer" class="share-btn" title="Share on LinkedIn">
      <i class="fab fa-linkedin"></i>
    </a>
    <a href="mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A%0A${encodedUrl}" class="share-btn" title="Share via Email">
      <i class="fas fa-envelope"></i>
    </a>
    <button class="share-btn" onclick="navigator.clipboard.writeText('${i.url.replace(/'/g, "\\'")}'); this.innerHTML='<i class=\\'fas fa-check\\'></i>'; setTimeout(() => this.innerHTML='<i class=\\'fas fa-link\\'></i>', 2000);" title="Copy link">
      <i class="fas fa-link"></i>
    </button>
  </div>
</li>`;
      }
    )
    .join("");

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>News Digest ${date}</title>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <link rel="stylesheet" href="/css/main.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body>
  <main class="wrap">
    <nav><a href="/news.html">← Archive</a></nav>
    <h1>Daily News Digest</h1>
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
    try {
      const content = fs.readFileSync(archivePath, "utf8").trim();
      if (content) {
        archive = JSON.parse(content);
      }
    } catch (e) {
      console.warn(`Warning: Failed to parse archive, starting fresh: ${e.message}`);
    }
  }

  // Keep a "seen" set to avoid repeating old links
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

  console.log(`News Digest done: ${today} (${items.length} items)`);
}

main().catch((e) => {
  console.error(e?.stack ?? e);
  process.exit(1);
});
