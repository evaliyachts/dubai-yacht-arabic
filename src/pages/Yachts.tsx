import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import YachtCard from "@/components/shared/YachtCard";
import { AnimatedSection, StaggerContainer } from "@/components/shared/AnimatedSection";
import { yachts } from "@/data/yachts";
import { SlidersHorizontal } from "lucide-react";
import { requireRouteRecord } from "@/seo/route-manifest";

const route = requireRouteRecord("/yachts/");

const TYPES = [
  { key: "All", label: "الكل" },
  { key: "Standard", label: "قياسي" },
  { key: "Luxury", label: "فاخر" },
  { key: "Superyacht", label: "سوبر يخت" },
];

const Yachts = () => {
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("recommended");

  const filtered = useMemo(() => {
    let result = [...yachts];
    if (typeFilter !== "All") result = result.filter((y) => y.type === typeFilter);
    if (sortBy === "price-low") result.sort((a, b) => a.price_per_hour_from_aed - b.price_per_hour_from_aed);
    if (sortBy === "price-high") result.sort((a, b) => b.price_per_hour_from_aed - a.price_per_hour_from_aed);
    if (sortBy === "guests") result.sort((a, b) => b.max_guests - a.max_guests);
    if (sortBy === "length") result.sort((a, b) => b.length_ft - a.length_ft);
    return result;
  }, [typeFilter, sortBy]);

  return (
    <Layout>
      <SEOHead route={route} />

      <div className="pt-28 pb-10" dir="rtl">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
              {route.h1}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              تصفّح أسطولاً واسعاً من اليخوت للإيجار في دبي. قارن الأنواع، رتّب حسب السعر،
              واحجز يختك المثالي خلال دقائق عبر واتساب.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 flex-wrap">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              {TYPES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTypeFilter(t.key)}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    typeFilter === t.key ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 text-sm rounded-lg bg-secondary text-foreground border border-border"
            >
              <option value="recommended">مقترح</option>
              <option value="price-low">الأقل سعراً</option>
              <option value="price-high">الأعلى سعراً</option>
              <option value="guests">الأكثر ضيوفاً</option>
              <option value="length">الأكبر طولاً</option>
            </select>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((yacht, i) => (
              <YachtCard key={yacht.slug} yacht={yacht} index={i} />
            ))}
          </StaggerContainer>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">لا توجد يخوت تطابق الفلترة.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Yachts;
