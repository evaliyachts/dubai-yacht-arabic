import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ROUTES, getWhatsAppLink } from "@/lib/constants";
import { Ruler, Clock3, Users, MessageCircle } from "lucide-react";
import { requireRouteRecord } from "@/seo/route-manifest";
import { FLEET_RANGES } from "@/data/fleet";

const facts = [
  { icon: Ruler, type: "نطاق الطول", value: `${FLEET_RANGES.lengthFt.min}–${FLEET_RANGES.lengthFt.max} قدماً`, note: "بحسب الأطوال المسجلة في الكتالوج الحالي" },
  { icon: Users, type: "سعة الضيوف", value: `${FLEET_RANGES.guestCapacity.min}–${FLEET_RANGES.guestCapacity.max} ضيفاً`, note: "لا تتجاوز السعة المسجلة لليخت المختار" },
  { icon: Clock3, type: "السعر والمدة", value: `${FLEET_RANGES.pricePerHour.min.toLocaleString("en-US")}–${FLEET_RANGES.pricePerHour.max.toLocaleString("en-US")} د.إ/ساعة`, note: `والحد الأدنى بين ${FLEET_RANGES.minimumDuration.min} و${FLEET_RANGES.minimumDuration.max} ساعات` },
];

const PricesSection = () => (
  <section className="section-padding" dir="rtl">
    <div className="container mx-auto px-4">
      <AnimatedSection className="text-center mb-12">
        <span className="liquid-pill inline-block">الأسعار</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
          أسعار تأجير اليخوت في دبي
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          السعر بالساعة جزء واحد من المقارنة. راجع معه الحد الأدنى للمدة، ثم اطلب عرضاً
          نهائياً لليخت والتاريخ والوقت المحددين.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 max-w-5xl mx-auto">
        {facts.map((t) => {
          const Icon = t.icon;
          return (
            <div key={t.type} className="liquid-glass-gold p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-3 liquid-icon">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold text-foreground mb-1">{t.type}</h3>
              <p className="text-primary font-display text-xl font-semibold mb-2">{t.value}</p>
              <p className="text-xs text-muted-foreground">{t.note}</p>
            </div>
          );
        })}
      </div>

      <AnimatedSection className="text-center">
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to={requireRouteRecord(ROUTES.prices).path} className="inline-flex items-center gap-2 px-6 py-3 liquid-btn-gold text-primary font-medium">
            تفاصيل الأسعار
          </Link>
          <a
            href={getWhatsAppLink("مرحباً، أرغب في الحصول على عرض سعر لتأجير يخت في دبي.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 liquid-btn-primary"
          >
            <MessageCircle className="w-5 h-5" /> اسأل عن سعر اليخت
          </a>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default PricesSection;
