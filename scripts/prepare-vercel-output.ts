import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { INDEXABLE_ROUTE_RECORDS } from "../src/seo/route-manifest";
import { vercelPagePath } from "./vercel-config";

// A separate artifact preserves the normal Netlify build and its directory URLs.
const source = resolve("dist");
const destination = resolve("dist-vercel");
const pages = await Promise.all(INDEXABLE_ROUTE_RECORDS.filter(({ path }) => path !== "/").map(async ({ path }) => ({
  original: `${decodeURI(path)}index.html`, target: vercelPagePath(path),
  html: await readFile(resolve(source, `.${decodeURI(path)}index.html`), "utf8"),
})));
await rm(destination, { recursive: true, force: true });
await cp(source, destination, { recursive: true });
for (const page of pages) {
  const output = resolve(destination, `.${page.target}`);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, page.html);
  await rm(resolve(destination, `.${page.original}`));
}
await rm(resolve(destination, "_redirects"), { force: true });
console.log(`Prepared ${pages.length + 1} unchanged canonical HTML pages for exact Vercel routing.`);
