// Read-only migration parity capture. Raw results must remain outside Git.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, relative } from "node:path";
import { createHash } from "node:crypto";
import { JSDOM, VirtualConsole } from "jsdom";
import { INDEXABLE_ROUTE_RECORDS, LEGACY_REDIRECTS } from "../src/seo/route-manifest.ts";

const [base, output, transport = "public"] = process.argv.slice(2);
if (!base || !output || !["public", "oidc"].includes(transport)) throw new Error("Usage: node --import tsx scripts/migration-audit.mjs BASE EXTERNAL_OUTPUT [public|oidc]");
const destination = resolve(output);
if (!relative(process.cwd(), destination).startsWith("..")) throw new Error("Raw evidence must be outside the repository");
const headers = {};
if (transport === "oidc") {
  if (!/^dubai-yacht-arabic-[a-z0-9]+-evali1\.vercel\.app$/.test(new URL(base).hostname)) throw new Error("OIDC is limited to this project's immutable Preview host");
  process.loadEnvFile(".env.local");
  if (!process.env.VERCEL_OIDC_TOKEN) throw new Error("Linked project token unavailable");
  headers["x-vercel-trusted-oidc-idp-token"] = process.env.VERCEL_OIDC_TOKEN;
} else if (new URL(base).origin !== "https://yacht-dxb.com") throw new Error("Public baseline must use the approved production origin");
const sha = (value) => createHash("sha256").update(value).digest("hex");
const normalizeCdn = (value) => value?.replaceAll("/.netlify/images?", "/__image_cdn__?").replaceAll("/_vercel/image?", "/__image_cdn__?").replaceAll("&fm=webp", "");
const extract = (html) => {
  const d = new JSDOM(html, { virtualConsole: new VirtualConsole() }).window.document;
  return {
    lang: d.documentElement.lang, dir: d.documentElement.dir, title: d.title,
    description: d.querySelector('meta[name="description"]')?.content ?? null,
    canonical: d.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
    robots: d.querySelector('meta[name="robots"]')?.content ?? null,
    headings: [...d.querySelectorAll("h1,h2,h3")].map((node) => [node.tagName, node.textContent]),
    textHash: sha(d.querySelector("#root")?.textContent ?? ""),
    schema: [...d.querySelectorAll('script[type="application/ld+json"]')].map((node) => node.textContent),
    links: [...d.querySelectorAll("#root a")].map((node) => [node.getAttribute("href"), node.textContent]),
    media: [...d.querySelectorAll("img,source")].map((node) => [node.getAttribute("src"), normalizeCdn(node.getAttribute("srcset")), node.getAttribute("sizes"), node.getAttribute("alt"), node.getAttribute("width"), node.getAttribute("height")]),
    alternates: [...d.querySelectorAll("link[hreflang]")].map((node) => node.outerHTML),
  };
};
async function request(path) {
  const response = await fetch(new URL(path, base), { headers, redirect: "manual", signal: AbortSignal.timeout(30000) });
  return { status: response.status, location: response.headers.get("location"), cache: response.headers.get("cache-control"), html: await response.text() };
}
const routes = [];
for (const { path } of INDEXABLE_ROUTE_RECORDS) {
  const result = await request(path);
  const local = await readFile(resolve("dist", `.${decodeURI(path)}index.html`), "utf8");
  const actual = extract(result.html);
  routes.push({ path, status: result.status, location: result.location, metadataContentParity: JSON.stringify(actual) === JSON.stringify(extract(local)), ...actual });
}
const expectedRedirects = [...LEGACY_REDIRECTS.map(({ from, to }) => ({ from, to })), ...INDEXABLE_ROUTE_RECORDS.filter(({ path }) => path !== "/").map(({ path }) => ({ from: path.slice(0, -1), to: path }))];
const redirects = [];
for (const { from, to } of expectedRedirects) {
  const result = await request(from);
  let actualTarget;
  try { actualTarget = result.location && decodeURI(new URL(result.location, base).pathname); } catch { actualTarget = null; }
  redirects.push({ from, to, status: result.status, location: result.location, pass: result.status === 301 && actualTarget === to });
}
const probes = [];
for (const path of ["/__migration_unknown_20261016__/", "/yachts/__migration_unknown_20261016__/", "/services/__migration_unknown_20261016__/", "/%ZZ", "/server/entry-server.mjs"]) {
  const result = await request(path);
  probes.push({ path, status: result.status, pass: result.status === 404 || (path === "/%ZZ" && result.status === 400) });
}
const sitemap = await request("/sitemap.xml");
const localSitemap = await readFile("public/sitemap.xml", "utf8");
const sitemapUrls = [...sitemap.html.matchAll(/<loc>(.*?)<\/loc>/gs)].map((m) => m[1]);
const robots = await request("/robots.txt");
const homepage = await request("/");
const script = homepage.html.match(/<script[^>]*src="(\/assets\/[^"\s]+\.js)"/)?.[1];
const asset = script ? await request(script) : null;
const map = script ? await request(`${script}.map`) : null;
const report = {
  timestamp: new Date().toISOString(), base, transport,
  generatedOwners: INDEXABLE_ROUTE_RECORDS.length, routes, redirects, probes,
  sitemapEntries: sitemapUrls.length, sitemapDistinct: new Set(sitemapUrls).size,
  sitemapSha256: sha(sitemap.html), sitemapUnchanged: sitemap.status === 200 && sitemap.html === localSitemap,
  robotsPass: robots.status === 200 && robots.html.includes("https://yacht-dxb.com/sitemap.xml"),
  asset: { path: script, status: asset?.status, cache: asset?.cache, mapStatus: map?.status, mapExposed: !!map?.html.includes('"sources"') },
};
const failures = [...routes.filter((r) => r.status !== 200 || !r.metadataContentParity), ...redirects.filter((r) => !r.pass), ...probes.filter((r) => !r.pass)];
const pass = failures.length === 0 && report.sitemapUnchanged && report.robotsPass && report.sitemapDistinct === report.generatedOwners && asset?.status === 200 && !report.asset.mapExposed && [403,404].includes(map?.status);
await mkdir(resolve(destination, ".."), { recursive: true });
await writeFile(destination, JSON.stringify({ ...report, pass }, null, 2) + "\n");
console.log(JSON.stringify({ base, pass, canonical200: routes.filter((r) => r.status === 200).length, redirectChecks: redirects.length, sitemapEntries: report.sitemapEntries, sitemapDistinct: report.sitemapDistinct, failures, probes, asset: report.asset }, null, 2));
if (!pass) process.exitCode = 1;
