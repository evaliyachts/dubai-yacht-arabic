import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { requireRouteRecord } from "@/seo/route-manifest";

const route = requireRouteRecord("/terms/");

const Terms = () => (
  <Layout>
    <SEOHead route={route} />
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <AnimatedSection>
          <h1 className="text-4xl font-display font-bold text-foreground mb-8">{route.h1}</h1>
          <div className="prose prose-invert max-w-none text-muted-foreground space-y-6 text-sm leading-relaxed">
            <h2 className="text-xl font-display font-semibold text-foreground">1. Booking & Payment</h2>
            <p>A 50% deposit is required to confirm all bookings. The remaining balance is due on the day of charter. Accepted payment methods include bank transfer, credit card, and cash.</p>
            <h2 className="text-xl font-display font-semibold text-foreground">2. Cancellation Policy</h2>
            <p>Free cancellation up to 48 hours before the scheduled departure. Cancellations within 48 hours are subject to a 50% charge of the total booking value.</p>
            <h2 className="text-xl font-display font-semibold text-foreground">3. Safety & Conduct</h2>
            <p>All guests must follow safety instructions from the crew. The captain has final authority on all matters of safety. A valid ID is required for all adult guests.</p>
            <h2 className="text-xl font-display font-semibold text-foreground">4. Weather</h2>
            <p>If weather conditions make sailing unsafe, we will offer free rescheduling or a full refund at our discretion.</p>
            <h2 className="text-xl font-display font-semibold text-foreground">5. Liability</h2>
            <p>Dubai Yatch carries full maritime insurance. Guests are responsible for personal belongings and any damage caused to the yacht beyond normal wear.</p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  </Layout>
);

export default Terms;
