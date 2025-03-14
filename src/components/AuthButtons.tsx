
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, LogIn, UserPlus, ChevronDown, Facebook, Github, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from './ui/button';
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const AuthButtons = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // This is a placeholder for actual authentication logic
  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
      duration: 3000,
    });
  };

  const handleSocialLogin = (provider: string) => {
    // Placeholder for actual social login integration
    console.log(`Logging in with ${provider}`);
    toast({
      title: "Social login demo",
      description: `This is a demo of ${provider} login functionality.`,
      duration: 3000,
    });
    setIsAuthDialogOpen(false);
    // In a real implementation, this would redirect to the OAuth flow
    // For demo purposes, we'll simulate login
    setTimeout(() => {
      setIsLoggedIn(true);
      navigate('/');
    }, 1000);
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
                to="/profile" 
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
                to="/courses/my-courses" 
                className="block w-full text-left px-3 py-2 text-sm rounded-md hover:bg-morocco-sand/10"
              >
                My Courses
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
          <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center space-x-1 text-gray-700 hover:bg-morocco-sand/10"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-bold">Sign in to your account</DialogTitle>
                <DialogDescription className="text-center">
                  Choose your preferred login method to continue to Azoul
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex flex-col space-y-3 mt-4">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 py-5"
                  onClick={() => handleSocialLogin('Google')}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 py-5"
                  onClick={() => handleSocialLogin('Facebook')}
                >
                  <Facebook className="h-5 w-5 text-blue-600" />
                  Continue with Facebook
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 py-5"
                  onClick={() => handleSocialLogin('GitHub')}
                >
                  <Github className="h-5 w-5" />
                  Continue with GitHub
                </Button>
                
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-background px-2 text-sm text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <Link to="/signin">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2 py-5"
                  >
                    <Mail className="h-5 w-5" />
                    Continue with Email
                  </Button>
                </Link>
              </div>
              
              <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link to="/signup" className="font-semibold text-morocco-clay hover:underline" onClick={() => setIsAuthDialogOpen(false)}>
                  Sign up for free
                </Link>
              </div>
            </DialogContent>
          </Dialog>

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
