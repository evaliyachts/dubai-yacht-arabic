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
import { requireRouteRecord } from "@/seo/route-manifest";
import { contactPointEntity, organizationEntity, websiteEntity } from "@/seo/entities";
import { Helmet } from "react-helmet-async";

const route = requireRouteRecord("/");

const Index = () => {
  const jsonLd = [websiteEntity(), organizationEntity(), contactPointEntity()];

  return (
    <Layout>
      <SEOHead route={route} jsonLd={jsonLd} />
      <Helmet>
        <link rel="preconnect" href="https://dubai-yacht.fra1.cdn.digitaloceanspaces.com" />
      </Helmet>
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
