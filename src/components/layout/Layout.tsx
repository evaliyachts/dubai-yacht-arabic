import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SitemapSection from "./SitemapSection";
import StickyWhatsApp from "@/components/shared/StickyWhatsApp";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Header />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <Footer />
      <SitemapSection />
      <StickyWhatsApp />
    </div>
  );
};

export default Layout;
