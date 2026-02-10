import { motion } from "framer-motion";
import { Shield, DollarSign, Users, Compass, Calendar, Anchor } from "lucide-react";
import { StaggerContainer, staggerItemVariants } from "@/components/shared/AnimatedSection";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

const highlights = [
  { icon: Anchor, title: "Luxury Fleet", desc: "Hand-picked yachts maintained to the highest standards of comfort and safety." },
  { icon: DollarSign, title: "Transparent Pricing", desc: "No hidden fees. What you see is what you pay — fuel, crew, and essentials included." },
  { icon: Users, title: "Professional Crew", desc: "Licensed, experienced captains and hospitality-trained crew for every charter." },
  { icon: Shield, title: "Safety First", desc: "Full safety equipment, insurance coverage, and maritime compliance on every voyage." },
  { icon: Calendar, title: "Flexible Packages", desc: "From 2-hour sunset cruises to full-day charters — tailored to your schedule." },
  { icon: Compass, title: "Prime Routes", desc: "Dubai Marina, Palm Jumeirah, Burj Al Arab, Atlantis — explore Dubai's iconic coastline." },
];

const WhyChooseUs = () => (
  <section className="section-padding liquid-divider">
    <div className="container mx-auto px-4">
      <AnimatedSection className="text-center mb-14">
        <span className="liquid-pill inline-block">Why Us</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
          Why Choose Dubai Yatch
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Trusted by hundreds of guests for premium yacht rental experiences in Dubai.
        </p>
      </AnimatedSection>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {highlights.map((item) => (
          <motion.div
            key={item.title}
            variants={staggerItemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="liquid-glass-gold p-6 text-center"
          >
            <div className="w-14 h-14 mx-auto mb-4 liquid-icon">
              <item.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-display font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default WhyChooseUs;
