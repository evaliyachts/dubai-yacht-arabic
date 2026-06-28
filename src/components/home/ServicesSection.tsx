import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, staggerItemVariants } from "@/components/shared/AnimatedSection";
import { ROUTES } from "@/lib/constants";
import { Cake, Heart, Ring, Sparkles, GraduationCap, PartyPopper, Gift, Wine, Sunrise, Coffee, Waves, Fish } from "lucide-react";

// Use Heart as a fallback for Ring (lucide may not export Ring in all versions)
const SafeRing = Ring ?? Heart;

const PACKAGES = [
  { title: "عيد ميلاد على يخت", path: ROUTES.birthday, icon: Cake },
  { title: "حفلة خطوبة على يخت", path: ROUTES.engagement, icon: SafeRing },
  { title: "طلب زواج على يخت", path: ROUTES.proposal, icon: Heart },
  { title: "حفلة زفاف على يخت", path: ROUTES.wedding, icon: Sparkles },
  { title: "حفلة تخرج على يخت", path: ROUTES.graduation, icon: GraduationCap },
  { title: "حفلة خاصة على يخت", path: ROUTES.privateParty, icon: PartyPopper },
  { title: "تحديد جنس المولود", path: ROUTES.genderReveal, icon: Gift },
  { title: "عشاء على يخت", path: ROUTES.dinner, icon: Wine },
  { title: "رحلة يخت صباحية", path: ROUTES.morning, icon: Sunrise },
  { title: "افترنون تي على يخت", path: ROUTES.afternoonTea, icon: Coffee },
  { title: "سباحة على يخت", path: ROUTES.swimming, icon: Waves },
  { title: "رحلة صيد على يخت", path: ROUTES.fishing, icon: Fish },
];

const ServicesSection = () => (
  <section className="section-padding liquid-divider" dir="rtl">
    <div className="container mx-auto px-4">
      <AnimatedSection className="text-center mb-12">
        <span className="liquid-pill inline-block">باقات المناسبات</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
          تأجير يخت لكل المناسبات في دبي
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          اختر باقة المناسبة التي تناسبك واحصل على تجربة لا تُنسى على يخت خاص في دبي.
        </p>
      </AnimatedSection>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {PACKAGES.map((pkg) => {
          const Icon = pkg.icon;
          return (
            <motion.div key={pkg.path} variants={staggerItemVariants}>
              <Link
                to={pkg.path}
                className="liquid-glass-gold p-5 flex flex-col items-center text-center group hover:border-primary/30 transition-all block h-full"
              >
                <div className="w-12 h-12 liquid-icon rounded-xl mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-sm font-display font-semibold text-foreground">{pkg.title}</h3>
              </Link>
            </motion.div>
          );
        })}
      </StaggerContainer>
    </div>
  </section>
);

export default ServicesSection;
