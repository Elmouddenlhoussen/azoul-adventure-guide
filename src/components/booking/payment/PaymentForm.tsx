
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';

// Placeholder component for now since we need to add Stripe dependencies
const PaymentForm = ({ clientSecret = "", bookingId = "", onPaymentSuccess = () => {} }) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment simulation",
        description: "In a real app, this would process payment through Stripe",
      });
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Complete Your Payment</h2>
        <p className="text-gray-600 text-sm">
          Your payment information would be securely processed by Stripe.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-4 border rounded-md bg-gray-50">
          <p className="text-center text-sm text-gray-500">
            Payment form placeholder - Stripe integration required
          </p>
        </div>
        
        <Button 
          type="submit" 
          disabled={isProcessing}
          className="w-full bg-morocco-clay hover:bg-morocco-clay/90"
        >
          {isProcessing ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Pay Now'
          )}
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
