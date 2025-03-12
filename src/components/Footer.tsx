
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Mail, Heart } from 'lucide-react';
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
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
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
                  className="text-gray-500 hover:text-morocco-teal transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-morocco-teal transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Azoul. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0 flex items-center">
            Made with <Heart className="h-3 w-3 mx-1 text-morocco-terracotta animate-pulse" /> in Morocco
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
