import { useMemo, useState } from "react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import YachtCard from "@/components/shared/YachtCard";
import { AnimatedSection, StaggerContainer } from "@/components/shared/AnimatedSection";
import { yachts } from "@/data/yachts";
import { FLEET_RANGES } from "@/data/fleet";
import { SlidersHorizontal } from "lucide-react";
import { requireRouteRecord } from "@/seo/route-manifest";
import { breadcrumbEntity } from "@/seo/entities";

const route = requireRouteRecord("/yachts/");

const Yachts = () => {
  const [sortBy, setSortBy] = useState("recommended");
  const sorted = useMemo(() => {
    const result = [...yachts];
    if (sortBy === "price-low") result.sort((a, b) => a.pricePerHour - b.pricePerHour);
    if (sortBy === "price-high") result.sort((a, b) => b.pricePerHour - a.pricePerHour);
    if (sortBy === "guests") result.sort((a, b) => b.guestCapacity - a.guestCapacity);
    if (sortBy === "length") result.sort((a, b) => b.lengthFt - a.lengthFt);
    if (sortBy === "year") result.sort((a, b) => b.yearBuilt - a.yearBuilt);
    if (sortBy === "recommended") result.sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
    return result;
  }, [sortBy]);

  return (
    <Layout>
      <SEOHead route={route} jsonLd={breadcrumbEntity(route)} />
      <main className="pt-28 pb-16" dir="rtl">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">{route.h1}</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              قارن 24 يختاً ببيانات مسجلة: أطوال من {FLEET_RANGES.lengthFt.min} إلى {FLEET_RANGES.lengthFt.max} قدم،
              وسعات من {FLEET_RANGES.guestCapacity.min} إلى {FLEET_RANGES.guestCapacity.max} ضيفاً، وأسعار تبدأ من {FLEET_RANGES.pricePerHour.min.toLocaleString("ar-AE")} درهم للساعة.
              الموعد والسعر النهائي يحتاجان إلى تأكيد مباشر.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="flex items-center justify-end gap-3 mb-8">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <label htmlFor="yacht-sort" className="text-sm text-muted-foreground">ترتيب الأسطول</label>
            <select id="yacht-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="px-4 py-2 text-sm rounded-lg bg-secondary text-foreground border border-border">
              <option value="recommended">مقترح</option>
              <option value="price-low">الأقل سعراً</option>
              <option value="price-high">الأعلى سعراً</option>
              <option value="guests">الأكثر سعة</option>
              <option value="length">الأطول</option>
              <option value="year">الأحدث بناءً</option>
            </select>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((yacht, index) => <YachtCard key={yacht.id} yacht={yacht} index={index} />)}
          </StaggerContainer>
        </div>
      </main>
    </Layout>
  );
};

export default Yachts;
