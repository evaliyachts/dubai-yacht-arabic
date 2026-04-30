import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { MapPin } from "lucide-react";
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
        <span className="liquid-pill inline-block">Routes</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
          Yacht Trips Dubai — Departure Points &amp; Routes
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Every <strong>yacht rental Dubai</strong> departs from Dubai Marina, with
          flexible <strong>Dubai yacht trip</strong> routes covering Dubai's most
          iconic landmarks for your <strong>luxury yacht charter Dubai</strong>.
        </p>
      </AnimatedSection>

      <ParallaxSection speed={0.15}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {routes.map((r) => (
            <div key={r.name} className="liquid-glass p-4 flex items-start gap-3">
              <div className="w-8 h-8 liquid-icon rounded-lg shrink-0">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
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
