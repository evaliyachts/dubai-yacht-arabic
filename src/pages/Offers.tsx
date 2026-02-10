import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection, StaggerContainer, staggerItemVariants } from "@/components/shared/AnimatedSection";
import { offers } from "@/data/offers";
import { Check } from "lucide-react";
import { getWhatsAppLink } from "@/lib/constants";
import { Link } from "react-router-dom";

const Offers = () => (
  <Layout>
    <SEOHead
      title="Yacht Packages in Dubai | Sunset Cruises & VIP Charters"
      description="Explore curated yacht packages in Dubai — sunset escapes, marina parties, and VIP celebrations. Custom packages available."
      path="/offers"
      keywords="yacht packages dubai, sunset cruise dubai yacht, yacht party dubai, vip yacht charter dubai"
    />

    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            Packages & Offers
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Curated yacht charter packages for every occasion and budget. Custom packages also available on request.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.slug}
              variants={staggerItemVariants}
              whileHover={{ y: -6 }}
              className={`glass-card p-8 relative ${i === 2 ? "border-primary/40" : ""}`}
            >
              {offer.badge && (
                <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                  {offer.badge}
                </span>
              )}
              <h2 className="text-2xl font-display font-bold text-foreground mb-1">{offer.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">{offer.tagline}</p>
              <p className="text-primary font-display text-2xl font-semibold mb-1">{offer.price_label}</p>
              <p className="text-xs text-muted-foreground mb-6">{offer.duration}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{offer.description}</p>
              <ul className="space-y-2 mb-6">
                {offer.inclusions.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> {inc}
                  </li>
                ))}
              </ul>
              <a
                href={getWhatsAppLink(`Hi, I'm interested in the ${offer.name} package (${offer.price_label}).`)}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform gold-glow"
              >
                Inquire Now
              </a>
            </motion.div>
          ))}
        </StaggerContainer>

        <AnimatedSection className="glass-card p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-display font-bold text-foreground mb-2">Corporate & Custom Packages</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Need something tailored? We design custom yacht charters for corporate events, weddings, and special occasions.
          </p>
          <Link to="/contact" className="inline-flex px-6 py-3 rounded-xl glass-button text-foreground font-medium hover:scale-105 transition-transform">
            Contact Us
          </Link>
        </AnimatedSection>
      </div>
    </div>
  </Layout>
);

export default Offers;
