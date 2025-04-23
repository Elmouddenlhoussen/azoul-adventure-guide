
import { supabase } from '@/integrations/supabase/client';

export interface Experience {
  id: string;
  type: 'tour' | 'accommodation' | 'guide';
  title: string;
  description: string | null;
  price: number;
  location: string | null;
  image_url: string | null;
}

export const experienceService = {
  async getExperiences() {
    const { data, error } = await supabase
      .from('experiences')
      .select('*');
    
    if (error) throw error;
    return data as Experience[];
  },

  async getExperienceById(id: string) {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Experience;
  }
};
