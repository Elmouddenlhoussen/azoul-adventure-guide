
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { TravelerDetails } from '@/components/booking/BookingSteps';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Plus, Minus } from 'lucide-react';

interface TravelerInfoProps {
  travelerDetails: TravelerDetails;
  onUpdate: (details: TravelerDetails) => void;
  onNext: () => void;
  onPrev: () => void;
}

const travelerFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  specialRequests: z.string().optional(),
});

const TravelerInfo: React.FC<TravelerInfoProps> = ({ 
  travelerDetails, 
  onUpdate, 
  onNext, 
  onPrev 
}) => {
  const form = useForm<z.infer<typeof travelerFormSchema>>({
    resolver: zodResolver(travelerFormSchema),
    defaultValues: {
      firstName: travelerDetails.firstName,
      lastName: travelerDetails.lastName,
      email: travelerDetails.email,
      phone: travelerDetails.phone,
      specialRequests: travelerDetails.specialRequests,
    },
  });

  const handleCountChange = (type: 'adults' | 'children', increment: boolean) => {
    const newCount = increment 
      ? travelerDetails[type] + 1 
      : Math.max(type === 'adults' ? 1 : 0, travelerDetails[type] - 1);
    
    onUpdate({
      ...travelerDetails,
      [type]: newCount
    });
  };

  const onSubmit = (values: z.infer<typeof travelerFormSchema>) => {
    onUpdate({
      ...travelerDetails,
      ...values
    });
    onNext();
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
            <div className="flex items-center justify-between p-4 border rounded-md">
              <div>
                <Label className="font-medium">Adults</Label>
                <p className="text-sm text-gray-600">Age 13+</p>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handleCountChange('adults', false)}
                  disabled={travelerDetails.adults <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{travelerDetails.adults}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handleCountChange('adults', true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-md">
              <div>
                <Label className="font-medium">Children</Label>
                <p className="text-sm text-gray-600">Age 0-12</p>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handleCountChange('children', false)}
                  disabled={travelerDetails.children <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{travelerDetails.children}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handleCountChange('children', true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requests</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any dietary restrictions, accessibility needs, or other requests" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    We'll do our best to accommodate your needs.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-between pt-4">
              <Button 
                type="button"
                variant="outline" 
                onClick={onPrev}
              >
                Back to Dates
              </Button>
              <Button 
                type="submit"
                className="bg-morocco-clay hover:bg-morocco-clay/90"
              >
                Continue to Summary
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TravelerInfo;
