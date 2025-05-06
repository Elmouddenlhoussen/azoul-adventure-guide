
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Modern background with overlay gradients */}
      <div className="absolute inset-0 bg-morocco-navy/10">
        {/* Main background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1539020140153-e69ed81792c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')",
          }}
        >
          {/* Gradient overlays for more visual impact */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-morocco-clay/30 to-transparent" />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-morocco-gold/20 blur-3xl" />
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-morocco-terracotta/10 blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Experience the <span className="text-morocco-gold">Magic</span> of <span className="text-morocco-gold">Morocco</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xl text-white/80 max-w-2xl mb-10 leading-relaxed">
              From ancient medinas to vast deserts, discover the wonders of Morocco with a personalized travel experience designed just for you
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start"
          >
            <Link
              to="/destination/marrakech"
              className="px-8 py-4 bg-gradient-to-r from-morocco-clay to-morocco-terracotta text-white rounded-full font-medium hover:shadow-lg transition-all inline-flex items-center justify-center group"
            >
              <MapPin className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="mr-1">Explore Destinations</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </Link>
            <Link
              to="/feature/search"
              className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-medium hover:bg-white/30 transition-all inline-flex items-center justify-center"
            >
              <Search className="mr-2 h-5 w-5" />
              Find Experiences
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={scrollToContent}
      >
        <div className="flex flex-col items-center">
          <span className="text-white/70 text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="h-6 w-6 text-white/70" />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
