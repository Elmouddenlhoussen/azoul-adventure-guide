
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import AuthButtons from '@/components/AuthButtons';
import { navLinks } from './MainNav';

interface MobileNavProps {
  isOpen: boolean;
}

export function MobileNav({ isOpen }: MobileNavProps) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white/95 backdrop-blur-lg shadow-lg rounded-2xl mx-4 mt-3 overflow-hidden border border-morocco-sand/10">
            <div className="max-h-[70vh] overflow-y-auto p-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all",
                      isActive(link.href)
                        ? "bg-gradient-to-r from-morocco-sand/30 to-morocco-sand/10 text-morocco-clay"
                        : "text-gray-700 hover:bg-morocco-sand/10 hover:text-morocco-clay"
                    )}
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/80 shadow-sm mr-3">
                      {link.icon}
                    </span>
                    <div>
                      <span>{link.name}</span>
                      <p className="text-xs text-muted-foreground">{link.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="pt-4 mt-2 border-t border-morocco-sand/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="space-y-3">
                  <AuthButtons />
                  <Link 
                    to="/feature/chat"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-morocco-clay to-morocco-terracotta text-white text-sm font-medium shadow-sm"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat with Azoul Assistant
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
