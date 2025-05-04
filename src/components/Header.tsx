
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import SearchBar from './SearchBar';
import AuthButtons from './AuthButtons';
import { MainNav } from './navigation/MainNav';
import { MobileNav } from './navigation/MobileNav';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  
  // Create dynamic styles based on scroll position
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const backdropBlur = useTransform(scrollY, [0, 100], [0, 8]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);
  const headerPadding = useTransform(scrollY, [0, 100], ["1.25rem", "0.75rem"]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        backgroundColor: useTransform(backgroundOpacity, (value) => `rgba(255, 255, 255, ${value})`),
        backdropFilter: useTransform(backdropBlur, (value) => `blur(${value}px)`),
        borderColor: useTransform(borderOpacity, (value) => `rgba(240, 230, 217, ${value})`),
        paddingTop: headerPadding,
        paddingBottom: headerPadding,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            {/* Logo with subtle hover effect */}
            <div className="relative overflow-hidden rounded-full hover:scale-105 transition-transform">
              <Logo variant="default" />
            </div>
            
            {/* Desktop Navigation with updated design */}
            <div className="hidden lg:block ml-8">
              <MainNav />
            </div>
          </motion.div>

          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            <div className="flex items-center space-x-2 border-l border-morocco-sand/20 pl-4">
              <LanguageSwitcher />
              <AuthButtons />
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <SearchBar />
            <LanguageSwitcher />
            
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-2 inline-flex items-center justify-center rounded-full p-2 text-morocco-clay hover:bg-morocco-sand/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Modern mobile menu with improved animation */}
      <MobileNav isOpen={isMobileMenuOpen} />
    </motion.header>
  );
};

export default Header;
