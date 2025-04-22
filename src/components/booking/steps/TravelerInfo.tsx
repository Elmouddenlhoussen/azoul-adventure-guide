
import React from 'react';
import { TravelerDetails } from '@/components/booking/BookingSteps';
import { TravelerCounter } from '../travelers/TravelerCounter';
import { ContactForm } from '../travelers/ContactForm';

interface TravelerInfoProps {
  travelerDetails: TravelerDetails;
  onUpdate: (details: TravelerDetails) => void;
  onNext: () => void;
  onPrev: () => void;
}

const TravelerInfo: React.FC<TravelerInfoProps> = ({ 
  travelerDetails, 
  onUpdate, 
  onNext, 
  onPrev 
}) => {
  const handleCountChange = (type: 'adults' | 'children', increment: boolean) => {
    const newCount = increment 
      ? travelerDetails[type] + 1 
      : Math.max(type === 'adults' ? 1 : 0, travelerDetails[type] - 1);
    
    onUpdate({
      ...travelerDetails,
      [type]: newCount
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Traveler Information</h2>
        <p className="text-gray-600 mb-6">
          Please provide your details to complete your booking
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Number of Travelers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TravelerCounter
              label="Adults"
              description="Age 13+"
              count={travelerDetails.adults}
              minCount={1}
              onCountChange={(increment) => handleCountChange('adults', increment)}
            />
            
            <TravelerCounter
              label="Children"
              description="Age 0-12"
              count={travelerDetails.children}
              minCount={0}
              onCountChange={(increment) => handleCountChange('children', increment)}
            />
          </div>
        </div>
        
        <ContactForm
          initialData={travelerDetails}
          onSubmit={(details) => {
            onUpdate(details);
            onNext();
          }}
          onPrev={onPrev}
        />
      </div>
    </div>
  );
};

export default TravelerInfo;
