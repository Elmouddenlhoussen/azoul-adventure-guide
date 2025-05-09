import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Index from '@/pages/Index'
import AccommodationsPage from '@/pages/AccommodationsPage'
import DestinationsPage from '@/pages/DestinationsPage'
import ToursPage from '@/pages/ToursPage'
import GuidesPage from '@/pages/GuidesPage'
import NewsPage from '@/pages/NewsPage'
import CoursesPage from '@/pages/CoursesPage'
import DiscoverPage from '@/pages/DiscoverPage'
import ProfilePage from '@/pages/ProfilePage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import FeatureDetailPage from '@/pages/FeatureDetailPage'
import DestinationDetailPage from '@/pages/DestinationDetailPage'
import TourDetailPage from '@/pages/TourDetailPage'
import GuideDetailPage from '@/pages/GuideDetailPage'
import NewsDetailPage from '@/pages/NewsDetailPage'
import AccommodationDetailPage from '@/pages/AccommodationDetailPage'
import CourseDetailPage from '@/pages/CourseDetailPage'
import BookingConfirmationPage from '@/pages/BookingConfirmationPage'
import BookingHistoryPage from '@/pages/BookingHistoryPage'
import NotFoundPage from '@/pages/NotFoundPage'
import UnauthorizedPage from '@/pages/UnauthorizedPage'
import MaintenancePage from '@/pages/MaintenancePage'
import useAuth from '@/hooks/use-auth-context'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import CommunityExperiencesPage from '@/pages/CommunityExperiencesPage';
import ShareExperiencePage from '@/pages/ShareExperiencePage';
import ExperienceDetailPage from '@/pages/ExperienceDetailPage';

function App() {
  const location = useLocation()
  const { auth } = useAuth();
  const [isMaintenance, setIsMaintenance] = useState(false);

  useEffect(() => {
    // Simulate checking maintenance status from an API
    const checkMaintenance = async () => {
      // Replace with actual API call
      const isUnderMaintenance = false;
      setIsMaintenance(isUnderMaintenance);
    };

    checkMaintenance();
  }, []);

  if (isMaintenance) {
    return <MaintenancePage />;
  }

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
        <div className="container max-w-screen-xl mx-auto flex justify-between items-center p-4">
          <a href="/" className="font-bold text-xl">Azoul</a>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="/" className="hover:text-gray-500">Home</a></li>
              <li><a href="/discover" className="hover:text-gray-500">Discover</a></li>
              <li><a href="/destinations" className="hover:text-gray-500">Destinations</a></li>
              <li><a href="/tours" className="hover:text-gray-500">Tours</a></li>
              <li><a href="/accommodations" className="hover:text-gray-500">Accommodations</a></li>
              <li><a href="/guides" className="hover:text-gray-500">Guides</a></li>
              <li><a href="/news" className="hover:text-gray-500">News</a></li>
              <li><a href="/courses" className="hover:text-gray-500">Courses</a></li>
              {auth?.isLoggedIn ? (
                <>
                  <li><a href="/profile" className="hover:text-gray-500">Profile</a></li>
                  <li><a href="/booking-history" className="hover:text-gray-500">Bookings</a></li>
                </>
              ) : (
                <>
                  <li><a href="/login" className="hover:text-gray-500">Login</a></li>
                  <li><a href="/register" className="hover:text-gray-500">Register</a></li>
                </>
              )}
              <li>
                <LanguageSwitcher />
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <AnimatePresence mode="wait" initial={false}>
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/accommodations" element={<AccommodationsPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/feature/:id" element={<FeatureDetailPage />} />
            <Route path="/destination/:id" element={<DestinationDetailPage />} />
            <Route path="/tour/:id" element={<TourDetailPage />} />
            <Route path="/guide/:id" element={<GuideDetailPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/accommodation/:id" element={<AccommodationDetailPage />} />
            <Route path="/course/:id" element={<CourseDetailPage />} />
            <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
            <Route path="/booking-history" element={<BookingHistoryPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            {/* Add routes for our new community experiences pages */}
            <Route path="/community/experiences" element={<CommunityExperiencesPage />} />
            <Route path="/community/share" element={<ShareExperiencePage />} />
            <Route path="/experiences/:id" element={<ExperienceDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 py-6">
        <div className="container max-w-screen-xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Azoul. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
