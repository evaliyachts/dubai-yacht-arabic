import { BRAND_NAME, BRAND_NAME_EN, DOMAIN, PHONE_NUMBER } from "@/lib/constants";
import type { RouteManifestRecord } from "@/seo/route-manifest";

export const WEBSITE_ID = `${DOMAIN}/#website`;
export const ORGANIZATION_ID = `${DOMAIN}/#organization`;
export const CONTACT_POINT_ID = `${DOMAIN}/#contact-point`;
export const ORGANIZATION_LOGO_URL = `${DOMAIN}/favicon.png`;

export const websiteEntity = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: BRAND_NAME,
  alternateName: [BRAND_NAME_EN],
  url: `${DOMAIN}/`,
  publisher: { "@id": ORGANIZATION_ID },
});

export const organizationEntity = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: BRAND_NAME,
  alternateName: BRAND_NAME_EN,
  url: `${DOMAIN}/`,
  telephone: PHONE_NUMBER,
  logo: {
    "@type": "ImageObject",
    url: ORGANIZATION_LOGO_URL,
    width: 181,
    height: 181,
  },
  contactPoint: { "@id": CONTACT_POINT_ID },
});

export const contactPointEntity = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPoint",
  "@id": CONTACT_POINT_ID,
  telephone: PHONE_NUMBER,
  contactType: "reservations",
});

export const organizationReference = () => ({ "@id": ORGANIZATION_ID });

export const breadcrumbEntity = (route: RouteManifestRecord, parents: Array<{ name: string; url: string }> = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "الرئيسية", item: `${DOMAIN}/` },
    ...parents.map((parent, index) => ({ "@type": "ListItem", position: index + 2, name: parent.name, item: parent.url })),
    { "@type": "ListItem", position: parents.length + 2, name: route.h1, item: `${DOMAIN}${encodeURI(route.path)}` },
  ],
});
