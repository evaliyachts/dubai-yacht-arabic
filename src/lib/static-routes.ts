export {
  LEGACY_REDIRECTS,
  STATIC_ROUTE_RECORDS,
  toCanonicalPath,
  type LegacyRedirect,
} from "@/seo/route-manifest";

import { STATIC_ROUTE_RECORDS } from "@/seo/route-manifest";

export const PRERENDER_ROUTES = STATIC_ROUTE_RECORDS.map((record) => record.path);
