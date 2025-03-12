
import { useState } from 'react';
import { motion } from 'framer-motion';

interface Suggestion {
  id: number;
  title: string;
  type: string;
  image: string;
}

const suggestions: Suggestion[] = [
  {
    id: 1,
    title: 'Jemaa el-Fnaa',
    type: 'Attraction',
    image: '/images/suggestion-1.jpg'
  },
  {
    id: 2,
    title: 'Chefchaouen',
    type: 'City',
    image: '/images/suggestion-2.jpg'
  },
  {
    id: 3,
    title: 'Sahara Desert Tour',
    type: 'Experience',
    image: '/images/suggestion-3.jpg'
  },
  {
    id: 4,
    title: 'Moroccan Cuisine Workshop',
    type: 'Activity',
    image: '/images/suggestion-4.jpg'
  }
];

const SmartSuggestions = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-12"
      >
        <h2 className="section-title">Smart Suggestions</h2>
        <p className="section-subtitle mx-auto">
          Personalized recommendations based on your interests and browsing history
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={suggestion.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative overflow-hidden rounded-xl"
            onMouseEnter={() => setHoveredId(suggestion.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="aspect-[4/5] w-full overflow-hidden group">
              <img
                src={suggestion.image}
                alt={suggestion.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-custom-bezier group-hover:scale-110"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full text-white">
                    {suggestion.type}
                  </span>
                </div>
                
                <h3 className="text-lg font-medium text-white mb-1">
                  {suggestion.title}
                </h3>
                
                <motion.div
                  className="bg-white/10 backdrop-blur-md p-3 rounded-lg mt-2 overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: hoveredId === suggestion.id ? 'auto' : 0,
                    opacity: hoveredId === suggestion.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <button className="w-full bg-morocco-terracotta text-white py-2 rounded-md text-sm font-medium hover:bg-morocco-terracotta/90 transition-colors">
                    View Details
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mt-12 text-center"
      >
        <button className="px-6 py-3 border border-morocco-clay text-morocco-clay rounded-full font-medium hover:bg-morocco-clay hover:text-white transition-colors">
          View All Recommendations
        </button>
      </motion.div>
    </section>
  );
};

export default SmartSuggestions;
