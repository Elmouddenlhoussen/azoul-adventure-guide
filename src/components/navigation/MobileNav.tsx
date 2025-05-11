
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import AuthButtons from '@/components/AuthButtons';
import { links } from './MainNav';

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
          className="md:hidden fixed inset-x-0 top-[4.5rem] z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mx-4 glass-effect rounded-2xl overflow-hidden shadow-lg border border-white/20">
            <div className="max-h-[70vh] overflow-y-auto backdrop-blur-xl bg-white/90">
              <div className="p-4 space-y-2 divide-y divide-morocco-sand/10">
                {links.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="py-2 first:pt-0 last:pb-0"
                  >
                    <Link
                      to={link.href}
                      className={cn(
                        "flex items-center p-4 rounded-xl transition-all",
                        isActive(link.href)
                          ? "bg-gradient-to-r from-morocco-sand/40 to-morocco-terracotta/20 text-morocco-clay shadow-sm"
                          : "hover:bg-morocco-sand/20"
                      )}
                    >
                      <span className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full mr-4",
                        isActive(link.href) 
                          ? "bg-gradient-to-br from-morocco-clay to-morocco-terracotta text-white shadow-sm" 
                          : "bg-morocco-sand/30 text-morocco-terracotta"
                      )}>
                        <link.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <span className="font-medium">{link.title}</span>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {link.description || "Explore " + link.title}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  className="pt-4 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="space-y-3 p-2">
                    <AuthButtons />
                    <Link 
                      to="/feature/chat"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-morocco-clay to-morocco-terracotta text-white text-sm font-medium shadow-md hover:shadow-lg transition-all"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chat with Azoul Assistant
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
