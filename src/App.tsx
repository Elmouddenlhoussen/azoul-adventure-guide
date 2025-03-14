
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "@/hooks/use-language";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DestinationDetail from "./pages/DestinationDetail";
import FeatureDetail from "./pages/FeatureDetail";
import ChatAssistant from "./components/ChatAssistant";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SearchResults from "./pages/SearchResults";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/destination/:destinationId" element={<DestinationDetail />} />
        <Route path="/feature/:featureId" element={<FeatureDetail />} />
        <Route path="/feature/search" element={<SearchResults />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
          <ChatAssistant />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
