import { useLocation } from "react-router-dom";
import { getLandingBySlug } from "@/data/landingPages";
import LandingPageTemplate from "@/components/landing/LandingPageTemplate";
import NotFound from "./NotFound";

const LandingPage = () => {
  // React Router decodes the pathname, so this matches Arabic slugs directly.
  const { pathname } = useLocation();
  const page = getLandingBySlug(pathname);
  if (!page) return <NotFound />;
  return <LandingPageTemplate page={page} />;
};

export default LandingPage;
