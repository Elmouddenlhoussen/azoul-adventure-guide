
import React, { useState } from 'react';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';
import { StripeElementsOptions } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51RHDgvFYoEMXLl0sMEnFKRvodtx8aQh0ZS7x7ewl2CGES2N9pMRxsH9SaybaUFUxbrk7LgxQ2VuMdyp2L5d7ogeu00zy08LSb6');

interface PaymentFormProps {
  clientSecret: string;
  bookingId: string;
  onPaymentSuccess: () => void;
}

const CheckoutForm = ({ bookingId, onPaymentSuccess }: { bookingId: string; onPaymentSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded');
      return;
    }

    setIsProcessing(true);

    try {
      console.log('Starting payment confirmation');
      const result = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (result.error) {
        console.error('Payment failed:', result.error);
        toast({
          title: "Payment failed",
          description: result.error.message || "An error occurred during payment processing",
          variant: "destructive",
        });
      } else {
        console.log('Payment succeeded:', result.paymentIntent);
        // Payment succeeded, verify with our backend
        const verifyResponse = await fetch('/functions/v1/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            payment_intent_id: result.paymentIntent.id 
          }),
        });

        const verifyData = await verifyResponse.json();
        
        if (verifyData.success) {
          console.log('Payment verified successfully');
          // Send booking confirmation email
          await fetch('/functions/v1/send-booking-confirmation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ booking_id: bookingId }),
          });
          
          toast({
            title: "Payment successful!",
            description: "Your booking has been confirmed",
          });
          
          onPaymentSuccess();
        } else {
          console.error('Payment verification failed:', verifyData);
          toast({
            title: "Payment verification failed",
            description: "Please contact support",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe || isProcessing}
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
  );
};

const PaymentForm = ({ clientSecret, bookingId, onPaymentSuccess }: PaymentFormProps) => {
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Complete Your Payment</h2>
        <p className="text-gray-600 text-sm">
          Your payment information is securely processed by Stripe.
        </p>
      </div>

      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm bookingId={bookingId} onPaymentSuccess={onPaymentSuccess} />
        </Elements>
      )}
    </div>
  );
};

export default PaymentForm;
