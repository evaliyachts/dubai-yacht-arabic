import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "كم سعر تأجير يخت في دبي؟", a: "تبدأ أسعار تأجير اليخوت في دبي من 500 درهم للساعة لليخوت القياسية، 750 درهم لليخوت الفاخرة، و1800 درهم للسوبر يخوت. السعر يشمل الكابتن والوقود والطاقم." },
  { q: "كيف يمكن حجز يخت في دبي؟", a: "أرسل لنا التاريخ والمدة وعدد الضيوف عبر واتساب، وسنؤكد الحجز فوراً مع أفضل خيارات اليخوت المتاحة." },
  { q: "هل اليخت خاص أم مشترك؟", a: "جميع رحلاتنا خاصة بالكامل. اليخت لك ولضيوفك فقط طوال مدة الحجز." },
  { q: "من أين تنطلق رحلة اليخت؟", a: "تنطلق جميع الرحلات من دبي مارينا، مع إمكانية الإبحار حول النخلة وبرج العرب وعين دبي." },
  { q: "هل يمكن تجهيز اليخت لعيد ميلاد أو خطوبة؟", a: "نعم، نوفر باقات متكاملة مع الديكور والكيك والموسيقى والتصوير حسب نوع المناسبة." },
  { q: "كم مدة رحلة اليخت المناسبة للمناسبات؟", a: "نوصي بـ 3 إلى 4 ساعات للحصول على تجربة كاملة تشمل الإبحار والاحتفال والصور." },
  { q: "هل يمكن إضافة BBQ أو جت سكي؟", a: "نعم، تتوفر إضافات اختيارية مثل BBQ (400 درهم) وجت سكي (600 درهم/ساعة) وغيرها." },
  { q: "ما العربون المطلوب؟", a: "عربون 50% لتأكيد الحجز، والباقي يوم الرحلة. إلغاء مجاني قبل 48 ساعة." },
  { q: "هل يمكن الحجز عبر واتساب؟", a: "نعم، الحجز عبر واتساب هو الأسرع — نؤكد التوفر ونرسل تفاصيل الحجز خلال دقائق." },
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
          إجابات سريعة حول <strong>تأجير اليخوت في دبي</strong>، الأسعار، والحجز.
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
