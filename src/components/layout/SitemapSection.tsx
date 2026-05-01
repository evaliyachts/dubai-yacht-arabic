import { Link } from "react-router-dom";
import { yachts } from "@/data/yachts";
import { services } from "@/data/services";
import { occasions } from "@/data/occasions";
import { offers } from "@/data/offers";

/**
 * Full HTML sitemap rendered above the footer on every page.
 * Improves internal linking, crawlability, and topical SEO coverage
 * for "yacht rental Dubai", "luxury yacht charter Dubai", etc.
 */
const SitemapSection = () => {
  return (
    <section
      aria-label="Sitemap"
      className="border-t border-border/30 bg-background/50 py-12"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          Dubai Yatch Sitemap — Yacht Rental Dubai
        </h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-3xl">
          Explore every page on Dubai Yatch — from{" "}
          <strong>yacht rental Dubai</strong> and{" "}
          <strong>luxury yacht charter Dubai</strong> to{" "}
          <strong>Dubai yacht booking</strong> and yacht trips in Dubai.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
          {/* Main pages */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3">
              Main Pages
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home — Yacht Rental Dubai</Link></li>
              <li><Link to="/yachts" className="text-muted-foreground hover:text-primary transition-colors">Yachts — Dubai Yacht Rentals</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Services — Yacht Charter Dubai</Link></li>
              <li><Link to="/offers" className="text-muted-foreground hover:text-primary transition-colors">Offers — Dubai Yacht Charter Packages</Link></li>
              <li><Link to="/occasions" className="text-muted-foreground hover:text-primary transition-colors">Occasions — Yacht Trips Dubai</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Dubai Yatch</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ — Yacht Rental Dubai</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact — Book Yacht in Dubai</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link></li>
            </ul>
          </div>

          {/* Yachts */}
          <div className="md:col-span-2">
            <h3 className="font-display font-semibold text-foreground mb-3">
              Yacht Rentals Dubai ({yachts.length})
            </h3>
            <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-2">
              {yachts.map((y) => (
                <li key={y.slug}>
                  <Link
                    to={`/yachts/${y.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {y.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3">
              Yacht Services
            </h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offers + Occasions */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3">
              Charter Packages
            </h3>
            <ul className="space-y-2 mb-6">
              {offers.map((o) => (
                <li key={o.slug}>
                  <Link
                    to={`/offers#${o.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {o.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-display font-semibold text-foreground mb-3">
              Yacht Trips Dubai
            </h3>
            <ul className="space-y-2">
              {occasions.map((o) => (
                <li key={o.slug}>
                  <Link
                    to={`/occasions#${o.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {o.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SitemapSection;
