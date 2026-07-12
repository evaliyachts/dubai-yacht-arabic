import { allLandingPages, eventPages, keywordPages } from "@/data/landingPages";
import { services } from "@/data/services";
import {
  getServiceDescriptionAr,
  getServicePathAr,
  getServiceTitleAr,
  LEGACY_SERVICE_INDEX_PATH_AR,
  SERVICE_INDEX_PATH_AR,
} from "@/data/services-ar";
import { YACHT_AR } from "@/data/yachts-ar";
import { yachts } from "@/data/yachts";
import { DOMAIN, ROUTES } from "@/lib/constants";

export type CanonicalPath = "/" | `/${string}/`;
export type IsoDate = `${number}-${number}-${number}`;

export type PageType = "home" | "keyword" | "service" | "yacht-index" | "yacht" | "support";
export type SchemaOwner = "WebSite" | "Organization" | "ContactPoint" | "Service" | "BreadcrumbList";

export interface SeoRouteRecord {
  path: CanonicalPath;
  indexable: boolean;
  pageType: PageType;
  title: string;
  description: string;
  h1: string;
  lastSignificantUpdate?: IsoDate;
  englishEquivalent?: string;
  schema: SchemaOwner[];
}

export interface RouteManifestRecord extends SeoRouteRecord {
  id: string;
  primaryIntent: string;
  redirectTo?: CanonicalPath;
}

export interface LegacyRedirect {
  from: string;
  to: CanonicalPath;
  status: 301;
}

export const toCanonicalPath = (path: string): CanonicalPath => {
  if (path === "/") return "/";
  return `${path.replace(/^\/+/, "/").replace(/\/+$/, "")}/` as CanonicalPath;
};

export const canonicalUrlForPath = (path: CanonicalPath) => `${DOMAIN}${encodeURI(path)}`;

const landingRecords: RouteManifestRecord[] = allLandingPages.map((page) => ({
  id: `landing:${page.slug}`,
  path: toCanonicalPath(page.slug),
  indexable: true,
  pageType: keywordPages.includes(page) ? "keyword" : "service",
  title: page.title,
  description: page.metaDescription,
  h1: page.h1,
  lastSignificantUpdate: page.lastSignificantUpdate,
  primaryIntent: page.h1,
  schema: ["Service", "BreadcrumbList"],
}));

const yachtRecords: RouteManifestRecord[] = yachts.map((yacht) => {
  const localized = YACHT_AR[yacht.slug];
  const name = localized?.name ?? yacht.name;
  const description = localized?.description ?? yacht.description;

  return {
    id: `yacht:${yacht.slug}`,
    path: toCanonicalPath(`/yachts/${yacht.slug}`),
    indexable: true,
    pageType: "yacht",
    title: `${name} | يخت للإيجار في دبي — يخوت دبي`,
    description: description.slice(0, 155).trim(),
    h1: name,
    primaryIntent: `تأجير ${name} في دبي`,
    schema: ["Service", "BreadcrumbList"],
  };
});

