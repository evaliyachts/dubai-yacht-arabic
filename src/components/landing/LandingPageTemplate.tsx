import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/shared/SEOHead";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, MessageCircle, Phone, Clock, Map, Tag } from "lucide-react";
import { BRAND_NAME, DOMAIN, getPhoneLink, getWhatsAppLink, ROUTES } from "@/lib/constants";
import type { LandingPage } from "@/data/landingPages";
import { canonicalUrlForPath, requireRouteRecord } from "@/seo/route-manifest";
import VerifiedYachtSelection from "@/components/landing/VerifiedYachtSelection";

interface LandingPageTemplateProps {
  page: LandingPage;
}

const LandingPageTemplate = ({ page }: LandingPageTemplateProps) => {
  const route = requireRouteRecord(page.slug);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: route.h1,
      provider: {
        "@type": "Organization",
        name: BRAND_NAME,
        url: `${DOMAIN}/`,
        telephone: "+971504641020",
      },
      areaServed: { "@type": "City", name: "Dubai" },
      serviceType: page.serviceType,
      description: route.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: DOMAIN + "/" },
        { "@type": "ListItem", position: 2, name: route.h1, item: canonicalUrlForPath(route.path) },
      ],
    },
  ];

  return (
    <Layout>
      <SEOHead route={route} jsonLd={jsonLd} image={page.image} />

      <article className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Hero */}
          <AnimatedSection className="text-center mb-12">
            <span className="liquid-pill inline-block mb-4">{page.pill}</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-5 leading-tight">
              {route.h1}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
              {page.intro}
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-7">
              <a
                href={getWhatsAppLink(`مرحباً، أرغب في الاستفسار عن: ${route.h1}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3 liquid-btn-primary text-base"
              >
                <MessageCircle className="w-5 h-5" /> احجز عبر واتساب
              </a>
              <a
                href={getPhoneLink()}
                className="inline-flex items-center gap-2 px-7 py-3 liquid-btn-gold text-primary"
              >
                <Phone className="w-5 h-5" /> اتصل الآن
              </a>
              <Link
                to={requireRouteRecord(ROUTES.yachts).path}
                className="inline-flex items-center gap-2 px-7 py-3 liquid-btn text-foreground"
              >
                شاهد اليخوت
              </Link>
            </div>
          </AnimatedSection>

          {/* Hero image */}
          {page.image && (
            <AnimatedSection className="mb-12">
              <div className="rounded-3xl overflow-hidden liquid-glass">
                <img
                  src={page.image}
                  alt={route.h1}
                  className="w-full h-[40vh] md:h-[55vh] object-cover"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
              </div>
            </AnimatedSection>
          )}

          {page.directAnswer && (
            <AnimatedSection className="mb-10">
              <section className="liquid-glass-gold p-6 md:p-8" aria-labelledby="direct-answer-heading">
                <h2 id="direct-answer-heading" className="text-2xl font-display font-bold text-foreground mb-4">
                  الجواب المباشر
                </h2>
                <p className="text-foreground/90 leading-8 text-lg">{page.directAnswer}</p>
              </section>
            </AnimatedSection>
          )}

          {/* Highlights */}
          <AnimatedSection className="mb-10">
            <div className="liquid-glass p-6 md:p-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-5">
                {page.highlightsTitle ?? "ما يشمله الحجز"}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {page.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Decoration / add-ons */}
          {page.decoration && page.decoration.length > 0 && (
            <AnimatedSection className="mb-10">
              <div className="liquid-glass-gold p-6 md:p-8">
                <h2 className="text-2xl font-display font-bold text-foreground mb-5">
                  خيارات الديكور والإضافات
                </h2>
                <div className="flex flex-wrap gap-3">
                  {page.decoration.map((d) => (
                    <span key={d} className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-secondary/40 text-sm text-foreground border border-border/40">
                      <Tag className="w-3.5 h-3.5 text-primary" /> {d}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {page.contentSections?.map((section) => (
            <AnimatedSection className="mb-10" key={section.heading}>
              <section className="liquid-glass p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                  {section.heading}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-8">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                {section.points && (
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {section.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-muted-foreground">
                        <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.links && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    {section.links.map((link) => {
                      const linkedRoute = requireRouteRecord(link.path);
                      return <Link key={linkedRoute.path} to={linkedRoute.path} className="liquid-pill hover:scale-105 transition-transform">{link.label}</Link>;
                    })}
                  </div>
                )}
              </section>
            </AnimatedSection>
          ))}

          {page.featuredYachtSlugs && (
            <AnimatedSection>
              <VerifiedYachtSelection slugs={page.featuredYachtSlugs} />
            </AnimatedSection>
          )}

          {/* Meta info */}
          {(page.duration || page.route || page.pricesNote) && (
            <AnimatedSection className="mb-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {page.duration && (
                  <div className="liquid-glass p-5">
                    <Clock className="w-5 h-5 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">المدة المقترحة</p>
                    <p className="text-sm font-semibold text-foreground">{page.duration}</p>
                  </div>
                )}
                {page.route && (
                  <div className="liquid-glass p-5">
                    <Map className="w-5 h-5 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">المسار</p>
                    <p className="text-sm font-semibold text-foreground">{page.route}</p>
                  </div>
                )}
                {page.pricesNote && (
                  <div className="liquid-glass p-5">
                    <Tag className="w-5 h-5 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground mb-1">الأسعار</p>
                    <p className="text-sm font-semibold text-foreground">{page.pricesNote}</p>
                  </div>
                )}
              </div>
            </AnimatedSection>
          )}

          {/* FAQs */}
          <AnimatedSection className="mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-5">
              أسئلة شائعة
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {page.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`f-${i}`} className="liquid-glass px-6 border-0">
                  <AccordionTrigger className="text-right text-foreground font-display font-semibold text-base hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm pb-5 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>

          {/* Related links */}
          <AnimatedSection className="mb-12">
            <div className="liquid-glass-gold p-6 md:p-8 text-center">
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">صفحات ذات صلة</h2>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {page.related.map((r) => (
                  <Link key={r.path} to={requireRouteRecord(r.path).path} className="liquid-pill hover:scale-105 transition-transform">{r.label}</Link>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection>
            <div className="liquid-glass p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
                جاهز للحجز؟
              </h2>
              <p className="text-muted-foreground mb-6">
                أرسل التاريخ والوقت والمدة وعدد الضيوف للحصول على خيارات مناسبة وعرض واضح قبل التأكيد.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={getWhatsAppLink(`مرحباً، أرغب في حجز: ${route.h1}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 liquid-btn-primary"
                >
                  <MessageCircle className="w-5 h-5" /> احجز عبر واتساب
                </a>
                <a
                  href={getPhoneLink()}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 liquid-btn-gold text-primary"
                >
                  <Phone className="w-5 h-5" /> اتصل الآن
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </article>
    </Layout>
  );
};

export default LandingPageTemplate;
