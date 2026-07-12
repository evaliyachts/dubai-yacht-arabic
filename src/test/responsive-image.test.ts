import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { yachts } from "@/data/yachts";
import {
  isApprovedResponsiveImageSource,
  netlifyImageUrl,
  responsiveImageSrcSet,
  responsiveYachtMediaSrcSet,
} from "@/lib/responsive-image";

describe("allowlisted responsive yacht images", () => {
  const authorized = yachts.find((yacht) => yacht.id === "yacht-03")!.media[0];

  it("generates deterministic Netlify candidates while retaining the authorized source contract", () => {
    const srcSet = responsiveYachtMediaSrcSet(authorized)!;
    expect(srcSet).toContain("/.netlify/images?url=");
    expect(srcSet).toContain(" 320w");
    expect(srcSet).toContain(` ${authorized.width}w`);
    expect(srcSet).not.toContain(" 1280w");
    expect(netlifyImageUrl(authorized.path, 640)).toContain(`url=${encodeURIComponent(authorized.path)}&w=640&fm=webp&q=75`);
  });

  it("rejects arbitrary remote hosts and leaves local fallbacks without srcset", () => {
    expect(isApprovedResponsiveImageSource("https://images.example.com/yacht.webp")).toBe(false);
    expect(isApprovedResponsiveImageSource("https://yacht.fra1.cdn.digitaloceanspaces.com.evil.test/yacht.webp")).toBe(false);
    expect(() => netlifyImageUrl("https://images.example.com/yacht.webp", 640)).toThrow(/not allowlisted/);
    expect(responsiveImageSrcSet("/media/yacht-placeholder.svg", 1200)).toBeUndefined();
  });

  it("configures only the approved yacht origin and keeps originals as img src fallbacks", () => {
    const netlify = readFileSync(resolve("netlify.toml"), "utf8");
    expect(netlify).toContain('remote_images = ["https://yacht\\\\.fra1\\\\.cdn\\\\.digitaloceanspaces\\\\.com/.*"]');
    for (const file of [
      "src/components/shared/YachtCard.tsx",
      "src/components/home/FeaturedYachts.tsx",
      "src/components/landing/VerifiedYachtSelection.tsx",
      "src/components/ui/stagger-image-carousel.tsx",
    ]) {
      const source = readFileSync(resolve(file), "utf8");
      expect(source).toContain("src={");
      expect(source).toContain("srcSet={");
    }
  });
});
