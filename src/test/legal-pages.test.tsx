import { render, screen, waitFor } from "@testing-library/react";
import App from "@/App";
import { approvedPrivacyContent, approvedTermsContent } from "@/data/legal-pages";
import { generateSitemap } from "@/seo/output-generators";
import {
  canonicalUrlForPath,
  INDEXABLE_ROUTE_RECORDS,
  requireRouteRecord,
  ROUTE_MANIFEST,
} from "@/seo/route-manifest";

const allApprovedText = (content: typeof approvedTermsContent) => [
  ...content.introduction,
  ...content.sections.flatMap((section) => [
    section.heading,
    ...section.blocks.flatMap((block) => (block.type === "paragraph" ? [block.text] : block.items)),
  ]),
];

describe("approved Arabic legal pages", () => {
  it("keeps both approved documents indexed with truthful Arabic metadata", () => {
    const termsRoute = requireRouteRecord("/terms/");
    const privacyRoute = requireRouteRecord("/privacy/");

    expect(termsRoute).toMatchObject({
      indexable: true,
      title: "الشروط والأحكام | يخوت دبي",
      description:
        "شروط استخدام موقع يخوت دبي وطلبات تأجير اليخوت والأسعار والتأكيد والإلغاء والمسؤوليات.",
      h1: "الشروط والأحكام",
      lastSignificantUpdate: "2026-07-13",
      schema: ["BreadcrumbList"],
    });
    expect(privacyRoute).toMatchObject({
      indexable: true,
      title: "سياسة الخصوصية | يخوت دبي",
      description:
        "كيفية تعامل يخوت دبي مع بيانات التواصل وواتساب والبيانات التقنية وحقوق مستخدمي الموقع.",
      h1: "سياسة الخصوصية",
      lastSignificantUpdate: "2026-07-13",
      schema: ["BreadcrumbList"],
    });
    expect(termsRoute.title).not.toMatch(/[A-Za-z]{4,}/);
    expect(privacyRoute.title).not.toMatch(/[A-Za-z]{4,}/);
  });

  it("preserves all approved sections and the approved update date", () => {
    expect(approvedTermsContent.sections).toHaveLength(17);
    expect(approvedPrivacyContent.sections).toHaveLength(16);
    expect(approvedTermsContent.lastUpdatedIso).toBe("2026-07-13");
    expect(approvedPrivacyContent.lastUpdatedIso).toBe("2026-07-13");
    expect(allApprovedText(approvedTermsContent)).toContain(
      "لا يستقبل الموقع في وضعه الحالي مدفوعات إلكترونية ولا يخزن بيانات بطاقات مصرفية.",
    );
    expect(allApprovedText(approvedPrivacyContent)).toContain(
      "لا نستخدم حالياً Google Analytics أو Google Tag Manager، ولا يوجد معرف قياس تحليلي مفعل في الموقع.",
    );
  });

  it("keeps Terms and Privacy in the 58-URL indexable sitemap inventory", () => {
    const sitemap = generateSitemap(ROUTE_MANIFEST);
    const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

    expect(INDEXABLE_ROUTE_RECORDS).toHaveLength(58);
    expect(sitemapUrls).toHaveLength(INDEXABLE_ROUTE_RECORDS.length);
    expect(sitemapUrls).toContain("https://yacht-dxb.com/terms/");
    expect(sitemapUrls).toContain("https://yacht-dxb.com/privacy/");
  });

  it.each([
    [
      "/terms/",
      "الشروط والأحكام",
      "تخضع هذه الشروط للقوانين السارية في دولة الإمارات العربية المتحدة.",
      approvedTermsContent,
    ],
    ["/privacy/", "سياسة الخصوصية", "لا نبيع بياناتك الشخصية.", approvedPrivacyContent],
  ] as const)("renders approved Arabic content and metadata for %s", async (path, h1, requiredText, content) => {
    const route = requireRouteRecord(path);
    window.history.pushState({}, "", path);
    render(<App />);

    expect(await screen.findAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: h1 })).toBeInTheDocument();
    for (const section of content.sections) {
      expect(screen.getByRole("heading", { level: 2, name: section.heading })).toBeInTheDocument();
    }
    expect(screen.getByText("13 يوليو 2026")).toHaveAttribute("datetime", "2026-07-13");
    expect(screen.getByText(requiredText)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "+971 50 464 1020" })[0]).toHaveAttribute(
      "href",
      "tel:+971504641020",
    );
    await waitFor(() => expect(document.title).toBe(route.title));
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      canonicalUrlForPath(route.path),
    );
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute("content", route.description);
    const schemaTypes = [...document.head.querySelectorAll('script[type="application/ld+json"]')]
      .map((script) => JSON.parse(script.textContent ?? "null")?.["@type"])
      .filter(Boolean);
    expect(schemaTypes).toEqual(["BreadcrumbList"]);
    expect(document.head.querySelector("[hreflang]")).toBeNull();
  });

  it("does not restore English legal copy or prohibited fixed promises", () => {
    const output = [
      ...allApprovedText(approvedTermsContent),
      ...allApprovedText(approvedPrivacyContent),
      requireRouteRecord("/terms/").title,
      requireRouteRecord("/terms/").description,
      requireRouteRecord("/privacy/").title,
      requireRouteRecord("/privacy/").description,
    ].join("\n");

    expect(output).not.toContain("Booking & Payment");
    expect(output).not.toContain("Cancellation Policy");
    expect(output).not.toContain("Safety & Conduct");
    expect(output).not.toContain("Information We Collect");
    expect(output).not.toContain("How We Use Your Information");
    expect(output).not.toContain("Data Security");
    expect(output).not.toContain("A 50% deposit");
    expect(output).not.toContain("50%");
    expect(output).not.toContain("Free cancellation up to 48 hours");
    expect(output).not.toContain("48 hours");
    expect(output).not.toContain("full refund");
    expect(output).not.toContain("free rescheduling");
    expect(output).not.toContain("maritime insurance");
    expect(output).not.toContain("Accepted payment methods include");
    expect(output).not.toContain("Dubai Yatch");
  });
});
