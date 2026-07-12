import { yachts } from "@/data/yachts";
import { StaggerContainer, AnimatedSection } from "@/components/shared/AnimatedSection";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock3, MessageCircle, Ruler, Users } from "lucide-react";
import { requireRouteRecord } from "@/seo/route-manifest";
import { getWhatsAppLink, PLACEHOLDER_IMAGE } from "@/lib/constants";

const featuredSlugs = [
  "يخت-42-قدم-ازيموت-للايجار",
  "رحلة-يخت-50-قدم-رويال-ماجستي",
  "رحلة-يخت-56-قدم-ماجستي",
  "يخت-64-قدم-ازيموت-إيطالي",
  "ايجار-يخت-ماجستي-88-قدم-جاكوزي",
  "اوشن-دريم-يخت-143-قدم-للايجار",
];

const FeaturedYachts = () => {
  const featured = featuredSlugs.map((slug) => {
    const yacht = yachts.find((candidate) => candidate.slug === slug);
    if (!yacht) throw new Error(`Unknown homepage yacht slug: ${slug}`);
    return yacht;
  });

  return (
    <section className="section-padding" dir="rtl">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <span className="text-primary text-sm font-semibold tracking-wider">أسطولنا</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-2 mb-4">
            يخوت مميزة للإيجار في دبي
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            أمثلة مختارة للمقارنة باستخدام الطول والسعة والسعر المسجل. راجع صفحة كل يخت،
            ثم اطلب تأكيد الموعد والسعر النهائي قبل الحجز.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featured.map((yacht) => {
            const route = requireRouteRecord(`/yachts/${yacht.slug}`);
            return (
              <article key={yacht.slug} className="liquid-glass overflow-hidden group">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={yacht.image_url || PLACEHOLDER_IMAGE}
                    alt={`${yacht.name}، ${yacht.length_ft} قدم`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-display font-semibold text-foreground mb-4">{yacht.name}</h3>
                  <dl className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-5">
                    <div className="flex items-center gap-2"><Ruler className="w-4 h-4 text-primary" /><dt className="sr-only">الطول</dt><dd>{yacht.length_ft} قدم</dd></div>
                    <div className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /><dt className="sr-only">السعة</dt><dd>{yacht.guest_capacity} ضيفاً</dd></div>
                    <div className="flex items-center gap-2"><CalendarDays className="w-4 h-4 text-primary" /><dt className="sr-only">سنة البناء</dt><dd>بناء {yacht.year_built}</dd></div>
                    <div className="flex items-center gap-2"><Clock3 className="w-4 h-4 text-primary" /><dt className="sr-only">الحد الأدنى</dt><dd>{yacht.minimum_duration} س كحد أدنى</dd></div>
                  </dl>
                  <p className="text-primary font-display text-lg font-semibold mb-4">
                    {yacht.price_per_hour.toLocaleString("ar-AE")} <span className="text-xs text-muted-foreground font-body">د.إ/ساعة</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link to={route.path} className="liquid-pill hover:scale-105 transition-transform">بيانات اليخت</Link>
                    <a href={getWhatsAppLink(`مرحباً، أرغب في الاستفسار عن ${yacht.name}.`)} target="_blank" rel="noopener noreferrer" className="liquid-pill hover:scale-105 transition-transform inline-flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" /> استفسار
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </StaggerContainer>

        <AnimatedSection className="text-center">
          <Link
            to={requireRouteRecord("/yachts").path}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl glass-button text-foreground font-medium hover:scale-105 transition-transform"
          >
            استعرض جميع اليخوت <ArrowLeft className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FeaturedYachts;
