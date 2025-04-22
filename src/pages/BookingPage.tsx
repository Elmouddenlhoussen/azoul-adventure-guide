
import React, { useEffect } from 'react';
import AnimatedTransition from '@/components/AnimatedTransition';
import BookingSteps from '@/components/booking/BookingSteps';

const BookingPage = () => {
  useEffect(() => {
    document.title = 'Book Your Morocco Experience | Azoul';
    window.scrollTo(0, 0);
  }, []);

  return (
    <AnimatedTransition>
      <div className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Book Your Morocco Experience</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Select from our curated tours and accommodations to create your perfect Moroccan adventure
          </p>
          
          <BookingSteps />
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default BookingPage;
