import { eventPages } from "../src/data/eventPages";
import { yachts, type YachtMediaRecord } from "../src/data/yachts";
import { ROUTES } from "../src/lib/constants";
import { isApprovedResponsiveImageSource, netlifyImageUrl } from "../src/lib/responsive-image";

const baseArgument = process.argv.find((argument) => argument.startsWith("--base="))?.slice("--base=".length);
const mode = process.argv.find((argument) => argument.startsWith("--mode="))?.slice("--mode=".length) ?? "original";

if (!baseArgument) throw new Error("Usage: npm run images:measure -- --base=https://deploy.example --mode=original|responsive");
if (mode !== "original" && mode !== "responsive") throw new Error(`Unknown measurement mode: ${mode}`);

const base = new URL(baseArgument).origin;
const homepageFeaturedSlugs = [
  "يخت-42-قدم-ازيموت-للايجار",
  "رحلة-يخت-50-قدم-رويال-ماجستي",
  "رحلة-يخت-56-قدم-ماجستي",
  "يخت-64-قدم-ازيموت-إيطالي",
  "ايجار-يخت-ماجستي-88-قدم-جاكوزي",
  "اوشن-دريم-يخت-143-قدم-للايجار",
];

const requireYacht = (slug: string) => {
  const yacht = yachts.find((candidate) => candidate.slug === slug);
  if (!yacht) throw new Error(`Unknown measurement yacht: ${slug}`);
  return yacht;
};

const birthday = eventPages.find((page) => page.slug === ROUTES.birthday);
if (!birthday) throw new Error("Birthday event page is missing");
const royalMajesty = yachts.find((yacht) => yacht.id === "yacht-03");
if (!royalMajesty) throw new Error("Royal Majesty record is missing");

const surfaces: Record<string, YachtMediaRecord[]> = {
  homepageFeatured: homepageFeaturedSlugs.map((slug) => requireYacht(slug).media[0]),
  yachtCatalogue: yachts.map((yacht) => yacht.media[0]),
  royalMajestyCarousel: royalMajesty.media,
  birthdayEventSelection: birthday.featuredYachtSlugs.map((slug) => requireYacht(slug).media[0]),
};

const measuredUrl = (media: YachtMediaRecord) => {
  if (mode === "responsive" && isApprovedResponsiveImageSource(media.path)) {
    return netlifyImageUrl(media.path, Math.min(media.width, 640), base);
  }
  return media.path.startsWith("/") ? new URL(media.path, base).href : media.path;
};

const transferredBytes = async (url: string) => {
  const response = await fetch(url, { headers: { Accept: "image/avif,image/webp,image/*,*/*;q=0.8" } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("image/")) throw new Error(`Unsupported content type ${contentType}: ${url}`);
  return (await response.arrayBuffer()).byteLength;
};

const report: Record<string, { images: number; transferredBytes: number }> = {};
for (const [surface, mediaRecords] of Object.entries(surfaces)) {
  const urls = [...new Set(mediaRecords.map(measuredUrl))];
  let total = 0;
  for (const url of urls) total += await transferredBytes(url);
  report[surface] = { images: urls.length, transferredBytes: total };
}

console.log(JSON.stringify({ mode, base, mobileCandidateWidth: 640, surfaces: report }, null, 2));
