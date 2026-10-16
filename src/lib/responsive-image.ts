import type { YachtMediaRecord } from "@/data/yachts";

const APPROVED_YACHT_IMAGE_HOST = "yacht.fra1.cdn.digitaloceanspaces.com";
export const DEFAULT_WIDTHS = [320, 480, 640, 768, 960, 1280, 1600] as const;
export type ImageCdnProvider = "netlify" | "vercel";
const imageCdnProvider: ImageCdnProvider = import.meta.env?.VITE_IMAGE_CDN === "vercel" ? "vercel" : "netlify";

export const isApprovedResponsiveImageSource = (source: string) => {
  try {
    const url = new URL(source);
    return url.protocol === "https:" && url.hostname === APPROVED_YACHT_IMAGE_HOST;
  } catch {
    return false;
  }
};

export const netlifyImageUrl = (source: string, width: number, origin = "") => {
  if (!isApprovedResponsiveImageSource(source)) {
    throw new Error(`Responsive image source is not allowlisted: ${source}`);
  }
  if (!Number.isInteger(width) || width <= 0) throw new Error(`Invalid responsive image width: ${width}`);
  return `${origin}/.netlify/images?url=${encodeURIComponent(source)}&w=${width}&fm=webp&q=75`;
};

export const responsiveImageUrl = (
  source: string,
  width: number,
  origin = "",
  provider: ImageCdnProvider = imageCdnProvider,
) => {
  // Reuse the same source and width validation on both hosting platforms.
  const netlifyUrl = netlifyImageUrl(source, width, origin);
  return provider === "vercel"
    ? `${origin}/_vercel/image?url=${encodeURIComponent(source)}&w=${width}&q=75`
    : netlifyUrl;
};

export const responsiveImageSrcSet = (
  source: string,
  intrinsicWidth: number,
  widths: readonly number[] = DEFAULT_WIDTHS,
) => {
  if (!isApprovedResponsiveImageSource(source) || !Number.isInteger(intrinsicWidth) || intrinsicWidth <= 0) {
    return undefined;
  }

  const cappedIntrinsicWidth = Math.min(intrinsicWidth, DEFAULT_WIDTHS[DEFAULT_WIDTHS.length - 1]);
  const candidates = [...new Set([
    ...widths.filter((width) => Number.isInteger(width) && width > 0 && width < cappedIntrinsicWidth),
    cappedIntrinsicWidth,
  ])].sort((a, b) => a - b);

  return candidates.map((width) => `${responsiveImageUrl(source, width)} ${width}w`).join(", ");
};

export const responsiveYachtMediaSrcSet = (media: YachtMediaRecord, widths?: readonly number[]) =>
  responsiveImageSrcSet(media.path, media.width, widths);
