
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SelectExperience from '@/components/booking/steps/SelectExperience';
import SelectDates from '@/components/booking/steps/SelectDates';
import TravelerInfo from '@/components/booking/steps/TravelerInfo';
import BookingSummary from '@/components/booking/steps/BookingSummary';
import Confirmation from '@/components/booking/steps/Confirmation';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth-context';
import { bookingService } from '@/services/bookingService';
import PaymentForm from '@/components/booking/payment/PaymentForm';
import { supabase } from '@/integrations/supabase/client';

export const bookingSteps = [
  { id: 'experience', label: 'Experience' },
  { id: 'dates', label: 'Dates' },
  { id: 'travelers', label: 'Travelers' },
  { id: 'summary', label: 'Summary' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirmation', label: 'Confirmation' }
];

export type BookingType = 'tour' | 'accommodation' | 'guide';

export type ExperienceSelection = {
  type: BookingType;
  id: string;
  title: string;
  price: number;
  image: string;
};

export type DateSelection = {
  startDate: Date | null;
  endDate: Date | null;
  duration: number;
};

export type TravelerDetails = {
  adults: number;
  children: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
};

export type BookingData = {
  experience: ExperienceSelection | null;
  dates: DateSelection;
  travelers: TravelerDetails;
  totalPrice: number;
  bookingReference?: string;
  paymentIntentClientSecret?: string;
};

const initialBookingData: BookingData = {
  experience: null,
  dates: {
    startDate: null,
    endDate: null,
    duration: 1
  },
  travelers: {
    adults: 1,
    children: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  },
  totalPrice: 0
};

const BookingSteps = () => {
  const [currentStep, setCurrentStep] = useState('experience');
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const updateBookingData = (key: keyof BookingData, value: any) => {
    setBookingData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const calculateTotalPrice = () => {
    if (!bookingData.experience) return 0;
    
    const basePrice = bookingData.experience.price;
    const duration = bookingData.dates.duration || 1;
    const travelers = bookingData.travelers.adults + bookingData.travelers.children * 0.5;
    
    return basePrice * duration * travelers;
  };

  const nextStep = async () => {
    const currentIndex = bookingSteps.findIndex(step => step.id === currentStep);
    if (currentIndex < bookingSteps.length - 1) {
      const nextStepId = bookingSteps[currentIndex + 1].id;
      
      // Update total price before moving to summary
      if (nextStepId === 'summary') {
        const totalPrice = calculateTotalPrice();
        updateBookingData('totalPrice', totalPrice);
      }
      
      // Create booking and initialize payment before moving to payment step
      if (nextStepId === 'payment') {
        await handleBookingSubmit();
      }
      
      setCurrentStep(nextStepId);
    }
  };

  const prevStep = () => {
    const currentIndex = bookingSteps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(bookingSteps[currentIndex - 1].id);
    }
  };

  const handleBookingSubmit = async () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to complete your booking",
        variant: "destructive",
      });
      navigate('/signin');
      return;
    }

    if (!bookingData.experience || !bookingData.dates.startDate || !bookingData.dates.endDate) {
      return;
    }

    setIsLoading(true);

    try {
      const booking = await bookingService.createBooking({
        experience_id: bookingData.experience.id,
        start_date: bookingData.dates.startDate.toISOString(),
        end_date: bookingData.dates.endDate.toISOString(),
        adults: bookingData.travelers.adults,
        children: bookingData.travelers.children,
        total_price: bookingData.totalPrice,
        special_requests: bookingData.travelers.specialRequests
      });

      updateBookingData('bookingReference', booking.id);

      // Create a payment intent
      const response = await fetch('/functions/v1/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: bookingData.totalPrice,
          booking_id: booking.id
        }),
      });

      const data = await response.json();
      if (data.clientSecret) {
        updateBookingData('paymentIntentClientSecret', data.clientSecret);
        toast({
          title: "Booking Created",
          description: "Please complete your payment to confirm",
        });
      } else {
        throw new Error("Could not initialize payment");
      }
    } catch (error) {
      toast({
        title: "Error Creating Booking",
        description: "There was an error creating your booking. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = () => {
    setCurrentStep('confirmation');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
        <TabsList className="grid grid-cols-6 mb-8">
          {bookingSteps.map((step) => (
            <TabsTrigger 
              key={step.id} 
              value={step.id}
              disabled={
                (step.id === 'payment' && !bookingData.bookingReference) ||
                (step.id === 'confirmation' && !bookingData.bookingReference)
              }
              className="data-[state=active]:bg-morocco-clay data-[state=active]:text-white"
            >
              {step.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="experience">
          <SelectExperience 
            selectedExperience={bookingData.experience}
            onSelect={(experience) => updateBookingData('experience', experience)}
            onNext={nextStep}
          />
        </TabsContent>
        
        <TabsContent value="dates">
          <SelectDates 
            dateSelection={bookingData.dates}
            onUpdate={(dates) => updateBookingData('dates', dates)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        </TabsContent>
        
        <TabsContent value="travelers">
          <TravelerInfo 
            travelerDetails={bookingData.travelers}
            onUpdate={(travelers) => updateBookingData('travelers', travelers)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        </TabsContent>
        
        <TabsContent value="summary">
          <BookingSummary 
            bookingData={bookingData}
            onNext={nextStep}
            onPrev={prevStep}
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="payment">
          {bookingData.paymentIntentClientSecret && bookingData.bookingReference ? (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
                <p className="text-gray-600 mb-6">
                  Please provide your payment details to finalize your booking
                </p>
              </div>
              
              <PaymentForm 
                clientSecret={bookingData.paymentIntentClientSecret}
                bookingId={bookingData.bookingReference}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </div>
          ) : (
            <div className="text-center py-12">
              <p>Loading payment information...</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="confirmation">
          <Confirmation 
            bookingData={bookingData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingSteps;
