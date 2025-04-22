
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookingData } from '@/components/booking/BookingSteps';
import { format } from 'date-fns';

interface BookingSummaryProps {
  bookingData: BookingData;
  onNext: () => void;
  onPrev: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ 
  bookingData, 
  onNext, 
  onPrev 
}) => {
  const { experience, dates, travelers, totalPrice } = bookingData;
  
  if (!experience || !dates.startDate || !dates.endDate) {
    return <div>Missing booking information. Please go back and complete all steps.</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>
        <p className="text-gray-600 mb-6">
          Please review your booking details before confirming
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-1">
            <img 
              src={experience.image} 
              alt={experience.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="md:col-span-2 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{experience.title}</h3>
                <p className="text-morocco-clay">
                  {experience.type === 'tour' ? 'Tour' : 
                   experience.type === 'accommodation' ? 'Accommodation' : 'Guide'}
                </p>
              </div>
              <div className="bg-morocco-sand/20 text-morocco-clay px-3 py-1 rounded-full text-sm font-medium">
                ${experience.price} per day
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Check-in / Start Date</p>
                  <p className="font-medium">{format(dates.startDate, 'MMMM d, yyyy')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check-out / End Date</p>
                  <p className="font-medium">{format(dates.endDate, 'MMMM d, yyyy')}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{dates.duration} day{dates.duration !== 1 ? 's' : ''}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Guests</p>
                  <p className="font-medium">
                    {travelers.adults} Adult{travelers.adults !== 1 ? 's' : ''}
                    {travelers.children > 0 && `, ${travelers.children} Child${travelers.children !== 1 ? 'ren' : ''}`}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p>{travelers.firstName} {travelers.lastName}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p>{travelers.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p>{travelers.phone}</p>
                </div>
              </div>
              
              {travelers.specialRequests && (
                <div className="mt-3">
                  <p className="text-gray-500 text-sm">Special Requests</p>
                  <p className="text-sm">{travelers.specialRequests}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 border-t">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Base price (${experience.price} x {dates.duration} days)</span>
              <span>${experience.price * dates.duration}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Travelers ({travelers.adults} adults, {travelers.children} children)</span>
              <span>
                ${travelers.adults * experience.price * dates.duration} + 
                ${(travelers.children * 0.5 * experience.price * dates.duration).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Service fee</span>
              <span>${(totalPrice * 0.10).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-3 border-t">
              <span>Total</span>
              <span>${(totalPrice * 1.10).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-morocco-sand/10 p-4 rounded-md">
        <h3 className="font-semibold mb-2">Booking Policy</h3>
        <ul className="text-sm space-y-2 text-gray-600">
          <li>• Full payment is required to confirm your booking</li>
          <li>• Free cancellation up to 48 hours before your experience</li>
          <li>• Changes to your booking may be subject to availability</li>
          <li>• By proceeding, you agree to our Terms & Conditions</li>
        </ul>
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={onPrev}
        >
          Back to Travelers
        </Button>
        <Button 
          onClick={onNext}
          className="bg-morocco-clay hover:bg-morocco-clay/90"
        >
          Confirm and Pay
        </Button>
      </div>
    </div>
  );
};

export default BookingSummary;
