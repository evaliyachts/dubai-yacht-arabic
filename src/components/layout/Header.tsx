import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { BRAND_NAME, getWhatsAppLink, getPhoneLink } from "@/lib/constants";
import { NAVIGATION_TARGETS } from "@/seo/route-manifest";
import brandMark from "@/assets/home/brand-mark.png";

const normalizePath = (path: string) => {
  try {
    return decodeURIComponent(path);
  } catch {
    return path;
  }
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const pathname = normalizePath(location.pathname);

  const isActive = (path: string) => {
    if (path === "/") return pathname === path;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };
    desktop.addEventListener("change", closeAtDesktop);
    if (desktop.matches) setIsOpen(false);
    return () => desktop.removeEventListener("change", closeAtDesktop);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "liquid-header py-3" : "bg-transparent py-5"
      }`}
      dir="rtl"
      data-analytics-region="header"
    >
      <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen} modal>
        <div className="container mx-auto px-4 flex items-center justify-between relative z-50">
          <Link to="/" className="flex items-center gap-2 group">
          <img
            src={brandMark}
            alt={BRAND_NAME}
            width={72}
            height={72}
            decoding="async"
            className="h-9 w-9 rounded-md transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display font-bold text-lg text-foreground">
            {BRAND_NAME}
          </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="التنقل الرئيسي">
            {NAVIGATION_TARGETS.map((link) => (
              <Link
                key={link.route.path}
                to={link.route.path}
                className={`px-3 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                  isActive(link.route.path)
                    ? "text-primary liquid-btn-gold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-placement="header_desktop"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium liquid-btn text-green-400 border-green-500/20"
            >
              <MessageCircle className="w-4 h-4" /> واتساب
            </a>
            <a
              href={getPhoneLink()}
              data-analytics-placement="header_desktop"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium liquid-btn-gold text-primary"
            >
              <Phone className="w-4 h-4" /> اتصل الآن
            </a>
          </div>

          <DialogPrimitive.Trigger asChild>
            <button className="lg:hidden p-2 text-foreground relative z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl" aria-label="فتح القائمة" aria-expanded={isOpen} aria-controls="mobile-navigation">
              <Menu className="w-6 h-6" />
            </button>
          </DialogPrimitive.Trigger>
        </div>

        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[55] bg-background/90 backdrop-blur-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 lg:hidden" />
          <DialogPrimitive.Content
            id="mobile-navigation"
            className="fixed inset-0 z-[60] lg:hidden flex flex-col overflow-y-auto pt-20 px-6 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:slide-in-from-left-full data-[state=closed]:slide-out-to-left-full duration-300 motion-reduce:animate-none"
            style={{
              background: "linear-gradient(180deg, hsl(220 30% 5% / 0.97) 0%, hsl(220 30% 5% / 0.99) 100%)",
              backdropFilter: "blur(60px) saturate(2)",
            }}
            dir="rtl"
          >
            <DialogPrimitive.Title className="sr-only">قائمة التنقل عبر الهاتف</DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">روابط صفحات يخوت دبي ووسائل التواصل</DialogPrimitive.Description>
            <DialogPrimitive.Close asChild>
              <button className="absolute left-4 top-4 rounded-xl p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="إغلاق القائمة">
                <X className="h-6 w-6" />
              </button>
            </DialogPrimitive.Close>
            <nav className="flex flex-col gap-2" aria-label="التنقل عبر الهاتف">
              {NAVIGATION_TARGETS.map((link, i) => (
                <motion.div
                  key={link.route.path}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    to={link.route.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 text-lg font-display rounded-2xl transition-all ${
                      isActive(link.route.path) ? "text-primary liquid-glass-gold" : "text-foreground hover:bg-secondary/30"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} data-analytics-placement="mobile_menu" className="flex items-center justify-center gap-2 px-6 py-3 liquid-btn text-green-400 font-medium">
                <MessageCircle className="w-5 h-5" /> واتساب
              </a>
              <a href={getPhoneLink()} onClick={() => setIsOpen(false)} data-analytics-placement="mobile_menu" className="flex items-center justify-center gap-2 px-6 py-3 liquid-btn-gold text-primary font-medium">
                <Phone className="w-5 h-5" /> اتصل الآن
              </a>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </header>
  );
};

export default Header;
