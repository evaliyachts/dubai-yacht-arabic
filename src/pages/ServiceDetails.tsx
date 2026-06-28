import { useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { getServiceBySlug, services } from "@/data/services";
import {
  getServiceCategoryLabelAr,
  getServiceDescriptionAr,
  getInternalServiceSlug,
  getServicePathAr,
  SERVICE_INDEX_PATH_AR,
  getServiceTitleAr,
} from "@/data/services-ar";
import { PLACEHOLDER_IMAGE, getWhatsAppLink, getPhoneLink } from "@/lib/constants";
import { ArrowLeft, MessageCircle, Phone, ChevronLeft } from "lucide-react";
import NotFound from "./NotFound";

const ServiceDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const internalSlug = slug ? getInternalServiceSlug(slug) : undefined;
  const service = internalSlug ? getServiceBySlug(internalSlug) : undefined;
  const [activeImg, setActiveImg] = useState(0);

  if (!service) return <NotFound />;

  const canonicalPath = getServicePathAr(service.slug);
  let currentPath = location.pathname;
  try {
    currentPath = decodeURIComponent(location.pathname);
  } catch {
    currentPath = location.pathname;
  }

  if (currentPath !== canonicalPath) {
    return <Navigate to={canonicalPath} replace />;
  }

  const gallery = service.gallery.length > 0 ? service.gallery : [service.cover_image];
  const related = services.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3);
  const titleAr = getServiceTitleAr(service.slug, service.title);
  const descriptionAr = getServiceDescriptionAr(service.slug, service.description);
  const categoryAr = getServiceCategoryLabelAr(service.category);

  return (
    <Layout>
      <SEOHead
        title={`${titleAr} | خدمات تأجير اليخوت في دبي`}
        description={descriptionAr.slice(0, 155)}
        path={canonicalPath}
        keywords={`${titleAr} دبي، خدمات يخوت دبي، تأجير يخت في دبي، ${categoryAr}`}
      />

      <div className="pt-28 pb-20" dir="rtl">
        <div className="container mx-auto px-4">
          <AnimatedSection className="mb-6">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-foreground">الرئيسية</Link>
              <ChevronLeft className="w-3.5 h-3.5" />
              <Link to={SERVICE_INDEX_PATH_AR} className="hover:text-foreground">الخدمات</Link>
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="text-foreground">{titleAr}</span>
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
                    alt={`${titleAr} على يخت في دبي`}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                    }}
                  />
                  <span className="absolute top-4 right-4 liquid-pill">
                    {categoryAr}
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
                      aria-label={`عرض الصورة ${i + 1}`}
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
              <span className="liquid-pill inline-block">{categoryAr}</span>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-4 mb-4">
                {titleAr}
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {descriptionAr}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={getWhatsAppLink(`مرحباً، أرغب في الاستفسار عن خدمة ${titleAr}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 liquid-btn text-green-400 font-medium"
                >
                  <MessageCircle className="w-4 h-4" /> استفسار واتساب
                </a>
                <a
                  href={getPhoneLink()}
                  className="inline-flex items-center gap-2 px-6 py-3 liquid-btn-gold text-primary font-medium"
                >
                  <Phone className="w-4 h-4" /> اتصل الآن
                </a>
                <Link
                  to={SERVICE_INDEX_PATH_AR}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  كل الخدمات <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {related.length > 0 && (
            <section className="mt-16">
              <AnimatedSection className="mb-6">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  قد يعجبك أيضاً
                </h2>
              </AnimatedSection>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((s) => (
                  <Link
                    key={s.slug}
                    to={getServicePathAr(s.slug)}
                    className="liquid-glass overflow-hidden group block"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={s.cover_image}
                        alt={`${getServiceTitleAr(s.slug, s.title)} - خدمة يخت في دبي`}
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
                        {getServiceTitleAr(s.slug, s.title)}
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
