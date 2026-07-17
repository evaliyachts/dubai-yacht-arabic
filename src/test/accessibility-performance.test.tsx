import { render, screen } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import App from "@/App";

describe("PR 7 accessibility and performance safeguards", () => {
  it("provides a skip link and one main landmark through the shared layout", async () => {
    window.history.pushState({}, "", "/");
    render(<App />);
    expect(await screen.findByText("تخطي إلى المحتوى الرئيسي")).toHaveAttribute("href", "#main-content");
    expect(screen.getAllByRole("main")).toHaveLength(1);
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });

  it("keeps global reduced-motion and visible-focus rules", () => {
    const css = readFileSync(resolve("src/index.css"), "utf8");
    const app = readFileSync(resolve("src/App.tsx"), "utf8");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain(":focus-visible");
    expect(app).toContain('<MotionConfig reducedMotion="user">');
  });

  it("uses responsive, dimensioned images without preloading yacht galleries", () => {
    const sources = [
      "src/components/shared/YachtCard.tsx",
      "src/components/home/FeaturedYachts.tsx",
      "src/components/landing/VerifiedYachtSelection.tsx",
      "src/components/ui/stagger-image-carousel.tsx",
    ].map((file) => readFileSync(resolve(file), "utf8")).join("\n");
    expect(sources).toContain("width={");
    expect(sources).toContain("height={");
    expect(sources).toContain("sizes=");
    expect(sources).toContain('loading="lazy"');
    expect(sources).not.toMatch(/rel=["']preload["'][^>]+yacht/i);
  });

  it("keeps production source maps disabled", () => {
    const vite = readFileSync(resolve("vite.config.ts"), "utf8");
    const build = readFileSync(resolve("scripts/build-static.ts"), "utf8");
    expect(vite).toContain("sourcemap: false");
    expect(build.match(/sourcemap: false/g)).toHaveLength(2);
  });

  it("keeps the localized hero independent from its former origin and downgrades the shared yacht origin", () => {
    const template = readFileSync(resolve("index.html"), "utf8");
    const homepage = readFileSync(resolve("src/pages/Index.tsx"), "utf8");
    expect(template).toContain('<link rel="dns-prefetch" href="//yacht.fra1.cdn.digitaloceanspaces.com" />');
    expect(template).not.toContain('<link rel="preconnect" href="https://yacht.fra1.cdn.digitaloceanspaces.com"');
    expect(template).not.toContain('<link rel="preconnect" href="https://dubai-yacht.fra1.cdn.digitaloceanspaces.com"');
    expect(homepage).not.toContain("dubai-yacht.fra1.cdn.digitaloceanspaces.com");
  });
});
