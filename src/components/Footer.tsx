
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Mail, Heart, ArrowUpRight, MapPin, Phone, Send } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Explore',
      links: [
        { name: 'Destinations', href: '/destination/marrakech' },
        { name: 'Experiences', href: '/feature/suggestions' },
        { name: 'Guides', href: '/feature/guides' },
        { name: 'Events', href: '/feature/events' },
        { name: 'Map', href: '/feature/map' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Chat Assistant', href: '/feature/chat' },
        { name: 'Language Courses', href: '/feature/language' },
        { name: 'Trip Planning', href: '/feature/map' },
        { name: 'Smart Suggestions', href: '/feature/suggestions' },
        { name: 'News', href: '/feature/guides' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/feature/guides' },
        { name: 'Careers', href: '/feature/guides' },
        { name: 'Contact', href: '/feature/chat' },
        { name: 'Privacy Policy', href: '/feature/guides' },
        { name: 'Terms of Service', href: '/feature/guides' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Email', icon: Mail, href: 'mailto:info@azoul.com' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url('/images/pattern.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}></div>
      </div>
      
      {/* Curved top border */}
      <div className="absolute top-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" className="w-full h-12 fill-white">
          <path d="M0,48L80,42.7C160,37,320,27,480,21.3C640,16,800,16,960,21.3C1120,27,1280,37,1360,42.7L1440,48L1440,48L1360,48C1280,48,1120,48,960,48C800,48,640,48,480,48C320,48,160,48,80,48L0,48Z"></path>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Logo variant="footer" />
              <p className="mt-4 text-muted-foreground max-w-xs">
                Your ultimate guide to exploring the beautiful landscapes, rich culture, and breathtaking experiences of Morocco.
              </p>
              
              <div className="mt-6 flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="text-morocco-clay hover:text-morocco-teal transition-colors bg-morocco-sand/20 p-2 rounded-full"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-morocco-sand/20 rounded-xl">
                <h3 className="text-sm font-semibold flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-morocco-clay" />
                  Visit Us
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  123 Medina Street, Marrakech, Morocco
                </p>
                <div className="flex items-center mt-2">
                  <Phone className="h-4 w-4 mr-1 text-morocco-clay" />
                  <span className="text-sm text-muted-foreground">+212 123 456 789</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Subscribe to Our Newsletter
              </h3>
              <form className="mt-2">
                <div className="flex flex-col space-y-2">
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-morocco-clay focus:border-transparent"
                    />
                    <button 
                      type="submit" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-morocco-clay text-white p-1 rounded-md"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Get travel tips and exclusive offers directly to your inbox.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Footer links */}
          {footerLinks.map((group, idx) => (
            <motion.div 
              key={group.title} 
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                {group.title}
                <ArrowUpRight className="h-3 w-3 ml-1 text-morocco-clay" />
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <motion.li 
                    key={link.name}
                    whileHover={{ x: 2 }}
                  >
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-morocco-teal transition-colors text-sm inline-block relative group"
                    >
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-morocco-teal transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="py-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Azoul. All rights reserved.
          </p>
          <motion.p 
            className="text-sm text-muted-foreground mt-2 md:mt-0 flex items-center"
            animate={{ 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Made with <Heart className="h-3 w-3 mx-1 text-morocco-terracotta animate-pulse" /> in Morocco
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
