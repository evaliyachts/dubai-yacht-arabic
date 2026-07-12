// Runs before Vite development and static production builds.
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { generateRedirects, generateRobotsTxt, generateSitemap } from "../src/seo/output-generators";
import {
  assertValidRouteManifest,
  INDEXABLE_ROUTE_RECORDS,
  LEGACY_REDIRECTS,
  STATIC_ROUTE_RECORDS,
} from "../src/seo/route-manifest";

assertValidRouteManifest();

writeFileSync(resolve("public/sitemap.xml"), generateSitemap(INDEXABLE_ROUTE_RECORDS));
writeFileSync(resolve("public/robots.txt"), generateRobotsTxt());
writeFileSync(resolve("public/_redirects"), generateRedirects(LEGACY_REDIRECTS));
console.log(
  `Manifest outputs written (${INDEXABLE_ROUTE_RECORDS.length} indexable, ${STATIC_ROUTE_RECORDS.length} static, ${LEGACY_REDIRECTS.length} redirects)`,
);
