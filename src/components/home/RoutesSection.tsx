import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MapPin, Navigation } from "lucide-react";
import { ParallaxSection } from "@/components/shared/AnimatedSection";

const routes = [
  { name: "Dubai Marina", note: "Primary departure point" },
  { name: "JBR & Bluewaters", note: "Ain Dubai views" },
  { name: "Palm Jumeirah", note: "Iconic palm-shaped island" },
  { name: "Atlantis", note: "Waterpark & resort views" },
  { name: "Burj Al Arab", note: "Sail-shaped icon" },
  { name: "Dubai Harbour", note: "Modern marina district" },
];

const RoutesSection = () => (
  <section className="section-padding">
    <div className="container mx-auto px-4">
      <AnimatedSection className="text-center mb-14">
        <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase">Routes</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-2 mb-4">
          Where Do Yachts Depart From in Dubai?
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          All our yachts depart from Dubai Marina with flexible routes covering Dubai's most iconic landmarks. Routes can be customized based on your preferences and charter duration.
        </p>
      </AnimatedSection>

      <ParallaxSection speed={0.15}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {routes.map((r) => (
            <div key={r.name} className="glass-card p-4 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.note}</p>
              </div>
            </div>
          ))}
        </div>
      </ParallaxSection>
    </div>
  </section>
);

export default RoutesSection;
