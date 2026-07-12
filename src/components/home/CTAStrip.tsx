import { Link } from "react-router-dom";
import { MessageCircle, Phone, Send } from "lucide-react";
import { getWhatsAppLink, getPhoneLink, ROUTES } from "@/lib/constants";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { requireRouteRecord } from "@/seo/route-manifest";

const CTAStrip = () => (
  <section className="section-padding relative overflow-hidden" dir="rtl">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
    <div className="container mx-auto px-4 relative z-10 text-center">
      <AnimatedSection>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
          جاهز لحجز يختك في دبي؟
        </h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          أرسل التاريخ والوقت والمدة وعدد الضيوف لنراجع الخيارات المناسبة ونشارك سعراً واضحاً قبل التأكيد.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-placement="homepage_cta"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 liquid-btn-primary text-base hover:scale-105 transition-transform"
          >
            <MessageCircle className="w-5 h-5" /> واتساب
          </a>
          <a
            href={getPhoneLink()}
            data-analytics-placement="homepage_cta"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 liquid-btn text-foreground hover:scale-105 transition-transform"
          >
            <Phone className="w-5 h-5" /> اتصل الآن
          </a>
          <Link
            to={requireRouteRecord(ROUTES.contact).path}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 liquid-btn-gold text-primary hover:scale-105 transition-transform"
          >
            <Send className="w-5 h-5" /> نموذج الاستفسار
          </Link>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default CTAStrip;
