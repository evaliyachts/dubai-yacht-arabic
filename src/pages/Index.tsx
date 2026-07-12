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
import SEOHead from "@/components/shared/SEOHead";
import { BRAND_NAME, DOMAIN } from "@/lib/constants";

const Index = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: BRAND_NAME,
      url: DOMAIN,
      inLanguage: "ar-AE",
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: BRAND_NAME,
      url: DOMAIN,
      telephone: "+971504641020",
      priceRange: "AED 500 - AED 7500",
      address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
      areaServed: ["Dubai", "Dubai Marina", "JBR", "Bluewaters Island", "Palm Jumeirah", "Burj Al Arab"],
      description: "تأجير يخت في دبي للمناسبات والرحلات البحرية الخاصة.",
    },
  ];

  return (
    <Layout>
      <SEOHead
        title="يخوت دبي | تأجير يخوت فاخرة في دبي للمناسبات"
        description="يخوت دبي — تأجير يخت في دبي للمناسبات والرحلات البحرية الخاصة. أسطول فاخر، طاقم محترف، انطلاق من دبي مارينا، حجز عبر واتساب."
        path="/"
        keywords="تأجير يخت في دبي، حجز يخت في دبي، يخوت للإيجار في دبي، تأجير يخوت فاخرة، يخت دبي مارينا، يخوت للمناسبات في دبي"
        jsonLd={jsonLd}
      />
      <HeroSection />
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
