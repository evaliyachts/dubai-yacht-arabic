import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import {
  AnimatedSection,
  StaggerContainer,
  staggerItemVariants,
} from "@/components/shared/AnimatedSection";
import { services, SERVICE_CATEGORIES } from "@/data/services";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

const Services = () => (
  <Layout>
    <SEOHead
      title="Yacht Services & Packages in Dubai | Dubai Yatch"
      description="Explore yacht services in Dubai — water sports, onboard dining, BBQ, fishing, jet ski, birthday & wedding packages, proposals, and more."
      path="/services"
      keywords="yacht services dubai, yacht packages dubai, jet ski dubai, yacht bbq dubai, yacht birthday party dubai, yacht proposal dubai"
    />

    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <span className="liquid-pill inline-block">Services</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mt-4 mb-4">
            Yacht Services & Packages
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Curated experiences, water sports, dining and celebration packages to
            elevate your Dubai Yatch charter.
          </p>
        </AnimatedSection>

        {SERVICE_CATEGORIES.map((cat) => {
          const items = services.filter((s) => s.category === cat.key);
          if (items.length === 0) return null;
          return (
            <section key={cat.key} className="mb-16">
              <AnimatedSection className="mb-6">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  {cat.label}
                </h2>
              </AnimatedSection>

              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((s) => (
                  <motion.div
                    key={s.slug}
                    variants={staggerItemVariants}
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                    className="liquid-glass overflow-hidden group"
                  >
                    <Link to={`/services/${s.slug}`} className="block">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={s.cover_image}
                          alt={`${s.title} - yacht service in Dubai`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <span className="absolute top-4 left-4 liquid-pill capitalize">
                          {s.category}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                          {s.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                          {s.description}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                          View details <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </StaggerContainer>
            </section>
          );
        })}
      </div>
    </div>
  </Layout>
);

export default Services;
