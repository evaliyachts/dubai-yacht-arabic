import { yachts } from "../src/data/yachts";
import { allLandingPages } from "../src/data/landingPages";
import { DEFAULT_WIDTHS } from "../src/lib/responsive-image";
import { INDEXABLE_ROUTE_RECORDS, LEGACY_REDIRECTS } from "../src/seo/route-manifest";

export const vercelPagePath = (path: string) => path === "/" ? "/index.html" : `/_pages${path.slice(0, -1)}.html`;

export const createVercelConfig = () => ({
  $schema: "https://openapi.vercel.sh/vercel.json",
  framework: null,
  installCommand: "npx --yes npm@11.16.0 ci",
  buildCommand: "npm run build:vercel",
  outputDirectory: "dist-vercel",
  cleanUrls: false,
  // Explicit existing slash normalization avoids a platform-default 308 or extra hop.
  redirects: [
    ...LEGACY_REDIRECTS.map(({ from, to, status }) => ({ source: encodeURI(from), destination: encodeURI(to), statusCode: status })),
    ...INDEXABLE_ROUTE_RECORDS.filter(({ path }) => path !== "/").map(({ path }) => ({
      source: encodeURI(path.slice(0, -1)), destination: encodeURI(path), statusCode: 301,
    })),
  ],
  rewrites: INDEXABLE_ROUTE_RECORDS.filter(({ path }) => path !== "/").map(({ path }) => ({
    source: encodeURI(path), destination: encodeURI(vercelPagePath(path)),
  })),
  headers: [
    { source: "/(.*)", headers: [
      { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
    ] },
    { source: "/assets/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
  ],
  images: {
    sizes: [...new Set([
      ...DEFAULT_WIDTHS,
      ...yachts.flatMap(({ media }) => media.map(({ width }) => Math.min(width, 1600))),
      ...allLandingPages.map((page) => Math.min(page.imageWidth ?? 1200, 1600)),
    ])].sort((a, b) => a - b),
    domains: [],
    remotePatterns: [{ protocol: "https", hostname: "yacht.fra1.cdn.digitaloceanspaces.com", port: "", pathname: "^/.*$", search: "" }],
    localPatterns: [],
    qualities: [75],
    formats: ["image/webp"],
    minimumCacheTTL: 3600,
    dangerouslyAllowSVG: false,
  },
});
