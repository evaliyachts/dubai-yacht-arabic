import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "vite";
import { PRERENDER_ROUTES } from "../src/lib/static-routes";
import { assertValidRouteManifest } from "../src/seo/route-manifest";
import { yachts } from "../src/data/yachts";
import { validateYachtRecords } from "../src/data/yacht-schema";

const rootDir = resolve(".");
const distDir = resolve(rootDir, "dist");
const ssrDir = resolve(rootDir, ".ssr");
const serverEntry = resolve(ssrDir, "entry-server.mjs");

assertValidRouteManifest();
validateYachtRecords(yachts);

const outputFileForRoute = (route: string) => {
  if (route === "/") return resolve(distDir, "index.html");

  const decoded = decodeURI(route).replace(/^\/+|\/+$/g, "");
  const parts = decoded.split("/");
  if (parts.some((part) => part === "" || part === "." || part === "..")) {
    throw new Error(`Unsafe prerender route: ${route}`);
  }

  const outputFile = resolve(distDir, ...parts, "index.html");
  if (!outputFile.startsWith(`${distDir}${sep}`)) {
    throw new Error(`Prerender route escaped dist: ${route}`);
  }
  return outputFile;
};

const composeDocument = (template: string, appHtml: string, headHtml: string) => {
  if (!template.includes("<!--app-head-->") || !template.includes("<!--app-html-->")) {
    throw new Error("Static HTML template markers are missing");
  }

  return template.replace("<!--app-head-->", headHtml).replace("<!--app-html-->", appHtml);
};

try {
  await build({
    root: rootDir,
    mode: "production",
    build: { outDir: distDir, emptyOutDir: true, sourcemap: false },
  });

  await build({
    root: rootDir,
    mode: "production",
    ssr: { noExternal: ["react-helmet-async"] },
    build: {
      ssr: resolve(rootDir, "src/entry-server.tsx"),
      outDir: ssrDir,
      emptyOutDir: true,
      sourcemap: false,
      rollupOptions: { output: { entryFileNames: "entry-server.mjs" } },
    },
  });

  const template = await readFile(resolve(distDir, "index.html"), "utf8");
  const { renderRoute } = (await import(pathToFileURL(serverEntry).href)) as typeof import("../src/entry-server");

  for (const route of PRERENDER_ROUTES) {
    const { appHtml, headHtml } = renderRoute(route);
    const outputFile = outputFileForRoute(route);
    await mkdir(dirname(outputFile), { recursive: true });
    await writeFile(outputFile, composeDocument(template, appHtml, headHtml));
  }

  const notFound = renderRoute("/__404__/");
  await writeFile(resolve(distDir, "404.html"), composeDocument(template, notFound.appHtml, notFound.headHtml));

  console.log(`Prerendered ${PRERENDER_ROUTES.length} routes and 404.html`);
} finally {
  await rm(ssrDir, { recursive: true, force: true });
}
