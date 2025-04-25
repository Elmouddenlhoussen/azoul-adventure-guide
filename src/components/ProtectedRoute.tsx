
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth-context';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { isLoggedIn, isAdmin, user } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Add page transition class to body
    document.body.classList.add('page-transition');
    
    return () => {
      document.body.classList.remove('page-transition');
    };
  }, [location.pathname]);

  // Debug logging
  useEffect(() => {
    console.log("Protected Route Debug:", { 
      isLoggedIn, 
      isAdmin, 
      requireAdmin,
      user,
      path: location.pathname
    });
  }, [isLoggedIn, isAdmin, requireAdmin, user, location.pathname]);

  if (!isLoggedIn) {
    toast({
      title: "Authentication required",
      description: "Please sign in to access this page.",
      variant: "destructive",
    });
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    toast({
      title: "Access denied",
      description: "You don't have permission to access this page.",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default ProtectedRoute;
