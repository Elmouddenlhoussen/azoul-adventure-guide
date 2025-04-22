
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import AuthButtons from '@/components/AuthButtons';
import { navLinks } from './MainNav';

interface MobileNavProps {
  isOpen: boolean;
}

export function MobileNav({ isOpen }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white shadow-lg rounded-b-2xl px-4 pt-2 pb-4 space-y-1 mt-2 border border-morocco-sand/10">
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
                    "flex items-center px-3 py-3 text-base font-medium rounded-xl",
                    isActive(link.href)
                      ? "bg-morocco-sand/20 text-morocco-clay"
                      : "text-gray-900 hover:bg-morocco-sand/10 hover:text-morocco-clay"
                  )}
                >
                  {link.icon}
                  <span className="ml-2">{link.name}</span>
                </Link>
              </motion.div>
            ))}

            <motion.div
              className="pt-2 mt-2 border-t border-morocco-sand/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex flex-col space-y-2">
                <AuthButtons />
                <Link 
                  to="/feature/chat"
                  className="flex items-center justify-center px-4 py-2 rounded-full bg-morocco-clay text-white text-sm font-medium"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Chat with Azoul
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