const coreRecords: RouteManifestRecord[] = [
  {
    id: "home",
    path: "/",
    indexable: true,
    pageType: "home",
    title: "يخوت دبي | تأجير يخت خاص في دبي",
    description:
      "قارن يخوتاً خاصة في دبي حسب الطول والسعة والسعر والمدة. انطلاق الرحلات من دبي مارينا وطلب الحجز عبر واتساب أو الهاتف.",
    h1: "تأجير يخت خاص في دبي مع يخوت دبي",
    primaryIntent: "اختيار وحجز يخت خاص في دبي",
    lastSignificantUpdate: "2026-07-12",
    schema: ["WebSite", "Organization", "ContactPoint"],
  },
  {
    id: "yacht-index",
    path: toCanonicalPath(ROUTES.yachts),
    indexable: true,
    pageType: "yacht-index",
    title: "أسطول اليخوت للإيجار في دبي | يخوت دبي",
    description:
      "استعرض أسطول اليخوت للإيجار في دبي — قياسية، فاخرة، وسوبر يخوت. قارن الأسعار والمواصفات واحجز يختك بسهولة.",
    h1: "أسطول يخوت دبي للإيجار",
    primaryIntent: "كتالوج يخوت دبي المتاحة للإيجار",
    schema: ["BreadcrumbList"],
  },
  {
    id: "offers",
    path: toCanonicalPath(ROUTES.offers),
    indexable: true,
    pageType: "service",
    title: "عروض وباقات تأجير اليخوت في دبي | يخوت دبي",
    description:
      "اكتشف عروض وباقات تأجير اليخوت في دبي للغروب والحفلات والمناسبات الفاخرة، مع إمكانية تخصيص الباقة حسب مناسبتك.",
    h1: "العروض والباقات",
    primaryIntent: "عروض وباقات تأجير اليخوت في دبي",
    schema: ["Service", "BreadcrumbList"],
  },
  {
    id: "service-index",
    path: toCanonicalPath(SERVICE_INDEX_PATH_AR),
    indexable: true,
    pageType: "service",
    title: "خدمات تأجير اليخوت في دبي | باقات ومناسبات وأنشطة بحرية",
    description:
      "اكتشف خدمات تأجير اليخوت في دبي: مناسبات خاصة، رحلات صيد، سباحة، شواء، جت سكي، وفعاليات على متن يخت خاص.",
    h1: "خدمات وباقات تأجير اليخوت في دبي",
    primaryIntent: "دليل خدمات وباقات وأنشطة اليخوت في دبي",
    schema: ["Service", "BreadcrumbList"],
  },
  {
    id: "about",
    path: toCanonicalPath(ROUTES.about),
    indexable: true,
    pageType: "support",
    title: "من نحن | يخوت دبي — شركة تأجير يخوت في دبي",
    description:
      "تعرّف على يخوت دبي — شركتك الموثوقة لتأجير اليخوت في دبي. قصتنا، قيمنا، والتزامنا بتقديم تجربة بحرية فاخرة.",
    h1: "من نحن",
    primaryIntent: "التعريف بعلامة يخوت دبي",
    schema: ["Organization", "BreadcrumbList"],
  },
  {
    id: "faq",
    path: toCanonicalPath(ROUTES.faq),
    indexable: true,
    pageType: "support",
    title: "الأسئلة الشائعة | تأجير يخت في دبي — يخوت دبي",
    description:
      "الأسئلة الشائعة حول تأجير اليخوت في دبي — الأسعار، الحجز، الإلغاء، الإضافات، وكل ما تريد معرفته.",
    h1: "الأسئلة الشائعة",
    primaryIntent: "أسئلة وأجوبة تأجير اليخوت في دبي",
    schema: ["BreadcrumbList"],
  },
  {
    id: "contact",
    path: toCanonicalPath(ROUTES.contact),
    indexable: true,
    pageType: "support",
    title: "احجز يختك في دبي | تواصل عبر واتساب — يخوت دبي",
    description:
      "احجز يختك في دبي بسرعة عبر واتساب أو الاتصال المباشر. نموذج استفسار مع تفاصيل المناسبة، اليخت، التاريخ، وعدد الضيوف.",
    h1: "احجز يختك في دبي",
    primaryIntent: "التواصل وحجز يخت في دبي",
    schema: ["Organization", "ContactPoint", "BreadcrumbList"],
  },
  {
    id: "terms",
    path: toCanonicalPath(ROUTES.terms),
    indexable: true,
    pageType: "support",
    title: "Terms & Conditions | Dubai Yatch",
    description: "Terms and conditions for yacht rental services provided by Dubai Yatch.",
    h1: "Terms & Conditions",
    primaryIntent: "شروط وأحكام حجز اليخوت",
    schema: ["BreadcrumbList"],
  },
  {
    id: "privacy",
    path: toCanonicalPath(ROUTES.privacy),
    indexable: true,
    pageType: "support",
    title: "Privacy Policy | Dubai Yatch",
    description: "Privacy policy for Dubai Yatch yacht rental services.",
    h1: "Privacy Policy",
    primaryIntent: "سياسة خصوصية بيانات حجز اليخوت",
    schema: ["BreadcrumbList"],
  },
];

const serviceRedirectTargets: Record<string, CanonicalPath> = {
  "banana-boat-ride": toCanonicalPath(ROUTES.waterSports),
  swimming: toCanonicalPath(ROUTES.swimming),
  "barbecue-on-the-yacht": toCanonicalPath(ROUTES.bbq),
  fishing: toCanonicalPath(ROUTES.fishing),
  "birthday-party": toCanonicalPath(ROUTES.birthday),
  "graduation-parties": toCanonicalPath(ROUTES.graduation),
  "wedding-anniversary-parties": toCanonicalPath(ROUTES.anniversary),
  "bachelor-parties": toCanonicalPath(ROUTES.bachelor),
  "marriage-proposal-party": toCanonicalPath(ROUTES.proposal),
  "gender-reveal-party": toCanonicalPath(ROUTES.genderReveal),
  "engagement-and-wedding-parties": toCanonicalPath(ROUTES.events),
  "food-menu": toCanonicalPath(ROUTES.prices),
  "donut-ride": toCanonicalPath(ROUTES.waterSports),
  "jet-ski": toCanonicalPath(ROUTES.jetSki),
  "afternoon-tea-trip": toCanonicalPath(ROUTES.afternoonTea),
  "morning-yacht-trips": toCanonicalPath(ROUTES.morning),
  "engagement-parties": toCanonicalPath(ROUTES.engagement),
  "wedding-parties": toCanonicalPath(ROUTES.wedding),
};

