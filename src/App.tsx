
import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Index from '@/pages/Index'
import NotFound from '@/pages/NotFound'
import { useAuth } from '@/hooks/use-auth-context'
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
    return <div>Site is under maintenance</div>;
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
              <li><a href="/community/experiences" className="hover:text-gray-500">Community</a></li>
              {auth?.isLoggedIn ? (
                <>
                  <li><a href="/profile" className="hover:text-gray-500">Profile</a></li>
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
            {/* Community routes */}
            <Route path="/community/experiences" element={<CommunityExperiencesPage />} />
            <Route path="/community/share" element={<ShareExperiencePage />} />
            <Route path="/experiences/:id" element={<ExperienceDetailPage />} />
            <Route path="*" element={<NotFound />} />
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
