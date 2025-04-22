
import React from 'react';
import { motion } from 'framer-motion';

const NewsHero = () => {
  return (
    <section className="bg-gradient-to-b from-morocco-navy/5 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Morocco Travel News & Updates
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-700 mb-8"
          >
            Stay informed with the latest news, events, and travel updates from across Morocco
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default NewsHero;
