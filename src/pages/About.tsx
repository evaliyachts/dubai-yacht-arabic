import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Anchor, Heart, Shield, Users } from "lucide-react";
import { yachts } from "@/data/yachts";

const values = [
  { icon: Anchor, title: "أسطول فاخر", desc: "كل يخت في أسطولنا يخضع لأعلى معايير الفخامة والسلامة." },
  { icon: Heart, title: "خدمة الضيف أولاً", desc: "نسعى دائماً لتجاوز توقعاتك في كل رحلة." },
  { icon: Shield, title: "مرخّص ومؤمَّن", desc: "ترخيص بحري كامل وتأمين شامل لكل رحلة." },
  { icon: Users, title: "طاقم محترف", desc: "كباتن وطاقم ضيافة بخبرة سنوات." },
];

const About = () => (
  <Layout>
    <SEOHead
      title="من نحن | يخوت دبي — شركة تأجير يخوت في دبي"
      description="تعرّف على يخوت دبي — شركتك الموثوقة لتأجير اليخوت في دبي. قصتنا، قيمنا، والتزامنا بتقديم تجربة بحرية فاخرة."
      path="/about"
    />

    <div className="pt-28 pb-20" dir="rtl">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            من نحن
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            يخوت دبي — شركة رائدة في تأجير اليخوت الفاخرة في دبي، نقدّم تجارب بحرية لا تُنسى.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <AnimatedSection direction="right">
            <div className="rounded-2xl overflow-hidden h-80">
              <img src={yachts[0]?.images[0]} alt="أسطول يخوت دبي" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </AnimatedSection>
          <AnimatedSection direction="left" className="flex flex-col justify-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">قصتنا</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              بدأنا برحلة بسيطة: تقديم تجربة بحرية فاخرة لا تُنسى للعائلات والمجموعات في دبي.
              اليوم، أصبحنا من أكثر الشركات الموثوقة في تأجير اليخوت في دبي مارينا.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              من رحلات غروب الشمس الرومانسية إلى الحفلات الكبيرة، نضمن لك تجربة سلسة وراقية
              في كل مرة. ننطلق من دبي مارينا ونخدم ضيوفاً من جميع أنحاء العالم.
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">قيمنا</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 0.1}>
              <div className="glass-card p-6 text-center h-full">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  </Layout>
);

export default About;
