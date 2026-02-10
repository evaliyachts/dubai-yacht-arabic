import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { offers } from "@/data/offers";
import { StaggerContainer, staggerItemVariants, AnimatedSection } from "@/components/shared/AnimatedSection";
import { Check, ArrowRight } from "lucide-react";
import { getWhatsAppLink } from "@/lib/constants";

const PackagesSection = () => (
  <section className="section-padding bg-secondary/20">
    <div className="container mx-auto px-4">
      <AnimatedSection className="text-center mb-14">
        <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase">Packages</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-2 mb-4">
          Yacht Packages & Offers
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Curated charter packages for every budget. Custom packages also available.
        </p>
      </AnimatedSection>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {offers.map((offer, i) => (
          <motion.div
            key={offer.slug}
            variants={staggerItemVariants}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className={`glass-card p-6 relative overflow-hidden ${i === 2 ? "border-primary/40" : ""}`}
          >
            {offer.badge && (
              <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                {offer.badge}
              </span>
            )}
            <h3 className="text-2xl font-display font-bold text-foreground mb-1">{offer.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">{offer.tagline}</p>
            <p className="text-primary font-display text-xl font-semibold mb-1">{offer.price_label}</p>
            <p className="text-xs text-muted-foreground mb-5">{offer.duration}</p>
            <ul className="space-y-2 mb-6">
              {offer.inclusions.map((inc) => (
                <li key={inc} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  {inc}
                </li>
              ))}
            </ul>
            <a
              href={getWhatsAppLink(`Hi, I'm interested in the ${offer.name} package (${offer.price_label}).`)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 rounded-xl bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
            >
              Inquire Now
            </a>
          </motion.div>
        ))}
      </StaggerContainer>

      <AnimatedSection className="text-center">
        <p className="text-sm text-muted-foreground">
          Need a custom package?{" "}
          <Link to="/contact" className="text-primary hover:underline">Contact us</Link> for a tailored experience.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default PackagesSection;
