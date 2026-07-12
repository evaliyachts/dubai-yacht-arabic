import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { generateRedirects, generateRobotsTxt } from "../src/seo/output-generators";
import {
  assertValidRouteManifest,
  canonicalUrlForPath,
  INDEXABLE_ROUTE_RECORDS,
  LEGACY_REDIRECTS,
  NON_INDEXABLE_ROUTE_RECORDS,
  QA_EXPECTATIONS,
} from "../src/seo/route-manifest";

const distDir = resolve("dist");
const failures: string[] = [];
const fail = (route: string, message: string) => failures.push(`${route}: ${message}`);

const decodeHtml = (value: string) =>
  value
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

const extract = (source: string, pattern: RegExp) => {
  const value = source.match(pattern)?.[1];
  return value ? decodeHtml(value.trim()) : undefined;
};

const textContent = (value: string) => decodeHtml(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());

const outputFileForRoute = (route: string) => {
  if (route === "/") return resolve(distDir, "index.html");
  return resolve(distDir, decodeURI(route).replace(/^\/+|\/+$/g, ""), "index.html");
};

const collectDuplicates = (values: Array<{ route: string; value: string }>, label: string) => {
  const seen = new Map<string, string>();
  for (const { route, value } of values) {
    const normalized = value.replace(/\s+/g, " ").trim().toLocaleLowerCase("ar");
    const existing = seen.get(normalized);
    if (existing) failures.push(`${label}: duplicate value on ${existing} and ${route}`);
    else seen.set(normalized, route);
  }
};

const productionUrlsIn = (value: unknown): string[] => {
  if (typeof value === "string") return value.startsWith("https://yacht-dxb.com") ? [value] : [];
  if (Array.isArray(value)) return value.flatMap(productionUrlsIn);
  if (value && typeof value === "object") return Object.values(value).flatMap(productionUrlsIn);
  return [];
};

try {
  assertValidRouteManifest();
} catch (error) {
  failures.push(error instanceof Error ? error.message : String(error));
}

const sitemapPath = resolve(distDir, "sitemap.xml");
const robotsPath = resolve(distDir, "robots.txt");
const redirectsPath = resolve(distDir, "_redirects");

if (!existsSync(sitemapPath)) {
  console.error("SEO static check requires a completed npm run build");
  process.exit(1);
}

