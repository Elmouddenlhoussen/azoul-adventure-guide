
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import SearchBar from './SearchBar';
import AuthButtons from './AuthButtons';
import { MainNav } from './navigation/MainNav';
import { MobileNav } from './navigation/MobileNav';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-custom-bezier",
        isScrolled 
          ? "py-3 bg-white/95 backdrop-blur-lg shadow-sm border-b border-morocco-sand/10" 
          : "py-5 bg-gradient-to-r from-white/90 to-morocco-sand/20 backdrop-blur-md"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Logo variant={isScrolled ? 'default' : 'default'} />
            
            {/* Desktop Navigation */}
            <div className="hidden lg:block ml-8">
              <MainNav />
            </div>
          </motion.div>

          <div className="hidden md:flex items-center space-x-3">
            <SearchBar />
            <div className="flex items-center space-x-2 border-l border-morocco-sand/20 pl-3">
              <LanguageSwitcher />
              <AuthButtons />
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <SearchBar />
            <LanguageSwitcher />
            
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-2 inline-flex items-center justify-center rounded-full p-2 text-morocco-clay hover:bg-morocco-sand/30 transition-colors"
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

      {/* Elegant mobile menu with improved animation */}
      <MobileNav isOpen={isMobileMenuOpen} />
    </header>
  );
};

export default Header;