const nonIndexableServiceRecords: RouteManifestRecord[] = services.map((service) => {
  const title = getServiceTitleAr(service.slug, service.title);
  const redirectTo = serviceRedirectTargets[service.slug];
  if (!redirectTo) throw new Error(`Missing canonical destination for service route: ${service.slug}`);

  return {
    id: `legacy-service:${service.slug}`,
    path: toCanonicalPath(getServicePathAr(service.slug)),
    indexable: false,
    pageType: "service",
    title: `${title} | خدمات تأجير اليخوت في دبي`,
    description: getServiceDescriptionAr(service.slug, service.description).slice(0, 155).trim(),
    h1: title,
    primaryIntent: `مسار خدمة قديم: ${title}`,
    schema: [],
    redirectTo,
  };
});

export const ROUTE_MANIFEST: RouteManifestRecord[] = [
  ...coreRecords,
  ...landingRecords,
  ...yachtRecords,
  ...nonIndexableServiceRecords,
];

export const INDEXABLE_ROUTE_RECORDS = ROUTE_MANIFEST.filter((record) => record.indexable);
export const NON_INDEXABLE_ROUTE_RECORDS = ROUTE_MANIFEST.filter((record) => !record.indexable);
export const STATIC_ROUTE_RECORDS = ROUTE_MANIFEST.filter((record) => !record.redirectTo);

const routeByPath = new Map(ROUTE_MANIFEST.map((record) => [record.path, record]));

export const getRouteRecord = (path: string) => routeByPath.get(toCanonicalPath(path));

export const requireRouteRecord = (path: string) => {
  const record = getRouteRecord(path);
  if (!record) throw new Error(`Route is not owned by the SEO manifest: ${path}`);
  return record;
};

export const getRouteRedirectTarget = (path: string) => getRouteRecord(path)?.redirectTo;

const redirectVariants = (from: string, to: CanonicalPath): LegacyRedirect[] => {
  const withoutSlash = from === "/" ? "/" : from.replace(/\/+$/, "");
  const withSlash = toCanonicalPath(withoutSlash);
  return [
    { from: withoutSlash, to, status: 301 },
    { from: withSlash, to, status: 301 },
  ];
};

export const LEGACY_REDIRECTS: LegacyRedirect[] = [
  ...redirectVariants("/offers", toCanonicalPath(ROUTES.offers)),
  ...redirectVariants("/faq", toCanonicalPath(ROUTES.faq)),
  ...redirectVariants("/services", toCanonicalPath(SERVICE_INDEX_PATH_AR)),
  ...redirectVariants(LEGACY_SERVICE_INDEX_PATH_AR, toCanonicalPath(SERVICE_INDEX_PATH_AR)),
  ...services.flatMap((service) => {
    const target = serviceRedirectTargets[service.slug];
    return [
      ...redirectVariants(`/services/${service.slug}`, target),
      ...redirectVariants(`${LEGACY_SERVICE_INDEX_PATH_AR}/${service.slug}`, target),
      ...redirectVariants(getServicePathAr(service.slug), target),
    ];
  }),
];

export const CLIENT_REDIRECTS = [
  ...new Map(
    LEGACY_REDIRECTS.map((redirect) => {
      const from = toCanonicalPath(redirect.from);
      return [from, { from, to: redirect.to }] as const;
    }),
  ).values(),
];

const navigationPaths = [
  ROUTES.home,
  ROUTES.yachts,
  ROUTES.offers,
  ROUTES.services,
  ROUTES.events,
  ROUTES.about,
  ROUTES.faq,
  ROUTES.contact,
];
const navigationLabels = ["الرئيسية", "اليخوت", "العروض", "الخدمات", "المناسبات", "من نحن", "الأسئلة الشائعة", "اتصل بنا"];

export const NAVIGATION_TARGETS = navigationPaths.map((path, index) => ({
  label: navigationLabels[index],
  route: requireRouteRecord(path),
}));

export const SITEMAP_SECTION_TARGETS = {
  main: [ROUTES.home, ROUTES.yachts, ROUTES.about, ROUTES.faq, ROUTES.contact, ROUTES.terms, ROUTES.privacy].map(
    requireRouteRecord,
  ),
  keywords: keywordPages.map((page) => requireRouteRecord(page.slug)),
  events: eventPages.map((page) => requireRouteRecord(page.slug)),
  yachts: yachtRecords,
};

