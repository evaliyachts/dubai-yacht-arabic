import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { offers } from "@/data/offers";
import { eventPages } from "@/data/eventPages";
import { yachts } from "@/data/yachts";
import { ROUTES } from "@/lib/constants";
import {
  INDEXABLE_ROUTE_RECORDS,
  LEGACY_REDIRECTS,
  NON_INDEXABLE_ROUTE_RECORDS,
  requireRouteRecord,
  toCanonicalPath,
} from "@/seo/route-manifest";

const expectedServiceRoutes = new Set([
  ROUTES.birthday,
  ROUTES.privateParty,
  ROUTES.engagement,
  ROUTES.proposal,
  ROUTES.wedding,
  ROUTES.anniversary,
  ROUTES.graduation,
  ROUTES.genderReveal,
  ROUTES.bachelor,
  ROUTES.family,
  ROUTES.bbq,
  ROUTES.dinner,
  ROUTES.morning,
  ROUTES.afternoonTea,
  ROUTES.jetSki,
  ROUTES.waterSports,
  ROUTES.fishing,
  ROUTES.swimming,
]);

describe("PR 4 event-focused service pages", () => {
  it("owns exactly the 18 audited canonical top-level routes", () => {
    expect(eventPages).toHaveLength(18);
    expect(new Set(eventPages.map((page) => page.slug))).toEqual(expectedServiceRoutes);

    for (const page of eventPages) {
      const route = requireRouteRecord(page.slug);
      expect(route.indexable).toBe(true);
      expect(route.path).toBe(toCanonicalPath(page.slug));
      expect(route.path.startsWith("/الخدمات/")).toBe(false);
      expect(route.schema).toEqual(["Service", "BreadcrumbList"]);
      expect(route.lastSignificantUpdate).toBe("2026-07-12");
    }
  });

  it("assigns every service to an approved category and complete content contract", () => {
    const categories = new Set(["celebration", "private experience", "hospitality", "water activity"]);

    for (const page of eventPages) {
      expect(categories.has(page.category)).toBe(true);
      expect(page.directAnswer.length).toBeGreaterThan(100);
      expect(page.contentSections.length).toBeGreaterThanOrEqual(2);
      expect(page.bookingSteps).toHaveLength(3);
      expect(page.priceFactors).toHaveLength(4);
      expect(page.faqs.length).toBeGreaterThanOrEqual(4);
      expect(page.optionalAddOns.length).toBeGreaterThan(0);
      expect(JSON.stringify(page)).toMatch(/اختياري/);
      expect(page.mediaPlaceholder).toBe(true);
      expect(page.image).toBeUndefined();
    }
  });

  it("keeps titles, descriptions, H1s, introductions, and FAQ sets unique", () => {
    const unique = (values: string[]) => expect(new Set(values).size).toBe(values.length);
    unique(eventPages.map((page) => page.title));
    unique(eventPages.map((page) => page.metaDescription));
    unique(eventPages.map((page) => page.h1));
    unique(eventPages.map((page) => page.intro));
    unique(eventPages.map((page) => JSON.stringify(page.faqs)));
  });

  it("does not publish the removed default inclusion promises", () => {
    const content = JSON.stringify(eventPages);
    const removedClaims = [
      "كابتن وطاقم محترف",
      "وقود ومعدات سلامة",
      "نظام صوتي عالي الجودة",
      "مشروبات غازية وماء",
      "منصة للسباحة",
      "ديكور كامل",
      "باقة كاملة تشمل",
      "جميع التجهيزات",
      "تأكيد الحجز خلال دقائق",
      "إلغاء مجاني",
    ];
    for (const claim of removedClaims) expect(content).not.toContain(claim);
    expect(content).not.toMatch(/→/);
  });

  it("selects exactly three existing neutral yachts for every service", () => {
    const knownYachts = new Set(yachts.map((yacht) => yacht.slug));
    for (const page of eventPages) {
      expect(page.featuredYachtSlugs).toHaveLength(3);
      expect(new Set(page.featuredYachtSlugs).size).toBe(3);
      for (const slug of page.featuredYachtSlugs) {
        expect(knownYachts.has(slug), `${page.slug}: ${slug}`).toBe(true);
        expect(slug.toLowerCase()).not.toMatch(/evali|إڤالي|إيفالي/);
      }
    }
  });

  it("uses canonical indexable manifest records for internal and related links", () => {
    for (const page of eventPages) {
      const paths = [
        ...page.related.map((link) => link.path),
        ...page.contentSections.flatMap((section) => section.links?.map((link) => link.path) ?? []),
      ];
      for (const path of paths) {
        const route = requireRouteRecord(path);
        expect(route.indexable, `${page.slug} links to ${path}`).toBe(true);
        expect(route.path === "/" || route.path.endsWith("/")).toBe(true);
      }
    }
  });

  it("emits only Service and BreadcrumbList JSON-LD in initial service HTML", () => {
    const templateSource = readFileSync(resolve("src/components/landing/LandingPageTemplate.tsx"), "utf8");
    for (const page of eventPages) {
      expect(requireRouteRecord(page.slug).schema).toEqual(["Service", "BreadcrumbList"]);
    }
    expect(templateSource).toContain('"@type": "Service"');
    expect(templateSource).toContain('"@type": "BreadcrumbList"');
    expect(templateSource).not.toContain('"@type": "Event"');
    expect(templateSource).not.toContain('"@type": "FAQPage"');
  });

  it("keeps duplicate service paths non-indexable with one-hop canonical redirects", () => {
    const duplicateRecords = NON_INDEXABLE_ROUTE_RECORDS.filter((record) => record.id.startsWith("legacy-service:"));
    expect(duplicateRecords).toHaveLength(18);
    expect(INDEXABLE_ROUTE_RECORDS.some((record) => record.path.startsWith("/الخدمات/") && record.path !== "/الخدمات/")).toBe(false);
    for (const record of duplicateRecords) {
      expect(record.redirectTo).toBeDefined();
      expect(requireRouteRecord(record.redirectTo!).indexable).toBe(true);
    }
  });

  it("redirects the Arabic offers owner and obsolete offer paths to pricing", () => {
    const pricingPath = toCanonicalPath(ROUTES.prices);
    const offersOwner = requireRouteRecord(ROUTES.offers);
    expect(offersOwner.indexable).toBe(false);
    expect(offersOwner.redirectTo).toBe(pricingPath);

    const expectedPaths = [ROUTES.offers, "/offers", ...offers.flatMap((offer) => [
      `/offers/${offer.slug}`,
      `${ROUTES.offers}/${offer.slug}`,
      `/offer/${offer.slug}`,
    ])];
    for (const path of expectedPaths) {
      const canonicalVariant = path.endsWith("/") ? path : `${path}/`;
      expect(LEGACY_REDIRECTS).toContainEqual({ from: canonicalVariant, to: pricingPath, status: 301 });
    }
  });

  it("introduces no prohibited brand or URL in the new service implementation", () => {
    const sources = [
      "src/data/eventPages.ts",
      "src/components/landing/LandingPageTemplate.tsx",
      "src/pages/Services.tsx",
    ].map((file) => readFileSync(resolve(file), "utf8")).join("\n");
    expect(sources.toLowerCase()).not.toMatch(/evali|evaliyacht\.com|evali\.fra1/);
  });
});
