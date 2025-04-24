
import { useState } from 'react';
import { BookingType, ExperienceSelection, DateSelection, TravelerDetails, BookingData } from '@/types/booking';

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

export const useBookingState = () => {
  const [currentStep, setCurrentStep] = useState('experience');
  const [bookingData, setBookingData] = useState<BookingData>(initialBookingData);
  const [isLoading, setIsLoading] = useState(false);
  
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

  return {
    currentStep,
    setCurrentStep,
    bookingData,
    updateBookingData,
    isLoading,
    setIsLoading,
    calculateTotalPrice
  };
};
