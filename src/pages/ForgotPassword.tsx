
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedTransition from '@/components/AnimatedTransition';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      toast({
        title: "Reset link sent",
        description: "Check your email for instructions to reset your password",
      });
    }, 1500);
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
                <Link to="/signin" className="inline-flex items-center text-sm text-morocco-clay hover:text-morocco-terracotta mb-6">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to sign in
                </Link>
                
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold">Reset Your Password</h1>
                  <p className="text-gray-500 mt-2">We'll send you a link to reset your password</p>
                </div>
                
                {isSuccess ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Check Your Email</h2>
                    <p className="text-gray-600 mb-6">
                      We've sent a password reset link to:
                      <br />
                      <span className="font-medium">{email}</span>
                    </p>
                    <Link
                      to="/signin"
                      className="text-morocco-clay hover:text-morocco-terracotta font-medium"
                    >
                      Return to sign in
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                        />
                      </div>
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
                          Sending...
                        </span>
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    </AnimatedTransition>
  );
};

export default ForgotPassword;
