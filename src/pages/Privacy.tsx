import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import LegalDocument from "@/components/shared/LegalDocument";
import { breadcrumbEntity } from "@/seo/entities";
import { requireRouteRecord } from "@/seo/route-manifest";
import { approvedPrivacyContent } from "@/data/legal-pages";

const route = requireRouteRecord("/privacy/");

const Privacy = () => (
  <Layout>
    <SEOHead route={route} jsonLd={breadcrumbEntity(route)} />
    <LegalDocument content={approvedPrivacyContent} h1={route.h1} />
  </Layout>
);

export default Privacy;
