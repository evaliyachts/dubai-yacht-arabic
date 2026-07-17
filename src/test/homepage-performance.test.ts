import { readFileSync, statSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { getGeneratedStylesheetPath, inlineHomepageStylesheet } from "@/lib/static-performance";

describe("Arabic mobile homepage performance safeguards", () => {
  it("keeps above-the-fold content independent from hydration animation", () => {
    const hero = readFileSync("src/components/home/HeroSection.tsx", "utf8");
    const header = readFileSync("src/components/layout/Header.tsx", "utf8");
    expect(hero).not.toMatch(/framer-motion|useScroll|useTransform|motion\./u);
    expect(header).not.toMatch(/motion\.header|translateY\(-100px\)/u);
    expect(hero).toContain('loading="eager"');
    expect(hero).toContain('decoding="async"');
    expect(hero).not.toContain("fetchpriority");
  });

  it("removes synchronous geometry reads from the services input path", () => {
    const services = readFileSync("src/components/home/ServicesSection.tsx", "utf8");
    expect(services).toContain("IntersectionObserver");
    expect(services).toContain("intersectionRatio");
    expect(services).not.toMatch(/getBoundingClientRect|offsetWidth|offsetHeight|clientWidth|clientHeight/u);
  });

  it("keeps the approved local image renditions within their budgets", () => {
    expect(statSync("src/assets/home/yacht-cover-mobile.avif").size).toBeLessThan(40 * 1024);
    expect(statSync("src/assets/home/yacht-cover-desktop.avif").size).toBeLessThan(55 * 1024);
    expect(statSync("src/assets/home/brand-mark.png").size).toBeLessThan(8 * 1024);
  });

  it("loads Google Fonts without a render-blocking stylesheet or swap-induced layout shift", () => {
    const template = readFileSync("index.html", "utf8");
    expect(template).toContain('rel="preload" as="style"');
    expect(template).toContain('rel="stylesheet" media="print"');
    expect(template).toContain("onload=\"this.media='all'\"");
    expect(template.match(/display=optional/g)).toHaveLength(3);
    expect(template).not.toContain("display=swap");
  });

  it("inlines the generated stylesheet on the homepage without changing its rules", () => {
    const document = '<html><head><link rel="stylesheet" crossorigin href="/assets/index-test.css"></head><body></body></html>';
    const stylesheet = ".hero{display:block}";
    expect(getGeneratedStylesheetPath(document)).toBe("/assets/index-test.css");
    const inlined = inlineHomepageStylesheet(document, stylesheet);
    expect(inlined).toContain(`<style data-homepage-inline-css>${stylesheet}</style>`);
    expect(inlined).not.toContain('rel="stylesheet" crossorigin');
  });

  it("rejects missing stylesheet links and unsafe inline style contents", () => {
    expect(() => getGeneratedStylesheetPath("<html></html>")).toThrow(/stylesheet link was not found/u);
    expect(() => inlineHomepageStylesheet(
      '<link rel="stylesheet" crossorigin href="/assets/index-test.css">',
      "</style><script>alert(1)</script>",
    )).toThrow(/unsafe closing style tag/u);
  });
});
