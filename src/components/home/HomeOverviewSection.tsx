import { Link } from "react-router-dom";
import { Check, MessageCircle, Phone } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getPhoneLink, getWhatsAppLink, ROUTES } from "@/lib/constants";
import { requireRouteRecord } from "@/seo/route-manifest";

const planningSteps = [
  {
    title: "حدّد احتياج المجموعة",
    text: "أرسل التاريخ والوقت والمدة وعدد الضيوف، واذكر إن كانت الرحلة لمناسبة تحتاج إضافات اختيارية.",
  },
  {
    title: "قارن بيانات اليخوت",
    text: "راجع الطول والسعة وسنة البناء والسعر بالساعة والحد الأدنى للمدة قبل اختيار اليخت.",
  },
  {
    title: "أكد التفاصيل كتابةً",
    text: "ثبّت اليخت والسعر والموعد والمدة وموقع الالتقاء في دبي مارينا قبل التوجه إلى الرحلة.",
  },
];

const internalLinks = [
  { label: "تأجير يخت في دبي", path: ROUTES.rentYacht },
  { label: "حجز يخت في دبي", path: ROUTES.bookYacht },
  { label: "مقارنة الأسعار", path: ROUTES.prices },
  { label: "يخوت للمناسبات", path: ROUTES.events },
];

const HomeOverviewSection = () => (
  <section className="section-padding liquid-divider" dir="rtl" aria-labelledby="home-direct-answer">
    <div className="container mx-auto px-4 max-w-6xl">
      <AnimatedSection>
        <div className="liquid-glass-gold p-6 md:p-10 text-center mb-8">
          <span className="liquid-pill inline-block mb-4">الجواب المباشر</span>
          <h2 id="home-direct-answer" className="text-3xl md:text-5xl font-display font-bold text-foreground mb-5">
            كيف تختار وتحجز يختاً خاصاً في دبي؟
          </h2>
          <p className="text-lg leading-8 text-foreground/90 max-w-4xl mx-auto">
            اختر اليخت وفق عدد الضيوف والمدة والميزانية، ثم أرسل التاريخ ووقت الانطلاق عبر واتساب أو الهاتف.
            تعرض الخيارات الحالية أطوالاً مسجلة من 42 إلى 150 قدماً، وسعات من 12 إلى 130 ضيفاً،
            وأسعاراً من 400 إلى 5,000 درهم للساعة. يحتاج الموعد والسعر النهائي إلى تأكيد مباشر.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {planningSteps.map((step, index) => (
            <article key={step.title} className="liquid-glass p-6">
              <div className="w-10 h-10 liquid-icon mb-4 font-display font-bold text-primary">{index + 1}</div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-7">{step.text}</p>
            </article>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="liquid-glass p-6 md:p-8">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">حقائق واضحة قبل الاستفسار</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground mb-6">
            <li className="flex gap-3"><Check className="w-5 h-5 text-primary shrink-0" />الحجز ليخت خاص لمجموعتك.</li>
            <li className="flex gap-3"><Check className="w-5 h-5 text-primary shrink-0" />الانطلاق المعتمد من دبي مارينا.</li>
            <li className="flex gap-3"><Check className="w-5 h-5 text-primary shrink-0" />الحد الأدنى المسجل بين ساعتين وأربع ساعات بحسب اليخت.</li>
            <li className="flex gap-3"><Check className="w-5 h-5 text-primary shrink-0" />إضافات المناسبات اختيارية وتحتاج إلى تأكيد وتسعير منفصلين.</li>
          </ul>
          <nav className="flex flex-wrap gap-3 mb-7" aria-label="روابط التخطيط الرئيسية">
            {internalLinks.map((link) => {
              const route = requireRouteRecord(link.path);
              return <Link key={route.path} to={route.path} className="liquid-pill hover:scale-105 transition-transform">{link.label}</Link>;
            })}
          </nav>
          <div className="flex flex-wrap gap-3">
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 liquid-btn-primary">
              <MessageCircle className="w-5 h-5" /> أرسل تفاصيل الرحلة
            </a>
            <a href={getPhoneLink()} className="inline-flex items-center gap-2 px-6 py-3 liquid-btn-gold text-primary">
              <Phone className="w-5 h-5" /> اتصل على +971 50 464 1020
            </a>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default HomeOverviewSection;
