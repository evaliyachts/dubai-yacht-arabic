import { Link } from "react-router-dom";
import { yachts } from "@/data/yachts";
import { YACHT_AR } from "@/data/yachts-ar";
import { keywordPages, eventPages } from "@/data/landingPages";
import { ROUTES } from "@/lib/constants";

const mainPages = [
  { path: ROUTES.home, label: "الرئيسية" },
  { path: ROUTES.yachts, label: "اليخوت" },
  { path: ROUTES.about, label: "من نحن" },
  { path: ROUTES.faq, label: "الأسئلة الشائعة" },
  { path: ROUTES.contact, label: "تواصل معنا" },
  { path: ROUTES.terms, label: "الشروط" },
  { path: ROUTES.privacy, label: "الخصوصية" },
];

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
            {mainPages.map((p) => (
              <li key={p.path}>
                <Link to={p.path} className="text-muted-foreground hover:text-primary transition-colors">{p.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display font-semibold text-foreground mb-3">صفحات الخدمات</h3>
          <ul className="space-y-2">
            {keywordPages.map((p) => (
              <li key={p.slug}>
                <Link to={p.slug} className="text-muted-foreground hover:text-primary transition-colors">{p.h1}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-1">
          <h3 className="font-display font-semibold text-foreground mb-3">المناسبات</h3>
          <ul className="space-y-2">
            {eventPages.map((p) => (
              <li key={p.slug}>
                <Link to={p.slug} className="text-muted-foreground hover:text-primary transition-colors">{p.h1}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-display font-semibold text-foreground mb-3">أسطول اليخوت ({yachts.length})</h3>
          <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-2">
            {yachts.map((y) => (
              <li key={y.slug}>
                <Link to={`/yachts/${y.slug}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {YACHT_AR[y.slug]?.name ?? y.name}
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
