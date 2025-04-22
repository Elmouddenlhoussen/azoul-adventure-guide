
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { DateSelection } from '@/components/booking/BookingSteps';
import { addDays, differenceInDays } from 'date-fns';

interface SelectDatesProps {
  dateSelection: DateSelection;
  onUpdate: (dateSelection: DateSelection) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SelectDates: React.FC<SelectDatesProps> = ({ 
  dateSelection, 
  onUpdate, 
  onNext, 
  onPrev 
}) => {
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (!dateSelection.startDate || (dateSelection.startDate && dateSelection.endDate)) {
      // If no start date or both dates are selected, set start date
      onUpdate({
        startDate: date,
        endDate: null,
        duration: 1
      });
    } else {
      // If only start date is selected and new date is after start date
      if (date > dateSelection.startDate) {
        const duration = differenceInDays(date, dateSelection.startDate) + 1;
        onUpdate({
          startDate: dateSelection.startDate,
          endDate: date,
          duration
        });
      } else {
        // If selected date is before or equal to start date, reset
        onUpdate({
          startDate: date,
          endDate: null,
          duration: 1
        });
      }
    }
  };

  const isComplete = dateSelection.startDate && dateSelection.endDate;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Select Your Dates</h2>
        <p className="text-gray-600 mb-6">
          Choose your travel dates to continue with your booking
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Label className="mb-4 block text-lg">Select Date Range</Label>
            <Calendar
              mode="range"
              selected={{
                from: dateSelection.startDate || undefined,
                to: dateSelection.endDate || undefined
              }}
              onSelect={(range) => {
                if (range?.from) handleDateSelect(range.from);
                if (range?.to) handleDateSelect(range.to);
              }}
              disabled={{ before: new Date() }}
              className="rounded-md border"
            />
          </div>
          
          <div className="space-y-6">
            <div>
              <Label className="mb-4 block text-lg">Your Selection</Label>
              <div className="p-4 bg-gray-50 rounded-md space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in:</span>
                  <span className="font-medium">
                    {dateSelection.startDate ? dateSelection.startDate.toLocaleDateString() : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-out:</span>
                  <span className="font-medium">
                    {dateSelection.endDate ? dateSelection.endDate.toLocaleDateString() : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">
                    {dateSelection.duration} day{dateSelection.duration !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-morocco-sand/10 rounded-md">
              <h3 className="font-semibold mb-2">Booking Tips</h3>
              <ul className="text-sm space-y-2 text-gray-600">
                <li>• Peak season in Morocco is from March to May and September to November</li>
                <li>• Desert tours are best experienced from October to April</li>
                <li>• Many riads require a minimum 2-night stay</li>
                <li>• Consider Islamic holidays when planning your trip</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={onPrev}
        >
          Back to Experiences
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!isComplete}
          className="bg-morocco-clay hover:bg-morocco-clay/90"
        >
          Continue to Travelers
        </Button>
      </div>
    </div>
  );
};

export default SelectDates;
