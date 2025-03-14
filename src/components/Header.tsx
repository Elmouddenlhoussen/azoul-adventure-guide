
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Compass, Globe, Calendar, Newspaper, MessageCircle, MapPin, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";

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

  // Enhanced nav links with better descriptions
  const navLinks = [
    { 
      name: 'Discover', 
      href: '/feature/guides', 
      icon: <Compass className="h-4 w-4 mr-1" />,
      description: 'Explore travel guides and authentic Moroccan experiences'
    },
    { 
      name: 'Experiences', 
      href: '/feature/suggestions', 
      icon: <Globe className="h-4 w-4 mr-1" />,
      description: 'Find unique activities and local cultural experiences'
    },
    { 
      name: 'Events', 
      href: '/feature/events', 
      icon: <Calendar className="h-4 w-4 mr-1" />,
      description: 'Browse upcoming festivals, celebrations and cultural events'
    },
    { 
      name: 'News', 
      href: '/feature/guides', 
      icon: <Newspaper className="h-4 w-4 mr-1" />,
      description: 'Latest news, insights and updates from Morocco'
    },
    { 
      name: 'Destinations', 
      href: '/destination/marrakech', 
      icon: <MapPin className="h-4 w-4 mr-1" />,
      description: 'Explore popular cities, hidden gems and natural wonders'
    },
    { 
      name: 'Chat', 
      href: '/feature/chat', 
      icon: <MessageCircle className="h-4 w-4 mr-1" />,
      description: 'Get personalized travel recommendations from our AI'
    },
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-custom-bezier backdrop-blur-md",
        isScrolled 
          ? "py-3 bg-white/90 shadow-sm border-b border-morocco-sand/10" 
          : "py-5 bg-white/5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Logo variant={isScrolled ? 'default' : 'default'} />
          </motion.div>

          {/* Desktop Navigation with Moroccan styling */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <Link 
                      to={link.href}
                      className={cn(
                        "flex items-center text-sm font-medium px-4 py-2 rounded-full transition-all relative group",
                        isActive(link.href)
                          ? "bg-morocco-sand/30 text-morocco-clay" 
                          : isScrolled 
                            ? "text-gray-800 hover:bg-morocco-sand/20" 
                            : "text-gray-800 hover:bg-white/20"
                      )}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                      
                      {isActive(link.href) && (
                        <motion.span 
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-morocco-gold to-morocco-clay"
                          layoutId="navbar-indicator"
                          transition={{ type: 'spring', duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            
            <LanguageSwitcher />
            
            {/* Enhanced search button */}
            <motion.button
              className="ml-2 p-2 rounded-full bg-morocco-sand/10 text-morocco-clay hover:bg-morocco-sand/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="h-4 w-4" />
            </motion.button>
          </div>
          
          {/* Mobile menu button with Moroccan styling */}
          <div className="md:hidden flex items-center">
            <LanguageSwitcher />
            
            <motion.button
              onClick={toggleMobileMenu}
              className="ml-2 inline-flex items-center justify-center rounded-full p-2 text-morocco-clay bg-morocco-sand/20 hover:bg-morocco-sand/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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

      {/* Mobile menu with Moroccan styling */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white shadow-lg rounded-b-2xl px-4 pt-2 pb-4 space-y-1 mt-2 border border-morocco-sand/10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      "flex items-center px-3 py-3 text-base font-medium rounded-xl",
                      isActive(link.href)
                        ? "bg-morocco-sand/20 text-morocco-clay"
                        : "text-gray-900 hover:bg-morocco-sand/10 hover:text-morocco-clay"
                    )}
                  >
                    {link.icon}
                    <span className="ml-2">{link.name}</span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="pt-2 mt-2 border-t border-morocco-sand/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex space-x-2 justify-between">
                  <Link 
                    to="/feature/chat"
                    className="flex-1 flex items-center justify-center px-4 py-2 rounded-full bg-morocco-clay text-white text-sm font-medium"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Chat with Azoul
                  </Link>
                  
                  <button className="p-2 rounded-full bg-morocco-sand/10 text-morocco-clay">
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
