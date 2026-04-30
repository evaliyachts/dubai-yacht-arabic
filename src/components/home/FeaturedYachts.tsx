import { motion } from "framer-motion";
import { yachts } from "@/data/yachts";
import YachtCard from "@/components/shared/YachtCard";
import { StaggerContainer } from "@/components/shared/AnimatedSection";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FeaturedYachts = () => {
  const featured = yachts.filter((y) => y.featured).slice(0, 6);

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase">Our Fleet</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-2 mb-4">
            Featured Yachts for Rent in Dubai
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hand-picked <strong>luxury yacht rental Dubai</strong> selection — from intimate
            <strong> private yacht charter Dubai</strong> cruises to grand{" "}
            <strong>Dubai luxury yacht hire</strong> superyachts. Every{" "}
            <strong>yacht for rent in Dubai</strong> departs from Dubai Marina with a
            licensed captain and full hospitality crew.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featured.map((yacht, i) => (
            <YachtCard key={yacht.slug} yacht={yacht} index={i} />
          ))}
        </StaggerContainer>

        <AnimatedSection className="text-center">
          <Link
            to="/yachts"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl glass-button text-foreground font-medium hover:scale-105 transition-transform"
          >
            View All Yachts for Rent in Dubai <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FeaturedYachts;
