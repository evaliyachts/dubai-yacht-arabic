import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { NAV_LINKS, BRAND_NAME, getWhatsAppLink, getPhoneLink } from "@/lib/constants";
import logoAsset from "@/assets/dubai-yachts-logo.png.asset.json";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "liquid-header py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Anchor className="w-7 h-7 text-primary transition-transform duration-300 group-hover:rotate-12" />
          <span className="text-xl font-display font-bold text-foreground tracking-wide">{BRAND_NAME}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                location.pathname === link.path
                  ? "text-primary liquid-btn-gold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium liquid-btn text-green-400 border-green-500/20"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a
            href={getPhoneLink()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium liquid-btn-gold text-primary"
          >
            <Phone className="w-4 h-4" /> Call Now
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-foreground" aria-label="Toggle menu">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 top-0 z-40 lg:hidden flex flex-col pt-20 px-6"
            style={{
              background: "linear-gradient(180deg, hsl(220 25% 6% / 0.95) 0%, hsl(220 25% 6% / 0.98) 100%)",
              backdropFilter: "blur(60px) saturate(2)",
            }}
          >
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 text-lg font-display rounded-2xl transition-all ${
                      location.pathname === link.path ? "text-primary liquid-glass-gold" : "text-foreground hover:bg-secondary/30"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-3">
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3 liquid-btn text-green-400 font-medium">
                <MessageCircle className="w-5 h-5" /> WhatsApp
              </a>
              <a href={getPhoneLink()} className="flex items-center justify-center gap-2 px-6 py-3 liquid-btn-gold text-primary font-medium">
                <Phone className="w-5 h-5" /> Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
