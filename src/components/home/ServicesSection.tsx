import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
} from "@/components/ui/animated-cards-stack";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

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
                      referrerPolicy="no-referrer"
                      
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
