
import { supabase } from "@/integrations/supabase/client";

export interface ChatResponse {
  response: string;
  timestamp: string;
  error?: string;
}

export const sendChatMessage = async (message: string): Promise<ChatResponse> => {
  try {
    console.log('Sending chat message:', message);
    
    // Call the improved Morocco Chat edge function
    const { data, error } = await supabase.functions.invoke('morocco-chat', {
      body: { message }
    });
    
    if (error) {
      console.error("Chat service error from Supabase:", error);
      throw error;
    }
    
    console.log('Received chat response:', data);
    return data as ChatResponse;
  } catch (error) {
    console.error("Chat service error:", error);
    return {
      response: "I'm sorry, I encountered a problem understanding your question. Could you please rephrase it or ask something else about Morocco?",
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
};
