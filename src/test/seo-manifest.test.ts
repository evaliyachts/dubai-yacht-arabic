import { generateRedirects, generateSitemap } from "@/seo/output-generators";
import {
  canonicalUrlForPath,
  INDEXABLE_ROUTE_RECORDS,
  NON_INDEXABLE_ROUTE_RECORDS,
  QA_EXPECTATIONS,
  ROUTE_MANIFEST,
  type CanonicalPath,
  type RouteManifestRecord,
  validateRouteManifest,
} from "@/seo/route-manifest";

const makeRecord = (overrides: Partial<RouteManifestRecord> = {}): RouteManifestRecord => ({
  id: "test",
  path: "/test/",
  indexable: true,
  pageType: "support",
  title: "عنوان اختبار",
  description: "وصف اختبار فريد",
  h1: "عنوان رئيسي للاختبار",
  primaryIntent: "غرض اختبار فريد",
  schema: ["BreadcrumbList"],
  ...overrides,
});

describe("SEO route manifest", () => {
  it("is valid and derives QA ownership for every route", () => {
    expect(validateRouteManifest()).toEqual([]);
    expect(QA_EXPECTATIONS).toHaveLength(ROUTE_MANIFEST.length);
    expect(INDEXABLE_ROUTE_RECORDS.length).toBeGreaterThan(0);
    expect(NON_INDEXABLE_ROUTE_RECORDS.every((record) => record.redirectTo)).toBe(true);
  });

  it("generates sitemap membership dynamically from indexable records", () => {
    const sitemap = generateSitemap(ROUTE_MANIFEST);
    const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

    expect(urls).toHaveLength(INDEXABLE_ROUTE_RECORDS.length);
    expect(new Set(urls)).toEqual(new Set(INDEXABLE_ROUTE_RECORDS.map((record) => canonicalUrlForPath(record.path))));
    for (const record of NON_INDEXABLE_ROUTE_RECORDS) {
      expect(urls).not.toContain(canonicalUrlForPath(record.path));
    }
  });

  it("emits lastmod only for an explicitly recorded significant update", () => {
    const withoutDate = generateSitemap([makeRecord()]);
    const withDate = generateSitemap([makeRecord({ lastSignificantUpdate: "2026-07-01" })]);

    expect(withoutDate).not.toContain("<lastmod>");
    expect(withDate).toContain("<lastmod>2026-07-01</lastmod>");
  });

  it("URL-encodes Arabic Netlify redirect paths", () => {
    const redirects = generateRedirects([{ from: "/الخدمات/سباحة/", to: "/سباحة/", status: 301 }]);

    expect(redirects).toContain("/%D8%A7%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA/%D8%B3%D8%A8%D8%A7%D8%AD%D8%A9/");
    expect(redirects).toContain("/%D8%B3%D8%A8%D8%A7%D8%AD%D8%A9/ 301");
  });

  it.each(["title", "description", "h1", "primaryIntent"] as const)("rejects duplicate %s values", (field) => {
    const first = makeRecord({ id: "first", path: "/first/" });
    const second = makeRecord({
      id: "second",
      path: "/second/",
      title: "عنوان ثان",
      description: "وصف ثان",
      h1: "عنوان رئيسي ثان",
      primaryIntent: "غرض ثان",
      [field]: first[field],
    });

    expect(validateRouteManifest([first, second], [])).toContainEqual(expect.stringContaining(`${field} is shared`));
  });

  it("rejects duplicate canonicals, malformed paths, invalid dates, and preview-host metadata", () => {
    const failures = validateRouteManifest(
      [
        makeRecord({ id: "first", path: "/same/" }),
        makeRecord({
          id: "second",
          path: "/same/",
          title: "عنوان ثان",
          description: "وصف ثان",
          h1: "عنوان رئيسي ثان",
          primaryIntent: "غرض ثان",
        }),
        makeRecord({
          id: "bad-path",
          path: "/bad" as CanonicalPath,
          title: "عنوان ثالث",
          description: "https://yacht-dxb.netlify.app/ is prohibited",
          h1: "عنوان رئيسي ثالث",
          primaryIntent: "غرض ثالث",
          lastSignificantUpdate: "2026-02-30",
        }),
      ],
      [],
    );

    expect(failures).toContainEqual(expect.stringContaining("duplicate canonical"));
    expect(failures).toContainEqual(expect.stringContaining("missing trailing slash"));
    expect(failures).toContainEqual(expect.stringContaining("invalid lastSignificantUpdate"));
    expect(failures).toContainEqual(expect.stringContaining("preview hostname"));
  });
});
