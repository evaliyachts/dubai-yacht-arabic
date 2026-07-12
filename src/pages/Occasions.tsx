import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection, StaggerContainer, staggerItemVariants } from "@/components/shared/AnimatedSection";
import { occasions } from "@/data/occasions";
import { getWhatsAppLink, ROUTES } from "@/lib/constants";
import { Cake, Heart, Briefcase, Fish, Sunset, PartyPopper, Camera } from "lucide-react";
import { requireRouteRecord } from "@/seo/route-manifest";

const route = requireRouteRecord(ROUTES.events);

const iconMap: Record<string, React.ElementType> = {
  birthday: Cake, proposal: Heart, corporate: Briefcase, fishing: Fish,
  "sunset-cruise": Sunset, "new-year": PartyPopper, photoshoot: Camera,
};

const Occasions = () => (
  <Layout>
    <SEOHead route={route} />

    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            Yacht Experiences
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Whatever the occasion, we create unforgettable moments on the water in Dubai.
          </p>
        </AnimatedSection>

        <div className="space-y-12">
          {occasions.map((occ) => {
            const Icon = iconMap[occ.slug] || Sunset;
            return (
              <AnimatedSection key={occ.slug}>
                <div className="glass-card p-6 md:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-display font-bold text-foreground">{occ.name}</h2>
                      <p className="text-sm text-primary">{occ.tagline}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">{occ.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <span><strong className="text-foreground">Duration:</strong> {occ.suggested_duration}</span>
                    <span><strong className="text-foreground">Add-ons:</strong> {occ.add_ons.join(", ")}</span>
                  </div>
                  <a
                    href={getWhatsAppLink(`Hi, I'm interested in a ${occ.name} yacht experience.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform text-sm"
                  >
                    Inquire About {occ.name}
                  </a>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </div>
  </Layout>
);

export default Occasions;
