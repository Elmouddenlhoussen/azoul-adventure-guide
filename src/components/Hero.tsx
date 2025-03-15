
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const backgrounds = [
  '/images/morocco-1.jpg',
  '/images/morocco-2.jpg',
  '/images/morocco-3.jpg'
];

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const controls = useAnimation();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
    });
  }, [controls]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/feature/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <motion.section 
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      style={{ opacity }}
    >
      {/* Background Images */}
      {backgrounds.map((bg, index) => (
        <motion.div
          key={bg}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentBg === index ? 1 : 0,
            scale: currentBg === index ? 1 : 1.1,
          }}
          transition={{
            opacity: { duration: 1.5, ease: 'easeInOut' },
            scale: { duration: 8, ease: 'easeInOut' }
          }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bg})` }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      ))}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />

      {/* Parallax effect on scroll */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        style={{ scale, y }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-2"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-sm border border-white/20">
            <MapPin className="w-3 h-3 mr-1" />
            Explore Morocco
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-3xl leading-tight"
        >
          Discover The Magic of Morocco
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl text-white/90 max-w-2xl mb-10"
        >
          Your ultimate guide to exploring the beautiful landscapes, rich culture, and breathtaking experiences of Morocco.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-full max-w-md"
        >
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              placeholder="Search for destinations, experiences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
            />
            <motion.button 
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-morocco-navy p-2 rounded-full hover:bg-white/90 transition-colors"
            >
              <Search className="h-5 w-5" />
            </motion.button>
          </form>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <div className="flex space-x-2">
            {backgrounds.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentBg(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentBg === i ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
