import { Link, useParams } from "react-router-dom";
import { ArrowRight, BedDouble, CalendarDays, Clock3, MessageCircle, Phone, Ruler, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import YachtCard from "@/components/shared/YachtCard";
import { yachts } from "@/data/yachts";
import { capacityGuidance, relatedYachts, yachtFaqs, yachtOverview } from "@/data/fleet";
import { buildYachtJsonLd } from "@/data/yacht-page";
import { ROUTES, getPhoneLink, getWhatsAppLink } from "@/lib/constants";
import { canonicalUrlForPath, requireRouteRecord } from "@/seo/route-manifest";

const normalizeYachtSlug = (slug?: string) => {
  if (!slug) return "";
  try { return decodeURIComponent(slug); } catch { return slug; }
};

const YachtDetails = () => {
  const normalizedSlug = normalizeYachtSlug(useParams().slug);
  const yacht = yachts.find((candidate) => candidate.slug === normalizedSlug);

  if (!yacht) {
    return <Layout><main className="pt-28 pb-20 text-center" dir="rtl"><h1 className="text-3xl font-display font-bold mb-4">اليخت غير موجود</h1><Link to={ROUTES.yachts} className="text-primary hover:underline">العودة إلى الأسطول</Link></main></Layout>;
  }

  const route = requireRouteRecord(`/yachts/${yacht.slug}`);
  const canonical = canonicalUrlForPath(route.path);
  const image = yacht.media[0];
  const related = relatedYachts(yacht);
  const faqs = yachtFaqs(yacht);
  const facts = [
    { icon: Ruler, label: "الطول", value: `${yacht.lengthFt} قدم` },
    { icon: Users, label: "السعة المسجلة", value: `${yacht.guestCapacity} ضيفاً` },
    { icon: CalendarDays, label: "سنة البناء", value: yacht.yearBuilt.toString() },
    { icon: Clock3, label: "الحد الأدنى", value: `${yacht.minimumDuration} ساعات` },
    ...(yacht.numberOfBedrooms ? [{ icon: BedDouble, label: "غرف النوم المسجلة", value: yacht.numberOfBedrooms.toString() }] : []),
  ];
  const jsonLd = buildYachtJsonLd(yacht, canonical);

  return (
    <Layout>
      <SEOHead route={route} jsonLd={jsonLd} image={image.path} />
      <main className="pt-28 pb-16" dir="rtl">
        <div className="container mx-auto px-4">
          <Link to={requireRouteRecord(ROUTES.yachts).path} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-5"><ArrowRight className="w-4 h-4" /> العودة إلى الأسطول</Link>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">{route.h1}</h1>
          <p className="text-xl font-display text-primary mb-8">{yacht.pricePerHour.toLocaleString("ar-AE")} د.إ / ساعة — حد أدنى {yacht.minimumDuration} ساعات</p>

          <figure className="liquid-glass overflow-hidden bg-muted mb-12">
            <img src={image.path} alt={image.altAr} width={image.width} height={image.height} className="w-full max-h-[560px] object-cover" />
            <figcaption className="px-4 py-3 text-sm text-muted-foreground">صورة بديلة محايدة؛ لا تُستخدم صور خارجية دون توثيق حقوق الاستخدام.</figcaption>
          </figure>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-12">
              <AnimatedSection>
                <h2 className="text-2xl font-display font-bold mb-4">نظرة موثقة على اليخت</h2>
                <p className="text-muted-foreground leading-relaxed">{yachtOverview(yacht)}</p>
                <dl className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-7">
                  {facts.map(({ icon: Icon, label, value }) => <div key={label} className="liquid-glass p-4"><Icon className="w-5 h-5 text-primary mb-2" /><dt className="text-xs text-muted-foreground">{label}</dt><dd className="font-semibold mt-1">{value}</dd></div>)}
                </dl>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-2xl font-display font-bold mb-3">الملاءمة حسب عدد الضيوف</h2>
                <p className="text-muted-foreground leading-relaxed">{capacityGuidance(yacht)}</p>
                {yacht.availability && <p className="mt-3 text-sm text-muted-foreground">حالة التوفر المسجلة: {yacht.availability === "available" ? "متاح عند آخر تحقق" : yacht.availability === "unavailable" ? "غير متاح" : "حسب الطلب"}. يجب إعادة تأكيد الموعد.</p>}
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-2xl font-display font-bold mb-4">السعر وطريقة الحساب</h2>
                <div className="liquid-glass-gold p-6 space-y-2 text-muted-foreground">
                  <p>سعر الساعة المسجل: <strong className="text-foreground">{yacht.pricePerHour.toLocaleString("ar-AE")} درهم</strong>.</p>
                  <p>الحد الأدنى المسجل: <strong className="text-foreground">{yacht.minimumDuration} ساعات</strong>.</p>
                  <p>قيمة وقت اليخت للحد الأدنى: <strong className="text-foreground">{(yacht.pricePerHour * yacht.minimumDuration).toLocaleString("ar-AE")} درهم</strong> قبل أي طلبات اختيارية مؤكدة ومنفصلة السعر.</p>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-2xl font-display font-bold mb-4">خطوات طلب الحجز</h2>
                <ol className="grid md:grid-cols-3 gap-4">
                  <li className="liquid-glass p-5"><strong>1. أرسل التفاصيل</strong><p className="text-sm text-muted-foreground mt-2">التاريخ والوقت وعدد الضيوف.</p></li>
                  <li className="liquid-glass p-5"><strong>2. اطلب التأكيد</strong><p className="text-sm text-muted-foreground mt-2">تأكيد التوفر والسعر النهائي وأي طلب اختياري.</p></li>
                  <li className="liquid-glass p-5"><strong>3. أكمل الحجز</strong><p className="text-sm text-muted-foreground mt-2">اتبع تعليمات الحجز بعد استلام التفاصيل المؤكدة.</p></li>
                </ol>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-2xl font-display font-bold mb-4">أسئلة عن {yacht.name}</h2>
                <div className="space-y-3">{faqs.map((faq) => <details key={faq.question} className="liquid-glass p-5"><summary className="font-semibold cursor-pointer">{faq.question}</summary><p className="text-muted-foreground leading-relaxed mt-3">{faq.answer}</p></details>)}</div>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="text-2xl font-display font-bold mb-4">روابط أساسية</h2>
                <nav className="flex flex-wrap gap-3" aria-label="روابط أساسية لصفحة اليخت">
                  {[ROUTES.yachts, ROUTES.bookYacht, ROUTES.prices, ROUTES.events].map((path) => { const target = requireRouteRecord(path); return <Link key={target.path} to={target.path} className="liquid-pill">{target.h1}</Link>; })}
                </nav>
              </AnimatedSection>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 glass-card p-6 space-y-4">
                <h2 className="text-xl font-display font-bold">استفسر عن {yacht.name}</h2>
                <p className="text-sm text-muted-foreground">أرسل التاريخ والوقت وعدد الضيوف لتأكيد التوفر والسعر النهائي.</p>
                <a href={getWhatsAppLink(`مرحباً، أرغب في الاستفسار عن ${yacht.name} لعدد ${yacht.guestCapacity} ضيفاً أو أقل.`)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold"><MessageCircle className="w-5 h-5" /> واتساب</a>
                <a href={getPhoneLink()} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl glass-button"><Phone className="w-5 h-5" /> اتصال</a>
              </div>
            </aside>
          </div>

          <section className="mt-16" aria-labelledby="related-yachts"><h2 id="related-yachts" className="text-2xl md:text-3xl font-display font-bold mb-6">ثلاثة يخوت قريبة للمقارنة</h2><div className="grid md:grid-cols-3 gap-6">{related.map((candidate) => <YachtCard key={candidate.id} yacht={candidate} />)}</div></section>
        </div>
      </main>
    </Layout>
  );
};

export default YachtDetails;
