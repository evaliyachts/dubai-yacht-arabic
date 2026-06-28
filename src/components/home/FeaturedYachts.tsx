import { yachts } from "@/data/yachts";
import YachtCard from "@/components/shared/YachtCard";
import { StaggerContainer, AnimatedSection } from "@/components/shared/AnimatedSection";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const FeaturedYachts = () => {
  const featured = yachts.filter((y) => y.featured).slice(0, 6);

  return (
    <section className="section-padding" dir="rtl">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <span className="text-primary text-sm font-semibold tracking-wider">أسطولنا</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-2 mb-4">
            يخوت مميزة للإيجار في دبي
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            مجموعة مختارة من أفضل اليخوت — من اليخوت العائلية الصغيرة إلى السوبر يخوت
            الفاخرة. كل يخت ينطلق من دبي مارينا مع كابتن وطاقم محترف.
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
            استعرض جميع اليخوت <ArrowLeft className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FeaturedYachts;
