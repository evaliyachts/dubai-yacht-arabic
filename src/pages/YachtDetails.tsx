import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { yachts } from "@/data/yachts";
import { YACHT_AR, translateInclusion, translateAddon } from "@/data/yachts-ar";
import { PLACEHOLDER_IMAGE, getWhatsAppLink, getPhoneLink, ROUTES, BRAND_NAME, DOMAIN } from "@/lib/constants";
import { Users, BedDouble, Bath, Ruler, UserCheck, Check, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { StaggerImageCarousel } from "@/components/ui/stagger-image-carousel";
import { canonicalUrlForPath, requireRouteRecord } from "@/seo/route-manifest";

const TYPE_AR: Record<string, string> = { Standard: "قياسي", Luxury: "فاخر", Superyacht: "سوبر يخت" };

const normalizeSlug = (slug?: string) => {
  if (!slug) return "";

  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
};

const YachtDetails = () => {
  const { slug } = useParams();
  const normalizedSlug = normalizeSlug(slug);
  const yacht = yachts.find((y) => y.slug === normalizedSlug);

  if (!yacht) {
    return (
      <Layout>
        <div className="pt-28 pb-20 text-center" dir="rtl">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">اليخت غير موجود</h1>
          <Link to="/yachts" className="text-primary hover:underline">العودة إلى الأسطول</Link>
        </div>
      </Layout>
    );
  }

  const ar = YACHT_AR[yacht.slug];
  const nameAr = ar?.name ?? yacht.name;
  const descAr = ar?.description ?? yacht.description;
  const route = requireRouteRecord(`/yachts/${yacht.slug}`);

  const images = yacht.images?.length ? yacht.images : [PLACEHOLDER_IMAGE];

  const stats = [
    { icon: Ruler, label: "الطول", value: `${yacht.length_ft} قدم` },
    { icon: Users, label: "الضيوف", value: `حتى ${yacht.max_guests}` },
    { icon: BedDouble, label: "غرف النوم", value: yacht.bedrooms.toString() },
    { icon: Bath, label: "الحمامات", value: yacht.bathrooms.toString() },
    { icon: UserCheck, label: "الطاقم", value: yacht.crew.toString() },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${nameAr} - تأجير يخت في دبي`,
      provider: { "@type": "Organization", name: BRAND_NAME, url: `${DOMAIN}/`, telephone: "+971504641020" },
      areaServed: { "@type": "City", name: "Dubai" },
      description: descAr,
      offers: { "@type": "Offer", price: yacht.price_per_hour_from_aed, priceCurrency: "AED" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: DOMAIN + "/" },
        { "@type": "ListItem", position: 2, name: "اليخوت", item: DOMAIN + "/yachts/" },
        { "@type": "ListItem", position: 3, name: nameAr, item: canonicalUrlForPath(route.path) },
      ],
    },
  ];

  return (
    <Layout>
      <SEOHead route={route} jsonLd={jsonLd} image={images[0]} />

      <div className="relative pt-28 pb-10 overflow-hidden" dir="rtl">
        <div className="container mx-auto px-4">
          <Link to="/yachts" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowRight className="w-4 h-4 rotate-180" /> العودة إلى الأسطول
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-display font-bold text-foreground mb-2"
          >
            {route.h1}
          </motion.h1>
          <p className="text-primary font-display text-xl mb-8">
            من {yacht.price_per_hour_from_aed.toLocaleString()} د.إ / ساعة
            <span className="text-sm text-muted-foreground mr-2">({TYPE_AR[yacht.type]})</span>
          </p>

          <StaggerImageCarousel images={images} altPrefix={nameAr} fallbackSrc={PLACEHOLDER_IMAGE} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <AnimatedSection>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
                {stats.map((s) => (
                  <div key={s.label} className="glass-card p-4 text-center">
                    <s.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="text-sm font-semibold text-foreground">{s.value}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">نظرة عامة</h2>
              <p className="text-muted-foreground leading-relaxed">{descAr}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">ما يشمله الحجز</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {yacht.inclusions.map((inc) => (
                  <div key={inc} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-primary shrink-0" /> {translateInclusion(inc)}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">إضافات اختيارية</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {yacht.add_ons.map((ao) => (
                  <div key={ao} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" /> {translateAddon(ao)}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="liquid-glass-gold p-6">
                <h3 className="text-lg font-display font-bold text-foreground mb-3">روابط ذات صلة</h3>
                <div className="flex flex-wrap gap-2">
                  <Link to={ROUTES.bookYacht} className="liquid-pill">حجز يخت في دبي</Link>
                  <Link to={ROUTES.prices} className="liquid-pill">أسعار اليخوت</Link>
                  <Link to={ROUTES.marina} className="liquid-pill">يخت دبي مارينا</Link>
                  <Link to={ROUTES.events} className="liquid-pill">تأجير يخت للمناسبات</Link>
                  <Link to={ROUTES.birthday} className="liquid-pill">عيد ميلاد على يخت</Link>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 glass-card p-6 space-y-4">
              <h3 className="text-xl font-display font-bold text-foreground">احجز {nameAr}</h3>
              <p className="text-2xl font-display font-bold text-primary">
                {yacht.price_per_hour_from_aed.toLocaleString()} د.إ<span className="text-sm text-muted-foreground font-body"> / ساعة</span>
              </p>
              <a
                href={getWhatsAppLink(`مرحباً، أرغب في حجز ${nameAr} (${yacht.length_ft} قدم، يتسع ${yacht.max_guests} ضيف).`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:scale-105 transition-transform gold-glow"
              >
                <MessageCircle className="w-5 h-5" /> احجز عبر واتساب
              </a>
              <a
                href={getPhoneLink()}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl glass-button text-foreground font-medium hover:scale-105 transition-transform"
              >
                <Phone className="w-5 h-5" /> اتصل الآن
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default YachtDetails;
