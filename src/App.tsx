
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

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/feature/:featureId" element={<FeatureDetail />} />
        <Route path="/destination/:destinationId" element={<DestinationDetail />} />
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
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatAssistant />
      <Toaster />
    </>
  )
}

export default App
