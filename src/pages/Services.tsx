import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection, StaggerContainer, staggerItemVariants } from "@/components/shared/AnimatedSection";
import { EVENT_CATEGORY_LABELS, eventPages } from "@/data/eventPages";
import type { EventServiceCategory } from "@/data/landingPages";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";
import { requireRouteRecord } from "@/seo/route-manifest";
import { SERVICE_INDEX_PATH_AR } from "@/data/services-ar";
import { breadcrumbEntity, organizationReference } from "@/seo/entities";

const route = requireRouteRecord(SERVICE_INDEX_PATH_AR);
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: route.h1,
    serviceType: "دليل خدمات اليخوت الخاصة في دبي",
    description: route.description,
    provider: organizationReference(),
  },
  breadcrumbEntity(route),
];
const categoryOrder: EventServiceCategory[] = ["celebration", "private experience", "hospitality", "water activity"];

const Services = () => (
  <Layout>
    <SEOHead route={route} jsonLd={jsonLd} />

    <div className="pt-28 pb-20" dir="rtl">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-14">
          <span className="liquid-pill inline-block">الخدمات</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mt-4 mb-4">{route.h1}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-8">
            اختر من 18 صفحة خدمة مملوكة لمسارات عربية مباشرة. يبدأ كل طلب باختيار اليخت والمدة،
            بينما تُناقش الضيافة والتنسيق والأنشطة كخيارات منفصلة تحتاج إلى تأكيد.
          </p>
        </AnimatedSection>

        {categoryOrder.map((category) => {
          const pages = eventPages.filter((page) => page.category === category);
          const categoryId = `service-category-${category.replace(/\s+/g, "-")}`;
          return (
            <section key={category} className="mb-16" aria-labelledby={categoryId}>
              <AnimatedSection className="mb-6">
                <h2 id={categoryId} className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  {EVENT_CATEGORY_LABELS[category]}
                </h2>
              </AnimatedSection>

              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {pages.map((page) => {
                  const pageRoute = requireRouteRecord(page.slug);
                  return (
                    <motion.article key={page.slug} variants={staggerItemVariants} whileHover={{ y: -6, transition: { duration: 0.3 } }} className="liquid-glass overflow-hidden group">
                      <Link to={pageRoute.path} className="block h-full">
                        <div className="relative h-48 overflow-hidden">
                          <img src={PLACEHOLDER_IMAGE} alt="صورة محايدة مؤقتة بانتظار اعتماد وسائط الخدمة" width={1200} height={1200} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="w-full h-full object-cover opacity-60" loading="lazy" decoding="async" />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                          <span className="absolute top-4 right-4 liquid-pill">{EVENT_CATEGORY_LABELS[category]}</span>
                        </div>
                        <div className="p-5">
                          <h3 className="text-xl font-display font-semibold text-foreground mb-2">{pageRoute.h1}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-6">{page.intro}</p>
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                            عرض التفاصيل <ArrowLeft className="w-4 h-4" />
                          </span>
                        </div>
                      </Link>
                    </motion.article>
                  );
                })}
              </StaggerContainer>
            </section>
          );
        })}
      </div>
    </div>
  </Layout>
);

export default Services;