export interface RouteQaExpectation {
  path: CanonicalPath;
  expectedStatus: 200 | 301;
  indexable: boolean;
  canonical?: string;
  title?: string;
  description?: string;
  h1?: string;
  schema: SchemaOwner[];
  redirectTo?: CanonicalPath;
}

export const QA_EXPECTATIONS: RouteQaExpectation[] = ROUTE_MANIFEST.map((record) =>
  record.redirectTo
    ? {
        path: record.path,
        expectedStatus: 301,
        indexable: false,
        schema: [],
        redirectTo: record.redirectTo,
      }
    : {
        path: record.path,
        expectedStatus: 200,
        indexable: record.indexable,
        canonical: canonicalUrlForPath(record.path),
        title: record.title,
        description: record.description,
        h1: record.h1,
        schema: record.schema,
      },
);

const duplicateValues = (records: RouteManifestRecord[], field: "title" | "description" | "h1" | "primaryIntent") => {
  const seen = new Map<string, CanonicalPath>();
  const duplicates: string[] = [];
  for (const record of records) {
    const value = record[field].replace(/\s+/g, " ").trim().toLocaleLowerCase("ar");
    const existing = seen.get(value);
    if (existing) duplicates.push(`${field} is shared by ${existing} and ${record.path}`);
    else seen.set(value, record.path);
  }
  return duplicates;
};

const isRealIsoDate = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
};

export const validateRouteManifest = (
  records: RouteManifestRecord[] = ROUTE_MANIFEST,
  redirects: LegacyRedirect[] = LEGACY_REDIRECTS,
) => {
  const failures: string[] = [];
  const paths = new Set<CanonicalPath>();
  const canonicalUrls = new Set<string>();

  for (const record of records) {
    if (paths.has(record.path)) failures.push(`duplicate path: ${record.path}`);
    paths.add(record.path);

    if (record.path !== "/" && !record.path.endsWith("/")) failures.push(`missing trailing slash: ${record.path}`);
    if (!record.title.trim()) failures.push(`missing title: ${record.path}`);
    if (!record.description.trim()) failures.push(`missing description: ${record.path}`);
    if (!record.h1.trim()) failures.push(`missing H1: ${record.path}`);
    if (!record.primaryIntent.trim()) failures.push(`missing primary intent: ${record.path}`);
    if (record.indexable && record.redirectTo) failures.push(`indexable route redirects: ${record.path}`);
    if (record.lastSignificantUpdate && !isRealIsoDate(record.lastSignificantUpdate)) {
      failures.push(`invalid lastSignificantUpdate: ${record.path}`);
    }
    if (record.englishEquivalent) {
      try {
        const englishUrl = new URL(record.englishEquivalent);
        if (englishUrl.protocol !== "https:" || englishUrl.hostname !== "yachtrentaldxb.com") {
          failures.push(`invalid English equivalent: ${record.path}`);
        }
      } catch {
        failures.push(`invalid English equivalent: ${record.path}`);
      }
    }

    const serialized = JSON.stringify(record);
    if (serialized.includes("yacht-dxb.netlify.app")) failures.push(`preview hostname in route record: ${record.path}`);

    if (record.indexable) {
      const canonical = canonicalUrlForPath(record.path);
      if (canonicalUrls.has(canonical)) failures.push(`duplicate canonical: ${canonical}`);
      canonicalUrls.add(canonical);
    }
  }

  const indexable = records.filter((record) => record.indexable);
  for (const field of ["title", "description", "h1", "primaryIntent"] as const) {
    failures.push(...duplicateValues(indexable, field));
  }

  const redirectSources = new Set<string>();
  const indexablePaths = new Set(indexable.map((record) => record.path));
  for (const redirect of redirects) {
    if (redirectSources.has(redirect.from)) failures.push(`duplicate redirect source: ${redirect.from}`);
    redirectSources.add(redirect.from);
    if (redirect.status !== 301) failures.push(`non-permanent redirect: ${redirect.from}`);
    if (redirect.from.includes("*")) failures.push(`wildcard redirect is not allowed: ${redirect.from}`);
    if (!indexablePaths.has(redirect.to)) failures.push(`redirect target is not indexable: ${redirect.to}`);
    if (toCanonicalPath(redirect.from) === redirect.to) failures.push(`self redirect: ${redirect.from}`);
  }

  return failures;
};

export const assertValidRouteManifest = () => {
  const failures = validateRouteManifest();
  if (failures.length > 0) throw new Error(`Route manifest validation failed:\n- ${failures.join("\n- ")}`);
};
