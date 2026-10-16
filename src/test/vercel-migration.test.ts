import { readFileSync } from "node:fs";
import { createVercelConfig } from "../../scripts/vercel-config";
import { INDEXABLE_ROUTE_RECORDS, LEGACY_REDIRECTS } from "@/seo/route-manifest";
import { responsiveImageUrl } from "@/lib/responsive-image";
import { yachts } from "@/data/yachts";

describe("isolated Vercel migration adapter", () => {
  const config = createVercelConfig();
  it("keeps the checked-in configuration derived from the approved registries", () => {
    expect(JSON.parse(readFileSync("vercel.json", "utf8"))).toEqual(config);
    expect(config.outputDirectory).toBe("dist-vercel");
    expect(config.rewrites).toHaveLength(INDEXABLE_ROUTE_RECORDS.length - 1);
    expect(config.rewrites.every((rule) => !rule.source.includes("*") && !rule.source.includes(":"))).toBe(true);
  });
  it("preserves every legacy 301 and the existing canonical slash convention", () => {
    expect(config.redirects.slice(0, LEGACY_REDIRECTS.length)).toEqual(LEGACY_REDIRECTS.map(({ from, to, status }) => ({
      source: encodeURI(from), destination: encodeURI(to), statusCode: status,
    })));
    expect(config.redirects.slice(LEGACY_REDIRECTS.length)).toEqual(INDEXABLE_ROUTE_RECORDS.filter(({ path }) => path !== "/").map(({ path }) => ({
      source: encodeURI(path.slice(0, -1)), destination: encodeURI(path), statusCode: 301,
    })));
    expect(new Set(config.redirects.map(({ source }) => source)).size).toBe(config.redirects.length);
  });
  it("retains Netlify by default and explicitly selects Vercel only for its build", () => {
    const source = yachts.flatMap(({ media }) => media).find(({ path }) => path.startsWith("https://yacht.fra1.cdn.digitaloceanspaces.com/"))!.path;
    expect(responsiveImageUrl(source, 640)).toContain("/.netlify/images?");
    expect(responsiveImageUrl(source, 640, "", "vercel")).toBe(`/_vercel/image?url=${encodeURIComponent(source)}&w=640&q=75`);
    expect(() => responsiveImageUrl("https://evil.example/image.jpg", 640, "", "vercel")).toThrow(/allowlisted/);
    expect(() => responsiveImageUrl(source, -1, "", "vercel")).toThrow(/width/);
    expect(JSON.parse(readFileSync("package.json", "utf8")).scripts["build:vercel"]).toContain("VITE_IMAGE_CDN=vercel");
  });
  it("limits image optimization to the existing media origin, width set and quality", () => {
    expect(config.images.remotePatterns).toEqual([{ protocol: "https", hostname: "yacht.fra1.cdn.digitaloceanspaces.com", port: "", pathname: "^/.*$", search: "" }]);
    expect(config.images.qualities).toEqual([75]);
    expect(config.images.dangerouslyAllowSVG).toBe(false);
    expect(config.images.sizes).toContain(640);
    expect(config.images.sizes.every((width) => Number.isInteger(width) && width > 0 && width <= 1600)).toBe(true);
  });
});
