
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'user' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  
  // Check localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('azoul_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Mock admin credentials - in a real app, this would be handled by a backend
  const adminCredentials = {
    email: 'admin@azoul.com',
    password: 'admin123',
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, we'll simulate a network request
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if it's admin login
        if (email === adminCredentials.email && password === adminCredentials.password) {
          const adminUser = {
            id: '1',
            name: 'Admin',
            email: adminCredentials.email,
            role: 'admin' as UserRole,
          };
          
          setUser(adminUser);
          localStorage.setItem('azoul_user', JSON.stringify(adminUser));
          
          toast({
            title: "Welcome back, Admin!",
            description: "You've successfully logged in to your admin account."
          });
          
          resolve(true);
        } else if (email && password) {
          // Regular user login simulation
          const regularUser = {
            id: `user-${Math.random().toString(36).substr(2, 9)}`,
            name: email.split('@')[0],
            email,
            role: 'user' as UserRole,
          };
          
          setUser(regularUser);
          localStorage.setItem('azoul_user', JSON.stringify(regularUser));
          
          toast({
            title: "Welcome back!",
            description: "You've successfully logged in to your account."
          });
          
          resolve(true);
        } else {
          toast({
            title: "Login failed",
            description: "Please check your credentials and try again.",
            variant: "destructive"
          });
          
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('azoul_user');
    toast({
      title: "Logged out",
      description: "You've been successfully logged out."
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
