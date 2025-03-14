
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Mail, Heart, ArrowUpRight, MapPin, Phone, Send, Star, Coffee, Palmtree, Sun, Mountain } from 'lucide-react';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Explore',
      links: [
        { name: 'Marrakech', href: '/destination/marrakech' },
        { name: 'Chefchaouen', href: '/destination/chefchaouen' },
        { name: 'Sahara Desert', href: '/destination/sahara' },
        { name: 'Fes', href: '/destination/fes' },
        { name: 'Interactive Map', href: '/feature/map' },
      ],
    },
    {
      title: 'Features',
      links: [
        { name: 'Chat Assistant', href: '/feature/chat' },
        { name: 'Language Support', href: '/feature/language' },
        { name: 'Travel Guides', href: '/feature/guides' },
        { name: 'Smart Suggestions', href: '/feature/suggestions' },
        { name: 'Cultural Events', href: '/feature/events' },
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
  
  // Moroccan-inspired features
  const features = [
    { 
      icon: Sun, 
      title: "Weather Perfect", 
      description: "300+ days of sunshine annually across Morocco's diverse regions"
    },
    { 
      icon: Mountain, 
      title: "Diverse Landscapes", 
      description: "From Atlas mountains to Sahara dunes and Atlantic coastlines"
    },
    { 
      icon: Coffee, 
      title: "Rich Cuisine", 
      description: "Experience the flavors of traditional Moroccan gastronomy" 
    },
    { 
      icon: Palmtree, 
      title: "Cultural Heritage", 
      description: "Explore ancient medinas, riads, and historical monuments"
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-morocco-sand/20 relative overflow-hidden border-t border-morocco-sand/10">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: "url('/images/pattern.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}></div>
      </div>
      
      {/* Moroccan-inspired decorative element */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-morocco-gold via-morocco-terracotta to-morocco-clay"></div>
      
      {/* Quick features section */}
      <div className="border-b border-morocco-sand/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-morocco-sand/20 flex items-center justify-center text-morocco-terracotta">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-morocco-clay">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
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
                Discover the magic of Morocco with Azoul - your gateway to authentic experiences, rich heritage, and unforgettable adventures.
              </p>
              
              <div className="mt-4 flex items-center">
                <LanguageSwitcher />
              </div>
              
              <div className="mt-4 flex space-x-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="text-morocco-clay hover:text-morocco-terracotta transition-colors bg-morocco-sand/10 p-2 rounded-full"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-white/80 backdrop-blur-sm shadow-sm rounded-xl border border-morocco-sand/20">
                <h3 className="text-sm font-semibold flex items-center text-morocco-clay">
                  <MapPin className="h-4 w-4 mr-1 text-morocco-terracotta" />
                  Visit Us
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  123 Medina Street, Marrakech, Morocco
                </p>
                <div className="flex items-center mt-2">
                  <Phone className="h-4 w-4 mr-1 text-morocco-terracotta" />
                  <span className="text-sm text-muted-foreground">+212 123 456 789</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Newsletter with enhanced Moroccan styling */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-semibold text-morocco-clay mb-4 flex items-center">
                <Star className="h-3 w-3 mr-1 fill-morocco-gold text-morocco-gold" /> 
                Subscribe to Our Newsletter
              </h3>
              <form className="mt-2">
                <div className="flex flex-col space-y-2">
                  <div className="relative">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full px-4 py-2 pr-10 rounded-lg border border-morocco-sand/50 focus:outline-none focus:ring-2 focus:ring-morocco-terracotta focus:border-transparent"
                    />
                    <button 
                      type="submit" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-morocco-terracotta text-white p-1 rounded-md hover:bg-morocco-clay transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Join our community for exclusive Moroccan travel tips and cultural insights.
                  </p>
                </div>
              </form>
              
              {/* Morocco image teaser */}
              <div className="mt-6 rounded-lg overflow-hidden shadow-sm border border-morocco-sand/20 relative">
                <img 
                  src="https://images.unsplash.com/photo-1539020140153-e8c8d4592e7d?auto=format&fit=crop&w=300&h=150&q=80" 
                  alt="Moroccan landscape" 
                  className="w-full h-28 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
                  <p className="text-white text-xs font-medium">Discover the Blue City: Chefchaouen</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer links with enhanced Moroccan-inspired decorations */}
          {footerLinks.map((group, idx) => (
            <motion.div 
              key={group.title} 
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-semibold text-morocco-clay mb-4 flex items-center">
                <Star className="h-3 w-3 mr-1 fill-morocco-gold text-morocco-gold" />
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
                      className="text-muted-foreground hover:text-morocco-terracotta transition-colors text-sm inline-block relative group"
                    >
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-morocco-terracotta transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="py-6 border-t border-morocco-sand/20 flex flex-col md:flex-row justify-between items-center">
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
