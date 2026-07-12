import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection, StaggerContainer, staggerItemVariants } from "@/components/shared/AnimatedSection";
import { offers } from "@/data/offers";
import { Check } from "lucide-react";
import { getWhatsAppLink, ROUTES } from "@/lib/constants";
import { Link } from "react-router-dom";
import { requireRouteRecord } from "@/seo/route-manifest";

const route = requireRouteRecord(ROUTES.offers);

const offerAr: Record<string, {
  name: string;
  tagline: string;
  duration: string;
  priceLabel: string;
  description: string;
  badge?: string;
  inclusions: string[];
}> = {
  "sunset-escape": {
    name: "رحلة الغروب",
    tagline: "ساعة ذهبية على مياه الخليج العربي",
    duration: "ساعتان",
    priceLabel: "ابتداءً من 999 درهم",
    description: "استمتع برحلة يخت هادئة وقت الغروب مع إطلالات دبي البحرية. خيار مثالي للأزواج والمجموعات الصغيرة والتصوير.",
    badge: "الأكثر طلباً",
    inclusions: ["رحلة غروب لمدة ساعتين", "مشروبات ترحيبية ومقبلات", "كابتن وطاقم محترف", "نظام صوتي", "مسار دبي مارينا وJBR", "فرص تصوير مميزة"],
  },
  "marina-party": {
    name: "حفلة مارينا",
    tagline: "احتفال خاص على البحر",
    duration: "4 ساعات",
    priceLabel: "ابتداءً من 2,499 درهم",
    description: "حوّل اليخت إلى مساحة احتفال خاصة في دبي مارينا، مع أجواء مناسبة لأعياد الميلاد والجمعات والمناسبات.",
    badge: "أفضل قيمة",
    inclusions: ["حفلة يخت خاصة لمدة 4 ساعات", "مشروبات وضيافة", "شواء وخيارات طعام", "نظام صوتي جاهز للحفلات", "سباحة وأنشطة مائية حسب التوفر", "زينة للمناسبات"],
  },
  "vip-celebration": {
    name: "احتفال VIP",
    tagline: "تجربة فاخرة بتفاصيل راقية",
    duration: "6 ساعات",
    priceLabel: "ابتداءً من 5,999 درهم",
    description: "باقة فاخرة للمناسبات الكبرى والطلبات الخاصة والفعاليات الراقية، مع تنسيق متكامل وتجربة ضيافة مميزة.",
    badge: "فاخر",
    inclusions: ["تجربة يخت فاخرة لمدة 6 ساعات", "ضيافة مميزة", "قائمة طعام فاخرة حسب الطلب", "أنشطة مائية وجت سكي حسب التوفر", "تصوير احترافي", "منسق مناسبة", "زينة VIP"],
  },
};

const Offers = () => (
  <Layout>
    <SEOHead route={route} />

    <div className="pt-28 pb-20" dir="rtl">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            {route.h1}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            باقات يخت مختارة بعناية للرحلات الخاصة والحفلات والمناسبات، مع إمكانية
            تخصيص كل باقة حسب عدد الضيوف ونوع المناسبة.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {offers.map((offer, i) => {
            const ar = offerAr[offer.slug];
            return (
              <motion.div
                key={offer.slug}
                variants={staggerItemVariants}
                whileHover={{ y: -6 }}
                className={`glass-card p-8 relative ${i === 2 ? "border-primary/40" : ""}`}
              >
                {ar.badge && (
                  <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
                    {ar.badge}
                  </span>
                )}
                <h2 className="text-2xl font-display font-bold text-foreground mb-1">{ar.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{ar.tagline}</p>
                <p className="text-primary font-display text-2xl font-semibold mb-1">{ar.priceLabel}</p>
                <p className="text-xs text-muted-foreground mb-6">{ar.duration}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{ar.description}</p>
                <ul className="space-y-2 mb-6">
                  {ar.inclusions.map((inc) => (
                    <li key={inc} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> {inc}
                    </li>
                  ))}
                </ul>
                <a
                  href={getWhatsAppLink(`مرحباً، أرغب في الاستفسار عن باقة ${ar.name} (${ar.priceLabel}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform gold-glow"
                >
                  استفسر الآن
                </a>
              </motion.div>
            );
          })}
        </StaggerContainer>

        <AnimatedSection className="glass-card p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-display font-bold text-foreground mb-2">باقات مخصصة للشركات والمناسبات</h3>
          <p className="text-sm text-muted-foreground mb-4">
            تحتاج شيئاً خاصاً؟ نصمم باقات مخصصة للفعاليات والشركات وحفلات الزفاف والمناسبات الخاصة.
          </p>
          <Link to={ROUTES.contact} className="inline-flex px-6 py-3 rounded-xl glass-button text-foreground font-medium hover:scale-105 transition-transform">
            تواصل معنا
          </Link>
        </AnimatedSection>
      </div>
    </div>
  </Layout>
);

export default Offers;
