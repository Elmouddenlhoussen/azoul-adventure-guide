
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/use-language';

const backgroundImages = [
  'https://images.unsplash.com/photo-1539020140790-1bd2928a6e16?q=80&w=2070',
  'https://images.unsplash.com/photo-1553522911-d0edce8c6622?q=80&w=2070',
  'https://images.unsplash.com/photo-1570571006562-9811297f0cb7?q=80&w=2070'
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const controls = useAnimation();
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      controls.start({ opacity: 0 })
        .then(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
          return controls.start({ opacity: 1 });
        });
    }, 6000);

    return () => clearInterval(interval);
  }, [controls]);

  return (
    <div className="relative h-[85vh] overflow-hidden -mt-20">
      {/* Background image with animated transitions */}
      <motion.div
        animate={controls}
        initial={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat transform scale-110"
          style={{ 
            backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
            filter: 'brightness(0.8)'
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {t('welcome')}
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {t('explore')}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Link to="/discover">
                <Button className="bg-morocco-terracotta hover:bg-morocco-clay text-white px-5 py-6 rounded-full shadow-lg flex items-center gap-2 text-base">
                  <Globe className="h-5 w-5" />
                  {t('start_exploring')}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link to="/search">
                <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white px-5 py-6 rounded-full shadow-lg flex items-center gap-2 text-base">
                  <Search className="h-5 w-5" />
                  {t('search')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
