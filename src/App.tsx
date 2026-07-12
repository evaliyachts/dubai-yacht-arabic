import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { useState, type ReactNode } from "react";
import Index from "./pages/Index";
import Yachts from "./pages/Yachts";
import YachtDetails from "./pages/YachtDetails";
import Offers from "./pages/Offers";
import Services from "./pages/Services";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import ScrollToTop from "./components/shared/ScrollToTop";
import { allLandingPages } from "./data/landingPages";
import { ROUTES } from "./lib/constants";
import { SERVICE_INDEX_PATH_AR } from "./data/services-ar";
import { CLIENT_REDIRECTS } from "./seo/route-manifest";

interface AppProvidersProps {
  children: ReactNode;
  helmetContext?: { helmet?: HelmetServerState };
}

export const AppProviders = ({ children, helmetContext }: AppProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider context={helmetContext}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

interface AppRoutesProps {
  enableClientEffects?: boolean;
}

export const AppRoutes = ({ enableClientEffects = true }: AppRoutesProps) => (
  <>
    {enableClientEffects && <ScrollToTop />}
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/yachts" element={<Yachts />} />
      <Route path="/yachts/:slug" element={<YachtDetails />} />
      <Route path={ROUTES.offers} element={<Offers />} />
      <Route path={SERVICE_INDEX_PATH_AR} element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path={ROUTES.faq} element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      {allLandingPages.map((page) => (
        <Route key={page.slug} path={page.slug} element={<LandingPage />} />
      ))}
      {CLIENT_REDIRECTS.map((redirect) => (
        <Route key={redirect.from} path={redirect.from} element={<Navigate to={redirect.to} replace />} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

const App = () => (
  <AppProviders>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
