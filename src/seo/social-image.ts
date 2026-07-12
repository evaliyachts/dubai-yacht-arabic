import type { YachtMediaRecord } from "@/data/yachts";
import { DOMAIN } from "@/lib/constants";

export const NEUTRAL_PLACEHOLDER_RIGHTS_ID = "media-neutral-placeholder-001";

export interface SocialImageMetadata {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export const validateSocialImageUrl = (value: string) => {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`Open Graph image URL must be absolute: ${value}`);
  }
  if (url.protocol !== "https:") throw new Error(`Open Graph image URL must use HTTPS: ${value}`);
  return url.toString();
};

export const absoluteSocialImageUrl = (path: string) => {
  if (path.startsWith("/")) return validateSocialImageUrl(`${DOMAIN}${encodeURI(path)}`);
  return validateSocialImageUrl(path);
};

export const normalizeSocialImage = (image?: string | SocialImageMetadata): SocialImageMetadata | undefined => {
  if (!image) return undefined;
  if (typeof image === "string") return { url: validateSocialImageUrl(image) };
  return { ...image, url: validateSocialImageUrl(image.url) };
};

export const socialImageForYachtMedia = (media: YachtMediaRecord): SocialImageMetadata | undefined => {
  if (media.rightsRecordId === NEUTRAL_PLACEHOLDER_RIGHTS_ID) return undefined;
  return {
    url: absoluteSocialImageUrl(media.path),
    alt: media.altAr,
    width: media.width,
    height: media.height,
  };
};
