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
      <a href="#main-content" className="skip-link">تخطي إلى المحتوى الرئيسي</a>
      <Header />
      <motion.main
        id="main-content"
        tabIndex={-1}
        data-analytics-region="page_content"
        key={location.pathname}
        initial={false}
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
