
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
  logout: () => Promise<void>;
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
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("User restored from storage:", parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('azoul_user');
      }
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
        try {
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
            
            console.log("Admin login successful:", adminUser);
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
            
            console.log("User login successful:", regularUser);
            resolve(true);
          } else {
            console.error("Login failed: Invalid credentials");
            resolve(false);
          }
        } catch (error) {
          console.error("Login process error:", error);
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = async (): Promise<void> => {
    return new Promise((resolve) => {
      try {
        setUser(null);
        localStorage.removeItem('azoul_user');
        console.log("Logout successful");
        resolve();
      } catch (error) {
        console.error("Logout error:", error);
        resolve();
      }
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
