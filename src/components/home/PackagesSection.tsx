import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { offers } from "@/data/offers";
import { StaggerContainer, staggerItemVariants, AnimatedSection } from "@/components/shared/AnimatedSection";
import { Check } from "lucide-react";
import { getWhatsAppLink, ROUTES } from "@/lib/constants";

const PackagesSection = () => (
  <section className="section-padding liquid-divider">
    <div className="container mx-auto px-4">
      <AnimatedSection className="text-center mb-14">
        <span className="liquid-pill inline-block">Packages</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
          Yacht Packages & Offers
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Curated charter packages for every budget. Custom packages also available.
        </p>
      </AnimatedSection>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {offers.map((offer, i) => (
          <motion.div
            key={offer.slug}
            variants={staggerItemVariants}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className={`${i === 2 ? "liquid-glass-gold" : "liquid-glass"} p-6 relative overflow-hidden`}
          >
            {offer.badge && (
              <span className="absolute top-4 right-4 liquid-pill">
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
              className="block w-full text-center py-3 liquid-btn-gold text-primary font-medium"
            >
              Inquire Now
            </a>
          </motion.div>
        ))}
      </StaggerContainer>

      <AnimatedSection className="text-center">
        <p className="text-sm text-muted-foreground">
          Need a custom package?{" "}
          <Link to={ROUTES.contact} className="text-primary hover:underline">تواصل معنا</Link> لتجربة مصممة حسب طلبك.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default PackagesSection;
