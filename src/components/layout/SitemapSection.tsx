import { Link } from "react-router-dom";
import { SITEMAP_SECTION_TARGETS } from "@/seo/route-manifest";

const mainLabels: Record<string, string> = {
  home: "الرئيسية",
  "yacht-index": "اليخوت",
  about: "من نحن",
  faq: "الأسئلة الشائعة",
  contact: "تواصل معنا",
  terms: "الشروط",
  privacy: "الخصوصية",
};

const SitemapSection = () => (
  <section
    aria-label="خريطة الموقع"
    className="border-t border-border/30 bg-background/50 py-12"
    dir="rtl"
  >
    <div className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
        خريطة موقع يخوت دبي
      </h2>
      <p className="text-sm text-muted-foreground mb-8 max-w-3xl">
        استعرض جميع صفحات يخوت دبي — من <strong>تأجير يخت في دبي</strong> و
        <strong> حجز يخت في دبي</strong> إلى صفحات المناسبات المختلفة.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
        <div>
          <h3 className="font-display font-semibold text-foreground mb-3">الصفحات الرئيسية</h3>
          <ul className="space-y-2">
            {SITEMAP_SECTION_TARGETS.main.map((route) => (
              <li key={route.path}>
                <Link to={route.path} className="text-muted-foreground hover:text-primary transition-colors">{mainLabels[route.id]}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display font-semibold text-foreground mb-3">صفحات الخدمات</h3>
          <ul className="space-y-2">
            {SITEMAP_SECTION_TARGETS.keywords.map((route) => (
              <li key={route.path}>
                <Link to={route.path} className="text-muted-foreground hover:text-primary transition-colors">{route.h1}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-1">
          <h3 className="font-display font-semibold text-foreground mb-3">المناسبات</h3>
          <ul className="space-y-2">
            {SITEMAP_SECTION_TARGETS.events.map((route) => (
              <li key={route.path}>
                <Link to={route.path} className="text-muted-foreground hover:text-primary transition-colors">{route.h1}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-display font-semibold text-foreground mb-3">أسطول اليخوت ({SITEMAP_SECTION_TARGETS.yachts.length})</h3>
          <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-2">
            {SITEMAP_SECTION_TARGETS.yachts.map((route) => (
              <li key={route.path}>
                <Link to={route.path} className="text-muted-foreground hover:text-primary transition-colors">
                  {route.h1}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default SitemapSection;
