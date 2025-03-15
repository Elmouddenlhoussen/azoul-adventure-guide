
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth-context';

const AdminLink: React.FC = () => {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) return null;
  
  return (
    <Link to="/admin" className="ml-2">
      <Button variant="outline" size="sm">
        <Shield className="mr-2 h-4 w-4" />
        Admin
      </Button>
    </Link>
  );
};

export default AdminLink;
