
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Explore',
      links: [
        { name: 'Destinations', href: '/destinations' },
        { name: 'Experiences', href: '/experiences' },
        { name: 'Guides', href: '/guides' },
        { name: 'Events', href: '/events' },
        { name: 'Map', href: '/map' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Chat Assistant', href: '/chat' },
        { name: 'Language Courses', href: '/courses' },
        { name: 'Trip Planning', href: '/plan' },
        { name: 'Smart Suggestions', href: '/suggestions' },
        { name: 'News', href: '/news' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
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
            <Link to="/" className="flex items-center">
              <span className="h-8 w-8 rounded-md bg-morocco-clay flex items-center justify-center mr-2">
                <span className="font-bold text-white">A</span>
              </span>
              <span className="font-bold text-xl tracking-tight">Azoul</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-xs">
              Your ultimate guide to exploring the beautiful landscapes, rich culture, and breathtaking experiences of Morocco.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-500 hover:text-morocco-teal transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
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
            Made with <Heart className="h-3 w-3 mx-1 text-morocco-terracotta" /> in Morocco
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
