
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion'; // Added Variants import
import { useLanguage } from '@/hooks/use-language';

const mobileNavItems = [
  {
    title: 'home',
    href: '/',
  },
  {
    title: 'destinations',
    href: '/discover',
  },
  {
    title: 'accommodations', 
    href: '/feature/accommodations',
  },
  {
    title: 'tours',
    href: '/feature/cultural-tours',
  },
  {
    title: 'guides',
    href: '/feature/guides',
  },
  {
    title: 'news',
    href: '/news',
  },
];

export function MobileNav({ isOpen }: { isOpen: boolean }) {
  const location = useLocation();
  const { t } = useLanguage();
  
  const container: Variants = {
    hidden: { opacity: 0, y: -10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: { 
      opacity: 0,
      y: -10,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-md z-40"
          initial="hidden"
          animate="show"
          exit="exit"
          variants={container}
        >
          <motion.div className="container max-w-7xl mx-auto px-4 py-6 flex flex-col">
            <div className="grid grid-cols-1 gap-y-4">
              {mobileNavItems.map((navItem, index) => (
                <motion.div key={index} variants={item}>
                  <Link 
                    to={navItem.href}
                    className={`block px-4 py-2 text-base ${
                      location.pathname === navItem.href
                        ? "text-morocco-green font-medium bg-morocco-green/10 rounded-md"
                        : "text-gray-700 hover:text-morocco-green"
                    }`}
                  >
                    {t(navItem.title)}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
