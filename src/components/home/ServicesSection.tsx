import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { cn } from "@/lib/utils";

const SERVICES = [
  { title: "Birthday Party", url: "/yachts", image: "https://evali.fra1.cdn.digitaloceanspaces.com/birthday-party/IMG-20250404-WA0001-1.webp" },
  { title: "Wedding Anniversary Celebration", url: "/yachts", image: "https://evali.fra1.cdn.digitaloceanspaces.com/wedding-anniversary-celebration/IMG-20250404-WA0002.webp" },
  { title: "Engagement Party", url: "/occasions", image: "https://evali.fra1.cdn.digitaloceanspaces.com/engagement-party/IMG-20250405-WA0033.webp" },
  { title: "Marriage Proposal", url: "/occasions", image: "https://evali.fra1.cdn.digitaloceanspaces.com/marriage-proposal-part/IMG-20250405-WA0004-1.webp" },
  { title: "Graduation Party", url: "/yachts", image: "https://evali.fra1.cdn.digitaloceanspaces.com/graduation-party/IMG-20250405-WA0020-1-1.webp" },
  { title: "Wedding Parties", url: "/occasions", image: "https://evali.fra1.cdn.digitaloceanspaces.com/wedding-celebration-on%20yacht-in-dubai/IMG-20250405-WA0036.webp" },
  { title: "Jet Ski", url: "/yachts", image: "https://evali.fra1.cdn.digitaloceanspaces.com/jet-ski-rental/IMG_7681-1.jpg" },
  { title: "Donut Ride", url: "/yachts", image: "https://evali.fra1.cdn.digitaloceanspaces.com/donut-ride-adventure/photo_2025-04-05_12-30-39-1.webp" },
  { title: "Banana Boat Ride", url: "/yachts", image: "https://evali.fra1.cdn.digitaloceanspaces.com/banana-boat-ride/photo_2025-04-05_12-29-24-1.webp" },
  { title: "Barbecue on the Yacht", url: "/yachts", image: "https://evali.fra1.cdn.digitaloceanspaces.com/bbq-experience/IMG_8252-1.webp" },
  { title: "Swimming", url: "/yachts", image: "https://evali.fra1.cdn.digitaloceanspaces.com/swimming-experience-yacht-trip/IMG_7518-1.webp" },
  { title: "Food Menu", url: "/yachts", image: "https://evali.fra1.cdn.digitaloceanspaces.com/food-menu/photo_2025-04-02_19-40-12.webp" },
  { title: "Fishing", url: "/yachts", image: "https://evali.fra1.cdn.digitaloceanspaces.com/fishing-trips/IMG_8214-1.webp" },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const lockRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const isInView = () => {
      const el = sectionRef.current;
      if (!el) return false;
      const r = el.getBoundingClientRect();
      // Section is "engaged" when its sticky stage roughly fills the viewport
      return r.top <= 1 && r.bottom >= window.innerHeight - 1;
    };

    const step = (dir: 1 | -1) => {
      setActive((prev) => {
        const next = prev + dir;
        if (next < 0 || next > SERVICES.length - 1) return prev;
        return next;
      });
    };

    const onWheel = (e: WheelEvent) => {
      if (!isInView()) return;
      const dir: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      const atStart = active === 0 && dir === -1;
      const atEnd = active === SERVICES.length - 1 && dir === 1;
      if (atStart || atEnd) return; // let page scroll past
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
      const atEnd = active === SERVICES.length - 1 && dir === 1;
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
  }, [active]);

  return (
    <section ref={sectionRef} className="liquid-divider relative" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen w-full flex flex-col">
        <div className="container mx-auto px-4 pt-16">
          <AnimatedSection className="text-center mb-8">
            <span className="liquid-pill inline-block">Our Services</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
              Experiences We Offer
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From private charters to grand celebrations, discover the perfect
              yacht experience tailored to your occasion.
            </p>
          </AnimatedSection>
        </div>

        <div className="flex-1 flex items-center justify-center [perspective:1200px]">
          <div className="relative w-[88vw] max-w-md h-[55vh] max-h-[480px]">
            {SERVICES.map((service, index) => {
              const offset = index - active;
              const isActive = offset === 0;
              const isPast = offset < 0;
              // Stack: active in front; upcoming behind with slight Y/scale offsets
              const translateY = isPast ? -120 : offset * 12;
              const translateZ = isPast ? 0 : -offset * 30;
              const rotate = isPast ? -8 : 0;
              const scale = isPast ? 0.9 : 1 - Math.min(offset, 3) * 0.04;
              const opacity = isPast ? 0 : offset > 4 ? 0 : 1;
              const z = SERVICES.length - Math.abs(offset);

              return (
                <div
                  key={service.title}
                  className={cn(
                    "absolute inset-0 rounded-3xl overflow-hidden transition-all duration-500 ease-out will-change-transform",
                    "border border-border/40 shadow-[0_20px_60px_-20px_hsl(var(--background)/0.8)]"
                  )}
                  style={{
                    transform: `translateY(${translateY}px) translateZ(${translateZ}px) rotate(${rotate}deg) scale(${scale})`,
                    opacity,
                    zIndex: z,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <Link to={service.url} className="block w-full h-full relative group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-xl font-display font-bold text-foreground">
                        {service.title}
                      </h3>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress dots */}
        <div className="pb-8 flex justify-center gap-1.5">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
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
