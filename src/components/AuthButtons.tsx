
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth-context';
import { useNavigate } from 'react-router-dom';
import { LogOut, LogIn, UserPlus } from 'lucide-react';

const AuthButtons = () => {
  const { isLoggedIn, logout, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Logged out successfully',
        description: 'You have been signed out of your account.'
      });
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Logout Error',
        description: 'Unable to log out. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      ) : (
        <>
          <Button variant="outline" onClick={() => navigate('/signin')} className="flex items-center space-x-2">
            <LogIn className="h-4 w-4" />
            <span>Sign In</span>
          </Button>
          <Button onClick={() => navigate('/signup')} className="flex items-center space-x-2">
            <UserPlus className="h-4 w-4" />
            <span>Sign Up</span>
          </Button>
        </>
      )}
    </>
  );
};

export default AuthButtons;
