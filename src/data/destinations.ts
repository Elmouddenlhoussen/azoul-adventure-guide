
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Destination = Tables<"destinations">;

// Function to fetch all destinations
export const getDestinations = async (): Promise<Destination[]> => {
  try {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }
};

// Function to fetch featured destinations
export const getFeaturedDestinations = async (): Promise<Destination[]> => {
  try {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .eq("featured", true)
      .order("rating", { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching featured destinations:", error);
    return [];
  }
};

// Function to fetch a single destination by ID
export const getDestinationById = async (id: string): Promise<Destination | null> => {
  try {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .eq("id", id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching destination by ID:", error);
    return null;
  }
};

// Function to update destination image
export const updateDestinationImage = async (id: string, imageUrl: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("destinations")
      .update({ image: imageUrl, updated_at: new Date().toISOString() })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating destination image:", error);
    return false;
  }
};

// Function to create a new destination
export const createDestination = async (destination: Omit<Destination, "id" | "created_at" | "updated_at">): Promise<Destination | null> => {
  try {
    const { data, error } = await supabase
      .from("destinations")
      .insert([destination])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating destination:", error);
    return null;
  }
};

// Function to update a destination
export const updateDestination = async (id: string, updates: Partial<Destination>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("destinations")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating destination:", error);
    return false;
  }
};

// Function to delete a destination
export const deleteDestination = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("destinations")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting destination:", error);
    return false;
  }
};
