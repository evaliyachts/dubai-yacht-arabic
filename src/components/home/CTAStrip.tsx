import { motion } from "framer-motion";
import { MessageCircle, Phone, Send } from "lucide-react";
import { getWhatsAppLink, getPhoneLink } from "@/lib/constants";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Link } from "react-router-dom";

const CTAStrip = () => (
  <section className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
    <div className="container mx-auto px-4 relative z-10 text-center">
      <AnimatedSection>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
          Ready to Book Your Yacht in Dubai?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Get in touch now for instant availability and the best rates on luxury yacht charters.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform gold-glow"
          >
            <MessageCircle className="w-5 h-5" /> WhatsApp
          </a>
          <a
            href={getPhoneLink()}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass-button text-foreground font-semibold hover:scale-105 transition-transform"
          >
            <Phone className="w-5 h-5" /> Call Now
          </a>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass-button text-foreground font-semibold hover:scale-105 transition-transform"
          >
            <Send className="w-5 h-5" /> Inquiry Form
          </Link>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default CTAStrip;
