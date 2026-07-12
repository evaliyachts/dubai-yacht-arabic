import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { requireRouteRecord } from "@/seo/route-manifest";

const route = requireRouteRecord("/privacy/");

const Privacy = () => (
  <Layout>
    <SEOHead route={route} />
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <AnimatedSection>
          <h1 className="text-4xl font-display font-bold text-foreground mb-8">{route.h1}</h1>
          <div className="prose prose-invert max-w-none text-muted-foreground space-y-6 text-sm leading-relaxed">
            <h2 className="text-xl font-display font-semibold text-foreground">Information We Collect</h2>
            <p>We collect personal information you provide when booking — name, email, phone number, and charter preferences. This information is used solely to process your booking and provide our services.</p>
            <h2 className="text-xl font-display font-semibold text-foreground">How We Use Your Information</h2>
            <p>Your information is used to confirm bookings, communicate charter details, and improve our services. We do not sell or share personal data with third parties.</p>
            <h2 className="text-xl font-display font-semibold text-foreground">Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access and disclosure.</p>
            <h2 className="text-xl font-display font-semibold text-foreground">Contact</h2>
            <p>For questions about this policy, please contact us via WhatsApp or our contact form.</p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </Layout>
);

export default Privacy;