const sitemap = readFileSync(sitemapPath, "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeHtml(match[1]));
const expectedSitemapUrls = INDEXABLE_ROUTE_RECORDS.map((record) => canonicalUrlForPath(record.path));

if (new Set(sitemapUrls).size !== sitemapUrls.length) failures.push("sitemap.xml: duplicate URL entries");
if (sitemapUrls.length !== INDEXABLE_ROUTE_RECORDS.length) {
  failures.push(
    `sitemap.xml: URL count ${sitemapUrls.length} does not equal ${INDEXABLE_ROUTE_RECORDS.length} indexable manifest records`,
  );
}

const actualSitemapSet = new Set(sitemapUrls);
const expectedSitemapSet = new Set(expectedSitemapUrls);
for (const url of expectedSitemapSet) if (!actualSitemapSet.has(url)) failures.push(`sitemap.xml: missing ${url}`);
for (const url of actualSitemapSet) if (!expectedSitemapSet.has(url)) failures.push(`sitemap.xml: unexpected ${url}`);

for (const record of INDEXABLE_ROUTE_RECORDS) {
  const canonical = canonicalUrlForPath(record.path);
  const urlBlock = sitemap.match(new RegExp(`<url>\\s*<loc>${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</loc>([\\s\\S]*?)</url>`))?.[1] ?? "";
  const lastmod = extract(urlBlock, /<lastmod>([^<]+)<\/lastmod>/i);
  if (record.lastSignificantUpdate && lastmod !== record.lastSignificantUpdate) {
    fail(record.path, `sitemap lastmod mismatch (${lastmod ?? "missing"})`);
  }
  if (!record.lastSignificantUpdate && lastmod) fail(record.path, "sitemap contains unverified lastmod");
}

if (sitemap.includes("404.html")) failures.push("sitemap.xml: contains 404.html");
if (sitemap.includes("yacht-dxb.netlify.app")) failures.push("sitemap.xml: contains preview hostname");

if (!existsSync(robotsPath)) failures.push("robots.txt: missing");
else if (readFileSync(robotsPath, "utf8") !== generateRobotsTxt()) failures.push("robots.txt: not generated from site authority");

if (!existsSync(redirectsPath)) failures.push("_redirects: missing");
else if (readFileSync(redirectsPath, "utf8") !== generateRedirects(LEGACY_REDIRECTS)) {
  failures.push("_redirects: not generated from route manifest");
}

const titles: Array<{ route: string; value: string }> = [];
const descriptions: Array<{ route: string; value: string }> = [];
const canonicals: Array<{ route: string; value: string }> = [];
const h1Values: Array<{ route: string; value: string }> = [];
const jsonLdPattern = /<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi;

for (const expectation of QA_EXPECTATIONS.filter((item) => item.expectedStatus === 200 && item.indexable)) {
  const filePath = outputFileForRoute(expectation.path);
  if (!existsSync(filePath)) {
    fail(expectation.path, "missing prerendered index.html");
    continue;
  }

  const html = readFileSync(filePath, "utf8");
  const htmlTag = html.match(/<html\b([^>]*)>/i)?.[1] ?? "";
  const title = extract(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = extract(html, /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  const canonical = extract(html, /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  const robots = extract(html, /<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i);
  const h1Matches = [...html.matchAll(/<h1(?:\s[^>]*)?>([\s\S]*?)<\/h1>/gi)].map((match) => textContent(match[1]));

  if (title !== expectation.title) fail(expectation.path, `title mismatch (${title ?? "missing"})`);
  if (description !== expectation.description) fail(expectation.path, `description mismatch (${description ?? "missing"})`);
  if (canonical !== expectation.canonical) fail(expectation.path, `canonical mismatch (${canonical ?? "missing"})`);
  if (!robots?.toLowerCase().includes("index") || robots.toLowerCase().includes("noindex")) {
    fail(expectation.path, "accidental noindex or missing index directive");
  }
  if (h1Matches.length !== 1) fail(expectation.path, `expected exactly one H1, found ${h1Matches.length}`);
  else if (h1Matches[0] !== expectation.h1) fail(expectation.path, `H1 mismatch (${h1Matches[0]})`);
  if (!/\blang=["']ar-AE["']/i.test(htmlTag)) fail(expectation.path, 'missing html lang="ar-AE"');
  if (!/\bdir=["']rtl["']/i.test(htmlTag)) fail(expectation.path, 'missing html dir="rtl"');
  if (!/<main(?:\s[^>]*)?>[\s\S]*?[^\s<][\s\S]*?<\/main>/i.test(html)) fail(expectation.path, "missing initial main content");
  if (html.includes("<!--app-html-->") || html.includes("<!--app-head-->")) fail(expectation.path, "unreplaced template marker");
  if (html.includes("yacht-dxb.netlify.app")) fail(expectation.path, "preview hostname in output");
  if (/<meta[^>]*name=["']keywords["']/i.test(html)) fail(expectation.path, "meta keywords output is prohibited");
  if (/\bhreflang\s*=/i.test(html)) fail(expectation.path, "live hreflang is prohibited until reciprocal rollout");

  try {
    const parsedCanonical = canonical ? new URL(canonical) : undefined;
    if (!parsedCanonical || parsedCanonical.protocol !== "https:" || parsedCanonical.hostname !== "yacht-dxb.com") {
      fail(expectation.path, "canonical is not an absolute production URL");
    } else if (parsedCanonical.pathname !== "/" && !parsedCanonical.pathname.endsWith("/")) {
      fail(expectation.path, "canonical path is missing trailing slash");
    }
  } catch {
    fail(expectation.path, "canonical URL is malformed");
  }

  const jsonLdBlocks = [...html.matchAll(jsonLdPattern)];
  for (const [index, block] of jsonLdBlocks.entries()) {
    try {
      const parsed = JSON.parse(block[1]) as { "@type"?: string };
      if (!parsed["@type"] || !expectation.schema.includes(parsed["@type"] as (typeof expectation.schema)[number])) {
        fail(expectation.path, `JSON-LD block ${index + 1} is not owned by the route (${parsed["@type"] ?? "missing type"})`);
      }
      for (const schemaUrl of productionUrlsIn(parsed)) {
        const parsedUrl = new URL(schemaUrl);
        if (schemaUrl === "https://yacht-dxb.com" || (parsedUrl.pathname !== "/" && !parsedUrl.pathname.endsWith("/"))) {
          fail(expectation.path, `schema URL is missing its canonical trailing slash (${schemaUrl})`);
        }
      }
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      fail(expectation.path, `JSON-LD block ${index + 1} is invalid (${reason})`);
    }
  }
  if (expectation.path === "/" && jsonLdBlocks.length === 0) fail(expectation.path, "homepage requires valid WebSite JSON-LD");

  if (title) titles.push({ route: expectation.path, value: title });
  if (description) descriptions.push({ route: expectation.path, value: description });
  if (canonical) canonicals.push({ route: expectation.path, value: canonical });
  if (h1Matches[0]) h1Values.push({ route: expectation.path, value: h1Matches[0] });
}

collectDuplicates(titles, "title");
collectDuplicates(descriptions, "description");
collectDuplicates(canonicals, "canonical");
collectDuplicates(h1Values, "H1");

for (const record of NON_INDEXABLE_ROUTE_RECORDS.filter((item) => item.redirectTo)) {
  if (existsSync(outputFileForRoute(record.path))) fail(record.path, "redirect route must not emit indexable HTML");
  if (actualSitemapSet.has(canonicalUrlForPath(record.path))) fail(record.path, "non-indexable redirect appears in sitemap");
}

const notFoundPath = resolve(distDir, "404.html");
if (!existsSync(notFoundPath)) {
  failures.push("404.html: missing");
} else {
  const html = readFileSync(notFoundPath, "utf8");
  if (!/<meta[^>]*name=["']robots["'][^>]*content=["']noindex,\s*follow["']/i.test(html)) {
    fail("404.html", "missing noindex, follow");
  }
  if (/rel=["']canonical["']/i.test(html)) fail("404.html", "must not contain a canonical");
  if (!/<h1(?:\s[^>]*)?>[\s\S]*?404[\s\S]*?<\/h1>/i.test(html)) fail("404.html", "missing 404 H1");
  if (/\bhreflang\s*=/i.test(html)) fail("404.html", "must not contain hreflang");
  if (/<meta[^>]*name=["']keywords["']/i.test(html)) fail("404.html", "must not contain meta keywords");
}

if (failures.length > 0) {
  console.error(`SEO static check failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(
  `SEO manifest check passed (${INDEXABLE_ROUTE_RECORDS.length} indexable routes, ${NON_INDEXABLE_ROUTE_RECORDS.length} non-indexable routes, ${sitemapUrls.length} sitemap URLs)`,
);
