
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookingData } from '@/types/booking';
import { format } from 'date-fns';
import { Check, CreditCard, Loader } from 'lucide-react';

interface BookingSummaryProps {
  bookingData: BookingData;
  onNext: () => void;
  onPrev: () => void;
  isLoading: boolean;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ 
  bookingData, 
  onNext, 
  onPrev,
  isLoading
}) => {
  const { experience, dates, travelers, totalPrice } = bookingData;

  if (!experience || !dates.startDate || !dates.endDate) {
    return <div>Missing booking information. Please start over.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>
        <p className="text-gray-600 mb-6">
          Please review your booking details before proceeding to payment
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold mb-4">{experience.title}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-medium capitalize">{experience.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Dates</p>
              <p className="font-medium">
                {format(dates.startDate, 'MMMM d, yyyy')} - {format(dates.endDate, 'MMMM d, yyyy')}
              </p>
              <p className="text-sm text-morocco-clay">{dates.duration} day{dates.duration !== 1 ? 's' : ''}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-b">
          <h4 className="font-semibold mb-3">Traveler Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Primary Traveler</p>
              <p className="font-medium">{travelers.firstName} {travelers.lastName}</p>
              <p className="text-sm text-gray-600">{travelers.email} | {travelers.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Group Size</p>
              <p className="font-medium">
                {travelers.adults} Adult{travelers.adults !== 1 ? 's' : ''}
                {travelers.children > 0 && `, ${travelers.children} Child${travelers.children !== 1 ? 'ren' : ''}`}
              </p>
            </div>
          </div>
          
          {travelers.specialRequests && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Special Requests</p>
              <p className="text-sm bg-gray-50 p-3 rounded mt-1">{travelers.specialRequests}</p>
            </div>
          )}
        </div>
        
        <div className="p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Base price</span>
            <span>${experience.price.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Duration</span>
            <span>× {dates.duration} day{dates.duration !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">Guests</span>
            <span>{travelers.adults + travelers.children * 0.5} traveler{(travelers.adults + travelers.children) !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center justify-between text-lg font-bold pt-4 border-t">
            <span>Total</span>
            <span className="text-morocco-clay">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onPrev}>
          Back to Travelers
        </Button>
        <Button 
          onClick={onNext}
          disabled={isLoading}
          className="bg-morocco-clay hover:bg-morocco-clay/90 flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Proceed to Payment <CreditCard className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      
      <div className="bg-morocco-sand/10 p-4 rounded-md text-sm text-gray-600">
        <h4 className="font-semibold flex items-center gap-2">
          <Check className="h-4 w-4 text-morocco-clay" />
          Booking Information
        </h4>
        <ul className="mt-2 space-y-1 ml-6 list-disc">
          <li>Payment will be processed securely via Stripe</li>
          <li>You'll receive a booking confirmation email after payment</li>
          <li>Free cancellation up to 48 hours before your experience</li>
          <li>For assistance, contact our support team</li>
        </ul>
      </div>
    </div>
  );
};

export default BookingSummary;
