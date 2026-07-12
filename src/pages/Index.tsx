import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedYachts from "@/components/home/FeaturedYachts";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PricesSection from "@/components/home/PricesSection";
import GallerySection from "@/components/home/GallerySection";
import RoutesSection from "@/components/home/RoutesSection";
import HomeFAQ from "@/components/home/HomeFAQ";
import CTAStrip from "@/components/home/CTAStrip";
import HomeOverviewSection from "@/components/home/HomeOverviewSection";
import SEOHead from "@/components/shared/SEOHead";
import { BRAND_NAME, BRAND_NAME_EN } from "@/lib/constants";
import { canonicalUrlForPath, requireRouteRecord } from "@/seo/route-manifest";

const route = requireRouteRecord("/");

const Index = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: BRAND_NAME,
      alternateName: [BRAND_NAME_EN],
      url: canonicalUrlForPath(route.path),
    },
  ];

  return (
    <Layout>
      <SEOHead route={route} jsonLd={jsonLd} />
      <HeroSection />
      <HomeOverviewSection />
      <FeaturedYachts />
      <ServicesSection />
      <WhyChooseUs />
      <PricesSection />
      <GallerySection />
      <RoutesSection />
      <HomeFAQ />
      <CTAStrip />
    </Layout>
  );
};

export default Index;
