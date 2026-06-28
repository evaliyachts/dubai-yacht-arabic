import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { getServiceBySlug } from "@/data/services";
import { getServicePathAr } from "@/data/services-ar";
import { cn } from "@/lib/utils";

interface ServiceCard {
  title: string;
  subtitle: string;
  image: string;
  path: string;
}

const buildCards = (): ServiceCard[] => {
  const map: Array<{ slug: string; title: string; subtitle: string }> = [
    { slug: "birthday-party", title: "عيد ميلاد على يخت", subtitle: "احتفل بيومك المميز في عرض البحر" },
    { slug: "marriage-proposal-party", title: "طلب زواج على يخت", subtitle: "لحظة لا تُنسى مع غروب دبي" },
    { slug: "engagement-parties", title: "حفلة خطوبة على يخت", subtitle: "أجواء فاخرة لبداية جديدة" },
    { slug: "wedding-parties", title: "حفلة زفاف على يخت", subtitle: "زفاف فريد على الماء" },
    { slug: "graduation-parties", title: "حفلة تخرج على يخت", subtitle: "احتفل بإنجازك بأسلوب فاخر" },
    { slug: "wedding-anniversary-parties", title: "ذكرى زواج على يخت", subtitle: "جدد أجمل اللحظات" },
    { slug: "bachelor-parties", title: "حفلة وداع العزوبية", subtitle: "ليلة لا تُنسى مع الأصدقاء" },
    { slug: "gender-reveal-party", title: "تحديد جنس المولود", subtitle: "مفاجأة العائلة على البحر" },
    { slug: "afternoon-tea-trip", title: "افترنون تي على يخت", subtitle: "استرخاء بعد الظهر" },
    { slug: "morning-yacht-trips", title: "رحلة يخت صباحية", subtitle: "ابدأ يومك بهدوء البحر" },
    { slug: "swimming", title: "سباحة على يخت", subtitle: "مياه الخليج الصافية" },
    { slug: "fishing", title: "رحلة صيد على يخت", subtitle: "صيد عميق في الخليج العربي" },
  ];

  return map
    .map((m) => {
      const svc = getServiceBySlug(m.slug);
      return {
        title: m.title,
        subtitle: m.subtitle,
        image: svc?.cover_image || PLACEHOLDER_IMAGE,
        path: getServicePathAr(m.slug),
      };
    });
};

const ServicesSection = () => {
  const cards = buildCards();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const lockRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const isInView = () => {
      const el = sectionRef.current;
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top <= 1 && r.bottom >= window.innerHeight - 1;
    };

    const step = (dir: 1 | -1) => {
      setActive((prev) => {
        const next = prev + dir;
        if (next < 0 || next > cards.length - 1) return prev;
        return next;
      });
    };

    const onWheel = (e: WheelEvent) => {
      if (!isInView()) return;
      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      const atStart = active === 0 && dir === -1;
      const atEnd = active === cards.length - 1 && dir === 1;
      if (atStart || atEnd) return;
      e.preventDefault();
      if (lockRef.current) return;
      lockRef.current = true;
      step(dir);
      window.setTimeout(() => {
        lockRef.current = false;
      }, 600);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isInView() || touchStartY.current == null) return;
      const dy = touchStartY.current - (e.touches[0]?.clientY ?? 0);
      if (Math.abs(dy) < 40) return;
      const dir: 1 | -1 = dy > 0 ? 1 : -1;
      const atStart = active === 0 && dir === -1;
      const atEnd = active === cards.length - 1 && dir === 1;
      if (atStart || atEnd) return;
      e.preventDefault();
      if (lockRef.current) return;
      lockRef.current = true;
      step(dir);
      touchStartY.current = e.touches[0]?.clientY ?? null;
      window.setTimeout(() => {
        lockRef.current = false;
      }, 600);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active, cards.length]);

  return (
    <section ref={sectionRef} className="liquid-divider relative" style={{ height: "200vh" }} dir="rtl">
      <div className="sticky top-0 h-screen w-full flex flex-col">
        <div className="container mx-auto px-4 pt-16">
          <AnimatedSection className="text-center mb-8">
            <span className="liquid-pill inline-block">خدماتنا</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
              تجارب نقدمها لك
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              من الرحلات الخاصة إلى الاحتفالات الكبرى — اكتشف تجربة اليخت المناسبة لمناسبتك.
            </p>
          </AnimatedSection>
        </div>

        <div className="flex-1 flex items-center justify-center [perspective:1200px]">
          <div className="relative w-[88vw] max-w-md h-[55vh] max-h-[480px]">
            {cards.map((card, i) => (
              <div
                key={card.path}
                className={cn(
                  "absolute inset-0 rounded-3xl overflow-hidden transition-all duration-500 ease-out will-change-transform",
                  "border border-border/40 shadow-[0_20px_60px_-20px_hsl(var(--background)/0.8)]"
                )}
                style={{
                  transform: (() => {
                    const offset = i - active;
                    const isPast = offset < 0;
                    const translateY = isPast ? -120 : offset * 12;
                    const translateZ = isPast ? 0 : -offset * 30;
                    const rotate = isPast ? 8 : 0;
                    const scale = isPast ? 0.9 : 1 - Math.min(offset, 3) * 0.04;
                    return `translateY(${translateY}px) translateZ(${translateZ}px) rotate(${rotate}deg) scale(${scale})`;
                  })(),
                  opacity: i - active < 0 || i - active > 4 ? 0 : 1,
                  zIndex: cards.length - Math.abs(i - active),
                  pointerEvents: i === active ? "auto" : "none",
                }}
              >
                <Link to={card.path} className="block w-full h-full relative group">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-right">
                    <h3 className="text-xl font-display font-bold text-foreground">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {card.subtitle}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-8 flex justify-center gap-1.5" dir="ltr">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`انتقل إلى البطاقة ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === active ? "w-6 bg-primary" : "w-1.5 bg-foreground/30"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
