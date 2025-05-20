
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Example data for chart
const progressData = [
  { month: 'Jan', features: 3 },
  { month: 'Feb', features: 5 },
  { month: 'Mar', features: 6 },
  { month: 'Apr', features: 8 },
  { month: 'May', features: 10 },
  { month: 'Jun', features: 12 },
];

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-morocco-sand/20 to-white py-12 mb-12 -mt-12 -mx-8 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-morocco-navy"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Building the Future of Morocco Travel
            </motion.h1>
            
            <motion.p 
              className="text-lg mb-8 text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover our development roadmap, vote on upcoming features, and help shape the future of Azoul. We're constantly evolving based on community feedback.
            </motion.p>
            
            <div className="grid grid-cols-3 gap-4">
              <motion.div 
                className="bg-white p-4 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-3xl font-bold text-morocco-clay mb-1">12+</div>
                <div className="text-sm text-gray-500">Features in Progress</div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-4 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="text-3xl font-bold text-morocco-green mb-1">6</div>
                <div className="text-sm text-gray-500">Released This Month</div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-4 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="text-3xl font-bold text-morocco-gold mb-1">1.2k</div>
                <div className="text-sm text-gray-500">Community Votes</div>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="font-medium text-lg mb-4">Feature Releases (2025)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={progressData}
                  margin={{ top: 5, right: 30, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="features" 
                    stroke="#C0846B" 
                    strokeWidth={3} 
                    activeDot={{ r: 8 }} 
                    dot={{ r: 4, fill: '#C0846B' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
