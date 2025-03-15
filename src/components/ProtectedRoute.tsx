
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth-context';
import { toast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { isLoggedIn, isAdmin } = useAuth();

  if (!isLoggedIn) {
    toast({
      title: "Authentication required",
      description: "Please sign in to access this page.",
      variant: "destructive",
    });
    return <Navigate to="/signin" replace />;
  }

  if (requireAdmin && !isAdmin) {
    toast({
      title: "Access denied",
      description: "You don't have permission to access this page.",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
