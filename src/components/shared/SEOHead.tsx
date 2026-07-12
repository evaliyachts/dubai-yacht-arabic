import { Helmet } from "react-helmet-async";
import { BRAND_NAME } from "@/lib/constants";
import { canonicalUrlForPath, type RouteManifestRecord, type SchemaOwner } from "@/seo/route-manifest";
import { normalizeSocialImage, type SocialImageMetadata } from "@/seo/social-image";

interface SEOHeadProps {
  route: RouteManifestRecord;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  image?: string | SocialImageMetadata;
}

const SEOHead = ({ route, jsonLd, image }: SEOHeadProps) => {
  const url = canonicalUrlForPath(route.path);
  const socialImage = normalizeSocialImage(image);
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
      {socialImage && <meta property="og:image" content={socialImage.url} />}
      {socialImage?.alt && <meta property="og:image:alt" content={socialImage.alt} />}
      {socialImage?.width && <meta property="og:image:width" content={socialImage.width.toString()} />}
      {socialImage?.height && <meta property="og:image:height" content={socialImage.height.toString()} />}
      <meta name="twitter:card" content={socialImage ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={route.title} />
      <meta name="twitter:description" content={route.description} />
      {socialImage && <meta name="twitter:image" content={socialImage.url} />}
      {socialImage?.alt && <meta name="twitter:image:alt" content={socialImage.alt} />}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
