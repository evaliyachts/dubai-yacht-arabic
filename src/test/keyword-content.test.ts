import { describe, expect, it } from "vitest";
import { keywordPages } from "@/data/landingPages";
import { yachts } from "@/data/yachts";
import { requireRouteRecord } from "@/seo/route-manifest";

const expectedSlugs = new Set([
  "/تأجير-يخت-في-دبي",
  "/حجز-يخت-في-دبي",
  "/يخوت-للإيجار-في-دبي",
  "/تأجير-يخوت-فاخرة-في-دبي",
  "/أسعار-تأجير-اليخوت-في-دبي",
  "/يخت-دبي-مارينا",
  "/رحلات-بحرية-خاصة-في-دبي",
  "/تأجير-يخت-للمناسبات-في-دبي",
]);

describe("PR 3 keyword content", () => {
  it("owns exactly the eight audited keyword routes", () => {
    expect(keywordPages).toHaveLength(8);
    expect(new Set(keywordPages.map((page) => page.slug))).toEqual(expectedSlugs);
  });

  it("provides substantial unique content for every keyword intent", () => {
    const unique = (values: string[]) => expect(new Set(values).size).toBe(values.length);

    for (const page of keywordPages) {
      expect(page.intro.length).toBeGreaterThan(90);
      expect(page.directAnswer?.length).toBeGreaterThan(100);
      expect(page.contentSections?.length).toBeGreaterThanOrEqual(3);
      expect(page.faqs.length).toBeGreaterThanOrEqual(5);
      expect(page.related.length).toBeGreaterThanOrEqual(4);
      expect(page.lastSignificantUpdate).toBe("2026-07-12");

      const route = requireRouteRecord(page.slug);
      expect(route.title).toBe(page.title);
      expect(route.description).toBe(page.metaDescription);
      expect(route.h1).toBe(page.h1);
      expect(route.primaryIntent).toBe(page.h1);
      expect(route.schema).toEqual(["Service", "BreadcrumbList"]);
      expect(route.lastSignificantUpdate).toBe("2026-07-12");
    }

    unique(keywordPages.map((page) => page.title));
    unique(keywordPages.map((page) => page.metaDescription));
    unique(keywordPages.map((page) => page.h1));
    unique(keywordPages.map((page) => page.intro));
    unique(keywordPages.map((page) => page.directAnswer ?? ""));
  });

  it("uses canonical manifest routes for all internal content links", () => {
    for (const page of keywordPages) {
      const links = [
        ...page.related.map((link) => link.path),
        ...(page.contentSections ?? []).flatMap((section) => section.links?.map((link) => link.path) ?? []),
      ];

      for (const path of links) {
        const route = requireRouteRecord(path);
        expect(route.indexable, `${page.slug} links to ${path}`).toBe(true);
        expect(route.path === "/" || route.path.endsWith("/")).toBe(true);
      }
    }
  });

  it("selects only existing neutral yacht records and displays explicit fields", () => {
    const knownSlugs = new Set(yachts.map((yacht) => yacht.slug));
    const selected = keywordPages.flatMap((page) => page.featuredYachtSlugs ?? []);

    expect(selected.length).toBeGreaterThan(0);
    for (const slug of selected) {
      expect(knownSlugs.has(slug), slug).toBe(true);
      expect(slug.toLowerCase()).not.toMatch(/evali|إڤالي|إيفالي/);
    }
  });

  it("does not restore prior unverified commercial promises", () => {
    const content = JSON.stringify(keywordPages);
    const prohibited = [
      "عربون 50%",
      "إلغاء مجاني",
      "لا رسوم خفية",
      "يشمل الكابتن",
      "التوفر الفوري",
      "تأكيد الحجز خلال دقائق",
      "500 و7500",
      "42 إلى 151",
      "10 إلى 130",
    ];

    for (const phrase of prohibited) expect(content).not.toContain(phrase);
  });
});
