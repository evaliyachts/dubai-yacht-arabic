import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ROUTES, getWhatsAppLink } from "@/lib/constants";
import { Anchor, Crown, Ship, MessageCircle } from "lucide-react";

const tiers = [
  { icon: Anchor, type: "يخوت قياسية", price: "من 500 د.إ/ساعة", note: "42 – 50 قدم، 10–15 ضيف" },
  { icon: Ship, type: "يخوت فاخرة", price: "من 750 د.إ/ساعة", note: "50 – 70 قدم، 15–30 ضيف" },
  { icon: Crown, type: "سوبر يخوت", price: "من 1800 د.إ/ساعة", note: "80 – 151 قدم، حتى 130 ضيف" },
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
          أسعارنا واضحة وشفافة. تختلف بحسب حجم اليخت، مدة الرحلة، عدد الضيوف، وإضافات
          الديكور والطعام.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 max-w-5xl mx-auto">
        {tiers.map((t) => {
          const Icon = t.icon;
          return (
            <div key={t.type} className="liquid-glass-gold p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-3 liquid-icon">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold text-foreground mb-1">{t.type}</h3>
              <p className="text-primary font-display text-xl font-semibold mb-2">{t.price}</p>
              <p className="text-xs text-muted-foreground">{t.note}</p>
            </div>
          );
        })}
      </div>

      <AnimatedSection className="text-center">
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to={ROUTES.prices} className="inline-flex items-center gap-2 px-6 py-3 liquid-btn-gold text-primary font-medium">
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
