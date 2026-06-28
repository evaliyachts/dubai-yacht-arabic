import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqGroups = [
  {
    category: "الحجز",
    items: [
      { q: "كيف يمكن حجز يخت في دبي؟", a: "عبر واتساب أو الاتصال المباشر أو نموذج التواصل. نرد خلال دقائق ونؤكد التوفر فوراً." },
      { q: "متى يجب الحجز مسبقاً؟", a: "نوصي بالحجز قبل 48 ساعة على الأقل، خاصة في عطلات نهاية الأسبوع والمناسبات." },
      { q: "هل العربون مطلوب؟", a: "نعم، عربون 50% لتأكيد الحجز، والباقي يوم الرحلة." },
    ],
  },
  {
    category: "الأسعار",
    items: [
      { q: "كم سعر تأجير يخت في دبي؟", a: "تبدأ الأسعار من 500 درهم/ساعة لليخوت القياسية، 750 درهم للفاخرة، و1800 درهم للسوبر يخوت. السعر يشمل الكابتن والوقود والطاقم." },
      { q: "هل توجد رسوم خفية؟", a: "لا. السعر شامل للكابتن والوقود والطاقم والمشروبات الأساسية. إضافات الديكور والطعام اختيارية وبسعر منفصل." },
    ],
  },
  {
    category: "على متن اليخت",
    items: [
      { q: "هل يمكن إحضار طعام ومشروبات خاصة؟", a: "نعم، يمكن ذلك. كما نوفر باقات ضيافة وعشاء بحسب الطلب." },
      { q: "هل الموسيقى مسموحة؟", a: "نعم، كل اليخوت تحوي نظام صوتي Bluetooth. يمكن إضافة DJ احترافي للحفلات الكبيرة." },
      { q: "هل الأطفال مسموح لهم؟", a: "نعم، نرحب بالأطفال من جميع الأعمار. نوفر سترات نجاة لكل الأحجام." },
    ],
  },
  {
    category: "السياسات",
    items: [
      { q: "ماذا يحدث في حال سوء الأحوال الجوية؟", a: "إذا كانت الظروف غير آمنة، نوفر إعادة جدولة مجانية أو استرداد كامل للمبلغ." },
      { q: "ما سياسة الإلغاء؟", a: "إلغاء مجاني قبل 48 ساعة. خلال أقل من 48 ساعة، يتم احتساب 50% من قيمة الحجز." },
      { q: "هل أحتاج إلى هوية؟", a: "نعم، نطلب جواز سفر أو هوية إماراتية لكل الضيوف البالغين وفقاً للأنظمة البحرية." },
    ],
  },
];

const FAQ = () => {
  const allFaqs = faqGroups.flatMap((g) => g.items);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Layout>
      <SEOHead
        title="الأسئلة الشائعة | تأجير يخت في دبي — يخوت دبي"
        description="الأسئلة الشائعة حول تأجير اليخوت في دبي — الأسعار، الحجز، الإلغاء، الإضافات، وكل ما تريد معرفته."
        path="/faq"
        keywords="أسئلة تأجير يخت دبي، حجز يخت دبي، أسعار يخت دبي"
        jsonLd={jsonLd}
      />

      <div className="pt-28 pb-20" dir="rtl">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimatedSection className="text-center mb-14">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
              الأسئلة الشائعة
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
