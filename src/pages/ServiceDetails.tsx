import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getServiceBySlug, services } from "@/data/services";
import { PLACEHOLDER_IMAGE, getWhatsAppLink, getPhoneLink } from "@/lib/constants";
import { ArrowLeft, MessageCircle, Phone, ChevronRight } from "lucide-react";
import NotFound from "./NotFound";

const ServiceDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const [activeImg, setActiveImg] = useState(0);

  if (!service) return <NotFound />;

  const gallery = service.gallery.length > 0 ? service.gallery : [service.cover_image];
  const related = services.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3);

  return (
    <Layout>
      <SEOHead
        title={`${service.title} - Yacht Service in Dubai | Dubai Yatch`}
        description={service.description.slice(0, 155)}
        path={`/services/${service.slug}`}
        keywords={`${service.title} dubai, yacht ${service.category} dubai, dubai yatch ${service.title}`}
      />

      <div className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <AnimatedSection className="mb-6">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/services" className="hover:text-foreground">Services</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">{service.title}</span>
            </nav>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <AnimatedSection>
              <div className="liquid-glass overflow-hidden">
                <div className="relative h-[420px]">
                  <motion.img
                    key={activeImg}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    src={gallery[activeImg]}
                    alt={`${service.title} on a Dubai Yatch charter`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                    }}
                  />
                  <span className="absolute top-4 left-4 liquid-pill capitalize">
                    {service.category}
                  </span>
                </div>
              </div>
              {gallery.length > 1 && (
                <div className="grid grid-cols-5 gap-2 mt-3">
                  {gallery.map((img, i) => (
                    <button
                      key={img + i}
                      onClick={() => setActiveImg(i)}
                      className={`relative h-16 rounded-lg overflow-hidden border transition-all ${
                        i === activeImg ? "border-primary scale-95" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </AnimatedSection>

            <AnimatedSection>
              <span className="liquid-pill inline-block capitalize">{service.category}</span>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
                {service.title}
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={getWhatsAppLink(`Hi Dubai Yatch, I'm interested in the ${service.title} service. Please share details.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 liquid-btn text-green-400 font-medium"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Inquiry
                </a>
                <a
                  href={getPhoneLink()}
                  className="inline-flex items-center gap-2 px-6 py-3 liquid-btn-gold text-primary font-medium"
                >
                  <Phone className="w-4 h-4" /> Call Now
                </a>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4" /> All services
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {related.length > 0 && (
            <section className="mt-16">
              <AnimatedSection className="mb-6">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  You may also like
                </h2>
              </AnimatedSection>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="liquid-glass overflow-hidden group block"
                  >
                    <div className="relative h-48 overflow-hidden">
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
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-display font-semibold text-foreground">
                        {s.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetails;
