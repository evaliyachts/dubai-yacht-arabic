import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import App from "@/App";
import SEOHead from "@/components/shared/SEOHead";
import { yachts, type YachtMediaRecord } from "@/data/yachts";
import { canonicalUrlForPath, requireRouteRecord } from "@/seo/route-manifest";
import { normalizeSocialImage, socialImageForYachtMedia } from "@/seo/social-image";

describe("manifest-owned metadata output", () => {
  it("renders homepage metadata from the manifest without keywords or hreflang", async () => {
    const route = requireRouteRecord("/");
    window.history.pushState({}, "", route.path);
    render(<App />);

    await waitFor(() => expect(document.title).toBe(route.title));
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute("href", canonicalUrlForPath(route.path));
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
    expect(document.head.querySelector('meta[name="keywords"]')).toBeNull();
    expect(document.head.querySelector("[hreflang]")).toBeNull();
    expect(document.head.textContent).not.toContain("LocalBusiness");
    expect(document.head.querySelector('meta[property="og:site_name"]')).toHaveAttribute("content", "يخوت دبي");

    const websiteNodes = [...document.head.querySelectorAll('script[type="application/ld+json"]')]
      .map((script) => JSON.parse(script.textContent ?? "null"))
      .filter((node) => node?.["@type"] === "WebSite");

    expect(websiteNodes).toEqual([
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "يخوت دبي",
        alternateName: ["Yacht DXB"],
        url: "https://yacht-dxb.com/",
      },
    ]);
  });

  it("omits neutral yacht placeholders from Open Graph and Twitter media", async () => {
    const yacht = yachts[0];
    const route = requireRouteRecord(`/yachts/${yacht.slug}`);
    window.history.pushState({}, "", route.path);
    render(<App />);

    await waitFor(() => expect(document.title).toBe(route.title));
    expect(document.head.querySelector('meta[property="og:image"]')).toBeNull();
    expect(document.head.querySelector('meta[name="twitter:image"]')).toBeNull();
    expect(document.head.querySelector('meta[name="twitter:card"]')).toHaveAttribute("content", "summary");
  });

  it("converts authorized local yacht media to absolute production social URLs with media details", async () => {
    const route = requireRouteRecord(`/yachts/${yachts[0].slug}`);
    const authorizedMedia: YachtMediaRecord = {
      ...yachts[0].media[0],
      path: "/media/authorized-yacht.webp",
      altAr: "صورة مرخصة لليخت",
      width: 1600,
      height: 900,
      rightsRecordId: "media-authorized-test-001",
    };
    const socialImage = socialImageForYachtMedia(authorizedMedia);
    render(<HelmetProvider><SEOHead route={route} image={socialImage} /></HelmetProvider>);

    await waitFor(() => expect(document.head.querySelector('meta[property="og:image"]')).toHaveAttribute("content", "https://yacht-dxb.com/media/authorized-yacht.webp"));
    expect(document.head.querySelector('meta[name="twitter:image"]')).toHaveAttribute("content", "https://yacht-dxb.com/media/authorized-yacht.webp");
    expect(document.head.querySelector('meta[property="og:image:alt"]')).toHaveAttribute("content", authorizedMedia.altAr);
    expect(document.head.querySelector('meta[name="twitter:image:alt"]')).toHaveAttribute("content", authorizedMedia.altAr);
    expect(document.head.querySelector('meta[property="og:image:width"]')).toHaveAttribute("content", "1600");
    expect(document.head.querySelector('meta[property="og:image:height"]')).toHaveAttribute("content", "900");
  });

  it("rejects relative Open Graph image URLs", () => {
    expect(() => normalizeSocialImage("/media/relative-image.webp")).toThrow(/must be absolute/);
  });
});
