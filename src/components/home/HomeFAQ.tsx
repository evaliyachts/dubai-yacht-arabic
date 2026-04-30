import { AnimatedSection } from "@/components/shared/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How much does yacht rental in Dubai cost?", a: "Yacht rental Dubai pricing starts from AED 400/hour for standard yachts, AED 750/hour for luxury yacht rental Dubai, and AED 2,000/hour for superyacht charter. Every Dubai yacht rental price includes captain, crew, and fuel." },
  { q: "How can I book a yacht in Dubai?", a: "You can book yacht in Dubai with Dubai Yatch in under a minute. Send us your date and group size on WhatsApp and we'll confirm your Dubai yacht booking instantly with the best luxury yacht charter Dubai option." },
  { q: "What is included in a Dubai yacht charter?", a: "Every Dubai yacht charter includes a licensed captain, crew, fuel, soft drinks, towels, sound system, swimming gear, and safety equipment — perfect for a private yacht hire Dubai trip." },
  { q: "Is a deposit required for Dubai yacht booking?", a: "A 50% deposit is required to confirm your Dubai yacht bookings. The remaining balance is due on the day of your luxury yacht rental Dubai charter." },
  { q: "What is the cancellation policy?", a: "Free cancellation up to 48 hours before departure. Cancellations within 48 hours of your yacht trip Dubai are subject to a 50% charge." },
  { q: "Do I need to bring ID?", a: "Yes, a valid passport or Emirates ID is required for all adult guests on every yacht for rent in Dubai for maritime safety regulations." },
  { q: "Are children allowed on board?", a: "Absolutely! Children of all ages are welcome on every Dubai yacht rental. We provide life jackets for all sizes and our crew ensures a safe environment." },
  { q: "Can we bring our own food and drinks?", a: "Yes, you're welcome to bring your own food and beverages on your yacht hire Dubai. We also offer catering packages starting from AED 100/person." },
  { q: "Is music allowed?", a: "Yes! All yachts have Bluetooth sound systems. For larger yacht trips in Dubai or birthday yacht charters, we can arrange professional DJ setups." },
  { q: "What happens in bad weather?", a: "Safety is our priority. If conditions are unsafe, we offer free rescheduling or a full refund on your Dubai yacht charter. Light rain rarely affects departures." },
];

const HomeFAQ = () => (
  <section className="section-padding liquid-divider">
    <div className="container mx-auto px-4 max-w-3xl">
      <AnimatedSection className="text-center mb-14">
        <span className="liquid-pill inline-block">FAQ</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
          Yacht Rental Dubai — Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Answers about <strong>Dubai yacht rental</strong> pricing,{" "}
          <strong>yacht hire Dubai</strong> inclusions, and{" "}
          <strong>Dubai yacht booking</strong>.
        </p>
      </AnimatedSection>

      <AnimatedSection>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="liquid-glass px-6 border-0">
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
