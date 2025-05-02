
import { supabase } from "@/integrations/supabase/client";

// Function to ensure the 'media' storage bucket exists
export const ensureStorageBucket = async (): Promise<void> => {
  try {
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      throw listError;
    }
    
    // If media bucket doesn't exist, create it
    if (!buckets.some(bucket => bucket.name === 'media')) {
      const { error } = await supabase.storage.createBucket('media', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
      });
      
      if (error) {
        throw error;
      }
      
      console.log('Media bucket created successfully');
    }
  } catch (error) {
    console.error('Error setting up storage bucket:', error);
  }
};
