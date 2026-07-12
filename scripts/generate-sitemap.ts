// Runs before Vite development and static production builds.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { LEGACY_REDIRECTS, PRERENDER_ROUTES } from "../src/lib/static-routes";

const BASE_URL = "https://yacht-dxb.com";

function generateSitemap(routes: string[]) {
  const urls = routes.map((route) =>
    [`  <url>`, `    <loc>${BASE_URL}${encodeURI(route)}</loc>`, `  </url>`].join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n");
}

const redirects = [
  "# Generated from src/lib/static-routes.ts. Specific legacy rules only; no SPA wildcard.",
  ...LEGACY_REDIRECTS.map(({ from, to, status }) => `${from} ${to} ${status}`),
  "",
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(PRERENDER_ROUTES));
writeFileSync(resolve("public/_redirects"), redirects);
console.log(`Static inputs written (${PRERENDER_ROUTES.length} routes, ${LEGACY_REDIRECTS.length} redirects)`);
