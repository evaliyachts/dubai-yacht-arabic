import { Link } from "react-router-dom";
import { MessageCircle, Phone, Check, Clock, Globe } from "lucide-react";
import { BRAND_NAME, ENGLISH_SITE_URL, getWhatsAppLink, getPhoneLink, PHONE_DISPLAY, ROUTES } from "@/lib/constants";
import { NAVIGATION_TARGETS, requireRouteRecord } from "@/seo/route-manifest";

const Footer = () => (
  <footer className="liquid-divider pt-16 pb-8 border-t border-border/30" dir="rtl">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img
              src="/favicon.png"
              alt={BRAND_NAME}
              className="h-9 w-9 rounded-md"
              onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
            />
            <span className="font-display font-bold text-lg text-foreground">{BRAND_NAME}</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            قارن بيانات اليخوت الخاصة في دبي حسب السعة والسعر والمدة، ثم اطلب تأكيد
            الموعد والتفاصيل قبل الحجز.
          </p>
          <div className="flex gap-3">
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="p-2 liquid-btn rounded-xl text-green-400">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href={getPhoneLink()} className="p-2 liquid-btn-gold rounded-xl text-primary">
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">روابط سريعة</h4>
          <nav className="flex flex-col gap-2">
            {NAVIGATION_TARGETS.map((link) => (
              <Link key={link.route.path} to={link.route.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
            ))}
          </nav>
        </div>

        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">قبل طلب الحجز</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {["حدّد عدد الضيوف", "راجع سعر الساعة", "تحقق من الحد الأدنى للمدة", "اطلب تأكيد الإضافات اختيارياً"].map(a => (
              <li key={a} className="flex items-center gap-2"><Check className="w-3 h-3 text-primary" />{a}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">ساعات العمل</h4>
          <div className="flex items-start gap-2 text-sm text-muted-foreground mb-3">
            <Clock className="w-4 h-4 text-primary mt-0.5" />
            <div>
              <p>يومياً: 6:00 صباحاً – 11:00 مساءً</p>
              <p>الحجز: 24/7</p>
              <p className="mt-1" dir="ltr">{PHONE_DISPLAY}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">الانطلاق: مرسى دبي مارينا</p>
          <a
            href={ENGLISH_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-xs text-muted-foreground hover:text-primary"
          >
            <Globe className="w-3.5 h-3.5" /> English Website
          </a>
        </div>
      </div>

      <div className="border-t border-border/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {BRAND_NAME}. جميع الحقوق محفوظة.</p>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <Link to={requireRouteRecord(ROUTES.terms).path} className="hover:text-primary transition-colors">الشروط</Link>
          <Link to={requireRouteRecord(ROUTES.privacy).path} className="hover:text-primary transition-colors">الخصوصية</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
