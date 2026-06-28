import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Yachts from "./pages/Yachts";
import YachtDetails from "./pages/YachtDetails";
import Offers from "./pages/Offers";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import { allLandingPages } from "./data/landingPages";
import { ROUTES } from "./lib/constants";
import { LEGACY_SERVICE_INDEX_PATH_AR, SERVICE_INDEX_PATH_AR } from "./data/services-ar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/yachts" element={<Yachts />} />
            <Route path="/yachts/:slug" element={<YachtDetails />} />
            <Route path={ROUTES.offers} element={<Offers />} />
            <Route path="/offers" element={<Navigate to={ROUTES.offers} replace />} />
            <Route path={SERVICE_INDEX_PATH_AR} element={<Services />} />
            <Route path={`${SERVICE_INDEX_PATH_AR}/:slug`} element={<ServiceDetails />} />
            <Route path={LEGACY_SERVICE_INDEX_PATH_AR} element={<Navigate to={SERVICE_INDEX_PATH_AR} replace />} />
            <Route path={`${LEGACY_SERVICE_INDEX_PATH_AR}/:slug`} element={<ServiceDetails />} />
            <Route path="/services" element={<Navigate to={SERVICE_INDEX_PATH_AR} replace />} />
            <Route path="/services/:slug" element={<ServiceDetails />} />
            <Route path="/about" element={<About />} />
            <Route path={ROUTES.faq} element={<FAQ />} />
            <Route path="/faq" element={<Navigate to={ROUTES.faq} replace />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* Arabic landing pages — keyword + event pages */}
            {allLandingPages.map((p) => (
              <Route key={p.slug} path={p.slug} element={<LandingPage />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
