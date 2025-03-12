
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, Globe, Calendar, Newspaper, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';

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

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { name: 'Discover', href: '/feature/guides', icon: <Compass className="h-4 w-4 mr-1" /> },
    { name: 'Experiences', href: '/feature/suggestions', icon: <Globe className="h-4 w-4 mr-1" /> },
    { name: 'Events', href: '/feature/events', icon: <Calendar className="h-4 w-4 mr-1" /> },
    { name: 'News', href: '/feature/guides', icon: <Newspaper className="h-4 w-4 mr-1" /> },
    { name: 'Chat', href: '/feature/chat', icon: <MessageCircle className="h-4 w-4 mr-1" /> },
  ];

  const navVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const linkVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-custom-bezier",
        isScrolled 
          ? "py-3 bg-white/95 backdrop-blur-lg shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Logo variant={isScrolled ? 'default' : 'default'} />
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex space-x-8"
            variants={navVariants}
            initial="initial"
            animate="animate"
          >
            {navLinks.map((link) => (
              <motion.div key={link.name} variants={linkVariants}>
                <Link
                  to={link.href}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors relative group",
                    isActive(link.href)
                      ? "text-morocco-clay" 
                      : isScrolled 
                        ? "text-gray-900 hover:text-morocco-teal" 
                        : "text-gray-800 hover:text-morocco-teal"
                  )}
                >
                  {link.icon}
                  {link.name}
                  <span 
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-morocco-clay transition-all duration-300 rounded-full",
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-800"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white shadow-lg rounded-b-lg px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "flex items-center px-3 py-3 text-base font-medium rounded-md",
                  isActive(link.href)
                    ? "bg-morocco-sand/20 text-morocco-clay"
                    : "text-gray-900 hover:bg-gray-50 hover:text-morocco-teal"
                )}
              >
                {link.icon}
                <span className="ml-2">{link.name}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
