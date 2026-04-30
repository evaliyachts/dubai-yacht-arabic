import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

/**
 * Keyword-rich SEO content section for the homepage.
 * Covers all target two/three-word phrases for Dubai Yatch with proper
 * H2/H3 hierarchy, bold emphasis, and on-page internal links so search
 * engines (and AI search like ChatGPT, Perplexity, Gemini) can clearly
 * understand the topical relevance of the page.
 */
const SEOContentSection = () => (
  <section className="section-padding liquid-divider">
    <div className="container mx-auto px-4 max-w-5xl">
      <AnimatedSection className="text-center mb-10">
        <span className="liquid-pill inline-block">Yacht Rental Dubai</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
          Yacht Rental Dubai — Luxury Yacht Charter Dubai by Dubai Yatch
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Looking for a premium <strong>yacht rental Dubai</strong> experience?{" "}
          <strong>Dubai Yatch</strong> is your trusted destination for{" "}
          <strong>Dubai yacht rental</strong>, <strong>luxury yacht charter Dubai</strong>,
          and private <strong>yacht hire Dubai</strong> across Dubai Marina, JBR,
          Bluewaters, Palm Jumeirah, Atlantis, and Burj Al Arab.
        </p>
      </AnimatedSection>

      <AnimatedSection className="prose prose-invert max-w-none space-y-10">
        {/* Block 1 — rental / hire / charter cluster */}
        <div className="liquid-glass p-6 md:p-8">
          <h3 className="text-2xl font-display font-bold text-foreground mb-3">
            Yacht Rentals Dubai &amp; Yacht Hire Dubai
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Whether you call it a <strong>yacht rental Dubai</strong>,{" "}
            <strong>Dubai yacht rentals</strong>, <strong>yacht for rent Dubai</strong>,
            or <strong>yacht for rent in Dubai</strong>, our fleet is designed for
            unforgettable days at sea. We make it easy to{" "}
            <Link to="/yachts" className="text-primary hover:underline font-semibold">
              rent yacht in Dubai
            </Link>{" "}
            — from <strong>yachts for rent Dubai</strong> and{" "}
            <strong>yachts for rent in Dubai</strong> to{" "}
            <strong>rent yachts Dubai</strong> and{" "}
            <strong>rent yachts in Dubai</strong>. Looking instead to{" "}
            <strong>hire yacht in Dubai</strong>? Our <strong>Dubai yacht hire</strong>{" "}
            team handles everything: <strong>yacht hire Dubai</strong>,{" "}
            <strong>yacht for hire in Dubai</strong>, and end-to-end{" "}
            <strong>yacht charter Dubai</strong> with licensed captains and a
            hospitality-trained crew.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Prefer a full charter experience? We offer{" "}
            <strong>Dubai yacht charter</strong> packages, <strong>charter yacht Dubai</strong>{" "}
            cruises, and <strong>charter yacht in Dubai</strong> bookings for
            sightseeing, parties, and corporate days out. Every{" "}
            <strong>yacht for charter in Dubai</strong> is fully equipped with
            sound systems, swimming gear, soft drinks, towels, and safety equipment.
          </p>
        </div>

        {/* Block 2 — private + luxury cluster */}
        <div className="liquid-glass p-6 md:p-8">
          <h3 className="text-2xl font-display font-bold text-foreground mb-3">
            Private Yacht Rental Dubai &amp; Luxury Yacht Charter Dubai
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            For exclusive groups we specialise in <strong>private yacht rental Dubai</strong>,{" "}
            <strong>private yacht rentals Dubai</strong>, <strong>private yacht hire Dubai</strong>,
            and <strong>private yacht charter Dubai</strong>. Choose a{" "}
            <strong>luxury yacht rental Dubai</strong> or upgrade to one of our{" "}
            <strong>luxury yacht rentals Dubai</strong> superyachts for celebrations,
            VIP arrivals, and photoshoots.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            We are the go-to <strong>Dubai luxury yacht rental</strong> provider for
            <strong> luxury yacht hire Dubai</strong>, <strong>Dubai luxury yacht hire</strong>,
            <strong> luxury yacht charter Dubai</strong>, and{" "}
            <strong>Dubai luxury yacht charter</strong>. Browse a{" "}
            <strong>luxury yacht for rent Dubai</strong>,{" "}
            <strong>luxury yachts for rent Dubai</strong>,{" "}
            <strong>luxury yacht for rent in Dubai</strong>, or{" "}
            <strong>luxury yachts for rent in Dubai</strong> on our{" "}
            <Link to="/yachts" className="text-primary hover:underline font-semibold">
              fleet page
            </Link>
            . Want to <strong>rent luxury yacht Dubai</strong>,{" "}
            <strong>rent luxury yachts Dubai</strong>,{" "}
            <strong>rent luxury yacht in Dubai</strong>, or{" "}
            <strong>rent luxury yachts in Dubai</strong>? Our concierge team will
            <strong> charter luxury yacht Dubai</strong>,{" "}
            <strong>hire luxury yacht Dubai</strong>, and help you{" "}
            <strong>book luxury yacht Dubai</strong> or{" "}
            <strong>book luxury yacht in Dubai</strong> in minutes.
          </p>
        </div>

        {/* Block 3 — booking + trips cluster */}
        <div className="liquid-glass p-6 md:p-8">
          <h3 className="text-2xl font-display font-bold text-foreground mb-3">
            Book Yacht in Dubai — Easy Dubai Yacht Booking
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Ready to <strong>book yacht in Dubai</strong>? It takes less than a
            minute to <strong>book yacht Dubai</strong> with our team. Confirm your{" "}
            <strong>Dubai yacht booking</strong> by WhatsApp or phone — we handle{" "}
            <strong>Dubai yacht bookings</strong> 7 days a week, including{" "}
            <strong>Dubai luxury yacht bookings</strong> for VIPs, weddings, and
            private events.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Plan a memorable <strong>yacht trip Dubai</strong> or relaxed{" "}
            <strong>Dubai yacht trip</strong> across Dubai's most iconic skyline.
            We curate <strong>yacht trips in Dubai</strong> and{" "}
            <strong>Dubai yacht trips</strong> for sunsets, BBQ cruises, fishing,
            jet ski sessions, swimming stops, and birthday parties — see our{" "}
            <Link to="/services" className="text-primary hover:underline font-semibold">
              full yacht services
            </Link>{" "}
            and{" "}
            <Link to="/offers" className="text-primary hover:underline font-semibold">
              charter packages
            </Link>
            .
          </p>
        </div>

        {/* Block 4 — quick links */}
        <div className="liquid-glass-gold p-6 md:p-8 text-center">
          <h3 className="text-2xl font-display font-bold text-foreground mb-4">
            Explore Dubai Yatch
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Discover our full range of <strong>yacht rental Dubai</strong> services,
            curated <strong>luxury yacht charter Dubai</strong> experiences, and
            celebration packages built around your occasion.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/yachts" className="liquid-pill hover:scale-105 transition-transform">
              Yacht Rentals Dubai
            </Link>
            <Link to="/offers" className="liquid-pill hover:scale-105 transition-transform">
              Dubai Yacht Charter Packages
            </Link>
            <Link to="/services" className="liquid-pill hover:scale-105 transition-transform">
              Luxury Yacht Services
            </Link>
            <Link to="/occasions" className="liquid-pill hover:scale-105 transition-transform">
              Yacht Trips in Dubai
            </Link>
            <Link to="/contact" className="liquid-pill hover:scale-105 transition-transform">
              Book Yacht in Dubai
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default SEOContentSection;
