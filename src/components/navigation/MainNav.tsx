
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/use-language';

const mainNavItems = [
  {
    title: 'home',
    href: '/',
  },
  {
    title: 'destinations',
    href: '/discover',
  },
  {
    title: 'news',
    href: '/news',
  }
];

export function MainNav() {
  const location = useLocation();
  const { t } = useLanguage();
  
  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {mainNavItems.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          className={cn(
            "flex items-center px-2 py-1.5 transition-colors hover:text-morocco-green relative",
            location.pathname === item.href ? "text-morocco-green" : "text-morocco-clay"
          )}
        >
          {location.pathname === item.href && (
            <motion.span
              className="absolute inset-0 bg-morocco-sand/40 rounded-md -z-10"
              layoutId="active-nav-item"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          {t(item.title)}
        </Link>
      ))}
    </nav>
  );
}
