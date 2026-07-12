// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { yachts } from "../src/data/yachts";
import { services } from "../src/data/services";
import { getServicePathAr, SERVICE_INDEX_PATH_AR } from "../src/data/services-ar";
import { allLandingPages } from "../src/data/landingPages";
import { ROUTES } from "../src/lib/constants";

const BASE_URL = "https://yacht-dxb.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/yachts", changefreq: "weekly", priority: "0.9" },
  { path: ROUTES.offers, changefreq: "weekly", priority: "0.8" },
  { path: SERVICE_INDEX_PATH_AR, changefreq: "weekly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.5" },
  { path: ROUTES.faq, changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
];

const landingEntries: SitemapEntry[] = allLandingPages.map((p) => ({
  path: p.slug,
  changefreq: "weekly",
  priority: "0.8",
}));

const yachtEntries: SitemapEntry[] = yachts.map((y) => ({
  path: `/yachts/${y.slug}`,
  changefreq: "weekly",
  priority: "0.8",
}));

const serviceEntries: SitemapEntry[] = services.map((s) => ({
  path: getServicePathAr(s.slug),
  changefreq: "weekly",
  priority: "0.7",
}));

const entries: SitemapEntry[] = [...staticEntries, ...landingEntries, ...yachtEntries, ...serviceEntries];

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${encodeURI(e.path)}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n");
}

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
console.log(`sitemap.xml written (${entries.length} entries)`);
