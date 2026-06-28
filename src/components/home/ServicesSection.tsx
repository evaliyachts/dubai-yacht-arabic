import { Link } from "react-router-dom";
import {
  ContainerScroll,
  CardsContainer,
  CardTransformed,
} from "@/components/ui/animated-cards-stack";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ROUTES, PLACEHOLDER_IMAGE } from "@/lib/constants";
import { getServiceBySlug } from "@/data/services";

interface ServiceCard {
  title: string;
  subtitle: string;
  image: string;
  path: string;
}

const buildCards = (): ServiceCard[] => {
  const map: Array<{ slug: string; title: string; subtitle: string; path: string }> = [
    { slug: "birthday-party", title: "عيد ميلاد على يخت", subtitle: "احتفل بيومك المميز في عرض البحر", path: ROUTES.birthday },
    { slug: "marriage-proposal-party", title: "طلب زواج على يخت", subtitle: "لحظة لا تُنسى مع غروب دبي", path: ROUTES.proposal },
    { slug: "engagement-parties", title: "حفلة خطوبة على يخت", subtitle: "أجواء فاخرة لبداية جديدة", path: ROUTES.engagement },
    { slug: "wedding-parties", title: "حفلة زفاف على يخت", subtitle: "زفاف فريد على الماء", path: ROUTES.wedding },
    { slug: "graduation-parties", title: "حفلة تخرج على يخت", subtitle: "احتفل بإنجازك بأسلوب فاخر", path: ROUTES.graduation },
    { slug: "wedding-anniversary-parties", title: "ذكرى زواج على يخت", subtitle: "جدد أجمل اللحظات", path: ROUTES.anniversary },
    { slug: "bachelor-parties", title: "حفلة وداع العزوبية", subtitle: "ليلة لا تُنسى مع الأصدقاء", path: ROUTES.bachelor },
    { slug: "gender-reveal-party", title: "تحديد جنس المولود", subtitle: "مفاجأة العائلة على البحر", path: ROUTES.genderReveal },
    { slug: "afternoon-tea-trip", title: "افترنون تي على يخت", subtitle: "استرخاء بعد الظهر", path: ROUTES.afternoonTea },
    { slug: "morning-yacht-trips", title: "رحلة يخت صباحية", subtitle: "ابدأ يومك بهدوء البحر", path: ROUTES.morning },
    { slug: "swimming", title: "سباحة على يخت", subtitle: "مياه الخليج الصافية", path: ROUTES.swimming },
    { slug: "fishing", title: "رحلة صيد على يخت", subtitle: "صيد عميق في الخليج العربي", path: ROUTES.fishing },
  ];

  return map
    .map((m) => {
      const svc = getServiceBySlug(m.slug);
      return {
        title: m.title,
        subtitle: m.subtitle,
        image: svc?.cover_image || PLACEHOLDER_IMAGE,
        path: m.path,
      };
    });
};

const ServicesSection = () => {
  const cards = buildCards();

  return (
    <section className="section-padding liquid-divider" dir="rtl">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-12">
          <span className="liquid-pill inline-block">خدماتنا</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
            تجارب نقدمها لك
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            من الرحلات الخاصة إلى الاحتفالات الكبرى — اكتشف تجربة اليخت المناسبة لمناسبتك.
          </p>
        </AnimatedSection>

        <ContainerScroll className="h-[400vh]">
          <CardsContainer className="h-svh w-full max-w-2xl mx-auto px-4">
            {cards.map((card, i) => (
              <CardTransformed
                key={card.path}
                index={i}
                arrayLength={cards.length}
                variant="dark"
                className="p-0 overflow-hidden border-primary/20"
                style={{ height: "min(70vh, 560px)", width: "100%" }}
              >
                <Link to={card.path} className="absolute inset-0 block group">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute bottom-0 right-0 left-0 p-6 text-right">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">
                      {card.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {card.subtitle}
                    </p>
                  </div>
                </Link>
              </CardTransformed>
            ))}
          </CardsContainer>
        </ContainerScroll>
      </div>
    </section>
  );
};

export default ServicesSection;
