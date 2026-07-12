import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Compass, Phone } from "lucide-react";
import { getWhatsAppLink, getPhoneLink, ROUTES } from "@/lib/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import { requireRouteRecord } from "@/seo/route-manifest";

const HERO_DESKTOP = "https://dubai-yacht.fra1.cdn.digitaloceanspaces.com/dubai_yacht_luxury_dt.avif";
const HERO_MOBILE = "https://dubai-yacht.fra1.cdn.digitaloceanspaces.com/dubai_yacht_luxury_mob.avif";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden" dir="rtl">
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <img
          src={isMobile ? HERO_MOBILE : HERO_DESKTOP}
          alt="تأجير يخت فاخر في دبي مارينا للمناسبات والرحلات الخاصة"
          className="w-full h-full object-cover scale-110"
          loading="eager"
        />
      </motion.div>

      <div className="absolute inset-0 hero-gradient" />

      <motion.div style={{ y: textY, opacity }} className="relative z-10 text-center max-w-4xl mx-auto px-4 pb-24">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <span className="liquid-pill inline-block mb-4">تأجير يخوت خاصة في دبي</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-foreground mb-4 leading-tight"
        >
          تأجير يخت خاص في دبي <br className="hidden sm:block" />
          <span className="text-gradient-gold">مع يخوت دبي</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl leading-snug text-white/85 mb-7 font-light max-w-2xl mx-auto"
        >
          قارن الطول والسعة والسعر والحد الأدنى للمدة، ثم أرسل تاريخ الرحلة وعدد الضيوف
          للحصول على خيارات مناسبة تنطلق من دبي مارينا.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-row gap-3 justify-center flex-wrap"
        >
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
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
            className="inline-flex items-center justify-center gap-2 px-6 py-3 liquid-btn-gold text-primary text-base hover:scale-105 transition-transform"
          >
            <Phone className="w-5 h-5" /> اتصل بنا
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/40 flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
