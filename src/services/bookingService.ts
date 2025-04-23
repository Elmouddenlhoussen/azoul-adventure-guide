
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
  payment_intent_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const bookingService = {
  async createBooking(booking: Omit<Booking, 'id' | 'user_id' | 'status'>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        ...booking,
        user_id: (await supabase.auth.getUser()).data.user?.id,
        status: 'pending'
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
        experiences(*)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getBookingById(id: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        experiences(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateBookingStatus(id: string, status: Booking['status']) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  async cancelBooking(id: string) {
    return this.updateBookingStatus(id, 'cancelled');
  }
};
