import { motion } from "framer-motion";
import { Clock3, DollarSign, Users, Compass, Calendar, Anchor } from "lucide-react";
import { StaggerContainer, staggerItemVariants, AnimatedSection } from "@/components/shared/AnimatedSection";

const highlights = [
  { icon: Anchor, title: "حجز خاص", desc: "اختر يختاً خاصاً لمجموعتك بدلاً من رحلة مشتركة بتذاكر منفصلة." },
  { icon: Users, title: "السعة أولاً", desc: "قارن سعة الضيوف المسجلة بكل يخت مع العدد الإجمالي لمجموعتك." },
  { icon: Compass, title: "انطلاق من دبي مارينا", desc: "يُرسل موقع الالتقاء الدقيق بعد تأكيد اليخت والموعد." },
  { icon: Calendar, title: "موعد محدد", desc: "أرسل التاريخ والوقت المطلوبين واطلب تأكيدهما قبل ترتيب الرحلة." },
  { icon: DollarSign, title: "سعر ومدة مسجلان", desc: "اقرأ سعر الساعة مع الحد الأدنى للمدة عند مقارنة الخيارات." },
  { icon: Clock3, title: "إضافات اختيارية", desc: "اطلب تجهيزات المناسبة بصورة منفصلة ولا تفترض أنها مشمولة تلقائياً." },
];

const WhyChooseUs = () => (
  <section className="section-padding liquid-divider" dir="rtl">
    <div className="container mx-auto px-4">
      <AnimatedSection className="text-center mb-14">
        <span className="liquid-pill inline-block">طريقة الاختيار</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
          ست نقاط لحجز أوضح
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          استخدم البيانات المسجلة لكل يخت واطلب تأكيد التفاصيل التشغيلية التي تهم رحلتك قبل الحجز.
        </p>
      </AnimatedSection>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {highlights.map((item) => (
          <motion.div
            key={item.title}
            variants={staggerItemVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="liquid-glass-gold p-6 text-center"
          >
            <div className="w-14 h-14 mx-auto mb-4 liquid-icon">
              <item.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-display font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

export default WhyChooseUs;
