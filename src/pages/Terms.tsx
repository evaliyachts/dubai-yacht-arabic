import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import LegalDocument from "@/components/shared/LegalDocument";
import { breadcrumbEntity } from "@/seo/entities";
import { requireRouteRecord } from "@/seo/route-manifest";
import { approvedTermsContent } from "@/data/legal-pages";

const route = requireRouteRecord("/terms/");

const Terms = () => (
  <Layout>
    <SEOHead route={route} jsonLd={breadcrumbEntity(route)} />
    <LegalDocument content={approvedTermsContent} h1={route.h1} />
  </Layout>
);

export default Terms;
