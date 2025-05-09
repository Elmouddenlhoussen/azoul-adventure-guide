
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-morocco-sand/10 px-4 py-32">
      <motion.div 
        className="max-w-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-block p-4 bg-white rounded-full mb-6 shadow-md">
          <div className="h-20 w-20 rounded-full bg-morocco-clay flex items-center justify-center">
            <span className="font-bold text-4xl text-white">404</span>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        
        <p className="text-muted-foreground mb-8">
          We can't seem to find the page you're looking for. Let's get you back on track to exploring Morocco.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-morocco-clay text-white rounded-full font-medium hover:bg-morocco-clay/90 transition-colors"
        >
          <Home className="w-5 h-5 mr-2" />
          Return to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
