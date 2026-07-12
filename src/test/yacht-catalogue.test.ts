import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { FLEET_RANGES, relatedYachts, yachtFaqs, yachtOverview } from "@/data/fleet";
import { validateYachtRecords } from "@/data/yacht-schema";
import { yachts, type YachtRecord } from "@/data/yachts";
import { buildYachtJsonLd, validateYachtServiceName, yachtSeoTitle } from "@/data/yacht-page";
import { ATTACHED_GALLERY_YACHT_IDS, galleryCountForYacht, isNeutralYachtMedia } from "@/data/yacht-media";
import {
  INDEXABLE_ROUTE_RECORDS,
  LEGACY_REDIRECTS,
  NON_INDEXABLE_ROUTE_RECORDS,
  YACHT_ROUTE_RECORDS,
  canonicalUrlForPath,
  requireRouteRecord,
} from "@/seo/route-manifest";

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
const oldInboundPath = decodeURI("/yachts/%D8%B9%D9%88%D8%A7%D9%85%D8%A9-%D8%A5%DA%A4%D8%A7%D9%84%D9%8A-55-%D9%82%D8%AF%D9%85-%D9%84%D9%84%D8%A5%D9%8A%D8%AC%D8%A7%D8%B1-%D8%AF%D8%A8%D9%8A");
const newPath = "/yachts/عوامة-خاصة-55-قدم-للإيجار-في-دبي/";
const correctedRoutes = [
  ["/yachts/استأجار-يخت-50-قدم-ازيموت", "/yachts/يخت-أزيموت-50-قدم-للإيجار/"],
  ["/yachts/أجار-يخت-50-قدم-اوركس", "/yachts/يخت-أوريكس-50-قدم-للإيجار/"],
  ["/yachts/يجار-يخت-50-قدم-فيريتتي", "/yachts/يخت-فيريتي-50-قدم-للإيجار/"],
] as const;

