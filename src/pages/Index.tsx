import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedYachts from "@/components/home/FeaturedYachts";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ExperiencesSection from "@/components/home/ExperiencesSection";
import PackagesSection from "@/components/home/PackagesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GallerySection from "@/components/home/GallerySection";
import RoutesSection from "@/components/home/RoutesSection";
import HomeFAQ from "@/components/home/HomeFAQ";
import CTAStrip from "@/components/home/CTAStrip";
import SEOHead from "@/components/shared/SEOHead";

const Index = () => (
  <Layout>
    <SEOHead
      title="Dubai Yatch | Luxury Yacht Rental in Dubai Marina"
      description="Premium yacht rental in Dubai. Private charters, sunset cruises, birthday parties, corporate events. Licensed crew, luxury fleet. Book on WhatsApp."
      path="/"
      keywords="yacht rental dubai, dubai yacht charter, luxury yacht rental dubai, private yacht dubai marina"
    />
    <HeroSection />
    <FeaturedYachts />
    <ServicesSection />
    <WhyChooseUs />
    <ExperiencesSection />
    <PackagesSection />
    <TestimonialsSection />
    <GallerySection />
    <RoutesSection />
    <HomeFAQ />
    <CTAStrip />
  </Layout>
);

export default Index;
