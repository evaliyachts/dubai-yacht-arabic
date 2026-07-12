import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Anchor, Heart, Shield, Users } from "lucide-react";
import { yachts } from "@/data/yachts";
import { requireRouteRecord } from "@/seo/route-manifest";
import { breadcrumbEntity, organizationEntity } from "@/seo/entities";

const route = requireRouteRecord("/about/");

const values = [
  { icon: Anchor, title: "بيانات مسجلة", desc: "يعرض الكتالوج الطول والسعة وسنة البناء والسعر والمدة الدنيا لكل يخت." },
  { icon: Heart, title: "اختيار حسب المجموعة", desc: "تبدأ المقارنة من عدد الضيوف والتاريخ والمدة المطلوبة." },
  { icon: Shield, title: "تأكيد قبل الحجز", desc: "يحتاج الموعد والسعر النهائي وأي طلب اختياري إلى تأكيد مباشر." },
  { icon: Users, title: "تواصل مباشر", desc: "يمكن إرسال تفاصيل الرحلة عبر واتساب أو التواصل بالهاتف." },
];

const About = () => (
  <Layout>
    <SEOHead route={route} jsonLd={[organizationEntity(), breadcrumbEntity(route)]} />

    <div className="pt-28 pb-20" dir="rtl">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            {route.h1}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            يخوت دبي موقع عربي لمقارنة بيانات اليخوت الخاصة وطلب الحجز في دبي.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <AnimatedSection direction="right">
            <div className="rounded-2xl overflow-hidden h-80">
              <img src={yachts[0].media[0].path} alt={yachts[0].media[0].altAr} width={yachts[0].media[0].width} height={yachts[0].media[0].height} sizes="(min-width: 1024px) 50vw, 100vw" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            </div>
          </AnimatedSection>
          <AnimatedSection direction="left" className="flex flex-col justify-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">قصتنا</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              يجمع الموقع خيارات اليخوت في كتالوج واحد يوضح البيانات المسجلة لكل خيار،
              حتى تبدأ المقارنة من السعة والسعر والحد الأدنى للمدة.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              أرسل التاريخ والوقت وعدد الضيوف، ثم اطلب تأكيد اليخت والسعر النهائي وموقع
              الالتقاء في دبي مارينا قبل ترتيب الرحلة.
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
