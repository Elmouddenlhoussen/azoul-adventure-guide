
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Destination = {
  id: string;
  title: string;
  description: string;
  location: string;
  image: string;
  rating: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

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
    
    // If no data returned from database, use our fallback featured destinations
    if (!data || data.length === 0) {
      return [
        {
          id: "marrakech",
          title: "Marrakech",
          description: "Known as the Red City, Marrakech is a major economic center and home to mosques, palaces and gardens.",
          location: "Central Morocco",
          image: "/images/destinations/marrakech.jpg",
          rating: 4.8,
          featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: "fes",
          title: "Fes",
          description: "Fes is a northeastern Moroccan city often referred to as the country's cultural capital.",
          location: "Northern Morocco",
          image: "/images/destinations/fes.jpg",
          rating: 4.7,
          featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: "chefchaouen",
          title: "Chefchaouen",
          description: "Chefchaouen, the blue pearl of Morocco, is known for its striking blue-washed buildings.",
          location: "Northwest Morocco",
          image: "/images/destinations/chefchaouen.jpg",
          rating: 4.6,
          featured: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    }
    
    return data;
  } catch (error) {
    console.error("Error fetching featured destinations:", error);
    // Return fallback destinations on error
    return [
      {
        id: "marrakech",
        title: "Marrakech",
        description: "Known as the Red City, Marrakech is a major economic center and home to mosques, palaces and gardens.",
        location: "Central Morocco",
        image: "/images/destinations/marrakech.jpg",
        rating: 4.8,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "fes",
        title: "Fes",
        description: "Fes is a northeastern Moroccan city often referred to as the country's cultural capital.",
        location: "Northern Morocco",
        image: "/images/destinations/fes.jpg",
        rating: 4.7,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "chefchaouen",
        title: "Chefchaouen",
        description: "Chefchaouen, the blue pearl of Morocco, is known for its striking blue-washed buildings.",
        location: "Northwest Morocco",
        image: "/images/destinations/chefchaouen.jpg",
        rating: 4.6,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
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
