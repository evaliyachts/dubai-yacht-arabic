import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Anchor, Heart, Shield, Users } from "lucide-react";
import { yachts } from "@/data/yachts";

const values = [
  { icon: Anchor, title: "Premium Fleet", desc: "Every yacht in our fleet is maintained to the highest standards of luxury and safety." },
  { icon: Heart, title: "Guest-First Service", desc: "We go above and beyond to ensure every charter exceeds expectations." },
  { icon: Shield, title: "Licensed & Insured", desc: "Full maritime licensing, insurance, and safety compliance on every voyage." },
  { icon: Users, title: "Expert Crew", desc: "Professionally trained captains and hospitality crew with years of experience." },
];

const About = () => (
  <Layout>
    <SEOHead
      title="About Dubai Yatch | Premium Yacht Charter Company in Dubai"
      description="Learn about Dubai Yatch — Dubai's premier luxury yacht rental company. Our story, values, and commitment to exceptional experiences."
      path="/about"
    />

    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
            About Dubai Yatch
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dubai's premier luxury yacht rental company, delivering unforgettable experiences on the Arabian Gulf since day one.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <AnimatedSection direction="left">
            <div className="rounded-2xl overflow-hidden h-80">
              <img src={yachts[0]?.images[0]} alt="Dubai Yatch fleet" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right" className="flex flex-col justify-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded with a passion for the sea and a commitment to luxury, Dubai Yatch has grown into one of Dubai's most trusted yacht charter companies. We believe every journey on the water should be extraordinary.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From intimate sunset cruises to grand celebrations, our curated fleet and professional crew ensure a seamless, premium experience every time. Based in Dubai Marina, we serve guests from around the world.
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-foreground mb-4">Our Values</h2>
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
