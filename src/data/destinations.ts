
import { supabase } from "@/integrations/supabase/client";

export interface Destination {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  rating: number;
  featured: boolean;
}

export const destinations: Destination[] = [
  {
    id: "marrakech",
    title: "Marrakech",
    description: "Discover the vibrant culture and rich history of the Red City",
    image: "https://images.unsplash.com/photo-1539020140153-e69ed81792c6",
    location: "Marrakech, Morocco",
    rating: 4.8,
    featured: true
  },
  {
    id: "fes",
    title: "Fes",
    description: "Explore the oldest medieval city in the world",
    image: "https://images.unsplash.com/photo-1548019979-6fedb53d9946",
    location: "Fes, Morocco",
    rating: 4.7,
    featured: true
  },
  {
    id: "sahara",
    title: "Sahara Desert",
    description: "Experience the magic of the golden dunes under starlit skies",
    image: "https://images.unsplash.com/photo-1548234955-bc46f1d2b54c",
    location: "Merzouga, Morocco",
    rating: 4.9,
    featured: true
  }
];

// Function to update destination image
export const updateDestinationImage = async (id: string, imageUrl: string): Promise<boolean> => {
  try {
    const destinationToUpdate = destinations.find(d => d.id === id);
    if (destinationToUpdate) {
      destinationToUpdate.image = imageUrl;
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating destination image:", error);
    return false;
  }
};

// Function to create a new destination
export const createDestination = async (destination: Omit<Destination, 'id'>): Promise<Destination | null> => {
  try {
    const id = destination.title.toLowerCase().replace(/\s+/g, '-');
    const newDestination: Destination = {
      ...destination,
      id
    };
    
    destinations.push(newDestination);
    return newDestination;
  } catch (error) {
    console.error("Error creating destination:", error);
    return null;
  }
};

// Function to update a destination
export const updateDestination = async (id: string, updates: Partial<Destination>): Promise<boolean> => {
  try {
    const index = destinations.findIndex(d => d.id === id);
    if (index !== -1) {
      destinations[index] = { ...destinations[index], ...updates };
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating destination:", error);
    return false;
  }
};

// Function to delete a destination
export const deleteDestination = async (id: string): Promise<boolean> => {
  try {
    const initialLength = destinations.length;
    const newDestinations = destinations.filter(d => d.id !== id);
    
    if (newDestinations.length < initialLength) {
      destinations.length = 0;
      destinations.push(...newDestinations);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting destination:", error);
    return false;
  }
};
