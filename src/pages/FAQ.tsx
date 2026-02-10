import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqGroups = [
  {
    category: "Booking",
    items: [
      { q: "How do I book a yacht in Dubai?", a: "You can book via WhatsApp, phone, or our contact form. We respond within minutes and confirm availability instantly." },
      { q: "How far in advance should I book?", a: "We recommend booking at least 48 hours in advance, especially for weekends and holidays. Last-minute bookings are possible subject to availability." },
      { q: "Is a deposit required?", a: "Yes, a 50% deposit is required to confirm your booking. The balance is due on the day of charter." },
    ],
  },
  {
    category: "Pricing",
    items: [
      { q: "How much does yacht rental in Dubai cost?", a: "Prices start from AED 400/hour for standard yachts, AED 750/hour for luxury yachts, and AED 2,000/hour for superyachts. All prices include captain, crew, and fuel." },
      { q: "Are there any hidden charges?", a: "No hidden fees. The price includes captain, crew, fuel, and basic amenities. Add-ons like catering and decorations are optional and priced separately." },
    ],
  },
  {
    category: "Onboard",
    items: [
      { q: "Can we bring our own food and drinks?", a: "Yes! You're welcome to bring your own food and beverages. We also offer catering packages." },
      { q: "Is music allowed on the yacht?", a: "Absolutely! All yachts have Bluetooth sound systems. For larger events, we can arrange DJ setups." },
      { q: "Are children allowed?", a: "Yes, children of all ages are welcome. Life jackets are provided for all sizes." },
    ],
  },
  {
    category: "Weather & Policies",
    items: [
      { q: "What happens in bad weather?", a: "If conditions are unsafe, we offer free rescheduling or a full refund. Light rain rarely affects departures." },
      { q: "What is the cancellation policy?", a: "Free cancellation up to 48 hours before departure. Within 48 hours, a 50% charge applies." },
      { q: "Do I need ID?", a: "Yes, a valid passport or Emirates ID is required for all adult guests." },
    ],
  },
];

const FAQ = () => (
  <Layout>
    <SEOHead
      title="FAQ - Yacht Rental in Dubai | Dubai Yatch"
      description="Frequently asked questions about yacht rental in Dubai. Pricing, booking, cancellation, what to bring, and everything you need to know."
      path="/faq"
      keywords="yacht rental dubai faq, dubai yacht questions, yacht booking dubai"
    />

    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <AnimatedSection className="text-center mb-14">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground">Everything you need to know about yacht rental in Dubai.</p>
        </AnimatedSection>

        {faqGroups.map((group) => (
          <AnimatedSection key={group.category} className="mb-8">
            <h2 className="text-xl font-display font-bold text-foreground mb-4">{group.category}</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {group.items.map((faq, i) => (
                <AccordionItem key={i} value={`${group.category}-${i}`} className="glass-card px-6 border-0">
                  <AccordionTrigger className="text-left text-foreground font-display font-semibold hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm pb-5 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </Layout>
);

export default FAQ;
