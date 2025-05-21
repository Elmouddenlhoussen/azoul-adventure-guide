
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Suggestion {
  id: number;
  title: string;
  type: string;
  image: string;
  href: string;
}

const suggestions: Suggestion[] = [
  {
    id: 1,
    title: 'Jemaa el-Fnaa',
    type: 'Attraction',
    image: 'https://images.unsplash.com/photo-1539020140153-e69ed81792c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    href: '/destination/marrakech'
  },
  {
    id: 2,
    title: 'Chefchaouen',
    type: 'City',
    image: 'https://images.unsplash.com/photo-1548922825-2a98f98ea191?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    href: '/destination/chefchaouen'
  },
  {
    id: 3,
    title: 'Sahara Desert Tour',
    type: 'Experience',
    image: 'https://images.unsplash.com/photo-1548759806-821cafe0fa7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    href: '/destination/sahara'
  },
  {
    id: 4,
    title: 'Moroccan Cuisine Workshop',
    type: 'Activity',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    href: '/feature/guides'
  }
];

const SmartSuggestions = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Personalized For You</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover experiences tailored to your preferences and interests
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {suggestions.map((suggestion, index) => (
          <Link to={suggestion.href} key={suggestion.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative overflow-hidden rounded-xl cursor-pointer h-full"
              whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,0,0,0.2)" }}
              onMouseEnter={() => setHoveredId(suggestion.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="aspect-[4/5] w-full overflow-hidden group">
                <motion.img
                  src={suggestion.image}
                  alt={suggestion.title}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <motion.div 
                    className="mb-2"
                    whileHover={{ scale: 1.05, x: 2 }}
                  >
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full text-white">
                      {suggestion.type}
                    </span>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-lg font-medium text-white mb-1"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {suggestion.title}
                  </motion.h3>
                  
                  <motion.div
                    className="bg-white/10 backdrop-blur-md p-3 rounded-lg mt-2 overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: hoveredId === suggestion.id ? 'auto' : 0,
                      opacity: hoveredId === suggestion.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button 
                      className="w-full bg-morocco-terracotta text-white py-2 rounded-md text-sm font-medium hover:bg-morocco-terracotta/90 transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mt-12 text-center"
      >
        <Link to="/feature/suggestions">
          <motion.button 
            className="px-6 py-3 border border-morocco-clay text-morocco-clay rounded-full font-medium hover:bg-morocco-clay hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Recommendations
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default SmartSuggestions;
