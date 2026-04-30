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
import SEOContentSection from "@/components/home/SEOContentSection";
import SEOHead from "@/components/shared/SEOHead";

const Index = () => (
  <Layout>
    <SEOHead
      title="Yacht Rental Dubai | Luxury Yacht Charter Dubai — Dubai Yatch"
      description="Yacht rental Dubai with Dubai Yatch — luxury yacht charter Dubai, private yacht hire Dubai, Dubai yacht booking & trips. Book yacht in Dubai on WhatsApp."
      path="/"
      keywords="yacht rental dubai, dubai yacht rental, yacht rentals dubai, dubai yacht rentals, yacht for rent dubai, yacht hire dubai, dubai yacht hire, yacht charter dubai, dubai yacht charter, private yacht rental dubai, private yacht charter dubai, luxury yacht rental dubai, luxury yacht charter dubai, dubai luxury yacht rental, book yacht dubai, dubai yacht booking, yacht trip dubai, dubai yacht trips"
    />
    <HeroSection />
    <FeaturedYachts />
    <ServicesSection />
    <WhyChooseUs />
    <ExperiencesSection />
    <PackagesSection />
    <SEOContentSection />
    <TestimonialsSection />
    <GallerySection />
    <RoutesSection />
    <HomeFAQ />
    <CTAStrip />
  </Layout>
);

export default Index;
