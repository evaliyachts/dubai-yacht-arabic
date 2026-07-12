import { render, waitFor } from "@testing-library/react";
import App from "@/App";
import { canonicalUrlForPath, requireRouteRecord } from "@/seo/route-manifest";

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
});
