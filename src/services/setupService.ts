
import { supabase } from "@/integrations/supabase/client";

// Function to ensure the 'media' storage bucket exists
export const ensureStorageBucket = async (): Promise<void> => {
  try {
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.warn('Unable to list storage buckets:', listError.message);
      return; // Exit early but don't throw error
    }
    
    // If media bucket doesn't exist, create it
    if (!buckets || !buckets.some(bucket => bucket.name === 'media')) {
      const { error } = await supabase.storage.createBucket('media', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
      });
      
      if (error) {
        // Handle permission error gracefully
        console.warn('Unable to create media bucket (may require admin privileges):', error.message);
        // Continue without throwing error - app can still function without the bucket
      } else {
        console.log('Media bucket created successfully');
      }
    } else {
      console.log('Media bucket already exists');
    }
  } catch (error) {
    console.error('Error checking storage bucket:', error);
    // Don't rethrow the error - allow app to continue
  }
};
