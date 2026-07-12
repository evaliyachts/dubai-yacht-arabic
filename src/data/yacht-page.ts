import type { YachtRecord } from "./yachts";
import { yachtOverview } from "./fleet";
import { BRAND_NAME, DOMAIN } from "@/lib/constants";

export const buildYachtJsonLd = (yacht: YachtRecord, canonical: string) => [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `تأجير ${yacht.name} في دبي`,
    description: yachtOverview(yacht),
    url: canonical,
    provider: { "@type": "Organization", name: BRAND_NAME, url: `${DOMAIN}/`, telephone: "+971504641020" },
    areaServed: { "@type": "City", name: "Dubai" },
    offers: {
      "@type": "Offer",
      url: canonical,
      price: yacht.pricePerHour,
      priceCurrency: "AED",
      priceSpecification: { "@type": "UnitPriceSpecification", price: yacht.pricePerHour, priceCurrency: "AED", unitText: "HOUR" },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${DOMAIN}/` },
      { "@type": "ListItem", position: 2, name: "اليخوت", item: `${DOMAIN}/yachts/` },
      { "@type": "ListItem", position: 3, name: yacht.name, item: canonical },
    ],
  },
];
