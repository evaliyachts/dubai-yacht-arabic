import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FLEET_RANGES } from "@/data/fleet";

const faqs = [
  { q: "كم سعر تأجير يخت في دبي؟", a: `تتراوح الأسعار المعروضة حالياً بين ${FLEET_RANGES.pricePerHour.min.toLocaleString("ar-AE")} و${FLEET_RANGES.pricePerHour.max.toLocaleString("ar-AE")} درهم للساعة. راجع أيضاً الحد الأدنى للمدة، ثم اطلب السعر النهائي لليخت والموعد المحددين.` },
  { q: "كيف أطلب حجز يخت؟", a: "أرسل التاريخ ووقت الانطلاق والمدة وعدد الضيوف عبر واتساب، أو اتصل على +971 50 464 1020، ثم راجع الخيارات والتأكيد المكتوب." },
  { q: "هل اليخت خاص أم مشترك؟", a: "الخدمة لحجز يخت خاص لمجموعتك وليست رحلة مشتركة بتذاكر منفصلة." },
  { q: "من أين تنطلق الرحلة؟", a: "الانطلاق من دبي مارينا، ويُرسل موقع الالتقاء الدقيق بعد تأكيد الحجز." },
  { q: "ما الحد الأدنى لمدة الحجز؟", a: `يعتمد على اليخت؛ الخيارات الحالية تسجل حداً أدنى بين ${FLEET_RANGES.minimumDuration.min} و${FLEET_RANGES.minimumDuration.max} ساعات.` },
  { q: "هل المسار ثابت؟", a: "لا نعلن مساراً ثابتاً لكل الرحلات. ناقش المسار عند الحجز واحصل على تأكيد وفق المدة والظروف التشغيلية." },
  { q: "هل يمكن طلب إضافات لمناسبة؟", a: "يمكن طلب إضافات محددة، لكنها اختيارية وتحتاج إلى تأكيد وتسعير منفصلين ولا تُفترض ضمن سعر اليخت." },
  { q: "هل عرض اليخت يعني أن الموعد متوفر؟", a: "لا. صفحات اليخوت تعرض بيانات للمقارنة؛ يجب تأكيد اليخت والتاريخ والوقت والسعر النهائي مباشرة." },
  { q: "ما الذي أراجعه قبل الرحلة؟", a: "اسم اليخت والتاريخ والوقت والمدة وعدد الضيوف والسعر وموقع الالتقاء الدقيق في دبي مارينا." },
];

const HomeFAQ = () => (
  <section className="section-padding liquid-divider" dir="rtl">
    <div className="container mx-auto px-4 max-w-3xl">
      <AnimatedSection className="text-center mb-14">
        <span className="liquid-pill inline-block">أسئلة شائعة</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
          الأسئلة الأكثر شيوعاً
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          إجابات مباشرة حول الاختيار والأسعار وطلب الحجز والانطلاق من دبي مارينا.
        </p>
      </AnimatedSection>

      <AnimatedSection>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="liquid-glass px-6 border-0">
              <AccordionTrigger className="text-right text-foreground font-display font-semibold text-base hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm pb-5 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AnimatedSection>
    </div>
  </section>
);

export default HomeFAQ;
