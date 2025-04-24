import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth-context';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const AuthButtons = () => {
  const { isLoggedIn, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Logged out successfully',
        description: 'You have been signed out of your account.',
        // Remove the 'duration' property as it's not part of the Toast type
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Logout Error',
        description: 'Unable to log out. Please try again.',
        variant: 'destructive',
        // Remove the 'duration' property
      });
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <>
          <Button variant="outline" onClick={() => navigate('/signin')}>
            Sign In
          </Button>
          <Button onClick={() => navigate('/signup')}>Sign Up</Button>
        </>
      )}
    </>
  );
};

export default AuthButtons;
