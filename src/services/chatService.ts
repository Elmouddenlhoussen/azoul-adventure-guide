
import { supabase } from "@/integrations/supabase/client";

export interface ChatResponse {
  response: string;
  timestamp: string;
  error?: string;
}

export interface ChatMessage {
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export const sendChatMessage = async (message: string, conversationHistory?: ChatMessage[]): Promise<ChatResponse> => {
  try {
    console.log('Sending chat message:', message);
    
    // Format conversation history for the edge function
    const formattedHistory = conversationHistory ? 
      conversationHistory.map(msg => ({
        role: msg.sender,
        content: msg.content,
        timestamp: msg.timestamp.toISOString()
      })) : 
      undefined;
    
    // Call the Morocco Chat edge function with conversation history
    const { data, error } = await supabase.functions.invoke('morocco-chat', {
      body: { 
        message,
        conversationHistory: formattedHistory
      }
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
