
import { ensureStorageBucket } from './setupService';
import { supabase } from '@/integrations/supabase/client';

// Initialize all required app services
export const initializeApp = async (): Promise<void> => {
  try {
    // Try to ensure storage bucket exists but continue even if it fails
    try {
      await ensureStorageBucket();
    } catch (storageError) {
      console.warn('Storage setup failed but application will continue:', storageError);
    }
    
    // Check if our edge function is available
    console.log('Checking Morocco Chat edge function availability...');
    
    // Ping the edge function with a simple message
    try {
      const { data, error } = await supabase.functions.invoke('morocco-chat', {
        body: { message: "hello" }
      });
      
      if (error) {
        console.warn('Morocco Chat edge function error:', error.message);
      } else {
        console.log('Morocco Chat edge function is available:', data);
      }
    } catch (functionError) {
      console.warn('Edge function call failed but application will continue:', functionError);
    }
    
    // Add other initialization steps here as needed
    console.log('Application initialization complete');
  } catch (error) {
    console.error('Error during app initialization:', error);
    // Don't rethrow - allow app to initialize with limited functionality
  }
};
