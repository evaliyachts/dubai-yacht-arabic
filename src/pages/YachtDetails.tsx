import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { yachts } from "@/data/yachts";
import { PLACEHOLDER_IMAGE, getWhatsAppLink, getPhoneLink } from "@/lib/constants";
import { Users, BedDouble, Bath, Ruler, UserCheck, Check, MessageCircle, Phone, ArrowLeft } from "lucide-react";

const YachtDetails = () => {
  const { slug } = useParams();
  const yacht = yachts.find((y) => y.slug === slug);

  if (!yacht) {
    return (
      <Layout>
        <div className="pt-28 pb-20 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">Yacht Not Found</h1>
          <Link to="/yachts" className="text-primary hover:underline">Back to Fleet</Link>
        </div>
      </Layout>
    );
  }

  const stats = [
    { icon: Ruler, label: "Length", value: `${yacht.length_ft} ft` },
    { icon: Users, label: "Guests", value: `Up to ${yacht.max_guests}` },
    { icon: BedDouble, label: "Bedrooms", value: yacht.bedrooms.toString() },
    { icon: Bath, label: "Bathrooms", value: yacht.bathrooms.toString() },
    { icon: UserCheck, label: "Crew", value: yacht.crew.toString() },
  ];

  return (
    <Layout>
      <SEOHead
        title={`${yacht.name} - ${yacht.length_ft}ft ${yacht.type} Yacht Rental Dubai | Dubai Yatch`}
        description={yacht.description}
        path={`/yachts/${yacht.slug}`}
        keywords={`${yacht.name} dubai, ${yacht.length_ft}ft yacht dubai, ${yacht.max_guests} guests yacht dubai`}
      />

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img src={PLACEHOLDER_IMAGE} alt={yacht.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            <Link to="/yachts" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Fleet
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-display font-bold text-foreground mb-2"
            >
              {yacht.name}
            </motion.h1>
            <p className="text-primary font-display text-xl">
              From AED {yacht.price_per_hour_from_aed.toLocaleString()}/hour
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <AnimatedSection>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
                {stats.map((s) => (
                  <div key={s.label} className="glass-card p-4 text-center">
                    <s.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="text-sm font-semibold text-foreground">{s.value}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">{yacht.description}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">What's Included</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {yacht.inclusions.map((inc) => (
                  <div key={inc} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0" /> {inc}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">Available Add-ons</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {yacht.add_ons.map((ao) => (
                  <div key={ao} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {ao}
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Sticky sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 glass-card p-6 space-y-4">
              <h3 className="text-xl font-display font-bold text-foreground">Book {yacht.name}</h3>
              <p className="text-2xl font-display font-bold text-primary">
                AED {yacht.price_per_hour_from_aed.toLocaleString()}<span className="text-sm text-muted-foreground font-body">/hour</span>
              </p>
              <a
                href={getWhatsAppLink(`Hi, I'd like to book the ${yacht.name} (${yacht.length_ft}ft, up to ${yacht.max_guests} guests).`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform gold-glow"
              >
                <MessageCircle className="w-5 h-5" /> Book on WhatsApp
              </a>
              <a
                href={getPhoneLink()}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl glass-button text-foreground font-medium hover:scale-105 transition-transform"
              >
                <Phone className="w-5 h-5" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default YachtDetails;
