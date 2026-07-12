import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ROUTES } from "@/lib/constants";
import { requireRouteRecord } from "@/seo/route-manifest";
import { breadcrumbEntity } from "@/seo/entities";
import { FLEET_RANGES } from "@/data/fleet";

const route = requireRouteRecord(ROUTES.faq);

const faqGroups = [
  {
    category: "الحجز",
    items: [
      { q: "كيف يمكن طلب حجز يخت في دبي؟", a: "أرسل التاريخ والوقت والمدة وعدد الضيوف عبر واتساب أو نموذج التواصل، أو اتصل بالرقم المنشور، ثم اطلب تأكيد اليخت والسعر النهائي." },
      { q: "متى أرسل طلب الحجز؟", a: "أرسل التاريخ المطلوب مبكراً قدر الإمكان، فظهور اليخت في الكتالوج لا يعني أن الموعد متاح تلقائياً." },
      { q: "هل توجد دفعة مطلوبة لتأكيد الحجز؟", a: "لا تنشر هذه الصفحة نسبة ثابتة. راجع شروط الدفع المكتوبة في العرض الخاص باليخت والموعد قبل الموافقة." },
    ],
  },
  {
    category: "الأسعار",
    items: [
      { q: "كم سعر تأجير يخت في دبي؟", a: `تتراوح الأسعار المسجلة حالياً في الكتالوج بين ${FLEET_RANGES.pricePerHour.min.toLocaleString("ar-AE")} و${FLEET_RANGES.pricePerHour.max.toLocaleString("ar-AE")} درهم للساعة. راجع أيضاً الحد الأدنى للمدة واطلب السعر النهائي.` },
      { q: "كيف أعرف التكلفة النهائية؟", a: "اطلب عرضاً مكتوباً يوضح سعر وقت اليخت وأي طلب اختياري مؤكد. لا تفترض وجود شمولات غير مذكورة في العرض." },
    ],
  },
  {
    category: "على متن اليخت",
    items: [
      { q: "هل يمكن طلب ترتيبات للطعام أو المشروبات؟", a: "اذكر طلبك عند الاستفسار واطلب تأكيد السماح به وتكلفته كتابةً؛ لا تفترض أنه متاح أو مشمول تلقائياً." },
      { q: "هل يمكن طلب موسيقى أو تجهيز صوتي؟", a: "سجّل الطلب كإضافة اختيارية، ثم تحقق من توفره وشروطه وسعره قبل الحجز." },
      { q: "ما المعلومات المطلوبة عند وجود أطفال؟", a: "أرسل عدد الأطفال وأعمارهم مع إجمالي الضيوف، واطلب تأكيد المتطلبات التشغيلية وإرشادات السلامة الخاصة باليخت." },
    ],
  },
  {
    category: "السياسات",
    items: [
      { q: "ماذا يحدث عند تغير الظروف الجوية؟", a: "اطلب القرار التشغيلي وخيارات إعادة الجدولة أو الإلغاء كتابةً من فريق الحجز؛ لا تعلن هذه الصفحة ضماناً ثابتاً." },
      { q: "ما سياسة الإلغاء؟", a: "راجع سياسة الإلغاء المرتبطة بالعرض قبل الدفع، فهذه الصفحة لا تنشر مهلة أو نسبة موحدة غير موثقة." },
      { q: "ما الوثائق المطلوبة؟", a: "اسأل عن الوثائق المطلوبة لجميع الضيوف قبل موعد الرحلة، واحصل على القائمة المؤكدة مع تعليمات الحجز." },
    ],
  },
];

const FAQ = () => {
  return (
    <Layout>
      <SEOHead route={route} jsonLd={breadcrumbEntity(route)} />

      <div className="pt-28 pb-20" dir="rtl">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimatedSection className="text-center mb-14">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
              {route.h1}
            </h1>
            <p className="text-muted-foreground">كل ما تريد معرفته عن تأجير اليخوت في دبي.</p>
          </AnimatedSection>

          {faqGroups.map((group) => (
            <AnimatedSection key={group.category} className="mb-8">
              <h2 className="text-xl font-display font-bold text-foreground mb-4">{group.category}</h2>
              <Accordion type="single" collapsible className="space-y-3">
                {group.items.map((faq, i) => (
                  <AccordionItem key={i} value={`${group.category}-${i}`} className="glass-card px-6 border-0">
                    <AccordionTrigger className="text-right text-foreground font-display font-semibold hover:no-underline py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm pb-5 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
