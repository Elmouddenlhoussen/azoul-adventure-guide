
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth-context';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const AdminLink: React.FC = () => {
  const { isAdmin } = useAuth();
  
  // Only render the admin link if user is an admin
  if (!isAdmin) return null;
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link to="/admin" className="ml-2 relative group">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 
                      border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700
                      hover:bg-gradient-to-r hover:from-purple-100 hover:to-indigo-100 
                      dark:hover:from-purple-950/60 dark:hover:to-indigo-950/60
                      transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
          >
            <Shield className="mr-2 h-4 w-4 text-purple-500 dark:text-purple-400" />
            <span className="font-medium text-purple-700 dark:text-purple-300">Admin</span>
          </Button>
          <span className="absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-hover:ring-purple-400/40 dark:group-hover:ring-purple-600/40 transition-all duration-300"></span>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-auto p-2 shadow-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur border border-purple-100 dark:border-purple-900">
        <p className="text-sm text-gray-700 dark:text-gray-300">Access Azoul Admin Dashboard</p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AdminLink;
