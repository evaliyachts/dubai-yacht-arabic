import { AnimatedSection } from "@/components/shared/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How much does yacht rental in Dubai cost?", a: "Yacht rental in Dubai starts from AED 400/hour for standard yachts, AED 750/hour for luxury yachts, and AED 2,000/hour for superyachts. Prices include captain, crew, and fuel." },
  { q: "Is a deposit required?", a: "A 50% deposit is required to confirm your booking. The remaining balance is due on the day of your charter." },
  { q: "What is the cancellation policy?", a: "Free cancellation up to 48 hours before departure. Cancellations within 48 hours are subject to a 50% charge." },
  { q: "Do I need to bring ID?", a: "Yes, a valid passport or Emirates ID is required for all adult guests for maritime safety regulations." },
  { q: "Are children allowed on board?", a: "Absolutely! Children of all ages are welcome. We provide life jackets for all sizes and our crew ensures a safe environment." },
  { q: "Can we bring our own food and drinks?", a: "Yes, you're welcome to bring your own food and beverages. We also offer catering packages starting from AED 100/person." },
  { q: "Is music allowed?", a: "Yes! All yachts have Bluetooth sound systems. For larger events, we can arrange professional DJ setups." },
  { q: "What happens in bad weather?", a: "Safety is our priority. If conditions are unsafe, we offer free rescheduling or a full refund. Light rain rarely affects departures." },
];

const HomeFAQ = () => (
  <section className="section-padding bg-secondary/20">
    <div className="container mx-auto px-4 max-w-3xl">
      <AnimatedSection className="text-center mb-14">
        <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase">FAQ</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-2 mb-4">
          Frequently Asked Questions
        </h2>
      </AnimatedSection>

      <AnimatedSection>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="glass-card px-6 border-0">
              <AccordionTrigger className="text-left text-foreground font-display font-semibold text-base hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm pb-5 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AnimatedSection>
    </div>
  </section>
);

export default HomeFAQ;
