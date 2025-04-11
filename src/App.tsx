
import { Routes, Route } from 'react-router-dom'
import Index from '@/pages/Index'
import NotFound from '@/pages/NotFound'
import { Toaster } from '@/components/ui/toaster'
import ScrollToTop from '@/components/ScrollToTop'
import ChatAssistant from '@/components/ChatAssistant'
import FeatureDetail from '@/pages/FeatureDetail'
import SearchResults from '@/pages/SearchResults'
import SignIn from '@/pages/SignIn'
import SignUp from '@/pages/SignUp'
import ForgotPassword from '@/pages/ForgotPassword'
import Terms from '@/pages/Terms'
import Privacy from '@/pages/Privacy'
import DestinationDetail from '@/pages/DestinationDetail'
import UserProfile from '@/pages/UserProfile'
import ProtectedRoute from '@/components/ProtectedRoute'
import AdminDashboard from '@/pages/AdminDashboard'
import GuidesPage from '@/pages/GuidesPage'
import CulturalToursPage from '@/pages/CulturalToursPage'
import AccommodationsPage from '@/pages/AccommodationsPage'
import GuideDetailPage from '@/pages/GuideDetailPage'
import TourDetailPage from '@/pages/TourDetailPage'
import AccommodationDetailPage from '@/pages/AccommodationDetailPage'
import AdminRoutes from '@/components/admin/AdminRoutes'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="min-h-screen pt-20">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/feature/:featureId" element={<FeatureDetail />} />
          <Route path="/feature/guides" element={<GuidesPage />} />
          <Route path="/feature/cultural-tours" element={<CulturalToursPage />} />
          <Route path="/feature/accommodations" element={<AccommodationsPage />} />
          <Route path="/destination/:destinationId" element={<DestinationDetail />} />
          <Route path="/guide/:guideId" element={<GuideDetailPage />} />
          <Route path="/tour/:tourId" element={<TourDetailPage />} />
          <Route path="/accommodation/:accommodationId" element={<AccommodationDetailPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/admin/*" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminRoutes />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <ChatAssistant />
      <Toaster />
    </>
  )
}

export default App
