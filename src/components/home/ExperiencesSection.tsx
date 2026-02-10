import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { occasions } from "@/data/occasions";
import { StaggerContainer, staggerItemVariants } from "@/components/shared/AnimatedSection";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Cake, Heart, Briefcase, Fish, Sunset, Camera, PartyPopper } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  birthday: Cake,
  proposal: Heart,
  corporate: Briefcase,
  fishing: Fish,
  "sunset-cruise": Sunset,
  "new-year": PartyPopper,
  photoshoot: Camera,
};

const ExperiencesSection = () => (
  <section className="section-padding">
    <div className="container mx-auto px-4">
      <AnimatedSection className="text-center mb-14">
        <span className="liquid-pill inline-block">Experiences</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
          Yacht Experiences for Every Occasion
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Whether it's a birthday, proposal, or corporate event — we create unforgettable moments on the water.
        </p>
      </AnimatedSection>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {occasions.slice(0, 7).map((occ) => {
          const Icon = iconMap[occ.slug] || Sunset;
          return (
            <motion.div key={occ.slug} variants={staggerItemVariants}>
              <Link
                to="/occasions"
                className="liquid-glass-gold p-5 flex flex-col items-center text-center group hover:border-primary/30 transition-all block"
              >
                <div className="w-12 h-12 liquid-icon rounded-xl mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-sm font-display font-semibold text-foreground">{occ.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{occ.suggested_duration}</p>
              </Link>
            </motion.div>
          );
        })}
      </StaggerContainer>
    </div>
  </section>
);

export default ExperiencesSection;
