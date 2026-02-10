import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
} from "@/components/ui/animated-cards-stack";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

const SERVICES = [
  { title: "Private Yacht Charter", url: "/yachts", image: PLACEHOLDER_IMAGE },
  { title: "Sunset Cruise", url: "/yachts", image: PLACEHOLDER_IMAGE },
  { title: "Birthday Party", url: "/occasions", image: PLACEHOLDER_IMAGE },
  { title: "Corporate Events", url: "/occasions", image: PLACEHOLDER_IMAGE },
  { title: "Fishing Trip", url: "/yachts", image: PLACEHOLDER_IMAGE },
  { title: "Wedding Celebration", url: "/occasions", image: PLACEHOLDER_IMAGE },
  { title: "Overnight Stay", url: "/yachts", image: PLACEHOLDER_IMAGE },
  { title: "Water Sports", url: "/yachts", image: PLACEHOLDER_IMAGE },
  { title: "Dubai Marina Tour", url: "/yachts", image: PLACEHOLDER_IMAGE },
  { title: "Palm Jumeirah Cruise", url: "/yachts", image: PLACEHOLDER_IMAGE },
  { title: "Atlantis View Trip", url: "/yachts", image: PLACEHOLDER_IMAGE },
  { title: "Burj Al Arab Cruise", url: "/yachts", image: PLACEHOLDER_IMAGE },
  { title: "Proposal Cruise", url: "/occasions", image: PLACEHOLDER_IMAGE },
  { title: "Anniversary Dinner", url: "/occasions", image: PLACEHOLDER_IMAGE },
  { title: "New Year's Eve Party", url: "/occasions", image: PLACEHOLDER_IMAGE },
  { title: "Graduation Party", url: "/occasions", image: PLACEHOLDER_IMAGE },
  { title: "Photography Tour", url: "/yachts", image: PLACEHOLDER_IMAGE },
  { title: "Family Fun Day", url: "/yachts", image: PLACEHOLDER_IMAGE },
  { title: "VIP Experience", url: "/yachts", image: PLACEHOLDER_IMAGE },
];

const ServicesSection = () => {
  return (
    <section className="section-padding liquid-divider">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <span className="liquid-pill inline-block">Our Services</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
            Experiences We Offer
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From private charters to grand celebrations, discover the perfect
            yacht experience tailored to your occasion.
          </p>
        </AnimatedSection>

        <ContainerScroll className="h-[600vh]">
          <CardsContainer className="h-screen">
            <div className="relative h-[420px] w-full max-w-sm md:max-w-md">
              {SERVICES.map((service, index) => (
                <CardTransformed
                  key={service.title}
                  index={index}
                  arrayLength={SERVICES.length}
                  variant="dark"
                  className="!bg-transparent !border-0 !p-0 rounded-3xl overflow-hidden"
                  incrementY={8}
                  incrementZ={5}
                >
                  <Link to={service.url} className="block w-full h-full relative group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-lg font-display font-bold text-foreground">
                        {service.title}
                      </h3>
                    </div>
                  </Link>
                </CardTransformed>
              ))}
            </div>
          </CardsContainer>
        </ContainerScroll>
      </div>
    </section>
  );
};

export default ServicesSection;
