import { allLandingPages } from "@/data/landingPages";
import { services } from "@/data/services";
import {
  getServicePathAr,
  LEGACY_SERVICE_INDEX_PATH_AR,
  SERVICE_INDEX_PATH_AR,
} from "@/data/services-ar";
import { yachts } from "@/data/yachts";
import { ROUTES } from "@/lib/constants";

export interface LegacyRedirect {
  from: string;
  to: string;
  status: 301;
}

export const toCanonicalPath = (path: string) => {
  if (path === "/") return "/";
  return `${path.replace(/\/+$/, "")}/`;
};

const currentPagePaths = [
  ROUTES.home,
  ROUTES.yachts,
  ROUTES.offers,
  SERVICE_INDEX_PATH_AR,
  ROUTES.about,
  ROUTES.faq,
  ROUTES.contact,
  ROUTES.terms,
  ROUTES.privacy,
  ...allLandingPages.map((page) => page.slug),
  ...yachts.map((yacht) => `/yachts/${yacht.slug}`),
  ...services.map((service) => getServicePathAr(service.slug)),
];

export const PRERENDER_ROUTES = [...new Set(currentPagePaths.map(toCanonicalPath))];

const redirectVariants = (from: string, to: string): LegacyRedirect[] => {
  const withoutSlash = from === "/" ? "/" : from.replace(/\/+$/, "");
  const withSlash = toCanonicalPath(withoutSlash);
  const target = toCanonicalPath(to);
  return [
    { from: withoutSlash, to: target, status: 301 },
    { from: withSlash, to: target, status: 301 },
  ];
};

export const LEGACY_REDIRECTS: LegacyRedirect[] = [
  ...redirectVariants("/offers", ROUTES.offers),
  ...redirectVariants("/faq", ROUTES.faq),
  ...redirectVariants("/services", SERVICE_INDEX_PATH_AR),
  ...redirectVariants(LEGACY_SERVICE_INDEX_PATH_AR, SERVICE_INDEX_PATH_AR),
  ...services.flatMap((service) => {
    const target = getServicePathAr(service.slug);
    return [
      ...redirectVariants(`/services/${service.slug}`, target),
      ...redirectVariants(`${LEGACY_SERVICE_INDEX_PATH_AR}/${service.slug}`, target),
      ...redirectVariants(`${SERVICE_INDEX_PATH_AR}/${service.slug}`, target),
    ];
  }),
];
