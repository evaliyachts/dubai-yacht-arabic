import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { ROUTES } from "@/lib/constants";
import { yachts } from "@/data/yachts";
import { cn } from "@/lib/utils";
import { requireRouteRecord } from "@/seo/route-manifest";

interface ServiceCard {
  title: string;
  subtitle: string;
  image: string;
  path: string;
}

const buildCards = (): ServiceCard[] => {
  const map: Array<{ path: string; title: string; subtitle: string; yachtSlug: string }> = [
    { path: ROUTES.birthday, title: "عيد ميلاد على يخت", subtitle: "حجز خاص مع إضافات اختيارية تُؤكد منفصلة", yachtSlug: "رحلة-يخت-50-قدم-رويال-ماجستي" },
    { path: ROUTES.proposal, title: "طلب زواج على يخت", subtitle: "خطط لرحلة خاصة واذكر الإضافات المطلوبة", yachtSlug: "رحلة-يخت-55-قدم-ازيموت" },
    { path: ROUTES.engagement, title: "حفلة خطوبة على يخت", subtitle: "اختر السعة والمدة قبل تجهيز المناسبة", yachtSlug: "رحلة-يخت-56-قدم-ماجستي" },
    { path: ROUTES.wedding, title: "حفلة زفاف على يخت", subtitle: "قارن اليخوت المناسبة لعدد الضيوف", yachtSlug: "ايجار-يخت-ماجستي-88-قدم-جاكوزي" },
    { path: ROUTES.graduation, title: "حفلة تخرج على يخت", subtitle: "يخت خاص للمجموعة حسب السعة والمدة", yachtSlug: "يخت-64-قدم-ازيموت-إيطالي" },
    { path: ROUTES.anniversary, title: "ذكرى زواج على يخت", subtitle: "رحلة خاصة بتفاصيل مؤكدة قبل الانطلاق", yachtSlug: "يخت-64-قدم-هاترس-للإيجار" },
    { path: ROUTES.bachelor, title: "حفلة وداع العزوبية", subtitle: "حجز خاص وإضافات اختيارية عند الطلب", yachtSlug: "يخت-ماجستي-101-قدم-جاكوزي-للإيجار" },
    { path: ROUTES.genderReveal, title: "تحديد جنس المولود", subtitle: "ناقش متطلبات المناسبة واحصل على تأكيد", yachtSlug: "يخت-أزيموت-50-قدم-للإيجار" },
    { path: ROUTES.afternoonTea, title: "افترنون تي على يخت", subtitle: "اختر اليخت والوقت والمدة المناسبة", yachtSlug: "يخت-أوريكس-50-قدم-للإيجار" },
    { path: ROUTES.morning, title: "رحلة يخت صباحية", subtitle: "رحلة خاصة تبدأ من دبي مارينا", yachtSlug: "يخت-فيريتي-50-قدم-للإيجار" },
    { path: ROUTES.swimming, title: "سباحة على يخت", subtitle: "اطلب تأكيد تفاصيل النشاط قبل الحجز", yachtSlug: "يخت-95-قدم-دوريتتي-مع-جاكوزي" },
    { path: ROUTES.fishing, title: "رحلة صيد على يخت", subtitle: "راجع الخدمة والمتطلبات قبل التأكيد", yachtSlug: "تأجير-يخت-سنسيكر-90-قدم" },
  ];

  return map.map((item) => {
    const yacht = yachts.find((candidate) => candidate.slug === item.yachtSlug);
    return {
      title: item.title,
      subtitle: item.subtitle,
      image: yacht?.media[0].path ?? "/placeholder.svg",
      path: requireRouteRecord(item.path).path,
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
              ابدأ باختيار اليخت الخاص، ثم اطلب أي تجهيزات للمناسبة كإضافات اختيارية مؤكدة ومسعّرة بوضوح.
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
                      (e.target as HTMLImageElement).src = "/media/yacht-placeholder.svg";
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
