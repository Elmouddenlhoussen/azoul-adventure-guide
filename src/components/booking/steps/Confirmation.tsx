
import React from 'react';
import { Button } from '@/components/ui/button';
import { BookingData } from '@/types/booking';
import { format } from 'date-fns';
import { Check, Calendar, Mail, Download, Share } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ConfirmationProps {
  bookingData: BookingData;
}

const Confirmation: React.FC<ConfirmationProps> = ({ bookingData }) => {
  const { experience, dates, travelers, bookingReference } = bookingData;
  
  if (!experience || !dates.startDate || !dates.endDate || !bookingReference) {
    return <div>Missing booking information. Please start over.</div>;
  }

  const expectedDate = new Date();
  expectedDate.setDate(expectedDate.getDate() + 1);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600">
          Your booking has been confirmed and a confirmation email has been sent to {travelers.email}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Booking Details</h3>
            <div className="bg-morocco-clay/10 text-morocco-clay px-3 py-1 rounded-full text-sm font-medium">
              {bookingReference}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-medium">{experience.title}</p>
              <p className="text-sm text-morocco-clay">
                {experience.type === 'tour' ? 'Tour' : 
                 experience.type === 'accommodation' ? 'Accommodation' : 'Guide'}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Dates</p>
              <p className="font-medium">
                {format(dates.startDate, 'MMMM d, yyyy')} - {format(dates.endDate, 'MMMM d, yyyy')}
              </p>
              <p className="text-sm text-gray-600">{dates.duration} day{dates.duration !== 1 ? 's' : ''}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Guests</p>
              <p className="font-medium">
                {travelers.adults} Adult{travelers.adults !== 1 ? 's' : ''}
                {travelers.children > 0 && `, ${travelers.children} Child${travelers.children !== 1 ? 'ren' : ''}`}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Contact Information</p>
              <p className="font-medium">{travelers.firstName} {travelers.lastName}</p>
              <p className="text-sm text-gray-600">{travelers.email} | {travelers.phone}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-gray-50">
          <h4 className="font-semibold mb-3">What's Next?</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-morocco-clay shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Confirmation Email</p>
                <p className="text-sm text-gray-600">
                  You'll receive a detailed confirmation email within the next 24 hours.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-morocco-clay shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Vendor Contact</p>
                <p className="text-sm text-gray-600">
                  Expect a message from your {experience.type === 'guide' ? 'guide' : 'host'} 
                  by {format(expectedDate, 'MMMM d, yyyy')}.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" /> Download Booking
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Share className="h-4 w-4" /> Share Itinerary
        </Button>
        <Button asChild className="bg-morocco-clay hover:bg-morocco-clay/90">
          <Link to="/profile">View Bookings in Profile</Link>
        </Button>
      </div>
      
      <div className="text-center">
        <Link to="/" className="text-morocco-clay hover:underline">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
