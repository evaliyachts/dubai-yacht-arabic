import { AnimatedSection, ParallaxSection } from "@/components/shared/AnimatedSection";
import { MapPin } from "lucide-react";

const routes = [
  { name: "دبي مارينا", note: "نقطة الانطلاق الرئيسية" },
  { name: "JBR وبلوواترز", note: "إطلالات عين دبي" },
  { name: "نخلة جميرا", note: "الجزيرة الشهيرة" },
  { name: "أتلانتس", note: "إطلالات الفندق والمنتجع" },
  { name: "برج العرب", note: "أيقونة دبي البحرية" },
  { name: "ميناء دبي", note: "مرسى عصري" },
];

const RoutesSection = () => (
  <section className="section-padding" dir="rtl">
    <div className="container mx-auto px-4">
      <AnimatedSection className="text-center mb-14">
        <span className="liquid-pill inline-block">المسارات</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
          مسارات رحلات اليخوت في دبي
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          تنطلق رحلاتنا من <strong>دبي مارينا</strong> وتمر بأهم معالم دبي البحرية —
          من نخلة جميرا إلى برج العرب وعين دبي.
        </p>
      </AnimatedSection>

      <ParallaxSection speed={0.15}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {routes.map((r) => (
            <div key={r.name} className="liquid-glass p-4 flex items-start gap-3">
              <div className="w-8 h-8 liquid-icon rounded-lg shrink-0">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.note}</p>
              </div>
            </div>
          ))}
        </div>
      </ParallaxSection>
    </div>
  </section>
);

export default RoutesSection;
