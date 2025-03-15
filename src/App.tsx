
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LanguageProvider } from "@/hooks/use-language";
import { AuthProvider } from "@/hooks/use-auth-context";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import ProtectedRoute from "@/components/ProtectedRoute";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DestinationDetail from "./pages/DestinationDetail";
import FeatureDetail from "./pages/FeatureDetail";
import ChatAssistant from "./components/ChatAssistant";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SearchResults from "./pages/SearchResults";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  useSmoothScroll();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/destination/:destinationId" element={<DestinationDetail />} />
        <Route path="/feature/:featureId" element={<FeatureDetail />} />
        <Route path="/feature/search" element={<SearchResults />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <AppRoutes />
            <ChatAssistant />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
