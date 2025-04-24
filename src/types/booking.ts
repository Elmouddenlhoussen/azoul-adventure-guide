
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

export const bookingSteps = [
  { id: 'experience', label: 'Experience' },
  { id: 'dates', label: 'Dates' },
  { id: 'travelers', label: 'Travelers' },
  { id: 'summary', label: 'Summary' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirmation', label: 'Confirmation' }
];
