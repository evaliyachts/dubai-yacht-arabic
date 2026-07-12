import { DOMAIN } from "@/lib/constants";
import type { LegacyRedirect, RouteManifestRecord } from "@/seo/route-manifest";
import { canonicalUrlForPath } from "@/seo/route-manifest";

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const generateSitemap = (records: RouteManifestRecord[]) => {
  const urls = records
    .filter((record) => record.indexable)
    .map((record) => {
      const lastmod = record.lastSignificantUpdate
        ? `\n    <lastmod>${escapeXml(record.lastSignificantUpdate)}</lastmod>`
        : "";
      return `  <url>\n    <loc>${escapeXml(canonicalUrlForPath(record.path))}</loc>${lastmod}\n  </url>`;
    });

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n");
};

export const generateRobotsTxt = () =>
  [`User-agent: *`, `Allow: /`, ``, `Sitemap: ${DOMAIN}/sitemap.xml`, ``].join("\n");

export const generateRedirects = (redirects: LegacyRedirect[]) =>
  [
    "# Generated from src/seo/route-manifest.ts. Specific legacy rules only; no SPA wildcard.",
    ...redirects.map(({ from, to, status }) => `${from} ${to} ${status}`),
    "",
  ].join("\n");
