import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/home";
import About from "@/pages/about";
import Programs from "@/pages/programs";
import Membership from "@/pages/membership";
import Gallery from "@/pages/gallery";
import Contact from "@/pages/contact";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";
import { PublicLayout } from "@/components/layout";
import { LoadingSplash } from "@/components/loading-splash";
import { SiteProvider } from "@/contexts/site-context";

const queryClient = new QueryClient();

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SiteProvider>
          <BrowserRouter basename={base === "/" ? undefined : base}>
            <LoadingSplash />
            <Routes>
              <Route path="/admin" element={<Admin />} />
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SiteProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
