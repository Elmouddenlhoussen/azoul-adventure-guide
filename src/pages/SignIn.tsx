import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Key, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import SocialLoginButtons from '@/components/SocialLoginButtons';
import { useAuth } from '@/hooks/use-auth-context';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminHint, setShowAdminHint] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoggedIn } = useAuth();
  
  // Get the intended destination from location state, or default to "/"
  const from = location.state?.from || '/';
  
  // If already logged in, redirect to the appropriate page
  useEffect(() => {
    if (isLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        // Toast success message
        toast({
          title: "Login successful",
          description: email === 'admin@azoul.com' 
            ? "Welcome to the admin dashboard." 
            : "Welcome back to your account.",
        });
        
        // Navigate based on user type and intended destination
        if (email === 'admin@azoul.com') {
          navigate('/admin', { replace: true });
        } else if (from !== '/') {
          navigate(from, { replace: true });
        } else {
          navigate('/', { replace: true });
        }
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAdminHint = () => {
    setShowAdminHint(!showAdminHint);
  };

  return (
    <AnimatedTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="max-w-md mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold">Welcome Back</h1>
                  <p className="text-gray-500 mt-2">Sign in to continue your Moroccan journey</p>
                  <div className="mt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-400 hover:text-morocco-terracotta"
                      onClick={toggleAdminHint}
                    >
                      <Info className="h-4 w-4 mr-1" />
                      Need admin access?
                    </Button>
                  </div>
                </div>
                
                {showAdminHint && (
                  <Alert className="mb-4 bg-morocco-sand/10 border-morocco-terracotta/20">
                    <AlertDescription className="text-sm text-gray-600">
                      <strong>Admin Login:</strong> Use <code>admin@azoul.com</code> with password <code>admin123</code> to access the administrator dashboard.
                    </AlertDescription>
                  </Alert>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/forgot-password" className="text-sm text-morocco-clay hover:text-morocco-terracotta">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Key className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember" className="text-sm">Remember me for 30 days</Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-morocco-clay hover:bg-morocco-clay/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
                
                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <SocialLoginButtons mode="signin" />
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-gray-500">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-morocco-clay hover:text-morocco-terracotta font-medium">
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </AnimatedTransition>
  );
};

export default SignIn;
