
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SelectExperience from '@/components/booking/steps/SelectExperience';
import SelectDates from '@/components/booking/steps/SelectDates';
import TravelerInfo from '@/components/booking/steps/TravelerInfo';
import BookingSummary from '@/components/booking/steps/BookingSummary';
import Confirmation from '@/components/booking/steps/Confirmation';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

export const bookingSteps = [
  { id: 'experience', label: 'Experience' },
  { id: 'dates', label: 'Dates' },
  { id: 'travelers', label: 'Travelers' },
  { id: 'summary', label: 'Summary' },
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
  const { toast } = useToast();

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

  const nextStep = () => {
    const currentIndex = bookingSteps.findIndex(step => step.id === currentStep);
    if (currentIndex < bookingSteps.length - 1) {
      const nextStepId = bookingSteps[currentIndex + 1].id;
      setCurrentStep(nextStepId);
      
      // Update total price before moving to summary
      if (nextStepId === 'summary') {
        const totalPrice = calculateTotalPrice();
        updateBookingData('totalPrice', totalPrice);
      }
      
      // Generate booking reference on confirmation
      if (nextStepId === 'confirmation') {
        // In a real app, this would come from the backend
        const reference = `AZL-${Math.floor(100000 + Math.random() * 900000)}`;
        updateBookingData('bookingReference', reference);
        
        toast({
          title: "Booking Successful!",
          description: `Your booking reference is ${reference}. A confirmation email has been sent.`,
        });
      }
    }
  };

  const prevStep = () => {
    const currentIndex = bookingSteps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(bookingSteps[currentIndex - 1].id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          {bookingSteps.map((step) => (
            <TabsTrigger 
              key={step.id} 
              value={step.id}
              disabled={step.id === 'confirmation' && !bookingData.bookingReference}
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
          />
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
