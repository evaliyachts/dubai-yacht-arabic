import { motion } from "framer-motion";
import { Shield, DollarSign, Users, Compass, Calendar, Anchor } from "lucide-react";
import { StaggerContainer, staggerItemVariants, AnimatedSection } from "@/components/shared/AnimatedSection";

const highlights = [
  { icon: Anchor, title: "يخوت خاصة", desc: "أسطول من يخوت خاصة بالكامل، لك ولضيوفك فقط." },
  { icon: Users, title: "طاقم محترف", desc: "كابتن وطاقم ضيافة مرخّص ومُدرّب لكل رحلة." },
  { icon: Compass, title: "انطلاق من دبي مارينا", desc: "موقع مركزي يسهل الوصول إليه مع مرور بمعالم دبي." },
  { icon: Calendar, title: "باقات للمناسبات", desc: "ديكور وكيك وطعام مخصصة لكل أنواع الحفلات." },
  { icon: DollarSign, title: "أسعار واضحة", desc: "لا رسوم خفية — السعر يشمل الكابتن والوقود والطاقم." },
  { icon: Shield, title: "حجز عبر واتساب", desc: "تأكيد سريع خلال دقائق، دعم 24/7." },
];

const WhyChooseUs = () => (
  <section className="section-padding liquid-divider" dir="rtl">
    <div className="container mx-auto px-4">
      <AnimatedSection className="text-center mb-14">
        <span className="liquid-pill inline-block">لماذا نحن</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
          لماذا يخوت دبي؟
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          نقدّم لك تجربة <strong>تأجير يخت في دبي</strong> متكاملة بكل التفاصيل: خصوصية،
          فخامة، طاقم محترف، وأسعار شفافة بدون رسوم خفية.
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