describe("PR 5 verified yacht catalogue", () => {
  it("contains exactly 24 strict, unique, validated records", () => {
    expect(yachts).toHaveLength(24);
    expect(validateYachtRecords(yachts)).toEqual(yachts);
    expect(new Set(yachts.map((yacht) => yacht.id)).size).toBe(24);
    expect(new Set(yachts.map((yacht) => yacht.slug)).size).toBe(24);

    const yachtKeys = ["availability", "featured", "guestCapacity", "id", "lengthFt", "media", "minimumDuration", "name", "numberOfBedrooms", "pricePerHour", "priority", "slug", "yearBuilt"];
    const mediaKeys = ["altAr", "featured", "height", "path", "priority", "rightsRecordId", "type", "width"];
    const rightsRegister = readFileSync(resolve("docs/MEDIA_RIGHTS.md"), "utf8");
    for (const yacht of yachts) {
      expect(Object.keys(yacht).sort()).toEqual(yachtKeys.filter((key) => key in yacht));
      expect(yacht.media.length).toBeGreaterThan(0);
      for (const media of yacht.media) {
        expect(Object.keys(media).sort()).toEqual(mediaKeys);
        if (media.path.startsWith("/")) expect(existsSync(resolve("public", media.path.replace(/^\//, "")))).toBe(true);
        else expect(new URL(media.path).protocol).toBe("https:");
        expect(rightsRegister).toContain(`\`${media.rightsRecordId}\``);
      }
    }
  });

  it("rejects unknown yacht and media fields, bad enums, duplicates, invalid numbers, and empty galleries", () => {
    const base = clone(yachts[0]) as YachtRecord & Record<string, unknown>;
    expect(() => validateYachtRecords([{ ...base, bathrooms: 2 }])).toThrow(/unknown fields/);
    expect(() => validateYachtRecords([{ ...base, media: [{ ...base.media[0], caption: "x" }] }])).toThrow(/unknown fields/);
    expect(() => validateYachtRecords([{ ...base, availability: "maybe" }])).toThrow(/availability/);
    expect(() => validateYachtRecords([{ ...base, id: 2 }])).toThrow(/id/);
    expect(() => validateYachtRecords([{ ...base, pricePerHour: 0 }])).toThrow(/pricePerHour/);
    expect(() => validateYachtRecords([{ ...base, media: [] }])).toThrow(/must not be empty/);
    expect(() => validateYachtRecords([{ ...base, media: [{ ...base.media[0], rightsRecordId: "" }] }])).toThrow(/rightsRecordId/);
    expect(() => validateYachtRecords([{ ...base, media: [{ ...base.media[0], width: -1 }] }])).toThrow(/width/);
    expect(() => validateYachtRecords([{ ...base, media: [{ ...base.media[0], type: "video" }] }])).toThrow(/type/);
    expect(() => validateYachtRecords([base, clone(base)])).toThrow(/Duplicate yacht id/);
  });

  it("rejects prohibited branding in public names, slugs, media paths, and alt text", () => {
    const base = clone(yachts[0]);
    expect(() => validateYachtRecords([{ ...base, name: "Evali 55" }])).toThrow(/prohibited branding/);
    expect(() => validateYachtRecords([{ ...base, slug: "evaliyacht-55" }])).toThrow(/prohibited branding/);
    expect(() => validateYachtRecords([{ ...base, media: [{ ...base.media[0], path: "/media/evali.webp" }] }])).toThrow(/prohibited branding/);
    expect(() => validateYachtRecords([{ ...base, media: [{ ...base.media[0], altAr: "صورة إڤالي" }] }])).toThrow(/prohibited branding/);
  });

  it("rejects malformed Arabic yacht names and slugs", () => {
    const base = clone(yachts[0]);
    expect(() => validateYachtRecords([{ ...base, name: "استأجار يخت 50 قدم" }])).toThrow(/malformed Arabic/);
    expect(() => validateYachtRecords([{ ...base, name: "أجار يخت 50 قدم" }])).toThrow(/malformed Arabic/);
    expect(() => validateYachtRecords([{ ...base, slug: "يجار-يخت-50-قدم" }])).toThrow(/malformed Arabic/);
    expect(JSON.stringify(yachts)).not.toMatch(/استأجار|"name":"أجار يخت|"slug":"يجار-/);
  });

  it("includes the verified static Benetti snapshot without remote media", () => {
    const benetti = yachts.find((yacht) => yacht.id === "yacht-14");
    expect(benetti).toMatchObject({
      slug: "يخت-بينيتي-110-قدم-مع-جاكوزي",
      name: "يخت بينيتي 110 قدم مع جاكوزي",
      lengthFt: 110,
      guestCapacity: 50,
      yearBuilt: 2021,
      pricePerHour: 4500,
      minimumDuration: 4,
      numberOfBedrooms: 4,
      availability: "available",
      featured: false,
      priority: 6,
    });
    expect(benetti?.media).toEqual([expect.objectContaining({ path: "/media/yacht-placeholder.svg", rightsRecordId: "media-neutral-placeholder-001" })]);
    expect(JSON.stringify(benetti)).not.toMatch(/https?:|supabase|evali/i);
  });

  it("restores the 23 approved galleries while keeping Benetti placeholder-only", () => {
    expect(ATTACHED_GALLERY_YACHT_IDS).toHaveLength(23);
    expect(yachts.filter((yacht) => !isNeutralYachtMedia(yacht.media[0]))).toHaveLength(23);
    expect(galleryCountForYacht("yacht-02")).toBe(10);
    expect(galleryCountForYacht("yacht-03")).toBe(9);
    expect(galleryCountForYacht("yacht-06")).toBe(7);
    expect(galleryCountForYacht("yacht-07")).toBe(6);
    expect(galleryCountForYacht("yacht-08")).toBe(7);
    expect(yachts.find((yacht) => yacht.id === "yacht-08")?.media.every((media) => !media.path.startsWith("hhttps://"))).toBe(true);

    for (const yacht of yachts.filter((candidate) => candidate.id !== "yacht-14")) {
      expect(yacht.media).toHaveLength(galleryCountForYacht(yacht.id));
      expect(yacht.media[0].featured).toBe(true);
      expect(new Set(yacht.media.map((media) => media.path)).size).toBe(yacht.media.length);
      expect(yacht.media.every((media) => media.altAr.startsWith(yacht.name))).toBe(true);
    }
    expect(JSON.stringify(yachts.map(({ name, slug, media }) => ({ name, slug, alt: media.map((item) => item.altAr) })))).not.toMatch(
      /evali|evaliyacht|إڤالي|إيفالي|ايفالي/i,
    );
  });

  it("renames the former 55-foot record and owns one direct permanent redirect", () => {
    expect(yachts.some((yacht) => yacht.slug === oldInboundPath.split("/").at(-1))).toBe(false);
    expect(yachts.find((yacht) => yacht.id === "yacht-02")).toMatchObject({
      name: "عوامة خاصة 55 قدم للإيجار في دبي",
      slug: "عوامة-خاصة-55-قدم-للإيجار-في-دبي",
    });
    expect(requireRouteRecord(oldInboundPath)).toMatchObject({ indexable: false, redirectTo: newPath });
    expect(LEGACY_REDIRECTS).toContainEqual({ from: `${oldInboundPath}/`, to: newPath, status: 301 });
    expect(LEGACY_REDIRECTS).toContainEqual({ from: oldInboundPath, to: newPath, status: 301 });
  });

  it("normalizes the three obvious Arabic names and redirects every former path directly", () => {
    expect(yachts.find((yacht) => yacht.id === "yacht-06")).toMatchObject({ name: "يخت أزيموت 50 قدم للإيجار", slug: "يخت-أزيموت-50-قدم-للإيجار" });
    expect(yachts.find((yacht) => yacht.id === "yacht-07")).toMatchObject({ name: "يخت أوريكس 50 قدم للإيجار", slug: "يخت-أوريكس-50-قدم-للإيجار" });
    expect(yachts.find((yacht) => yacht.id === "yacht-08")).toMatchObject({ name: "يخت فيريتي 50 قدم للإيجار", slug: "يخت-فيريتي-50-قدم-للإيجار" });
    for (const [from, to] of correctedRoutes) {
      expect(requireRouteRecord(from)).toMatchObject({ indexable: false, redirectTo: to });
      expect(LEGACY_REDIRECTS).toContainEqual({ from, to, status: 301 });
      expect(LEGACY_REDIRECTS).toContainEqual({ from: `${from}/`, to, status: 301 });
    }
  });

  it("derives the current fleet ranges and keeps all curated selections valid", () => {
    expect(FLEET_RANGES).toEqual({
      lengthFt: { min: 42, max: 150 },
      guestCapacity: { min: 12, max: 130 },
      pricePerHour: { min: 400, max: 5000 },
      minimumDuration: { min: 2, max: 4 },
    });
    const sources = ["src/data/landingPages.ts", "src/data/eventPages.ts", "src/components/home/FeaturedYachts.tsx"]
      .map((file) => readFileSync(resolve(file), "utf8"))
      .join("\n");
    for (const match of sources.matchAll(/["']([^"']*(?:يخت|عوامة)[^"']*)["']/g)) {
      const candidate = match[1];
      if (candidate.includes("-") && candidate.split("-").length > 3 && !candidate.includes(" ")) {
        expect(yachts.some((yacht) => yacht.slug === candidate) || !candidate.match(/قدم|ماجستي|ازيموت|سنسيكر|هاترس|اوركس|فيريتتي/), candidate).toBe(true);
      }
    }
  });

  it("owns 24 unique yacht pages within the audited current route counts", () => {
    expect(YACHT_ROUTE_RECORDS).toHaveLength(24);
    expect(INDEXABLE_ROUTE_RECORDS).toHaveLength(58);
    expect(NON_INDEXABLE_ROUTE_RECORDS).toHaveLength(23);
    expect(new Set(YACHT_ROUTE_RECORDS.map((route) => route.title)).size).toBe(24);
    expect(new Set(YACHT_ROUTE_RECORDS.map((route) => route.description)).size).toBe(24);
    expect(new Set(YACHT_ROUTE_RECORDS.map((route) => route.h1)).size).toBe(24);
    for (const yacht of yachts) {
      const route = requireRouteRecord(`/yachts/${yacht.slug}`);
      expect(route.schema).toEqual(["Service", "BreadcrumbList"]);
      expect(route.title).toBe(yachtSeoTitle(yacht));
      expect(route.title).toBe(`${yacht.name} | السعر والسعة — يخوت دبي`);
      expect(route.title.split(`${yacht.lengthFt} قدم`).length - 1).toBe(yacht.name.split(`${yacht.lengthFt} قدم`).length - 1);
      expect(route.title.split("للإيجار").length - 1).toBe(yacht.name.split("للإيجار").length - 1);
    }
  });

  it("renders factual, unique initial HTML with Service Offer, breadcrumbs, links, FAQs, and three related yachts", () => {
    const intros = new Set<string>();
    const faqSets = new Set<string>();
    const source = readFileSync(resolve("src/pages/YachtDetails.tsx"), "utf8");
    for (const yacht of yachts) {
      const route = requireRouteRecord(`/yachts/${yacht.slug}`);
      const schemas = buildYachtJsonLd(yacht, canonicalUrlForPath(route.path));
      const service = schemas.find((node) => node["@type"] === "Service");
      expect(service).toMatchObject({ name: yacht.name, serviceType: "تأجير يخت خاص في دبي" });
      expect(service?.offers).toMatchObject({ "@type": "Offer", price: yacht.pricePerHour, priceCurrency: "AED", url: canonicalUrlForPath(route.path) });
      expect(schemas.map((node) => node["@type"])).toEqual(["Service", "BreadcrumbList"]);
      expect(JSON.stringify(schemas)).not.toMatch(/Product|AggregateRating|Review|Event|LocalBusiness|FAQPage/);
      expect(relatedYachts(yacht)).toHaveLength(3);
      intros.add(yachtOverview(yacht));
      faqSets.add(JSON.stringify(yachtFaqs(yacht)));
    }
    expect(intros.size).toBe(24);
    expect(faqSets.size).toBe(24);
    expect(source).toContain("روابط أساسية لصفحة اليخت");
    expect(source).toContain("related.map");
    expect(source).toContain("faqs.map");
    expect(source).toContain("getWhatsAppLink");
    expect(source).toContain("getPhoneLink");
  });

  it("rejects duplicated rental and repeated specification phrases in schema names", () => {
    expect(() => validateYachtServiceName("تأجير تأجير يخت خاص")).toThrow(/Duplicated rental/);
    expect(() => validateYachtServiceName("تأجير ايجار يخت خاص")).toThrow(/Duplicated rental/);
    expect(() => validateYachtServiceName("يخت 50 قدم 50 قدم")).toThrow(/Repeated length/);
    expect(() => validateYachtServiceName("يخت للإيجار للإيجار")).toThrow(/Repeated rental/);
    for (const yacht of yachts) expect(validateYachtServiceName(yacht.name)).toBe(yacht.name);
  });
});
