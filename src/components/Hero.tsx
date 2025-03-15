
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative h-[90vh] flex items-center overflow-hidden">
      {/* Background with fallback color */}
      <div className="absolute inset-0 bg-morocco-navy/20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1539020140153-e69ed81792c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Experience the Magic of <span className="text-morocco-gold">Morocco</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
            From ancient medinas to vast deserts, discover the wonders of Morocco with a personalized travel experience
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Link
            to="/destination/marrakech"
            className="px-6 py-3 bg-morocco-clay text-white rounded-full font-medium hover:bg-morocco-clay/90 transition-colors inline-flex items-center justify-center"
          >
            <MapPin className="mr-2 h-5 w-5" />
            Explore Destinations
          </Link>
          <Link
            to="/feature/search"
            className="px-6 py-3 bg-white text-morocco-navy rounded-full font-medium hover:bg-white/90 transition-colors inline-flex items-center justify-center"
          >
            <Search className="mr-2 h-5 w-5" />
            Find Experiences
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
