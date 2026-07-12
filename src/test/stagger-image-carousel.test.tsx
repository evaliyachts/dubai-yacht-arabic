import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { StaggerImageCarousel } from "@/components/ui/stagger-image-carousel";
import type { YachtMediaRecord } from "@/data/yachts";

const media = (index: number): YachtMediaRecord => ({
  type: "image",
  path: `https://images.example.com/yacht-${index}.webp`,
  altAr: `اليخت التجريبي — صورة ${index}`,
  width: 1200,
  height: 800,
  rightsRecordId: "media-test",
  featured: index === 1,
  priority: index - 1,
});

const renderCarousel = (images = [media(1), media(2), media(3)]) =>
  render(
    <StaggerImageCarousel
      images={images}
      altPrefix="اليخت التجريبي"
      fallbackSrc="/media/yacht-placeholder.svg"
    />,
  );

describe("existing stagger image carousel", () => {
  it("keeps the Arabic controls, centered primary image, and responsive staggered cards", () => {
    renderCarousel();

    expect(screen.getByRole("button", { name: "الصورة السابقة" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "الصورة التالية" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /فتح اليخت التجريبي — صورة 1/ })).toHaveAttribute("aria-current", "true");
    expect(screen.getByAltText("اليخت التجريبي — صورة 1")).toHaveAttribute("loading", "eager");
    expect(screen.getByAltText("اليخت التجريبي — صورة 1")).toHaveAttribute("fetchpriority", "high");
    expect(screen.getByAltText("اليخت التجريبي — صورة 2")).toHaveAttribute("loading", "lazy");
    expect(screen.getByRole("button", { name: /فتح اليخت التجريبي — صورة 1/ })).toHaveClass("motion-reduce:transition-none");
  });

  it("moves with previous/next controls and brings a selected side image to the center", async () => {
    renderCarousel();
    fireEvent.click(screen.getByRole("button", { name: "الصورة التالية" }));
    await waitFor(() => expect(screen.getByRole("button", { name: /فتح اليخت التجريبي — صورة 2/ })).toHaveAttribute("aria-current", "true"));

    fireEvent.click(screen.getByRole("button", { name: /اختيار اليخت التجريبي — صورة 3/ }));
    await waitFor(() => expect(screen.getByRole("button", { name: /فتح اليخت التجريبي — صورة 3/ })).toHaveAttribute("aria-current", "true"));

    fireEvent.click(screen.getByRole("button", { name: "الصورة السابقة" }));
    await waitFor(() => expect(screen.getByRole("button", { name: /فتح اليخت التجريبي — صورة 2/ })).toHaveAttribute("aria-current", "true"));
  });

  it("opens the centered image in the Arabic fullscreen dialog", async () => {
    renderCarousel();
    fireEvent.click(screen.getByRole("button", { name: /فتح اليخت التجريبي — صورة 1/ }));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "عرض صورة اليخت التجريبي بالحجم الكامل" })).toBeInTheDocument();
    expect(screen.getAllByAltText("اليخت التجريبي — صورة 1").at(-1)).toHaveClass("object-contain");
  });

  it("supports Arrow keys plus Enter and Space activation", async () => {
    renderCarousel();
    const gallery = screen.getByLabelText("معرض صور اليخت التجريبي");
    fireEvent.keyDown(gallery, { key: "ArrowRight" });
    await waitFor(() => expect(screen.getByRole("button", { name: /فتح اليخت التجريبي — صورة 2/ })).toBeInTheDocument());

    fireEvent.keyDown(screen.getByRole("button", { name: /اختيار اليخت التجريبي — صورة 3/ }), { key: " " });
    await waitFor(() => expect(screen.getByRole("button", { name: /فتح اليخت التجريبي — صورة 3/ })).toBeInTheDocument());
    fireEvent.keyDown(screen.getByRole("button", { name: /فتح اليخت التجريبي — صورة 3/ }), { key: "Enter" });
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("removes failed real images and falls back only after none remain", async () => {
    renderCarousel([media(1), media(2)]);
    fireEvent.error(screen.getByAltText("اليخت التجريبي — صورة 1"));
    await waitFor(() => expect(screen.queryByAltText("اليخت التجريبي — صورة 1")).not.toBeInTheDocument());
    expect(screen.getByAltText("اليخت التجريبي — صورة 2")).toBeInTheDocument();

    fireEvent.error(screen.getByAltText("اليخت التجريبي — صورة 2"));
    expect(await screen.findByAltText("صورة بديلة محايدة لـ اليخت التجريبي")).toHaveAttribute(
      "src",
      "/media/yacht-placeholder.svg",
    );
    expect(screen.queryByRole("button", { name: "الصورة التالية" })).not.toBeInTheDocument();
  });
});

describe("carousel integration boundaries", () => {
  it("reconnects YachtDetails to the existing component without a replacement gallery", () => {
    const detailsSource = readFileSync(resolve("src/pages/YachtDetails.tsx"), "utf8");
    const carouselSource = readFileSync(resolve("src/components/ui/stagger-image-carousel.tsx"), "utf8");
    const packageJson = JSON.parse(readFileSync(resolve("package.json"), "utf8")) as { dependencies: Record<string, string> };

    expect(detailsSource).toContain('import { StaggerImageCarousel } from "@/components/ui/stagger-image-carousel"');
    expect(detailsSource).toContain("<StaggerImageCarousel");
    expect(detailsSource).toContain("images={yacht.media}");
    expect(existsSync(resolve("src/components/ui/stagger-image-carousel.tsx"))).toBe(true);
    expect(carouselSource).toContain("translateX(");
    expect(carouselSource).toContain("rotate(");
    expect(carouselSource).toContain("<Dialog");
    expect(carouselSource).toContain("object-contain");
    expect(carouselSource).not.toMatch(/setInterval|setTimeout/);

    const componentFiles = (directory: string): string[] => readdirSync(directory).flatMap((entry) => {
      const path = resolve(directory, entry);
      return statSync(path).isDirectory() ? componentFiles(path) : [path];
    });
    expect(componentFiles(resolve("src/components")).filter((path) => /YachtGallery/i.test(path))).toEqual([]);
    for (const dependency of ["swiper", "slick-carousel", "react-slick", "keen-slider"]) {
      expect(packageJson.dependencies).not.toHaveProperty(dependency);
    }
  });

  it("uses only each yacht's primary media record on card surfaces", () => {
    for (const file of [
      "src/components/shared/YachtCard.tsx",
      "src/components/home/FeaturedYachts.tsx",
      "src/components/home/GallerySection.tsx",
      "src/components/landing/VerifiedYachtSelection.tsx",
    ]) {
      const source = readFileSync(resolve(file), "utf8");
      expect(source).toMatch(/media\[0\]/);
      expect(source).not.toContain("StaggerImageCarousel");
    }
  });
});
