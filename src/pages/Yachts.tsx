import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import YachtCard from "@/components/shared/YachtCard";
import { AnimatedSection, StaggerContainer } from "@/components/shared/AnimatedSection";
import { yachts, Yacht } from "@/data/yachts";
import { SlidersHorizontal } from "lucide-react";

const Yachts = () => {
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("recommended");

  const filtered = useMemo(() => {
    let result = [...yachts];
    if (typeFilter !== "All") result = result.filter((y) => y.type === typeFilter);
    if (sortBy === "price-low") result.sort((a, b) => a.price_per_hour_from_aed - b.price_per_hour_from_aed);
    if (sortBy === "price-high") result.sort((a, b) => b.price_per_hour_from_aed - a.price_per_hour_from_aed);
    if (sortBy === "guests") result.sort((a, b) => b.max_guests - a.max_guests);
    if (sortBy === "length") result.sort((a, b) => b.length_ft - a.length_ft);
    return result;
  }, [typeFilter, sortBy]);

  return (
    <Layout>
      <SEOHead
        title="Yachts for Rent in Dubai | Yacht Rental Dubai Fleet — Dubai Yatch"
        description="Yacht rental Dubai fleet — standard, luxury yacht charter Dubai, and superyacht hire. Compare yachts for rent in Dubai and book your Dubai yacht charter."
        path="/yachts"
        keywords="yacht rental dubai, yachts for rent in dubai, yacht for rent dubai, rent yacht in dubai, yacht hire dubai, dubai yacht charter, luxury yacht rental dubai, luxury yacht charter dubai, book yacht dubai, dubai yacht booking"
      />

      <div className="pt-28 pb-10">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4">
              Yachts for Rent in Dubai — Yacht Rental Dubai Fleet
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find the perfect <strong>yacht for rent in Dubai</strong>. Compare our{" "}
              <strong>Dubai yacht rental</strong> fleet, filter by{" "}
              <strong>luxury yacht charter Dubai</strong> type, sort by price, and{" "}
              <strong>book yacht in Dubai</strong> instantly with Dubai Yatch.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              {["All", "Standard", "Luxury", "Superyacht"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    typeFilter === t ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 text-sm rounded-lg bg-secondary text-foreground border border-border"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="guests">Most Guests</option>
              <option value="length">Longest</option>
            </select>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((yacht, i) => (
              <YachtCard key={yacht.slug} yacht={yacht} index={i} />
            ))}
          </StaggerContainer>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">No yachts match your filters.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Yachts;
