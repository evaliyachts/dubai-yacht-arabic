import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { eventPages } from "@/data/eventPages";
import { yachts } from "@/data/yachts";
import { buildYachtJsonLd } from "@/data/yacht-page";
import { PHONE_NUMBER } from "@/lib/constants";
import {
  breadcrumbEntity,
  CONTACT_POINT_ID,
  contactPointEntity,
  ORGANIZATION_ID,
  organizationEntity,
  organizationReference,
  WEBSITE_ID,
  websiteEntity,
} from "@/seo/entities";
import { canonicalUrlForPath, INDEXABLE_ROUTE_RECORDS, requireRouteRecord } from "@/seo/route-manifest";

const prohibitedTypes = /LocalBusiness|Product|Event|FAQPage|AggregateRating|Review/;
const prohibitedEntityProperties = [
  "address",
  "geo",
  "sameAs",
  "aggregateRating",
  "review",
  "openingHours",
  "award",
  "foundingDate",
];

describe("centralized entity graph", () => {
  it("uses one stable website, organization, and contact identity", () => {
    const website = websiteEntity();
    const organization = organizationEntity();
    const contactPoint = contactPointEntity();

    expect(website).toEqual({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: "يخوت دبي",
      alternateName: ["Yacht DXB"],
      url: "https://yacht-dxb.com/",
      publisher: { "@id": ORGANIZATION_ID },
    });
    expect(organization).toMatchObject({
      "@id": ORGANIZATION_ID,
      name: "يخوت دبي",
      alternateName: "Yacht DXB",
      url: "https://yacht-dxb.com/",
      telephone: PHONE_NUMBER,
      contactPoint: { "@id": CONTACT_POINT_ID },
      logo: { "@type": "ImageObject", url: "https://yacht-dxb.com/favicon.png", width: 181, height: 181 },
    });
    expect(contactPoint).toEqual({
      "@context": "https://schema.org",
      "@type": "ContactPoint",
      "@id": CONTACT_POINT_ID,
      telephone: PHONE_NUMBER,
      contactType: "reservations",
    });
    expect(organizationReference()).toEqual({ "@id": ORGANIZATION_ID });
  });

  it("omits prohibited entity claims and schema types", () => {
    const graph = [websiteEntity(), organizationEntity(), contactPointEntity()];
    expect(JSON.stringify(graph)).not.toMatch(prohibitedTypes);
    for (const node of graph) {
      for (const property of prohibitedEntityProperties) expect(node).not.toHaveProperty(property);
    }
  });

  it("links every yacht Service to the organization by @id only", () => {
    for (const yacht of yachts) {
      const route = requireRouteRecord(`/yachts/${yacht.slug}`);
      const service = buildYachtJsonLd(yacht, canonicalUrlForPath(route.path))[0];
      expect(service).toMatchObject({ "@type": "Service", provider: { "@id": ORGANIZATION_ID } });
      expect(service.provider).toEqual({ "@id": ORGANIZATION_ID });
      expect(JSON.stringify(service)).not.toMatch(prohibitedTypes);
    }
  });

  it("keeps route schema ownership narrow and emits no FAQPage or live hreflang", () => {
    expect(requireRouteRecord("/").schema).toEqual(["WebSite", "Organization", "ContactPoint"]);
    expect(requireRouteRecord("/الأسئلة-الشائعة/").schema).toEqual(["BreadcrumbList"]);
    expect(eventPages.every((page) => requireRouteRecord(page.slug).schema.join(",") === "Service,BreadcrumbList")).toBe(true);
    expect(INDEXABLE_ROUTE_RECORDS.flatMap((route) => route.schema)).not.toContain("LocalBusiness");

    const sources = [
      "src/components/shared/SEOHead.tsx",
      "src/pages/FAQ.tsx",
      "src/seo/entities.ts",
    ].map((file) => readFileSync(resolve(file), "utf8")).join("\n");
    expect(sources).not.toMatch(/FAQPage|hreflang|x-default/);
  });

  it("uses the canonical route and stable home identity in breadcrumbs", () => {
    const route = requireRouteRecord("/about/");
    const breadcrumb = breadcrumbEntity(route);
    expect(breadcrumb.itemListElement).toEqual([
      expect.objectContaining({ position: 1, item: "https://yacht-dxb.com/" }),
      expect.objectContaining({ position: 2, item: "https://yacht-dxb.com/about/" }),
    ]);
  });
});
