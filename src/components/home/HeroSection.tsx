import { Link } from "react-router-dom";
import { MessageCircle, Compass, Phone } from "lucide-react";
import { getWhatsAppLink, getPhoneLink, ROUTES } from "@/lib/constants";
import { requireRouteRecord } from "@/seo/route-manifest";
import heroDesktop from "@/assets/home/yacht-cover-desktop.avif";
import heroMobile from "@/assets/home/yacht-cover-mobile.avif";

const HeroSection = () => (
    <section data-home-section="hero" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden" dir="rtl">
      <div className="absolute inset-0">
        <picture className="block w-full h-full">
          <source media="(max-width: 639px)" srcSet={heroMobile} width={768} height={1376} />
          <img
            src={heroDesktop}
            alt="تأجير يخت فاخر في دبي مارينا للمناسبات والرحلات الخاصة"
            width={2752}
            height={1536}
            sizes="100vw"
            className="w-full h-full object-cover scale-110"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>

      <div className="absolute inset-0 hero-gradient" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pb-24">
        <div>
          <span className="liquid-pill inline-block mb-4">تأجير يخوت خاصة في دبي</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-foreground mb-4 leading-tight">
          تأجير يخت خاص في دبي <br className="hidden sm:block" />
          <span className="text-gradient-gold">مع يخوت دبي</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl leading-snug text-white/85 mb-7 font-light max-w-2xl mx-auto">
          قارن الطول والسعة والسعر والحد الأدنى للمدة، ثم أرسل تاريخ الرحلة وعدد الضيوف
          للحصول على خيارات مناسبة تنطلق من دبي مارينا.
        </p>

        <div className="flex flex-row gap-3 justify-center flex-wrap">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-placement="homepage_hero"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 liquid-btn-primary text-base hover:scale-105 transition-transform"
          >
            <MessageCircle className="w-5 h-5" /> أرسل تفاصيل الرحلة
          </a>

          <Link
            to={requireRouteRecord(ROUTES.yachts).path}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 liquid-btn text-foreground text-base hover:scale-105 transition-transform"
          >
            <Compass className="w-5 h-5" /> شاهد اليخوت
          </Link>

          <a
            href={getPhoneLink()}
            data-analytics-placement="homepage_hero"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 liquid-btn-gold text-primary text-base hover:scale-105 transition-transform"
          >
            <Phone className="w-5 h-5" /> اتصل بنا
          </a>
        </div>
      </div>

      <div aria-hidden="true" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/40 flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
);

export default HeroSection;
