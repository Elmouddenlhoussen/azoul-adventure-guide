
import { supabase } from "@/integrations/supabase/client";

export interface ChatResponse {
  response: string;
  timestamp: string;
  error?: string;
}

export const sendChatMessage = async (message: string): Promise<ChatResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('morocco-chat', {
      body: { message }
    });
    
    if (error) throw error;
    
    return data as ChatResponse;
  } catch (error) {
    console.error("Chat service error:", error);
    return {
      response: "I'm sorry, I encountered a problem processing your request. Please try again later.",
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
};
