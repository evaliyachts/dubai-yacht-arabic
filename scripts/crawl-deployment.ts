import { APPROVED_ATTACHED_MEDIA_URLS } from "../src/data/yacht-media";
import { DOMAIN } from "../src/lib/constants";
import {
  INDEXABLE_ROUTE_RECORDS,
  LEGACY_REDIRECTS,
  NON_INDEXABLE_ROUTE_RECORDS,
  canonicalUrlForPath,
} from "../src/seo/route-manifest";

const baseArgument = process.argv.find((argument) => argument.startsWith("--base="))?.slice("--base=".length);
if (!baseArgument) throw new Error("Usage: npm run qa:crawl -- --base=https://deploy.example");
const base = new URL(baseArgument).origin;
const failures: string[] = [];
const fail = (scope: string, message: string) => failures.push(`${scope}: ${message}`);

const fetchManual = (path: string) => fetch(new URL(path, base), { redirect: "manual" });
const decodedPath = (value: string) => decodeURI(new URL(value, base).pathname);
const canonicalSet = new Set(INDEXABLE_ROUTE_RECORDS.map((record) => canonicalUrlForPath(record.path)));

let encodedArabicChecks = 0;
for (const record of INDEXABLE_ROUTE_RECORDS) {
  const response = await fetchManual(record.path);
  if (response.status !== 200) fail(record.path, `canonical returned ${response.status}`);
  const html = await response.text();
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1];
  const robots = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i)?.[1] ?? "";
  if (canonical !== canonicalUrlForPath(record.path)) fail(record.path, `canonical mismatch (${canonical ?? "missing"})`);
  if (robots.toLowerCase().includes("noindex")) fail(record.path, "accidental noindex");
  if (/yacht-dxb\.netlify\.app|deploy-preview|lovable\.app|lovableproject\.com/i.test(html)) fail(record.path, "preview or Lovable hostname in generated content");
  if (/\bhreflang\s*=|x-default/i.test(html)) fail(record.path, "live language alternate emitted");

  const withoutApprovedMedia = APPROVED_ATTACHED_MEDIA_URLS.reduce(
    (current, source) => current.replaceAll(source, "[approved-yacht-media]"),
    html,
  );
  if (/evaliyacht(?:s)?\.com|\bevali\b|إڤالي|إيفالي|ايفالي|supabase(?:\.co)?/i.test(withoutApprovedMedia)) {
    fail(record.path, "prohibited Evali branding or runtime reference");
  }

  if (encodeURI(record.path) !== record.path) {
    const encodedResponse = await fetchManual(encodeURI(record.path));
    if (encodedResponse.status !== 200) fail(record.path, `encoded Arabic path returned ${encodedResponse.status}`);
    encodedArabicChecks += 1;
  }
}

let redirectChecks = 0;
for (const redirect of LEGACY_REDIRECTS) {
  const response = await fetchManual(redirect.from);
  if (response.status !== 301) {
    fail(redirect.from, `legacy route returned ${response.status}, expected 301`);
    continue;
  }
  const location = response.headers.get("location");
  if (!location || decodedPath(location) !== redirect.to) {
    fail(redirect.from, `redirect target mismatch (${location ?? "missing"})`);
    continue;
  }
  const destination = await fetch(new URL(location, base), { redirect: "manual" });
  if (destination.status !== 200 || destination.headers.has("location")) {
    fail(redirect.from, `redirect destination is not a single-hop 200 (${destination.status})`);
  }
  redirectChecks += 1;
}

const unknown = await fetchManual("/__final-qa-unknown-route__/");
if (unknown.status !== 404) fail("unknown route", `returned ${unknown.status}, expected 404`);

const sitemapResponse = await fetchManual("/sitemap.xml");
const sitemap = await sitemapResponse.text();
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (sitemapResponse.status !== 200) fail("sitemap.xml", `returned ${sitemapResponse.status}`);
if (sitemapUrls.length !== canonicalSet.size) fail("sitemap.xml", `${sitemapUrls.length} URLs for ${canonicalSet.size} canonical routes`);
for (const url of sitemapUrls) if (!canonicalSet.has(url)) fail("sitemap.xml", `unexpected URL ${url}`);
for (const record of NON_INDEXABLE_ROUTE_RECORDS) {
  if (sitemapUrls.includes(canonicalUrlForPath(record.path))) fail("sitemap.xml", `contains non-indexable ${record.path}`);
}
if (/404\.html/.test(sitemap)) fail("sitemap.xml", "contains 404.html");

const robotsResponse = await fetchManual("/robots.txt");
const robots = await robotsResponse.text();
if (robotsResponse.status !== 200) fail("robots.txt", `returned ${robotsResponse.status}`);
if (!robots.includes(`Sitemap: ${DOMAIN}/sitemap.xml`)) fail("robots.txt", "does not reference the production sitemap");

const homepageResponse = await fetchManual("/");
const homepage = await homepageResponse.text();
const assetPath = homepage.match(/<script[^>]+src=["'](\/assets\/[^"']+\.js)["']/i)?.[1];
for (const [label, response] of [["HTML", homepageResponse], ["robots.txt", robotsResponse], ["sitemap.xml", sitemapResponse]] as const) {
  if (/immutable/i.test(response.headers.get("cache-control") ?? "")) fail(label, "must not be immutable-cached");
}
if (!assetPath) fail("assets", "fingerprinted JavaScript asset is missing");
else {
  const assetResponse = await fetchManual(assetPath);
  if (assetResponse.status !== 200) fail("assets", `fingerprinted JavaScript returned ${assetResponse.status}`);
  if (!/max-age=31536000/i.test(assetResponse.headers.get("cache-control") ?? "") || !/immutable/i.test(assetResponse.headers.get("cache-control") ?? "")) {
    fail("assets", "fingerprinted JavaScript is missing immutable caching");
  }
  const sourceMap = await fetchManual(`${assetPath}.map`);
  if (sourceMap.status !== 404) fail("assets", `production source map returned ${sourceMap.status}`);
}

if (failures.length > 0) {
  console.error(`Deployment crawl failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(JSON.stringify({
  base,
  canonical200: INDEXABLE_ROUTE_RECORDS.length,
  encodedArabic200: encodedArabicChecks,
  legacy301SingleHop: redirectChecks,
  sitemapUrls: sitemapUrls.length,
  unknownStatus: unknown.status,
  analyticsExpected: "disabled unless an approved VITE_GA_MEASUREMENT_ID is supplied",
}, null, 2));
