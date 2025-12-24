import crypto from "node:crypto";
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
});

function sha1(s) {
  return crypto.createHash("sha1").update(s).digest("hex");
}

function text(v) {
  if (v == null) return "";
  if (typeof v === "string") return v.trim();
  if (typeof v === "object" && typeof v["#text"] === "string") return v["#text"].trim();
  return String(v).trim();
}

function link(v) {
  if (v == null) return "";
  if (typeof v === "string") return v.trim();
  if (Array.isArray(v)) {
    const alt = v.find(x => x?.["@_rel"] === "alternate") ?? v[0];
    return link(alt);
  }
  if (typeof v === "object") return String(v["@_href"] ?? v["@_url"] ?? "").trim();
  return "";
}

function toISODate(s) {
  const t = Date.parse(s);
  return Number.isFinite(t) ? new Date(t).toISOString() : null;
}

export async function fetchRss(feedUrl) {
  const res = await fetch(feedUrl, {
    headers: { "user-agent": "hrco-digest-bot (github actions)" },
  });
  if (!res.ok) throw new Error(`RSS fetch failed ${res.status}: ${feedUrl}`);
  const xml = await res.text();

  const data = parser.parse(xml);

  // RSS: rss.channel.item
  const rssItems = data?.rss?.channel?.item;
  // Atom: feed.entry
  const atomItems = data?.feed?.entry;

  const items = rssItems ?? atomItems ?? [];
  const arr = Array.isArray(items) ? items : [items];

  const source = new URL(feedUrl).hostname;

  return arr
    .map((it) => {
      const title = text(it.title);
      const url = link(it.link);
      const published =
        it.pubDate ?? it.published ?? it.updated ?? it["dc:date"] ?? "";

      if (!title || !url) return null;

      return {
        id: sha1(url),
        title,
        url,
        source,
        published_at: toISODate(text(published)), // can be null
      };
    })
    .filter(Boolean);
}