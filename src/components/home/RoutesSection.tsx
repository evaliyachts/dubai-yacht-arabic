import { AnimatedSection, ParallaxSection } from "@/components/shared/AnimatedSection";
import { Anchor, Clock3, MapPin, Route } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/lib/constants";
import { requireRouteRecord } from "@/seo/route-manifest";

const routes = [
  { icon: Anchor, name: "مرسى الانطلاق", note: "دبي مارينا هي نقطة انطلاق الرحلات في هذا المشروع." },
  { icon: MapPin, name: "موقع الالتقاء", note: "يُرسل الموقع الدقيق بعد تأكيد اليخت والموعد." },
  { icon: Clock3, name: "مدة الحجز", note: "اختر مدة توافق الحد الأدنى المسجل لليخت." },
  { icon: Route, name: "المسار", note: "يُناقش ويُؤكد وفق المدة والظروف التشغيلية." },
];

const RoutesSection = () => (
  <section className="section-padding" dir="rtl">
    <div className="container mx-auto px-4">
      <AnimatedSection className="text-center mb-14">
        <span className="liquid-pill inline-block">الانطلاق والمسار</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
          تفاصيل الرحلة تُؤكد قبل الانطلاق
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          تنطلق الرحلات من <strong>دبي مارينا</strong>. لا نعد على الصفحة بمسار ثابت أو معالم محددة؛
          اتفق على المسار المطلوب واحصل على تأكيد يناسب المدة والظروف التشغيلية.
        </p>
      </AnimatedSection>

      <ParallaxSection speed={0.15}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {routes.map((r) => (
            <div key={r.name} className="liquid-glass p-4 flex items-start gap-3">
              <div className="w-8 h-8 liquid-icon rounded-lg shrink-0">
                <r.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.note}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to={requireRouteRecord(ROUTES.marina).path} className="liquid-pill hover:scale-105 transition-transform inline-flex">
            دليل الانطلاق من دبي مارينا
          </Link>
        </div>
      </ParallaxSection>
    </div>
  </section>
);

export default RoutesSection;
