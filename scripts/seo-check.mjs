import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const distDir = resolve("dist");
const sitemapPath = resolve(distDir, "sitemap.xml");
const failures = [];

const fail = (route, message) => failures.push(`${route}: ${message}`);
const extract = (source, pattern) => source.match(pattern)?.[1]?.trim();
const jsonLdPattern = /<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi;

if (!existsSync(sitemapPath)) {
  console.error("SEO static check requires a completed npm run build");
  process.exit(1);
}

const sitemap = readFileSync(sitemapPath, "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

if (sitemapUrls.length === 0) failures.push("sitemap.xml: no URLs");
if (sitemap.includes("<lastmod>")) failures.push("sitemap.xml: contains unverified lastmod");
if (sitemap.includes("404.html")) failures.push("sitemap.xml: contains 404.html");

for (const canonicalUrl of sitemapUrls) {
  const url = new URL(canonicalUrl);
  const route = decodeURI(url.pathname);
  const relativeRoute = route === "/" ? "" : route.replace(/^\/+|\/+$/g, "");
  const filePath = route === "/" ? resolve(distDir, "index.html") : resolve(distDir, relativeRoute, "index.html");

  if (!existsSync(filePath)) {
    fail(route, "missing prerendered index.html");
    continue;
  }

  const html = readFileSync(filePath, "utf8");
  const htmlTag = html.match(/<html\b([^>]*)>/i)?.[1] ?? "";
  const title = extract(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = extract(html, /<meta[^>]*name="description"[^>]*content="([^"]+)"/i);
  const canonical = extract(html, /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i);
  const robots = extract(html, /<meta[^>]*name="robots"[^>]*content="([^"]+)"/i);

  if (!title) fail(route, "missing title");
  if (!description) fail(route, "missing description");
  if (!/\blang=["']ar-AE["']/i.test(htmlTag)) fail(route, 'missing html lang="ar-AE"');
  if (!/\bdir=["']rtl["']/i.test(htmlTag)) fail(route, 'missing html dir="rtl"');
  if (canonical !== canonicalUrl) fail(route, `canonical mismatch (${canonical ?? "missing"})`);
  if (!robots?.toLowerCase().includes("index")) fail(route, "missing index robots directive");
  if (!/<h1(?:\s[^>]*)?>[\s\S]*?[^\s<][\s\S]*?<\/h1>/i.test(html)) fail(route, "missing visible H1");
  if (!/<main(?:\s[^>]*)?>[\s\S]*?[^\s<][\s\S]*?<\/main>/i.test(html)) fail(route, "missing initial main content");
  if (html.includes("<!--app-html-->") || html.includes("<!--app-head-->")) fail(route, "unreplaced template marker");
  if (html.includes("yacht-dxb.netlify.app")) fail(route, "preview hostname in metadata or content");

  const jsonLdBlocks = [...html.matchAll(jsonLdPattern)];
  for (const [index, block] of jsonLdBlocks.entries()) {
    try {
      JSON.parse(block[1]);
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      fail(route, `JSON-LD block ${index + 1} is invalid (${reason})`);
    }
  }

  if (route === "/" && jsonLdBlocks.length === 0) fail(route, "homepage requires at least one valid JSON-LD block");
}

const notFoundPath = resolve(distDir, "404.html");
if (!existsSync(notFoundPath)) {
  failures.push("404.html: missing");
} else {
  const html = readFileSync(notFoundPath, "utf8");
  if (!/<meta[^>]*name="robots"[^>]*content="noindex,\s*follow"/i.test(html)) fail("404.html", "missing noindex, follow");
  if (/rel="canonical"/i.test(html)) fail("404.html", "must not contain a canonical");
  if (!/<h1(?:\s[^>]*)?>[\s\S]*?404[\s\S]*?<\/h1>/i.test(html)) fail("404.html", "missing 404 H1");
}

if (failures.length > 0) {
  console.error(`SEO static check failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`SEO static check passed for ${sitemapUrls.length} routes and 404.html`);
