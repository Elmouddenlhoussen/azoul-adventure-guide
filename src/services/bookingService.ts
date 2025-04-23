
import { supabase } from '@/integrations/supabase/client';

export interface Booking {
  id: string;
  user_id: string;
  experience_id: string;
  start_date: string;
  end_date: string;
  adults: number;
  children: number;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  special_requests?: string;
}

export const bookingService = {
  async createBooking(booking: Omit<Booking, 'id' | 'user_id' | 'status'>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        ...booking,
        user_id: (await supabase.auth.getUser()).data.user?.id,
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserBookings() {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        experience:experiences(*)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};
