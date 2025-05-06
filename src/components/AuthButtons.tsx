
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, User } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth-context';
import { useLanguage } from '@/hooks/use-language';

export default function AuthButtons() {
  const { user, logout } = useAuth(); // Changed from signOut to logout to match the context
  const { t } = useLanguage();
  
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/signin">
          <motion.button
            className="flex items-center gap-1 text-sm text-morocco-clay hover:text-morocco-green transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline-block">{t('sign_in')}</span>
          </motion.button>
        </Link>
      </div>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          className="flex items-center gap-1 text-sm rounded-full w-8 h-8 border bg-morocco-green border-morocco-green text-white hover:bg-morocco-green/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <User className="h-4 w-4 mx-auto" />
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <Link to="/profile">
          <DropdownMenuItem className="cursor-pointer">
            {t('profile')}
          </DropdownMenuItem>
        </Link>
        {user.role === 'admin' && (
          <Link to="/admin">
            <DropdownMenuItem className="cursor-pointer">
              {t('admin')}
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer text-morocco-red hover:text-morocco-red"
          onClick={() => logout()}  // Changed from signOut to logout to match the context
        >
          {t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
