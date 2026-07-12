import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { yachts } from "../src/data/yachts";
import { APPROVED_ATTACHED_MEDIA_URLS } from "../src/data/yacht-media";
import { validateYachtRecords } from "../src/data/yacht-schema";
import { socialImageForYachtMedia, validateSocialImageUrl } from "../src/seo/social-image";
import { PHONE_NUMBER } from "../src/lib/constants";
import { CONTACT_POINT_ID, ORGANIZATION_ID, WEBSITE_ID } from "../src/seo/entities";
import { generateRedirects, generateRobotsTxt } from "../src/seo/output-generators";
import {
  assertValidRouteManifest,
  canonicalUrlForPath,
  INDEXABLE_ROUTE_RECORDS,
  LEGACY_REDIRECTS,
  NON_INDEXABLE_ROUTE_RECORDS,
  QA_EXPECTATIONS,
  getRouteRecord,
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

const schemaNodesIn = (value: unknown): Array<Record<string, unknown>> => {
  if (Array.isArray(value)) return value.flatMap(schemaNodesIn);
  if (!value || typeof value !== "object") return [];
  const node = value as Record<string, unknown>;
  return [node, ...Object.values(node).flatMap(schemaNodesIn)];
};

const forbiddenSchemaTypes = new Set([
  "LocalBusiness",
  "Product",
  "Event",
  "FAQPage",
  "AggregateRating",
  "Review",
]);
const forbiddenEntityProperties = new Set([
  "address",
  "geo",
  "sameAs",
  "aggregateRating",
  "review",
  "openingHours",
  "award",
  "foundingDate",
]);

try {
  assertValidRouteManifest();
  validateYachtRecords(yachts);
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
const yachtByPath = new Map(yachts.map((yacht) => [`/yachts/${yacht.slug}/`, yacht]));

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
  const ogImage = extract(html, /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
  const twitterImage = extract(html, /<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i);
  const h1Matches = [...html.matchAll(/<h1(?:\s[^>]*)?>([\s\S]*?)<\/h1>/gi)].map((match) => textContent(match[1]));
  const mainTags = [...html.matchAll(/<main\b([^>]*)>/gi)].map((match) => match[1]);

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
  if (mainTags.length !== 1) fail(expectation.path, `expected one main landmark, found ${mainTags.length}`);
  if (!mainTags[0]?.includes('id="main-content"')) fail(expectation.path, "main landmark is missing the skip-link target");
  if (/opacity\s*:\s*0(?:[;\s]|$)/i.test(mainTags[0] ?? "")) fail(expectation.path, "main content is hidden before hydration");
  if (!/<main(?:\s[^>]*)?>[\s\S]*?[^\s<][\s\S]*?<\/main>/i.test(html)) fail(expectation.path, "missing initial main content");
  if (html.includes("<!--app-html-->") || html.includes("<!--app-head-->")) fail(expectation.path, "unreplaced template marker");
  if (html.includes("yacht-dxb.netlify.app")) fail(expectation.path, "preview hostname in output");
  if (/<meta[^>]*name=["']keywords["']/i.test(html)) fail(expectation.path, "meta keywords output is prohibited");
  if (/\bhreflang\s*=/i.test(html)) fail(expectation.path, "live hreflang is prohibited until reciprocal rollout");

  for (const [label, mediaUrl] of [["og:image", ogImage], ["twitter:image", twitterImage]] as const) {
    if (!mediaUrl) continue;
    try {
      validateSocialImageUrl(mediaUrl);
    } catch (error) {
      fail(expectation.path, `${label} is invalid (${error instanceof Error ? error.message : String(error)})`);
    }
  }

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
  const parsedJsonLd: Array<Record<string, unknown>> = [];
  for (const [index, block] of jsonLdBlocks.entries()) {
    try {
      const parsed = JSON.parse(block[1]) as { "@type"?: string };
      parsedJsonLd.push(parsed as Record<string, unknown>);
      if (!parsed["@type"] || !expectation.schema.includes(parsed["@type"] as (typeof expectation.schema)[number])) {
        fail(expectation.path, `JSON-LD block ${index + 1} is not owned by the route (${parsed["@type"] ?? "missing type"})`);
      }
      for (const schemaUrl of productionUrlsIn(parsed)) {
        const parsedUrl = new URL(schemaUrl);
        const isAssetUrl = /\.[a-z0-9]{2,8}$/i.test(parsedUrl.pathname);
        if (!isAssetUrl && (schemaUrl === "https://yacht-dxb.com" || (parsedUrl.pathname !== "/" && !parsedUrl.pathname.endsWith("/")))) {
          fail(expectation.path, `schema URL is missing its canonical trailing slash (${schemaUrl})`);
        }
      }
      for (const node of schemaNodesIn(parsed)) {
        const type = node["@type"];
        if (typeof type === "string" && forbiddenSchemaTypes.has(type)) {
          fail(expectation.path, `prohibited schema type (${type})`);
        }
        if (node.telephone !== undefined && node.telephone !== PHONE_NUMBER) {
          fail(expectation.path, `schema telephone drifts from centralized phone (${String(node.telephone)})`);
        }
        if (type === "Organization" || type === "ContactPoint") {
          for (const property of forbiddenEntityProperties) {
            if (property in node) fail(expectation.path, `${type} contains unapproved property (${property})`);
          }
        }
        if (type === "Service") {
          const provider = node.provider;
          if (JSON.stringify(provider) !== JSON.stringify({ "@id": ORGANIZATION_ID })) {
            fail(expectation.path, "Service provider must reference the centralized Organization @id only");
          }
        }
      }
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      fail(expectation.path, `JSON-LD block ${index + 1} is invalid (${reason})`);
    }
  }
  if (expectation.path === "/" && jsonLdBlocks.length === 0) fail(expectation.path, "homepage requires valid WebSite JSON-LD");
  if (expectation.path === "/") {
    const websiteNodes = parsedJsonLd.filter((node) => node["@type"] === "WebSite");
    const organizationNodes = parsedJsonLd.filter((node) => node["@type"] === "Organization");
    const contactNodes = parsedJsonLd.filter((node) => node["@type"] === "ContactPoint");
    if (websiteNodes.length !== 1 || websiteNodes[0]["@id"] !== WEBSITE_ID) {
      fail(expectation.path, "homepage must emit exactly one stable WebSite identity");
    }
    if (organizationNodes.length !== 1 || organizationNodes[0]["@id"] !== ORGANIZATION_ID) {
      fail(expectation.path, "homepage must emit exactly one stable Organization identity");
    }
    if (contactNodes.length !== 1 || contactNodes[0]["@id"] !== CONTACT_POINT_ID) {
      fail(expectation.path, "homepage must emit exactly one stable ContactPoint identity");
    }
    if (JSON.stringify(websiteNodes[0]?.publisher) !== JSON.stringify({ "@id": ORGANIZATION_ID })) {
      fail(expectation.path, "WebSite publisher must reference the centralized Organization");
    }
    if (JSON.stringify(organizationNodes[0]?.contactPoint) !== JSON.stringify({ "@id": CONTACT_POINT_ID })) {
      fail(expectation.path, "Organization contactPoint must reference the centralized ContactPoint");
    }
  }

  const yacht = yachtByPath.get(expectation.path);
  if (yacht) {
    const expectedSocialImage = socialImageForYachtMedia(yacht.media[0]);
    if (!expectedSocialImage && (ogImage || twitterImage)) {
      fail(expectation.path, "neutral yacht placeholder must not be emitted as social media metadata");
    }
    if (expectedSocialImage && (ogImage !== expectedSocialImage.url || twitterImage !== expectedSocialImage.url)) {
      fail(expectation.path, "authorized yacht social image must use its absolute production URL");
    }
    const schemaTypes = parsedJsonLd.map((node) => node["@type"]);
    if (schemaTypes.length !== 2 || schemaTypes[0] !== "Service" || schemaTypes[1] !== "BreadcrumbList") {
      fail(expectation.path, `yacht schema must be Service then BreadcrumbList (${schemaTypes.join(", ")})`);
    }
    const service = parsedJsonLd[0] as { offers?: { price?: number; priceCurrency?: string; url?: string } } | undefined;
    if (service?.offers?.price !== yacht.pricePerHour || service.offers.priceCurrency !== "AED" || service.offers.url !== canonical) {
      fail(expectation.path, "yacht Offer does not match the verified hourly price and canonical URL");
    }
    if (/Product|AggregateRating|Review|Event|LocalBusiness|FAQPage/.test(JSON.stringify(parsedJsonLd))) {
      fail(expectation.path, "yacht page contains prohibited or inherited schema");
    }
    for (const requiredText of [yacht.name, `${yacht.lengthFt} قدم`, `${yacht.guestCapacity} ضيفاً`, `${yacht.minimumDuration} ساعات`, "خطوات طلب الحجز", "روابط أساسية", "ثلاثة يخوت قريبة للمقارنة"]) {
      if (!textContent(html).includes(requiredText)) fail(expectation.path, `missing factual yacht content: ${requiredText}`);
    }
  }

  for (const match of html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)) {
    const imageTag = match[0];
    const source = decodeHtml(match[1]).split(/[?#]/, 1)[0];
    if (!/\bwidth=["']\d+["']/i.test(imageTag) || !/\bheight=["']\d+["']/i.test(imageTag)) {
      fail(expectation.path, `image is missing explicit dimensions: ${source}`);
    }
    if (source.startsWith("/") && !source.startsWith("//")) {
      const localPath = resolve(distDir, decodeURI(source).replace(/^\/+/, ""));
      if (!existsSync(localPath)) fail(expectation.path, `broken local image: ${source}`);
    }
  }

  for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)) {
    const href = decodeHtml(match[1]);
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const path = decodeURI(new URL(href, "https://yacht-dxb.com").pathname);
    const linkedRoute = getRouteRecord(path);
    if (!linkedRoute || !linkedRoute.indexable) fail(expectation.path, `internal link does not target an indexable manifest route: ${href}`);
    else if (path !== linkedRoute.path) fail(expectation.path, `internal link is not canonical: ${href}`);
  }

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

const outputFiles = (directory: string): string[] => readdirSync(directory).flatMap((entry) => {
  const path = resolve(directory, entry);
  return statSync(path).isDirectory() ? outputFiles(path) : [path];
});
const prohibitedOutput = /evaliyacht(?:s)?\.com|\bevali\b|إڤالي|إيفالي|ايفالي|supabase(?:\.co)?/i;
const inheritedSchema = /AggregateRating|ratingValue|reviewCount|"@type"\s*:\s*"Product"/i;
const malformedYachtWording = /استأجار|>\s*أجار يخت|\/yachts\/يجار-/i;
for (const file of outputFiles(distDir)) {
  const relative = file.slice(distDir.length + 1);
  if (prohibitedOutput.test(relative)) failures.push(`${relative}: production path exposes prohibited branding or provenance`);
  if (relative.endsWith(".map")) failures.push(`${relative}: production source map is prohibited`);
  if (!/\.(?:html|js|css|xml|txt|json|svg)$/i.test(relative) && relative !== "_redirects") continue;
  const source = readFileSync(file, "utf8");
  const sourceWithoutApprovedMedia = APPROVED_ATTACHED_MEDIA_URLS.reduce(
    (current, mediaUrl) => current.replaceAll(mediaUrl, "[approved-yacht-media]"),
    source,
  );
  if (prohibitedOutput.test(sourceWithoutApprovedMedia)) failures.push(`${relative}: production output exposes prohibited branding or runtime provenance`);
  if (inheritedSchema.test(source)) failures.push(`${relative}: production output contains inherited product/rating schema`);
  if (malformedYachtWording.test(source)) failures.push(`${relative}: production output contains malformed yacht wording`);
}

if (failures.length > 0) {
  console.error(`SEO static check failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(
  `SEO manifest check passed (${INDEXABLE_ROUTE_RECORDS.length} indexable routes, ${NON_INDEXABLE_ROUTE_RECORDS.length} non-indexable routes, ${sitemapUrls.length} sitemap URLs)`,
);
