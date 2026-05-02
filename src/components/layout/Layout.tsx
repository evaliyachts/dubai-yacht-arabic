import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SitemapSection from "./SitemapSection";

interface LayoutProps {
  children: ReactNode;
}

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.main
        key={location.pathname}
        initial={pageTransition.initial}
        animate={pageTransition.animate}
        transition={pageTransition.transition}
        className="flex-1"
      >
        {children}
      </motion.main>
      <Footer />
      <SitemapSection />
    </div>
  );
};

export default Layout;
