
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
  
  // Moroccan-inspired features with modern look
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
      {/* Modern decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-morocco-terracotta/30 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-morocco-teal/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-morocco-gold/20 blur-3xl"></div>
      </div>
      
      {/* Modern decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-morocco-gold via-morocco-terracotta to-morocco-clay"></div>
      
      {/* Quick features section with cards */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-morocco-sand/20 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-morocco-sand/40 to-morocco-terracotta/20 flex items-center justify-center text-morocco-terracotta group-hover:scale-110 transition-transform">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-morocco-clay font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 border-t border-morocco-sand/10">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Logo and description */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center">
                <Logo variant="footer" />
              </div>
              
              <p className="text-muted-foreground max-w-xs leading-relaxed">
                Discover the magic of Morocco with Azoul - your gateway to authentic experiences, rich heritage, and unforgettable adventures.
              </p>
              
              <div className="flex items-center">
                <LanguageSwitcher />
              </div>
              
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex items-center justify-center w-10 h-10 text-morocco-clay hover:text-white hover:bg-morocco-terracotta transition-colors bg-white rounded-full shadow-sm border border-morocco-sand/30"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
              
              <div className="p-6 bg-white/90 backdrop-blur-sm shadow-sm rounded-2xl border border-morocco-sand/20 space-y-4">
                <h3 className="text-sm font-medium flex items-center text-morocco-clay">
                  <MapPin className="h-4 w-4 mr-2 text-morocco-terracotta" />
                  Visit Us
                </h3>
                <p className="text-sm text-muted-foreground">
                  123 Medina Street, Marrakech, Morocco
                </p>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-morocco-terracotta" />
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
              className="space-y-6"
            >
              <h3 className="text-sm font-medium text-morocco-clay flex items-center">
                <Star className="h-4 w-4 mr-2 fill-morocco-gold text-morocco-gold" /> 
                Subscribe to Our Newsletter
              </h3>
              
              <form className="space-y-3">
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full px-4 py-3 pr-10 rounded-xl border border-morocco-sand/50 focus:outline-none focus:ring-2 focus:ring-morocco-terracotta focus:border-transparent"
                  />
                  <button 
                    type="submit" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-morocco-terracotta text-white p-1.5 rounded-lg hover:bg-morocco-clay transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Join our community for exclusive Moroccan travel tips and cultural insights.
                </p>
              </form>
              
              {/* Morocco image teaser */}
              <div className="overflow-hidden rounded-2xl shadow-sm border border-morocco-sand/20 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1539020140153-e8c8d4592e7d?auto=format&fit=crop&w=300&h=150&q=80" 
                  alt="Moroccan landscape" 
                  className="w-full h-32 object-cover transition-transform group-hover:scale-105 duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <p className="text-white text-sm font-medium">Discover the Blue City: Chefchaouen</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer links with elegant styling */}
          {footerLinks.map((group, idx) => (
            <motion.div 
              key={group.title} 
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-medium text-morocco-clay mb-4 flex items-center">
                <Star className="h-3 w-3 mr-2 fill-morocco-gold text-morocco-gold" />
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <motion.li 
                    key={link.name}
                    whileHover={{ x: 2 }}
                  >
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-morocco-terracotta transition-colors text-sm flex items-center group"
                    >
                      <span className="relative overflow-hidden">
                        {link.name}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-morocco-terracotta transition-all duration-300 group-hover:w-full"></span>
                      </span>
                      <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
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
