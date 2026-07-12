import { LEGACY_REDIRECTS, PRERENDER_ROUTES } from "@/lib/static-routes";

describe("static route inventory", () => {
  it("contains unique trailing-slash canonical paths", () => {
    expect(new Set(PRERENDER_ROUTES).size).toBe(PRERENDER_ROUTES.length);
    expect(PRERENDER_ROUTES).not.toContain("/404.html");

    for (const route of PRERENDER_ROUTES) {
      expect(route.startsWith("/")).toBe(true);
      expect(route === "/" || route.endsWith("/")).toBe(true);
      expect(decodeURI(encodeURI(route))).toBe(route);
    }
  });

  it("defines only exact permanent legacy redirects to canonical pages", () => {
    expect(LEGACY_REDIRECTS.length).toBeGreaterThan(0);

    for (const redirect of LEGACY_REDIRECTS) {
      expect(redirect.status).toBe(301);
      expect(redirect.from).not.toContain("*");
      expect(PRERENDER_ROUTES).toContain(redirect.to);
    }
  });
});
