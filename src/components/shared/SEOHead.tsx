import { Helmet } from "react-helmet-async";
import { BRAND_NAME } from "@/lib/constants";
import { canonicalUrlForPath, type RouteManifestRecord, type SchemaOwner } from "@/seo/route-manifest";

interface SEOHeadProps {
  route: RouteManifestRecord;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  image?: string;
}

const SEOHead = ({ route, jsonLd, image }: SEOHeadProps) => {
  const url = canonicalUrlForPath(route.path);
  const schemaInputs = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  const schemas = schemaInputs.filter((schema) => {
    const type = schema["@type"];
    return typeof type === "string" && route.schema.includes(type as SchemaOwner);
  });

  return (
    <Helmet>
      <html lang="ar-AE" dir="rtl" />
      <title>{route.title}</title>
      <meta name="description" content={route.description} />
      <meta name="robots" content={route.indexable ? "index, follow" : "noindex, follow"} />
      <link rel="canonical" href={url} />
      <meta property="og:locale" content="ar_AE" />
      <meta property="og:title" content={route.title} />
      <meta property="og:description" content={route.description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={BRAND_NAME} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={route.title} />
      <meta name="twitter:description" content={route.description} />
      {image && <meta name="twitter:image" content={image} />}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
