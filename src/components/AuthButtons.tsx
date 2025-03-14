
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogIn, UserPlus, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from './ui/button';

const AuthButtons = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This is a placeholder for actual authentication logic
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="flex items-center">
      {isLoggedIn ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center space-x-1 rounded-full bg-morocco-sand/10 hover:bg-morocco-sand/20 text-gray-700 px-3 py-1.5 h-9"
            >
              <div className="w-6 h-6 rounded-full bg-morocco-clay flex items-center justify-center text-white">
                <User className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-medium">Account</span>
              <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2">
            <div className="space-y-1">
              <Link 
                to="/account" 
                className="block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-morocco-sand/10"
              >
                My Profile
              </Link>
              <Link 
                to="/bookings" 
                className="block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-morocco-sand/10"
              >
                My Bookings
              </Link>
              <Link 
                to="/settings" 
                className="block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-morocco-sand/10"
              >
                Settings
              </Link>
              <hr className="my-1 border-morocco-sand/20" />
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-sm text-morocco-clay rounded-md hover:bg-morocco-sand/10"
              >
                Sign Out
              </button>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="flex items-center space-x-2">
          <Link to="/signin">
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center space-x-1 text-gray-700 hover:bg-morocco-sand/10"
            >
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </Button>
          </Link>

          <Link to="/signup">
            <Button 
              size="sm"
              className="flex items-center space-x-1 bg-morocco-clay hover:bg-morocco-clay/90 text-white"
            >
              <UserPlus className="h-4 w-4" />
              <span>Sign Up</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
