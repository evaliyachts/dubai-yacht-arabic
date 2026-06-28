import { useLocation } from "react-router-dom";
import { getLandingBySlug } from "@/data/landingPages";
import LandingPageTemplate from "@/components/landing/LandingPageTemplate";
import NotFound from "./NotFound";

const LandingPage = () => {
  const { pathname } = useLocation();
  let decodedPathname = pathname;
  try {
    decodedPathname = decodeURIComponent(pathname);
  } catch {
    decodedPathname = pathname;
  }

  const page = getLandingBySlug(decodedPathname);
  if (!page) return <NotFound />;
  return <LandingPageTemplate page={page} />;
};

export default LandingPage;
