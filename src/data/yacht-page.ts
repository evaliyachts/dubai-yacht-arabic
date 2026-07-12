import type { YachtRecord } from "./yachts";
import { yachtOverview } from "./fleet";
import { DOMAIN } from "@/lib/constants";
import { organizationReference } from "@/seo/entities";

const occurrences = (value: string, phrase: string) => value.split(phrase).length - 1;

export const validateYachtServiceName = (name: string) => {
  if (/تأجير\s+(?:تأجير|ايجار|إيجار)/.test(name)) throw new Error(`Duplicated rental wording in yacht schema name: ${name}`);
  const lengthPhrases = name.match(/\d+\s*قدم/g) ?? [];
  if (new Set(lengthPhrases).size !== lengthPhrases.length) throw new Error(`Repeated length phrase in yacht schema name: ${name}`);
  if ((name.match(/لل[اإ]يجار/g) ?? []).length > 1) throw new Error(`Repeated rental phrase in yacht schema name: ${name}`);
  return name;
};

export const yachtSeoTitle = (yacht: YachtRecord) => {
  const title = `${yacht.name} | السعر والسعة — يخوت دبي`;
  const lengthPhrase = `${yacht.lengthFt} قدم`;
  if (occurrences(title, lengthPhrase) !== occurrences(yacht.name, lengthPhrase)) {
    throw new Error(`Yacht title duplicates its length phrase: ${title}`);
  }
  if (occurrences(title, "للإيجار") !== occurrences(yacht.name, "للإيجار")) {
    throw new Error(`Yacht title duplicates its rental wording: ${title}`);
  }
  return title;
};

export const buildYachtJsonLd = (yacht: YachtRecord, canonical: string) => [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: validateYachtServiceName(yacht.name),
    serviceType: "تأجير يخت خاص في دبي",
    description: yachtOverview(yacht),
    url: canonical,
    provider: organizationReference(),
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
