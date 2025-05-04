
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Globe, Search } from 'lucide-react';

const NewsHero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-morocco-sand/30 to-white"></div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-morocco-gold via-morocco-terracotta to-morocco-clay"></div>
      
      {/* Decorative circles */}
      <div className="absolute -left-32 top-0 w-64 h-64 rounded-full bg-morocco-clay/10 blur-2xl"></div>
      <div className="absolute -right-32 bottom-0 w-80 h-80 rounded-full bg-morocco-gold/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-br from-morocco-clay to-morocco-terracotta bg-clip-text text-transparent">
              Morocco Travel News
            </h1>
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <div className="h-1 w-24 bg-gradient-to-r from-morocco-gold to-morocco-terracotta rounded-full"></div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-700 mb-10 leading-relaxed"
            >
              Stay informed with the latest news, events, and travel updates from across Morocco
            </motion.p>
          </motion.div>
          
          {/* Feature cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          >
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-morocco-sand/20 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-morocco-sand/30 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-morocco-terracotta" />
              </div>
              <h3 className="font-medium text-lg mb-2">Latest Updates</h3>
              <p className="text-gray-600 text-sm">Get daily updates on travel conditions, events, and opportunities in Morocco</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-morocco-sand/20 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-morocco-sand/30 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-morocco-terracotta" />
              </div>
              <h3 className="font-medium text-lg mb-2">Cultural Insights</h3>
              <p className="text-gray-600 text-sm">Discover stories and insights into Moroccan culture, traditions, and lifestyle</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-morocco-sand/20 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-morocco-sand/30 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-morocco-terracotta" />
              </div>
              <h3 className="font-medium text-lg mb-2">Travel Tips</h3>
              <p className="text-gray-600 text-sm">Expert advice and insider tips to make the most of your Moroccan adventure</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsHero;
